# promaster

Interactive CLI to browse Markdown from a **public GitHub repo**, grouped into
three categories: **blog**, **memory**, **books**. Each selected file is
rendered to a styled, standalone **HTML** page and opened in your browser —
nothing is saved to disk.

The package ships only the CLI. Your Markdown content lives in your own GitHub
repo and is fetched at runtime — it is never bundled into npm.

## Install

### Standalone binary (no Node.js required)

Download the file for your OS, then run it directly:

| OS | Download | Run |
|----|----------|-----|
| Windows x64 | [promaster-win.exe](https://github.com/jsznpm/proman/releases/latest/download/promaster-win.exe) | `.\promaster-win.exe list` |
| macOS (Apple Silicon) | [promaster-mac-arm64](https://github.com/jsznpm/proman/releases/latest/download/promaster-mac-arm64) | `chmod +x promaster-mac-arm64 && ./promaster-mac-arm64 list` |
| macOS (Intel) | [promaster-mac-x64](https://github.com/jsznpm/proman/releases/latest/download/promaster-mac-x64) | `chmod +x promaster-mac-x64 && ./promaster-mac-x64 list` |
| Linux x64 | [promaster-linux](https://github.com/jsznpm/proman/releases/latest/download/promaster-linux) | `chmod +x promaster-linux && ./promaster-linux list` |

> macOS: on first launch Gatekeeper may block it — System Settings → Privacy & Security → **Open Anyway**, or `xattr -d com.apple.quarantine promaster-mac-arm64`.

### Via npm (requires Node.js ≥ 18)

```bash
npm install -g promaster
```

## Content repo layout

One public repo with three top-level folders, each holding `.md` files:

```
your-repo/
├── blog/
├── memory/
└── books/
```

## Usage

```bash
promaster list
```

1. Pick a category: `blog` / `memory` / `books`.
2. Files are listed newest → oldest (by last git commit date).
3. Toggle one or more with space, confirm with enter.
4. Each selection is rendered to HTML in a temporary directory and opened in
   your default browser right away.
5. Press Enter in the CLI when you're done — the temporary files are deleted.
   Nothing is ever written to your project directory.

The pages render fully offline (styles are inlined, with light/dark support).

## Configuration

Source repo is resolved in this order:

1. `PROMASTER_REPO=owner/repo` environment variable
2. `"promaster": { "repo": "owner/repo" }` in the current directory's `package.json`
3. The `DEFAULT_REPO` constant in `src/config.js`

```bash
PROMASTER_REPO=cavid/my-notes promaster list
```

Optional `GITHUB_TOKEN` raises the unauthenticated rate limit (60/hr → 5000/hr):

```bash
GITHUB_TOKEN=ghp_xxx promaster list
```

## License

MIT
