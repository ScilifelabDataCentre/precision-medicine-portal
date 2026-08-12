import { Safe } from "@/components/common/SafeContent";

/**
 * Pill-shaped link to an external metadata/catalogue record for a data source
 * (e.g. an SND study page, or an SKR quality-registry archive entry).
 *
 * Shared by the quality-registries and swedish-research-cohorts pages. The
 * label and the accessible name are both derived from `source` here rather than
 * passed in, so the two pages cannot drift apart in wording again. The href
 * goes through `Safe.Url`, so these externally-sourced URLs are held to an
 * http/https allowlist and unsafe schemes collapse to "#".
 */
interface MetadataLinkProps {
  /** Destination URL. Sanitised before it reaches the DOM. */
  href: string;
  /** Catalogue the record lives in, e.g. `SND` or `SKR`. Used in the label. */
  source: string;
  /** Name of the registry or cohort, used to disambiguate the link for screen readers. */
  resourceName: string;
}

export const MetadataLink = ({
  href,
  source,
  resourceName,
}: MetadataLinkProps) => (
  <Safe.Url
    url={href}
    aria-label={`View ${source} metadata for ${resourceName} (opens in new tab)`}
    className="inline-flex w-fit items-center gap-2 rounded-full bg-metadata px-3 py-1 text-sm font-medium text-metadata-foreground transition-opacity duration-100 hover:opacity-90 focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2"
  >
    {source} Metadata
    {/* External-link glyph. Inherits the label colour and scales with it. */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20.092"
      width="20"
      height="20.092"
      fill="currentColor"
      className="shrink-0"
      aria-hidden="true"
    >
      <path d="m12 0 2.561 2.537-6.975 6.976 2.828 2.828 6.988-6.988L20 7.927 19.998 0H12z" />
      <path d="M9 4.092v-2H0v18h18v-9h-2v7H2v-14h7z" />
    </svg>
  </Safe.Url>
);
