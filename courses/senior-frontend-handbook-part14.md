# Senior Frontend Handbook — Part 14: Biznes Düşüncəsi (Business Acumen)

> Bu, handbook-un son hissəsidir. Əvvəlki 13 hissə React internals-dan tutmuş
> texniki liderliyə qədər "necə" sualına cavab verdi. Bu hissə fərqli bir
> sualı cavablandırır: **"nə üçün"**. Bütün texniki dərinlik, əgər hansı
> problemi həll etdiyini bilmirsənsə, boş güc sərfiyyatına çevrilir.

Junior developer tapşırıq alır və onu icra edir. Mid-level developer tapşırığı
yaxşı icra edir — təmiz kod, testlər, edge-case-lər. Senior developer isə
tapşırığı almadan əvvəl bir sualı soruşur: **bu, həqiqətən düzgün tapşırıqdır?**

Bu hissənin mərkəzi nümunəsi budur: biznes deyir **"page 5 saniyəyə açılır,
sürətləndirin"**.

- Junior eşidir: "kodu optimizasiya edim" → useMemo əlavə edir, bir neçə
  şəkli sıxır, commit edir.
- Senior eşidir: "**niyə** 5 saniyə?" → diaqnostika zənciri qurur, kök
  səbəbi tapır, sonra onu düzəldir.

Fərq performansda deyil — fərq **kök səbəbi tapıb-tapmamaqdadır**. Junior-un
düzəlişi simptomu müvəqqəti yüngülləşdirə bilər, amma kök səbəb (məsələn,
database-də index yoxdur, ya da üçüncü tərəf skript main thread-i bloklayır)
qalır və bir ay sonra problem başqa səhifədə təkrar peyda olur.

---

## 1. Tapşırıq icra etməkdən problem həllinə keçid (mindset fərqi)

### 1.1 Başlıq və niyə vacibdir

Bu, senior/staff mövqeyə keçidin ən çox qiymətləndirilməyən hissəsidir.
Texniki müsahibələr alqoritm və sistem dizaynını yoxlayır, amma real işdə
sənin dəyərini müəyyən edən şey çox vaxt budur: **"sənə verilən tapşırığı
sual altına ala bilirsən, yoxsa hər tapşırığı olduğu kimi qəbul edirsən?"**
Bu bacarıq olmadan, nə qədər dərin React internals və ya browser internals
bilsən də, "sürətli və dəqiq icraçı" səviyyəsində qalırsan — təsirin
tavanı (impact ceiling) məhduddur, çünki qərar özün vermirsən, sadəcə
başqasının qərarını kodlaşdırırsan.

### 1.2 Konsepsiyalar — ilk prinsiplərdən

**Junior-un mental modeli:** `spec → kod → done`. Spec giriş nöqtəsidir,
sual altına alınmır, çünki "mənim işim kodlaşdırmaqdır, tələbi yazmaq başqasının
işidir" fərziyyəsi var.

**Senior-un mental modeli:** `outcome (nəticə) → constraint-lər → seçim
variantları → bunlardan biri kimi kod`. Spec giriş nöqtəsi deyil, **fərziyyədir**
— kiminsə (məhsul meneceri, dizayner, biznes tərəfi) müəyyən nəticəyə çatmaq
üçün təxmin etdiyi bir həll yoludur. Senior-un işi bu fərziyyəni yoxlamaqdır:
"bu spec, güdülən nəticəyə aparan **ən yaxşı** yoldur, yoxsa sadəcə **birinci**
düşünülən yoldur?"

Bu fərqin kökü təsir dairəsindədir (impact scope). Nə qədər "yuxarı axına"
(upstream) — tələb formalaşmadan, ticket yazılmadan əvvəlki müzakirəyə — qatıla
bilirsənsə, bir o qədər çox şəkilləndirmə gücün var. Ticket sənin növbənə
düşəndə, artıq onu formalaşdırmaq şansı keçmişdir; qalan tək şey icra
sürətidir. Bu, sırf status məsələsi deyil — bu, **hansı sualların hələ açıq
olduğu** məsələsidir. "Niyə bunu edirik?" sualı ticket yazılmadan əvvəl
soruşulmalıdır, sonra yox.

Bununla yanaşı, "ən yaxşı texniki həll" ilə "təşkilat üçün ən yaxşı həll"
eyni şey deyil. Senior-un qərarı komanda tutumu (team capacity), biznes
tələbləri və uzunmüddətli uyarlanma qabiliyyətini nəzərə alaraq trade-off
seçir — sadəcə texniki cəhətdən "ən təmiz" arxitekturanı seçmir.

### 1.3 Praktiki nümunə — addım-addım diaqnostika ssenarisi

**Ssenari:** Product manager deyir: "İstifadəçi profilində şəkil qalereyasını
üfüqi carousel-ə keçirək, çünki istifadəçilər skролl etmirlər."

Junior/mid-level cavabı: Carousel component-i tapır (ya yazır), qalereyanı
əvəz edir, PR açır, review-dan keçir, deploy edir. 2 sprint sərf olunur.

Senior-un addımları:

1. **Tələbi qəbul etmə, sualla.** "İstifadəçilər skролl etmirlər" — bu bir
   müşahidədir, yoxsa fərziyyədir? Hansı data buna əsaslanır?
2. **Metrikayə qayıt.** PM analytics-dən göstərir: qalereyanın 3-cü şəklindən
   sonra scroll-depth 40%-ə düşür. Bura qədər faktdır.
3. **Kök problemi ayır.** Sual: "istifadəçilər scroll etmək **istəmir**, yoxsa
   scroll etməyə **səbəb görmür**?" Bunlar fərqli problemlərdir və fərqli
   həllər tələb edir. Birincisi UX friction problemi (interaction cost),
   ikincisi content/motivation problemidir (niyə daha çox şəkilə baxsın?).
4. **Alternativ diaqnostika təklif et.** Session replay tool-dan (əgər varsa)
   5-10 real sessiya izlə: istifadəçi 3-cü şəkildə dayanır, çünki 4-cü şəkil
   yüklənməmiş görünür (lazy-load spinner sonsuza qədər fırlanır) — bu artıq
   performans problemidir, UX problemi deyil.
5. **"NO, BUT" cavabı formalaşdır.** Sadəcə "yox, carousel lazım deyil" demək
   texniki maneə yaradıcılığıdır və stakeholder-i uzaqlaşdırır. Əvəzinə:
   "Carousel-i indi qursaq, əsl problemi (lazy-load bug) maskalayacaq və
   analitika yenə də aşağı göstərəcək. Əvvəlcə lazy-load bug-ı düzəldək (1
   gün), sonra scroll-depth-ə yenidən baxaq — əgər problem qalarsa, carousel-i
   quraq." Bu, "yox" demədən, prioritetin sırasını dəyişdirir.
