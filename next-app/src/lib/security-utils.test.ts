import { describe, it, expect } from "vitest";
import {
  sanitizeURL,
  createSafeImageSrc,
  sanitizeText,
  sanitizeHTML,
  createSafeUrl,
  isValidUrl,
  sanitizeObject,
} from "./security-utils";

describe("sanitizeURL", () => {
  it("passes through a valid http(s) URL", () => {
    expect(sanitizeURL("https://example.com/page")).toBe(
      "https://example.com/page",
    );
  });

  it("rejects the javascript: protocol", () => {
    expect(sanitizeURL("javascript:alert(1)")).toBe("#");
  });

  it("rejects a non-allowed protocol", () => {
    expect(sanitizeURL("ftp://example.com")).toBe("#");
  });

  it("rejects a URL without a protocol", () => {
    expect(sanitizeURL("example.com")).toBe("#");
  });

  it("rejects empty or whitespace-only input", () => {
    expect(sanitizeURL("")).toBe("#");
    expect(sanitizeURL("   ")).toBe("#");
  });
});

describe("isValidUrl", () => {
  it("accepts http(s) URLs", () => {
    expect(isValidUrl("https://example.com")).toBe(true);
    expect(isValidUrl("http://example.com")).toBe(true);
  });

  it("rejects the javascript: protocol", () => {
    expect(isValidUrl("javascript:alert(1)")).toBe(false);
  });

  it("rejects non-http protocols and malformed input", () => {
    expect(isValidUrl("ftp://example.com")).toBe(false);
    expect(isValidUrl("not a url")).toBe(false);
  });
});

describe("createSafeImageSrc", () => {
  it("builds a lowercased path under the base directory", () => {
    // Case-insensitive: upstream "Researchdata.png" resolves to the
    // lowercase local asset name.
    expect(createSafeImageSrc("Researchdata.png")).toBe(
      "/img/datasources/researchdata.png",
    );
  });

  it("strips any directory components, defeating traversal", () => {
    const result = createSafeImageSrc("../../etc/passwd.png");
    expect(result).toBe("/img/datasources/passwd.png");
    expect(result).not.toContain("..");
    expect(result.startsWith("/img/datasources/")).toBe(true);
  });

  it("falls back when the filename sanitizes to empty", () => {
    expect(createSafeImageSrc("@@@.png")).toBe(
      "/img/datasources/na-sign-icon.png",
    );
  });

  it("falls back for an empty thumbnail", () => {
    expect(createSafeImageSrc("")).toBe("/img/datasources/na-sign-icon.png");
  });

  it("falls back when the filename exceeds the length limit", () => {
    expect(createSafeImageSrc(`${"a".repeat(60)}.png`)).toBe(
      "/img/datasources/na-sign-icon.png",
    );
  });
});

describe("sanitizeText", () => {
  it("strips script tags and their content", () => {
    expect(sanitizeText("<script>alert('xss')</script>Hello")).toBe("Hello");
  });

  it("keeps text but removes formatting tags", () => {
    expect(sanitizeText("<b>bold</b>")).toBe("bold");
  });

  it("returns an empty string for empty input", () => {
    expect(sanitizeText("")).toBe("");
  });

  it("truncates text beyond the configured max length", () => {
    const result = sanitizeText("a".repeat(1500));
    expect(result.length).toBe(1000); // DEFAULT_SECURITY_CONFIG.maxTextLength
  });
});

describe("sanitizeHTML", () => {
  it("strips all tags by default", () => {
    expect(sanitizeHTML("<b>hi</b>")).toBe("hi");
  });

  it("keeps only the allowed tags", () => {
    expect(sanitizeHTML("<b>hi</b><script>x</script>", ["b"])).toBe(
      "<b>hi</b>",
    );
  });

  it("returns an empty string for non-string input", () => {
    // @ts-expect-error exercising the runtime guard against non-string input
    expect(sanitizeHTML(null)).toBe("");
  });
});

describe("createSafeUrl", () => {
  it("sanitizes the base URL when no path is given", () => {
    expect(createSafeUrl("https://example.com")).toBe("https://example.com");
  });

  it("appends the path before sanitizing", () => {
    expect(createSafeUrl("https://example.com", "/page")).toBe(
      "https://example.com/page",
    );
  });

  it("returns '#' for an invalid base URL", () => {
    expect(createSafeUrl("", "/page")).toBe("#");
  });
});

describe("sanitizeObject", () => {
  it("recursively sanitizes strings while preserving structure and non-strings", () => {
    const input = {
      a: "<b>x</b>",
      b: ["<i>y</i>", "z"],
      c: 5,
      d: null,
    };
    expect(sanitizeObject(input)).toEqual({
      a: "x",
      b: ["y", "z"],
      c: 5,
      d: null,
    });
  });
});
