import type { ReactElement } from "react";

import { linkClassName } from "@/lib/styles";

/**
 * Note under the intro on each data-sources listing page: the lists are
 * hand-assembled by the Data Centre and so may have gaps, with an address for
 * reporting them. Kept in one place so the three listing pages cannot drift
 * apart in wording.
 *
 * The address is the link's visible text, matching every other mailto in the
 * app (/contact, /accessibility, /omop-cdm). That keeps the accessible name a
 * superset of the visible label (WCAG 2.5.3 Label in Name) and leaves the
 * address readable to anyone whose browser has no mailto handler.
 *
 * It carries its own `mb-6`, so a page adds it after `<p role="doc-abstract"
 * className="mb-6">` with no wrapper: the adjacent margins collapse and the
 * spacing stays even.
 */
export function DataSourcesSuggestUpdate(): ReactElement {
  return (
    <p
      className="mb-6 text-sm text-muted-foreground"
      role="note"
      aria-label="Data sources update notice"
    >
      These resources are manually collected by the Data Centre and reviewed
      regularly. If you notice something that needs updating, or know of a
      relevant resource that is missing, please let us know at{" "}
      <a
        href="mailto:precisionmedicine@scilifelab.se"
        className={linkClassName}
        aria-label="Send email to precisionmedicine@scilifelab.se"
      >
        precisionmedicine@scilifelab.se
      </a>
      .
    </p>
  );
}
