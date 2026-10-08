// Check the values marked "sampled" in src/tokens.css against the screenshot
// they were taken from. Downloads the public deck unless --deck <path> is given.
//
//   node scripts/verify-provenance.mjs [--deck path/to/deck.pptx]
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { colourCounts, decodePng, readZipEntry } from "./lib/png.mjs";

const SOURCE = {
  url: "https://www.ercot.com/files/docs/2026/08/20/ERCOT-TWG-2026-08-20-NPRR-1188-System-Impacts.pptx",
  sha256: "0763399d7e59fa37dd8d6cd16361f12c6a5c80bbd3df8efa4437b885ede2bfd2",
  entry: "ppt/media/image11.png",
};

// Where each sampled colour appears: [x, y, what is there].
const POINTS = {
  "--mms-bg": [
    [680, 40, "selected tab"],
    [1000, 118, "query row"],
  ],
  "--mms-surface": [
    [1050, 15, "tab strip"],
    [600, 290, "grid row"],
  ],
  "--mms-band": [
    [60, 35, "unselected tab"],
    [600, 80, "section header"],
  ],
  "--mms-title-band": [[600, 216, "results grid title"]],
  "--mms-head-bg": [[600, 243, "grid column headers"]],
  "--mms-selected-bg": [[600, 266, "selected row"]],
  "--mms-rule": [[600, 254, "rule between rows"]],
  "--mms-accent": [[600, 65, "rule under the tab strip"]],
};

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function sampledTokens() {
  const css = readFileSync(join(root, "src/tokens.css"), "utf8");
  return [...css.matchAll(/(--mms-[\w-]+):\s*([^;]+);\s*\/\*\s*sampled\b/g)].map((m) => [m[1], m[2].trim()]);
}

/** y positions of rows where at least `share` of the pixels are `hex`. */
function ruleRows({ width, height, channels, pixels }, hex, share = 0.3) {
  const [r, g, b] = Buffer.from(hex.slice(1), "hex");
  const rows = [];
  for (let y = 0; y < height; y++) {
    let n = 0;
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      if (pixels[i] === r && pixels[i + 1] === g && pixels[i + 2] === b) n++;
    }
    if (n >= width * share) rows.push(y);
  }
  return rows;
}

/** The most common gap between consecutive rows. */
function modalGap(rows) {
  const counts = new Map();
  for (let i = 1; i < rows.length; i++) {
    const gap = rows[i] - rows[i - 1];
    if (gap > 1) counts.set(gap, (counts.get(gap) ?? 0) + 1);
  }
  return [...counts].sort((a, b) => b[1] - a[1])[0] ?? [0, 0];
}

async function loadDeck() {
  const i = process.argv.indexOf("--deck");
  if (i > 0) return readFileSync(process.argv[i + 1]);
  const res = await fetch(SOURCE.url);
  if (!res.ok) {
    console.error(`HTTP ${res.status} for ${SOURCE.url}`);
    console.error("ercot.com refuses some regions and clients. Download the file in a browser and pass --deck <path>.");
    process.exit(2);
  }
  return Buffer.from(await res.arrayBuffer());
}

const deck = await loadDeck();
const digest = createHash("sha256").update(deck).digest("hex");
if (digest !== SOURCE.sha256) {
  console.error(`sha256 mismatch: expected ${SOURCE.sha256}, got ${digest}`);
  process.exit(1);
}

const image = decodePng(readZipEntry(deck, SOURCE.entry));
const counts = colourCounts(image);
const tokens = Object.fromEntries(sampledTokens());
const failures = [];
const lines = [`${SOURCE.entry}: ${image.width}x${image.height}, ${counts.size} distinct colours`];

const longHex = (v) => (v.length === 4 ? "#" + [...v.slice(1)].map((c) => c + c).join("") : v).toLowerCase();
const pixelAt = (x, y) => {
  const i = (y * image.width + x) * image.channels;
  return "#" + image.pixels.subarray(i, i + 3).toString("hex");
};

for (const [name, value] of Object.entries(tokens)) {
  if (!value.startsWith("#")) continue;
  const hex = longHex(value);
  const n = counts.get(hex) ?? 0;
  const where = (POINTS[name] ?? []).map(([x, y, what]) => {
    if (pixelAt(x, y) !== hex) failures.push(`${name}: pixel (${x},${y}) is ${pixelAt(x, y)}, not ${hex}`);
    return `${what} (${x},${y})`;
  });
  lines.push(`${name.padEnd(18)} ${hex}  ${String(n).padStart(7)} px  ${where.join("; ")}`);
  if (!n) failures.push(`${name} ${value} does not occur in the image`);
  if (!where.length) failures.push(`${name} has no location in POINTS`);
}

const rowRules = ruleRows(image, tokens["--mms-rule"]);
const [pitch, repeats] = modalGap(rowRules);
lines.push(`row-rule pitch: ${pitch}px (seen ${repeats} times); --mms-row-height is ${tokens["--mms-row-height"]}`);
if (`${pitch}px` !== tokens["--mms-row-height"]) failures.push("row pitch does not match --mms-row-height");

const accentRows = ruleRows(image, tokens["--mms-accent"]);
const thickness = accentRows.length;
lines.push(`accent rule: ${thickness}px tall at y=${accentRows[0]}; --mms-strip-rule is ${tokens["--mms-strip-rule"]}`);
if (`${thickness}px` !== tokens["--mms-strip-rule"])
  failures.push("accent rule thickness does not match --mms-strip-rule");

console.log(lines.join("\n"));
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`ok: ${Object.keys(tokens).length} sampled values match the source image`);
