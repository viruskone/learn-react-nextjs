# Task — Lesson 20: Middleware

## Goal

Add middleware that:
1. Logs every incoming request (dev only)
2. Redirects `/` to `/todos`

---

## Steps

1. **Create `middleware.ts`** at the project root (next to `app/`, `package.json`, etc.)

2. **Add request logging** (only in development):
   ```tsx
   import { NextResponse } from 'next/server'
   import type { NextRequest } from 'next/server'

   export function middleware(request: NextRequest) {
     if (process.env.NODE_ENV === 'development') {
       console.log(`[middleware] ${request.method} ${request.nextUrl.pathname}`)
     }

     return NextResponse.next()
   }
   ```

3. **Add the root redirect**:
   ```tsx
   export function middleware(request: NextRequest) {
     const { pathname } = request.nextUrl

     if (process.env.NODE_ENV === 'development') {
       console.log(`[middleware] ${request.method} ${pathname}`)
     }

     if (pathname === '/') {
       return NextResponse.redirect(new URL('/todos', request.url))
     }

     return NextResponse.next()
   }
   ```

4. **Add the matcher config** to exclude Next.js internals:
   ```tsx
   export const config = {
     matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
   }
   ```

5. **Test it**
   - Run `npm run dev`
   - Visit `http://localhost:3000/` — you should be redirected to `/todos`
   - Check the terminal — every request should log `[middleware] GET /todos`

---

## Success Criteria

- [ ] `middleware.ts` exists at the project root
- [ ] Visiting `/` redirects to `/todos`
- [ ] Request logs appear in the terminal during `npm run dev`
- [ ] Log only runs in development (`process.env.NODE_ENV === 'development'`)
- [ ] Matcher config excludes `_next/static`, `_next/image`, `favicon.ico`
- [ ] Other routes (e.g. `/todos/[id]`) still work normally

---

## Hints

- `middleware.ts` must be at the root of the project, **not** inside `app/` — a common mistake
- `NextResponse.next()` is required at the end — omitting it will cause the request to hang
- The Edge Runtime doesn't have `process.env.NODE_ENV` available as a constant in some bundlers — if logging doesn't work, try `if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production')` as a fallback, or just remove the condition

---

## Bonus (optional)

Add a second redirect: if the user visits `/home`, also redirect to `/todos`. Then extend the middleware to log the redirect destination when one occurs.

---

When you're done, run `/review-lesson` to get feedback.
