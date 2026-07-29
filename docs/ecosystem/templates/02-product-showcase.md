# Template 02: 3D Product Showcase

## Overview

An interactive 3D product viewer with camera animations, environment lighting, and scroll-driven product exploration. Ideal for e-commerce, automotive, furniture, and tech product pages.

**Core stack:** React Three Fiber + Drei + GSAP

## Use Cases

- E-commerce product pages (shoes, watches, electronics)
- Automotive configurators and showcases
- Furniture and home design visualization
- Tech product reveal pages
- Architectural model presentations

## Package Dependencies

```json
{
  "dependencies": {
    "@react-three/drei": "^9.120.0",
    "@react-three/fiber": "^8.17.0",
    "three": "^0.170.0",
    "gsap": "^3.12.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/three": "^0.170.0",
    "typescript": "^5.7.0",
    "vite": "^6.0.0",
    "tailwindcss": "^3.4.0"
  }
}
```

## File Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                  # Product showcase page
│   └── globals.css
├── components/
│   ├── 3d/
│   │   ├── ProductViewer.tsx     # Main Canvas wrapper
│   │   ├── ProductModel.tsx      # 3D model loader/display
│   │   ├── CameraRig.tsx         # GSAP-driven camera
│   │   ├── Environment.tsx       # Lighting and environment
│   │   ├── Lights.tsx            # Configurable light setup
│   │   └── PostProcessing.tsx    # Bloom, FXAA, etc.
│   ├── ui/
│   │   ├── ProductInfo.tsx       # Overlay text/UI
│   │   ├── FeaturePoints.tsx     # 3D annotation hotspots
│   │   ├── Controls.tsx          # Rotation/zoom UI
│   │   └── ColorPicker.tsx       # Product color variants
│   └── sections/
│       ├── HeroSection.tsx       # Full-viewport 3D hero
│       ├── FeaturesSection.tsx   # Scroll-triggered features
│       └── SpecsSection.tsx      # Technical specifications
├── hooks/
│   ├── useCameraAnimation.ts    # GSAP camera keyframes
│   ├── useModelLoader.ts        # GLTF/GLB loading
│   └── useScrollSection.ts      # Track scroll for 3D
├── lib/
│   ├── three-config.ts          # Three.js renderer settings
│   └── gsap.ts                  # GSAP plugin registration
├── models/
│   └── product.glb              # 3D model assets
├── types/
│   └── product.ts               # Product and feature types
└── public/
    └── textures/                # HDR environment maps
```

## Key Components

### ProductViewer

Canvas wrapper with optimized renderer settings.

```tsx
// src/components/3d/ProductViewer.tsx
"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Html,
} from "@react-three/drei";
import ProductModel from "./ProductModel";
import CameraRig from "./CameraRig";
import Lights from "./Lights";

interface ProductViewerProps {
  modelPath: string;
  autoRotate?: boolean;
  enableZoom?: boolean;
  scrollProgress?: number;
}

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-neutral-200 border-t-black rounded-full animate-spin" />
        <span className="text-sm text-neutral-500">Loading product…</span>
      </div>
    </Html>
  );
}

export default function ProductViewer({
  modelPath,
  autoRotate = true,
  enableZoom = true,
  scrollProgress = 0,
}: ProductViewerProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        toneMapping: 3, // ACESFilmicToneMapping
        toneMappingExposure: 1.2,
      }}
      style={{ touchAction: "none" }}
    >
      <Suspense fallback={<Loader />}>
        <Lights />
        <Environment preset="studio" background={false} />
        <ProductModel path={modelPath} />
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2.5}
        />
        <CameraRig scrollProgress={scrollProgress} />
        <OrbitControls
          enablePan={false}
          enableZoom={enableZoom}
          autoRotate={autoRotate}
          autoRotateSpeed={1}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Suspense>
    </Canvas>
  );
}
```

### ProductModel

GLTF model loader with material control.

```tsx
// src/components/3d/ProductModel.tsx
"use client";

import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ProductModelProps {
  path: string;
  color?: string;
  emissive?: string;
  emissiveIntensity?: number;
}

export default function ProductModel({
  path,
  color = "#ffffff",
  emissive = "#000000",
  emissiveIntensity = 0,
}: ProductModelProps) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(path);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      <primitive object={scene} scale={1.5} />
    </group>
  );
}

useGLTF.preload("/models/product.glb");
```

### CameraRig

GSAP-driven camera animations synced to scroll.

```tsx
// src/components/3d/CameraRig.tsx
"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import * as THREE from "three";

interface CameraRigProps {
  scrollProgress: number;
  autoRotate?: boolean;
}

const cameraKeyframes = [
  { position: [0, 0, 5], target: [0, 0, 0] },       // Default front
  { position: [3, 1, 3], target: [0, 0, 0] },       // 45° angle
  { position: [0, 2, 2], target: [0, 0, 0] },       // Top-down
  { position: [-3, 0.5, 3], target: [0, 0, 0] },    // Side view
];

