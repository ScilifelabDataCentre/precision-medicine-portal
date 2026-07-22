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
import {
  SEARCH_CONFIG,
  calculateSearchScore,
  highlightSearchTerms,
} from "@/lib/search";

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

const DATA_SOURCES_URI =
  "https://raw.githubusercontent.com/ScilifelabDataCentre/data.scilifelab.se/develop/data/data_sources.json";

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
        score: calculateSearchScore(dataSource, searchTerms, (source) => ({
          name: source.name,
          searchTags: source.search_tags,
          primaryList: source.data,
          secondaryList: source.disease_type,
          description: source.description,
        })),
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
