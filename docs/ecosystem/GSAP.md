# GSAP (GreenSock Animation Platform)

## Purpose

GSAP is a framework-agnostic JavaScript animation library that provides powerful tools for creating high-performance animations. It excels at complex timelines, scroll-triggered animations, morphing, text splitting, motion paths, FLIP transitions, and responsive animations—making it the industry standard for web animation.

## When to Use

- **Complex Timelines**: Multi-step animation sequences with precise timing
- **Scroll-Triggered Animations**: ScrollTrigger for scroll-linked animations
- **Morphing**: Shape morphing between SVG paths
- **Text Splitting**: Animating text character by character or word by word
- **Motion Paths**: Animating elements along SVG paths
- **FLIP Transitions**: Smooth layout animations between states
- **Responsive Animations**: Animations that adapt to screen size
- **Physics-Based Motion**: Spring animations and elastic effects

## When NOT to Use

- **Simple Hover Effects**: Use CSS transitions for basic hover/focus states
- **When Motion Library Suffices**: Motion (Framer Motion) is simpler for React UI animations
- **Accessibility Requires prefers-reduced-motion**: Always respect user preferences
- **Simple CSS Transitions**: Don't use GSAP for basic opacity/color changes
- **When Bundle Size is Critical**: GSAP adds ~25KB; use lighter alternatives for simple needs

## Best Practices

```jsx
// ✅ Register plugins
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

// ✅ Use gsap.matchMedia() for responsive animations
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ResponsiveAnimation() {
  useEffect(() => {
    const mm = gsap.matchMedia()
    
    mm.add('(min-width: 768px)', () => {
      // Desktop animations
      gsap.from('.element', {
        x: 100,
        duration: 1,
        scrollTrigger: {
          trigger: '.element',
          start: 'top center'
        }
      })
    })
    
    mm.add('(max-width: 767px)', () => {
      // Mobile animations
      gsap.from('.element', {
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: '.element',
          start: 'top center'
        }
      })
    })
    
    return () => mm.revert()
  }, [])
}

// ✅ Use ScrollTrigger for scroll animations
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger)
  
  gsap.from('.reveal', {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: '.reveal-container',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    }
  })
}, [])

// ✅ Use useGSAP() hook in React
import { useGSAP } from '@gsap/react'

function AnimatedComponent() {
  const containerRef = useRef(null)
  
  useGSAP(() => {
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 50,
      duration: 1
    })
  }, { scope: containerRef })
  
  return <div ref={containerRef}>Animated Content</div>
}

// ✅ Clean up animations
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from('.element', {
      opacity: 0,
      duration: 1
    })
  })
  
  return () => ctx.revert()
}, [])

// ✅ Use timeline for complex sequences
useEffect(() => {
  const tl = gsap.timeline()
  
  tl.from('.header', { opacity: 0, y: -50 })
    .from('.content', { opacity: 0, y: 50 }, '-=0.5')
    .from('.footer', { opacity: 0, y: 50 }, '-=0.3')
  
  return () => tl.kill()
}, [])
```

## Common Mistakes

1. **Not Registering Plugins**
   ```jsx
   // ❌ Bad - plugins not registered
   import { gsap } from 'gsap'
   import { ScrollTrigger } from 'gsap/ScrollTrigger'
   
   gsap.from('.element', {
     scrollTrigger: '.element'  // Won't work
   })
   
   // ✅ Good - register plugins first
   import { gsap } from 'gsap'
   import { ScrollTrigger } from 'gsap/ScrollTrigger'
   
   gsap.registerPlugin(ScrollTrigger)
   
   gsap.from('.element', {
     scrollTrigger: '.element'  // Works
   })
   ```

2. **Not Cleaning Up Animations**
   ```jsx
   // ❌ Bad - memory leak
   useEffect(() => {
     gsap.from('.element', {
       opacity: 0,
       duration: 1,
       repeat: -1  // Infinite repeat
     })
   }, [])
   
   // ✅ Good - cleanup
   useEffect(() => {
     const tl = gsap.timeline()
     tl.from('.element', {
       opacity: 0,
       duration: 1,
       repeat: -1
     })
     
     return () => tl.kill()
   }, [])
   ```

3. **Ignoring prefers-reduced-motion**
   ```jsx
   // ❌ Bad - no accessibility consideration
   gsap.from('.element', {
     opacity: 0,
     duration: 1
   })
   
   // ✅ Good - respect user preferences
   const prefersReducedMotion = window.matchMedia(
     '(prefers-reduced-motion: reduce)'
   ).matches
   
   gsap.from('.element', {
     opacity: 0,
     duration: prefersReducedMotion ? 0 : 1
   })
   ```

