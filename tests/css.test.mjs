import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import { build, readTokens } from "../scripts/build.mjs";

const strip = (css) => css.replace(/\/\*[\s\S]*?\*\//g, "");
const selectors = (css) =>
  [...strip(css).matchAll(/([^{}]+)\{[^}]*\}/g)]
    .map((m) => m[1].trim())
    .filter((s) => !s.startsWith("@"))
    .flatMap((s) => s.split(",").map((part) => part.trim()));

const componentFiles = readdirSync(new URL("../src/components/", import.meta.url)).map((f) => [
  `components/${f}`,
  readFileSync(new URL(`../src/components/${f}`, import.meta.url), "utf8"),
]);
const ruleFiles = [["base.css", readFileSync(new URL("../src/base.css", import.meta.url), "utf8")], ...componentFiles];

test("every selector is scoped to data-skin=mms", () => {
  const all = selectors(build().css);
  assert.ok(all.length > 150);
  for (const s of all) assert.match(s, /^(:root|html)?\[data-skin="mms"\]/, s);
});

test("no colour literal outside tokens.css", () => {
  const literal = /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?)\(/i;
  for (const [file, css] of ruleFiles) {
    for (const [i, line] of strip(css).split("\n").entries()) {
      assert.doesNotMatch(line, literal, `${file}:${i + 1}: ${line.trim()}`);
    }
  }
});

test("every var() used is defined, and every token is used or meant for consumers", () => {
  const tokens = readTokens();
  const css = ruleFiles.map(([, c]) => c).join("\n") + readFileSync(new URL("../src/tokens.css", import.meta.url));
  const used = new Set([...css.matchAll(/var\((--[\w-]+)\)/g)].map((m) => m[1]));
  for (const name of used) assert.ok(name in tokens, `${name} is used but not defined`);
  for (const name of Object.keys(tokens)) {
    if (name.startsWith("--mms-chart-")) continue;
    assert.ok(used.has(name), `${name} is defined but never used`);
  }
});

test("a selected row keeps the selection colour when it is also flagged", () => {
  const css = strip(build().css);
  const flagged = css.indexOf(".grid tbody tr.flagged {");
  const selected = css.indexOf('.grid tbody tr[aria-selected="true"],');
  assert.ok(flagged > 0 && selected > flagged, "the aria-selected rule must come after tr.flagged");
});
