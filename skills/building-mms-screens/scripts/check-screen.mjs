#!/usr/bin/env node
// Check HTML pages that use the MMS skin. Prints one line per finding and
// exits 1 if any finding is an error.
//
//   node scripts/check-screen.mjs page.html [more.html ...]
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const SKIN = readFileSync(join(here, "../assets/mms-skin.css"), "utf8");

const COLOUR_LITERAL =
  /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch)\(|\b(?:white|black|red|green|blue|yellow|orange|gray|grey|silver|navy|maroon|purple|teal)\b/i;
const COLOUR_PROPERTY = /color|background|border|outline|fill|stroke|shadow/i;
const STATE_CLASSES = new Set(["selected", "current", "disabled", "expanded"]);
const UNLABELLED_INPUT_TYPES = new Set(["hidden", "submit", "reset", "button", "image"]);

export function skinClasses(css = SKIN) {
  const selectors = css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\{[^}]*\}/g, ",");
  return new Set([...selectors.matchAll(/\.([a-z_][\w-]*)/gi)].map((m) => m[1]));
}

function parseAttributes(text = "") {
  const attrs = {};
  for (const m of text.matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g)) {
    attrs[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? "";
  }
  return attrs;
}

function colourDeclarations(css) {
  return css
    .replace(/[^{}]*\{|\}/g, ";")
    .split(";")
    .map((d) => d.split(":"))
    .filter(([prop, ...value]) => value.length && COLOUR_PROPERTY.test(prop) && COLOUR_LITERAL.test(value.join(":")))
    .map(([prop, ...value]) => `${prop.trim()}: ${value.join(":").trim()}`);
}

export function checkHtml(html, known = skinClasses()) {
  const findings = [];
  const lineAt = (index) => html.slice(0, index).split("\n").length;
  const add = (level, index, message) => findings.push({ level, line: lineAt(index), message });

  const tags = [...html.matchAll(/<([a-z][\w-]*)(\s[^<>]*?)?\/?>/gi)].map((m) => ({
    name: m[1].toLowerCase(),
    attrs: parseAttributes(m[2]),
    index: m.index,
  }));

  const labels = [...html.matchAll(/<label\b([^>]*)>[\s\S]*?<\/label>/gi)];
  const labelFor = new Set(labels.map((m) => parseAttributes(m[1]).for).filter(Boolean));
  const insideLabel = (index) => labels.some((m) => index > m.index && index < m.index + m[0].length);
  const named = (attrs) => Boolean(attrs["aria-label"]?.trim() || attrs["aria-labelledby"] || attrs.title?.trim());

  const root = tags.find((t) => t.name === "html");
  if (!root || root.attrs["data-skin"] !== "mms") {
    add("error", root?.index ?? 0, 'set data-skin="mms" on <html>; every rule in the skin is scoped to it');
  }

  for (const m of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) {
    for (const decl of colourDeclarations(m[1])) {
      add("error", m.index, `colour literal in <style> (${decl}); use a var(--mms-*) token`);
    }
  }

  const unknown = new Map();
  for (const tag of tags) {
    const { name, attrs, index } = tag;
    const classes = (attrs.class ?? "").split(/\s+/).filter(Boolean);

    for (const decl of colourDeclarations(attrs.style ?? "")) {
      add("error", index, `colour literal in style attribute (${decl}); use a var(--mms-*) token`);
    }
    for (const attr of ["fill", "stroke", "color", "bgcolor"]) {
      if (attrs[attr] && COLOUR_LITERAL.test(attrs[attr]) && !/currentcolor/i.test(attrs[attr])) {
        add("error", index, `colour literal in ${attr}="${attrs[attr]}"; use currentColor or a token`);
      }
    }
    const size = /font-size:\s*([\d.]+)px/i.exec(attrs.style ?? "");
    if (size && Number(size[1]) < 10) add("warning", index, `font-size ${size[1]}px is below the 10px minimum`);

    if (name === "img" && !("alt" in attrs)) add("error", index, "<img> needs an alt attribute");
    const control =
      ["select", "textarea"].includes(name) || (name === "input" && !UNLABELLED_INPUT_TYPES.has(attrs.type));
    if (control && !named(attrs) && !labelFor.has(attrs.id) && !insideLabel(index)) {
      add("error", index, `<${name}> has no label: add <label for="id">, wrap it in <label>, or set aria-label`);
    }
    if (attrs.role === "listbox" && !named(attrs))
      add("error", index, 'role="listbox" needs aria-label or aria-labelledby');
    if (classes.includes("tab")) {
      if (attrs.role !== "tab") add("error", index, '.tab needs role="tab"');
      if (!("aria-selected" in attrs)) add("error", index, '.tab needs aria-selected="true|false"');
    }
    if (classes.includes("tabstrip") && attrs.role !== "tablist") add("error", index, '.tabstrip needs role="tablist"');
    if (classes.includes("section-header") && !("aria-expanded" in attrs)) {
      add("error", index, ".section-header needs aria-expanded");
    }
    if (name === "th" && !("scope" in attrs)) add("warning", index, '<th> without scope="col|row"');
    for (const c of classes) {
      if (STATE_CLASSES.has(c)) {
        add("error", index, `state class .${c}: use the ARIA attribute instead (aria-selected, aria-current, ...)`);
      } else if (!known.has(c)) {
        unknown.set(c, unknown.get(c) ?? index);
      }
    }
  }

  for (const m of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)) {
    const text = m[2].replace(/<svg\b[\s\S]*?<\/svg>/gi, "").replace(/<[^>]*>/g, "");
    if (!/[\p{L}\p{N}]/u.test(text) && !named(parseAttributes(m[1]))) {
      add("error", m.index, "button has no text name (only a glyph or icon): set aria-label");
    }
  }
  for (const m of html.matchAll(/<(ul|ol)\b[^>]*role="listbox"[^>]*>([\s\S]*?)<\/\1>/gi)) {
    for (const li of m[2].matchAll(/<li\b([^>]*)>/gi)) {
      if (parseAttributes(li[1]).role !== "option") {
        add(
          "error",
          m.index + m[0].indexOf(">") + 1 + li.index,
          'a listbox holds only role="option" items; put other text outside it',
        );
      }
    }
  }
  for (const m of html.matchAll(/<table\b[^>]*class="[^"]*\b(?:grid|hourly)\b[^"]*"[^>]*>([\s\S]*?)<\/table>/gi)) {
    if (/<tr\b/i.test(m[1]) && !/<th\b/i.test(m[1]))
      add("error", m.index, "data table has rows but no <th> header cells");
  }
  for (const [c, index] of unknown) add("warning", index, `class .${c} is not defined by the skin`);

  return findings.sort((a, b) => a.line - b.line);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const files = process.argv.slice(2);
  if (!files.length) {
    console.error("usage: node scripts/check-screen.mjs page.html [more.html ...]");
    process.exit(2);
  }
  let errors = 0;
  for (const file of files) {
    for (const f of checkHtml(readFileSync(file, "utf8"))) {
      if (f.level === "error") errors++;
      console.log(`${file}:${f.line}: ${f.level}: ${f.message}`);
    }
  }
  console.log(errors ? `${errors} error(s)` : "ok");
  process.exit(errors ? 1 : 0);
}
