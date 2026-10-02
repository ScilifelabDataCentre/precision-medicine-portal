import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ILAB_URL, PMSC_EMAIL } from "@/components/pm-sample-central/content";
import PmSampleCentralPage from "./page";

/**
 * Markup-contract tests for the PM Sample Central page. Vitest runs in the
 * `node` environment with no layout engine, so these pin structure and copy;
 * layout is verified in a real browser.
 */
describe("PmSampleCentralPage", () => {
  const html = renderToStaticMarkup(<PmSampleCentralPage />);
  const main = html;

  /** Visible text only: tags and screen-reader-only spans removed. */
  const text = main
    .replace(/<span class="sr-only">[^<]*<\/span>/g, "")
    .replace(/<[^>]+>/g, " ");

  /** Position of a section's opening tag, by its id. */
  function sectionAt(id: string): number {
    const at = html.indexOf(`id="${id}"`);
    if (at === -1) throw new Error(`no section with id "${id}"`);
    return at;
  }

  it("has exactly one h1, the page title", () => {
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html).toMatch(/<h1[^>]*>Precision Medicine Sample Central<\/h1>/);
  });

  it("offers the request route in the hero and again in the request band", () => {
    const ilab = html.match(
      new RegExp(`<a[^>]*href="${ILAB_URL.replace(/[?]/g, "\\?")}"[^>]*>`, "g"),
    );
    expect(ilab).toHaveLength(2);
    for (const tag of ilab ?? []) {
      expect(tag).toContain('target="_blank"');
      expect(tag).toContain('rel="noopener noreferrer"');
      expect(tag).toContain("(opens in new tab)");
    }
    // Hero and request band.
    expect(html.split(`href="mailto:${PMSC_EMAIL}"`)).toHaveLength(3);
  });

  it("keeps the order Jan chose: tracks, pilots, then why, then the request", () => {
    const order = [
      "what-we-do",
      "the-sample",
      "the-record",
      "pilots",
      "why",
      "request",
      "follow",
    ].map(sectionAt);
    expect(order).toEqual([...order].sort((a, b) => a - b));
  });

  it("joins each sample step to the record it creates, stage by stage", () => {
    const figure = html.slice(
      html.indexOf("<figure"),
      html.indexOf("</figure>"),
    );
    const stages = figure.match(/<li\b[\s\S]*?<\/li>/g) ?? [];
    expect(stages).toHaveLength(4);
    for (const stage of stages) {
      expect(stage.indexOf("The sample")).toBeGreaterThan(-1);
      expect(stage.indexOf("The record")).toBeGreaterThan(
        stage.indexOf("The sample"),
      );
    }
    // The join replaces the dashed ties.
    expect(figure).not.toContain("border-dashed");
  });

  it("uses grape once, on the dashboard box, and teal for one band", () => {
    expect(html.match(/\bbg-grape\b/g)).toHaveLength(1);
    expect(html.match(/<section[^>]*\bbg-teal\b/g)).toHaveLength(1);
  });

  it("renders no image until a file has been supplied", () => {
    expect(html).not.toContain("<img");
  });

  it("uses no dashes as connectors, no references and no work packages", () => {
    expect(text).not.toMatch(/[–—]/);
    expect(text).not.toContain(" · ");
    expect(text).not.toContain("(2)");
    expect(text).not.toMatch(/Work Package/i);
    expect(text).not.toMatch(/standardized|harmonized|optimize/);
    expect(html).not.toContain('id="references"');
  });

  it("runs the two tracks side by side, in one band", () => {
    const sample = html.indexOf('id="the-sample"');
    const record = html.indexOf('id="the-record"');
    const band = html.lastIndexOf("<div", sample);
    expect(record).toBeGreaterThan(sample);
    expect(html.slice(band, sample)).toContain("lg:grid-cols-2");
    expect(html.slice(sample, record)).toContain("Sample preparation");
    expect(html.slice(record)).toContain("Sample data and structure");
  });

  it("states the sourced fact once, in its paragraph", () => {
    expect(html.split("genome data alone points to a treatment")).toHaveLength(
      2,
    );
    expect(html).not.toMatch(/<p aria-hidden="true"[^>]*>“/);
  });

  it("closes with the shared last-updated line, without a personal credit", () => {
    expect(text).toMatch(/Last updated on\s+2 October 2026/);
    expect(html).toContain('<time dateTime="2026-10-02">');
    expect(text).not.toContain("Päivi");
  });

  it("writes FFPE, SOPs and AML out on first use", () => {
    for (const [long, short] of [
      ["Formalin-fixed paraffin-embedded", "FFPE"],
      ["standard operating procedures", "SOPs"],
      ["Acute myeloid leukaemia", "AML"],
    ]) {
      const first = text.indexOf(short);
      expect(text.indexOf(`${long} (${short})`)).toBe(first - long.length - 2);
    }
  });

  it("adds no in-page text links beside the buttons", () => {
    expect(html).not.toMatch(/href="#(request|follow)"/);
  });

  it("keeps the draft's wording", () => {
    for (const phrase of [
      "Oncology-Pathology at Karolinska Institutet and Data Center at SciLifeLab.",
      "The PM Sample Central is being built to make this possible.",
      "Consent &amp; enrolment",
      "requiring standardised sample handling",
      "relevance of the tools: anything that",
    ]) {
      expect(html).toContain(phrase);
    }
  });
});
