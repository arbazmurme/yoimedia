'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion, useInView } from 'framer-motion';
import ParticleField from '../3d/ParticleField';
import MagneticButton from '../ui/MagneticButton';

function GlowingSphere() {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.3;
  });

  return (
    <Float speed={1} floatIntensity={0.5}>
      <Sphere ref={ref} args={[2.5, 64, 64]}>
        <MeshDistortMaterial
          color="#0ea5e9"
          distort={0.3}
          speed={1.5}
          roughness={0.05}
          metalness={0.9}
          emissive="#0369a1"
          emissiveIntensity={0.4}
          transparent
          opacity={0.85}
        />
      </Sphere>
      <Sphere args={[3.2, 32, 32]}>
        <meshPhysicalMaterial
          color="#8b5cf6"
          transparent
          opacity={0.1}
          wireframe={false}
        />
      </Sphere>
      <pointLight color="#0ea5e9" intensity={8} distance={20} />
      <pointLight color="#8b5cf6" intensity={4} distance={30} />
    </Float>
  );
}

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 50%, #060d18 0%, #020408 70%)',
      }}
    >
      {/* 3D canvas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.6 }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.1} />
            <Stars radius={60} depth={30} count={3000} factor={4} fade speed={0.5} />
            <ParticleField count={1000} color="#0ea5e9" spread={40} />
            <ParticleField count={500} color="#8b5cf6" spread={60} />
            <GlowingSphere />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(2,4,8,0.4) 0%, rgba(2,4,8,0.85) 70%)',
        zIndex: 1,
      }} />

      <div
        ref={ref}
        className="section-container"
        style={{ position: 'relative', zIndex: 2, width: '100%', textAlign: 'center', padding: '6rem 4rem' }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '3rem',
            padding: '0.4rem 1rem',
            borderRadius: 100,
            border: '1px solid rgba(14,165,233,0.2)',
            background: 'rgba(14,165,233,0.04)',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0ea5e9', boxShadow: '0 0 10px #0ea5e9', display: 'inline-block' }} />
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#0ea5e9', fontWeight: 500 }}>
            FINAL TRANSMISSION
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.5rem, 6vw, 7rem)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            marginBottom: '1.5rem',
            color: '#f0f4ff',
          }}
        >
          BUILD SOMETHING
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            THAT LASTS
          </span>
        </motion.h2>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
            color: 'rgba(240,244,255,0.45)',
            maxWidth: 600,
            margin: '0 auto 3rem',
            lineHeight: 1.7,
          }}
        >
          If you want clarity, control, and a growth system built to scale,
          let's build something that lasts.
        </motion.p>

        {/* Massive statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
          style={{ marginBottom: '4rem' }}
        >
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 4.5vw, 5rem)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            color: 'rgba(240,244,255,0.15)',
            lineHeight: 1,
          }}>
            Empires aren't promoted.
          </div>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 4.5vw, 5rem)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            color: '#f0f4ff',
            lineHeight: 1,
            marginTop: '0.25em',
          }}>
            They're built.
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <MagneticButton>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '1rem 2.5rem',
              borderRadius: 100,
              background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '0.02em',
              fontFamily: "'Space Grotesk', sans-serif",
              boxShadow: '0 0 60px rgba(14,165,233,0.3), 0 0 120px rgba(139,92,246,0.15)',
            }}>
              Schedule Strategy Call →
            </span>
          </MagneticButton>

          <MagneticButton>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '1rem 2.5rem',
              borderRadius: 100,
              border: '1px solid rgba(240,244,255,0.12)',
              color: 'rgba(240,244,255,0.6)',
              fontSize: '1rem',
              fontWeight: 500,
              fontFamily: "'Space Grotesk', sans-serif",
              background: 'rgba(255,255,255,0.02)',
            }}>
              Explore Yoi® Marketing
            </span>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
