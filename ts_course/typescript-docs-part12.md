# TypeScript Kursu — Hissə 12: Praktiki Layihə və Yekun

12 hissəlik "Sıfırdan İrəli Səviyyəyə TypeScript" kursunun sonuncu hissəsi (plan: `typescript-docs.plan.md`). Bu hissə əvvəlki 11 hissədə öyrənilən demək olar bütün mövzuları — tiplər, narrowing, funksiyalar, obyekt tipləri, generic-lər, tip operatorları, siniflər, modullar, enum/utility types, tsconfig — birləşdirən kiçik, tip-təhlükəsiz bir layihə qurur. Sonda ən çox rast gəlinən səhvlərin siyahısı və kursun ümumi xülasəsi var.

## Ön şərtlər

- Hissə 1–11-in hamısı (bu hissə onların üzərinə qurulur, yeni mövzu təqdim etmir)

## Mündəricat

1. [Layihə: Tapşırıq İdarəetmə Sistemi (kiçik CLI data-model)](#layihə-tapşırıq-idarəetmə-sistemi)
2. [Addım 1 — Domen tipləri](#addım-1--domen-tipləri)
3. [Addım 2 — Anbar sinifi (generic + görünürlük)](#addım-2--anbar-sinifi)
4. [Addım 3 — Narrowing və discriminated union ilə əməliyyat nəticələri](#addım-3--narrowing-və-discriminated-union)
5. [Addım 4 — Utility types ilə "yeniləmə" funksiyası](#addım-4--utility-types-ilə-yeniləmə-funksiyası)
6. [Addım 5 — Modul olaraq təşkil etmək](#addım-5--modul-olaraq-təşkil-etmək)
7. [Tez-tez rast gəlinən səhvlər](#tez-tez-rast-gəlinən-səhvlər)
8. [Kursun ümumi xülasəsi](#kursun-ümumi-xülasəsi)
9. [Əlavə oxu](#əlavə-oxu)

## Layihə: Tapşırıq İdarəetmə Sistemi

Kiçik, yaddaşda (in-memory) işləyən bir tapşırıq (todo) idarəetmə modeli quracağıq. Məqsəd — real API çağırmaq yox, əvvəlki hissələrdəki konsepsiyaların **birlikdə necə işlədiyini** göstərməkdir. Kodu bir neçə fərz olunan fayla bölürük (real layihədə hər biri ayrı `.ts` faylı olardı); burada aydınlıq üçün bölmə başlıqları ilə göstərilir.

## Addım 1 — Domen tipləri

`types.ts` (Hissə 5, 7, 10: obyekt tipləri, template literal types, enum-un `as const` alternativi):

```typescript
export type TapşırıqStatusu = "gözləyir" | "icradadır" | "bitib";

export interface Tapşırıq {
  readonly id: string;
  başlıq: string;
  status: TapşırıqStatusu;
  prioritet: 1 | 2 | 3; // 1 = ən yüksək
  etiketlər: readonly string[];
}

// Template literal type: "TASK-1", "TASK-42" kimi ID formatını təsvir edir
export type TapşırıqId = `TASK-${number}`;
```

`readonly id`, `readonly string[]` — Hissə 5-də gördüyümüz kimi, yaradıldıqdan sonra dəyişməli olmayan sahələri işarələyir.

## Addım 2 — Anbar sinifi

`store.ts` (Hissə 6, 8: generic siniflər, `private`, parameter properties, `keyof`):

```typescript
import { Tapşırıq, TapşırıqStatusu } from "./types";

export class TapşırıqAnbarı {
  private tapşırıqlar: Map<string, Tapşırıq> = new Map();
  private növbətiId = 1;

  əlavəEt(başlıq: string, prioritet: 1 | 2 | 3 = 2): Tapşırıq {
    const id = `TASK-${this.növbətiId++}`;
    const tapşırıq: Tapşırıq = {
      id,
      başlıq,
      status: "gözləyir",
      prioritet,
      etiketlər: [],
    };
    this.tapşırıqlar.set(id, tapşırıq);
    return tapşırıq;
  }

  tap(id: string): Tapşırıq | undefined {
    return this.tapşırıqlar.get(id);
  }

  // Generic funksiya: verilmiş açara görə tapşırıqları qrupla
  qrupla<Key extends keyof Tapşırıq>(açar: Key): Map<Tapşırıq[Key], Tapşırıq[]> {
    const nəticə = new Map<Tapşırıq[Key], Tapşırıq[]>();
    for (const tapşırıq of this.tapşırıqlar.values()) {
      const dəyər = tapşırıq[açar];
      const siyahı = nəticə.get(dəyər) ?? [];
      siyahı.push(tapşırıq);
      nəticə.set(dəyər, siyahı);
    }
    return nəticə;
  }

  hamısı(): Tapşırıq[] {
    return [...this.tapşırıqlar.values()];
  }
}
```

`qrupla<Key extends keyof Tapşırıq>` — Hissə 6-da öyrəndiyimiz "constraint daxilində tip parametrini işlətmək" nümunəsinin birbaşa tətbiqidir: `açar` yalnız `Tapşırıq`-ın real xüsusiyyət adlarından biri ola bilər, yazı səhvi kompilyasiya zamanı tutulur.

## Addım 3 — Narrowing və discriminated union

`əməliyyat-nəticəsi.ts` (Hissə 3: discriminated unions, exhaustiveness checking):

```typescript
import { Tapşırıq } from "./types";

type ƏməliyyatNəticəsi =
  | { uğurlu: true; tapşırıq: Tapşırıq }
  | { uğurlu: false; xəta: string };

export function statusuDəyiş(
  anbar: { tap(id: string): Tapşırıq | undefined },
  id: string,
  yeniStatus: Tapşırıq["status"]
): ƏməliyyatNəticəsi {
  const tapşırıq = anbar.tap(id);
  if (tapşırıq === undefined) {
    return { uğurlu: false, xəta: `${id} tapılmadı` };
  }
  tapşırıq.status = yeniStatus;
  return { uğurlu: true, tapşırıq };
}

function nəticəniGöstər(nəticə: ƏməliyyatNəticəsi): string {
  // `uğurlu` sahəsi discriminant-dır — TypeScript hər budaqda digər sahələri avtomatik daraldır
  if (nəticə.uğurlu) {
    return `Yeniləndi: ${nəticə.tapşırıq.başlıq}`; // burada .tapşırıq təhlükəsizdir
  } else {
    return `Xəta: ${nəticə.xəta}`; // burada .xəta təhlükəsizdir
  }
}
```

Bu, Hissə 3-də öyrədilən **discriminated union** naxışıdır: `uğurlu: true | false` iki fərqli formanı ayırd edən "sabit açardır" — TypeScript `if (nəticə.uğurlu)` yoxlamasından sonra hər budaqda qalan sahələri düzgün daraldır.

## Addım 4 — Utility types ilə "yeniləmə" funksiyası

`yenilə.ts` (Hissə 10: `Partial`, `Pick`):

```typescript
import { Tapşırıq } from "./types";

// İstifadəçi yalnız bəzi sahələri yeniləmək istəyə bilər
type YenilənəBilənSahələr = Partial<Pick<Tapşırıq, "başlıq" | "prioritet" | "etiketlər">>;

export function tapşırığıYenilə(tapşırıq: Tapşırıq, dəyişikliklər: YenilənəBilənSahələr): Tapşırıq {
  return { ...tapşırıq, ...dəyişikliklər };
}

// İstifadə:
// tapşırığıYenilə(t, { prioritet: 1 }) — OK, yalnız icazə verilən sahələr qəbul olunur
// tapşırığıYenilə(t, { id: "TASK-99" }) — Xəta, 'id' YenilənəBilənSahələr-də yoxdur (və readonly-dir)
```

`Pick` ilə əvvəlcə hansı sahələrin ümumiyyətlə dəyişdirilə biləcəyini məhdudlaşdırırıq (məsələn, `id` və `status` bu yolla dəyişdirilə bilməz), sonra `Partial` ilə onların hamısını optional edirik — beləliklə çağıran istənilən alt-çoxluğu göndərə bilər.

## Addım 5 — Modul olaraq təşkil etmək

`index.ts` (Hissə 9: import/export):

```typescript
import { TapşırıqAnbarı } from "./store";
import { statusuDəyiş } from "./əməliyyat-nəticəsi";
import { tapşırığıYenilə } from "./yenilə";
import type { Tapşırıq } from "./types"; // tip-only import

const anbar = new TapşırıqAnbarı();
const t1 = anbar.əlavəEt("TypeScript kursu yaz", 1);

const yeni: Tapşırıq = tapşırığıYenilə(t1, { prioritet: 2 });

const nəticə = statusuDəyiş(anbar, t1.id, "icradadır");
console.log(nəticə);
```

Bu beş addım bir araya gələndə — domen tipləri, generic anbar sinifi, discriminated union nəticələri, utility types ilə qismən yeniləmə və modul strukturu — orta ölçülü hər real TypeScript layihəsinin skeletini təşkil edir.

## Tez-tez rast gəlinən səhvlər

- **`any`-ə tez əl atmaq.** Tip bilinmirsə, `any` yox, `unknown` yazın və işlətməzdən əvvəl narrowing edin (Hissə 2, 3).
- **`readonly`-ni dərinlik zənn etmək.** `readonly` yalnız birbaşa yenidən-təyinatı bloklayır, daxili obyektin sahələrini yox (Hissə 5).
- **Interface-i və intersection-u qarışdırmaq.** Ziddiyyətli sahələr `interface extends`-də dərhal xəta verir, `&` intersection-da isə səssizcə `never`-ə düşə bilər (Hissə 5).
- **Generic constraint-i unutmaq.** `function f<T>(x: T) { x.length }` kimi yazıb `T`-nin `.length`-ə malik olduğunu güman etmək — constraint (`T extends { length: number }`) əlavə etmədən kompilyasiya olunmur (Hissə 6).
- **`typeof`-u dəyər ifadəsi üzərində işlətmək.** `typeof f()` kimi funksiya çağırışı üzərində yox, yalnız identifikatorlar üzərində işləyir (Hissə 6).
- **Const enum-u ehtiyatsız istifadə etmək.** Kitabxana kodu yazırsınızsa, `const enum` versiya uyğunsuzluğu riski daşıyır (Hissə 10).
- **`strict: false` ilə başlamaq.** Layihəyə boş `tsconfig.json` ilə başlayıb `strict`-i sonraya saxlamaq — layihə böyüdükcə `strict`-i sonra aktivləşdirmək qat-qat çətinləşir (Hissə 11).
- **Type-only importları adi import kimi yazmaq.** Böyük layihələrdə `import type` yazmamaq lazımsız runtime asılılıqlarına səbəb ola bilər (Hissə 9).

## Kursun ümumi xülasəsi

Bu kurs boyu aşağıdakı yolu keçdik:

- **Hissə 1–2:** TypeScript nədir, necə quraşdırılır, əsas tiplər (`string`, `number`, `boolean`, `array`, `tuple`, `any`, `unknown`, `never`) və tip annotasiyası vs inference.
- **Hissə 3:** narrowing — `typeof`, `instanceof`, `in`, discriminated unions, control flow analysis.
- **Hissə 4:** funksiya tipləri, optional/default/rest parametrlər, overload-lar.
- **Hissə 5:** obyekt tipləri dərindən — optional/readonly sahələr, index signature-lar, genişləndirmə, intersection, generic obyekt tipləri, tuple-lar.
- **Hissə 6:** generic-lər, `keyof`, `typeof`, indexed access tipləri.
- **Hissə 7:** conditional types, `infer`, mapped types, template literal types.
- **Hissə 8:** siniflər — görünürlük, statik üzvlər, generic siniflər, `this` tipləri, abstract siniflər.
- **Hissə 9:** modullar — ES module sintaksisi, tip-only import/export, CommonJS uyğunluğu.
- **Hissə 10:** enum-lar, ən çox işlənən utility types, decorators, declaration merging.
- **Hissə 11:** `tsconfig.json` — `strict`, `target`, `module`, project references.
- **Hissə 12 (bu hissə):** hər şeyi birləşdirən kiçik layihə və tez-tez rast gəlinən səhvlər.

Bu, TypeScript-in rəsmi sənədlərinin (Handbook + Reference) demək olar bütün əsas mövzularını əhatə edir. Buradan sonrakı addım — real bir layihədə (kiçik API, React komponenti, CLI aləti) bu bacarıqları praktikaya keçirməkdir. Tip sistemi çətinləşəndə həmişə rəsmi sənədlərə qayıtmaq (aşağıdakı link) faydalıdır — bu kurs onun sadələşdirilmiş, izahlı yol xəritəsidir, əvəzedicisi deyil.

## Əlavə oxu

- Mənbə (bütün kurs): [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- Əvvəlki hissə: **Hissə 11 — Layihə Konfiqurasiyası (tsconfig)** (`typescript-docs-part11.md`)
- Plan və bütün hissələrin siyahısı: `typescript-docs.plan.md`
