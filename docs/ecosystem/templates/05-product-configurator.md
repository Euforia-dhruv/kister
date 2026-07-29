# Template 05: Product Configurator

## Overview

An interactive 3D product configurator with real-time material/color switching, camera orbit controls, and responsive 3D viewing. Ideal for products where customization drives purchase decisions.

**Core stack:** React Three Fiber + Drei

## Use Cases

- Sneaker/apparel customizers
- Automotive color and trim selectors
- Furniture material pickers (wood, fabric, leather)
- Electronics configuration (watches, phones)
- Jewelry and accessories customizer

## Package Dependencies

```json
{
  "dependencies": {
    "@react-three/drei": "^9.120.0",
    "@react-three/fiber": "^8.17.0",
    "three": "^0.170.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "zustand": "^5.0.0"
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
│   ├── page.tsx                  # Configurator page
│   └── globals.css
├── components/
│   ├── configurator/
│   │   ├── Configurator.tsx      # Main configurator layout
│   │   ├── ConfigViewer.tsx      # 3D Canvas wrapper
│   │   ├── ProductModel.tsx      # 3D model with materials
│   │   ├── MaterialPicker.tsx    # Material/color selection UI
│   │   ├── PartSelector.tsx      # Select model parts
│   │   ├── PriceDisplay.tsx      # Dynamic pricing
│   │   └── SummaryPanel.tsx      # Configuration summary
│   ├── 3d/
│   │   ├── CameraControls.tsx    # Orbit + auto-rotate
│   │   ├── Lighting.tsx          # Studio lighting setup
│   │   ├── Ground.tsx            # Reflective ground plane
│   │   └── Annotations.tsx       # 3D labels/hotspots
│   ├── ui/
│   │   ├── ColorSwatch.tsx       # Color selection button
│   │   ├── MaterialCard.tsx      # Material preview card
│   │   ├── Tooltip.tsx           # Info tooltip
│   │   └── ResponsiveCanvas.tsx  # Mobile-friendly canvas
│   └── providers/
│       └── ConfigProvider.tsx     # Configuration state
├── hooks/
│   ├── useConfigurator.ts        # Config state hook
│   ├── useMaterialTransition.ts  # Smooth material swap
│   └── useResponsiveCanvas.ts    # Canvas sizing
├── lib/
│   ├── materials.ts              # Material definitions
│   ├── pricing.ts                # Price calculation
│   └── three-config.ts           # Renderer settings
├── store/
│   └── configurator.ts           # Zustand store
├── types/
│   └── configurator.ts           # Config, Material types
└── public/
    ├── models/                   # 3D product models
    ├── materials/                # PBR texture maps
    └── thumbnails/               # Material previews
```

## Key Components

### Configurator Layout

```tsx
// src/components/configurator/Configurator.tsx
"use client";

import ConfigViewer from "./ConfigViewer";
import MaterialPicker from "./MaterialPicker";
import PartSelector from "./PartSelector";
import PriceDisplay from "./PriceDisplay";
import SummaryPanel from "./SummaryPanel";
import { useConfigurator } from "@/store/configurator";

export default function Configurator() {
  const { selectedPart, material, color } = useConfigurator();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* 3D Viewer */}
      <div className="flex-1 lg:h-screen sticky top-0">
        <ConfigViewer />
      </div>

      {/* Controls Panel */}
      <div className="lg:w-[420px] lg:h-screen lg:overflow-y-auto border-l border-neutral-200">
        <div className="p-6 space-y-8">
          <div>
            <h1 className="text-2xl font-semibold">Configure Your Product</h1>
            <p className="text-neutral-500 mt-1">
              Select a part, then choose material and color
            </p>
          </div>

          <PartSelector />
          <MaterialPicker partId={selectedPart} />
          <PriceDisplay />
          <SummaryPanel />
        </div>
      </div>
    </div>
  );
}
```

### ConfigViewer

Canvas with responsive sizing and optimized settings.

