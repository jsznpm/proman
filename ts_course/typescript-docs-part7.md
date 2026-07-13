# TypeScript Kursu — Hissə 7: Şərti və Mapped Tiplər

12 hissəlik "Sıfırdan İrəli Səviyyəyə TypeScript" kursunun yeddinci hissəsi (plan: `typescript-docs.plan.md`). Hissə 6-da `keyof`/`typeof`/indexed access ilə tip sisteminin "sorğu" tərəfini gördük. Bu hissə tip sisteminin ən güclü, "proqramlaşdırma"-ya bənzəyən hissəsini öyrədir: **conditional types**, `infer`, **mapped types** və **template literal types**. Bunlar birlikdə generic-lərlə işlədikdə mürəkkəb tip transformasiyalarına imkan verir.

## Ön şərtlər

- Hissə 5: obyekt tipləri, union/intersection
- Hissə 6: generic-lər, `keyof`, `typeof`

## Mündəricat

1. [Conditional types nədir](#conditional-types-nədir)
2. [Constraint-lərlə conditional types](#constraint-lərlə-conditional-types)
3. [`infer` açar sözü](#infer-açar-sözü)
4. [Distributive conditional types](#distributive-conditional-types)
5. [Mapped types](#mapped-types)
6. [Mapping modifikatorları](#mapping-modifikatorları)
7. [`as` ilə açar yenidən adlandırma](#as-ilə-açar-yenidən-adlandırma)
8. [Template literal types](#template-literal-types)
9. [Praktika](#praktika)
10. [Xülasə](#xülasə)
11. [Əlavə oxu](#əlavə-oxu)

## Conditional types nədir

Conditional type JavaScript-in ternar operatoruna bənzəyir, amma runtime dəyərlər əvəzinə **tiplər üzərində** şərt qurur:

```typescript
SomeType extends OtherType ? TrueType : FalseType
```

```typescript
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}

type Example1 = Dog extends Animal ? number : string; // number
type Example2 = RegExp extends Animal ? number : string; // string
```

Bunlar tək başına maraqlı deyil, amma generic-lərlə birlikdə çox güclüdür:

```typescript
type Flatten<T> = T extends any[] ? T[number] : T;

type Str = Flatten<string[]>; // string
type Num = Flatten<number>;   // number (massiv deyil, olduğu kimi qalır)
```

## Constraint-lərlə conditional types

Conditional type-in içində tip parametrinin xüsusiyyətinə giriş etmək istəsəniz, constraint lazımdır:

```typescript
type MessageOf<T> = T["message"]; // Xəta — T-də "message" olduğu təminatı yoxdur
```

İki həll yolu var:

```typescript
// 1) Constraint əlavə etmək
type MessageOf1<T extends { message: unknown }> = T["message"];

interface Email {
  message: string;
}
type EmailMessageContents = MessageOf1<Email>; // string

// 2) Conditional məntiqlə yoxlamaq
type MessageOf2<T> = T extends { message: unknown } ? T["message"] : never;

interface Dog2 {
  bark(): void;
}
type DogMessageContents = MessageOf2<Dog2>; // never — "message" yoxdur
```

## `infer` açar sözü

`infer` conditional type daxilində **yeni tip dəyişəni elan edərək** onu avtomatik çıxarmağa (inference) imkan verir:

```typescript
// infer olmadan (əl ilə)
type Flatten1<Type> = Type extends Array<any> ? Type[number] : Type;

// infer ilə (avtomatik)
type Flatten2<Type> = Type extends Array<infer Item> ? Item : Type;
```

Ən çox işlədilən nümunə — funksiyanın qaytardığı tipi çıxarmaq:

```typescript
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;

type Num = GetReturnType<() => number>; // number
type Str = GetReturnType<(x: string) => string>; // string
```

**Qeyd:** overload-lu funksiyalarda inference **son (ən ümumi)** signature-a görə işləyir.

## Distributive conditional types

Conditional type-ə union tipi ötürüləndə, o **avtomatik olaraq union-un hər üzvünə ayrı-ayrı tətbiq olunur**:

```typescript
type ToArray<Type> = Type extends any ? Type[] : never;

type StrArrOrNumArr = ToArray<string | number>;
// string[] | number[]  (yəni ToArray<string> | ToArray<number>)
```

Bu davranışı dayandırmaq üçün hər iki tərəfi kvadrat mötərizəyə alın:

```typescript
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;

type ArrOfStrOrNum = ToArrayNonDist<string | number>;
// (string | number)[]  — bu dəfə union yox, tək massiv tipi
```

**Praktiki nümunə** — funksiya overload-larını conditional type ilə sadələşdirmək:

```typescript
interface IdLabel {
  id: number;
}
interface NameLabel {
  name: string;
}

type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;

function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "implementasiya olunmayıb";
}

let a = createLabel("typescript"); // NameLabel
let b = createLabel(2.8);          // IdLabel
```

## Mapped types

Mapped types index signature sintaksisinə əsaslanaraq, mövcud tipin **hər açarını iterasiya edib** yeni tip qurmağa imkan verir — təkrarçılıqdan qaçmaq üçün əvəzsizdir:

```typescript
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<Features>;
// { darkMode: boolean; newUserProfile: boolean }
```

## Mapping modifikatorları

`readonly` və `?` modifikatorlarını `+`/`-` prefiksi ilə əlavə etmək və ya silmək mümkündür (prefiks yazılmasa, default `+`-dır):

```typescript
// readonly-ni silmək
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
  readonly id: string;
  readonly name: string;
};
type UnlockedAccount = CreateMutable<LockedAccount>;
// { id: string; name: string }

// optional-ı (?) silmək
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

type MaybeUser = { id: string; name?: string; age?: number };
type User = Concrete<MaybeUser>;
// { id: string; name: string; age: number }
```

## `as` ilə açar yenidən adlandırma

TypeScript 4.1-dən etibarən, mapped type-da `as` bəndi ilə açarları **template literal type** vasitəsilə yenidən adlandıra bilərsiniz:

```typescript
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property];
};

interface Person {
  name: string;
  age: number;
}

type LazyPerson = Getters<Person>;
// { getName: () => string; getAge: () => number }
```

`Exclude` ilə açarları filtrləyib silmək də mümkündür:

```typescript
type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, "kind">]: Type[Property];
};

interface Circle {
  kind: "circle";
  radius: number;
}
type KindlessCircle = RemoveKindField<Circle>;
// { radius: number }
```

## Template literal types

Template literal types string literal tiplərin üzərinə qurulur və JavaScript-in template literal sintaksisini **tip səviyyəsində** işlədir:

```typescript
type World = "dünya";
type Greeting = `salam ${World}`; // "salam dünya"
```

Union daxil ediləndə, nəticə həmin union-un **hər kombinasiyasını** ehtiva edir (cross-multiplication):

```typescript
type Lang = "az" | "en";
type Id = "welcome" | "farewell";
type Message = `${Lang}_${Id}`;
// "az_welcome" | "az_farewell" | "en_welcome" | "en_farewell"
```

Bu, tip-təhlükəsiz event sistemləri qurmaq üçün əladır:

```typescript
type PropEventSource<Type> = {
  on<Key extends string & keyof Type>(
    eventName: `${Key}Changed`,
    callback: (newValue: Type[Key]) => void
  ): void;
};

declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;

const person = makeWatchedObject({ firstName: "Aygün", age: 26 });

person.on("firstNameChanged", (newName) => {
  // newName: string
  console.log(newName.toUpperCase());
});

person.on("ageChanged", (newAge) => {
  // newAge: number
  if (newAge < 0) console.warn("mənfi yaş!");
});
```

TypeScript daxili string manipulyasiya tipləri də verir: `Uppercase<S>`, `Lowercase<S>`, `Capitalize<S>`, `Uncapitalize<S>`.

## Praktika

1. `NonFunctionKeys<T>` adlı mapped/conditional tip yazın — obyektin yalnız funksiya **olmayan** açarlarını qaytarsın (ipucu: `as`-la filtrləyin, dəyəri `Function`-a `extends` yoxlayın).
2. `Flatten<T>` tipini yenidən yazın, amma `infer` istifadə edərək massivin element tipini çıxarın, massiv deyilsə `T`-nin özünü qaytarsın.
3. `ReadonlyDeep`-ə bənzər sadə `MyReadonly<T>` mapped type yazın: bütün açarları `readonly` edir (yalnız birinci səviyyədə, dərin rekursiya lazım deyil).
4. ``${string}Error`` template literal type-ı ilə `"NetworkError"`, `"TimeoutError"` kimi dəyərləri qəbul edən, amma `"Timeout"`-u rədd edən tip yazın.

## Xülasə

- Conditional types (`T extends U ? X : Y`) tip səviyyəsində şərt qurur; generic-lərlə birləşdirilməsə çox faydası olmur.
- `infer` conditional type daxilində yeni tip dəyişəni çıxarmağa imkan verir — funksiyanın return/parametr tipini almaq üçün klassik istifadə sahəsidir.
- Union tipi conditional type-a ötürüləndə **distributive** davranış baş verir; `[T] extends [U]` sintaksisi bunu dayandırır.
- Mapped types (`[P in keyof T]: ...`) mövcud tipin bütün açarları üzərində iterasiya edərək yeni tip qurur; `+`/`-readonly` və `+`/`-?` modifikatorları əlavə edilə/silinə bilər.
- `as` bəndi mapped type-da açarları yenidən adlandırmaq və ya filtrləmək üçündür.
- Template literal types string birləşməsini tip səviyyəsinə daşıyır; union-larla işlədikdə bütün kombinasiyaları yaradır.

## Əlavə oxu

- Mənbə: [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html), [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html), [Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
- Əvvəlki hissə: **Hissə 6 — Generiklər və Tip Operatorları** (`typescript-docs-part6.md`)
- Növbəti hissə: **Hissə 8 — Siniflər (Classes)** (`typescript-docs-part8.md`)
