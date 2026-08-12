import { describe, it, expect } from "vitest";
import { isSameDestination } from "./url-utils";

describe("isSameDestination", () => {
  it("treats trailing-slash-only differences as the same page", () => {
    expect(isSameDestination("https://x.se/reg", "https://x.se/reg/")).toBe(
      true,
    );
  });

  it("ignores protocol and host casing", () => {
    expect(isSameDestination("http://X.se/reg", "https://x.se/reg")).toBe(true);
  });

  it("ignores a leading www.", () => {
    expect(isSameDestination("https://www.x.se/reg", "https://x.se/reg")).toBe(
      true,
    );
  });

  it("treats paths differing only by case as different pages", () => {
    expect(isSameDestination("https://x.se/Reg", "https://x.se/reg")).toBe(
      false,
    );
  });

  it("treats a differing query string as a different page", () => {
    expect(isSameDestination("https://x.se/p", "https://x.se/p?id=7")).toBe(
      false,
    );
    expect(
      isSameDestination("https://x.se/p?id=7", "https://x.se/p?id=8"),
    ).toBe(false);
  });

  it("ignores surrounding whitespace", () => {
    expect(isSameDestination("  https://x.se/reg  ", "https://x.se/reg")).toBe(
      true,
    );
  });

  it("returns false when either URL is missing", () => {
    expect(isSameDestination(undefined, "https://x.se")).toBe(false);
    expect(isSameDestination("https://x.se", undefined)).toBe(false);
    expect(isSameDestination("", "")).toBe(false);
  });

  it("falls back to string comparison for unparseable input", () => {
    expect(isSameDestination("not a url", "not a url")).toBe(true);
    expect(isSameDestination("not a url", "other junk")).toBe(false);
  });
});
