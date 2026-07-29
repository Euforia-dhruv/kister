# Drei Analysis

## Purpose

Useful helpers and ready-made abstractions for React Three Fiber. Drei provides 100+ components that solve common 3D problems so you don't have to build them from scratch.

## Classification

- **Type:** npm package
- **Category:** Component library (for React Three Fiber)
- **npm package:** `@react-three/drei`
- **Part of:** pmndrs (Poimandres) ecosystem

## License

MIT

## Tech Stack

- React Three Fiber
- Three.js
- three-stdlib (replaces three/examples/jsm)
- TypeScript

## Installation

```bash
npm install @react-three/drei
```

> Drei automatically peer-depends on `react`, `react-dom`, and `three`. It pulls helpers from `three-stdlib` instead of `three/examples/jsm` for better tree-shaking.

## Key Features

- **100+ components** — Cameras, controls, loaders, shapes, shaders, staging, portals, performance helpers
- **Controls** — `OrbitControls`, `TrackballControls`, `FlyControls`, `FirstPersonControls`, `ScrollControls`
- **Loaders** — `useGLTF`, `useTexture`, `useProgress`, `Html` (DOM in 3D), `Float`
- **Shapes** — `Box`, `Sphere`, `Torus`, `TorusKnot`, `Icosahedron`, and more with built-in geometries
- **Shaders** — `ShaderMaterial`, `MeshDistortMaterial`, `MeshWobbleMaterial`, `MeshReflectorMaterial`
- **Staging** — `Environment`, `Lightformer`, `ContactShadows`, `Sky`, `Stars`, `Sparkles`
- **Performance** — `Instances`, `Detailed`, `Lod`, `Preload`, `AdaptiveDpr`, `AdaptiveEvents`
- **Portals** — `Portal`, `MeshPortalMaterial` for rendering scenes within scenes
- **Text** — `Text`, `Text3D` (SDF text rendering)

## Basic Usage

```jsx
import { OrbitControls, Environment, Float, MeshDistortMaterial } from '@react-three/drei'

function Scene() {
  return (
    <>
      <OrbitControls />
      <Environment preset="city" />
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial color="orange" distort={0.4} speed={2} />
        </mesh>
      </Float>
    </>
  )
}
```

## Resources

- https://github.com/pmndrs/drei
- https://drei.docs.pmnd.rs
