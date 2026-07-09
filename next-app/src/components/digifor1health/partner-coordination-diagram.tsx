"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  type Variants,
  type Transition,
} from "framer-motion";

interface Partner {
  abbr: string;
  name: string;
  href: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
}

const partners: Partner[] = [
  {
    abbr: "GMS",
    name: "Genomic Medicine Sweden",
    href: "https://genomicmedicine.se/en/",
    logoSrc: "/digifor1health/gms-logo.png",
    logoWidth: 300,
    logoHeight: 125,
  },
  {
    abbr: "GoE",
    name: "Genome of Europe",
    href: "https://genomeofeurope.eu/",
    logoSrc: "/digifor1health/goe-logo.png",
    logoWidth: 94,
    logoHeight: 49,
  },
  {
    abbr: "GDI",
    name: "European Genomic Data Infrastructure",
    href: "https://gdi.onemilliongenomes.eu/",
    logoSrc: "/digifor1health/gdi-logo.png",
    logoWidth: 998,
    logoHeight: 371,
  },
  {
    abbr: "EUCAIM",
    name: "European Federation for Cancer Images",
    href: "https://cancerimage.eu/",
    logoSrc: "/digifor1health/eucaim-logo.png",
    logoWidth: 509,
    logoHeight: 133,
  },
  {
    abbr: "TEF-Health",
    name: "Testing and Experimentation Facility for Health AI and Robotics",
    href: "https://tefhealth.se/",
    logoSrc: "/digifor1health/tef-logo.png",
    logoWidth: 902,
    logoHeight: 281,
  },
  {
    abbr: "HDS",
    name: "Health Data Sweden",
    href: "https://www.healthdatasweden.eu/",
    logoSrc: "/digifor1health/hds-logo.jpeg",
    logoWidth: 286,
    logoHeight: 152,
  },
  {
    abbr: "SciLifeLab",
    name: "SciLifeLab",
    href: "https://www.scilifelab.se/",
    logoSrc: "/digifor1health/scilifelab-logo.png",
    logoWidth: 3376,
    logoHeight: 734,
  },
];

const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

export default function PartnerCoordinationDiagram() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08 },
    },
  };

  const logoVariants: Variants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: springTransition },
      };

  return (
    <figure className="my-8 flex flex-col items-center">
      <div
        className="w-full"
        role="img"
        aria-label="Logos of the DIGIfor1healthSE project partners: GMS, GoE, GDI, EUCAIM, TEF-Health, HDS, and SciLifeLab."
      >
        <p className="sr-only">
          DIGIfor1healthSE project partners: Genomic Medicine Sweden (GMS),
          Genome of Europe (GoE), European Genomic Data Infrastructure (GDI),
          European Federation for Cancer Images (EUCAIM), Testing and
          Experimentation Facility for Health AI and Robotics (TEF-Health),
          Health Data Sweden (HDS), and SciLifeLab.
        </p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-4 sm:gap-x-6 md:flex-nowrap md:gap-x-4 lg:gap-x-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {partners.map((partner) => (
            <motion.a
              key={partner.abbr}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${partner.name} (opens in new tab)`}
              title={partner.name}
              variants={logoVariants}
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              className="flex items-center justify-center h-8 sm:h-10 md:h-10 min-w-0 rounded-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-shadow"
            >
              <Image
                src={partner.logoSrc}
                alt=""
                aria-hidden="true"
                width={partner.logoWidth}
                height={partner.logoHeight}
                sizes="120px"
                className="h-full w-auto object-contain mix-blend-multiply"
              />
            </motion.a>
          ))}
        </motion.div>
      </div>

      <figcaption className="mt-4 text-sm text-muted-foreground text-center">
        DIGIfor1healthSE project partners coordinated by SciLifeLab
      </figcaption>
    </figure>
  );
}
