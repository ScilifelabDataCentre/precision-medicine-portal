import type { ReactElement } from "react";
import { ArrowDown, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  CONVERGENCE,
  DIAGRAM_CAPTION,
  RECORD_TRACK,
  SAMPLE_TRACK,
  type Step,
} from "./content";

type Track = "sample" | "record";

const STAGES = SAMPLE_TRACK.steps.map((sample, i) => ({
  sample,
  record: RECORD_TRACK.steps[i],
}));

/**
 * The page's one idea, drawn as its brand illustration: a sample and its
 * record travel together, stage by stage, and both end in the dashboard.
 *
 * Each stage is one object, its sample half in full lime and its record half
 * in full aqua, joined edge to edge: the join is the tie, so the diagram needs
 * no connector lines. Text on both fills is `ink` (9.2:1 on lime, 5.2:1 on
 * aqua); grape, the page's one colour pop, marks where the tracks meet.
 *
 * The list is ordered by stage, so a screen reader hears each sample step next
 * to the record it creates. The layout follows the container, not the
 * viewport: from 56rem the stages run left to right with the tracks as rows,
 * as in the PMSC team's figure; from 32rem each stage is a row with its two
 * halves side by side; narrower than that the halves stack, so a 320px phone
 * still gives every line its full width.
 */
export function TwoTrackDiagram({
  className,
}: {
  className?: string;
}): ReactElement {
  return (
    <figure className={cn("@container w-full", className)}>
      <div className="grid gap-y-4 @4xl:grid-cols-[7rem_repeat(4,minmax(0,1fr))] @4xl:grid-rows-[auto_auto_auto] @4xl:gap-x-6 @4xl:gap-y-0">
        <TrackLabel
          track="sample"
          className="hidden @4xl:col-start-1 @4xl:row-start-1 @4xl:flex"
        />
        <TrackLabel
          track="record"
          className="hidden @4xl:col-start-1 @4xl:row-start-2 @4xl:flex"
        />

        <ol className="grid gap-4 @4xl:col-[2/-1] @4xl:row-[1/3] @4xl:grid-cols-subgrid @4xl:grid-rows-subgrid @4xl:gap-x-6 @4xl:gap-y-0">
          {STAGES.map((stage, i) => (
            <li
              key={stage.sample.title}
              className="grid @lg:grid-cols-2 @4xl:row-[1/3] @4xl:grid-cols-1 @4xl:grid-rows-subgrid"
            >
              <Half
                track="sample"
                step={stage.sample}
                n={i + 1}
                last={i === STAGES.length - 1}
              />
              <Half track="record" step={stage.record} />
            </li>
          ))}
        </ol>

        <div className="relative mt-12 @4xl:col-[2/-1] @4xl:row-start-3 @4xl:mt-16">
          <ArrowDown
            aria-hidden="true"
            className="absolute bottom-full left-1/2 mb-3 size-6 -translate-x-1/2 text-gray-dark @4xl:mb-6"
          />
          <div className="rounded-md border border-transparent bg-grape p-6 text-on-teal @3xl:flex @3xl:items-baseline @3xl:gap-8 @3xl:p-8">
            <p className="text-title-3 @3xl:shrink-0">
              <span className="sr-only">Both tracks lead to the </span>
              {CONVERGENCE.title}
            </p>
            <p className="mt-2 text-ui @3xl:mt-0">{CONVERGENCE.body}</p>
          </div>
        </div>
      </div>

      <figcaption className="mt-12 max-w-measure font-serif text-body text-ink-muted italic">
        {DIAGRAM_CAPTION}
      </figcaption>
    </figure>
  );
}

function TrackLabel({
  track,
  className,
}: {
  track: Track;
  className?: string;
}): ReactElement {
  return (
    <p
      aria-hidden="true"
      className={cn("items-center text-headline text-ink", className)}
    >
      {track === "sample" ? SAMPLE_TRACK.title : RECORD_TRACK.title}
    </p>
  );
}

/**
 * One half of a stage. The sample half carries the stage number, the stage's
 * outer top corners and, from 56rem, the chevron to the next stage, centred on
 * the numbered row; the record half the bottom corners (or, side by side, the
 * right ones), so the two read as a single joined object. A transparent
 * border keeps each shape visible in forced-colours mode.
 */
function Half({
  track,
  step,
  n,
  last = false,
}: {
  track: Track;
  step: Step;
  n?: number;
  last?: boolean;
}): ReactElement {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-1 border border-transparent p-6 text-ink",
        track === "sample"
          ? "rounded-t-md bg-lime @lg:rounded-l-md @lg:rounded-tr-none @4xl:rounded-t-md @4xl:rounded-bl-none"
          : "rounded-b-md bg-aqua @lg:rounded-r-md @lg:rounded-bl-none @4xl:rounded-b-md @4xl:rounded-tr-none",
      )}
    >
      {n !== undefined ? (
        <span className="mb-2 text-title-2 tabular-nums" aria-hidden="true">
          {n}
        </span>
      ) : (
        /* Side by side, the record half keeps the numeral's line empty so
           each step title sits level with its pair. */
        <span
          aria-hidden="true"
          className="mb-2 hidden text-title-2 @lg:block @4xl:hidden"
        >
          &nbsp;
        </span>
      )}
      {/* Visible on narrow layouts, where the halves carry their own track
          name; from 56rem the row labels show it and this stays for readers. */}
      <span className="text-caption @4xl:sr-only">
        {track === "sample" ? SAMPLE_TRACK.title : RECORD_TRACK.title}
      </span>
      <span className="sr-only">: </span>
      <span className="text-label text-balance @4xl:text-headline">
        {step.title}
      </span>
      <span className="text-ui">{step.body}</span>
      {n !== undefined && !last && (
        <ChevronRight
          aria-hidden="true"
          className="absolute top-1/2 left-full ml-0.5 hidden size-5 -translate-y-1/2 text-gray-dark @4xl:block"
        />
      )}
    </div>
  );
}
