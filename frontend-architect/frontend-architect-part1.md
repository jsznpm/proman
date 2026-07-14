# Frontend Architect — Part 1: Rol və Qərar Çərçivəsi

> Bu, "Frontend Architect" seriyasının 1-ci hissəsidir (bax:
> `courses/frontend-architect.plan.md`). Mövzu: frontend architect-in nə iş
> gördüyü, onu mid/senior developer-dən nə ayırdığı, və hər texniki qərarı
> müdafiə oluna bilən şəkildə verməyin çərçivəsi. Bu hissə bütün kursun
> "düşüncə əməliyyat sistemi"dir — sonrakı part-larda pattern, rendering,
> performance seçimləri hamısı buradakı çərçivəyə (Problem → Options →
> Trade-offs → Decision → Revisit) istinad edəcək. Mənbə əsası: patterns.dev
> skill-lərinin "When to Use" məntiqi + senior-architect qərar çərçivəsi.

---

## 1. Frontend Architect kimdir

### 1.1 Niyə vacibdir

Ən çox yayılmış yanlış təsəvvür: "architect = komandada ən yaxşı kod yazan
adam". Əslində bunlar iki ayrı bacarıqdır. Ən yaxşı kodçu bir funksiyanı ən
təmiz yazır; architect isə **hansı funksiyanın ümumiyyətlə yazılmalı olduğuna,
harada yaşayacağına, sərhədlərinin harada olacağına və 2 il sonra dəyişmək
lazım gələndə nəyin sınacağına** qərar verir. Kod yazmaq taktikadır; arxitektura
strategiyadır.

Praktikada frontend architect üç sual üzərində işləyir:

1. **Struktur** — kod və data hansı sərhədlərə bölünür? (folder deyil —
   *bounded context*, sahiblik, contract.)
2. **Qərar** — iki-üç realistik variant arasında hansını, hansı konkret
   məhdudiyyətə görə seçirik? Və bu qərarı sabah kim, necə oxuyacaq?
3. **Dəyişiklik dəyəri** — bu seçim gələcək dəyişikliyi asanlaşdırır, yoxsa
   çətinləşdirir? Çünki sistemin əsl xərci bu gün yazdığın deyil, sabah
   dəyişəcəyin koddur.

> **Niyə vacibdir:** Architect-in dəyəri yazdığı kodda yox, verdiyi
> qərarların *geri qaytarıla bilməsində* və *müdafiə oluna bilməsində*dir.
> "Belə hiss etdim" qərar deyil; "bu constraint bunu məcbur etdi" qərardır.

### 1.2 Konsepsiya — məhdudiyyətdən başla, texnologiyadan yox

Zəif architect texnologiya adı ilə başlayır: "Next.js işlədək", "GraphQL
qoyaq". Güclü architect **məhdudiyyətlə** başlayır və texnologiya nəticə kimi
çıxır:

- **Yük (load):** neçə istifadəçi, neçə request/saniyə, data həcmi, artım
  sürəti? Oxu-ağır, yoxsa yazı-ağır?
- **Gecikmə (latency):** hansı ekran sub-100ms olmalıdır, hansı 2 saniyə
  dözür?
- **Consistency:** harada güclü ardıcıllıq şərtdir (ödəniş), harada eventual
  kifayətdir (bəyənmə sayı)?
- **Komanda:** neçə nəfər, hansı stack-i tanıyır? (Ən "düzgün" texnologiya
  komanda onu saxlaya bilmirsə yanlış seçimdir.)
- **Büdcə:** 10x yükdə hesabın ən böyük hissəsi nə olacaq və məhduddurmu?

Yalnız bunlar aydınlaşandan sonra texnologiya adı çəkilir. Bu, "boring, proven
tech-ə üstünlük ver" prinsipi ilə birləşir: yenilik yalnız öz riskinin
qarşılığını ödədiyi yerdə seçilir.

