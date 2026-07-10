"use client";

import { ReactElement } from "react";
import Title from "@/components/common/title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { LastUpdated } from "@/components/common/last-updated";

type ComplianceOption = {
  label: string;
  selected: boolean;
};

function ComplianceStatusList({
  options,
  label,
}: {
  options: ComplianceOption[];
  label: string;
}): ReactElement {
  return (
    <ul
      className="list-none pl-0 space-y-1"
      role="list"
      aria-label={label}
    >
      {options.map((option) => (
        <li key={option.label} className="flex items-start gap-2">
          <span aria-hidden="true">{option.selected ? "☒" : "☐"}</span>
          <span>
            {option.selected ? (
              <strong>
                <span className="sr-only">Selected: </span>
                {option.label}
              </strong>
            ) : (
              option.label
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

const complianceOptions: ComplianceOption[] = [
  { label: "Fully compliant", selected: false },
  { label: "Partially compliant", selected: true },
  { label: "Not compliant", selected: false },
];

const assessmentOptions: ComplianceOption[] = [
  { label: "Self-assessment", selected: true },
  { label: "Independent external assessment", selected: false },
  {
    label: "Combination of internal and external assessment",
    selected: false,
  },
];

const linkClassName =
  "text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded";

export default function AccessibilityPage(): ReactElement {
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
              <BreadcrumbLink href="/accessibility">
                Accessibility statement
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>

      <div className="flex flex-col gap-y-4">
        <Title level={1}>Accessibility statement</Title>

        <p role="doc-abstract">
          This accessibility statement applies to the Precision Medicine Portal (
          <a
            href="https://precision-medicine-portal.scilifelab.se"
            className={linkClassName}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Precision Medicine Portal (opens in new tab)"
          >
            https://precision-medicine-portal.scilifelab.se
          </a>
          ), a service provided by SciLifeLab Data Centre.
        </p>
        <p>
          SciLifeLab Data Centre is committed to ensuring digital accessibility
          for all users. We continuously work to improve the accessibility and
          usability of our digital services and to identify and remove barriers
          to access.
        </p>
        <p>
          This statement describes how accessible the service is, any known
          accessibility issues, and how users can contact us if they encounter
          problems.
        </p>

        <Title level={2}>How accessible is the service?</Title>
        <p>This service is:</p>
        <ComplianceStatusList
          options={complianceOptions}
          label="Compliance with the Swedish Act on Accessibility to Digital Public Services"
        />
        <p>
          with the accessibility requirements of the Swedish Act on
          Accessibility to Digital Public Services (DOS-lagen).
        </p>
        <p>
          An initial accessibility review has been carried out using automated
          accessibility testing tools. Identified issues, including text
          contrast problems, have been addressed where possible. Additional
          accessibility assessment and improvements are planned.
        </p>

        <Title level={2}>
          What to do if you cannot use parts of the service
        </Title>
        <p>
          If you need information from this service in an alternative format, or
          if you encounter accessibility barriers, please contact us.
        </p>

        <Title level={2}>Contact information</Title>
        <p>
          Email:{" "}
          <a
            href="mailto:precisionmedicine@scilifelab.se"
            className={linkClassName}
            aria-label="Send email to precisionmedicine@scilifelab.se"
          >
            precisionmedicine@scilifelab.se
          </a>
        </p>

        <Title level={2}>Report accessibility problems</Title>
        <p>We continuously work to improve accessibility.</p>
        <p>
          If you discover accessibility problems that are not described in this
          statement, please let us know.
        </p>
        <p>Please include:</p>
        <ul className="list-disc pl-4" role="list">
          <li role="listitem">The page, document, or feature affected</li>
          <li role="listitem">A description of the issue</li>
          <li role="listitem">
            Your browser, device, or assistive technology, if relevant
          </li>
        </ul>

        <Title level={2}>Report deficiencies in accessibility</Title>
        <p>
          The Agency for Digital Government (DIGG) is responsible for
          supervising compliance with the Act on Accessibility to Digital
          Public Services.
        </p>
        <p>
          If you are not satisfied with how we handle your feedback regarding
          accessibility, you can contact DIGG and report deficiencies in the
          accessibility of this service here:{" "}
          <a
            href="https://www.digg.se/tdosanmalan"
            className={linkClassName}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Report accessibility deficiencies to DIGG (opens in new tab)"
          >
            https://www.digg.se/tdosanmalan
          </a>
        </p>

        <Title level={2}>Technical information about accessibility</Title>

        <Title level={3}>Compliance status</Title>
        <p>This service is:</p>
        <ComplianceStatusList
          options={complianceOptions}
          label="Technical compliance status with DOS-lagen"
        />
        <p>
          with the accessibility requirements of the Swedish Act on
          Accessibility to Digital Public Services (DOS-lagen).
        </p>

        <Title level={3}>Non-accessible content</Title>
        <p>
          The content described below is not fully accessible.
        </p>
        <p>
          Accessibility improvements have been made based on an initial automated
          accessibility review. However, a comprehensive accessibility assessment
          has not yet been completed, and there may be accessibility issues that
          have not yet been identified or documented.
        </p>
        <p>Areas that have not yet been systematically assessed include:</p>
        <ul className="list-disc pl-4" role="list">
          <li role="listitem">Keyboard navigation</li>
          <li role="listitem">Screen reader compatibility</li>
          <li role="listitem">Focus management</li>
          <li role="listitem">Accessibility of embedded third-party content</li>
        </ul>
        <p>
          We welcome feedback from users regarding accessibility barriers
          encountered while using the service.
        </p>

        <Title level={3}>Planned improvements</Title>
        <ul className="list-disc pl-4" role="list">
          <li role="listitem">
            Conduct additional accessibility testing, including manual review.
          </li>
          <li role="listitem">
            Review keyboard navigation and focus management.
          </li>
          <li role="listitem">
            Review compatibility with assistive technologies such as screen
            readers.
          </li>
          <li role="listitem">
            Continue to address accessibility issues identified through testing
            and user feedback.
          </li>
        </ul>

        <Title level={3}>
          Content outside the scope of accessibility requirements
        </Title>
        <p>
          The following content may fall outside the scope of applicable
          accessibility requirements:
        </p>
        <ul className="list-disc pl-4" role="list">
          <li role="listitem">
            Third-party content not maintained by SciLifeLab Data Centre
          </li>
          <li role="listitem">
            Externally hosted services linked from the portal
          </li>
          <li role="listitem">Content supplied by external partners</li>
        </ul>

        <Title level={2}>How accessibility was assessed</Title>
        <p>The accessibility of this service was assessed through:</p>
        <ComplianceStatusList
          options={assessmentOptions}
          label="Accessibility assessment method"
        />
        <p>Assessment methods included:</p>
        <ul className="list-disc pl-4" role="list">
          <li role="listitem">
            Automated accessibility testing using WAVE and Pa11y
          </li>
          <li role="listitem">
            Review and remediation of identified text contrast issues
          </li>
          <li role="listitem">
            Review against applicable accessibility criteria
          </li>
        </ul>
        <p>Most recent assessment: June 2026</p>
        <p>
          Assessment carried out by: Precision Medicine Portal team, SciLifeLab
          Data Centre
        </p>

        <Title level={2}>Statement information</Title>
        <ul className="list-none pl-0 space-y-1" role="list">
          <li role="listitem">Statement created: 09-06-2026</li>
          <li role="listitem">Last reviewed: 15-06-2026</li>
          <li role="listitem">
            Responsible organisation: SciLifeLab Data Centre
          </li>
          <li role="listitem">Service owner: SciLifeLab Data Centre</li>
          <li role="listitem">
            Service covered by this statement: Precision Medicine Portal (
            <a
              href="https://precision-medicine-portal.scilifelab.se"
              className={linkClassName}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Precision Medicine Portal (opens in new tab)"
            >
              https://precision-medicine-portal.scilifelab.se
            </a>
            )
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <LastUpdated date="15-06-2026" />
      </div>
    </div>
  );
}
