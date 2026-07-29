# Template 03: Luxury Landing Page

## Overview

A high-end landing page with cinematic hero text reveals, scroll-triggered content sections, smooth page transitions, and premium micro-interactions. Designed for luxury brands, high-end services, and premium product launches.

**Core stack:** Motion + Lenis + GSAP

## Use Cases

- Luxury brand websites (fashion, jewelry, watches)
- High-end real estate and architecture
- Premium SaaS or fintech landing pages
- Executive coaching and consulting
- Art galleries and cultural institutions

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
    "vite": "^6.0.0",
    "tailwindcss": "^3.4.0"
  },
  "optionalDependencies": {
    "gsap-trial": "^3.12.5"
  }
}
```

> **Note:** GSAP's SplitText and ScrollSmoother are Club GSAP plugins. Use `gsap-trial` for development or implement custom text splitting with ` SplitType`.

## File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Landing page composition
│   └── globals.css             # Custom properties, typography
├── components/
│   ├── hero/
│   │   ├── Hero.tsx            # Main hero section
│   │   ├── TextReveal.tsx      # GSAP SplitText reveal
│   │   ├── HeroImage.tsx       # Parallax hero image
│   │   └── ScrollIndicator.tsx # Animated scroll prompt
│   ├── sections/
│   │   ├── ScrollSection.tsx   # Reusable scroll-triggered section
│   │   ├── SplitSection.tsx    # Two-column layout with reveal
│   │   ├── MarqueeSection.tsx  # Infinite text/image marquee
│   │   └── TestimonialSection.tsx
│   ├── ui/
│   │   ├── PageTransition.tsx  # Route transition animations
│   │   ├── MagneticButton.tsx  # Cursor-following button
│   │   ├── TextMask.tsx        # Clip-path text reveal
│   │   └── ImageReveal.tsx     # Clip-path image reveal
│   └── providers/
│       ├── LenisProvider.tsx   # Smooth scroll
│       └── GSAPProvider.tsx    # GSAP context + plugins
├── hooks/
│   ├── useLenis.ts
│   ├── useScrollProgress.ts
│   └── useTextSplit.ts         # SplitType wrapper
├── lib/
│   ├── gsap.ts                 # Plugin registration
│   ├── splittext-config.ts     # Text splitting options
│   └── lenis.ts
├── styles/
│   ├── typography.ts           # Font scale and styles
│   └── animations.ts           # Shared GSAP timelines
└── types/
    └── landing.ts
```

## Key Components

### Hero with Text Reveal

```tsx
// src/components/hero/Hero.tsx
"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  title: string;
  subtitle?: string;
  imageSrc?: string;
}

export default function Hero({ title, subtitle, imageSrc }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const linesRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!titleRef.current) return;

    // Split title into lines for staggered reveal
    const words = title.split(" ");
    titleRef.current.innerHTML = words
      .map(
        (word, i) =>
          `<span class="inline-block overflow-hidden">
            <span class="inline-block" data-line="${i}">${word}&nbsp;</span>
          </span>`
      )
      .join("");

    const lineElements = titleRef.current.querySelectorAll("[data-line]");
    linesRef.current = Array.from(lineElements) as HTMLSpanElement[];

    gsap.set(lineElements, { y: 120, opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(lineElements, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.08,
    });

    // Hero parallax on scroll
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      animation: gsap.to(heroRef.current, {
        y: -100,
        opacity: 0.5,
        scale: 0.95,
        ease: "none",
      }),
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [title]);

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {imageSrc && (
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={imageSrc}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      )}

      <div className="relative z-10 text-center px-6 max-w-6xl">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight text-white"
        />

        {subtitle && (
          <motion.p
            className="mt-8 text-xl md:text-2xl text-white/80 font-light tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="w-[1px] h-16 bg-white/50 animate-pulse" />
      </motion.div>
    </section>
  );
}
```

### ScrollSection

Reusable scroll-triggered section with configurable animations.

