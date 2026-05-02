# Lesson 11 — useContext

## The Prop Drilling Problem

Once your app grows beyond a few components, you'll hit this situation: a piece of state lives at the top, but a deeply nested component needs it. The only way to pass it down is through every component in between — even ones that don't use it at all.

```
App (has theme)
  └── MainSection
        └── Sidebar
              └── ThemeButton (actually needs theme)
```

If `MainSection` and `Sidebar` don't care about the theme but you still have to pass it through them, that's **prop drilling**. It's not wrong, but it gets painful fast.

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
// context/ThemeContext.tsx
import { createContext } from 'react'

type Theme = 'light' | 'dark'

type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
```

`null` is the default value — used when there's no Provider above in the tree. We'll guard against that below.

---

## Step 2: Create the Provider

```tsx
// context/ThemeContext.tsx (continued)
import { useState } from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  function toggleTheme() {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  }

  const value: ThemeContextValue = { theme, toggleTheme }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
```

The Provider wraps part of your component tree and makes the value available to all descendants.

---

## Step 3: Consume with useContext

```tsx
// components/ThemeButton.tsx
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

function ThemeButton() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('ThemeButton must be inside ThemeProvider')

  const { theme, toggleTheme } = ctx
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  )
}
```

The `null` check throws early if someone uses this component outside the Provider — better than a silent undefined crash.

---

## Custom Hook: useThemeContext

Rather than calling `useContext(ThemeContext)` everywhere (with the null check each time), wrap it in a custom hook:

```tsx
// context/ThemeContext.tsx (add this)
export function useThemeContext() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useThemeContext must be used inside ThemeProvider')
  return ctx
}
```

Now consumers just call `useThemeContext()` — clean and safe.

---

## Wrap the App

```tsx
// app/layout.tsx or main component
import { ThemeProvider } from './context/ThemeContext'

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
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
