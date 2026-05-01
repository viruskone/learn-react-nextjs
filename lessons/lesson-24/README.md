# Lesson 24 — Styling with Tailwind CSS

## What is Tailwind CSS?

Tailwind is a utility-first CSS framework. Instead of writing CSS classes like `.button { background: blue; padding: 8px; }`, you apply pre-defined utility classes directly in your HTML/JSX:

```tsx
<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
  Click me
</button>
```

Each class does exactly one thing. You compose them together.

## Key Concepts

### Spacing

```tsx
p-4      // padding: 1rem (all sides)
px-4     // padding-left + padding-right
py-2     // padding-top + padding-bottom
m-4      // margin
mt-2     // margin-top
gap-2    // gap between flex/grid children
space-y-2  // margin-top between stacked children
```

### Colors

```tsx
text-gray-500     // color (text)
bg-white          // background-color
border-gray-200   // border color
```

Colors have intensity scales: 50 (lightest) → 950 (darkest).

### Layout

```tsx
flex            // display: flex
flex-col        // flex-direction: column
items-center    // align-items: center
justify-between // justify-content: space-between
grid            // display: grid
grid-cols-2     // grid-template-columns: repeat(2, 1fr)
```

### Sizing

```tsx
w-full    // width: 100%
max-w-2xl // max-width: 42rem
h-4       // height: 1rem (4 * 0.25rem)
```

### Responsive Design

Prefix any class with a breakpoint to apply it at that screen size and above:

```tsx
// Mobile-first: full width on small, half on medium, third on large
className="w-full md:w-1/2 lg:w-1/3"
```

Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px).

### Dark Mode

Prefix with `dark:` to apply styles when dark mode is active:

```tsx
className="bg-white dark:bg-gray-900 text-black dark:text-white"
```

Enable in `tailwind.config.ts`: `darkMode: 'class'` (controlled by a class on `<html>`).

### State Variants

```tsx
hover:bg-blue-600      // on hover
focus:ring-2           // on focus
disabled:opacity-50    // when disabled
active:scale-95        // when active (pressed)
```

## The cn() Helper

When combining conditional classes, use `clsx` or a `cn` helper to avoid messy string concatenation:

```tsx
import { clsx } from "clsx";

className={clsx(
  "base-class another-class",
  isActive && "active-class",
  isDisabled && "opacity-50 cursor-not-allowed"
)}
```

Install: `npm install clsx`
