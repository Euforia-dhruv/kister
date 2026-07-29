# Lottie / dotLottie

## Purpose

Lottie is a lightweight vector animation player that renders Adobe After Effects animations exported as JSON. It enables designers to create complex animations in After Effects and export them for web, mobile, and other platforms. The modern replacement is dotLottie, which uses compressed format for better performance.

## When to Use

- **Simple Vector Animations**: Icon animations, loading indicators, micro-interactions
- **Icon Animations**: Animated logos, button feedback, status indicators
- **Loading Indicators**: Custom loading spinners, progress animations
- **After Effects Export**: When designers create animations in After Effects
- **Micro-interactions**: Subtle feedback animations for user actions
- **Brand Animations**: Animated brand elements, mascots, or logos

## When NOT to Use

- **Complex Interactions**: Use Motion (Framer Motion) for interactive animations
- **Scroll-Linked Animations**: Use GSAP ScrollTrigger for scroll animations
- **When Real DOM/CSS Animations Suffice**: Don't add Lottie overhead for simple CSS animations
- **When Performance is Critical**: Lottie adds overhead; use CSS for simple animations
- **Complex Page Transitions**: Use Motion or GSAP for page transitions
- **3D Animations**: Use React Three Fiber for 3D content

## Best Practices

```jsx
// ✅ Use @lottiefiles/dotlottie-wc (modern replacement)
import '@lottiefiles/dotlottie-wc'

function LoadingAnimation() {
  return (
    <dotlottie-wc
      src="/animations/loading.json"
      style={{ width: 200, height: 200 }}
      autoplay
      loop
    />
  )
}

// ✅ Preload animations
// In your HTML head:
<link rel="preload" href="/animations/loading.json" as="fetch" crossorigin>

// Or in React:
useEffect(() => {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = '/animations/loading.json'
  link.as = 'fetch'
  link.crossOrigin = 'anonymous'
  document.head.appendChild(link)
}, [])

// ✅ Use controls sparingly
import '@lottiefiles/dotlottie-wc'

function AnimatedIcon() {
  const lottieRef = useRef(null)
  
  const handlePlay = () => {
    lottieRef.current.play()
  }
  
  const handlePause = () => {
    lottieRef.current.pause()
  }
  
  return (
    <div>
      <dotlottie-wc
        ref={lottieRef}
        src="/animations/icon.json"
        style={{ width: 100, height: 100 }}
        autoplay={false}
      />
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
    </div>
  )
}

// ✅ Optimize JSON files
// Use LottieFiles optimizer: https://lottiefiles.com/optimizer
// Or use dotLottie format (compressed)

// ✅ Handle SSR
import dynamic from 'next/dynamic'

const LottieAnimation = dynamic(
  () => import('@lottiefiles/dotlottie-wc'),
  { ssr: false }
)

function AnimatedComponent() {
  return <LottieAnimation src="/animations/loading.json" />
}

// ✅ Use for loading states
function LoadingSpinner() {
  return (
    <div className="loading-container">
      <dotlottie-wc
        src="/animations/spinner.json"
        style={{ width: 50, height: 50 }}
        autoplay
        loop
      />
      <p>Loading...</p>
    </div>
  )
}

// ✅ Use for micro-interactions
function SuccessButton() {
  const [isSuccess, setIsSuccess] = useState(false)
  
  return (
    <button
      onClick={() => {
        setIsSuccess(true)
        setTimeout(() => setIsSuccess(false), 2000)
      }}
    >
      {isSuccess ? (
        <dotlottie-wc
          src="/animations/success.json"
          style={{ width: 20, height: 20 }}
          autoplay
        />
      ) : (
        'Submit'
      )}
    </button>
  )
}
```

## Common Mistakes

1. **Using Deprecated @lottiefiles/lottie-player**
   ```jsx
   // ❌ Bad - deprecated
   import Lottie from 'lottie-web'
   
   // ✅ Good - use dotLottie
   import '@lottiefiles/dotlottie-wc'
   
   <dotlottie-wc src="/animations/loading.json" />
   ```

2. **Loading Large Animations**
   ```jsx
   // ❌ Bad - large animation file (1MB+)
   <dotlottie-wc
     src="/animations/complex-animation.json"
     style={{ width: 200, height: 200 }}
   />
   
   // ✅ Good - optimize or break into smaller animations
   // Use LottieFiles optimizer
   // Break complex animations into smaller parts
   <dotlottie-wc
     src="/animations/optimized-animation.json"
     style={{ width: 200, height: 200 }}
   />
   ```

3. **Not Handling SSR**
   ```jsx
   // ❌ Bad - SSR error
   import '@lottiefiles/dotlottie-wc'
   
   function Component() {
     return <dotlottie-wc src="/animations/loading.json" />
   }
   
   // ✅ Good - dynamic import
   import dynamic from 'next/dynamic'
   
   const LottieAnimation = dynamic(
     () => import('@lottiefiles/dotlottie-wc'),
     { ssr: false }
   )
   
   function Component() {
     return <LottieAnimation src="/animations/loading.json" />
   }
   ```

4. **Not Preloading Animations**
   ```jsx
   // ❌ Bad - no preloading
   function App() {
     return (
       <Suspense fallback={<div>Loading...</div>}>
         <LottieAnimation src="/animations/heavy.json" />
       </Suspense>
     )
   }
   
   // ✅ Good - preload in HTML head
   <link rel="preload" href="/animations/heavy.json" as="fetch" crossorigin>
   ```

