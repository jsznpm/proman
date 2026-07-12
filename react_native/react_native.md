# Niyə React Native? Bir React component-i necə telefonda native widget-ə çevrilir?

React veb üçün o qədər uğurlu oldu ki, Meta (əvvəlki adı ilə Facebook) bir sual verdi: əgər UI qurmaq üçün bu qədər yaxşı alətimiz varsa, niyə mobil tətbiq üçün başqa bir şey öyrənməliyik? Bu sualın cavabı React Native oldu — 2013-cü ildə Facebook daxilində hackathon layihəsi kimi başlayan, 2015-ci ildə isə hamıya açıq edilən framework.

Bu məqalədə React Native-in yaranma səbəbini, necə işlədiyini və nə vaxt veb, nə vaxt native tətbiq seçməli olduğunuzu aydın şəkildə izah edəcəyik.

## React Native nədir?

React-in əsas ideyasını xatırlayaq: component-lər birbaşa ekrana "yapışmır", əvəzində **render target** adlanan bir şeyə render olunur. Veb üçün bu render target DOM-dur. Amma React component-in özü heç vaxt bilmir ki, nəticə harada göstəriləcək — bu, React-i çox çevik edən əsas xüsusiyyətdir.

Mobil dünyada isə vəziyyət fərqlidir. Android tətbiqi yazmaq üçün Java və ya Kotlin, iOS üçün isə Objective-C və ya Swift bilmək lazımdır. Yəni iki fərqli platforma üçün iki fərqli dil öyrənmək lazım gəlirdi — bu həm vaxt, həm də pul baxımından baha başa gəlirdi.

React Native məhz bu problemi həll etdi: React-ə **yeni bir render target** — native mobil widget-lər — əlavə etdi. Beləliklə eyni React bilikləri ilə həm veb, həm də mobil tətbiq yazmaq mümkün oldu.

Bunun arxasında duran texniki məntiq belədir:

- Veb üçün istifadə olunan eyni React kitabxanası React Native-də də işləyir, sadəcə JavaScriptCore mühitində icra olunur.
- Native platform API-larına göndərilən mesajlar **asinxron**dır və performans üçün toplu (batch) şəkildə göndərilir.
- React Native HTML elementləri əvəzinə, birbaşa mobil platformanın öz component-lərini (native widget-ləri) istifadə edir.
- React Native, əslində, component-ləri iOS və Android API-ları vasitəsilə render etmək üsuludur. Eyni məntiq fork və əlavələr vasitəsilə tvOS, Android TV, Windows, macOS və hətta yenidən Web üçün də tətbiq oluna bilər.

> Sadə desək: React Native veb üçün DOM-u əvəz edən şeyi — telefonun öz düymələrini, siyahılarını, input sahələrini — React component ağacına qoşan bir "körpü"dür.

