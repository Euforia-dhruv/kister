# React Three Fiber (R3F)

## Purpose

React Three Fiber is a React renderer for Three.js, enabling declarative 3D graphics within a React component tree. It bridges the gap between React's component model and Three.js's imperative 3D API, allowing developers to build 3D scenes using familiar React patterns like props, state, hooks, and composition.

## When to Use

- **3D Product Showcases**: Interactive product configurators, 360° viewers, AR-ready product displays
- **Interactive 3D Experiences**: Data visualization in 3D space, immersive brand experiences, architectural walkthroughs
- **Data Visualization**: 3D charts, geospatial visualizations, scientific simulations
- **Immersive Brand Experiences**: Landing pages with 3D elements, interactive storytelling
- **Games & Simulations**: Browser-based 3D games, physics simulations, training applications
- **Creative Portfolios**: Artist portfolios, generative art, interactive installations

## When NOT to Use

- **Simple 2D Animations**: Use Motion (Framer Motion) or CSS animations instead
- **Performance-Critical Mobile**: If the target is low-end mobile devices with no GPU acceleration
- **Accessibility-First Sites**: When WCAG compliance is primary and 3D adds no value
- **No 3D Content Needed**: Don't add R3F just because it looks cool—2D solutions are simpler
- **Static Content**: If the 3D scene doesn't need interactivity, consider pre-rendered images or video
- **Simple Icon Animations**: Use Lottie or dotLottie for lightweight vector animations

## Best Practices

```jsx
// ✅ Use Canvas component as the entry point
import { Canvas } from '@react-three/fiber'

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <Box position={[0, 0, 0]} />
    </Canvas>
  )
}

// ✅ Leverage useFrame for animations (runs every frame)
import { useFrame } from '@react-three/fiber'

function RotatingBox() {
  const meshRef = useRef()
  
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta
    meshRef.current.rotation.y += delta * 0.5
  })
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

// ✅ Use Drei helpers for common patterns
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'

// ✅ Implement LOD (Level of Detail) for complex scenes
import { useLOD } from '@react-three/drei'

// ✅ Use InstancedMesh for many identical objects
function Forest() {
  const count = 1000
  const meshRef = useRef()
  
  useEffect(() => {
    const dummy = new THREE.Object3D()
    for (let i = 0; i < count; i++) {
      dummy.position.set(
        Math.random() * 100 - 50,
        0,
        Math.random() * 100 - 50
      )
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [])
  
  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <treeGeometry />
      <meshStandardMaterial color="green" />
    </instancedMesh>
  )
}

// ✅ Lazy load 3D scenes for better initial load
const HeavyScene = React.lazy(() => import('./HeavyScene'))

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Canvas>
        <HeavyScene />
      </Canvas>
    </Suspense>
  )
}
```

## Common Mistakes

1. **Creating new materials/geometries every render**
   ```jsx
   // ❌ Bad - creates new material on every render
   function Box() {
     return (
       <mesh>
         <boxGeometry />
         <meshStandardMaterial color={new THREE.Color('orange')} />
       </mesh>
     )
   }
   
   // ✅ Good - memoize or use stable references
   function Box() {
     return (
       <mesh>
         <boxGeometry />
         <meshStandardMaterial color="orange" />
       </mesh>
     )
   }
   ```

2. **Not disposing objects**
   ```jsx
   // ❌ Bad - memory leak
   useFrame(() => {
     const geometry = new THREE.BoxGeometry(1, 1, 1)
     // geometry never disposed
   })
   
   // ✅ Good - use cleanup
   useEffect(() => {
     const geometry = new THREE.BoxGeometry(1, 1, 1)
     return () => geometry.dispose()
   }, [])
   ```

3. **Forgetting React 19 Compatibility**: R3F v8+ supports React 19. If using older versions, check compatibility before upgrading.

4. **Over-complicating Scenes**: Start simple, add complexity only when needed. Don't create deep component hierarchies unless necessary.

5. **Not Using Suspense**: Always wrap 3D content in Suspense boundaries for proper loading states.

## Performance Tips

```jsx
// ✅ Use Instances for repeated geometry
import { Instances, Instance } from '@react-three/drei'

function Particles() {
  return (
    <Instances limit={10000}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial />
      {Array.from({ length: 10000 }).map((_, i) => (
        <Instance key={i} position={[Math.random() * 10, 0, 0]} />
      ))}
    </Instances>
  )
}

// ✅ Use AdaptiveDpr for mobile performance
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'

<Canvas>
  <AdaptiveDpr pixelated />
  <AdaptiveEvents />
  <Scene />
</Canvas>

// ✅ Use PerformanceMonitor to adjust quality
import { PerformanceMonitor } from '@react-three/drei'

function App() {
  const [dpr, setDpr] = useState(1)
  
  return (
    <Canvas dpr={dpr}>
      <PerformanceMonitor
        onDecline={() => setDpr(0.5)}
        onIncline={() => setDpr(1)}
      />
      <Scene />
    </Canvas>
  )
}

// ✅ BakeShadows for static scenes
import { BakeShadows } from '@react-three/drei'

<Canvas shadows>
  <BakeShadows />
  <Scene />
</Canvas>

// ✅ Preload assets
import { Preload } from '@react-three/drei'

<Canvas>
  <Suspense fallback={null}>
    <Scene />
    <Preload all />
  </Suspense>
</Canvas>

// ✅ Use Suspense boundaries strategically
<Canvas>
  <Suspense fallback={<LoadingModel />}>
    <HeavyModel />
  </Suspense>
  <Suspense fallback={null}>
    <Environment preset="studio" />
  </Suspense>
</Canvas>
```

## Example Architecture: Product Configurator

```
src/
├── components/
│   ├── ProductConfigurator/
│   │   ├── index.tsx                    # Main configurator component
│   │   ├── Scene.tsx                    # Canvas + 3D scene setup
│   │   ├── ProductModel.tsx             # 3D product model with materials
│   │   ├── Environment.tsx              # Lighting + environment
│   │   ├── Controls.tsx                 # OrbitControls + interaction
│   │   ├── ColorPicker.tsx              # Material color selection
│   │   └── Camera.tsx                   # Camera animations
│   └── ui/
│       ├── ConfigPanel.tsx              # 2D configuration UI
│       └── LoadingScreen.tsx            # Loading fallback
├── hooks/
│   ├── useProductConfig.ts             # Product configuration state
│   └── useCameraAnimation.ts           # Camera transition logic
└── stores/
    └── configuratorStore.ts            # Zustand store for config state

// Main Configurator Component
function ProductConfigurator({ productId }) {
  const [config, setConfig] = useProductConfig(productId)
  
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1 }}>
        <Suspense fallback={<LoadingScreen />}>
          <Canvas shadows camera={{ position: [0, 0, 5] }}>
            <PerformanceMonitor>
              <Scene config={config} />
              <Environment preset="studio" />
              <ContactShadows
                position={[0, -1.5, 0]}
                opacity={0.4}
                scale={10}
                blur={2.5}
              />
              <OrbitControls
                enablePan={false}
                minDistance={3}
                maxDistance={8}
              />
            </PerformanceMonitor>
          </Canvas>
        </Suspense>
      </div>
      <ConfigPanel config={config} onChange={setConfig} />
    </div>
  )
}
```
