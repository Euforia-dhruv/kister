# Motion (Framer Motion) Analysis

## Purpose

Open source animation library for JavaScript, React, and Vue. Formerly known as Framer Motion, now rebranded as **Motion**. Provides a simple declarative API for animations, gestures, layout transitions, and scroll-linked effects.

## Classification

- **Type:** npm package
- **Category:** Component library (React) / animation runtime
- **npm packages:** `motion` (React/JS), `motion-v` (Vue)

## License

MIT

## Tech Stack

- React
- Vue (via `motion-v`)
- Vanilla JavaScript (`motion/mini`)
- TypeScript
- Hybrid engine: JavaScript + native browser APIs (Web Animations API)

## Installation

```bash
npm install motion
```

For Vue:
```bash
npm install motion-v
```

## Key Features

- **Simple API** — `motion.div`, `animate`, `useAnimate` for declarative animations
- **Hybrid engine** — Combines JS scheduling with native browser APIs (Web Animations API) for performance
- **120fps GPU-accelerated** — Hardware-accelerated transforms and opacity
- **Gestures** — `whileHover`, `whileTap`, `whileDrag`, `whileInView`, `whileFocus`
- **Springs** — Physics-based spring animations with `type: "spring"`
- **Layout transitions** — Automatic smooth transitions when elements change position/size (`layout` prop)
- **Scroll-linked effects** — `useScroll`, `useInView`, `useMotionValueEvent`
- **Timelines** — `timeline()` and `stagger()` for sequencing animations
- **AnimatePresence** — Exit animations when components unmount
- **Variants** — Named animation states for parent-child orchestration
- **TypeScript** — Full type safety
- **Tree-shakable** — Only import what you use

## Basic Usage

### React

```jsx
import { motion, AnimatePresence } from 'motion/react'

function Box() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, type: 'spring' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Animate me
    </motion.div>
  )
}
```

### Scroll-linked

```jsx
import { motion, useScroll, useTransform } from 'motion/react'

function Parallax() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -150])

  return (
    <motion.div style={{ y }}>
      Parallax content
    </motion.div>
  )
}
```

### Vanilla JS

```js
import { animate } from 'motion'

animate('.box', { x: 100, opacity: 1 }, { duration: 0.5 })
```

### Stagger

```js
import { stagger, animate } from 'motion'

animate('.item', { opacity: [0, 1] }, { delay: stagger(0.1) })
```

## Resources

- https://motion.dev
- https://github.com/motiondivision/motion
