import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createHash } from "node:crypto";

// Default content repo (this git repo). Override with PROMASTER_REPO if the repo name differs.
const DEFAULT_REPO = "jsznpm/proman";

// Top-level folders never shown as content categories (the CLIs' own source).
// Dot-folders (.git, .github, ...) are skipped separately by listFolders.
export const EXCLUDED_FOLDERS = ["cli", "cli2"];

// Folder whose files hold a podcast link instead of Markdown to render.
// Selecting such a file opens its link straight in the browser.
export const PODCAST_FOLDER = "podcast";

export function isPodcastFolder(name) {
  return name.toLowerCase() === PODCAST_FOLDER;
}

// Folder that's password-gated in the TUI before its (nested) contents are
// shown. This is a UX gate only — the files still live in the public repo
// and are readable directly via the GitHub API/website regardless.
export const LOCKED_FOLDER = "locked";

export function isLockedFolder(name) {
  return name.toLowerCase() === LOCKED_FOLDER;
}

export function hashPassword(input) {
  return createHash("sha256").update(String(input), "utf8").digest("hex");
}

// SHA-256 hex digest of the unlock passphrase. Never the plaintext.
// This placeholder matches no real digest, so the gate fails closed until
// you set your own — see README.md "Locked folder password" for how.
const LOCKED_PASSWORD_HASH = "98d224e928654dcf567a6e64b00de182f40ff93998b25605078928ad0d537dae";

export function verifyLockedPassword(input, expectedHash = LOCKED_PASSWORD_HASH) {
  if (typeof input !== "string" || !input) return false;
  return hashPassword(input) === expectedHash;
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
    return pkg?.ubuligan?.repo ?? null;
  } catch {
    return null;
  }
}

/**
 * Resolve the source repo in priority order:
 *   1. env PROMASTER_REPO
 *   2. "ubuligan".repo in the current dir's package.json
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
    "No source repo configured. Set PROMASTER_REPO=owner/repo, add { \"ubuligan\": { \"repo\": \"owner/repo\" } } to package.json, or edit DEFAULT_REPO."
  );
}
