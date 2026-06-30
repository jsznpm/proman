// Pure helpers shared by the UI and tests.

/**
 * Run an async mapper over items with a bounded number of in-flight tasks.
 * Preserves input order in the result array.
 */
export async function mapLimit(items, limit, mapper) {
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

/** Format a commit timestamp (ms epoch) as YYYY-MM-DD. */
export function fmtDate(ms) {
  return ms ? new Date(ms).toISOString().slice(0, 10) : "????-??-??";
}

/**
 * First http(s) URL in the content. Handles a bare URL or a Markdown link
 * like [title](https://...). Returns null if none found.
 */
export function extractUrl(content) {
  const match = String(content).match(/https?:\/\/[^\s)<>"']+/);
  return match ? match[0] : null;
}
