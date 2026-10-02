import type { ReactNode } from "react";
import Link from "next/link";

/**
 * Copy for the PM Sample Central page, verbatim from the PMSC team's draft
 * (September 2026), including its spelling and terminology. Edits: hard
 * grammar and typing fixes ("This PMSC works" to "PMSC works", the missing
 * comma in "Each sample, and each piece cut from it, is", the missing space
 * before "(Qubit)", the empty "()" after Sarcoma), and, at Jan's request
 * (October 2026), no dashes as connectors: the pilot headings' institutions
 * become lists, two sentence dashes become a colon and a comma, and the
 * reference list, its "(2)" marker and the diagram's "Work Package" labels
 * are gone. Then, to meet DESIGN.md (Jan, 2 October 2026): one spelling
 * standard (British, as most of the draft), FFPE, SOPs and AML written out on
 * first use, no full stops ending headings, and paragraph breaks at the text's
 * own turns with no words changed. Open questions for the PMSC team are marked
 * "Draft:".
 */

export const PMSC_PATH = "/pm-sample-central";
export const PMSC_NAV_LABEL = "PM Sample Central";
export const PMSC_TITLE = "Precision Medicine Sample Central";

export const ILAB_URL =
  "https://karolinska.corefacilities.org/sc/3777/enheten-for-forskningsstod-och-implementering-pathology-core-facility/?tab=requests";
export const PMSC_EMAIL = "foi.pmsc.karolinska@regionstockholm.se";

const inlineLink =
  "rounded-sm text-link underline decoration-1 underline-offset-4 hover:decoration-2 active:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

/** The one lead paragraph. */
export const LEAD =
  "Precision Medicine Sample Central (PMSC) is a joint cancer sample and data infrastructure at the Pathology department at Medical Diagnostics Karolinska University Hospital, Oncology-Pathology at Karolinska Institutet and Data Center at SciLifeLab.";

/** "Why is it needed?", in the draft's two paragraphs. */
export const WHY: ReactNode[] = [
  "Patients with what looks like the same cancer can respond quite differently to the same treatments, and much of the time we cannot yet say why. One of the goals of precision medicine is telling them apart on the molecular level, matching each patient to the treatment most likely to help, at the time it will help.",
  "To achieve this level of precision, samples from a single patient need to be examined on the molecular level in many ways at once. This means that samples must consistently be prepared to a high standard and their corresponding records kept complete and described in the same way, so that results from different laboratories can later be brought together. The PM Sample Central is being built to make this possible.",
  <>
    Reading a tumour’s genome is now routine, but recent studies show that
    genome data alone points to a treatment for only about half of cancer
    patients. Answering the question for the other half means looking at a
    sample from several angles at once: its genes, its proteins, its individual
    cells, how its tissue is organised, and how living cancer cells respond to
    drugs. This is what researchers call <em>multimodal</em> profiling.
  </>,
  "Multimodal analyses are demanding: many of them need fresh, living material, handled, prepared and transported quickly and correctly. Today that work is largely left to each research group or department to arrange project by project leading to sample information being scattered across spreadsheets and separate systems. At best, this means samples yield less knowledge than they could but at worst, something goes wrong along the way, and, with no complete record, it goes unnoticed and cannot be traced afterwards.",
  "PM Sample Central tackles this problem on two fronts: the physical handling of the sample and the trail of information that has to travel with it.",
];

export type Step = { title: string; body: string };

/**
 * The two-track diagram from the draft ("What do we do?"), word for word from
 * its image. Stage n of the sample track and stage n of the record track
 * happen together.
 */
export const SAMPLE_TRACK = {
  title: "The sample",
  steps: [
    {
      title: "Consent & enrolment",
      body: "The patient agrees to take part in a study.",
    },
    {
      title: "Sample collected",
      body: "Surgery, biopsy, blood or bone marrow, at the hospital.",
    },
    {
      title: "Expert preparation",
      body: "Fresh tissue and living cells, prepared at PM Sample Central.",
    },
    {
      title: "Advanced analysis",
      body: "Genes, proteins, single cells and drug response.",
    },
  ] satisfies Step[],
};

export const RECORD_TRACK = {
  title: "The record",
  steps: [
    {
      title: "Study identity",
      body: "Clinical details, held apart from the person’s name.",
    },
    {
      title: "Unique sample ID",
      body: "A web address that names this one sample, worldwide.",
    },
    {
      title: "Handling record",
      body: "Protocols, reagents, storage, and any deviations.",
    },
    {
      title: "Results & quality",
      body: "What was measured, and how reliable it is.",
    },
  ] satisfies Step[],
};

export const CONVERGENCE: Step = {
  title: "Dashboard and knowledge graph",
  body: "Samples, analyses and clinical facts linked to one another, findable and reusable by other researchers, without revealing who the patient is.",
};