4. **Using GSAP for Simple CSS Transitions**
   ```jsx
   // ❌ Bad - overkill
   gsap.to('.button', {
     backgroundColor: '#007bff',
     duration: 0.2
   })
   
   // ✅ Good - use CSS
   .button {
     transition: background-color 0.2s ease;
   }
   .button:hover {
     background-color: #007bff;
   }
   ```

5. **Not Using Context for React**: GSAP animations can conflict with React's virtual DOM. Use `gsap.context()` or `useGSAP()` hook.

## Performance Tips

```jsx
// ✅ Use will-change sparingly
.gsap-animated {
  will-change: transform, opacity;
}

// ✅ Batch animations
gsap.batch('.element', {
  opacity: 1,
  y: 0,
  stagger: 0.1
})

// ✅ Use ScrollTrigger.batch() for scroll animations
ScrollTrigger.batch('.reveal', {
  onEnter: (elements) => {
    gsap.from(elements, {
      opacity: 0,
      y: 50,
      stagger: 0.1
    })
  },
  start: 'top 80%'
})

// ✅ Leverage GSAP's internal optimizations
// GSAP automatically uses requestAnimationFrame
// and optimizes property updates

// ✅ Use gsap.quickTo() for frequent updates
const quickX = gsap.quickTo('.element', 'x', { type: 'px' })
const quickY = gsap.quickTo('.element', 'y', { type: 'px' })

// Use in event handlers
element.addEventListener('mousemove', (e) => {
  quickX(e.clientX)
  quickY(e.clientY)
})

// ✅ Use gsap.utils.map() for value mapping
const mapValue = gsap.utils.mapRange(0, 100, 0, 1)
const mappedValue = mapValue(50) // Returns 0.5

// ✅ Use gsap.utils.clamp() for value clamping
const clampValue = gsap.utils.clamp(0, 100, 150)
// Returns 100 (clamped to max)
```

## Example Architecture: Scroll-Triggered Reveal Sequence

```
src/
├── components/
│   ├── ScrollReveal/
│   │   ├── index.tsx                    # Main scroll reveal component
│   │   ├── RevealSection.tsx            # Individual reveal section
│   │   ├── TextSplit.tsx                # Text splitting animation
│   │   ├── ParallaxImage.tsx            # Parallax scroll image
│   │   └── ScrollProgress.tsx           # Scroll progress indicator
│   └── sections/
│       ├── Hero.tsx                     # Hero section with reveal
│       ├── Features.tsx                 # Features with stagger
│       ├── Testimonials.tsx             # Testimonials carousel
│       └── CTA.tsx                      # Call to action
├── hooks/
│   ├── useScrollReveal.ts              # Custom scroll reveal hook
│   └── useTextSplit.ts                 # Text splitting hook
└── utils/
    └── gsapSetup.ts                    # GSAP plugin registration

// Main Scroll Reveal Component
function ScrollReveal() {
  useEffect(() => {
    // Register plugins
    gsap.registerPlugin(ScrollTrigger)
    
    // Text splitting animation
    gsap.from('.split-text', {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.text-container',
        start: 'top 80%'
      }
    })
    
    // Staggered reveal
    gsap.from('.reveal-item', {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.reveal-container',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })
    
    // Parallax effect
    gsap.to('.parallax-image', {
      y: -100,
      ease: 'none',
      scrollTrigger: {
        trigger: '.parallax-container',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })
    
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])
  
  return (
    <div className="scroll-reveal">
      <RevealSection>
        <TextSplit text="Welcome to Our Site" />
      </RevealSection>
      
      <RevealSection>
        <div className="reveal-container">
          <div className="reveal-item">Feature 1</div>
          <div className="reveal-item">Feature 2</div>
          <div className="reveal-item">Feature 3</div>
        </div>
      </RevealSection>
      
      <div className="parallax-container">
        <ParallaxImage src="/hero.jpg" speed={0.5} />
      </div>
    </div>
  )
}

// Reveal Section Component
function RevealSection({ children, className }) {
  const sectionRef = useRef(null)
  
  useGSAP(() => {
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })
  }, { scope: sectionRef })
  
  return (
    <section ref={sectionRef} className={className}>
      {children}
    </section>
  )
}

// Text Split Component
function TextSplit({ text, className }) {
  const textRef = useRef(null)
  
  useGSAP(() => {
    const chars = textRef.current.textContent.split('')
    textRef.current.innerHTML = chars
      .map(char => `<span class="char">${char}</span>`)
      .join('')
    
    gsap.from('.char', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.05,
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 80%'
      }
    })
  }, { scope: textRef })
  
  return (
    <div ref={textRef} className={className}>
      {text}
    </div>
  )
}
```
