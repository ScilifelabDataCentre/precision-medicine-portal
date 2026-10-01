import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("drops falsy values", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });

  it("supports conditional object and array syntax", () => {
    expect(cn(["a", "b"], { c: true, d: false })).toBe("a b c");
  });

  it("merges conflicting Tailwind utilities, last one winning", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("keeps v2 type tokens next to a colour utility", () => {
    expect(cn("text-label text-ink")).toBe("text-label text-ink");
    expect(cn("text-caption text-ink-muted")).toBe(
      "text-caption text-ink-muted",
    );
    expect(cn("text-ui", "text-danger")).toBe("text-ui text-danger");
  });

  it("resolves v2 type tokens against other font sizes", () => {
    expect(cn("text-ui", "text-lg")).toBe("text-lg");
  });

  it("resolves v2 radius, spacing, shadow and container tokens", () => {
    expect(cn("rounded-md", "rounded-pill")).toBe("rounded-pill");
    expect(cn("h-10", "h-target")).toBe("h-target");
    expect(cn("shadow-md", "shadow-media")).toBe("shadow-media");
    expect(cn("shadow-md", "shadow-float")).toBe("shadow-float");
    expect(cn("max-w-xl", "max-w-content")).toBe("max-w-content");
  });
});
