// WCAG 2.x contrast for the text/background token pairs the components produce.
//
//   node scripts/contrast.mjs        prints a Markdown table
import { fileURLToPath } from "node:url";
import { readTokens } from "./build.mjs";

// [text, background, where, kind]. "text" must reach 4.5:1; "disabled" is exempt
// under WCAG 1.4.3 (inactive components); "exception" is a known, documented gap.
const OWN = [
  ["text", "bg", "body text", "text"],
  ["text", "head-bg", "grid header", "text"],
  ["text", "band", "hourly row labels, buttons", "text"],
  ["text", "panel", "query panel", "text"],
  ["text", "title-band", "grid title", "text"],
  ["text", "field-bg", "inputs", "text"],
  ["text", "corner-bg", "hourly corner cell", "text"],
  ["text", "code-bg", "inline code", "text"],
  ["text", "day-hover-bg", "hovered calendar day", "text"],
  ["text", "tab-hover-bg", "hovered nav item", "text"],
  ["text", "button-hover-bottom", "hovered button", "text"],
  ["text-strong", "band", "section header", "text"],
  ["text-strong", "bg", "selected tab", "text"],
  ["tab-text", "band", "tab, nav heading", "text"],
  ["tab-text", "tab-hover-bg", "hovered tab", "text"],
  ["text-muted", "bg", "masthead user, local time", "text"],
  ["text-muted", "field-bg", "placeholder, combobox hint", "text"],
  ["text-secondary", "band", "section note, actions hint", "text"],
  ["note-text", "note-bg", "note", "text"],
  ["note-text", "note-warn-bg", "warning note", "text"],
  ["note-text", "note-bad-bg", "error note", "text"],
  ["text", "note-bg", "bold text in a note", "text"],
  ["text", "note-warn-bg", "bold text in a warning note", "text"],
  ["text", "note-bad-bg", "bold text in an error note", "text"],
  ["on-accent", "accent", "current nav item, active option", "text"],
  ["on-accent", "danger", "environment badge", "text"],
  ["on-accent-muted", "accent", "hint in active option", "text"],
  ["surface", "text-muted", "info mark", "text"],
  ["surface", "accent", "hovered info mark", "text"],
  ["danger", "band", "danger button", "text"],
  ["danger", "button-hover-bottom", "hovered danger button", "text"],
  ["success", "bg", "status bar OK", "text"],
  ["warning", "bg", "status bar warning, countdown", "text"],
  ["danger", "bg", "status bar error, countdown", "text"],
  ["badge-text", "badge-bg", "badge", "text"],
  ["success", "phase-open-bg", "phase: open", "text"],
  ["warning", "phase-closing-bg", "phase: closing", "text"],
  ["danger", "phase-urgent-bg", "phase: urgent", "text"],
  ["accent", "title-band", "phase: posted", "text"],
  ["phase-adjustment-text", "phase-adjustment-bg", "phase: adjustment", "text"],
  ["listing-text", "listing-bg", "code listing", "text"],
  ["text-unavailable", "band", "unavailable tab", "disabled"],
  ["text-unavailable", "panel", "unavailable nav item", "disabled"],
  ["text-unavailable", "tab-hover-bg", "hovered unavailable tab or nav item", "disabled"],
  ["text-disabled", "field-disabled-bg", "disabled input", "disabled"],
  ["button-disabled-text", "band", "disabled button", "disabled"],
  ["button-small-disabled-text", "band", "disabled calendar arrow", "disabled"],
  ["text-faint", "unavailable-bg", "unavailable calendar day", "disabled"],
  ["text-zero", "surface", "zero in a read-only hourly cell", "exception"],
];

// Text a results-grid cell can hold (plain, .empty, .aside, .clamp-3, pills, .money td.neg,
// link buttons) on each background a row can take.
const GRID_TEXT = ["text", "text-muted", "success", "warning", "danger", "accent", "link-hover"];
const GRID_ROWS = {
  surface: "row",
  "row-hover-bg": "hovered row",
  "selected-bg": "selected row",
  "flag-bg": "flagged row",
};

// Hourly cells: plain, signed and legible-zero values on plain, selected, edited and focused cells.
const HOURLY_TEXT = ["text", "qty-negative", "qty-positive", "text-muted"];
const HOURLY_CELLS = {
  surface: "hourly cell",
  "selected-bg": "selected hourly row",
  "cell-highlight-bg": "edited hourly cell",
  "field-bg": "focused hourly input",
};

const cross = (fgs, bgs) => fgs.flatMap((fg) => Object.entries(bgs).map(([bg, where]) => [fg, bg, where, "text"]));

const unique = new Map();
for (const p of [...OWN, ...cross(GRID_TEXT, GRID_ROWS), ...cross(HOURLY_TEXT, HOURLY_CELLS)]) {
  const key = `${p[0]} ${p[1]}`;
  if (!unique.has(key)) unique.set(key, p);
}

export const PAIRS = [...unique.values()].map(([fg, bg, where, kind]) => ({
  fg: `--mms-${fg}`,
  bg: `--mms-${bg}`,
  where,
  kind,
}));

function luminance(hex) {
  const h = hex.slice(1).length === 3 ? [...hex.slice(1)].map((c) => c + c).join("") : hex.slice(1);
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export function measure(tokens = readTokens()) {
  return PAIRS.map((p) => ({ ...p, ratio: ratio(tokens[p.fg], tokens[p.bg]) }));
}

export function summary(rows = measure()) {
  const count = (kind) => rows.filter((r) => r.kind === kind).length;
  return {
    text: count("text"),
    passing: rows.filter((r) => r.kind === "text" && r.ratio >= 4.5).length,
    disabled: count("disabled"),
    exception: count("exception"),
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const rows = measure();
  console.log("| text | background | used for | ratio | kind |\n|---|---|---|---:|---|");
  for (const r of rows) console.log(`| \`${r.fg}\` | \`${r.bg}\` | ${r.where} | ${r.ratio.toFixed(2)} | ${r.kind} |`);
  const s = summary(rows);
  console.log(
    `\n${s.passing} of ${s.text} text pairs reach 4.5:1; ` +
      `${s.disabled} disabled-state pairs are exempt; ${s.exception} known exception.`,
  );
}
