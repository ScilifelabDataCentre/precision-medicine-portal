import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME } from "@/lib/metadata";
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
import React from "react";
import MatomoInit from "@/components/MatomoInit";

// Self-hosted at build time (no runtime requests to Google Fonts). Exposed as a
// CSS variable so `--font-sans` in globals.css and SVG diagrams can reference it.
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-lato",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Service for researchers in the precision medicine field, designed to support and accelerate data-driven life science research in Sweden",
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_NAME,
    description:
      "Service for researchers in the precision medicine field, designed to support and accelerate data-driven life science research in Sweden",
    url: "/",
    siteName: SITE_NAME,
    images: [
      {
        url: "/scilifelab-logo/metalogo.png",
        width: 1200,
        height: 628,
        alt: `${SITE_NAME} logo`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={lato.variable}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:font-semibold focus:text-foreground focus:outline-2 focus:outline-primary"
        >
          Skip to main content
        </a>
        <MatomoInit></MatomoInit>
        <HeaderComponent />
        <main
          id="main-content"
          tabIndex={-1}
          role="main"
          className="px-4 sm:px-6 lg:px-8 xl:px-12 2xl:max-w-(--breakpoint-2xl) 2xl:mx-auto"
          aria-label="Main content"
        >
          {children}
        </main>
        <FooterComponent />
      </body>
    </html>
  );
}
