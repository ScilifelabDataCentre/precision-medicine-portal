"use client";

import { useState, useEffect, useCallback, useMemo, ReactElement } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Title from "@/components/common/title";
import { LastUpdated } from "@/components/common/last-updated";
import { LoadingState } from "@/components/common/LoadingState";
import { FilterSection } from "@/components/common/FilterSection";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Users, Dna, Activity } from "lucide-react";
import { sanitizeURL } from "@/lib/security-utils";
import { useDebounce } from "@/hooks/useDebounce";

type StudyType =
  | "population_cohort"
  | "disease_specific_cohort"
  | "biobank_study"
  | "cohort_infrastructure";

type DataType =
  | "genomics"
  | "clinical_data"
  | "imaging"
  | "registry_linkage"
  | "multi_omics";

type DiseaseArea = "cancer" | "cardiovascular" | "metabolic" | "neurology";

type DataSource = {
  title: string;
  link: string;
  SND?: string;
  category: string;
  study_type: StudyType;
  data_types: DataType[];
  disease_area: DiseaseArea[];
  description: string;
  tags?: string[];
};

const STUDY_TYPE_LABELS: Record<StudyType, string> = {
  population_cohort: "Population cohort",
  disease_specific_cohort: "Disease-specific cohort",
  biobank_study: "Biobank study",
  cohort_infrastructure: "Cohort infrastructure",
};

const DATA_TYPE_LABELS: Record<DataType, string> = {
  genomics: "Genomics",
  clinical_data: "Clinical data",
  imaging: "Imaging",
  registry_linkage: "Registry linkage",
  multi_omics: "Multi-omics",
};

const DISEASE_AREA_LABELS: Record<DiseaseArea, string> = {
  cancer: "Cancer",
  cardiovascular: "Cardiovascular",
  metabolic: "Metabolic",
  neurology: "Neurology",
};

const FILTER_OPTIONS = {
  studyType: Object.values(STUDY_TYPE_LABELS),
  dataTypes: Object.values(DATA_TYPE_LABELS),
  diseaseArea: Object.values(DISEASE_AREA_LABELS),
} as const;

const TAG_COLOURS: { [key: string]: string } = {
  snd: "bg-[#649ED2] text-black",
  tag: "bg-muted text-muted-foreground",
};

interface Filters {
  studyType: string[];
  dataTypes: string[];
  diseaseArea: string[];
}

const SEARCH_CONFIG = {
  DEBOUNCE_DELAY: 300,
} as const;

