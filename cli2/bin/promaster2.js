#!/usr/bin/env node
import { runList } from "../src/commands/list.js";
import { HttpError } from "../src/github.js";
import { printBanner } from "../src/banner.js";

const USAGE = `promaster2 - browse Markdown from a GitHub repo in a full-screen TUI

Usage:
  promaster2 list      Pick a category, browse files, preview in the terminal,
                       or open in the browser.

Config:
  PROMASTER_REPO=owner/repo   Source repo (or "promaster".repo in package.json).
  GITHUB_TOKEN=...            Optional, raises the GitHub API rate limit.`;

async function main() {
  const cmd = process.argv[2];
  switch (cmd) {
    case "list":
      await runList();
      break;
    case undefined:
    case "-h":
    case "--help":
    case "help":
      printBanner();
      console.log(USAGE);
      break;
    default:
      console.error(`Unknown command: ${cmd}\n`);
      printBanner();
      console.log(USAGE);
      process.exitCode = 1;
  }
}

main().catch((err) => {
  if (err && err.name === "ExitPromptError") {
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
