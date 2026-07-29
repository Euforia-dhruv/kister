# ExperienceEngine.md — Architecture

## The System

Not sections. Not pages. An **Experience Engine** — a system of controllers that orchestrate a cinematic scroll experience.

---

## Architecture Overview

```
ExperienceEngine
├── SceneManager          → Controls scene lifecycle, visibility, transitions
├── TimelineController    → GSAP master timeline, ScrollTrigger orchestration
├── MotionController      → Animation primitives, easing, physics
├── AssetManager          → Image loading, preloading, optimization
├── InteractionManager    → Scroll, hover, touch, keyboard inputs
└── CameraController      → Parallax, depth, viewport transformations
```

---

## 1. ExperienceEngine (Root)

The root controller. Initializes all sub-controllers. Manages global state.

```typescript
// lib/engine/ExperienceEngine.ts
class ExperienceEngine {
  private sceneManager: SceneManager;
  private timeline: TimelineController;
  private motion: MotionController;
  private assets: AssetManager;
  private interaction: InteractionManager;
  private camera: CameraController;

  private state: {
    currentScene: number;
    scrollProgress: number;
    isReducedMotion: boolean;
    isLoaded: boolean;
  };

  async init(): Promise<void> {
    // 1. Detect reduced motion
    // 2. Preload Scene 01 assets
    // 3. Initialize sub-controllers
    // 4. Register ScrollTrigger
    // 5. Start experience
  }

  destroy(): void {
    // Kill all ScrollTriggers
    // Remove event listeners
    // Clear timelines
  }
}
```

---

## 2. SceneManager

Controls which scenes exist, which are active, and how they transition.

```typescript
// lib/engine/SceneManager.ts
interface SceneConfig {
  id: string;
  number: number;
  act: 'void' | 'materials' | 'craft' | 'invitation';
  duration: number; // scroll units
  background: 'dark' | 'light' | 'warm' | 'image';
  assets: string[]; // preload URLs
  onEnter: () => void;
  onLeave: () => void;
  onEnterBack: () => void;
  onLeaveBack: () => void;
}

class SceneManager {
  private scenes: Map<string, SceneConfig>;
  private activeScenes: Set<string>;
  private adjacentDistance: number = 2; // pre-render N scenes ahead

  register(config: SceneConfig): void;
  
  // Called on scroll
  update(currentScroll: number): void {
    // 1. Determine which scene is current
    // 2. Preload adjacent scenes
    // 3. Unload distant scenes
    // 4. Trigger onEnter/onLeave callbacks
  }

  getScene(number: number): SceneConfig;
  getSceneElement(number: number): HTMLElement;
  getTotalDuration(): number;
}
```

### Scene Lifecycle

```
[ distant ] → [ adjacent ] → [ active ] → [ adjacent ] → [ distant ]
     ↑              ↑            ↑            ↑              ↑
  not rendered  preload      animate     keep alive     unmount
```

---

## 3. TimelineController

Manages the GSAP master timeline and ScrollTrigger instances.

```typescript
// lib/engine/TimelineController.ts
class TimelineController {
  private masterTimeline: gsap.core.Timeline;
  private sceneTimelines: Map<string, gsap.core.Timeline>;
  private scrollTriggers: ScrollTrigger[];

  createMasterTimeline(trigger: HTMLElement): void {
    this.masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });
  }

  addScene(sceneId: string, timeline: gsap.core.Timeline): void {
    this.sceneTimelines.set(sceneId, timeline);
    this.masterTimeline.add(timeline, /* position */);
  }

  // Create ScrollTrigger for a scene
  createScrollTrigger(sceneId: string, config: ScrollTriggerConfig): ScrollTrigger {
    const st = ScrollTrigger.create({
      trigger: config.trigger,
      start: config.start,
      end: config.end,
      onEnter: config.onEnter,
      onLeave: config.onLeave,
      scrub: config.scrub,
    });
    this.scrollTriggers.push(st);
    return st;
  }

  kill(): void {
    this.scrollTriggers.forEach(st => st.kill());
    this.masterTimeline.kill();
  }
}
```

