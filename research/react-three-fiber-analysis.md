# React Three Fiber Analysis

## Purpose

React renderer for Three.js — build 3D scenes declaratively with JSX. R3F lets you use the full power of Three.js while leveraging React's component model, hooks, and scheduling system.

## Classification

- **Type:** npm package
- **Category:** Framework (React renderer for Three.js)
- **npm package:** `@react-three/fiber`
- **Version:** v9 (pairs with React 19), v8 (pairs with React 18)
- **Stars:** 31.6k

## License

MIT

## Tech Stack

- React (18 or 19 depending on version)
- Three.js
- TypeScript (first-class support)
- JSX/TSX

## Installation

```bash
npm install three @types/three @react-three/fiber
```

For React 18:
```bash
npm install three @types/three @react-three/fiber@8
```

## Key Features

- **Declarative JSX for Three.js** — Write Three.js scenes as React components instead of命令式 API calls
- **No overhead vs plain Three.js** — Direct access to the Three.js scene graph with zero abstraction cost
- **React scheduling** — Leverages React's concurrent rendering and reconciler for optimal updates
- **Hooks** — `useFrame` (per-frame loop), `useThree` (access renderer/camera/scene), `useLoader`
- **TypeScript support** — Full type inference for geometries, materials, and props
- **Ecosystem** — Pairs with `@react-three/drei` (helpers), `@react-three/postprocessing` (effects), `@react-three/rapier` (physics), and more

## Basic Usage

```jsx
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function Box() {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta
  })
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Box />
    </Canvas>
  )
}
```

## Resources

- https://docs.pmnd.rs/react-three-fiber
- https://github.com/pmndrs/react-three-fiber
