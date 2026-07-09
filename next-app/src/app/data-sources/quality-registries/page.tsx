"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Input } from "@/components/ui/input";
import Title from "@/components/common/title";
import { LastUpdated } from "@/components/common/last-updated";
import { LoadingState } from "@/components/common/LoadingState";
import { FilterSection } from "@/components/common/FilterSection";
import { QualityRegistryCard } from "@/components/QualityRegistryCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { IRegistryFilters, IRegistrySource, filters } from "@/interfaces/types";
import { Building2, FolderOpen } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

// Configuration constants
const ORGANISATION_LINKS: Record<string, string> = {
  "Kvalitetsregistercentrum Stockholm": "https://qrcstockholm.se",
  "Registercentrum Syd": "https://registercentrum.se",
  "Registercentrum Norr": "https://rcnorr.se",
  "Uppsala Clinical Research Center": "https://www.ucr.uu.se/sv/",
  "Registercentrum Västra Götaland": "https://registercentrum.se",
  "Registercentrum Sydost":
    "https://sydostrasjukvardsregionen.se/samverkansgrupper/data-och-analys/registercentrum-sydost/",
  "Regionala Cancercentrum i Samverkan": "https://cancercentrum.se/",
} as const;

const SEARCH_CONFIG = {
  SCORE_THRESHOLD: 0.3,
  DEBOUNCE_DELAY: 300,
} as const;

