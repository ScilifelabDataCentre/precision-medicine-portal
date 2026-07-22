import type { Metadata } from "next";

/** Canonical origin of the production site, used for metadataBase, sitemap, and robots. */
export const SITE_URL = "https://precision-medicine-portal.scilifelab.se";

/** Human-readable site name, reused in titles and Open Graph. */
export const SITE_NAME = "Precision Medicine Portal";

/**
 * Default Open Graph / social-card image. Resolved against `metadataBase`
 * (set in the root layout), so a root-relative path is enough.
 */
const DEFAULT_OG_IMAGE = {
  url: "/scilifelab-logo/metalogo.png",
  width: 1200,
  height: 628,
  alt: `${SITE_NAME} logo`,
};

/**
 * Build per-page metadata with a consistent title, description, canonical URL,
 * and Open Graph card.
 *
 * The top-level `title` is automatically suffixed with the site name via the
 * `title.template` defined in the root layout. Open Graph and Twitter are not
 * deeply merged by Next.js, so their shared fields are repeated here rather than
 * inherited from the root. `openGraph.title` is left as the bare page title
 * (Open Graph pairs it with `og:site_name` for branding).
 *
 * @param path Root-relative path of the page, e.g. "/contact". Resolved against
 *   `metadataBase` for the canonical and og:url values.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      images: [DEFAULT_OG_IMAGE],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}
