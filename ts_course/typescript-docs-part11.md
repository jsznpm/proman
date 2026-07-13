# TypeScript Kursu — Hissə 11: Layihə Konfiqurasiyası (tsconfig)

12 hissəlik "Sıfırdan İrəli Səviyyəyə TypeScript" kursunun on birinci hissəsi (plan: `typescript-docs.plan.md`). Bu hissə kodla bağlı deyil — istənilən vaxt oxuna bilər. `tsconfig.json`-un strukturunu, ən vacib compiler seçimlərini, `tsc` CLI-ni və project references-i əhatə edir.

## Ön şərtlər

- Hissə 1: `tsconfig.json`-a ilk baxış
- Faydalıdır (məcburi deyil): Hissə 9 (modullar), çünki `module`/`moduleResolution` seçimləri modul sistemi ilə birbaşa bağlıdır.

## Mündəricat

1. [`tsconfig.json` nə üçündür](#tsconfigjson-nə-üçündür)
2. [Kök səviyyəli seçimlər: files, include, exclude](#kök-səviyyəli-seçimlər)
3. [`strict` və alt-bayraqları](#strict-və-alt-bayraqları)
4. [`target` və `module`](#target-və-module)
5. [`outDir`, `rootDir`, `declaration`, `sourceMap`](#outdir-rootdir-declaration-sourcemap)
6. [`esModuleInterop` və `skipLibCheck`](#esmoduleinterop-və-skiplibcheck)
7. [Module resolution seçimləri](#module-resolution-seçimləri)
8. [`tsc` CLI seçimləri](#tsc-cli-seçimləri)
9. [Project references qısaca](#project-references-qısaca)
10. [Praktika](#praktika)
11. [Xülasə](#xülasə)
12. [Əlavə oxu](#əlavə-oxu)

## `tsconfig.json` nə üçündür

Layihənin kök qovluğunda `tsconfig.json` faylı olması, o qovluğun TypeScript layihəsinin kökü olduğunu bildirir. Fayl iki şeyi idarə edir: **hansı fayllar kompilyasiyaya daxil olsun** və **compiler necə davransın**.

```json
{
  "compilerOptions": {
    // compiler seçimləri burada
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Kök səviyyəli seçimlər

| Seçim | Təyinatı |
|---|---|
| `files` | Kompilyasiyaya daxil ediləcək konkret faylların siyahısı |
| `include` | Glob pattern-lərlə daxil ediləcək fayllar (default: `files` yoxdursa `**/*`) |
| `exclude` | İstisna ediləcək pattern-lər (default: `node_modules`, `outDir` və s.) |
| `extends` | Başqa `tsconfig`-dən miras almaq üçün yol |
| `references` | Böyük layihələri kiçik alt-layihələrə bölmək üçün (aşağıda) |

## `strict` və alt-bayraqları

`strict: true` bütün sərt tip-yoxlama bayraqlarını bir dəfəyə aktiv edir. Yeni layihələrdə **həmişə tövsiyə olunur**:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

Bu, aşağıdakıları aktiv edir:

- `noImplicitAny` — implisit `any` tipinə xəta
- `strictNullChecks` — `null`/`undefined` digər tiplərdən ayrı saxlanır
- `strictFunctionTypes` — funksiya parametrlərinin daha sərt yoxlanması
- `strictBindCallApply` — `bind`/`call`/`apply` arqumentlərinin yoxlanması
- `strictPropertyInitialization` — sinif field-lərinin mütləq initialize olunması (Hissə 8-də görmüşdük)
- `noImplicitThis` — implisit `any` tipli `this`-ə xəta
- `alwaysStrict` — hər fayl üçün `"use strict"` emit edilməsi
- `useUnknownInCatchVariables` — `catch` dəyişəni `any` yox, `unknown`

İstəsəniz, `strict: true` saxlayıb konkret bir bayrağı əl ilə söndürə bilərsiniz: `"strictNullChecks": false`.

## `target` və `module`

**`target`** — çıxış JavaScript-in hansı ECMAScript versiyasına uyğun olacağını təyin edir: `ES5`, `ES2015`, `ES2020`, `ES2022`, `ESNext`.

**`module`** — kompilyasiya olunmuş kodun hansı modul sistemindən istifadə edəcəyini təyin edir:

- `commonjs` — Node.js-in ənənəvi formatı
- `es2015`/`esnext` — ES modullar
- `nodenext` — müasir Node.js layihələri üçün tövsiyə olunan seçim
- `bundler` — Webpack/esbuild/Vite kimi alətlər üçün

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "nodenext"
  }
}
```

## `outDir`, `rootDir`, `declaration`, `sourceMap`

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "declaration": true,
    "sourceMap": true
  }
}
```

- **`rootDir`** — giriş fayllarının kök qovluğu (default: fayl yollarının ən uzun ortaq prefiksi).
- **`outDir`** — kompilyasiya edilmiş `.js` faylların yazılacağı qovluq.
- **`declaration`** — hər `.ts` fayl üçün `.d.ts` tip-deklarasiya faylı yaradır; kitabxana yazırsınızsa vacibdir.
- **`sourceMap`** — debug zamanı kompilyasiya olunmuş JS-i orijinal TS koduna bağlayan `.map` faylları yaradır.

## `esModuleInterop` və `skipLibCheck`

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

- **`esModuleInterop`** — CommonJS paketlərini `import ifadə from "paket"` sintaksisi ilə rahat import etməyə imkan verir (Hissə 9-da gördük).
- **`skipLibCheck`** — `node_modules` daxilindəki `.d.ts` fayllarının tip-yoxlamasını keçir — böyük layihələrdə kompilyasiyanı sürətləndirir.

## Module resolution seçimləri

| Seçim | Təyinatı |
|---|---|
| `moduleResolution` | Import-ların necə fayla çevriləcəyi (`node16`, `nodenext`, `bundler`) |
| `baseUrl` | Nisbi olmayan (bare) import-lar üçün baza qovluq |
| `paths` | Import alias-ları (`@/*` → `src/*` kimi) |
| `resolveJsonModule` | `.json` fayllarını birbaşa import etməyə icazə |

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## Nümunə: tam production `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "sourceMap": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

## `tsc` CLI seçimləri

Ən çox işlədilən əmrlər:

```bash
tsc                    # cari qovluqdakı tsconfig.json-a görə kompilyasiya
tsc --init             # yeni tsconfig.json yaradır
tsc --watch            # fayl dəyişikliklərini izləyib avtomatik yenidən kompilyasiya edir
tsc --noEmit           # yalnız tip-yoxlama, JS çıxışı yaratmadan (CI-da faydalıdır)
tsc -b                 # project references ilə "build mode" (aşağıda)
```

## Project references qısaca

Böyük layihələrdə tək `tsconfig.json` çətinləşəndə, **project references** layihəni məntiqi hissələrə bölür (məsələn, `src/` və `test/`):

```
/
├── src/
│   ├── converter.ts
│   └── tsconfig.json
├── test/
│   ├── converter-tests.ts
│   └── tsconfig.json
└── tsconfig.json
```

Ayrı alt-layihələr `composite: true` ilə işarələnməlidir (bu, avtomatik `declaration: true` tələb edir), kök `tsconfig.json` isə `references` ilə onlara istinad edir:

```json
{
  "references": [{ "path": "../src" }]
}
```

Bu quruluşun faydaları: test faylları implementasiya fayllarını təsadüfən import edə bilmir, dəyişən yalnız aid olduğu alt-layihə yenidən kompilyasiya olunur (tam layihə yox), və `tsc -b` bu asılılıqları düzgün ardıcıllıqla qurur.

## Praktika

1. `strict: true`, `target: "ES2022"`, `module: "nodenext"` olan sadə `tsconfig.json` yazın.
2. `@lib/*` alias-ının `src/lib/*`-ə işarə etdiyi `paths` konfiqurasiyası əlavə edin.
3. `outDir`/`rootDir` ilə giriş `src/index.ts`-in `dist/index.js`-ə necə kompilyasiya olunacağını izah edin (yazılı, kod yazmadan).
4. İki alt-layihəli (`src`, `test`) sadə project references strukturu cızın (qovluq ağacı + hər `tsconfig.json`-un məzmunu).

## Xülasə

- `tsconfig.json` layihənin kökünü müəyyən edir; `include`/`exclude`/`files` hansı faylların daxil olacağını, `compilerOptions` isə compiler-in davranışını idarə edir.
- `strict: true` yeni layihələr üçün defolt olmalıdır — bir neçə vacib alt-bayrağı bir yerə toplayır.
- `target` çıxış ECMAScript versiyasını, `module` isə modul formatını təyin edir; müasir Node layihələr üçün `nodenext` tövsiyə olunur.
- `outDir`/`rootDir` çıxış strukturunu, `declaration`/`sourceMap` isə kitabxana/debug ehtiyaclarını idarə edir.
- `esModuleInterop` və `skipLibCheck` demək olar hər layihədə aktiv edilməli praktiki seçimlərdir.
- Project references (`composite`, `references`, `tsc -b`) böyük layihələri sürətli, təcrid olunmuş alt-layihələrə bölür.

## Əlavə oxu

- Mənbə: [tsconfig Reference](https://www.typescriptlang.org/tsconfig/), [Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)
- Əvvəlki hissə: **Hissə 10 — Enum, Utility Types və Decorators** (`typescript-docs-part10.md`)
- Növbəti hissə: **Hissə 12 — Praktiki Layihə və Yekun** (`typescript-docs-part12.md`)
