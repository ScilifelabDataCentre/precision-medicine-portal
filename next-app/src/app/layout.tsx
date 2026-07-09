import type { Metadata } from "next";
import "./globals.css";
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
import React from "react";
import MatomoInit from "@/components/MatomoInit";

export const metadata: Metadata = {
  title: "Precision Medicine Portal",
  description:
    "Service for researchers in the precision medicine field, designed to support and accelerate data-driven life science research in Sweden",
  openGraph: {
    title: "Precision Medicine Portal",
    description:
      "Service for researchers in the precision medicine field, designed to support and accelerate data-driven life science research in Sweden",
    url: "https://precision-medicine-portal.scilifelab.se",
    siteName: "Precision Medicine Portal",
    images: [
      {
        url: "https://precision-medicine-portal.scilifelab.se/SciLifeLab%20logo/metalogo.png",
        width: 1200,
        height: 628,
        alt: "Precision Medicine Portal Logo",
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
    <html lang="en">
      <head>
        <title>Precision Medicine Portal</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <MatomoInit></MatomoInit>
        <HeaderComponent />
        <main
          id="main-content"
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
