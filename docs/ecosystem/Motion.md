# Motion (Framer Motion)

## Purpose

Motion is a production-ready animation library for React (formerly Framer Motion). It provides a simple, declarative API for creating smooth animations, gestures, and transitions in React applications. It integrates seamlessly with React's component model and supports layout animations, scroll-linked effects, and gesture-based interactions.

## When to Use

- **UI Animations**: Button hovers, card transitions, modal animations
- **Hover/Tap Animations**: Interactive feedback on user interactions
- **Layout Transitions**: Smooth transitions between different layout states
- **Scroll-Linked Effects**: Animations triggered by scroll position
- **Spring Physics**: Natural, physics-based animations
- **Gestures**: Drag, pan, pinch, and other gesture-based interactions
- **Page Transitions**: Animated route changes in React Router
- **AnimatePresence**: Animate elements on mount/unmount

## When NOT to Use

- **Complex Timeline Choreography**: Use GSAP for complex, multi-step animations
- **3D Animations**: Use React Three Fiber for 3D content
- **When CSS Animations Suffice**: Don't add JS overhead for simple CSS transitions
- **Performance-Critical Mobile**: On low-end devices, CSS animations may be better
- **When GSAP ScrollTrigger is Needed**: GSAP's scroll animations are more powerful

## Best Practices

```jsx
// ✅ Use motion components
import { motion } from 'framer-motion'

function AnimatedBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Animated Content
    </motion.div>
  )
}

// ✅ Leverage layout animations
import { motion } from 'framer-motion'

function LayoutAnimation({ isExpanded }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        height: isExpanded ? 200 : 100
      }}
      transition={{ duration: 0.3 }}
    >
      Layout Content
    </motion.div>
  )
}

// ✅ Use AnimatePresence for exit animations
import { AnimatePresence, motion } from 'framer-motion'

function Modal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          Modal Content
          <button onClick={onClose}>Close</button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ✅ Use scroll animations with useScroll
import { motion, useScroll, useTransform } from 'framer-motion'

function ScrollAnimation() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0])
  
  return (
    <motion.div style={{ opacity, y }}>
      Scroll-Animated Content
    </motion.div>
  )
}

// ✅ Use variants for complex animations
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

function StaggeredList() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => (
        <motion.div key={index} variants={itemVariants}>
          {item}
        </motion.div>
      ))}
    </motion.div>
  )
}

// ✅ Use whileHover and whileTap for interactions
import { motion } from 'framer-motion'

function InteractiveButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      Click Me
    </motion.button>
  )
}

// ✅ Use drag for gesture-based interactions
import { motion } from 'framer-motion'

function DraggableCard() {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
      whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
    >
      Drag Me
    </motion.div>
  )
}
```

## Common Mistakes

1. **Over-Animating**
   ```jsx
   // ❌ Bad - animating everything
   <motion.div
     animate={{
       opacity: 1,
       x: 0,
       y: 0,
       scale: 1,
       rotate: 0,
       skewX: 0,
       skewY: 0
     }}
   >
     Too many animations
   </motion.div>
   
   // ✅ Good - animate only what's needed
   <motion.div
     animate={{ opacity: 1, y: 0 }}
   >
     Focused animation
   </motion.div>
   ```

2. **Not Using Layout Animations**
   ```jsx
   // ❌ Bad - manual height animation
   <motion.div
     animate={{ height: isExpanded ? 200 : 100 }}
   >
     Manual layout
   </motion.div>
   
   // ✅ Good - use layout prop
   <motion.div layout>
     <motion.div layout>
       Automatic layout animation
     </motion.div>
   </motion.div>
   ```

3. **Ignoring Performance on Mobile**
   ```jsx
   // ❌ Bad - animating layout properties
   <motion.div
     animate={{ width: 200, height: 200 }}
   >
     Expensive animation
   </motion.div>
   
   // ✅ Good - use transform
   <motion.div
     animate={{ scale: 1.5 }}
   >
     Optimized animation
   </motion.div>
   ```

4. **Not Using AnimatePresence for Exit Animations**
   ```jsx
   // ❌ Bad - no exit animation
   {isVisible && (
     <motion.div
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
     >
       No exit animation
     </motion.div>
   )}
   
   // ✅ Good - use AnimatePresence
   <AnimatePresence>
     {isVisible && (
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
       >
         Has exit animation
       </motion.div>
     )}
   </AnimatePresence>
   ```

