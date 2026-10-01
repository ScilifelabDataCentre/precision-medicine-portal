import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-pill border border-transparent px-3 py-0.5 text-caption font-bold",
  {
    variants: {
      variant: {
        default: "bg-teal-25 text-ink",
        secondary: "bg-aqua-25 text-ink",
        destructive: "bg-danger-soft text-danger",
        outline: "border-line-strong text-ink",
        accent: "bg-lime-25 text-ink",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
