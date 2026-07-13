# Rust Kursu — Hissə 2: Ownership, Borrowing, Lifetimes

Bu, 7 hissəlik Rust kursunun ikinci hissəsidir. Əvvəlki hissədə
([rust-part1.md](rust-part1.md)) quraşdırma, dəyişənlər və əsas sintaksisi
öyrəndik. Bu hissə Rust-u digər dillərdən fərqləndirən **ən vacib**
konsepti — ownership sistemini — əhatə edir.

## Ön tələblər

- [rust-part1.md](rust-part1.md) — dəyişənlər, funksiyalar, əsas tiplər.

## Mündəricat

1. [Ownership problemi nədir](#ownership-problemi-nədir)
2. [Ownership qaydaları](#ownership-qaydaları)
3. [Move semantikası](#move-semantikası)
4. [Clone](#clone)
5. [Stack vs Heap — niyə fərqlidir](#stack-vs-heap--niyə-fərqlidir)
6. [References və Borrowing](#references-və-borrowing)
7. [Borrowing qaydaları](#borrowing-qaydaları)
8. [Slices](#slices)
9. [Lifetimes-a giriş](#lifetimes-a-giriş)
10. [Məşq](#məşq)
11. [Xülasə](#xülasə)
12. [Əlavə oxu](#əlavə-oxu)

## Ownership problemi nədir

Proqram dillərində yaddaş idarəçiliyinin 3 əsas yolu var:

1. **Manual (C/C++):** proqramçı özü `malloc`/`free` çağırır. Sürətli, amma
   səhvə açıqdır (memory leak, double-free, dangling pointer).
2. **Garbage Collector (Java, Python, JS, Go):** runtime izləyir, lazımsız
   yaddaşı avtomatik təmizləyir. Təhlükəsiz, amma performans xərci var
   (GC pauses) və nəzarət proqramçının əlindən çıxır.
3. **Ownership (Rust):** yaddaş idarəçiliyi qaydaları **compile zamanı**
   tətbiq olunur. Runtime xərci yoxdur (GC yoxdur), amma səhvlər production
   yerinə compile zamanı üzə çıxır.

Rust 3-cü yolu seçir. Bunun üçün compiler 3 sadə qayda tətbiq edir.

## Ownership qaydaları

1. Hər dəyərin (value) yalnız bir **sahibi** (owner) var.
2. Eyni anda yalnız bir sahib ola bilər.
3. Sahib scope-dan çıxdıqda (funksiya/blok bitdikdə), dəyər avtomatik
   təmizlənir (`drop` çağırılır).

```rust
fn main() {
    {
        let s = String::from("salam"); // s bu bloqun sahibidir
        println!("{s}");
    } // blok bitir -> s scope-dan çıxır -> Rust avtomatik `drop(s)` çağırır
    // burada s artıq mövcud deyil
}
```

Bu, C++-dakı RAII (Resource Acquisition Is Initialization) ilə eynidir,
sadəcə Rust-da bunu compiler **məcburi** edir.

## Move semantikası

Budur Rust-un ən çox təəccübləndirdiyi hissə. Aşağıdakı koda baxın:

```rust
fn main() {
    let s1 = String::from("salam");
    let s2 = s1;

    println!("{s1}"); // XƏTA: value borrowed here after move
}
```

Digər dillərdə (məsələn JS) `s2 = s1` sadəcə referansı kopyalayardı və hər
ikisi işləyərdi. Rust-da isə bu **move** adlanır: `s1`-in sahibliyi `s2`-yə
**köçürülür**, `s1` artıq etibarsızdır.

**Niyə belədir:** `String` heap üzərində məlumat saxlayır (mətn dinamik
ölçülüdür). Əgər həm `s1`, həm `s2` eyni heap yaddaşına işarə etsəydi və
hər ikisi scope-dan çıxarkən `drop` çağırılsaydı, **eyni yaddaş iki dəfə**
azad edilərdi ("double free" — C/C++-da klassik təhlükəsizlik bağı). Rust
bunu compile zamanı qadağan edərək tamamilə aradan qaldırır.

```rust
fn main() {
    let s1 = String::from("salam");
    let s2 = s1; // move: s1 artıq etibarsızdır

    // əgər s1-ə ehtiyacınız varsa, funksiyaya ötürüb geri alın,
    // ya da referans istifadə edin (aşağıda), ya da clone edin
}
```

**Diqqət:** move yalnız heap-də data saxlayan tiplərdə olur (`String`,
`Vec`, `Box` və s.). Skalyar tiplər (`i32`, `bool`, `char`, tam array-lər
skalyarlardansa) `Copy` trait-ini implement edir və **kopyalanır**, move
olunmur:

```rust
fn main() {
    let x = 5;
    let y = x; // kopyalanır, move deyil
    println!("{x} {y}"); // hər ikisi işləyir — heç bir xəta yoxdur
}
```

Fərq: `Copy` tiplər stack üzərindədir, sabit ölçüdür, kopyalamaq ucuzdur —
buna görə Rust onları avtomatik kopyalayır, move etmir.

## Clone

Əgər həqiqətən heap data-nın **dərin kopyasını** istəyirsinizsə,
`.clone()` çağırılır:

```rust
fn main() {
    let s1 = String::from("salam");
    let s2 = s1.clone(); // heap data fiziki olaraq kopyalanır

    println!("{s1} {s2}"); // hər ikisi işləyir
}
```

**Niyə diqqətli olmalı:** `.clone()` performans baxımından bahalı ola
bilər (böyük data üçün tam kopyalama deməkdir). Rust community-də
qayda: "əgər clone lazımdırsa, çox güman ki, borrowing (aşağıda) daha
yaxşı həlldir — clone son çarə olmalıdır."

## Stack vs Heap — niyə fərqlidir

- **Stack:** sabit ölçülü data, LIFO qaydası ilə saxlanılır, çox sürətli
  push/pop. `i32`, `bool`, `char`, tuple/array (əgər elementləri də sabit
  ölçülüdürsə) burada saxlanılır.
- **Heap:** dinamik ölçülü data (ölçüsü compile zamanı bilinmir və ya
  runtime-da dəyişə bilər) burada saxlanılır. `String`, `Vec<T>`, `Box<T>`
  bura aiddir. Heap-ə pointer stack-də saxlanılır.

Ownership qaydaları məhz **heap** data üçün əhəmiyyətlidir — çünki heap
data-nın nə vaxt təmizlənəcəyini kimin idarə etdiyi aydın olmalıdır.

## References və Borrowing

Hər dəfə funksiyaya dəyər ötürəndə move olmasın deyə, **reference** (`&`)
istifadə edilir — bu "borrowing" (borc almaq) adlanır:

```rust
fn main() {
    let s1 = String::from("salam");
    let uzunluq = uzunluq_hesabla(&s1); // &s1 — borrow, move yox

    println!("'{s1}' sözünün uzunluğu {uzunluq}"); // s1 hələ də etibarlıdır!
}

fn uzunluq_hesabla(s: &String) -> usize {
    s.len()
} // s scope-dan çıxır, amma o sahib olmadığı üçün heç nə drop edilmir
```

`&s1` — `s1`-ə **reference** yaradır, sahibliyi köçürmür. Funksiya bitəndə
reference "borc" geri qaytarılır, `s1` öz sahibinin yanında qalır.

### Mutable reference

Dəyəri dəyişmək üçün `&mut` lazımdır:

```rust
fn main() {
    let mut s = String::from("salam");
    elave_et(&mut s);
    println!("{s}"); // "salam, dünya"
}

fn elave_et(s: &mut String) {
    s.push_str(", dünya");
}
```

## Borrowing qaydaları

Compiler bu qaydaları **compile zamanı** yoxlayır (buna "borrow checker"
deyilir):

1. Hər an ya **bir** mutable reference (`&mut T`), **ya da** istənilən
   sayda immutable reference (`&T`) ola bilər — **eyni anda ikisi yox**.
2. Reference-lər həmişə etibarlı (valid) olmalıdır — "dangling reference"
   (sahib artıq yox olan reference) qadağandır.

```rust
fn main() {
    let mut s = String::from("salam");

    let r1 = &s;
    let r2 = &s;
    println!("{r1} {r2}"); // OK — çoxlu immutable reference

    let r3 = &mut s; // XƏTA olardı əgər r1/r2 hələ istifadə olunurdusa
    println!("{r3}");
}
```

**Niyə bu qayda var:** bu, "data race"-lərin (paralel yaddaşa eyni anda
oxuma/yazma) compile zamanı **riyazi olaraq mümkünsüz** olmasını təmin
edir. Digər dillərdə bu bug-lar runtime-da, çox vaxt production-da,
təsadüfi şəkildə üzə çıxır.

**Dangling reference nümunəsi (Rust-un qarşısını aldığı):**

```rust
fn dangling() -> &String { // XƏTA: compile olunmayacaq
    let s = String::from("salam");
    &s
} // s burada drop edilir, amma referansı geri qaytarmağa çalışırıq!
```

Compiler bunu dərhal tutur: "missing lifetime specifier" / "cannot return
reference to local variable". C-də bu eyni kod compile olunar, amma
runtime-da undefined behavior yaradar.

## Slices

Slice — kolleksiyanın ardıcıl bir hissəsinə reference-dir, öz məlumatına
sahib deyil.

### String slice

```rust
fn main() {
    let s = String::from("salam dünya");

    let birinci_soz = ilk_soz(&s);
    println!("İlk söz: {birinci_soz}");
}

fn ilk_soz(s: &str) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    &s[..]
}
```

`&str` (string slice) — `String`-in bütün və ya bir hissəsinə reference.
String literal-lar (`"salam"`) əslində `&str` tipindədir. Buna görə
funksiya parametrlərində `&str` istifadə etmək `&String`-dən daha
elastikdir — həm `String`, həm literal qəbul edir.

### Array slice

```rust
fn main() {
    let masiv = [1, 2, 3, 4, 5];
    let hisse: &[i32] = &masiv[1..3]; // [2, 3]
    println!("{:?}", hisse);
}
```

## Lifetimes-a giriş

Lifetime — compiler-in reference-lərin **nə qədər müddət etibarlı**
olduğunu izləmə mexanizmidir. Əksər hallarda compiler bunu özü çıxarır
(lifetime elision), amma bəzən aydın annotasiya lazımdır — məsələn,
funksiya iki fərqli reference qəbul edib, onlardan birini qaytaranda:

```rust
fn en_uzun<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

fn main() {
    let s1 = String::from("uzun sətir");
    let s2 = String::from("qısa");
    println!("Ən uzunu: {}", en_uzun(s1.as_str(), s2.as_str()));
}
```

`'a` — generic lifetime parametridir (tipin özü deyil, generic parametr
kimi düşünün). Bu annotasiya belə deyir: "qaytarılan reference `x` və
`y`-dən **qısa olmayan** müddət ərzində etibarlı olacaq." Bu, compiler-ə
zəmanət verir ki, çağıran tərəf qaytarılan reference-i istifadə edərkən
mənbə data hələ mövcuddur.

**Praktiki qayda:** əvvəlcə lifetime annotasiyası yazmadan kodu yazın.
Compiler xəta versə (`missing lifetime specifier`), o zaman əlavə edin —
xəta mesajı adətən dəqiq harada lazım olduğunu göstərir. Bu mövzu
dərinləşir (struct-larda lifetime, `'static` və s.), amma bu giriş
səviyyəsi gündəlik Rust kodunun böyük hissəsi üçün kifayətdir.

## Məşq

**Tapşırıq:** sözlərdən ibarət mətndə ən uzun sözü tapan funksiya yazın —
ownership/borrowing qaydalarına əməl edərək.

```rust
fn en_uzun_soz(metin: &str) -> &str {
    let mut en_uzun = "";
    for soz in metin.split_whitespace() {
        if soz.len() > en_uzun.len() {
            en_uzun = soz;
        }
    }
    en_uzun
}

fn main() {
    let cumle = String::from("Rust yaddaş təhlükəsizliyini təmin edir");
    println!("Ən uzun söz: {}", en_uzun_soz(&cumle));
    // cumle hələ də istifadə edilə bilər — çünki yalnız borrow etdik
    println!("Orijinal cümlə: {cumle}");
}
```

Özünüz yoxlayın: niyə `en_uzun_soz` parametri `&str` alır, `String`
deyil? (Cavab: belə funksiya həm `String`-i, həm literal-ı qəbul edə
bilir — daha çevik API.)

## Xülasə

- Ownership: hər dəyərin bir sahibi var; scope bitəndə avtomatik `drop`.
- Heap data (`String`, `Vec`) mənimsənilmə zamanı **move** olunur, kopya
  yox; skalyar (`Copy`) tiplər avtomatik kopyalanır.
- `.clone()` dərin kopya yaradır — bahalı ola bilər, ehtiyatla istifadə
  edin.
- Reference (`&T`, `&mut T`) ownership-i köçürmədən "borc almaq" üsuludur.
- Borrow checker qaydası: bir anda ya çoxlu `&T`, ya tək `&mut T` — heç
  vaxt ikisi birgə.
- Slices (`&str`, `&[T]`) kolleksiyanın hissəsinə sahib olmadan reference
  verir.
- Lifetime annotasiyaları (`'a`) compiler-ə reference-lərin nə qədər
  etibarlı olduğunu bildirir; adətən compiler özü çıxarır.

## Əlavə oxu

- [The Book — Ch. 4: Understanding Ownership](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html)
- [Rust By Example — Scoping rules](https://doc.rust-lang.org/rust-by-example/scope.html)

**Əvvəlki hissə:** [rust-part1.md](rust-part1.md)
**Növbəti hissə:** [rust-part3.md](rust-part3.md) — Struct, Enum, Pattern
Matching.
