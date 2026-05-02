# Lesson 16 Task — Server vs Client Components

## Goal

Refactor the app so that only components that actually need interactivity are Client Components, keeping pages as Server Components.

## Steps

### 1. Audit your current components

Go through each file in `src/components/` and `src/app/` and decide:
- Does it use `useState`, `useEffect`, `useRouter`, `usePathname`, or any browser API?
  - YES → needs `"use client"`
  - NO → can be a Server Component (remove `"use client"` if present)

Current expected breakdown:
| File | Should be |
|------|-----------|
| `app/page.tsx` | Server Component |
| `app/about/page.tsx` | Server Component |
| `app/layout.tsx` | Server Component |
| `components/Navbar.tsx` | Client Component (`usePathname`) |
| `components/TodoApp.tsx` | Client Component (`useState`, hooks) |
| `components/TodoList.tsx` | Client Component (receives callback props from client) |
| `components/TodoItem.tsx` | Client Component (checkbox interaction) |
| `components/AddTodoForm.tsx` | Client Component (`useState`) |

### 2. Verify the home page is a Server Component

`src/app/page.tsx` should NOT have `"use client"`. It's just:

<details>
<summary>Show hint</summary>

```tsx
import TodoApp from "@/components/TodoApp";

export default function Home() {
  return <TodoApp />;
}
```

</details>

The page itself is a server component — it just renders a Client Component tree.

### 3. Add a static footer

Create `src/components/Footer.tsx` — a Server Component (no `"use client"`):

<details>
<summary>Show hint</summary>

```tsx
export default function Footer() {
  return (
    <footer className="text-center text-sm text-gray-500 p-4">
      Built with Next.js & React
    </footer>
  );
}
```

</details>

Import it in `src/app/layout.tsx` and render it after `<main>`.

## Success Criteria

- [ ] `app/page.tsx` has no `"use client"`
- [ ] `app/layout.tsx` has no `"use client"`
- [ ] `TodoApp.tsx`, `Navbar.tsx`, `AddTodoForm.tsx` have `"use client"`
- [ ] `Footer.tsx` exists and is a Server Component
- [ ] Footer is visible on all pages
- [ ] No console errors about hooks in Server Components
- [ ] No TypeScript errors

## Hints

- If you get "hooks can only be called inside a function component" errors, you're using hooks in a Server Component.
- `"use client"` must be the **first line** of the file — before any imports.
- A Client Component imported by a Server Component still works fine — the boundary applies to the component tree at render time.

When you're done, run `/review-lesson` to get feedback.
