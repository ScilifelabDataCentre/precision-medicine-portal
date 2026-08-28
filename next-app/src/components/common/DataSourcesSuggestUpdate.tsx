import type { ReactElement } from "react";

/**
 * Note under each data-sources intro: the list is curated and may be incomplete,
 * with a mailto for suggesting updates. Kept in one place so the three listing
 * pages cannot drift apart in wording.
 */
export function DataSourcesSuggestUpdate(): ReactElement {
  return (
    <p role="note" aria-label="Data sources update notice">
      These resources are reviewed and updated regularly. If you notice
      something that needs updating or know of a relevant resource,{" "}
      <a
        href="mailto:precisionmedicine@scilifelab.se"
        className="text-primary underline hover:text-black focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
        aria-label="Let us know by emailing precisionmedicine@scilifelab.se"
      >
        please let us know
      </a>
      .
    </p>
  );
}
