# Lottie Analysis

> **⚠️ DEPRECATED** — `@lottiefiles/lottie-player` is deprecated. Use [`@lottiefiles/dotlottie-wc`](https://www.npmjs.com/package/@lottiefiles/dotlottie-wc) instead.

## Purpose

Web Component for playing Lottie animations. Provides a simple `<lottie-player>` element that renders After Effects animations exported via Bodymovin/Lottie.

## Classification

- **Type:** npm package
- **Category:** Web Component
- **npm package:** `@lottiefiles/lottie-player` (**deprecated**)
- **Modern replacement:** `@lottiefiles/dotlottie-wc`

## License

MIT

## Tech Stack

- Web Components (Custom Elements v1)
- Lottie (Bodymovin) renderer
- TypeScript
- Framework-agnostic (works with React, Vue, Next.js, Nuxt via web component)

## Installation

### Legacy (Deprecated)

```bash
npm install @lottiefiles/lottie-player
```

### Modern Replacement (Recommended)

```bash
npm install @lottiefiles/dotlottie-wc
```

## Key Features

- **Play Lottie/dotLottie animations** — Render vector animations exported from After Effects
- **Autoplay** — Start animation immediately on load
- **Built-in controls** — Play/pause/stop UI controls
- **Loop** — Infinite or finite loop support
- **Framework support** — React, Vue, Next.js, Nuxt (via web component wrapper)
- **dotLottie format** — Modern compressed format with better performance

## Basic Usage

### Legacy (`lottie-player`)

```html
<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>

<lottie-player
  src="https://assets2.lottiefiles.com/packages/lf20_kd1yhdtq.json"
  background="transparent"
  speed="1"
  style="width: 300px; height: 300px"
  loop
  controls
  autoplay
></lottie-player>
```

### Modern (`dotlottie-wc`)

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-wc@latest/dist/index.js"></script>

<dotlottie-wc
  src="https://lottie.host/animation.lottie"
  style="width: 300px; height: 300px"
  autoplay
  loop
></dotlottie-wc>
```

### React (with dotlottie-wc)

```jsx
import '@lottiefiles/dotlottie-wc'

function LottieAnimation() {
  return (
    <dotlottie-wc
      src="https://lottie.host/animation.lottie"
      style={{ width: 300, height: 300 }}
      autoplay
      loop
    />
  )
}
```

## Migration Guide

If you're currently using `@lottiefiles/lottie-player`:

1. Uninstall: `npm uninstall @lottiefiles/lottie-player`
2. Install: `npm install @lottiefiles/dotlottie-wc`
3. Replace `<lottie-player>` with `<dotlottie-wc>`
4. Update attributes (similar API, check docs)

## Resources

- https://lottiefiles.com
- https://github.com/LottieFiles/dotlottie-web
- https://www.npmjs.com/package/@lottiefiles/dotlottie-wc
