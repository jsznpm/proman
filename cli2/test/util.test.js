import { test } from "node:test";
import assert from "node:assert/strict";
import { extractUrl, fmtDate, mapLimit } from "../src/util.js";

test("extractUrl pulls a bare URL", () => {
  assert.equal(extractUrl("https://example.com/ep1\n"), "https://example.com/ep1");
});

test("extractUrl pulls URL from a Markdown link", () => {
  assert.equal(
    extractUrl("[Episode 1](https://example.com/ep1) notes"),
    "https://example.com/ep1"
  );
});

test("extractUrl returns null when no link", () => {
  assert.equal(extractUrl("no link here"), null);
});

test("fmtDate formats epoch ms as YYYY-MM-DD; placeholder on 0", () => {
  assert.equal(fmtDate(Date.parse("2025-01-02T00:00:00Z")), "2025-01-02");
  assert.equal(fmtDate(0), "????-??-??");
});

test("mapLimit preserves order with bounded concurrency", async () => {
  const items = [1, 2, 3, 4, 5];
  const out = await mapLimit(items, 2, async (n) => n * 10);
  assert.deepEqual(out, [10, 20, 30, 40, 50]);
});
