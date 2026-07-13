# Senior Frontend Handbook — Hissə 13: Texniki Liderlik

Bu hissəyə qədər (Part 1–12) danışılanların hamısı — React internals, performans,
browser mexanizmləri, security, testing — **texnologiyadır**. Onları bilmək
seniora keçidin yalnız yarısıdır. Digər yarısı bu fayldadır: **texniki
liderlik** — kodu yazmadan əvvəl və yazandan sonra baş verən iş.

Junior/mid developer tapşırığı alır, kodlaşdırır, PR açır. Senior developer isə:

- başqasının kodunu elə review edir ki, komanda daha yaxşı kod yazmağı öyrənsin,
- qərarı kod yazmadan əvvəl sənədləşdirib insanların fikrini toplayır (RFC),
- "niyə belə etdik" sualına 8 ay sonra cavab tapılan iz qoyur (ADR),
- "3 həftə çəkər" desə, bunun arxasında nə dayandığını izah edə bilir (estimation),
- layihə partlamadan əvvəl harada partlaya biləcəyini görür (risk analysis),
- kodu bilməyən adama nəticəni izah edir (stakeholder communication),
- ətrafındakı adamları özündən güclü çıxarır (mentoring).

Bunların heç biri "yumşaq bacarıq" (soft skill) kimi keçici deyil — hər biri
konkret sənəd formatı, konkret sual dəsti və konkret uğursuzluq nümunələri olan
bir **mühəndislik təcrübəsidir**. Bu hissə onları elə dərinliklə öyrədir.

## Məzmun