// Swedish to English medical term translations
const swedishToEnglishTerms: { [key: string]: string[] } = {
  // Common medical conditions
  cancer: ["cancer", "tumor", "neoplasia"],
  hjärtinfarkt: ["heart attack", "myocardial infarction", "cardiac"],
  hjärninfarkt: [
    "cerebral infarction",
    "brain stroke",
    "cerebrovascular accident",
    "cva",
  ],
  stroke: ["stroke", "cerebrovascular", "brain"],
  diabetes: ["diabetes", "diabetic"],
  parkinson: ["parkinson", "parkinson's"],
  alzheimer: ["alzheimer", "dementia"],
  demens: ["dementia", "cognitive", "alzheimer"],
  epilepsi: ["epilepsy", "seizure"],
  epilepsikirurgi: ["epilepsy surgery", "epileptic surgery"],
  hydrocefalus: ["hydrocephalus", "water on brain"],
  inflammatoriskpolyneuropati: [
    "inflammatory polyneuropathy",
    "chronic inflammatory demyelinating polyneuropathy",
    "cidp",
  ],
  motorneuronsjukdom: [
    "motor neuron disease",
    "motor neurone disease",
    "mnd",
    "als",
    "amyotrophic lateral sclerosis",
  ],
  myasteniagravis: ["myasthenia gravis", "mg", "muscle weakness"],
  narkolepsi: ["narcolepsy", "sleep disorder"],
  neuromuskulärasjukdomar: [
    "neuromuscular diseases",
    "neuromuscular disorders",
  ],
  svårneurovaskulärhuvudvärk: [
    "severe neurovascular headache",
    "cluster headache",
    "migraine",
  ],
  astma: ["asthma", "respiratory"],
  artrit: ["arthritis", "rheumatoid"],
  reumatism: ["rheumatism", "rheumatic", "arthritis"],
  spondylit: ["spondylitis", "ankylosing spondylitis"],
  osteoporos: ["osteoporosis", "bone"],
  obesitas: ["obesity", "overweight"],
  hemofili: ["hemophilia", "bleeding disorder"],
  leukemi: ["leukemia", "leukaemia", "blood cancer"],
  lymfom: ["lymphoma", "lymphatic cancer"],
  fibros: ["fibrosis", "scarring"],
  dermatit: ["dermatitis", "eczema", "skin condition"],
  katarakt: ["cataract", "lens opacity"],

  // Body parts and systems
  hjärta: ["heart", "cardiac", "cardiovascular"],
  lungor: ["lung", "pulmonary", "respiratory"],
  lever: ["liver", "hepatic"],
  gallblåsa: ["gallbladder", "biliary"],
  gallvägar: ["bile ducts", "biliary tract"],
  njurar: ["kidney", "renal"],
  hjärna: ["brain", "cerebral", "neurological"],
  blod: ["blood", "hematological"],
  ben: ["bone", "skeletal"],
  leder: ["joint", "articular"],
  muskler: ["muscle", "muscular"],
  nervsystem: ["nervous system", "neurological"],
  hud: ["skin", "dermatological"],
  ögon: ["eyes", "ocular", "ophthalmology"],
  öron: ["ears", "auditory", "otology"],

  // Medical procedures and treatments
  kirurgi: ["surgery", "surgical"],
  handkirurgi: ["hand surgery", "microsurgery"],
  thoraxkirurgi: ["thoracic surgery", "chest surgery"],
  kärlkirurgi: ["vascular surgery", "vessel surgery"],
  hjärtkirurgi: ["cardiac surgery", "heart surgery"],
  bråckkirurgi: ["hernia surgery", "hernia repair"],
  barnkirurgi: ["pediatric surgery", "children surgery"],
  kemoterapi: ["chemotherapy", "cancer treatment"],
  strålbehandling: ["radiation", "radiotherapy"],
  transplantation: ["transplant", "transplantation"],
  dialys: ["dialysis", "renal replacement"],
  anestesi: ["anesthesia", "anesthetic"],
  intensivvård: ["intensive care", "icu", "critical care"],
  behandling: ["treatment", "therapy"],
  medicin: ["medicine", "medication", "drug"],

  // Patient groups
  barn: ["child", "pediatric", "children"],
  äldre: ["elderly", "geriatric", "aging"],
  vuxna: ["adult", "adults"],
  spädbarn: ["infant", "newborn", "neonatal"],
  gravid: ["pregnant", "pregnancy", "maternal"],
  neonatal: ["newborn", "neonatal", "infant"],

  // Medical specialties
  neurologi: ["neurology", "neurological"],
  onkologi: ["oncology", "cancer"],
  kardiologi: ["cardiology", "cardiac"],
  urologi: ["urology", "urological"],
  gynekologi: ["gynecology", "gynecological"],
  ortopedi: ["orthopedics", "orthopedic"],
  reumatologi: ["rheumatology", "rheumatic"],
  endokrinologi: ["endocrinology", "hormonal"],
  gastroenterologi: ["gastroenterology", "digestive"],

  // Specific conditions from registries
  kognitiv: ["cognitive", "mental", "brain function"],
  psykisk: ["psychiatric", "psychological", "mental health"],
  beteende: ["behavioral", "behaviour"],
  dysfori: ["dysphoria", "gender dysphoria"],
  cerebralparesi: ["cerebral palsy", "cp"],
  cystiskfibros: ["cystic fibrosis", "cf"],
  myelomeningocele: ["spina bifida", "neural tube defect"],
  neuralrörsdefekt: ["neural tube defect", "spina bifida"],

  // Orthopedic and pediatric conditions
  höftfyseolys: ["slipped capital femoral epiphysis", "scfe", "hip slippage"],
  höftledsinstabilitet: [
    "hip joint instability",
    "hip dysplasia",
    "ddh",
    "developmental dysplasia of hip",
  ],
  klumpfot: ["clubfoot", "talipes equinovarus", "peva"],
  patellaluxation: [
    "patellar dislocation",
    "kneecap dislocation",
    "patella luxation",
  ],
  perthes: ["perthes disease", "legg-calve-perthes", "avascular necrosis hip"],

  // Registry-specific terms
  kvalitetsregister: ["quality registry", "registry"],
  nationellt: ["national"],
  regionalt: ["regional"],
  sjukhus: ["hospital", "clinical"],
  vård: ["care", "healthcare"],
  forskning: ["research", "study"],
  uppföljning: ["follow-up", "monitoring"],

  // Common Swedish medical abbreviations
  hiv: ["hiv", "aids"],
  covid: ["covid", "coronavirus"],
  ms: ["multiple sclerosis", "ms"],
  cf: ["cystic fibrosis", "cf"],
  ivf: ["in vitro fertilization", "ivf"],
  acls: ["anterior cruciate ligament", "acl"],
};

