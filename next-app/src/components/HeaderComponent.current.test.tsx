import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/pm-sample-central",
}));

import HeaderComponent from "./HeaderComponent";

/** DESIGN.md Interaction: "Where am I" — the current nav item is marked. */
describe("HeaderComponent current page", () => {
  const html = renderToStaticMarkup(<HeaderComponent />);

  it("marks the current page's nav link, and only that one", () => {
    const current = html.match(/<a[^>]*aria-current="page"[^>]*>/g) ?? [];
    expect(current).toHaveLength(1);
    expect(current[0]).toContain('href="/pm-sample-central"');
    expect(current[0]).toContain("data-active");
  });

  it("leaves the other top-level links unmarked", () => {
    const omop = html.match(/<a[^>]*href="\/omop-cdm"[^>]*>/)?.[0] ?? "";
    expect(omop).not.toContain("aria-current");
  });
});
