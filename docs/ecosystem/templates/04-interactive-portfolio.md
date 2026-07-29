# Template 04: Interactive Portfolio

## Overview

A project showcase with animated grid layout, hover micro-interactions, detail view transitions, and optional 3D background elements. Designed for creative studios, freelancers, and design agencies.

**Core stack:** Motion + GSAP + React Three Fiber

## Use Cases

- Creative agency portfolio
- Freelance designer/developer showcase
- Photography/videography portfolio
- Architecture studio projects
- Product design case studies

## Package Dependencies

```json
{
  "dependencies": {
    "motion": "^11.18.0",
    "gsap": "^3.12.5",
    "@react-three/fiber": "^8.17.0",
    "@react-three/drei": "^9.120.0",
    "three": "^0.170.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/three": "^0.170.0",
    "typescript": "^5.7.0",
    "vite": "^6.0.0",
    "tailwindcss": "^3.4.0"
  }
}
```

## File Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Portfolio home with grid
│   ├── projects/
│   │   └── [slug]/
│   │       └── page.tsx            # Project detail page
│   └── globals.css
├── components/
│   ├── portfolio/
│   │   ├── ProjectGrid.tsx         # Animated project grid
│   │   ├── ProjectCard.tsx         # Individual card with hover
│   │   ├── ProjectDetail.tsx       # Full project view
│   │   ├── ProjectMeta.tsx         # Client, year, role
│   │   ├── ImageGallery.tsx        # Masonry/gallery view
│   │   └── FilterBar.tsx           # Category filtering
│   ├── 3d/
│   │   ├── Background3D.tsx        # Ambient 3D background
│   │   ├── FloatingGeometry.tsx    # Animated shapes
│   │   └── GrainOverlay.tsx        # Film grain effect
│   ├── ui/
│   │   ├── PageTransition.tsx      # Motion page transitions
│   │   ├── Cursor.tsx              # Custom animated cursor
│   │   ├── SmoothImage.tsx         # Lazy image with reveal
│   │   └── NavLink.tsx             # Animated nav link
│   └── providers/
│       ├── LenisProvider.tsx
│       └── GSAPProvider.tsx
├── hooks/
│   ├── useLenis.ts
│   ├── useMousePosition.ts        # Cursor tracking
│   └── useProjectFilter.ts        # Filter state management
├── lib/
│   ├── gsap.ts
│   ├── projects.ts                # Project data
│   └── lenis.ts
├── types/
│   └── portfolio.ts               # Project, Category types
└── public/
    └── projects/                   # Project images
```

## Key Components

### ProjectGrid

Staggered grid with hover effects and scroll reveal.

```tsx
// src/components/portfolio/ProjectGrid.tsx
"use client";

import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";
import { Project } from "@/types/portfolio";

gsap.registerPlugin(ScrollTrigger);

interface ProjectGridProps {
  projects: Project[];
  filter?: string;
}

