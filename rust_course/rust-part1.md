# Rust Kursu — Hissə 1: Giriş və Əsaslar

Bu kurs [rust-lang.org/learn](https://www.rust-lang.org/learn/) səhifəsində
tövsiyə olunan rəsmi mənbələrə (əsasən *The Rust Programming Language* kitabı
və *Rust By Example*) əsaslanır və sıfırdan başlayaraq Rust dilini praktiki
şəkildə öyrədir. Bu, 7 hissəlik kursun birinci hissəsidir.

Kim üçündür: proqramlaşdırmadan ümumi anlayışı olan, amma Rust ilə heç
işləməmiş hər kəs üçün.

## Ön tələblər

- Hər hansı bir proqramlaşdırma dilində (C, Python, JavaScript və s.) əsas
  təcrübə — dəyişən, funksiya, dövr nə olduğunu bilmək kifayətdir.
- Terminal/command line ilə əsas iş bacarığı.

## Mündəricat

1. [Rust nədir və niyə istifadə olunur](#rust-nədir-və-niyə-istifadə-olunur)
2. [Quraşdırma](#quraşdırma)
3. [İlk proqram: Hello World](#ilk-proqram-hello-world)
4. [Cargo ilə iş](#cargo-ilə-iş)
5. [Dəyişənlər və mutability](#dəyişənlər-və-mutability)
6. [Əsas data tipləri](#əsas-data-tipləri)
7. [Funksiyalar](#funksiyalar)
8. [İdarəetmə axını](#idarəetmə-axını)
9. [Məşq](#məşq)
10. [Xülasə](#xülasə)
11. [Əlavə oxu](#əlavə-oxu)

## Rust nədir və niyə istifadə olunur

Rust — sistem proqramlaşdırma dilidir. Onun əsas vədi budur: **C/C++ qədər
sürətli və aşağı-səviyyəli kontrol verir, amma yaddaş təhlükəsizliyini
compile zamanı (garbage collector olmadan) təmin edir.**

Bu, "ownership" adlanan unikal bir sistem sayəsində baş verir (Part 2-də
ətraflı izah olunacaq). Nəticədə:

- Null pointer exception yoxdur.
- Data race-lər (paralel yaddaş problemləri) compile zamanı tutulur.
- Runtime-da garbage collector-a ehtiyac yoxdur — performans C-yə yaxındır.

Rust harada istifadə olunur: əməliyyat sistemləri, brauzer mühərrikləri
(Firefox-un bir hissəsi Rust-dadır), CLI alətləri, WebAssembly, embedded
sistemlər, backend serverlər.

**Nəyə diqqət etməli:** Rust-un "öyrənmə əyrisi" digər dillərdən daha
diqlikdir, çünki compiler sizi adi dillərdə buraxılacaq səhvlərə görə
saxlayır. Bu, əvvəlcə maneə kimi görünsə də, əslində məhsuldarlıq
xüsusiyyətidir — səhvlər production-da deyil, compile zamanı üzə çıxır.

## Quraşdırma

Rust `rustup` adlı alət vasitəsilə quraşdırılır. `rustup` versiya idarəçisi
kimi işləyir (Rust-un stable/beta/nightly versiyalarını idarə edir) və
aşağıdakıları özü ilə gətirir:

- `rustc` — compiler
- `cargo` — paket meneceri və build sistemi
- `rustup` — versiya/toolchain idarəçisi

**Linux/macOS:**

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

**Windows:** [rustup-init.exe](https://win.rustup.rs) yükləyin və işə salın
(və ya `winget install Rustlang.Rustup`).

Quraşdırmadan sonra terminalı yenidən açın və yoxlayın:

```bash
rustc --version
cargo --version
```

> **Ümumi səhv:** Windows-da bəzən Visual Studio C++ build tools tələb
> olunur (linker üçün). Əgər `link.exe not found` kimi xəta alsanız,
> "Desktop development with C++" iş yükünü Visual Studio Installer-dən
> quraşdırın.

## İlk proqram: Hello World

Fayl yaradın: `main.rs`

```rust
fn main() {
    println!("Salam, Rust!");
}
```

Kompilyasiya və işə salma:

```bash
rustc main.rs
./main        # Windows-da: main.exe
```

İzah:
- `fn main()` — hər Rust proqramının giriş nöqtəsi.
- `println!` — bu **makro**dur (funksiya deyil), ona görə sonunda `!`
  işarəsi var. Makrolar Part 6-da izah olunacaq.
- Sətir `;` ilə bitir — bu, C/Java/JS-dən tanışdır.

Praktikada heç kim birbaşa `rustc` işlətmir — bunun əvəzinə `cargo`
istifadə olunur.

## Cargo ilə iş

Cargo Rust-un rəsmi build sistemi və paket meneceridir (npm+webpack-in
JS dünyasındakı analoqu kimi düşünün).

Yeni layihə yaratmaq:

```bash
cargo new salam_proqrami
cd salam_proqrami
```

Bu strukturu yaradır:

```
salam_proqrami/
├── Cargo.toml      # layihə metadata + asılılıqlar (npm-in package.json-u)
├── src/
│   └── main.rs     # giriş faylı, artıq "Hello, world!" kodu var
└── .gitignore
```

`Cargo.toml` belə görünür:

```toml
[package]
name = "salam_proqrami"
version = "0.1.0"
edition = "2024"

[dependencies]
```

Əsas komandalar:

```bash
cargo build        # kompilyasiya edir, target/debug/ qovluğuna qoyur
cargo run           # kompilyasiya edir və dərhal işə salır
cargo build --release  # optimallaşdırılmış build (production üçün)
cargo check         # yalnız compile-error yoxlayır, binary yaratmır (sürətli)
```

**Niyə vacibdir:** `cargo check` inkişaf zamanı ən çox istifadə etdiyiniz
komanda olacaq — o, tam binary yaratmadan yalnız kodun düzgünlüyünü
yoxlayır və `cargo build`-dən qat-qat sürətlidir.

## Dəyişənlər və mutability

Rust-da dəyişənlər **defolt olaraq immutable-dır** (dəyişməzdir):

```rust
fn main() {
    let x = 5;
    println!("x = {x}");
    x = 6; // XƏTA: cannot assign twice to immutable variable
}
```

Dəyişdirilə bilən etmək üçün `mut` açar sözü:

```rust
fn main() {
    let mut x = 5;
    x = 6; // OK
    println!("x = {x}");
}
```

**Niyə belədir:** Defolt immutability yan-təsirsiz (side-effect-free) kod
yazmağa təşviq edir və çoxsaylı thread-lərdə səhvlərin qarşısını alır —
əgər dəyər dəyişmirsə, onu paylaşmaq təhlükəsizdir.

### Shadowing

Rust eyni ad ilə yeni `let` bəyanatına icazə verir — bu "shadowing"
adlanır və `mut`-dan fərqlidir:

```rust
fn main() {
    let x = 5;
    let x = x + 1;   // yeni dəyişən, əvvəlkini "kölgələyir"
    let x = x * 2;
    println!("x = {x}"); // 12
}
```

Fərq: shadowing yeni dəyişən yaradır (hətta tip dəyişə bilər), `mut` isə
eyni dəyişənin dəyərini yerində dəyişir (tip dəyişə bilməz).

```rust
let spaces = "   ";
let spaces = spaces.len(); // String-dən number-ə keçid — shadowing ilə OK
```

## Əsas data tipləri

Rust **statically typed**-dir — hər dəyərin tipi compile zamanı bəllidir,
adətən compiler onu avtomatik çıxarır (type inference).

### Skalyar tiplər

| Kateqoriya | Nümunələr |
|---|---|
| Tam ədəd (integer) | `i8, i16, i32, i64, i128, isize` (işarəli); `u8...u128, usize` (işarəsiz) |
| Ondalık (float) | `f32, f64` |
| Bulean | `bool` (`true`/`false`) |
| Simvol | `char` (Unicode, 4 bayt, tək dırnaqla: `'a'`) |

```rust
fn main() {
    let tam: i32 = -42;
    let unsigned: u32 = 42;
    let pi: f64 = 3.14159;
    let aktivdir: bool = true;
    let herf: char = 'ə';

    println!("{tam} {unsigned} {pi} {aktivdir} {herf}");
}
```

**Ümumi səhv:** integer overflow. Debug build-də overflow proqramı
"panic" edir (dayandırır), release build-də isə "wrap around" edir (sükutla
səhv nəticə verir). Buna görə əməliyyatlardan əvvəl sərhədləri düşünmək
lazımdır.

### Tuple

Fərqli tipli dəyərləri bir yerə yığır, sabit ölçülüdür:

```rust
fn main() {
    let insan: (&str, i32, bool) = ("Aygün", 28, true);
    let (ad, yas, aktivdir) = insan; // destructuring
    println!("{ad} {yas} yaşındadır");
    println!("Birinci element: {}", insan.0); // index ilə də əlçatandır
}
```

### Array

Eyni tipli, sabit ölçülü kolleksiya (stack üzərində saxlanılır):

```rust
fn main() {
    let reqemler: [i32; 5] = [1, 2, 3, 4, 5];
    let sifirlar = [0; 3]; // [0, 0, 0]
    println!("İlk element: {}", reqemler[0]);
    println!("Uzunluq: {}", reqemler.len());
}
```

Array-lər ölçüsü dəyişməyən hallar üçündür (məsələn, ayın adları). Dinamik
ölçü lazımdırsa, `Vec` istifadə olunur (Part 4-də).

## Funksiyalar

```rust
fn main() {
    println!("5 + 3 = {}", topla(5, 3));
}

fn topla(a: i32, b: i32) -> i32 {
    a + b // NƏZƏR: ";" yoxdur — bu "expression", geri qaytarılan dəyərdir
}
```

Əsas qaydalar:
- Parametrlərin tipi **mütləq** göstərilməlidir (Rust bunu inference edə
  bilmir).
- Qaytarılan tip `->` ilə göstərilir.
- Funksiyanın son sətri `;` olmadan yazılarsa, o avtomatik `return`
  dəyəridir. `;` qoysanız, o "statement" olur və `()` (boş tuple, "unit
  type") qaytarılır.

```rust
fn beshUcun() -> i32 {
    5      // expression -> 5 qaytarılır
}

fn hecNe() {
    5;     // statement -> heç nə qaytarılmır ( () tipi)
}
```

Bu fərq Rust-da tez-tez qarışıqlıq yaradır — unutmayın: **son sətirdə `;`
olub-olmaması funksiyanın nəyi qaytardığını dəyişir.**

## İdarəetmə axını

### if/else — bu da expression-dur

```rust
fn main() {
    let reqem = 6;
    if reqem % 4 == 0 {
        println!("4-ə bölünür");
    } else if reqem % 3 == 0 {
        println!("3-ə bölünür");
    } else {
        println!("bölünmür");
    }

    // if bir expression olduğu üçün let ilə birbaşa istifadə edilə bilər:
    let veziyyet = if reqem > 5 { "böyük" } else { "kiçik" };
    println!("{veziyyet}");
}
```

**Diqqət:** hər budaqda (branch) eyni tip qaytarılmalıdır — Rust burada
JS-dəki kimi sərbəst deyil.

### Dövrlər: loop, while, for

`loop` — sonsuz dövr, `break` ilə dəyər qaytara bilər:

```rust
fn main() {
    let mut sayğac = 0;
    let netice = loop {
        sayğac += 1;
        if sayğac == 10 {
            break sayğac * 2; // loop-dan dəyər qaytarır
        }
    };
    println!("Nəticə: {netice}"); // 20
}
```

`while` — şərt doğru olduqca:

```rust
fn main() {
    let mut sayğac = 3;
    while sayğac != 0 {
        println!("{sayğac}!");
        sayğac -= 1;
    }
    println!("Start!");
}
```

`for` — kolleksiya üzərində iterasiya (ən çox istifadə olunan, ən
təhlükəsiz):

```rust
fn main() {
    let masiv = [10, 20, 30, 40, 50];

    for element in masiv {
        println!("dəyər: {element}");
    }

    for reqem in (1..4).rev() { // range, tərsinə
        println!("{reqem}!");
    }
}
```

**Niyə `for` üstünlük təşkil edir:** `while` ilə index istifadə edərkən
sərhəddən çıxma (out-of-bounds) riski var və Rust bunu runtime-da panic
ilə tutur, amma `for` bu riski ümumiyyətlə aradan qaldırır — compiler
səviyyəsində təhlükəsizdir.

## Məşq

Kiçik proqram yazın: **Fahrenheit ↔ Celsius çevirici.**

Tələblər:
1. Cargo layihəsi yaradın: `cargo new temp_converter`.
2. `celsius_to_fahrenheit(c: f64) -> f64` və
   `fahrenheit_to_celsius(f: f64) -> f64` funksiyaları yazın.
   (Düstur: `F = C * 9/5 + 32`)
3. `main`-də hər iki funksiyanı test edən bir neçə dəyər çap edin.
4. Bonus: `for` dövrü ilə 0-dan 100-ə qədər 10 addımla Celsius dəyərlərini
   Fahrenheit-ə çevirib cədvəl kimi çap edin.

Nümunə həll (özünüz yazmadan əvvəl baxmayın):

```rust
fn main() {
    for c in (0..=100).step_by(10) {
        let c = c as f64;
        println!("{c}°C = {}°F", celsius_to_fahrenheit(c));
    }
}

fn celsius_to_fahrenheit(c: f64) -> f64 {
    c * 9.0 / 5.0 + 32.0
}

fn fahrenheit_to_celsius(f: f64) -> f64 {
    (f - 32.0) * 5.0 / 9.0
}
```

## Xülasə

- Rust yaddaş təhlükəsizliyini GC olmadan, compile-vaxtı yoxlama ilə verir.
- `rustup` → toolchain, `cargo` → build/paket meneceri, `rustc` → compiler.
- Dəyişənlər defolt immutable-dır; `mut` ilə dəyişdirilə bilər;
  shadowing `mut`-dan fərqlidir.
- Skalyar tiplər (`i32`, `f64`, `bool`, `char`), tuple, array — sabit
  ölçülü strukturlar.
- Funksiyalarda son ifadə (`;` olmadan) qaytarılan dəyərdir.
- `if`/`loop` expression-dur, dəyər qaytara bilər; `for` təhlükəsiz
  iterasiya üçün üstünlük təşkil edir.

## Əlavə oxu

- Mənbə: [rust-lang.org/learn](https://www.rust-lang.org/learn/)
- [The Rust Programming Language (Book)](https://doc.rust-lang.org/book/)
- [Rust By Example](https://doc.rust-lang.org/rust-by-example/)
- [Rustlings (interaktiv məşqlər)](https://github.com/rust-lang/rustlings/)

**Növbəti hissə:** [rust-part2.md](rust-part2.md) — Ownership, Borrowing
və Lifetimes (Rust-un ən vacib, unikal konsepti).
