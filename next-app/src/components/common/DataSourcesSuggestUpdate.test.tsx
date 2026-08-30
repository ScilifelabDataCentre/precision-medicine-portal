import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { DataSourcesSuggestUpdate } from "./DataSourcesSuggestUpdate";

/**
 * The note that invites readers to report gaps in the curated data-source
 * lists. It is rendered on three pages, so a regression here is a regression
 * three times over.
 *
 * These are markup-contract tests: Vitest runs in the `node` environment with
 * no DOM or layout engine, so they assert on the static markup the component
 * produces rather than on a rendered page. That is the whole of this
 * component's behaviour - it is presentational.
 */
describe("DataSourcesSuggestUpdate", () => {
  const html = renderToStaticMarkup(<DataSourcesSuggestUpdate />);

  /** The mailto link, split into its opening tag and its visible text. */
  function emailLink(): { tag: string; text: string } {
    const match = html.match(
      /(<a\b[^>]*href="mailto:[^"]*"[^>]*>)([\s\S]*?)<\/a>/,
    );
    if (!match) throw new Error(`no mailto link found in: ${html}`);
    return { tag: match[1], text: match[2].trim() };
  }

  /** The opening tag of the note paragraph itself. */
  function noteTag(): string {
    const match = html.match(/<p\b[^>]*role="note"[^>]*>/);
    if (!match) throw new Error(`no role="note" paragraph found in: ${html}`);
    return match[0];
  }

  it("shows the contact address as the link's visible text", () => {
    // A bare mailto: does nothing on a machine with no mail handler. Printing
    // the address is what leaves such a reader a way to reach us.
    expect(emailLink().text).toBe("precisionmedicine@scilifelab.se");
  });

  it("gives the email link an accessible name containing its visible text", () => {
    // WCAG 2.5.3 Label in Name (Level A): a speech-input user saying "click
    // <visible text>" must activate the link. The pa11y gate runs HTML_CodeSniffer,
    // which does not check 2.5.3, so this test is the only guard.
    const { tag, text } = emailLink();
    const ariaLabel = tag.match(/aria-label="([^"]*)"/)?.[1];

    expect(ariaLabel).toBeDefined();
    expect(ariaLabel?.toLowerCase()).toContain(text.toLowerCase());
  });

  it("names the Data Centre as the curator of the list", () => {
    // The lists are hand-assembled, not generated. Dropping that provenance
    // turns a hedge into an unqualified promise of completeness.
    expect(html).toContain("manually collected by the Data Centre");
  });

  it("renders the note de-emphasised rather than as a second intro paragraph", () => {
    // It sits directly below <p role="doc-abstract">. At body size and full
    // foreground colour a sighted reader cannot tell the two apart, while a
    // screen-reader user gets the role="note" cue - so the note must carry its
    // own visual de-emphasis.
    const tag = noteTag();
    expect(tag).toMatch(/\btext-sm\b/);
    expect(tag).toMatch(/\btext-muted-foreground\b/);
  });
});
