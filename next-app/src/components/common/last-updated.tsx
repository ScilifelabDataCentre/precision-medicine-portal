import * as React from "react";
import { cn } from "@/lib/utils";

export interface LastUpdatedProps extends React.HTMLAttributes<HTMLDivElement> {
  date?: string;
}

const LastUpdated = React.forwardRef<HTMLDivElement, LastUpdatedProps>(
  ({ className, date = "2024-10-09", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mt-auto py-4 text-center text-sm text-muted-foreground",
          className,
        )}
        {...props}
      >
        Last updated on {date}
      </div>
    );
  },
);
LastUpdated.displayName = "LastUpdated";

export { LastUpdated };
