# Lesson 26 — Server Actions

## What are Server Actions?

Server Actions are async functions that run on the **server** but can be called from a Client Component. They let you handle form submissions and mutations without writing a separate API route.

Mark a function with `"use server"` to make it a Server Action:

```tsx
// Can be defined in a separate file
"use server";

export async function createCommentAction(formData: FormData) {
  const text = formData.get("text") as string;
  // This runs on the server — can access databases, etc.
  console.log("Creating comment:", text);
}
```

## Two Ways to Use Server Actions

### 1. In a `<form>` action attribute (no JS required)

```tsx
import { createCommentAction } from "@/actions/comments";

export default function CommentForm() {
  return (
    <form action={createCommentAction}>
      <input name="text" placeholder="Write a comment..." />
      <button type="submit">Post</button>
    </form>
  );
}
```

The form works even with JavaScript disabled. The action runs on the server.

### 2. Called programmatically from a Client Component

```tsx
"use client";

import { createCommentAction } from "@/actions/comments";

function MyComponent() {
  async function handleSubmit() {
    await createCommentAction(new FormData(...));
  }
}
```

## The "use server" Directive

Like `"use client"`, it goes at the top of a file or at the top of an individual function:

```tsx
// File-level: all exports in this file are server actions
"use server";

export async function createComment(...) { ... }
export async function deleteComment(...) { ... }

// Or function-level (inside a Server Component):
async function handleSubmit(formData: FormData) {
  "use server";
  // ...
}
```

## useFormStatus and useActionState

React 19 adds hooks for Server Action state:

```tsx
"use client";
import { useActionState } from "react";
import { createCommentAction } from "@/actions/comments";

export function CommentForm() {
  const [state, action, isPending] = useActionState(createCommentAction, null);

  return (
    <form action={action}>
      <input name="text" disabled={isPending} />
      <button disabled={isPending}>
        {isPending ? "Posting..." : "Post"}
      </button>
    </form>
  );
}
```

## Revalidating After Mutations

After a Server Action mutates data, you need to tell Next.js to refresh the data. Use `revalidatePath`:

```tsx
"use server";
import { revalidatePath } from "next/cache";

export async function createCommentAction(formData: FormData) {
  const text = formData.get("text") as string;
  // ... add to database ...
  revalidatePath("/posts"); // re-fetch data for the posts page
}
```
