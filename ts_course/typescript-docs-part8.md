# TypeScript Kursu — Hissə 8: Siniflər (Classes)

12 hissəlik "Sıfırdan İrəli Səviyyəyə TypeScript" kursunun səkkizinci hissəsi (plan: `typescript-docs.plan.md`). Bu hissə TypeScript-in JavaScript sinif sintaksisinin üzərinə əlavə etdiyi tip xüsusiyyətlərini öyrədir: görünürlük modifikatorları (`public`/`private`/`protected`), `readonly`, statik üzvlər, abstract siniflər, generic siniflər və parameter properties.

## Ön şərtlər

- Hissə 5: obyekt tipləri, interface
- Hissə 6: generic-lər

## Mündəricat

1. [Sinif üzvləri: field-lər](#sinif-üzvləri-field-lər)
2. [Konstruktorlar](#konstruktorlar)
3. [Metodlar, getter/setter](#metodlar-gettersetter)
4. [Sinif irsiyyəti: implements və extends](#sinif-irsiyyəti-implements-və-extends)
5. [Görünürlük: public, protected, private](#görünürlük-public-protected-private)
6. [Statik üzvlər](#statik-üzvlər)
7. [Generic siniflər](#generic-siniflər)
8. [`this` tipləri və this-based type guard-lar](#this-tipləri-və-this-based-type-guard-lar)
9. [Parameter properties](#parameter-properties)
10. [Abstract siniflər](#abstract-siniflər)
11. [Praktika](#praktika)
12. [Xülasə](#xülasə)
13. [Əlavə oxu](#əlavə-oxu)

## Sinif üzvləri: field-lər

Field-lər sinifin üzərində açıq, yazıla bilən xüsusiyyət yaradır:

```typescript
class Point {
  x: number = 0;
  y: number = 0;
}

const pt = new Point();
pt.x = 10;
```

`--strictPropertyInitialization` aktivdirsə, field ya initializer-lə, ya da konstruktorda mütləq təyin olunmalıdır:

```typescript
class GoodGreeter {
  name: string;
  constructor() {
    this.name = "salam"; // konstruktorda təyin olunur — OK
  }
}
```

`readonly` field yalnız konstruktor daxilində dəyişdirilə bilər:

```typescript
class Greeter {
  readonly name: string = "dünya";
  constructor(otherName?: string) {
    if (otherName !== undefined) {
      this.name = otherName; // OK, hələ konstruktordayıq
    }
  }
  err() {
    this.name = "olmaz"; // Xəta
  }
}
```

## Konstruktorlar

Sinif konstruktoru adi funksiya kimi parametr tipləri, default dəyərlər, overload-lar dəstəkləyir:

```typescript
class Point2 {
  x: number;
  y: number;
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}
```

Derived (törəmə) sinifdə `this`-i işlətməzdən əvvəl **mütləq** `super()` çağırılmalıdır:

```typescript
class Base {
  k = 4;
}
class Derived extends Base {
  constructor() {
    super(); // bundan əvvəl this işlətmək olmaz
    console.log(this.k);
  }
}
```

## Metodlar, getter/setter

```typescript
class Point3 {
  x = 10;
  y = 10;
  scale(n: number): void {
    this.x *= n;
    this.y *= n;
  }
}
```

Getter/setter cütü elan edə bilərsiniz; TypeScript 4.3-dən etibarən getter və setter-in tipi fərqli ola bilər:

```typescript
class Thing {
  _size = 0;
  get size(): number {
    return this._size;
  }
  set size(value: string | number | boolean) {
    let num = Number(value);
    if (!Number.isFinite(num)) {
      this._size = 0;
      return;
    }
    this._size = num;
  }
}
```

## Sinif irsiyyəti: implements və extends

`implements` sinifin interfeys müqaviləsinə **compile-time-da** uyğun olduğunu yoxlayır (runtime effekti yoxdur):

```typescript
interface Pingable {
  ping(): void;
}

class Sonar implements Pingable {
  ping() {
    console.log("ping!");
  }
}

class Ball implements Pingable {
  pong() {
    console.log("pong!");
  } // Xəta — ping() implementasiya olunmayıb
}
```

`extends` klassik irsiyyətdir — bazadan metod/field miras alınır, override edilə bilər:

```typescript
class Animal {
  move() {
    console.log("hərəkət edir!");
  }
}

class Dog extends Animal {
  woof(times: number) {
    for (let i = 0; i < times; i++) console.log("hav!");
  }
}
```

Override edərkən törəmə metodun signature-u baza metodun müqaviləsinə uyğun olmalıdır — baza metodda optional parametr məcburi edilə bilməz.

## Görünürlük: public, protected, private

- **`public`** (default) — hər yerdən əlçatandır.
- **`protected`** — yalnız sinifin özündən və törəmələrindən əlçatandır:

```typescript
class Greeter2 {
  public greet() {
    console.log("Salam, " + this.getName());
  }
  protected getName() {
    return "dünya";
  }
}

class SpecialGreeter extends Greeter2 {
  public howdy() {
    console.log("Hey, " + this.getName()); // OK — törəmə daxilində
  }
}

const g = new SpecialGreeter();
g.getName(); // Xəta — kənardan protected-a giriş olmaz
```

- **`private`** — yalnız elan olunduğu sinifin daxilində (törəmələrdə də yox):

```typescript
class Base2 {
  private x = 0;
}
const b = new Base2();
console.log(b.x); // Xəta

class Derived2 extends Base2 {
  showX() {
    console.log(this.x); // Xəta — private törəməyə keçmir
  }
}
```

**Qeyd:** TypeScript-in `private`-ı yalnız compile-time yoxlamasıdır. Runtime-da tam gizlilik üçün JavaScript-in öz `#field` sintaksisini işlədin:

```typescript
class Dog2 {
  #barkAmount = 0;
  personality = "şən";
}
```

## Statik üzvlər

```typescript
class MyClass {
  static x = 0;
  static printX() {
    console.log(MyClass.x);
  }
}

console.log(MyClass.x);
MyClass.printX();
```

Statik üzvlər də görünürlük modifikatorlarını (`private static` və s.) dəstəkləyir və irs alına bilər.

## Generic siniflər

```typescript
class Box<Type> {
  contents: Type;
  constructor(value: Type) {
    this.contents = value;
  }
}

const b1 = new Box<string>("salam!");
```

**Vacib məhdudiyyət:** generic sinif yalnız **instance** tərəfində generic-dir — statik üzvlərdə sinifin tip parametrini işlətmək olmaz:

```typescript
class Box2<Type> {
  static defaultValue: Type; // Xəta
}
```

## `this` tipləri və this-based type guard-lar

Metod `this`-i qaytaranda, dönən tip həmişə **çağıran sinifin özüdür** (fluent API-lər üçün faydalıdır):

```typescript
class BoxBuilder {
  contents: string = "";
  set(value: string) {
    this.contents = value;
    return this; // tipi: this
  }
}

class ClearableBox extends BoxBuilder {
  clear() {
    this.contents = "";
  }
}

const a = new ClearableBox();
const bb = a.set("salam"); // bb-in tipi: ClearableBox, Box yox
```

`this is Type` sintaksisi ilə metodları özəl type guard kimi yazmaq olar:

```typescript
class Box3<T> {
  value?: T;
  hasValue(): this is { value: T } {
    return this.value !== undefined;
  }
}

const box = new Box3<string>();
box.value = "Gameboy";
if (box.hasValue()) {
  box.value; // tipi: string (artıq undefined deyil)
}
```

## Parameter properties

Konstruktor parametrlərini birbaşa sinif üzvünə çevirən qısayoldur — modifikator əlavə etsəniz TypeScript avtomatik həm field yaradır, həm mənimsədir:

```typescript
class Params {
  constructor(
    public readonly x: number,
    protected y: number,
    private z: number
  ) {
    // bədən boş qala bilər
  }
}

const par = new Params(1, 2, 3);
console.log(par.x); // OK
console.log(par.z); // Xəta — private
```

## Abstract siniflər

Abstract sinif birbaşa instansiya oluna bilməz — yalnız törəmə siniflər üçün baza kimi xidmət edir:

```typescript
abstract class Base3 {
  abstract getName(): string;
  printName() {
    console.log("Salam, " + this.getName());
  }
}

const b3 = new Base3(); // Xəta — abstract sinif instansiya oluna bilməz

class Derived3 extends Base3 {
  getName() {
    return "dünya";
  }
}

const d3 = new Derived3();
d3.printName(); // "Salam, dünya"
```

## Praktika

1. `Heyvan` abstract sinifi yaradın: abstract `səsÇıxar(): string` metodu ilə, adi `məlumatVer()` metodu ilə (bu metod `səsÇıxar`-ı çağırsın). `İt` sinifini ondan törədin.
2. `Hesab` sinifi yaradın: `private balans: number` field-i, `topla(məbləğ: number)` və `çıx(məbləğ: number)` metodları ilə. Balansı mənfi etməyə çalışsanız xəta atsın.
3. Parameter properties istifadə edərək `İşçi` sinifi yazın: `public ad: string`, `private maaş: number`.
4. Generic `Stack<T>` sinifi yazın: `push(item: T)`, `pop(): T | undefined`, `peek(): T | undefined` metodları ilə.

## Xülasə

- Field-lər `readonly` ola bilər — yalnız konstruktor daxilində dəyişdirilə bilər.
- `implements` compile-time müqavilə yoxlamasıdır, `extends` isə real irsiyyətdir; törəmə metod baza metodun signature müqaviləsinə əməl etməlidir.
- `public`/`protected`/`private` görünürlük yalnız compile-time-dadır — runtime gizlilik üçün `#field` sintaksisi lazımdır.
- Statik üzvlər sinifin özündə yaşayır, amma generic sinifin tip parametrini statik kontekstdə işlətmək olmaz.
- Metodda `this` qaytarmaq (fluent API) və `this is Type` (type guard) — `this` tipinin iki güclü istifadəsidir.
- Parameter properties konstruktor parametr → sinif field əlaqəsini bir sətirdə qurur.
- Abstract sinif/metod ümumi müqavilə təyin edir, amma özü instansiya oluna bilmir.

## Əlavə oxu

- Mənbə: [Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
- Əvvəlki hissə: **Hissə 7 — Şərti və Mapped Tiplər** (`typescript-docs-part7.md`)
- Növbəti hissə: **Hissə 9 — Modullar** (`typescript-docs-part9.md`)
