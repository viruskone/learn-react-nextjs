# Lesson 13 Task — Intro to Next.js & App Router

## Goal

Explore the Next.js project structure and create a new `/about` page.

## Steps

### 1. Explore the project structure

Take a few minutes to look at what `create-next-app` generated:
- `src/app/layout.tsx` — root layout
- `src/app/page.tsx` — home page (`/`)
- `src/app/globals.css` — global styles
- `next.config.ts` — Next.js configuration
- `tsconfig.json` — TypeScript configuration
- `tailwind.config.ts` — Tailwind configuration

Open each one and read it. You don't need to understand every line — just get familiar.

### 2. Add metadata to the home page

Open `src/app/page.tsx` and add a metadata export:

<details>
<summary>Show hint</summary>

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo App",
  description: "A simple todo app built with Next.js and React",
};
```

</details>

Check the browser tab — it should now show "Todo App".

### 3. Create an About page

Create `src/app/about/page.tsx`:
- Add a metadata export with title "About"
- Render a page with an `<h1>About</h1>` and a short paragraph explaining what the app does

### 4. Navigate to it

Visit `http://localhost:3000/about` directly in the browser. You should see your About page.

### 5. Add `"use client"` to TodoApp

If you open the browser console, you may see errors about hooks not working in Server Components. Add `"use client"` at the very top of `src/components/TodoApp.tsx`:

<details>
<summary>Show hint</summary>

```tsx
"use client";
```

</details>

This makes the component (and its children that use hooks) run on the client.

## Success Criteria

- [ ] `src/app/about/page.tsx` exists and is accessible at `/about`
- [ ] The home page has a `metadata` export with a meaningful title
- [ ] The About page has its own `metadata` export
- [ ] `TodoApp.tsx` has `"use client"` at the top
- [ ] No console errors
- [ ] No TypeScript errors

## Hints

- Next.js dev server hot-reloads — you don't need to restart after adding files.
- The `metadata` export must be in a Server Component (file without `"use client"`).
- You can verify the page title changes in the browser tab.

When you're done, run `/review-lesson` to get feedback.
