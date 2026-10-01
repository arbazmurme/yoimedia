'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── Glowing orbital ring ─── */
export function OrbitalRing({ radius, color, opacity = 0.6, tiltX = 0, tiltZ = 0, dashed = false }) {
  const points = useMemo(() => {
    const pts = [];
    const segments = dashed ? 120 : 180;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius, dashed]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints(points);
    return g;
  }, [points]);

  return (
    <group rotation={[tiltX, 0, tiltZ]}>
      <line geometry={geometry}>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={opacity}
          linewidth={1}
        />
      </line>
      {/* Glow duplicate — slightly thicker, more transparent */}
      <line geometry={geometry}>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={opacity * 0.35}
          linewidth={3}
        />
      </line>
    </group>
  );
}

/* ─── Glowing planet sphere ─── */
export function GlowPlanet({
  position,
  radius = 0.4,
  color,
  glowColor,
  emissiveIntensity = 0.8,
  orbitRadius,
  orbitSpeed,
  orbitOffset = 0,
  orbitTiltX = 0,
  orbitTiltZ = 0,
  hasRing = false,
  ringColor,
  distort = false,
}) {
  const groupRef = useRef();
  const meshRef  = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * orbitSpeed + orbitOffset;
    if (!groupRef.current) return;

    // Orbit in tilted plane
    const x = Math.cos(t) * orbitRadius;
    const z = Math.sin(t) * orbitRadius;
    // Apply tilt via rotation matrix manually
    groupRef.current.position.set(
      x * Math.cos(orbitTiltZ) - 0 * Math.sin(orbitTiltZ),
      x * Math.sin(orbitTiltX) + z * Math.sin(orbitTiltX),
      z * Math.cos(orbitTiltX)
    );

    // Self-rotation
    if (meshRef.current) meshRef.current.rotation.y += 0.008;
  });

  return (
    <group ref={groupRef}>
      {/* Outer glow sphere */}
      <mesh>
        <sphereGeometry args={[radius * 2.2, 16, 16]} />
        <meshBasicMaterial
          color={glowColor || color}
          transparent
          opacity={0.07}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[radius * 1.55, 16, 16]} />
        <meshBasicMaterial
          color={glowColor || color}
          transparent
          opacity={0.12}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Planet body */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshStandardMaterial
          color={color}
          emissive={glowColor || color}
          emissiveIntensity={emissiveIntensity}
          roughness={0.25}
          metalness={0.7}
        />
      </mesh>

      {/* Saturn-style ring (optional) */}
      {hasRing && (
        <mesh rotation={[Math.PI / 3.5, 0, 0.3]}>
          <torusGeometry args={[radius * 1.7, radius * 0.12, 3, 80]} />
          <meshBasicMaterial color={ringColor || color} transparent opacity={0.55} />
        </mesh>
      )}

      {/* Point light from planet */}
      <pointLight color={glowColor || color} intensity={2.5} distance={6} />
    </group>
  );
}

/* ─── Energy arc / lightning trail ─── */
export function EnergyArc({ radius, color, speed = 0.5, offset = 0 }) {
  const ref = useRef();
  const dotRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset;
    if (dotRef.current) {
      dotRef.current.position.set(Math.cos(t) * radius, Math.sin(t * 0.4) * 0.5, Math.sin(t) * radius);
    }
  });

  return (
    <group ref={ref}>
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color={color} />
        <pointLight color={color} intensity={4} distance={4} />
      </mesh>
    </group>
  );
}

/* ─── Volumetric nebula cloud (billboard sprite) ─── */
export function NebulaSprite({ position, color, size = 8, opacity = 0.06 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z += 0.0005;
      ref.current.rotation.y += 0.0003;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} side={THREE.BackSide} />
    </mesh>
  );
}
