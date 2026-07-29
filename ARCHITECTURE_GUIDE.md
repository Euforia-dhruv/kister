# Animation & 3D Architecture Guide

## Purpose

This guide defines when to use each animation/3D technology in the stack. Follow it to keep decisions consistent, performant, and accessible.

---

## Technology Matrix

### GSAP

Use GSAP for:

- **Complex timeline choreography** — multi-step sequences, staggered reveals, coordinated element groups.
- **Scroll-triggered animations** — ScrollTrigger with scrub, pin, and snap. Pair with Lenis for smooth scroll.
- **Text splitting and morphing** — SplitText for character/word/line animation.
- **Motion path animations** — animating elements along SVG or custom paths.
- **FLIP layout transitions** — GSAP Flip for smooth DOM repositioning.
- **Responsive animations** — matchMedia() to create/kill animations at breakpoints.
- **Precise timing control** — when easing, duration, or sequencing demands exactness.

GSAP is the primary animation engine for anything beyond simple transitions.

### Motion (Framer Motion)

Use Motion for:

- **UI component animations** — hover, tap, focus states within React components.
- **Page transitions** — AnimatePresence for enter/exit animations between routes.
- **Layout animations** — element repositioning when DOM order changes.
- **Scroll-linked effects within components** — useInView, scroll progress bindings.
- **Spring physics** — natural-feeling motion without manual easing.
- **Gesture-based interactions** — drag, pan, pinch within component boundaries.
- **React-first API** — when declarative motion props integrate cleanly with component logic.

Motion handles component-level animation. It stays within the React render tree.

### CSS Animations

Use CSS for:

- **Simple hover/focus transitions** — color changes, opacity fades, scale on hover.
- **Loading spinners and pulse effects** — infinite keyframe loops.
- **Reduced motion fallbacks** — default static states behind `prefers-reduced-motion`.
- **Micro-interactions** — no JS control needed, no timeline coordination.
- **Performance-critical simple animations** — GPU-accelerated properties with zero JS overhead.
- **No timeline coordination needed** — standalone visual feedback.

CSS is the default for anything trivial. If it needs JS, use GSAP or Motion.

### React Three Fiber

Use R3F for:

- **3D product showcases** — interactive product viewers, orbit controls, material switching.
- **Interactive 3D scenes** — mouse-following, click-to-rotate, scroll-driven 3D.
- **Data visualization in 3D** — spatial data, volumetric displays.
- **Immersive brand experiences** — when 3D is central to the narrative.
- **WebGL-powered backgrounds** — animated shaders, particle systems, generative scenes.
- **When 3D genuinely adds value** — not decorative; functional or experiential.

Pair with Drei for helpers (OrbitControls, Environment, Text, Float, etc.).

### When NOT to Use Three.js

Avoid Three.js when:

- The animation is 2D — CSS or GSAP is simpler and faster.
- Target is performance-critical mobile — 3D is heavy on low-end GPUs.
- Accessibility is the priority — 3D scenes need extra ARIA work.
- CSS/JS animations already suffice — don't add a 3D runtime for a fade.
- Load time is critical — Three.js adds ~150KB+ to bundle.
- Team lacks 3D expertise — maintenance cost is real.

### Lottie

Use Lottie when:

- You need **simple vector animations** exported from After Effects.
- The animation is **icon-scale** — small, self-contained, looping.
- Loading indicators or empty-state illustrations.
- A designer exports from After Effects via Bodymovin.
- **File size matters** — dotLottie format compresses well.

Use `dotlottie-wc` for web component integration. Avoid Lottie for interactive or scroll-driven animation.

---

## Performance Recommendations

1. **GPU-accelerated properties only** — `transform`, `opacity`, `filter`. Never animate `width`, `height`, `top`, `left`, `margin`, `padding`.
2. **Use `will-change` sparingly** — add only during animation, remove after. It consumes GPU memory.
3. **Batch animations with GSAP** — one timeline beats twenty independent tweens.
4. **Use Lenis for smooth scroll** — not custom scroll jacking or CSS `scroll-behavior: smooth`.
5. **Lazy load 3D scenes** — dynamic import R3F Canvas components. Don't block initial render.
6. **Use Suspense for async 3D assets** — wrap Canvas in Suspense boundaries with meaningful fallbacks.
7. **Implement `prefers-reduced-motion`** — respect the OS setting. Provide static alternatives.
8. **Use PerformanceMonitor** — adapt 3D quality (dpr, frameloop) based on device capability.

