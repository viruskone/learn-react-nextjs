# Task — Lesson 15: Dynamic Routes

## Goal

Add a todo detail page at `/todos/[id]`. Clicking a todo in the list navigates to its detail page. If the ID doesn't exist, show a proper 404 page.

---

## Steps

1. **Create the dynamic route folder and page**

   ```
   app/todos/[id]/page.tsx
   ```

2. **Implement the detail page**

<details>
<summary>Show hint</summary>

```tsx
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}

export default async function TodoDetailPage({ params }: Props) {
  const { id } = await params
  // fetch the todo — use your API route or data layer
  const todo = await getTodoById(id)
  if (!todo) notFound()

  return (
    <main>
      <h1>{todo.text}</h1>
      <p>Status: {todo.completed ? 'Completed' : 'Pending'}</p>
    </main>
  )
}
```

</details>

   Implement `getTodoById(id)` — it can call your existing API route (`/api/todos`) and filter, or read from your data store directly.

3. **Create a `not-found.tsx`**

   ```
   app/todos/[id]/not-found.tsx
   ```

<details>
<summary>Show hint</summary>

```tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <p>Todo not found.</p>
      <Link href="/todos">Back to list</Link>
    </div>
  )
}
```

</details>

4. **Update the todo list page** to link each item to its detail page

<details>
<summary>Show hint</summary>

```tsx
import Link from 'next/link'

{todos.map(todo => (
  <Link key={todo.id} href={`/todos/${todo.id}`}>
    {todo.text}
  </Link>
))}
```

</details>

5. **Test navigation**
   - Click a todo → should navigate to `/todos/<id>` and show the detail
   - Visit `/todos/does-not-exist` → should show the not-found page

---

## Success Criteria

- [ ] `app/todos/[id]/page.tsx` exists and renders todo detail
- [ ] `params` is properly awaited (`const { id } = await params`)
- [ ] `notFound()` is called when the todo doesn't exist
- [ ] A `not-found.tsx` file is in place with a link back to the list
- [ ] Todo items in the list are wrapped in `<Link href={/todos/${id}}>` 
- [ ] No TypeScript errors

---

## Hints

- `params` in Next.js 15 is async — you must `await` it even though it feels unnecessary for a simple value
- The detail page should be a Server Component (no `'use client'`) — data fetching happens on the server
- If you're fetching from your own API route (`/api/todos`), use the full URL in server components: `fetch('http://localhost:3000/api/todos')`
- A cleaner approach: move your data access logic into a shared function (e.g. `lib/todos.ts`) and call it directly instead of going through the HTTP layer

---

## Bonus (optional)

Add `generateStaticParams` to pre-render the detail pages at build time. Note: this only makes sense if your todos come from a static source, not a live database.

---

When you're done, run `/review-lesson` to get feedback.
