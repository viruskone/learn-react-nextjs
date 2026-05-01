# Task — Lesson 27: useOptimistic

## Goal

Wrap the "add todo" Server Action with `useOptimistic` so the new item appears in the list instantly — before the server confirms the save.

---

## Steps

1. **Make sure you're working in a Client Component** that receives the current todos list as a prop from a Server Component parent

2. **Import `useOptimistic`**:
   ```tsx
   'use client'
   import { useOptimistic, useState } from 'react'
   ```

3. **Set up the optimistic state**:
   ```tsx
   const [todos, setTodos] = useState(initialTodos)
   const [optimisticTodos, addOptimistic] = useOptimistic(
     todos,
     (state, newText: string) => [
       ...state,
       { id: 'pending-' + Date.now(), text: newText, completed: false },
     ]
   )
   ```

4. **Update your form submission handler**:
   ```tsx
   async function handleSubmit(text: string) {
     addOptimistic(text)             // show immediately
     const saved = await addTodoAction(text)  // call Server Action
     setTodos(prev => [...prev, saved])       // sync with server result
   }
   ```

5. **Render `optimisticTodos` instead of `todos`**

6. **Visual indicator for pending items**:
   ```tsx
   <li style={{ opacity: todo.id.startsWith('pending') ? 0.6 : 1 }}>
   ```

7. **Test it**: Add a todo and watch it appear immediately with reduced opacity, then snap to full opacity once saved.

---

## Success Criteria

- [ ] `useOptimistic` is imported from `'react'`
- [ ] New todos appear in the list instantly on submission (before server response)
- [ ] Pending todos are visually differentiated (opacity, italic, or a "saving..." label)
- [ ] After the server action completes, the pending item is replaced with the real saved item (including server-generated ID)
- [ ] If you throw an error in the Server Action (for testing), the optimistic item disappears
- [ ] No TypeScript errors

---

## Hints

- `useOptimistic` only works in Client Components (`'use client'`)
- The second argument to `useOptimistic` is the reducer function — it takes the current state and the value you passed to `addOptimistic`, and returns the new optimistic state
- After the Server Action resolves, the optimistic todos automatically revert to the base `todos` state — so you must call `setTodos` to update the base state with the real result
- If you're using a `<form>` with `action={serverAction}`, you'll need to convert it to a manual handler to use `useOptimistic` with it

---

## Bonus (optional)

Also apply `useOptimistic` to the delete action: when the user clicks delete, remove the item immediately and restore it if the deletion fails.

---

When you're done, run `/review-lesson` to get feedback.
