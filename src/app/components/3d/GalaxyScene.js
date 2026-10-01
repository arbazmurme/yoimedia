'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import {
  OrbitalRing,
  GlowPlanet,
  EnergyArc,
  NebulaSprite,
} from './PlanetPrimitives';
import ParticleField from './ParticleField';

/* ─── Central "Yoi Core" planet ─── */
function YoiCorePlanet({ mouseX, mouseY }) {
  const coreRef  = useRef();
  const outerRef = useRef();
  const groupRef = useRef();
  const innerGlowRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current)  coreRef.current.rotation.y  = t * 0.18;
    if (outerRef.current) outerRef.current.rotation.y = -t * 0.1;
    if (innerGlowRef.current) {
      const s = 1 + Math.sin(t * 1.5) * 0.04;
      innerGlowRef.current.scale.setScalar(s);
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += (mouseX * 0.4 - groupRef.current.rotation.y) * 0.04;
      groupRef.current.rotation.x += (mouseY * 0.2 - groupRef.current.rotation.x) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Deep black core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.55, 64, 64]} />
        <MeshDistortMaterial
          color="#080e1a"
          distort={0.18}
          speed={1.2}
          roughness={0.1}
          metalness={1}
          emissive="#0a1a2e"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Glowing electric atmosphere — thin outer shell */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[1.72, 32, 32]} />
        <meshPhysicalMaterial
          color="#00aaff"
          transparent opacity={0.08}
          roughness={0}
          metalness={1}
          emissive="#0ea5e9"
          emissiveIntensity={0.5}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Pulsing inner glow halo */}
      <mesh ref={innerGlowRef}>
        <sphereGeometry args={[1.9, 16, 16]} />
        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.04} depthWrite={false} side={THREE.BackSide} />
      </mesh>

      {/* Three concentric orbital rings (like image) */}
      <OrbitalRing radius={2.4}  color="#00ccff" opacity={0.7} tiltX={0.25}  tiltZ={0.1}  />
      <OrbitalRing radius={3.0}  color="#9b59ff" opacity={0.55} tiltX={-0.4} tiltZ={0.35} />
      <OrbitalRing radius={3.7}  color="#ff6b35" opacity={0.45} tiltX={0.5}  tiltZ={-0.2} />
      <OrbitalRing radius={4.5}  color="#00e5ff" opacity={0.35} tiltX={-0.15} tiltZ={0.6} />
      <OrbitalRing radius={5.4}  color="#bf5fff" opacity={0.28} tiltX={0.3}  tiltZ={-0.5} />

      {/* Moving energy orbs on rings */}
      <EnergyArc radius={2.4} color="#00ccff" speed={0.9}  offset={0} />
      <EnergyArc radius={3.0} color="#9b59ff" speed={-0.6} offset={1.5} />
      <EnergyArc radius={3.7} color="#ff8c42" speed={0.7}  offset={3.2} />
      <EnergyArc radius={4.5} color="#00e5ff" speed={-0.5} offset={0.8} />

      {/* Core lights */}
      <pointLight color="#0ea5e9" intensity={8}  distance={20} />
      <pointLight color="#8b5cf6" intensity={4}  distance={30} />
    </group>
  );
}

