# Lenis Analysis

## Purpose

Lightweight smooth scroll library. Lenis provides buttery-smooth scrolling that works with native scroll behavior, making it ideal for syncing with WebGL, GSAP ScrollTrigger, and modern animation libraries.

## Classification

- **Type:** npm package
- **Category:** Runtime dependency (scroll library)
- **npm package:** `lenis`

## License

MIT

## Tech Stack

- Vanilla JavaScript (framework-agnostic)
- Framework adapters: React, Vue, Svelte, Framer
- Zero dependencies

## Installation

```bash
npm install lenis
```

## Key Features

- **Lightweight** — Tiny bundle size, zero dependencies
- **Native scroll** — Runs on top of native scroll, no `overflow: hidden` hacks
- **Any axis** — Vertical, horizontal, or both
- **Built for sync** — Designed to work with GSAP ScrollTrigger, WebGL, and Three.js
- **Framework adapters** — `@studio-freight/lenis/react`, `@studio-freight/lenis/vue`, etc.
- **Scroll snapping** — Built-in snap points
- **autoRaf** — Automatic requestAnimationFrame loop
- **Infinite scroll** — Support for infinite scrolling patterns
- **Nested scroll** — Handles scrollable containers within scrollable pages

## Basic Usage

### Vanilla JS

```js
import Lenis from 'lenis'

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  smoothTouch: false,
  touchMultiplier: 2,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
```

### React

```jsx
import { ReactLenis } from '@studio-freight/lenis/react'

function App() {
  return (
    <ReactLenis root>
      <main>
        {/* Your content */}
      </main>
    </ReactLenis>
  )
}
```

### With GSAP ScrollTrigger

```js
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const lenis = new Lenis()
lenis.on(ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)
```

## Resources

- https://github.com/studio-freight/lenis
- https://lenis.docs.pmnd.rs