export const DIAGRAM_CAPTION =
  "The two tracks run in parallel and stay tied together by the unique sample ID. That is the whole point: a result is only worth as much as what you know about the sample it came from.";

export const PREPARATION = {
  title: "Sample preparation for multimodal data generation",
  body: [
    "We have established a physical laboratory and a team of specialists, currently located at Cancer Centrum Karolinska next to the hospital’s pathology department. Their job is to receive fresh material such as tissue, cells and blood and prepare it for multimodal analyses. These procedures are intended to outlive the specific projects and become part of the hospital practices once deemed mature enough and when clinical need arises.",
    "A hospital, a university and a national research infrastructure each have their own rules, budgets and legal obligations. PMSC works through them by mapping where samples get stuck today, agreeing who pays for what, and establishing when medical-device or data protection regulation applies to the tools being built. This is the least visible part but often the step that decides whether procedures become useful in the long term.",
  ],
};

export const DATA_STRUCTURE = {
  title: "Sample data and structure",
  intro:
    "We also focus on building tools that give every sample a unique identity that can be followed across organisations and define what information must be recorded at each step, and in which standard format, so that data from different laboratories can later be combined instead of sitting in incompatible silos.",
  tools: [
    {
      title: "A unique identity for every sample",
      body: "Each sample, and each piece cut from it, is given an identifier in the form of a web address, so it can be named unambiguously anywhere in the world. Today, a sample’s number usually only means something inside the hospital system that issued it, which makes tracking a sample between organisations unreliable.",
    },
    {
      title: "A common way of describing samples and patient data",
      // Draft: the first two sentences disagree (linking directly to OMOP vs
      // supporting future integration with it). Kept as written for the
      // PMSC team to resolve.
      body: (
        <>
          The standardisation of clinical data recorded in a project is
          supported by directly linking to the international{" "}
          <Link href="/omop-cdm" className={inlineLink}>
            OMOP Common Data Model
          </Link>
          , whereas laboratory data is harmonised using a common way of
          describing samples and patient data. Clinical data are collected in a
          structured format that supports future integration with international
          standards such as the OMOP Common Data Model. Sample and laboratory
          metadata are captured through standardised REDCap templates developed
          within PMSC, enabling harmonised data collection across projects and
          facilitating future data integration and reuse. A template built for
          both in REDCap, a research data tool already familiar to Swedish study
          teams, gives projects a ready-made place to enter this information and
          to connect both clinical and sample data in one place.
        </>
      ),
    },
    {
      title: "Dashboard and knowledge graph",
      body: "The collected information regarding patient samples is displayed in a knowledge graph, a visual network of connections that make patterns visible, and lets researchers find their sample data. The dashboard also gives the study team the shape of their study at a glance: how many samples of which type, from how many patients, which analyses are finished and which are yet to be done. The aim is for the dashboard to become a live view, showing the study in real time.",
    },
  ] satisfies { title: string; body: ReactNode }[],
};

export type PilotStudy = {
  name: string;
  /** The cancer, as the draft's heading gives it. */
  cancer?: string;
  /** Partner institutions, as the draft's heading gives them, one each. */
  partners?: readonly string[];
  body: string;
};

export const PILOTS = {
  title: "Developed and tested on real clinical studies",
  intro:
    "The tools are being developed alongside ongoing cancer studies that act as pilots to maintain relevance of the tools: anything that does not survive contact with a real clinic does not belong in the infrastructure. We support workflows in the following studies:",
  studies: [
    {
      name: "PreDDLung",
      cancer: "Lung cancer",
      partners: ["Karolinska Institutet", "Karolinska Hospital"],
      body: "PreDDLung is a feasibility study testing whether multimodal profiling can guide the use of immune checkpoint inhibitors in non-small-cell lung cancer. It brings together healthcare, clinical laboratories and researchers to improve how lung cancer samples are collected, processed and profiled. The project has helped bring clinical proteomics into healthcare. It now supports pre-implementation of further precision medicine diagnostics, showing in practice how new molecular technologies can move from research into the clinic.",
    },
    {
      // Draft: "Sarcoma ()" gives no study name, cancer line or partners.
      name: "Sarcoma",
      body: "A workflow covering both diagnostics and research. For diagnostic cases, DNA and RNA are extracted from tumour samples and sent for genomic profiling and methylation-based classification. Results go back into the clinical workflow to support diagnosis and treatment planning. In parallel, protein extracts are prepared for proteomics, adding molecular data for research and future clinical use. The long-term aim is to make these multimodal data available through the MTB Portal for Molecular Tumour Board discussions.",
    },
    {
      name: "MAATEO",
      cancer: "Acute myeloid leukaemia (AML)",
      // Draft: the question mark is the PMSC team's own open question.
      partners: ["Karolinska Institutet and international partners?"],
      body: "A functional precision medicine workflow using drug sensitivity assays (DSA). Mononuclear cells are isolated from patient blood and bone marrow by Ficoll density gradient separation, then exposed to drugs. Viability is measured with CellTiter-Glo, and the results are analysed and reported as functional drug response data. We are also building a REDCap setup for standardised sample registration, freezing, tracking and data management.",
    },
    {
      name: "BioBladder",
      cancer: "Bladder cancer",
      partners: ["Karolinska Institutet", "KTH"],
      body: "A functional precision medicine workflow built on fresh tumour samples. Primary cancer cells are prepared for 3D culture and tested against single drugs and combinations. Drug response is then measured by imaging and analysis. FFPE blocks are collected, tracked and sectioned for complementary analyses. The long-term aim is to use these data to pick the most effective treatment for each patient.",
    },
  ] satisfies PilotStudy[],
};

