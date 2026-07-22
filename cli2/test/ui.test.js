import { test } from "node:test";
import assert from "node:assert/strict";
import { render } from "ink-testing-library";
import { html } from "../src/ui/html.js";
import { FolderList } from "../src/ui/folder-list.js";
import { PasswordPrompt } from "../src/ui/password-prompt.js";
import { NodeList } from "../src/ui/node-list.js";
import { App } from "../src/ui/app.js";

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

test("PasswordPrompt: typed characters render as masked dots", async () => {
  const { lastFrame, stdin, unmount } = render(
    html`<${PasswordPrompt} onSubmit=${() => {}} onCancel=${() => {}} />`
  );
  try {
    await delay(20);
    stdin.write("ab");
    await delay(20);
    const frame = lastFrame();
    assert.match(frame, /••/);
    assert.doesNotMatch(frame, /ab/);
  } finally {
    unmount();
  }
});

test("PasswordPrompt: Enter submits the accumulated value", async () => {
  let submitted = null;
  const { stdin, unmount } = render(
    html`<${PasswordPrompt} onSubmit=${(v) => (submitted = v)} onCancel=${() => {}} />`
  );
  try {
    await delay(20);
    stdin.write("secret");
    await delay(20);
    stdin.write("\r");
    await delay(20);
    assert.equal(submitted, "secret");
  } finally {
    unmount();
  }
});

test("PasswordPrompt: Escape cancels", async () => {
  let cancelled = false;
  const { stdin, unmount } = render(
    html`<${PasswordPrompt} onSubmit=${() => {}} onCancel=${() => (cancelled = true)} />`
  );
  try {
    await delay(20);
    stdin.write(""); // Escape
    await delay(20);
    assert.equal(cancelled, true);
  } finally {
    unmount();
  }
});

test("PasswordPrompt: error prop renders an error message", async () => {
  const { lastFrame, unmount } = render(
    html`<${PasswordPrompt} onSubmit=${() => {}} onCancel=${() => {}} error="Incorrect password." />`
  );
  try {
    await delay(20);
    assert.match(lastFrame(), /Incorrect password\./);
  } finally {
    unmount();
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

const LOCKED_ENTRIES = [
  { type: "dir", name: "sub", path: "locked/sub", download_url: null },
  { type: "file", name: "a.md", path: "locked/a.md", download_url: "u/a" },
];

test("NodeList: Enter on a dir row calls onDescend, not onPreview", async () => {
  const restore = mockFetch(async () => jsonResponse(LOCKED_ENTRIES));
  try {
    let descended = null;
    let previewed = null;
    const { stdin, unmount } = render(
      html`<${NodeList}
        ctx=${ctx}
        path="locked"
        title="locked"
        onDescend=${(e) => (descended = e)}
        onPreview=${(e) => (previewed = e)}
        onOpen=${() => {}}
        onBack=${() => {}}
      />`
    );
    await delay(100);
    stdin.write("\r"); // dirs sort first, so "sub" is highlighted
    await delay(20);
    assert.equal(descended?.name, "sub");
    assert.equal(previewed, null);
    unmount();
  } finally {
    restore();
  }
});

test("NodeList: Enter on a file row (after moving down) calls onPreview, not onDescend", async () => {
  const restore = mockFetch(async () => jsonResponse(LOCKED_ENTRIES));
  try {
    let descended = null;
    let previewed = null;
    const { stdin, unmount } = render(
      html`<${NodeList}
        ctx=${ctx}
        path="locked"
        title="locked"
        onDescend=${(e) => (descended = e)}
        onPreview=${(e) => (previewed = e)}
        onOpen=${() => {}}
        onBack=${() => {}}
      />`
    );
    await delay(100);
    stdin.write("j"); // move down from "sub" to "a.md"
    await delay(20);
    stdin.write("\r");
    await delay(20);
    assert.equal(previewed?.name, "a.md");
    assert.equal(descended, null);
    unmount();
  } finally {
    restore();
  }
});

const API_ROOT = "https://api.github.com/repos/o/r/contents/";

function routedFetch(routes) {
  return async (url) => {
    if (Object.prototype.hasOwnProperty.call(routes, url)) return jsonResponse(routes[url]);
    return jsonResponse([]);
  };
}

test("App: wrong password stays gated and shows an error", async () => {
  const restore = mockFetch(
    routedFetch({
      [API_ROOT]: [{ type: "dir", name: "locked", path: "locked" }],
    })
  );
  try {
    const { lastFrame, stdin, unmount } = render(
      html`<${App} ctx=${ctx} verifyPassword=${() => false} />`
    );
    await delay(100);
    stdin.write("\r"); // select "locked"
    await delay(20);
    stdin.write("wrong");
    stdin.write("\r"); // submit
    await delay(20);
    const frame = lastFrame();
    assert.match(frame, /Incorrect password/);
    assert.doesNotMatch(frame, /\ba\.md\b/);
    unmount();
  } finally {
    restore();
  }
});

test("App: correct password reveals locked's nested contents", async () => {
  const restore = mockFetch(
    routedFetch({
      [API_ROOT]: [{ type: "dir", name: "locked", path: "locked" }],
      [API_ROOT + "locked"]: LOCKED_ENTRIES,
    })
  );
  try {
    const { lastFrame, stdin, unmount } = render(
      html`<${App} ctx=${ctx} verifyPassword=${() => true} />`
    );
    await delay(100);
    stdin.write("\r"); // select "locked"
    await delay(20);
    stdin.write("anything");
    stdin.write("\r"); // submit
    await delay(100);
    const frame = lastFrame();
    assert.match(frame, /sub/);
    assert.match(frame, /a\.md/);
    unmount();
  } finally {
    restore();
  }
});

test("App: back navigation pops one pathStack level at a time", async () => {
  const restore = mockFetch(
    routedFetch({
      [API_ROOT]: [{ type: "dir", name: "locked", path: "locked" }],
      [API_ROOT + "locked"]: LOCKED_ENTRIES,
      [API_ROOT + "locked/sub"]: [
        { type: "file", name: "b.md", path: "locked/sub/b.md", download_url: "u/b" },
      ],
    })
  );
  try {
    const { lastFrame, stdin, unmount } = render(
      html`<${App} ctx=${ctx} verifyPassword=${() => true} />`
    );
    await delay(100);
    stdin.write("\r"); // select "locked"
    await delay(20);
    stdin.write("anything");
    stdin.write("\r"); // submit password
    await delay(100);
    stdin.write("\r"); // descend into "sub" (dirs sort first)
    await delay(100);
    assert.match(lastFrame(), /b\.md/);

    stdin.write("b"); // back to "locked" root
    await delay(100);
    let frame = lastFrame();
    assert.match(frame, /sub/);
    assert.match(frame, /a\.md/);

    stdin.write("b"); // back to top-level folder list
    await delay(100);
    frame = lastFrame();
    assert.match(frame, /locked/);
    assert.doesNotMatch(frame, /a\.md/);
    unmount();
  } finally {
    restore();
  }
});
