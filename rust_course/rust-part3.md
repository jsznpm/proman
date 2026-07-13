# Rust Kursu — Hissə 3: Struct, Enum, Pattern Matching

7 hissəlik Rust kursunun üçüncü hissəsi. Əvvəlki hissədə
([rust-part2.md](rust-part2.md)) ownership, borrowing və lifetimes
öyrənildi. Bu hissədə öz data tiplərinizi necə yaratmağı və Rust-un güclü
`match` sistemini öyrənəcəksiniz.

## Ön tələblər

- [rust-part1.md](rust-part1.md), [rust-part2.md](rust-part2.md) —
  xüsusilə ownership/borrowing, çünki struct field-ləri ilə işləyərkən
  bunlar tez-tez qarşımıza çıxacaq.

## Mündəricat

1. [Struct tərifi](#struct-tərifi)
2. [Method-lar (impl)](#method-lar-impl)
3. [Enum](#enum)
4. [Option<T> — null-un Rust alternativi](#optiont--null-un-rust-alternativi)
5. [match ifadəsi](#match-ifadəsi)
6. [if let](#if-let)
7. [Məşq: vəziyyət maşını](#məşq-vəziyyət-maşını)
8. [Xülasə](#xülasə)
9. [Əlavə oxu](#əlavə-oxu)

## Struct tərifi

Struct — əlaqəli data-nı bir yerə cəmləyən özəl tipdir (digər dillərdəki
class/obyektin data hissəsinə bənzəyir, amma davranış ayrıca `impl`
blokunda yazılır).

```rust
struct İstifadəçi {
    ad: String,
    yas: u32,
    aktivdir: bool,
}

fn main() {
    let istifadeci1 = İstifadəçi {
        ad: String::from("Aygün"),
        yas: 28,
        aktivdir: true,
    };

    println!("{} - {} yaşında", istifadeci1.ad, istifadeci1.yas);
}
```

Field-i dəyişmək üçün bütün struct `mut` olmalıdır (Rust field-səviyyəsində
mutability-yə icazə vermir):

```rust
fn main() {
    let mut istifadeci1 = İstifadəçi {
        ad: String::from("Aygün"),
        yas: 28,
        aktivdir: true,
    };
    istifadeci1.yas = 29; // OK, çünki istifadeci1 mut-dur
}
```

### Tuple struct və Unit struct

```rust
struct Reng(i32, i32, i32); // adlandırılmış tuple

struct Isare; // heç bir data olmayan struct — marker kimi istifadə olunur

fn main() {
    let qara = Reng(0, 0, 0);
    println!("R: {}", qara.0);
}
```

### Debug çapı

Struct-u birbaşa `println!` ilə çap etmək üçün `Debug` trait-i lazımdır:

```rust
#[derive(Debug)]
struct İstifadəçi {
    ad: String,
    yas: u32,
}

fn main() {
    let i = İstifadəçi { ad: String::from("Kamran"), yas: 30 };
    println!("{:?}", i);   // İstifadəçi { ad: "Kamran", yas: 30 }
    println!("{:#?}", i);  // gözəl formatlanmış (pretty-print) versiya
}
```

`#[derive(Debug)]` — bu bir **attribute**dir, compiler-ə "bu struct üçün
Debug trait-ini avtomatik generasiya et" deyir. Trait-lər Part 5-də
ətraflı izah olunacaq.

## Method-lar (impl)

Struct-a bağlı funksiyalar `impl` blokunda yazılır:

```rust
#[derive(Debug)]
struct Düzbucaqlı {
    en: f64,
    hündürlük: f64,
}

impl Düzbucaqlı {
    // method — ilk parametr həmişə self-ə istinaddır
    fn sahe(&self) -> f64 {
        self.en * self.hündürlük
    }

    fn kvadratdır(&self) -> bool {
        self.en == self.hündürlük
    }

    // associated function ("statik metod") — self yoxdur, konstruktor kimi işlədilir
    fn kvadrat_yarat(oldu: f64) -> Düzbucaqlı {
        Düzbucaqlı { en: oldu, hündürlük: oldu }
    }
}

fn main() {
    let d = Düzbucaqlı { en: 10.0, hündürlük: 5.0 };
    println!("Sahə: {}", d.sahe());

    let kv = Düzbucaqlı::kvadrat_yarat(4.0); // :: ilə çağırılır, . ilə yox
    println!("Kvadratdır? {}", kv.kvadratdır());
}
```

`&self` — struct-u borrow edir (məlumatı oxumaq üçün kifayətdir).
Method dəyəri dəyişməlidirsə, `&mut self` yazılır; struct-un sahibliyini
tam alıb istehlak etmək lazımdırsa (nadir hallarda), sadəcə `self`.

## Enum

Enum — bir neçə mümkün **variant**dan yalnız birini təmsil edən tipdir.

```rust
enum İşıqRəngi {
    Qırmızı,
    Sarı,
    Yaşıl,
}

fn heraket(reng: İşıqRəngi) -> &'static str {
    match reng {
        İşıqRəngi::Qırmızı => "Dayan",
        İşıqRəngi::Sarı => "Hazırlaş",
        İşıqRəngi::Yaşıl => "Get",
    }
}

fn main() {
    println!("{}", heraket(İşıqRəngi::Yaşıl));
}
```

Rust enum-larının gücü: hər variant öz data-sını daşıya bilər (bu, digər
dillərdəki adi enum-lardan fərqlidir):

```rust
enum Mesaj {
    Çıxış,                       // data yoxdur
    Hərəkət { x: i32, y: i32 },   // struct kimi named field-lər
    Yaz(String),                 // tuple kimi
    Rəng(i32, i32, i32),         // 3 dəyər
}

fn isle(mesaj: Mesaj) {
    match mesaj {
        Mesaj::Çıxış => println!("Çıxılır"),
        Mesaj::Hərəkət { x, y } => println!("Hərəkət: {x}, {y}"),
        Mesaj::Yaz(metin) => println!("Mətn: {metin}"),
        Mesaj::Rəng(r, g, b) => println!("Rəng: {r} {g} {b}"),
    }
}
```

**Niyə vacibdir:** bu, C-dəki union-a bənzəyir, amma tip-təhlükəsizdir —
compiler hər variant üçün düzgün data formatını yoxlayır və `match`
istifadə edərkən **bütün variantların** işləndiyini məcbur edir (aşağıda
görəcəyik).

## Option\<T\> — null-un Rust alternativi

Rust-da `null` **yoxdur**. Əvəzinə standart kitabxananın `Option<T>` enum-u
istifadə olunur:

```rust
enum Option<T> {
    Some(T),
    None,
}
```

```rust
fn main() {
    let bezi_reqem: Option<i32> = Some(5);
    let hec_ne: Option<i32> = None;

    println!("{:?} {:?}", bezi_reqem, hec_ne);
}
```

**Niyə bu vacibdir:** digər dillərdə hər hansı dəyər gizli şəkildə `null`
ola bilər və bunu unutmaq runtime crash-ə səbəb olur ("The Billion Dollar
Mistake" — Tony Hoare-un öz sözləri ilə). Rust-da `i32` heç vaxt "yoxdur"
olmur — əgər dəyər ola bilər/olmaya bilərsə, bunu tip səviyyəsində
`Option<i32>` kimi göstərməlisiniz. Compiler sizi `Some`/`None`
hallarının **hər ikisini** yoxlamağa məcbur edir — unudulmuş null-check
mümkün deyil.

## match ifadəsi

`match` — Rust-un `switch`-dən qat-qat güclü versiyasıdır. Ən vacib
xüsusiyyəti: **exhaustive**dir — bütün mümkün halları əhatə etməlisiniz,
yoxsa compile xətası olur.

```rust
fn qiymetlendir(bal: Option<i32>) -> &'static str {
    match bal {
        Some(b) if b >= 90 => "Əla",   // match guard — şərt əlavə edilə bilər
        Some(b) if b >= 60 => "Kafi",
        Some(_) => "Zəif",              // _ — dəyəri istifadə etməyəcəyimizi bildirir
        None => "Qiymət yoxdur",
    }
}

fn main() {
    println!("{}", qiymetlendir(Some(95)));
    println!("{}", qiymetlendir(None));
}
```

`_` catch-all pattern-dir — "yuxarıdakılardan heç biri uyğun gəlmirsə"
mənasını verir. Onsuz compiler xəta verəcək ki, bütün hallar əhatə
olunmayıb (məsələn, `i32` üçün bütün ədədləri sadalamaq mümkün deyil).

## if let

Yalnız **bir** variantla maraqlanırsınızsa, tam `match` yazmaq yerinə
`if let` daha qısa yol verir:

```rust
fn main() {
    let konfiq_max: Option<u8> = Some(3);

    // uzun yol:
    match konfiq_max {
        Some(max) => println!("Maksimum: {max}"),
        _ => (),
    }

    // qısa yol — eyni məna:
    if let Some(max) = konfiq_max {
        println!("Maksimum: {max}");
    }
}
```

**Nə vaxt hansını seçmək:** bütün variantlarla nə isə etmək lazımdırsa
(hər hansı birini unutmaq təhlükəlidirsə) — `match`. Yalnız bir hal
maraqlıdırsa, qalanları önəmsizdirsə — `if let`.

## Məşq: vəziyyət maşını

Kiçik bir sifariş (order) vəziyyət maşını yazın:

```rust
#[derive(Debug)]
enum SifarişVəziyyəti {
    Yaradıldı,
    Ödənildi { məbləğ: f64 },
    Göndərildi { izləmə_kodu: String },
    LəğvEdildi { səbəb: String },
}

fn statusu_gostr(veziyyet: &SifarişVəziyyəti) -> String {
    match veziyyet {
        SifarişVəziyyəti::Yaradıldı => String::from("Sifariş yaradıldı"),
        SifarişVəziyyəti::Ödənildi { məbləğ } => {
            format!("Ödənildi: {məbləğ} AZN")
        }
        SifarişVəziyyəti::Göndərildi { izləmə_kodu } => {
            format!("Göndərildi, izləmə kodu: {izləmə_kodu}")
        }
        SifarişVəziyyəti::LəğvEdildi { səbəb } => {
            format!("Ləğv edildi: {səbəb}")
        }
    }
}

fn main() {
    let sifarişlər = vec![
        SifarişVəziyyəti::Yaradıldı,
        SifarişVəziyyəti::Ödənildi { məbləğ: 49.99 },
        SifarişVəziyyəti::Göndərildi { izləmə_kodu: String::from("AZ12345") },
        SifarişVəziyyəti::LəğvEdildi { səbəb: String::from("stokda yoxdur") },
    ];

    for s in &sifarişlər {
        println!("{}", statusu_gostr(s));
    }
}
```

(`vec!` makrosu və `Vec<T>` Part 4-də ətraflı izah olunacaq — burada
sadəcə bir neçə enum dəyərini saxlamaq üçün istifadə edilir.)

Özünüz əlavə edin: `SifarişVəziyyəti`-ə yeni bir variant (`Qaytarıldı {
səbəb: String }`) əlavə edin və compiler-in sizə `statusu_gostr`
funksiyasında bunu unutduğunuzu necə bildirdiyini müşahidə edin
(exhaustiveness yoxlaması iş başında).

## Xülasə

- `struct` əlaqəli data-nı qruplaşdırır; `impl` blokunda ona method-lar
  (`&self`) və associated function-lar (konstruktorlar) yazılır.
- `enum` bir neçə variantdan birini təmsil edir; hər variant öz data-sını
  daşıya bilər (struct-abənzər, tuple-abənzər, ya sadə).
- `Option<T>` Rust-da `null`-un yerini tutur — `Some(T)` / `None`;
  compiler hər iki halı yoxlamağa məcbur edir.
- `match` exhaustive-dir — bütün variantlar əhatə olunmalıdır (və ya `_`
  ilə qalanlar tutulmalıdır).
- `if let` — yalnız bir pattern maraqlandıqda `match`-in qısa forması.

## Əlavə oxu

- [The Book — Ch. 5: Structs](https://doc.rust-lang.org/book/ch05-00-structs.html)
- [The Book — Ch. 6: Enums and Pattern Matching](https://doc.rust-lang.org/book/ch06-00-enums.html)
- [Rust By Example — Custom Types](https://doc.rust-lang.org/rust-by-example/custom_types.html)

**Əvvəlki hissə:** [rust-part2.md](rust-part2.md)
**Növbəti hissə:** [rust-part4.md](rust-part4.md) — Kolleksiyalar və Xəta
İdarəetməsi.
