Frontend Texniki Standartlar və Proqramlaşdırma Təlimatı (DDE-210726-1633-86)

1. Giriş və Sənədin Məqsədi

Bu sənəd Azərbaycan Respublikası Mərkəzi Bankı daxilində hazırlanacaq və istismar ediləcək Angular (17+) və React əsaslı frontend layihələri üçün vahid texniki standartları və arxitektur qaydaları müəyyən edir. Sənədin tətbiqi layihələrin davamlılığı və yüksək texnoloji keyfiyyətini təmin etmək üçün nəzərdə tutulmuşdur.

Sənədin əsas məqsədi:

* İrihəcmli və uzunmüddətli layihələrin daha sabit, təhlükəsiz və miqyaslana bilən (scalable) şəkildə qurulmasını təmin etmək.
* Komanda daxilində vahid kod yazma mədəniyyəti və standartlaşdırılmış yanaşmanı formalaşdırmaq.
* Yeni qoşulan və ya junior developer-lar üçün təlimat və yönləndirici material rolunu oynamaq.
* Layihələrin "angular-template" adlı nümunə layihə əsasında real şəkildə tətbiq olunmasını və vahid arxitektura ilə idarə edilməsini təmin etmək.

2. Change Request (CR) Proseduru

Hər bir texniki dəyişiklik, yeni funksionallıq və ya arxitektur yenilənmə layihə idarəetməsi çərçivəsində müəyyən edilmiş Change Request (CR) proseduruna tabedir. Dəyişiklik tələbləri sənədləşdirilməli və kod bazasına tətbiq edilməzdən əvvəl texniki komitə və ya Baş Arxitektor tərəfindən təsdiqlənməlidir. Bu, layihənin inkişaf tarixçəsinin izlənilməsi və standartlardan kənarlaşmanın qarşısının alınması üçün ilkin şərtdir.

3. Angular (17+) Frontend Guideline

3.1. Layihənin Başladılması və Strukturlaşdırılması

Angular tətbiqinin yaradılması üçün Node.js (LTS versiya) və Angular CLI mütləqdir.

Quraşdırma və Başlatma:

# Angular CLI quraşdırılması
npm install -g @angular/cli

# Yeni layihənin yaradılması
ng new layihe-adi


ng new zamanı tövsiyə olunan seçimlər:

Sual	Tövsiyə edilən cavab
Would you like to add Angular routing?	Yes
Which stylesheet format would you like?	SCSS (və ya Tailwind üçün plain CSS)
Standalone component structure?	Yes (Angular 17+ ilə default gəlir)

3.2. Qovluq Strukturu və Təyinatı

src/app/ daxilindəki qovluq iyerarxiyası modulyarlığı və təkrar istifadəni (reusability) maksimallaşdırmalıdır:

* core/: Layihənin əsas infrastrukturu (Auth, API servislər, interceptors, guards). Yalnız bir dəfə istifadə olunan qlobal elementlər.
* shared/: Yenidən istifadə edilə bilən UI komponentləri, direktivlər və pipe-lar.
* layout/: Tətbiqin ümumi skeletini formalaşdıran navbar, sidebar və footer kimi komponentlər.
* features/: Modulyar şəkildə bölünmüş əsas biznes loqikası və səhifələr.

Niyə bu struktur?

Əsas Faydalar	İzah
Separation of Concerns	Layihənin loqikasını modullar üzrə ayıraraq idarəolunmasını artırır.
Reusability	shared/ və core/ qovluqları ilə kod təkrarçılığını azaldır.
Testability	Modulyar quruluş unit və inteqrasiya testlərinin yazılmasını asanlaşdırır.
Scalability	Layihə böyüdükcə struktur problemsiz inkişaf edir.
Maintainability	Yeni developer layihənin arxitekturasını daha tez mənimsəyir.
Best Practice ilə uyğun	Angular komandasının və peşəkar icmanın tövsiyə etdiyi rəsmi yanaşmadır.

3.3. Standalone Komponent Arxitekturası

Angular 17-də standalone komponentlər defaultdur. @Component dekoratorunda standalone: true qeyd olunması NgModule asılılığını aradan qaldırır.

Standalone komponent nümunəsi:

import { Component } from '@angular/core';

@Component({
  selector: 'app-feature-one',
  standalone: true,
  imports: [], // Lazım olan standalone komponentlər bura daxil edilir
  templateUrl: './feature-one.component.html',
  styleUrl: './feature-one.component.scss'
})
export class FeatureOneComponent {}


3.4. Konfiqurasiya və Environment İdarəetməsi

Müxtəlif mühitlər (Dev, Prod) üçün konfiqurasiyaların idarə edilməsi angular.json faylındakı fileReplacements mexanizmi ilə həyata keçirilir.

angular.json konfiqurasiyası:

"configurations": {
  "production": {
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.prod.ts"
      }
    ]
  }
}


Environment parametrləri:

* Dev: production: false, logLevel: 'debug', enableDebug: true.
* Prod: production: true, logLevel: 'error', enableDebug: false.

3.5. Mərkəzləşdirilmiş Loglama (LoggerService)

LoggerService tətbiq daxilində loglama əməliyyatlarını mərkəzləşdirir və mühitə görə konsol çıxışlarını idarə edir.

