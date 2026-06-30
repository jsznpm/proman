import { useState, useEffect } from "react";
import { Box, Text, useInput } from "ink";
import Spinner from "ink-spinner";
import { html } from "./html.js";
import { Frame } from "./frame.js";
import { useAsync } from "./use-data.js";
import { listMarkdown, lastCommitDate } from "../github.js";
import { mapLimit, fmtDate } from "../util.js";
import { COLORS } from "./theme.js";

const PAGE_SIZE = 10;
const CONCURRENCY = 5;

/**
 * Paginated multi-select over a folder's .md files. Page + cursor-within-page
 * model so each page can be re-sorted by commit date (newest first), matching
 * the original CLI. Commit dates are fetched lazily, per visible page.
 *
 * Keys: ↑/↓ move · n/p page · Space toggle · Enter preview · o open in
 * browser · b/Esc back.
 */
export function FileList({ ctx, folder, status, onPreview, onOpen, onBack }) {
  const { loading, data: files, error } = useAsync(
    () => listMarkdown(folder.name, ctx),
    [folder.name]
  );
  const [page, setPage] = useState(0);
  const [cursor, setCursor] = useState(0);
  const [selected, setSelected] = useState(() => new Set());
  const [dates, setDates] = useState(() => new Map());

  const totalPages = files ? Math.max(1, Math.ceil(files.length / PAGE_SIZE)) : 1;
  const pageItems = files ? files.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE) : [];

  // Fetch commit dates for the current page only.
  useEffect(() => {
    if (!files) return;
    const missing = pageItems.filter((f) => !dates.has(f.path));
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
  }, [files, page]);

  const sorted = [...pageItems].sort(
    (a, b) => (dates.get(b.path) ?? 0) - (dates.get(a.path) ?? 0)
  );
  const highlighted = sorted[Math.min(cursor, sorted.length - 1)];

  useInput((input, key) => {
    if (loading) return;
    if (error || !files || !files.length) {
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
      if (highlighted) {
        setSelected((prev) => {
          const s = new Set(prev);
          if (s.has(highlighted.path)) s.delete(highlighted.path);
          else s.add(highlighted.path);
          return s;
        });
      }
    } else if (key.return) {
      if (highlighted) onPreview(highlighted);
    } else if (input === "o") {
      const picks = selected.size
        ? files.filter((f) => selected.has(f.path))
        : highlighted
        ? [highlighted]
        : [];
      if (picks.length) onOpen(picks);
    } else if (input === "b" || key.escape) {
      onBack();
    }
  });

  if (loading)
    return html`<${Frame} title=${folder.name}><${Text}><${Spinner} type="dots" /> Loading files…<//><//>`;
  if (error)
    return html`<${Frame} title=${folder.name} hint="b/Esc back"><${Text} color=${COLORS.error}>${error.message}<//><//>`;
  if (!files.length)
    return html`<${Frame} title=${folder.name} hint="b/Esc back"><${Text}>No .md files in "${folder.name}".<//><//>`;

  return html`
    <${Frame}
      title=${`${folder.name} — page ${page + 1}/${totalPages} · ${selected.size} selected`}
      status=${status}
      hint="↑/↓ move · Space select · Enter preview · o browser · n/p page · b back"
    >
      ${sorted.map((f, i) => {
        const active = i === Math.min(cursor, sorted.length - 1);
        const checked = selected.has(f.path);
        return html`
          <${Box} key=${f.path}>
            <${Text} color=${active ? COLORS.marker : COLORS.dim}>${active ? "› " : "  "}<//>
            <${Text} color=${checked ? COLORS.selected : COLORS.dim}>${checked ? "[x] " : "[ ] "}<//>
            <${Text} color=${active ? COLORS.selected : undefined} bold=${active}>${f.name}<//>
            <${Text} color=${COLORS.dim}>${"  (" + fmtDate(dates.get(f.path)) + ")"}<//>
          <//>
        `;
      })}
    <//>
  `;
}