> **Ümumi səhv:** Datastore-u və ya framework-u onun "scale hekayəsinə" görə
> seçmək — həmin scale-ə çatmamış. "Milyon istifadəçi olanda lazım olacaq"
> arqumenti bu gün mürəkkəblik xərci gətirir, sabahkı fayda isə çox vaxt heç
> vaxt gəlmir.

---

## 2. Qərar çərçivəsi — ilk prinsiplərdən

### 2.1 Niyə çərçivə lazımdır

Qərar çərçivəsi olmadan hər müzakirə "kim daha inandırıcı danışır" yarışına
çevrilir. Çərçivə müzakirəni **struktura** salır: hamı eyni beş sual üzərində
danışır, qərar sənədləşir, və 6 ay sonra "biz niyə belə etmişdik?" sualının
cavabı yazılı qalır.

### 2.2 Konsepsiya — beş addım

Hər böyük seçim üçün açıq şəkildə bunları yaz:

1. **Problem** — hansı tələb qərar verməyi *məcbur edir*? (Məs. 10k yazı/s,
   offline mobil, sub-100ms oxu.) Problem konkret metrik olmalıdır.
2. **Options** — 2-3 realistik namizəd. Strawman yox — hər variant əslində
   seçilə biləcək qədər ciddi olmalıdır.
3. **Trade-offs** — hər variant üçün: xərc, əməliyyat yükü (operational
   burden), komandanın tanışlığı, uğursuzluq rejimləri (failure modes),
   lock-in.
4. **Decision + rationale** — seçim və onu həll edən **bir** məhdudiyyət.
   ("X seçdik, çünki komanda Y-ni tanımır və deadline 3 həftədir.")
5. **Revisit trigger** — hansı metrik və ya hadisə bu qərarı yenidən açar?
   ("Əgər RPS 5k-nı keçsə", "əgər komanda 3 nəfərdən çox olsa".)

### 2.3 Praktiki nümunə — ADR

Bu beş addım **ADR (Architecture Decision Record)** kimi yazılır: hər qərar
üçün bir qısa markdown faylı, qəbul olunandan sonra dəyişməz (immutable) —
düzəliş yox, **əvəzlənmə** (superseded). Belə:

```markdown
# ADR-007: Client state üçün Zustand, Redux Toolkit yox

Status: Accepted (2026-07-14)

## Problem
Dashboard-da 3-4 qlobal state parçası var (auth, theme, sidebar).
Server state artıq TanStack Query-də. Yeni developer-lər Redux boilerplate-dən
şikayət edir; onboarding yavaşlayır.

## Options
1. Redux Toolkit — komanda yarı tanıyır, çox boilerplate.
2. Zustand — minimal API, kiçik bundle, az boilerplate.
3. React Context + useReducer — sıfır asılılıq, amma re-render idarəsi əl ilə.

## Trade-offs
- Redux: güclü devtools, amma bu ölçülü state üçün artıq mürəkkəblik.
- Zustand: sadə, selector ilə re-render nəzarəti; ekosistem Redux qədər böyük deyil.
- Context: pulsuz, amma tez-tez dəyişən state-də bütün istehlakçıları re-render edir.

## Decision
Zustand. Həll edən constraint: qlobal state kiçikdir və onboarding sürəti
prioritetdir; Redux-un gücünə ehtiyac yoxdur.

## Revisit trigger
Əgər qlobal state parçaları 15-i keçsə, ya da time-travel debugging / audit
log tələbi gəlsə — Redux Toolkit-ə qayıt.
```

> **Niyə vacibdir:** ADR olmadan qərarlar komanda yaddaşında yaşayır və o
> yaddaş insanlar getdikcə silinir. ADR "gələcək developer-ə (o cümlədən 6 ay
> sonrakı özünə) məktub"dur. Qərarı *dəyişmək* olar; amma niyəsini *silmək*
> olmaz.

---

## 3. System-design checklist

### 3.1 Konsepsiya

Bir sistem (məs. real-time dashboard, chat, notification) dizayn edəndə
architect bu doqquz oxu **launch-dan əvvəl** yoxlayır — insidentdən sonra yox:

