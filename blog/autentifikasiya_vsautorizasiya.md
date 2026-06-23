# Proqram Təminatında Autentifikasiya: Tərtibatçıların Bilməli Olduğu Əsas Konseptlər

Müasir proqram təminatı sistemlərində istifadəçi təhlükəsizliyi ən vacib mövzulardan biridir. İstifadəçilərin kimliyinin düzgün yoxlanılması, resurslara giriş icazələrinin idarə edilməsi və məlumatların qorunması üçün autentifikasiya mexanizmləri əsas rol oynayır.

Bir çox tərtibatçı autentifikasiya, avtorizasiya, tokenlər və müxtəlif identifikasiya protokolları arasındakı fərqləri tam anlamadan sistemlər qurmağa çalışır. Bu isə təhlükəsizlik problemlərinə və gələcəkdə miqyaslanma çətinliklərinə səbəb ola bilər.

Bu məqalədə proqram təminatı tərtibatçılarının bilməli olduğu 7 əsas autentifikasiya konsepti izah olunur.

## 1. Autentifikasiya və Avtorizasiya: Əsas Fərq

Proqram sistemlərində ən çox qarışdırılan iki anlayış autentifikasiya və avtorizasiyadır.

**Autentifikasiya (Authentication)** istifadəçinin və ya sistemin kim olduğunu müəyyən etmək prosesidir. Başqa sözlə, sistem "Sən kimsən?" sualına cavab axtarır.

Məsələn:

* İstifadəçi email və şifrəsini daxil edir.
* Sistem bu məlumatları yoxlayır.
* İstifadəçinin həqiqətən həmin hesabın sahibi olub-olmadığını müəyyən edir.

**Avtorizasiya (Authorization)** isə autentifikasiyadan sonra baş verir və istifadəçinin hansı əməliyyatları edə biləcəyini müəyyən edir.

Məsələn:

* Admin istifadəçisi yeni istifadəçi yarada bilər.
* Adi istifadəçi isə yalnız öz profil məlumatlarını görə bilər.

Yəni sadə şəkildə:

**Authentication → Mən kiməm?**
**Authorization → Mən nə edə bilərəm?**

Tərtibatçılar çox vaxt OAuth 2.0 kimi avtorizasiya çərçivələrini autentifikasiya mexanizmi kimi qəbul edirlər. Halbuki bunlar fərqli anlayışlardır.

---

# 2. Basic və Digest Authentication

İlk dövrlərdə veb sistemlərdə istifadə olunan ən sadə autentifikasiya üsullarından biri Basic Authentication idi.

## Basic Authentication

Bu metodda istifadəçi adı və şifrə HTTP header vasitəsilə göndərilir.

Məlumatlar Base64 formatında kodlaşdırılır:

```
username:password → Base64
```

Lakin Base64 şifrələmə deyil, sadəcə kodlaşdırmadır. Buna görə məlumat asanlıqla geri çevrilə bilər.

Bu səbəbdən Basic Authentication yalnız HTTPS ilə birlikdə istifadə olunmalıdır.

## Digest Authentication

Digest Authentication Basic Authentication-dan daha təhlükəsiz yanaşmadır.

Burada istifadəçi məlumatları birbaşa göndərilmir, hash mexanizmindən istifadə olunur.

Lakin müasir sistemlərdə bu yanaşmalar artıq çox istifadə edilmir. Daha çevik və təhlükəsiz həllər, məsələn token əsaslı autentifikasiya sistemləri üstünlük təşkil edir.

---

# 3. API Keys: Sadə, Amma Məhdud Təhlükəsizlik Modeli

API Key mexanizmi əsasən xidmətlərarası əlaqələrdə istifadə olunur.

Bu yanaşmada hər bir müştəri üçün unikal açar yaradılır və API sorğuları ilə birlikdə göndərilir.

Məsələn:

```
Authorization: API_KEY_VALUE
```

Server hər sorğuda bu açarı yoxlayır və istifadəçiyə və ya tətbiqə giriş verir.

Üstünlükləri:

* İstifadəsi sadədir.
* Server tərəfində idarə etmək rahatdır.
* Servislərarası əlaqələr üçün uyğundur.

Çatışmazlıqları:

* Açar sızarsa, başqa şəxslər istifadə edə bilər.
* Çox vaxt istifadəçi səviyyəli icazə sistemi təmin etmir.
* Açarların rotasiyası düzgün idarə edilməlidir.

Bu səbəbdən API Key-lər əsasən public API-lər və daxili servislər üçün istifadə olunur.

