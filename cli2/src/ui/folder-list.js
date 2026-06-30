import { useState } from "react";
import { Text, useInput } from "ink";
import Spinner from "ink-spinner";
import { html } from "./html.js";
import { Frame } from "./frame.js";
import { useAsync } from "./use-data.js";
import { listFolders } from "../github.js";
import { EXCLUDED_FOLDERS } from "../config.js";
import { COLORS } from "./theme.js";

const PAGE_SIZE = 10;

/**
 * Paginated single-select over content folders. Cursor is an absolute index
 * into the full list; the visible page is derived from it.
 */
export function FolderList({ ctx, onSelect, onQuit }) {
  const { loading, data: folders, error } = useAsync(
    () => listFolders(ctx, { exclude: EXCLUDED_FOLDERS }),
    []
  );
  const [cursor, setCursor] = useState(0);

  useInput((input, key) => {
    if (loading) return;
    if (error || !folders || !folders.length) {
      if (input === "q") onQuit();
      return;
    }
    const n = folders.length;
    if (key.downArrow || input === "j") setCursor((c) => Math.min(n - 1, c + 1));
    else if (key.upArrow || input === "k") setCursor((c) => Math.max(0, c - 1));
    else if (input === "n" || key.rightArrow)
      setCursor((c) => Math.min(n - 1, (Math.floor(c / PAGE_SIZE) + 1) * PAGE_SIZE));
    else if (input === "p" || key.leftArrow)
      setCursor((c) => Math.max(0, (Math.floor(c / PAGE_SIZE) - 1) * PAGE_SIZE));
    else if (key.return) onSelect(folders[cursor]);
    else if (input === "q") onQuit();
  });

  if (loading)
    return html`<${Frame}><${Text}><${Spinner} type="dots" /> Loading folders…<//><//>`;
  if (error)
    return html`<${Frame} hint="q quit"><${Text} color=${COLORS.error}>${error.message}<//><//>`;
  if (!folders.length)
    return html`<${Frame} hint="q quit"><${Text}>No folders found.<//><//>`;

  const page = Math.floor(cursor / PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(folders.length / PAGE_SIZE));
  const start = page * PAGE_SIZE;
  const visible = folders.slice(start, start + PAGE_SIZE);

  return html`
    <${Frame}
      title=${`Folders — page ${page + 1}/${totalPages}`}
      hint="↑/↓ move · n/p page · Enter open · q quit"
    >
      ${visible.map((f, i) => {
        const active = start + i === cursor;
        return html`
          <${Text} key=${f.path} color=${active ? COLORS.selected : undefined} bold=${active}>
            ${active ? "› " : "  "}${f.name}
          <//>
        `;
      })}
    <//>
  `;
}
