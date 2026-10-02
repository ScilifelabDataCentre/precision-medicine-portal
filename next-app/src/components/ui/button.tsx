import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * Press feedback lives on the press (DESIGN.md Motion): the pill scales to 0.97
 * where motion is allowed, and every variant also takes its hover colour while
 * pressed, so touch and reduced-motion users still see the press.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill text-label focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 transition-[color,background-color,border-color,scale] duration-160 ease-out active:duration-100 motion-safe:active:scale-[0.97]",
  {
    variants: {
      variant: {
        default: "bg-teal text-on-teal hover:bg-ink active:bg-ink",
        destructive: "bg-danger text-on-teal hover:bg-ink active:bg-ink",
        outline:
          "border-2 border-teal bg-transparent text-teal hover:bg-teal-25 active:bg-teal-25",
        ghost: "bg-transparent text-ink hover:bg-teal-25 active:bg-teal-25",
        link: "text-link underline underline-offset-4 hover:decoration-2 active:decoration-2",
        /* On `teal` and `grape` bands, per DESIGN.md's Button spec. */
        band: "bg-lime text-on-lime hover:bg-surface active:bg-surface focus-visible:outline-focus-inverse",
        "band-outline":
          "border-2 border-on-teal bg-transparent text-on-teal hover:bg-on-teal hover:text-teal active:bg-on-teal active:text-teal focus-visible:outline-focus-inverse",
      },
      size: {
        default: "min-h-target px-6",
        /* An icon on its own is 24px (DESIGN.md: 20px beside text). */
        icon: "size-target [&_svg]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
