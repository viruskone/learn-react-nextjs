# Lesson 19 Task — Route Handlers (API Routes)

## Goal

Create a REST API for todos using Next.js Route Handlers.

## Steps

### 1. Create the todos collection endpoint

Create `src/app/api/todos/route.ts`.

At the top of the file, define in-memory storage:

```ts
import type { Todo } from "@/types/todo";

let todos: Todo[] = [
  { id: "1", title: "Buy milk", completed: false },
  { id: "2", title: "Read a book", completed: true },
];
```

Implement:
- `GET` — return all todos as JSON (status 200)
- `POST` — read a `title` from the request body, create a new todo with `crypto.randomUUID()`, push it to the array, return the new todo (status 201)

### 2. Create the single todo endpoint

Create `src/app/api/todos/[id]/route.ts`.

Implement:
- `PATCH` — read `completed` from body, find the todo by id, update it, return the updated todo (status 200). Return 404 if not found.
- `DELETE` — find the todo by id, remove it from the array, return status 204 with no body. Return 404 if not found.

### 3. Test with curl or the browser

**Test GET:**
```bash
curl http://localhost:3000/api/todos
```

**Test POST:**
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Walk the dog"}'
```

**Test PATCH:**
```bash
curl -X PATCH http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

**Test DELETE:**
```bash
curl -X DELETE http://localhost:3000/api/todos/1
```

## Success Criteria

- [ ] `GET /api/todos` returns the todos array
- [ ] `POST /api/todos` with `{ title }` in body creates and returns a new todo
- [ ] `PATCH /api/todos/[id]` with `{ completed }` updates and returns the todo
- [ ] `DELETE /api/todos/[id]` removes the todo (returns 204)
- [ ] 404 is returned when an ID doesn't exist (for PATCH and DELETE)
- [ ] All handlers use `NextRequest` and `NextResponse` types correctly
- [ ] No TypeScript errors

## Hints

- `await params` before destructuring (Next.js 15 change): `const { id } = await params;`
- For DELETE with 204, return `new NextResponse(null, { status: 204 })` — you can't use `NextResponse.json(null)` for 204.
- The in-memory `todos` array resets when the dev server restarts — that's expected.

When you're done, run `/review-lesson` to get feedback.
