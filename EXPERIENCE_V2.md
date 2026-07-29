# EXPERIENCE_V2.md

## Technical Translation of the Director's Cut

---

## Architecture

### What Changes

The current implementation is a single `CanvasExperience.tsx` with 11 images and 21 text elements, all animated with identical envelopes.

The new implementation is still a single component — but the animation system is fundamentally different. Instead of one envelope applied to everything, each element has its own animation vocabulary defined in a data structure. The component reads the data and renders accordingly.

### What Stays

- Single `CanvasExperience.tsx` component
- Scroll-driven progress (0.00–1.00)
- Sticky viewport
- React + CSS (no GSAP for animation — GSAP is overkill for this)
- Lenis smooth scroll

### What Goes

- `Particles.tsx` — removed entirely
- Film grain overlay — removed
- Progress bar — removed
- Nav — removed
- `LightSource.tsx`, `DepthLayer.tsx`, `CinematicText.tsx`, `CinematicImage.tsx`, `TimelineEngine.tsx`, `Canvas.tsx` — all removed
- Uniform blur-in/scale/fade envelope — replaced with per-element animation vocabulary

---

## Data Structure

Each beat is defined as an object with its own timing, animation, and visual properties:

```typescript
interface Beat {
  id: string;
  start: number;        // progress 0.00-1.00
  end: number;
  
  // Visual content
  type: "darkness" | "image" | "text" | "composite";
  
  // For image beats
  image?: {
    src: string;
    x: number;           // viewport % position
    y: number;
    w: number;           // viewport % size
    h: number;
    mask?: string;       // CSS clip-path
    deblurDuration: number;  // % of beat duration for de-blur
    zoom?: [number, number];
    pan?: [number, number];  // CSS translate %
    colorOverlay?: string;   // material-specific tint
    dissolveStyle: "fade" | "erosion";
  };
  
  // For text beats
  text?: {
    content: string | string[];  // array for staggered lines
    weight: number;
    size: string;          // CSS clamp()
    tracking: string;
    color?: string;
    stagger?: number;      // delay between lines (progress units)
    y?: number;
    x?: number;
    perspective?: number;
    rotateX?: number;
  };
  
  // For darkness beats
  darkness?: {
    background: string;
    lightSize: number;
  };
  
  // Animation
  enter: "instant" | "blur-to-sharp" | "dissolve-in";
  exit: "dissolve" | "erosion" | "instant";
  enterDuration: number;  // progress units
  exitDuration: number;   // progress units
  holdDuration: number;   // progress units at full visibility
  
  // Derived (calculated, not set)
  // envelope, opacity, blur, scale — all computed from the above
}
```

---

## Beat Definitions

### ACT I: THE AWAKENING

```typescript
const beats: Beat[] = [
  // BEAT 1: The First Breath
  {
    id: "breath",
    start: 0.00,
    end: 0.04,
    type: "darkness",
    darkness: { background: "#050505", lightSize: 0 },
    enter: "instant",
    exit: "instant",
    enterDuration: 0,
    exitDuration: 0,
    holdDuration: 0.04,
  },

  // BEAT 2: The Light
  {
    id: "light",
    start: 0.04,
    end: 0.10,
    type: "darkness",
    darkness: { background: "#050505", lightSize: 30 },
    // Light ignites instantly, then pulses
    // Pulse: 30 → 40 → 25 → 30 over 0.02, then holds at 30
    enter: "instant",
    exit: "dissolve",
    enterDuration: 0,
    exitDuration: 0.02,
    holdDuration: 0.04,
  },

  // BEAT 3: The Wordmark
  {
    id: "wordmark",
    start: 0.10,
    end: 0.18,
    type: "composite",
    text: {
      content: ["K", "I", "T", "S", "E", "R"],
      weight: 100,
      size: "clamp(4rem, 14vw, 11rem)",
      tracking: "0.3em",
      y: -20,
      // Letter-by-letter: each letter 0.01 duration, gap 0.005
      // Total: 6 letters × 0.01 + 5 gaps × 0.005 = 0.085
      // Adjusted: fit within 0.08 beat
    },
    darkness: { background: "#050505", lightSize: 30 },
    enter: "blur-to-sharp",
    exit: "dissolve",
    enterDuration: 0.01,  // per letter
    exitDuration: 0.02,
    holdDuration: 0.04,
  },

  // BEAT 4: The Meaning
  {
    id: "meaning",
    start: 0.18,
    end: 0.24,
    type: "composite",
    text: {
      content: "ALL ABOUT KITCHENS",
      weight: 300,
      size: "clamp(0.65rem, 1.2vw, 0.9rem)",
      tracking: "0.5em",
      y: 60,
    },
    darkness: { background: "#050505", lightSize: 50 },
    enter: "blur-to-sharp",
    exit: "dissolve",
    enterDuration: 0.02,
    exitDuration: 0.02,
    holdDuration: 0.02,
  },
];
```

