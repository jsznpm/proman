import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { resolveRepo, EXCLUDED_FOLDERS, isPodcastFolder } from "../src/config.js";

async function inTempDir(pkgJson, fn) {
  const dir = await mkdtemp(join(tmpdir(), "promaster-cfg-"));
  const cwd = process.cwd();
  process.chdir(dir);
  if (pkgJson) await writeFile(join(dir, "package.json"), JSON.stringify(pkgJson), "utf8");
  try {
    return await fn();
  } finally {
    process.chdir(cwd);
    await rm(dir, { recursive: true, force: true });
  }
}

test("env PROMASTER_REPO wins over package.json", async () => {
  const prev = process.env.PROMASTER_REPO;
  process.env.PROMASTER_REPO = "envowner/envrepo";
  try {
    await inTempDir({ promaster: { repo: "pkgowner/pkgrepo" } }, async () => {
      const r = resolveRepo();
      assert.equal(r.owner, "envowner");
      assert.equal(r.repo, "envrepo");
    });
  } finally {
    if (prev === undefined) delete process.env.PROMASTER_REPO;
    else process.env.PROMASTER_REPO = prev;
  }
});

test("package.json used when env unset", async () => {
  const prev = process.env.PROMASTER_REPO;
  delete process.env.PROMASTER_REPO;
  try {
    await inTempDir({ promaster: { repo: "pkgowner/pkgrepo" } }, async () => {
      const r = resolveRepo();
      assert.equal(r.owner, "pkgowner");
      assert.equal(r.repo, "pkgrepo");
    });
  } finally {
    if (prev !== undefined) process.env.PROMASTER_REPO = prev;
  }
});

test("cli and cli2 are excluded as content folders", () => {
  assert.ok(EXCLUDED_FOLDERS.includes("cli"));
  assert.ok(EXCLUDED_FOLDERS.includes("cli2"));
});

test("isPodcastFolder matches case-insensitively", () => {
  assert.equal(isPodcastFolder("podcast"), true);
  assert.equal(isPodcastFolder("Podcast"), true);
  assert.equal(isPodcastFolder("blog"), false);
});
