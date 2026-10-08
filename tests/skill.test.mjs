import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { checkHtml, skinClasses } from "../skills/building-mms-screens/scripts/check-screen.mjs";

const SKILLS = new URL("../skills/", import.meta.url);
const SKILL_DIR = fileURLToPath(new URL("building-mms-screens/", SKILLS));
const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const DEMO_PAGES = readdirSync(new URL("../demo/", import.meta.url)).filter((f) => f.endsWith(".html"));

test("each skill has valid Agent Skills frontmatter", () => {
  for (const dir of readdirSync(SKILLS)) {
    const text = readFileSync(new URL(`${dir}/SKILL.md`, SKILLS), "utf8");
    const front = /^---\n([\s\S]*?)\n---\n/.exec(text);
    assert.ok(front, `${dir}: SKILL.md must start with YAML frontmatter`);
    const fields = Object.fromEntries(
      front[1].split("\n").map((l) => [l.split(":")[0], l.slice(l.indexOf(":") + 1).trim()]),
    );
    assert.equal(fields.name, dir, "name must match the folder");
    assert.match(fields.name, /^[a-z0-9]+(-[a-z0-9]+)*$/);
    assert.ok(fields.name.length <= 64);
    assert.ok(fields.description && fields.description.length <= 1024, "description is required, max 1024");
    assert.doesNotMatch(fields.description, /<[a-z/]/i, "no XML tags in description");
    if (fields.compatibility) assert.ok(fields.compatibility.length <= 500, "compatibility max 500");
  }
});

test("every file SKILL.md mentions exists", () => {
  const text = readFileSync(`${SKILL_DIR}SKILL.md`, "utf8");
  const paths = [...text.matchAll(/`((?:assets|references|scripts)\/[\w./-]+)`/g)].map((m) => m[1]);
  assert.ok(paths.length >= 4);
  for (const p of paths) assert.ok(existsSync(SKILL_DIR + p), p);
});

test("components.md documents every class the skin defines", () => {
  const doc = readFileSync(`${SKILL_DIR}references/components.md`, "utf8");
  for (const c of skinClasses()) {
    assert.match(doc, new RegExp(`(?<![\\w-])${c}(?![\\w-])`), `.${c} is not documented`);
  }
});

test("the checker passes the starter page and every demo page, run as SKILL.md says", () => {
  const pages = DEMO_PAGES.map((f) => `../../demo/${f}`);
  const out = execFileSync("node", ["scripts/check-screen.mjs", "assets/starter.html", ...pages], {
    cwd: SKILL_DIR,
    encoding: "utf8",
  });
  assert.equal(out.trim(), "ok");
});

test("every components.md snippet passes the checker, so its markup can be used as written", () => {
  const doc = readFileSync(`${SKILL_DIR}references/components.md`, "utf8");
  const snippets = [...doc.matchAll(/```html\n([\s\S]*?)```/g)].map((m) => m[1]);
  assert.ok(snippets.length >= 13);
  const body = snippets.filter((s) => !s.trimStart().startsWith("<html")).join("\n");
  const page = `<!doctype html>\n<html lang="en" data-skin="mms"><body><main>\n${body}</main></body></html>`;
  assert.deepEqual(
    checkHtml(page).filter((f) => f.level === "error"),
    [],
  );
});

test("the checker reports the mistakes it is meant to catch", () => {
  const bad = read("./fixtures/bad-screen.html");
  const errors = checkHtml(bad)
    .filter((f) => f.level === "error")
    .map((f) => f.message);
  const expect = [
    /data-skin="mms"/,
    /colour literal in <style>/,
    /colour literal in style attribute/,
    /colour literal in fill=/,
    /role="tab"/,
    /aria-selected/,
    /aria-expanded/,
    /state class \.selected/,
    /no <th> header cells/,
    /<img> needs an alt/,
    /<input> has no label/,
    /button has no text name/,
    /role="listbox" needs aria-label/,
    /a listbox holds only role="option" items/,
  ];
  const missing = expect.filter((re) => !errors.some((m) => re.test(m)));
  assert.deepEqual(missing, []);
  const fixture = fileURLToPath(new URL("./fixtures/bad-screen.html", import.meta.url));
  const result = spawnSync("node", ["scripts/check-screen.mjs", fixture], { cwd: SKILL_DIR });
  assert.equal(result.status, 1);
});

test("every demo page says its data is made up and that it is unofficial", () => {
  assert.ok(DEMO_PAGES.includes("index.html"));
  for (const page of DEMO_PAGES) {
    const html = read(`../demo/${page}`);
    assert.match(html, /made up/i, page);
    assert.match(html, /not\s+affiliated\s+with\s+or\s+endorsed\s+by\s+ERCOT/, page);
  }
});
