import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { TwoGatesDiagram } from "./two-gates-diagram";

/**
 * The diagram is wider than a phone screen and scrolls horizontally inside its
 * card (see the component's own notes on the `min-w-175` floor). A region that
 * only scrolls by swipe or trackpad strands keyboard and switch-access users:
 * roughly half the diagram - GATE 2, the three region boxes and the "Tagged
 * data in GMC Joint" outcome - sits outside the visible box on a phone and
 * cannot be reached at all without focusing the scroll container first.
 *
 * That is WCAG 2.1.1 Keyboard (Level A), and axe reports it as
 * `scrollable-region-focusable`. The repo's pa11y gate runs the HTML
 * CodeSniffer runner, which has no equivalent rule, so CI stays green either
 * way - these tests are the regression guard instead.
 */
describe("TwoGatesDiagram", () => {
  /** The card wrapping the svg: the element that actually scrolls. */
  function scrollContainer(html: string): string {
    const match = html.match(/<div[^>]*overflow-x-auto[^>]*>/);
    if (!match) throw new Error("no horizontally scrollable container found");
    return match[0];
  }

  it("renders a horizontally scrollable container around the diagram", () => {
    const html = renderToStaticMarkup(<TwoGatesDiagram />);

    expect(scrollContainer(html)).toContain("overflow-x-auto");
  });

  it("makes the scrollable container reachable by keyboard", () => {
    const html = renderToStaticMarkup(<TwoGatesDiagram />);

    expect(scrollContainer(html)).toContain('tabindex="0"');
  });

  it("gives the scrollable container an accessible name", () => {
    const html = renderToStaticMarkup(<TwoGatesDiagram />);

    const container = scrollContainer(html);
    expect(container).toMatch(/role="group"/);
    expect(container).toMatch(/aria-label="[^"]+"/);
  });
});