```tsx
// src/components/configurator/ConfigViewer.tsx
"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Html,
} from "@react-three/drei";
import ProductModel from "./ProductModel";
import Lighting from "./Lighting";
import Ground from "./Ground";

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-3 border-neutral-200 border-t-black rounded-full animate-spin" />
        <span className="text-sm text-neutral-500">Loading model…</span>
      </div>
    </Html>
  );
}

export default function ConfigViewer() {
  return (
    <div className="w-full h-full min-h-[50vh] lg:min-h-screen bg-neutral-50">
      <Canvas
        camera={{ position: [3, 2, 5], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          toneMapping: 3,
          toneMappingExposure: 1.1,
        }}
      >
        <Suspense fallback={<Loader />}>
          <Lighting />
          <Environment preset="studio" background={false} />
          <ProductModel />
          <Ground />
          <ContactShadows
            position={[0, -0.01, 0]}
            opacity={0.4}
            scale={20}
            blur={2}
          />
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.1}
            minDistance={3}
            maxDistance={8}
            autoRotate={false}
            makeDefault
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

### ProductModel with Material Switching

```tsx
// src/components/configurator/ProductModel.tsx
"use client";

import { useRef, useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useConfigurator } from "@/store/configurator";

interface ProductModelProps {
  path?: string;
}

export default function ProductModel({
  path = "/models/product.glb",
}: ProductModelProps) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(path);
  const { material, color, selectedPart } = useConfigurator();

  // Clone scene to avoid mutating shared resource
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const partName = child.name.toLowerCase();

        // Apply material/color to matching parts
        if (
          selectedPart === "all" ||
          partName.includes(selectedPart.toLowerCase())
        ) {
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.color.set(color);
            child.material.roughness =
              material === "matte" ? 0.9 : material === "glossy" ? 0.1 : 0.5;
            child.material.metalness =
              material === "metallic" ? 0.9 : 0.0;
            child.material.needsUpdate = true;
          }
        }
      }
    });
  }, [clonedScene, material, color, selectedPart]);

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      <primitive object={clonedScene} scale={1.5} />
    </group>
  );
}

useGLTF.preload("/models/product.glb");
```

### Material Picker

Material and color selection UI.

```tsx
// src/components/configurator/MaterialPicker.tsx
"use client";

import { motion } from "motion/react";
import { useConfigurator } from "@/store/configurator";
import { materials, colors } from "@/lib/materials";

interface MaterialPickerProps {
  partId: string;
}

