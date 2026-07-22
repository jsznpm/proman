# ubuligan (TUI)

```
 ██    ██ ██████  ██    ██ ██      ██  ██████   █████  ███    ██
 ██    ██ ██   ██ ██    ██ ██      ██ ██       ██   ██ ████   ██
 ██    ██ ██████  ██    ██ ██      ██ ██   ███ ███████ ██ ██  ██
 ██    ██ ██   ██ ██    ██ ██      ██ ██    ██ ██   ██ ██  ██ ██
  ██████  ██████   ██████  ███████ ██  ██████  ██   ██ ██   ████
        [ markdown recon // terminal access // v2 ]
```

A full-screen terminal UI for browsing Markdown content from a public GitHub
repo. Built with [ink](https://github.com/vadimdemedes/ink) (React for the
terminal). Sibling of the `promaster` CLI in `../cli` — same content source,
different front-end.

- Browse content folders and files without leaving the terminal.
- **Preview Markdown right in the terminal** (rendered with `marked-terminal`).
- Open any file in the browser as styled HTML (temporary, auto-cleaned on exit).
- Podcast folders open their link directly.

## Install

### Option A — npm (global)

```bash
npm install -g ubuligan
ubuligan list      # interactive TUI
ubuligan help      # usage
```

### Option B — npx (no install)

```bash
npx ubuligan list
```

### Option C — from source

```bash
git clone https://github.com/jsznpm/proman
cd proman/cli2
npm install
node bin/ubuligan.js list
```

### Option D — standalone binary

Grab a prebuilt executable from `dist/` (or build it — see below), then run it
directly. No Node required.

```bash
./ubuligan-linux list          # Linux
./ubuligan-mac-arm64 list      # macOS (Apple Silicon)
ubuligan-win.exe list          # Windows
```

## Usage

```bash
ubuligan list      # the interactive TUI
ubuligan help      # usage
```

Point it at a different content repo:

```bash
PROMASTER_REPO=owner/repo ubuligan list
GITHUB_TOKEN=...   # optional, raises the GitHub API rate limit above 60/hr
```

Or set it per-project in `package.json`:

```json
{ "ubuligan": { "repo": "owner/repo" } }
```

## Keys

| Screen   | Keys |
|----------|------|
| Folders  | `↑`/`↓` move · `n`/`p` page · `Enter` open · `q` quit |
| Password | type to enter · `Enter` unlock · `Esc` cancel (shown only for the password-gated `locked` folder) |
| Browse   | `↑`/`↓` move · `Space` select (files) · `Enter` preview file / descend into folder · `o` open in browser · `n`/`p` page · `b`/`Esc` back |
| Preview  | `↑`/`↓` scroll · `Space` page down · `g`/`G` top/bottom · `o` open in browser · `b`/`Esc` back |

## Locked folder password

The `locked` content folder is gated in the TUI by a password prompt. This is
a **UX gate only** — the files still live in the public repo and are
readable directly via the GitHub API/website. The password's SHA-256 hex
digest is embedded in `src/config.js` as `LOCKED_PASSWORD_HASH`; the
plaintext password itself is never written to disk or committed anywhere.

To set or rotate the password:

1. Pick a passphrase.
2. Compute its SHA-256 hex digest (nothing is written to disk):

   ```bash
   node -e "console.log(require('node:crypto').createHash('sha256').update(process.argv[1]).digest('hex'))" "your new passphrase"
   ```

3. Copy the printed 64-character hex string into `src/config.js`, replacing
   the value of `LOCKED_PASSWORD_HASH`.
4. Commit only the hash. Never commit the plaintext passphrase in code,
   commit messages, or docs.

Rotating later is the same three steps with a new passphrase — the old one
stops working as soon as the new hash ships.

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

Output lands in `dist/` (`ubuligan-win.exe`, `ubuligan-mac-arm64`,
`ubuligan-mac-x64`, `ubuligan-linux`).

Verified with bun 1.2.21: ink's yoga WebAssembly bundles into the executable
fine. `react-devtools-core` is listed as a direct dependency on purpose — ink
imports it, and without it `bun --compile` fails with `Could not resolve
"react-devtools-core"`. Keep it installed.

> If a future bun version cannot embed `yoga.wasm`
> ([bun#13552](https://github.com/oven-sh/bun/issues/13552)), ship `yoga.wasm`
> next to the executable or use the plain `npm`/`npx` install — that path
> always works.
