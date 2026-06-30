import { marked } from "marked";

const ESCAPE = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };

function escapeHtml(str) {
  return String(str).replace(/[&<>"]/g, (ch) => ESCAPE[ch]);
}

const STYLE = `
  :root { color-scheme: light dark; }
  body {
    max-width: 760px;
    margin: 2.5rem auto;
    padding: 0 1.25rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.65;
    color: #1a1a1a;
    background: #ffffff;
  }
  h1, h2, h3, h4 { line-height: 1.25; margin-top: 1.8em; }
  h1 { border-bottom: 1px solid #e1e4e8; padding-bottom: .3em; }
  a { color: #0969da; }
  code {
    font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
    font-size: .9em;
    background: rgba(127,127,127,.15);
    padding: .15em .35em;
    border-radius: 4px;
  }
  pre {
    background: #f6f8fa;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
  }
  pre code { background: none; padding: 0; }
  blockquote {
    margin: 0;
    padding: 0 1em;
    color: #57606a;
    border-left: .25em solid #d0d7de;
  }
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #d0d7de; padding: .5em .75em; }
  img { max-width: 100%; }
  @media (prefers-color-scheme: dark) {
    body { color: #e6edf3; background: #0d1117; }
    h1 { border-bottom-color: #30363d; }
    a { color: #4493f8; }
    pre { background: #161b22; }
    blockquote { color: #8b949e; border-left-color: #30363d; }
    th, td { border-color: #30363d; }
  }
`;

/**
 * Convert markdown text into a standalone, styled HTML document.
 * @param {string} markdown raw markdown source
 * @param {{ title?: string }} [opts]
 * @returns {string} full HTML document
 */
export function mdToHtml(markdown, { title = "Document" } = {}) {
  const body = marked.parse(String(markdown));
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<style>${STYLE}</style>
</head>
<body>
${body}
</body>
</html>
`;
}
