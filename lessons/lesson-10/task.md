# Task — Lesson 10: useReducer

## Goal

Rewrite the `useTodos` custom hook to use `useReducer` instead of multiple `useState` calls. The hook's public interface stays the same — components using it don't need to change.

---

## Steps

1. **Open `hooks/useTodos.ts`**

2. **Define the `Action` type** above the hook:
   ```tsx
   type Action =
     | { type: 'ADD_TODO'; payload: string }
     | { type: 'TOGGLE_TODO'; payload: string }
     | { type: 'DELETE_TODO'; payload: string }
   ```

3. **Write the reducer function**:
   ```tsx
   function todoReducer(state: Todo[], action: Action): Todo[] {
     switch (action.type) {
       case 'ADD_TODO':
         return [...state, { id: crypto.randomUUID(), text: action.payload, completed: false }]
       case 'TOGGLE_TODO':
         return state.map(t =>
           t.id === action.payload ? { ...t, completed: !t.completed } : t
         )
       case 'DELETE_TODO':
         return state.filter(t => t.id !== action.payload)
       default:
         return state
     }
   }
   ```

4. **Replace `useState` with `useReducer`** inside the hook:
   ```tsx
   const [todos, dispatch] = useReducer(todoReducer, [], () => loadFromStorage())
   ```
   If you're loading from localStorage, pass it as the lazy initializer (third argument).

5. **Rewrite `addTodo`, `toggleTodo`, `deleteTodo`** to use `dispatch`:
   ```tsx
   function addTodo(text: string) {
     dispatch({ type: 'ADD_TODO', payload: text })
   }
   // etc.
   ```

6. **Return the same shape as before** — nothing in the component tree should need updating.

---

## Success Criteria

- [ ] `useTodos` uses `useReducer` — no `useState` for the todos array
- [ ] `todoReducer` is a pure function defined outside the hook
- [ ] All three actions (`ADD_TODO`, `TOGGLE_TODO`, `DELETE_TODO`) are handled
- [ ] `Action` type is a discriminated union with correct payload types
- [ ] The Todo App still works exactly as before (add, toggle, delete all function)
- [ ] No TypeScript errors

---

## Hints

- The reducer must return a **new array**, never mutate state in place
- `crypto.randomUUID()` is available in modern browsers without import
- If your `useTodos` currently uses `useEffect` to persist to localStorage, keep that — just replace the `useState` part
- The public return value of the hook (`{ todos, addTodo, toggleTodo, deleteTodo }`) stays exactly the same

---

## Bonus (optional)

Export `todoReducer` and write a few plain unit tests for it (no React needed):
```ts
const newState = todoReducer([], { type: 'ADD_TODO', payload: 'Buy milk' })
console.assert(newState.length === 1)
```

---

When you're done, run `/review-lesson` to get feedback.