### GPU Best Practices

- Prefer `transform` + `opacity` animations.
- Avoid animating layout properties — they trigger reflow.
- Use CSS containment (`contain: layout style paint`) for complex scenes.
- Offload heavy computation to Web Workers when possible.
- Profile with Chrome DevTools Performance panel — look for "Recalculate Style" and "Layout" flags.

---

## Accessibility Recommendations

1. **Always implement `prefers-reduced-motion`** — wrap animation triggers in a media query check. GSAP's `matchMedia()` handles this natively.
2. **Use GSAP `matchMedia()` for responsive animations** — register animation sets that scale with viewport and respect motion preferences.
3. **Provide static alternatives** — every animated element should have a meaningful default state.
4. **Ensure keyboard navigation works with animations** — focus rings must remain visible, tab order must not break during transitions.
5. **Don't rely solely on animation for conveying information** — pair motion with text, icons, or color changes.
6. **Use ARIA live regions for dynamic content** — announce state changes triggered by animation.

---

## Decision Tree

```
Need scroll animations?
  → GSAP ScrollTrigger + Lenis

Need UI transitions (hover, tap, focus)?
  → Motion (Framer Motion)

Need 3D scene or interactive model?
  → React Three Fiber + Drei

Need timeline choreography (multi-step sequence)?
  → GSAP

Need simple effects (hover, spinner, fade)?
  → CSS animations

Need vector animation from After Effects?
  → Lottie (dotlottie-wc)

Need page transitions?
  → Motion AnimatePresence

Need smooth scroll only?
  → Lenis

Need text splitting / morphing?
  → GSAP SplitText
```

---

## Integration Patterns

### GSAP + Lenis

Smooth scroll with scroll-triggered animations.

```ts
// Initialize Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

// Sync ScrollTrigger with Lenis
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

### GSAP + React Three Fiber

Animate 3D scene properties from GSAP timelines.

```tsx
// Use useFrame or useRef to bridge GSAP → R3F
const meshRef = useRef<THREE.Mesh>(null);

useEffect(() => {
  gsap.to(meshRef.current.rotation, {
    y: Math.PI * 2,
    duration: 2,
    ease: 'power2.inOut',
  });
}, []);
```

### Motion + React

UI component animations declaratively.

```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
>
  Click me
</motion.button>
```

### React Three Fiber + Drei

3D scenes with helper components.

```tsx
<Canvas>
  <Suspense fallback={<Loader />}>
    <Environment preset="city" />
    <OrbitControls enableZoom={false} />
    <Float speed={1.5} rotationIntensity={0.5}>
      <Model />
    </Float>
  </Suspense>
</Canvas>
```

### Full Stack Integration

```
Lenis (smooth scroll)
  → GSAP ScrollTrigger (scroll-linked timelines)
    → GSAP timelines (choreography)
      → Motion (component-level UI)
        → R3F + Drei (3D scenes)
```

---

## Current Stack (kitser-v2)

Installed dependencies:

| Package | Version | Role |
|---------|---------|------|
| gsap | ^3.15.0 | Primary animation engine |
| lenis | ^1.3.25 | Smooth scroll |
| next | 16.2.12 | Framework |
| react | 19.2.4 | UI |

Not yet installed (add as needed):

| Package | Install |
|---------|---------|
| motion | `npm i motion` |
| @react-three/fiber | `npm i @react-three/fiber` |
| @react-three/drei | `npm i @react-three/drei` |
| three | `npm i three` |
| @lottiefiles/dotlottie-wc | `npm i @lottiefiles/dotlottie-wc` |

---

## Anti-Patterns to Avoid

- **Scroll jacking** — use Lenis, not custom scroll handlers or `overflow: hidden` on body.
- **Animating layout properties** — never animate `width`, `height`, `top`, `left`, `margin`, `padding`.
- **Infinite `will-change`** — remove after animation completes.
- **Three.js for 2D** — if it's flat, use GSAP or CSS.
- **Lottie for complex interaction** — Lottie is playback-only; use GSAP or R3F for interactive motion.
- **Mixing Motion and GSAP on same element** — pick one per element to avoid conflicts.
- **Skipping Suspense for 3D** — always wrap Canvas content in Suspense.
- **Ignoring reduced motion** — check `prefers-reduced-motion` for every animation system.
