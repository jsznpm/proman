import { mkdir, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";

export const OUTPUT_ROOT = "promaster-data";

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
 * Save raw content under ./promaster-data/<category>/<name>. Returns absolute path.
 */
export async function save(category, file, content) {
  const dir = resolve(process.cwd(), OUTPUT_ROOT, safeName(category));
  await mkdir(dir, { recursive: true });
  const dest = resolve(dir, safeName(file.name));
  await writeFile(dest, content, "utf8");
  return dest;
}