/* ─── Planet definitions — matching image colors exactly ─── */
const PLANETS = [
  // (top-left area) Performance Marketing — Red/orange
  {
    radius: 0.42, color: '#ff3333', glowColor: '#ff6666',
    orbitRadius: 6.2, orbitSpeed: 0.28, orbitOffset: Math.PI * 0.08,
    orbitTiltX: 0.3, orbitTiltZ: 0.1,
    emissiveIntensity: 1.2, hasRing: false,
  },
  // (top) Web Development — Blue
  {
    radius: 0.35, color: '#1a7fff', glowColor: '#5ab4ff',
    orbitRadius: 7.4, orbitSpeed: 0.22, orbitOffset: Math.PI * 0.28,
    orbitTiltX: -0.2, orbitTiltZ: 0.15,
    emissiveIntensity: 1.0, hasRing: false,
  },
  // (right) SEO — Green
  {
    radius: 0.38, color: '#00cc66', glowColor: '#33ff99',
    orbitRadius: 8.0, orbitSpeed: 0.19, orbitOffset: Math.PI * 0.52,
    orbitTiltX: 0.15, orbitTiltZ: -0.25,
    emissiveIntensity: 1.1, hasRing: true, ringColor: '#00ff88',
  },
  // (right) Social Media — Purple/violet
  {
    radius: 0.48, color: '#9933ff', glowColor: '#cc88ff',
    orbitRadius: 5.8, orbitSpeed: 0.35, orbitOffset: Math.PI * 0.72,
    orbitTiltX: -0.5, orbitTiltZ: 0.3,
    emissiveIntensity: 1.3, hasRing: true, ringColor: '#bb77ff',
  },
  // (bottom-right) Content & Creative — Cyan/teal
  {
    radius: 0.36, color: '#00ccdd', glowColor: '#55eeff',
    orbitRadius: 7.0, orbitSpeed: 0.25, orbitOffset: Math.PI * 0.88,
    orbitTiltX: 0.4, orbitTiltZ: 0.2,
    emissiveIntensity: 1.0, hasRing: false,
  },
  // (bottom) Lead Generation — Orange/gold
  {
    radius: 0.44, color: '#ff8800', glowColor: '#ffcc44',
    orbitRadius: 6.5, orbitSpeed: 0.31, orbitOffset: Math.PI * 1.1,
    orbitTiltX: -0.3, orbitTiltZ: -0.4,
    emissiveIntensity: 1.2, hasRing: false,
  },
  // (bottom-left) AI & Automation — Yellow/amber
  {
    radius: 0.52, color: '#ddaa00', glowColor: '#ffcc00',
    orbitRadius: 5.4, orbitSpeed: 0.38, orbitOffset: Math.PI * 1.35,
    orbitTiltX: 0.6, orbitTiltZ: -0.2,
    emissiveIntensity: 1.4, hasRing: true, ringColor: '#ffdd55',
  },
  // (left) Branding — Pink/magenta
  {
    radius: 0.39, color: '#ff44aa', glowColor: '#ff88cc',
    orbitRadius: 7.8, orbitSpeed: 0.21, orbitOffset: Math.PI * 1.65,
    orbitTiltX: -0.25, orbitTiltZ: 0.5,
    emissiveIntensity: 1.1, hasRing: false,
  },
];

/* ─── Main scene ─── */
export default function GalaxyScene({ mouseX = 0, mouseY = 0 }) {
  const sceneGroupRef = useRef();

  // Very gentle slow auto-rotation of whole scene
  useFrame((state) => {
    if (sceneGroupRef.current) {
      sceneGroupRef.current.rotation.y += 0.0008;
    }
  });

  return (
    <group ref={sceneGroupRef}>
      {/* ── Cosmic nebula background clouds ── */}
      <NebulaSprite position={[-12, 4,  -18]} color="#0033aa" size={14} opacity={0.07} />
      <NebulaSprite position={[ 14, -3, -22]} color="#6600bb" size={12} opacity={0.06} />
      <NebulaSprite position={[ 0,  8,  -25]} color="#003366" size={16} opacity={0.05} />
      <NebulaSprite position={[-8, -6,  -15]} color="#330066" size={10} opacity={0.06} />

      {/* ── Star particles ── */}
      <ParticleField count={2000} color="#6699cc" spread={90} />
      <ParticleField count={600}  color="#9966ff" spread={70} />
      <ParticleField count={400}  color="#ff6644" spread={80} />

      {/* ── Scene ambient ── */}
      <ambientLight intensity={0.12} color="#1a2a4a" />
      <directionalLight position={[6, 8, 4]}  intensity={0.8}  color="#a0d0ff" />
      <directionalLight position={[-8, -4, -6]} intensity={0.4} color="#6633cc" />

      {/* ── Central Yoi Core ── */}
      <YoiCorePlanet mouseX={mouseX} mouseY={mouseY} />

      {/* ── 8 orbiting service planets ── */}
      {PLANETS.map((p, i) => (
        <GlowPlanet key={i} {...p} />
      ))}
    </group>
  );
}
