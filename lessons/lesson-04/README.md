# Lesson 4 — Lists & Keys

## Rendering Arrays

In React, you render lists by calling `.map()` on an array and returning JSX for each item:

```tsx
const fruits = ["apple", "banana", "cherry"];

function FruitList() {
  return (
    <ul>
      {fruits.map((fruit) => (
        <li>{fruit}</li>
      ))}
    </ul>
  );
}
```

The `{}` in JSX is an **expression slot** — any valid JavaScript expression can go there.

## The Key Prop

React needs a way to identify each item in a list for efficient re-rendering. That's what the `key` prop is for.

```tsx
{fruits.map((fruit) => (
  <li key={fruit}>{fruit}</li>
))}
```

**Rules for keys:**
- Must be unique among siblings (not globally unique)
- Should be stable (don't use array index if the list can be reordered or filtered)
- Best source: a unique `id` from your data

```tsx
interface Product {
  id: string;
  name: string;
  inStock: boolean;
}

{products.map((product) => (
  <ProductCard key={product.id} name={product.name} inStock={product.inStock} />
))}
```

Why does React need keys? When a list re-renders, React compares old and new elements. Without keys, it has to assume items moved around and re-renders everything. With keys, it can surgically update only what changed.

## Typing Arrays

```tsx
const products: Product[] = [
  { id: "1", name: "Laptop", inStock: true },
  { id: "2", name: "Mouse", inStock: false },
];
```

Or equivalently: `Array<Product>`.

## Conditional Rendering

Show different UI based on a condition:

```tsx
// Using ternary
{isLoading ? <Spinner /> : <ProductList products={products} />}

// Using && (renders nothing if condition is false)
{products.length === 0 && <p>No products yet!</p>}

// Using early return
if (isLoading) return <Spinner />;
return <ProductList products={products} />;
```

The `&&` pattern is concise but can cause issues if the left side is `0` (renders "0"). Use ternary when in doubt.

## Defining Shared Types

It's good practice to define shared types in a dedicated file:

```tsx
// src/types/product.ts  (pattern — use whatever type fits your app)
export interface Product {
  id: string;
  name: string;
  inStock: boolean;
}
```

Then import it wherever needed. This keeps your types DRY and co-located.
