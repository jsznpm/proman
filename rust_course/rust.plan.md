# Rust Kursu — Plan

**Başlıq:** Sıfırdan Rust: Sistem Proqramlaşdırma Dili

**Təsvir:** Rəsmi rust-lang.org/learn səhifəsindəki mənbələrə (The Book, Rust By Example, Rustlings) əsaslanan, Azərbaycan dilində tam Rust kursu. Sıfırdan başlayır, ownership/borrowing kimi Rust-a məxsus konsepsiyalardan keçir, sonda kiçik CLI layihəsi ilə bitir.

**Mənbə:** https://www.rust-lang.org/learn/ (əsasən https://doc.rust-lang.org/book/ və https://doc.rust-lang.org/rust-by-example/)

## Hissələr

1. **rust-part1.md** — Giriş və Əsaslar
   - Rust nədir, niyə istifadə olunur, quraşdırma (rustup, cargo)
   - Hello World, `cargo new/build/run`
   - Dəyişənlər, mutability, shadowing
   - Əsas data tipləri (skalyar, tuple, array)
   - Funksiyalar, idarəetmə axını (if/else, loop/while/for)

2. **rust-part2.md** — Ownership, Borrowing, Lifetimes
   - Ownership qaydaları, stack vs heap
   - Move semantikası, clone
   - References və borrowing (& , &mut)
   - Slices (string slice, array slice)
   - Lifetimes-a giriş (niyə lazımdır, əsas annotasiya sintaksisi)

3. **rust-part3.md** — Struct, Enum, Pattern Matching
   - Struct tərifi, method-lar (`impl`)
   - Enum, `Option<T>`
   - `match` ifadəsi, `if let`
   - Kiçik nümunə: fiqurlar/vəziyyət modelləşdirmə

4. **rust-part4.md** — Kolleksiyalar və Xəta İdarəetməsi
   - `Vec`, `String`, `HashMap`
   - `Result<T, E>`, `panic!` vs `Result`
   - `?` operatoru, xətaların yayılması
   - Kiçik nümunə: mətn emalı proqramı

5. **rust-part5.md** — Generics, Traits, Modullar
   - Generic funksiyalar/struct-lar
   - Trait tərifi, trait bound-lar, `dyn Trait`
   - Modul sistemi (`mod`, `use`, `pub`)
   - Cargo layihə strukturu, crate-lər, external dependency əlavə etmə

6. **rust-part6.md** — Closures, Iterators, Testing, Concurrency
   - Closure sintaksisi, `Fn`/`FnMut`/`FnOnce`
   - Iterator trait, `map`/`filter`/`collect`
   - Unit test yazmaq (`#[test]`, `cargo test`)
   - Threads (`std::thread`), `Mutex`, `Arc`, mesaj ötürmə (`mpsc`)

7. **rust-part7.md** — Smart Pointer-lər, Unsafe, Mini Layihə
   - `Box`, `Rc`, `RefCell` əsasları
   - Unsafe Rust-a qısa baxış (nə vaxt lazımdır, əsas qaydalar)
   - Kiçik end-to-end CLI layihəsi (bütün öyrənilənləri birləşdirən)
   - Əlavə oxu: Rustlings, The Reference, Rustonomicon, Cargo Book

## Ardıcıllıq qeydi

Hər hissə əvvəlkilərin üzərində qurulur. Part 1 heç bir ön biliyi tələb etmir. Part 2 (ownership) bütün sonrakı hissələr üçün açardır. Terminologiya part-lar arasında saxlanılır; artıq izah edilmiş anlayışlara yenidən istinad edilir, təkrar izah edilmir.

## Status

- [x] rust-part1.md
- [x] rust-part2.md
- [x] rust-part3.md
- [x] rust-part4.md
- [x] rust-part5.md
- [x] rust-part6.md
- [x] rust-part7.md
