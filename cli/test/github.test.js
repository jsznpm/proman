import { test } from "node:test";
import assert from "node:assert/strict";
import { listMarkdown, lastCommitDate } from "../src/github.js";

const ctx = { owner: "o", repo: "r", token: null };

function mockFetch(handler) {
  const orig = globalThis.fetch;
  globalThis.fetch = handler;
  return () => {
    globalThis.fetch = orig;
  };
}

function jsonResponse(body, init = {}) {
  return {
    ok: (init.status ?? 200) < 300,
    status: init.status ?? 200,
    statusText: init.statusText ?? "OK",
    headers: { get: (k) => (init.headers ?? {})[k.toLowerCase()] ?? null },
    json: async () => body,
    text: async () => JSON.stringify(body),
  };
}

test("listMarkdown filters non-.md and non-file entries", async () => {
  const restore = mockFetch(async () =>
    jsonResponse([
      { type: "file", name: "a.md", path: "blog/a.md", download_url: "u/a" },
      { type: "file", name: "b.txt", path: "blog/b.txt", download_url: "u/b" },
      { type: "dir", name: "sub", path: "blog/sub" },
    ])
  );
  try {
    const files = await listMarkdown("blog", ctx);
    assert.deepEqual(files.map((f) => f.name), ["a.md"]);
  } finally {
    restore();
  }
});

test("listMarkdown returns [] on 404 folder", async () => {
  const restore = mockFetch(async () =>
    jsonResponse({ message: "Not Found" }, { status: 404, statusText: "Not Found" })
  );
  try {
    assert.deepEqual(await listMarkdown("missing", ctx), []);
  } finally {
    restore();
  }
});

test("lastCommitDate parses ISO; returns 0 on failure", async () => {
  let restore = mockFetch(async () =>
    jsonResponse([{ commit: { committer: { date: "2025-01-02T00:00:00Z" } } }])
  );
  try {
    assert.equal(await lastCommitDate("blog/a.md", ctx), Date.parse("2025-01-02T00:00:00Z"));
  } finally {
    restore();
  }
  restore = mockFetch(async () => jsonResponse({}, { status: 500, statusText: "err" }));
  try {
    assert.equal(await lastCommitDate("blog/a.md", ctx), 0);
  } finally {
    restore();
  }
});
