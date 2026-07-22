const API = "https://api.github.com";

function headers({ token }) {
  const h = {
    Accept: "application/vnd.github+json",
    "User-Agent": "ubuligan-cli",
  };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

class HttpError extends Error {
  constructor(message, { status, rateLimited } = {}) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.rateLimited = Boolean(rateLimited);
  }
}

async function request(url, ctx) {
  const res = await fetch(url, { headers: headers(ctx) });
  if (res.ok) return res;
  const rateLimited =
    res.status === 403 && res.headers.get("x-ratelimit-remaining") === "0";
  if (rateLimited) {
    throw new HttpError(
      "GitHub API rate limit reached (60/hr unauthenticated). Wait and retry, or set GITHUB_TOKEN.",
      { status: 403, rateLimited: true }
    );
  }
  let snippet = "";
  try {
    snippet = (await res.text()).slice(0, 200);
  } catch {
    /* ignore */
  }
  throw new HttpError(`GitHub API ${res.status} ${res.statusText}: ${snippet}`, {
    status: res.status,
  });
}

/**
 * List top-level directories of the repo, sorted alphabetically.
 * Skips dot-folders and any names in `exclude`.
 * Returns [{ name, path }].
 */
export async function listFolders(ctx, { exclude = [] } = {}) {
  const url = `${API}/repos/${ctx.owner}/${ctx.repo}/contents/`;
  let res;
  try {
    res = await request(url, ctx);
  } catch (err) {
    if (err instanceof HttpError && err.status === 404) return [];
    throw err;
  }
  const items = await res.json();
  if (!Array.isArray(items)) return [];
  const skip = new Set(exclude);
  return items
    .filter((it) => it.type === "dir")
    .filter((it) => !it.name.startsWith(".") && !skip.has(it.name))
    .map((it) => ({ name: it.name, path: it.path }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * List .md files in a top-level category folder of the repo.
 * Returns [{ name, path, download_url }].
 */
export async function listMarkdown(category, ctx) {
  const url = `${API}/repos/${ctx.owner}/${ctx.repo}/contents/${encodeURIComponent(category)}`;
  let res;
  try {
    res = await request(url, ctx);
  } catch (err) {
    if (err instanceof HttpError && err.status === 404) return [];
    throw err;
  }
  const items = await res.json();
  if (!Array.isArray(items)) return [];
  return items
    .filter((it) => it.type === "file" && it.name.endsWith(".md"))
    .map((it) => ({ name: it.name, path: it.path, download_url: it.download_url }));
}

/**
 * List a directory's immediate contents — both subdirectories and .md files,
 * at any nesting depth. Unlike listMarkdown, `path` may be multi-segment
 * (e.g. "locked/sub/deeper"); each segment is percent-encoded independently
 * so an embedded "/" is never escaped as "%2F" (which the contents API
 * rejects). Dirs sort before files; each group sorts alphabetically.
 * Returns [{ type: "dir"|"file", name, path, download_url }] (download_url
 * is null for dirs). Returns [] on 404.
 */
export async function listContents(path, ctx) {
  const encodedPath = path
    .split("/")
    .filter(Boolean)
    .map(encodeURIComponent)
    .join("/");
  const url = `${API}/repos/${ctx.owner}/${ctx.repo}/contents/${encodedPath}`;
  let res;
  try {
    res = await request(url, ctx);
  } catch (err) {
    if (err instanceof HttpError && err.status === 404) return [];
    throw err;
  }
  const items = await res.json();
  if (!Array.isArray(items)) return [];
  const dirs = items
    .filter((it) => it.type === "dir" && !it.name.startsWith("."))
    .map((it) => ({ type: "dir", name: it.name, path: it.path, download_url: null }))
    .sort((a, b) => a.name.localeCompare(b.name));
  const files = items
    .filter((it) => it.type === "file" && it.name.endsWith(".md"))
    .map((it) => ({ type: "file", name: it.name, path: it.path, download_url: it.download_url }))
    .sort((a, b) => a.name.localeCompare(b.name));
  return [...dirs, ...files];
}

/**
 * Last commit date (ms epoch) touching a path. Returns 0 on failure.
 */
export async function lastCommitDate(path, ctx) {
  const url = `${API}/repos/${ctx.owner}/${ctx.repo}/commits?path=${encodeURIComponent(path)}&per_page=1`;
  try {
    const res = await request(url, ctx);
    const commits = await res.json();
    const iso = commits?.[0]?.commit?.committer?.date;
    const ms = iso ? Date.parse(iso) : NaN;
    return Number.isNaN(ms) ? 0 : ms;
  } catch {
    return 0;
  }
}

/**
 * Fetch raw file content (utf-8 text).
 */
export async function fetchRaw(url, ctx) {
  const res = await request(url, ctx);
  return res.text();
}

export { HttpError };
