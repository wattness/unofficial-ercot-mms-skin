import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import { build, readTokens } from "../scripts/build.mjs";

const ASSETS = new URL("../skills/building-mms-screens/assets/", import.meta.url);

test("bundle inlines every component file and no @import remains", () => {
  const { css } = build();
  assert.doesNotMatch(css, /@import/);
  const index = readFileSync(new URL("../src/index.css", import.meta.url), "utf8");
  const imported = [...index.matchAll(/@import url\("\.\/(.+?)"\)/g)].map((m) => m[1]);
  const components = readdirSync(new URL("../src/components/", import.meta.url)).map((f) => `components/${f}`);
  assert.deepEqual(imported.filter((f) => f.startsWith("components/")).sort(), components.sort());
});

test("tokens.json resolves every var() to a literal", () => {
  const tokens = readTokens();
  assert.ok(Object.keys(tokens).length > 50);
  for (const [name, value] of Object.entries(tokens)) assert.doesNotMatch(value, /var\(/, name);
});

test("the skill's copies match a fresh build (run npm run build if this fails)", () => {
  const { css, tokens } = build();
  assert.equal(readFileSync(new URL("mms-skin.css", ASSETS), "utf8"), css);
  assert.equal(readFileSync(new URL("tokens.json", ASSETS), "utf8"), tokens);
});
