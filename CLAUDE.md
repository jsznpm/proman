# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Two distinct things share one repo:

1. **Content** (repo root) — Markdown files grouped into top-level category folders: `blog/`, `memory/`, `books/`, `ai-engineer/`, `design_patterns_js/`, `front-end/`, `interview_front_end/`, `films/`, `podcast/`, `podcast-list/`. Mostly Azerbaijani-language articles/notes. Add content by dropping a `.md` file into a folder and committing — no registration step. Order shown to users is by git commit date (newest first).
2. **CLI package** (`cli/`) — npm package `promaster`. Only `cli/` is published to npm. The content above is **never** bundled; it is fetched at runtime via the GitHub API.

Key consequence: the CLI and the content are decoupled. The CLI running on a user's machine reads whatever repo `PROMASTER_REPO` points at (default `jsznpm/proman`) over the network. Editing content files does not require touching the CLI and vice versa.

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

## Notes

- `.gitignore` excludes `node_modules/`, `promaster-data/`, `.claude/`, `*.log`. The CLI's `node_modules/` is committed in this working tree but ignored — don't add to it.
- `.claude/skills/` holds repo-local skills (`article-az`, `create-lesson`) for authoring Azerbaijani Markdown content.
