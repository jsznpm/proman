import { useState } from "react";
import { useApp } from "ink";
import { html } from "./html.js";
import { FolderList } from "./folder-list.js";
import { FileList } from "./file-list.js";
import { Preview } from "./preview.js";
import { isPodcastFolder } from "../config.js";
import { openInBrowserFromFile } from "../actions.js";

/**
 * Top-level TUI. Screen state machine: folders → files → preview.
 */
export function App({ ctx }) {
  const { exit } = useApp();
  const [screen, setScreen] = useState("folders");
  const [folder, setFolder] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [status, setStatus] = useState("");

  async function handleOpen(picks) {
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
    if (isPodcastFolder(folder.name)) {
      await handleOpen([file]);
      return;
    }
    setStatus("");
    setPreviewFile(file);
    setScreen("preview");
  }

  if (screen === "folders") {
    return html`
      <${FolderList}
        ctx=${ctx}
        onSelect=${(f) => {
          setStatus("");
          setFolder(f);
          setScreen("files");
        }}
        onQuit=${exit}
      />
    `;
  }

  if (screen === "files") {
    return html`
      <${FileList}
        ctx=${ctx}
        folder=${folder}
        status=${status}
        onPreview=${handlePreview}
        onOpen=${handleOpen}
        onBack=${() => {
          setStatus("");
          setScreen("folders");
        }}
      />
    `;
  }

  if (screen === "preview") {
    return html`
      <${Preview}
        ctx=${ctx}
        file=${previewFile}
        onOpen=${() => handleOpen([previewFile])}
        onBack=${() => setScreen("files")}
      />
    `;
  }

  return null;
}
