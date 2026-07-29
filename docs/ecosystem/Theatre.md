# Theatre.js

## Purpose

Theatre.js is a visual animation editor for the web that combines a powerful visual interface with programmatic control. It allows designers and developers to collaborate on complex animations using a timeline-based editor, keyframes, and real-time preview—bridging the gap between design tools and code.

## When to Use

- **Complex Keyframe Animations**: Multi-property animations with precise timing and easing
- **Visual Choreography**: When designers need to visually tweak animation sequences
- **Team Collaboration**: When motion designers and developers need to work together on animations
- **High-Fidelity Motion**: When CSS transitions or simple libraries can't achieve the desired result
- **Interactive Sequences**: Animations that respond to user input or state changes
- **3D Scene Animation**: Animating Three.js objects with visual precision

## When NOT to Use

- **Simple CSS Transitions**: Use CSS transitions or Motion (Framer Motion) for basic hover/focus effects
- **Performance-Critical Scroll Animations**: Use GSAP ScrollTrigger for scroll-linked animations
- **When GSAP ScrollTrigger Suffices**: GSAP is more battle-tested for scroll animations
- **Simple UI Animations**: Motion (Framer Motion) is simpler for React UI animations
- **When Bundle Size is Critical**: Theatre.js adds overhead; use lighter alternatives for simple needs

## Best Practices

```jsx
// ✅ Use @theatre/core in production (not @theatre/studio)
import { getProject } from '@theatre/core'

// ✅ Define sequences with proper structure
const project = getProject('My Project')
const sheet = project.sheet('Main Sequence')

// ✅ Use sheet.project for organization
const sequence = sheet.sequence

// ✅ Integrate with React state
import { useCurrentSheet, useCurrentFrame } from '@theatre/react'

function AnimatedComponent() {
  const sheet = useCurrentSheet()
  const frame = useCurrentFrame()
  
  // Animate based on frame
  useEffect(() => {
    if (sheet) {
      sheet.sequence.play()
    }
  }, [sheet])
  
  return (
    <div style={{
      transform: `translateX(${frame * 10}px)`,
      opacity: frame / 100
    }}>
      Animated Content
    </div>
  )
}

// ✅ Use studio only in development
if (process.env.NODE_ENV === 'development') {
  import('@theatre/studio').then(studio => {
    studio.initialize()
  })
}

// ✅ Define objects with types
const obj = sheet.object('Box Position', {
  x: 0,
  y: 0,
  z: 0,
  color: '#ff0000'
})

// ✅ Use props for animation values
useEffect(() => {
  const unsubscribe = obj.onValuesChange(values => {
    // Apply values to your scene
    meshRef.current.position.set(values.x, values.y, values.z)
  })
  
  return () => unsubscribe()
}, [obj])
```

## Common Mistakes

1. **Including @theatre/studio in Production Bundle**
   ```jsx
   // ❌ Bad - studio in production
   import studio from '@theatre/studio'
   studio.initialize()
   
   // ✅ Good - studio only in development
   if (process.env.NODE_ENV === 'development') {
     import('@theatre/studio').then(studio => {
       studio.initialize()
     })
   }
   ```

2. **Over-engineering Simple Animations**
   ```jsx
   // ❌ Bad - using Theatre.js for a simple fade
   const sheet = getProject('Simple Fade').sheet('Fade')
   const obj = sheet.object('Opacity', { value: 0 })
   // ... complex setup for a simple opacity transition
   
   // ✅ Good - use Motion/CSS for simple animations
   <motion.div
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     transition={{ duration: 0.3 }}
   />
   ```

3. **Not Using Suspense**: Theatre.js assets need to be loaded asynchronously. Always wrap in Suspense.

4. **Ignoring Performance**: Theatre.js adds overhead. Don't use it for simple UI animations.

5. **Not Cleaning Up**: Always unsubscribe from Theatre.js subscriptions to prevent memory leaks.

## Performance Tips

```jsx
// ✅ Use studio only in dev
if (process.env.NODE_ENV === 'development') {
  import('@theatre/studio').then(studio => {
    studio.initialize()
  })
}

// ✅ Minimize keyframe count
// Fewer keyframes = better performance
// Use interpolation wisely between keyframes

// ✅ Use interpolation wisely
// Easing functions can be expensive if overused
// Stick to simple easing for most animations

// ✅ Batch animations
// Group related animations in the same sequence
// Avoid creating many separate sequences

// ✅ Lazy load Theatre.js
const TheatreEditor = React.lazy(() => import('./TheatreEditor'))

function App() {
  return (
    <Suspense fallback={null}>
      <TheatreEditor />
    </Suspense>
  )
}

// ✅ Use virtual scrolling for many animated elements
// If animating many elements, consider virtualization
```

## Example Architecture: Choreographed Intro Sequence

```
src/
├── components/
│   ├── IntroSequence/
│   │   ├── index.tsx                    # Main intro component
│   │   ├── TheatreSetup.tsx             # Theatre.js project setup
│   │   ├── SceneAnimation.tsx           # 3D scene animation
│   │   ├── TextReveal.tsx               # Animated text reveals
│   │   └── TransitionEffects.tsx        # Transition animations
│   └── ui/
│       └── SkipButton.tsx               # Skip intro button
├── theatre/
│   ├── project.ts                       # Theatre.js project config
│   ├── sequences/
│   │   ├── intro.json                   # Intro sequence data
│   │   └── transitions.json            # Transition data
│   └── objects/
│       ├── camera.ts                    # Camera animation object
│       └── text.ts                      # Text animation objects
└── hooks/
    └── useTheatreSequence.ts            # Custom hook for Theatre.js

// Main Intro Sequence Component
function IntroSequence({ onComplete }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const sheetRef = useRef(null)
  
  useEffect(() => {
    const project = getProject('Intro', { state: introState })
    const sheet = project.sheet('Main Sequence')
    sheetRef.current = sheet
    
    // Play sequence
    sheet.sequence.play({
      range: [0, 300],
      rate: 1
    }).then(() => {
      onComplete()
    })
    
    return () => {
      sheet.sequence.pause()
    }
  }, [onComplete])
  
  return (
    <div className="intro-sequence">
      <TheatreCanvas>
        <SceneAnimation sheet={sheetRef.current} />
        <TextReveal sheet={sheetRef.current} />
        <TransitionEffects sheet={sheetRef.current} />
      </TheatreCanvas>
      <SkipButton onClick={onComplete} />
    </div>
  )
}

// Theatre.js Canvas wrapper
function TheatreCanvas({ children }) {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <Suspense fallback={null}>
        {children}
      </Suspense>
    </Canvas>
  )
}
```
