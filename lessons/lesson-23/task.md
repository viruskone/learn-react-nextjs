# Lesson 23 Task — Error Handling & Loading UI

## Goal

Add proper loading states, error boundaries, and a 404 page to the app.

## Steps

### 1. Create a root loading.tsx

Create `src/app/loading.tsx` with a simple loading indicator.
Use Tailwind's `animate-pulse` for a skeleton effect or just a text message.

### 2. Create a root error.tsx

Create `src/app/error.tsx` — remember it must have `"use client"`:
- Show the error message
- Include a "Try again" button that calls `reset()`

### 3. Create a not-found.tsx

Create `src/app/not-found.tsx`:
- Show a 404 message
- Include a `<Link>` back to the home page

### 4. Add a skeleton loader to TodoApp

Update `src/components/TodoApp.tsx`:
- Instead of just showing `<p>Loading todos...</p>`, create a `TodoSkeleton` component (can be in the same file or a separate file)
- Render 3 skeleton rows using `animate-pulse`

Example skeleton row:
```tsx
function TodoSkeleton() {
  return (
    <ul className="space-y-2">
      {[1, 2, 3].map((i) => (
        <li key={i} className="flex items-center gap-2 animate-pulse">
          <div className="h-4 w-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </li>
      ))}
    </ul>
  );
}
```

### 5. Add error handling to API calls in useTodos

Make sure each fetch call in `useTodos` handles failures gracefully:
- Wrap in try/catch
- Set the `error` state on failure
- Display the error message in `TodoApp` with a retry button that re-fetches

### 6. Test the 404 page

Visit `http://localhost:3000/nonexistent` — you should see your custom 404 page.

## Success Criteria

- [ ] `app/loading.tsx` exists with a loading UI
- [ ] `app/error.tsx` exists with `"use client"` and a `reset` button
- [ ] `app/not-found.tsx` exists with a link back to home
- [ ] `TodoApp` shows a skeleton loader while `isLoading` is true
- [ ] API errors in `useTodos` are caught and the error message is displayed
- [ ] Visiting `/nonexistent` shows the custom 404 page
- [ ] No TypeScript errors

When you're done, run `/review-lesson` to get feedback.
