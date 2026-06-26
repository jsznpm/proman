# Domain Name (Domen Adı) Nədir?

## Giriş

**Domain name** (domen adı) — internetdə hər hansı bir veb serverin **insan tərəfindən oxuna bilən** ünvanıdır. Yəni `cybernet.az` və ya `developer.mozilla.org` kimi yazdığımız ünvanlar domen adıdır.

İnternetdə hər kompüter və server əslində **IP ünvanı** ilə tanınır (məsələn `192.0.2.172` və ya IPv6 üçün `2001:db8:8b73:0000:0000:8a2e:0370:1337`). Bu rəqəmləri yadda saxlamaq insan üçün çətindir, üstəlik IP ünvanı zamanla dəyişə bilər. Domen adı məhz bu problemi həll edir — çətin rəqəmlərin əvəzinə yadda qalan, mənalı bir ad işlədirik.

Sadə dillə: **domen adı IP ünvanının insan-dostu ləqəbidir (alias).** Brauzerə `mozilla.org` yazırsan, arxa planda **DNS** sistemi bunu IP ünvanına çevirir, sonra serverlə əlaqə qurulur.

## Əsas anlayışlar

| Termin | İzah |
|--------|------|
| **IP Address** | Kompüter/serverin əsl şəbəkə ünvanı (IPv4 və ya IPv6). Yadda saxlamaq çətin. |
| **Domain Name** | IP ünvanının insan-dostu adı (alias). |
| **TLD** | Top-Level Domain — ən sağdakı hissə (`.com`, `.org`, `.az`). |
| **SLD / Label** | TLD-dən əvvəlki ad hissəsi (`mozilla.org`-da "mozilla"). |
| **Subdomain** | Domen qarşısına əlavə olunan hissə (`developer.mozilla.org`-da "developer"). |
| **Registrar** | Domen qeydiyyatını satan/idarə edən şirkət. |
| **Registry** | TLD-ni idarə edən təşkilat (texniki məlumat bazası). |
| **WHOIS** | Domenin qeydiyyat məlumatlarını göstərən açıq baza. |
| **DNS** | Domen adını IP ünvanına çevirən sistem. |

## Ətraflı izah

### Domen adının strukturu

Domen adı **iyerarxik** quruluşa malikdir, nöqtələrlə ayrılır və **sağdan sola** oxunur:

```
developer.mozilla.org
│         │      │
│         │      └─ TLD (Top-Level Domain)
│         └─────── SLD / Label (mozilla)
└────────────────── Subdomain (developer)
```

### TLD (Top-Level Domain)

Ən sağdakı hissədir, xidmətin ümumi məqsədini bildirir. Növləri:

- **Generic TLD (gTLD)** — ciddi məhdudiyyət yoxdur:
  - `.com`, `.org`, `.net`
- **Country-code TLD (ccTLD)** — ölkə/dil üzrə:
  - `.az` (Azərbaycan), `.us`, `.fr`, `.se`
- **Restricted TLD** — məqsəd-spesifik, məhdud:
  - `.gov` — yalnız dövlət qurumları
  - `.edu` — yalnız təhsil müəssisələri

**Texniki qaydalar:**
- Maksimum uzunluq: 63 simvol (əksəriyyəti 2–3 simvol)
- ICANN tərəfindən idarə olunur.

### Label-lar (Komponentlər)

Nöqtələr arasındakı və ya TLD-dən əvvəlki hissələrdir.

**Qaydalar:**
- Böyük/kiçik hərfə həssas deyil (case-insensitive)
- Uzunluq: 1–63 simvol
- İcazəli simvollar: `A–Z` hərflər, `0–9` rəqəmlər, defis `-`
- Defis ilk və ya son simvol ola **bilməz**

**Düzgün nümunələr:** `a`, `97`, `hello-strange-person-16`

**SLD (Secondary Level Domain):** TLD-dən bilavasitə əvvəlki label. `mozilla.org`-da "mozilla" SLD-dir.

### Subdomain (Alt-domen)

Sahib olduğun domen üçün fərqli məzmunlu alt-domenlər yarada bilərsən:

- `developer.mozilla.org`
- `support.mozilla.org`
- `bugzilla.mozilla.org`

Hər biri ayrı veb saytı/xidməti göstərə bilər, amma hamısı eyni əsas domenə (`mozilla.org`) aiddir.

### DNS sorğusu necə işləyir?

Brauzerə domen adı yazanda:

1. **Brauzer lokal DNS cache yoxlayır**
   - Əgər kompüter bu domen üçün IP-ni artıq tanıyırsa, çevirmə dərhal baş verir.
2. **Cache-də yoxdursa, DNS serverə sorğu gedir**
   - DNS serverin işi: qeydiyyatdan keçmiş domen adını IP ünvanına uyğunlaşdırmaq.
3. **Brauzer IP ünvanını alır**
   - Həmin IP ilə veb serverə qoşulur.

