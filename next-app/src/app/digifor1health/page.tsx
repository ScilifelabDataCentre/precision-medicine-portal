"use client";

import { ReactElement } from "react";
import Title from "@/components/common/title";
import PartnerCoordinationDiagram from "@/components/digifor1health/partner-coordination-diagram";
import PuzzleCategoriesDiagram from "@/components/digifor1health/puzzle-categories-diagram";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { LastUpdated } from "@/components/common/last-updated";

interface KeyMessageCategory {
  title: string;
  subtitle: string;
  messages: string[];
  anchorId: string;
}

const categories: KeyMessageCategory[] = [
  {
    title: "Vision & Strategy",
    anchorId: "category-vision-strategy",
    subtitle:
      "The overarching goals and strategic approach for managing health data in Sweden towards the European Health Data Space (EHDS).",
    messages: [
      "There is an urgent need for a coherent system that enables the use of health data to drive real-world evidence generation, foster innovation, and support the development of novel as well as advanced analytic methodologies. Such a system must also encourage national and international collaboration.",
      "A proactive and coordinated approach, grounded in a shared vision across all stakeholders, is needed rather than a reactive one.",
      "While EHDS provides a framework for harmonizing access to and use of health data, it does not yet cover all requirements for full utilization, especially concerning precision medicine, data harmonization, and integration of research and care. With implementing acts undergoing development opportunities occur to shape EHDS nationally.",
      "Driving development based on national goals while actively engaging in European implementation work is therefore crucial. Achieving sustainable change will take time and requires patience, persistence, and a shared understanding of the long-term vision.",
    ],
  },
  {
    title: "Collaboration & Governance",
    anchorId: "category-collaboration-governance",
    subtitle:
      "Need for collaboration, clear leadership, and stakeholder involvement.",
    messages: [
      "A clear government directive is recommended to ensure that all relevant authorities take a holistic view of data use, beyond the boundaries of their individual mandates.",
      "Collaboration requires designated forums and cross-sectoral structures that bring together stakeholders from healthcare, research, policy, and technology to jointly drive development forward.",
      "Building trust is essential. This demands transparent handling of ethical and social issues, as well as the active inclusion of patient and user perspectives in all processes.",
      "Today, fragmented legislation and varying interpretations pose major challenges. A unified national approach to legal, ethical, and governance frameworks — consistent with European developments — is therefore urgently needed. Sweden can play a leading role in shaping these models through pilot projects, regulatory sandboxes and participation in standardization initiatives, both within the Nordics and EU.",
    ],
  },
  {
    title: "Systemic Change & Resources",
    anchorId: "category-systemic-change-resources",
    subtitle:
      "Resources and mindset shifts needed for the transformation of the health data landscape.",
    messages: [
      "Transforming the Swedish health data ecosystem requires a clear overview of ongoing initiatives and the actors driving them. Systemic change depends on dedicated funding, new skills, and updated organizational structures, including targeted training for existing staff in new workflows and digital processes.",
      "Because healthcare and research are evolving in parallel, primary and secondary use of health data are increasingly intertwined and are not relevant to differentiate. Data circulates in a continuous loop, serving multiple purposes — for example, research data feeding into clinical decision support in precision medicine, or clinical data being reused for research and quality improvement.",
      "Consequently, governance models, data stewardship principles, and consent frameworks must evolve to create this circular data reality.",
      "Sustainable progress will require both political commitment and long-term investment in people, technology, and governance mechanisms to ensure that Sweden's implementation of the EHDS delivers tangible benefits for patients, clinicians, and society at large.",
    ],
  },
  {
    title: "Implementation & Infrastructure",
    anchorId: "category-implementation-infrastructure",
    subtitle:
      "Practical steps and structures required to build a functional and unified health data system.",
    messages: [
      "To develop a national digital infrastructure that serves Sweden's needs while aligning with EHDS principles and the holistic view of primary and secondary data use, stakeholders must work together.",
      "To achieve sustainable access and utilization of health data, unified standards are essential. This standardization includes not only terminologies and concepts, but also metadata down to the variable level. Working methods, processes, and documentation routines must be adapted accordingly.",
      "High-quality, structured health data with uniform standards and definitions must be captured already at the point of primary documentation. This ensures data can later support advanced applications such as AI systems, machine learning, federated analyses and precision medicine — for training, validation, and deployment.",
      "In a European context, the health data ecosystem should enable cutting-edge research through federated analysis and machine learning, allowing knowledge generation from distributed real-world data sources across Europe while keeping sensitive data secure at its source.",
    ],
  },
];

