# Lesson 17 Task — Data Fetching

## Goal

Create a new `/posts` page that fetches and displays data from a public API using Next.js server-side data fetching.

## Background

This lesson runs parallel to the main Todo App to teach the data fetching pattern without breaking the existing localStorage-based todos. You'll integrate API-fetched todos into the main app in Lesson 21.

## Steps

### 1. Create a /posts page

Create `src/app/posts/page.tsx` as an **async Server Component**.

Fetch data from JSONPlaceholder:
```
https://jsonplaceholder.typicode.com/posts?_limit=10
```

Define a `Post` interface:
```ts
interface Post {
  id: number;
  title: string;
  body: string;
}
```

Render the posts in a list — show the title prominently and the body in smaller text.

### 2. Add a loading state

Create `src/app/posts/loading.tsx`:

```tsx
export default function Loading() {
  return (
    <div className="p-4">
      <p className="text-gray-500">Loading posts...</p>
    </div>
  );
}
```

### 3. Add error handling

Add a try/catch in the page to handle fetch failures:

```tsx
try {
  const res = await fetch("...", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch posts");
  const posts: Post[] = await res.json();
  // render posts
} catch (error) {
  return <p className="text-red-500">Failed to load posts. Try again later.</p>;
}
```

### 4. Add a link in the Navbar

Add a "Posts" link to `src/components/Navbar.tsx` pointing to `/posts`.

## Success Criteria

- [ ] `app/posts/page.tsx` is an async Server Component (no `"use client"`)
- [ ] It fetches from JSONPlaceholder and renders at least the title of each post
- [ ] `Post` interface is defined and used to type the response
- [ ] `app/posts/loading.tsx` exists
- [ ] Error handling is present (try/catch or `.ok` check)
- [ ] The Posts link in the Navbar works
- [ ] No TypeScript errors

## Hints

- An `async` Server Component looks like: `export default async function PostsPage() { ... }`
- `fetch` in a Server Component runs on the server — it won't appear in the browser's Network tab.
- You can test the error path by changing the URL to something invalid temporarily.

When you're done, run `/review-lesson` to get feedback.
