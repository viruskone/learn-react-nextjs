# Task — Lesson 20: Proxy

## Goal

Add a proxy that:
1. Logs every incoming request (dev only)
2. Redirects `/` to `/todos`

---

## Steps

1. **Create `proxy.ts`** at the project root (next to `app/`, `package.json`, etc.)

2. **Add request logging** (only in development):

<details>
<summary>Show hint</summary>

```tsx
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[proxy] ${request.method} ${request.nextUrl.pathname}`)
  }

  return NextResponse.next()
}
```

</details>

3. **Add the root redirect**:

<details>
<summary>Show hint</summary>

```tsx
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (process.env.NODE_ENV === 'development') {
    console.log(`[proxy] ${request.method} ${pathname}`)
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/todos', request.url))
  }

  return NextResponse.next()
}
```

</details>

4. **Add the matcher config** to exclude Next.js internals:

<details>
<summary>Show hint</summary>

```tsx
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
```

</details>

5. **Test it**
   - Run `npm run dev`
   - Visit `http://localhost:3000/` — you should be redirected to `/todos`
   - Check the terminal — every request should log `[proxy] GET /todos`

---

## Success Criteria

- [ ] `proxy.ts` exists at the project root
- [ ] Visiting `/` redirects to `/todos`
- [ ] Request logs appear in the terminal during `npm run dev`
- [ ] Log only runs in development (`process.env.NODE_ENV === 'development'`)
- [ ] Matcher config excludes `_next/static`, `_next/image`, `favicon.ico`
- [ ] Other routes (e.g. `/todos/[id]`) still work normally

---

## Hints

- `proxy.ts` must be at the root of the project, **not** inside `app/` — a common mistake
- `NextResponse.next()` is required at the end — omitting it will cause the request to hang
- Unlike the old middleware, `proxy.ts` runs on the **Node.js runtime**, so `process.env.NODE_ENV` is always available

---

## Bonus (optional)

Add a second redirect: if the user visits `/home`, also redirect to `/todos`. Then extend the proxy to log the redirect destination when one occurs.

---

When you're done, run `/review-lesson` to get feedback.
