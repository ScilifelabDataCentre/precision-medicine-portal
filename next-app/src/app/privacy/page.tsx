import { pageMetadata } from "@/lib/metadata";
import { ReactElement } from "react";
import Link from "next/link";
import React from "react";
import Title from "@/components/common/title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { LastUpdated } from "@/components/common/last-updated";

export const metadata = pageMetadata({
  title: "Privacy policy",
  description:
    "How the SciLifeLab Precision Medicine Portal collects and processes personal data, in compliance with the GDPR.",
  path: "/privacy",
});

export default function PrivacyPage(): ReactElement {
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
              <BreadcrumbLink href="/privacy">Privacy policy</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>

      <div className="flex flex-col gap-y-4">
        <Title level={1}>Privacy policy</Title>
        <p role="doc-abstract">
          SciLifeLab provides and operates the Precision Medicine Portal. This
          page is intended to inform website visitors about our personal data
          processing policy. By using our Service, you agree that your personal
          data will be processed in accordance with this policy.
        </p>
        <Title
          level={2}
          aria-label="Information about visitor statistics collection"
        >
          Visitor statistics
        </Title>
        <p>
          We collect information that your browser sends to us whenever you
          visit our Service, referred to as &apos;log data.&apos; This data may
          include:
        </p>
        <ul
          className="list-disc pl-4"
          role="list"
          aria-label="Types of visitor data collected"
        >
          <li role="listitem">The website you visited us from</li>
          <li role="listitem">The parts of our Service you visit</li>
          <li role="listitem">The date and duration of your visit</li>
          <li role="listitem">Your anonymised IP address</li>
          <li role="listitem">
            Information about the device you used during your visit (device
            type, operating system, screen resolution, language, country you are
            located in, and web browser type)
          </li>
        </ul>
        <p>
          We process this usage data using Matomo Analytics (hosted on
          SciLifeLab servers and operated solely by SciLifeLab) for statistical
          purposes, to improve our Service, and to recognise and prevent any
          misuse.
        </p>
        <Title level={2} aria-label="Information about forms and personal data">
          Forms
        </Title>
        <p>
          Our Service can contain forms that visitors can use to contact us or
          provide suggestions. The website visitors may choose to provide their
          personal information such as their name and e-mail address through
          these forms. The following parties will have access to processing the
          personal data provided through the forms; SciLifeLab Data Centre,
          Uppsala University, Kungliga Tekniska högskolan (KTH). Your personal
          data will be deleted when no longer needed, or when stipulated by the
          archival rules for the university as a government authority. If you
          want to update or remove your personal data, please contact the
          controller SciLifeLab Data Centre at Uppsala University using{" "}
          <a
            href="mailto:datacentre@scilifelab.se"
            className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="Send email to SciLifeLab Data Centre for data requests"
          >
            datacentre@scilifelab.se
          </a>
          .
        </p>
        <Title
          level={2}
          aria-label="Information about data collection and usage"
        >
          Data collection and usage
        </Title>
        <p role="doc-notice">
          The personal information we collect is used solely for providing and
          improving the Service. We will not use or share your information with
          anyone except as described in this policy. All collected personal
          information will be processed for research purposes under the lawful
          basis of public interest and in compliance with Regulation (EU)
          2016/679 of the European Parliament and of the Council of 27 April
          2016, the General Data Protection Regulation (GDPR).
        </p>
        <Title level={2} aria-label="Information about links to external sites">
          Links to other sites
        </Title>
        <p role="doc-notice">
          Our Service may contain links to other sites. If you click on a
          third-party link, you will be directed to that site. These external
          sites are not operated by us, and we strongly advise you to review the
          privacy policy of these websites. We have no control over and assume
          no responsibility for the content, privacy policies, or practices of
          any third-party sites or services.
        </p>
        <Title level={2} aria-label="Information about policy changes">
          Changes to this privacy policy
        </Title>
        <p>
          We may update our privacy policy from time to time. We advise you to
          review this page periodically for any changes. We will notify you of
          any changes by posting the new privacy policy on this page. Changes
          are effective immediately upon being posted on this page.
        </p>
        <Title level={2} aria-label="Contact information section">
          Contact us
        </Title>
        <p>
          If you have any questions or suggestions about our privacy policy, do
          not hesitate to contact us at the{" "}
          <Link
            href="/contact"
            className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="Go to contact page"
          >
            Precision Medicine Portal
          </Link>
          .
        </p>
        <p role="contentinfo">
          Our privacy policy was partially copied and adapted from the{" "}
          <a
            href="https://www.pathogens.se"
            className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Pathogens Portal website (opens in new tab)"
          >
            Pathogens Portal
          </a>
          . Please also refer to{" "}
          <a
            href="https://www.uu.se/en/about-uu/data-protection-policy"
            className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Uppsala University data protection policy (opens in new tab)"
          >
            Uppsala University&apos;s data protection policy
          </a>
          .
        </p>
      </div>
      <div className="mt-8">
        <LastUpdated date="06-08-2025" />
      </div>
    </div>
  );
}
