# Task — Lesson 27: useOptimistic

## Goal

Wrap the "add todo" action with `useOptimistic` so the new item appears in the list instantly — before the server confirms the save.

Your app already uses `TodoContext` with a `useReducer` for state. You'll add `useOptimistic` on top of that reducer state so additions feel instant.

---

## Steps

1. **Open `TodoContext.tsx`** — this is already a Client Component (`'use client'`), so `useOptimistic` is available here.

2. **Import `useOptimistic`** alongside the existing React imports:
   ```tsx
   import { createContext, ReactNode, useEffect, useReducer, useState, useOptimistic } from 'react'
   ```

3. **Add `useOptimistic` below your existing `useReducer` call**:
   ```tsx
   const [optimisticTodos, addOptimistic] = useOptimistic(
     todos,
     (state, newTitle: string) => [
       ...state,
       { id: 'pending-' + Date.now(), title: newTitle, completed: false },
     ]
   )
   ```

4. **Update the `addTodo` function** to call `addOptimistic` immediately before the server call:
   ```tsx
   async function addTodo(title: string) {
     addOptimistic(title)             // show immediately
     try {
       const todo = await callAddTodo(title)
       dispatch({ type: 'ADD_TODO', payload: todo })
     } catch (err) {
       setError(err instanceof Error ? err.message : 'Unknown error')
     }
   }
   ```

5. **Expose `optimisticTodos` instead of `todos` in the context value**:
   ```tsx
   const value: TodoContextValue = {
     todos: optimisticTodos,   // <-- was: todos
     ...
   }
   ```

6. **Add a visual indicator for pending items** in `TodoItem.tsx`. The pending items have an ID that starts with `'pending-'`. Use that to dim them:
   - Add an `opacity` style or a CSS class when `todo.id.startsWith('pending-')` is true
   - Example: show the item at 60% opacity with italic text while saving

7. **Test it**: Add a todo — it should appear instantly in the list (dimmed), then become fully visible once saved.

---

## Success Criteria

- [ ] `useOptimistic` is imported from `'react'`
- [ ] New todos appear in the list instantly on submission (before server response)
- [ ] Pending todos are visually differentiated (opacity, italic, or a "saving..." label)
- [ ] After the server action completes, the pending item is replaced with the real saved item (with a real ID)
- [ ] No TypeScript errors

---

## Hints

- `useOptimistic` must be called inside a Client Component — `TodoContext.tsx` already is one
- The second argument is a reducer: it takes the current state + the value you pass to `addOptimistic`, and returns the new optimistic state
- After `callAddTodo` resolves, `dispatch({ type: 'ADD_TODO' })` updates the real `todos` reducer state — and `useOptimistic` automatically reverts its overlay, so the real item takes over
- If the server call throws, the optimistic item disappears on the next render (because `todos` never got the new item added)

---

## Bonus (optional)

Also apply `useOptimistic` to the delete action: when the user clicks delete, remove the item immediately and restore it if the deletion fails.

---

When you're done, run `/review-lesson` to get feedback.
