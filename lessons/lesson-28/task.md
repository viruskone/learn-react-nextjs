# Lesson 28 Task — Environment Variables & Config

## Goal

Extract the hardcoded API base URL into an environment variable and create a centralized env config.

## Steps

### 1. Create .env.local

Create `todo-app/.env.local` (this file already goes in `.gitignore` from `create-next-app`):

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 2. Create a centralized env config

Create `src/env.ts`:

```ts
export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000",
} as const;
```

### 3. Update all hardcoded base URLs

Search for any hardcoded `http://localhost:3000` in your codebase (especially in `src/actions/todos.ts` and any fetch calls).

Replace them with:
```ts
import { env } from "@/env";

fetch(`${env.apiUrl}/api/todos`, ...)
```

### 4. Verify it works

Restart the dev server (env vars require restart):
```bash
npm run dev
```

The app should work exactly as before.

### 5. Create a .env.example file

Create `todo-app/.env.example` (this CAN be committed — it's a template with no real secrets):

```
# API base URL for fetching todos
NEXT_PUBLIC_API_URL=http://localhost:3000
```

This helps other developers know what env vars are needed.

## Success Criteria

- [ ] `.env.local` exists with `NEXT_PUBLIC_API_URL`
- [ ] `src/env.ts` exports a typed `env` object
- [ ] No hardcoded `http://localhost:3000` strings in the codebase
- [ ] `.env.example` exists with commented documentation
- [ ] The app still works after restarting the dev server
- [ ] No TypeScript errors

## Hints

- `process.env.NEXT_PUBLIC_API_URL` returns `undefined` if the variable isn't set — always have a fallback with `??`.
- Env var changes require a dev server restart — hot reload doesn't pick them up.
- Never commit `.env.local` to git (check that `.gitignore` has `*.local` or `.env*.local`).

When you're done, run `/review-lesson` to get feedback.
