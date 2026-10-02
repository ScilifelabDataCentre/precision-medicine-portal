import type { ComponentPropsWithoutRef, ReactElement } from "react";
import Image from "next/image";
import { ExternalLink as ExternalLinkIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ILAB_URL, IMAGES, PMSC_EMAIL } from "./content";

type Tone = "surface" | "alt" | "lime" | "teal";

const TONE: Record<Tone, string> = {
  surface: "bg-surface text-ink",
  alt: "bg-surface-alt text-ink",
  lime: "bg-lime-25 text-ink",
  teal: "bg-teal text-on-teal",
};

/**
 * A full-bleed section. It escapes the root layout's padded `<main>` with a
 * negative margin rather than the landing hero's `left-1/2 -translate-x-1/2`:
 * half of an odd content width is a half pixel, and the translated band then
 * leaves a 1px pale seam at its left edge (seen at 375px). The margin resolves
 * to whole pixels. The colour is painted once, on the element that also
 * contains the text, so pa11y reads the real contrast. Content locks
 * at `content-max` with a `space-16` / `space-24` gutter, and the section is
 * padded `space-64` on phones and `space-96` from `md`.
 */
export function Band({
  as: Tag = "section",
  tone = "surface",
  className,
  innerClassName,
  children,
  ...props
}: ComponentPropsWithoutRef<"section"> & {
  /** `div` when the band wraps sections of its own. */
  as?: "section" | "div";
  tone?: Tone;
  innerClassName?: string;
}): ReactElement {
  return (
    <Tag
      className={cn(
        "mx-[calc(50%-50vw)] w-screen py-16 md:py-24",
        TONE[tone],
        className,
      )}
      {...props}
    >
      <div className={cn("mx-auto max-w-content px-4 sm:px-6", innerClassName)}>
        {children}
      </div>
    </Tag>
  );
}

/**
 * The request route: iLab as the primary action, email as the secondary one.
 * The address is also printed as text, because a 37-character address does
 * not fit a pill on a phone and people copy it into their own mail client.
 * The pills may wrap: at 200% text a 375px phone cannot fit "Submit a request
 * in iLab" on one line, and the root's `overflow-x: clip` would cut it off.
 */
const pillWrap = "h-auto max-w-full py-2 text-center whitespace-normal";

export function RequestActions({
  onTeal = false,
  className,
}: {
  /** Use the on-band button variants for a `teal` band. */
  onTeal?: boolean;
  className?: string;
}): ReactElement {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          asChild
          variant={onTeal ? "band" : "default"}
          className={pillWrap}
        >
          <a
            href={ILAB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Submit a request in iLab (opens in new tab)"
          >
            Submit a request in iLab
            <ExternalLinkIcon aria-hidden="true" />
          </a>
        </Button>
        <Button
          asChild
          variant={onTeal ? "band-outline" : "outline"}
          className={pillWrap}
        >
          <a href={`mailto:${PMSC_EMAIL}`}>Email the PMSC team</a>
        </Button>
      </div>
      <p
        className={cn(
          "text-caption",
          onTeal ? "text-teal-25" : "text-ink-muted",
        )}
      >
        Email:{" "}
        <span className="block wrap-anywhere sm:inline">{PMSC_EMAIL}</span>
      </p>
    </div>
  );
}

/**
 * One of the page's two images, or nothing until its file exists (see
 * `IMAGES` in content.tsx for what each should show). Media sit on the page
 * at `radius-lg`; the dashboard screenshot, as product imagery, also takes
 * `shadow-media`.
 */
export function PageImage({
  kind,
  sizes,
  className,
}: {
  kind: keyof typeof IMAGES;
  /** The `sizes` hint for the layout slot the image fills. */
  sizes: string;
  className?: string;
}): ReactElement | null {
  const image = IMAGES[kind];
  if (!image.src) return null;
  return (
    <figure className={className}>
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        sizes={sizes}
        className={cn(
          "h-auto w-full rounded-lg",
          kind === "dashboard" && "shadow-media",
        )}
      />
    </figure>
  );
}

/** Whether an image has a file yet, so a layout can leave room only for it. */
export function hasImage(kind: keyof typeof IMAGES): boolean {
  return IMAGES[kind].src !== null;
}