```tsx
// src/components/sections/ScrollSection.tsx
"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-left" | "fade-right" | "scale" | "clip";
  delay?: number;
  stagger?: number;
}

const animations = {
  "fade-up": {
    from: { y: 80, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
  },
  "fade-left": {
    from: { x: -80, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
  },
  "fade-right": {
    from: { x: 80, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
  },
  scale: {
    from: { scale: 0.8, opacity: 0 },
    to: { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
  },
  clip: {
    from: { clipPath: "inset(0 0 100% 0)" },
    to: {
      clipPath: "inset(0 0 0% 0)",
      duration: 1.4,
      ease: "power4.inOut",
    },
  },
};

export default function ScrollSection({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  stagger = 0,
}: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { from, to } = animations[animation];
    const targets = stagger
      ? Array.from(el.querySelectorAll("[data-reveal]"))
      : [el];

    gsap.set(targets, from);

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(targets, {
          ...to,
          delay,
          stagger: stagger ? 0.1 : 0,
        });
      },
    });

    return () => trigger.kill();
  }, [animation, delay, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

### PageTransition

Route transitions with Motion AnimatePresence.

```tsx
// src/components/ui/PageTransition.tsx
"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const overlayVariants = {
  initial: { scaleY: 1 },
  animate: {
    scaleY: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
  exit: {
    scaleY: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const contentVariants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 },
  },
  exit: {
    opacity: 0,
    y: -40,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative">
        {/* Overlay wipe */}
        <motion.div
          className="fixed inset-0 bg-black z-50 origin-bottom"
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        />

        {/* Content */}
        <motion.div
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
```

## Integration Patterns

### Magnetic Button

```tsx
// src/components/ui/MagneticButton.tsx
"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      ref.current!.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;
    setPosition({ x: deltaX, y: deltaY });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.button>
  );
}
```

### Marquee Text

```tsx
// src/components/sections/MarqueeSection.tsx
"use client";

import { motion } from "motion/react";

interface MarqueeProps {
  text: string;
  speed?: number;
  className?: string;
}

export default function Marquee({
  text,
  speed = 20,
  className = "",
}: MarqueeProps) {
  const repeatedText = Array(6).fill(text).join(" \u2022 ");

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-block"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        <span className="text-6xl md:text-8xl font-light tracking-tight">
          {repeatedText}
        </span>
      </motion.div>
    </div>
  );
}
```

### GSAP Timeline for Section Entrance

```ts
// src/styles/animations.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function createSectionEntrance(
  section: HTMLElement,
  options?: { stagger?: number; delay?: number }
) {
  const children = section.querySelectorAll("[data-reveal]");

  gsap.set(children, { y: 60, opacity: 0 });

  return gsap.to(children, {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    stagger: options?.stagger ?? 0.1,
    delay: options?.delay ?? 0,
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      once: true,
    },
  });
}
```

## Performance Considerations

- **Text splitting:** SplitText creates extra DOM nodes. Only split visible hero text, not all headings.
- **ScrollTrigger batch:** For many animated elements, use `ScrollTrigger.batch()` to reduce observer overhead.
- **Lenis + GSAP ticker:** Connect Lenis to GSAP's ticker to avoid double `requestAnimationFrame` loops.
- **Image reveals:** Use `clip-path` for reveal animations — GPU-accelerated and jank-free.
- **Font loading:** Use `font-display: swap` and preload critical fonts. Luxury typography often uses large font files.
- **Reduced motion:** Always check `prefers-reduced-motion` and disable complex animations.

```tsx
// Respect motion preferences
useEffect(() => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mq.matches) {
    gsap.globalTimeline.timeScale(100); // Instant
    lenis?.destroy();
  }
}, []);
```

## When to Use This Template

- Premium/luxury brand positioning
- High typography standards with cinematic text reveals
- Scroll-driven storytelling with parallax
- Site needs page transitions between routes
- Design requires custom cursor and magnetic interactions

**Avoid when:** Content is highly dynamic (news, dashboards), users need fast access to specific info, or the site must work with JavaScript disabled.
