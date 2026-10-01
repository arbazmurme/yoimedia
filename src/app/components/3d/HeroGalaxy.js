'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import GrowthCore from './GrowthCore';
import ParticleField from './ParticleField';
import * as THREE from 'three';

function CameraRig({ mouseX, mouseY, scrollY }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 10));

  useFrame(() => {
    targetPos.current.x += (mouseX * 2 - targetPos.current.x) * 0.05;
    targetPos.current.y += (-mouseY * 1.5 - targetPos.current.y) * 0.05;
    const z = 10 - scrollY * 0.01;
    targetPos.current.z += (Math.max(z, 4) - targetPos.current.z) * 0.05;
    camera.position.lerp(targetPos.current, 0.08);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function NebulaCloud({ position, color }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z += 0.001;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[3, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.04} depthWrite={false} />
    </mesh>
  );
}

export default function HeroGalaxy({ mouseX = 0, mouseY = 0, scrollY = 0 }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} color="#0ea5e9" />
          <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#8b5cf6" />

          {/* Star field */}
          <Stars
            radius={80}
            depth={50}
            count={4000}
            factor={4}
            saturation={0.5}
            fade
            speed={0.5}
          />

          {/* Particle systems */}
          <ParticleField count={1500} color="#0ea5e9" spread={60} />
          <ParticleField count={800} color="#8b5cf6" spread={80} />

          {/* Nebula clouds */}
          <NebulaCloud position={[-8, 3, -10]} color="#0ea5e9" />
          <NebulaCloud position={[8, -4, -15]} color="#8b5cf6" />
          <NebulaCloud position={[0, 6, -20]} color="#06b6d4" />

          {/* Central Growth Core */}
          <GrowthCore mouseX={mouseX} mouseY={mouseY} />

          {/* Camera control */}
          <CameraRig mouseX={mouseX} mouseY={mouseY} scrollY={scrollY} />
        </Suspense>
      </Canvas>
    </div>
  );
}
