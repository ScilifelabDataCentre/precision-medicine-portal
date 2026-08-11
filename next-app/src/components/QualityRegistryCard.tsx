import { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Safe } from "@/components/common/SafeContent";
import { IRegistrySource } from "@/interfaces/types";

/**
 * QualityRegistryCard Component
 *
 * This component is SPECIFIC to the Quality Registries page (/data-sources/quality-registries)
 * and should NOT be used elsewhere in the application.
 *
 * Features specific to quality registries:
 * - Displays registry information with Swedish-English term translation
 * - Handles search term highlighting with medical term expansion
 * - Shows organization links specific to Swedish registry centers
 * - Displays category information for quality registries
 * - Uses Safe HTML rendering for security (project requirement)
 *
 * Dependencies on quality registry page:
 * - expandSearchTerms function (Swedish-English medical terms)
 * - highlightSearchTerms function (search highlighting)
 * - ORGANISATION_LINKS constant (registry-specific URLs)
 */

interface QualityRegistryCardProps {
  registry: IRegistrySource;
  searchTerms: string[];
  expandSearchTerms: (terms: string[]) => string[];
  highlightSearchTerms: (text: string, terms: string[]) => string;
  organisationLinks: Record<string, string>;
}

/** Compare URLs ignoring trailing slash, whitespace, and host casing. */
function normalizeUrl(url?: string): string {
  if (!url) return "";
  const trimmed = url.trim();
  try {
    const parsed = new URL(trimmed);
    return `${parsed.host}${parsed.pathname}`.replace(/\/+$/, "").toLowerCase();
  } catch {
    return trimmed.replace(/\/+$/, "").toLowerCase();
  }
}

export const QualityRegistryCard = ({
  registry,
  searchTerms,
  expandSearchTerms,
  highlightSearchTerms,
  organisationLinks,
}: QualityRegistryCardProps) => {
  const expandedTerms = useMemo(
    () => expandSearchTerms(searchTerms),
    [searchTerms, expandSearchTerms],
  );
  const hasSearch = searchTerms.length > 0;

  const showMetadata =
    !!registry.metadata_url &&
    (registry.metadata_source === "SKR" ||
      registry.metadata_source === "RCC") &&
    normalizeUrl(registry.metadata_url) !== normalizeUrl(registry.url);

  return (
    <article
      key={registry.name}
      className="transition-shadow hover:shadow-md"
      role="listitem"
      aria-label={`Quality registry: ${registry.name}`}
    >
      <Card>
        <CardHeader className="bg-muted">
          <CardTitle className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Website / official registry link (primary) */}
            <Safe.Url
              url={registry.url}
              className="text-xl text-primary hover:underline"
              aria-label={`Visit ${registry.name} website (opens in new tab)`}
            >
              <Safe.HTML
                html={
                  hasSearch
                    ? highlightSearchTerms(registry.name, expandedTerms)
                    : registry.name
                }
                allowedTags={["mark"]}
                allowedAttr={["class"]}
              />
            </Safe.Url>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <Safe.HTML
            html={
              hasSearch
                ? highlightSearchTerms(
                    registry.Information || "Information not available.",
                    expandedTerms,
                  )
                : registry.Information || "Information not available."
            }
            allowedTags={["mark"]}
            allowedAttr={["class"]}
            className="mb-3"
          />
          {showMetadata && (
            <div className="mb-3">
              <Safe.Url
                url={registry.metadata_url!}
                className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full text-black bg-[#649ED2] hover:opacity-90 self-start transition-opacity duration-100 focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label={`View Metadata: ${registry.metadata_source} for ${registry.name} (opens in new tab)`}
              >
                Metadata: {registry.metadata_source}
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
              </Safe.Url>
            </div>
          )}
          <dl
            className="mt-3 flex flex-wrap gap-2"
            aria-label="Registry details"
          >
            <div className="px-3 py-1 bg-muted text-muted-foreground rounded-lg text-sm">
              <dt className="inline font-semibold">Start year:</dt>{" "}
              <dd className="inline">{registry.start_date}</dd>
            </div>
            <div className="px-3 py-1 bg-muted text-muted-foreground rounded-lg text-sm">
              <dt className="inline font-semibold">Organisation:</dt>{" "}
              <dd className="inline">
                <Safe.Url
                  url={organisationLinks[registry.registry_centre[0]]}
                  className="hover:underline"
                  aria-label={`Visit ${registry.registry_centre.join(
                    ", ",
                  )} website (opens in new tab)`}
                >
                  <Safe.HTML
                    html={
                      hasSearch
                        ? highlightSearchTerms(
                            registry.registry_centre.join(", "),
                            expandedTerms,
                          )
                        : registry.registry_centre.join(", ")
                    }
                    allowedTags={["mark"]}
                    allowedAttr={["class"]}
                    className="inline"
                  />
                </Safe.Url>
              </dd>
            </div>
            <div className="px-3 py-1 bg-muted text-muted-foreground rounded-lg text-sm">
              <dt className="inline font-semibold">Category:</dt>{" "}
              <dd className="inline">
                <Safe.HTML
                  html={
                    hasSearch
                      ? highlightSearchTerms(
                          registry.category.join(", "),
                          expandedTerms,
                        )
                      : registry.category.join(", ")
                  }
                  allowedTags={["mark"]}
                  allowedAttr={["class"]}
                  className="inline"
                />
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </article>
  );
};
