import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Default content repo (this git repo). Override with PROMASTER_REPO if the repo name differs.
const DEFAULT_REPO = "jsznpm/proman";

// Top-level folders never shown as content categories (the CLI's own source).
// Dot-folders (.git, .github, ...) are skipped separately by listFolders.
export const EXCLUDED_FOLDERS = ["cli"];

// Folder whose files hold a podcast link instead of Markdown to render.
// Selecting such a file opens its link straight in the browser.
export const PODCAST_FOLDER = "podcast";

export function isPodcastFolder(name) {
  return name.toLowerCase() === PODCAST_FOLDER;
}

function parseRepo(value) {
  if (typeof value !== "string") return null;
  const match = value.trim().match(/^([^/\s]+)\/([^/\s]+)$/);
  if (!match) return null;
  return { owner: match[1], repo: match[2] };
}

function fromPackageJson() {
  try {
    const raw = readFileSync(resolve(process.cwd(), "package.json"), "utf8");
    const pkg = JSON.parse(raw);
    return pkg?.promaster?.repo ?? null;
  } catch {
    return null;
  }
}

/**
 * Resolve the source repo in priority order:
 *   1. env PROMASTER_REPO
 *   2. "promaster".repo in the current dir's package.json
 *   3. DEFAULT_REPO constant
 * Returns { owner, repo, token }. Throws if none is a valid "owner/repo".
 */
export function resolveRepo() {
  const candidates = [process.env.PROMASTER_REPO, fromPackageJson(), DEFAULT_REPO];
  for (const candidate of candidates) {
    const parsed = parseRepo(candidate);
    if (parsed) {
      return { ...parsed, token: process.env.GITHUB_TOKEN || null };
    }
  }
  throw new Error(
    "No source repo configured. Set PROMASTER_REPO=owner/repo, add { \"promaster\": { \"repo\": \"owner/repo\" } } to package.json, or edit DEFAULT_REPO."
  );
}
