# Lesson 28 — Environment Variables & Config

## Why Environment Variables?

Hard-coding values like API URLs, API keys, or feature flags directly in code is a bad practice:
- Different environments (dev, staging, production) need different values
- Secrets should not be committed to git
- Changing a value requires a code change and redeploy

Environment variables solve this by moving configuration outside the code.

## .env Files in Next.js

Next.js supports several `.env` file types:

| File | When loaded | Should be committed? |
|------|------------|---------------------|
| `.env` | Always | Yes (non-secret defaults) |
| `.env.local` | Always (overrides `.env`) | No (add to `.gitignore`) |
| `.env.development` | Only in dev | Yes |
| `.env.production` | Only in prod | Yes (non-secret) |

For secrets, always use `.env.local` and add it to `.gitignore`.

## The NEXT_PUBLIC_ Prefix

By default, env vars are only available on the **server**. To expose one to the **browser** (client-side), prefix it with `NEXT_PUBLIC_`:

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
SECRET_API_KEY=super-secret-key   # NOT exposed to browser
```

```tsx
// Works in both server and client components
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Only works in server-side code
const secret = process.env.SECRET_API_KEY;
```

**Never put secrets in `NEXT_PUBLIC_` variables** — they end up in the JavaScript bundle.

## Using env vars in your app

```tsx
// In Server Actions or Route Handlers (server-only)
const baseUrl = process.env.API_BASE_URL ?? "http://localhost:3000";

// In Client Components (must be NEXT_PUBLIC_)
const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
```

## next.config.ts

`next.config.ts` is where you configure Next.js behavior:

```ts
import type { NextConfig } from "next";

const config: NextConfig = {
  // Allow images from external domains
  images: {
    remotePatterns: [{ hostname: "picsum.photos" }],
  },

  // Redirect old URLs
  async redirects() {
    return [
      { source: "/old-page", destination: "/new-page", permanent: true },
    ];
  },
};

export default config;
```

## TypeScript for env vars

For type safety, you can declare your env vars:

```ts
// src/env.ts
export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000",
} as const;
```

This centralizes where you read env vars and gives you a single place to update them.
