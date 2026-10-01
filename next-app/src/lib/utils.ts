import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// These names mirror the tokens in src/app/pmp-theme.css and must be updated with it.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display",
        "title-1",
        "title-2",
        "title-3",
        "headline",
        "lead",
        "body",
        "ui",
        "label",
        "caption",
        "code",
      ],
      radius: ["pill"],
      spacing: ["header", "target"],
      shadow: ["media", "float"],
      container: ["content", "measure"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
