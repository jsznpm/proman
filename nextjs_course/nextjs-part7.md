# Next.js (App Router) Kursu — Hissə 7: Autentifikasiya, Formlar və Testing

> Çox hissəli kursun 7-ci hissəsidir. Route Handler-lər, Proxy və
> environment variable-ları öyrəndikdən sonra, indi real tətbiqlərin
> vazkeçilməz hissələrinə keçirik: istifadəçi girişi, form idarəetməsi
> və testlər.

## Kim üçündür

Server Action, Route Handler və cookie/session anlayışlarına bələd olan
developer üçün. Bu hissədən sonra: sadə auth axınının necə qurulacağını,
formların validasiya/pending state-lərini, Vitest/Playwright ilə necə
test yazacağını biləcəksən.

## Məzmun

- [Autentifikasiya: 3 anlayış](#autentifikasiya-3-anlayış)
- [Qeydiyyat/Giriş formu](#qeydiyyatgiriş-formu)
- [Server tərəfdə validasiya](#server-tərəfdə-validasiya)
- [Session İdarəetməsi](#session-idarəetməsi)
- [Avtorizasiya: DAL və DTO](#avtorizasiya-dal-və-dto)
- [Proxy ilə optimistic yoxlama](#proxy-ilə-optimistic-yoxlama)
- [Hazır Auth Kitabxanaları](#hazır-auth-kitabxanaları)
- [Formlar: Server Actions ilə](#formlar-server-actions-ilə)
- [Pending state və Optimistic Update](#pending-state-və-optimistic-update)
- [Testing: növlər və alətlər](#testing-növlər-və-alətlər)
- [Vitest ilə Unit Test](#vitest-ilə-unit-test)
- [Playwright ilə E2E Test](#playwright-ilə-e2e-test)
- [Praktika](#praktika)
- [Xülasə](#xülasə)
- [Əlavə Oxu](#əlavə-oxu)

## Autentifikasiya: 3 anlayış

1. **Authentication (Kimlik Doğrulama)** — istifadəçinin iddia etdiyi
   şəxs olduğunu yoxlayır (username/password və s.)
2. **Session Management** — istifadəçinin auth state-ini sorğular
   arasında saxlayır
3. **Authorization (Səlahiyyətləndirmə)** — istifadəçinin hansı
   route/data-ya çata biləcəyini müəyyən edir

> **Tövsiyə:** Öz auth həllini yazmaq sürətlə mürəkkəbləşir. Production
> layihələrdə hazır kitabxana (NextAuth.js/Auth.js, Clerk, Better Auth,
> Supabase və s.) işlətmək tövsiyə olunur. Bu hissə **təhsil məqsədilə**
> əsas prinsipləri izah edir.

## Qeydiyyat/Giriş formu

Server Action ilə form-dan gələn credential-ları tuturq:

```tsx
// app/ui/signup-form.tsx
'use client'

import { useActionState } from 'react'
import { signup } from '@/app/actions/auth'

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)

  return (
    <form action={action}>
      <input id="name" name="name" placeholder="Ad" />
      {state?.errors?.name && <p>{state.errors.name}</p>}

      <input id="email" name="email" type="email" placeholder="Email" />
      {state?.errors?.email && <p>{state.errors.email}</p>}

      <input id="password" name="password" type="password" />
      {state?.errors?.password && (
        <ul>{state.errors.password.map((e) => <li key={e}>{e}</li>)}</ul>
      )}

      <button disabled={pending} type="submit">Qeydiyyatdan keç</button>
    </form>
  )
}
```

## Server tərəfdə validasiya

Zod kimi schema validasiya kitabxanası ilə:

```ts
// app/lib/definitions.ts
import * as z from 'zod'

export const SignupFormSchema = z.object({
  name: z.string().min(2, { error: 'Ad ən azı 2 simvol olmalıdır.' }).trim(),
  email: z.email({ error: 'Düzgün email daxil edin.' }).trim(),
  password: z
    .string()
    .min(8, { error: 'Ən azı 8 simvol olmalıdır.' })
    .regex(/[a-zA-Z]/, { error: 'Ən azı bir hərf olmalıdır.' })
    .regex(/[0-9]/, { error: 'Ən azı bir rəqəm olmalıdır.' })
    .trim(),
})
```

```ts
// app/actions/auth.ts
'use server'
import { SignupFormSchema } from '@/app/lib/definitions'
import bcrypt from 'bcrypt'

export async function signup(state: any, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors }
  }

  const { name, email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const data = await db.insert(users).values({ name, email, password: hashedPassword }).returning({ id: users.id })
  const user = data[0]

  if (!user) {
    return { message: 'Hesab yaradarkən xəta baş verdi.' }
  }

  // Növbəti addım: session yarat, redirect et
}
```

## Session İdarəetməsi

İki üsul var: **Stateless** (session data cookie-də, JWT kimi) və
**Database** (session ID database-də, cookie-də yalnız şifrələnmiş ID).

### Stateless Session

1. **Secret key generasiyası:**

```bash
openssl rand -base64 32
```

```txt
# .env
SESSION_SECRET=your_secret_key
```

2. **Şifrələmə/deşifrələmə** (`jose` kitabxanası ilə, Edge Runtime ilə
   uyğun):

```ts
// app/lib/session.ts
import 'server-only'
import { SignJWT, jwtVerify } from 'jose'

const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET)

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, { algorithms: ['HS256'] })
    return payload
  } catch {
    console.log('Session doğrulanmadı')
  }
}
```

> **Vacib:** Payload-da yalnız **minimal** unikal data saxla (məs.
> user ID, rol) — şifrə, telefon nömrəsi kimi həssas məlumatları
> **yox**.

3. **Cookie qoymaq** (tövsiyə olunan seçimlərlə):

```ts
// app/lib/session.ts
import { cookies } from 'next/headers'

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, expiresAt })
  const cookieStore = await cookies()

  cookieStore.set('session', session, {
    httpOnly: true, // client-side JS cookie-yə çata bilməsin
    secure: true,   // yalnız https
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}
```

Server Action-da çağırış:

```ts
await createSession(user.id)
redirect('/profile')
```

Sessiyanı silmək (logout):

```ts
export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}
```

> **Database Session** üsulunda isə session ID database-də saxlanılır,
> cookie-də yalnız şifrələnmiş ID olur — daha təhlükəsizdir, amma daha
> mürəkkəbdir (əlavə database sorğusu tələb edir).

## Avtorizasiya: DAL və DTO

**Data Access Layer (DAL)** — bütün data sorğuları və avtorizasiya
məntiqini bir yerdə cəmləşdirir:

```ts
// app/lib/dal.ts
import 'server-only'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { decrypt } from '@/app/lib/session'

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (!session?.userId) {
    redirect('/login')
  }

  return { isAuth: true, userId: session.userId }
})
```

`React.cache` ilə bəzəndiyi üçün eyni render zamanı təkrar çağırılsa
belə bir dəfə işlək qalır.

**Data Transfer Object (DTO)** — client-ə yalnız lazım olan sahələri
qaytarmaq:

```ts
// app/lib/dto.ts
export async function getProfileDTO(slug: string) {
  const user = await db.query.users.findFirst({ where: eq(users.slug, slug) })
  const currentUser = await getUser(user.id)

  return {
    username: canSeeUsername(currentUser) ? user.username : null,
    phonenumber: canSeePhoneNumber(currentUser, user.team) ? user.phonenumber : null,
  }
}
```

### Harada yoxlamaq lazımdır

- **Server Component-lərdə:** rol-a görə fərqli komponent render et.
- **Layout-larda EHTİYATLI OL:** Partial Rendering səbəbindən
  layout-lar naviqasiya zamanı yenidən render olunmur — auth
  yoxlamasını layout-da deyil, data mənbəyinə (DAL) və ya konkret
  page/komponentdə et.
- **Server Action-larda:** hər Action-ı public API endpoint kimi
  düşün, öz avtorizasiyasını özü yoxlasın:

```ts
'use server'
export async function serverAction(formData: FormData) {
  const session = await verifySession()
  if (session.user.role !== 'admin') return null
  // ...
}
```

- **Route Handler-lərdə:** eyni məntiq, uyğun HTTP status kodları ilə
  (`401` — auth yoxdur, `403` — icazə yoxdur).

## Proxy ilə optimistic yoxlama

Proxy hər route-da (prefetch olunanlar daxil) işlədiyi üçün burada
**yalnız cookie-dən oxu** (database sorğusu YOX — performans üçün):

```ts
// proxy.ts
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'

const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/signup', '/']

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  if (isPublicRoute && session?.userId && !path.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
```

> **Vacib:** Proxy yalnız **ilkin (optimistic)** yoxlama üçündür —
> həqiqi təhlükəsizlik yoxlaması **data mənbəyinə ən yaxın yerdə**
> (DAL-da) olmalıdır.

## Hazır Auth Kitabxanaları

Production üçün tövsiyə olunanlar: **Auth0**, **Better Auth**,
**Clerk**, **NextAuth.js (Auth.js)**, **Supabase**, **WorkOS**. Bunlar
sosial login, MFA, rol-əsaslı access control kimi əlavə funksiyalarla
gəlir.

## Formlar: Server Actions ilə

Form `action` prop-u ilə Server Function çağırır, avtomatik `FormData`
alır:

```tsx
// app/invoices/page.tsx
export default function Page() {
  async function createInvoice(formData: FormData) {
    'use server'
    const session = await auth()
    if (!session?.user) throw new Error('Unauthorized')

    const rawFormData = {
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
    }
    // data-nı dəyiş, cache-i revalidate et
  }

  return <form action={createInvoice}>{/* ... */}</form>
}
```

> **Xəbərdarlıq:** Form yalnız autentifikasiya olunmuş səhifədə render
> olunsa belə, **hər Server Action daxilində** auth/authorization
> yoxla — Action-lar birbaşa `POST` sorğusu ilə çağırıla bilər.

### Əlavə arqument ötürmək

```tsx
'use client'
import { updateUser } from './actions'

export function UserProfile({ userId }: { userId: string }) {
  const updateUserWithId = updateUser.bind(null, userId)
  return (
    <form action={updateUserWithId}>
      <input type="text" name="name" />
      <button type="submit">Yenilə</button>
    </form>
  )
}
```

```ts
'use server'
export async function updateUser(userId: string, formData: FormData) {}
```

### Validasiya

- **Client tərəfdə:** HTML atributları (`required`, `type="email"`)
- **Server tərəfdə:** Zod kimi kitabxana ilə, `useActionState` ilə
  göstərilən xəta mesajları (2-ci hissədə ətraflı görmüşdük)

## Pending state və Optimistic Update

`useFormStatus` — ayrıca komponentdə pending state göstərmək üçün:

```tsx
// app/ui/button.tsx
'use client'
import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()
  return <button disabled={pending} type="submit">Göndər</button>
}
```

`useOptimistic` — server cavabını gözləmədən UI-ni dərhal yeniləmək:

```tsx
'use client'
import { useOptimistic } from 'react'
import { send } from './actions'

export function Thread({ messages }: { messages: { message: string }[] }) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage: string) => [...state, { message: newMessage }]
  )

  const formAction = async (formData: FormData) => {
    const message = formData.get('message') as string
    addOptimisticMessage(message)
    await send(message)
  }

  return (
    <div>
      {optimisticMessages.map((m, i) => <div key={i}>{m.message}</div>)}
      <form action={formAction}>
        <input type="text" name="message" />
        <button type="submit">Göndər</button>
      </form>
    </div>
  )
}
```

## Testing: növlər və alətlər

| Test növü | Nə üçün |
|---|---|
| **Unit** | Tək funksiya/hook/komponent |
| **Component** | Komponentin render/prop/event davranışı |
| **Integration** | Bir neçə vahidin birgə işi |
| **E2E** | Brauzerdə real istifadəçi axını |
| **Snapshot** | Render nəticəsini saxlayıb dəyişikliyi aşkarlamaq |

Next.js rəsmi olaraq 4 alətlə inteqrasiyanı sənədləşdirir: **Vitest**,
**Jest** (Unit/Snapshot), **Playwright**, **Cypress** (E2E).

> **Vacib:** `async` Server Component-lər React ekosistemi üçün
> nisbətən yenidir — bəzi alətlər onları tam dəstəkləmir. Bu
> komponentlər üçün Unit Testing əvəzinə **E2E Testing** tövsiyə
> olunur.

## Vitest ilə Unit Test

Quraşdırma:

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom vite-tsconfig-paths
```

```ts
// vitest.config.mts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: { environment: 'jsdom' },
})
```

```json
// package.json
{ "scripts": { "test": "vitest" } }
```

Nümunə test:

```tsx
// __tests__/page.test.tsx
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'

test('Page', () => {
  render(<Page />)
  expect(screen.getByRole('heading', { level: 1, name: 'Home' })).toBeDefined()
})
```

```bash
npm run test
```

## Playwright ilə E2E Test

Quraşdırma:

```bash
npm init playwright
```

Nümunə test:

```ts
// tests/example.spec.ts
import { test, expect } from '@playwright/test'

test('about səhifəsinə keçid', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.click('text=About')
  await expect(page).toHaveURL('http://localhost:3000/about')
  await expect(page.locator('h1')).toContainText('About')
})
```

Testləri işlətmək (production build üzərində, real davranışa daha
yaxın olduğu üçün):

```bash
npm run build
npm run start
# başqa terminalda:
npx playwright test
```

## Praktika

Mini-blog layihəni davam etdir:

1. Sadə (production üçün deyil, **təhsil məqsədli**) login formu qur:
   `app/login/page.tsx` + `app/actions/auth.ts`-də `login` Server
   Action-ı — sabit istifadəçi adı/şifrəni yoxlasın, uğurlu olduqda
   `createSession` çağırıb `/dashboard`-a `redirect` etsin.
2. `app/lib/dal.ts`-də `verifySession()` yaz, `/dashboard/page.tsx`-də
   çağır — sessiya yoxdursa `/login`-ə yönləndirsin.
3. `proxy.ts`-də `/dashboard` üçün optimistic cookie yoxlaması qur.
4. Vitest quraşdır, `app/page.tsx`-in bir başlıq render etdiyini
   yoxlayan unit test yaz.
5. Playwright quraşdır, blog səhifəsindən bir posta keçidi yoxlayan
   E2E test yaz.

## Xülasə

- Auth 3 hissədən ibarətdir: authentication, session management,
  authorization. Production-da hazır kitabxana (Clerk, Auth.js,
  Better Auth və s.) işlətmək tövsiyə olunur.
- Session ya **stateless** (JWT cookie-də), ya **database**-based ola
  bilər; cookie `httpOnly`, `secure`, `sameSite` seçimləri ilə qoyulmalıdır.
- Avtorizasiya məntiqini **DAL**-da cəmləşdir, `React.cache` ilə
  dedublikasiya et, client-ə yalnız lazımi sahələri (**DTO**) qaytar.
- Layout-larda auth yoxlaması etmə (Partial Rendering səbəbindən
  hər naviqasiyada işləməyə bilər) — data mənbəyinə yaxın yoxla.
- Proxy yalnız **optimistic** (cookie-əsaslı) yoxlama üçündür; əsl
  təhlükəsizlik yoxlaması DAL-da/Action-da olmalıdır.
- Formlar Server Action-la `action` prop-u vasitəsilə işləyir;
  `useActionState` xəta/pending, `useFormStatus` ayrıca komponentdə
  pending, `useOptimistic` isə optimistic UI üçündür.
- Test üçün: sync komponentlər/funksiyalar üçün **Vitest**/Jest,
  real istifadəçi axınları və `async` Server Component-lər üçün
  **Playwright**/Cypress (E2E).

## Əlavə Oxu

- [Authentication](https://nextjs.org/docs/app/guides/authentication)
- [Forms](https://nextjs.org/docs/app/guides/forms)
- [Testing](https://nextjs.org/docs/app/guides/testing)
- [Vitest Setup](https://nextjs.org/docs/app/guides/testing/vitest)
- [Playwright Setup](https://nextjs.org/docs/app/guides/testing/playwright)

**Növbəti hissə:** [`nextjs-part8.md`](./nextjs-part8.md) —
Deployment və Praktiki Layihə (kursun sonuncu hissəsi).