5. **Overusing whileInView**
   ```jsx
   // ❌ Bad - too many scroll triggers
   {items.map((item, index) => (
     <motion.div
       key={index}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
     >
       {item}
     </motion.div>
   ))}
   
   // ✅ Good - use variants for batch animations
   <motion.div
     variants={containerVariants}
     initial="hidden"
     whileInView="visible"
     viewport={{ once: true }}
   >
     {items.map((item, index) => (
       <motion.div key={index} variants={itemVariants}>
         {item}
       </motion.div>
     ))}
   </motion.div>
   ```

## Performance Tips

```jsx
// ✅ Use hardware-accelerated properties (transform, opacity)
<motion.div
  animate={{ 
    opacity: 1,
    x: 0,  // transform
    y: 0,  // transform
    scale: 1,  // transform
    rotate: 0  // transform
  }}
>
  Hardware-accelerated
</motion.div>

// ✅ Avoid animating layout properties
// Don't animate: width, height, top, left, margin, padding
// Use: transform, opacity, filter

// ✅ Use whileInView sparingly
<motion.div
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, margin: "-100px" }}
>
  Only animates when in view
</motion.div>

// ✅ Use layout animations for complex transitions
<motion.div layout>
  <motion.div layout>
    Automatic layout animation
  </motion.div>
</motion.div>

// ✅ Use variants for batch animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

// ✅ Use useReducedMotion for accessibility
import { useReducedMotion } from 'framer-motion'

function AccessibleAnimation() {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.div
      animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
    >
      Accessible animation
    </motion.div>
  )
}

// ✅ Use React.memo to prevent unnecessary re-renders
const AnimatedItem = React.memo(function AnimatedItem({ item }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {item}
    </motion.div>
  )
})

// ✅ Use lazy loading for heavy animations
const HeavyAnimation = React.lazy(() => import('./HeavyAnimation'))

function App() {
  return (
    <Suspense fallback={null}>
      <HeavyAnimation />
    </Suspense>
  )
}
```

## Example Architecture: Page Transitions with Layout Animations

```
src/
├── components/
│   ├── PageTransition/
│   │   ├── index.tsx                    # Main page transition wrapper
│   │   ├── AnimatedLayout.tsx           # Layout animation container
│   │   ├── PageWrapper.tsx              # Individual page wrapper
│   │   └── TransitionOverlay.tsx        # Transition overlay effect
│   └── ui/
│       ├── AnimatedCard.tsx             # Card with layout animations
│       ├── AnimatedButton.tsx           # Button with hover/tap animations
│       └── AnimatedList.tsx             # Staggered list animation
├── hooks/
│   ├── usePageTransition.ts            # Custom page transition hook
│   └── useScrollAnimation.ts           # Scroll animation hook
└── stores/
    └── animationStore.ts               # Zustand store for animation state

// Main Page Transition Component
function PageTransition({ children, location }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Layout Animation Container
function AnimatedLayout({ children, className }) {
  return (
    <motion.div
      layout
      className={className}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

// Animated Card Component
function AnimatedCard({ title, description, isExpanded, onClick }) {
  return (
    <motion.div
      layout
      onClick={onClick}
      className="card"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div layout="position">
        <h3>{title}</h3>
        <AnimatePresence>
          {isExpanded && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {description}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

// Animated List Component
function AnimatedList({ items }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{ x: 10 }}
        >
          {item}
        </motion.div>
      ))}
    </motion.div>
  )
}

// Scroll Animation Hook
function useScrollAnimation() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0])
  
  return { opacity, y }
}

// Page Component with Animations
function AnimatedPage() {
  const { opacity, y } = useScrollAnimation()
  
  return (
    <motion.div style={{ opacity, y }}>
      <AnimatedLayout>
        <AnimatedCard
          title="Card Title"
          description="Card description that expands"
          isExpanded={true}
        />
      </AnimatedLayout>
      
      <AnimatedList items={['Item 1', 'Item 2', 'Item 3']} />
    </motion.div>
  )
}
```
