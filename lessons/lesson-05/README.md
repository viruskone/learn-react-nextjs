# Lesson 5 — Lifting State Up

## The Problem

Imagine each item in a list manages its own `isSelected` state locally. That works for toggling a visual highlight, but the parent has no idea what's selected. If you want to show "3 items selected", you can't — the data is locked inside each child.

This is a common React problem: **sibling or parent components need to share state**.

## The Solution: Lift State Up

Move the state to the **closest common ancestor** of the components that need it. Pass the data down as props, and pass callback functions down so children can request changes.

```
Before:
  <ShopApp>
    <ProductList>
      <CartItem> [isSelected state lives here] </CartItem>

After:
  <ShopApp> [items state lives here]
    <ProductList items={items} onSelect={handleSelect}>
      <CartItem selected={item.selected} onSelect={() => handleSelect(item.id)}>
```

## Passing Callbacks as Props

A child component can't modify the parent's state directly. Instead, the parent passes down a function, and the child calls it when something happens:

```tsx
interface CartItemProps {
  id: string;
  name: string;
  selected: boolean;
  onSelect: (id: string) => void;  // callback
}

function CartItem({ id, name, selected, onSelect }: CartItemProps) {
  return (
    <li>
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onSelect(id)}
      />
      <span className={selected ? "font-bold" : ""}>{name}</span>
    </li>
  );
}
```

## Immutable State Updates

When toggling an item in an array, you can't mutate the array. Create a new one:

```tsx
function handleSelect(id: string) {
  setItems(
    items.map((item) =>
      item.id === id ? { ...item, selected: !item.selected } : item
    )
  );
}
```

The spread `{ ...item }` copies all properties, then `selected: !item.selected` overrides just the one you need.

## Single Source of Truth

The state now lives in one place (`ShopApp`). Every component that needs the data reads it from props. This makes the data flow predictable and easy to debug — you always know where to look.
