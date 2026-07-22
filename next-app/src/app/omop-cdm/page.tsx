import { pageMetadata } from "@/lib/metadata";
import { ReactElement } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { LastUpdated } from "@/components/common/last-updated";
import Title from "@/components/common/title";
import Image from "next/image";

export const metadata = pageMetadata({
  title: "Introduction to OMOP-CDM",
  description:
    "An introduction to the OMOP Common Data Model (CDM), an open standard for harmonising observational health data for research.",
  path: "/omop-cdm",
});

export default function OMOPCDMPage(): ReactElement {
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
              <BreadcrumbLink href="/omop-cdm">
                Introduction to OMOP-CDM
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>

      <div className="flex flex-col gap-y-4">
        <Title level={1} className="mb-6">
          Introduction to OMOP-CDM
        </Title>
        <section aria-labelledby="omop-what" className="mb-6">
          <div className="flex flex-col gap-8 text-left md:flex-row md:gap-16 md:justify-between md:items-center">
            <div className="w-full md:w-2/3 space-y-4">
              <Title id="omop-what" level={2}>
                What is the OMOP CDM?
              </Title>
              <p>
                The OMOP Common Data Model (CDM) is an open, community-driven
                standard designed to harmonize the structure and content of
                observational data.
              </p>
              <p>
                In general, a common data model defines a shared way of
                organizing data so that information from different sources can
                be represented in the same format. This makes it easier to
                compare, analyze, and reuse data across institutions and
                studies.
              </p>
              <p>
                The OMOP CDM applies these principles through a standardized
                structure and shared vocabularies specifically designed for
                observational data, including patient demographics, conditions,
                procedures, drug exposures, and clinical measurements.
              </p>
            </div>
            <Image
              className="mx-auto w-full md:w-1/2"
              src="/img/omop/what-is-omop.png"
              alt="What is OMOP?"
              width={500}
              height={500}
              priority
            />
          </div>
        </section>

        <section aria-labelledby="omop-why" className="mb-6">
          <div className="flex flex-col gap-8 text-left md:flex-row md:gap-16 md:justify-between md:items-center">
            <Image
              className="mx-auto w-full md:w-1/3"
              src="/img/omop/why-using-omop.png"
              alt="Why use the OMOP CDM?"
              width={600}
              height={600}
              priority
            />
            <div className="w-full md:w-2/3 space-y-4">
              <Title id="omop-why" level={2}>
                Why use the OMOP CDM?
              </Title>
              <p>
                Health data comes in many formats and systems. While an
                individual data model may serve the needs of a specific
                organization, the sheer diversity of data sources and models
                creates major challenges for researchers seeking to combine and
                analyze information across multiple data sources. Furthermore,
                AI applications require large, diverse, and high-quality
                datasets to perform well, and the heterogeneity of health data
                can hinder the development of robust and generalizable models.
              </p>
              <p>
                In this context, the OMOP CDM provides a unified structure that
                enables researchers to share and analyze data from diverse
                sources, regardless of their underlying data models or
                vocabulary. Advantages of using the OMOP CDM include:
              </p>
              <ul className="list-disc list-inside">
                <li>
                  <strong>Standardization Across Sources</strong>
                  <p>
                    OMOP CDM provides a unified structure and vocabulary, making
                    it easier to integrate data from multiple healthcare
                    systems, EHRs, and claims databases (
                    <a
                      href="https://www.pnas.org/doi/10.1073/pnas.1510502113"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                      aria-label="OHDSI treatment pathways study"
                    >
                      OHDSI Treatment Pathways
                    </a>
                    ,{" "}
                    <a
                      href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10746315/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                      aria-label="EHDEN network paper"
                    >
                      EHDEN Network
                    </a>
                    ).
                  </p>
                </li>
                <li className="mt-1">
                  <strong>Interoperability for Research</strong>
                  <p>
                    Enables consistent analysis across institutions and
                    countries, supporting collaborative studies and large-scale
                    observational research (
                    <a
                      href="https://www.thelancet.com/journals/lanrhe/article/PIIS2665-9913(20)30276-9/fulltext"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                      aria-label="COVID-19 HCQ safety study"
                    >
                      COVID-19 HCQ Safety
                    </a>
                    ,{" "}
                    <a
                      href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6924620/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                      aria-label="LEGEND hypertension study"
                    >
                      LEGEND Hypertension
                    </a>
                    ).
                  </p>
                </li>
                <li className="mt-1">
                  <strong>Scalability for Big Data Analytics</strong>
                  <p>
                    Designed to handle large, complex healthcare datasets
                    efficiently, making it suitable for population-level studies
                    and predictive modeling (
                    <a
                      href="https://www.ohdsi.org/data-standardization/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                      aria-label="OHDSI global network"
                    >
                      OHDSI Global Network
                    </a>
                    ,{" "}
                    <a
                      href="https://www.nature.com/articles/s41598-024-52723-y"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                      aria-label="Patient-level prediction study"
                    >
                      Patient-Level Prediction
                    </a>
                    ).
                  </p>
                </li>
                <li className="mt-1">
                  <strong>Rich Vocabulary Mapping</strong>
                  <p>
                    Includes standardized vocabularies (SNOMED, RxNorm, LOINC,
                    etc.), ensuring semantic consistency and reducing ambiguity
                    in clinical concepts (
                    <a
                      href="https://academic.oup.com/jamia/article/31/3/583/7510741"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                      aria-label="OHDSI standardized vocabularies paper"
                    >
                      Standardized Vocabularies
                    </a>
                    ).
                  </p>
                </li>
                <li className="mt-1">
                  <strong>Access to OHDSI Tools &amp; Community</strong>
                  <p>
                    Using OMOP CDM unlocks a suite of open-source tools (e.g.,
                    ATHENA, Usagi, Achilles) and a global research network,
                    accelerating analytics and methodological development (
                    <a
                      href="https://www.ohdsi.org/software-tools/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                      aria-label="OHDSI software tools"
                    >
                      OHDSI Software Tools
                    </a>
                    ).
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="omop-how" className="mb-6">
          <div className="flex flex-col gap-8 text-left md:flex-row md:gap-16 md:justify-between md:items-center">
            <div className="w-full md:w-2/3 space-y-4">
              <Title id="omop-how" level={2}>
                How does the OMOP CDM work?
              </Title>
              <p>
                The OMOP CDM is, at its core, simply a standardized way to
                represent the information in a dataset. It is important to bear
                in mind that the OMOP CDM will not replace the need for local
                data models and vocabularies. Indeed, preparing a dataset for
                use with the OMOP CDM primarily involves translating the source
                data into the standardized OMOP structure, creating a clear and
                reproducible mapping between local representations and the OMOP
                conventions.
              </p>
              <div>
                <p>In practice, this typically involves:</p>
                <ul className="list-decimal list-inside">
                  <li>
                    reviewing the structure and content of the source dataset
                  </li>
                  <li>
                    mapping local tables and fields to the corresponding OMOP
                    CDM tables
                  </li>
                  <li>
                    translating local fields/codes into standardized OMOP
                    vocabularies
                  </li>
                  <li>
                    checking the transformed data using established validation
                    tools
                  </li>
                </ul>
              </div>
              <p>
                In this way, the OMOP CDM instance will allow local data to be
                combined and analyzed with other databases that have also been
                standardized to OMOP.
              </p>
              <p>
                Researchers are not expected to approach this process alone. The
                OHDSI community provides a rich ecosystem of open-source tools,
                documentation, and shared best practices that support each step
                of the transformation. Moreover, the widespread adoption of the
                OMOP CDM across institutions and countries means that many
                real-world examples, mappings, and workflows already exist,
                making it easier to learn from and build upon prior experience.
              </p>
            </div>

            <div className="w-full md:w-1/3 flex flex-col gap-4">
              <Image
                className="mx-auto w-full h-auto"
                src="/img/omop/how-does-omop-work.png"
                alt="How does the OMOP CDM work?"
                width={500}
                height={500}
                priority
              />
              <Image
                className="mx-auto w-full h-auto"
                src="/img/omop/ohdsi-galaxy.png"
                alt="OHDSI Galaxy of Tools"
                width={500}
                height={500}
                priority
              />
            </div>
          </div>
        </section>

        <section aria-labelledby="omop-history" className="mb-6">
          <div className="flex flex-col gap-8 text-left md:flex-row md:gap-16 md:justify-between md:items-center">
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <Image
                className="object-contain"
                src="/img/omop/omop-timeline.png"
                alt="What's the history of OMOP?"
                width={500}
                height={500}
                priority
              />
              <Image
                className="object-contain"
                src="/img/omop/ohdsi-collaborators-july2025.png"
                alt="OHDSI Collaborators July 2025"
                width={500}
                height={500}
                priority
              />
            </div>

            <div className="w-full md:w-1/2 space-y-4">
              <Title id="omop-history" level={2}>
                What’s the history of OMOP?
              </Title>
              <p>
                The Observational Medical Outcomes Partnership (OMOP) was
                launched in 2008 in the United States as a public–private
                initiative focused on improving drug safety surveillance and the
                analysis of observational healthcare data. To enable this work,
                OMOP introduced a common format for structuring disparate
                datasets. Over time, the OMOP CDM grew beyond its initial focus
                on drug development, becoming a widely adopted standard with an
                independent life of its own.
              </p>
              <p>
                Today, the OMOP CDM is maintained by the Observational Health
                Data Sciences and Informatics (OHDSI) community, a global,
                open-science collaborative. Beyond the data model itself, OHDSI
                also develops and maintains standardized vocabularies,
                open-source software tools, and methodological frameworks that
                together support the full lifecycle of observational research
                using OMOP.
              </p>
              <p>
                As of 2024, 544 data sources from 54 different countries have
                been standardized to the OMOP CDM. These data include electronic
                health records, administrative claims, registries, hospital
                systems, genomics and biobanks. Together, these data sources
                conservatively cover more than 974 million unique patient
                records, approximately 12% of the world’s population. See the{" "}
                <a
                  href="https://www.ohdsi.org/wp-content/uploads/2024/10/OurJourney2024.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  aria-label="2024 OHDSI annual report"
                >
                  2024 OHDSI annual report
                </a>{" "}
                for more details.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="omop-scilifelab" className="mb-6">
          <div className="flex flex-col gap-8 text-left md:flex-row md:gap-16 md:justify-between md:items-center">
            <div className="w-full md:w-2/3 space-y-4">
              <Title id="omop-scilifelab" level={2}>
                How is OMOP being used in SciLifeLab and Sweden?
              </Title>
              <p>
                In Sweden, interest in OMOP is steadily growing. Several
                universities and healthcare organizations, including Karolinska
                Institutet and Karolinska University Hospital, are exploring
                their potential to support national and international
                collaborations in medical research.
              </p>
              <p>
                A national initiative, OMOP 4 Sweden, is being carried out to
                create the conditions needed to accelerate the adoption of the
                OMOP standard. This project brings together a multi-helix
                consortium for long-term collaboration, aiming to build a clear
                OMOP case for Sweden while aligning international expertise with
                local needs and regulations.
              </p>
              <p>
                SciLifeLab is emerging as a service provider for OMOP, offering
                expertise and infrastructure to help researchers adopt the model
                and connect with the international OHDSI network that provides a
                range of open-source tools for mapping, data transformation, and
                downstream analysis. Moreover, SciLifeLab is contributing
                actively by driving pilot projects, such as the harmonization of
                oncology data. Through this work, SciLifeLab is helping to
                define national use cases, demonstrate OMOP’s value for the
                Swedish health data ecosystem, and capture best practices that
                will support wider implementation in the years ahead.
              </p>
            </div>
            <Image
              className="mx-auto w-full md:w-1/2"
              src="/img/omop/omop-at-scilifelab.png"
              alt="OMOP at SciLifeLab"
              width={500}
              height={500}
              priority
            />
          </div>
        </section>

        <section aria-labelledby="contact-us" className="mb-6">
          <Title id="contact-us" level={2}>
            Contact us
          </Title>
          <p>
            If you have any questions about the OMOP CDM, or if you would like
            to learn more about how to get involved with the OMOP initiative in
            Sweden, please don’t hesitate to reach out to us at{" "}
            <a
              href="mailto:precisionmedicine@scilifelab.se"
              className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="Send email to precisionmedicine@scilifelab.se"
            >
              precisionmedicine@scilifelab.se
            </a>
            .
          </p>
        </section>

        <section aria-labelledby="omop-resources" className="mb-6">
          <Title id="omop-resources" level={2}>
            Links and Resources
          </Title>
          <div>
            <ul
              className="list-disc pl-4"
              role="list"
              aria-label="OMOP resources and links"
            >
              <li role="listitem">
                <a
                  href="https://www.vinnova.se/en/p/omop-4-sweden-preparation-project-/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  aria-label="Visit OMOP 4 Sweden preparation project page (opens in new tab)"
                >
                  OMOP 4 Sweden
                </a>
                , the preparation project page for the OMOP initiative in Sweden
              </li>
              <li role="listitem">
                <a
                  href="https://ohdsi.github.io/CommonDataModel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  aria-label="Visit OMOP common data model webpage (opens in new tab)"
                >
                  OMOP common data model webpage
                </a>
              </li>
              <li role="listitem">
                <a
                  href="https://www.ohdsi.org/data-standardization"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  aria-label="Visit OHDSI webpage (opens in new tab)"
                >
                  OHDSI webpage
                </a>
              </li>
              <li role="listitem">
                <a
                  href="https://academy.ehden.eu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  aria-label="Visit EHDEN Academy webpage (opens in new tab)"
                >
                  EHDEN Academy
                </a>
                , training and development programmes developed by the OHDSI and
                EHDEN community
              </li>
            </ul>
          </div>
        </section>
      </div>
      <div className="mt-8">
        <LastUpdated date="17-03-2026" />
      </div>
    </div>
  );
}
