import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";

/**
 * Public, indexable routes. Excludes redirect-only paths (`/about`, `/kiarva`)
 * and the `/meta/version` API route.
 */
const routes = [
  "/",
  "/data-sources",
  "/data-sources/others",
  "/data-sources/quality-registries",
  "/data-sources/swedish-research-cohorts",
  "/omop-cdm",
  "/digifor1health",
  "/about/dsnpmd-projects",
  "/about/team",
  "/about/partners",
  "/about/faq",
  "/citation-and-license",
  "/accessibility",
  "/privacy",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