5. **Using Lottie for Complex Animations**
   ```jsx
   // ❌ Bad - complex interaction animation
   <dotlottie-wc
     src="/animations/complex-interaction.json"
     style={{ width: 200, height: 200 }}
   />
   
   // ✅ Good - use Motion for complex interactions
   <motion.div
     whileHover={{ scale: 1.1 }}
     whileTap={{ scale: 0.9 }}
   >
     Interactive Element
   </motion.div>
   ```

## Performance Tips

```jsx
// ✅ Keep animation JSON small
// Target: < 50KB per animation
// Use LottieFiles optimizer

// ✅ Use dotLottie format (compressed)
// dotLottie files are 50-90% smaller than JSON
<dotlottie-wc
  src="/animations/loading.lottie"
  style={{ width: 200, height: 200 }}
/>

// ✅ Limit concurrent animations
// Don't animate multiple Lottie files simultaneously
function App() {
  const [activeAnimation, setActiveAnimation] = useState('loading')
  
  return (
    <div>
      {activeAnimation === 'loading' && (
        <dotlottie-wc
          src="/animations/loading.json"
          style={{ width: 100, height: 100 }}
          autoplay
          loop
        />
      )}
      {activeAnimation === 'success' && (
        <dotlottie-wc
          src="/animations/success.json"
          style={{ width: 100, height: 100 }}
          autoplay
        />
      )}
    </div>
  )
}

// ✅ Use lazy loading
const LottieAnimation = React.lazy(() => import('./LottieAnimation'))

function App() {
  return (
    <Suspense fallback={null}>
      <LottieAnimation />
    </Suspense>
  )
}

// ✅ Cache animations
const animationCache = new Map()

function getAnimation(src) {
  if (animationCache.has(src)) {
    return animationCache.get(src)
  }
  
  return fetch(src)
    .then(res => res.json())
    .then(data => {
      animationCache.set(src, data)
      return data
    })
}

// ✅ Use Web Workers for heavy animations
// offload parsing to a web worker
const worker = new Worker('/animation-worker.js')

worker.postMessage({ type: 'parse', data: animationData })
worker.onmessage = (e) => {
  const parsedAnimation = e.data
  // Use parsed animation
}
```

## Example Architecture: Loading Animation with Lottie

```
src/
├── components/
│   ├── Loading/
│   │   ├── index.tsx                    # Main loading component
│   │   ├── LottieLoader.tsx             # Lottie animation wrapper
│   │   ├── LoadingSpinner.tsx           # Spinner animation
│   │   ├── LoadingBar.tsx               # Progress bar animation
│   │   └── SkeletonLoader.tsx           # Skeleton loading state
│   └── ui/
│       └── AnimatedIcon.tsx             # Animated icon component
├── animations/
│   ├── loading.json                     # Loading animation
│   ├── success.json                     # Success animation
│   ├── error.json                       # Error animation
│   └── spinner.json                     # Spinner animation
├── hooks/
│   └── useLottieAnimation.ts           # Custom Lottie hook
└── utils/
    └── lottieSetup.ts                  # Lottie configuration

// Main Loading Component
function Loading({ type = 'spinner', size = 'medium' }) {
  const sizeMap = {
    small: { width: 50, height: 50 },
    medium: { width: 100, height: 100 },
    large: { width: 200, height: 200 }
  }
  
  const animationMap = {
    spinner: '/animations/spinner.json',
    loading: '/animations/loading.json',
    success: '/animations/success.json',
    error: '/animations/error.json'
  }
  
  return (
    <div className="loading-container">
      <LottieLoader
        src={animationMap[type]}
        size={sizeMap[size]}
        autoplay
        loop={type !== 'success'}
      />
      {type === 'loading' && <p>Loading content...</p>}
    </div>
  )
}

// Lottie Animation Wrapper
function LottieLoader({ src, size, autoplay = true, loop = false }) {
  const [animationData, setAnimationData] = useState(null)
  
  useEffect(() => {
    // Cache animation data
    getAnimation(src).then(setAnimationData)
  }, [src])
  
  if (!animationData) return null
  
  return (
    <dotlottie-wc
      data={animationData}
      style={{ width: size.width, height: size.height }}
      autoplay={autoplay}
      loop={loop}
    />
  )
}

// Skeleton Loading State
function SkeletonLoader({ lines = 3, height = 20 }) {
  return (
    <div className="skeleton-loader">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton-line"
          style={{
            height: height,
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  )
}

// Animated Icon Component
function AnimatedIcon({ type, size = 24, color = 'currentColor' }) {
  return (
    <dotlottie-wc
      src={`/animations/icons/${type}.json`}
      style={{ width: size, height: size }}
      autoplay
    />
  )
}

// Custom Lottie Hook
function useLottieAnimation(src, options = {}) {
  const [animationData, setAnimationData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    setIsLoading(true)
    setError(null)
    
    getAnimation(src)
      .then(data => {
        setAnimationData(data)
        setIsLoading(false)
      })
      .catch(err => {
        setError(err)
        setIsLoading(false)
      })
  }, [src])
  
  return { animationData, isLoading, error }
}

// Page with Loading States
function PageWithLoading() {
  const [isLoading, setIsLoading] = useState(true)
  const [content, setContent] = useState(null)
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setContent('Page content loaded!')
      setIsLoading(false)
    }, 2000)
  }, [])
  
  if (isLoading) {
    return <Loading type="loading" size="large" />
  }
  
  return (
    <div className="page">
      <AnimatedIcon type="checkmark" size={32} />
      <p>{content}</p>
    </div>
  )
}
```
