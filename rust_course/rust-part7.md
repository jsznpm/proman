# Rust Kursu — Hissə 7: Smart Pointer-lər, Unsafe, Mini Layihə

7 hissəlik Rust kursunun sonuncu hissəsi. Əvvəlki hissədə
([rust-part6.md](rust-part6.md)) closures, iterators, testing və
concurrency öyrənildi. Bu hissədə smart pointer-ləri, unsafe Rust-a qısa
baxışı öyrənəcək və bütün kursda öyrənilənləri birləşdirən kiçik bir CLI
layihəsi quracağıq.

## Ön tələblər

- Bütün əvvəlki hissələr, xüsusilə [rust-part2.md](rust-part2.md)
  (ownership), [rust-part4.md](rust-part4.md) (`Result`, `?`) və
  [rust-part5.md](rust-part5.md) (trait-lər).

## Mündəricat

1. [Box\<T\>](#boxt)
2. [Rc\<T\> — paylaşılan sahiblik](#rct--paylaşılan-sahiblik)
3. [RefCell\<T\> — interior mutability](#refcellt--interior-mutability)
4. [Rc + RefCell birgə](#rc--refcell-birgə)
5. [Unsafe Rust-a qısa baxış](#unsafe-rust-a-qısa-baxış)
6. [Mini layihə: tapşırıq siyahısı (Todo CLI)](#mini-layihə-tapşırıq-siyahısı-todo-cli)
7. [Kursun xülasəsi](#kursun-xülasəsi)
8. [Əlavə oxu və növbəti addımlar](#əlavə-oxu-və-növbəti-addımlar)

## Box\<T\>

`Box<T>` — ən sadə smart pointer: dəyəri **heap**-də saxlayır, stack-də
isə yalnız ona işarə edən pointer qalır.

İki əsas istifadə halı:

**1. Ölçüsü compile zamanı bilinməyən tiplər** (məsələn, özünə istinad
edən — recursive — struct-lar):

```rust
enum Siyahı {
    Element(i32, Box<Siyahı>),
    Boş,
}

use Siyahı::{Element, Boş};

fn main() {
    let siyahı = Element(1, Box::new(Element(2, Box::new(Element(3, Box::new(Boş))))));
    // Box olmadan bu compile olunmazdı: compiler `Siyahı`-nın ölçüsünü
    // hesablaya bilməzdi (özünə sonsuz istinad edərdi)
}
```

**2. Böyük data-nı stack yerinə heap-də saxlamaq** (kopyalamanı
ucuzlaşdırmaq üçün) və `dyn Trait` ilə (Part 5-də gördüyümüz kimi).

## Rc\<T\> — paylaşılan sahiblik

Xatırlayın: ownership qaydası deyir ki, hər dəyərin **bir** sahibi olur.
Amma bəzən eyni data-nı bir neçə yerdən "sahib kimi" istifadə etmək
lazımdır (məsələn, qraf strukturunda bir node-a bir neçə başqa node
istinad edir). Bunun üçün `Rc<T>` ("reference counted"):

```rust
use std::rc::Rc;

fn main() {
    let a = Rc::new(String::from("paylaşılan data"));
    println!("İlkin say: {}", Rc::strong_count(&a)); // 1

    let b = Rc::clone(&a); // heap data KOPYALANMIR, sadəcə say artır
    println!("b yaradıldıqdan sonra: {}", Rc::strong_count(&a)); // 2

    {
        let c = Rc::clone(&a);
        println!("c yaradıldıqdan sonra: {}", Rc::strong_count(&a)); // 3
    } // c scope-dan çıxır, say azalır

    println!("c scope-dan çıxdıqdan sonra: {}", Rc::strong_count(&a)); // 2
}
```

`Rc::clone` `.clone()`-dan fərqli olaraq **ucuzdur** — data-nı kopyalamır,
sadəcə "neçə sahib var" sayğacını artırır. Say sıfıra düşəndə (bütün
`Rc` nüsxələri scope-dan çıxanda) data faktiki `drop` edilir.

**Diqqət:** `Rc<T>` **tək thread-lidir** (thread-safe deyil). Thread-lər
arası paylaşılan sahiblik lazımdırsa, Part 6-da gördüyümüz `Arc<T>`
istifadə olunur (eyni məntiq, amma atomic sayğacla).

## RefCell\<T\> — interior mutability

Borrow checker qaydaları (Part 2) **compile zamanı** yoxlanılır. Bəzən isə
compiler-in çox "ehtiyatlı" olduğu, əslində təhlükəsiz olan hallar var —
`RefCell<T>` borrow qaydalarını **runtime**-da yoxlamağa icazə verir:

```rust
use std::cell::RefCell;

fn main() {
    let dəyər = RefCell::new(5);

    {
        let mut yazma_borc = dəyər.borrow_mut(); // runtime-da yoxlanılır
        *yazma_borc += 10;
    } // borc buraxılır

    println!("Yeni dəyər: {}", dəyər.borrow());
}
```

Fərq `Mutex`-dən: `RefCell` **tək thread daxilində**, immutable görünən
(`&self`) bir struct-un daxilində "gizli" mutasiyaya icazə vermək üçündür
(məsələn, mock/test obyektlərində sayğac saxlamaq). Qayda pozulsa
(eyni anda iki `borrow_mut()`), compile xətası yox, **runtime panic**
alırsınız — buna görə `RefCell`-i son çarə kimi, dəqiq lazım olanda
istifadə edin.

## Rc + RefCell birgə

Ən çox rast gəlinən kombinasiya: **paylaşılan VƏ dəyişdirilə bilən**
data lazım olanda:

```rust
use std::rc::Rc;
use std::cell::RefCell;

#[derive(Debug)]
struct Paylaşılanİstifadəçi {
    ad: String,
    bal: i32,
}

fn main() {
    let istifadəçi = Rc::new(RefCell::new(Paylaşılanİstifadəçi {
        ad: String::from("Elvin"),
        bal: 100,
    }));

    let referans1 = Rc::clone(&istifadəçi);
    let referans2 = Rc::clone(&istifadəçi);

    referans1.borrow_mut().bal += 50;
    referans2.borrow_mut().bal -= 20;

    println!("Son vəziyyət: {:?}", istifadəçi.borrow());
}
```

Bu naxış (`Rc<RefCell<T>>`) qraf/ağac strukturlarında, event listener
sistemlərində tez-tez rast gəlinir.

## Unsafe Rust-a qısa baxış

`unsafe` bloku compiler-in borrow checker-inin **bəzi** yoxlamalarını
söndürür (hamısını yox — tip yoxlaması, məsələn, hələ də işləyir). Bu,
compiler-in yoxlaya bilmədiyi, amma proqramçının özünün təhlükəsizliyinə
zəmanət verdiyi 5 əməliyyata icazə verir: raw pointer dereference,
unsafe funksiya çağırma, mutable static dəyişənə çatma, unsafe trait
implement etmə, union field-lərinə çatma.

```rust
fn main() {
    let mut say = 5;
    let r1 = &raw const say; // raw pointer yaratmaq safe-dir
    let r2 = &raw mut say;

    unsafe {
        // amma DEREFERENCE etmək unsafe-dir
        println!("r1: {}", *r1);
        *r2 = 10;
    }
    println!("say: {say}");
}
```

**Niyə mövcuddur:** bəzən aşağı-səviyyəli əməliyyatlar (əməliyyat sistemi
ilə birbaşa iş, başqa dildən — C-dən — funksiya çağırmaq — FFI, əl ilə
yaddaş optimizasiyası) borrow checker-in qaydaları ilə **ifadə edilə
bilmir**, halbuki məntiqi olaraq təhlükəsizdir. `unsafe` bu qapını açır,
**amma zəmanəti compiler-dən proqramçıya keçirir.**

**Ümumi qayda (rəsmi tövsiyə):** unsafe kodu minimum saxlayın, kiçik,
diqqətlə yoxlanmış funksiyalara toplayın və onların ətrafına **safe**
interface yazın ki, çağıran tərəf heç vaxt `unsafe` ilə birbaşa
işləməsin. Böyük Rust layihələrinin əksəriyyəti heç `unsafe` istifadə
etmir — bu, "son çarə" alətidir, gündəlik alət deyil.

## Mini layihə: tapşırıq siyahısı (Todo CLI)

Bu layihə kursda öyrənilən demək olar hər şeyi birləşdirir: struct, enum,
trait, `Vec`, `Result`/`?`, `match`, closures/iterators.

```rust
use std::io::{self, Write};

#[derive(Debug, Clone)]
struct Tapşırıq {
    id: u32,
    başlıq: String,
    tamamlanıb: bool,
}

struct TapşırıqSiyahısı {
    tapşırıqlar: Vec<Tapşırıq>,
    növbəti_id: u32,
}

impl TapşırıqSiyahısı {
    fn yeni() -> Self {
        TapşırıqSiyahısı {
            tapşırıqlar: Vec::new(),
            növbəti_id: 1,
        }
    }

    fn əlavə_et(&mut self, başlıq: String) -> u32 {
        let id = self.növbəti_id;
        self.tapşırıqlar.push(Tapşırıq {
            id,
            başlıq,
            tamamlanıb: false,
        });
        self.növbəti_id += 1;
        id
    }

    fn tamamla(&mut self, id: u32) -> Result<(), String> {
        match self.tapşırıqlar.iter_mut().find(|t| t.id == id) {
            Some(tapşırıq) => {
                tapşırıq.tamamlanıb = true;
                Ok(())
            }
            None => Err(format!("ID {id} tapılmadı")),
        }
    }

    fn sil(&mut self, id: u32) -> Result<(), String> {
        let əvvəlki_say = self.tapşırıqlar.len();
        self.tapşırıqlar.retain(|t| t.id != id);
        if self.tapşırıqlar.len() == əvvəlki_say {
            Err(format!("ID {id} tapılmadı"))
        } else {
            Ok(())
        }
    }

    fn tamamlanmamışları_göstər(&self) -> Vec<&Tapşırıq> {
        self.tapşırıqlar.iter().filter(|t| !t.tamamlanıb).collect()
    }

    fn statistika(&self) -> (usize, usize) {
        let tamamlanan = self.tapşırıqlar.iter().filter(|t| t.tamamlanıb).count();
        (tamamlanan, self.tapşırıqlar.len())
    }
}

fn oxu_sətir(mesaj: &str) -> String {
    print!("{mesaj}");
    io::stdout().flush().unwrap();
    let mut giriş = String::new();
    io::stdin().read_line(&mut giriş).unwrap();
    giriş.trim().to_string()
}

fn main() {
    let mut siyahı = TapşırıqSiyahısı::yeni();

    siyahı.əlavə_et(String::from("Rust kursu bitirmək"));
    siyahı.əlavə_et(String::from("Kiçik CLI layihə qurmaq"));
    let üçüncü_id = siyahı.əlavə_et(String::from("Rustlings ilə praktika etmək"));

    loop {
        let komanda = oxu_sətir(
            "\nKomanda seçin: [g]östər / [e]lavə et / [t]amamla / [s]il / [ç]ıx: ",
        );

        match komanda.as_str() {
            "g" => {
                let (tamamlanan, ümumi) = siyahı.statistika();
                println!("--- Tamamlanmamış tapşırıqlar ({tamamlanan}/{ümumi} bitib) ---");
                for tapşırıq in siyahı.tamamlanmamışları_göstər() {
                    println!("#{} {}", tapşırıq.id, tapşırıq.başlıq);
                }
            }
            "e" => {
                let başlıq = oxu_sətir("Yeni tapşırığın adı: ");
                let id = siyahı.əlavə_et(başlıq);
                println!("Əlavə edildi, ID: {id}");
            }
            "t" => {
                let id_mətn = oxu_sətir("Hansı ID tamamlansın: ");
                match id_mətn.parse::<u32>() {
                    Ok(id) => match siyahı.tamamla(id) {
                        Ok(()) => println!("Tamamlandı!"),
                        Err(xəta) => println!("Xəta: {xəta}"),
                    },
                    Err(_) => println!("Düzgün ədəd daxil edin"),
                }
            }
            "s" => {
                let id_mətn = oxu_sətir("Hansı ID silinsin: ");
                match id_mətn.parse::<u32>() {
                    Ok(id) => match siyahı.sil(id) {
                        Ok(()) => println!("Silindi!"),
                        Err(xəta) => println!("Xəta: {xəta}"),
                    },
                    Err(_) => println!("Düzgün ədəd daxil edin"),
                }
            }
            "ç" => {
                println!("Sağ olun! (istifadə edilməyən id: {üçüncü_id})");
                break;
            }
            _ => println!("Naməlum komanda, təkrar cəhd edin"),
        }
    }
}
```

Bunu işə salmaq üçün: `cargo new todo_cli`, kodu `src/main.rs`-ə yapışdırın,
`cargo run`.

**Özünüz genişləndirin (Part 5–6-dan istifadə edərək):**
1. `TapşırıqSiyahısı`-nı fayla saxlamaq/oxumaq (`std::fs`, `Result`/`?`
   zəncirini praktika etmək üçün əla fürsət).
2. Tapşırıqlara prioritet (enum: `Aşağı`, `Orta`, `Yüksək`) əlavə edin,
   `match` ilə sıralayın.
3. Test yazın (`#[cfg(test)]`) — `əlavə_et`, `tamamla`, `sil`
   funksiyalarının düzgün işlədiyini yoxlayan.

## Kursun xülasəsi

7 hissə boyu öyrənilənlər:

1. **Giriş** — quraşdırma, Cargo, dəyişənlər, əsas tiplər, idarəetmə axını.
2. **Ownership** — Rust-un GC-siz yaddaş təhlükəsizliyinin əsası: move,
   borrow, lifetime.
3. **Struct/Enum/Match** — öz tiplərinizi yaratmaq, `Option<T>`,
   exhaustive pattern matching.
4. **Kolleksiyalar/Xətalar** — `Vec`, `String`, `HashMap`, `Result<T, E>`,
   `?` operatoru.
5. **Generics/Traits/Modullar** — kod təkrarının aradan qaldırılması,
   interface-lər, layihə təşkili.
6. **Closures/Iterators/Test/Concurrency** — funksional-tərz kod,
   avtomatlaşdırılmış test, "fearless concurrency".
7. **Smart Pointer/Unsafe/Layihə** — `Box`, `Rc`, `RefCell`, unsafe-ə giriş,
   hər şeyi birləşdirən CLI layihə.

Bu, Rust-un böyük hissəsini əhatə edir, amma dil daha da dərinləşir:
async/await, makro yazmaq (`macro_rules!`), daha ətraflı unsafe/FFI,
advanced trait-lər (associated types, trait objects daha dərindən).
Bunlar bu kursun hüdudlarından kənardadır — aşağıdakı mənbələr davam
etmək üçün ən yaxşı yerlərdir.

## Əlavə oxu və növbəti addımlar

- **Praktika üçün:** [Rustlings](https://github.com/rust-lang/rustlings/)
  — kiçik, interaktiv məşqlər toplusu, terminal-da işləyir.
- **Dərinləşmək üçün:** [The Reference](https://doc.rust-lang.org/reference/index.html)
  — dilin tam formal spesifikasiyası.
- **Unsafe/advanced:** [The Rustonomicon](https://doc.rust-lang.org/nomicon/index.html)
  — unsafe Rust və aşağı-səviyyəli detalların dərin izahı.
- **Paket meneceri:** [The Cargo Book](https://doc.rust-lang.org/cargo/index.html)
  — Cargo-nun bütün imkanları (workspace-lər, profillər, publish etmə).
- **Praktiki nümunələr:** [Rust By Example](https://doc.rust-lang.org/rust-by-example/)
  — hər mövzu üçün əlavə qısa nümunələr.
- Əsl mənbə: [rust-lang.org/learn](https://www.rust-lang.org/learn/)

**Əvvəlki hissə:** [rust-part6.md](rust-part6.md)
**Kursun planı:** [rust.plan.md](rust.plan.md)
