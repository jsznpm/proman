import { select, checkbox, input } from "@inquirer/prompts";
import { rmSync } from "node:fs";
import { rm } from "node:fs/promises";
import { resolveRepo, EXCLUDED_FOLDERS } from "../config.js";
import { listFolders, listMarkdown, lastCommitDate, fetchRaw, HttpError } from "../github.js";
import { createPaginator, navChoices, NAV } from "../pagination.js";
import { saveTemp } from "../download.js";
import { openInBrowser } from "../open.js";

const CONCURRENCY = 5;
const PAGE_SIZE = 10;

// Run async mapper over items with a bounded number of in-flight tasks.
async function mapLimit(items, limit, mapper) {
  const results = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const i = next++;
      results[i] = await mapper(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

function fmtDate(ms) {
  return ms ? new Date(ms).toISOString().slice(0, 10) : "????-??-??";
}

export async function runList() {
  const ctx = resolveRepo();

  const folders = await listFolders(ctx, { exclude: EXCLUDED_FOLDERS });
  if (folders.length === 0) {
    console.log("No folders found in the repository.");
    return;
  }

  // Folder loop: pick a folder, then browse its contents; back returns here.
  for (;;) {
    const folder = await pickFolder(folders);
    if (!folder) return; // quit
    await browseFolder(folder, ctx);
  }
}

// Paginated single-select over folders. Returns the chosen folder, or null on quit.
async function pickFolder(folders) {
  const pager = createPaginator(folders, PAGE_SIZE);
  for (;;) {
    const choices = [
      ...pager.pageItems().map((f) => ({ name: f.name, value: f })),
      ...navChoices(pager, { exit: { label: "✖ Quit", value: NAV.QUIT } }),
    ];
    const answer = await select({
      message: `Choose a folder (page ${pager.page + 1}/${pager.totalPages})`,
      choices,
    });

    if (answer === NAV.NEXT) pager.next();
    else if (answer === NAV.PREV) pager.prev();
    else if (answer === NAV.QUIT) return null;
    else return answer;
  }
}

// Paginated multi-select over a folder's .md files. Selections persist across
// pages via an accumulator keyed by path. Opens picks, or returns on back.
async function browseFolder(folder, ctx) {
  const files = await listMarkdown(folder.name, ctx);
  if (files.length === 0) {
    console.log(`No .md files found in "${folder.name}".`);
    return;
  }

  const pager = createPaginator(files, PAGE_SIZE);
  const selected = new Map(); // path -> file
  const dateCache = new Map(); // path -> ms (lazy, per page)

  for (;;) {
    const pageFiles = pager.pageItems();

    // Fetch commit dates only for this page (avoids N calls on large folders).
    const missing = pageFiles.filter((f) => !dateCache.has(f.path));
    if (missing.length) {
      const dates = await mapLimit(missing, CONCURRENCY, (f) => lastCommitDate(f.path, ctx));
      missing.forEach((f, i) => dateCache.set(f.path, dates[i]));
    }
    const sorted = [...pageFiles].sort(
      (a, b) => (dateCache.get(b.path) ?? 0) - (dateCache.get(a.path) ?? 0)
    );

    const choices = [
      ...sorted.map((f) => ({
        name: `${f.name}  (${fmtDate(dateCache.get(f.path))})`,
        value: f,
        checked: selected.has(f.path),
      })),
      ...navChoices(pager, { exit: { label: "↩ Back to folders", value: NAV.BACK } }),
    ];

    const picked = await checkbox({
      message: `${folder.name} — select file(s), enter to open (page ${
        pager.page + 1
      }/${pager.totalPages})`,
      choices,
    });

    // Merge this page's file selections into the accumulator (handles unchecking).
    const navHit = picked.find((v) => typeof v === "string");
    for (const f of pageFiles) {
      if (picked.includes(f)) selected.set(f.path, f);
      else selected.delete(f.path);
    }

    if (navHit === NAV.NEXT) pager.next();
    else if (navHit === NAV.PREV) pager.prev();
    else if (navHit === NAV.BACK) return;
    else if (selected.size > 0) {
      await openEphemeral([...selected.values()], ctx);
      return;
    } else {
      console.log("Nothing selected.");
      return;
    }
  }
}

// Render picks to OS temp, auto-open in the browser, then delete once the
// user is done (Enter) or aborts (Ctrl+C). Nothing is left on disk.
async function openEphemeral(picked, ctx) {
  const dirs = [];
  const cleanup = () => {
    while (dirs.length) {
      try {
        rmSync(dirs.pop(), { recursive: true, force: true });
      } catch {
        /* best effort */
      }
    }
  };

  const onSigint = () => {
    cleanup();
    process.exit(130);
  };
  process.on("SIGINT", onSigint);

  try {
    for (const file of picked) {
      const content = await fetchRaw(file.download_url, ctx);
      const { path, dir } = await saveTemp(file, content);
      dirs.push(dir);
      openInBrowser(path);
      console.log(`Opened in browser: ${file.name}`);
    }

    console.log("\nThese are temporary — nothing is saved to disk.");
    await input({
      message: `Press Enter when you're done to delete the temporary file${
        picked.length === 1 ? "" : "s"
      }`,
    });
  } finally {
    process.off("SIGINT", onSigint);
    for (const dir of dirs.splice(0)) {
      await rm(dir, { recursive: true, force: true }).catch(() => {});
    }
  }
}

export { HttpError };
