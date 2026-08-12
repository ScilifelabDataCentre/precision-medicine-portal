/**
 * URL helpers for comparing the externally-sourced links in the data-source
 * pages. The registry and cohort JSON assets are curated by hand, so the same
 * page often appears under slightly different spellings (http vs https, a
 * stray `www.`, a trailing slash).
 */

/**
 * Reduce a URL to a comparable identity: host (without a leading `www.`) plus
 * path plus query. Protocol, host casing and a trailing slash are ignored
 * because none of them change which page is served. Path and query casing are
 * preserved — most web servers treat those as significant.
 */
function destinationKey(url: string): string {
  const trimmed = url.trim();

  try {
    const parsed = new URL(trimmed);
    const host = parsed.host.toLowerCase().replace(/^www\./, "");
    const path = parsed.pathname.replace(/\/+$/, "");
    return `${host}${path}${parsed.search}`;
  } catch {
    // Not an absolute URL. The data is externally sourced, so rather than
    // guessing a scheme, compare verbatim minus a trailing slash.
    return trimmed.replace(/\/+$/, "");
  }
}

/**
 * True when both URLs resolve to the same page. Used to suppress a secondary
 * link that would only repeat the primary one. Missing input is never "the
 * same": an absent URL cannot duplicate anything.
 */
export function isSameDestination(a?: string, b?: string): boolean {
  if (!a?.trim() || !b?.trim()) return false;
  return destinationKey(a) === destinationKey(b);
}