export default function Digifor1healthPage(): ReactElement {
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
              <BreadcrumbLink href="/digifor1health">
                DIGIfor1healthSE
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>

      <Title level={1} className="mb-6">
        DIGIfor1healthSE
      </Title>

      <section aria-label="Project overview" className="mb-8">
        <p className="text-lg leading-relaxed text-foreground mb-6">
          <a
            href="https://digifor1health.se/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="DIGIfor1healthSE (opens in new tab)"
          >
            DIGIfor1healthSE
          </a>{" "}
          is a national collaboration project which aims to create synergies and
          increase coordination nationally for sustainable access and
          utilization of health data in Sweden and within the EU by supporting
          the implementation of the European Health Data Space (EHDS).
        </p>

        <p className="text-base leading-relaxed text-foreground mb-8">
          Collaborating within DIGIfor1healthSE are two national strategic
          initiatives and five EU-funded DIGITAL-programme projects. The
          national initiatives are{" "}
          <a
            href="https://genomicmedicine.se/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="Genomic Medicine Sweden (opens in new tab)"
          >
            Genomic Medicine Sweden
          </a>{" "}
          (GMS) and{" "}
          <a
            href="https://www.scilifelab.se/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="SciLifeLab (opens in new tab)"
          >
            SciLifeLab
          </a>
          . The EU-DIGITAL-projects are{" "}
          <a
            href="https://gdi.onemilliongenomes.eu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="Genomic Data Infrastructure (opens in new tab)"
          >
            Genomic Data Infrastructure
          </a>{" "}
          (GDI),{" "}
          <a
            href="https://cancerimage.eu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="European Federation for Cancer Images (opens in new tab)"
          >
            European Federation for Cancer Images
          </a>{" "}
          (EUCAIM),{" "}
          <a
            href="https://www.healthdatasweden.eu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="Health Data Sweden (opens in new tab)"
          >
            Health Data Sweden
          </a>{" "}
          (HDS),{" "}
          <a
            href="https://tefhealth.se/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="Testing and Experimentation Facility for Health AI and Robotics (opens in new tab)"
          >
            Testing and Experimentation Facility for Health AI and Robotics
          </a>{" "}
          (TEF-Health) and{" "}
          <a
            href="https://digital-strategy.ec.europa.eu/en/news/genome-europe-project-launched-first-step-towards-european-reference-genome"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="Genome of Europe (opens in new tab)"
          >
            Genome of Europe
          </a>{" "}
          (GoE).
        </p>

        <PartnerCoordinationDiagram />

        <Alert className="border-primary/30 bg-primary/5">
          <AlertTitle className="text-base font-semibold">
            Project funding and coordination
          </AlertTitle>
          <AlertDescription>
            <p className="leading-relaxed mt-2">
              DIGIfor1healthSE is funded by Sweden&apos;s Innovation Agency{" "}
              <strong>Vinnova</strong> and coordinated by{" "}
              <strong>SciLifeLab</strong>.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="default">Funded by Vinnova</Badge>
              <Badge variant="accent">Coordinated by SciLifeLab</Badge>
            </div>
          </AlertDescription>
        </Alert>
      </section>

      <section aria-label="Key messages" className="mb-8">
        <Title level={2} className="mb-4">
          How to achieve sustainable access and utilization of health data in
          Sweden?
        </Title>

        <p className="text-base leading-relaxed text-foreground mb-8">
          <a
            href="https://digifor1health.se/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="DIGIfor1healthSE (opens in new tab)"
          >
            DIGIfor1healthSE
          </a>{" "}
          presents the following four categories with key messages that capture
          the work needed in order to achieve sustainable access and utilization
          of health data in Sweden. These key messages have been summarized from
          the nationwide{" "}
          <a
            href="https://www.scilifelab.se/news/on-the-path-to-the-european-health-data-space-ehds/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="Nationwide event on EHDS (opens in new tab)"
          >
            event
          </a>{" "}
          and{" "}
          <a
            href="https://doi.org/10.17044/scilifelab.28882028"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="DIGIfor1healthSE report (opens in new tab)"
          >
            report
          </a>{" "}
          conducted 2025 by{" "}
          <a
            href="https://digifor1health.se/outputs/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="DIGIfor1healthSE outputs (opens in new tab)"
          >
            DIGIfor1healthSE
          </a>
          .
        </p>

        <PuzzleCategoriesDiagram />

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          role="list"
          aria-label="Key message categories"
        >
          {categories.map((category, index) => (
            <article key={index} role="listitem" className="h-full">
              <Card
                id={category.anchorId}
                className="shadow-md h-full flex flex-col scroll-mt-8"
              >
                <CardHeader className="bg-muted p-6">
                  <CardTitle className="text-lg text-foreground">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-foreground">
                    {category.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 flex-1">
                  <ul
                    className="list-disc space-y-3 pl-5"
                    aria-label={`Key messages for ${category.title}`}
                  >
                    {category.messages.map((message, msgIndex) => (
                      <li
                        key={msgIndex}
                        className="text-sm leading-relaxed text-foreground"
                      >
                        {message}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-8">
        <LastUpdated date="11-03-2026" />
      </div>
    </div>
  );
}