- [13.1 Code Review](#131-code-review)
- [13.2 RFC yazmaq](#132-rfc-yazmaq)
- [13.3 Technical Proposal](#133-technical-proposal)
- [13.4 Mentoring](#134-mentoring)
- [13.5 Planning](#135-planning)
- [13.6 Estimation](#136-estimation)
- [13.7 Risk Analysis](#137-risk-analysis)
- [13.8 Stakeholder Communication](#138-stakeholder-communication)
- [13.9 Architecture Decision Record (ADR)](#139-architecture-decision-record-adr)
- [13.10 Trade-off analizi](#1310-trade-off-analizi)

---

## 13.1 Code Review

### 1. Niyə senior səviyyəsində vacib

Code review — kod bazasının keyfiyyətinə təsir edən ən tez-tez təkrarlanan
ritualdır: gündə neçə dəfə. Junior/mid developer review-u "kodum düzgündürmü"
sualına cavab kimi görür. Senior developer isə review-u **komandanın kollektiv
kod sağlamlığını (code health) idarə etmə aləti** kimi görür — özününkü daxil
olmaqla, hər kəsin kodunu.

Bu fərq müsahibədə birbaşa yoxlanılır ("Necə review edirsən?"), performans
review-larında "review keyfiyyəti" meyar kimi yazılır və insident post-mortem-lərində
tez-tez "bu, review-da tutulmalıydı" cümləsi çıxır. Google-un öz mühəndislik
təcrübəsi sənədində yazdığı kimi, code review-un məqsədi "Google-un kod
bazasının keyfiyyətinin zamanla yaxşılaşmasını təmin etməkdir" — fərdi PR-ın
mükəmməl olması deyil.

### 2. Konsepsiyalar ilk prinsiplərdən

**"Mükəmməl kod yoxdur, yalnız daha yaxşı kod var."** Bu, Google-un review
standartının mərkəzi prinsipidir. Niyə? Çünki "mükəmməllik" subyektiv və sonsuz
təkmilləşdirilə bilən bir hədəfdir — onu tələb etsən, heç bir PR heç vaxt merge
olunmaz. Ona görə qayda budur: **reviewer CL-i (dəyişikliyi) təsdiqləməyə
meyilli olmalıdır, əgər o, sistemin ümumi kod sağlamlığını yaxşılaşdırırsa —
mükəmməl olmasa belə.** Kiçik təkmilləşdirmə təklifləri "Nit:" prefiksi ilə
yazılır — bunlar müəllifin rədd etmək hüququ olan, blocking olmayan qeydlərdir.

**Style vs Design — niyə fərqli davranılır.** Style (boşluq, tırnaq növü,
adlandırma konvensiyası) — bunun "düzgün" cavabı komanda stil bələdçisidir,
şəxsi zövq üçün yer yoxdur, çünki mexaniki qaydadır (linter/formatter həll
etməlidir, insan diqqəti deyil). Design qərarları isə "demək olar ki, heç vaxt
sırf stil məsələsi və ya şəxsi seçim deyil" — onların altında prinsip
(coupling, testability, oxunaqlılıq) dayanır və prinsip üzərində mübahisə
etmək lazımdır, "mən belə yazardım" üzərində yox.

**Niyə review "yaxşı"dan "daha yaxşı"ya keçir.** Pragmatic Engineer-in
(Gergely Orosz) formalaşdırdığı fərqə görə: yaxşı review dəyişikliyin özünə
baxır — aydınlıq, düzgünlük, test coverage, stil uyğunluğu. Daha yaxşı review
dəyişikliyi **daha böyük sistemin kontekstində** görür — bu dəyişiklik
sistemi sadələşdirir, yoxsa mürəkkəbləşdirir? Bu, review-un "yüngül keçid"dən
sonra ayrıca "kontekstual keçid" tələb etdiyi deməkdir. Həmçinin empatiya
əlavə olunur: "bu kodu yazan insan buna xeyli vaxt və səy sərf edib" — bu,
tonun necə formalaşdırılacağına təsir edir (açıq sual, "güclü ifadə" yox).

**Münaqişə həlli — niyə eskalasiya pilləli olmalıdır.** Review zamanı
razılaşma olmadıqda, birbaşa "kim güclüdür" məntiqi ilə həll etmək
komandanı zəiflədir. Ona görə addım-addım yol var: (1) əvvəlcə komanda
qaydalarına əsaslanaraq consensus axtar, (2) uzun yazışma əvəzinə üz-üzə/video
danışığa keç (nəticəni comment-də qeyd et), (3) hələ də həll olmasa — daha
geniş komanda müzakirəsinə, Tech Lead-ə, kodun sahibinə və ya menecerə
eskalasiya et. Qayda: "CL-i müəllif və reviewer razılaşa bilmədiyi üçün
asılı vəziyyətdə saxlama" — kim doğrudur sualından daha vacib olan, PR-ın
sonsuza qədər açıq qalmamasıdır.

### 3. Praktiki nümunə

Real review comment-ləri — nit, blocking design qeydi və münaqişə eskalasiyası:

```markdown
## PR #482 — Checkout formunun validasiyasını refactor et

### Nit (blocking deyil)
> Line 47: `const d = new Date()` — `d` adı checkout kontekstində qeyri-aydındır,
> `submittedAt` daha aydın olardı. Nit, sənin qərarındır.

### Design qeydi (blocking)
> Bu funksiya həm formu validasiya edir, həm API-yə yazır, həm də analytics
> event göndərir — 3 məsuliyyət bir yerdə. Bu, `useCheckoutForm` hook-unu test
> etməyi çətinləşdirəcək (indi 3 fərqli səbəbdən sınana bilər) və gələcəkdə
> analytics-i dəyişmək istəyən adam validasiya kodunu da oxumalı olacaq.
>
> Təklif: analytics çağırışını `onSubmitSuccess` callback-inə çıxar, çağıran
> tərəf (parent komponent) qərar versin nə vaxt göndərsin.
>
> Bu, "mən belə istərdim" deyil — coupling azaltmaq prinsipinə əsaslanır,
> çünki bu fayl artıq 3 ayda 2 dəfə "analytics dəyişikliyi" adı ilə PR alıb
> və hər dəfə validasiya testləri də sınıb.

### Münaqişə — müəllif etiraz edir
> **Müəllif:** Bu ayırma 15 sətir əlavə kod deməkdir, deadline sabahdır,
> hazırkı forma işləyir.
>
> **Reviewer:** Anlayıram, vaxt təzyiqi real problemdir. Təklifim: bu PR-ı
> hazırkı formada approve edirəm, amma ayrıca "TECH-DEBT: extract analytics
> from useCheckoutForm" ticket açıram və sprint planning-də gündəmə gətirirəm.
> Beləliklə sabahkı deadline pozulmur, amma problem yaddan çıxmır.
>
> (Əgər reviewer hələ də razı olmasaydı və müəllif də israr etsəydi, növbəti
> addım Tech Lead-i decision-a cəlb etmək olardı — kimin "doğru" olduğunu
> sübut etmək üçün yox, PR-ın açıq qalmaması üçün.)
```

Diqqət et: blocking qeyd **niyə** sualına cavab verir (prinsip + konkret sübut —
"2 dəfə sınıb"), sadəcə "mənə xoş gəlmir" demir. Münaqişə addımı isə
kompromis + iz qoyma ilə bağlanır, "kim haqlıdır" mübahisəsi ilə yox.

### 4. Senior-level tələlər

- **Yalnız stilə fokuslanmaq.** Linter/formatter-in tutmalı olduğu şeyə vaxt
  sərf etmək — bu, senior review-un ən çox rast gəlinən zəifliyidir. Əgər
  komandanın stil üzərində tez-tez mübahisə etdiyini görürsənsə, problem
  review mədəniyyətində deyil, alət boşluğundadır (Prettier/ESLint qaydası
  əlavə et).
- **Möhür basan (rubber-stamp) reviewer.** "LGTM" yazıb sistemin bu dəyişiklikdən
  necə təsirləndiyini oxumadan approve etmək — sürəti artırır, amma bu sürət
  faktiki yoxdur, sadəcə riski production-a köçürür.
- **Şəxsi zövqü prinsip kimi təqdim etmək.** "Mən belə yazmazdım" blocking
  səbəb deyil. Əgər arqumentini "niyə"yə qədər izləyə bilmirsənsə, o, design
  qeydi deyil, nitdir — elə də işarələ.
- **Uzun async yazışma müharibəsi.** 5-ci comment-dən sonra hələ də razılaşma
  yoxdursa, mətndə davam etmək əvəzinə zəng/görüş təklif et — yazıda itən ton
  və kontekst danışıqda 5 dəqiqəyə həll olunur.
- **Test coverage-i səthi yoxlamaq.** "Testlər var" kifayət deyil — testlər
  həqiqətən edge-case-i, error path-i sınayır, yoxsa hər şeyi mock edib yalnız
  "funksiya çağırıldı"nı yoxlayır? Bu fərqi görməmək seniorun ən böyük
  buraxılışlarından biridir.
- **RFC-ni "artıq qərar verilmiş" kimi review etmək.** Kodun özünü review edərkən
  arxitektura sualı doğursa ("bu niyə burada belədir?") və cavab "çünki artıq
  belə yazılıb" olarsa — bu, RFC/ADR mərhələsinin buraxıldığının əlamətidir
  (bax 13.2, 13.9).

### 5. Trade-off / dizayn sualları

1. Perfeksionizm vs sürət: hansı halda blocking qeyd yazırsan, hansı halda
   "approve + follow-up ticket" yolunu seçirsən?
2. Async (yazılı) review vs sync (pairing/screen-share) review — hər biri
   hansı ölçüdəki dəyişiklik və hansı komanda dinamikası üçün daha effektivdir?
3. Nit sayı çoxaldıqda: bu, komandanın standartsızlığının, yoxsa alət
   boşluğunun əlaməti kimi necə ayırd edilir?
4. Business-critical CL (məsələn ödəniş axını) ilə aşağı-riskli CL (məsələn
   daxili admin panel) üçün review sərtliyi necə fərqləndirilməlidir?

### 6. Mock müsahibə sual-cavabları

**S: Reviewer olaraq, dizayn qeydinə müəllif etiraz edir və o da haqlı ola
bilər. Necə davam edirsən?**
C: Əvvəlcə öz mövqeyimi yenidən yoxlayırm — həqiqətən prinsipə əsaslanır, yoxsa
zövqə? Əgər prinsipdirsə, konkret sübut (keçmiş insident, təkrarlanan bug)
göstərirəm. Hələ də razılaşma yoxdursa, sync danışığa keçirəm. Nəticə çıxmasa,
komandanın tech lead-inə və ya kodun əsas sahibinə eskalasiya edirəm —
məqsəd "kim haqlıdır"ı sübut etmək deyil, PR-ın ilişib qalmamasıdır.

**S: "Yaxşı" review ilə "daha yaxşı" review arasında fərq nədir?**
C: Yaxşı review dəyişikliyin özünə (düzgünlük, aydınlıq, test) baxır. Daha
yaxşı review dəyişikliyi daha böyük sistemin kontekstində qiymətləndirir —
bu, mövcud pattern-lərə uyğundurmu, gələcək dəyişiklikləri asanlaşdırır yoxsa
çətinləşdirir. Həmçinin proaktiv ünsiyyət qurur (çox comment varsa, əvvəlcədən
əlaqə saxlayır) və nitlərin təkrarlanmasını alət/standart problemi kimi həll edir.

**S: Bir junior sənin PR-ına səhv yazır ki, funksiya çox mürəkkəbdir, amma
konkret səbəb göstərmir. Necə cavab verirsən?**
C: Rədd etmirəm, "niyə mürəkkəb hesab edirsən?" deyə soruşuram — bu, həm
onun düşüncə prosesini öyrənməyimə, həm də ona konkret prinsiplə arqument
qurmağı öyrətməyimə imkan verir. Seniorluq review-u qazanmaq deyil, komandanın
review keyfiyyətini yüksəltməkdir.

### 7. Mənbələr

- [The Standard of Code Review — Google eng-practices](https://google.github.io/eng-practices/review/reviewer/standard.html)
- [How to do a code review — Google eng-practices](https://google.github.io/eng-practices/review/reviewer/)
- [Good Code Reviews, Better Code Reviews — The Pragmatic Engineer](https://blog.pragmaticengineer.com/good-code-reviews-better-code-reviews/)

---

## 13.2 RFC yazmaq

### 1. Niyə senior səviyyəsində vacib

RFC (Request for Comments) — senior mühəndisin şirkət miqyasında qərara təsir
etmə vasitəsidir, kod yazmadan. Mid developer tapşırığı görüb icra edir; senior
developer isə "biz bunu niyə və necə edəcəyik" sualını yazıya köçürüb, kimin
haqlı olduğunu deyil, **hansı arqumentin daha güclü olduğunu** aydınlaşdırır.
Bu bacarıq həm müsahibədə ("bir texniki qərarı necə komunikasiya edərdin?")
həm də real işdə — böyük, geri qaytarılması çətin dəyişikliklər üçün — yoxlanılır.

### 2. Konsepsiyalar ilk prinsiplərdən

**RFC niyə "qərar sənədi" deyil, "müzakirə sənədi"dir.** Bu, ən çox səhv
başa düşülən məqamdır. Əgər RFC kodu artıq yazılandan sonra, "təsdiq üçün"
yazılırsa, o, artıq RFC deyil — ritualdır. RFC-nin əsl dəyəri ondadır ki, **mətni
dəyişmək kodu dəyişməkdən dəfələrlə ucuzdur** — səhv istiqaməti kağız üzərində
tapmaq, onu istehsalda tapmaqdan qat-qat ucuzdur. Increment jurnalının
formalaşdırdığı kimi, RFC-lər bəzi təşkilatların rəhbərlik dekretiylə qərar
qəbul etməsinə qarşı **daha bərabərhüquqlu (egalitarian) yanaşmadır** — böyük
qərarları şəffaf sənədləşdirmək komandanın hər üzvünə, təcrübəsindən asılı
olmayaraq, müzakirəyə qatılmaq imkanı verir.

**Niyə hər dəyişiklik RFC tələb etmir.** RFC yazmaq özü xərcdir (vaxt, gözləmə,
koordinasiya). Test sualı: *"6 ay sonra başqa bir mühəndis bu qərarın niyə
belə verildiyini bilmək istəyərdimi?"* və *"bu dəyişiklik səni geri
qaytarılması ağır olan bir istiqamətə bağlayırmı?"* Əgər cavab "hə"dirsə —
RFC yaz. Yeni mikroservis, storage sistemini dəyişmək, təşkilat miqyaslı
sistem qəbul etmək — bəli. API endpoint-in adını dəyişmək, kiçik kitabxana
yenilənməsi — yox. (Bu, praktikaçı yazılarından (Cloudflare/Stripe/Oxide
nümunələri üzərində qurulmuş müşahidə) götürülüb, elmi araşdırma deyil, amma
sənaye praktikasında geniş yayılmış həndəsi qaydadır.)

**Niyə "Alternatives Considered" və "Open Questions" bölmələri məcburidir.**
Komandaların ən çox atladığı bölmələr elə bunlardır — və praktikaçıların
müşahidəsinə görə, elə "işi görən" bölmələr də bunlardır. Səbəbi sadədir: əgər
sən yalnız bir həll yolu təklif edirsən, oxuyucu sənin niyə digər yolları rədd
etdiyini bilmir — bu da o deməkdir ki, sənin qərarın əslində sınaqdan
keçirilməyib, sadəcə elan olunub.

**Böyük miqyasda RFC-nin problemi — Uber nümunəsi.** Uber əvvəlcə "DUCKs" adlı
sənədlərdən RFC-yə keçdi, komanda böyüdükcə (2000+ mühəndis) həftəlik RFC sayı
o qədər artdı ki, "gurultu" (noise) və Google Docs-da tapıla bilməmə problemi
yarandı — bu, nəticədə axtarıla bilən alət və rəsmi approver sahələri tələb
etdi. Spotify isə bunu fərqli həll edir: əvvəlcə **"böyük mənzərə" RFC** yazır
(problemi yuxarıdan görmək üçün), sonra konkret alt-problemlər üçün **kiçik,
fokuslanmış RFC-lər**.

### 3. Praktiki nümunə

RFC şablonu (Rust RFC strukturu + praktikaçı təcrübəsindən (Cloudflare/Stripe/Oxide
tərzi) götürülmüş konkret bölmələrin birləşməsi):

```markdown
# RFC-023: Client-side auth token saxlama üsulunu dəyişmək

**Status:** Draft → Review (7 gün açıq, 12-40 mühəndisli komanda üçün)
**Approvers:** @frontend-platform-lead, @security-lead
**Author:** [ad]

## 1. Problem (kəmiyyətləndirilmiş)
Hazırda auth access token `localStorage`-da saxlanılır. Son 6 ayda 3 XSS
zəifliyi (aşağı-severity, patched) tapıldı; hər biri token oğurluğu riski
daşıyırdı. Security audit bunu "High" prioritetli tapıntı kimi işarələdi.

## 2. Təklif (bir abzasda)
Access/refresh token-ları `httpOnly`, `Secure`, `SameSite=Strict` cookie-yə
köçürürük və client-side JS-in birbaşa token-a çıxışını kəsirik (BFF pattern).

## 3. Alternatives considered (minimum 2)
- **A: Token-u yenə localStorage-da saxla, amma CSP-ni sərtləşdir.**
  Rədd edildi — CSP XSS-i azaldır, aradan götürmür; kök səbəbi həll etmir.
- **B: In-memory (yalnız JS dəyişəni) saxlama.**
  Rədd edildi — səhifə yenilənəndə (refresh) istifadəçi çıxış edir, UX-ə
  ziddir, biznes bunu qəbul etməyəcək.
- **C (seçildi): httpOnly cookie + BFF.** Server tərəfi əlavə mürəkkəblik
  qatır, amma XSS-dən token oğurluğunu memarlıq səviyyəsində aradan götürür.

## 4. Tradeoffs & risks
- (+) XSS token oğurluğu riski praktik olaraq sıfıra düşür.
- (–) CSRF qoruması indi məcburidir (`SameSite=Strict` kifayət etməyəcəyi
  hallar var, məs. cross-site redirect flow-ları) — əlavə iş.
- (–) Mobile app-lər cookie-ni fərqli idarə edir — ayrı təhlil lazımdır (bax
  Open questions).
- Revert yolu: BFF qatını saxlayıb, cookie-dən yenə localStorage-a geri
  keçmək mümkündür, amma bu, security nailiyyətini sıfırlayar — real geri
  qaytarma yolu yoxdur, ona görə bu RFC lazımdır.

## 5. Success criteria
- Security scan-də XSS→token-theft vektoru "N/A" statusuna keçir.
- P95 login latency +50ms-dən çox artmır (BFF hop-u üçün büdcə).

## 6. Open questions (həqiqi, gizlədilməyən)
- Mobile app komandası hələ razılaşmayıb — cookie-based auth onların
  native HTTP client-ində necə işləyəcək? (Cavab bu RFC-nin qəbulu üçün
  şərt deyil, amma rollout planına təsir edəcək.)
- Refresh token rotation-un rate-limit dəyərləri hələ security ilə
  razılaşdırılmayıb.
```

**Edge-case: münaqişəli fikir necə həll olunur.** Yuxarıdaki RFC-də mobile
komanda B variantını israr etsə (UX prioritetdir desələr), müəllif "Open
questions" bölməsinə onların etirazını **öz sözləri ilə** əlavə edir, silmir —
çünki RFC-nin dəyəri məhz razılaşmayan səsi görünən saxlamaqdadır. Əgər 7 günlük
review pəncərəsində razılaşma çıxmasa, security-lead (approver) qərar verir,
amma mobile komandanın etirazı sənəddə qalır — 6 ay sonra kim soruşsa,
"bu narahatlıq var idi, bu səbəbdən qəbul edildi" izi görünür.

### 4. Senior-level tələlər

- **RFC-ni kod yazıldıqdan sonra "təsdiq mərasimi" kimi yazmaq.** Bu, ən böyük
  anti-pattern-dir — RFC-nin bütün dəyərini (ucuz mərhələdə səhvi tapmaq)
  sıfırlayır.
- **"Alternatives considered" və "Open questions" bölmələrini boş və ya
  formal keçmək.** Praktikaçıların qeyd etdiyi kimi, bunlar məhz "işi görən"
  bölmələrdir — atlanılanda RFC "elan"a çevrilir.
- **Motivasiyanı kəmiyyətləndirmədən yazmaq.** "Kod daha təmiz olar" — bu,
  arqument deyil. "3 insidentdə bu kod səbəb oldu" — bu, arqumentdir.
- **Bir RFC-də hər şeyi həll etməyə çalışmaq.** Böyük, çox-domenli RFC-lər
  review-u iflic edir; Spotify-ın etdiyi kimi böyük-mənzərə + fokuslanmış
  alt-RFC-lərə böl.
- **Review pəncərəsini səhv seçmək.** 3 gündən az — senior mühəndislər oxumadan
  "default approve" edir (yarış effekti). 14 gündən çox — müzakirə diqqətini
  itirir, layihə "unudulur".

### 5. Trade-off / dizayn sualları

1. RFC-ni prototip/spike-dan əvvəl, yoxsa sonra yazmaq daha yaxşıdır — hər
   birinin nə üstünlüyü var?
2. Açıq, hamının şərh yaza bildiyi RFC vs təyin olunmuş approver-lərlə məhdud
   RFC — security-critical dəyişiklik üçün hansı daha uyğundur?
3. Bir böyük RFC vs böyük-mənzərə + neçə fokuslanmış alt-RFC (Spotify modeli) —
   miqyasda hansı daha yaxşı işləyir və niyə?
4. 5 nəfərlik komanda üçün 3 günlük review pəncərəsi kifayətdir, 200 nəfərlik
   təşkilatda niyə 10-14 günə qədər uzanmalıdır?

### 6. Mock müsahibə sual-cavabları

**S: REST-dən GraphQL-ə keçid üçün RFC-nin strukturunu qısaca izah et.**
C: Problem bölməsində konkret ağrını göstərirəm (məs. over-fetching, N sayda
endpoint saxlamaq xərci); Proposal-da miqrasiya strategiyasını (paralel işləmə,
kəskin keçid yox); Alternatives-də "yalnız BFF ilə aggregate et" kimi
variantları niyə rədd etdiyimi; Tradeoffs-da client bundle ölçüsü artımı və
öyrənmə əyrisini; Success criteria-da over-fetching metrikasının azalmasını;
Open questions-da hansı komandaların hələ tooling-ə hazır olmadığını yazardım.

**S: RFC-nə review pəncərəsində heç kim şərh yazmır. Nə edirsən?**
C: Əvvəlcə özümdən soruşuram — RFC aydın yazılıbmı, yoxsa oxumaq üçün çox
uzun/qeyri-müəyyəndir? Sonra əsas stakeholder-lərə birbaşa müraciət edirəm
("bu bölməyə xüsusilə baxa bilərsən?") — sükutu "razılıq" kimi qəbul etmirəm,
çünki bu, RFC-nin əsl məqsədini (fikir toplamaq) məğlub edir.

**S: Hansı dəyişiklik RFC tələb etmir?**
C: Geri qaytarıla bilən, tək komandaya təsir edən, mövcud pattern-i təkrarlayan
dəyişikliklər. Testim: "6 ay sonra kimsə bunun niyəsini soruşacaqmı?" və "bu
məni geri dönüşü ağır olan yola aparırmı?" — hər ikisinə "yox" cavabı RFC-siz
davam etməyə işarədir.

### 7. Mənbələr

- [rfcs/0000-template.md — Rust RFC Book](https://github.com/rust-lang/rfcs/blob/master/0000-template.md)
- [Planning for change with RFCs — Increment](https://increment.com/planning/planning-with-requests-for-comments/)
- [RFC Process for Engineering Teams: Template + Real Examples — PanDev Metrics](https://pandev-metrics.com/docs/blog/rfc-process-engineering-teams)
- [Engineering Planning with RFCs, Design Documents and ADRs — The Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/rfcs-and-design-docs)
- [When Should I Write an Architecture Decision Record — Spotify Engineering](https://engineering.atspotify.com/2020/04/when-should-i-write-an-architecture-decision-record)

---

## 13.3 Technical Proposal

### 1. Niyə senior səviyyəsində vacib

RFC "niyə bu istiqamətə" sualına cavab verirsə, Technical Proposal (Technical
Design Doc) "necə konkret quracağıq" sualına cavab verir. Senior mühəndis
həftələrlə iş tələb edən şeyi kodlaşdırmadan əvvəl bu sənədlə komandasından
"bunu belə edəcəm, riskləri bunlardır, geri dönüş yolu budur" təsdiqini alır —
beləliklə uğursuzluq kod yazılandan sonra deyil, plan mərhələsində üzə çıxır.

### 2. Konsepsiyalar ilk prinsiplərdən

Sənəd iyerarxiyasını başa düşmək vacibdir, çünki adları qarışdırmaq (hamısına
"RFC" demək) audiensiya və dəqiqlik səviyyəsini itirir:

- **PRD** — "istifadəçi nə görməlidir" (product, nə).
- **RFC / Design doc (problem məkanı)** — "biz bu problemi hansı istiqamətdə
  həll edəcəyik, niyə" — geniş, şirkət/komanda miqyaslı audiensiya, açıq
  müzakirə.
- **Technical Proposal (həll məkanı)** — "seçilmiş istiqaməti konkret necə
  tikəcəyik" — daha dar audiensiya (öz komandan + birbaşa asılı komandalar),
  məqsəd əsasən **sign-off və feasibility yoxlaması**, açıq debate deyil.
- **ADR** — nəticənin daimi qeydi (bax 13.9).

**Niyə "Non-goals" bölməsi olmadan sənəd işləmir.** Technical Proposal-un ən
çox unudulan hissəsi elə budur. Skope aydın sərhəd qoyulmasa, review comment-ləri
"bəs bunu da etsək?" suallarıyla dolur və sənəd əsl məqsədindən (feasibility
təsdiqi) yayınıb ideya generatoruna çevrilir. Non-goals yazmaq = "bu, gələcək
problemdir, indi yox" demək gücü.

**Niyə rollback planı olmadan "təsdiq" mənasızdır.** Əgər sənəddə geri qayıtma
yolu yoxdursa, təsdiq verən şəxs əslində nəyi təsdiqlədiyini bilmir — çünki
istehsala çıxdıqdan sonra səhv aşkarlansa, "geri qayıda bilərikmi" sualının
cavabı planlaşdırılmayıb deməkdir. Bu, ~2 həftədən çox çəkən layihələr üçün
"one-pager" (qısa PRD+brief) kifayət etməməsinin əsas səbəbidir.

### 3. Praktiki nümunə

```markdown
# Tech Proposal: Checkout formunu React Hook Form-a keçirmək

## Context
Hazırkı checkout forması 340 sətirlik custom state idarəetməsi ilə yazılıb,
6 aydır 4 form-bug production-a çıxıb (əsasən validasiya vaxtlaması səhvləri).

## Goals
- Sahə-səviyyəli validasiyanı React Hook Form + Zod-a köçürmək.
- Bundle ölçüsündə +8kb-dan çox artım olmamalı.

## Non-goals
- Checkout-un UI/UX-ini yenidən dizayn etmək (ayrı layihədir, bu proposal-ın
  hissəsi deyil — kim təklif etsə, ayrı ticket açılsın).
- Digər formaları (profil, axtarış filtri) köçürmək — yalnız checkout.

## Proposed solution
1. Faza 1 (3 gün): schema-ları Zod ilə yaz, testlə (mövcud kodla paralel).
2. Faza 2 (4 gün): forma komponentini keçir, feature flag arxasında
   (`ff-checkout-rhf`) 5% trafik.
3. Faza 3 (3 gün): metrikaları müşahidə et (form abandon rate, error rate),
   100%-ə qədər artır.

## Alternatives
- Formik: rədd edildi — bundle ölçüsü 2x böyükdür, aktiv inkişaf tempi aşağıdır.
- Custom state-i saxlamaq, yalnız bug-ları düzəltmək: rədd edildi — kök
  problem (state-in əl ilə idarəsi) qalır, yeni bug-lar gələcək.

## Risks & mitigations
- Risk: feature flag səhv konfiqurasiya ilə 100% trafikə düşə bilər →
  Mitigation: flag dəyişikliyi ayrı PR, kod review tələb edir.
- Risk: Zod schema mövcud backend validasiya qaydalarından fərqlənə bilər →
  Mitigation: Faza 1-də hər sahə üçün contract test yazılır.

## Rollback plan
Feature flag-ı 0%-ə qaytarmaq — kod dəyişikliyi tələb etmir, 1 dəqiqədən az.

## Timeline & owners
Faza 1-3: [ad], 10 iş günü. Review: @frontend-lead, @qa-lead.
```

**Edge-case:** Layihə ortasında dizayn komandası "bu, checkout-un UX-ini də
yeniləmək üçün yaxşı fürsətdir" desə — Non-goals bölməsinə istinad edilir,
yeni istək rədd edilmir, sadəcə "bu proposal-ın əhatəsindən kənardır, ayrı
tech proposal/RFC lazımdır" cavabı verilir. Bu, scope creep-in institusional
müdafiəsidir.

### 4. Senior-level tələlər

- **Non-goals bölməsinin olmaması** → hər review "bəs bunu da?" sualına
  çevrilir, layihə heç vaxt bitmir.
- **Rollback planı yazılmayıb** → "təsdiq" faktiki risk qiymətləndirməsi
  olmadan verilir.
- **Yalnız bir həll təqdim etmək, alternativsiz.** Oxuyucu qərarın nə qədər
  ciddi düşünüldüyünü qiymətləndirə bilmir.
- **Sənədi kod artıq yazılandan sonra, post-hoc əsaslandırma üçün yazmaq.**
  Bu, RFC-dəki eyni anti-pattern-in Technical Proposal versiyasıdır.
- **Qeyri-mühəndis stakeholder-lərin məhdudiyyətlərini (dəstək xərci, hüquqi
  tələblər, data saxlama müddəti) nəzərə almamaq** — texniki cəhətdən düzgün
  plan, biznes tərəfindən rədd edilə bilər.

### 5. Trade-off / dizayn sualları

1. One-pager (qısa PRD+brief) hansı ölçüdəki işə qədər kifayət edir, hansı
   həddən sonra tam Technical Proposal lazımdır?
2. Çox detal (analysis paralysis) vs az detal (mənasız təsdiq) — sərhəd necə
   müəyyənləşdirilir?
3. Cloud xərc qiymətləndirməsi proposal-ın hissəsi olmalıdırmı, kim yazmalıdır?
4. Proposal təsdiqləndikdən sonra tətbiq zamanı böyük fərq aşkarlansa —
   yenidən təsdiq lazımdırmı, yoxsa mühəndis öz mühakiməsi ilə davam edə bilər?

### 6. Mock müsahibə sual-cavabları

**S: Monolit API endpoint-i ayrıca mikroservisə köçürmə təklifini necə
yazardın?**
C: Context-də hazırkı ağrını (məs. scaling və ya deploy asılılığı) göstərərdim,
Non-goals-da "bu, digər endpoint-ləri köçürmək demək deyil" aydınlaşdırardım,
Proposed solution-da faza-faza miqrasiya (strangler fig pattern) yazardım,
Risks-də data consistency riskini və dual-write mərhələsini, Rollback plan-da
köhnə endpoint-i saxlamağın nə vaxta qədər mümkün olduğunu qeyd edərdim.

**S: RFC ilə Technical Proposal arasındaki fərq nədir, nə vaxt hər ikisi
lazımdır?**
C: RFC problem məkanında geniş razılaşma axtarır ("bu istiqamətə gedəkmi").
Technical Proposal artıq seçilmiş istiqaməti necə tikəcəyini dəqiqləşdirir,
daha dar audiensiya üçün, sign-off məqsədilə. Böyük, qeyri-müəyyən qərarlar
üçün əvvəl RFC, sonra onun nəticəsinə əsaslanan Technical Proposal — kiçik,
artıq razılaşılmış istiqamətli işlər üçün birbaşa Technical Proposal kifayətdir.

### 7. Mənbələr

- [Companies Using RFCs or Design Docs and Examples of These — The Pragmatic Engineer](https://blog.pragmaticengineer.com/rfcs-and-design-docs/)
- [RFCs: Lightweight Technical Designs — Casper Tech Blog](https://medium.com/caspertechteam/rfcs-lightweight-technical-designs-a508d93ccd34)
- [PRD vs Product Brief vs Spec — ideaplan.io](https://www.ideaplan.io/compare/prd-vs-product-brief-vs-product-spec)

---

## 13.4 Mentoring

### 1. Niyə senior səviyyəsində vacib

Junior/mid developer öz outputu ilə ölçülür. Senior/staff developer isə
ətrafındakı insanların outputu ilə də ölçülür — Will Larson-ın yazdığı kimi,
staff mühəndislərin bütün arxetiplərinin (Tech Lead, Architect, Solver,
Right Hand) ortaq təməli texniki istiqamət, "glue work" və **mentorship +
sponsorship**dir. Müsahibədə "komandanı necə böyüdürsən" sualı məhz bunu
yoxlayır.

### 2. Konsepsiyalar ilk prinsiplərdən

**Mentoring vs Sponsorship — niyə ikisi fərqlidir və niyə ikinci daha çox
"leverage" verir.** Will Larson-a görə mentorship "təcrübəni və məsləhəti
paylaşmaq, davam edən əlaqə vasitəsilə" — bu, sənin vaxtınla xətti (linear)
məhdudlaşır: bir saat mentoring = bir saat sənin vaxtın. Sponsorship isə
"tərəziyə birbaşa barmaq basmaq" — konkret adı gündəmə çəkmək (məsələn,
promotion komitəsində, ya da "bu layihəni ona ver" deyəndə) — bu, sənin
mövqe/etimad kapitalını istifadə edir, xətti deyil, çünki bir cümlə (görünməz
otaqda söylənən bir tövsiyə) mentee-nin karyerasına mentoring saatlarından
qat-qat çox təsir edə bilər. Ona görə Larson yazır: ən effektiv staff
mühəndislər **orta səviyyəli mentoring ilə xeyli çox sponsorship-i
birləşdirir** — bilik ötürməkdən çox, insanları irəli itələməyə fokuslanırlar.

**Niyə "kömək etmək" kifayət deyil.** Mentoring-in məqsədi mentee-nin özü
öyrənməsidir — onun əvəzinə problemi həll etmək, öyrənməni əvəzinə deyil,
əvəzinə edir. Sponsorship isə ictimai görünürlükdür: mentee otaqda olmayanda
onun adını çəkmək. Yalnız birinci olub ikincisi olmayan senior — "yaxşı
insandır", amma komandanı böyütmür, çünki onun yaxşılığı görünməzdir
(promotion committee-si onu bilmir).

### 3. Praktiki nümunə

1:1 böyümə söhbəti üçün struktur + real sponsorship hərəkəti nümunəsi:

```markdown
## 1:1 Growth Conversation — Şablon

**Məqsəd (bu rübdə):** Mentee öz sözləri ilə — "React performans debugging-də
özünə inam qazanmaq".

**Son 2 həftədə müşahidə:**
- Güclü: Profiler ilə re-render mənbəyini tapdı, öz başına.
- Böyümə sahəsi: həllin niyə işlədiyini izah edərkən çətinlik çəkir —
  "işə düşdü" deyir, "bu, memoization referans bərabərliyini qorudu deyə
  işlədi" demir.

**Stretch tapşırıq:** Növbəti sprint-də performans debugging-i ilə bağlı
komanda üçün 15 dəqiqəlik "brown bag" sessiyası apar — bu, bilməyi izah
etmə bacarığını gücləndirəcək.

**Sponsorship hərəkəti (mentorun etdiyi, mentee-nin bilmədiyi):**
> (Komanda kanalında, mentee iştirak etmədən) "Q3-ün performans layihəsinin
> texniki lead-i üçün [mentee adı]-nı təklif edirəm — son ayda profiling
> bacarığında gördüyüm irəliləyişə görə. Mən arxa dəstək verərəm."
```

**Edge-case: mentee açıq deyil / gözləntilər uyğun gəlmir.** Əgər mentee
feedback-ə müdafiə mövqeyi ilə cavab verirsə ("mən onsuz da bilirdim"), birbaşa
"bunu qəbul et" demək əksinə işləyir. Bunun əvəzinə: "Sən bunu bilirdinsə,
yaxşı — gəl birlikdə görək, komandanın yarısı bunu bilmir, sən onlara necə
izah edərdin?" — bu, eqoya toxunmadan eyni böyümə məqsədinə aparır.

### 4. Senior-level tələlər

- **Mentoring = işi mentee əvəzinə etmək.** Bu, öyrənməni əngəlləyir, "kömək"
  kimi görünsə də.
- **Yalnız özünə bənzəyənləri mentor etmək** ("mini-me" effekti) — komandanın
  müxtəlifliyini və gizli istedadları gözdən qaçırır.
- **Mentoring-i performans qiymətləndirməsi ilə qarışdırmaq.** Mentor —
  təhlükəsiz, qiymətləndirməyən əlaqədir; menecerlik fərqli rol daşıyır.
- **Yalnız mentoring, sponsorship yox.** Otaqda olmayanda adını çəkməyən
  "mentor" — mentee-nin böyüməsini görünməz saxlayır.
- **Sponsorship-i şəffaflıqsız etmək** — mentee-nin bilmədiyi halda ona qarşı
  qərar vermək (məsələn, layihəni ona verib niyə seçdiyini izah etməmək) —
  bu, öyrənmə əvəzinə qeyri-müəyyənlik yaradır.

### 5. Trade-off / dizayn sualları

1. Vaxt-məhdud (time-boxed) mentoring proqramı vs açıq-uçlu, üzvi əlaqə —
   hansı daha davamlıdır?
2. Mentee-nin böyüməsi qısamüddətli komanda sürətinə zidd olduqda (o, öyrənmək
   üçün daha çox vaxt aparır) — nə qədər güzəşt verilməlidir?
3. Özünün də maraqlandığı yüksək-görünürlüklü layihəyə mentee-ni sponsor
   etmək — bu münaqişəni necə idarə edirsən?
4. Sponsorship üçün "kifayət qədər sübut" nə deməkdir — bir uğurlu layihə,
   yoxsa ardıcıl nümunə lazımdır?

### 6. Mock müsahibə sual-cavabları

**S: Kiminsə böyüməsinə köməklik etdiyin bir nümunə danış.**
C: Konkret bacarıq boşluğunu (məs. debugging izahı) müşahidə etdim, ona
konkret, ölçülə bilən stretch tapşırıq verdim (komandaya təqdimat), və
paralel olaraq onun bilmədiyi halda idarəçiyə/layihə seçimində adını çəkdim —
mentoring (bacarıq) ilə sponsorship (görünürlük) birlikdə işlədi.

**S: Yüksək-görünürlüklü layihəyə kimi sponsor edəcəyini necə seçirsən?**
C: Keçmiş nümunəyə baxıram — artıq kiçik miqyasda oxşar bacarığı göstərmiş
adamı seçirəm, sırf potensialına görə yox. Həmçinin özümə bənzəməyən adamları
da nəzərdən keçirirəm — "mini-me" bias-ının qurbanı olmamaq üçün şüurlu
addım atıram.

### 7. Mənbələr

- [What do Staff engineers actually do? — Will Larson, Irrational Exuberance](https://lethain.com/what-do-staff-engineers-actually-do/)
- [Staff Engineer: Leadership beyond the management track — staffeng.com](https://staffeng.com/book/)

---

## 13.5 Planning

### 1. Niyə senior səviyyəsində vacib

Junior developer-ə ticket verilir, o icra edir. Senior developer isə qeyri-müəyyən
məqsədi ("checkout-u sürətləndirək") icra oluna bilən mərhələlərə çevirir —
asılılıqları, kritik yolu və qeyri-müəyyənlikləri əvvəldən görür. Planlaşdırma
bacarığının yoxluğu ən çox "layihə niyə gecikdi" post-mortem-lərinin kök
səbəbi kimi çıxır.

### 2. Konsepsiyalar ilk prinsiplərdən

Planın əsl dəyəri sənədin özü deyil — **məcburən üzə çıxardığı naməlumlardır.**
Bu, RFC-nin əsl dəyərinin də niyə mətndə olduğuna bənzəyir (bax 13.2): plan
yazmaq səni "bu tapşırıq X komandadan asılıdır, amma onlar hələ cavab
verməyib" kimi faktları kağıza köçürməyə məcbur edir — bu fakt yazılmasa,
o, layihənin ortasında "gözlənilməz" sürpriz kimi çıxacaq.

**RAID-in planlaşdırmadakı rolu.** RAID (Risks, Assumptions, Issues,
Dependencies) jurnalı layihənin başlanğıc planlaşdırma seansında yaradılır —
komanda məlum riskləri, işlədiyi fərziyyələri, artıq bilinən problemləri və
əsas asılılıqları xəritələndirir. Fərq: **Risk** — ola bilər, hələ olmayıb;
**Issue** — artıq baş verib, dərhal həll tələb edir; **Assumption** — komandanın
doğru olduğunu güman etdiyi, təsdiqlənməmiş fakt (məsələn, "backend komandası
API-ni vaxtında hazırlayacaq"); **Dependency** — bir tapşırığın başqasının
bitməsinə bağlı olması.

**Niyə hər şeyi əvvəlcədən 100% dəqiqliklə planlaşdırmaq mümkün deyil.**
Bu, Cone of Uncertainty-nin (bax 13.6) planlaşdırmaya təsiridir — layihənin
əvvəlində variabellik strukturaldır, bacarıqdan asılı deyil. Ona görə yaxşı
plan "hər şeyi indi bil" demir, "növbəti mərhələdə nəyi bilməli olduğumu bil"
deyir — mərhələlər arasında "revisit" nöqtələri qoyur.

### 3. Praktiki nümunə

```markdown
# Plan: CRA-dan Next.js App Router-ə miqrasiya (14-səhifəlik admin panel)

## Milestones (exit criteria ilə)
| Faza | Nə | Exit criteria | Müddət |
|---|---|---|---|
| M1 | Routing skeleton, 1 səhifə pilot | Pilot səhifə prod-da, metrika fərqi yoxdur | 1 həftə |
| M2 | Qalan 13 səhifə, komponent-be-komponent | Bütün səhifələr paritetdə | 3 həftə |
| M3 | CRA build-i sil, CI/CD təmizlə | Köhnə pipeline söndürülür | 3 gün |

## Kritik yol
Routing skeleton (M1) → Auth middleware köçürülməsi (bütün səhifələr buna
bağlıdır) → qalan səhifələr paralel gedə bilər.

## RAID
| Tip | Qeyd | Sahib | Trigger/tədbir |
|---|---|---|---|
| Risk | Auth middleware-in App Router-də cookie handling-i fərqlidir | [ad] | M1-də sınaqdan keçir, uğursuz olsa 2 gün buffer |
| Assumption | Design komandası mövcud CSS-i saxlamağa razıdır (yenidən dizayn yoxdur) | [ad] | M1 başlamazdan əvvəl təsdiqlə |
| Dependency | Backend komandası SSR üçün CORS qaydalarını yeniləməlidir | Backend team | M1-ə qədər tələb olunur, hələ təsdiqlənməyib |
| Issue | (hələ yoxdur) | — | — |

## Növbəti "revisit" nöqtəsi
M1 bitəndə plan yenidən nəzərdən keçirilir — pilot səhifədən öyrənilənlər
M2-nin müddət qiymətləndirməsinə təsir edə bilər.
```

**Edge-case: asılılıq gecikir.** Backend komandası CORS dəyişikliyini vaxtında
etmirsə — bu, RAID cədvəlində əvvəldən "Dependency" kimi qeyd olunduğu üçün,
komanda təəccüblənmir, əvvəlcədən müəyyənləşdirilmiş mitigation-a keçir (məs.
M1-i backend-siz test mühitində sınamaq) — plan yenidən yazılmır, çünki risk
artıq nəzərdə tutulmuşdu.

### 4. Senior-level tələlər

- **Cone of Uncertainty-ni nəzərə almadan 100% dəqiq plan yazmaq.** Layihənin
  əvvəlində hər tapşırığa saat həsabı vermək — struktural qeyri-müəyyənliyi
  gizlədir, açmır.
- **"Non-goals" olmadan plan** — scope aydın kəsilməyəndə, plan tez köhnəlir.
- **Planı statik sənəd kimi yazıb bir daha açmamaq.** Plan mərhələ bitdikcə
  yenidən baxılmalıdır, ilk versiya "müqəddəs" deyil.
- **Bütün tapşırıqlara bərabər çəki vermək, kritik yolu görməmək.** Kritik
  olmayan tapşırıq gecikəndə lazımsız təlaş yaranır, əsl blocker gözdən qaçır.
- **RAID-i doldurub bir daha açmamaq.** Risk jurnalı "vaxtaşırı yoxlanılan
  canlı sənəd" olmalıdır, "bir dəfə yazılıb arxivlənən" sənəd yox.

### 5. Trade-off / dizayn sualları

1. Böyük upfront plan vs "rolling wave" (yalnız növbəti mərhələni dəqiq
   planlaşdır) — 2-həftəlik layihə ilə 2-rüblük layihə üçün fərq nədir?
2. Planlaşdırmaya nə qədər vaxt sərf etməli — 2 həftəlik işə 1 gün planlaşdırma
   normaldırmı, yoxsa çoxdur?
3. Ortada plan dəyişməli olsa (yeni məlumat gəlsə) — nə vaxt "davam et", nə
   vaxt "yenidən planlaşdır" seçilməlidir?
4. Kritik yol dəyişəndə (məs. gözlənilməz blocker) bunu kimlərə, necə
   kommunikasiya edirsən?

### 6. Mock müsahibə sual-cavabları

**S: 50 səhifəlik CRA app-ini Next.js App Router-ə necə planlaşdırardın?**
C: Əvvəlcə bir pilot səhifə ilə riskləri (auth, routing fərqləri) erkən üzə
çıxarardım, sonra kritik yolu (auth middleware bütün səhifələr üçün blocker)
müəyyən edərdim, qalan səhifələri paralel işə bölərdim. RAID jurnalına backend
asılılıqlarını və dizayn fərziyyələrini əvvəlcədən yazardım ki, gecikmə
sürpriz olmasın.

**S: Planlaşdırdığın layihə ortada böyük bir gözlənilməz problemlə üzləşdi.
Nə edirsən?**
C: Əvvəlcə bunun Issue (artıq baş verib) olduğunu RAID-ə yazıram, kritik yola
təsirini qiymətləndirirəm, sonra stakeholder-lərə (bax 13.8) yeni reallığı —
range və trade-off ilə — kommunikasiya edirəm, təkbaşına "hələ görək"
demirəm.

### 7. Mənbələr

- [The Cone of Uncertainty — Construx Software](https://www.construx.com/books/the-cone-of-uncertainty/)
- [Short Guide to RAID — theirm.org](https://www.theirm.org/media/2517814/7-short-guide-raid.pdf)
- [What Is a RAID Log and Why Should I Use One? — ProjectManager](https://www.projectmanager.com/blog/raid-log-use-one)

---

## 13.6 Estimation

### 1. Niyə senior səviyyəsində vacib

Rəhbərlik büdcəni, işə qəbulu, roadmap-i sənin estimation-una əsaslanaraq
planlaşdırır. Səhv estimation zəncirvari şəkildə "death march" layihələrə,
komandanın etibarının itməsinə gətirir. Senior developer fərqi ondadır ki, о
tək ədəd demir — **estimation-un arxasında nə dayandığını izah edə bilir.**

### 2. Konsepsiyalar ilk prinsiplərdən

**Estimation-dakı variabellik — layihənin özündəki variabelliyin əksidir.**
Steve McConnell-in "Cone of Uncertainty" konsepsiyasına görə: estimation-un
qeyri-dəqiqliyinin səbəbi bacarıqsızlıq deyil — layihənin özü hələ tam
müəyyənləşməyib. Layihənin lap əvvəlində (initial concept) — konkret tələblər,
dizayn, komanda tərkibi hələ dəqiqləşməyib — estimation xətası **4x yuxarı,
4x aşağı ola bilər, cəmi 16x aralıq!** Bu, bacarıqlı estimator-ların **ən
yaxşı halda** əldə edə biləcəyi dəqiqlikdir — McConnell özü xəbərdarlıq edir:
"bundan daha pis etmək çox asandır."

**Cone necə "daralır".** Qeyri-müəyyənlik zamanla özbaşına azalmır — yalnız
**qərarlar veriləndə** azalır: məhsul vizyonunu müəyyənləşdirmək (nəyi
etməyəcəyini də daxil edərək) variabelliyi azaldır, tələbləri dəqiqləşdirmək
daha da azaldır. Yəni estimation-u yaxşılaşdırmaq üçün "daha çox düşünmək"
kifayət deyil — **qərar vermək** lazımdır.

**Niyə tək ədəd (single number) zərərlidir.** Tək ədəd — "3 həftə" — real
qeyri-müəyyənliyi gizlədir və stakeholder tərəfindən **vəd** kimi qəbul
olunur, halbuki o, bir ehtimal aralığının ortasıdır. Range + confidence
(P50/P90) formatı isə qeyri-müəyyənliyi gizlətmədən kommunikasiya edir.

### 3. Praktiki nümunə

```markdown
## Estimation kommunikasiyası: Checkout redesign

**Estimation:** 3-5 həftə (P50: 3 həftə, P90: 5 həftə)

**Bu range-in əsasında olan fərziyyələr:**
- Dizayn spesifikasiyaları M1 başlamazdan əvvəl tamdır (dəyişsə, range yenidən
  hesablanmalıdır).
- Ödəniş provayderi API-si sınaq mühitində sabitdir.
- Komandada 2 tam-vaxt frontend developer var.

**Cone-un mərhələlərlə daralması:**
| Mərhələ | Range | Səbəb |
|---|---|---|
| Kickoff (indi) | 3-5 həftə | Tələblər hələ tam sabit deyil |
| Dizayn təsdiqindən sonra (M1 sonu) | 3.5-4.5 həftə | Əsas naməlum (dizayn) həll olundu |
| API inteqrasiyası bitəndən sonra | 4-4.5 həftə | Yalnız polish/test qalır |

**Stakeholder tək tarix tələb etsə, cavab:**
> "Tək tarix versəm, sənə yalançı dəqiqlik satmış olaram. 3 həftəni planlaşdırma
> tarixi kimi işlədə bilərik, amma dizayn təsdiqindən sonra (1-ci həftənin
> sonu) rəqəmi yenidən dəqiqləşdirəcəyəm — o vaxt qeyri-müəyyənliyin yarısı
> həll olunmuş olacaq."
```

**Edge-case:** Rəhbərlik "amma bizə marketinq üçün konkret tarix lazımdır"
desə — cavab "P90 tarixini (5 həftə) xarici vəd kimi işlət, P50-ni (3 həftə)
daxili hədəf kimi saxla" olur — bu, iki fərqli auditoriyaya iki fərqli
dəqiqlik səviyyəsi təqdim etməkdir, yalan demədən.

### 4. Senior-level tələlər

- **Təzyiq altında tək ədəd vermək, sonra ona "vəd" kimi tutulmaq.** Bu, ən
  çox rast gəlinən tələdir — estimation elan olunan kimi commitment-ə çevrilir.
- **Estimation-u rəhbərliyin istədiyi tarixə "ankraj" etmək** (bottom-up
  yerinə top-down "bizə bu tarixdə lazımdır" - unudulan sual).
- **Cone-un daraldığı mərhələlərdə yenidən qiymətləndirməmək.** Kickoff-da bir
  dəfə estimation verib bir daha ona qayıtmamaq — qeyri-müəyyənliyin real
  azalmasından faydalanmamaq deməkdir.
- **Gizli buffer əlavə etmək.** Şəffaf range əvəzinə "içimdə" vaxt əlavə etmək —
  aşkarlanarsa etibarı sındırır ("niyə əvvəldən demədin?").
- **Yeni, əvvəllər görülməmiş iş üçün köhnə oxşar işin vaxtını mexaniki
  köçürmək** — Cone-a görə naməlum işin qeyri-müəyyənliyi strukturaldır,
  "keçən dəfə 2 həftə çəkdi" arqumenti kifayət etmir.

### 5. Trade-off / dizayn sualları

1. Task-səviyyəli estimation (#NoEstimates tərəfdarlarının rədd etdiyi
   yanaşma) vs flow-based forecasting (keçmiş throughput-a əsaslanan) —
   hansı halda hansı daha etibarlıdır?
2. Buffer-i task səviyyəsində, yoxsa layihə səviyyəsində əlavə etmək daha
   düzgündür?
3. Həddindən artıq dəqiq (fake-dəqiq) estimation nə vaxt həddindən artıq
   geniş range-dən daha zərərlidir?
4. Estimation-u kim verməlidir — icraçı developer, yoxsa tech lead? Fərq
   nəyə görə əhəmiyyətlidir?

### 6. Mock müsahibə sual-cavabları

**S: PM səndən heç vaxt görmədiyin bir işə tək tarix tələb edir. Nə edirsən?**
C: Range + fərziyyələr + "hansı mərhələdə yenidən dəqiqləşdirəcəyimi" təqdim
edirəm. Əgər xarici kommunikasiya üçün tək tarix lazımdırsa, P90-ı (mühafizəkar
ucu) istifadə etməyi təklif edirəm, daxili planlaşdırma üçün P50-ni saxlayıram.

**S: Niyə layihələrin əvvəlində estimation-lar həmişə səhv olur?**
C: Bacarıqsızlıqdan yox — layihənin özündəki struktural qeyri-müəyyənlikdən.
Cone of Uncertainty-yə görə, ilkin konsepsiya mərhələsində xəta payı 4x-4x-ə
qədər çıxa bilər, bu, yaxşı idarə olunan layihələrdə **ən yaxşı halda**
əldə olunan dəqiqlikdir. Ona görə mən estimation-u bir dəfəlik ədəd yox,
mərhələlərlə dəqiqləşən proses kimi təqdim edirəm.

### 7. Mənbələr

- [The Cone of Uncertainty — Construx Software](https://www.construx.com/books/the-cone-of-uncertainty/)
- [The Mysterious Cone of Uncertainty — Coding Horror](https://blog.codinghorror.com/the-mysterious-cone-of-uncertainty/)
- [Software Estimation's Cone of Uncertainty — McConnell (PDF)](https://athena.ecs.csus.edu/~buckley/CSc231_files/McConell_ConeofUncertainty.pdf)

---

## 13.7 Risk Analysis

### 1. Niyə senior səviyyəsində vacib

Junior developer problem yaranandan sonra onu düzəldir. Senior developer
problemin yaranmasından **əvvəl** harada partlaya biləcəyini görür. Bu, "proaktiv
vs reaktiv" fərqidir — və insident post-mortem-lərində ən çox rast gəlinən
cümlə "bunu əvvəlcədən görmək olardı" cümləsidir. Risk analysis bu görmə
işini strukturlaşdırılmış hala salır.

### 2. Konsepsiyalar ilk prinsiplərdən

**Premortem — niyə "nə səhv gedə bilər" sualından daha güclüdür.** Psixoloq
Gary Klein-in 2007-ci ildə Harvard Business Review-da nəşr etdiyi texnika:
adi risk brainstorming-i iki problemə düçar olur — **optimism bias** (komanda
öz planına investisiya edib deyə riski azaldır) və **sosial təzyiq** (heç kim
"əhval-ruhiyyəni öldürən" olmaq istəmir). Premortem bunu tərsinə çevirir:
"Fərz et ki, bu layihə artıq tam iflas edib — niyə?" Nəticə etibarlı: gələcəyi
təsəvvür edən insanlar səbəbi tapmaqda, sadəcə "nə səhv gedə bilər" deyə soruşulan
insanlardan **30% daha yaxşı** nəticə göstərir — çünki "artıq baş verib" çərçivəsi
beyni ehtimaldan qəti fakta keçirir, bu da tənqidi düşünməyə sosial icazə verir.

**RAID-in Risk komponenti — niyə struktur lazımdır.** Sadəcə "bu riskli ola
bilər" demək kifayət deyil — hər risk **ehtimal × təsir**, konkret **sahib**
və **trigger** (nə vaxt/necə aktivləşdiyini biləcəyin işarə) tələb edir.
Struktursuz risk siyahısı unudulur; struktur olan risk jurnalı əməliyyata
çevrilir.

**Risk vs Issue fərqi niyə vacibdir.** Risk — hələ baş verməyib, ehtimaldır.
Issue — artıq baş verib, dərhal həll tələb edir. Bu ikisini qarışdırmaq
komandanı yalnız reaktiv (yalnız issue-lara cavab verən) mədəniyyətə itələyir —
proaktiv risk idarəetməsi itir.

### 3. Praktiki nümunə

```markdown
## Premortem: Micro-frontend miqrasiyası (fərz et ki, layihə iflas edib)

**Sual: "6 ay sonrayıq, layihə tam iflas edib. Niyə?"** — komandadan toplanan
cavablar:

1. "Paylaşılan design system versiyaları sinxronlaşmadı, hər micro-frontend
   fərqli UI göstərdi."
2. "Runtime inteqrasiya (module federation) performansı ağırlaşdırdı, LCP 2x artdı."
3. "Komandalar arası ownership sərhədi aydın olmadığı üçün heç kim shared
   auth kodunu sahiblənmədi."

## Risk Register (premortem-dən çıxan)

| Risk | Ehtimal | Təsir | Mitigation | Sahib | Trigger |
|---|---|---|---|---|---|
| Design system versiya uyğunsuzluğu | Yüksək | Orta | Semver + CI-da versiya yoxlaması | @platform-team | Hər release-də avtomatik yoxlanılır |
| Module federation performans regressiyası | Orta | Yüksək | LCP-ni hər PR-da CI-da ölç, threshold-dan keçməsə blok et | @perf-team | CI pipeline |
| Shared auth kodunun sahibsiz qalması | Yüksək | Yüksək | Auth kodu ayrıca kitabxana, xüsusi sahib komanda təyin olunur | @security-team | Layihə kickoff-unda həll olunmalı, blocker |

## Qəbul edilən risk (mitigation yox, şüurlu qərar)
> "Legacy Angular micro-frontend-in module federation-a uyğunlaşdırılması
> riski var (bilinən uyğunsuzluqlar), amma bu hissə 6 ay sonra tam
> deprecate olunacaq — mitigation-a investisiya etmirik, riski qəbul edirik."
> — qərar sənədləşdirilib, unudulmayıb.
```

**Edge-case:** Yuxarıdaki "qəbul edilən risk" nümunəsi göstərir ki, hər risk
mitigation tələb etmir — bəzən **şüurlu qəbul** düzgün qərardır, amma bu qərar
yazılı, sahibli və gələcəkdə "niyə bunu etmədik" sualına cavab verə bilən
şəkildə olmalıdır, sükutla unudulmamalıdır.

### 4. Senior-level tələlər

- **Risk analysis-i yalnız kickoff-da bir dəfə etmək.** Risk jurnalı canlı
  sənəddir, layihə irəlilədikcə yenilənməlidir.
- **Yalnız texniki riskləri görmək, insan/təşkilat risklərini gözdən
  qaçırmaq** (bir mühəndisin bilik inhisarı, komandalar arası asılılıq).
- **Risk jurnalını "compliance checkbox" kimi doldurub bir daha oxumamaq.**
- **Issue-nu risk kimi, ya da əksinə yazmaq** — bu, reaktiv/proaktiv
  ayrımını itirir və prioritetləşdirməni çətinləşdirir.
- **Adi "nə səhv gedə bilər" brainstorming-i premortem əvəzinə istifadə etmək,
  optimism bias-ı aradan qaldırmadan** — komanda özünə investisiya etdiyi
  planın riskini azaldıb görür.

### 5. Trade-off / dizayn sualları

1. Aşağı-riskli, kiçik launch üçün nə qədər risk analysis vaxtı ayrılmalı,
   yüksək-riskli üçün nə qədər?
2. Accept / Mitigate / Transfer / Avoid — bu 4 strategiya arasında konkret
   necə qərar verilir?
3. Premortem nə vaxt sadə risk brainstorming-dən daha effektiv olur, nə vaxt
   həddindən artıq ağırlıq gətirir?
4. Risk jurnalını kim yeniləməli və nə tezlikdə — bu, layihə ritminə necə
   inteqrasiya olunmalıdır?

### 6. Mock müsahibə sual-cavabları

**S: Yeni checkout axını çıxarmaq üçün mini premortem apar.**
C: "Fərz edək ki, checkout 2 ay sonra tam iflasdır — niyə?" sualı ilə başlardım:
ola bilsin ödəniş provayderinin sandbox-u prod-dan fərqli davranıb, ola bilsin
mobil Safari-də bir edge-case aşkarlanmayıb, ola bilsin analytics event-ləri
düzgün track olunmayıb, biznes qərar vermə məlumatı itirib. Hər birini
ehtimal/təsir ilə qiymətləndirib, ən yüksək ehtimal×təsir olanlara mitigation
təyin edərdim.

**S: Hansı riskləri mitigate etmək, hansını qəbul etmək lazımdır?**
C: Ehtimal × təsir + mitigation-un xərci üçbucağına baxıram. Aşağı ehtimal,
aşağı təsir, amma mitigation xərci yüksəkdirsə — qəbul edirəm, amma bunu
sənədləşdirirəm ki, gələcəkdə "niyə bunu etmədik" sualına cavab ola bilsin.

### 7. Mənbələr

- [pre-mortem method of risk assessment — Gary Klein](https://www.gary-klein.com/premortem)
- [Performing a Project Premortem — Gary Klein (HBR, ResearchGate)](https://www.researchgate.net/publication/3229642_Performing_a_Project_Premortem)
- [Short Guide to RAID — theirm.org](https://www.theirm.org/media/2517814/7-short-guide-raid.pdf)

---

## 13.8 Stakeholder Communication

### 1. Niyə senior səviyyəsində vacib

Kodu bilməyən insanlar (PM, dizayner, rəhbərlik, dəstək komandası, digər
komandalar) sənin işinin nəticəsinə güvənərək öz qərarlarını verir. Mid
developer statusunu "tapşırıq bitdi/bitmədi" səviyyəsində raportlayır. Senior
developer texniki reallığı **auditoriyanın valyutasına** (risk, xərc, tarix,
istifadəçi təsiri) çevirə bilir — bu, "texniki liderlik" adlandırdığımız
şeyin görünən hissəsidir, çünki əksər stakeholder sənin kodunu heç vaxt
görməyəcək, yalnız kommunikasiyanı görəcək.

### 2. Konsepsiyalar ilk prinsiplərdən

**Stakeholder-ləri erkən xəritələndirmək — upstream/downstream.** Tech lead
təcrübəsində geniş qəbul olunan yanaşma: kimdən asılısan (upstream — məsələn,
backend komandası, dizayn) və kim səndən asılıdır (downstream — məsələn,
mobil komanda, dəstək) sualını layihənin əvvəlində, ortasında yox, cavablandır.
Bunu gec etmək — "birdən çıxıb" bir stakeholder-in narazılığı ilə üzləşmək
deməkdir.

**Niyə sükut "hər şey qaydasındadır" kimi oxunur.** Əgər status yalnız
deadline-da verilirsə, stakeholder aralıqdaki sükutu "risk yoxdur" kimi
şərh edir. Ona görə senior kommunikasiya riski **erkən**, hələ həll yolu tam
formalaşmamış olsa belə, bildirir — "narahatlıq var, izləyirəm, X tarixdə
daha dəqiq deyəcəm" formasında, "hər şey əladır" sükutunun əksinə.

**Auditoriyanın valyutası fərqlidir.** Mühəndis komanda daxilində texniki
detala (implementasiya, trade-off) fokuslanır. Rəhbərlik/biznes auditoriyası
isə risk, xərc, tarix təsirinə fokuslanır. Dəstək komandası isə istifadəçi
davranışının necə dəyişəcəyinə fokuslanır. Eyni faktı üç fərqli tərcümədə
təqdim etmək bacarığı — jarqonu itirmədən, məzmunu itirmədən — senior
kommunikasiyanın nüvəsidir.

### 3. Praktiki nümunə

```markdown
## Həftəlik status update — Checkout Redesign (async, yazılı)

**Nə çıxdı:** Yeni ödəniş forması 10% trafikə çıxdı, error rate əvvəlki
versiyadan 0.3% aşağıdır.

**Risk (indi, gizlədilmədən):** Apple Pay inteqrasiyası Safari-nin köhnə
versiyalarında (iOS 15-dən aşağı, istifadəçilərin ~4%-i) uyğun işləmir.
Bu, əvvəlcədən aşkarlanmamış texniki məhdudiyyətdir.

**Qərar tələb olunur (stakeholder-dən):** Bu 4%-i (a) rollout-dan kənarlaşdırıb
sonra həll edək, yoxsa (b) rollout-u 1 həftə saxlayıb indi düzəldək? (a) sürəti
saxlayır, amma bu istifadəçilər üçün köhnə formaya qayıdış tələb edir; (b)
sürəti azaldır, amma vahid təcrübə saxlayır.

**Növbəti checkpoint:** Cümə axşamı, 25%-lik rollout qərarı ilə.
```

```markdown
## Pis xəbər ötürmə skripti (deadline sürüşməsi)

"Checkout redesign üçün ilkin tarix 15 iyul idi. Apple Pay uyğunluq
problemi gözlənilmədən aşkarlandı (yuxarıda izah edildiyi kimi) — bunu
düzəltmək 3-4 əlavə gün tələb edir.

İki seçim var: (1) tarixi 19 iyula keçirmək, tam düzəliş ilə çıxmaq, və ya
(2) 15 iyulda çıxmaq, amma iOS 15-dən köhnə istifadəçiləri (4%) köhnə
formaya yönləndirmək, düzəlişi ayrıca patch kimi göndərmək.

Mən (2)-ni tövsiyə edirəm — sürəti saxlayır, risk aşağıdır, çünki təsirlənən
qrup azdır və fallback artıq mövcuddur. Sənin qərarını gözləyirəm."
```

**Edge-case:** Diqqət et — bu, üzrxahlıqla başlamır, faktla başlayır, sonra
seçim təqdim edir və öz tövsiyəsini əsaslandırır. Bu, "problem var, sizə
həll lazımdır" yerinə "problem var, mən onu artıq analiz etmişəm, seçimin
səni gözləyir" mesajı verir — stakeholder-ə etibar yaradır.

### 4. Senior-level tələlər

- **Yalnız yaxşı xəbəri raportlamaq, riski qaçılmaz olana qədər gizlətmək.**
  Bu, ən çox güvən sındıran davranışdır — stakeholder sonra "niyə əvvəldən
  demədin" sualı verir.
- **Texniki auditoriya dilini biznes auditoriyasına dəyişmədən danışmaq.**
  "Race condition var" rəhbərliyə heç nə demir; "iki istifadəçi eyni anda
  sifariş etsə, stok say sayı səhv düşə bilər, bu, X$ itki riski daşıyır"
  demir.
- **Stakeholder kommunikasiyasını "menecerin işi" hesab edib özünü kənara
  çəkmək** — texniki nüansı yalnız sən bilirsən, ötürməmək məlumat itkisidir.
- **Heç nəyi yazılı qeyd etməmək, hər şeyi şifahi razılaşma kimi saxlamaq** —
  gələcəkdə "kim nə vəd etdi" sualı yaddaşa əsaslanan mübahisəyə çevrilir.
- **Az ehtimallı, amma ağır nəticəli riski "hələ erkəndir" deyə gecikdirmək** —
  erkən, hələ qeyri-müəyyən formada bildirmək, gec, dəqiq amma faydasız
  bildirməkdən yaxşıdır.

### 5. Trade-off / dizayn sualları

1. Sync (görüş) vs async (yazılı) status update — hansı halda hər biri daha
   effektivdir?
2. Rəhbərlik auditoriyası üçün nə qədər texniki detal lazımdır — həddindən
   artıq sadələşdirmə nə vaxt yanlış anlamaya səbəb olur?
3. Az ehtimallı, amma ağır risk — dərhal, yoxsa daha müəyyənləşəndə bildirilməli?
4. Stakeholder sənin texniki tövsiyənlə razılaşmasa, amma son qərar onundursa —
   necə davam edirsən?

### 6. Mock müsahibə sual-cavabları

**S: Stakeholder-ə pis xəbər (deadline gecikməsi) çatdırdığın bir hal danış.**
C: Faktı (nə aşkarlandı) əvvəlcə verdim, sonra artıq analiz etdiyim 2 seçimi
(tarixi sürüşdürmək vs riskli qrupu ayırıb çıxmaq) təqdim etdim, öz tövsiyəmi
əsaslandırdım və qərarı onun ixtiyarına verdim — "üzr istəyirəm, bilmirəm nə
edim" yox, "problem var, mən onu artıq düşünmüşəm" tonu ilə.

**S: Qeyri-texniki PM-ə "niyə eventual consistency seçdik" trade-off-unu
necə izah edərdin?**
C: "Əgər hər dəyişiklikdən sonra bütün istifadəçilərin dərhal eyni məlumatı
görməsini tələb etsək, sistem daha yavaş və bəzən əlçatmaz olar (məs. bir
server aşağı düşəndə hər şey dayanar). Bunun əvəzinə bir neçə saniyəlik gecikməni
qəbul edirik ki, sistem sürətli və davamlı qalsın — bu gecikmə istifadəçi
üçün adətən görünməzdir." — texniki termini (CAP, consistency) yox, nəticəni
danışıram.

### 7. Mənbələr

- [The Software Engineer's Guidebook — Gergely Orosz](https://www.engguidebook.com/)
- [Tech Lead Expectations for Engineering Projects — Gergely Orosz (Uber), qismən icmal](https://docs.google.com/document/u/0/d/1kngKHUCS0DHNvZAO8PfkcsTD4Mq7b11L09RIaVpQnwI/mobilebasic) — **qeyd:** bu sənəd abunəçi divarı arxasındadır, tam mətn birbaşa oxuna bilmədi; yalnız açıq görünən qısa istinad (upstream/downstream stakeholder xəritələndirmə) istifadə olundu, qalan bölmə ümumi tech-lead praktikasına əsaslanır.

---

## 13.9 Architecture Decision Record (ADR)

### 1. Niyə senior səviyyəsində vacib

"Bu kodu niyə belə yazmışıq?" sualı 8 ay sonra soruşulanda, cavab "xatırlamıram"
olarsa, komanda bilik itkisinə düçar olur. ADR bu sualın cavabını qalıcı
şəkildə saxlayır. Senior mühəndis təkcə qərar vermir — qərarın **izini**
buraxır, çünki o bilir ki, gələcəkdə komanda tərkibi dəyişəcək, kontekst
unudulacaq.

### 2. Konsepsiyalar ilk prinsiplərdən

**Nygard-ın minimal strukturu — niyə məhz bu 5 sahə.** Michael Nygard-ın 2011-ci
il blog yazısında təklif etdiyi struktur: Title, Status, Context, Decision,
Consequences. **Status** sahəsi (proposed/accepted/deprecated/superseded) ADR-i
"əbədi həqiqət" kimi yox, **zamanla dəyişə bilən** bir vəziyyət kimi qeyd edir —
bu, gələcəkdə qərarı yenidən nəzərdən keçirmək üçün institusional icazə verir.
**Consequences** sahəsi isə səni qərarın **mənfi** tərəflərini də yazmağa
məcbur edir — yalnız satış yox, dürüstlük.

**MADR-ın əlavəsi — "Considered Options" niyə vacibdir.** MADR (Markdown ADR)
Nygard-ın üzərinə "considered options" (hər alternativin pros/cons-u ilə)
əlavə edir. Səbəb: gələcəkdə kontekst dəyişəndə (məsələn, yeni kitabxana çıxanda)
oxuyucu bilməlidir ki, hazırkı seçim **hansı rəqiblərə qarşı** seçilib və niyə —
bu olmadan, "niyə X-i yox, Y-ni seçmədiniz?" sualı hər dəfə yenidən sual olunur.

**ADR-in RFC-yə münasibəti.** Spotify-ın praktikasına görə: RFC — müzakirə,
ADR — həmin müzakirənin **nəticəsinin** daimi qeydi. RFC bitəndən sonra ADR
yazılır. Amma Spotify daha da irəli gedir: **kiçik, "əhəmiyyətsiz görünən"**
qərarlar üçün də ADR yazmağı tövsiyə edir, çünki gizli/implicit standartlar
komandalar arasında təkrarlanan mübahisəyə səbəb olur — "geriyə doldurma"
(backfilling) da (implicit qərarı sonradan sənədləşdirmək) qəbul edilən
praktikadır.

### 3. Praktiki nümunə

```markdown
# ADR-014: Server state üçün React Query istifadə et (custom hook-lar əvəzinə)

**Status:** Accepted

## Context
Hazırda hər feature komandası server-dən data çəkmək üçün öz custom hook-unu
yazır (`useFetchUsers`, `useFetchOrders`, ...). Bunların heç biri cache,
retry, ya da stale-data idarəetməsi etmir — hər komanda bu problemi təzədən
həll edir, nəticədə 6 fərqli, uyğunsuz yanaşma yaranıb.

## Decision
Bütün yeni server-state kodu React Query (`@tanstack/react-query`) ilə
yazılacaq. Mövcud custom hook-lar dərhal deyil, hər komponent toxunulanda
tədricən köçürüləcək (bax ADR-014-migration.md).

## Considered Options
- **SWR:** Oxşar API-yə malikdir, amma mutation/optimistic-update dəstəyi
  React Query-dən daha az yetkindir. Rədd edildi.
- **Custom hook-ları standartlaşdırmaq (paylaşılan `useFetch` yazmaq):**
  Sıfırdan cache invalidation, retry, deduplication yazmaq — mövcud, geniş
  test edilmiş kitabxananı təkrar icad etmək mənasız risk daşıyır. Rədd edildi.
- **React Query (seçildi):** Yetkin, geniş istifadə olunan, DevTools dəstəyi var.

## Consequences
- (+) Cache/retry/deduplication məntiqi bütün komanda üçün vahidləşir.
- (+) Yeni developer-lər bir API öyrənir, 6 fərqli custom hook yox.
- (–) Bundle-a ~13kb əlavə olunur (gzip).
- (–) Köhnə custom hook-ları köçürmək tədricən vaxt tələb edəcək, keçid
  dövründə kod bazasında **iki fərqli pattern paralel yaşayacaq** — bu
  qarışıqlıq riski daşıyır, komanda bunu şüurlu qəbul edir.
```

```markdown
# ADR-021: React Query-dən TanStack Query v5-ə keçid (ADR-014-ü əvəz edir)

**Status:** Accepted — Supersedes ADR-014

## Context
React Query v4-dən v5-ə keçid adlanma dəyişikliyi (TanStack Query) və
suspense-native API gətirdi...
```

**Edge-case:** Diqqət et, ADR-021 ADR-014-ü **silmir**, "Supersedes" statusu
ilə əvəz edir — köhnə ADR reponu qalır, tarixi izah edən arxiv kimi. Kim
"niyə əvvəlcə React Query, sonra TanStack Query adlandırdınız" soruşsa,
hər iki sənəd hələ də oxuna bilər.

### 4. Senior-level tələlər

- **Yalnız "böyük" qərarlar üçün ADR yazmaq, kiçik implicit qərarları
  geriyə doldurmamaq.** Spotify-ın vurğuladığı kimi, kiçik qərarlar da
  gizli standart halına gəlib təkrar mübahisəyə səbəb olur.
- **Köhnə ADR-i silmək/redaktə etmək, "superseded" statusu ilə əvəz etməmək** —
  bu, tarixi izi məhv edir.
- **Consequences bölməsində yalnız üstünlükləri yazmaq.** Bu, ADR-i satış
  sənədinə çevirir, dürüstlüyü itirir — məqsəd gələcək oxucunu inandırmaq
  deyil, məlumatlandırmaqdır.
- **ADR-i yazıb heç yerdə indeksləməmək/axtarıla bilməz saxlamaq** — heç kim
  oxumursa, yazılmasının mənası yoxdur.
- **RFC ilə ADR-i qarışdırmaq** — RFC-ni "qərar sənədi" kimi saxlamaq, ayrıca
  ADR yazmamaq — nəticədə uzun müzakirə tarixçəsi içindən "əslində nəyə qərar
  verildi" sualının cavabını tapmaq çətinləşir.

### 5. Trade-off / dizayn sualları

1. Tam MADR (considered options, pros/cons, decision drivers) vs minimal
   Nygard — əlavə formallıq nə vaxt dəyərə dəyər?
2. Hər PR üçün ADR, yoxsa yalnız "əhəmiyyətli memarlıq qərarları" üçün — sərhəd
   haradadır?
3. Mərkəzləşdirilmiş ADR jurnalı (bütün repolar üçün bir yer) vs hər servis/repo
   öz ADR-lərini saxlayır — miqyasda hansı daha praktikdir?
4. Kim ADR yazmalıdır — qərarı verən şəxs, yoxsa ayrıca "sənədləşdirici" rolu?

### 6. Mock müsahibə sual-cavabları

**S: RFC ilə ADR arasında fərq nədir?**
C: RFC müzakirə prosesidir — açıq sual, alternativlər, fikir toplama. ADR isə
həmin prosesin **nəticəsinin** daimi qeydidir — qərar, kontekst və nəticələr
(müsbət və mənfi). RFC keçicidir (review bitəndə arxivlənir), ADR isə davamlı
istinad sənədidir.

**S: Zustand-ı Redux əvəzinə seçmək üçün qısa bir ADR yaz.**
C: Context: kiçik-orta ölçülü tətbiqdə paylaşılan state lazımdır, amma Redux-un
boilerplate-i (action, reducer, middleware) inkişaf sürətini azaldır. Decision:
Zustand seçilir. Considered options: Redux Toolkit (daha çox boilerplate,
daha güclü DevTools/time-travel), Context API (kiçik state üçün kifayətdir,
amma performans üçün selector yoxdur). Consequences: (+) az kod, sürətli
inkişaf; (–) Redux-un zəngin middleware ekosistemi (persist üçün əlavə paket
lazımdır), (–) time-travel debugging Redux DevTools qədər güclü deyil.

### 7. Mənbələr

- [Architectural Decision Records (ADRs) — adr.github.io](https://adr.github.io/)
- [ADR Templates — adr.github.io](https://adr.github.io/adr-templates/)
- [decision-record-template-by-michael-nygard — architecture-decision-record (GitHub)](https://github.com/joelparkerhenderson/architecture-decision-record/blob/main/locales/en/templates/decision-record-template-by-michael-nygard/index.md)
- [When Should I Write an Architecture Decision Record — Spotify Engineering](https://engineering.atspotify.com/2020/04/when-should-i-write-an-architecture-decision-record)

---

## 13.10 Trade-off analizi

### 1. Niyə senior səviyyəsində vacib

Bu bölmənin əvvəlki 9 mövzunun hamısının altında yatan bacarıqdır: RFC-nin
"Alternatives Considered"-i, ADR-in "Considered Options"-u, estimation-un
range-i, risk-in accept/mitigate qərarı — bunların hamısı əslində trade-off
analizidir. Seniorluğu fərqləndirən, daha çox fakt bilmək deyil, **rəqabətli
məhdudiyyətlər arasında açıq, izlənə bilən şəkildə mühakimə yürütmək**
bacarığıdır.

### 2. Konsepsiyalar ilk prinsiplərdən

**Pulsuz nahar yoxdur.** Hər memarlıq/dizayn qərarı bir xüsusiyyəti başqasının
hesabına alır — consistency vs availability, çatdırma sürəti vs uzunmüddətli
saxlanabilirlik, çeviklik vs sadəlik. Trade-off analizinin işi bu oxları
**gizli** saxlamayıb **açıq** etməkdir — çünki gizli trade-off, şərait
dəyişəndə (yeni tələb, yeni miqyas) yenidən nəzərdən keçirilə bilmir, o, sadəcə
unudulmuş fakt kimi qalır.

**Çəkilmiş qərar matrisi — niyə "elan" deyil, "söhbətin başlanğıcı"dır.**
Variantları sütun, kriteriyaları sətir kimi qoyub, kriteriyaları **məhz bu
qərar üçün nə vacibdirsə** (generic checklist yox) çəkiləndirib xallandırmaq —
bu, mühakiməni formalaşdırır. Amma nəticə ədədi "həqiqət" kimi qəbul etmək
səhvdir, çünki **çəkilərin özü** mübahisə mövzusudur — məhz buna görə matris
RFC/ADR-in "Considered Options" bölməsinin **daxilinə** girməlidir, onu əvəz
etməməlidir: rəqəm arqumenti əvəz etmir, arqumenti strukturlaşdırır.

**Rigor-u qərarın dəyərinə uyğunlaşdırmaq.** Bu, 13.2-də gördüyümüz RFC-worthiness
testinin ("6 ay sonra kimsə soruşacaqmı", "geri dönüşü çətindirmi") trade-off
analizinə tətbiqidir — geri qaytarıla bilən, aşağı-təsirli qərara saatlarla
analiz sərf etmək, özü bir səhvdir (analysis paralysis).

### 3. Praktiki nümunə

```markdown
## Weighted Decision Matrix: Məhsul səhifəsi üçün rendering strategiyası

**Kontekst:** E-commerce məhsul səhifəsi — SEO kritikdir, məhsul qiyməti
tez-tez dəyişir (stok/kampaniya), trafik yüksəkdir.

| Kriteriya | Çəki | CSR | SSR | SSG + revalidate |
|---|---|---|---|---|
| SEO (ilk boyaya qədər HTML-də content) | 5 | 1 (5) | 5 (25) | 5 (25) |
| Qiymət dəqiqliyi (real-time-a yaxınlıq) | 4 | 5 (20) | 5 (20) | 3 (12) — stale ola bilər |
| Server xərci (trafik yüksəkdir) | 3 | 5 (15) | 2 (6) — hər sorğuda render | 5 (15) |
| İnkişaf mürəkkəbliyi | 2 | 5 (10) | 4 (8) | 3 (6) — revalidation strategiyası əlavə mürəkkəblik |
| **Cəmi** | | **50** | **59** | **58** |

**Nəticə cəmə görə:** SSR (59) ən yüksək bal alır, SSG (58) çox yaxındır.

**Amma xal avtomatik qalib elan etmir:** SSR-in server xərci (2/5) yüksək
trafikdə real problemdir — matris bunu "aşağı çəki" ilə (3) yumşaltdı, amma
biznes maliyyə məhdudiyyəti qeyd edəndə bu çəki əslində 5 olmalı idi. Çəkini
düzəltdikdən sonra SSG öndə çıxır. **Qərar: SSG + on-demand revalidation**,
qiymət dəyişəndə webhook ilə səhifəni yenidən generasiya etmək riski (stale
qiymət göstərmək) ayrıca mitigation kimi qeyd olunur (bax ADR/RFC-yə keçid).

**Edge-case — qeyri-danışıqlı məhdudiyyət:** Əgər hüquqi tələb "qiymət hər
zaman 100% real-time olmalıdır" olsaydı, xal nə olursa olsun SSG rədd edilərdi —
bu, matrisin nəticəsini "əzən" qeyd-şərtsiz məhdudiyyətdir və sənəddə açıq
yazılmalıdır, çəkiləri manipulyasiya edib matrisi "düzgün" cavaba
uydurmaq əvəzinə.
```

### 4. Senior-level tələlər

- **"Trade-off teatri":** qərar artıq verildikdən sonra matrisi qurub çəkiləri
  "düzgün" cavaba uydurmaq — bu, çox geniş yayılmış, çox dürüst olmayan
  praktikadır.
- **Ən yüksək xalı avtomatik doğru qəbul etmək,** qeyri-danışıqlı məhdudiyyətlə
  (hüquqi, təhlükəsizlik) yoxlamadan.
- **Variantlar arasında əslində fərqlənməyən kriteriyaları müqayisə etmək** —
  matrisi "doldurmaq" üçün süni fərqlər yaratmaq.
- **Aşağı-riskli, asan-geri-dönən qərara** böyük analiz sərf etmək — qərarın
  özündən daha çox vaxt aparan trade-off analizi.
- **Çəkiləri bir dəfə təyin edib bir daha sual altına almamaq** — çəkilər
  özü mübahisə mövzusu olmalıdır, "verilmiş fakt" deyil.

### 5. Trade-off / dizayn sualları

1. Bir qərara nə qədər rigor (analiz dərinliyi) sərf etməli — bunu necə
   qərarlaşdırırsan?
2. Kəmiyyət xallandırma (matrix) vs sırf keyfiyyət (narrative) izahat — hansı
   halda rəqəm yalançı dəqiqlik yaradır?
3. Trade-off analizini aparan şəxsin artıq üstünlük verdiyi cavabı varsa,
   prosesi necə dürüst saxlayırsan?
4. Qeyri-danışıqlı məhdudiyyət (hüquqi/security) matrisin nəticəsi ilə
   ziddiyyət təşkil edəndə, bunu sənəddə necə şəffaf yazırsan?

### 6. Mock müsahibə sual-cavabları

**S: İki cache strategiyası arasında (məs. stale-while-revalidate vs
cache-first) necə seçim edərsən?**
C: Əvvəlcə bu qərar üçün əsl kriteriyaları müəyyənləşdirirəm (data
təzəliyinin nə qədər kritik olduğu, offline dəstəyi lazımdırmı, backend
yükü) — generic "yaxşı/pis" siyahısı yox. Sonra hər kriteriyaya bu **konkret**
məhsul üçün çəki verirəm, variantları xallandırıram, amma nəticəni qeyri-danışıqlı
məhdudiyyətlərə (məs. offline dəstəyi hüquqi tələbdirsə) qarşı yoxlayıram —
xal bunu əzə bilməz.

**S: Trade-off analizini nə vaxt həddindən artıq etdiyini necə bilirsən?**
C: Qərarın geri dönüş xərcinə baxıram — asan geri qaytarıla bilən, aşağı-təsirli
qərara saatlarla sərf edilən analiz vaxtı özü itkidir. RFC-worthiness testini
(6 ay sonra kimsə soruşacaqmı, geri dönüşü çətindirmi) trade-off analizinin
dərinliyinə də tətbiq edirəm.

### 7. Mənbələr

- [ADR Templates (MADR — Considered Options) — adr.github.io](https://adr.github.io/adr-templates/)
- [RFC Process for Engineering Teams — PanDev Metrics (RFC-worthiness testi)](https://pandev-metrics.com/docs/blog/rfc-process-engineering-teams)
- Daxili istinad: bu prinsip repo daxilində `senior-frontend-handbook-part2.md`
  (Architecture) üçün planlaşdırılan senior-architect qərar çərçivəsi
  (Problem→Options→Trade-offs→Decision→Revisit trigger) ilə birbaşa əlaqəlidir —
  həmin hissə yazılanda terminologiya bu bölmə ilə uyğunlaşdırılmalıdır.

---

## Qeyd: tədqiqat zamanı aşkarlanan boşluqlar

- **Stripe-ın öz daxili RFC şablonu** açıq mənbədə tapılmadı — mövcud
  məlumat yalnız "Stripe-da RFC/ADR mədəniyyəti dərin köklüdür" səviyyəsindədir,
  konkret sənəd strukturu ictimai deyil. Bu hissədə Stripe-a aid heç bir
  konkret şablon detalı **iddia edilməyib** — yalnız üçüncü tərəf praktikaçı
  müşahidələrində (Cloudflare/Stripe/Oxide review-vaxt aralığı kimi) adı
  keçən ümumiləşdirilmiş nümunələr istifadə olundu, açıq mənbə kimi qeyd
  edilməklə.
- **Gergely Orosz-un "Tech Lead Expectations for Engineering Projects" sənədi**
  (Uber-dəki təcrübəsindən) abunəçi divarı arxasındadır — tam mətnə çıxış
  mümkün olmadı. Stakeholder Communication bölməsində ondan yalnız açıq
  görünən qısa referans (upstream/downstream stakeholder anlayışı) istifadə
  edildi, qalanı ümumi, geniş qəbul olunmuş tech-lead praktikasına əsaslanır —
  bu, mətndə açıq şəkildə qeyd olunub.
- **Google/Spotify-ın öz daxili RFC şablon sənədləri (PDF/Doc formatında)**
  ictimai deyil — Spotify üçün ADR-ə keçid qaydası (engineering blog) açıq
  mənbədir və istifadə olundu, amma RFC-nin öz konkret sənəd formatı (Google
  Docs şablonu) ictimaiyyətə açıq deyil.
