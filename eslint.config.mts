import tsParser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";
// import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default defineConfig({
  files: ["src/**/*.{ts,mts,js,json}"],
  ignores: ["**/node_modules/**", "**/build/**", "**/.git/**"],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: "./tsconfig.json",
      ecmaVersion: "latest",
      tsconfigRootDir: process.cwd(),
      sourceType: "module"
    }
  },
  plugins: {
    prettier: prettierPlugin
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json"
      }
    }
  },
  rules: {
    "prettier/prettier": "error"
    // "no-console": "warn"
  }
});