export default function ProjectGrid({
  projects,
  filter,
}: ProjectGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = filter
    ? projects.filter((p) => p.category === filter)
    : projects;

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll("[data-card]");

    gsap.set(cards, { y: 80, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: grid,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
        });
      },
    });

    return () => trigger.kill();
  }, [filter]);

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
      {filtered.map((project, i) => (
        <motion.div
          key={project.slug}
          data-card
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ProjectCard project={project} index={i} />
        </motion.div>
      ))}
    </div>
  );
}
```

### ProjectCard

Hover effects with image distortion and text reveal.

```tsx
// src/components/portfolio/ProjectCard.tsx
"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/portfolio";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = cardRef.current!.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const resetMouse = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.a
        ref={cardRef}
        className="group relative block aspect-[4/3] overflow-hidden rounded-xl cursor-pointer"
        onMouseMove={handleMouse}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={resetMouse}
        style={{ rotateX, rotateY, perspective: 1000 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Image */}
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          animate={{ opacity: isHovered ? 1 : 0.6 }}
          transition={{ duration: 0.4 }}
        />

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <motion.div
            animate={{
              y: isHovered ? 0 : 20,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <span className="text-sm text-white/60 uppercase tracking-wider">
              {project.category}
            </span>
          </motion.div>

          <motion.h3
            className="text-2xl font-semibold text-white mt-2"
            animate={{ y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            {project.title}
          </motion.h3>

          <motion.p
            className="text-sm text-white/70 mt-2 line-clamp-2"
            animate={{
              y: isHovered ? 0 : 10,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {project.description}
          </motion.p>
        </div>

        {/* View indicator */}
        <motion.div
          className="absolute top-6 right-6"
          animate={{
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M17 7H7M17 7v10"
              />
            </svg>
          </div>
        </motion.div>
      </motion.a>
    </Link>
  );
}
```

### ProjectDetail

Full project view with scroll-driven content reveal.

```tsx
// src/components/portfolio/ProjectDetail.tsx
"use client";

import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Project } from "@/types/portfolio";

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el as HTMLElement, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el as HTMLElement,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <article ref={contentRef} className="max-w-6xl mx-auto px-6 py-24">
      {/* Hero */}
      <motion.div
        className="relative aspect-video rounded-2xl overflow-hidden mb-16"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Meta */}
      <div data-reveal className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        <div>
          <span className="text-sm text-neutral-500 uppercase">Client</span>
          <p className="text-lg mt-1">{project.client}</p>
        </div>
        <div>
          <span className="text-sm text-neutral-500 uppercase">Year</span>
          <p className="text-lg mt-1">{project.year}</p>
        </div>
        <div>
          <span className="text-sm text-neutral-500 uppercase">Role</span>
          <p className="text-lg mt-1">{project.role}</p>
        </div>
        <div>
          <span className="text-sm text-neutral-500 uppercase">Category</span>
          <p className="text-lg mt-1">{project.category}</p>
        </div>
      </div>

      {/* Description */}
      <div data-reveal className="max-w-3xl mb-24">
        <h2 className="text-3xl font-semibold mb-6">Overview</h2>
        <p className="text-lg text-neutral-600 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Gallery */}
      <div data-reveal className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {project.images.map((img, i) => (
          <div
            key={i}
            className="relative aspect-[4/3] rounded-xl overflow-hidden"
          >
            <Image
              src={img}
              alt={`${project.title} ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Results */}
      {project.results && (
        <div data-reveal className="max-w-3xl">
          <h2 className="text-3xl font-semibold mb-6">Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {project.results.map((result, i) => (
              <div key={i}>
                <p className="text-4xl font-bold text-neutral-900">
                  {result.value}
                </p>
                <p className="text-sm text-neutral-500 mt-2">{result.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
```

### Background3D

Ambient 3D background with floating geometry.

```tsx
// src/components/3d/Background3D.tsx
"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingSphere({
  position,
  color,
  speed = 1,
}: {
  position: [number, number, number];
  color: string;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1 * speed;
    }
  });

  return (
    <Float speed={speed * 2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10 opacity-30">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <FloatingSphere position={[-3, 2, -2]} color="#a78bfa" speed={0.8} />
        <FloatingSphere position={[3, -1, -3]} color="#f472b6" speed={1.2} />
        <FloatingSphere position={[0, 3, -4]} color="#60a5fa" speed={0.6} />
      </Canvas>
    </div>
  );
}
```

## Integration Patterns

### Project Data Model

```ts
// src/types/portfolio.ts
export interface Project {
  slug: string;
  title: string;
  description: string;
  category: string;
  client: string;
  year: string;
  role: string;
  coverImage: string;
  images: string[];
  results?: { value: string; label: string }[];
  tags: string[];
}

export type Category = "all" | "web" | "branding" | "motion" | "3d";
```

### Filter Bar

```tsx
// src/components/portfolio/FilterBar.tsx
"use client";

import { motion } from "motion/react";

interface FilterBarProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

export default function FilterBar({
  categories,
  active,
  onChange,
}: FilterBarProps) {
  return (
    <div className="flex gap-4 mb-12 overflow-x-auto pb-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className="relative px-6 py-2 text-sm uppercase tracking-wider whitespace-nowrap"
        >
          {active === cat && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-neutral-900 rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span
            className={`relative z-10 ${
              active === cat ? "text-white" : "text-neutral-500"
            }`}
          >
            {cat}
          </span>
        </button>
      ))}
    </div>
  );
}
```

### Custom Cursor

```tsx
// src/components/ui/Cursor.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const enter = () => setIsHovering(true);
    const leave = () => setIsHovering(false);

    window.addEventListener("mousemove", move);

    document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-black rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: pos.x - 8,
          y: pos.y - 8,
          scale: isHovering ? 2 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-black/40 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        animate={{
          x: pos.x - 16,
          y: pos.y - 16,
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
    </>
  );
}
```

## Performance Considerations

- **Image loading:** Use Next.js `<Image>` with `sizes` prop and `priority` for above-fold content.
- **3D background:** Set `frameloop="demand"` if the background is static. Disable entirely on mobile.
- **Grid animation:** Use `will-change: transform` on grid items during animation, remove after.
- **Filter transitions:** Use `layout` animations from Motion for smooth filter changes without remount.
- **GSAP context:** Always use `gsap.context()` and `revert()` to clean up ScrollTriggers on unmount.
- **Custom cursor:** Disable on touch devices — `matchMedia("(pointer: fine)")`.

```tsx
// Disable custom cursor on touch
useEffect(() => {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  // ... setup cursor
}, []);
```

## When to Use This Template

- Creative portfolio or agency site
- Projects benefit from visual hover interactions
- Need page transitions between grid and detail
- Want ambient 3D background elements
- Design calls for custom cursor and magnetic effects

**Avoid when:** Portfolio is very large (100+ projects — use pagination), content is text-heavy, or the audience primarily uses mobile.
