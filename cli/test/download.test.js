import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { save, safeName, OUTPUT_ROOT } from "../src/download.js";

test("safeName strips path traversal and slashes", () => {
  assert.equal(safeName("a.md"), "a.md");
  assert.equal(safeName("../../etc/passwd"), "passwd");
  assert.equal(safeName("sub/dir/x.md"), "x.md");
  assert.throws(() => safeName(".."));
});

test("save writes under ./promaster-data/<category>/<name> and creates dirs", async () => {
  const dir = await mkdtemp(join(tmpdir(), "promaster-"));
  const cwd = process.cwd();
  process.chdir(dir);
  try {
    const dest = await save("blog", { name: "hello.md" }, "# hi");
    assert.equal(dest, resolve(dir, OUTPUT_ROOT, "blog", "hello.md"));
    assert.equal(await readFile(dest, "utf8"), "# hi");
  } finally {
    process.chdir(cwd);
    await rm(dir, { recursive: true, force: true });
  }
});