LoggerService.ts tam kodu:

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  log(message: string, ...params: any[]): void {
    if (environment.enableDebug) {
      console.log('[LOG]:', message, ...params);
    }
  }

  warn(message: string, ...params: any[]): void {
    if (environment.enableDebug) {
      console.warn('[WARN]:', message, ...params);
    }
  }

  error(message: string, ...params: any[]): void {
    console.error('[ERROR]:', message, ...params);
  }

  debug(message: string, ...params: any[]): void {
    if (environment.enableDebug) {
      console.debug('[DEBUG]:', message, ...params);
    }
  }
}


Komponent daxilində istifadə nümunəsi:

export class FeatureOneComponent implements OnInit {
  constructor(private loggerService: LoggerService) {}

  ngOnInit(): void {
    this.loggerService.log('Komponent yükləndi', { id: 1 });
    this.loggerService.error('Məlumatın çəkilməsində xəta baş verdi');
  }
}


3.6. TypeScript və IDE (WebStorm) Ayarları

Kod keyfiyyətini qorumaq üçün tsconfig.json faylında aşağıdakı strict qaydalar və paths alias-ları təyin edilməlidir:

{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "paths": {
      "@app/*": ["src/app/*"],
      "@core/*": ["src/app/core/*"],
      "@shared/*": ["src/app/shared/*"],
      "@env": ["src/environments/environment"]
    }
  },
  "angularCompilerOptions": {
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}


WebStorm Plugin-ləri və Təyinatı:

Plugin Adı	Niyə Lazımdır?
Angular and AngularJS	Routing və komponentlərin dərin inteqrasiyası və tanınması üçün.
Tailwind CSS	Class-ların avtomatik təklif olunması və vizual dəstək üçün.
ESLint & Prettier	Kod standartlarının yoxlanılması və avtomatik formatlanması üçün.
GitToolBox	Hər bir sətir üzrə git statusunu və müəllifi görmək üçün.
Angular Component Folding	Faylları virtual olaraq qruplaşdırıb vizual səliqəlilik yaratmaq üçün.

3.7. Kod Keyfiyyəti və Husky (Pre-commit)

Səhv kodun commit olunmasının qarşısını almaq üçün Husky vasitəsilə pre-commit hook-lar quraşdırılmalıdır.

Quraşdırma addımları:

1. Paketləri yükləyin: npm install husky --save-dev
2. Husky-ni aktivləşdirin: npx husky-init
3. .husky/pre-commit faylına aşağıdakı komandaları əlavə edin:

npm run lint
npm run test


4. React Frontend Guideline

React layihələrinin idarə olunması üçün aşağıdakı standart iyerarxiya tətbiq edilməlidir:

4.1. React Layihəsinin Qurulması (TypeScript ilə)

Bütün React layihələri tip təhlükəsizliyi üçün mütləq TypeScript ilə başladılmalı və Vite və ya Next.js mühitində qurulmalıdır.

4.2. Tailwind-Based UI Development

Stil standartı olaraq Tailwind CSS istifadə edilməlidir. Custom CSS-dən yalnız mürəkkəb animasiyalar zamanı istifadəyə icazə verilir.

4.3. Custom Hooks və Shared Logic

Komponentlərin təkrar istifadəsini artırmaq üçün biznes loqikası mütləq Custom Hook-lara (məsələn: useAuth, useFetch) çıxarılmalıdır.

4.4. API Layer və Data Fetching (Axios/Query)

Məlumatların idarə olunması üçün mərkəzləşdirilmiş API servisləri və React Query (TanStack Query) istifadəsi mütləqdir. Bu, cache idarəetməsini və server state-in effektivliyini təmin edir.

4.5. State Management və Security Best Practices

Global state üçün Zustand və ya Redux Toolkit tövsiyə olunur. Təhlükəsizlik üçün JWT tokenlərin HttpOnly cookie-lərdə saxlanılması və XSS qoruması standartdır.

5. Performans, Test və Deployment

* Performans: Angular-da OnPush change detection, React-də isə memo və useMemo vasitəsilə lazımsız render-lərin qarşısı alınmalıdır. Şəkillər mütləq lazy-loading ilə yüklənməlidir.
* Test: Hər bir kritik biznes loqikası Jest və ya Vitest vasitəsilə unit testlərlə əhatə olunmalıdır.
* Deployment: Layihələr mütləq Docker konteynerləri daxilində paketlənməli və CI/CD konveyerləri vasitəsilə mühitlərə çatdırılmalıdır. Monitorinq üçün Sentry inteqrasiyası tövsiyə olunur.

6. Nəticə və Tətbiq Qaydaları

Bu təlimatda əks olunan bütün texniki standartlara riayət olunması Mərkəzi Bankın frontend ekosistemində fəaliyyət göstərən hər bir developer üçün məcburi standartdır.

* "angular-template" bazasından kənar layihə başladılmasına icazə verilmir.
* Hər bir Pull Request (PR) Baş Arxitektor və ya komanda rəhbəri tərəfindən Code Review-dan keçməlidir.
* Commit mesajları feat:, fix:, docs:, chore: prefiksləri ilə standartlaşdırılmalıdır.

Sənəd texnoloji yeniliklərə uyğun olaraq periodik olaraq yenilənəcəkdir. Standartlardan kənarlaşma hallarında müvafiq texniki əsaslandırma təqdim edilməlidir.
