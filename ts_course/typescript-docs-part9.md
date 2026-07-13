# TypeScript Kursu — Hissə 9: Modullar

12 hissəlik "Sıfırdan İrəli Səviyyəyə TypeScript" kursunun doqquzuncu hissəsi (plan: `typescript-docs.plan.md`). Bu hissə TypeScript-də ES module sintaksisini, tip-only import/export-ları, CommonJS ilə uyğunluğu, module resolution-un əsaslarını və namespace-lərin qısa tarixini əhatə edir.

## Ön şərtlər

- JavaScript-in ES module sintaksisi (`import`/`export`) haqqında əsas bilik faydalıdır, amma məcburi deyil
- Hissə 5: interface, tip aliaslar

## Mündəricat

1. [Modul nədir](#modul-nədir)
2. [Export sintaksisi](#export-sintaksisi)
3. [Import sintaksisi](#import-sintaksisi)
4. [Tip-only import/export](#tip-only-importexport)
5. [CommonJS uyğunluğu](#commonjs-uyğunluğu)
6. [Module resolution əsasları](#module-resolution-əsasları)
7. [Namespace-lər (qısa tarixi kontekst)](#namespace-lər-qısa-tarixi-kontekst)
8. [Praktika](#praktika)
9. [Xülasə](#xülasə)
10. [Əlavə oxu](#əlavə-oxu)

## Modul nədir

Ən azı bir `import` və ya `export` ifadəsi olan hər `.ts`/`.js` faylı TypeScript üçün **modul** sayılır. Modul daxilindəki hər şey (dəyişən, funksiya, sinif, tip) o faylın öz scope-undadır — açıq şəkildə `export` edilməyincə başqa fayldan görünmür. Bu, köhnə "global script" modelindən (bütün fayllar eyni qlobal scope-u paylaşır) fərqlidir.

## Export sintaksisi

Adlı (named) export-lar:

```typescript
export const ad: string = "Aygün";

export function salamla(ad: string): void {
  console.log(`Salam, ${ad}`);
}

export interface İstifadəçi {
  id: number;
  ad: string;
}
```

Default export — hər faylda ən çox bir dənə ola bilər:

```typescript
export default class Logger {
  log(mesaj: string): void {
    console.log(mesaj);
  }
}
```

Başqa moduldan yenidən export etmək (re-export):

```typescript
export * from "./başqa-modul";
export { xüsusiFunksiya } from "./digər-modul";
```

## Import sintaksisi

```typescript
// Adlı import
import { ad, salamla } from "./modul";

// Default import
import Logger from "./logger";

// Hər ikisi birgə
import Logger, { salamla } from "./modul";

// Namespace import — bütün export-ları bir obyekt kimi
import * as utils from "./utils";
utils.salamla("dünya");

// Yalnız yan-effekt üçün (heç nə import etmədən faylı işə salmaq)
import "./styles.css";
```

## Tip-only import/export

Yalnız tip məqsədilə istifadə olunan import/export-ları `type` açar sözü ilə işarələmək, kompilyasiya zamanı onların tamamilə silinməsini (bundle ölçüsünə təsir etməməsini) təmin edir:

```typescript
// types.ts
export type İstifadəçi = {
  id: number;
  ad: string;
};

// başqa fayl
import type { İstifadəçi } from "./types";

// Qarışıq: həm tip, həm dəyər eyni sətirdə (inline tip import, TS 4.5+)
import { type İstifadəçi, gətİstifadəçi } from "./api";
```

`import type` kompilyasiyadan tamamilə çıxarılır, ona görə runtime-da mövcud olmayan (məsələn, yalnız `.d.ts`-də olan) adları import etsəniz belə problem yaratmır.

## CommonJS uyğunluğu

Node.js-in ənənəvi modul sistemi CommonJS-dir (`require`/`module.exports`). TypeScript bunları ES module sintaksisi ilə qarışdırmağa imkan verir:

```typescript
// CommonJS modulunu import etmək
import * as mod from "./commonjs-modul";

// esModuleInterop aktivdirsə, default import kimi də import edilə bilər
import express from "express";
```

`esModuleInterop` seçimi `tsconfig.json`-da aktiv edilməlidir (Hissə 11-də ətraflı):

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "module": "commonjs"
  }
}
```

## Module resolution əsasları

TypeScript import yolunu (`"./foo"`, `"lodash"` və s.) real fayla necə çevirəcəyini **module resolution strategiyası** ilə müəyyən edir. Ən çox işlədilən strategiyalar:

- **`node`/`node16`/`nodenext`** — Node.js-in öz alqoritminə bənzəyir: nisbi yollar birbaşa, paket adları `node_modules` daxilində axtarılır.
- **`bundler`** — Webpack/esbuild/Vite kimi bundler-lərin davranışına uyğunlaşdırılıb.

`baseUrl` və `paths` ilə import-lara qısa "alias" vermək mümkündür:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"]
    }
  }
}
```

```typescript
import { Düymə } from "@components/Düymə";
```

## Namespace-lər (qısa tarixi kontekst)

ES modullardan **əvvəl**, TypeScript kod təşkilatlandırmaq üçün öz `namespace` konstruksiyasını təklif edirdi:

```typescript
namespace Utils {
  export function log(mesaj: string) {
    console.log(mesaj);
  }
}

Utils.log("Salam");
```

Bu gün ES modullar standart olduğu üçün **namespace-lər yeni layihələrdə tövsiyə olunmur** — onları yalnız köhnə kod bazasında və ya global `.d.ts` deklarasiya fayllarında rast gələ bilərsiniz.

## Praktika

1. `riyaziyyat.ts` faylı yaradın: `topla`, `çıx` adlı iki adlı export funksiya. Başqa fayldan onları adlı import ilə istifadə edin.
2. Eyni `riyaziyyat.ts`-də `PI` adlı `type`-ı `export type` ilə export edin, digər fayldan `import type` ilə import edin.
3. `Kalkulyator` sinifini default export edin, başqa fayldan default import ilə istifadə edin.
4. `@utils/*` üçün `paths` alias-ı olan sadə `tsconfig.json` nümunəsi yazın (kod işə salmadan, yalnız konfiqurasiya kimi).

## Xülasə

- `import`/`export` olan hər fayl moduldur; modulun daxili scope-u fayl xaricinə sızmır.
- Adlı export/import bir neçə şeyi paylaşır, default export/import isə faylda ən çox bir dənə ola bilər.
- `import type`/`export type` (və inline `type` prefiksi) tip-only referansları kompilyasiyadan tamamilə silir.
- `esModuleInterop` ES modullarla CommonJS paketlərini rahat qarışdırmağa imkan verir.
- Module resolution strategiyası (`node16`, `bundler` və s.) import yollarının necə fayla çevrildiyini müəyyən edir; `paths` ilə alias vermək mümkündür.
- Namespace-lər ES modullardan əvvəlki köhnə həlldir — yeni kodda ES modullardan istifadə edin.

## Əlavə oxu

- Mənbə: [Modules](https://www.typescriptlang.org/docs/handbook/modules.html)
- Əvvəlki hissə: **Hissə 8 — Siniflər** (`typescript-docs-part8.md`)
- Növbəti hissə: **Hissə 10 — Enum, Utility Types və Decorators** (`typescript-docs-part10.md`)
