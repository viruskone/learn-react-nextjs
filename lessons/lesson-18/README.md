# Lesson 18 — Rendering Strategies & Caching

## The Big Picture

Next.js can render pages in different ways. Understanding which strategy applies (and when) is one of the most important mental models for writing correct Next.js apps.

---

## Static Rendering (SSG)

The page is rendered **once at build time** (`npm run build`) and cached. Every visitor gets the same pre-built HTML.

- Fastest delivery — served from CDN edge
- Best for: marketing pages, documentation, blog posts — content that doesn't change per request

```tsx
// Static by default — no dynamic data access
export default async function AboutPage() {
  return <h1>About Us</h1>
}
```

---

## Dynamic Rendering (SSR)

The page is rendered **on each request**. Next.js opts into dynamic rendering automatically when it detects:
- `cookies()` or `headers()` usage
- `searchParams` access
- A `fetch()` with `cache: 'no-store'`

```tsx
import { cookies } from 'next/headers'

export default async function ProfilePage() {
  const cookieStore = await cookies()
  const userId = cookieStore.get('userId')?.value
  // This page is now dynamically rendered
  return <p>User: {userId}</p>
}
```

---

## Incremental Static Regeneration (ISR)

Hybrid: static, but re-generated periodically or on-demand.

```tsx
// Revalidate every 60 seconds
export const revalidate = 60

export default async function TodosPage() {
  const todos = await fetchTodos()
  return <TodoList todos={todos} />
}
```

Or per-fetch:
```tsx
const data = await fetch('/api/todos', { next: { revalidate: 60 } })
```

---

## Next.js 15 Caching: What Changed

In **Next.js 14 and earlier**, `fetch()` was cached by default — you had to opt out.

In **Next.js 15**, `fetch()` is **NOT cached by default**. You now opt in to caching:

```tsx
// Next.js 15 — explicit cache opt-in
const data = await fetch('/api/todos', { cache: 'force-cache' })

// No cache (default in Next.js 15)
const data = await fetch('/api/todos')

// Revalidate periodically
const data = await fetch('/api/todos', { next: { revalidate: 60 } })
```

This is a breaking change from older tutorials — if you see code using `fetch` without cache options and it seems too aggressive in refetching, this is why.

---

## revalidatePath and revalidateTag

When you mutate data (add, update, delete a todo), you need to invalidate the cached version of the page so the next request fetches fresh data.

```tsx
import { revalidatePath } from 'next/cache'

// In a Server Action or Route Handler:
export async function POST(request: Request) {
  const { text } = await request.json()
  await createTodo(text)
  revalidatePath('/todos')  // ← invalidate the /todos page cache
  return Response.json({ success: true })
}
```

`revalidateTag` is more granular — you tag fetches and invalidate by tag:

```tsx
// Tagging a fetch:
const data = await fetch('/api/todos', { next: { tags: ['todos'] } })

// Invalidating by tag:
revalidateTag('todos')  // revalidates all fetches tagged 'todos'
```

---

## force-dynamic

To guarantee a page is always rendered dynamically (never cached), add this export:

```tsx
export const dynamic = 'force-dynamic'
```

Useful for pages that always show real-time data (dashboards, inboxes).

---

## Summary

| Strategy | When | How to configure |
|----------|------|-----------------|
| Static (SSG) | Build time, no dynamic data | Default when no dynamic APIs used |
| Dynamic (SSR) | Per request | Use `cookies()`, `headers()`, `cache: 'no-store'`, or `force-dynamic` |
| ISR | Static + periodic refresh | `export const revalidate = N` or `{ next: { revalidate: N } }` |
| On-demand revalidation | After mutation | `revalidatePath()` or `revalidateTag()` |

---

## Visualising the Cache

Next.js logs caching behaviour in the terminal during `npm run dev`. Lines like:
```
GET /todos 200 in 45ms
```
vs with caching:
```
GET /todos [cache: HIT] 200 in 2ms
```

The `[cache: HIT]` indicator tells you the response came from cache.
