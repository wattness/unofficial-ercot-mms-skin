import js from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["dist/"] },
  js.configs.recommended,
  { files: ["**/*.mjs", "eslint.config.js"], languageOptions: { globals: globals.node } },
  { files: ["demo/**/*.js"], languageOptions: { sourceType: "script", globals: globals.browser } },
];
