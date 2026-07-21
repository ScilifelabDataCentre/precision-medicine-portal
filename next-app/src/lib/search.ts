import { SWEDISH_TO_ENGLISH_TERMS } from "./swedish-medical-terms";

// Shared search engine for the data-source listing pages. Extracted from the
// previously-duplicated per-page implementations; the ranking algorithm and its
// tunables are intentionally identical across pages so results are consistent.

/** Search tunables shared across the data-source pages. */
export const SEARCH_CONFIG = {
  SCORE_THRESHOLD: 0.3,
  DEBOUNCE_DELAY: 300,
} as const;

/**
 * Expand raw search terms with their Swedish<->English synonyms so a query in
 * either language matches content written in the other. Handles both directions
 * (Swedish key -> English synonyms, and English synonym -> Swedish key + siblings)
 * and deduplicates the result.
 */
export function expandSearchTerms(terms: string[]): string[] {
  const expandedTerms = [...terms];

  terms.forEach((term) => {
    const normalizedTerm = term.toLowerCase().trim();

    // Check if the term is Swedish and has English translations
    if (SWEDISH_TO_ENGLISH_TERMS[normalizedTerm]) {
      expandedTerms.push(...SWEDISH_TO_ENGLISH_TERMS[normalizedTerm]);
    }

    // Also check for reverse mapping (English to Swedish)
    Object.entries(SWEDISH_TO_ENGLISH_TERMS).forEach(([swedish, englishTerms]) => {
      if (
        englishTerms.some((english) => english.toLowerCase() === normalizedTerm)
      ) {
        expandedTerms.push(swedish, ...englishTerms);
      }
    });
  });

  // Remove duplicates and return
  return [...new Set(expandedTerms)];
}

/** Lowercase, strip diacritics and punctuation, and collapse whitespace. */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^\w\s]/g, " ") // Replace punctuation with spaces
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();
}

/** Wrap every occurrence of any search term in `<mark class="bg-accent">`. */
export function highlightSearchTerms(
  text: string,
  searchTerms: string[],
): string {
  if (!text || searchTerms.length === 0) return text;

  let highlightedText = text;

  // Escape special regex characters in search terms
  const escapedTerms = searchTerms.map((term) =>
    term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );

  escapedTerms.forEach((term) => {
    if (term.trim()) {
      const regex = new RegExp(`(${term})`, "gi");
      highlightedText = highlightedText.replace(
        regex,
        '<mark class="bg-accent">$1</mark>',
      );
    }
  });

  return highlightedText;
}

/** Rough 0..1 similarity: exact match, containment, then word-overlap (Jaccard). */
export function calculateSimilarity(text1: string, text2: string): number {
  const normalized1 = normalizeText(text1);
  const normalized2 = normalizeText(text2);

  // Exact match gets highest score
  if (normalized1 === normalized2) return 1.0;

  // Check if one contains the other
  if (normalized1.includes(normalized2) || normalized2.includes(normalized1)) {
    return 0.9;
  }

  // Word-based similarity
  const words1 = new Set(normalized1.split(" "));
  const words2 = new Set(normalized2.split(" "));

  const intersection = new Set([...words1].filter((x) => words2.has(x)));
  const union = new Set([...words1, ...words2]);

  return intersection.size / union.size;
}

/**
 * The weighted fields an item exposes to the scorer. Weights are fixed
 * (name 3.0, searchTags 2.5, primaryList 2.0, secondaryList 1.5, description 1.0),
 * so ranking is identical across pages; each page maps its own item shape onto
 * these fields via `getFields`.
 */
export interface ScoreableFields {
  name: string;
  searchTags: string[];
  primaryList: string[];
  secondaryList: string[];
  description: string;
}

const FIELD_WEIGHTS = {
  name: 3.0,
  searchTags: 2.5,
  primaryList: 2.0,
  secondaryList: 1.5,
  description: 1.0,
} as const;

/**
 * Score an item against search terms. Terms are expanded with Swedish synonyms;
 * each weighted field contributes its similarity, with a bonus for exact
 * name/tag matches and a logarithmic bonus for repeated mentions. Returns the
 * average score per expanded term.
 */
export function calculateSearchScore<T>(
  item: T,
  searchTerms: string[],
  getFields: (item: T) => ScoreableFields,
): number {
  // Expand search terms with Swedish translations
  const expandedSearchTerms = expandSearchTerms(searchTerms);
  const fields = getFields(item);

  let totalScore = 0;
  let termCount = 0;

  for (const searchTerm of expandedSearchTerms) {
    const normalizedSearchTerm = normalizeText(searchTerm);
    let termScore = 0;

    // Check name field (highest weight)
    const nameSimilarity = calculateSimilarity(searchTerm, fields.name);
    if (nameSimilarity > 0) {
      termScore += nameSimilarity * FIELD_WEIGHTS.name;
    }

    // Check search tags (high weight)
    for (const tag of fields.searchTags) {
      const tagSimilarity = calculateSimilarity(searchTerm, tag);
      if (tagSimilarity > 0) {
        termScore += tagSimilarity * FIELD_WEIGHTS.searchTags;
      }
    }

    // Check primary list, e.g. data types / categories (medium-high weight)
    for (const value of fields.primaryList) {
      const similarity = calculateSimilarity(searchTerm, value);
      if (similarity > 0) {
        termScore += similarity * FIELD_WEIGHTS.primaryList;
      }
    }

    // Check secondary list, e.g. disease types / registry centres (medium weight)
    for (const value of fields.secondaryList) {
      const similarity = calculateSimilarity(searchTerm, value);
      if (similarity > 0) {
        termScore += similarity * FIELD_WEIGHTS.secondaryList;
      }
    }

    // Check description (lowest weight)
    const descSimilarity = calculateSimilarity(searchTerm, fields.description);
    if (descSimilarity > 0) {
      termScore += descSimilarity * FIELD_WEIGHTS.description;
    }

    // Bonus for exact matches in name or search tags
    const normalizedName = normalizeText(fields.name);
    const normalizedTags = fields.searchTags.map((tag) => normalizeText(tag));

    if (
      normalizedName.includes(normalizedSearchTerm) ||
      normalizedTags.some((tag) => tag.includes(normalizedSearchTerm))
    ) {
      termScore += 2.0; // Significant bonus for exact matches
    }

    // Add term frequency bonus (more mentions = higher score)
    const allText = [
      fields.name,
      fields.description,
      ...fields.searchTags,
      ...fields.primaryList,
      ...fields.secondaryList,
    ]
      .join(" ")
      .toLowerCase();

    const termFrequency = (
      allText.match(new RegExp(normalizedSearchTerm, "g")) || []
    ).length;
    if (termFrequency > 1) {
      termScore += Math.log(termFrequency) * 0.5; // Logarithmic bonus for frequency
    }

    totalScore += termScore;
    termCount++;
  }

  // Return average score per term, but ensure minimum threshold
  return termCount > 0 ? totalScore / termCount : 0;
}
