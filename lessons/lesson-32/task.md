# Lesson 32 Task — Deployment

## Goal

Run a production build locally, fix any build errors, and deploy the Todo App to Vercel.

## Steps

### 1. Run the production build

```bash
cd todo-app
npm run build
```

Fix any TypeScript errors or warnings that appear. The build must pass with zero errors before deploying.

### 2. Run the production build locally

```bash
npm run start
```

Open `http://localhost:3000` and test the app. Behavior should be the same as in dev.

Note any differences from dev mode (the in-memory store resets on each server start — that's expected).

### 3. Check the build output

Look at the route table printed by the build. Identify which routes are:
- Static (○) — pre-rendered
- Dynamic (ƒ) — server-rendered per request

Write down (or just note) what each symbol means for your routes.

### 4. Create a GitHub repository

Push `todo-app/` to a new GitHub repository. You can initialize git inside `todo-app/` if it doesn't have its own git setup:

```bash
cd todo-app
git init
git add .
git commit -m "Initial commit"
# Create a repo on GitHub, then:
git remote add origin <your-repo-url>
git push -u origin main
```

### 5. Deploy to Vercel

1. Go to vercel.com (create a free account if needed)
2. Click "Add New Project"
3. Import your GitHub repository
4. Keep all default settings
5. Add environment variable: `NEXT_PUBLIC_API_URL` = `https://your-app.vercel.app` (use the URL Vercel assigns)
6. Click Deploy

### 6. Verify the deployment

- Visit your live Vercel URL
- Test adding a todo
- Check that the UI looks correct

### 7. Run Lighthouse

In Chrome DevTools on your deployed app:
- Open DevTools → Lighthouse tab
- Run a report for "Performance" and "Best Practices"
- Note your scores

## Success Criteria

- [ ] `npm run build` passes with zero errors
- [ ] The app runs correctly in production mode (`npm run start`)
- [ ] The `todo-app/` code is pushed to GitHub
- [ ] The app is deployed and accessible on a Vercel URL
- [ ] Environment variable is set in Vercel dashboard
- [ ] You can access the live URL and see the Todo App

## You Did It!

Completing this lesson means you've built and deployed a full-stack Next.js app with TypeScript from scratch. You covered every fundamental concept needed for production React + Next.js development.

What's next? Ideas for extending this project:
- Add a real database (Prisma + PostgreSQL, or Supabase)
- Add authentication (NextAuth.js / Auth.js)
- Add categories or tags for todos
- Add due dates and sorting
- Write tests (Vitest + React Testing Library)
