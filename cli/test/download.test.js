import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { save, saveTemp, safeName, htmlName, OUTPUT_ROOT } from "../src/download.js";

test("safeName strips path traversal and slashes", () => {
  assert.equal(safeName("a.md"), "a.md");
  assert.equal(safeName("../../etc/passwd"), "passwd");
  assert.equal(safeName("sub/dir/x.md"), "x.md");
  assert.throws(() => safeName(".."));
});

test("htmlName replaces the extension with .html", () => {
  assert.equal(htmlName("a.md"), "a.html");
  assert.equal(htmlName("sub/dir/x.md"), "x.html");
  assert.equal(htmlName("noext"), "noext.html");
  assert.equal(htmlName("../../etc/passwd"), "passwd.html");
});

test("save renders markdown to ./promaster-data/<category>/<name>.html", async () => {
  const dir = await mkdtemp(join(tmpdir(), "promaster-"));
  const cwd = process.cwd();
  process.chdir(dir);
  try {
    const dest = await save("blog", { name: "hello.md" }, "# hi");
    assert.equal(dest, resolve(dir, OUTPUT_ROOT, "blog", "hello.html"));
    const html = await readFile(dest, "utf8");
    assert.match(html, /<!DOCTYPE html>/);
    assert.match(html, /<h1[^>]*>hi<\/h1>/);
    assert.match(html, /<title>hello<\/title>/);
  } finally {
    process.chdir(cwd);
    await rm(dir, { recursive: true, force: true });
  }
});

test("saveTemp renders HTML into a fresh OS temp dir (not promaster-data)", async () => {
  const { path, dir } = await saveTemp({ name: "war-and-peace.md" }, "# War");
  try {
    assert.ok(path.startsWith(tmpdir()), "path should live under the OS temp dir");
    assert.ok(path.endsWith("war-and-peace.html"));
    assert.equal(resolve(dir), resolve(join(path, "..")));
    const html = await readFile(path, "utf8");
    assert.match(html, /<!DOCTYPE html>/);
    assert.match(html, /<h1[^>]*>War<\/h1>/);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
