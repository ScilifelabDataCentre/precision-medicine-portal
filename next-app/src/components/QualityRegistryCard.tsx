import { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Safe } from "@/components/common/SafeContent";
import { MetadataLink } from "@/components/common/MetadataLink";
import { IRegistrySource } from "@/interfaces/types";
import { isSameDestination } from "@/lib/url-utils";

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

  // Show the catalogue link only when it adds something: a source label, and a
  // destination that is not just the registry's own site again. Deliberately
  // not restricted to a known set of sources — the data decides, so adding a
  // catalogue is a data change rather than a change here.
  const metadataUrl =
    registry.metadata_source &&
    !isSameDestination(registry.metadata_url, registry.url)
      ? registry.metadata_url
      : undefined;

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
          {metadataUrl && (
            <div className="mb-3">
              <MetadataLink
                href={metadataUrl}
                ariaLabel={`View metadata for ${registry.name} at ${registry.metadata_source} (opens in new tab)`}
              >
                Metadata: {registry.metadata_source}
              </MetadataLink>
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
