# React necə bugünkü React oldu? 0.14-dən React 19-a qədər inkişaf yolu

React haqqında danışanda çox vaxt Hooks, Virtual DOM və ya Server Components kimi anlayışlardan bəhs edirik. Amma bu xüsusiyyətlərin hamısı React-da əvvəldən mövcud olmayıb.

Əksinə, React illər ərzində tədricən inkişaf edib və hər böyük versiya proqramçıların işləmə tərzini dəyişən yeniliklər gətirib.

Bu yazıda React-ın əsas inkişaf mərhələlərinə nəzər salaq və hər versiyanın ekosistemə hansı töhfəni verdiyini anlayaq.

---

## React-ın ən böyük üstünlüyü: Sabitlik

JavaScript dünyasında framework-lərin tez-tez dəyişməsi adi haldır. Bəzən bir neçə il əvvəl öyrəndiyiniz texnologiya artıq köhnəlmiş olur.

React isə fərqli yol seçdi.

Yeni imkanlar əlavə etsə də, əsas proqramlaşdırma modeli uzun illərdir dəyişməyib. Bu da o deməkdir ki, bir neçə il əvvəl öyrəndiyiniz əsas React anlayışları bu gün də aktualdır.

---

## React 0.14 — Functional Components dövrünün başlanğıcı

React-ın ilk dövrlərində komponentlər əsasən Class Component kimi yazılırdı.

React 0.14 ilə birlikdə Functional Component anlayışı təqdim edildi.

O dövrdə bu sadəcə daha sadə komponent yazmaq üsulu kimi görünürdü. Heç kim düşünmürdü ki, gələcəkdə React tətbiqlərinin böyük əksəriyyəti məhz Functional Component-lər üzərində qurulacaq.

---

## React 15 — Daxili arxitekturanın yenilənməsi

React 15 istifadəçilərin gündəlik yazdığı kodu ciddi şəkildə dəyişdirmədi.

Əsas dəyişiklik kitabxananın daxilində baş verdi.

Komanda render mexanizmini yenidən quraraq performansı və sabitliyi artırdı. Bu versiya React-ın gələcək inkişafı üçün möhkəm təməl yaratdı.

---

## React 16 — React tarixinin dönüş nöqtəsi

Bir çox proqramçı üçün React 16 ən əhəmiyyətli buraxılışdır.

Bu versiya React-a iki böyük yenilik gətirdi.

### Hooks

Hooks state, lifecycle və digər React imkanlarını Class Component istifadə etmədən idarə etməyə imkan verdi.

Bunun nəticəsində:

* komponentlər daha qısa yazıldı;
* məntiqi təkrar istifadə etmək asanlaşdı;
* oxunaqlılıq artdı.

Bu gün yeni React layihələrinin demək olar ki, hamısı Functional Component və Hooks üzərində qurulur.

### Fiber

React 16 ilə təqdim olunan Fiber arxitekturası render prosesini tamamilə yenidən dizayn etdi.

Fiber React-a işləri planlaşdırmaq, render prosesini daha ağıllı idarə etmək və mürəkkəb UI-lərdə daha yüksək performans təmin etmək imkanı verdi.

Bu yenilik sonrakı Concurrent Rendering xüsusiyyətlərinin də əsasını təşkil etdi.

---

## React 17 — Böyük dəyişiklik olmadan böyük hazırlıq

React 17 yeni xüsusiyyətlərdən çox uyğunluğa fokuslandı.

Əsas məqsəd gələcək versiyalara keçidi asanlaşdırmaq idi.

Bu versiyada JSX transform mexanizmi yeniləndi və React ekosisteminin gələcək inkişafı üçün vacib infrastruktur dəyişiklikləri edildi.

---

## React 18 — Performans yeni səviyyəyə yüksəldi

React 18 performans və istifadəçi təcrübəsinə yönəlmiş böyük yeniliklər gətirdi.

Ən vacib imkanlardan bəziləri:

* Automatic Batching
* Concurrent Rendering
* Transitions
* Streaming Server-Side Rendering
* Server Components

Bu xüsusiyyətlər React tətbiqlərinin daha sürətli, daha responsiv və daha böyük miqyasda işləməsinə kömək etdi.

---

## React 19 — Daha az optimizasiya kodu, daha ağıllı React

React 19 proqramçının əl ilə yazdığı optimizasiya kodlarını azaltmağa çalışır.

Ən diqqətçəkən yeniliklər:

### React Compiler

Compiler komponentləri analiz edərək avtomatik optimizasiya edir.

Beləliklə, bir çox halda aşağıdakı vasitələrə ehtiyac azalır:

* useMemo
* useCallback
* memo

### Yeni Hooks

React 19 gündəlik problemləri həll etmək üçün yeni Hook-lar təqdim edir.

Məsələn:

* `use()` — məlumatların asinxron əldə olunmasını sadələşdirir.
* `useFormStatus()` — formanın vəziyyətini izləyir.
* `useFormState()` — form state-ni idarə etməyi asanlaşdırır.
* `useOptimistic()` — optimistik UI yaratmağa kömək edir.

### Daha sadə API

React bəzi köhnə API-ləri daha intuitiv hala gətirib.

Məsələn:

* `ref` artıq adi prop kimi ötürülə bilir.
* Context istifadəsi sadələşdirilib.
* Bəzi köhnə API-lər daha müasir alternativlərlə əvəz olunub.

---

## React niyə hələ də liderdir?

React-ın uğurunun əsas səbəbi yalnız yeni xüsusiyyətlər əlavə etməsi deyil.

Əsas səbəb odur ki:

* köhnə biliklər dəyərini itirmir;
* yeni imkanlar geriyə uyğunluq qorunaraq əlavə olunur;
* performans davamlı şəkildə yaxşılaşdırılır;
* proqramlaşdırma modeli isə sabit qalır.

Bu yanaşma React-ı uzunmüddətli layihələr üçün etibarlı seçimə çevirir.

---

## Nəticə

React-ın inkişaf tarixinə baxdıqda maraqlı bir tendensiya görünür.

İlk versiyalar komponent yazmağı sadələşdirdi.

Sonrakı versiyalar performansı artırdı.

Daha yeni versiyalar isə proqramçının yazdığı optimizasiya kodunu azaltmağa başladı.

Başqa sözlə, React hər yeni versiyada yalnız yeni xüsusiyyət əlavə etmir. O, proqramçının diqqətini platformanın daxili problemlərindən uzaqlaşdıraraq daha çox məhsul inkişaf etdirməyə yönəltməyə çalışır.

Və görünür ki, React-ın gələcək istiqaməti də məhz budur: **daha ağıllı compiler, daha az əl ilə optimizasiya və daha sadə proqramlaşdırma modeli.**
