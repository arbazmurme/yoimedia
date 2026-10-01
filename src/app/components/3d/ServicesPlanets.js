'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Float, MeshDistortMaterial, Torus } from '@react-three/drei';
import * as THREE from 'three';

const PLANET_COLORS = [
  { primary: '#f97316', secondary: '#fed7aa', glow: '#f97316' },
  { primary: '#0ea5e9', secondary: '#bae6fd', glow: '#0ea5e9' },
  { primary: '#22c55e', secondary: '#bbf7d0', glow: '#22c55e' },
  { primary: '#8b5cf6', secondary: '#ddd6fe', glow: '#8b5cf6' },
  { primary: '#ec4899', secondary: '#fce7f3', glow: '#ec4899' },
  { primary: '#06b6d4', secondary: '#cffafe', glow: '#06b6d4' },
  { primary: '#f59e0b', secondary: '#fef3c7', glow: '#f59e0b' },
  { primary: '#ef4444', secondary: '#fecaca', glow: '#ef4444' },
];

function Planet({ position, color, size = 0.5, distort = 0.2, speed = 0.8, label, isHovered, onHover }) {
  const ref = useRef();
  const ringRef = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.005;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    
    const scale = isHovered ? 1.4 : 1;
    ref.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);

    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01;
      ringRef.current.material.opacity = isHovered ? 0.8 : 0.3;
    }
  });

  return (
    <group position={position}>
      {/* Glow sphere */}
      <mesh>
        <sphereGeometry args={[size * 1.6, 16, 16]} />
        <meshBasicMaterial
          color={color.primary}
          transparent
          opacity={isHovered ? 0.15 : 0.06}
          depthWrite={false}
        />
      </mesh>

      {/* Planet body */}
      <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.4}>
        <Sphere
          ref={ref}
          args={[size, 32, 32]}
          onPointerEnter={() => onHover(true)}
          onPointerLeave={() => onHover(false)}
        >
          <MeshDistortMaterial
            color={color.primary}
            distort={distort}
            speed={2}
            roughness={0.3}
            metalness={0.7}
            emissive={color.primary}
            emissiveIntensity={isHovered ? 0.8 : 0.3}
          />
        </Sphere>
      </Float>

      {/* Orbital ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[size * 1.8, 0.01, 4, 60]} />
        <meshBasicMaterial color={color.secondary} transparent opacity={0.3} />
      </mesh>

      {/* Point light */}
      {isHovered && <pointLight color={color.glow} intensity={5} distance={8} />}
      <pointLight color={color.glow} intensity={1} distance={4} />
    </group>
  );
}

export default function ServicesPlanets() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const groupRef = useRef();

  const planets = [
    { label: 'Performance Marketing', angle: 0, radius: 5, size: 0.55, color: PLANET_COLORS[0] },
    { label: 'Web Development', angle: Math.PI * 0.25, radius: 6.5, size: 0.45, color: PLANET_COLORS[1] },
    { label: 'SEO / AEO / GEO', angle: Math.PI * 0.5, radius: 5.5, size: 0.5, color: PLANET_COLORS[2] },
    { label: 'Social Media', angle: Math.PI * 0.75, radius: 7, size: 0.4, color: PLANET_COLORS[3] },
    { label: 'Content & Creative', angle: Math.PI, radius: 5, size: 0.5, color: PLANET_COLORS[4] },
    { label: 'Lead Generation', angle: Math.PI * 1.25, radius: 6, size: 0.45, color: PLANET_COLORS[5] },
    { label: 'AI & Automation', angle: Math.PI * 1.5, radius: 5.5, size: 0.6, color: PLANET_COLORS[6] },
    { label: 'Branding', angle: Math.PI * 1.75, radius: 6.5, size: 0.45, color: PLANET_COLORS[7] },
  ];

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <group ref={groupRef}>
      {planets.map((planet, i) => {
        const x = Math.cos(planet.angle) * planet.radius;
        const z = Math.sin(planet.angle) * planet.radius;
        const y = Math.sin(planet.angle * 2) * 1.5;

        return (
          <Planet
            key={i}
            position={[x, y, z]}
            color={planet.color}
            size={planet.size}
            distort={0.2 + i * 0.02}
            speed={0.6 + i * 0.1}
            label={planet.label}
            isHovered={hoveredIndex === i}
            onHover={(state) => setHoveredIndex(state ? i : null)}
          />
        );
      })}
    </group>
  );
}
