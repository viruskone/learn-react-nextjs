# Task — Lesson 29: Metadata & SEO

## Goal

Add proper metadata to the Todo App: a title template in the root layout, static metadata on the todos list page, and dynamic metadata on the todo detail page.

---

## Steps

1. **Update `app/layout.tsx`** to add a title template and description:

<details>
<summary>Show hint</summary>

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Todo App',
    default: 'Todo App',
  },
  description: 'A simple todo app built with Next.js 16',
}
```

</details>

2. **Add metadata to `app/todos/page.tsx`**:

<details>
<summary>Show hint</summary>

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Todos',
  description: 'View and manage your todo list',
}
```

</details>

   After this, the browser tab should show **"My Todos | Todo App"**.

3. **Add `generateMetadata` to `app/todos/[id]/page.tsx`**:

<details>
<summary>Show hint</summary>

The existing page already uses `PageProps<'/todos/[id]'>` — you can use the same type for `generateMetadata`:

```tsx
import type { Metadata } from 'next'

export async function generateMetadata(props: PageProps<'/todos/[id]'>): Promise<Metadata> {
  const { id } = await props.params
  const todo = await getTodoById(id)
  if (!todo) return { title: 'Not Found' }
  return {
    title: todo.title,
    description: `Status: ${todo.completed ? 'Completed' : 'Pending'}`,
  }
}
```

</details>

4. **Verify in the browser**:
   - `/todos` tab should show "My Todos | Todo App"
   - `/todos/<id>` tab should show the todo title + "| Todo App"
   - A non-existent ID should show "Not Found | Todo App"

---

## Success Criteria

- [ ] Root layout exports `metadata` with a `title.template` using `'%s | Todo App'`
- [ ] `app/todos/page.tsx` exports static `metadata` with `title: 'My Todos'`
- [ ] `app/todos/[id]/page.tsx` exports `generateMetadata` that returns the todo's `title` as the metadata title
- [ ] `generateMetadata` handles the not-found case gracefully
- [ ] Browser tab titles are correct for all three pages
- [ ] No TypeScript errors

---

## Hints

- `generateMetadata` must be in the same file as the `page.tsx` — not in a separate file
- The existing page uses `PageProps<'/todos/[id]'>` — you can reuse that type for `generateMetadata` too
- The `Metadata` type is imported from `'next'`, not from `'next/metadata'`

---

## Bonus (optional)

Add Open Graph metadata to the root layout with a default image. Use the `opengraph-image.png` convention by placing an image at `app/opengraph-image.png` — Next.js will use it automatically for all pages that don't override it.

---

When you're done, run `/review-lesson` to get feedback.