export default function SwedishResearchCohortsPage(): ReactElement {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    studyType: [],
    dataTypes: [],
    diseaseArea: [],
  });
  const [searchBar, setSearchBar] = useState("");
  const debouncedSearchTerm = useDebounce(
    searchBar,
    SEARCH_CONFIG.DEBOUNCE_DELAY,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data =
          await import("@/assets/Sorted_Swedish_Research_Projects.json");
        setDataSources(data.dataSources as DataSource[]);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load cohort data";
        setError(errorMessage);
        console.error("Error fetching cohort data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateFilter = useCallback(
    (filterType: keyof Filters, filterName: string) => {
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

  const getCountForType = useCallback(
    (label: string, category: keyof Filters): number => {
      return dataSources.filter((source) => {
        switch (category) {
          case "studyType":
            return STUDY_TYPE_LABELS[source.study_type] === label;
          case "dataTypes":
            return source.data_types.some(
              (dt) => DATA_TYPE_LABELS[dt] === label,
            );
          case "diseaseArea":
            return source.disease_area.some(
              (da) => DISEASE_AREA_LABELS[da] === label,
            );
        }
      }).length;
    },
    [dataSources],
  );

  const searchWords = useMemo(() => {
    return debouncedSearchTerm
      .toLowerCase()
      .split(/\s+/)
      .filter((term) => term.length > 0);
  }, [debouncedSearchTerm]);

  const filtered = useMemo(() => {
    const afterFilters = dataSources.filter((item) => {
      const studyTypeMatch =
        selectedFilters.studyType.length === 0 ||
        selectedFilters.studyType.includes(STUDY_TYPE_LABELS[item.study_type]);

      const dataTypeMatch =
        selectedFilters.dataTypes.length === 0 ||
        selectedFilters.dataTypes.some((dt) =>
          item.data_types.some((d) => DATA_TYPE_LABELS[d] === dt),
        );

      const diseaseAreaMatch =
        selectedFilters.diseaseArea.length === 0 ||
        selectedFilters.diseaseArea.some((da) =>
          item.disease_area.some((d) => DISEASE_AREA_LABELS[d] === da),
        );

      return studyTypeMatch && dataTypeMatch && diseaseAreaMatch;
    });

    if (searchWords.length === 0) {
      return afterFilters.sort((a, b) => a.title.localeCompare(b.title));
    }

    return afterFilters
      .filter((item) => {
        const searchable = [
          item.title,
          item.description,
          ...(item.tags ?? []),
          ...item.data_types.map((d) => DATA_TYPE_LABELS[d]),
          STUDY_TYPE_LABELS[item.study_type],
          ...item.disease_area.map((d) => DISEASE_AREA_LABELS[d]),
        ]
          .join(" ")
          .toLowerCase();
        return searchWords.every((word) => searchable.includes(word));
      })
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [dataSources, selectedFilters, searchWords]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Error loading cohort data: {error}
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
              <BreadcrumbLink href="/data-sources/swedish-research-cohorts">
                Swedish research cohorts and biobank studies
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>

      <Title level={1} className="mb-4">
        Swedish research cohorts and biobank studies
      </Title>

      <div
        className="text-justify mx-auto mb-6"
        role="doc-abstract"
        aria-label="Page introduction and overview"
      >
        <p className="mb-2">
          This page highlights major Swedish research cohorts and biobank-based
          studies that collect biological samples and health data. These are
          typically long-term research resources used by multiple studies rather
          than single projects. In Sweden, such data are often linked with
          national quality registries and health registers, enabling large-scale
          precision medicine research.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside
          className="space-y-6"
          aria-label="Search and filter options"
          role="complementary"
        >
          <div
            className="w-full max-w-lg bg-muted border border-neutral rounded-lg p-4 text-sm text-foreground text-left mx-auto"
            role="note"
            aria-label="Data access information"
          >
            To access data, researchers may need to obtain ethical approval,
            submit data requests, and set up data management agreements.
          </div>

          <section aria-label="Search cohorts and biobank studies">
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
                placeholder="Search by name or keyword"
                value={searchBar}
                onChange={(e) => setSearchBar(e.target.value)}
                className="bg-muted text-foreground placeholder:text-foreground/70"
                aria-describedby="search-help"
              />
              <div id="search-help" className="sr-only">
                Search by name, description, study type, data type, or disease
                area
              </div>
            </div>
          </section>

          <section aria-label="Filters" className="space-y-6">
            {(selectedFilters.studyType.length > 0 ||
              selectedFilters.dataTypes.length > 0 ||
              selectedFilters.diseaseArea.length > 0) && (
              <button
                type="button"
                onClick={() =>
                  setSelectedFilters({
                    studyType: [],
                    dataTypes: [],
                    diseaseArea: [],
                  })
                }
                className="text-sm text-primary hover:underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                aria-label="Clear all filters"
              >
                Clear all filters
              </button>
            )}

            <section aria-label="Filter by study type">
              <FilterSection
                title="Study type"
                icon={<Users className="h-5 w-5" aria-hidden />}
                items={FILTER_OPTIONS.studyType}
                selectedItems={selectedFilters.studyType}
                onFilterChange={(item) => updateFilter("studyType", item)}
                getItemCount={(item) => getCountForType(item, "studyType")}
              />
            </section>

            <section aria-label="Filter by data type">
              <FilterSection
                title="Data type"
                icon={<Dna className="h-5 w-5" aria-hidden />}
                items={FILTER_OPTIONS.dataTypes}
                selectedItems={selectedFilters.dataTypes}
                onFilterChange={(item) => updateFilter("dataTypes", item)}
                getItemCount={(item) => getCountForType(item, "dataTypes")}
              />
            </section>

            <section aria-label="Filter by disease area">
              <FilterSection
                title="Disease area"
                icon={<Activity className="h-5 w-5" aria-hidden />}
                items={FILTER_OPTIONS.diseaseArea}
                selectedItems={selectedFilters.diseaseArea}
                onFilterChange={(item) => updateFilter("diseaseArea", item)}
                getItemCount={(item) => getCountForType(item, "diseaseArea")}
              />
            </section>
          </section>
        </aside>

        <section
          className="lg:col-span-3 space-y-6"
          aria-label="Cohorts and biobank studies results"
          role="region"
        >
          <div
            className="space-y-6"
            role="list"
            aria-label={`${filtered.length} resources found`}
          >
            {filtered.map((item) => (
              <article key={item.title} role="listitem">
                <Card className="bg-muted border border-neutral rounded-lg shadow-xs hover:shadow-md transition-shadow">
                  <CardHeader className="bg-muted p-4">
                    <CardTitle className="text-lg font-medium text-primary hover:underline">
                      {/*
                        Snyk Code javascript/DOMXSS on this href is a false
                        positive. `item.link` (and `item.SND` below) come from a
                        static, repo-committed JSON asset imported at build time —
                        not a user-, URL-, or network-controlled source — and
                        sanitizeURL() enforces an http/https allowlist, collapsing
                        javascript:/data:/etc. to "#" (unit-tested in
                        security-utils.test.ts). Dismissed in the Snyk platform.
                      */}
                      <a
                        href={sanitizeURL(item.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                        aria-label={`Visit ${item.title} (opens in new tab)`}
                      >
                        {item.title}
                      </a>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="bg-card p-4">
                    <p className="text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    <div className="flex flex-col gap-3">
                      {item.SND && (
                        <a
                          href={sanitizeURL(item.SND)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full text-black ${TAG_COLOURS.snd} hover:opacity-90 self-start transition-opacity duration-100 focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                          aria-label={`View SND metadata for ${item.title} (opens in new tab)`}
                        >
                          SND Metadata
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20.092"
                            className="shrink-0"
                            aria-hidden="true"
                            role="presentation"
                          >
                            <path d="m12 0 2.561 2.537-6.975 6.976 2.828 2.828 6.988-6.988L20 7.927 19.998 0H12z" />
                            <path d="M9 4.092v-2H0v18h18v-9h-2v7H2v-14h7z" />
                          </svg>
                        </a>
                      )}
                      <div
                        className="flex flex-wrap gap-2"
                        role="list"
                        aria-label="Resource type and data types"
                      >
                        <span
                          className={`px-3 py-1 rounded-full text-sm shrink-0 ${TAG_COLOURS.tag}`}
                          role="listitem"
                        >
                          {STUDY_TYPE_LABELS[item.study_type]}
                        </span>
                        {item.data_types.map((dt) => (
                          <span
                            key={dt}
                            className={`px-3 py-1 rounded-full text-sm shrink-0 ${TAG_COLOURS.tag}`}
                            role="listitem"
                          >
                            {DATA_TYPE_LABELS[dt]}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </article>
            ))}
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No matching cohorts or studies found. Try adjusting your search
                or filters.
              </p>
            )}
          </div>
        </section>
      </div>

      <div
        className="mt-8 p-4 bg-muted/50 border border-neutral rounded-lg text-sm text-muted-foreground"
        role="complementary"
        aria-label="Context on Swedish data linkage"
      >
        <p className="mb-2">
          In Sweden, cohort and biobank data are often linked with clinical
          registries and national health registers, creating rich datasets for
          precision medicine research. Researchers can apply for access through
          the responsible institutions or national catalogues.
        </p>
        <p>
          For a broader catalogue of Swedish research data, see the{" "}
          <a
            href="https://snd.se/en/catalogue/search"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="Swedish National Data Service catalogue search (opens in new tab)"
          >
            Swedish National Data Service (SND) search
          </a>
          .
        </p>
      </div>

      <LastUpdated date="23-03-2026" />
    </div>
  );
}
