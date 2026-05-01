# Lesson 11 — useContext

## The Prop Drilling Problem

Once your app grows beyond a few components, you'll hit this situation: a piece of state lives at the top, but a deeply nested component needs it. The only way to pass it down is through every component in between — even ones that don't use it at all.

```
TodoApp (has todos)
  └── MainSection
        └── TodoList
              └── TodoItem (actually needs todos)
```

If `MainSection` and `TodoList` don't care about `todos` but you still have to pass it through them, that's **prop drilling**. It's not wrong, but it gets painful fast.

---

## The Solution: Context

React's **Context API** lets you broadcast a value from a parent to any descendant, skipping the middle layers.

Three pieces:
1. **Create** the context with `createContext`
2. **Provide** a value with `<Context.Provider>`
3. **Consume** it anywhere below with `useContext`

---

## Step 1: Create the Context

```tsx
// context/TodoContext.tsx
import { createContext } from 'react'
import type { Todo } from '../types'

type TodoContextValue = {
  todos: Todo[]
  addTodo: (text: string) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

export const TodoContext = createContext<TodoContextValue | null>(null)
```

`null` is the default value — used when there's no Provider above in the tree. We'll guard against that below.

---

## Step 2: Create the Provider

```tsx
// context/TodoContext.tsx (continued)
import { useReducer } from 'react'

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, dispatch] = useReducer(todoReducer, [])

  const value: TodoContextValue = {
    todos,
    addTodo: (text) => dispatch({ type: 'ADD_TODO', payload: text }),
    toggleTodo: (id) => dispatch({ type: 'TOGGLE_TODO', payload: id }),
    deleteTodo: (id) => dispatch({ type: 'DELETE_TODO', payload: id }),
  }

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}
```

The Provider wraps part of your component tree and makes the value available to all descendants.

---

## Step 3: Consume with useContext

```tsx
// components/TodoList.tsx
import { useContext } from 'react'
import { TodoContext } from '../context/TodoContext'

function TodoList() {
  const ctx = useContext(TodoContext)
  if (!ctx) throw new Error('TodoList must be inside TodoProvider')

  const { todos, toggleTodo } = ctx
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} onClick={() => toggleTodo(todo.id)}>
          {todo.text}
        </li>
      ))}
    </ul>
  )
}
```

The `null` check throws early if someone uses this component outside the Provider — better than a silent undefined crash.

---

## Custom Hook: useTodoContext

Rather than calling `useContext(TodoContext)` everywhere (with the null check each time), wrap it in a custom hook:

```tsx
// context/TodoContext.tsx (add this)
export function useTodoContext() {
  const ctx = useContext(TodoContext)
  if (!ctx) throw new Error('useTodoContext must be used inside TodoProvider')
  return ctx
}
```

Now consumers just call `useTodoContext()` — clean and safe.

---

## Wrap the App

```tsx
// app/layout.tsx or main component
import { TodoProvider } from './context/TodoContext'

export default function RootLayout({ children }) {
  return (
    <TodoProvider>
      {children}
    </TodoProvider>
  )
}
```

---

## useContext + useReducer = Lightweight Redux

This is the pattern:
- `useReducer` owns the state logic (all transitions in one place)
- `useContext` distributes state and dispatch without prop drilling
- Together they give you a global store without any external library

For most apps at this scale, this is all you need. Redux becomes relevant when you have very large state trees or need time-travel debugging.

---

## When to Use Context (and When Not To)

**Use context for:**
- State that many components need (auth, theme, current user, cart)
- Avoiding prop drilling beyond 2–3 levels

**Don't use context for:**
- State that only one component or its direct children use — just keep it local
- High-frequency updates (every keystroke) — every consumer re-renders on change. Use a dedicated state manager (Zustand, Jotai) for that.
