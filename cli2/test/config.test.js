import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  resolveRepo,
  EXCLUDED_FOLDERS,
  isPodcastFolder,
  isLockedFolder,
  hashPassword,
  verifyLockedPassword,
} from "../src/config.js";

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
    await inTempDir({ ubuligan: { repo: "pkgowner/pkgrepo" } }, async () => {
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
    await inTempDir({ ubuligan: { repo: "pkgowner/pkgrepo" } }, async () => {
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

test("isLockedFolder matches case-insensitively", () => {
  assert.equal(isLockedFolder("locked"), true);
  assert.equal(isLockedFolder("Locked"), true);
  assert.equal(isLockedFolder("blog"), false);
});

test("hashPassword matches the known SHA-256 test vector for 'abc'", () => {
  assert.equal(
    hashPassword("abc"),
    "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
  );
});

test("verifyLockedPassword rejects empty/wrong/non-string input", () => {
  const expectedHash = hashPassword("correct-horse");
  assert.equal(verifyLockedPassword("", expectedHash), false);
  assert.equal(verifyLockedPassword("wrong", expectedHash), false);
  assert.equal(verifyLockedPassword(undefined, expectedHash), false);
  assert.equal(verifyLockedPassword("correct-horse", expectedHash), true);
});