- **Scale:** gözlənilən RPS, data həcmi, artım sürəti? Oxu-, yoxsa yazı-ağır?
- **Consistency:** harada güclü ardıcıllıq şərt, harada eventual kifayət?
- **State:** həqiqətin mənbəyi (source of truth) haradadır? Necə backup/restore
  olunur?
- **Failure:** hər asılılıq söndükdə nə olur? Timeout, backoff ilə retry,
  idempotency açarları, circuit breaker, graceful degradation.
- **Coupling:** sync çağırış, yoxsa async hadisə? Bu hop queue ola bilərmi?
- **Boundaries:** API contract versiyalanıb və geriyə uyğundurmu (backward
  compatible)?
- **Observability:** strukturlaşmış log, metrik (RED/USE), trace, SLO
  üzərində alert — hamısı əvvəlcədən təyin olunub.
- **Security:** hər sərhəddə authN/authZ, least privilege, secret-lər vault-da,
  input validation, parametrləşdirilmiş sorğular.
- **Cost:** 10x yükdə hesabı nə idarə edir? Məhduddurmu?

Frontend architect üçün bu checklist tam eyni qalır, sadəcə vurğu dəyişir:
"state / source of truth" çox vaxt server state (Part 11) və client state
arasındakı sərhəddir; "failure" — API söndükdə UI-nin necə degradasiya etməsidir
(skeleton, stale-while-revalidate, offline rejim); "boundaries" — komponent və
modul contract-larıdır (Part 4-5).

> **Niyə vacibdir:** Checklist "nəyi unutduğumu" tapmaq üçün alətdir. Təcrübəli
> architect belə hər dəfə bu doqquz oxdan keçir, çünki adətən sistemi ən son
> düşünülən ox (çox vaxt Failure və ya Observability) uçurur.

---

## 4. Praktik nümunə — qərar çərçivəsini tətbiq etmək

### 4.1 Ssenari

Tələb: "Məhsul siyahısı səhifəsi çox yavaş açılır, SEO də zəifdir. Düzəldin."

Zəif reaksiya: dərhal "SSR-ə keçək" demək. Bu — problemi diaqnoz etmədən
həll seçməkdir.

### 4.2 Çərçivə ilə addım-addım

**Problem (metrik):** LCP mobil 3G-də 4.8s (hədəf < 2.5s); Google-da səhifə
indekslənmir (bot JS-siz boş HTML görür). İki ayrı problem — biri performance,
biri SEO — amma kök səbəb eyni ola bilər: hər şey client-də render olunur.

**Options:**
1. CSR saxla + optimize et (code splitting, image optimization).
2. SSR (server-side rendering) — hər request server-də HTML qurulur.
3. SSG/ISR — build-time və ya incremental static HTML.

**Trade-offs:**
- CSR optimize: dəyişiklik minimaldır, amma bot hələ də boş HTML görəcək —
  SEO problemi qalır.
- SSR: SEO həll olur, TTFB serverdən asılıdır, infrastruktur (Node server,
  scaling) əlavə olunur.
- SSG/ISR: ən sürətli TTFB, amma məhsul qiyməti/stoku tez-tez dəyişirsə
  stale data riski var; ISR bunu yumşaldır.

**Decision + rationale:** Məhsul kataloqu nadir dəyişir və SEO kritikdir →
**ISR** (Incremental Static Regeneration). Həll edən constraint: content əsasən
statikdir, amma tam SSG-nin "hər dəyişiklikdə yenidən build" problemindən
qaçmaq lazımdır.

**Revisit trigger:** Əgər qiymətlər saatda bir dəyişməyə başlasa (məs. flash
sale platforması olsaq), ISR revalidation pəncərəsi kifayət etməyəcək →
streaming SSR-ə (Part 8) bax.

