# Lesson 30 — Authentication (Auth.js)

## Why Authentication is Hard

Building auth from scratch means:
- Securely hashing and storing passwords
- Managing sessions or JWTs
- Implementing OAuth flows (GitHub, Google login)
- Handling CSRF, timing attacks, token rotation
- Keeping up with security vulnerabilities

**Auth.js** (formerly NextAuth.js) handles all of this. It's the standard authentication library for Next.js and supports dozens of OAuth providers out of the box.

---

## Core Concepts

### Sessions

After login, Auth.js creates a **session** — a record that the user is authenticated. Sessions are stored in:
- **JWTs** (default): encoded in a cookie, verified server-side on each request
- **Database sessions**: stored in a database, cookie contains only the session ID

For most apps, JWT sessions (the default) are fine.

### Providers

Auth.js calls external services (GitHub, Google, etc.) "providers". You configure which ones you want:

```ts
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
```

---

## Installation

```bash
npm install next-auth@beta
```

Auth.js v5 (the `@beta` version) is the version that works with Next.js App Router.

---

## Setup

### 1. Create `auth.ts` at the project root

```ts
// auth.ts
import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
})
```

### 2. Create the Route Handler

```ts
// app/api/auth/[...nextauth]/route.ts
import { handlers } from '@/auth'

export const { GET, POST } = handlers
```

This catches-all Auth.js's built-in routes: `/api/auth/signin`, `/api/auth/signout`, `/api/auth/callback/github`, etc.

### 3. Add environment variables

```
# .env.local
AUTH_SECRET=your-random-secret  # generate with: npx auth secret
AUTH_GITHUB_ID=your-github-app-client-id
AUTH_GITHUB_SECRET=your-github-app-client-secret
```

Create a GitHub OAuth App at: **GitHub → Settings → Developer settings → OAuth Apps → New OAuth App**
- Homepage URL: `http://localhost:3000`
- Callback URL: `http://localhost:3000/api/auth/callback/github`

---

## Reading the Session

### In Server Components

```tsx
import { auth } from '@/auth'

export default async function ProfilePage() {
  const session = await auth()

  if (!session) return <p>Not logged in</p>

  return <p>Hello, {session.user?.name}</p>
}
```

### In Client Components

```tsx
'use client'
import { useSession } from 'next-auth/react'

export function UserMenu() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <p>Loading...</p>
  if (!session) return <p>Not logged in</p>

  return <p>{session.user?.name}</p>
}
```

### SessionProvider (required for useSession)

Wrap your app with `SessionProvider` to enable `useSession` in client components:

```tsx
// app/layout.tsx
import { SessionProvider } from 'next-auth/react'

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
```

---

## Sign In / Sign Out Buttons

```tsx
import { signIn, signOut } from '@/auth'

// Sign in button (Server Component action)
<form action={async () => { 'use server'; await signIn('github') }}>
  <button type="submit">Sign in with GitHub</button>
</form>

// Sign out button
<form action={async () => { 'use server'; await signOut() }}>
  <button type="submit">Sign out</button>
</form>
```

---

## Protecting Routes with Middleware

Use Auth.js middleware to redirect unauthenticated users:

```ts
// middleware.ts
export { auth as middleware } from '@/auth'

export const config = {
  matcher: ['/todos/:path*'],
}
```

This is the simplest form — it protects all `/todos/*` routes. Unauthenticated users are redirected to the sign-in page automatically.

---

## The Session Object

```ts
// session.user contains:
{
  name: "Adrian K",
  email: "adrian@example.com",
  image: "https://avatars.githubusercontent.com/u/...",
}
```

You can extend it to include a user ID or roles — see the Auth.js docs for the `callbacks` option.

---

## Important Security Note

`AUTH_SECRET` must be at least 32 random characters. Generate it:
```bash
npx auth secret
```

Never commit `.env.local` to git. The `.gitignore` should already exclude it — verify before pushing.
