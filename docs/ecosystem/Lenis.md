# Lenis

## Purpose

Lenis is a lightweight, modern smooth scroll library that provides buttery-smooth scrolling experiences. It normalizes scroll behavior across browsers, integrates seamlessly with WebGL and GSAP, and offers fine-grained control over scroll physics and behavior.

## When to Use

- **Smooth Scrolling**: When you need consistent, smooth scroll behavior across all browsers
- **Scroll-Synced Animations**: Integrating with GSAP ScrollTrigger for scroll-linked animations
- **WebGL Scroll Integration**: Syncing scroll position with Three.js/R3F scenes
- **Parallax Effects**: Creating smooth parallax scrolling experiences
- **Single-Page Applications**: Enhancing navigation between sections
- **Creative Portfolios**: When scroll is a key part of the user experience

## When NOT to Use

- **Native Scroll Behavior is Sufficient**: If the default browser scroll meets your needs
- **CSS Scroll-Snap is Enough**: For simple snap scrolling, CSS is lighter
- **Performance-Critical Low-End Devices**: Smooth scrolling can be taxing on weak hardware
- **When CSS `scroll-behavior: smooth` Works**: For simple smooth scrolling to anchors
- **When Accessibility is Primary**: Smooth scrolling can interfere with assistive technologies

## Best Practices

```jsx
// ✅ Use autoRaf: true for optimal performance
import Lenis from 'lenis'

const lenis = new Lenis({
  autoRaf: true,
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true
})

// ✅ Integrate with GSAP ScrollTrigger
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis({
  autoRaf: true
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

// ✅ Use CSS import for smooth scroll
// In your CSS file:
@import 'lenis/dist/lenis.css';

// Or in your component:
import 'lenis/dist/lenis.css'

// ✅ Handle nested scroll
<lenis
  root
  options={{
    allowNestedScroll: true
  }}
>
  <div data-lenis-prevent>
    {/* This div won't trigger Lenis scroll */}
  </div>
</lenis>

// ✅ Use anchors for smooth scrolling to sections
const lenis = new Lenis({
  anchors: true,
  duration: 1.2
})

// Smooth scroll to element
lenis.scrollTo('#section-2', {
  offset: 0,
  duration: 1.5
})

// ✅ Use React wrapper for React apps
import { ReactLenis } from 'lenis/react'

function App() {
  return (
    <ReactLenis root options={{
      autoRaf: true,
      duration: 1.2
    }}>
      <main>
        {/* Your app content */}
      </main>
    </ReactLenis>
  )
}
```

## Common Mistakes

1. **Not Importing CSS**
   ```jsx
   // ❌ Bad - missing CSS
   import Lenis from 'lenis'
   const lenis = new Lenis()
   
   // ✅ Good - include CSS
   import Lenis from 'lenis'
   import 'lenis/dist/lenis.css'
   const lenis = new Lenis()
   ```

2. **Fighting Against Lenis with Native Scroll**
   ```jsx
   // ❌ Bad - mixing native and Lenis scroll
   window.addEventListener('scroll', () => {
     // This conflicts with Lenis
   })
   
   // ✅ Good - use Lenis events
   lenis.on('scroll', ({ scroll }) => {
     // Use Lenis scroll position
   })
   ```

3. **Not Using Anchors Option**
   ```jsx
   // ❌ Bad - manual anchor handling
   document.querySelector('#section')?.scrollIntoView({ behavior: 'smooth' })
   
   // ✅ Good - use Lenis anchors
   lenis.scrollTo('#section', { duration: 1.5 })
   ```

4. **Over-configuring Duration**: Don't set duration too high. Start with defaults and adjust only if needed.

5. **Not Cleaning Up**: Always destroy Lenis instance when component unmounts.

## Performance Tips

```jsx
// ✅ Use lerp instead of duration for smoother feel
const lenis = new Lenis({
  lerp: 0.1,  // Linear interpolation (0-1)
  // duration: 1.2  // Don't use both
})

// ✅ Use naiveDimensions for better performance
const lenis = new Lenis({
  naiveDimensions: true  // Uses simpler dimension calculations
})

// ✅ Use autoToggle for performance
const lenis = new Lenis({
  autoToggle: true  // Automatically enables/disables based on content
})

// ✅ Limit scroll events
lenis.on('scroll', debounce(({ scroll }) => {
  // Throttle expensive operations
}, 16))

// ✅ Use requestAnimationFrame for animations
function animate(time) {
  lenis.raf(time)
  requestAnimationFrame(animate)
}
requestAnimationFrame(animate)

// ✅ Disable on low-end devices
const isLowEnd = navigator.hardwareConcurrency < 4
const lenis = new Lenis({
  autoRaf: !isLowEnd,
  duration: isLowEnd ? 0 : 1.2
})
```

## Example Architecture: Full-Page Scroll Experience

```
src/
├── components/
│   ├── ScrollExperience/
│   │   ├── index.tsx                    # Main scroll experience
│   │   ├── LenisSetup.tsx               # Lenis configuration
│   │   ├── ScrollSection.tsx            # Individual scroll section
│   │   ├── ParallaxLayer.tsx            # Parallax scroll element
│   │   ├── ScrollProgress.tsx           # Scroll progress indicator
│   │   └── StickyElement.tsx            # Sticky scroll element
│   └── sections/
│       ├── Hero.tsx                     # Hero section
│       ├── Features.tsx                 # Features section
│       ├── Gallery.tsx                  # Gallery section
│       └── Contact.tsx                  # Contact section
├── hooks/
│   ├── useLenisScroll.ts               # Custom Lenis hook
│   └── useScrollProgress.ts            # Scroll progress tracking
└── stores/
    └── scrollStore.ts                  # Zustand store for scroll state

// Main Scroll Experience Component
function ScrollExperience() {
  return (
    <ReactLenis root options={{
      autoRaf: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    }}>
      <div className="scroll-experience">
        <ScrollProgress />
        <Hero />
        <Features />
        <Gallery />
        <Contact />
      </div>
    </ReactLenis>
  )
}

// Scroll Section with GSAP ScrollTrigger
function ScrollSection({ children, className }) {
  const sectionRef = useRef(null)
  
  useEffect(() => {
    const section = sectionRef.current
    
    gsap.fromTo(section, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [])
  
  return (
    <section ref={sectionRef} className={className}>
      {children}
    </section>
  )
}

// Parallax Layer Component
function ParallaxLayer({ speed = 0.5, children }) {
  const layerRef = useRef(null)
  
  useEffect(() => {
    gsap.to(layerRef.current, {
      y: () => -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: layerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })
  }, [speed])
  
  return (
    <div ref={layerRef} className="parallax-layer">
      {children}
    </div>
  )
}

// Scroll Progress Indicator
function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const lenis = useLenis()
    
    lenis.on('scroll', ({ progress }) => {
      setProgress(progress)
    })
  }, [])
  
  return (
    <div className="scroll-progress">
      <div 
        className="scroll-progress-bar"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}
```
