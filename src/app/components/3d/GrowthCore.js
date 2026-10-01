'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Torus, Float } from '@react-three/drei';
import * as THREE from 'three';

function OrbitalRing({ radius, color, speed, tiltX = 0, tiltZ = 0 }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z += speed * 0.005;
  });
  return (
    <mesh ref={ref} rotation={[tiltX, 0, tiltZ]}>
      <torusGeometry args={[radius, 0.008, 2, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  );
}

function OrbitingDot({ orbitRadius, color, speed, offset = 0 }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.x = Math.cos(t) * orbitRadius;
    ref.current.position.z = Math.sin(t) * orbitRadius;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.06, 8, 8]} />
      <meshBasicMaterial color={color} />
      <pointLight color={color} intensity={2} distance={3} />
    </mesh>
  );
}

export default function GrowthCore({ mouseX = 0, mouseY = 0 }) {
  const coreRef = useRef();
  const outerRef = useRef();
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.3;
      coreRef.current.rotation.x = Math.sin(t * 0.2) * 0.2;
    }
    if (outerRef.current) {
      outerRef.current.rotation.y = -t * 0.2;
      outerRef.current.rotation.z = t * 0.15;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += (mouseX * 0.5 - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (mouseY * 0.3 - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Inner Core */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <Sphere ref={coreRef} args={[1.2, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#0ea5e9"
            distort={0.35}
            speed={2}
            roughness={0.1}
            metalness={0.9}
            emissive="#0369a1"
            emissiveIntensity={0.5}
          />
        </Sphere>
      </Float>

      {/* Outer shell */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshPhysicalMaterial
          color="#8b5cf6"
          transparent
          opacity={0.15}
          roughness={0}
          metalness={0.8}
          wireframe={false}
        />
      </mesh>

      {/* Energy rings */}
      <OrbitalRing radius={2.2} color="#0ea5e9" speed={1} tiltX={0.3} />
      <OrbitalRing radius={2.8} color="#8b5cf6" speed={-0.7} tiltX={-0.5} tiltZ={0.4} />
      <OrbitalRing radius={3.4} color="#06b6d4" speed={0.5} tiltZ={0.8} />

      {/* Orbiting dots */}
      <OrbitingDot orbitRadius={2.2} color="#0ea5e9" speed={0.8} />
      <OrbitingDot orbitRadius={2.8} color="#8b5cf6" speed={-0.6} offset={Math.PI} />
      <OrbitingDot orbitRadius={3.4} color="#06b6d4" speed={0.4} offset={Math.PI * 0.5} />

      {/* Ambient light from core */}
      <pointLight position={[0, 0, 0]} color="#0ea5e9" intensity={4} distance={15} />
      <pointLight position={[0, 0, 0]} color="#8b5cf6" intensity={2} distance={20} />
    </group>
  );
}