// Function to expand search terms with Swedish translations
function expandSearchTerms(terms: string[]): string[] {
  const expandedTerms = [...terms];

  terms.forEach((term) => {
    const normalizedTerm = term.toLowerCase().trim();

    // Check if the term is Swedish and has English translations
    if (swedishToEnglishTerms[normalizedTerm]) {
      expandedTerms.push(...swedishToEnglishTerms[normalizedTerm]);
    }

    // Also check for reverse mapping (English to Swedish)
    Object.entries(swedishToEnglishTerms).forEach(([swedish, englishTerms]) => {
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

// Utility functions for improved search
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^\w\s]/g, " ") // Replace punctuation with spaces
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();
}

function highlightSearchTerms(text: string, searchTerms: string[]): string {
  if (!text || searchTerms.length === 0) return text;

  let highlightedText = text;

  // Escape special regex characters in search terms
  const escapedTerms = searchTerms.map((term) =>
    term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );

  escapedTerms.forEach((term) => {
    if (term.trim()) {
      const regex = new RegExp(`(${term})`, "gi");
      highlightedText = highlightedText.replace(
        regex,
        '<mark class="bg-accent">$1</mark>'
      );
    }
  });

  return highlightedText;
}

function calculateSimilarity(text1: string, text2: string): number {
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

function calculateSearchScore(
  registry: IRegistrySource,
  searchTerms: string[]
): number {
  // Expand search terms with Swedish translations
  const expandedSearchTerms = expandSearchTerms(searchTerms);

  // Field weights - more important fields get higher weights
  const fieldWeights = {
    name: 3.0,
    search_tags: 2.5,
    category: 2.0,
    registry_centre: 1.5,
    Information: 1.0,
  };

  let totalScore = 0;
  let termCount = 0;

  for (const searchTerm of expandedSearchTerms) {
    const normalizedSearchTerm = normalizeText(searchTerm);
    let termScore = 0;

    // Check name field (highest weight)
    const nameSimilarity = calculateSimilarity(searchTerm, registry.name);
    if (nameSimilarity > 0) {
      termScore += nameSimilarity * fieldWeights.name;
    }

    // Check search tags (high weight)
    for (const tag of registry.search_tags) {
      const tagSimilarity = calculateSimilarity(searchTerm, tag);
      if (tagSimilarity > 0) {
        termScore += tagSimilarity * fieldWeights.search_tags;
      }
    }

    // Check category (medium-high weight)
    for (const category of registry.category) {
      const categorySimilarity = calculateSimilarity(searchTerm, category);
      if (categorySimilarity > 0) {
        termScore += categorySimilarity * fieldWeights.category;
      }
    }

    // Check registry centre (medium weight)
    for (const centre of registry.registry_centre) {
      const centreSimilarity = calculateSimilarity(searchTerm, centre);
      if (centreSimilarity > 0) {
        termScore += centreSimilarity * fieldWeights.registry_centre;
      }
    }

    // Check information/description (lowest weight)
    const infoSimilarity = calculateSimilarity(
      searchTerm,
      registry.Information
    );
    if (infoSimilarity > 0) {
      termScore += infoSimilarity * fieldWeights.Information;
    }

    // Bonus for exact matches in name or search tags
    const normalizedName = normalizeText(registry.name);
    const normalizedTags = registry.search_tags.map((tag) =>
      normalizeText(tag)
    );

    if (
      normalizedName.includes(normalizedSearchTerm) ||
      normalizedTags.some((tag) => tag.includes(normalizedSearchTerm))
    ) {
      termScore += 2.0; // Significant bonus for exact matches
    }

    // Add term frequency bonus (more mentions = higher score)
    const allText = [
      registry.name,
      registry.Information,
      ...registry.search_tags,
      ...registry.category,
      ...registry.registry_centre,
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

export default function QualityRegistryPage() {
  // State management
  const [registries, setRegistries] = useState<IRegistrySource[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<IRegistryFilters>({
    registryCentre: [],
    registryCategory: [],
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounce search term for better performance
  const debouncedSearchTerm = useDebounce(
    searchTerm,
    SEARCH_CONFIG.DEBOUNCE_DELAY
  );

  // Data fetching
  useEffect(() => {
    const fetchRegistryData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const registryData = await import(
          "@/assets/Kvalitetsregister_geo_dates_02.09.2024.json"
        );

        const processedData = registryData.default.map(
          (entry: IRegistrySource) => ({
            ...entry,
            start_date: entry.start_date ? entry.start_date.split("-")[0] : "",
            category: entry.category || [],
          })
        );

        setRegistries(processedData);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load registry data";
        setError(errorMessage);
        console.error("Error fetching registry data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegistryData();
  }, []);

  // Memoized filter counts for performance
  const getCountForType = useCallback(
    (type: string, isRegistryCentre: boolean): number => {
      return registries.filter((source) => {
        const tags = isRegistryCentre
          ? source.registry_centre
          : source.category;
        return tags.some((tag) => tag.toLowerCase() === type.toLowerCase());
      }).length;
    },
    [registries]
  );

  // Filter management
  const updateFilter = useCallback(
    (filterType: keyof IRegistryFilters, filterName: string) => {
      setSelectedFilters((prev) => {
        const newFilters = { ...prev };
        if (newFilters[filterType].includes(filterName)) {
          newFilters[filterType] = newFilters[filterType].filter(
            (item) => item !== filterName
          );
        } else {
          newFilters[filterType] = [...newFilters[filterType], filterName];
        }
        return newFilters;
      });
    },
    []
  );

  // Search and filter logic
  const searchTerms = useMemo(() => {
    return debouncedSearchTerm
      .toLowerCase()
      .split(/\s+/)
      .filter((term) => term.length > 0);
  }, [debouncedSearchTerm]);

  const filteredAndSearchedRegistries = useMemo(() => {
    // Apply filters first
    const filtered = registries.filter((registry) => {
      const centreFilter =
        selectedFilters.registryCentre.length === 0 ||
        selectedFilters.registryCentre.some((filter) =>
          registry.registry_centre.some(
            (centre) => centre.toLowerCase() === filter.toLowerCase()
          )
        );

      const categoryFilter =
        selectedFilters.registryCategory.length === 0 ||
        selectedFilters.registryCategory.some((filter) =>
          registry.category.some(
            (cat) => cat.toLowerCase() === filter.toLowerCase()
          )
        );

      return centreFilter && categoryFilter;
    });

    // Apply search if there are search terms
    if (searchTerms.length === 0) {
      return filtered
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((registry) => ({ registry, score: 0 }));
    }

    return filtered
      .map((registry) => ({
        registry,
        score: calculateSearchScore(registry, searchTerms),
      }))
      .filter((result) => result.score >= SEARCH_CONFIG.SCORE_THRESHOLD)
      .sort((a, b) => b.score - a.score);
  }, [registries, selectedFilters, searchTerms]);

  // Loading state
  if (isLoading) {
    return <LoadingState />;
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Error loading registries: {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <nav aria-label="Breadcrumb navigation" role="navigation">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/data-sources">Data sources</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/data-sources/quality-registries">
                Quality registries
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>

      <Title level={1}>Quality registries</Title>

      <div className="lg:grid lg:grid-cols-4 lg:gap-8 pt-8">
        <aside
          className="lg:col-span-1 mb-8 lg:mb-0"
          aria-label="Search and filter options"
          role="complementary"
        >
          <div className="space-y-8">
            {/* Disclaimer */}
            <div
              className="w-full max-w-lg bg-muted border border-neutral rounded-lg p-4 text-sm text-foreground text-left mx-auto"
              role="note"
              aria-label="Data access information"
            >
              To access data, researchers may need to obtain ethical approval,
              submit data requests, and set up data management agreements.
            </div>

            {/* Search */}
            <section aria-label="Search quality registries">
              <div className="space-y-4">
                <label
                  htmlFor="search"
                  className="font-bold text-2xl text-foreground"
                >
                  Search
                </label>
                <Input
                  id="search"
                  type="text"
                  name="search"
                  placeholder="Search by name or keywords"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-muted text-foreground placeholder:text-foreground/70"
                  aria-describedby="search-help"
                />
                {searchTerm.length === 0 && (
                  <div
                    id="search-help"
                    className="text-sm text-foreground"
                    role="region"
                    aria-label="Search examples"
                  >
                    <p className="mb-2">Examples:</p>
                    <ul className="space-y-1 text-sm" role="list">
                      <li role="listitem">
                        &quot;barn&quot; / &quot;child&quot; - finds pediatric
                        registries
                      </li>
                      <li role="listitem">
                        &quot;hjärta&quot; / &quot;heart&quot; - finds cardiac
                        registries
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </section>

            {(selectedFilters.registryCentre.length > 0 ||
              selectedFilters.registryCategory.length > 0) && (
              <button
                type="button"
                onClick={() =>
                  setSelectedFilters({
                    registryCentre: [],
                    registryCategory: [],
                  })
                }
                className="text-sm text-primary hover:underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                aria-label="Clear all filters"
              >
                Clear all filters
              </button>
            )}

            {/* Organisation filters */}
            <section aria-label="Filter by organisation">
              <FilterSection
                title="Organisation"
                icon={<Building2 className="h-5 w-5" aria-hidden />}
                items={filters.registryCentre}
                selectedItems={selectedFilters.registryCentre}
                onFilterChange={(item) => updateFilter("registryCentre", item)}
                getItemCount={(item) => getCountForType(item, true)}
              />
            </section>

            {/* Category filters */}
            <section aria-label="Filter by category">
              <FilterSection
                title="Category"
                icon={<FolderOpen className="h-5 w-5" aria-hidden />}
                items={filters.registryCategory}
                selectedItems={selectedFilters.registryCategory}
                onFilterChange={(item) =>
                  updateFilter("registryCategory", item)
                }
                getItemCount={(item) => getCountForType(item, false)}
              />
            </section>
          </div>
        </aside>

        <section
          className="lg:col-span-3 space-y-6"
          aria-label="Quality registries results"
          role="region"
        >
          {/* Results summary */}
          <div
            className="space-y-2 mb-6"
            role="status"
            aria-live="polite"
            aria-label="Search and filter results summary"
          >
            {searchTerms.length > 0 && (
              <div className="text-sm text-muted-foreground">
                Found {filteredAndSearchedRegistries.length} result
                {filteredAndSearchedRegistries.length !== 1 ? "s" : ""} for
                &quot;
                <span className="font-medium text-foreground">
                  {debouncedSearchTerm}
                </span>
                &quot;
                {filteredAndSearchedRegistries.length > 0 &&
                  " (ordered by search ranking)"}
              </div>
            )}

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Showing {filteredAndSearchedRegistries.length} of{" "}
                {registries.length} registries
                {(selectedFilters.registryCentre.length > 0 ||
                  selectedFilters.registryCategory.length > 0) &&
                  " (filtered)"}
              </span>

              {filteredAndSearchedRegistries.length === 0 &&
                registries.length > 0 && (
                  <span className="text-error">No matches found</span>
                )}
            </div>
          </div>

          {/* Registry cards or empty state */}
          {filteredAndSearchedRegistries.length === 0 ? (
            <div
              className="text-center py-16"
              role="status"
              aria-label="No results found"
            >
              <div className="text-muted-foreground space-y-2">
                <p className="text-lg font-medium">
                  {searchTerms.length > 0
                    ? "No registries found matching your search"
                    : "No registries match the selected filters"}
                </p>
                <p className="text-sm">
                  {searchTerms.length > 0
                    ? "Try adjusting your search terms or removing filters"
                    : "Try selecting different filter options"}
                </p>
              </div>
            </div>
          ) : (
            <div
              className="space-y-6"
              role="list"
              aria-label={`${filteredAndSearchedRegistries.length} quality registries found`}
            >
              {filteredAndSearchedRegistries.map((result) => (
                <div key={result.registry.name} role="listitem">
                  <QualityRegistryCard
                    registry={result.registry}
                    searchTerms={searchTerms}
                    expandSearchTerms={expandSearchTerms}
                    highlightSearchTerms={highlightSearchTerms}
                    organisationLinks={ORGANISATION_LINKS}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <LastUpdated date="16-09-2025" />
    </div>
  );
}
