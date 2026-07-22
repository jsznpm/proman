import { useState, useEffect } from "react";
import { Box, Text, useInput } from "ink";
import Spinner from "ink-spinner";
import { html } from "./html.js";
import { Frame } from "./frame.js";
import { useAsync } from "./use-data.js";
import { listContents, lastCommitDate } from "../github.js";
import { mapLimit, fmtDate } from "../util.js";
import { COLORS } from "./theme.js";

const PAGE_SIZE = 10;
const CONCURRENCY = 5;

/**
 * Paginated browser over a directory's mixed contents (subfolders + .md
 * files), reused at any nesting depth by passing a different `path`.
 * Dirs sort before files (per listContents); within a page, only the file
 * rows are re-sorted by commit date (newest first) once fetched — dirs keep
 * their fetched order and never carry a date/checkbox.
 *
 * Keys: ↑/↓ move · n/p page · Space select (files only) · Enter preview file
 * / descend into dir · o open in browser (files only) · b/Esc back.
 */
export function NodeList({ ctx, path, title, status, onDescend, onPreview, onOpen, onBack }) {
  const { loading, data: entries, error } = useAsync(() => listContents(path, ctx), [path]);
  const [page, setPage] = useState(0);
  const [cursor, setCursor] = useState(0);
  const [selected, setSelected] = useState(() => new Set());
  const [dates, setDates] = useState(() => new Map());

  const totalPages = entries ? Math.max(1, Math.ceil(entries.length / PAGE_SIZE)) : 1;
  const pageItems = entries ? entries.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE) : [];

  // Fetch commit dates for file rows on the current page only.
  useEffect(() => {
    if (!entries) return;
    const missing = pageItems.filter((e) => e.type === "file" && !dates.has(e.path));
    if (!missing.length) return;
    let alive = true;
    mapLimit(missing, CONCURRENCY, (f) => lastCommitDate(f.path, ctx)).then((ds) => {
      if (!alive) return;
      setDates((prev) => {
        const m = new Map(prev);
        missing.forEach((f, i) => m.set(f.path, ds[i]));
        return m;
      });
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries, page]);

  const dirs = pageItems.filter((e) => e.type === "dir");
  const files = [...pageItems.filter((e) => e.type === "file")].sort(
    (a, b) => (dates.get(b.path) ?? 0) - (dates.get(a.path) ?? 0)
  );
  const sorted = [...dirs, ...files];
  const highlighted = sorted[Math.min(cursor, sorted.length - 1)];

  useInput((input, key) => {
    if (loading) return;
    if (error || !entries || !entries.length) {
      if (input === "b" || key.escape) onBack();
      return;
    }
    const len = sorted.length;
    if (key.downArrow || input === "j") {
      if (cursor < len - 1) setCursor(cursor + 1);
      else if (page < totalPages - 1) {
        setPage(page + 1);
        setCursor(0);
      }
    } else if (key.upArrow || input === "k") {
      if (cursor > 0) setCursor(cursor - 1);
      else if (page > 0) {
        setPage(page - 1);
        setCursor(PAGE_SIZE - 1);
      }
    } else if (input === "n" || key.rightArrow) {
      if (page < totalPages - 1) {
        setPage(page + 1);
        setCursor(0);
      }
    } else if (input === "p" || key.leftArrow) {
      if (page > 0) {
        setPage(page - 1);
        setCursor(0);
      }
    } else if (input === " ") {
      if (highlighted && highlighted.type === "file") {
        setSelected((prev) => {
          const s = new Set(prev);
          if (s.has(highlighted.path)) s.delete(highlighted.path);
          else s.add(highlighted.path);
          return s;
        });
      }
    } else if (key.return) {
      if (highlighted && highlighted.type === "dir") onDescend(highlighted);
      else if (highlighted) onPreview(highlighted);
    } else if (input === "o") {
      const picks = selected.size
        ? files.filter((f) => selected.has(f.path))
        : highlighted && highlighted.type === "file"
        ? [highlighted]
        : [];
      if (picks.length) onOpen(picks);
    } else if (input === "b" || key.escape) {
      onBack();
    }
  });

  if (loading)
    return html`<${Frame} title=${title}><${Text}><${Spinner} type="dots" /> Loading…<//><//>`;
  if (error)
    return html`<${Frame} title=${title} hint="b/Esc back"><${Text} color=${COLORS.error}>${error.message}<//><//>`;
  if (!entries.length)
    return html`<${Frame} title=${title} hint="b/Esc back"><${Text}>Nothing in "${title}".<//><//>`;

  return html`
    <${Frame}
      title=${`${title} — page ${page + 1}/${totalPages} · ${selected.size} selected`}
      status=${status}
      hint="↑/↓ move · Space select · Enter preview/descend · o browser · n/p page · b back"
    >
      ${sorted.map((e, i) => {
        const active = i === Math.min(cursor, sorted.length - 1);
        if (e.type === "dir") {
          return html`
            <${Box} key=${e.path}>
              <${Text} color=${active ? COLORS.marker : COLORS.dim}>${active ? "› " : "  "}<//>
              <${Text} color=${active ? COLORS.selected : undefined} bold=${active}>${e.name + "/"}<//>
            <//>
          `;
        }
        const checked = selected.has(e.path);
        return html`
          <${Box} key=${e.path}>
            <${Text} color=${active ? COLORS.marker : COLORS.dim}>${active ? "› " : "  "}<//>
            <${Text} color=${checked ? COLORS.selected : COLORS.dim}>${checked ? "[x] " : "[ ] "}<//>
            <${Text} color=${active ? COLORS.selected : undefined} bold=${active}>${e.name}<//>
            <${Text} color=${COLORS.dim}>${"  (" + fmtDate(dates.get(e.path)) + ")"}<//>
          <//>
        `;
      })}
    <//>
  `;
}
