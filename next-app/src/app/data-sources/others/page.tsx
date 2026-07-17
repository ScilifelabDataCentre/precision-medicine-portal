"use client";

import { ReactElement, useMemo, useCallback, useState, useEffect } from "react";

import { LastUpdated } from "@/components/common/last-updated";
import { LoadingState } from "@/components/common/LoadingState";
import { FilterSection } from "@/components/common/FilterSection";
import { DataSourceCard } from "@/components/DataSourceCard";
import { Input } from "@/components/ui/input";
import Title from "@/components/common/title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Dna, Activity } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

interface IDataSourceFilters {
  dataTypes: string[];
  diseaseTypes: string[];
}

interface IDataSourcesDC {
  name: string;
  url: string;
  description: string;
  thumbnail: string;
  ddls: string[];
  data: string[];
  disease_type: string[];
  search_tags: string[];
}

// Configuration constants
const SEARCH_CONFIG = {
  SCORE_THRESHOLD: 0.3,
  DEBOUNCE_DELAY: 300,
} as const;

const DATA_SOURCES_URI =
  "https://raw.githubusercontent.com/ScilifelabDataCentre/data.scilifelab.se/develop/data/data_sources.json";

// Swedish to English medical and scientific term translations
const swedishToEnglishTerms: { [key: string]: string[] } = {
  // Medical conditions and diseases
  cancer: ["cancer", "tumor", "neoplasia", "oncology"],
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
  astma: ["asthma", "respiratory"],
  artrit: ["arthritis", "rheumatoid"],
  reumatism: ["rheumatism", "rheumatic", "arthritis"],
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

  // Scientific and technical terms
  genetik: ["genetics", "genetic", "gene"],
  genomik: ["genomics", "genomic", "genome"],
  proteomik: ["proteomics", "proteomic", "protein"],
  metabolomik: ["metabolomics", "metabolic", "metabolite"],
  transkriptomik: ["transcriptomics", "transcriptomic"],
  epigenetik: ["epigenetics", "epigenetic", "epigenome"],
  bioinformatik: ["bioinformatics", "computational biology"],
  biokemi: ["biochemistry", "biochemical"],
  molekylärbiologi: ["molecular biology", "molecular", "molecule"],
  cellbiologi: ["cell biology", "cellular"],
  mikrobiologi: ["microbiology", "microbial", "microbe"],
  immunologi: ["immunology", "immune", "antibody"],
  farmakologi: ["pharmacology", "pharmaceutical", "drug"],
  toxikologi: ["toxicology", "toxic", "poison"],
  epidemiologi: ["epidemiology", "epidemiological", "epidemic"],
  patologi: ["pathology", "pathological", "disease"],
  fysiologi: ["physiology", "physiological"],
  anatomi: ["anatomy", "anatomical", "body"],

  // Data types and research terms
  register: ["registry", "register", "database"],
  biobank: ["biobank", "biobanking"],
  prov: ["sample", "specimen"],
  data: ["data", "dataset"],
  forskning: ["research", "study"],
  studie: ["study", "research"],
  experiment: ["experiment", "experimental"],
  analys: ["analysis", "analytical"],
  mätning: ["measurement", "measure"],
  observation: ["observation", "observational"],
  undersökning: ["investigation", "examination"],
  kartläggning: ["mapping", "survey"],
  uppföljning: ["follow-up", "monitoring"],
  screening: ["screening", "screening"],
  diagnostik: ["diagnostics", "diagnostic"],
  prognos: ["prognosis", "prognostic"],
  läkemedel: ["drug", "medication", "pharmaceutical"],
  vaccin: ["vaccine", "vaccination"],
  terapi: ["therapy", "therapeutic"],

  // Common Swedish medical abbreviations
  hiv: ["hiv", "aids"],
  covid: ["covid", "coronavirus"],
  ms: ["multiple sclerosis", "ms"],
  cf: ["cystic fibrosis", "cf"],
  ivf: ["in vitro fertilization", "ivf"],
  acls: ["anterior cruciate ligament", "acl"],

  // Swedish institutions and organizations
  karolinska: ["karolinska", "ki", "karolinska institutet"],
  uppsala: ["uppsala", "uppsala university"],
  lund: ["lund", "lund university"],
  göteborg: ["gothenburg", "göteborg"],
  stockholm: ["stockholm"],
  sverige: ["sweden", "swedish"],
  folkhälsomyndigheten: ["public health agency", "fohm"],
  socialstyrelsen: ["national board of health and welfare"],
  vetenskapsrådet: ["swedish research council", "vr"],
  scb: ["statistics sweden", "scb"],
  snd: ["swedish national data service", "snd"],
  digg: ["myndigheten for digital förvaltning", "digg"],
  elixir: ["elixir", "elixir europe"],
  scilifelab: ["scilifelab", "science for life laboratory"],
  nbis: ["nbis", "national bioinformatics infrastructure"],
  sbdi: ["sbdi", "swedish biodiversity data infrastructure"],
  fega: ["fega", "federated european genome-phenome archive"],
  scapis: ["scapis", "swedish cardiopulmonary bioimage study"],
  bbmri: [
    "bbmri",
    "biobanking and biomolecular resources research infrastructure",
  ],
  embl: ["embl", "european molecular biology laboratory"],
  ebi: ["ebi", "european bioinformatics institute"],
  ncbi: ["ncbi", "national center for biotechnology information"],
  nih: ["nih", "national institutes of health"],
  who: ["who", "world health organization"],
  cdc: ["cdc", "centers for disease control and prevention"],
  ecdc: ["ecdc", "european centre for disease prevention and control"],
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
  dataSource: IDataSourcesDC,
  searchTerms: string[],
): number {
  // Expand search terms with Swedish translations
  const expandedSearchTerms = expandSearchTerms(searchTerms);

  // Field weights - more important fields get higher weights
  const fieldWeights = {
    name: 3.0,
    search_tags: 2.5,
    data: 2.0,
    disease_type: 1.5,
    description: 1.0,
  };

  let totalScore = 0;
  let termCount = 0;

  for (const searchTerm of expandedSearchTerms) {
    const normalizedSearchTerm = normalizeText(searchTerm);
    let termScore = 0;

    // Check name field (highest weight)
    const nameSimilarity = calculateSimilarity(searchTerm, dataSource.name);
    if (nameSimilarity > 0) {
      termScore += nameSimilarity * fieldWeights.name;
    }

    // Check search tags (high weight)
    for (const tag of dataSource.search_tags) {
      const tagSimilarity = calculateSimilarity(searchTerm, tag);
      if (tagSimilarity > 0) {
        termScore += tagSimilarity * fieldWeights.search_tags;
      }
    }

    // Check data types (medium-high weight)
    for (const dataType of dataSource.data) {
      const dataSimilarity = calculateSimilarity(searchTerm, dataType);
      if (dataSimilarity > 0) {
        termScore += dataSimilarity * fieldWeights.data;
      }
    }

    // Check disease types (medium weight)
    for (const diseaseType of dataSource.disease_type) {
      const diseaseSimilarity = calculateSimilarity(searchTerm, diseaseType);
      if (diseaseSimilarity > 0) {
        termScore += diseaseSimilarity * fieldWeights.disease_type;
      }
    }

    // Check description (lowest weight)
    const descSimilarity = calculateSimilarity(
      searchTerm,
      dataSource.description,
    );
    if (descSimilarity > 0) {
      termScore += descSimilarity * fieldWeights.description;
    }

    // Bonus for exact matches in name or search tags
    const normalizedName = normalizeText(dataSource.name);
    const normalizedTags = dataSource.search_tags.map((tag) =>
      normalizeText(tag),
    );

    if (
      normalizedName.includes(normalizedSearchTerm) ||
      normalizedTags.some((tag) => tag.includes(normalizedSearchTerm))
    ) {
      termScore += 2.0; // Significant bonus for exact matches
    }

    // Add term frequency bonus (more mentions = higher score)
    const allText = [
      dataSource.name,
      dataSource.description,
      ...dataSource.search_tags,
      ...dataSource.data,
      ...dataSource.disease_type,
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

export default function DataSourcesOthersPage(): ReactElement {
  const [dataSourcesJSON, setDataSourcesJSON] = useState<IDataSourcesDC[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<IDataSourceFilters>({
    dataTypes: [],
    diseaseTypes: [],
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounce search term for better performance
  const debouncedSearchTerm = useDebounce(
    searchTerm,
    SEARCH_CONFIG.DEBOUNCE_DELAY,
  );

  const filters: IDataSourceFilters = {
    dataTypes: [
      "Biobank",
      "Chemical Biology",
      "Clinical",
      "Enzymes, Pathways, Interactions",
      "Epidemiology",
      "Evolution and Phylogeny",
      "General",
      "Genes and Genomes",
      "Imaging",
      "Molecular and Cellular Structures",
      "Phenotypic",
      "Proteins and Proteomes",
    ],
    diseaseTypes: [
      "Cancer",
      "Cardiovascular Diseases",
      "Developmental Disorders",
      "Drug Development",
      "General",
      "Genetic Disorders",
      "Immunological Diseases",
      "Infectious Diseases",
      "Metabolic Disorders",
      "Neurological Disorders",
      "Psychiatric Disorders",
      "Public Health",
      "Rare Diseases",
      "Various Diseases",
    ],
  };

  // Memoized filter counts for performance
  const getCountForType = useCallback(
    (type: string, isDataType: boolean): number => {
      return dataSourcesJSON.filter((source) => {
        const tags = isDataType ? source.data : source.disease_type;
        return tags.some((tag) => tag.toLowerCase() === type.toLowerCase());
      }).length;
    },
    [dataSourcesJSON],
  );

  useEffect(() => {
    let isActive = true;

    fetch(DATA_SOURCES_URI)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data: IDataSourcesDC[]) => {
        if (!isActive) {
          return;
        }

        const tmpDataSourcesJSON = data
          .filter((element: IDataSourcesDC) =>
            element.ddls.includes("Precision Medicine and Diagnostics"),
          )
          .filter(
            (element: IDataSourcesDC) => element.name !== "SCAPIS database",
          ); // Exclude "SCAPIS"
        setDataSourcesJSON(tmpDataSourcesJSON);
      })
      .catch((error) => {
        if (!isActive) {
          return;
        }

        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to load data sources";
        setError(errorMessage);
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  // Filter management
  const updateFilter = useCallback(
    (filterType: keyof IDataSourceFilters, filterName: string) => {
      setSelectedFilters((prev) => {
        const newFilters = { ...prev };
        if (newFilters[filterType].includes(filterName)) {
          newFilters[filterType] = newFilters[filterType].filter(
            (item) => item !== filterName,
          );
        } else {
          newFilters[filterType] = [...newFilters[filterType], filterName];
        }
        return newFilters;
      });
    },
    [],
  );

  // Search and filter logic
  const searchTerms = useMemo(() => {
    return debouncedSearchTerm
      .toLowerCase()
      .split(/\s+/)
      .filter((term) => term.length > 0);
  }, [debouncedSearchTerm]);

  const filteredAndSearchedDataSources = useMemo(() => {
    // Apply filters first
    const filtered = dataSourcesJSON.filter((dataSource) => {
      const dataTypeFilter =
        selectedFilters.dataTypes.length === 0 ||
        selectedFilters.dataTypes.some((filter) =>
          dataSource.data.some(
            (tag) => tag.toLowerCase() === filter.toLowerCase(),
          ),
        );

      const diseaseTypeFilter =
        selectedFilters.diseaseTypes.length === 0 ||
        selectedFilters.diseaseTypes.some((filter) =>
          dataSource.disease_type.some(
            (tag) => tag.toLowerCase() === filter.toLowerCase(),
          ),
        );

      return dataTypeFilter && diseaseTypeFilter;
    });

    // Apply search if there are search terms
    if (searchTerms.length === 0) {
      return filtered
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((dataSource) => ({ dataSource, score: 0 }));
    }

    return filtered
      .map((dataSource) => ({
        dataSource,
        score: calculateSearchScore(dataSource, searchTerms),
      }))
      .filter((result) => result.score >= SEARCH_CONFIG.SCORE_THRESHOLD)
      .sort((a, b) => b.score - a.score);
  }, [dataSourcesJSON, selectedFilters, searchTerms]);

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
            Error loading data sources: {error}
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
              <BreadcrumbLink href="/data-sources/others">
                Other data sources
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>

      <Title level={1}>Data sources</Title>

      <div className="lg:grid lg:grid-cols-4 lg:gap-8 pt-8">
        <aside
          className="lg:col-span-1 mb-8 lg:mb-0"
          aria-label="Search and filter options"
          role="complementary"
        >
          <div className="space-y-8">
            <div
              className="w-full max-w-lg bg-muted border border-neutral rounded-lg p-4 text-sm text-foreground text-left mx-auto"
              role="note"
              aria-label="Data access information"
            >
              To access data, researchers may need to obtain ethical approval,
              submit data requests, and set up data management agreements.
            </div>

            <section aria-label="Search data sources">
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
                        &quot;protein&quot; / &quot;proteomik&quot; - finds
                        proteomic data
                      </li>
                      <li role="listitem">
                        &quot;hjärta&quot; / &quot;heart&quot; - finds
                        cardiovascular data
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </section>

            {(selectedFilters.dataTypes.length > 0 ||
              selectedFilters.diseaseTypes.length > 0) && (
              <button
                type="button"
                onClick={() =>
                  setSelectedFilters({ dataTypes: [], diseaseTypes: [] })
                }
                className="text-sm text-primary hover:underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                aria-label="Clear all filters"
              >
                Clear all filters
              </button>
            )}

            {/* Data type filters */}
            <section aria-label="Filter by data type">
              <FilterSection
                title="Data type"
                icon={<Dna className="h-5 w-5" aria-hidden />}
                items={filters.dataTypes}
                selectedItems={selectedFilters.dataTypes}
                onFilterChange={(item) => updateFilter("dataTypes", item)}
                getItemCount={(item) => getCountForType(item, true)}
              />
            </section>

            {/* Disease type filters */}
            <section aria-label="Filter by disease type">
              <FilterSection
                title="Disease type"
                icon={<Activity className="h-5 w-5" aria-hidden />}
                items={filters.diseaseTypes}
                selectedItems={selectedFilters.diseaseTypes}
                onFilterChange={(item) => updateFilter("diseaseTypes", item)}
                getItemCount={(item) => getCountForType(item, false)}
              />
            </section>
          </div>
        </aside>

        <section
          className="lg:col-span-3 space-y-6"
          aria-label="Data sources results"
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
                Found {filteredAndSearchedDataSources.length} result
                {filteredAndSearchedDataSources.length !== 1 ? "s" : ""} for
                &quot;
                <span className="font-medium text-foreground">
                  {debouncedSearchTerm}
                </span>
                &quot;
                {filteredAndSearchedDataSources.length > 0 &&
                  " (ordered by search ranking)"}
              </div>
            )}

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Showing {filteredAndSearchedDataSources.length} of{" "}
                {dataSourcesJSON.length} data sources
                {(selectedFilters.dataTypes.length > 0 ||
                  selectedFilters.diseaseTypes.length > 0) &&
                  " (filtered)"}
              </span>

              {filteredAndSearchedDataSources.length === 0 &&
                dataSourcesJSON.length > 0 && (
                  <span className="text-error">No matches found</span>
                )}
            </div>
          </div>

          {/* Data source cards or empty state */}
          {filteredAndSearchedDataSources.length === 0 ? (
            <div
              className="text-center py-16"
              role="status"
              aria-label="No results found"
            >
              <div className="text-muted-foreground space-y-2">
                <p className="text-lg font-medium">
                  {searchTerms.length > 0
                    ? "No data sources found matching your search"
                    : "No data sources match the selected filters"}
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
              role="list"
              aria-label={`${filteredAndSearchedDataSources.length} data sources found`}
            >
              {filteredAndSearchedDataSources.map((result) => (
                <DataSourceCard
                  key={result.dataSource.name}
                  dataSource={result.dataSource}
                  searchTerms={searchTerms}
                  highlightSearchTerms={highlightSearchTerms}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      <LastUpdated date="17-03-2026" />
    </div>
  );
}
