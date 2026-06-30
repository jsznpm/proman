import { render } from "ink";
import { resolveRepo } from "../config.js";
import { App } from "../ui/app.js";
import { html } from "../ui/html.js";
import { HttpError } from "../github.js";

/**
 * Mount the full-screen TUI and wait until the user quits.
 */
export async function runList() {
  const ctx = resolveRepo();
  const { waitUntilExit } = render(html`<${App} ctx=${ctx} />`);
  await waitUntilExit();
}

export { HttpError };
