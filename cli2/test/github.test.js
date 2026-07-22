import { test } from "node:test";
import assert from "node:assert/strict";
import { listMarkdown, lastCommitDate, listFolders, listContents } from "../src/github.js";

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

test("listFolders keeps dirs, drops files/dot-folders/excluded, sorts", async () => {
  const restore = mockFetch(async () =>
    jsonResponse([
      { type: "dir", name: "memory", path: "memory" },
      { type: "dir", name: "blog", path: "blog" },
      { type: "file", name: "README.md", path: "README.md" },
      { type: "dir", name: "cli", path: "cli" },
      { type: "dir", name: "cli2", path: "cli2" },
      { type: "dir", name: ".github", path: ".github" },
      { type: "dir", name: "books", path: "books" },
    ])
  );
  try {
    const folders = await listFolders(ctx, { exclude: ["cli", "cli2"] });
    assert.deepEqual(folders.map((f) => f.name), ["blog", "books", "memory"]);
  } finally {
    restore();
  }
});

test("listFolders returns [] on 404", async () => {
  const restore = mockFetch(async () =>
    jsonResponse({ message: "Not Found" }, { status: 404, statusText: "Not Found" })
  );
  try {
    assert.deepEqual(await listFolders(ctx), []);
  } finally {
    restore();
  }
});

test("listContents keeps dirs+.md files, drops non-md/dot-entries, dirs sort first", async () => {
  const restore = mockFetch(async () =>
    jsonResponse([
      { type: "file", name: "b.md", path: "locked/b.md", download_url: "u/b" },
      { type: "dir", name: "sub", path: "locked/sub" },
      { type: "file", name: "notes.txt", path: "locked/notes.txt" },
      { type: "dir", name: ".git", path: "locked/.git" },
      { type: "file", name: "a.md", path: "locked/a.md", download_url: "u/a" },
    ])
  );
  try {
    const entries = await listContents("locked", ctx);
    assert.deepEqual(
      entries.map((e) => [e.type, e.name]),
      [
        ["dir", "sub"],
        ["file", "a.md"],
        ["file", "b.md"],
      ]
    );
    assert.equal(entries.find((e) => e.type === "dir").download_url, null);
  } finally {
    restore();
  }
});

test("listContents percent-encodes each path segment independently", async () => {
  let capturedUrl;
  const restore = mockFetch(async (url) => {
    capturedUrl = url;
    return jsonResponse([]);
  });
  try {
    await listContents("locked/sub folder", ctx);
    assert.ok(capturedUrl.endsWith("locked/sub%20folder"));
    assert.ok(!capturedUrl.includes("%2F"));
  } finally {
    restore();
  }
});

test("listContents returns [] on 404", async () => {
  const restore = mockFetch(async () =>
    jsonResponse({ message: "Not Found" }, { status: 404, statusText: "Not Found" })
  );
  try {
    assert.deepEqual(await listContents("locked/missing", ctx), []);
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
