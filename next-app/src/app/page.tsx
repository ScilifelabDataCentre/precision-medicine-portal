"use client";

import { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Image paths
const dataSourcesImg = "/HomePageImages/dataSourcesIndexImage.png";

export default function HomePage(): ReactElement {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full space-y-16 pb-12">
        <section
          className="grid grid-cols-1 gap-6 px-4 md:px-0 max-w-2xl mx-auto"
          aria-label="Main portal services"
          role="region"
        >
          <article
            className="overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl cursor-pointer relative"
            role="listitem"
          >
            {/* Invisible clickable overlay for card navigation */}
            <Link
              href="/data-sources"
              className="absolute inset-0 z-10"
              aria-label="Navigate to Data Sources overview"
            />

            <Card className="h-full relative">
              <CardContent className="p-0">
                <div className="relative h-128">
                  <Image
                    src={dataSourcesImg}
                    alt="Data Sources - Access to quality registries, research cohorts and biobank studies, and other data sources for precision medicine research"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover opacity-65 transition-opacity duration-300 group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent">
                    <div className="absolute inset-x-0 bottom-0 p-6 h-full flex flex-col justify-end">
                      <CardTitle className="text-white mb-2 text-2xl group-hover:text-3xl transition-all duration-300">
                        Data sources
                      </CardTitle>
                      <nav
                        className="flex flex-col space-y-3 h-36 relative z-20"
                        aria-label="Data sources navigation"
                        role="navigation"
                      >
                        <Button
                          asChild
                          variant="secondary"
                          className="relative z-20"
                        >
                          <Link
                            href="/data-sources/quality-registries"
                            aria-label="Access Swedish quality registries for healthcare data"
                          >
                            Quality registries
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="secondary"
                          className="relative z-20"
                        >
                          <Link
                            href="/data-sources/swedish-research-cohorts"
                            aria-label="Browse Swedish research cohorts and biobank studies"
                          >
                            Swedish research cohorts
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="secondary"
                          className="relative z-20"
                        >
                          <Link
                            href="/data-sources/others"
                            aria-label="Explore other data sources and research databases"
                          >
                            Other data sources
                          </Link>
                        </Button>
                      </nav>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </article>

        </section>
      </div>
    </div>
  );
}
