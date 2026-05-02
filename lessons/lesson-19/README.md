# Lesson 19 — Route Handlers (API Routes)

## What are Route Handlers?

Route Handlers let you create HTTP API endpoints inside your Next.js app. They live in `app/api/` and are defined in files named `route.ts`:

```
app/
  api/
    notes/
      route.ts     → GET /api/notes, POST /api/notes
      [id]/
        route.ts   → GET /api/notes/123, PATCH /api/notes/123, DELETE /api/notes/123
```

## Defining Handlers

Export named functions matching HTTP methods:

```ts
import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ message: "hello" });
}

export function POST() {
  return NextResponse.json({ message: "created" }, { status: 201 });
}
```

## Reading the Request Body

For POST/PATCH, read JSON from the request body:

```ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  // body is the parsed JSON
  return NextResponse.json(body, { status: 201 });
}
```

## Dynamic Route Segments

For routes like `/api/notes/[id]`, the second argument contains the route params:

```ts
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // delete the item with this id
  return NextResponse.json({ deleted: id });
}
```

Note: In Next.js 15, `params` is a Promise — you must `await` it.

## In-Memory Storage

Since we don't have a database yet, use a module-level variable:

```ts
// This persists across requests in development (module singleton)
// It resets on server restart
let notes: Note[] = [
  { id: "1", title: "Meeting agenda", content: "Discuss Q4 goals" },
];
```

**Warning**: This only works in development/single-server setups. In production with multiple instances, use a real database. You'll add that later.

## HTTP Status Codes

| Code | Meaning | When to use |
|------|---------|-------------|
| 200 | OK | Successful GET, PATCH |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid input |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Unexpected error |

## NextResponse vs Response

Both work. Prefer `NextResponse` for its convenience methods:

```ts
// NextResponse (Next.js helper)
return NextResponse.json(data, { status: 200 });

// Or plain Response
return Response.json(data, { status: 200 });
```
