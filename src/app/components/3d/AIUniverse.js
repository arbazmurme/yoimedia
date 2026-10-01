'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

function NeuralConnection({ start, end, color, opacity = 0.4 }) {
  const ref = useRef();
  const points = [
    new THREE.Vector3(...start),
    new THREE.Vector3(
      (start[0] + end[0]) / 2 + (Math.random() - 0.5) * 2,
      (start[1] + end[1]) / 2 + (Math.random() - 0.5) * 2,
      (start[2] + end[2]) / 2
    ),
    new THREE.Vector3(...end),
  ];
  
  const curve = new THREE.QuadraticBezierCurve3(...points);
  const curvePoints = curve.getPoints(30);
  const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.material.opacity = opacity + Math.sin(state.clock.elapsedTime * 2) * 0.15;
  });

  return (
    <line ref={ref} geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </line>
  );
}

function NeuralNode({ position, color, size = 0.15, pulse = true }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current || !pulse) return;
    const s = 1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.3;
    ref.current.scale.setScalar(s);
  });

  return (
    <Float speed={1} floatIntensity={0.3}>
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color={color} />
        <pointLight color={color} intensity={3} distance={3} />
      </mesh>
    </Float>
  );
}

export default function AIUniverse() {
  const groupRef = useRef();
  
  const nodes = useMemo(() => [
    { pos: [0, 0, 0], color: '#f59e0b', size: 0.4, pulse: true },
    { pos: [3, 2, 0], color: '#0ea5e9', size: 0.2 },
    { pos: [-3, 1.5, 0], color: '#8b5cf6', size: 0.2 },
    { pos: [0, -3, 0], color: '#06b6d4', size: 0.2 },
    { pos: [2, -2, 1], color: '#22c55e', size: 0.18 },
    { pos: [-2, -2, 1], color: '#ec4899', size: 0.18 },
    { pos: [4, 0, 0], color: '#0ea5e9', size: 0.14 },
    { pos: [-4, 0, 0], color: '#8b5cf6', size: 0.14 },
    { pos: [1.5, 3.5, 0], color: '#06b6d4', size: 0.14 },
    { pos: [-1.5, 3.5, 0], color: '#f59e0b', size: 0.14 },
    { pos: [5, 2, 0], color: '#22c55e', size: 0.12 },
    { pos: [-5, -1, 0], color: '#ec4899', size: 0.12 },
  ], []);

  const connections = useMemo(() => [
    { from: 0, to: 1, color: '#0ea5e9' },
    { from: 0, to: 2, color: '#8b5cf6' },
    { from: 0, to: 3, color: '#06b6d4' },
    { from: 0, to: 4, color: '#22c55e' },
    { from: 0, to: 5, color: '#ec4899' },
    { from: 1, to: 6, color: '#0ea5e9' },
    { from: 2, to: 7, color: '#8b5cf6' },
    { from: 1, to: 8, color: '#06b6d4' },
    { from: 2, to: 9, color: '#f59e0b' },
    { from: 1, to: 4, color: '#22c55e' },
    { from: 2, to: 5, color: '#ec4899' },
    { from: 6, to: 10, color: '#0ea5e9' },
    { from: 7, to: 11, color: '#8b5cf6' },
    { from: 3, to: 4, color: '#06b6d4' },
    { from: 3, to: 5, color: '#22c55e' },
  ], []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.2;
  });

  return (
    <group ref={groupRef}>
      {connections.map((conn, i) => (
        <NeuralConnection
          key={i}
          start={nodes[conn.from].pos}
          end={nodes[conn.to].pos}
          color={conn.color}
          opacity={0.3}
        />
      ))}
      {nodes.map((node, i) => (
        <NeuralNode key={i} position={node.pos} color={node.color} size={node.size} pulse={node.pulse} />
      ))}

      {/* Central rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.01, 4, 80]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.8, 0.008, 4, 80]} />
        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}
