"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "motion/react";

/* ─── ACT 4: MATERIALS ──────────────────────────────────── */
/* Six floating monoliths. Each reacts to light differently.  */

interface MaterialDef {
  id: string;
  label: string;
  color: string;
  roughness: number;
  metalness: number;
  envMapIntensity: number;
  position: [number, number, number];
}

const MATERIALS: MaterialDef[] = [
  { id: "quartz", label: "QUARTZ", color: "#e8e4de", roughness: 0.15, metalness: 0.0, envMapIntensity: 1.5, position: [-4, 0, 0] },
  { id: "granite", label: "GRANITE", color: "#3a3530", roughness: 0.7, metalness: 0.0, envMapIntensity: 0.5, position: [-2, 0, 0] },
  { id: "laminate", label: "LAMINATE", color: "#8a7560", roughness: 0.5, metalness: 0.0, envMapIntensity: 0.8, position: [0, 0, 0] },
  { id: "acrylic", label: "ACRYLIC", color: "#f5f0eb", roughness: 0.05, metalness: 0.1, envMapIntensity: 2.0, position: [2, 0, 0] },
  { id: "brass", label: "BRASS", color: "#b87333", roughness: 0.25, metalness: 0.9, envMapIntensity: 1.8, position: [4, 0, 0] },
  { id: "glass", label: "GLASS", color: "#a8c8d8", roughness: 0.0, metalness: 0.0, envMapIntensity: 2.5, position: [6, 0, 0] },
];

/* ─── MONOLITH ──────────────────────────────────────────── */

function Monolith({ material, index, activeIndex }: {
  material: MaterialDef;
  index: number;
  activeIndex: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isActive = activeIndex === index;
  const isNearActive = Math.abs(activeIndex - index) <= 1;

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Subtle rotation
    meshRef.current.rotation.y = Math.sin(t * 0.3 + index * 0.5) * 0.1;
    meshRef.current.rotation.x = Math.cos(t * 0.2 + index * 0.3) * 0.05;

    // Active monolith rises
    const targetY = isActive ? 0.5 : isNearActive ? 0 : -0.3;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={material.position}>
        {/* Main monolith */}
        <mesh ref={meshRef} castShadow receiveShadow>
          <boxGeometry args={[1.2, 2.4, 0.8]} />
          <meshStandardMaterial
            color={material.color}
            roughness={material.roughness}
            metalness={material.metalness}
            envMapIntensity={material.envMapIntensity}
          />
        </mesh>

        {/* Ground reflection */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
          <planeGeometry args={[3, 3]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={1024}
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

        {/* Label */}
        {isActive && (
          <group position={[0, -1.6, 0]}>
            <mesh>
              <planeGeometry args={[1.2, 0.15]} />
              <meshBasicMaterial color="#c45a2c" transparent opacity={0.3} />
            </mesh>
          </group>
        )}
      </group>
    </Float>
  );
}

/* ─── SCENE ─────────────────────────────────────────────── */

function Scene({ activeIndex }: { activeIndex: number }) {
  const { camera } = useThree();

  useFrame(() => {
    // Camera tracks active monolith
    const targetX = activeIndex >= 0 ? MATERIALS[activeIndex].position[0] : 1;
    camera.position.x += (targetX - camera.position.x) * 0.03;
    camera.lookAt(targetX, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-3, 3, 2]} intensity={0.8} color="#ffeedd" />
      <pointLight position={[3, 2, -2]} intensity={0.5} color="#ddeeff" />

      {MATERIALS.map((mat, i) => (
        <Monolith key={mat.id} material={mat} index={i} activeIndex={activeIndex} />
      ))}

      <Environment preset="studio" />
      <fog attach="fog" args={["#0a0a0a", 8, 25]} />
    </>
  );
}

/* ─── MAIN ──────────────────────────────────────────────── */

export default function Act4Materials({ progress }: { progress: number }) {
  const activeIndex = useMemo(() => {
    const p = Math.min(Math.max(progress, 0), 0.99);
    return Math.floor(p * MATERIALS.length);
  }, [progress]);

  const contentOpacity = Math.max(0, (progress - 0.05) / 0.15);

  return (
    <div className="absolute inset-0 overflow-hidden bg-void">
      {/* ── 3D Canvas ── */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [1, 1, 8], fov: 45 }}
          shadows
          gl={{ antialias: true, alpha: false }}
          style={{ background: "#0a0a0a" }}
        >
          <Suspense fallback={null}>
            <Scene activeIndex={activeIndex} />
          </Suspense>
        </Canvas>
      </div>

      {/* ── Material labels ── */}
      <div className="absolute inset-0 z-[10] pointer-events-none">
        {MATERIALS.map((mat, i) => {
          const isActive = i === activeIndex;
          return (
            <motion.div
              key={mat.id}
              className="absolute"
              style={{
                left: `${10 + (i / (MATERIALS.length - 1)) * 80}%`,
                bottom: "clamp(60px, 12vh, 140px)",
                transform: "translateX(-50%)",
              }}
              animate={{
                opacity: isActive ? 1 : 0.2,
                y: isActive ? -8 : 0,
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className={`font-body text-[0.5rem] font-[400] tracking-[0.2em] transition-colors duration-500 ${
                  isActive ? "text-ember" : "text-linen/30"
                }`}
              >
                {mat.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* ── Content overlay ── */}
      <div
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
      </div>

      {/* ── Vignette ── */}
      <div
        className="absolute inset-0 z-[15] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 20%, rgba(5,5,5,0.6) 100%)",
        }}
      />
    </div>
  );
}
