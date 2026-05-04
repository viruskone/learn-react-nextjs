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

3. **Generate an auth secret**:
   ```bash
   npx auth secret
   ```
   This adds `AUTH_SECRET=...` to your `.env.local`.

4. **Add GitHub credentials to `.env.local`**:
   ```
   AUTH_GITHUB_ID=your-client-id
   AUTH_GITHUB_SECRET=your-client-secret
   ```

5. **Create `auth.ts`** at the project root:

<details>
<summary>Show hint</summary>

```ts
import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
})
```

</details>

6. **Create the Route Handler** at `app/api/auth/[...nextauth]/route.ts`:

<details>
<summary>Show hint</summary>

```ts
import { handlers } from '@/auth'
export const { GET, POST } = handlers
```

</details>

7. **Protect `/todos` with middleware** — update `middleware.ts`:

<details>
<summary>Show hint</summary>

```ts
export { auth as middleware } from '@/auth'

export const config = {
  matcher: ['/todos/:path*'],
}
```

</details>

8. **Add sign-in / sign-out to your Navbar**:

<details>
<summary>Show hint</summary>

```tsx
import { auth, signIn, signOut } from '@/auth'

export default async function Navbar() {
  const session = await auth()
  return (
    <nav>
      {session ? (
        <>
          <span>{session.user?.name}</span>
          <form action={async () => { 'use server'; await signOut() }}>
            <button type="submit">Sign out</button>
          </form>
        </>
      ) : (
        <form action={async () => { 'use server'; await signIn('github') }}>
          <button type="submit">Sign in with GitHub</button>
        </form>
      )}
    </nav>
  )
}
```

</details>

9. **Test the flow**:
   - Visit `http://localhost:3000/todos` — should redirect to GitHub login
   - Authorise the app on GitHub
   - Should redirect back to `/todos`, now logged in
   - Navbar should show your name and a sign-out button

---

## Success Criteria

- [ ] `auth.ts` exists at the project root with GitHub provider configured
- [ ] `app/api/auth/[...nextauth]/route.ts` exports the handlers
- [ ] Visiting `/todos` while logged out redirects to the Auth.js sign-in page
- [ ] After GitHub login, you are redirected back to `/todos`
- [ ] The navbar shows the logged-in user's name
- [ ] Sign-out works and redirects away from the protected route
- [ ] `AUTH_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET` are in `.env.local` (not committed to git)

---

## Hints

- If you get a `redirect_uri_mismatch` error from GitHub, double-check the callback URL in your GitHub OAuth App settings matches exactly: `http://localhost:3000/api/auth/callback/github`
- `auth()` in Server Components is a function call — don't forget the `()`: `const session = await auth()`
- If you changed `middleware.ts` in Lesson 20, you're replacing its content with the Auth.js export — the logging and redirect from that lesson are no longer needed

---

## Bonus (optional)

Show the user's avatar image using `next/image` with `session.user?.image`. You'll need to whitelist `avatars.githubusercontent.com` (for GitHub) in `next.config.ts`.

---

When you're done, run `/review-lesson` to get feedback.
