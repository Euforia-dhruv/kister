# Drei

## Purpose

Drei is a collection of 100+ helpers, abstractions, and useful components for React Three Fiber. It provides ready-made solutions for common 3D patterns including cameras, controls, loaders, shapes, shaders, staging, portals, and performance optimizations—saving you from reinventing the wheel.

## When to Use

- **Camera Controls**: Need OrbitControls, MapControls, FlyControls, or custom camera rigs
- **Loaders**: Loading 3D models (GLTF, FBX), textures, environments, or fonts
- **Lighting & Environment**: Quick studio lighting, HDR environments, or contact shadows
- **Shapes & Geometry**: Need quick access to common geometries (Box, Sphere, Torus, etc.)
- **Shaders & Materials**: Custom shader materials, distortion effects, or hover effects
- **Staging**: Need to quickly stage a scene with proper lighting and shadows
- **Performance**: Need Instances, Merged geometry, LOD, or adaptive rendering
- **Text & Labels**: 3D text rendering, billboards, or HTML overlays in 3D space
- **Portals**: Rendering content in different parts of the scene graph

## When NOT to Use

- **Without React Three Fiber**: Drei is built specifically for R3F—it won't work standalone
- **For 2D UI**: Use Motion (Framer Motion) or CSS animations for 2D interface animations
- **For Non-Three.js Projects**: Drei depends on Three.js; don't use it in vanilla JS projects
- **When Custom Implementation is Simpler**: Sometimes a few lines of Three.js code is simpler than importing a Drei component

## Best Practices

```jsx
// ✅ Import only what you need (tree-shaking friendly)
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'

// ✅ Use PerformanceMonitor for adaptive quality
import { PerformanceMonitor } from '@react-three/drei'

function Scene() {
  const [dpr, setDpr] = useState(1)
  
  return (
    <PerformanceMonitor
      onDecline={() => setDpr(0.5)}
      onIncline={() => setDpr(1)}
    >
      {/* Scene content */}
    </PerformanceMonitor>
  )
}

// ✅ Use Environment for quick, realistic lighting
import { Environment } from '@react-three/drei'

<Canvas>
  <Environment preset="studio" />
  <mesh>
    <sphereGeometry />
    <meshStandardMaterial metalness={0.7} roughness={0.2} />
  </mesh>
</Canvas>

// ✅ Use Float for organic, gentle motion
import { Float } from '@react-three/drei'

<Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
  <mesh>
    <torusGeometry />
    <meshStandardMaterial />
  </mesh>
</Float>

// ✅ Use ContactShadows for grounding objects
import { ContactShadows } from '@react-three/drei'

<ContactShadows
  position={[0, -1.5, 0]}
  opacity={0.4}
  scale={10}
  blur={2.5}
  far={4}
/>

// ✅ Use Text for 3D text rendering
import { Text } from '@react-three/drei'

<Text
  fontSize={1}
  color="white"
  anchorX="center"
  anchorY="middle"
  position={[0, 0, 0]}
>
  Hello World
</Text>

// ✅ Use Html for 2D overlays in 3D space
import { Html } from '@react-three/drei'

<mesh position={[0, 0, 0]}>
  <sphereGeometry />
  <meshStandardMaterial />
  <Html distanceFactor={10}>
    <div className="label">Product Name</div>
  </Html>
</mesh>

// ✅ Use Suspense with loaders
import { useGLTF } from '@react-three/drei'
import { Suspense } from 'react'

function Model() {
  const { scene } = useGLTF('/model.glb')
  return <primitive object={scene} />
}

<Suspense fallback={<Loading />}>
  <Model />
</Suspense>
```

## Common Mistakes

1. **Importing the Entire Library**
   ```jsx
   // ❌ Bad - imports everything, increases bundle size
   import * as Drei from '@react-three/drei'
   
   // ✅ Good - import specific components
   import { OrbitControls, Environment } from '@react-three/drei'
   ```

2. **Not Using Suspense with Loaders**
   ```jsx
   // ❌ Bad - no loading state
   function App() {
     return (
       <Canvas>
         <GLTFModel url="/model.glb" />
       </Canvas>
     )
   }
   
   // ✅ Good - proper Suspense boundary
   function App() {
     return (
       <Canvas>
         <Suspense fallback={<Loading />}>
           <GLTFModel url="/model.glb" />
         </Suspense>
       </Canvas>
     )
   }
   ```

3. **Ignoring Performance Helpers**: Don't forget to use Instances, Merged, AdaptiveDpr, and BakeShadows when appropriate.

4. **Overusing Html Component**: The Html component creates DOM elements in 3D space. Use sparingly as it can impact performance.

5. **Not Disposing Resources**: While Drei handles most disposal automatically, custom materials/geometries still need manual disposal.

## Performance Tips

```jsx
// ✅ Use Instances for repeated geometry
import { Instances, Instance } from '@react-three/drei'

function Particles() {
  const count = 10000
  const positions = useMemo(() => {
    return Array.from({ length: count }).flatMap(() => [
      Math.random() * 100 - 50,
      Math.random() * 100 - 50,
      Math.random() * 100 - 50
    ])
  }, [])
  
  return (
    <Instances limit={count}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial />
      {positions.map((pos, i) => (
        <Instance key={i} position={[pos, pos + 1, pos + 2]} />
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

// ✅ Use BakeShadows for static scenes
import { BakeShadows } from '@react-three/drei'

<Canvas shadows>
  <BakeShadows />
  <Scene />
</Canvas>

// ✅ Use Preload for assets
import { Preload } from '@react-three/drei'

<Canvas>
  <Suspense fallback={null}>
    <Scene />
    <Preload all />
  </Suspense>
</Canvas>

// ✅ Use Merged for static geometry
import { Merged } from '@react-three/drei'

function StaticScene() {
  return (
    <Merged meshes={[boxGeometry, sphereGeometry, cylinderGeometry]}>
      {(Box, Sphere, Cylinder) => (
        <>
          <Box position={[0, 0, 0]} />
          <Sphere position={[2, 0, 0]} />
          <Cylinder position={[4, 0, 0]} />
        </>
      )}
    </Merged>
  )
}
```

## Example Architecture: Staged Product Scene

```
src/
├── components/
│   ├── ProductScene/
│   │   ├── index.tsx                    # Main scene component
│   │   ├── SceneSetup.tsx               # Canvas + camera + controls
│   │   ├── Lighting.tsx                 # Environment + lights
│   │   ├── ProductModel.tsx             # 3D product with materials
│   │   ├── Ground.tsx                   # ContactShadows + floor
│   │   └── FloatingElements.tsx         # Animated decorative elements
│   └── ui/
│       └── ProductOverlay.tsx           # HTML overlay with product info
├── hooks/
│   └── useProductScene.ts              # Scene configuration state
└── stores/
    └── sceneStore.ts                   # Zustand store for scene state

// Main Product Scene Component
function ProductScene({ product }) {
  return (
    <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
      <PerformanceMonitor>
        {/* Lighting Setup */}
        <Environment preset="studio" intensity={0.5} />
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        
        {/* Product */}
        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <ProductModel product={product} />
          </Float>
        </Suspense>
        
        {/* Ground */}
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2.5}
        />
        
        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={8}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
      </PerformanceMonitor>
    </Canvas>
  )
}
```
