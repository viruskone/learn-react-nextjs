# Task — Lesson 25: Next.js Built-in Optimizations

## Goal

Add a font via `next/font` and an image via `next/image` to the Todo App. Then run Lighthouse to verify the Core Web Vitals score.

---

## Steps

1. **Set up a Google Font with `next/font`**

   In `app/layout.tsx`, replace any existing font setup:
   ```tsx
   import { Inter } from 'next/font/google'

   const inter = Inter({
     subsets: ['latin'],
     display: 'swap',
   })

   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en" className={inter.className}>
         <body>{children}</body>
       </html>
     )
   }
   ```

   If you're using Tailwind, use the CSS variable approach instead:
   ```tsx
   const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
   // Apply inter.variable to <html>
   ```

2. **Add an image with `next/image`**

   - Create a simple SVG or PNG logo (anything works — even a placeholder)
   - Save it to `public/logo.png` (or `public/logo.svg`)
   - Display it in your `Navbar` component:

   ```tsx
   import Image from 'next/image'

   <Image src="/logo.png" alt="Todo App logo" width={32} height={32} />
   ```

3. **Run `npm run build` and `npm start`** (Lighthouse requires a production build)

4. **Open Lighthouse**
   - Chrome DevTools → Lighthouse tab
   - Run a Performance audit
   - Check the CLS score — it should be 0 or very close

---

## Success Criteria

- [ ] A Google Font is loaded via `next/font/google` in `app/layout.tsx`
- [ ] No `<link rel="stylesheet" href="https://fonts.googleapis.com/...">` tags in the HTML (the font is self-hosted)
- [ ] At least one `<Image>` from `next/image` is used in the app
- [ ] TypeScript: `Image` is imported from `'next/image'`, not used as a plain `<img>`
- [ ] No TypeScript errors

---

## Hints

- `next/font` only works in **Server Components** — don't put it in a `'use client'` file
- The font object returned by `Inter(...)` has a `.className` property — apply it to `<html>` or a wrapper element, not `<body>` (though body works too)
- For `next/image` with local images in `public/`, the `src` is the path relative to `public/`: `src="/logo.png"` for `public/logo.png`
- If you don't have an image, use a placeholder: `https://placehold.co/32x32` — but you'll need to add the domain to `remotePatterns` in `next.config.ts`

---

## Bonus (optional)

Add `next/script` for a fake analytics script and set `strategy="afterInteractive"`. Verify in the Network tab that it loads after the page is interactive (not blocking initial render).

---

When you're done, run `/review-lesson` to get feedback.
