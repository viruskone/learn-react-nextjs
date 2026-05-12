# Task — Lesson 30: Authentication (Auth.js)

## Goal

Add GitHub OAuth login to the Todo App. Protect the `/todos` route so only logged-in users can access it. Show the user's name and a sign-out button in the navbar.

---

## Steps

1. **Install Auth.js**:
   ```bash
   npm install next-auth@beta
   ```

2. **Create a GitHub OAuth App**
   - Go to: GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
   - Copy the Client ID and generate a Client Secret

3. **Generate an auth secret** using openssl:
   ```bash
   openssl rand -base64 32
   ```

4. **Create `.env.local`** in the project root and add:
   ```
   AUTH_SECRET=<output from step 3>
   AUTH_GITHUB_ID=your-client-id
   AUTH_GITHUB_SECRET=your-client-secret
   ```

5. **Create `src/auth.ts`**:
   ```ts
   import NextAuth from 'next-auth'
   import GitHub from 'next-auth/providers/github'

   export const { handlers, signIn, signOut, auth } = NextAuth({
     providers: [GitHub],
   })
   ```

6. **Create the Route Handler** at `src/app/api/auth/[...nextauth]/route.ts`:
   ```ts
   import { handlers } from '@/auth'
   export const { GET, POST } = handlers
   ```

7. **Update `src/proxy.ts`** to protect `/todos` using the `auth` function.

   > **Note on Next.js 16**: `middleware.ts` was renamed to `proxy.ts` in Next.js 16. You already have `src/proxy.ts` from an earlier lesson — update it instead of creating a new file.
   >
   > `auth` from next-auth is compatible with the proxy convention. Export it as `proxy` and update the matcher to only cover `/todos`:

   ```ts
   import { auth } from '@/auth'

   export const proxy = auth

   export const config = {
     matcher: ['/todos/:path*'],
   }
   ```

8. **Wrap your app with `SessionProvider`** in `src/app/layout.tsx`:
   - Import `SessionProvider` from `next-auth/react`
   - Wrap the body's children with it so client components can access the session

9. **Update `Navbar`** to show auth state:

   Your `Navbar` is already a client component — use `useSession` from `next-auth/react` to read the session, and `signIn`/`signOut` from `next-auth/react` for the buttons:
   - If logged in: show `session.user?.name` and a "Sign out" button calling `signOut()`
   - If not logged in: show a "Sign in with GitHub" button calling `signIn('github')`

10. **Test the flow**:
    - Visit `http://localhost:3000/todos` while logged out — should redirect to the Auth.js sign-in page
    - Authorise the app on GitHub
    - Should redirect back to `/todos`, now logged in
    - Navbar should show your name and a sign-out button

---

## Success Criteria

- [ ] `src/auth.ts` exists with GitHub provider configured
- [ ] `src/app/api/auth/[...nextauth]/route.ts` exports the handlers
- [ ] `src/proxy.ts` uses `auth` as the proxy function and protects `/todos/:path*`
- [ ] Visiting `/todos` while logged out redirects to the Auth.js sign-in page
- [ ] After GitHub login, you are redirected back to `/todos`
- [ ] The navbar shows the logged-in user's name
- [ ] Sign-out works and redirects away from the protected route
- [ ] `AUTH_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET` are in `.env.local` (not committed to git)

---

## Hints

- If you get a `redirect_uri_mismatch` error from GitHub, double-check the callback URL in your GitHub OAuth App settings matches exactly: `http://localhost:3000/api/auth/callback/github`
- `useSession` returns `{ data: session, status }` — check `status === 'loading'` if you want to show a spinner while the session loads
- The old logging and `/` redirect logic from the previous proxy lesson are no longer needed — the new proxy.ts is just the auth wrapper

---

## Bonus (optional)

Show the user's avatar image using `next/image` with `session.user?.image`. You'll need to whitelist `avatars.githubusercontent.com` (for GitHub) in `next.config.ts`.

---

When you're done, run `/review-lesson` to get feedback.
