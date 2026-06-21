import { select, checkbox, input } from "@inquirer/prompts";
import { rmSync } from "node:fs";
import { rm } from "node:fs/promises";
import { resolveRepo, CATEGORIES } from "../config.js";
import { listMarkdown, lastCommitDate, fetchRaw, HttpError } from "../github.js";
import { saveTemp } from "../download.js";
import { openInBrowser } from "../open.js";

const CONCURRENCY = 5;

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

  const category = await select({
    message: "Choose a category",
    choices: CATEGORIES.map((c) => ({ name: c, value: c })),
  });

  const files = await listMarkdown(category, ctx);
  if (files.length === 0) {
    console.log(`No .md files found in "${category}".`);
    return;
  }

  const dates = await mapLimit(files, CONCURRENCY, (f) => lastCommitDate(f.path, ctx));
  const sorted = files
    .map((f, i) => ({ ...f, date: dates[i] }))
    .sort((a, b) => b.date - a.date); // newest first

  const picked = await checkbox({
    message: "Select file(s) (space to toggle, enter to confirm)",
    choices: sorted.map((f) => ({ name: `${f.name}  (${fmtDate(f.date)})`, value: f })),
  });

  if (picked.length === 0) {
    console.log("Nothing selected.");
    return;
  }

  // All categories open immediately, never persist — temp files deleted on exit.
  await openEphemeral(picked, ctx);
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
