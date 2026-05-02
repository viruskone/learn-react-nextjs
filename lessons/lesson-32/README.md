# Lesson 32 — Deployment

## What Happens at Build Time

When you run `npm run build`, Next.js:
1. Compiles TypeScript → JavaScript
2. Bundles client-side code
3. Pre-renders pages that can be static (no dynamic data)
4. Generates the `.next/` output folder

Check the build output — Next.js tells you which pages are static (○) vs dynamic (ƒ):

```
Route (app)               Size     First Load JS
┌ ○ /                     1.5 kB   88 kB
├ ○ /about                1.2 kB   87 kB
└ ƒ /api/posts            0 B      0 B
```

## Static vs Dynamic Routes

- **Static (○)**: Rendered at build time. Fastest — served from CDN.
- **Dynamic (ƒ)**: Rendered on each request. Needed for user-specific or real-time data.

A page becomes dynamic when it uses:
- `cookies()` or `headers()` (server-side request context)
- Dynamic data fetching (`cache: "no-store"`)
- Route handlers (always dynamic)

## Deploying to Vercel

Vercel is made by the Next.js team and has zero-config deployment:

1. Push your `todo-app/` to a GitHub repository
2. Go to vercel.com → New Project
3. Import the GitHub repo
4. Vercel auto-detects Next.js and configures the build
5. Click Deploy

That's it. You get:
- HTTPS by default
- Global CDN for static assets
- Serverless functions for API routes and Server Components
- Automatic deploys on every git push

## Environment Variables on Vercel

Your `.env.local` is not deployed (it's gitignored). Set env vars in Vercel:
- Dashboard → Project → Settings → Environment Variables
- Add `NEXT_PUBLIC_API_URL` = your production URL (which is the Vercel URL itself)

## In-Memory Storage Caveat

Your current API uses in-memory storage. On Vercel, each request may hit a different serverless function instance — the data won't be shared. For production, you'd need a real database (Vercel Postgres, Supabase, PlanetScale, etc.).

For this course, the goal is to successfully deploy and understand the process — not to have persistent data in production.

## Performance Basics

- **Lighthouse**: Chrome DevTools → Lighthouse tab. Run it on your deployed app to get a performance score.
- **Core Web Vitals**: LCP (largest contentful paint), FID (first input delay), CLS (cumulative layout shift). Next.js is designed to optimize these.
- **Bundle size**: Avoid importing large libraries that ship to the client. Use dynamic imports for code that's only needed sometimes.

## Congratulations!

If you've made it to Lesson 32, you now know:
- React components, props, state, effects, custom hooks
- TypeScript with React
- Next.js App Router: routing, layouts, Server/Client Components
- Data fetching: server-side, client-side, Route Handlers
- Server Actions
- Error handling and loading states
- Styling with Tailwind CSS
- Environment variables and configuration
- Deployment

These are all the fundamentals you need to build real production Next.js applications.
