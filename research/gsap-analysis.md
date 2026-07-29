# GSAP Analysis

## Purpose

JavaScript animation library for the modern web. GSAP (GreenSock Animation Platform) is the industry standard for high-performance animations, used by millions of websites. Now free including all bonus plugins thanks to Webflow's acquisition.

## Classification

- **Type:** npm package
- **Category:** Runtime dependency (animation library)
- **npm package:** `gsap`
- **Stars:** 27.2k

## License

GreenSock Standard License — now **FREE** including all bonus plugins (thanks to Webflow)

## Tech Stack

- Vanilla JavaScript (framework-agnostic)
- React hook: `@gsap/react`
- TypeScript support
- Zero dependencies

## Installation

```bash
npm install gsap
```

For React integration:
```bash
npm install gsap @gsap/react
```

## Key Features

- **Framework-agnostic** — Works with React, Vue, Svelte, Angular, vanilla JS
- **ScrollTrigger** — The gold standard for scroll-based animations
- **Flip** — Smooth layout transitions (FLIP technique)
- **Draggable** — Drag, throw, and snap with momentum
- **MorphSVG** — Morph between SVG shapes with complex paths
- **SplitText** — Split text into characters, words, and lines for per-character animation
- **MotionPath** — Animate along any path (SVG, canvas, or custom)
- **Observer** — Normalize scroll/touch/pointer events across devices
- **matchMedia()** — Responsive animations that adapt to breakpoints
- **20x faster than jQuery** — Optimized tweening engine
- **Zero dependencies** — Self-contained, no external libs needed
- **@gsap/react** — Official React hook (`useGSAP`) with automatic cleanup

## Basic Usage

```js
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Simple tween
gsap.to('.box', {
  x: 100,
  rotation: 360,
  duration: 1,
  ease: 'power2.out',
})

// ScrollTrigger animation
gsap.to('.panel', {
  scrollTrigger: {
    trigger: '.panel',
    start: 'top center',
    end: 'bottom center',
    scrub: true,
  },
  x: 100,
  opacity: 1,
})
```

### React

```jsx
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

function Box() {
  useGSAP(() => {
    gsap.to('.box', { x: 100, duration: 1 })
  })

  return <div className="box" />
}
```

### Flip Layout Animations

```js
import { Flip } from 'gsap/Flip'

const state = Flip.getState('.element')
// ... DOM change
Flip.from(state, {
  duration: 0.6,
  ease: 'power2.inOut',
})
```

## Resources

- https://gsap.com
- https://github.com/greensock/GSAP
