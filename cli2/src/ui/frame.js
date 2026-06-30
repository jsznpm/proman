import { Box, Text } from "ink";
import { html } from "./html.js";
import { COLORS, LOGO } from "./theme.js";

/**
 * Shared screen chrome: logo header, optional subtitle, a bordered content
 * box, and an optional key-hint / status footer.
 */
export function Frame({ title, hint, status, children }) {
  return html`
    <${Box} flexDirection="column" paddingX=${1} paddingY=${0}>
      <${Box}>
        <${Text} color=${COLORS.accent} bold=${true}>${LOGO}<//>
        ${title ? html`<${Text} color=${COLORS.dim}>${"  ·  " + title}<//>` : null}
      <//>
      <${Box}
        flexDirection="column"
        borderStyle="round"
        borderColor=${COLORS.accent}
        paddingX=${1}
        marginTop=${1}
      >
        ${children}
      <//>
      ${status ? html`<${Box} marginTop=${1}><${Text} color=${COLORS.warn}>${status}<//><//>` : null}
      ${hint ? html`<${Box} marginTop=${status ? 0 : 1}><${Text} color=${COLORS.dim}>${hint}<//><//>` : null}
    <//>
  `;
}
