import { pageMetadata } from "@/lib/metadata";
import { ReactElement } from "react";
import Link from "next/link";

import Title from "@/components/common/title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MailX } from "lucide-react";
import { LastUpdated } from "@/components/common/last-updated";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with the SciLifeLab Precision Medicine Portal team.",
  path: "/contact",
});

export default function ContactPage(): ReactElement {
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
              <BreadcrumbLink href="/contact">Contact</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>

      <div
        className="flex flex-col gap-y-4"
        aria-label="Contact information and form"
      >
        <Title level={1}>Contact</Title>
        <p role="doc-abstract">
          We welcome questions and suggestions regarding the Precision Medicine
          Portal and Data Science Node in Precision Medicine and Diagnostics.
          Moreover, if you have inquiries about data management or data sharing,{" "}
          <Link
            href="/about/team"
            className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="Learn more about our team"
          >
            our team
          </Link>{" "}
          is happy to assist — or at least direct you to the right place.
        </p>
        <Alert
          className="bg-muted text-muted-foreground"
          role="region"
          aria-label="Contact information"
        >
          <MailX className="h-4 w-4" aria-hidden="true" />
          <AlertDescription>
            For all inquiries, please email us at{" "}
            <a
              href="mailto:precisionmedicine@scilifelab.se"
              className="text-primary font-semibold underline hover:text-black focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="Send email to precisionmedicine@scilifelab.se"
            >
              precisionmedicine@scilifelab.se
            </a>
            . We aim to respond within a few business days.
          </AlertDescription>
        </Alert>
        <p role="doc-notice">
          We are also committed to handling your information responsibly. Please
          refer to our{" "}
          <Link
            href="/privacy"
            className="text-primary hover:text-black underline focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="Read our privacy policy"
          >
            privacy policy
          </Link>{" "}
          to learn how we process your personal data.
        </p>
      </div>
      <div className="mt-8">
        <LastUpdated date="09-09-2025" />
      </div>
    </div>
  );
}
