#!/usr/bin/env node
import { runList } from "../src/commands/list.js";
import { HttpError } from "../src/github.js";
import { printBanner } from "../src/banner.js";

const USAGE = `promaster - browse & download Markdown from a GitHub repo

Usage:
  promaster list      Pick a category (blog/memory/books), then file(s) to download.

Config:
  PROMASTER_REPO=owner/repo   Source repo (or "promaster".repo in package.json).
  GITHUB_TOKEN=...            Optional, raises the GitHub API rate limit.`;

async function main() {
  printBanner();
  const cmd = process.argv[2];
  switch (cmd) {
    case "list":
      await runList();
      break;
    case undefined:
    case "-h":
    case "--help":
    case "help":
      console.log(USAGE);
      break;
    default:
      console.error(`Unknown command: ${cmd}\n`);
      console.log(USAGE);
      process.exitCode = 1;
  }
}

main().catch((err) => {
  if (err && err.name === "ExitPromptError") {
    // user pressed Ctrl+C in a prompt
    process.exitCode = 130;
    return;
  }
  if (err instanceof HttpError) {
    console.error(err.message);
    process.exitCode = 1;
    return;
  }
  console.error(err?.message || String(err));
  process.exitCode = 1;
});
