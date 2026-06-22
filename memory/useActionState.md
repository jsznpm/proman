---
title: "React 19-da useActionState Hook"
description: "Server Action-larla sadə və effektiv state idarəetməsi"
date: 2026-06-20
tags: [react, react-19, hooks, server-actions]
---

# React 19-da `useActionState` Hook: Server Action-larla Sadə və Effektiv State İdarəetməsi

React ekosistemi hər yeni versiyada inkişaf etməyə davam edir və React 19 bu baxımdan olduqca əhəmiyyətli yeniliklər təqdim etdi. Bu yeniliklər arasında xüsusilə iki anlayış ön plana çıxır: **Server Components** və **Server Actions**.

Bu məqalədə daha çox bu yeniliklərlə birlikdə təqdim olunan `useActionState` hook-un nə olduğunu, necə işlədiyini və real istifadəsini izah edəcəyik.

## Server Actions nədir?

React 19 ilə birlikdə təqdim olunan **Server Actions** — server tərəfində işləyən funksiyalardır. Bu funksiyalar vasitəsilə form göndərmə kimi əməliyyatları API yaratmadan birbaşa serverdə idarə etmək mümkün olur.

Sadə bir nümunəyə baxaq:

```js
"use server";

async function submitForm(formData) {
  const name = formData.get("name");
  return { message: `Hello, ${name}!` };
}
```

Bu funksiya formdan gələn `name` dəyərini götürür və ona uyğun mesaj qaytarır.

## `useActionState` nədir?

React sənədlərinə görə, `useActionState`:

> "form action nəticəsinə əsasən state-i yeniləməyə imkan verən hook-dur."

Sadə dillə desək:

- 👉 Server action nəticəsini avtomatik state kimi idarə edir
- 👉 UI və server arasında körpü rolunu oynayır
- 👉 Client-side state yazma ehtiyacını azaldır

## `useActionState` sintaksisi

```js
const [state, action, isPending] = useActionState(actionFunction, initialState, permalink);
```

**Parametrlər:**

- `state` → action-dan gələn nəticə
- `action` → server action-u çağıran funksiya
- `isPending` → action işləyir ya yox (boolean)
- `actionFunction` → server funksiyası
- `initialState` → başlanğıc state
- `permalink` *(optional)* → URL ilə bağlı identifikator

## Form ilə istifadə nümunəsi

Server action-u bir az inkişaf etdirək:

```js
"use server";

export async function submitForm(_, formData) {
  const name = formData.get("name");

  const hour = new Date().getHours();
  let greeting;

  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";
  else greeting = "Good evening";

  return { message: `${greeting}, ${name}` };
}
```

Client komponent:

```jsx
"use client";

import { useActionState } from "react";
import { submitForm } from "./actions/submitForm";

export default function Greeter() {
  const [state, submit, isPending] = useActionState(submitForm, {
    message: "",
  });

  return (
    <form action={submit}>
      <input name="name" required />
      <button disabled={isPending}>
        {isPending ? "Göndərilir..." : "Göndər"}
      </button>

      {state.message && <p>{state.message}</p>}
    </form>
  );
}
```

**Nəticə:**

- Button klik ediləndə `isPending = true`
- Server action işləyir
- Nəticə `state.message` kimi UI-da göstərilir

## Form-dan kənar istifadə

`useActionState` yalnız form üçün deyil — button klikləri üçün də istifadə oluna bilər.

**Misal: API-dən istifadəçi məlumatları çəkmək**

```js
"use server";

export async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users?_limit=5");
  return res.json();
}
```

Client tərəfi:

```jsx
"use client";

import { useActionState, startTransition } from "react";
import { getUsers } from "./actions/getUsers";

export default function FetchUsers() {
  const [users, fetchUsers, isPending] = useActionState(getUsers, []);

  return (
    <>
      <button
        onClick={() => startTransition(() => fetchUsers())}
        disabled={isPending}
      >
        {isPending ? "Yüklənir..." : "İstifadəçiləri gətir"}
      </button>

      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}
```

## `startTransition` nə üçündür?

React-da bəzi əməliyyatlar yüksək prioritetli olur (məsələn: render). Bu səbəbdən `isPending` bəzən gözlədiyiniz kimi işləməyə bilər.

Bu problemi həll etmək üçün:

```js
startTransition(() => fetchUsers());
```

👉 Bu, React-a deyir ki:

- Bu update aşağı prioritetlidir
- UI bloklanmadan işləsin

## `useActionState` üstünlükləri

- ✅ Daha az client-side state
- ✅ API endpoint yazmağa ehtiyac yoxdur
- ✅ Server ilə birbaşa inteqrasiya
- ✅ Sadə form handling
- ✅ Built-in loading state (`isPending`)
