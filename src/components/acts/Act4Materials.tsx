"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion, useTransform, type MotionValue } from "motion/react";
import { useActProgress } from "./ActOrchestrator";

/* ─── ACT 4: MATERIALS ──────────────────────────────────── */

interface MaterialDef {
  id: string;
  label: string;
  color: string;
  roughness: number;
  metalness: number;
  envMapIntensity: number;
  position: [number, number, number];
  size: [number, number, number];
}

const MATERIALS: MaterialDef[] = [
  { id: "quartz", label: "QUARTZ", color: "#e8e4de", roughness: 0.15, metalness: 0.0, envMapIntensity: 1.5, position: [-4, 0, 0], size: [1.2, 2.4, 0.8] },
  { id: "granite", label: "GRANITE", color: "#3a3530", roughness: 0.7, metalness: 0.0, envMapIntensity: 0.5, position: [-2, 0, 0], size: [1.0, 2.0, 0.9] },
  { id: "laminate", label: "LAMINATE", color: "#8a7560", roughness: 0.5, metalness: 0.0, envMapIntensity: 0.8, position: [0, 0, 0], size: [1.1, 2.2, 0.7] },
  { id: "acrylic", label: "ACRYLIC", color: "#f5f0eb", roughness: 0.05, metalness: 0.1, envMapIntensity: 2.0, position: [2, 0, 0], size: [0.9, 2.6, 0.6] },
  { id: "brass", label: "BRASS", color: "#b87333", roughness: 0.25, metalness: 0.9, envMapIntensity: 1.8, position: [4, 0, 0], size: [0.8, 2.8, 0.6] },
  { id: "glass", label: "GLASS", color: "#a8c8d8", roughness: 0.0, metalness: 0.0, envMapIntensity: 2.5, position: [6, 0, 0], size: [1.3, 2.1, 0.5] },
];

/* ─── MONOLITH ──────────────────────────────────────────── */