6. **Nəticə.** Bug düzəldilir, scroll-depth 40%-dən 78%-ə qalxır (fərz edək ki,
   ölçülüb). Carousel-ə heç ehtiyac olmur — 2 sprint qənaət edilir.

**Edge-case:** Bəzən tələb həqiqətən doğrudur və "niyə" sualının cavabı elə
"çünki icazə var, sadəcə et" olur — hər tapşırıq arxasında gizli bir problem
axtarmaq da tələdir (aşağıda 1.4-də).

### 1.4 Senior-level tələlər

- **Hər şeydə sual axtarmaq analiz-paralizinə aparır.** Kiçik, aşkar,
  risksiz tapşırıqları da sorğu-suala tutmaq komanda sürətini öldürür.
  Sual vermə enerjisini yüksək-qeyri-müəyyənlik/yüksək-təsir tapşırıqlarına
  saxla.
- **"Order-taker senior".** Title-da senior, davranışda icraçı — spec-i
  sorğulamadan qəbul edir, çünki sual vermək əlavə iş və ya konflikt riski
  kimi görünür. Bu, ən geniş yayılmış "gizli junior" formasıdır.
- **Səssiz etiraz.** Tələbin səhv olduğunu düşünüb, heç kimə demədən "necə
  olsa deyəcəklər" düşüncəsi ilə sadəcə icra etmək. Bu, nə texniki
  keyfiyyəti, nə də münasibəti qorumur.
- **Elegant həll, səhv problem.** Ən çox rast gəlinən tələ: gözəl, təmiz,
  yaxşı test edilmiş kod yazmaq — amma səhv problemi həll etmək. Kod review-u
  keçəcək, çünki kod keyfiyyəti yaxşıdır; biznes review-u keçməyəcək, çünki
  metrika dəyişmir.

### 1.5 Trade-off / dizayn sualları

1. Bir tapşırığı sual altına almaq nə vaxt "faydalı sorğulama", nə vaxt
   "gecikdirici mikroidarəetmə" olur? Sərhədi necə çəkərsən?
2. PM səni "texniki maneə yaradırsın" adlandırsa, amma sən əminsən ki, tələb
   kök problemi həll etməyəcək — nə edirsən? Nə vaxt geri çəkilirsən, nə
   vaxt israr edirsən?
3. Metrikaya çıxışın yoxdur (analytics qurulmayıb) — necə "niyə" sualını
   verə bilərsən, əgər cavablandırmaq üçün data yoxdursa?
4. Komandanda hamı "icraçı" mədəniyyətindədir (heç kim spec-i sorğulamır) —
   bu mədəniyyəti tək başına necə dəyişə bilərsən, iyerarxiyanı pozmadan?

### 1.6 Mock müsahibə sual-cavabları

**S: Sizə PM-dən "bu düyməni qırmızı et, çünki insanlar onu görmür" tapşırığı
gəlir. Nə edirsiniz?**
C: Əvvəlcə tələbin arxasındakı nəticəni öyrənirəm: "görmür" — kliklənmə
faizi aşağıdırmı, yoxsa subyektiv təəssüratdır? Əgər data varsa (məs. click
heatmap), rəng problem olmaya bilər — kontrast, mövqe, ətrafdaki
visual "noise" səbəb ola bilər. Rəngi dəyişdirməyi rədd etmirəm (aşağı
risk, sürətli), amma paralel olaraq "əgər rəng kömək etməsə, növbəti addım
nədir" sualını da qoyuram ki, bir dəyişiklik uğursuz olanda təkrar-təkrar
təxmin etmə dövrünə düşməyək.

**S: "Problem həll etmə" ilə "tapşırıq icra etmə" arasındaki fərqi konkret
bir metrika ilə necə ölçərsiniz?**
C: Tapşırıq icra etmə velocity/cycle time ilə ölçülür — nə qədər tez bitirdin.
Problem həll etmə isə **nəticə metrikası**nın (conversion, retention, error
rate, latency) dəyişməsi ilə ölçülür. Yaxşı sual budur: "PR-ın merge
olunması" ilə "problemin həll olunması" arasında sənin komandanda vaxt fərqi
varmı, yoxsa onlar sinonimdirmi? Əgər sinonimdirsə (yəni heç kim merge-dən
sonra metrikaya baxmır), komanda hələ "icraçı" fazasındadır.

**S: Sistem dizaynı: sizə "yükləmə vaxtını azaldın" tapşırığı verilib, amma
konkret hədəf yoxdur. Necə davam edirsiniz?**
C: Əvvəlcə hədəfi rəqəmsallaşdırıram — "azaltmaq" nisbi termindir, ROI
hesablamaq mümkün deyil. Stakeholder ilə birlikdə hədəf müəyyənləşdirirəm
(məs. LCP p75 üçün 2.5s-dən aşağı, çünki bu, Core Web Vitals "yaxşı"
threshold-udur). Sonra RUM data ilə hazırkı vəziyyəti ölçürəm, diaqnostika
zənciri qururam (bax Bölmə 2), və tapılan hər kök səbəbi biznes təsirinə görə
prioritetləşdirirəm (bax Bölmə 3).

### 1.7 Mənbələr

