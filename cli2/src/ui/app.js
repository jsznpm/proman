import { useState } from "react";
import { useApp } from "ink";
import { html } from "./html.js";
import { FolderList } from "./folder-list.js";
import { NodeList } from "./node-list.js";
import { PasswordPrompt } from "./password-prompt.js";
import { Preview } from "./preview.js";
import { isPodcastFolder, isLockedFolder, verifyLockedPassword } from "../config.js";
import { openInBrowserFromFile } from "../actions.js";

/**
 * Top-level TUI. Screen state machine: folders → [password →] browse → preview.
 * `pathStack` (index 0 = top-level folder) lets `browse` be reused at any
 * nesting depth; `topAncestor()` is always the folder the podcast/lock
 * checks are anchored to, regardless of how deep the stack goes.
 */
export function App({ ctx, verifyPassword = verifyLockedPassword }) {
  const { exit } = useApp();
  const [screen, setScreen] = useState("folders");
  const [pathStack, setPathStack] = useState([]);
  const [pendingLockedFolder, setPendingLockedFolder] = useState(null);
  const [pwError, setPwError] = useState("");
  const [unlockedLocked, setUnlockedLocked] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [status, setStatus] = useState("");

  const topAncestor = () => pathStack[0];

  async function handleOpen(picks) {
    const folder = topAncestor();
    const msgs = [];
    for (const f of picks) {
      try {
        const r = await openInBrowserFromFile(f, folder, ctx);
        msgs.push(r.msg);
      } catch (e) {
        msgs.push(e?.message || String(e));
      }
    }
    setStatus(msgs.join("   |   "));
  }

  async function handlePreview(file) {
    // Podcast files hold a link, not Markdown — open it directly.
    if (isPodcastFolder(topAncestor().name)) {
      await handleOpen([file]);
      return;
    }
    setStatus("");
    setPreviewFile(file);
    setScreen("preview");
  }

  function handleFolderSelect(f) {
    setStatus("");
    if (isLockedFolder(f.name) && !unlockedLocked) {
      setPendingLockedFolder(f);
      setPwError("");
      setScreen("password");
      return;
    }
    setPathStack([f]);
    setScreen("browse");
  }

  function handlePasswordSubmit(value) {
    if (verifyPassword(value)) {
      setUnlockedLocked(true);
      setPathStack([pendingLockedFolder]);
      setPendingLockedFolder(null);
      setPwError("");
      setScreen("browse");
    } else {
      setPwError("Incorrect password. Try again.");
    }
  }

  function handlePasswordCancel() {
    setPendingLockedFolder(null);
    setPwError("");
    setScreen("folders");
  }

  function handleDescend(entry) {
    setStatus("");
    setPathStack((stack) => [...stack, { name: entry.name, path: entry.path }]);
  }

  function handleBrowseBack() {
    setStatus("");
    if (pathStack.length > 1) {
      setPathStack((stack) => stack.slice(0, -1));
    } else {
      setPathStack([]);
      setScreen("folders");
    }
  }

  if (screen === "folders") {
    return html`
      <${FolderList} ctx=${ctx} onSelect=${handleFolderSelect} onQuit=${exit} />
    `;
  }

  if (screen === "password") {
    return html`
      <${PasswordPrompt}
        onSubmit=${handlePasswordSubmit}
        onCancel=${handlePasswordCancel}
        error=${pwError}
      />
    `;
  }

  if (screen === "browse") {
    const current = pathStack[pathStack.length - 1];
    return html`
      <${NodeList}
        ctx=${ctx}
        path=${current.path}
        title=${pathStack.map((s) => s.name).join(" / ")}
        status=${status}
        onDescend=${handleDescend}
        onPreview=${handlePreview}
        onOpen=${handleOpen}
        onBack=${handleBrowseBack}
      />
    `;
  }

  if (screen === "preview") {
    return html`
      <${Preview}
        ctx=${ctx}
        file=${previewFile}
        onOpen=${() => handleOpen([previewFile])}
        onBack=${() => setScreen("browse")}
      />
    `;
  }

  return null;
}
