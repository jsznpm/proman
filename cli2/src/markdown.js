import { Marked } from "marked";
import { markedTerminal } from "marked-terminal";

// Isolated Marked instance so the terminal renderer never mutates the global
// `marked` singleton used by render.js for browser HTML.
let instance;

/**
 * Render Markdown source to an ANSI-colored string for terminal display.
 */
export function renderMarkdownToAnsi(src) {
  if (!instance) {
    instance = new Marked();
    instance.use(markedTerminal());
  }
  return String(instance.parse(String(src)));
}
