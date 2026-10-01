import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill text-label focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transition-[color,background-color,border-color,transform] duration-100 ease-out motion-safe:active:scale-[0.97]",
  {
    variants: {
      variant: {
        default: "bg-teal text-on-teal hover:bg-ink",
        destructive: "bg-danger text-on-teal hover:bg-ink",
        outline:
          "border-2 border-teal bg-transparent text-teal hover:bg-teal-25",
        ghost: "bg-transparent text-ink hover:bg-teal-25",
        link: "text-link underline underline-offset-4 hover:decoration-2",
      },
      size: {
        default: "min-h-target px-6",
        icon: "size-target",
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