---

## 4. MotionController

Animation primitives. Every animation in the experience is built from these.

```typescript
// lib/engine/MotionController.ts
class MotionController {
  // === REVEAL PRIMITIVES ===
  
  fadeIn(el: HTMLElement, config?: AnimationConfig): gsap.core.Tween;
  fadeUp(el: HTMLElement, config?: AnimationConfig): gsap.core.Tween;
  fadeDown(el: HTMLElement, config?: AnimationConfig): gsap.core.Tween;
  scaleIn(el: HTMLElement, config?: AnimationConfig): gsap.core.Tween;
  
  // === TEXT PRIMITIVES ===
  
  letterReveal(el: HTMLElement, config?: TextConfig): gsap.core.Timeline;
  wordReveal(el: HTMLElement, config?: TextConfig): gsap.core.Timeline;
  lineReveal(el: HTMLElement, config?: TextConfig): gsap.core.Timeline;
  typewriter(el: HTMLElement, config?: TextConfig): gsap.core.Timeline;
  
  // === MATERIAL PRIMITIVES ===
  
  materialReveal(el: HTMLElement, material: MaterialType): gsap.core.Timeline;
  lightSweep(el: HTMLElement, direction: 'left' | 'right'): gsap.core.Timeline;
  
  // === CAMERA PRIMITIVES ===
  
  parallax(el: HTMLElement, speed: number): ScrollTrigger;
  scaleReveal(el: HTMLElement, from: number, to: number): gsap.core.Tween;
  
  // === LINE DRAW ===
  
  lineDraw(el: SVGPathElement, duration: number): gsap.core.Tween;
}

interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
}

const EASINGS = {
  smooth: 'power2.inOut',
  decelerate: 'power2.out',
  accelerate: 'power2.in',
  bounce: 'elastic.out(1, 0.5)',
  overshoot: 'back.out(1.7)',
  linear: 'none',
};
```

---

## 5. AssetManager

Handles image loading, preloading, and optimization.

```typescript
// lib/engine/AssetManager.ts
class AssetManager {
  private cache: Map<string, HTMLImageElement>;
  private preloadQueue: string[];
  private observer: IntersectionObserver;

  // Preload images for upcoming scenes
  async preload(urls: string[]): Promise<void> {
    const promises = urls.map(url => this.loadImage(url));
    await Promise.all(promises);
  }

  // Load single image
  private loadImage(url: string): Promise<HTMLImageElement> {
    if (this.cache.has(url)) return Promise.resolve(this.cache.get(url)!);
    
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.cache.set(url, img);
        resolve(img);
      };
      img.onerror = reject;
      img.src = url;
    });
  }

  // Lazy load with IntersectionObserver
  observe(el: HTMLElement, urls: string[]): void;

  // Preload next N scenes
  preloadAdjacent(currentScene: number, distance: number): void;

  // Get cached image
  get(url: string): HTMLImageElement | undefined;

  // Clear distant scenes
  unload(sceneNumbers: number[]): void;
}
```

---

## 6. InteractionManager

Handles all user input: scroll, hover, touch, keyboard.

```typescript
// lib/engine/InteractionManager.ts
class InteractionManager {
  private scroll: ScrollHandler;
  private hover: HoverHandler;
  private touch: TouchHandler;
  private keyboard: KeyboardHandler;

  constructor() {
    this.scroll = new ScrollHandler();
    this.hover = new HoverHandler();
    this.touch = new TouchHandler();
    this.keyboard = new KeyboardHandler();
  }

  // Scroll state
  getScrollProgress(): number;
  getScrollDirection(): 'up' | 'down';
  getScrollSpeed(): number;

  // Scene navigation
  scrollToScene(sceneNumber: number): void;
  scrollToNextScene(): void;
  scrollToPrevScene(): void;

  // Event callbacks
  onScroll(callback: (progress: number) => void): void;
  onSceneChange(callback: (scene: number) => void): void;
}

class ScrollHandler {
  private lastY: number;
  private direction: 'up' | 'down';
  private speed: number;
  private ticking: boolean;

  constructor() {
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  private onScroll = () => {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.update();
        this.ticking = false;
      });
      this.ticking = true;
    }
  };

  private update(): void {
    const currentY = window.scrollY;
    this.direction = currentY > this.lastY ? 'down' : 'up';
    this.speed = Math.abs(currentY - this.lastY);
    this.lastY = currentY;
  }
}
```