### ACT II: THE MATERIALS

```typescript
  // BEAT 5: Stone
  {
    id: "stone",
    start: 0.24,
    end: 0.34,
    type: "image",
    image: {
      src: "/images/products/surface-02.jpg",
      x: 10, y: 15, w: 60, h: 70,
      mask: "ellipse(55% 45% at 50% 50%)",
      deblurDuration: 0.04,
      colorOverlay: "rgba(120,130,140,0.06)",  // cool stone tint
      dissolveStyle: "erosion",
    },
    darkness: { background: "#0f0a08", lightSize: 80 },
    enter: "blur-to-sharp",
    exit: "erosion",
    enterDuration: 0.04,
    exitDuration: 0.03,
    holdDuration: 0.03,
  },

  // BEAT 6: Copper
  {
    id: "copper",
    start: 0.34,
    end: 0.44,
    type: "image",
    image: {
      src: "/images/products/surface-01.jpg",
      x: 55, y: 10, w: 45, h: 80,
      mask: "ellipse(42% 55% at 65% 50%)",  // right-positioned
      deblurDuration: 0.04,
      pan: [-0.5, 0],  // slow horizontal drift
      colorOverlay: "rgba(196,90,44,0.08)",  // warm copper tint
      dissolveStyle: "erosion",
    },
    darkness: { background: "#0f0a08", lightSize: 120 },
    enter: "blur-to-sharp",
    exit: "erosion",
    enterDuration: 0.04,
    exitDuration: 0.03,
    holdDuration: 0.03,
  },

  // BEAT 7: Steel + 0.1
  {
    id: "steel",
    start: 0.44,
    end: 0.54,
    type: "composite",
    image: {
      src: "/images/products/cooking-01.jpg",
      x: 25, y: 15, w: 50, h: 70,
      mask: "ellipse(48% 52% at 50% 50%)",  // centered
      deblurDuration: 0.04,
      pan: [0, -0.3],  // slow vertical drift
      colorOverlay: "rgba(140,150,170,0.06)",  // cool steel tint
      dissolveStyle: "erosion",
    },
    text: {
      content: "0.1",
      weight: 100,
      size: "clamp(6rem, 18vw, 14rem)",
      tracking: "0.15em",
      y: 0,
      // Appears AFTER image dissolves
    },
    darkness: { background: "#141010", lightSize: 160 },
    enter: "blur-to-sharp",
    exit: "dissolve",
    enterDuration: 0.04,
    exitDuration: 0.02,
    holdDuration: 0.02,
  },
```

### ACT III: THE CRAFT

```typescript
  // BEAT 8: Hands
  {
    id: "hands",
    start: 0.54,
    end: 0.64,
    type: "composite",
    image: {
      src: "/images/products/cooking-flatlay.jpg",  // closest to hands
      x: 20, y: 50, w: 60, h: 40,  // lower third
      deblurDuration: 0.04,
      dissolveStyle: "fade",
    },
    text: {
      content: "Crafted.",
      weight: 100,
      size: "clamp(1.2rem, 2.5vw, 2rem)",
      tracking: "0.15em",
      y: 100,  // below the image
    },
    darkness: { background: "#181412", lightSize: 200 },
    enter: "blur-to-sharp",
    exit: "dissolve",
    enterDuration: 0.04,
    exitDuration: 0.03,
    holdDuration: 0.03,
  },

  // BEAT 9: The Assembly
  {
    id: "assembly",
    start: 0.64,
    end: 0.74,
    type: "composite",
    text: {
      content: ["JOINERY", "The joints.", "The angles.", "The precision."],
      weight: [100, 300, 300, 300],
      size: ["clamp(2.5rem,7vw,5rem)", "clamp(0.8rem,1.2vw,1rem)", "clamp(0.8rem,1.2vw,1rem)", "clamp(0.8rem,1.2vw,1rem)"],
      tracking: ["0.1em", "0.2em", "0.2em", "0.2em"],
      stagger: 0.01,
      y: 0,
    },
    darkness: { background: "#1a1410", lightSize: 250 },
    enter: "blur-to-sharp",
    exit: "dissolve",
    enterDuration: 0.02,
    exitDuration: 0.02,
    holdDuration: 0.04,
  },

  // BEAT 10: The Kitchen
  {
    id: "kitchen",
    start: 0.74,
    end: 0.88,
    type: "composite",
    // Three kitchen images, sequential
    // Each is full-bleed, no mask
    images: [
      { src: "/images/products/kitchen-canvas-01.jpg", hold: 0.06 },
      { src: "/images/products/kitchen-canvas-02.jpg", hold: 0.04 },
      { src: "/images/products/kitchen-canvas-03.jpg", hold: 0.04 },
    ],
    darkness: { background: "#1a1410", lightSize: 350 },
    enter: "blur-to-sharp",
    exit: "dissolve",
    enterDuration: 0.06,  // slower de-blur than materials
    exitDuration: 0.04,
    holdDuration: 0.06,
  },
```

