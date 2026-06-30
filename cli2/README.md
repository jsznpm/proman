# promaster2 (TUI)

A full-screen terminal UI for browsing Markdown content from a public GitHub
repo. Built with [ink](https://github.com/vadimdemedes/ink) (React for the
terminal). It is a sibling of the `promaster` CLI in `../cli` — same content
source, different front-end.

- Browse content folders and files without leaving the terminal.
- **Preview Markdown right in the terminal** (rendered with `marked-terminal`).
- Open any file in the browser as styled HTML (temporary, auto-cleaned on exit).
- Podcast folders open their link directly.

## Usage

```bash
npm install
node bin/promaster2.js list     # the interactive TUI
node bin/promaster2.js help     # usage
```

Point it at a different content repo:

```bash
PROMASTER_REPO=owner/repo node bin/promaster2.js list
GITHUB_TOKEN=...   # optional, raises the GitHub API rate limit above 60/hr
```

## Keys

| Screen   | Keys |
|----------|------|
| Folders  | `↑`/`↓` move · `n`/`p` page · `Enter` open · `q` quit |
| Files    | `↑`/`↓` move · `Space` select · `Enter` preview · `o` open in browser · `n`/`p` page · `b`/`Esc` back |
| Preview  | `↑`/`↓` scroll · `Space` page down · `g`/`G` top/bottom · `o` open in browser · `b`/`Esc` back |

## Development

```bash
npm test                          # node --test, runs all test/*.test.js
node --test test/github.test.js   # a single file
```

The I/O layer (`github.js`, `config.js`, `render.js`, `download.js`, `open.js`)
is copied verbatim from `../cli`; only the interactive layer (`src/ui/*`) is
new. Network code lives solely in `github.js` so it stays testable by
monkey-patching `globalThis.fetch`.

## Build standalone executables

Requires [bun](https://bun.sh):

```bash
npm run build:all   # or build:win / build:mac / build:mac-intel / build:linux
```

Verified with bun 1.2.21: ink's yoga WebAssembly bundles into the executable
fine. `react-devtools-core` is listed as a direct dependency on purpose — ink
imports it, and without it `bun --compile` fails with `Could not resolve
"react-devtools-core"`. Keep it installed.

> If a future bun version cannot embed `yoga.wasm`
> ([bun#13552](https://github.com/oven-sh/bun/issues/13552)), ship `yoga.wasm`
> next to the executable or use the plain `npm`/`npx` install — that path
> always works.

## Publishing

`name` in `package.json` is a placeholder (`promaster-tui`). Set your own npm
package name before `npm publish`.