> **Qeyd:** DNS dəyişiklikləri (məsələn yeni domen) bütün dünya DNS serverlərinə **tədricən yayılır (propagation)** — buna görə yeni domen bəzən bir neçə saat ərzində aktiv olur.

### Domen qeydiyyatı və sahiblik

**Vacib prinsip: domen adına həmişəlik SAHİB olmursan.** Sən onu müəyyən müddətə (1 və ya bir neçə il) **istifadə hüququ** üçün ödəyirsən. Müddət bitəndə yenilədə (renew) bilərsən — yeniləmədə sənin üstünlüyün var. Yeniləməsən, başqası ala bilər.

**Registrar** — domen satan şirkətdir. Funksiyaları:
- Domen adlarını qeydiyyata almaq
- **Registry** bazaları ilə texniki/inzibati məlumatı izləmək
- Səni domeninlə əlaqələndirmək
- WHOIS bazalarını saxlamaq

**Qeydiyyat addımları:**
1. Registrar saytına daxil ol
2. "Get a domain name" düyməsini tap
3. Formanı doldur (yazılışı yoxla — ödənişdən sonra dəyişməz!)
4. Ödəniş et
5. Bir neçə saat ərzində DNS serverlər məlumatını alır

## Kod nümunələri

### WHOIS ilə domen yoxlamaq

Domenin alınıb-alınmadığını terminaldan yoxlamaq olar:

```bash
whois mozilla.org
```

**Alınmış domen üçün nümunə cavab:**

```
Domain Name: MOZILLA.ORG
Creation Date: 1998-01-24T05:00:00Z
Registry Expiry Date: 2015-01-23T05:00:00Z
Sponsoring Registrar: MarkMonitor Inc.
Registrant Organization: Mozilla Foundation
Domain Status: clientTransferProhibited
```

**Boş (alına bilən) domen üçün:**

```bash
whois afunkydomainname.org
# Cavab: NOT FOUND
```

`NOT FOUND` — domen boşdur, qeydiyyatdan keçirə bilərsən.

### Domen → IP çevrilməsini görmək

`nslookup` və ya `dig` ilə DNS-in domeni hansı IP-yə çevirdiyini görmək olar:

```bash
nslookup mozilla.org
```

```bash
dig mozilla.org +short
```

Bu komandalar domenin arxasındakı əsl IP ünvanını qaytarır.

## Praktiki nümunə / İstifadə halı

Tutaq ki, şəxsi blog açmaq istəyirsən:

1. **Ad seç:** `menim-blogum.az`
2. **Registrar-da yoxla:** WHOIS ilə boş olduğunu təsdiqlə.
3. **Qeydiyyat et:** 1 illik ödəniş et.
4. **DNS qur:** domeni serverinin IP ünvanına yönəlt (A record).
5. **Subdomain əlavə et:** lazım olsa `blog.menim-blogum.az`, `shop.menim-blogum.az`.
6. **Gözlə:** DNS propagation tamamlanandan sonra (bir neçə saat) sayt ünvanla açılır.

İstifadəçi `menim-blogum.az` yazır → DNS bunu serverinin IP-sinə çevirir → server səhifəni qaytarır.

## Tez-tez verilən suallar

**S: Domen adı ilə URL eyni şeydir?**
C: Xeyr. Domen adı URL-in bir hissəsidir. `https://blog.example.com/page` URL-ində `example.com` — domen, `blog` — subdomain, `/page` — yoldur (path).

**S: Bir IP-yə bir neçə domen bağlana bilər?**
C: Bəli. Bir serverdə (bir IP) çoxlu sayt host edilə bilər (virtual hosting).

**S: Domeni "almaq" nə deməkdir?**
C: Əslində almırsan — müəyyən müddətə istifadə hüququ kirayələyirsən. Müddət bitəndə yeniləməsən, itirirsən.

**S: `.az` domeni necə alınır?**
C: `.az` Azərbaycanın ccTLD-sidir, müvafiq registrar vasitəsilə qeydiyyatdan keçirilir.

## Xülasə

- **Domen adı** — IP ünvanının insan-dostu adıdır.
- Quruluş sağdan sola: **Subdomain.SLD.TLD** (`developer.mozilla.org`).
- **TLD** növləri: generic (`.com`), country-code (`.az`), restricted (`.gov`, `.edu`).
- **DNS** domen adını IP-yə çevirir; dəyişikliklər tədricən yayılır (propagation).
- Domeni **sahib olmursan**, istifadə hüququnu müəyyən müddətə alırsan; **registrar** vasitəsilə qeydiyyatdan keçir.
- **WHOIS** ilə domenin boş/alınmış olduğunu yoxla.

## Əlavə mənbələr

- [MDN — What is a domain name?](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_domain_name)
- [Cloudflare — What is a domain name?](https://www.cloudflare.com/en-gb/learning/dns/glossary/what-is-a-domain-name/)
- [ICANN — List of Top-Level Domains](https://www.icann.org/en/contracted-parties/registry-operators/resources/list-of-top-level-domains)
