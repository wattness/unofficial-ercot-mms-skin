import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { measure, ratio, summary } from "../scripts/contrast.mjs";

test("ratio matches known WCAG values", () => {
  assert.equal(ratio("#000", "#fff").toFixed(2), "21.00");
  assert.equal(ratio("#777", "#fff").toFixed(2), "4.48");
});

test("every text pair reaches 4.5:1", () => {
  for (const r of measure().filter((r) => r.kind === "text")) {
    assert.ok(r.ratio >= 4.5, `${r.fg} on ${r.bg} (${r.where}) is ${r.ratio.toFixed(2)}:1`);
  }
});

test("the only sub-4.5 non-disabled pair is the documented exception", () => {
  const low = measure().filter((r) => r.kind !== "disabled" && r.ratio < 4.5);
  assert.deepEqual(
    low.map((r) => `${r.fg} on ${r.bg} ${r.ratio.toFixed(2)}`),
    ["--mms-text-zero on --mms-surface 2.46"],
  );
});

test("the README's contrast counts match the measurement", () => {
  const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8");
  const s = summary();
  assert.match(readme, new RegExp(`All ${s.text} text pairs reach`));
  assert.match(readme, new RegExp(`${s.disabled} disabled-state pairs`));
});
