import { useState, useMemo } from "react";
import { Box, Text, useInput } from "ink";
import Spinner from "ink-spinner";
import { html } from "./html.js";
import { Frame } from "./frame.js";
import { useAsync } from "./use-data.js";
import { fetchContent } from "../actions.js";
import { renderMarkdownToAnsi } from "../markdown.js";
import { COLORS } from "./theme.js";

/**
 * Scrollable in-terminal Markdown preview. ↑/↓ scroll one line, Space/PgDn a
 * page, o opens in the browser, b/Esc go back.
 */
export function Preview({ ctx, file, onOpen, onBack }) {
  const { loading, data: content, error } = useAsync(
    () => fetchContent(file, ctx),
    [file.path]
  );
  const [offset, setOffset] = useState(0);

  const lines = useMemo(
    () => (content != null ? renderMarkdownToAnsi(content).replace(/\n$/, "").split("\n") : []),
    [content]
  );

  const rows = process.stdout.rows || 24;
  const viewport = Math.max(5, rows - 8);
  const maxOffset = Math.max(0, lines.length - viewport);

  useInput((input, key) => {
    if (input === "o") onOpen();
    else if (input === "b" || key.escape) onBack();
    else if (loading || error) return;
    else if (key.downArrow || input === "j") setOffset((o) => Math.min(maxOffset, o + 1));
    else if (key.upArrow || input === "k") setOffset((o) => Math.max(0, o - 1));
    else if (input === " " || key.pageDown) setOffset((o) => Math.min(maxOffset, o + viewport));
    else if (key.pageUp) setOffset((o) => Math.max(0, o - viewport));
    else if (input === "g") setOffset(0);
    else if (input === "G") setOffset(maxOffset);
  });

  if (loading)
    return html`<${Frame} title=${file.name}><${Text}><${Spinner} type="dots" /> Loading…<//><//>`;
  if (error)
    return html`<${Frame} title=${file.name} hint="b/Esc back"><${Text} color=${COLORS.error}>${error.message}<//><//>`;

  const view = lines.slice(offset, offset + viewport);
  const atEnd = offset >= maxOffset;

  return html`
    <${Frame}
      title=${`${file.name} — ${offset + 1}-${Math.min(offset + viewport, lines.length)}/${lines.length}`}
      hint=${`↑/↓ scroll · Space page · g/G top/bottom · o browser · b back${atEnd ? "" : " · ▼ more"}`}
    >
      <${Box} flexDirection="column">
        ${view.map((line, i) => html`<${Text} key=${offset + i} wrap="truncate-end">${line || " "}<//>`)}
      <//>
    <//>
  `;
}
