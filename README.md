# proman — content repo

Bu repo uc seyden ibaretdir:

1. **Kontent** (repo koku) — markdown fayllar kateqoriya folderlerinde:
   ```
   blog/                    blog yazilari
   memory/                  qeydler / yaddash
   books/                   kitablar
   ai-engineer/             AI mohendisliyi
   design_patterns_js/      JS dizayn pattern-leri
   front-end/               front-end qeydleri
   frontend-architect/      front-end arxitektura
   interview_front_end/     front-end mulaqet suallari
   films/                   film qeydleri
   podcast/, podcast-list/  podcast linkleri (fayllar link saxlayir, markdown deyil)
   courses/, js-course/, nextjs_course/, ts_course/, rust_course/,
   react_native/, tanstack_query_course/                kurs qeydleri
   SRE/                     SRE qeydleri
   locked/                  parol-qorumali folder (asagida bax)
   ```
   Uygun foldere `.md` fayl at, commit + push et — CLI avtomatik gorecek, registrasiya
   lazim deyil. Sira git commit tarixine gore (yeni evvelde).
2. **CLI paketi** — [`cli/`](./cli) folderinde, npm-de adi **`promaster`**. Interaktiv
   prompt-based CLI (`@inquirer/prompts`).
3. **TUI paketi** — [`cli2/`](./cli2) folderinde, npm-de adi **`ubuligan`**. Eyni kontenti
   gosteren full-screen terminal UI (ink/React) — `promaster`-in bacisi, amma terminalda
   Markdown preview ve `locked/` folderi ucun parol prompt-u var.

Yalniz `cli/` ve `cli2/` npm-e cixir; yuxaridaki kontent hec birine bundle olunmur —
runtime-da GitHub API ile cekilir.

## Istifade — promaster (`cli/`)

```bash
cd cli
npm install
node bin/promaster.js list
```

`promaster list` -> kateqoriya sec -> fayllar yeni->kohne (git commit tarixi) -> space ile
sec, enter -> her seçim müveqqeti qovluga render olunub browserde acilir, CLI-dan çıxanda
silinir (hec ne diskde qalmir). `locked/` folderi `promaster`-de hec gorunmur.

## Istifade — ubuligan (`cli2/`)

```bash
cd cli2
npm install
node bin/ubuligan.js list
```

Eyni axin, amma tam ekran terminal interfeysinde: fayllari terminalda preview ede
bilersen ve ya browserde ac. `locked/` folderi burada parolla qorunur (bax
[`cli2/README.md`](./cli2/README.md#locked-folder-password)) — bu sadece UX baryeridir,
fayllar yene de GitHub API/website vasitesile hamiya aciqdir.

## Kontent repo deyisdirmek

Reponun adi `jsznpm/proman`-dan ferqlidirse, her iki CLI ucun eynidir:

```bash
PROMASTER_REPO=owner/repo node cli/bin/promaster.js list
PROMASTER_REPO=owner/repo node cli2/bin/ubuligan.js list
GITHUB_TOKEN=...   # optional, GitHub API rate limitini artirir (60/saat -> 5000/saat)
```

qaldigim yer qeydi- Переход в SRE из другой сферы
