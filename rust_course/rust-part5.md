# Rust Kursu — Hissə 5: Generics, Traits, Modullar

7 hissəlik Rust kursunun beşinci hissəsi. Əvvəlki hissədə
([rust-part4.md](rust-part4.md)) kolleksiyalar və xəta idarəetməsi
öyrənildi. Bu hissə kodun təkrar istifadəsini (generics), davranış
kontraktlarını (traits) və layihə strukturunu (modullar, cargo crate-lər)
əhatə edir.

## Ön tələblər

- [rust-part3.md](rust-part3.md) — struct, enum, `#[derive(Debug)]`
  (attribute sintaksisi tanış olmalıdır).
- [rust-part4.md](rust-part4.md) — `Result<T, E>`, `Option<T>` (generic
  tiplərin real nümunələri kimi).

## Mündəricat

1. [Generic funksiyalar](#generic-funksiyalar)
2. [Generic struct-lar](#generic-struct-lar)
3. [Trait tərifi](#trait-tərifi)
4. [Trait bound-lar](#trait-bound-lar)
5. [dyn Trait — dinamik dispatch](#dyn-trait--dinamik-dispatch)
6. [Modul sistemi](#modul-sistemi)
7. [Cargo layihə strukturu və asılılıqlar](#cargo-layihə-strukturu-və-asılılıqlar)
8. [Məşq](#məşq)
9. [Xülasə](#xülasə)
10. [Əlavə oxu](#əlavə-oxu)

## Generic funksiyalar

Artıq `Option<T>`, `Result<T, E>`, `Vec<T>` görmüsünüz — bunların hamısı
**generic**dir: `T` "hər hansı bir tip" mənasını verir. Öz generic
funksiyalarınızı da yaza bilərsiniz:

```rust
fn ən_böyük<T: PartialOrd>(siyahı: &[T]) -> &T {
    let mut böyük = &siyahı[0];
    for element in siyahı {
        if element > böyük {
            böyük = element;
        }
    }
    böyük
}

fn main() {
    let reqemler = vec![34, 50, 25, 100, 65];
    println!("Ən böyük ədəd: {}", ən_böyük(&reqemler));

    let sözlər = vec!["alma", "banan", "zeytun"];
    println!("Ən böyük söz: {}", ən_böyük(&sözlər));
}
```

`<T: PartialOrd>` — bu **trait bound**dır: "`T` istənilən tip ola bilər,
amma o, `PartialOrd` (müqayisə edilə bilən) trait-ini implement etməlidir."
Bunsuz compiler `element > böyük` sətrində xəta verərdi, çünki ümumi
şəkildə hər tip müqayisə edilə bilməz.

**Niyə vacibdir:** generics kod təkrarının qarşısını alır — eyni
məntiqi `i32`, `f64`, `&str` üçün ayrıca yazmaq lazım deyil, **və** bunun
heç bir runtime performans xərci yoxdur (compiler generic kodu hər
konkret tip üçün ayrıca compile edir — buna "monomorphization" deyilir).

## Generic struct-lar

```rust
struct Nöqtə<T> {
    x: T,
    y: T,
}

impl<T> Nöqtə<T> {
    fn yeni(x: T, y: T) -> Nöqtə<T> {
        Nöqtə { x, y }
    }
}

impl Nöqtə<f64> {
    // yalnız f64 üçün əlavə method — konkret tip üçün spesifik implementasiya
    fn məsafə_sıfırdan(&self) -> f64 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}

fn main() {
    let tam_nöqtə = Nöqtə::yeni(5, 10);
    let float_nöqtə = Nöqtə::yeni(1.5, 2.5);

    println!("{} {}", tam_nöqtə.x, tam_nöqtə.y);
    println!("Məsafə: {}", float_nöqtə.məsafə_sıfırdan());
}
```

## Trait tərifi

Trait — Rust-un "interface" konseptidir: bir tipin hansı davranışları
(method-ları) təmin etməli olduğunu təsvir edir.

```rust
trait Xülasələ {
    fn xülasə(&self) -> String;

    // default implementasiya — implement edən tip override etməsə bu işləyir
    fn qısa_xülasə(&self) -> String {
        String::from("(daha çox oxu...)")
    }
}

struct Məqalə {
    başlıq: String,
    müəllif: String,
}

impl Xülasələ for Məqalə {
    fn xülasə(&self) -> String {
        format!("{}, müəllif: {}", self.başlıq, self.müəllif)
    }
    // qısa_xülasə override edilmir — default istifadə olunacaq
}

struct Tvit {
    istifadəçi: String,
    mətn: String,
}

impl Xülasələ for Tvit {
    fn xülasə(&self) -> String {
        format!("@{}: {}", self.istifadəçi, self.mətn)
    }
    fn qısa_xülasə(&self) -> String {
        format!("@{} tvit yazdı", self.istifadəçi)
    }
}

fn main() {
    let məqalə = Məqalə {
        başlıq: String::from("Rust-a giriş"),
        müəllif: String::from("Əli"),
    };
    println!("{}", məqalə.xülasə());
    println!("{}", məqalə.qısa_xülasə()); // default

    let tvit = Tvit {
        istifadəçi: String::from("rustlang"),
        mətn: String::from("1.0 buraxıldı!"),
    };
    println!("{}", tvit.qısa_xülasə()); // override edilmiş
}
```

**Analogiya:** trait TypeScript-dəki `interface`-ə, ya Java-dakı
`interface`-ə bənzəyir — amma Rust-da struct-lar **başqa kitabxananın**
trait-ini də öz tipinizə implement edə bilər (bu "orphan rule"
məhdudiyyəti ilə tənzimlənir: ya trait, ya tip sizin crate-inizdə
olmalıdır).

## Trait bound-lar

Funksiya parametrinin müəyyən trait-i implement etdiyini tələb etmək:

```rust
fn xülasəni_çap_et(element: &impl Xülasələ) {
    println!("Xəbər! {}", element.xülasə());
}

// eyni şey, daha aşkar generic sintaksislə:
fn xülasəni_çap_et2<T: Xülasələ>(element: &T) {
    println!("Xəbər! {}", element.xülasə());
}
```

Bir neçə trait tələb etmək `+` ilə:

```rust
fn çap_et<T: Xülasələ + std::fmt::Debug>(element: &T) {
    println!("{:?} -> {}", element, element.xülasə());
}
```

## dyn Trait — dinamik dispatch

Trait bound-lar (yuxarıda) **compile zamanı** həll olunur (statik
dispatch, sürətlidir). Bəzən isə fərqli tiplərin qarışığını **runtime**-da
saxlamaq lazım olur — burada `dyn Trait` (dinamik dispatch) işə düşür:

```rust
fn main() {
    let elementlər: Vec<Box<dyn Xülasələ>> = vec![
        Box::new(Məqalə {
            başlıq: String::from("Xəbər"),
            müəllif: String::from("Aygün"),
        }),
        Box::new(Tvit {
            istifadəçi: String::from("dev"),
            mətn: String::from("Rust əladır"),
        }),
    ];

    for el in &elementlər {
        println!("{}", el.xülasə());
    }
}
```

`Box<dyn Xülasələ>` — heap üzərində, "hər hansı `Xülasələ` implement edən
tip" saxlayır (fərqli struct-lar qarışıq şəkildə). `Box` Part 7-də ətraflı
izah olunacaq; hələlik "heap üzərində saxlanan pointer" kimi düşünə
bilərsiniz.

**Nə vaxt hansı:** tiplər compile zamanı bəllidirsə və performans
kritikdirsə — trait bound (`impl Trait` / generic `T`). Runtime-da fərqli
tiplərin siyahısı lazımdırsa (plugin sistemi, UI element-ləri və s.) —
`dyn Trait`.

## Modul sistemi

Rust kodu `mod` ilə məntiqi bloklara bölünür (görünürlük `pub` ilə idarə
olunur):

```rust
mod restoran {
    pub mod ön_ofis {
        pub fn qonaq_qarşıla() {
            println!("Xoş gəldiniz!");
        }
    }

    mod mətbəx { // pub olmadığı üçün yalnız restoran modulu daxilində görünür
        fn xörək_hazırla() {
            println!("Xörək hazırlanır...");
        }
    }
}

fn main() {
    restoran::ön_ofis::qonaq_qarşıla();
}
```

`use` ilə uzun yolları qısaltmaq:

```rust
use restoran::ön_ofis::qonaq_qarşıla;

fn main() {
    qonaq_qarşıla();
}
```

**Defolt olaraq hər şey private-dır** (yalnız öz modulu və alt-modulları
görə bilər). `pub` açar sözü kənardan görünməsinə icazə verir. Bu, JS-də
`export`-a bənzəyir, amma defolt istiqamət tərsdir (JS-də defolt private
deyil, aşkar `export` lazımdır — Rust-da isə defolt private, aşkar `pub`
lazımdır).

Praktikada böyük layihələrdə hər modul öz faylında olur:
`src/restoran.rs` və ya `src/restoran/mod.rs` — fayl adı modul adına
uyğun gəlir, `main.rs`-də isə `mod restoran;` ilə elan olunur.

## Cargo layihə strukturu və asılılıqlar

`Cargo.toml`-a asılılıq (dependency) əlavə etmək:

```toml
[dependencies]
rand = "0.8"
serde = { version = "1.0", features = ["derive"] }
```

Yaxud terminal-dan:

```bash
cargo add rand
```

Asılılıqlar [crates.io](https://crates.io) — Rust-un rəsmi paket
reyestrindən gəlir (npm-ə bənzəyir). `cargo build` avtomatik yükləyir və
`Cargo.lock` faylında dəqiq versiyaları kilidləyir (npm-in
`package-lock.json`-una bənzər).

**Crate** — Rust-un compile vahididir: ya **binary crate** (icra oluna
bilən proqram, `src/main.rs`-dən başlayır), ya **library crate**
(`src/lib.rs`-dən başlayır, başqa layihələr tərəfindən istifadə üçün).
Bir Rust "paketi" (`Cargo.toml` ilə təsvir olunan) hər ikisini eyni anda
saxlaya bilər.

## Məşq

Kiçik "forma" (shape) hesablama sistemi qurun — trait + generic + module
birləşdirərək:

```rust
mod formalar {
    pub trait Sahə {
        fn sahə(&self) -> f64;
    }

    pub struct Dairə {
        pub radius: f64,
    }

    impl Sahə for Dairə {
        fn sahə(&self) -> f64 {
            std::f64::consts::PI * self.radius * self.radius
        }
    }

    pub struct Kvadrat {
        pub tərəf: f64,
    }

    impl Sahə for Kvadrat {
        fn sahə(&self) -> f64 {
            self.tərəf * self.tərəf
        }
    }
}

use formalar::{Sahə, Dairə, Kvadrat};

fn ümumi_sahə(formalar: &[Box<dyn Sahə>]) -> f64 {
    formalar.iter().map(|f| f.sahə()).sum()
}

fn main() {
    let formalar: Vec<Box<dyn Sahə>> = vec![
        Box::new(Dairə { radius: 2.0 }),
        Box::new(Kvadrat { tərəf: 3.0 }),
    ];

    println!("Ümumi sahə: {:.2}", ümumi_sahə(&formalar));
}
```

Özünüz əlavə edin: `Üçbucaq` struct-ı yaradıb `Sahə` trait-ini implement
edin, siyahıya əlavə edin.

## Xülasə

- Generics (`<T>`) kod təkrarını runtime xərci olmadan aradan qaldırır
  (monomorphization sayəsində).
- Trait bound-lar (`T: TraitAdı`) generic tipin hansı davranışı təmin
  etməli olduğunu bildirir.
- Trait — Rust-un interface-i; default method-lar ola bilər.
- `impl Trait` / generic `T` → statik dispatch (sürətli); `dyn Trait` →
  dinamik dispatch (fərqli tiplərin runtime qarışığı üçün).
- Modullar (`mod`, `pub`, `use`) kodu təşkil edir; defolt hər şey
  private-dır.
- Cargo asılılıqları `Cargo.toml`-da elan olunur, crates.io-dan yüklənir,
  `Cargo.lock` versiyaları kilidləyir.

## Əlavə oxu

- [The Book — Ch. 10: Generic Types, Traits, and Lifetimes](https://doc.rust-lang.org/book/ch10-00-generics.html)
- [The Book — Ch. 7: Managing Growing Projects with Packages, Crates, and Modules](https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html)
- [Rust By Example — Generics](https://doc.rust-lang.org/rust-by-example/generics.html)
- [Rust By Example — Traits](https://doc.rust-lang.org/rust-by-example/trait.html)
- [crates.io](https://crates.io)

**Əvvəlki hissə:** [rust-part4.md](rust-part4.md)
**Növbəti hissə:** [rust-part6.md](rust-part6.md) — Closures, Iterators,
Testing, Concurrency.
