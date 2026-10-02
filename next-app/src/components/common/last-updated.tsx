import * as React from "react";
import { cn } from "@/lib/utils";

export interface LastUpdatedProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The date as `YYYY-MM-DD` or, as older pages pass it, `DD-MM-YYYY`. */
  date?: string;
}

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/**
 * Normalise either accepted form to ISO `YYYY-MM-DD`; anything else comes back
 * unchanged so a typo still renders rather than throwing.
 */
export function toIsoDate(date: string): string {
  const dmy = /^(\d{2})-(\d{2})-(\d{4})$/.exec(date);
  return dmy ? `${dmy[3]}-${dmy[2]}-${dmy[1]}` : date;
}

/**
 * "Last updated on 2 October 2026". DESIGN.md formats dates for the page's
 * language with `Intl`; the `<time>` element keeps the machine-readable date.
 */
const LastUpdated = React.forwardRef<HTMLDivElement, LastUpdatedProps>(
  ({ className, date = "2024-10-09", ...props }, ref) => {
    const iso = toIsoDate(date);
    const parsed = new Date(`${iso}T00:00:00Z`);
    const label = Number.isNaN(parsed.getTime())
      ? date
      : dateFormat.format(parsed);
    return (
      <div
        ref={ref}
        className={cn(
          "mt-auto py-4 text-center text-caption text-ink-muted",
          className,
        )}
        {...props}
      >
        Last updated on <time dateTime={iso}>{label}</time>
      </div>
    );
  },
);
LastUpdated.displayName = "LastUpdated";

export { LastUpdated };
