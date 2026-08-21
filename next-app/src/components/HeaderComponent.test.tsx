import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import HeaderComponent from "./HeaderComponent";

/**
 * The header bar is one flex row: logo, then either the desktop nav or the
 * mobile menu button. Its content has a hard floor - `px-4` (32px), `gap-4`
 * (16px) and the 40px icon button leave 232px for the logo on a 320px screen,
 * but the logo PNG is 600x59.5 rendered at `h-7`, i.e. 282px wide.
 *
 * While the logo link carried `shrink-0` that overflow had nowhere to go: the
 * button was pushed to x=314..354 in a 320px viewport, leaving a 6px sliver,
 * and `html { overflow-x: clip }` hid the spill instead of revealing it. A
 * 320px device had no reachable navigation at all.
 *
 * These are markup-contract tests, not layout tests - Vitest runs in the
 * `node` environment with no layout engine, so they pin the two flex rules
 * that let the row fit rather than measuring the result. The measured
 * behaviour is verified against a real browser separately.
 */
describe("HeaderComponent", () => {
  const html = renderToStaticMarkup(<HeaderComponent />);

  /** The homepage link wrapping the logo image. */
  function logoLink(): string {
    const match = html.match(/<a[^>]*aria-label="Go to homepage"[^>]*>/);
    if (!match) throw new Error("no homepage logo link found");
    return match[0];
  }

  /** The wrapper around the mobile menu button, hidden at `navbar:` and up. */
  function mobileNavWrapper(): string {
    const match = html.match(/<div class="[^"]*navbar:hidden[^"]*"[^>]*>/);
    if (!match) throw new Error("no mobile nav wrapper found");
    return match[0];
  }

  it("lets the logo give up width so the row can fit a narrow screen", () => {
    expect(logoLink()).not.toMatch(/\bshrink-0\b/);
  });

  it("scales the logo image down instead of overflowing the row", () => {
    const image = html.match(
      /<img[^>]*alt="Precision Medicine Portal[^"]*"[^>]*>/,
    );
    expect(image?.[0]).toMatch(/\bmax-w-full\b/);
  });

  it("never lets the mobile menu button be squeezed out of the row", () => {
    expect(mobileNavWrapper()).toMatch(/\bshrink-0\b/);
  });
});
