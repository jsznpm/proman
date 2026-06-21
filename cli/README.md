# promaster

Interactive CLI to browse Markdown from a **public GitHub repo**, grouped into
three categories: **blog**, **memory**, **books**. Each selected file is
rendered to a styled, standalone **HTML** page and opened in your browser —
nothing is saved to disk.

The package ships only the CLI. Your Markdown content lives in your own GitHub
repo and is fetched at runtime — it is never bundled into npm.

## Install

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
