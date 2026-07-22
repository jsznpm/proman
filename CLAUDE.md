# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Three distinct things share one repo:

1. **Content** (repo root) — Markdown files grouped into top-level category folders: `blog/`, `memory/`, `books/`, `ai-engineer/`, `design_patterns_js/`, `front-end/`, `frontend-architect/`, `interview_front_end/`, `films/`, `podcast/`, `podcast-list/`, `courses/`, `js-course/`, `nextjs_course/`, `ts_course/`, `rust_course/`, `react_native/`, `tanstack_query_course/`, `SRE/`, and `locked/`. Mostly Azerbaijani-language articles/notes. Add content by dropping a `.md` file into a folder and committing — no registration step. Order shown to users is by git commit date (newest first). `locked/` is special-cased — see below.
2. **CLI package** (`cli/`) — npm package `promaster`. An interactive prompt-based CLI (`@inquirer/prompts`).
3. **TUI package** (`cli2/`) — npm package `ubuligan`. A full-screen terminal UI (ink/React) that is a sibling front-end over the same content — same repo source, richer interaction (in-terminal Markdown preview, password-gated `locked/` folder).

Only `cli/` and `cli2/` are published to npm. The content above is **never** bundled into either package; it is fetched at runtime via the GitHub API.

Key consequence: the CLIs and the content are decoupled. Whichever CLI is running reads whatever repo `PROMASTER_REPO` points at (default `jsznpm/proman`) over the network. Editing content files does not require touching either CLI and vice versa.

`locked/` is excluded from `promaster` (`cli/`) entirely — it's absent from `EXCLUDED_FOLDERS` handling there, so it never shows or serves. `ubuligan` (`cli2/`) instead gates it behind a SHA-256-checked password prompt (`LOCKED_FOLDER`/`isLockedFolder` in `cli2/src/config.js`) — a UX gate only, since the files are still world-readable via the GitHub API/website regardless of which CLI is used.

## CLI commands (run inside `cli/`)

```bash
npm install
npm test                       # node --test, runs all cli/test/*.test.js
node --test test/github.test.js   # run a single test file
node bin/promaster.js list     # the only real command; interactive
node bin/promaster.js help     # usage
```

Point the CLI at a different content repo:

```bash
PROMASTER_REPO=owner/repo node bin/promaster.js list
GITHUB_TOKEN=...   # optional, raises GitHub API rate limit above 60/hr
```

Build standalone executables (requires `bun`): `npm run build:all` (or `build:win` / `build:mac` / `build:mac-intel` / `build:linux`) → `cli/dist/`.

## TUI commands (run inside `cli2/`)

```bash
npm install
npm test                          # node --test, runs all cli2/test/*.test.js
node --test test/github.test.js   # run a single test file
node bin/ubuligan.js list         # launch the full-screen TUI
node bin/ubuligan.js help         # usage
```

Same `PROMASTER_REPO` / `GITHUB_TOKEN` env vars apply (or a `"ubuligan": { "repo": "owner/repo" }` key in `package.json` instead of `"promaster"`). Build standalone executables (requires `bun`): `npm run build:all` (or `build:win` / `build:mac` / `build:mac-intel` / `build:linux`) → `cli2/dist/`.

## CLI architecture (`cli/src/`)

ES modules (`"type": "module"`), Node ≥18, deps: `@inquirer/prompts` (interactive prompts), `marked` (Markdown→HTML). Layered so I/O is isolated and the rest is pure/testable.