export default function CameraRig({ scrollProgress }: CameraRigProps) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 5));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const segment = scrollProgress * (cameraKeyframes.length - 1);
    const index = Math.min(Math.floor(segment), cameraKeyframes.length - 2);
    const t = segment - index;

    const from = cameraKeyframes[index];
    const to = cameraKeyframes[index + 1];

    gsap.to(targetPos.current, {
      x: from.position[0] + (to.position[0] - from.position[0]) * t,
      y: from.position[1] + (to.position[1] - from.position[1]) * t,
      z: from.position[2] + (to.position[2] - from.position[2]) * t,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(targetLookAt.current, {
      x: from.target[0] + (to.target[0] - from.target[0]) * t,
      y: from.target[1] + (to.target[1] - from.target[1]) * t,
      z: from.target[2] + (to.target[2] - from.target[2]) * t,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [scrollProgress]);

  useFrame(() => {
    camera.position.lerp(targetPos.current, 0.1);
    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    camera.lookAt(
      targetLookAt.current.x,
      targetLookAt.current.y,
      targetLookAt.current.z
    );
  });

  return null;
}
```

### Environment Setup

```tsx
// src/components/3d/Environment.tsx
"use client";

import {
  Environment as DreiEnvironment,
  Lightformer,
} from "@react-three/drei";

export default function ProductEnvironment() {
  return (
    <DreiEnvironment resolution={256} backgroundBlurriness={1}>
      <group rotation={[-Math.PI / 3, 0, 1]}>
        <Lightformer
          form="circle"
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 5, -9]}
          scale={2}
        />
        <Lightformer
          form="circle"
          intensity={2}
          rotation-y={Math.PI / 2}
          position={[-5, 1, -1]}
          scale={2}
        />
        <Lightformer
          form="ring"
          color="#4040ff"
          intensity={2}
          rotation-y={-Math.PI / 2}
          position={[10, 1, 0]}
          scale={8}
        />
      </group>
    </DreiEnvironment>
  );
}
```

## Integration Patterns

### Scroll-Driven Camera

```tsx
// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import ProductViewer from "@/components/3d/ProductViewer";

export default function ProductPage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(window.scrollY / maxScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      <section className="h-screen sticky top-0">
        <ProductViewer
          modelPath="/models/product.glb"
          scrollProgress={scrollProgress}
        />
      </section>

      <section className="relative z-10 bg-white/80 backdrop-blur">
        <div className="max-w-4xl mx-auto py-24 px-6">
          <h2 className="text-4xl font-bold">Features</h2>
          {/* Feature content that drives the 3D camera */}
        </div>
      </section>
    </div>
  );
}
```

### Feature Hotspot Annotations

```tsx
// src/components/ui/FeaturePoints.tsx
"use client";

import { Html } from "@react-three/drei";
import { useState } from "react";

interface Hotspot {
  position: [number, number, number];
  label: string;
  description: string;
}

interface FeaturePointsProps {
  hotspots: Hotspot[];
  activeIndex: number;
}

export default function FeaturePoints({
  hotspots,
  activeIndex,
}: FeaturePointsProps) {
  return (
    <>
      {hotspots.map((hotspot, i) => (
        <group key={i} position={hotspot.position}>
          <Html
            center
            distanceFactor={5}
            style={{
              opacity: i === activeIndex ? 1 : 0.3,
              transition: "opacity 0.3s ease",
            }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg min-w-[200px]">
              <h3 className="font-semibold text-sm">{hotspot.label}</h3>
              <p className="text-xs text-neutral-600 mt-1">
                {hotspot.description}
              </p>
            </div>
          </Html>
        </group>
      ))}
    </>
  );
}
```

## Performance Considerations

- **Model optimization:** Use Draco-compressed GLB files. Target < 2MB for mobile.
- **DPR limiting:** Set `dpr={[1, 1.5]}` to cap pixel ratio on high-DPI screens.
- **Geometry instancing:** For products with repeated elements, use `InstancedMesh`.
- **Texture compression:** Use KTX2 textures with `useKTX2` from Drei for GPU-ready formats.
- **Suspense boundaries:** Wrap the 3D scene in `Suspense` with a lightweight HTML loader.
- **Framerate capping:** Use `frameloop="demand"` for static shots, `"always"` for animations.
- **Shadow maps:** Use `ContactShadows` instead of real-time shadow maps for better performance.

```tsx
// Optimize canvas for mobile
<Canvas
  dpr={[1, 1.5]}
  performance={{ min: 0.5 }}
  frameloop="demand"
>
  {/* ... */}
</Canvas>
```

## When to Use This Template

- You need an interactive 3D product viewer
- Products benefit from 360° inspection (shoes, watches, cars)
- Scroll-driven camera reveals
- E-commerce or marketing product pages
- Technical documentation with 3D models

**Avoid when:** Products are simple (2D images suffice), target users have very low bandwidth, or the 3D model is too complex for real-time rendering.
