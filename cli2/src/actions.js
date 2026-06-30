import { rmSync } from "node:fs";
import { fetchRaw } from "./github.js";
import { saveTemp } from "./download.js";
import { openInBrowser } from "./open.js";
import { extractUrl } from "./util.js";
import { isPodcastFolder } from "./config.js";

// Temp dirs created for browser previews. Cleaned up best-effort on exit so
// nothing is left on disk after the TUI quits.
const tempDirs = [];

function cleanup() {
  while (tempDirs.length) {
    try {
      rmSync(tempDirs.pop(), { recursive: true, force: true });
    } catch {
      /* best effort */
    }
  }
}

let registered = false;
function ensureCleanupRegistered() {
  if (registered) return;
  registered = true;
  process.on("exit", cleanup);
  process.on("SIGINT", () => {
    cleanup();
    process.exit(130);
  });
}

/**
 * Fetch a file's raw Markdown content.
 */
export function fetchContent(file, ctx) {
  return fetchRaw(file.download_url, ctx);
}

/**
 * Open a file in the browser. For podcast folders the file holds a link, which
 * is opened directly; otherwise the Markdown is rendered to a temporary HTML
 * file and opened. Returns { ok, msg } for status display.
 */
export async function openInBrowserFromFile(file, folder, ctx) {
  ensureCleanupRegistered();
  const content = await fetchRaw(file.download_url, ctx);

  if (isPodcastFolder(folder.name)) {
    const url = extractUrl(content);
    if (!url) return { ok: false, msg: `No link found in ${file.name}` };
    openInBrowser(url);
    return { ok: true, msg: `Opened ${file.name} → ${url}` };
  }

  const { path, dir } = await saveTemp(file, content);
  tempDirs.push(dir);
  openInBrowser(path);
  return { ok: true, msg: `Opened in browser: ${file.name}` };
}