export const SERVICES = {
  title: "Services provided",
  intro:
    "PMSC provides practical support for researchers and clinical projects requiring standardised sample handling, preparation and tracking for precision medicine applications. Our services are designed to ensure high-quality sample processing and reproducible workflows across projects.",
  listIntro: "Current services include:",
  items: [
    "Reception and handling of fresh tissue, blood and cellular samples",
    "Cryogenic tissue preparation (CryoPrep)",
    "DNA, RNA and protein extraction (AllPrep)",
    "DNA and RNA extraction (QIAamp DNA mini kit and RNeasy mini kit)",
    "DNA and RNA quality control and concentration measurements (Qubit)",
    "Ficoll-based separation of peripheral blood samples",
    "Formalin-fixed paraffin-embedded (FFPE) tissue sectioning",
    "Protein extraction from fresh frozen and FFPE tissue according to validated standard operating procedures (SOPs)",
    "SP3-based protein preparation workflows",
    "Protein concentration measurements",
    "Sample tracking, documentation and metadata collection",
    "Support for multimodal molecular profiling workflows",
  ],
  outro:
    "PMSC continuously expands its service portfolio based on the needs of researchers, clinical partners and precision medicine initiatives.",
};

export const TAILORED = {
  title: "Tailored support and method development",
  body: "In addition to the services listed above, we work closely with project teams to develop and implement new sample preparation workflows when needed. If a project requires a procedure that is not yet part of our standard service offering, we can evaluate the request, develop new SOPs and establish fit-for-purpose sample handling workflows whenever feasible. Our goal is to provide flexible support and help enable innovative research and emerging diagnostic applications.",
};

export const REQUEST = {
  title: "Submit your project request",
  intro:
    "Researchers, clinical teams and collaborative projects interested in using PMSC services are encouraged to contact us early in the planning phase of their study or initiative. Early engagement allows us to optimise sample workflows, logistics and data management solutions from the start.",
  routesIntro: "Project requests can be submitted through:",
  next: "Following an initial review, the PMSC team will contact you to discuss project requirements, sample types, expected volumes, timelines and service needs.",
};

export const FOLLOW = {
  title: "Follow your project",
  intro: [
    "PMSC is developing digital tools that enable study teams to follow the progress of their samples and associated workflows throughout the project lifecycle.",
    "Through the PMSC dashboard, users will be able to access information such as:",
  ],
  items: [
    "Sample collection and processing status",
    "Available sample inventories",
    "Completed and ongoing analyses",
    "Project-specific metadata and study progress",
    "Traceability of samples across workflows",
  ],
  outro:
    "The long-term goal is to provide a real-time overview of project activities and sample status, improving transparency, coordination and communication between healthcare, research and analytical platforms.",
};

/**
 * The two images the page is laid out for. Each renders once `src` points at
 * a file in `public/` (with its real pixel size); until then the page leaves
 * the slot out and the text takes the space.
 *
 * - lab: a PMSC specialist at the bench at Cancer Centrum Karolinska,
 *   preparing a fresh tissue sample. Gloved hands and labelled sample tubes in
 *   focus, no patient details legible. Landscape 3:2, at least 2400 × 1600 px,
 *   daylight or lab light, unstaged.
 * - dashboard: the PMSC dashboard for one study, showing sample counts by
 *   type, number of patients and analysis status, with synthetic or
 *   anonymised data. 16:10, at least 2560 × 1600 px, captured at 2× with the
 *   browser chrome cropped off.
 */
export const IMAGES: Record<
  "lab" | "dashboard",
  { src: string | null; width: number; height: number; alt: string }
> = {
  lab: {
    src: null,
    width: 2400,
    height: 1600,
    alt: "A PMSC specialist preparing a fresh tissue sample in the laboratory at Cancer Centrum Karolinska.",
  },
  dashboard: {
    src: null,
    width: 2560,
    height: 1600,
    alt: "The PMSC dashboard for one study, showing samples by type, patients and analysis status.",
  },
};
