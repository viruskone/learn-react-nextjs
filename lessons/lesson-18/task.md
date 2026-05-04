# Task — Lesson 18: Rendering Strategies & Caching

## Goal

Add `revalidatePath` to your Route Handlers so the `/todos` page cache is invalidated after every mutation. Then observe the difference between cached and uncached fetches.

---

## Steps

1. **Add `revalidatePath` to your POST (create) handler**

   In `app/api/todos/route.ts`:

<details>
<summary>Show hint</summary>

```tsx
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  const { text } = await request.json()
  // ... create the todo
  revalidatePath('/todos')
  return Response.json(newTodo, { status: 201 })
}
```

</details>

2. **Add `revalidatePath` to PATCH (toggle) and DELETE handlers**

   Same pattern in `app/api/todos/[id]/route.ts`.

3. **Test: verify the list refreshes after mutation**
   - Open `/todos` in the browser
   - Add a todo
   - Hard-reload the page (`Ctrl+Shift+R`) — the new todo should still be there

4. **Add `force-dynamic` to the todos page** (for now, to ensure it always renders fresh):

   In `app/todos/page.tsx`:

<details>
<summary>Show hint</summary>

```tsx
export const dynamic = 'force-dynamic'
```

</details>

5. **Observe caching in the terminal**
   - Start `npm run dev`
   - Navigate to `/todos` repeatedly
   - Look for cache-related output in the terminal

---

## Success Criteria

- [ ] `revalidatePath('/todos')` is called in POST, PATCH, and DELETE handlers
- [ ] The todos page shows fresh data after adding/toggling/deleting — even after a hard reload
- [ ] `export const dynamic = 'force-dynamic'` added to `app/todos/page.tsx`
- [ ] No TypeScript errors

---

## Hints

- `revalidatePath` must be called from a Server Action or Route Handler — it's a server-only function
- If you're seeing stale data after mutation and `revalidatePath` is in place, check that the fetch in your page component doesn't have `cache: 'force-cache'` hardcoded
- In Next.js 15, bare `fetch()` calls are NOT cached by default — so if your page fetches from your API route, it should already be fresh; `revalidatePath` matters more for ISR scenarios

---

## Bonus (optional)

Experiment with `export const revalidate = 10` on the todos page instead of `force-dynamic`. Visit the page, add a todo via the API directly (using curl or a REST client), then observe how the page doesn't update immediately but refreshes after 10 seconds.

---

When you're done, run `/review-lesson` to get feedback.
