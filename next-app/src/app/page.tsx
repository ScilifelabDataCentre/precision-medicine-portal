import { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Title from "@/components/common/title";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const dataSourceCards = [
  {
    title: "Quality registries",
    description:
      "Explore various Swedish registries offering individualised health data.",
    cta: "Browse registries",
    href: "/data-sources/quality-registries",
  },
  {
    title: "Swedish research cohorts",
    description:
      "Discover Swedish research cohorts and biobank-based studies.",
    cta: "Browse cohorts",
    href: "/data-sources/swedish-research-cohorts",
  },
  {
    title: "Other data sources",
    description: "Access a comprehensive overview of data sources.",
    cta: "Browse sources",
    href: "/data-sources/others",
  },
];

const portalCards = [
  {
    title: "OMOP CDM",
    description:
      "An open, community-driven standard to harmonize the structure and content of observational health data.",
    cta: "Introduction to OMOP-CDM",
    href: "/omop-cdm",
  },
  {
    title: "DIGIfor1healthSE",
    description:
      "A national collaboration supporting the implementation of the European Health Data Space (EHDS) in Sweden.",
    cta: "About the initiative",
    href: "/digifor1health",
  },
  {
    title: "Contact",
    description:
      "We welcome questions and suggestions — our team is happy to assist, or at least direct you to the right place.",
    cta: "Contact us",
    href: "/contact",
  },
];

export default function HomePage(): ReactElement {
  return (
    <div className="w-full">
      {/* Full-bleed: escape the root layout's padded, width-capped <main>. */}
      <section
        aria-label="Introduction"
        className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-primary"
      >
        {/* Placeholder hero image — replace with the final artwork. */}
        <Image
          src="/HomePageImages/hero-placeholder.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-[#022c31]/95 to-primary/55"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-5 py-8 text-white md:px-12 md:py-14">
          <Title level={1} className="max-w-3xl text-white">
            Your guide to Swedish data for precision medicine.
          </Title>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/90 md:mt-4 md:text-lg">
            Information on available datasets — national quality registries,
            research cohorts, and other structured data relevant to clinical
            and translational research.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row md:mt-7 md:gap-4">
            <Button
              asChild
              size="lg"
              className="bg-accent text-black hover:bg-accent/90"
            >
              <Link href="/data-sources">Explore data sources</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/70 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
        </div>
      </section>

      <section
        aria-label="Find your data"
        className="mx-auto max-w-6xl px-5 pt-8 md:px-12 md:pt-14"
      >
        <Title level={2} className="mb-4 md:mb-5">
          Find your data
        </Title>
        <div className="grid gap-3.5 md:grid-cols-3 md:gap-6">
          {dataSourceCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              <Card className="flex h-full flex-col gap-2.5 border-transparent bg-primary p-6 transition-all group-hover:bg-primary/90 group-hover:shadow-lg md:gap-3 md:p-8">
                <CardTitle className="text-xl text-white md:text-2xl">
                  {card.title}
                </CardTitle>
                <p className="flex-1 text-sm leading-relaxed text-white/90 md:text-base">
                  {card.description}
                </p>
                <span className="text-sm font-semibold text-white underline underline-offset-4 md:text-base">
                  {card.cta}{" "}
                  <ArrowRight
                    className="inline size-4 align-[-2px]"
                    aria-hidden="true"
                  />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section
        aria-label="Also on the portal"
        className="mx-auto max-w-6xl px-5 pb-12 pt-8 md:px-12 md:pb-18 md:pt-12"
      >
        <Title level={2} className="mb-4 md:mb-5">
          Also on the portal
        </Title>
        <div className="grid gap-3 md:grid-cols-3 md:gap-6">
          {portalCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              <Card className="flex h-full flex-col transition-all group-hover:border-primary/50 group-hover:shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-info">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-2">
                  <CardDescription className="flex-1 leading-relaxed">
                    {card.description}
                  </CardDescription>
                  <span className="text-sm font-semibold text-primary underline underline-offset-4 group-hover:text-foreground md:text-base">
                    {card.cta}{" "}
                    <ArrowRight
                      className="inline size-4 align-[-2px]"
                      aria-hidden="true"
                    />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
