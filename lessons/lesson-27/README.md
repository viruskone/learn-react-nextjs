# Lesson 27 — useOptimistic

## What is Optimistic UI?

When the user clicks "Post Comment", the app currently:
1. Sends the request to the server
2. Waits for the response (100–500ms)
3. Updates the UI

The user sees a delay — the button is unresponsive, or there's a spinner. For a fast app, this is jarring.

**Optimistic UI** flips this:
1. Immediately show the change in the UI (assume it will succeed)
2. Send the request in the background
3. If it fails, roll back to the previous state

The experience feels instant. This is how most modern apps (Gmail, Notion, Linear) work.

---

## useOptimistic

React 19 ships `useOptimistic` specifically for this pattern. It's designed to pair with Server Actions.

```tsx
import { useOptimistic } from 'react'

const [optimisticComments, addOptimistic] = useOptimistic(
  comments,        // the real state (from server)
  (state, newComment: Comment) => [...state, newComment]  // how to apply the optimistic update
)
```

- `optimisticComments` — the displayed list: real comments + any pending optimistic additions
- `addOptimistic(newComment)` — triggers the optimistic update immediately
- When the server action completes, React merges the real server state back in

---

## Full Example: Optimistic Add Comment

```tsx
'use client'
import { useOptimistic, useState } from 'react'
import { addCommentAction } from './actions'

type Comment = { id: string; text: string; author: string }

export function CommentList({ initialComments }: { initialComments: Comment[] }) {
  const [comments, setComments] = useState(initialComments)
  const [optimisticComments, addOptimistic] = useOptimistic(
    comments,
    (state, newText: string) => [
      ...state,
      { id: 'pending-' + Date.now(), text: newText, author: 'You' },
    ]
  )

  async function handleAdd(text: string) {
    addOptimistic(text)              // show immediately
    const saved = await addCommentAction(text)  // send to server
    setComments(prev => [...prev, saved])       // replace with real data
  }

  return (
    <ul>
      {optimisticComments.map(comment => (
        <li key={comment.id} style={{ opacity: comment.id.startsWith('pending') ? 0.5 : 1 }}>
          {comment.text}
        </li>
      ))}
    </ul>
  )
}
```

The pending todo shows at 50% opacity — a common convention to indicate "saving..."

---

## useTransition

For Server Actions triggered by buttons (not forms), wrap the call in `useTransition` to keep the UI responsive during the pending state:

```tsx
const [isPending, startTransition] = useTransition()

function handleAdd(text: string) {
  startTransition(async () => {
    addOptimistic(text)
    await addCommentAction(text)
  })
}
```

`isPending` is `true` while the transition is running — you can use it to disable the button or show a subtle indicator.

---

## Error Handling and Rollback

`useOptimistic` automatically rolls back the optimistic value when the component re-renders with the original state (i.e., after the server action completes). If the action throws, the optimistic item disappears and the list reverts — no manual rollback code needed.

If you want to show an error message instead of silently reverting:

```tsx
async function handleAdd(text: string) {
  addOptimistic(text)
  try {
    const saved = await addCommentAction(text)
    setComments(prev => [...prev, saved])
  } catch {
    // optimistic item will disappear on next render
    setError('Failed to save. Please try again.')
  }
}
```

---

## useOptimistic vs Manually Managing State

Before `useOptimistic`, developers would manually:
1. Add to local state immediately
2. Call the server
3. Replace the local item with the server response on success
4. Remove the local item on error

`useOptimistic` codifies this pattern — it's the same logic but with React managing the merge for you.

---

## When to Use

- Any mutation that should feel instant (add, delete, toggle, like, bookmark)
- Actions where the failure rate is very low (so optimistic assumption is safe)

Don't use optimistic UI for:
- Destructive actions where confirmation matters (permanent deletion, financial transactions)
- Actions with high failure rates (network often unreliable, validation often fails)