### ACT IV: THE INVITATION

```typescript
  // BEAT 11: The Light Returns
  {
    id: "light-returns",
    start: 0.88,
    end: 0.94,
    type: "composite",
    text: {
      content: "LIGHT",
      weight: 100,
      size: "clamp(5rem,14vw,10rem)",
      tracking: "0.2em",
      y: -30,  // above center
    },
    // Background transitions from dark to light during this beat
    // The light point expands to fill the viewport
    enter: "blur-to-sharp",
    exit: "dissolve",
    enterDuration: 0.02,
    exitDuration: 0.02,
    holdDuration: 0.04,
  },

  // BEAT 12: The Statement
  {
    id: "statement",
    start: 0.94,
    end: 1.00,
    type: "composite",
    text: {
      content: [
        "A KITCHEN",
        "IS NOT FURNITURE.",
        // ... pause ...
        "THE KITCHEN",
        "IS WHERE",
        "LIFE HAPPENS.",
      ],
      weight: [100, 900, 100, 100, 900],
      size: "clamp(2rem,5vw,3.5rem)",
      tracking: "0.06em",
      stagger: 0.01,
      y: 0,
    },
    // Light background
    enter: "blur-to-sharp",
    exit: "dissolve",
    enterDuration: 0.01,
    exitDuration: 0.02,
    holdDuration: 0.04,
  },

  // BEAT 13: The Close
  {
    id: "close",
    start: 1.00,
    end: 1.00,
    type: "composite",
    text: {
      content: ["Kitser", "No. 1, Nava India Road, Coimbatore — 641028"],
      weight: [100, 300],
      size: ["clamp(2.5rem,6vw,4rem)", "clamp(0.75rem,1.2vw,1rem)"],
      tracking: ["0.18em", "0.12em"],
      y: [-30, 20],
    },
    // Light contracts to 60px point
    enter: "blur-to-sharp",
    exit: "none",
    enterDuration: 0.02,
    exitDuration: 0,
    holdDuration: 0.02,
  },
];
```

---

## Animation System

### Per-Element Envelope

Instead of one uniform envelope, each element has its own calculated envelope:

```typescript
function calculateEnvelope(beat: Beat, progress: number): number {
  const localP = (progress - beat.start) / (beat.end - beat.start);
  
  if (localP < 0) return 0;
  if (localP > 1) return 0;
  
  const enterEnd = beat.enterDuration;
  const holdEnd = enterEnd + beat.holdDuration;
  const exitStart = holdEnd;
  
  if (localP < enterEnd) {
    // Entering
    const t = localP / enterEnd;
    return easeOutCubic(t);
  }
  
  if (localP < holdEnd) {
    // Holding
    return 1;
  }
  
  // Exiting
  const t = (localP - exitStart) / (1 - exitStart);
  return 1 - easeInCubic(t);
}
```

### Blur Calculation

```typescript
function calculateBlur(beat: Beat, progress: number): number {
  const localP = (progress - beat.start) / (beat.end - beat.start);
  const deblurEnd = beat.image?.deblurDuration || 0.04;
  
  if (localP < deblurEnd) {
    // De-blurring
    const t = localP / deblurEnd;
    return (1 - easeOutCubic(t)) * 8;  // 8px max blur
  }
  
  return 0;
}
```

### Easing Functions

```typescript
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeInCubic(t: number): number {
  return Math.pow(t, 3);
}

function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
```

### Dissolve Styles

**Fade (default):**
```css
opacity: 1 → 0;
```

**Erosion (for materials):**
```css
/* Edges break apart first */
clip-path: ellipse(55% 45% at 50% 50%)
         → ellipse(45% 35% at 50% 50%)
         → ellipse(30% 20% at 50% 50%)
         → ellipse(0% 0% at 50% 50%);
opacity: 1 → 0.8 → 0.4 → 0;
```

The erosion effect uses `clip-path` animation — the ellipse shrinks from the outside in, so the edges break apart while the center holds. This mimics how stone actually erodes.

---

## Light System

The light point is the experience's emotional barometer. It is defined per-beat:

```typescript
interface LightState {
  size: number;        // px
  color: string;       // rgba
  position: string;    // CSS position
}
```

### Light Progression

