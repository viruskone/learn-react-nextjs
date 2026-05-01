# Lesson 25 — Next.js Built-in Optimizations

## Why Next.js Provides These

Browsers need to handle images, fonts, and scripts efficiently — but doing it correctly by hand is tedious:
- Images need lazy loading, correct sizing, modern formats (WebP/AVIF), and layout stability
- Fonts need self-hosting to avoid GDPR issues and layout shifts
- Third-party scripts need to load without blocking the page

Next.js ships components that handle all of this automatically.

---

## next/image

The `<Image>` component replaces `<img>`. It automatically:
- Converts to WebP/AVIF
- Generates responsive sizes
- Lazy-loads images below the fold
- Prevents layout shift by reserving space upfront
- Serves images from Next.js's built-in image optimisation pipeline

```tsx
import Image from 'next/image'

// Local image (TypeScript knows dimensions automatically)
import logo from '@/public/logo.png'

<Image src={logo} alt="App logo" />

// Remote image (must specify width and height)
<Image
  src="https://example.com/photo.jpg"
  alt="Photo"
  width={400}
  height={300}
/>
```

### Remote Images

For security, remote image domains must be whitelisted in `next.config.ts`:

```ts
// next.config.ts
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
}
export default config
```

### fill Layout

When the parent container controls the size:

```tsx
<div style={{ position: 'relative', width: '100%', height: '300px' }}>
  <Image src={photo} alt="Cover" fill style={{ objectFit: 'cover' }} />
</div>
```

---

## next/font

Loading fonts from Google Fonts via `<link>` in the HTML head has problems:
- Extra network request (sometimes blocked by browser)
- Layout shift as the page waits for the font
- Privacy concerns (request goes to Google)

`next/font` self-hosts the font — it downloads it at build time and serves it from your own domain:

```tsx
// app/layout.tsx
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

### Local Fonts

```tsx
import localFont from 'next/font/local'

const myFont = localFont({
  src: './fonts/MyFont.woff2',
  display: 'swap',
})
```

### CSS Variables (for Tailwind integration)

```tsx
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

// In layout.tsx:
<html className={inter.variable}>

// In tailwind.config.ts:
theme: {
  extend: {
    fontFamily: {
      sans: ['var(--font-inter)'],
    },
  },
}
```

---

## next/script

Third-party scripts (analytics, chat widgets) can block page load if loaded naively. `<Script>` gives you control over loading strategy:

```tsx
import Script from 'next/script'

// afterInteractive: loads after hydration (most analytics tools)
<Script
  src="https://example.com/analytics.js"
  strategy="afterInteractive"
/>

// lazyOnload: loads during idle time (lowest priority)
<Script
  src="https://example.com/widget.js"
  strategy="lazyOnload"
/>

// beforeInteractive: loads before hydration (critical scripts only)
<Script
  src="https://example.com/polyfill.js"
  strategy="beforeInteractive"
/>
```

The default for a plain `<script>` tag is "blocking" — it stops everything while loading. `afterInteractive` is right for most third-party tools.

---

## Measuring the Impact

Use Lighthouse (built into Chrome DevTools → Lighthouse tab) to measure:
- **LCP** (Largest Contentful Paint) — how fast the main content loads. `next/image` improves this.
- **CLS** (Cumulative Layout Shift) — how much the page jumps around. `next/font` and `next/image` both help.
- **FID / INP** — interactivity. `next/script` helps by not blocking JS execution.
