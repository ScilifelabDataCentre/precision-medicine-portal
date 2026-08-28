import type { ReactElement } from "react";

/**
 * Sidebar notice about what accessing the listed data typically requires.
 * Shown alongside the search and filter controls on every data sources listing
 * page, so the wording stays in one place.
 */
export function DataAccessNotice(): ReactElement {
  return (
    <div
      className="mx-auto w-full max-w-lg rounded-lg border border-neutral bg-muted p-4 text-left text-sm text-foreground"
      role="note"
      aria-label="Data access information"
    >
      To access data, researchers may need to obtain ethical approval, submit
      data requests, and set up data management agreements.
    </div>
  );
}
