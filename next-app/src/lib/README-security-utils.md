# Security Utilities Documentation

This module provides comprehensive DOMXSS (DOM-based Cross-Site Scripting) prevention utilities that can be reused across the entire application.

## Overview

The security utilities are designed to prevent common security vulnerabilities by:

- Sanitizing user inputs before rendering
- Validating URLs to prevent protocol-based attacks
- Creating safe image sources to prevent directory traversal
- Sanitizing HTML content with configurable allowed tags
- Providing React components for easy integration

**Note:** This module uses `isomorphic-dompurify` which works seamlessly in both client-side and server-side environments, making it perfect for Next.js applications.

## Quick Start

### Import the utilities

```typescript
import {
  sanitizeText,
  sanitizeURL,
  createSafeImageSrc,
  sanitizeHTML,
  createSafeUrl,
  isValidUrl,
  sanitizeObject,
} from "@/lib/security-utils";
```

### Import React components

```typescript
import { Safe } from "@/components/common/SafeContent";
```

## Utility Functions

### `sanitizeText(text, config?)`

Sanitizes text content to prevent XSS attacks.

```typescript
const safeText = sanitizeText(userInput);
const shortText = sanitizeText(longText, { maxTextLength: 100 });
```

### `sanitizeURL(url, config?)`

Sanitizes URLs to prevent DOMXSS and protocol-based attacks.

```typescript
const safeUrl = sanitizeURL(userProvidedUrl);
// Returns "#" if URL is invalid or dangerous
```

### `createSafeImageSrc(thumbnail, basePath?, fallbackImage?, config?)`

Creates safe image source paths to prevent directory traversal attacks.

```typescript
const safeImage = createSafeImageSrc(userImagePath);
const customImage = createSafeImageSrc(
  userImagePath,
  "/custom/path/",
  "/fallback.png",
);
```

### `sanitizeHTML(html, allowedTags?, allowedAttr?)`

Validates and sanitizes HTML content with configurable allowed tags and attributes.

```typescript
const safeHTML = sanitizeHTML(userHTML);
const richHTML = sanitizeHTML(userHTML, ["p", "strong", "em"], ["class"]);
```

### `createSafeUrl(baseUrl, path?, config?)`

Creates a safe URL by combining base URL and path with validation.

```typescript
const safeUrl = createSafeUrl("https://example.com", userPath);
```

### `isValidUrl(url, config?)`

Validates if a string is a safe URL.

```typescript
const isValid = isValidUrl(userInput);
```

### `sanitizeObject(obj, config?)`

Sanitizes object properties recursively for safe rendering.

```typescript
const safeObject = sanitizeObject(userData);
```

## React Components

### `Safe.Text`

Renders sanitized text content.

```tsx
<Safe.Text text={userInput} />
<Safe.Text text={userInput} as="h1" className="title" />
```

### `Safe.Url`

Renders sanitized links.

```tsx
<Safe.Url url={userUrl}>Visit Website</Safe.Url>
<Safe.Url url={userUrl} target="_self">Internal Link</Safe.Url>
```

### `Safe.HTML`

Renders sanitized HTML content.

```tsx
<Safe.HTML html={userHTML} />
<Safe.HTML
  html={userHTML}
  allowedTags={["p", "strong"]}
  allowedAttr={["class"]}
/>
```

## Configuration

You can customize the security behavior using the `SecurityConfig` interface:

```typescript
interface SecurityConfig {
  maxTextLength?: number; // Default: 1000
  maxFilenameLength?: number; // Default: 50
  allowedProtocols?: string[]; // Default: ["http", "https"]
  allowedFilenameChars?: RegExp; // Default: /[^a-zA-Z0-9_-]/g
}
```

Example with custom configuration:

```typescript
const strictConfig = {
  maxTextLength: 100,
  maxFilenameLength: 20,
  allowedProtocols: ["https"], // Only HTTPS
};

const safeText = sanitizeText(userInput, strictConfig);
```

## Migration Guide

### From inline DOMPurify usage:

**Before:**

```typescript
import DOMPurify from "dompurify";

const safeText = DOMPurify.sanitize(userInput, {
  ALLOWED_TAGS: [],
  ALLOWED_ATTR: [],
});
```

**After:**

```typescript
import { sanitizeText } from "@/lib/security-utils";

const safeText = sanitizeText(userInput);
```

### From isomorphic-dompurify usage:

**Before:**

```typescript
import createDOMPurify from "isomorphic-dompurify";

const DOMPurify = createDOMPurify(window);
const safeText = DOMPurify.sanitize(userInput, {
  ALLOWED_TAGS: [],
  ALLOWED_ATTR: [],
});
```

**After:**

```typescript
import { sanitizeText } from "@/lib/security-utils";

const safeText = sanitizeText(userInput);
```

### From custom URL validation:

**Before:**

```typescript
function validateUrl(url: string) {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === "https:" || urlObj.protocol === "http:";
  } catch {
    return false;
  }
}
```

**After:**

```typescript
import { isValidUrl } from "@/lib/security-utils";

const isValid = isValidUrl(url);
```

## Best Practices

1. **Always sanitize user inputs** before rendering them in the DOM
2. **Use React components** when possible for better integration
3. **Configure security settings** based on your application's needs
4. **Test with malicious inputs** to ensure protection works
5. **Keep dependencies updated** for the latest security patches

## Examples

See `src/components/examples/SecurityExample.tsx` for comprehensive usage examples.

## Security Features

- ✅ Prevents XSS attacks through HTML sanitization
- ✅ Blocks dangerous protocols (javascript:, data:, etc.)
- ✅ Prevents directory traversal attacks
- ✅ Validates URLs comprehensively
- ✅ Configurable security levels
- ✅ TypeScript support
- ✅ React component integration
- ✅ Recursive object sanitization
