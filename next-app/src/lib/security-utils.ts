import DOMPurify from "isomorphic-dompurify";
import validator from "validator";

/**
 * Security utilities for preventing DOMXSS and other security vulnerabilities
 * This module provides reusable functions for sanitizing user inputs and dynamic content
 */

export interface SecurityConfig {
  maxTextLength?: number;
  maxFilenameLength?: number;
  allowedProtocols?: string[];
  allowedFilenameChars?: RegExp;
}

export const DEFAULT_SECURITY_CONFIG: SecurityConfig = {
  maxTextLength: 1000,
  maxFilenameLength: 50,
  allowedProtocols: ["http", "https"],
  allowedFilenameChars: /[^a-zA-Z0-9_-]/g,
};

// isomorphic-dompurify's default export is already initialized for the
// current environment: bound to a jsdom window on the server and to the
// real window in the browser. Calling it as a factory with `undefined`
// (as this module previously did) yields an instance without a working
// `sanitize` on the server.

/**
 * Sanitizes URLs to prevent DOMXSS and protocol-based attacks
 * @param url - The URL to sanitize
 * @param config - Security configuration options
 * @returns Sanitized URL or "#" if invalid
 */
export function sanitizeURL(
  url: string,
  config: SecurityConfig = DEFAULT_SECURITY_CONFIG
): string {
  // Basic validation
  if (!url || typeof url !== "string" || url.trim().length === 0) {
    return "#";
  }

  // Use validator.js for comprehensive URL validation
  if (
    !validator.isURL(url, {
      protocols: config.allowedProtocols,
      require_protocol: true,
      allow_underscores: true,
    })
  ) {
    return "#";
  }

  // Additional protocol check to prevent javascript: and other dangerous protocols
  try {
    const urlObj = new URL(url);
    if (urlObj.protocol !== "https:" && urlObj.protocol !== "http:") {
      return "#";
    }
  } catch {
    return "#";
  }

  // DOMPurify will handle any remaining XSS attempts
  return DOMPurify.sanitize(url, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
}

/**
 * Creates safe image source paths to prevent directory traversal attacks
 * @param thumbnail - The thumbnail path or filename
 * @param basePath - The base path for images (default: "/img/datasources/")
 * @param fallbackImage - Fallback image path (default: "/img/datasources/na-sign-icon.png")
 * @param config - Security configuration options
 * @returns Safe image source path
 */
export function createSafeImageSrc(
  thumbnail: string,
  basePath: string = "/img/datasources/",
  fallbackImage: string = "/img/datasources/na-sign-icon.png",
  config: SecurityConfig = DEFAULT_SECURITY_CONFIG
): string {
  if (
    !thumbnail ||
    typeof thumbnail !== "string" ||
    thumbnail.trim().length === 0
  ) {
    return fallbackImage;
  }

  // Extract and sanitize filename
  const filename = thumbnail.split("/").pop()?.split(".")[0] || "na-sign-icon";

  // Enhanced validation to ensure it's alphanumeric with allowed characters
  const sanitizedFilename = filename.replace(
    config.allowedFilenameChars ||
      DEFAULT_SECURITY_CONFIG.allowedFilenameChars!,
    ""
  );

  if (
    !sanitizedFilename ||
    sanitizedFilename.length >
      (config.maxFilenameLength ||
        DEFAULT_SECURITY_CONFIG.maxFilenameLength!) ||
    sanitizedFilename.length < 1
  ) {
    return fallbackImage;
  }

  // Additional check to prevent directory traversal attempts
  if (
    sanitizedFilename.includes("..") ||
    sanitizedFilename.includes("/") ||
    sanitizedFilename.includes("\\")
  ) {
    return fallbackImage;
  }

  // Lowercase the filename so the resolved path is robust to the casing used
  // in the (externally-sourced) thumbnail names. Locally stored thumbnails are
  // kept lowercase to match; case-sensitive servers otherwise 404 on a mismatch
  // (e.g. upstream "Researchdata.png" vs local "researchdata.png").
  return `${basePath}${sanitizedFilename.toLowerCase()}.png`;
}

/**
 * Sanitizes text content to prevent XSS attacks
 * @param text - The text to sanitize
 * @param config - Security configuration options
 * @returns Sanitized text
 */
export function sanitizeText(
  text: string,
  config: SecurityConfig = DEFAULT_SECURITY_CONFIG
): string {
  if (!text || typeof text !== "string" || text.trim().length === 0) {
    return "";
  }

  const maxLength =
    config.maxTextLength || DEFAULT_SECURITY_CONFIG.maxTextLength!;

  // Additional length check to prevent extremely long text
  if (text.length > maxLength) {
    return DOMPurify.sanitize(text.substring(0, maxLength), {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    });
  }

  return DOMPurify.sanitize(text, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
}

/**
 * Validates and sanitizes HTML content with configurable allowed tags and attributes
 * @param html - The HTML content to sanitize
 * @param allowedTags - Array of allowed HTML tags (default: [])
 * @param allowedAttr - Array of allowed HTML attributes (default: [])
 * @returns Sanitized HTML content
 */
export function sanitizeHTML(
  html: string,
  allowedTags: string[] = [],
  allowedAttr: string[] = []
): string {
  if (!html || typeof html !== "string") {
    return "";
  }

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: allowedTags,
    ALLOWED_ATTR: allowedAttr,
  });
}

