const API = "https://api.github.com";

function headers({ token }) {
  const h = {
    Accept: "application/vnd.github+json",
    "User-Agent": "promaster-cli",
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