- Luciano Mammino, ["The Definition of Senior: A Look at the expectations
  for Software Engineers"](https://loige.co/the-senior-dev/) — "force
  multiplier", "NO, BUT" strategiyası, biznes anlayışının senior səviyyəsində
  rolu.
- ["5 ways tech leaders can increase their business acumen" —
  InfoWorld](https://www.infoworld.com/article/2335821/5-ways-tech-leaders-can-increase-their-business-acumen.html)

---

## 2. Diaqnostika zənciri: "niyə" sualı ilə kök səbəbə qədər aşağı enmək

### 2.1 Başlıq və niyə vacibdir

Bu, handbook-un mərkəzi nümunəsidir: **"page 5 saniyəyə açılır"**. Bu şikayət
performans mühəndisliyinin ən çox rast gəlinən formasıdır və senior-un burada
göstərdiyi fərq karyerasının qalan hissəsini müəyyən edir. Səbəb sadədir:
performans problemi demək olar həmişə **çoxqatlı** bir zəncirin nəticəsidir —
network, image, API, database, bundle, cache, CDN qatlarının hər biri vaxt
əlavə edə bilər. Simptomu düzəltmək (məs. bir spinner əlavə etmək ki, "hiss
olunmasın") kök səbəbi saxlayır və problem başqa yerdə təkrarlanır.

### 2.2 Konsepsiyalar — ilk prinsiplərdən

**Five Whys texnikası.** Toyota mühəndisi Taiichi Ohno tərəfindən Toyota
Production System çərçivəsində 1950-ci illərdə formalaşdırılmış texnika:
"niyə?" sualını təkrar-təkrar (adətən ~5 dəfə) soruşmaqla, hər cavabı növbəti
sualın obyektinə çevirərək, səthi simptomdan kök səbəbə enmək. Software
performansı üçün klassik nümunə: "Niyə yavaş idi?" → "Slow query-lər var idi."
→ "Niyə slow query var idi?" → "Index yox idi." → "Niyə index yox idi?" →
"Performans testinə daxil edilməmişdi." Zəncir davam edə bilər: "Niyə
performans testinə daxil edilməmişdi?" → prosesdə boşluq.

**LCP-nin komponentlərə ayrılması (diaqnostika üçün struktur).** Web
performansında "5 saniyə" tək bir rəqəm deyil — o, ardıcıl mərhələlərin
cəmidir. Google-un rəsmi metodologiyasına görə, Largest Contentful Paint
(LCP) dörd alt-hissəyə bölünür və hər biri fərqli kök səbəb ailəsinə işarə
edir:

| Alt-hissə | Tipik LCP payı | Kök səbəb ailəsi |
|---|---|---|
| **TTFB** (Time to First Byte) | ~40% | Server emalı, redirect-lər, coğrafi məsafə, cache yoxluğu |
| **Resource Load Delay** | <10% | Resurs HTML-də gec aşkarlanır, aşağı fetch priority, lazy-load, xarici origin |
| **Resource Load Duration** | ~40% | Böyük fayl ölçüsü, CDN-ə məsafə, şəbəkə yükü, cache header-lərin yoxluğu |
| **Element Render Delay** | <10% | Render-blocking CSS/JS, DOM-da element JS ilə yaradılır, main thread bloku |

Bu cədvəl vacibdir, çünki o, "harada axtarmalı" sualını sistemləşdirir — hər
alt-hissənin öz kök səbəb ailəsi var, deməli diaqnostikanı təsadüfi
təxminlərdən (image-ə şübhələnib sıxıştırmaq) struktura keçirir.

**Zəncirin uzunluğu.** Sualdaki "network → image → API → database → bundle →
cache → CDN" ardıcıllığı əslində bir axtarış ağacıdır, xətti zəncir deyil —
hər qat özündə paralel budaqlara ayrıla bilər (məs. "API" budağı həm
back-end kodunu, həm database sorğusunu, həm də üçüncü tərəf API-ni əhatə
edə bilər).

### 2.3 Praktiki nümunə — addım-addım diaqnostika

**Şikayət:** "Page 5 saniyəyə açılır." Stakeholder bunu bounce rate
artımından bilir.

**Addım 1 — Ölçmə, təxmin deyil.** Real User Monitoring (RUM) data-sına
baxılır (Chrome UX Report / öz analytics). Aşkarlanır: p75 LCP = 5.1s.
Sintetik test (Lighthouse/WebPageTest) ilə eyni ssenari yenidən yaradılır ki,
filmstrip/waterfall görünsün.

**Addım 2 — LCP-ni alt-hissələrə ayır.** Lighthouse/CrUX breakdown-u belə
görünür (illüstrativ format):

```text
LCP Breakdown (p75):
  TTFB:                  2100ms  (41%)
  Resource Load Delay:    350ms   (7%)
  Resource Load Duration: 2200ms  (43%)
  Element Render Delay:   450ms   (9%)
  ------------------------------------
  Total LCP:              5100ms
```

TTFB (2100ms) və Resource Load Duration (2200ms) ən böyük iki paydır — bura
diqqət yönəldilir, "image sıxıştırma" ilə başlanmır, çünki cədvələ görə o,
Resource Load Duration-un yalnız bir alt-səbəbidir, TTFB-yə heç aidiyyəti
yoxdur.

**Addım 3 — TTFB budağını aç ("niyə TTFB yüksəkdir?").**

```text
Niyə TTFB 2100ms? → Server response 1800ms çəkir, şəbəkə/DNS/TLS ~300ms.
Niyə server response 1800ms? → API endpoint /api/profile 1600ms cavab verir.
Niyə API 1600ms çəkir? → Database sorğusu 1400ms çəkir.
Niyə database sorğusu 1400ms? → `orders` cədvəlində `user_id` üzərində
  index yoxdur, full table scan işləyir.
Niyə index yoxdur? → Bu sorğu son feature-da əlavə olunub, performans
  review-u prosesi ötürülüb (staging-də cədvəl kiçik idi, problem
  görünmədi).
```

Kök səbəb tapıldı: **eksik database index**, simptomdan 5 səviyyə aşağıda.

**Addım 4 — Resource Load Duration budağını aç.** Waterfall-da görünür ki,
hero şəkli 1.8MB PNG formatındadır, origin server-dən (CDN-siz) yüklənir:

```text
GET /uploads/hero-banner.png
  Size: 1.8 MB
  Format: PNG (no compression)
  Server: origin (no CDN, no cache-control header)
  Time: 2200ms
```

Kök səbəb: format (PNG əvəzinə WebP/AVIF), ölçü (responsive srcset yoxdur),
və çatdırılma (CDN yoxdur, cache-control header yoxdur) — üç fərqli kök
səbəb, bir simptom.

**Addım 5 — Edge-case: problem network-də deyil, üçüncü tərəf skriptdədir.**
Fərz edək ki, TTFB və resource load düzəldildikdən sonra Element Render
Delay hələ də yüksəkdir (450ms-dən 900ms-ə qalxıb — gözlənilməz artım).
Waterfall yenidən yoxlanır: səbəb kod dəyişikliyi deyil, **A/B test
kitabxanası** (üçüncü tərəf) səhifə render olunmadan əvvəl `<head>`-də
sinxron yüklənir və DOM-u gizlədir, "flicker of unstyled content"-in
əksini etmək üçün. Bu, `web.dev`-in LCP render-delay səbəblərindən birinə
dəqiq uyğun gəlir ("A/B testing libraries that hide content until an
experiment is ready"). Renault-un öz case study-sində də bənzər tapıntı var:
onların "oversized Google Tag Manager container"-i ayrıca kök səbəb kimi
identifikasiya olunub — yəni performans şikayətinin kök səbəbi bəzən sənin
yazdığın kodda deyil, marketinq/analytics komandasının əlavə etdiyi
skriptdədir. Bu halda düzəliş kod review-u ilə deyil, **üçüncü tərəf skript
governance**-i (kim, hansı şərtlə skript əlavə edə bilər) ilə həll olunur.

**Addım 6 — Prioritetləşdirmə və nəticə.** Renault-un ictimai case
study-sinə görə, 1 saniyəlik LCP yaxşılaşması bounce rate-də 14 faiz-bənd
azalma və conversion-da 13% artımla nəticələnib (10 milyon ziyarət, 33
ölkə üzərində analiz edilib). Bu, "performans = biznes metrikası" əlaqəsinin
sənayedə sənədləşdirilmiş nümunələrindən biridir və Bölmə 3-də
prioritetləşdirmə üçün istifadə olunacaq.

### 2.4 Senior-level tələlər

- **Simptomu fix etmək, kök səbəbi tapmamaq.** Ən klassik tələ: TTFB
  yüksəkdirsə, "server-ə daha çox RAM/CPU ver" həllini seçmək — bu, index
  problemini gizlədir, trafik artanda geri qayıdır, indi daha yüksək
  infrastruktur xərci ilə.
- **Birinci tapılan səbəbi kök səbəb kimi qəbul etmək.** "Şəkil böyükdür" —
  düzdür, amma niyə böyük şəkil CDN-siz, cache-siz saxlanılır? Prosesdə hansı
  boşluq buna icazə verib? (design review-da şəkil ölçüsü limiti yoxdur?)
  Bu sualı buraxmaq, problemin başqa səhifədə təkrarlanmasına səbəb olur.
- **"5 Whys"-i mexaniki tətbiq etmək.** Texnika xətti zəncirli səbəblər üçün
  effektivdir, amma real insidentlərdə çox vaxt **paralel** səbəblər olur
  (həm index yoxdur, HƏM DƏ şəkil optimallaşdırılmayıb, HƏM DƏ 3-cü tərəf
  skript var). Tək bir xətti zəncir axtarmaq, digər paralel kök səbəbləri
  gözdən qaçırdır.
- **Ölçmədən diaqnoz qoymaq.** "Bəlkə bundle böyükdür" fərziyyəsi ilə
  code-splitting-ə başlamaq, əvvəlcə LCP breakdown-a baxmadan — vaxt itkisi,
  çünki problem TTFB-də ola bilər və bundle ölçüsünün LCP-yə heç aidiyyəti
  olmaya bilər.

### 2.5 Trade-off / dizayn sualları

1. RUM (real user monitoring) ilə sintetik test (Lighthouse/WebPageTest)
   arasında nə vaxt hansına üstünlük verirsən? RUM real coğrafi/cihaz
   müxtəlifliyini göstərir, amma reproduce etmək çətindir; sintetik test
   dəqiq reproduce olunur, amma real-world variasiyasını qaçırır.
2. "5 Whys" zəncirini nə vaxt dayandırırsan? Sonsuza qədər davam etdirmək
   olar ("niyə performans review prosesi yoxdur?" → "niyə komanda kiçikdir?"
   → "niyə büdcə azdır?"...) — hara qədər texniki, harada təşkilati sual
   başlayır?
3. Kök səbəb (database index) düzəlişi 2 həftə çəkir, simptom düzəlişi
   (cache əlavə et) 1 gün çəkir amma kök səbəbi maskalayır — hansını əvvəl
   edirsən, hər ikisini necə ardıcıllaşdırırsan?
4. Üçüncü tərəf skript (marketinq tag-i) performansa zərər verir, amma onu
   silmək biznes tərəfinin analitika ehtiyacını kəsir — texniki həll
   (async yükləmə, script budget, tag manager governance) ilə siyasi həll
   (marketinq komandası ilə danışıq) arasında sən harada dayanırsan?

### 2.6 Mock müsahibə sual-cavabları

**S: "Səhifə yavaşdır" şikayəti gəlir. Diaqnostikaya haradan başlayırsınız?**
C: Əvvəlcə "yavaş" sözünü rəqəmə çevirirəm — hansı metrika (LCP? TTFB?
INP?), hansı persentil (p50 yoxsa p75/p95?), hansı səhifə/cihaz/region.
Sonra RUM data ilə real vəziyyəti təsdiqləyirəm (təxmin etmirəm). LCP-ni
dörd alt-hissəyə (TTFB, resource load delay, resource load duration,
render delay) ayırıram və ən böyük payı olan hissədən başlayıram — bu,
"əvvəlcə şəkli sıxım" kimi refleks həllərdən daha effektivdir, çünki
resursu ən böyük təsirə yönəldir.

**S: Kök səbəbi tapdınız (DB-də index yoxdur), amma düzəliş 2 sprint
çəkəcək. Bu müddətdə nə edirsiniz?**
C: Kök səbəb düzəlişini planlaşdırıram (ticket, sahiblik, tarix), amma
paralel olaraq **açıq şəkildə etiketlənmiş** müvəqqəti tədbir görə bilərəm
(məs. həmin sorğu üçün nəticəni qısa müddətə cache etmək) — şərtlə ki, bu
"müvəqqəti" statusda qeydə alınsın (ticket/kod comment/monitoring alert),
əks halda "müvəqqəti" tədbir daimi olur və kök səbəb heç vaxt düzəlmir.

**S: LCP-ni yaxşılaşdırmısınız, amma bounce rate dəyişmədi. Niyə ola bilər?**
C: Bir neçə ehtimal yoxlanır: (1) yaxşılaşma statistik əhəmiyyətli
deyil (sample size, digər dəyişənlər); (2) LCP performansın yalnız bir
hissəsidir — INP (interaktivlik) və ya CLS (vizual sabitlik) problemi
bounce-a daha çox təsir edə bilər; (3) bounce rate-in əsl səbəbi performans
deyil, content/UX-dir — performans yalnız korrelyasiya olunan, amma kök
səbəb olmayan dəyişən idi. Renault kimi sənədləşdirilmiş case-lərdə əlaqə
var, amma hər məhsulda eyni korrelyasiya avtomatik təkrarlanmır — A/B test
ilə öz məhsulunda doğrulamaq lazımdır.

### 2.7 Mənbələr

- ["Optimize Largest Contentful Paint" — web.dev](https://web.dev/articles/optimize-lcp)
  — LCP-nin dörd alt-hissəyə ayrılması və hər birinin kök səbəb ailəsi.
- ["How Renault improved its bounce and conversion rates by measuring and
  optimizing Largest Contentful Paint" — web.dev](https://web.dev/case-studies/renault)
  — real diaqnostika zənciri (SPA, GTM container, TTFB, image), 1s LCP → 14pp
  bounce azalması, 13% conversion artımı.
- ["The business impact of Core Web Vitals" — web.dev](https://web.dev/case-studies/vitals-business-impact)
  — Vodafone, Tokopedia, Redbus, Lazada, GYAO, Nykaa, Yahoo Japan, AliExpress
  case study-lərinin toplusu.
- ["Five whys" — Wikipedia](https://en.wikipedia.org/wiki/Five_whys) — texnikanın
  mənşəyi (Taiichi Ohno, Toyota Production System).
- ["5 why root cause analysis"](https://www.fldata.com/5-why-root-cause-analysis/)
  və ["The 5 Whys of Root Cause Analysis"](https://kelvintopset.com/blog/the-five-whys-of-root-cause-analysis/)
  — software performansı üçün "slow query → missing index → performans testinə
  daxil edilməyib" nümunəsi.

---

## 3. Biznes tələbini texniki qərara çevirmək (ROI, prioritetləşdirmə)

### 3.1 Başlıq və niyə vacibdir

Kök səbəbləri tapmaq (Bölmə 2) yalnız yarım işdir. Real dünyada məhdud vaxt
və məhdud mühəndis resursu var — Bölmə 2-dəki nümunədə tək bir şikayətdən
azı üç ayrı kök səbəb çıxdı (DB index, image/CDN, 3-cü tərəf skript). Senior-un
işi bunların **hansını əvvəl, hansını sonra, hansını heç etməmək** qərarını
biznes dililə əsaslandırmaqdır. Bu bacarıq olmadan, texniki dərinlik "hər
şeyi düzəltmək lazımdır" kimi qeyri-realist siyahılara çevrilir və heç nə
prioritet almır.

### 3.2 Konsepsiyalar — ilk prinsiplərdən

**Cost of Delay (CoD).** Bir işi indi etməklə sonra etmək arasındaki
iqtisadi fərq. Hər gecikmə bir dəyər itirir (itirilmiş conversion, itirilmiş
istifadəçi, artan texniki borc faizi) — CoD bu itkini kəmiyyətləşdirməyə
çalışır.

**WSJF (Weighted Shortest Job First).** SAFe (Scaled Agile Framework)
çərçivəsindən gələn prioritetləşdirmə formulu:

```
WSJF = Cost of Delay / Job Duration (Job Size)
```

Cost of Delay adətən üç komponentdən qurulur: (1) istifadəçi/biznes dəyəri,
(2) vaxt-kritiklik (gecikmə ilə dəyər necə sürətlə itir), (3) risk azaltma /
imkan yaratma dəyəri. Job Duration isə mühəndis-günü/story point ilə
ölçülür. Nəticə: **yüksək dəyər + qısa müddət** = ən yüksək prioritet —
"tez qazanılan qələbələr" (quick wins) formalaşdıran məntiq elə budur.

**Niyə bu, sırf "texniki çətinlik" sıralamasından fərqlidir.** Texniki
çətinliyə görə sıralama ("ən çətin problemi əvvəl həll edək, çünki daha
maraqlıdır") mühəndis-mərkəzli fikirdir. WSJF/CoD isə **dəyər/vaxt**
nisbətinə görə sıralayır — bu, mühəndisin şəxsi marağından asılı olmayan,
biznes məntiqinə əsaslanan sıralamadır və elə buna görə stakeholder-lərlə
danışıqda inandırıcıdır (bax Bölmə 4).

### 3.3 Praktiki nümunə — addım-addım prioritetləşdirmə

Bölmə 2-dəki diaqnostikadan üç kök səbəb çıxdı. Bunları WSJF-yə bənzər
məntiqlə qiymətləndirək (rəqəmlər illüstrativ ranking üçündür, mütləq dollar
dəyəri kimi təqdim olunmur):

```text
Kök səbəb 1: DB index yoxdur (TTFB-nin əsas payı)
  Dəyər:     Yüksək — TTFB LCP-nin ~40%-ini təşkil edir, bütün profil
             səhifəsinə təsir edir (bütün istifadəçilər üçün).
  Müddət:    Qısa — bir index yaratmaq, migration yazmaq, staging-də
             yoxlamaq (adətən saatlar-günlər səviyyəsində iş).
  Risk:      Aşağı — additive dəyişiklik, rollback asandır.
  → WSJF: YÜKSƏK (yüksək dəyər / qısa müddət) → İLK NÖVBƏDƏ.

Kök səbəb 2: Hero image optimallaşdırılmayıb (format, CDN, cache)
  Dəyər:     Yüksək — Resource Load Duration-un əsas payı, bütün
             istifadəçilərə təsir edir.
  Müddət:    Orta — format konversiyası, srcset, CDN konfiqurasiyası
             (infrastruktur işi tələb edir).
  Risk:      Aşağı-Orta — CDN konfiqurasiya səhvi geniş təsir edə bilər,
             test tələb edir.
  → WSJF: ORTA-YÜKSƏK → İKİNCİ.

Kök səbəb 3: Üçüncü tərəf A/B test skripti render-i gecikdirir
  Dəyər:     Orta — yalnız Element Render Delay-ə təsir edir (LCP-nin
             kiçik payı), amma A/B testinin özü biznes üçün dəyərlidir
             (skripti silmək başqa dəyər itkisi yaradır).
  Müddət:    Orta — texniki həll (async yükləmə, script budget) özü
             asandır, amma marketinq/məhsul komandası ilə danışıq
             (kimin skripti, niyə sinxron yükləndiyi) vaxt aparır.
  Risk:      Orta — komandalar arası koordinasiya riski.
  → WSJF: ORTA → ÜÇÜNCÜ, paralel olaraq danışıqlara başlanır.
```

**Nəticə:** Sıralama "ən çətin texniki problem" məntiqinə görə deyil (bu
halda 3-cü kök səbəb ən çox komanda-arası mürəkkəbliyə malikdir), "dəyər/vaxt"
nisbətinə görə qurulub. Bu, həm resursu düzgün yönəldir, həm də stakeholder-ə
"niyə bu qərar" sualına rəqəmsal cavab verir.

**Dəyər tərəfini əsaslandırmaq üçün sənaye datası.** Renault case
study-sinə görə 1 saniyəlik LCP yaxşılaşması 14 faiz-bənd bounce azalması və
13% conversion artımı ilə nəticələnib; Vodafone Italy-də LCP-nin 31%
yaxşılaşması 8% daha çox satışla, Tokopedia-da LCP-nin 55% yaxşılaşması
(3.78s→1.72s) 23% daha yaxşı session duration ilə nəticələnib. Bunlar
**başqa şirkətlərin** sənədləşdirilmiş nəticələridir — öz məhsulunda eyni
əmsalı gözləmək səhvdir, amma bu, "performans yaxşılaşdırmağın ROI-si sıfıra
yaxın deyil" fərziyyəsini əsaslandırmaq üçün kifayət qədər etibarlı
başlanğıc nöqtəsidir. Dəqiq rəqəm üçün öz A/B testin lazımdır.

### 3.4 Senior-level tələlər

- **"ROI teatrı".** Ölçmə planı olmadan gözəl rəqəmlər təxmin etmək
  ("bu, conversion-u 5% artıracaq") və sonra heç vaxt yoxlamamaq. Rəqəm
  təqdim edildiyi andan "vəd"ə çevrilir — əgər ölçülməyəcəksə, ümumiyyətlə
  rəqəm vermə, "gözlənilən istiqamət" de.
- **Cost of Delay-i unutmaq.** "Bu, indi çətin görünür, sonra edərik" qərarı
  gizli xərc yaradır — hər gecikən sprint, itirilmiş conversion/istifadəçi
  formasında yığılır. Bu xərc görünməzdir, ona görə asanlıqla nəzərə
  alınmır.
- **Aşağı-təsirli problemi over-engineer etmək.** Texniki maraqlı olduğu üçün
  (məs. mürəkkəb caching layer qurmaq) aşağı dəyərli problemə həddindən
  artıq vaxt sərf etmək — WSJF-in "dəyər" tərəfini nəzərdən qaçırmaq.
  bu, mühəndis-marağı ilə biznes-dəyərinin qarışdırılmasıdır.
- **Bütün kök səbəbləri eyni "layihə"yə yığmaq.** Üç fərqli kök səbəbi bir
  "performans layihəsi" kimi təqdim etmək, sıralamasız — bu, stakeholder-ə
  "hamısı eyni prioritetdədir" mesajı verir və faktiki olaraq ən dəyərli
  düzəlişi (index) ən uzun (3-cü tərəf danışıqları) arxasında gizlədir.

### 3.5 Trade-off / dizayn sualları

1. Cost of Delay-i necə qiymətləndirirsən, əgər dəqiq conversion/revenue
   datası yoxdursa (yeni feature, kiçik trafik)? Hansı proxy metrikalardan
   istifadə edərsən?
2. Aşağı WSJF alan, amma "əgər indi etməsək, texniki borc yığılıb sonra
   10x baha olacaq" tipli işlər (məs. index-siz cədvəl böyüdükcə problem
   dərinləşir) — bunları formulaya necə daxil edirsən?
3. Stakeholder yüksək-dəyərli-amma-uzun-müddətli işi (SSR migrasiyası)
   tez istəyir, sən isə qısa-müddətli-yüksək-dəyərli işi (index) təklif
   edirsən — necə uzlaşdırırsan, ikisini paralel apara bilərsənmi?
4. "Dəyər" ölçüsü kimi conversion/revenue seçdin, amma bu, dolayı yolla
   digər metrikaları (a11y, developer velocity) arxa plana atır — bu
   trade-off-u necə idarə edirsən?

### 3.6 Mock müsahibə sual-cavabları

**S: Sizə üç performans problemi var, hamısını düzəltməyə vaxtınız yoxdur.
Necə sıralarsınız?**
C: Hər birini iki oxa qoyuram: gözlənilən biznes təsiri (neçə istifadəçiyə,
hansı metrikaya təsir edir) və düzəliş müddəti (mühəndis-günü). WSJF
məntiqinə uyğun olaraq yüksək-təsir/qısa-müddət olanları əvvəl götürürəm.
Əgər təsiri ölçmək üçün data yoxdursa, əvvəlcə ölçmə infrastrukturunu
(RUM/analytics) qurmağı prioritetə salıram, çünki datasız sıralama
təxmindən ibarətdir.

**S: PM sizdən "bunu niyə indi etmirik" soruşur, siz "sonra" deyirsiniz —
bu qərarı necə əsaslandırırsınız?**
C: "Sonra" sözünü Cost of Delay ilə əvəz edirəm: "bunu 2 sprint gecikdirsək,
təxmini itki X-dir (məs. davam edən aşağı conversion), amma indi etsək,
Y layihəsi (daha yüksək CoD) gecikəcək". Qərarı rəqəmli müqayisəyə
çevirirəm ki, "sonra" sözü subyektiv görünməsin.

**S: Bir performans düzəlişinin ROI-sini necə təqdim edərdiniz, əgər
şirkətinizdə Renault/Vodafone kimi ictimai case study yoxdur?**
C: Sənaye nümunələrini (Renault, Vodafone, Tokopedia) "bu istiqamətdə hərəkət
etmək işə yarayır" sübutu kimi istifadə edirəm, amma dəqiq faiz vədini öz
məhsulum üçün vermirəm. Əvəzinə kiçik, ölçülə bilən bir dəyişiklik təklif
edirəm (məs. bir səhifədə A/B test) ki, öz datamızla öz əmsalımızı tapaq,
sonra bunu daha böyük investisiya qərarına əsas kimi istifadə edək.

### 3.7 Mənbələr

- ["Cost of Delay Prioritization Framework"](https://fibery.com/blog/product-management/cost-of-delay/)
- ["Complete Guide on Weighted Shortest Job First (WSJF) in Agile"](https://www.6sigma.us/work-measurement/weighted-shortest-job-first-wsjf/)
- ["Prioritization Frameworks for Engineers"](https://ctoexecutiveinsights.com/blog/prioritization-frameworks-for-engineers)
- ["How Renault improved its bounce and conversion rates..." — web.dev](https://web.dev/case-studies/renault)
- ["The business impact of Core Web Vitals" — web.dev](https://web.dev/case-studies/vitals-business-impact)

---

## 4. Senior-in stakeholder-lərlə danışıq dili

### 4.1 Başlıq və niyə vacibdir

Kök səbəbi tapmaq və düzgün prioritetləşdirmək kifayət deyil, əgər bunu
qeyri-texniki qərar qəbul edənlərə (PM, satış rəhbəri, C-level) izah edə
bilmirsənsə. Senior/staff səviyyədə təsir, çox vaxt birbaşa hakimiyyətlə
deyil, **inandırma qabiliyyəti** ilə əldə edilir — bu, "influence without
authority" adlanır. Texniki riski səhv dildə izah etmək, düzgün texniki
qərarın rədd edilməsinə səbəb ola bilər — problem texnikada deyil,
tərcümədə olur.

### 4.2 Konsepsiyalar — ilk prinsiplərdən

Mühəndis və qeyri-texniki stakeholder arasındaki "kommunikasiya uçurumu"
lüğət, prioritet və perspektiv fərqindən yaranır: mühəndis kodun, alqoritmin,
arxitekturanın detalına fokuslanır, stakeholder isə layihənin ümumi
məqsədinə, vaxt çərçivəsinə və biznes təsirinə fokuslanır. Bu, bir tərəfin
"daha az bilməsi" məsələsi deyil — hər ikisi öz sahəsində dərin bilikli ola
bilər, sadəcə fərqli çərçivələrdə düşünürlər.

Effektiv tərcümənin üç prinsipi:

1. **Auditoriyanı tanı.** Executive ROI/strategiya ilə maraqlanır, PM
   timeline/scope ilə, dəstək komandası "bu nə vaxt bitəcək və mənə nə
   deyəcəyəm" ilə. Eyni texniki fakt hər auditoriya üçün fərqli çərçivəyə
   qoyulmalıdır.
2. **Metaforalardan ehtiyatla istifadə et.** Körpü, zavod, tikinti kimi
   metaforalar mürəkkəb texniki konsepsiyaları əlçatan edir, amma səthi
   metafora dəqiqliyi itirə bilər — metafora "nə üçün vaxt aparır" sualını
   izah etməlidir, texniki detalı gizlətməməlidir.
3. **Texniki metrikayı biznes metrikasına bağla.** "API cavab vaxtı 900ms-dir"
   texniki faktdır və qərar qəbul edəni maraqlandırmır. "API cavab vaxtı
   uzun olduğu üçün istifadəçilər formu tərk edir" artıq biznes dilindədir.
   Konkret rəqəm yoxdursa (öz A/B testin olmadan), rəqəm icad etmə —
   "gözlənilən istiqamət"i keyfiyyət dililə ifadə et, saxta dəqiqlik
   yaratma.

### 4.3 Praktiki nümunə — stakeholder danışığı, addım-addım

**Ssenari:** Bölmə 2-3-dəki diaqnostika/prioritetləşdirmə hazırdır. Senior
bunu bir sprint planning görüşündə qeyri-texniki PM-ə və satış rəhbərinə
təqdim edir.

**Zəif versiya (texniki dil, auditoriya nəzərə alınmayıb):**

> "LCP-nin TTFB komponenti 2.1 saniyədir, çünki `orders` cədvəlində
> `user_id` üzərində composite index yoxdur, full table scan işləyir.
> Bundan başqa hero image-i WebP-ə çevirib CDN-ə köçürməliyik, cache-control
> header-lərini də sabitləşdirməliyik."

Bu, texniki cəhətdən dəqiqdir, amma qərar qəbul edən üçün "hərəkətə keçmə"
siqnalı vermir — nə "niyə əhəmiyyətlidir", nə də "nə qədər vaxt/pul" sualına
cavab yoxdur.

**Güclü versiya (auditoriyaya uyğunlaşdırılmış, riski kəmiyyətləndirən):**

> "Profil səhifəsi açılması indi ortalama 5 saniyə çəkir. Sənayedə
> sənədləşdirilmiş nümunələrə görə (məsələn Renault-un ictimai case
> study-si) hər 1 saniyəlik yaxşılaşma bounce rate-i azaldıb, conversion-u
> artırıb — bizim üçün dəqiq rəqəmi hələ bilmirik, amma istiqamət
> doğrulanmışdır. Problemin 80%-i iki yerdən qaynaqlanır: (1) database
> sorğusu, 2 günlük iş, aşağı risk; (2) şəkil çatdırılması, 1 həftəlik iş,
> orta risk. Üçüncü bir səbəb (marketinq skripti) var, amma onu düzəltmək
> sizin komandanızla (marketinq) əlaqələndirmə tələb edir — bunu ayrıca
> müzakirə edək. Təklifim: əvvəlcə 2 günlük database düzəlişini edək, LCP-ni
> yenidən ölçək, sonra şəkil işinə keçək."

Fərqlər: (1) "5 saniyə" ilə başlayır (auditoriyanın tanıdığı simptom), (2)
riski/dəyəri sənaye datası ilə əsaslandırır, amma saxta dəqiq rəqəm icad
etmir ("bizim üçün dəqiq rəqəmi hələ bilmirik" — dürüstlük), (3) hər addımı
vaxt/risklə əlaqələndirir, (4) konkret növbəti addım təklif edir.

**Edge-case: risk pis xəbərdirsə.** Əgər diaqnostika göstərir ki, düzəliş
6 həftə çəkəcək (məs. SSR migrasiyası) və bu, PM-in gözlədiyi 2 həftədən
çox fərqlidir — kök səbəbi gizlətmək və ya "cəhd edərik" kimi qeyri-müəyyən
cavab vermək əvəzinə, fərqi açıq göstərmək lazımdır: "sürətli düzəliş
(cache) simptomu 1 həftəyə yüngülləşdirər, amma kök səbəb qalar və 2-3 ayda
geri qayıda bilər; kök səbəb düzəlişi 6 həftədir. Sizin üçün hansı trade-off
məqbuldur?" — qərarı stakeholder-ə açıq şəkildə, tam məlumatla verir, riski
öz üzərinə götürüb gizlətmir.

### 4.4 Senior-level tələlər

- **Jargon yükü.** "p75 LCP", "TTFB", "hydration" kimi terminləri izahsız
  istifadə etmək — auditoriya anlamadığını deməkdən çəkinir, görüş "razılıq"
  kimi bitir, amma real razılaşma yoxdur.
- **Yalan kəsinlik.** Qeyri-müəyyən nəticəni dəqiq rəqəmlə təqdim etmək
  ("bu, conversion-u 13% artıracaq" — əslində bu, başqa bir şirkətin
  nəticəsidir, sənin öz məhsulunun proqnozu deyil). Bu, qısa müddətdə
  inandırıcı görünür, uzun müddətdə etibarı öldürür (vəd yerinə yetmədikdə).
- **Trade-off-u gizlətmək ki, bacarıqlı görünəsən.** "Hər şeyi edə bilərəm"
  cavabı, resurs məhdudiyyətini gizlədir və stakeholder-i səhv gözləntiyə
  aparır — sonra gecikmə "mühəndisin bacarıqsızlığı" kimi qəbul edilir,
  halbuki əslində düzgün elan edilməmiş trade-off idi.
- **Risk barədə heç danışmamaq.** Əks pol da tələdir: "hamısı yaxşı olacaq"
  demək, riski susdurmaqla eynidir. Stakeholder qərar verə bilmir, çünki
  seçim ona təqdim olunmayıb.

### 4.5 Trade-off / dizayn sualları

1. Stakeholder texniki detala can atır ("mənə tam izah et") — nə qədər
   dərinə getmək lazımdır, hansı nöqtədə "artıq detal" auditoriyanı
   itirir?
2. Sənaye case study-lərini (Renault, Vodafone) öz təqdimatında istifadə
   etmək inandırıcıdırmı, yoxsa "başqasının nəticəsini bizim vədə çevirmək"
   riskini yaradır? Bunu necə balanslaşdırırsan?
3. Stakeholder sürətli, qeyri-dəqiq cavab istəyir ("bu neçə günə bitər?"),
   sən isə diaqnostika hələ bitməyib — dəqiq olmayan rəqəm vermək, yoxsa
   "bilmirəm, amma X tarixinə cavab verərəm" demək arasında seçim necə
   edilir?
4. Kök səbəb düzəlişi başqa komandanın (marketinq, backend) işinə
   toxunur — sən onların işinə birbaşa təsir edə bilmirsən, amma nəticəyə
   görə məsuliyyət daşıyırsan. Bu asimmetriyani stakeholder-ə necə izah
   edirsən?

### 4.6 Mock müsahibə sual-cavabları

**S: Sizdən 5 dəqiqəlik icraçı xülasə (executive summary) istənilib — LCP
diaqnostikasını necə təqdim edərsiniz?**
C: Texniki detalı deyil, nəticəni əvvəlcə deyirəm: "profil səhifəsi 5
saniyəyə açılır, bunun aşağı-riskli/qısa-müddətli iki həlli var (cəmi ~1.5
həftə), onları edirik. Üçüncü səbəb komandalar-arası koordinasiya tələb
edir, ayrıca müzakirə lazımdır." Sonra sual gələrsə detala keçirəm, amma
default olaraq detalı təqdimatın əvvəlinə yükləmirəm.

**S: Marketinq komandası performans problemi yaradan skripti silmək
istəmir. Bunu necə həll edərsiniz?**
C: Onların ehtiyacını (analitika, A/B test) rədd etmirəm — problemi "skripti
sil" kimi deyil, "skripti performansa az təsir edən şəkildə yüklə" kimi
çərçivələyirəm (async, script budget, performans monitorinqi ilə
şəffaflıq). Onlara öz metrikalarında (bounce/conversion) performansın
təsirini göstərirəm ki, bu, "mühəndisin qəribəliyi" deyil, ortaq maraq kimi
görünsün.

**S: Bir dəyişikliyin ROI-sini rəqəmlə sübut edə bilmirsiniz (data yoxdur).
Stakeholder-i necə inandırırsınız?**
C: Sənaye nümunələrini (Renault və digər web.dev case study-ləri) istiqamət
sübutu kimi göstərirəm, amma "bizdə də eyni faiz olacaq" demirəm. Əvəzinə
kiçik, aşağı-riskli bir eksperiment təklif edirəm ki, öz datamızı əldə
edək — bu, "bilmədiyimi bilmirəm kimi göstərmə" ilə "hər şeyi bilirəm kimi
davran" arasında dürüst orta yoldur.

### 4.7 Mənbələr

- ["Explain Less, Align More: Explaining tech to non-technical
  stakeholders"](https://annajmcdougall.medium.com/explain-less-align-more-e72c6a692b23)
- ["How to Communicate Effectively with Non-Tech Stakeholders" —
  DevToLead](https://www.devtolead.com/guides/business-communication-skills/communicate-with-non-tech-stakeholders)
- ["Bridging the communication gap between technical and non-technical
  stakeholders" — Reintech](https://reintech.io/blog/bridging-communication-gap-technical-non-technical-stakeholders)
- Luciano Mammino, ["The Definition of Senior"](https://loige.co/the-senior-dev/)
  — "NO, BUT" danışıq strategiyası.

---

## Yekun

Bu handbook-un 14 hissəsi texniki dərinlikdən (React internals, browser
internals, JS/TS, system design, security, testing) texniki liderliyə
(Part 13) və nəhayət biznes düşüncəsinə (bu hissə) qədər bir xətt çəkdi.
Bu xəttin məntiqi budur: **texniki bilik zəruri şərtdir, kifayət şərt
deyil.** Senior developer-i mid-level-dən ayıran son fərq, bütün bu bilikdən
nə vaxt, harada və niyə istifadə etməli olduğunu bilməkdir — "page 5
saniyəyə açılır" şikayətini eşidəndə refleks olaraq kod açmaq yox, əvvəlcə
"niyə?" sualını soruşmaqdır.

## Ümumi Mənbələr Siyahısı

- [Optimize Largest Contentful Paint — web.dev](https://web.dev/articles/optimize-lcp)
- [How Renault improved its bounce and conversion rates... — web.dev](https://web.dev/case-studies/renault)
- [The business impact of Core Web Vitals — web.dev](https://web.dev/case-studies/vitals-business-impact)
- [Five whys — Wikipedia](https://en.wikipedia.org/wiki/Five_whys)
- [5 why root cause analysis](https://www.fldata.com/5-why-root-cause-analysis/)
- [The 5 Whys of Root Cause Analysis](https://kelvintopset.com/blog/the-five-whys-of-root-cause-analysis/)
- [The Definition of Senior — loige.co](https://loige.co/the-senior-dev/)
- [5 ways tech leaders can increase their business acumen — InfoWorld](https://www.infoworld.com/article/2335821/5-ways-tech-leaders-can-increase-their-business-acumen.html)
- [Cost of Delay Prioritization Framework](https://fibery.com/blog/product-management/cost-of-delay/)
- [Complete Guide on Weighted Shortest Job First (WSJF) in Agile](https://www.6sigma.us/work-measurement/weighted-shortest-job-first-wsjf/)
- [Prioritization Frameworks for Engineers](https://ctoexecutiveinsights.com/blog/prioritization-frameworks-for-engineers)
- [Explain Less, Align More](https://annajmcdougall.medium.com/explain-less-align-more-e72c6a692b23)
- [How to Communicate Effectively with Non-Tech Stakeholders — DevToLead](https://www.devtolead.com/guides/business-communication-skills/communicate-with-non-tech-stakeholders)
- [Bridging the communication gap between technical and non-technical stakeholders — Reintech](https://reintech.io/blog/bridging-communication-gap-technical-non-technical-stakeholders)