/**
 * Creates a safe URL by combining base URL and path with validation
 * @param baseUrl - The base URL
 * @param path - The path to append
 * @param config - Security configuration options
 * @returns Safe combined URL or "#" if invalid
 */
export function createSafeUrl(
  baseUrl: string,
  path?: string | null,
  config: SecurityConfig = DEFAULT_SECURITY_CONFIG
): string {
  if (!baseUrl || typeof baseUrl !== "string") {
    return "#";
  }

  if (!path) {
    return sanitizeURL(baseUrl, config);
  }

  const combinedUrl = baseUrl + path;
  return sanitizeURL(combinedUrl, config);
}

/**
 * Validates if a string is a safe URL
 * @param url - The URL to validate
 * @param config - Security configuration options
 * @returns True if the URL is safe, false otherwise
 */
export function isValidUrl(
  url: string,
  config: SecurityConfig = DEFAULT_SECURITY_CONFIG
): boolean {
  if (!url || typeof url !== "string") {
    return false;
  }

  try {
    const urlObj = new URL(url);
    return (
      (urlObj.protocol === "https:" || urlObj.protocol === "http:") &&
      validator.isURL(url, {
        protocols: config.allowedProtocols,
        require_protocol: true,
        allow_underscores: true,
      })
    );
  } catch {
    return false;
  }
}

/**
 * Sanitizes object properties recursively for safe rendering
 * @param obj - The object to sanitize
 * @param config - Security configuration options
 * @returns Sanitized object
 */
export function sanitizeObject(
  obj: unknown,
  config: SecurityConfig = DEFAULT_SECURITY_CONFIG
): unknown {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === "string") {
    return sanitizeText(obj, config);
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item, config));
  }

  if (typeof obj === "object") {
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitized[key] = sanitizeObject(value, config);
    }
    return sanitized;
  }

  return obj;
}

/**
 * React hook for creating sanitized values that can be used in JSX
 * @param value - The value to sanitize
 * @param config - Security configuration options
 * @returns Sanitized value
 */
export function useSanitizedValue(
  value: string,
  config: SecurityConfig = DEFAULT_SECURITY_CONFIG
): string {
  return sanitizeText(value, config);
}

/**
 * React hook for creating sanitized URLs that can be used in href attributes
 * @param url - The URL to sanitize
 * @param config - Security configuration options
 * @returns Sanitized URL
 */
export function useSanitizedUrl(
  url: string,
  config: SecurityConfig = DEFAULT_SECURITY_CONFIG
): string {
  return sanitizeURL(url, config);
}
