import { pageMetadata } from "@/lib/metadata";
import { ReactElement } from "react";
import Link from "next/link";

import { LastUpdated } from "@/components/common/last-updated";

import Title from "@/components/common/title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata = pageMetadata({
  title: "Data sources",
  description:
    "How researchers access human data for precision medicine research in Sweden — from research cohorts and biobanks to quality registries — and how to apply.",
  path: "/data-sources",
});

export default function DataSourcesPage(): ReactElement {
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
          </BreadcrumbList>
        </Breadcrumb>
      </nav>

      <div className="flex flex-col gap-y-4">
        <Title level={1}>Access data for precision medicine research</Title>
        <p role="doc-abstract">
          Researchers can access human data for research from various national
          and international sources, such as research databases, quality
          registries, patient or medical records, biobanks, and more. However,
          human data is often not openly available. Researchers seeking access
          to human data must submit an application outlining their project and
          its requirements. The responsible institution, typically a healthcare
          region or university, will release the data only after conducting harm
          and confidentiality assessments.
        </p>
        <div
          className="flex flex-row items-center"
          aria-label="Swedish research cohorts and biobank studies section"
        >
          <Title level={2}>Swedish research cohorts and biobank studies</Title>
          <Link
            href="/data-sources/swedish-research-cohorts"
            aria-label="Go to Swedish research cohorts and biobank studies page"
            className="focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
          >
            <svg
              className="ml-2 fill-primary w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              role="presentation"
            >
              <g data-name="19-Arrow Right">
                <path d="M16 0a16 16 0 1 0 16 16A16 16 0 0 0 16 0zm0 30a14 14 0 1 1 14-14 14 14 0 0 1-14 14z" />
                <path d="m26.71 15.29-7-7-1.42 1.42 5.3 5.29H5v2h18.59l-5.29 5.29 1.41 1.41 7-7a1 1 0 0 0 0-1.41z" />
              </g>
            </svg>
          </Link>
        </div>
        <p>
          It is possible to request existing data from several research cohorts
          and biobank-based studies in Sweden. Data can be found on the website
          of the responsible institution, or in registries, data catalogues, and
          other compilations such as:
        </p>
        <ul
          className="list-disc pl-4"
          role="list"
          aria-label="Swedish research cohorts and biobank studies list"
        >
          <li role="listitem">
            <a
              href="https://precision-medicine-portal.scilifelab.se/data-sources/swedish-research-cohorts"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="Visit Precision Medicine Portal Swedish research cohorts and biobank studies (opens in new tab)"
            >
              Precision Medicine Portal
            </a>
            : A curated selection of major Swedish research cohorts and
            biobank-based studies that collect biological samples and health
            data, often linked with national registries for precision medicine
            research.
          </li>
          <li role="listitem">
            <a
              href="https://snd.se/en/catalogue/search"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="Visit Swedish National Data Service catalogue (opens in new tab)"
            >
              Swedish National Data Service (SND)
            </a>
            : In the research data catalogue at SND, it is possible to search
            for research projects and data from several disciplines. Some data
            and metadata can be downloaded directly from the catalogue. SND also
            provides information about data management and a service for data
            sharing.
          </li>
          <li role="listitem">
            <a
              href="https://dataguiden.se/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="Visit Dataguiden.se website (opens in new tab)"
            >
              Dataguiden.se
            </a>
            : Dataguiden.se is the Swedish Research Council&apos;s research
            guide for registry and health data. It presents different data
            sources, outlines the research process (including laws and
            regulations), and offers support and guidance for data users.
          </li>
          <li role="listitem">
            <a
              href="https://rut.registerforskning.se/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="Visit Register Utiliser Tool (RUT) website (opens in new tab)"
            >
              Register Utiliser Tool (RUT)
            </a>
            : RUT is a web-based metadata tool developed by the Swedish Research
            Council to support register-based research. It allows researchers to
            search, explore, and compare metadata from Swedish public authority
            registers, a selection of quality registers and biobank sample
            collections. RUT helps identify relevant variables for research
            questions, facilitating more precise data requests and ethical
            review preparations. The tool does not contain individual-level data
            but provides structured metadata to guide researchers in evaluating
            the potential of available data sources.
          </li>
        </ul>
        <div
          className="flex flex-row items-center"
          aria-label="Quality registries section"
        >
          <Title level={2}>Quality registries</Title>
          <Link
            href="/data-sources/quality-registries"
            aria-label="Go to quality registries page"
            className="focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
          >
            <svg
              className="ml-2 fill-primary w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              role="presentation"
            >
              <g data-name="19-Arrow Right">
                <path d="M16 0a16 16 0 1 0 16 16A16 16 0 0 0 16 0zm0 30a14 14 0 1 1 14-14 14 14 0 0 1-14 14z" />
                <path d="m26.71 15.29-7-7-1.42 1.42 5.3 5.29H5v2h18.59l-5.29 5.29 1.41 1.41 7-7a1 1 0 0 0 0-1.41z" />
              </g>
            </svg>
          </Link>
        </div>
        <p>
          The Swedish quality registries aim to improve the health care system
          by collecting individualised health data about, for example, certain
          diagnoses or problems{" "}
          <a
            href="https://www.1177.se/sa-fungerar-varden/lagar-och-bestammelser/nationella-kvalitetsregister/#:~:text=I%20nationella%20kvalitetsregister%20samlas%20information,l%C3%A4mnas%20till%20ett%20nationellt%20kvalitetsregister"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="Read more about Swedish quality registries (opens in new tab, in Swedish)"
          >
            (further information in Swedish)
          </a>
          . Data from a certain registry can be requested by researchers after
          approval by a steering group consisting of health care professionals
          and patient representatives.
        </p>
        <p role="doc-notice">
          Healthcare providers must inform patients before their medical
          information is collected in a quality register. This procedure differs
          from the inclusion of a research subject in a study, where written
          consent is required. However, personal data cannot be processed in a
          quality register or research study if the individual objects. If a
          person opposes the processing of their personal data after it has
          begun, the information should be erased from the register as soon as
          possible{" "}
          <a
            href="https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/patientdatalag-2008355_sfs-2008-355/#K7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="Read patient data law information (opens in new tab, in Swedish)"
          >
            (further information in Swedish)
          </a>
          .
        </p>
        <p>
          Every quality registry in Sweden is connected to one of six centres
          that provide support:
        </p>
        <ul
          className="list-disc pl-4"
          role="list"
          aria-label="Quality registry support centres"
        >
          <li role="listitem">
            <a
              href="https://qrcstockholm.se/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="Visit Stockholm Quality Registry Centre website (opens in new tab)"
            >
              Stockholm (QRC STHLM)
            </a>
          </li>
          <li role="listitem">
            <a
              href="https://rcsyd.se/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="Visit Registercentrum Syd website (opens in new tab)"
            >
              Syd (RC SYD)
            </a>
          </li>
          <li role="listitem">
            <a
              href="https://rcnorr.se/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="Visit Registercentrum Norr website (opens in new tab)"
            >
              Norr (RCN)
            </a>
          </li>
          <li role="listitem">
            <a
              href="https://www.ucr.uu.se/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="Visit Uppsala Clinical Research Center website (opens in new tab)"
            >
              Uppsala Clinical Research Center (UCR)
            </a>
          </li>
          <li role="listitem">
            <a
              href="https://registercentrum.se/rc-vast/vastra-gotaland"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="Visit Västra Götaland registry centre website (opens in new tab)"
            >
              Västra Götaland
            </a>
          </li>
          <li role="listitem">
            <a
              href="https://registercentrum.se/rc-sydost/sydost"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="Visit SydOst registry centre website (opens in new tab)"
            >
              SydOst (RCSO)
            </a>
          </li>
        </ul>
        <Title level={2} aria-label="Patient records and data access section">
          Patient records and data access
        </Title>
        <p>
          In Sweden, healthcare professionals routinely document patient
          interactions in electronic health records. These records may be
          accessed for medical research purposes, provided a confidentiality
          assessment is conducted and a formal data access request is submitted.
        </p>
        <p>
          Sweden&apos;s healthcare system is decentralized: the 21 regions
          manage most hospital and outpatient care, municipalities are
          responsible for services such as home care, and private practitioners
          maintain their own patient records. As a result, researchers often
          need to coordinate with multiple data controllers to obtain
          comprehensive health data for nationwide studies.
        </p>
        <p>
          <a
            href="https://kliniskastudier.se/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="Visit Kliniska Studier Sverige website (opens in new tab)"
          >
            Kliniska Studier Sverige
          </a>{" "}
          provides guidance on how to navigate this process, including
          region-specific procedures, legal considerations, and contact points
          for submitting data requests.
        </p>
        <Title level={2} aria-label="Research data management section">
          Research data management
        </Title>
        <p>
          SciLifeLab provides general research data management (RDM) guidelines,{" "}
          <a
            href="https://data-guidelines.scilifelab.se/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="Visit SciLifeLab data guidelines (opens in new tab)"
          >
            available here
          </a>
          , and specific information about the ethical, legal, and societal
          implications (ELSI) for research involving human data,{" "}
          <a
            href="https://data-guidelines.scilifelab.se/topics/research-involving-human-data/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="Visit SciLifeLab guidelines for research involving human data (opens in new tab)"
          >
            available here
          </a>
          . They also offer guidance on{" "}
          <a
            href="https://data-guidelines.scilifelab.se/topics/sharing-human-data/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="Visit SciLifeLab guidelines for sharing human data (opens in new tab)"
          >
            sharing sensitive human data
          </a>
          .
        </p>
        <p>
          More information and tailored research support can be found at
          universities, colleges, and healthcare regions or hospitals. A
          selection of links:
        </p>
        <ul
          className="list-disc pl-4"
          role="list"
          aria-label="Research support resources at universities and institutions"
        >
          <li role="listitem">
            <a
              href="https://www.oru.se/english/research/research-support/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="Visit Örebro University research support (opens in new tab)"
            >
              Örebro University
            </a>
          </li>
          <li role="listitem">
            <a
              href="https://www.karolinska.se/forskning-och-utbildning/forskning/stodenheter-for-klinisk-forskning/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="Visit Karolinska University Hospital clinical research support (opens in new tab)"
            >
              Karolinska University Hospital
            </a>
          </li>
          <li role="listitem">
            <a
              href="https://www.staff.lu.se/research-and-education/research-support"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="Visit Lund University research support (opens in new tab)"
            >
              Lund University
            </a>
          </li>
          <li role="listitem">
            <a
              href="https://www.umu.se/en/research-support-and-collaboration-office/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="Visit Umeå University research support (opens in new tab)"
            >
              Umeå University
            </a>
          </li>
          <li role="listitem">
            <a
              href="https://www.uu.se/en/staff/gateway/research/research-handbook/uppsala-universitys-research-support/the-medfarm-research-support"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="Visit Uppsala University research support (opens in new tab)"
            >
              Uppsala University
            </a>
          </li>
          <li role="listitem">
            <a
              href="https://staff.ki.se/research-support"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="Visit Karolinska Institutet research support (opens in new tab)"
            >
              Karolinska Institutet
            </a>
          </li>
        </ul>
        <LastUpdated date="09-09-2025" />
      </div>
    </div>
  );
}
