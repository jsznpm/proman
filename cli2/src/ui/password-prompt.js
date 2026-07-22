import { useState } from "react";
import { Text, useInput } from "ink";
import { html } from "./html.js";
import { Frame } from "./frame.js";
import { COLORS } from "./theme.js";

/**
 * Masked password entry, gating the "locked" folder. UX gate only — no
 * ink-text-input dependency, just a hand-rolled useInput accumulator
 * rendering "•" per character, matching this codebase's raw-keypress style.
 *
 * Keys: characters accumulate · Backspace deletes · Enter submits ·
 * Esc cancels.
 */
export function PasswordPrompt({ onSubmit, onCancel, error }) {
  const [value, setValue] = useState("");

  useInput((input, key) => {
    if (key.return) {
      onSubmit(value);
    } else if (key.escape) {
      onCancel();
    } else if (key.backspace || key.delete) {
      setValue((v) => v.slice(0, -1));
    } else if (input && !key.ctrl && !key.meta) {
      setValue((v) => v + input);
    }
  });

  return html`
    <${Frame} title="locked" hint="Enter unlock · Esc cancel">
      <${Text}>Password: ${"•".repeat(value.length)}<//>
      ${error ? html`<${Text} color=${COLORS.error}>${error}<//>` : null}
    <//>
  `;
}
