# Lesson 8 — useRef & DOM Refs

## What is useRef?

`useRef` gives you a mutable object that persists across renders — but changing it **does not trigger a re-render**. That's the key difference from `useState`.

```tsx
const ref = useRef(initialValue)
// ref.current holds the value
```

Two main use cases:
1. **DOM refs** — get a direct reference to a DOM element
2. **Mutable values** — store a value that changes but shouldn't cause a re-render (like a timer ID)

---

## DOM Refs

Pass the ref to a JSX element's `ref` prop:

```tsx
import { useRef } from 'react'

function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null)

  function focusInput() {
    inputRef.current?.focus()
  }

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus</button>
    </>
  )
}
```

After the component mounts, `inputRef.current` points to the actual `<input>` DOM node. You can call `.focus()`, `.select()`, `.scrollIntoView()`, etc.

---

## useRef vs useState

| | `useRef` | `useState` |
|---|---|---|
| Persists across renders | ✅ | ✅ |
| Triggers re-render on change | ❌ | ✅ |
| Mutable directly | ✅ (`ref.current = x`) | ❌ (must use setter) |
| Good for | DOM access, timers, previous values | UI state |

**Rule of thumb:** if the user needs to *see* the value change, use `useState`. If it's plumbing the user never sees, `useRef` is cleaner.

---

## Storing Mutable Values

```tsx
function Timer() {
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null)

  function start() {
    intervalId.current = setInterval(() => console.log('tick'), 1000)
  }

  function stop() {
    if (intervalId.current) clearInterval(intervalId.current)
  }

  return <><button onClick={start}>Start</button><button onClick={stop}>Stop</button></>
}
```

Storing the interval ID in state would cause a pointless re-render on start/stop. `useRef` is the right tool here.

---

## Auto-Focus Pattern

A common UX improvement: after a form submission, auto-focus the input so the user can keep typing immediately.

```tsx
function SearchForm() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // ... process the search
    setQuery('')
    inputRef.current?.focus()  // ← put cursor back in the box
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)} />
      <button type="submit">Search</button>
    </form>
  )
}
```

---

## TypeScript: typing refs

Always provide the element type as a generic, and initialise with `null`:

```tsx
const inputRef = useRef<HTMLInputElement>(null)
const divRef = useRef<HTMLDivElement>(null)
const buttonRef = useRef<HTMLButtonElement>(null)
```

The `null` initial value tells React "this hasn't been attached to a DOM node yet." Once the component mounts, React sets `ref.current` for you.

---

## Brief: forwardRef

By default you can't put a `ref` on a custom component — React blocks it. If you write a reusable input component and want callers to get a ref to the underlying DOM node, wrap it in `forwardRef`:

```tsx
const FancyInput = forwardRef<HTMLInputElement, { placeholder: string }>(
  ({ placeholder }, ref) => <input ref={ref} placeholder={placeholder} />
)
```

You won't need this in Lesson 8's task, but you'll see it in component libraries.
