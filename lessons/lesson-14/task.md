# Lesson 14 Task — Layouts & Navigation

## Goal

Add a persistent navbar that uses `<Link>` for navigation and highlights the active page.

## Steps

### 1. Create the Navbar component

Create `src/components/Navbar.tsx`:
- Add `"use client"` at the top (needed for `usePathname`)
- Import `Link` from `"next/link"` and `usePathname` from `"next/navigation"`
- Render a `<nav>` with two links: Home (`/`) and About (`/about`)
- Apply a visual difference (e.g., `font-bold underline`) to the link whose `href` matches the current `pathname`

### 2. Add Navbar to the root layout

Update `src/app/layout.tsx`:
- Import `Navbar`
- Render it above the `{children}` inside `<body>`

### 3. Add some basic layout styling

Wrap the `{children}` in a `<main>` tag with some Tailwind padding, e.g.:

<details>
<summary>Show hint</summary>

```tsx
<main className="max-w-2xl mx-auto p-4">{children}</main>
```

</details>

This centers the content and gives it breathing room.

### 4. Verify navigation

- Click "Home" and "About" in the navbar
- The page content should change without a full reload
- The active link should look visually different

## Success Criteria

- [ ] `Navbar.tsx` exists with `"use client"` at the top
- [ ] `<Link>` is used (not `<a>`) for all internal links
- [ ] Active link is visually highlighted based on the current pathname
- [ ] Navbar is rendered in `app/layout.tsx` and persists across all pages
- [ ] Main content is wrapped in a centered `<main>` container
- [ ] No TypeScript errors

## Hints

- `usePathname()` returns the current URL path, e.g. `"/"` or `"/about"`.
- Keep `app/layout.tsx` as a Server Component — import the Client Component `Navbar` into it, don't add `"use client"` to the layout itself.

When you're done, run `/review-lesson` to get feedback.
