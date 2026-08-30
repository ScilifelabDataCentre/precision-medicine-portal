import type { ReactElement, ReactNode } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

import Title from "@/components/common/title";
import { LastUpdated } from "@/components/common/last-updated";
import { Card } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { TwoGatesDiagram } from "@/components/ngp/two-gates-diagram";
import { linkClassName } from "@/lib/styles";

/**
 * Phase headings in "How to apply" are the only pinned element on the site (the
 * site header does not stick), so `top-0` is enough. Sticky from `md` up only:
 * a pinned band on a phone costs more screen than it gives. `bg-background`
 * matches the page canvas, so step text passing underneath is masked.
 */
const phaseHeadingClassName =
  "static z-10 border-b bg-background py-2 md:sticky md:top-0";

/**
 * Card headings sit directly under a section's `h2`, so they are `h3` for a
 * correct document outline but carry the `h4` type scale — inside a card, a
 * full-size `h3` shouts.
 */
const cardHeadingClassName = "text-base sm:text-lg md:text-xl";

/**
 * External link in the house style: opens in a new tab, with an accessible name
 * that says so. Visible text defaults to `label`; pass children only when the
 * two differ, e.g. mid-sentence copy that reads differently from the link's
 * full name.
 */
function ExternalLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children?: ReactNode;
}): ReactElement {
  return (
    <a
      href={href}
      className={linkClassName}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in new tab)`}
    >
      {children ?? label}
    </a>
  );
}

/** "At a glance" rows, in copy order. The skimmer's first stop. */
const GLANCE_ROWS: { label: string; value: ReactNode }[] = [
  {
    label: "Operated by",
    value: "Västra Götalandsregionen, on behalf of Genomic Medicine Sweden",
  },
  {
    label: "Data controller",
    value: "Each healthcare region, for its own data",
  },
  {
    label: "Data types",
    value:
      "Genomic raw data and analysed data, plus associated health and sample metadata",
  },
  {
    label: "Diagnostic areas",
    value:
      "Rare and hereditary disease, solid tumours, haematology, childhood cancer, clinical microbiology, pharmacogenomics",
  },
  {
    label: "Storage",
    value:
      "Object storage across three data centres, 4.5 PB capacity, one storage area per region",
  },
  {
    label: "Compute",
    value: "Elastic cloud compute with encryption keys held by the platform",
  },
  {
    label: "Research access requires",
    value:
      "Ethical approval, plus a disclosure decision from every region holding data you need",
  },
  {
    label: "Existing national approvals",
    value:
      "Rare disease, haematology, childhood cancer. Microbiology in progress",
  },
  {
    label: "Live system status",
    value: (
      <ExternalLink
        href="https://genmed.se/arkitektur/status/"
        label="NGP operational status"
      />
    ),
  },
];

/** The routes for sizing a cohort while no researcher-facing catalogue exists. */
const FINDING_OUT: { title: string; body: ReactNode }[] = [
  {
    title: "Feasibility portal",
    body: "Aggregate counts by diagnosis and molecular criterion, per region. Designed for study sizing, discloses no confidential information, and currently in user testing.",
  },
  {
    title: "GA4GH Beacon",
    body: (
      <>
        The NGP participates in the{" "}
        <ExternalLink
          href="https://docs.genomebeacons.org/"
          label="GA4GH Beacon network"
        />
        , which answers whether a genetic variant is present in a dataset.
        Beacons return presence and count information rather than records.
      </>
    ),
  },
  {
    title: "The Genomic Medicine Centre in the region",
    body: "For anything the automated surfaces cannot answer, the GMC is the authoritative source on what its region holds and in what state.",
  },
  {
    title: "National activity figures",
    body: "Genomic Medicine Sweden publishes annual inventories of NGS-based analyses performed in Sweden. These describe national clinical activity, not NGP holdings, and the difference is currently large. Use them for context, not for cohort estimates.",
  },
];

/** Eligibility checks, each opening with a bolded clause. */
const CHECKLIST: { lead: string; rest: ReactNode }[] = [
  {
    lead: "You have a Swedish research principal (forskningshuvudman).",
    rest: "Ethical approval is granted to a research principal, not to an individual researcher.",
  },
  {
    lead: "Your research question needs clinically generated genomic data.",
    rest: (
      <>
        If a research cohort or an existing open dataset would answer it, that
        route is faster. See{" "}
        <Link
          href="/data-sources/swedish-research-cohorts"
          className={linkClassName}
        >
          Swedish research cohorts
        </Link>{" "}
        on this portal.
      </>
    ),
  },
  {
    lead: "You can name the regions.",
    rest: "Because disclosure is regional, you need to know which Genomic Medicine Centres generated the data you want. A study restricted to one or two regions is significantly faster than a national one.",
  },
  {
    lead: "Your ethical application describes the platform.",
    rest: "The application must describe where data will be processed and by whom. Naming the NGP, its processing environment, and the regions involved at the outset avoids an amendment later.",
  },
  {
    lead: "You are not seeking access for commercial product development.",
    rest: "This page covers the academic and clinical research route. Industry collaborations run through a separate process not covered on this page.",
  },
];

type ResourceLink = {
  /** Visible link text, and the basis of the accessible name. */
  label: string;
  /** Internal paths (leading slash) render as `Link`, everything else opens in a new tab. */
  href: string;
  /** Plain text rendered after the link, e.g. a chapter reference. */
  suffix?: string;
};

/**
 * Canonical references only. Everything a reader must act on is linked inline
 * at the point of need; this block exists for the statutory citations and
 * platform entry points that get copied into ethics applications and shared
 * with research support offices.
 */
const RESOURCE_GROUPS: { title: string; links: ResourceLink[] }[] = [
  {
    title: "Platform",
    links: [
      {
        label: "National Genomics Platform, Genomic Medicine Sweden",
        href: "https://genomicmedicine.se/en/it-informatics/national-genomics-platform/",
      },
      {
        label: "NGP technical documentation and architecture",
        href: "https://genmed.se/",
      },
      {
        label: "NGP operational status",
        href: "https://genmed.se/arkitektur/status/",
      },
      {
        label: "NGP Research Portal",
        href: "https://research-portal.genmed.se/",
      },
      {
        label: "NGP service desk",
        href: "https://cf-bdc.freshservice.com/support/tickets/new",
      },
      {
        label: "NGPIris client",
        href: "https://github.com/genomic-medicine-sweden/NGPIris",
      },
      {
        label: "GMS bioinformatic analysis tools",
        href: "https://genomicmedicine.se/it-informatik/bioinformatiska-analysverktyg/",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        label:
          "Lag (2003:460) om etikprövning av forskning som avser människor",
        href: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-2003460-om-etikprovning-av-forskning-som_sfs-2003-460/",
      },
      {
        label: "Offentlighets- och sekretesslag (2009:400)",
        href: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/offentlighets-och-sekretesslag-2009400_sfs-2009-400/",
        suffix: ", chapter 25",
      },
      {
        label: "Patientdatalag (2008:355)",
        href: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/patientdatalag-2008355_sfs-2008-355/",
      },
      {
        label: "Biobankslag (2023:38)",
        href: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-202338-om-biobanker-i-halso--och-sjukvarden_sfs-2023-38/",
      },
    ],
  },
  {
    title: "On this portal",
    links: [
      {
        label: "Access data for precision medicine research",
        href: "/data-sources",
      },
      {
        label: "Swedish research cohorts",
        href: "/data-sources/swedish-research-cohorts",
      },
      { label: "Quality registries", href: "/data-sources/quality-registries" },
    ],
  },
  {
    title: "SciLifeLab guidance",
    links: [
      {
        label: "Research data management guidelines",
        href: "https://data-guidelines.scilifelab.se/",
      },
      {
        label: "Research involving human data",
        href: "https://data-guidelines.scilifelab.se/topics/research-involving-human-data/",
      },
      {
        label: "Sharing human data",
        href: "https://data-guidelines.scilifelab.se/topics/sharing-human-data/",
      },
    ],
  },
];

export default function NationalGenomicsPlatformPage(): ReactElement {
  return (
    <div className="container max-w-4xl mx-auto py-8">
      <nav aria-label="Breadcrumb navigation" role="navigation">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/data-sources">Data sources</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/data-sources/national-genomics-platform">
                National Genomics Platform
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>

      <div className="flex flex-col gap-y-4">
        <Title level={1}>National Genomics Platform (NGP)</Title>

        <p role="doc-abstract">
          The National Genomics Platform is the shared national infrastructure
          where Sweden&apos;s seven Genomic Medicine Centres store genomic data
          and associated health data generated in clinical care. It is built by
          Genomic Medicine Sweden and operated by Västra Götalandsregionen. For
          researchers, the platform is a route to clinically generated genomic
          data that would otherwise have to be requested region by region, from
          separate systems, in separate formats.
        </p>
        <p>
          Access is possible but it is not open. The healthcare region that
          generated the data is responsible for its data in the NGP, and every
          release is a formal disclosure decision made by that region. This page
          sets out what the platform holds, how to find out whether the cohort
          you need exists, and the sequence of approvals you need before any
          data moves.
        </p>

        <Title level={2}>At a glance</Title>
        <Card className="p-6 shadow-none">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {GLANCE_ROWS.map((row) => (
              <div key={row.label}>
                <dt className="mb-1.5 text-[13px] font-bold uppercase tracking-wider text-primary">
                  {row.label}
                </dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </Card>

        <Title level={2}>What the National Genomics Platform is</Title>
        <p>
          Genomic sequencing in Swedish healthcare happens in the seven Genomic
          Medicine Centres, each attached to a university hospital region.
          Historically each centre kept its data in its own laboratory and
          storage systems, which meant negotiating separately with each for any
          study spanning more than one region.
        </p>
        <p>
          The NGP consolidates that storage without consolidating control.
          Genomic data and metadata are transferred from local laboratory
          information systems over Sjunet or an encrypted connection into a
          storage area reserved for that region.
        </p>
        <p>Researchers authenticate through SWAMID.</p>
        <p>
          The seven Genomic Medicine Centres are GMC Norr (Umeå), GMC Uppsala,
          GMC Karolinska (Stockholm), GMC Örebro, GMC Sydöst (Linköping), GMC
          Väst (Gothenburg) and GMC Syd (Lund and Malmö).
        </p>

        <Title level={2}>What data the platform holds</Title>
        <p>The platform holds two broad classes of information.</p>
        <p>
          <strong>Genomic data</strong>, covering inherited and acquired genetic
          variants, stored as raw unprocessed data, as analysed data describing
          identified genetic changes, or both, together with quality metrics
          from the laboratory and bioinformatic processes.
        </p>
        <p>
          <strong>Associated data about the patient or research subject</strong>
          , which can include identity, diagnosis, the clinical question,
          phenotypic information, and details of the sample and the analysis
          performed.
        </p>
        <p>
          Note that directly identifying information is within scope. The NGP is
          not a de-identified archive, and which form of data a region can
          release to a given project depends on that project&apos;s ethical
          approval.
        </p>
        <p>Assay types present across the diagnostic areas include:</p>
        <ul className="list-disc space-y-1 pl-4" role="list">
          <li role="listitem">
            Whole genome sequencing, short read, in rare and hereditary disease,
            acute leukaemia and childhood cancer
          </li>
          <li role="listitem">Whole exome sequencing in rare disease</li>
          <li role="listitem">
            Targeted panels, including the GMS560 solid tumour panel covering
            roughly 500 genes, and myeloid and lymphoid malignancy panels
          </li>
          <li role="listitem">
            RNA and whole transcriptome sequencing in solid tumours, under
            evaluation for rare disease
          </li>
          <li role="listitem">
            Long read sequencing, under evaluation for repeat expansions and
            complex structural variants
          </li>
          <li role="listitem">
            16S amplicon and shotgun metagenomics in clinical microbiology
          </li>
        </ul>
        <p>
          Retrospective collection covers cancer, rare diagnoses and
          microbiology from 2019 onward.
        </p>
        <div
          className="rounded-lg bg-muted p-6"
          role="note"
          aria-label="What the platform does not hold"
        >
          <p>
            <strong>What the platform does not hold.</strong> Medical images and
            clinical records as such are not stored. Electronic informed consent
            is not yet implemented as a data object, so consent is handled
            through each study&apos;s ethics process rather than queried in the
            platform. Coverage is uneven: national sequencing volumes are far
            larger than what has so far been uploaded, so national activity
            figures are not a guide to NGP holdings.
          </p>
        </div>

        <Title level={2}>Finding out what exists before you apply</Title>
        <p>
          There is no self-service catalogue of NGP holdings for researchers
          today. Building one, as a searchable metadata catalogue, is an active
          development goal. Until it exists, use these routes.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FINDING_OUT.map((card) => (
            <Card key={card.title} className="p-6 shadow-none">
              <Title level={3} className={`${cardHeadingClassName} mb-2`}>
                {card.title}
              </Title>
              <p>{card.body}</p>
            </Card>
          ))}
        </div>

        <Title level={2}>Who controls the data</Title>
        <p>
          This is the part that determines how much work an application takes,
          so it is worth being precise about.
        </p>
        <p>
          Each region is responsible and controls its data, its content and what
          is extracted from it. Västra Götalandsregionen operates the platform
          and hosts the servers, but operating it confers no access to other
          regions&apos; information; VGR acts as a data processor under
          agreement with each region. Only the region itself, and the users that
          region authorises, can reach that region&apos;s data.
        </p>
        <p>For research, the mechanism works like this:</p>
        <ol className="list-decimal space-y-1.5 pl-5" role="list">
          <li role="listitem">
            A region decides that specific data may be disclosed to a specific
            approved project.
          </li>
          <li role="listitem">
            The region applies a <strong>metadata tag</strong> to that data. The
            tag is applied by the region where the data owner sits, and by no
            one else.
          </li>
          <li role="listitem">
            Tagged data becomes visible in a shared area of the platform known
            as <strong>GMC Joint</strong>, which is reachable only by the users
            belonging to that project.
          </li>
        </ol>
        <p>
          Data shared this way is treated in law as a disclosure under the
          Public Access to Information and Secrecy Act (
          <ExternalLink
            href="https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/offentlighets-och-sekretesslag-2009400_sfs-2009-400/"
            label="Offentlighets- och sekretesslagen on riksdagen.se"
          >
            offentlighets- och sekretesslagen
          </ExternalLink>
          ).
        </p>

        {/*
          The page's centrepiece, and the only place the prose column is broken.
          Escapes the padded <main> with the same w-screen idiom the landing hero
          uses; `html { overflow-x: clip }` in globals.css absorbs the
          scrollbar-width overhang. The inner wrapper re-derives main's padding
          so the content tracks the prose column above and below; the two share
          a centre line at every width, and differ in width only below ~944px on
          platforms with classic scrollbars, where the padding here comes off
          100vw while main's comes off the narrower client width. `my-2`
          composes with the content wrapper's `gap-y-4` for the intended 24px.

          The teal has to sit on an ancestor of the text rather than on a
          sibling bleed layer, for two reasons. Contrast checkers resolve a text
          colour against its ancestors' backgrounds, so with the teal on a
          sibling pa11y reads the white statement as 1.05:1 white-on-white and
          fails the build. And painting it once avoids the 1px darker hairline
          that two coincident teal layers composite into along a fractional
          edge.
        */}
        <div className="relative left-1/2 my-2 w-screen -translate-x-1/2 bg-primary py-12 text-white">
          <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="mx-auto max-w-4xl">
              <p className="mb-2.5 text-[21px] font-bold leading-tight tracking-tight sm:text-2xl md:text-[28px]">
                The practical consequence: ethical approval alone does not give
                you data.
              </p>
              <p className="mb-7 text-[17px] text-white/85">
                Every region holding data you need makes its own decision, and a
                multi-region study means multiple parallel decisions.
              </p>
              <TwoGatesDiagram />
            </div>
          </div>
        </div>

        <p>
          Three areas already have national ethical approvals and joint
          controllership agreements in place:{" "}
          <strong>rare disease, haematology and childhood cancer</strong>.
          Further approvals are in progress, for example for microbiology. If a
          study falls inside one of the established areas, the path is usually
          shorter, because the framework agreements already exist.
        </p>

        <Title level={2}>Can you use NGP data for your project?</Title>
        <p>Work through these before you invest in an application.</p>
        <ul className="flex list-none flex-col gap-3 pl-0" role="list">
          {CHECKLIST.map((item) => (
            <li
              key={item.lead}
              className="flex items-start gap-3"
              role="listitem"
            >
              <Check
                className="mt-1 h-5 w-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <span>
                <strong>{item.lead}</strong> {item.rest}
              </span>
            </li>
          ))}
        </ul>

        <Title level={2}>How to apply for access, step by step</Title>
        <p>
          Three phases: prepare, obtain permission, obtain data. Steps within a
          phase can often run in parallel; the phases cannot.
        </p>

        {/*
          One wrapper per phase. `sticky` resolves against the nearest block
          container, so grouping each phase keeps its heading pinned only while
          that phase is on screen. Sharing one container would pin all three on
          top of each other, and leave the last stuck over the sections below.
        */}
        <div>
          <Title level={3} className={phaseHeadingClassName}>
            Phase 1. Prepare
          </Title>
          <div className="flex flex-col gap-y-6 pt-4">
            <article>
              <Title level={4} className="mb-2">
                Step 1. Scope the cohort and confirm it exists.
              </Title>
              <p>
                Define the diagnostic area, assay type, time period and regions.
                Then check feasibility before committing. The NGP feasibility
                portal returns aggregate counts by diagnosis and molecular
                criterion per region and discloses no confidential information.
                For anything the portal cannot answer, contact the Genomic
                Medicine Centre in the relevant region, or Genomic Medicine
                Sweden.
              </p>
            </article>
            <article>
              <Title level={4} className="mb-2">
                Step 2. Confirm your research principal and legal basis.
              </Title>
              <p>
                Establish which organisation is the research principal, and
                settle the GDPR basis for processing. Your research support
                office or data protection officer should be involved from this
                point, not later.
              </p>
            </article>
          </div>
        </div>

        <div>
          <Title level={3} className={phaseHeadingClassName}>
            Phase 2. Obtain permission
          </Title>
          <div className="flex flex-col gap-y-6 pt-4">
            <article>
              <Title level={4} className="mb-2">
                Step 3. Apply for ethical approval.
              </Title>
              <p className="mb-3">
                Apply to{" "}
                <ExternalLink
                  href="https://etikprovningsmyndigheten.se/en/"
                  label="Etikprövningsmyndigheten"
                />{" "}
                through the{" "}
                <ExternalLink
                  href="https://www.etikprovningsansokan.se/epm/login"
                  label="Ethics application portal"
                >
                  application portal
                </ExternalLink>
                , under{" "}
                <ExternalLink
                  href="https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-2003460-om-etikprovning-av-forskning-som_sfs-2003-460/"
                  label="Lag 2003:460 om etikprövning av forskning som avser människor on riksdagen.se"
                >
                  lag (2003:460) om etikprövning av forskning som avser
                  människor
                </ExternalLink>
                . The application is submitted in Swedish, and a decision
                normally follows within 60 days once the application is complete
                and the fee is paid.
              </p>
              <p>
                Describe explicitly: the data categories you need, whether you
                require directly identifying or pseudonymised data, the regions
                you will approach, where processing will happen, and who will
                have access. Changes later require an amendment application,
                with a decision within 35 days.
              </p>
            </article>
            <article>
              <Title level={4} className="mb-2">
                Step 4. Apply for biobank approval, if you need samples.
              </Title>
              <p>
                If your project involves biobank samples as well as data, submit
                the relevant{" "}
                <ExternalLink
                  href="https://biobanksverige.se/dokument/"
                  label="National application through Biobank Sverige"
                >
                  national application through Biobank Sverige
                </ExternalLink>
                , under{" "}
                <ExternalLink
                  href="https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-202338-om-biobanker-i-halso--och-sjukvarden_sfs-2023-38/"
                  label="Biobankslagen 2023:38 on riksdagen.se"
                >
                  biobankslagen (2023:38)
                </ExternalLink>
                . Data-only projects can skip this step.
              </p>
            </article>
            <article>
              <Title level={4} className="mb-2">
                Step 5. Request disclosure from each holding region.
              </Title>
              <p>
                After ethical approval, and where samples are involved biobank
                approval, approach each region holding data you need, through
                its Genomic Medicine Centre. Each region carries out a harm
                assessment (menprövning) under chapter 25 of{" "}
                <ExternalLink
                  href="https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/offentlighets-och-sekretesslag-2009400_sfs-2009-400/"
                  label="Offentlighets- och sekretesslagen on riksdagen.se"
                >
                  offentlighets- och sekretesslagen
                </ExternalLink>{" "}
                and decides independently whether it may release the data.
                Supply the ethical approval and the data specification.
              </p>
            </article>
            <article>
              <Title level={4} className="mb-2">
                Step 6. Put the agreements in place.
              </Title>
              <p>
                Rare disease, haematology and childhood cancer already have
                national frameworks, which shortens this step considerably.
              </p>
            </article>
          </div>
        </div>

        <div>
          <Title level={3} className={phaseHeadingClassName}>
            Phase 3. Obtain data
          </Title>
          <div className="flex flex-col gap-y-6 pt-4">
            <article>
              <Title level={4} className="mb-2">
                Step 7. The region tags the data.
              </Title>
              <p>
                Once a region has approved disclosure, it applies the metadata
                tag that makes the specified data visible in GMC Joint to the
                users named in your project. Nothing moves until this happens,
                and only the holding region can do it.
              </p>
            </article>
            <article>
              <Title level={4} className="mb-2">
                Step 8. Get accounts and access the data.
              </Title>
              <p className="mb-3">
                Project users authenticate to the{" "}
                <ExternalLink
                  href="https://research-portal.genmed.se/"
                  label="NGP Research Portal"
                />{" "}
                using SWAMID. From there you can reach the tagged data. Analysis
                can run inside the platform on NGPcompute, reached through Open
                OnDemand, or programmatically through the open-source{" "}
                <ExternalLink
                  href="https://github.com/genomic-medicine-sweden/NGPIris"
                  label="NGPIris client on GitHub"
                >
                  NGPIris
                </ExternalLink>{" "}
                client. Export outside the platform is governed by the terms of
                your approvals and agreements, not by technical capability.
              </p>
              <p>
                Analysing data inside the platform is normally simpler than
                exporting it. Whole genome data is large, and every export
                creates a new set of security and agreement obligations for your
                own organisation. Plan for in-platform analysis unless you have
                a specific reason not to.
              </p>
            </article>
          </div>
        </div>

        <Title level={2}>Working with the data once you have access</Title>
        <p>
          <strong>Where analysis happens.</strong> NGPcompute provides elastic
          cloud compute alongside the storage layer, with encryption keys held
          by a dedicated hardware security module owned by the platform. Users
          reach it through Open OnDemand, which offers both a graphical
          interface and a command line.
        </p>
        <p>
          <strong>Programmatic access.</strong>{" "}
          <ExternalLink
            href="https://github.com/genomic-medicine-sweden/NGPIris"
            label="NGPIris on GitHub"
          >
            NGPIris
          </ExternalLink>{" "}
          is the open-source Python client for the platform, providing upload,
          download, listing and search against both the storage and the index
          layers. It is available on PyPI and on GitHub.
        </p>
        <p>
          <strong>Analysis pipelines.</strong> Genomic Medicine Sweden develops
          and publishes its{" "}
          <ExternalLink
            href="https://genomicmedicine.se/it-informatik/bioinformatiska-analysverktyg/"
            label="GMS diagnostic pipelines as open source"
          >
            diagnostic pipelines as open source
          </ExternalLink>
          , including nf-core/raredisease, Tomte and nallo for rare disease,
          Twist Solid and the GMS560 panel workflow for solid tumours, and JASEN
          and gms_16S for microbiology. Using the same pipeline as the
          originating laboratory makes your results directly comparable to the
          clinical result.
        </p>
        <p>
          <strong>Metadata standards.</strong> The indexing layer can express
          extracted metadata as HL7 FHIR, openEHR, SNOMED CT and DCAT-AP.
        </p>

        <Title level={2}>Data you may need alongside NGP</Title>
        <p>
          Genomic data rarely answers a clinical research question on its own.
          These are separate applications with separate timelines, and they are
          worth starting in parallel rather than in sequence.
        </p>
        <ul className="list-disc space-y-2 pl-4" role="list">
          <li role="listitem">
            <strong>National health registers</strong> from{" "}
            <ExternalLink
              href="https://bestalladata.socialstyrelsen.se/data-for-forskning/"
              label="Socialstyrelsen data for research"
            >
              Socialstyrelsen
            </ExternalLink>
            , for diagnoses, prescribed drugs, procedures and causes of death.
            Expect several months and a fee running from tens of thousands of
            SEK.
          </li>
          <li role="listitem">
            <strong>
              Register data from{" "}
              <ExternalLink
                href="https://www.scb.se/vara-tjanster/bestall-data-och-statistik/mikrodata/"
                label="Statistics Sweden microdata"
              >
                Statistics Sweden
              </ExternalLink>
            </strong>
            , for socioeconomic and demographic variables, delivered into the
            MONA remote analysis environment.
          </li>
          <li role="listitem">
            <strong>National quality registers</strong>, including the{" "}
            <ExternalLink
              href="https://cancercentrum.se/utvecklingsarbeteutbildning/statistikrapporter/kvalitetsregister/registerutdata/datauttag.8340.html"
              label="Cancer quality registers data extraction"
            >
              cancer quality registers
            </ExternalLink>{" "}
            held on the INCA platform by Regionala cancercentrum. A national
            genomics module linking NGP data into the cancer registers and the
            individual patient overview (IPÖ) is under development.
          </li>
          <li role="listitem">
            <strong>Biobank samples</strong> through{" "}
            <ExternalLink
              href="https://biobanksverige.se/dokument/"
              label="Biobank Sverige documents"
            >
              Biobank Sverige
            </ExternalLink>
            , where your study needs material rather than data.
          </li>
          <li role="listitem">
            <strong>Existing research cohorts</strong>, which may already hold
            what you need with a shorter access path. See{" "}
            <Link
              href="/data-sources/swedish-research-cohorts"
              className={linkClassName}
            >
              Swedish research cohorts
            </Link>{" "}
            on this portal.
          </li>
        </ul>

        <Title level={2}>Contact</Title>
        <p>
          For questions about NGP data, access or the platform itself, contact
          Genomic Medicine Sweden at{" "}
          <a
            href="mailto:info@genomicmedicine.se"
            className={linkClassName}
            aria-label="Send email to info@genomicmedicine.se"
          >
            info@genomicmedicine.se
          </a>
          , or raise a request through the{" "}
          <ExternalLink
            href="https://cf-bdc.freshservice.com/support/tickets/new"
            label="NGP service desk"
          />
          .
        </p>
        <p>
          For questions about the Precision Medicine Portal, see our{" "}
          <Link href="/contact" className={linkClassName}>
            contact page
          </Link>
          .
        </p>

        <Title level={2}>Links and resources</Title>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {RESOURCE_GROUPS.map((group) => (
            <Card key={group.title} className="p-6 shadow-none">
              <Title level={3} className={`${cardHeadingClassName} mb-4`}>
                {group.title}
              </Title>
              <ul className="flex list-none flex-col gap-2 pl-0" role="list">
                {group.links.map((link) => (
                  <li key={link.href} role="listitem">
                    {link.href.startsWith("/") ? (
                      <Link href={link.href} className={linkClassName}>
                        {link.label}
                      </Link>
                    ) : (
                      <ExternalLink href={link.href} label={link.label} />
                    )}
                    {link.suffix}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <LastUpdated date="21-08-2026" />
      </div>
    </div>
  );
}
