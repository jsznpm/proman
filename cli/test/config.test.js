import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { resolveRepo } from "../src/config.js";

async function inTempDir(pkgJson, fn) {
  const dir = await mkdtemp(join(tmpdir(), "proman-cfg-"));
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

test("env PROMAN_REPO wins over package.json", async () => {
  const prev = process.env.PROMAN_REPO;
  process.env.PROMAN_REPO = "envowner/envrepo";
  try {
    await inTempDir({ proman: { repo: "pkgowner/pkgrepo" } }, async () => {
      const r = resolveRepo();
      assert.equal(r.owner, "envowner");
      assert.equal(r.repo, "envrepo");
    });
  } finally {
    if (prev === undefined) delete process.env.PROMAN_REPO;
    else process.env.PROMAN_REPO = prev;
  }
});

test("package.json used when env unset", async () => {
  const prev = process.env.PROMAN_REPO;
  delete process.env.PROMAN_REPO;
  try {
    await inTempDir({ proman: { repo: "pkgowner/pkgrepo" } }, async () => {
      const r = resolveRepo();
      assert.equal(r.owner, "pkgowner");
      assert.equal(r.repo, "pkgrepo");
    });
  } finally {
    if (prev !== undefined) process.env.PROMAN_REPO = prev;
  }
});
