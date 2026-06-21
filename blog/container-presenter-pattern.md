---
title: "Container–Presenter Pattern (SOLID-ə uyğun versiya)"
description: "React-də Container–Presenter pattern-i Service Layer və Custom Hook ilə SOLID prinsiplərinə uyğun qurmaq."
date: 2026-06-21
tags: [react, design-patterns, solid, typescript, architecture]
---

# Container–Presenter Pattern (SOLID-ə uyğun versiya)

## İzah

- **Presenter Component** → Yalnız UI-dən məsuldur, məlumatı **props** vasitəsilə alır və göstərir.
- **Container Component** → Presenter ilə hook/service arasında körpü rolunu oynayır.
- **Hook (Custom Hook)** → Biznes məntiqini (state idarəsi, data fetching) daşıyır.
- **Service Layer** → API çağırışlarını icra edir.

➡️ Bu yanaşma **SOLID** prinsiplərinə daha uyğundur.

## Layihə Strukturunun Nümunəsi

```text
src/
 ├─ services/
 │   └─ userService.ts
 ├─ hooks/
 │   └─ useUsers.ts
 ├─ components/
 │   ├─ UserList.tsx          (Presenter)
 │   └─ UserListContainer.tsx (Container)
```

## Service Layer (API çağırışı)

```tsx
// services/userService.ts
export async function fetchUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
}
```

## Custom Hook (Biznes məntiqi)

```tsx
// hooks/useUsers.ts
import { useEffect, useState } from "react";
import { fetchUsers } from "../services/userService";

export function useUsers() {
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  return { users, loading };
}
```

## Presenter Component (UI)

```tsx
// components/UserList.tsx
type User = {
  id: number;
  name: string;
};

interface UserListProps {
  users: User[];
  loading: boolean;
}

export const UserList = ({ users, loading }: UserListProps) => {
  if (loading) return <p>Yüklənir...</p>;

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
};
```

## Container Component

```tsx
// components/UserListContainer.tsx
import { useUsers } from "../hooks/useUsers";
import { UserList } from "./UserList";

export const UserListContainer = () => {
  const { users, loading } = useUsers();
  return <UserList users={users} loading={loading} />;
};
```

## Əsas Faydalar

- **Separation of Concerns** → hər layer yalnız öz işini görür.
- **Testability** → `useUsers` və Service ayrıca test edilə bilər.
- **Reusability** → `useUsers` başqa komponentlərdə də istifadə oluna bilər.
- **SOLID prinsiplərinə uyğunluq** → SRP və Dependency Inversion qorunur.
