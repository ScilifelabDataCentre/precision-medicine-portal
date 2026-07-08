import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [".next/**", "next-env.d.ts"],
  },
  ...nextVitals,
  ...nextTypescript,
  {
    settings: {
      react: {
        version: "19.2.5",
      },
    },
    rules: {
      "prefer-spread": "off",
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