---

## 7. CameraController

Manages viewport transformations, parallax, and depth.

```typescript
// lib/engine/CameraController.ts
class CameraController {
  private layers: CameraLayer[];
  private viewport: { width: number; height: number };

  constructor() {
    this.viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  // Add parallax layer
  addLayer(el: HTMLElement, speed: number, z: number): void {
    this.layers.push({ el, speed, z });
  }

  // Update on scroll
  update(scrollY: number): void {
    this.layers.forEach(layer => {
      const yOffset = scrollY * layer.speed;
      const scale = 1 + (layer.z * 0.01);
      layer.el.style.transform = `translateY(${yOffset}px) scale(${scale})`;
    });
  }

  // Viewport-aware animations
  isInViewport(el: HTMLElement, margin?: number): boolean;
  getViewportIntersection(el: HTMLElement): number; // 0-1
}
```

---

## Data Flow

```
User scrolls
    ↓
InteractionManager captures scroll
    ↓
SceneManager updates active scene
    ↓
AssetManager preloads adjacent scenes
    ↓
TimelineController advances GSAP timeline
    ↓
MotionController executes animations
    ↓
CameraController updates viewport
    ↓
DOM updates (60fps)
```

---

## File Structure

```
src/
├── lib/
│   └── engine/
│       ├── ExperienceEngine.ts    # Root controller
│       ├── SceneManager.ts        # Scene lifecycle
│       ├── TimelineController.ts  # GSAP orchestration
│       ├── MotionController.ts    # Animation primitives
│       ├── AssetManager.ts        # Image loading
│       ├── InteractionManager.ts  # User input
│       └── CameraController.ts    # Viewport transforms
├── components/
│   ├── scenes/                    # 35 scene components
│   │   ├── Scene01Threshold.tsx
│   │   ├── Scene02Word.tsx
│   │   ├── ...
│   │   └── Scene35Close.tsx
│   ├── ui/                        # Shared UI
│   ├── navigation/                # Navigation, progress
│   └── layout/                    # Scene containers
├── hooks/
│   ├── useExperience.ts           # Access engine
│   ├── useScene.ts                # Scene state
│   ├── useScrollProgress.ts       # Scroll tracking
│   └── useReducedMotion.ts        # Accessibility
├── data/
│   ├── scenes.ts                  # Scene configurations
│   ├── brands.ts                  # Brand partner data
│   └── products.ts                # Product data
└── types/
    ├── engine.ts                  # Engine types
    ├── scene.ts                   # Scene types
    └── material.ts                # Material types
```

---

## Performance Strategy

### Rendering
- Only current + 2 adjacent scenes in DOM
- Images lazy-loaded with IntersectionObserver
- CSS containment on scene containers
- `will-change: transform` only on actively animating elements

### Animation
- Use `transform` and `opacity` only (GPU-composited)
- Never animate `width`, `height`, `top`, `left`
- Kill ScrollTriggers on scene exit
- Respect `prefers-reduced-motion`

### Loading
- Preload Scene 01 only
- Preload next 2 scenes when current scene is 50% scrolled
- Unload scenes 4+ away from current
- WebP format for all images
- Responsive sizes via Next.js `<Image>`

### Bundle
- Dynamic import all scene components
- GSAP tree-shaken (ScrollTrigger only)
- No Three.js unless R3F genuinely improves a scene
- Target: < 150KB first load JS