Daha ətraflı tarixi və texniki detallar üçün: [React Native — Bringing Modern Web Techniques to Mobile](https://engineering.fb.com/2015/03/26/android/react-native-bringing-modern-web-techniques-to-mobile/)

## React və JSX artıq tanışdır

Yeni render target yaratmaq asan iş deyil — bu, praktiki olaraq iOS və Android üçün yeni bir "DOM" icad etmək kimidir. Bəs niyə bu qədər zəhmətə dəyər?

İki səbəb var:

1. **Mobil tətbiqlərə tələb böyükdür.** Mobil brauzer təcrübəsi native tətbiq təcrübəsi qədər yaxşı deyil.
2. **JSX artıq sınaqdan çıxmış, yaxşı alətdir.** Yeni texnologiya öyrənmək əvəzinə, artıq bildiyiniz şeydən istifadə etmək daha sərfəlidir.

Bu ikinci nöqtə xüsusilə vacibdir: bir komanda həm veb, həm iOS, həm də Android üçün ayrıca komandalar saxlamaq əvəzinə, sadəcə **React bilən bir UI komandası** saxlaya bilər. Bu, resurs baxımından böyük qənaətdir.

## Mobil brauzer təcrübəsi niyə kifayət etmir?

Mobil brauzerlər native tətbiqlərin bir çox imkanını təkrarlaya bilmir. Bunun səbəbi sadədir: brauzer HTML elementləri ilə native widget-ləri tam eyni şəkildə təqlid edə bilmir. Cəhd etmək mümkündür, amma çox vaxt native widget-in özünü istifadə etmək daha məntiqlidir — çünki:

- Az saxlama (maintenance) zəhməti tələb edir.
- İstifadəçi üçün **tanışlıq** yaradır — məsələn, tətbiqinizdəki tarix seçici (date picker) telefondakı digər tətbiqlərin tarix seçicisindən fərqli görünürsə, bu, istifadəçi üçün əlverişsizdir.

Bundan başqa, mobil istifadəçi qarşılıqlı əlaqəsi (interaction) veb-dən köklü şəkildə fərqlənir. Veb tətbiqləri, adətən, siçan olduğunu və klikin bir mərhələli hadisə olduğunu fərz edir. Mobil telefonda isə barmaqla ekrana toxunma var — bunun üçün **gesture sistemi** lazımdır (sürüşdürmə, sıxma, çoxbarmaqlı toxunma və s.). React Native bu cür gesture-ları veb React-dən daha yaxşı idarə edir, çünki bu, onun əsas dizayn məqsədlərindən biridir.

Həmçinin, platforma yeniləndikcə (məsələn, yeni iOS versiyası çıxanda) React Native tətbiqinin component-ləri də avtomatik yenilənir — çünki onlar **əsl platform component-ləridir**, təqlid deyil. Nəticədə tətbiqinizin düymələri, siyahıları digər tətbiqlərlə eyni davranır və tətbiq telefonun "bir parçası" kimi hiss olunur.

## Android və iOS: fərqli, amma eyni

İlk dəfə React Native haqqında eşidəndə çoxları düşünür ki, bu, "bir dəfə yaz, hər yerdə işlət" (write once, run anywhere) həllidir. Reallıq isə bir az daha mürəkkəbdir.

React Native kod paylaşımına böyük imkan versə də, iOS və Android bir çox fundamental səviyyədə fərqlidir — istifadəçi təcrübəsi fəlsəfələri də fərqlidir. Ona görə React Native-in real şüarı belədir:

> **"Bir dəfə öyrən, hər yerdə yaz"** (learn once, write anywhere) — "bir dəfə yaz, hər yerdə işlət" (write once, run anywhere) yox.

Yəni bəzən tətbiqiniz daha yaxşı təcrübə üçün platformaya xas widget-lərdən istifadə etməlidir.

Bununla belə, ekosistem inkişaf edir:

- **Expo** artıq veb dəstəyi təklif edir — React Native for Web vasitəsilə Android, iOS və veb üçün **tək bir kod bazası** ilə tətbiq yazmaq mümkündür.
- **Tamagui** UI kit-i həm veb, həm mobil üçün 100% dəstək verir — çoxplatformalı tətbiqi istifadəçi təcrübəsindən güzəştə getmədən qurmağa imkan yaradır.

Yəni React Native mükəmməl "bir dəfə yaz, hər yerdə işlət" həlli olmasa da, bu istiqamətdə xeyli irəliləyib.

## Bəs mobil veb tətbiqlər lazımdırmı?

Hər istifadəçi tətbiq quraşdırmağa hazır olmur — xüsusilə tətbiqinizin hələ yüksək endirmə sayı və reytinqi yoxdursa. Veb tətbiqin girişi çox asandır: istifadəçiyə sadəcə brauzer lazımdır.

Native platform UI-larının hər şeyini təkrarlamaq mümkün olmasa da, mobil veb interfeysdə hələ də çox yaxşı şeylər etmək olar. Bəlkə də yaxşı veb UI, tətbiqinizin endirmə və reytinq göstəricilərini artırmaq üçün ilk addımdır.

İdeal olaraq üç istiqamətə fikir vermək lazımdır:

- **Standart veb** (noutbuk/masaüstü brauzerlər)
- **Mobil veb** (telefon/planşet brauzerləri)
- **Mobil tətbiqlər** (telefon/planşet native platforması)

Bu üç sahəyə bərabər səy qoymaq, adətən, məntiqli deyil — istifadəçiləriniz, çox güman ki, bir sahəni digərlərindən üstün tutur. Məsələn, mobil tətbiqinizə veb versiyadan daha çox tələb olduğunu bildiyiniz an, səyinizi ora yönəltməyin vaxtıdır.

## Nəticə

React Native — Meta-nın React-i yenidən istifadə edərək native mobil tətbiqlər yaratmaq cəhdidir. React və JSX UI təsviri üçün əlaqədə çox güclüdür, mobil tətbiqlərə tələb də böyükdür — deməli, veb üçün bildiyiniz şeydən istifadə etmək tam məntiqlidir.

Mobil tətbiqlərin brauzerdən üstün olma səbəbi sadədir: onlar sadəcə **daha yaxşı hiss olunur**. Veb tətbiqlər gesture-ları native tətbiqlər qədər yaxşı idarə edə bilmir və görünüş baxımından telefonun "bir parçası" kimi hiss olunmur.

React Native illər ərzində xeyli inkişaf edib və Expo, Tamagui kimi alətlərlə daha səmərəli çoxplatformalı inkişafa imkan yaradıb. Amma unutmayın: React Native-in məqsədi "bir dəfə yaz, hər yerdə işlət" deyil, **"bir dəfə öyrən, hər yerdə yaz"**dır. Bu o deməkdir ki, developer-lər daha yaxşı istifadəçi təcrübəsi üçün platformaya xas xüsusiyyətlərdən yenə də istifadə edə bilər.

Qısası: əvvəl iki-üç dil öyrənib ayrı-ayrı komandalar saxlamaq lazım idi. İndi isə bir React komandası ilə veb, iOS və Android-i eyni anda əhatə etmək mümkündür.
