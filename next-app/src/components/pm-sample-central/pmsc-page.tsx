import type { ReactElement, ReactNode } from "react";

import {
  DATA_STRUCTURE,
  FOLLOW,
  LEAD,
  PILOTS,
  PMSC_TITLE,
  PREPARATION,
  RECORD_TRACK,
  REQUEST,
  SAMPLE_TRACK,
  SERVICES,
  TAILORED,
  WHY,
  PMSC_EMAIL,
  type PilotStudy,
} from "./content";
import { Band, PageImage, RequestActions } from "./page-parts";
import { TwoTrackDiagram } from "./two-track-diagram";
import { LastUpdated } from "@/components/common/last-updated";

/**
 * The PM Sample Central page, laid out the way its content describes the
 * infrastructure.
 *
 * - One opening holds the title, the request and the two-track diagram, so
 *   the first screen shows the mechanism, not just a headline.
 * - "The two tracks run in parallel", so the page runs them in parallel: The
 *   sample and The record sit side by side from `lg`. The diagram above is
 *   the page's one bold moment; the columns stay quiet.
 * - The services are a sheet people choose from: a `surface` panel on the
 *   `surface-alt` band, the one place the page uses depth.
 * - The pilot studies are a register, one row per study, so the cancers read
 *   down one column.
 * - The request is the one teal band; following a project closes the page.
 * - The record and the follow section end on a next step (`NextStep`), and
 *   hairlines turn `line-strong` under `prefers-contrast: more`.
 */
