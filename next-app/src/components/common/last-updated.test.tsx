import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { LastUpdated, toIsoDate } from "./last-updated";

describe("LastUpdated", () => {
  it("formats an ISO date for the page's language", () => {
    const html = renderToStaticMarkup(<LastUpdated date="2026-10-02" />);
    expect(html).toContain(
      'Last updated on <time dateTime="2026-10-02">2 October 2026</time>',
    );
  });

  it("accepts the DD-MM-YYYY dates older pages pass", () => {
    expect(toIsoDate("17-03-2026")).toBe("2026-03-17");
    const html = renderToStaticMarkup(<LastUpdated date="17-03-2026" />);
    expect(html).toContain(">17 March 2026</time>");
  });

  it("renders an unparseable date as written instead of throwing", () => {
    const html = renderToStaticMarkup(<LastUpdated date="soon" />);
    expect(html).toContain(">soon</time>");
  });
});
