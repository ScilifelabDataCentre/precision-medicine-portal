import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier/flat";

const eslintConfig = [
  {
    ignores: [".next/**", "next-env.d.ts"],
  },
  ...nextVitals,
  ...nextTypescript,
  {
    settings: {
      react: {
        // Hardcoded because eslint-plugin-react's automatic version
        // detection crashes under ESLint 10 (its detect path still calls
        // the removed context.getFilename API). Remove once the plugin
        // bundled by eslint-config-next supports ESLint 10 detection.
        version: "19",
      },
    },
    rules: {
      "prefer-spread": "off",
      // Enforce next/image over raw <img> so images are always optimized.
      "@next/next/no-img-element": "error",
    },
  },
  // Must be last: turns off ESLint rules that conflict with Prettier formatting.
  eslintConfigPrettier,
];

export default eslintConfig;