- **`config.js`** — resolves the source repo in priority order: env `PROMASTER_REPO` → `promaster.repo` in cwd's `package.json` → `DEFAULT_REPO` constant. `EXCLUDED_FOLDERS` (`["cli"]`) and dot-folders are hidden as content categories. `PODCAST_FOLDER` ("podcast") marks folders whose files hold a *link* rather than Markdown to render.
- **`github.js`** — the only network layer. Lists folders/`.md` files, gets last-commit date per path (for sorting), fetches raw content. Throws `HttpError` (carries `status`, `rateLimited`); 404s on listing return `[]`.
- **`commands/list.js`** — the whole interactive flow: pick folder → paginated multi-select of files (sorted newest-first by commit date) → open. Commit dates are fetched **per visible page** with `mapLimit` (concurrency 5) to avoid N calls on large folders.
- **`render.js`** — `mdToHtml`: wraps `marked` output in a self-contained HTML doc with inlined GitHub-style CSS (light/dark via `prefers-color-scheme`). Title is HTML-escaped.
- **`download.js`** — `safeName`/`htmlName` guard against path traversal. `saveTemp` renders to a fresh OS temp dir; `save` writes under `./promaster-data/<category>/`.
- **`open.js`** — `openInBrowser` shells out per-platform (`start` / `open` / `xdg-open`), detached and best-effort (never throws).
- **`pagination.js`** — pure `createPaginator` (page math) + `navChoices` (builds inquirer Next/Prev/Back nav items). Shared by folder and file lists so paging behaves identically. `NAV` sentinels are distinct strings so callers `switch` on them safely.

### Behaviour worth knowing

- **Default flow is ephemeral, not saved.** `list.js` → `openEphemeral` renders each pick to a temp dir, opens it in the browser, and deletes everything once the user presses Enter (or on SIGINT). The `save`/`promaster-data` path in `download.js` exists but the `list` command does not currently use it. (README still describes the older save-to-disk behaviour.)
- **Podcast folders open a link, not HTML.** For a folder matching `PODCAST_FOLDER`, `openPodcastLinks` extracts the first `http(s)` URL from the file (via `extractUrl`) and opens it directly.

### Testing conventions

`node:test` + `node:assert/strict`, no test runner dep. Network code is tested by monkey-patching `globalThis.fetch` (see `cli/test/github.test.js` `mockFetch`/`jsonResponse` helpers) — restore the original in a `finally`. Keep `github.js` the sole place that touches the network so this stays possible.

## cli2 (ubuligan) architecture (`cli2/src/`)

ink/React TUI, same Node ≥18 / ESM setup as `cli/`. The I/O layer is copied verbatim from `cli/` (`github.js`, `config.js`, `render.js`, `download.js`, `open.js`, `pagination.js`) so it stays testable the same way; only the interactive layer is new:

- **`config.js`** — same shape as `cli/`'s, plus `LOCKED_FOLDER`/`isLockedFolder`/`hashPassword`/`verifyLockedPassword`: the `locked` folder isn't excluded, it's password-gated (SHA-256 digest `LOCKED_PASSWORD_HASH`, plaintext never stored). `EXCLUDED_FOLDERS` here is just `["cli", "cli2"]`.
- **`ui/app.js`** — root ink component; owns screen-state (folders → browse/node-list → preview) and wires the password prompt in front of `locked`.
- **`ui/folder-list.js` / `ui/node-list.js`** — paginated folder picker and file/subfolder browser (files and nested folders both render as selectable "nodes").
- **`ui/password-prompt.js`** — masked input screen shown only when descending into `locked`; checks input against `verifyLockedPassword`.
- **`ui/preview.js`** — in-terminal Markdown preview (via `markdown.js` → `marked` + `marked-terminal`), independent of `render.js`'s HTML output used for the browser-open path.
- **`ui/frame.js` / `ui/theme.js` / `ui/html.js`** — shared layout chrome, color theme, and the `htm` tagged-template helper used instead of JSX (no build step).
- **`actions.js`** — non-UI side effects triggered from the TUI (open in browser, etc.), kept separate from rendering so they can be tested without mounting ink.
- **`banner.js`** — the ASCII banner printed by `help`/no-args.
- **`commands/list.js`** — thin entry point: resolves the repo, mounts `<App>` with ink's `render`, awaits `waitUntilExit`.

### Testing conventions (cli2)

Same `node:test` approach as `cli/`. `ui.test.js` uses `ink-testing-library` to render components and assert on terminal output; everything else follows `cli/`'s monkey-patch-`fetch` convention.

## Notes

- `.gitignore` excludes `node_modules/`, `promaster-data/`, `.claude/`, `*.log`. Both `cli/node_modules/` and `cli2/node_modules/` are committed in this working tree but ignored — don't add to them.
- `.claude/skills/` is entirely gitignored (repo-local, per-checkout) — currently holds `progit-commit`. Contents here are local scratch and not guaranteed to match across clones; don't treat this list as authoritative content.
