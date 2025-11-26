import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js, prettier: prettierPlugin },
    extends: ["js/recommended", prettierConfig],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node
    },
    ignores: ["build", "node_modules"],
    settings: {
      "import/resolver": {
        alias: {
          map: [
            ["@adapters", "./src/adapters"],
            ["@constants", "./src/constants"],
            ["@controllers", "./src/controllers"],
            ["@middlewares", "./src/middlewares"],
            ["@models", "./src/models"],
            ["@services", "./src/services"],
            ["@types", "./src/types"],
            ["@utils", "./src/utils"],
            ["@validations", "./src/validations"]
          ],
          extensions: [".js", ".ts", ".json"]
        }
      }
    },
    rules: {
      "prettier/prettier": "error",
      "no-unused-vars": "warn",
      "no-console": "off"
    }
  },
  tseslint.configs.recommended
]);
