# Template 01: Immersive Story Website

## Overview

A full-page scroll-driven narrative experience with cinematic transitions, smooth scrolling, and scroll-triggered reveals. Ideal for brand storytelling, documentary sites, product launches, and editorial content.

**Core stack:** Lenis + GSAP (ScrollTrigger) + Motion

## Use Cases

- Brand storytelling and campaign sites
- Long-form editorial and documentary
- Product launch narratives
- Award-showcase portfolio pieces
- Data-driven stories and timelines

## Package Dependencies

```json
{
  "dependencies": {
    "@studio-freight/lenis": "^1.0.42",
    "gsap": "^3.12.5",
    "motion": "^11.18.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "typescript": "^5.7.0",
    "vite": "^6.0.0"
  }
}
```

## File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with LenisProvider
│   ├── page.tsx                # Main story page
│   └── globals.css
├── components/
│   ├── story/
│   │   ├── ScrollReveal.tsx    # GSAP ScrollTrigger reveal wrapper
│   │   ├── ParallaxLayer.tsx   # Parallax depth layers
│   │   ├── ProgressIndicator.tsx
│   │   └── Section.tsx         # Full-viewport story section
│   ├── ui/
│   │   ├── PageTransition.tsx  # Motion AnimatePresence transitions
│   │   ├── Cursor.tsx          # Custom cursor (optional)
│   │   └── Loader.tsx          # Initial load animation
│   └── providers/
│       └── LenisProvider.tsx   # Lenis smooth scroll provider
├── hooks/
│   ├── useLenis.ts             # Lenis instance access
│   ├── useScrollProgress.ts    # Normalized scroll progress
│   └── useSectionInView.ts    # Track active section
├── lib/
│   ├── gsap.ts                 # GSAP plugin registration
│   └── lenis.ts                # Lenis configuration
└── types/
    └── story.ts                # Section and slide types
```

## Key Components

### LenisProvider

Wraps the app to enable smooth scrolling across the entire site.

```tsx
// src/components/providers/LenisProvider.tsx
"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LenisContextType {
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextType>({ lenis: null });

export function useLenis() {
  return useContext(LenisContext);
}

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as unknown as gsap.TickerCallback);
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  );
}
```

### ScrollReveal

Reusable wrapper that animates children into view on scroll.

```tsx
// src/components/story/ScrollReveal.tsx
"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  stagger?: boolean;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 1,
  distance = 60,
  className = "",
  stagger = false,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const targets = stagger ? el.children : [el];

    const fromVars = {
      opacity: 0,
      y: direction === "up" || direction === "down" ? distance * (direction === "up" ? 1 : -1) : 0,
      x: direction === "left" || direction === "right" ? distance * (direction === "left" ? 1 : -1) : 0,
    };

    const toVars = {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      ease: "power3.out",
      stagger: stagger ? 0.15 : 0,
    };

    gsap.set(targets, fromVars);

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(targets, toVars);
      },
    });

    return () => {
      trigger.kill();
      gsap.killTweensOf(targets);
    };
  }, [direction, delay, duration, distance, stagger]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
```

### PageTransition

Animated route transitions using Motion's AnimatePresence.

```tsx
// src/components/ui/PageTransition.tsx
"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

## Integration Patterns

### Section Composition

```tsx
// src/app/page.tsx
import ScrollReveal from "@/components/story/ScrollReveal";
import Section from "@/components/story/Section";

export default function StoryPage() {
  return (
    <main>
      <Section id="hero" className="h-screen flex items-center justify-center">
        <ScrollReveal direction="up" delay={0.2}>
          <h1 className="text-8xl font-bold">The Story</h1>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.4}>
          <p className="text-xl mt-4">Scroll to explore</p>
        </ScrollReveal>
      </Section>

      <Section id="chapter-1" className="h-screen">
        <ScrollReveal direction="left" stagger>
          <h2>Chapter One</h2>
          <p>Content here</p>
        </ScrollReveal>
      </Section>

      <Section id="chapter-2" className="h-screen">
        <ScrollReveal direction="right">
          <h2>Chapter Two</h2>
        </ScrollReveal>
      </Section>
    </main>
  );
}
```

### GSAP Configuration

```ts
// src/lib/gsap.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export function registerGSAPPlugins() {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  gsap.defaults({
    ease: "power3.out",
    duration: 1,
  });

  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
  });
}
```

### Scroll Progress Hook

```ts
// src/hooks/useScrollProgress.ts
"use client";

import { useEffect, useState } from "react";
import { useLenis } from "@/components/providers/LenisProvider";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const { lenis } = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const handleScroll = ({ progress: p }: { progress: number }) => {
      setProgress(p);
    };

    lenis.on("scroll", handleScroll);
    return () => lenis.off("scroll", handleScroll);
  }, [lenis]);

  return progress;
}
```

## Performance Considerations

- **Lazy registration:** Register GSAP plugins only once in the provider, not per-component.
- **ScrollTrigger batch:** Use `ScrollTrigger.batch()` for many reveal elements to reduce observer count.
- **Lenis RAF:** Hook Lenis into GSAP's ticker instead of its own `requestAnimationFrame` to avoid double-RAF.
- **Hardware acceleration:** GSAP automatically uses transforms; avoid animating `top`/`left` or `margin`.
- **Image loading:** Use `loading="lazy"` on below-fold images. Pair with `ScrollTrigger` for progressive loading.
- **Reduced motion:** Respect `prefers-reduced-motion` — disable Lenis and GSAP animations for accessibility.

```tsx
// Respect reduced motion
useEffect(() => {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReduced) {
    lenis?.destroy();
    return;
  }
  // ... init Lenis
}, []);
```

## When to Use This Template

- You need a cinematic, scroll-driven narrative
- Content is sequential and editorial
- Full-viewport sections with parallax/depth
- Brand storytelling or product launch
- Awards/showcase piece where visual impact matters

**Avoid when:** The site is primarily data-driven, form-heavy, or requires non-linear navigation.
