import { test } from "node:test";
import assert from "node:assert/strict";
import { render } from "ink-testing-library";
import { html } from "../src/ui/html.js";
import { FolderList } from "../src/ui/folder-list.js";

const ctx = { owner: "o", repo: "r", token: null };

function mockFetch(handler) {
  const orig = globalThis.fetch;
  globalThis.fetch = handler;
  return () => {
    globalThis.fetch = orig;
  };
}

function jsonResponse(body) {
  return {
    ok: true,
    status: 200,
    statusText: "OK",
    headers: { get: () => null },
    json: async () => body,
    text: async () => JSON.stringify(body),
  };
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const FOLDERS = [
  { type: "dir", name: "blog", path: "blog" },
  { type: "dir", name: "books", path: "books" },
  { type: "dir", name: "memory", path: "memory" },
];

test("FolderList renders folder names after loading", async () => {
  const restore = mockFetch(async () => jsonResponse(FOLDERS));
  try {
    const { lastFrame, unmount } = render(
      html`<${FolderList} ctx=${ctx} onSelect=${() => {}} onQuit=${() => {}} />`
    );
    await delay(100);
    const frame = lastFrame();
    assert.match(frame, /UBULIGAN/);
    assert.match(frame, /blog/);
    assert.match(frame, /books/);
    assert.match(frame, /memory/);
    unmount();
  } finally {
    restore();
  }
});

test("FolderList: Enter selects the highlighted folder", async () => {
  const restore = mockFetch(async () => jsonResponse(FOLDERS));
  try {
    let chosen = null;
    const { stdin, unmount } = render(
      html`<${FolderList} ctx=${ctx} onSelect=${(f) => (chosen = f)} onQuit=${() => {}} />`
    );
    await delay(100);
    stdin.write("\r"); // Enter
    await delay(20);
    assert.ok(chosen, "expected a folder to be selected");
    assert.equal(chosen.name, "blog");
    unmount();
  } finally {
    restore();
  }
});