export function PmscPage(): ReactElement {
  return (
    <>
      <Band aria-labelledby="pmsc-title" className="pt-16 md:pt-32">
        <h1
          id="pmsc-title"
          className="max-w-5xl text-title-1 text-balance wrap-break-word md:text-display"
        >
          {PMSC_TITLE}
        </h1>
        <div className="mt-8 lg:flex lg:items-end lg:justify-between lg:gap-16">
          <p className="max-w-measure font-serif text-lead">{LEAD}</p>
          <RequestActions className="mt-8 lg:mt-0 lg:w-80 lg:shrink-0" />
        </div>

        <section
          id="what-we-do"
          aria-labelledby="what-we-do-heading"
          className="mt-16 md:mt-24"
        >
          <h2 id="what-we-do-heading" className="text-title-2 text-balance">
            What do we do?
          </h2>
          <TwoTrackDiagram className="mt-8 md:mt-12" />
        </section>
      </Band>

      <Band
        as="div"
        tone="alt"
        innerClassName="grid gap-16 lg:grid-cols-2 lg:gap-x-16"
      >
        <section id="the-sample" aria-labelledby="the-sample-heading">
          <h2 id="the-sample-heading" className="text-title-2 text-balance">
            {SAMPLE_TRACK.title}
          </h2>

          <h3 className="mt-8 text-title-3 text-balance">
            {PREPARATION.title}
          </h3>
          <div className="mt-4 max-w-measure space-y-6 font-serif text-body">
            {PREPARATION.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
          <PageImage
            kind="lab"
            sizes="(min-width: 64rem) 34rem, 100vw"
            className="mt-8"
          />

          <h3 className="mt-16 text-title-3 text-balance">{SERVICES.title}</h3>
          <p className="mt-4 max-w-measure font-serif text-body">
            {SERVICES.intro}
          </p>
          {/* The sheet runs in two columns once it has the width, read down
              each column, so the two tracks stay close in length. The
              transparent border draws in forced colours and turns
              `line-strong` under higher contrast. */}
          <div className="@container mt-8 rounded-md border border-transparent bg-surface p-6 sm:p-8 contrast-more:border-line-strong">
            <p className="text-label">{SERVICES.listIntro}</p>
            <ul className="mt-4 @md:columns-2 @md:gap-x-8">
              {SERVICES.items.map((item) => (
                <li
                  key={item}
                  className="break-inside-avoid border-t border-line py-3 text-ui text-ink contrast-more:border-line-strong"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 max-w-measure text-ui text-ink-muted">
            {SERVICES.outro}
          </p>

          <h3 className="mt-16 text-title-3 text-balance">{TAILORED.title}</h3>
          <p className="mt-4 max-w-measure font-serif text-body">
            {TAILORED.body}
          </p>
        </section>

        <section id="the-record" aria-labelledby="the-record-heading">
          <h2 id="the-record-heading" className="text-title-2 text-balance">
            {RECORD_TRACK.title}
          </h2>

          <h3 className="mt-8 text-title-3 text-balance">
            {DATA_STRUCTURE.title}
          </h3>
          <p className="mt-4 max-w-measure font-serif text-body">
            {DATA_STRUCTURE.intro}
          </p>
          <ul className="mt-12 space-y-12">
            {DATA_STRUCTURE.tools.map((tool) => (
              <li
                key={tool.title}
                className="border-t border-line contrast-more:border-line-strong pt-6"
              >
                <h4 className="text-headline text-balance">{tool.title}</h4>
                <p className="mt-3 max-w-measure font-serif text-body">
                  {tool.body}
                </p>
              </li>
            ))}
          </ul>
          <NextStep href="#follow">{FOLLOW.title}</NextStep>
        </section>
      </Band>

      <Band id="pilots" aria-labelledby="pilots-heading">
        <div className="lg:grid lg:grid-cols-3 lg:gap-x-12">
          <h2 id="pilots-heading" className="text-title-2 text-balance">
            {PILOTS.title}
          </h2>
          <p className="mt-6 max-w-measure font-serif text-body lg:col-span-2 lg:mt-0">
            {PILOTS.intro}
          </p>
        </div>
        <ul className="mt-12 md:mt-16">
          {PILOTS.studies.map((study) => (
            <li
              key={study.name}
              className="grid gap-4 border-t border-line contrast-more:border-line-strong py-8 last:border-b lg:grid-cols-3 lg:gap-x-12 lg:py-12"
            >
              <div>
                <h3 className="text-title-3 text-balance">{study.name}</h3>
                <StudyFacts study={study} />
              </div>
              <p className="max-w-measure font-serif text-body lg:col-span-2">
                {study.body}
              </p>
            </li>
          ))}
        </ul>
      </Band>

      <Band
        tone="alt"
        id="why"
        aria-labelledby="why-heading"
        innerClassName="lg:grid lg:grid-cols-3 lg:gap-x-12"
      >
        <h2 id="why-heading" className="text-title-2 text-balance">
          Why is it needed?
        </h2>
        <div className="mt-8 max-w-measure space-y-6 font-serif text-body lg:col-span-2 lg:mt-0">
          {WHY.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </Band>

      <Band
        tone="teal"
        id="request"
        aria-labelledby="request-heading"
        innerClassName="lg:grid lg:grid-cols-2 lg:gap-x-16"
      >
        <div>
          <h2
            id="request-heading"
            className="text-title-2 text-balance text-on-teal"
          >
            {REQUEST.title}
          </h2>
          <p className="mt-6 max-w-measure font-serif text-body">
            {REQUEST.intro}
          </p>
        </div>
        <div className="mt-12 lg:mt-0 lg:self-end">
          <p className="font-serif text-body">{REQUEST.routesIntro}</p>
          <RequestActions onTeal className="mt-4" />
          <p className="mt-8 max-w-measure text-ui text-teal-25">
            {REQUEST.next}
          </p>
        </div>
      </Band>

      <Band
        id="follow"
        aria-labelledby="follow-heading"
        innerClassName="lg:grid lg:grid-cols-2 lg:gap-x-16"
      >
        <div>
          <h2 id="follow-heading" className="text-title-2 text-balance">
            {FOLLOW.title}
          </h2>
          <p className="mt-6 max-w-measure font-serif text-body">
            {FOLLOW.intro[0]}
          </p>
        </div>
        <div className="mt-12 lg:mt-0">
          <p className="max-w-measure font-serif text-body">
            {FOLLOW.intro[1]}
          </p>
          <ul className="mt-4 max-w-measure">
            {FOLLOW.items.map((item) => (
              <li
                key={item}
                className="border-t border-line contrast-more:border-line-strong py-3 text-ui text-ink last:border-b"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-measure font-serif text-body">
            {FOLLOW.outro}
          </p>
          <PageImage
            kind="dashboard"
            sizes="(min-width: 64rem) 34rem, 100vw"
            className="mt-12"
          />
          <NextStep href={`mailto:${PMSC_EMAIL}`}>Email the PMSC team</NextStep>
        </div>
        <LastUpdated
          date="2026-10-02"
          className="mt-16 py-0 text-left lg:col-span-2"
        />
      </Band>
    </>
  );
}

/** A study's cancer and partner institutions, one per line, labelled. */
function StudyFacts({ study }: { study: PilotStudy }): ReactElement | null {
  if (!study.cancer && !study.partners) return null;
  return (
    <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-caption">
      {study.cancer && (
        <>
          <dt className="text-ink-muted">Cancer</dt>
          <dd className="text-ink">{study.cancer}</dd>
        </>
      )}
      {study.partners && (
        <>
          <dt className="text-ink-muted">Partners</dt>
          <dd className="text-ink">
            <ul>
              {study.partners.map((partner) => (
                <li key={partner}>{partner}</li>
              ))}
            </ul>
          </dd>
        </>
      )}
    </dl>
  );
}

/**
 * The one clear next step a section ends on (DESIGN.md: "Where can I go").
 * It reuses the label of where it leads, so it promises exactly what it does.
 */
function NextStep({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}): ReactElement {
  return (
    <p className="mt-12">
      <a
        href={href}
        className="inline-flex min-h-target items-center rounded-sm text-label text-link underline decoration-1 underline-offset-4 hover:decoration-2 active:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        {children}
      </a>
    </p>
  );
}