export default function MaterialPicker({ partId }: MaterialPickerProps) {
  const { material, color, setMaterial, setColor } = useConfigurator();

  return (
    <div className="space-y-6">
      {/* Material Type */}
      <div>
        <h3 className="text-sm font-medium uppercase tracking-wider text-neutral-500 mb-3">
          Material
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {materials.map((mat) => (
            <button
              key={mat.id}
              onClick={() => setMaterial(mat.id)}
              className={`relative p-3 rounded-xl border-2 transition-all ${
                material === mat.id
                  ? "border-neutral-900 bg-neutral-50"
                  : "border-neutral-200 hover:border-neutral-400"
              }`}
            >
              {material === mat.id && (
                <motion.div
                  layoutId="activeMaterial"
                  className="absolute inset-0 border-2 border-neutral-900 rounded-xl"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div
                className="w-full aspect-square rounded-lg mb-2"
                style={{
                  background: mat.preview,
                }}
              />
              <span className="text-sm font-medium">{mat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Color */}
      <div>
        <h3 className="text-sm font-medium uppercase tracking-wider text-neutral-500 mb-3">
          Color
        </h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((c) => (
            <motion.button
              key={c.id}
              onClick={() => setColor(c.hex)}
              className={`w-10 h-10 rounded-full relative ${
                color === c.hex ? "ring-2 ring-offset-2 ring-neutral-900" : ""
              }`}
              style={{ backgroundColor: c.hex }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={c.name}
            >
              {color === c.hex && (
                <motion.div
                  layoutId="activeColor"
                  className="absolute inset-0 rounded-full border-2 border-white"
                  initial={false}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### Part Selector

```tsx
// src/components/configurator/PartSelector.tsx
"use client";

import { motion } from "motion/react";
import { useConfigurator } from "@/store/configurator";
import { parts } from "@/lib/materials";

export default function PartSelector() {
  const { selectedPart, setSelectedPart } = useConfigurator();

  return (
    <div>
      <h3 className="text-sm font-medium uppercase tracking-wider text-neutral-500 mb-3">
        Select Part
      </h3>
      <div className="space-y-2">
        {parts.map((part) => (
          <motion.button
            key={part.id}
            onClick={() => setSelectedPart(part.id)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-colors ${
              selectedPart === part.id
                ? "border-neutral-900 bg-neutral-50"
                : "border-neutral-200 hover:border-neutral-300"
            }`}
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{part.name}</p>
                <p className="text-sm text-neutral-500">{part.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: part.currentColor }}
                />
                <svg
                  className={`w-4 h-4 transition-transform ${
                    selectedPart === part.id ? "rotate-90" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
```

### Camera Controls

```tsx
// src/components/3d/CameraControls.tsx
"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface CameraControlsProps {
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  focusPoint?: [number, number, number];
}

export default function CameraControls({
  autoRotate = false,
  autoRotateSpeed = 1,
  focusPoint = [0, 0, 0],
}: CameraControlsProps) {
  const controlsRef = useRef<any>(null);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      enableDamping={true}
      dampingFactor={0.05}
      autoRotate={autoRotate}
      autoRotateSpeed={autoRotateSpeed}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2.1}
      minDistance={3}
      maxDistance={8}
      target={focusPoint}
      makeDefault
    />
  );
}
```

### Zustand Store

```ts
// src/store/configurator.ts
import { create } from "zustand";

interface ConfigState {
  selectedPart: string;
  material: string;
  color: string;
  setSelectedPart: (part: string) => void;
  setMaterial: (material: string) => void;
  setColor: (color: string) => void;
  reset: () => void;
}

export const useConfigurator = create<ConfigState>((set) => ({
  selectedPart: "body",
  material: "matte",
  color: "#1a1a1a",
  setSelectedPart: (part) => set({ selectedPart: part }),
  setMaterial: (material) => set({ material }),
  setColor: (color) => set({ color }),
  reset: () =>
    set({ selectedPart: "body", material: "matte", color: "#1a1a1a" }),
}));
```

### Material Definitions

```ts
// src/lib/materials.ts
export const materials = [
  {
    id: "matte",
    name: "Matte",
    preview: "linear-gradient(135deg, #666 0%, #999 100%)",
    roughness: 0.9,
    metalness: 0.0,
  },
  {
    id: "glossy",
    name: "Glossy",
    preview: "linear-gradient(135deg, #fff 0%, #ccc 100%)",
    roughness: 0.1,
    metalness: 0.0,
  },
  {
    id: "metallic",
    name: "Metallic",
    preview: "linear-gradient(135deg, #c0c0c0 0%, #808080 100%)",
    roughness: 0.3,
    metalness: 0.9,
  },
];

export const colors = [
  { id: "black", name: "Obsidian", hex: "#1a1a1a" },
  { id: "white", name: "Arctic", hex: "#f5f5f5" },
  { id: "red", name: "Crimson", hex: "#dc2626" },
  { id: "blue", name: "Ocean", hex: "#2563eb" },
  { id: "green", name: "Forest", hex: "#16a34a" },
  { id: "gold", name: "Champagne", hex: "#d4a574" },
];

export const parts = [
  { id: "body", name: "Body", description: "Main body panel", currentColor: "#1a1a1a" },
  { id: "accent", name: "Accent", description: "Accent details", currentColor: "#dc2626" },
  { id: "base", name: "Base", description: "Base and trim", currentColor: "#666666" },
];
```

### Lighting Setup

```tsx
// src/components/3d/Lighting.tsx
"use client";

export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-5, 5, -5]} intensity={0.4} />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
      />
    </>
  );
}
```

### Responsive Canvas

```tsx
// src/components/ui/ResponsiveCanvas.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";

interface ResponsiveCanvasProps {
  children: React.ReactNode;
  className?: string;
}

export default function ResponsiveCanvas({
  children,
  className = "",
}: ResponsiveCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      {size.width > 0 && (
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true }}
          style={{ width: size.width, height: size.height }}
        >
          {children}
        </Canvas>
      )}
    </div>
  );
}
```

## Integration Patterns

### Dynamic Pricing

```ts
// src/lib/pricing.ts
import { useConfigurator } from "@/store/configurator";

interface PriceModifier {
  material: string;
  modifier: number;
}

const materialPrices: PriceModifier[] = [
  { material: "matte", modifier: 0 },
  { material: "glossy", modifier: 20 },
  { material: "metallic", modifier: 50 },
];

const basePrice = 199;

export function calculatePrice(
  material: string,
): number {
  const mod = materialPrices.find((m) => m.material === material);
  return basePrice + (mod?.modifier ?? 0);
}
```

### PriceDisplay Component

```tsx
// src/components/configurator/PriceDisplay.tsx
"use client";

import { motion, AnimatePresence } from "motion/react";
import { useConfigurator } from "@/store/configurator";
import { calculatePrice } from "@/lib/pricing";

export default function PriceDisplay() {
  const { material } = useConfigurator();
  const price = calculatePrice(material);

  return (
    <div className="p-4 bg-neutral-50 rounded-xl">
      <span className="text-sm text-neutral-500">Estimated Price</span>
      <AnimatePresence mode="wait">
        <motion.p
          key={price}
          className="text-3xl font-bold mt-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          ${price}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
```

### Material Transition Animation

```ts
// src/hooks/useMaterialTransition.ts
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function useMaterialTransition(
  targetColor: string,
  targetRoughness: number,
  targetMetalness: number,
) {
  const materialRef = useRef<THREE.MeshStandardMaterial>(
    new THREE.MeshStandardMaterial()
  );

  const target = useRef({
    color: new THREE.Color(targetColor),
    roughness: targetRoughness,
    metalness: targetMetalness,
  });

  // Update target when props change
  target.current.color.set(targetColor);
  target.current.roughness = targetRoughness;
  target.current.metalness = targetMetalness;

  useFrame(() => {
    const mat = materialRef.current;
    if (!mat) return;

    mat.color.lerp(target.current.color, 0.1);
    mat.roughness += (target.current.roughness - mat.roughness) * 0.1;
    mat.metalness += (target.current.metalness - mat.metalness) * 0.1;
  });

  return materialRef.current;
}
```

## Performance Considerations

- **Model size:** Use Draco-compressed GLB. Split large models into separate parts if swapping independently.
- **Material caching:** Create materials once and reuse. Don't create new `MeshStandardMaterial` per frame.
- **Texture atlasing:** For material previews, use texture atlases instead of separate images.
- **Canvas DPR:** Cap at `[1, 1.5]` — configurators don't need 2x on high-DPI.
- **Lazy loading:** Load the 3D model after the UI controls are visible.
- **Shadow optimization:** Use `ContactShadows` instead of real-time shadow maps.
- **State management:** Use Zustand for configuration state — avoids unnecessary re-renders in the 3D scene.

```tsx
// Selective re-renders with Zustand
const color = useConfigurator((s) => s.color);
// Only this component re-renders when color changes
```

## When to Use This Template

- Product customization is core to the experience
- Users need to see real-time visual feedback
- Multiple materials/colors/options to combine
- E-commerce product configurator
- Car, sneaker, furniture, or electronics customizer

**Avoid when:** Product has no configurable options, 3D model is too complex for real-time rendering, or the experience must work without JavaScript.
