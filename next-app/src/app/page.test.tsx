import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import HomePage from "./page";

/**
 * Card titles come from hand-written arrays and are not all wrappable prose:
 * "DIGIfor1healthSE" is a single 16-character token with no space or hyphen
 * for the browser to break on. In the three-column grid it measured 182px
 * inside a 126px box and spilled past the card's right border - visible, but
 * hanging outside the card it belongs to.
 *
 * `break-words` (`overflow-wrap: break-word`) only takes effect when a word
 * genuinely cannot fit, so ordinary multi-word titles keep breaking at spaces
 * exactly as before.
 */
describe("HomePage", () => {
  const html = renderToStaticMarkup(<HomePage />);

  /** The rendered card-title heading whose text is exactly `title`. */
  function cardTitle(title: string): string {
    const match = html.match(new RegExp(`<h3[^>]*>${title}</h3>`));
    if (!match) throw new Error(`no card title found for "${title}"`);
    return match[0];
  }

  it("renders the long single-word card title", () => {
    expect(html).toContain("DIGIfor1healthSE");
  });

  it("lets an unbreakable card title wrap instead of escaping its card", () => {
    expect(cardTitle("DIGIfor1healthSE")).toMatch(/\bbreak-words\b/);
  });

  it("applies the same wrapping to the data-source card titles", () => {
    expect(cardTitle("National Genomics Platform")).toMatch(/\bbreak-words\b/);
  });
});