| Beat | Size | Color | Notes |
|------|------|-------|-------|
| Breath | 0px | transparent | No light |
| Light | 30px | rgba(196,90,44,0.15) | Ignites instantly, pulses |
| Wordmark | 30px | rgba(196,90,44,0.15) | Holds steady — light source for wordmark |
| Meaning | 50px | rgba(196,90,44,0.12) | Grows slightly — "now I can show you more" |
| Stone | 80px | rgba(196,90,44,0.10) | Grows — warmth building |
| Copper | 120px | rgba(196,90,44,0.08) | Grows — warmth building |
| Steel | 160px | rgba(196,90,44,0.06) | Grows — but cool tint on steel creates contrast |
| Hands | 200px | rgba(196,90,44,0.05) | Grows — human element |
| Assembly | 250px | rgba(196,90,44,0.04) | Grows — approaching kitchen |
| Kitchen | 350px | rgba(196,90,44,0.03) | Largest — fills viewport behind kitchen |
| Light Returns | fills viewport | #f5f0eb | Light becomes background |
| Statement | #f5f0eb | #f5f0eb | Light IS the environment |
| Close | 60px | rgba(196,90,44,0.08) | Contracts — journey complete |

The light grows monotonically from Beat 2 through Beat 10. This creates a subliminal sense of progression — even when the user doesn't consciously notice the light, they feel the warmth building. When the light fills the viewport in Beat 11, it feels like arrival, not surprise.

---

## Background Color System

```typescript
const backgrounds = [
  { start: 0.00, end: 0.04, color: "#050505" },   // Breath
  { start: 0.04, end: 0.24, color: "#050505" },   // Through wordmark (light provides warmth)
  { start: 0.24, end: 0.34, color: "#0f0a08" },   // Stone (warm dark)
  { start: 0.34, end: 0.44, color: "#141010" },   // Copper (warmer)
  { start: 0.44, end: 0.54, color: "#141010" },   // Steel (cool contrast, same bg)
  { start: 0.54, end: 0.64, color: "#181412" },   // Hands (warmer)
  { start: 0.64, end: 0.74, color: "#1a1410" },   // Assembly (warmer)
  { start: 0.74, end: 0.88, color: "#1a1410" },   // Kitchen (peak warmth, dark)
  { start: 0.88, end: 0.94, color: "#f5f0eb" },   // Light Returns (dark → light)
  { start: 0.94, end: 1.00, color: "#f5f0eb" },   // Statement + Close (light)
];
```

The background transitions are sharp between beats, not continuous lerps. Each beat has its own background. The transition happens during the beat's enter/exit animation — when the previous beat dissolves, the background changes underneath it. This avoids the current problem where the background lerps independently of the content.

---

## Scroll Length

The current 8000vh is appropriate. At 13 beats over 8000vh:

- Average beat duration: ~615vh (~67 wheel notches, ~13 seconds)
- Shortest beat (Close): 0.00 duration — terminal state
- Longest beat (Kitchen): 0.14 duration — 1120vh (~121 wheel notches, ~23 seconds)

The kitchen beat gets the most time. This is correct — it is the emotional peak.

---

## Implementation Order

### Phase 1: Data + Renderer (no animation)

1. Define `Beat` interface and beat data
2. Build the renderer that reads beat data and positions elements
3. Wire up scroll progress
4. Verify all 13 beats render at correct positions with correct content

### Phase 2: Envelope + Blur

1. Implement `calculateEnvelope` per beat
2. Implement `calculateBlur` per beat
3. Implement dissolve styles (fade and erosion)
4. Verify each beat enters, holds, and exits correctly

### Phase 3: Light System

1. Implement light point with per-beat sizing
2. Implement light pulse on Beat 2
3. Implement light expansion through beats
4. Implement light contraction on Beat 13
5. Implement background color transitions between beats

### Phase 4: Typography

1. Implement letter-by-letter wordmark (Beat 3)
2. Implement blur-to-sharp text transitions
3. Implement staggered line reveals (Beat 9, Beat 12)
4. Implement text color lerp for light/dark backgrounds

### Phase 5: Image System

1. Implement per-image positioning, masking, de-blur
2. Implement erosion dissolution (clip-path animation)
3. Implement copper pan animation
4. Implement steel vertical drift
5. Implement three-kitchen sequential reveal (Beat 10)

### Phase 6: Polish

1. Tune all timings by feel — watch the experience end-to-end
2. Adjust envelope curves for each beat
3. Verify the held breath before kitchen (0.74–0.76)
4. Verify the climax stagger (Beat 12)
5. Verify the light contraction (Beat 13)

---

## Testing Criteria

The experience passes when:

1. The opening darkness creates curiosity, not confusion
2. The wordmark assembly feels intentional, not decorative
3. Each material feels distinct — not just labeled
4. The "0.1" moment creates a question in the user's mind
5. The held breath before the kitchen creates anticipation
6. The kitchen reveal feels like an arrival
7. The climax makes the user pause
8. The close feels complete
9. At no point does the user think "I understand" before the end
10. At the end, the user thinks "I've never seen a kitchen website like that"
