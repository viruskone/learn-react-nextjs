# Lesson 20 — Proxy (Request Interception)

## What is a Proxy?

A proxy runs **before a request reaches its destination** — before a page renders, before a Route Handler executes, before static files are served.

> **Note:** In older Next.js tutorials you'll see `middleware.ts` with `export function middleware(...)`. In Next.js 16, this convention was renamed to `proxy.ts` / `export function proxy(...)`. The concept is identical — only the filename and export name changed.

Use cases:
- Redirect unauthenticated users to `/login`
- A/B testing (serve different content based on a cookie)
- Localisation (redirect to `/en` or `/fr` based on browser language)
- Logging every incoming request
- Rewriting URLs without redirecting the browser

---

## Creating a Proxy

Create `proxy.ts` at the **root of your project** (same level as `app/`, not inside it):

```
my-app/
  app/
  proxy.ts    ← here
  package.json
```

```tsx
// proxy.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  console.log('Request:', request.method, request.nextUrl.pathname)
  return NextResponse.next()  // continue to the page/handler
}
```

`NextResponse.next()` passes the request through unchanged. Without it, the request would just hang.

---

## Matcher Config

By default, the proxy runs on every request including `_next/static`, `_next/image`, favicon, etc. Use a `config` export to scope it:

```tsx
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
```

This matches all paths except Next.js internals. You can also be more specific:

```tsx
export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
}
```

---

## Redirects

```tsx
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}
```

`NextResponse.redirect` sends a 307 (temporary) redirect by default.

---

## Rewrites

A rewrite changes what page is served without changing the URL the user sees:

```tsx
if (pathname.startsWith('/old-blog')) {
  return NextResponse.rewrite(new URL('/blog', request.url))
}
```

The user's browser still shows `/old-blog` but they see the `/blog` page.

---

## Reading Cookies and Headers

```tsx
export function proxy(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value
  const userAgent = request.headers.get('user-agent')

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}
```

You can also **set** cookies and headers on the response:

```tsx
const response = NextResponse.next()
response.cookies.set('visited', 'true')
response.headers.set('x-proxy-ran', '1')
return response
```

---

## Auth Guard Pattern

The most common real-world use: protect routes from unauthenticated access.

```tsx
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('auth-token')?.value

  const isProtected = pathname.startsWith('/dashboard')

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|login).*)'],
}
```

In Lesson 30 (Authentication), you'll use this pattern with a real Auth.js session token.

---

## Runtime

Unlike the old `middleware.ts` which ran on the Edge Runtime (no Node.js APIs), `proxy.ts` runs on the **Node.js runtime**. This means:
- You can use `process.env.NODE_ENV` normally
- You have access to Node.js built-ins like `crypto`
- Keep it lightweight — it still runs on every matched request
- You can't directly render Server Components or call database queries (use Route Handlers for that)