---

# 4. Session-Based Authentication

Ənənəvi veb tətbiqlərində geniş istifadə olunan yanaşmalardan biri session əsaslı autentifikasiyadır.

İstifadəçi daxil olduqda:

1. Server istifadəçi məlumatlarını yoxlayır.
2. Serverdə yeni session yaradılır.
3. İstifadəçiyə session cookie göndərilir.

Sonrakı sorğularda istifadəçi cookie vasitəsilə tanınır.

Bu yanaşma **stateful** adlanır, çünki server istifadəçilərin aktiv sessiyalarını yadda saxlamalıdır.

Məsələn:

* Session məlumatları Redis-də saxlanıla bilər.
* SQL bazasında idarə edilə bilər.

Çatışmazlığı isə böyük sistemlərdə ortaya çıxır. Bir neçə serverdən ibarət sistemlərdə sessiyaların sinxron saxlanılması əlavə mürəkkəblik yaradır.

---

# 5. Token-Based Authentication və JWT

Müasir tətbiqlərdə ən çox istifadə edilən yanaşmalardan biri token əsaslı autentifikasiyadır.

Ən məşhur nümunələrdən biri JWT-dir (JSON Web Token).

JWT üç hissədən ibarətdir:

* Header
* Payload
* Signature

JWT-nin əsas üstünlüyü:

**Stateless olmasıdır.**

Yəni server hər sorğuda istifadəçi məlumatını bazadan axtarmaya bilər. Token özü müəyyən məlumatları daşıyır və imza vasitəsilə yoxlanılır.

Müasir sistemlərdə adətən iki token istifadə olunur:

## Access Token

Qısa müddətli token-dir.

Məsələn:

* 15 dəqiqəlik ömür

API sorğularında istifadə olunur.

## Refresh Token

Uzun müddətli token-dir və yeni access token almaq üçün istifadə edilir.

Təhlükəsizlik baxımından refresh token-lərin HTTP-only cookie-lərdə saxlanılması tövsiyə olunur. Bu, bəzi XSS risklərini azaltmağa kömək edir.

---

# 6. OAuth 2.0 və OpenID Connect

OAuth 2.0 çox istifadə olunan, lakin tez-tez səhv başa düşülən texnologiyalardan biridir.

Əslində OAuth 2.0 autentifikasiya deyil, **avtorizasiya çərçivəsidir**.

Məsələn:

Bir tətbiq istifadəçidən Google Drive fayllarına giriş icazəsi istəyirsə, OAuth 2.0 istifadə olunur.

Burada əsas məqsəd:

"İstifadəçinin şifrəsini vermədən başqa xidmətə giriş icazəsi verməkdir."

OpenID Connect isə OAuth 2.0 üzərində qurulan autentifikasiya qatıdır.

Məsələn:

"Sign in with Google"

istifadəçiyə həm giriş etməyə, həm də onun kimliyi haqqında məlumat almağa imkan verir.

OIDC əsasən ID Token təqdim edir.

---

# 7. Single Sign-On (SSO) və İdentifikasiya Protokolları

SSO istifadəçiyə bir dəfə daxil olduqdan sonra bir neçə sistemə giriş imkanı verir.

Məsələn:

İstifadəçi Google hesabına daxil olduqda:

* Gmail
* YouTube
* Google Drive

kimi xidmətlərə yenidən giriş etmədən istifadə edə bilir.

SSO sistemlərində əsas protokollar:

## SAML

XML əsaslı protokoldur.

Əsasən böyük korporativ sistemlərdə və enterprise mühitlərində istifadə olunur.

## OpenID Connect

Daha müasir yanaşmadır.

JSON əsaslıdır və mobil tətbiqlər, web tətbiqlər üçün geniş istifadə olunur.

---

# Nəticə

Autentifikasiya sadəcə istifadəçi adı və şifrənin yoxlanılması deyil. Müasir proqram sistemlərində təhlükəsiz və genişlənə bilən arxitektura qurmaq üçün autentifikasiya və avtorizasiya mexanizmlərini düzgün anlamaq vacibdir.

Tərtibatçı aşağıdakı anlayışları yaxşı bilməlidir:

* Authentication və Authorization fərqi
* Session əsaslı sistemlər
* JWT və token idarəsi
* OAuth 2.0 və OpenID Connect
* API Key istifadəsi
* SSO və identifikasiya protokolları

Bu konseptləri düzgün tətbiq etmək təhlükəsiz, miqyaslana bilən və müasir proqram təminatı sistemləri yaratmağa imkan verir.
