# Lesson 26 Task — Server Actions

## Goal

Create a Server Actions file and use it to add and delete todos, replacing the direct `fetch` calls in `useTodos`.

## Steps

### 1. Create the actions file

Create `src/actions/todos.ts`:

```ts
"use server";

import type { Todo } from "@/types/todo";

export async function addTodoAction(formData: FormData): Promise<Todo> {
  const title = formData.get("title") as string;
  const res = await fetch("http://localhost:3000/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
}

export async function deleteTodoAction(id: string): Promise<void> {
  await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "DELETE",
  });
}

export async function toggleTodoAction(id: string, completed: boolean): Promise<Todo> {
  const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  return res.json();
}
```

Note: Server Actions need an absolute URL when calling their own app's API routes in development. Use `process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000"` as the base URL.

### 2. Update useTodos to call Server Actions

Update `src/hooks/useTodos.ts`:
- Import the actions
- Replace `fetch("/api/todos", { method: "POST", ... })` with `await addTodoAction(formData)`
- Or call the action functions directly (they're just async functions)

The simplest approach: keep calling the Route Handlers directly from the hook, but extract the logic into the actions file so it's reusable.

### 3. Create an alternative Server-side Add form (bonus exploration)

Create `src/components/ServerAddTodoForm.tsx` — a Server Component that uses a `<form>` with `action={addTodoAction}`. This form works without JavaScript.

This is just for learning — the main app can keep using the existing Client Component form.

## Success Criteria

- [ ] `src/actions/todos.ts` exists with `"use server"` and at least 2 exported action functions
- [ ] Actions are properly typed with TypeScript
- [ ] At least one action is called from `useTodos` or a component
- [ ] No TypeScript errors
- [ ] The app still works (add/toggle/delete)

## Notes

Server Actions in this lesson wrap the existing Route Handlers for simplicity. In a real app, Server Actions would directly interact with a database, skipping the API layer.

When you're done, run `/review-lesson` to get feedback.
