// Bundle src/index.css into dist/mms-skin.css, export the tokens as JSON, and
// refresh the copies the agent skill ships with.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const IMPORT = /^@import url\("(.+?)"\);\n?/gm;

export function bundle(file = join(root, "src/index.css")) {
  const css = readFileSync(file, "utf8");
  return css.replace(IMPORT, (_, path) => bundle(resolve(dirname(file), path)).trimEnd() + "\n\n");
}

/** Parse the custom properties in tokens.css, resolving var() references. */
export function readTokens(file = join(root, "src/tokens.css")) {
  const css = readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  const raw = Object.fromEntries([...css.matchAll(/(--mms-[\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
  const resolveValue = (value) => value.replace(/var\((--mms-[\w-]+)\)/g, (_, name) => resolveValue(raw[name]));
  return Object.fromEntries(Object.entries(raw).map(([name, value]) => [name, resolveValue(value)]));
}

export function build() {
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  const banner = `/* ${pkg.name} ${pkg.version}. Unofficial; not affiliated with or endorsed by ERCOT. */\n`;
  const css = banner + bundle().replace(/\n{3,}/g, "\n\n");
  const tokens = JSON.stringify(readTokens(), null, 2) + "\n";
  return { css, tokens };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { css, tokens } = build();
  const targets = ["dist", "skills/building-mms-screens/assets"];
  for (const dir of targets) {
    mkdirSync(join(root, dir), { recursive: true });
    writeFileSync(join(root, dir, "mms-skin.css"), css);
    writeFileSync(join(root, dir, "tokens.json"), tokens);
  }
  console.log(`wrote mms-skin.css (${css.length} bytes) and tokens.json to ${targets.join(", ")}`);
}
