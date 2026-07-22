import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

// Minimal Vitest setup. Tests target the pure logic in `src/lib` (search
// ranking and security/sanitization helpers), which needs no DOM: the "node"
// environment is enough, and isomorphic-dompurify supplies its own jsdom
// window on the server. Keeping the surface small keeps maintenance low.
export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: {
      // Mirror the "@/*" -> "./src/*" path alias from tsconfig.json.
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