> **Ümumi səhv:** "Yavaşdır → SSR" kimi refleks qərarlar. Problem əvvəl
> ölçülməlidir. Bəlkə əsl səbəb 2MB-lıq optimize olunmamış şəkil idi və heç bir
> rendering dəyişikliyi lazım deyildi. Rendering strategiyalarının tam
> müqayisəsi Part 7-də.

---

## 5. Anti-pattern-lər — architect-in bayraq qaldırdığı hallar

Bunlar təcrübədə dəfələrlə sistemi uçuran nümunələrdir:

- **Product-market fit-dən əvvəl microservices** — "distributed monolith"
  vergisi: paylanmış sistemin bütün çətinliyi, monolitin heç bir sadəliyi olmadan.
- **Scale-ə çatmamış scale üçün datastore seçmək** — Postgres çox komandanın
  düşündüyündən qat-qat uzağa gedir.
- **Servislər arası paylaşılan mutable database** — gizli coupling; bir servis
  schema-nı dəyişəndə digəri səssizcə sınır.
- **Timeout büdcəsi olmadan N səviyyəli sync request zənciri** — bir yavaş hop
  bütün zənciri bloklayır.
- **"Observability-ni sonra əlavə edərik"** — o "sonra" heç vaxt gəlmir;
  insident vaxtı log yoxdursa, kor uçursan.
- **Correctness bug-ını gizlədən erkən caching** — cache səhv nəticəni "sürətli"
  qaytarır, problem gec tapılır.

> **Niyə vacibdir:** Architect-in işinin böyük hissəsi "yox" deməkdir — daha
> doğrusu, "hələ yox, çünki bu constraint hələ mövcud deyil". Anti-pattern-ləri
> tanımaq bu "yox"ları müdafiə oluna bilən edir.

---

## Məşq

Öz layihəndən (və ya təsəvvür etdiyin) **bir** real texniki qərar seç — məsələn
"routing üçün React Router, yoxsa TanStack Router?" və ya "form state üçün
react-hook-form, yoxsa əl ilə?". Onu tam ADR formatında yaz:

1. Problem-i **metrik/konkret tələb** kimi ifadə et (ümumi "daha yaxşı olsun"
   yox).
2. 2-3 realistik option (strawman olmadan).
3. Hər biri üçün ən azı 2 trade-off.
4. Qərar + onu həll edən **bir** constraint.
5. Revisit trigger.

Sonra system-design checklist-in doqquz oxundan keçib qərarının hansı oxa
toxunduğunu qeyd et. Məqsəd: "hiss"i "müdafiə oluna bilən qərar"a çevirmək
əzələsini qurmaq.

---

## Xülasə

- Architect = ən yaxşı kodçu deyil; **qərar verən və o qərarı müdafiə edə
  bilən** adamdır.
- **Məhdudiyyətdən başla, texnologiyadan yox.** Yük/latency/consistency/komanda/
  büdcə aydınlaşmadan stack adı çəkmə.
- Hər böyük qərar üçün beş addım: **Problem → Options → Trade-offs → Decision →
  Revisit trigger**, və bunu **ADR** kimi sənədləşdir.
- Sistem dizaynında doqquz oxlu checklist-dən (**Scale/Consistency/State/
  Failure/Coupling/Boundaries/Observability/Security/Cost**) launch-dan əvvəl keç.
- "Belə hiss etdim" qərar deyil; "bu constraint bunu məcbur etdi" qərardır.
- Anti-pattern-ləri tanı və vaxtında "hələ yox" de.

---

## Mənbələr

- [PatternsDev/skills](https://github.com/PatternsDev/skills) — patterns.dev
  skill-lərinin hər biri "When to Use" bölməsi ilə gəlir; bu kursda həmin
  "nə vaxt" məntiqi qərar çərçivəsinə çevrilir.
- [patterns.dev](https://www.patterns.dev/) — orijinal pattern və performance
  materialları.
- Architecture Decision Records (ADR) konsepsiyası — Michael Nygard,
  "Documenting Architecture Decisions".
- Növbəti hissə: **Part 2 — JavaScript Design Patterns I (struktur)**
  (`frontend-architect-part2.md`).
