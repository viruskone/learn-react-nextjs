# Lesson 15 — Dynamic Routes

## Static vs Dynamic Routes

So far all your routes have been **static** — the URL is fixed:
- `/` → `app/page.tsx`
- `/todos` → `app/todos/page.tsx`

**Dynamic routes** match a variable segment in the URL. A single file handles many URLs:
- `/todos/1`, `/todos/2`, `/todos/abc` → `app/todos/[id]/page.tsx`

The `[id]` in the folder name is the segment parameter.

---

## Folder Structure

```
app/
  todos/
    page.tsx          ← /todos (list of all todos)
    [id]/
      page.tsx        ← /todos/:id (single todo detail)
```

---

## Accessing Params

The `params` prop contains the dynamic segment values. In Next.js 15, `params` is a **Promise** — you must await it:

```tsx
// app/todos/[id]/page.tsx
type Props = {
  params: Promise<{ id: string }>
}

export default async function TodoDetailPage({ params }: Props) {
  const { id } = await params

  // fetch the specific todo using id
  const todo = await getTodoById(id)

  return <div>{todo.text}</div>
}
```

---

## notFound()

If the requested ID doesn't exist, call `notFound()` to render the nearest `not-found.tsx`:

```tsx
import { notFound } from 'next/navigation'

export default async function TodoDetailPage({ params }: Props) {
  const { id } = await params
  const todo = await getTodoById(id)

  if (!todo) notFound()

  return <div>{todo.text}</div>
}
```

Create `app/todos/[id]/not-found.tsx` (or `app/not-found.tsx` as a fallback):

```tsx
export default function NotFound() {
  return <p>Todo not found.</p>
}
```

---

## Linking to Dynamic Routes

Use `<Link>` with a dynamic `href`:

```tsx
import Link from 'next/link'

{todos.map(todo => (
  <Link key={todo.id} href={`/todos/${todo.id}`}>
    {todo.text}
  </Link>
))}
```

---

## generateStaticParams (Optional Optimisation)

For a statically built site, you can tell Next.js all the possible IDs at build time so it pre-renders each page:

```tsx
// app/todos/[id]/page.tsx
export async function generateStaticParams() {
  const todos = await getAllTodos()
  return todos.map(todo => ({ id: todo.id }))
}
```

Without this, the page is rendered on-demand (dynamically) the first time it's requested. For a Todo App backed by a database, dynamic rendering is fine.

---

## Catch-All Segments

You can match multiple path segments with `[...slug]`:

```
app/docs/[...slug]/page.tsx
```
- matches `/docs/intro`
- matches `/docs/react/hooks`
- matches `/docs/next/routing/dynamic`

`params.slug` will be an array: `['react', 'hooks']`.

You'll use this in larger apps for documentation sites, file explorers, etc. Not needed for the Todo App but good to know.

---

## Route Groups (Bonus Context)

Folders wrapped in `(parentheses)` are **route groups** — they organise files without affecting the URL:

```
app/
  (marketing)/
    about/page.tsx   ← /about
    contact/page.tsx ← /contact
  (app)/
    todos/page.tsx   ← /todos
```

Route groups let you apply different layouts to different sections without polluting the URL.
