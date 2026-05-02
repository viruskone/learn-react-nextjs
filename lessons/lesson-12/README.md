# Lesson 12 — Performance & Memoization

## Why React Re-renders

React re-renders a component whenever:
1. Its **state** changes
2. Its **props** change
3. Its **parent** re-renders (even if the props haven't changed)

Point 3 is the source of most "unnecessary" renders. When a parent component re-renders (say, new data arrived), every child component re-renders too — including ones that received the exact same props as before.

For small apps this is completely fine. React is fast. **Don't optimise prematurely.** But once you start seeing jank or have long lists, memoisation is the fix.

---

## React.memo

`React.memo` wraps a component. If the parent re-renders but the wrapped component's props haven't changed (by shallow comparison), React skips re-rendering it.

```tsx
// Without memo: re-renders every time ShopApp re-renders
function ProductCard({ product, onSelect }: Props) {
  return <li onClick={() => onSelect(product.id)}>{product.name}</li>
}

// With memo: only re-renders if product or onSelect changes
const ProductCard = React.memo(function ProductCard({ product, onSelect }: Props) {
  return <li onClick={() => onSelect(product.id)}>{product.name}</li>
})
```

**Shallow comparison** means: same primitive value, or same object reference. This is important for the next section.

---

## The Callback Problem

If `ShopApp` passes `onSelect={selectProduct}` to `ProductCard`, and `selectProduct` is defined inside the component:

```tsx
function ShopApp() {
  // This function is recreated on every render → new reference → memo is useless
  function selectProduct(id: string) { ... }
  return <ProductCard onSelect={selectProduct} />
}
```

Every render creates a new `selectProduct` function reference. Even with `React.memo`, `ProductCard` sees a changed prop and re-renders.

---

## useCallback

`useCallback` memoises a function — it returns the **same function reference** as long as its dependencies haven't changed:

```tsx
import { useCallback } from 'react'

function ShopApp() {
  const selectProduct = useCallback((id: string) => {
    dispatch({ type: 'SELECT_PRODUCT', payload: id })
  }, [dispatch]) // recreate only if dispatch changes (it never does with useReducer)

  return <ProductCard onSelect={selectProduct} />
}
```

Now `selectProduct` has a stable reference → `React.memo` on `ProductCard` works correctly.

---

## useMemo

`useMemo` memoises a **computed value** — it recalculates only when dependencies change:

```tsx
import { useMemo } from 'react'

function ShopApp() {
  const inStockCount = useMemo(
    () => products.filter(p => p.inStock).length,
    [products]
  )

  return <p>{inStockCount} in stock</p>
}
```

Without `useMemo`, `products.filter(...)` runs on every render. For 10 items it's irrelevant. For 10,000 it might matter. For a derived value used in multiple places, it also avoids redundant computation.

---

## When NOT to Memoize

This is as important as knowing when to memoize:

- **Don't wrap everything in `React.memo`** — the memo comparison itself has a cost. If a component is cheap to render and re-renders infrequently, memo adds overhead for no benefit.
- **`useMemo` is not free** — it stores the previous value and runs the comparison. For simple expressions (`a + b`, `arr.length`), plain calculation is faster.
- **Premature optimisation is the root of all evil** — first make it work, then measure, then optimise.

**Rule:** Reach for memoization when:
- You observe actual performance problems (React DevTools Profiler shows expensive renders)
- You have a large list of items with stable items that shouldn't re-render
- You have an expensive calculation run frequently

---

## Profiling with React DevTools

1. Install React DevTools browser extension
2. Open DevTools → **Profiler** tab
3. Click Record, interact with the app, stop recording
4. See which components re-rendered and how long each render took

The **"why did this render?"** option tells you exactly what changed.

---

## Summary

| Tool | What it does |
|------|-------------|
| `React.memo` | Skip re-rendering a component if props are the same |
| `useCallback` | Keep a stable function reference across renders |
| `useMemo` | Keep a stable computed value across renders |

Use them together: `React.memo` on the component + `useCallback` for any function props passed into it.
