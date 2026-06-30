import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { basename, extname, resolve } from "node:path";
import { tmpdir } from "node:os";
import { mdToHtml } from "./render.js";

export const OUTPUT_ROOT = "ubuligan-data";

/**
 * Sanitize a GitHub file name to a safe basename (no traversal, no slashes).
 */
export function safeName(name) {
  const base = basename(String(name).replace(/\\/g, "/"));
  if (!base || base === "." || base === "..") {
    throw new Error(`Unsafe file name: ${name}`);
  }
  return base;
}

/**
 * Safe basename with its extension replaced by ".html".
 */
export function htmlName(name) {
  const base = safeName(name);
  const ext = extname(base);
  const stem = ext ? base.slice(0, -ext.length) : base;
  return `${stem}.html`;
}

/**
 * Render markdown to a styled HTML document and save it under
 * ./ubuligan-data/<category>/<name>.html. Returns the absolute path.
 */
export async function save(category, file, content) {
  const dir = resolve(process.cwd(), OUTPUT_ROOT, safeName(category));
  await mkdir(dir, { recursive: true });
  const base = safeName(file.name);
  const ext = extname(base);
  const title = ext ? base.slice(0, -ext.length) : base;
  const html = mdToHtml(content, { title });
  const dest = resolve(dir, htmlName(file.name));
  await writeFile(dest, html, "utf8");
  return dest;
}

/**
 * Render markdown to HTML in a fresh OS temp directory (never under
 * ubuligan-data). Returns { path, dir } so the caller can delete `dir`
 * once the user is done viewing — nothing is persisted.
 */
export async function saveTemp(file, content) {
  const dir = await mkdtemp(resolve(tmpdir(), "ubuligan-"));
  const base = safeName(file.name);
  const ext = extname(base);
  const title = ext ? base.slice(0, -ext.length) : base;
  const html = mdToHtml(content, { title });
  const path = resolve(dir, htmlName(file.name));
  await writeFile(path, html, "utf8");
  return { path, dir };
}
