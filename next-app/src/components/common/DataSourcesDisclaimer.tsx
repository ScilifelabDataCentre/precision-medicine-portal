import Link from "next/link";
import type { ReactElement } from "react";

export function DataSourcesDisclaimer(): ReactElement {
  return (
    <p
      className="mt-8 text-sm text-muted-foreground text-center max-w-3xl mx-auto"
      role="note"
      aria-label="Data sources curation notice"
    >
      The Data Centre manually collects and summarises the displayed data
      sources. We strive to keep the information current and accurate. If a
      source is missing or mislabelled, please let us know via the{" "}
      <Link
        href="/contact"
        className="text-primary hover:underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
        aria-label="Go to contact form"
      >
        contact form
      </Link>
      .
    </p>
  );
}
