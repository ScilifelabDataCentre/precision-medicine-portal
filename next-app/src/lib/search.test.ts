import { describe, it, expect } from "vitest";
import {
  expandSearchTerms,
  normalizeText,
  highlightSearchTerms,
  calculateSimilarity,
  calculateSearchScore,
  type ScoreableFields,
} from "./search";

describe("normalizeText", () => {
  it("lowercases, strips diacritics and punctuation, and collapses whitespace", () => {
    expect(normalizeText("Hörby, Sweden!")).toBe("horby sweden");
  });

  it("collapses runs of whitespace and trims", () => {
    expect(normalizeText("  Multiple   Spaces  ")).toBe("multiple spaces");
  });

  it("returns an empty string for punctuation-only input", () => {
    expect(normalizeText("!!! ??? ...")).toBe("");
  });
});

describe("expandSearchTerms", () => {
  it("always includes the original terms", () => {
    expect(expandSearchTerms(["notarealmedicalterm"])).toEqual([
      "notarealmedicalterm",
    ]);
  });

  it("expands a Swedish term with its English synonyms", () => {
    const result = expandSearchTerms(["astma"]);
    expect(result).toContain("astma");
    expect(result).toContain("asthma");
    expect(result).toContain("respiratory");
  });

  it("expands an English synonym back to the Swedish key and siblings", () => {
    const result = expandSearchTerms(["asthma"]);
    expect(result).toContain("astma");
    expect(result).toContain("respiratory");
  });

  it("deduplicates the expanded terms", () => {
    const result = expandSearchTerms(["cancer", "cancer"]);
    expect(new Set(result).size).toBe(result.length);
  });
});

describe("highlightSearchTerms", () => {
  it("wraps matches case-insensitively in a <mark>", () => {
    expect(highlightSearchTerms("Cancer research", ["cancer"])).toBe(
      '<mark class="bg-accent">Cancer</mark> research',
    );
  });

  it("returns the text unchanged when there are no terms", () => {
    expect(highlightSearchTerms("unchanged", [])).toBe("unchanged");
  });

  it("escapes regex metacharacters so terms are matched literally", () => {
    // Without escaping, "c++" would be an invalid/greedy regex; escaping means
    // it matches the literal substring only.
    expect(highlightSearchTerms("c++ language", ["c++"])).toBe(
      '<mark class="bg-accent">c++</mark> language',
    );
  });
});

describe("calculateSimilarity", () => {
  it("scores an exact (normalized) match as 1", () => {
    expect(calculateSimilarity("Cancer", "cancer")).toBe(1.0);
  });

  it("scores containment as 0.9", () => {
    expect(calculateSimilarity("cancer", "cancer research")).toBe(0.9);
  });

  it("scores disjoint text as 0", () => {
    expect(calculateSimilarity("cancer", "diabetes")).toBe(0);
  });

  it("scores partial word overlap by Jaccard similarity", () => {
    // {lung, cancer} vs {cancer, registry}: 1 shared / 3 total.
    expect(calculateSimilarity("lung cancer", "cancer registry")).toBeCloseTo(
      1 / 3,
    );
  });
});

describe("calculateSearchScore", () => {
  const identity = (f: ScoreableFields): ScoreableFields => f;

  const emptyFields = (
    overrides: Partial<ScoreableFields> = {},
  ): ScoreableFields => ({
    name: "",
    searchTags: [],
    primaryList: [],
    secondaryList: [],
    description: "",
    ...overrides,
  });

  it("ranks a name match above a description-only match", () => {
    const nameMatch = calculateSearchScore(
      emptyFields({ name: "Cancer", description: "unrelated registry" }),
      ["cancer"],
      identity,
    );
    const descMatch = calculateSearchScore(
      emptyFields({ name: "Registry", description: "cancer data" }),
      ["cancer"],
      identity,
    );

    expect(nameMatch).toBeGreaterThan(descMatch);
    expect(descMatch).toBeGreaterThan(0);
  });

  it("scores an unrelated query near zero", () => {
    const score = calculateSearchScore(
      emptyFields({ name: "Cancer", description: "oncology registry" }),
      ["quantumchromodynamics"],
      identity,
    );
    expect(score).toBeLessThan(0.3); // below SEARCH_CONFIG.SCORE_THRESHOLD
  });
});
