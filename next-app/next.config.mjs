// Content-Security-Policy directives. This is an allowlist policy (not
// nonce-based) so that pages stay statically rendered — a nonce CSP requires
// middleware that forces every route to be dynamic. 'unsafe-inline' is required
// for the inline scripts/styles emitted by Next.js, React and Tailwind.
//
// External origins in use:
//   - Matomo analytics (script + connect + image beacon), prod domain only
//   - raw.githubusercontent.com, fetched at runtime by the "others" data page
//
// NOTE: reCAPTCHA origins are intentionally omitted because the contact form
// (the only reCAPTCHA consumer) is not currently mounted. If it is re-enabled,
// add https://www.google.com and https://www.gstatic.com to script-src,
// https://www.google.com to a frame-src directive, and
// https://forms.dc.scilifelab.se to form-action.
const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://matomo.dc.scilifelab.se",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data: https://matomo.dc.scilifelab.se",
  "font-src 'self'",
  "connect-src 'self' https://matomo.dc.scilifelab.se https://raw.githubusercontent.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
];

// Applied to every response. HSTS is intentionally set without `preload`, as
// preload is an org-wide commitment best coordinated at the apex domain. These
// may also be set at the SciLifeLab reverse proxy; app-level headers act as
// defense in depth (confirm with ops to avoid an over-restrictive intersection
// of two Content-Security-Policy headers).
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: cspDirectives.join("; "),
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/about/dsnpmd-projects",
        permanent: true,
      },
      {
        // The KIARVA page was removed from the portal; send old
        // bookmarks and external links to the KIARVA service itself.
        source: "/kiarva",
        destination: "https://kiarva.scilifelab.se/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  output: "standalone",
};

export default nextConfig;
