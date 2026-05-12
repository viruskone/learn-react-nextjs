# Lesson 26 Task — Server Actions

## Goal

Create a Server Actions file and use it to add, toggle, and delete todos, replacing the direct `fetch` calls in `src/lib/api.ts`.

## Steps

### 1. Create the actions file

Create `src/actions/todos.ts` with `"use server"` at the top and export at least these action functions:

- `addTodoAction(formData: FormData)` — reads `title` from `formData`, POSTs to the todos API, returns the new `Todo`
- `deleteTodoAction(id: string)` — sends a DELETE request to the todos API
- `updateTodoAction(id: string, changes: Partial<Todo>)` — sends a PATCH request to the todos API

Use `process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000"` as the base URL (Server Actions need an absolute URL).

### 2. Update `src/lib/api.ts` to call Server Actions

Import your new action functions and replace the direct `fetch(...)` calls with calls to your actions:
- `callAddTodo` → call `addTodoAction`
- `callDeleteTodo` → call `deleteTodoAction`
- `callUpdateTodo` → call `updateTodoAction`

### 3. (Bonus) Create a server-side Add form

Create `src/components/ServerAddTodoForm.tsx` — a Server Component that uses a `<form action={addTodoAction}>`. This form would work even with JavaScript disabled.

This is just for learning — the main app can keep using the existing client-side form.

## Success Criteria

- [ ] `src/actions/todos.ts` exists with `"use server"` and at least 2 exported action functions
- [ ] Actions are properly typed with TypeScript
- [ ] At least one action is called from `src/lib/api.ts`
- [ ] No TypeScript errors
- [ ] The app still works (add / toggle / delete)

## Notes

Server Actions in this lesson wrap the existing Route Handlers for simplicity. In a real app, Server Actions would directly interact with a database, skipping the API layer.

When you're done, run `/review-lesson` to get feedback.
