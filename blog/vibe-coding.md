# Vibe Coding-dən Agentik Mühəndisliyə: AI ilə Təhlükəsiz və Etibarlı Proqram Təminatı Necə Qurulur?

Süni intellekt əsaslı proqramlaşdırma alətlərinin sürətlə inkişafı ilə birlikdə yeni bir anlayış da populyarlıq qazanıb: **vibe coding**. Bu yanaşmada proqramçı kodun texniki detalları üzərində dayanmaq əvəzinə, əsasən nəticəyə və ümumi "hissə" fokuslanır. AI kod yazır, insan isə onun işlədiyinə intuitiv şəkildə qərar verir.

Lakin real istehsalat sistemlərində (production environments) bu yanaşma ciddi risklər yarada bilər. Məhz buna görə daha yetkin və etibarlı bir model olan **agentik mühəndislik (Agentic Engineering)** ön plana çıxır. Bu yanaşma AI-ni sadəcə kod generatoru kimi deyil, müəyyən qaydalar və nəzarət mexanizmləri daxilində işləyən mühəndis köməkçisi kimi qəbul edir.

## 1. Avtomatlaşdırılmış Doğrulama: Hisslərə Yox, Faktlara Güvənmək

Vibe coding-də kodun keyfiyyəti çox vaxt vizual yoxlama və ya ümumi təəssürata əsasən qiymətləndirilir. Agentik mühəndislik isə tamamilə fərqli prinsipə söykənir.

Burada hər bir dəyişiklik:

* Avtomatik testlərdən keçirilir;
* Tip yoxlayıcıları (Type Checkers) tərəfindən analiz olunur;
* Keyfiyyət və təhlükəsizlik qapılarından (Quality Gates) keçir.

Nəticədə yoxlanılmamış və ya səhv kodun istehsalata sızma ehtimalı minimuma endirilir. Sistem insanın subyektiv qərarlarından deyil, obyektiv yoxlama mexanizmlərindən asılı olur.

## 2. Möhkəm "Harness" Sistemi: AI üçün Qaydalar Çərçivəsi

Agentik mühəndislikdə AI modelinə yalnız prompt vermək kifayət etmir. Model xüsusi təlimat sənədləri ilə əhatə olunur:

* **CLAUDE.md** və ya oxşar daimi təlimat faylları;
* Skill files (bacarıq faylları);
* Kodlaşdırma standartları;
* API istifadəsi qaydaları;
* Test strategiyaları.

Bu sənədlər AI üçün bir növ təhlükəsizlik kəməri rolunu oynayır. Nəticədə model xaotik, təkrarlanan və ya "spagetti kod" yazmaq əvəzinə komandanın qəbul etdiyi standartlara uyğun davranır.

## 3. Həlli Deyil, Problemi Təsvir Etmək

Ənənəvi yanaşmada mühəndis AI-yə addım-addım nə etməli olduğunu diktə edir. Bu halda AI sadəcə sürətli stenoqrafçı rolunu oynayır.

Agentik mühəndislikdə isə yanaşma fərqlidir:

Mühəndis problemi, məhdudiyyətləri və uğur meyarlarını müəyyən edir, lakin konkret həlli AI-nin tapmasına imkan verir.

Bu model bir neçə üstünlük yaradır:

* Alternativ həll yolları ortaya çıxır;
* Dizayn qərarları əsaslandırılır;
* Daha güclü və davamlı arxitektura formalaşır.

Beləliklə, AI yalnız tapşırıq icraçısı deyil, həm də qərar vermə prosesinin iştirakçısına çevrilir.

## 4. Kiçik və Tez-tez Doğrulama Dövrələri

AI agentləri ilə işləyərkən ən böyük risklərdən biri səhvlərin uzun müddət aşkarlanmamasıdır.

Bu problemin qarşısını almaq üçün agentik mühəndislik Andrej Karpathy-nin məşhur prinsipinə əməl edir:

> "Agentin zəncirini qısa saxlayın."

Yəni:

* Kiçik dəyişiklik et;
* Dərhal test et;
* Nəticəni yoxla;
* Sonra növbəti addıma keç.

Bu metod səhvlərin yığılaraq böyük və mürəkkəb problemlərə çevrilməsinin qarşısını alır və inkişaf prosesini daha idarəolunan edir.

## 5. Səhvlərdən Öyrənmək: Mühəndis Korrektor Yox, Təlimçidir

Agentik mühəndislikdə mühəndisin əsas vəzifəsi hər dəfə eyni səhvi düzəltmək deyil.

Əgər AI müəyyən bir səhv edirsə, həmin səhv:

* Skill file-lara əlavə olunur;
* Qayda sənədlərində qeyd edilir;
* Gələcək yoxlama mexanizmlərinə daxil edilir.

Beləliklə, sistem hər səhvdən sonra daha ağıllı və daha etibarlı olur. Vaxt keçdikcə eyni problemlərin təkrarlanma ehtimalı əhəmiyyətli dərəcədə azalır.

## 6. Strateji Diqqət Bölüşdürülməsi

Senior mühəndislərin vaxtı məhdud və dəyərlidir. Minlərlə sətirlik diff-ləri əl ilə oxumaq məhsuldar yanaşma deyil.

Agentik mühəndislik insan diqqətini ən kritik sahələrə yönəldir:

* Təhlükəsizlik;
* Məlumat bazası dəyişiklikləri;
* Mühüm biznes məntiqi;
* Arxitektura qərarları.

Qalan hissələr isə etibarlı test sistemlərinə və avtomatlaşdırılmış yoxlama mexanizmlərinə həvalə edilir.

Bu yanaşma həm sürəti artırır, həm də insan səhvlərinin sayını azaldır.

## Nəticə

Agentik mühəndislik AI ilə proqram təminatı hazırlamağın daha yetkin mərhələsidir. Burada məqsəd sadəcə daha sürətli kod yazmaq deyil, daha etibarlı sistemlər qurmaqdır.

Əsas fərq ondadır ki, insan enerjisini kodun hər sətrini yazmağa deyil, AI-ni idarə edən qaydaları, yoxlama mexanizmlərini və təhlükəsizlik çərçivələrini təkmilləşdirməyə sərf edir.

Gələcəyin ən uğurlu proqram mühəndisləri AI ilə rəqabət aparanlar deyil, AI-ni düzgün istiqamətləndirən, nəzarət edən və öyrədən mühəndislər olacaq.
