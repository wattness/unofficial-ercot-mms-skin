import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import test from "node:test";

const ERCOT = new URL("../docs/ercot/", import.meta.url);

test("docs/sources.md lists the SHA-256 of every file in docs/ercot/", () => {
  const sources = readFileSync(new URL("../docs/sources.md", import.meta.url), "utf8");
  const listed = new Map([...sources.matchAll(/^([0-9a-f]{64}) {2}(\S+)$/gm)].map((m) => [m[2], m[1]]));
  // Dotfiles are local clutter (.DS_Store), never published excerpts.
  const files = readdirSync(ERCOT).filter((f) => !f.startsWith("."));
  assert.deepEqual([...listed.keys()].sort(), files.sort());
  for (const file of files) {
    const sha = createHash("sha256")
      .update(readFileSync(new URL(file, ERCOT)))
      .digest("hex");
    assert.equal(sha, listed.get(file), file);
  }
});
