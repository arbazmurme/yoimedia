'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

// Service info for each planet (by mesh index order in GLB)
const PLANET_INFO = [
  { name: 'Performance Marketing', desc: 'Data-driven campaigns engineered for max ROI.', color: '#f97316' },
  { name: 'Web Development',       desc: 'Premium digital experiences built to convert.',  color: '#0ea5e9' },
  { name: 'SEO / AEO / GEO',       desc: 'Search visibility across all modern platforms.', color: '#22c55e' },
  { name: 'Social Media',          desc: 'Community building and organic growth at scale.',color: '#8b5cf6' },
  { name: 'Content & Creative',    desc: 'Strategic storytelling that moves people.',       color: '#ec4899' },
  { name: 'Lead Generation',       desc: 'High-conversion funnels that turn attention into revenue.', color: '#06b6d4' },
  { name: 'AI & Automation',       desc: 'Intelligent systems that scale without headcount.',color: '#f59e0b' },
  { name: 'Branding & Positioning',desc: 'Identity systems that resonate and differentiate.',color: '#ef4444' },
];

export default function SolarSystemModel({
  mouseX = 0,
  mouseY = 0,
  onPlanetClick,   // callback(info) from Hero
  onPlanetHover,   // callback(info | null)
}) {
  const groupRef = useRef();
  const { scene, animations } = useGLTF('/solar_system_animation.glb');
  const { actions, mixer } = useAnimations(animations, groupRef);
  const { camera } = useThree();

  // ── Play all embedded animations ──
  useEffect(() => {
    if (!actions) return;
    Object.values(actions).forEach((action) => {
      if (action) {
        action.reset();
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.timeScale = 0.6;
        action.play();
      }
    });
    return () => { if (mixer) mixer.stopAllAction(); };
  }, [actions, mixer]);

  // ── Collect clickable planet meshes (all except the Sun/largest) ──
  const planetMeshes = useRef([]);
  useEffect(() => {
    if (!scene) return;
    const meshes = [];
    scene.traverse((child) => {
      if (child.isMesh) {
        child.userData.originalEmissive = child.material?.emissive?.clone?.() ?? new THREE.Color(0, 0, 0);
        meshes.push(child);
      }
    });
    // Sort by bounding sphere radius — sun is largest, planets are smaller
    meshes.sort((a, b) => {
      const ra = a.geometry?.boundingSphere?.radius ?? 0;
      const rb = b.geometry?.boundingSphere?.radius ?? 0;
      return ra - rb;
    });
    // Keep only smaller meshes as interactive planets (skip sun = last)
    planetMeshes.current = meshes.slice(0, Math.min(meshes.length - 1, 8));
  }, [scene]);

  // ── Pointer handlers ──
  const handlePointerOver = useCallback((e) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
    const mesh = e.object;
    const idx  = planetMeshes.current.indexOf(mesh);
    const info = PLANET_INFO[idx] ?? PLANET_INFO[0];
    // Highlight glow
    if (mesh.material?.emissive) {
      mesh.material.emissive.set(info.color);
      mesh.material.emissiveIntensity = 1.5;
    }
    onPlanetHover?.(info);
  }, [onPlanetHover]);

  const handlePointerOut = useCallback((e) => {
    e.stopPropagation();
    document.body.style.cursor = 'none';
    const mesh = e.object;
    if (mesh.material?.emissive && mesh.userData.originalEmissive) {
      mesh.material.emissive.copy(mesh.userData.originalEmissive);
      mesh.material.emissiveIntensity = 0.5;
    }
    onPlanetHover?.(null);
  }, [onPlanetHover]);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    // Do not trigger click popup if user was dragging / sliding / rotating
    if (e.delta && e.delta > 5) return;
    const mesh = e.object;
    const idx  = planetMeshes.current.indexOf(mesh);
    const info = PLANET_INFO[idx] ?? PLANET_INFO[0];
    onPlanetClick?.(info);
  }, [onPlanetClick]);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Scale down so full system fits in view */}
      <group scale={0.18}>
        <primitive
          object={scene}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={handleClick}
        />
      </group>
      {/* Subtle scene lights */}
      <pointLight color="#ffbb44" intensity={4}  distance={40} position={[0, 0, 0]} />
      <pointLight color="#0ea5e9" intensity={2}  distance={50} position={[8, 4, -8]} />
    </group>
  );
}

SolarSystemModel.preload = () => useGLTF.preload('/solar_system_animation.glb');
