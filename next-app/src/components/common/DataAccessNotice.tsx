import type { ReactElement } from "react";

/**
 * Sidebar notice about what accessing the listed data typically requires.
 * Shown alongside the search and filter controls on every data sources listing
 * page, so the wording stays in one place.
 */
export function DataAccessNotice(): ReactElement {
  return (
    <div
      className="w-full max-w-lg bg-muted border border-neutral rounded-lg p-4 text-sm text-foreground text-left mx-auto"
      role="note"
      aria-label="Data access information"
    >
      To access data, researchers may need to obtain ethical approval, submit
      data requests, and set up data management agreements.
    </div>
  );
}
