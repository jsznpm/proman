import { test } from "node:test";
import assert from "node:assert/strict";
import { createPaginator } from "../src/pagination.js";

const items = Array.from({ length: 23 }, (_, i) => i + 1); // 1..23

test("totalPages and page slicing", () => {
  const p = createPaginator(items, 10);
  assert.equal(p.totalPages, 3);
  assert.deepEqual(p.pageItems(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  p.next();
  assert.deepEqual(p.pageItems(), [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  p.next();
  assert.deepEqual(p.pageItems(), [21, 22, 23]);
});

test("next/prev clamp at bounds", () => {
  const p = createPaginator(items, 10);
  assert.equal(p.hasPrev, false);
  p.prev(); // no-op
  assert.equal(p.page, 0);
  p.next();
  p.next();
  p.next(); // past last, clamps
  assert.equal(p.page, 2);
  assert.equal(p.hasNext, false);
});

test("empty list still has one page", () => {
  const p = createPaginator([], 10);
  assert.equal(p.totalPages, 1);
  assert.deepEqual(p.pageItems(), []);
  assert.equal(p.hasNext, false);
  assert.equal(p.hasPrev, false);
});