function Monolith({ material, index, activeIndex }: {
  material: MaterialDef;
  index: number;
  activeIndex: MotionValue<number>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const currentIdx = Math.round(activeIndex.get());
    const isActive = currentIdx === index;
    const isNearActive = Math.abs(currentIdx - index) <= 1;

    meshRef.current.rotation.y = Math.sin(t * 0.3 + index * 0.5) * 0.1;
    meshRef.current.rotation.x = Math.cos(t * 0.2 + index * 0.3) * 0.05;
    const targetY = isActive ? 0.5 : isNearActive ? 0 : -0.3;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={material.position}>
        <mesh ref={meshRef} castShadow receiveShadow>
          <boxGeometry args={material.size} />
          <meshStandardMaterial
            color={material.color}
            roughness={material.roughness}
            metalness={material.metalness}
            envMapIntensity={material.envMapIntensity}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
          <planeGeometry args={[3, 3]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={512}
            mixBlur={1}
            mixStrength={40}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#0a0a0a"
            metalness={0.5}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* ─── PARTICLES ─────────────────────────────────────────── */

function Particles() {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      key: i,
      x: (Math.random() - 0.5) * 16,
      y: (Math.random() - 0.5) * 8,
      z: (Math.random() - 0.5) * 10,
      speed: 0.02 + Math.random() * 0.03,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const p = particles[i];
      if (!p) return;
      const mesh = child as THREE.Mesh;
      mesh.position.y = p.y + ((t * p.speed + p.offset) % 10) - 5;
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((p) => (
        <mesh key={p.key} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[0.01, 4, 4]} />
          <meshBasicMaterial color="#e8e4de" transparent opacity={0.15} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── SCENE ─────────────────────────────────────────────── */

function Scene({ activeIndex }: { activeIndex: MotionValue<number> }) {
  const { camera } = useThree();
  useFrame(() => {
    const idx = Math.round(activeIndex.get());
    const targetX = idx >= 0 ? MATERIALS[idx].position[0] : 1;
    const diff = targetX - camera.position.x;
    if (Math.abs(diff) > 0.001) {
      camera.position.x += diff * 0.03;
    }
    camera.lookAt(targetX, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-3, 3, 2]} intensity={0.8} color="#ffeedd" />
      <pointLight position={[3, 2, -2]} intensity={0.5} color="#ddeeff" />
      {MATERIALS.map((mat, i) => (
        <Monolith key={mat.id} material={mat} index={i} activeIndex={activeIndex} />
      ))}
      <Particles />
      <Environment preset="studio" />
      <fog attach="fog" args={["#0a0a0a", 8, 25]} />
    </>
  );
}

/* ─── MAIN ──────────────────────────────────────────────── */

interface Act4Props {
  scrollProgress: MotionValue<number>;
  actStart: number;
  actEnd: number;
}

export default function Act4Materials({ scrollProgress, actStart, actEnd }: Act4Props) {
  const progress = useActProgress(scrollProgress, actStart, actEnd);
  const containerOpacity = useTransform(progress, [0, 0.01, 0.99, 1], [0, 1, 1, 0]);
  const contentOpacity = useTransform(progress, (v) => Math.max(0, (v - 0.05) / 0.15));

  // Active index derived from progress (no React re-render)
  const activeIndex = useTransform(progress, (v) => {
    const p = Math.min(Math.max(v, 0), 0.99);
    return Math.floor(p * MATERIALS.length);
  });

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden bg-void"
      style={{ opacity: containerOpacity }}
    >
      {/* ── 3D Canvas ── */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [1, 1, 8], fov: 45 }}
          shadows
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 1.5]}
          frameloop="demand"
          style={{ background: "#0a0a0a" }}
        >
          <Suspense fallback={null}>
            <Scene activeIndex={activeIndex} />
          </Suspense>
        </Canvas>
      </div>

      {/* ── Material labels ── */}
      <div className="absolute inset-0 z-[10] pointer-events-none">
        {MATERIALS.map((mat, i) => (
          <MaterialLabel key={mat.id} mat={mat} index={i} activeIndex={activeIndex} />
        ))}
      </div>

      {/* ── Content overlay ── */}
      <motion.div
        className="absolute inset-0 z-[20] flex flex-col justify-start pointer-events-none"
        style={{
          padding: "clamp(40px, 8vh, 100px) clamp(24px, 5vw, 72px)",
          opacity: contentOpacity,
        }}
      >
        <span className="font-body text-[0.55rem] font-[400] tracking-[0.2em] text-ember/60">
          MATERIALS
        </span>
        <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-[200] leading-[0.94] tracking-[-0.02em] text-linen mt-3 max-w-[400px]">
          Six surfaces.<br />Six physics.
        </h2>
        <p className="font-body text-[clamp(0.75rem,0.9vw,0.9rem)] font-[300] leading-[1.75] text-smoke/40 max-w-[360px] mt-6">
          Quartz reflects. Wood absorbs. Glass refracts.
          Metal scratches. Each material tells its own story through light.
        </p>
      </motion.div>

      {/* ── Vignette ── */}
      <div
        className="absolute inset-0 z-[15] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 20%, rgba(5,5,5,0.6) 100%)" }}
      />
    </motion.div>
  );
}

/* ─── MATERIAL LABEL ────────────────────────────────────── */

function MaterialLabel({ mat, index, activeIndex }: {
  mat: MaterialDef;
  index: number;
  activeIndex: MotionValue<number>;
}) {
  const isActive = useTransform(activeIndex, (v) => v === index);
  const opacity = useTransform(isActive, (v): number => v ? 1 : 0.2);
  const y = useTransform(isActive, (v): number => v ? -8 : 0);

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${10 + (index / (MATERIALS.length - 1)) * 80}%`,
        bottom: "clamp(60px, 12vh, 140px)",
        transform: "translateX(-50%)",
        opacity,
        y,
      }}
    >
      <motion.span
        className={`font-body text-[0.5rem] font-[400] tracking-[0.2em] transition-colors duration-500 ${
          "" // color handled by motion
        }`}
        style={{
          color: useTransform(isActive, (v): string => v ? "#c45a2c" : "rgba(245,240,235,0.3)"),
        }}
      >
        {mat.label}
      </motion.span>
    </motion.div>
  );
}
