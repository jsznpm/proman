# proman — content repo

Bu repo iki seyden ibaretdir:

1. **Kontent** (repo koku) — markdown fayllar 3 kateqoriyada:
   ```
   blog/      blog yazilari
   memory/    qeydler / yaddash
   books/     kitablar
   ```
2. **CLI paketi** — [`cli/`](./cli) folderinde. npm-e ANCAQ bu paket gedir; yuxaridaki
   kontent npm-e bundle olunmur, runtime-da GitHub API ile cekilir.

## Istifade

```bash
cd cli
npm install
node bin/proman.js list
```

`proman list` -> kateqoriya sec (blog/memory/books) -> fayllar yeni->kohne (git commit
tarixi) -> space ile sec, enter -> `./proman-data/<category>/`-e yuklenir.

Repo adi `jsznpm/proman`-dan ferqlidirse:

```bash
PROMAN_REPO=owner/repo node cli/bin/proman.js list
```

## Yeni kontent elave et

Uygun foldere `.md` fayl at, commit + push et. proman avtomatik gorecek.
Sira git commit tarixine gore (yeni evvelde).
