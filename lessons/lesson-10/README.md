# Lesson 10 — useReducer

## When useState Isn't Enough

`useState` works great for simple, independent pieces of state. But when you have multiple related state values that change together — or when the next state depends on the current state in complex ways — managing it with multiple `useState` calls gets messy.

```tsx
// Multiple useState calls that are conceptually linked
const [count, setCount] = useState(0)
const [step, setStep] = useState(1)
const [history, setHistory] = useState<number[]>([])
// coordinating all three in a single operation becomes error-prone
```

`useReducer` solves this by centralising all state transitions in one place.

---

## The Reducer Pattern

A **reducer** is a pure function that takes the current state and an action, and returns the new state:

```
(currentState, action) → newState
```

This pattern comes from Redux (and before that, from functional programming). React's `useReducer` brings it directly into components.

```tsx
type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }

function counterReducer(state: number, action: Action): number {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'RESET':
      return 0
    default:
      return state
  }
}
```

---

## Using useReducer in a Component

```tsx
import { useReducer } from 'react'

function CounterApp() {
  const [count, dispatch] = useReducer(counterReducer, 0)

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  )
}
```

`dispatch` sends an action to the reducer. The reducer computes and returns the new state, React re-renders.

---

## useReducer vs useState

| | `useState` | `useReducer` |
|---|---|---|
| Best for | Simple, independent values | Complex, related state |
| Update logic | In the component | In the reducer function |
| Testability | Hard to test in isolation | Reducer is a pure function — easy to unit test |
| Readability | Fine for 1–3 values | Better when you have many related transitions |

A common rule: once you catch yourself writing "and then also update X when Y changes", it's time for a reducer.

---

## Action Types Pattern

Defining action types as a TypeScript union gives you:
- Autocomplete on `dispatch({ type: '...' })`
- Type-safe `payload` per action
- Exhaustive switch checking

```tsx
type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }

// TypeScript will error if you dispatch an unknown action type
```

---

## Initial State

`useReducer(reducer, initialState)` — the second argument is the initial value:

```tsx
const [count, dispatch] = useReducer(counterReducer, 0)

// With a lazy initializer (for expensive setup):
const [count, dispatch] = useReducer(counterReducer, 0, () => loadFromStorage())
```

The lazy initializer (third argument) runs only once on mount — same idea as lazy `useState`.

---

## Preview: useReducer + useContext

In the next lesson, you'll combine `useReducer` with `useContext` to share state across the component tree without prop drilling — a lightweight alternative to Redux.
