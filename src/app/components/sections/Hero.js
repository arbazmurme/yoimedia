'use client';

import { useEffect, useState, useRef, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useThree } from '@react-three/fiber';
import { Stars, Preload, useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import dynamic from 'next/dynamic';
import MagneticButton from '../ui/MagneticButton';

if (typeof window !== 'undefined') {
  useGLTF.preload('/solar_system_animation.glb');
}

const SolarSystemModel = dynamic(() => import('../3d/SolarSystemModel'), { ssr: false });

/* ─── Service labels (positioned over canvas) ─── */
const SERVICE_LABELS = [
  { id: 'perf', title: 'Performance Marketing', sub: 'Data-driven campaigns', top: '16%', left: '30%', align: 'left', dotColor: '#f97316' },
  { id: 'web', title: 'Web Development', sub: 'Premium experiences', top: '8%', left: '58%', align: 'left', dotColor: '#0ea5e9' },
  { id: 'seo', title: 'SEO / AEO / GEO', sub: 'Search visibility', top: '30%', left: '93%', align: 'right', dotColor: '#22c55e' },
  { id: 'social', title: 'Social Media', sub: 'Community building', top: '50%', left: '95%', align: 'right', dotColor: '#8b5cf6' },
  { id: 'content', title: 'Content & Creative', sub: 'Strategic storytelling', top: '68%', left: '90%', align: 'right', dotColor: '#ec4899' },
  { id: 'lead', title: 'Lead Generation', sub: 'Funnels that convert', top: '82%', left: '74%', align: 'right', dotColor: '#06b6d4' },
  { id: 'ai', title: 'AI & Automation', sub: 'Intelligent systems', top: '85%', left: '40%', align: 'left', dotColor: '#f59e0b' },
  { id: 'brand', title: 'Branding & Positioning', sub: 'Identity that resonates', top: '70%', left: '22%', align: 'left', dotColor: '#ef4444' },
];

const STATS = [
  { value: '8', label: 'Services' },
  { value: '50+', label: 'Global Brands' },
  { value: '3×', label: 'Avg. Growth' },
];

/* ─── Word reveal ─── */
function WordReveal({ children, delay = 0 }) {
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
      <motion.span
        style={{ display: 'inline-block' }}
        initial={{ y: '110%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, delay, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ─── Floating label ─── */
function ServiceLabel({ label, index }) {
  const isRight = label.align === 'right';
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 2.0 + index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      style={{
        position: 'absolute',
        top: label.top,
        left: label.left,
        transform: isRight ? 'translateX(-100%)' : 'none',
        zIndex: 5,
        display: 'flex',
        alignItems: 'center',
        flexDirection: isRight ? 'row-reverse' : 'row',
        gap: '0.45rem',
        pointerEvents: 'none',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: 6, height: 6, borderRadius: '50%',
          background: label.dotColor,
          boxShadow: `0 0 8px ${label.dotColor}, 0 0 16px ${label.dotColor}60`,
        }} />
        <div style={{ width: 1, height: 20, background: `linear-gradient(180deg, ${label.dotColor}80, transparent)` }} />
      </div>
      <div style={{ textAlign: isRight ? 'right' : 'left' }}>
        <div style={{
          fontSize: '0.72rem', fontWeight: 700, color: '#f0f4ff',
          letterSpacing: '-0.01em', lineHeight: 1.2,
          textShadow: '0 2px 14px rgba(0,0,0,0.9)',
          fontFamily: "'Space Grotesk', sans-serif", whiteSpace: 'nowrap',
        }}>
          {label.title}
        </div>
        <div style={{
          fontSize: '0.6rem', color: 'rgba(240,244,255,0.5)',
          marginTop: 1, textShadow: '0 2px 10px rgba(0,0,0,0.9)', whiteSpace: 'nowrap',
        }}>
          {label.sub}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Planet info popup ─── */
function PlanetPopup({ info, onClose, onExplore }) {
  return (
    <AnimatePresence>
      {info && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          style={{
            position: 'absolute',
            bottom: '12%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 30,
            padding: '1.5rem 2rem',
            borderRadius: 16,
            border: `1px solid ${info.color}40`,
            background: 'rgba(4, 10, 22, 0.92)',
            backdropFilter: 'blur(24px)',
            minWidth: 280,
            textAlign: 'center',
            boxShadow: `0 0 40px ${info.color}20`,
            pointerEvents: 'auto',
          }}
        >
          {/* Top glow line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: `linear-gradient(90deg, transparent, ${info.color}, transparent)`,
            borderRadius: '16px 16px 0 0',
          }} />

          {/* Dot */}
          <div style={{
            width: 10, height: 10, borderRadius: '50%',
            background: info.color,
            boxShadow: `0 0 14px ${info.color}`,
            margin: '0 auto 0.75rem',
          }} />

          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1rem', fontWeight: 700,
            color: '#f0f4ff', letterSpacing: '-0.01em',
            marginBottom: '0.4rem',
          }}>
            {info.name}
          </h3>
          <p style={{
            fontSize: '0.82rem', color: 'rgba(240,244,255,0.5)',
            lineHeight: 1.6, marginBottom: '1rem',
          }}>
            {info.desc}
          </p>

          <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center' }}>
            <button
              onClick={() => {
                onClose();
                onExplore?.();
              }}
              style={{
                padding: '0.55rem 1.4rem', borderRadius: 100,
                background: `linear-gradient(135deg, ${info.color}, ${info.color}99)`,
                border: 'none', color: '#fff',
                fontSize: '0.8rem', fontWeight: 700,
                cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif",
                boxShadow: `0 0 20px ${info.color}40`,
              }}
            >
              Explore Service →
            </button>
            <button
              onClick={onClose}
              style={{
                padding: '0.55rem 1.2rem', borderRadius: 100,
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)',
                fontSize: '0.78rem', cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Hover tooltip ─── */
function HoverTooltip({ info }) {
  return (
    <AnimatePresence>
      {info && (
        <motion.div
          key={info.name}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute',
            top: '50%',
            right: '3%',
            transform: 'translateY(-50%)',
            zIndex: 8,
            padding: '0.6rem 1rem',
            borderRadius: 10,
            border: `1px solid ${info.color}40`,
            background: 'rgba(4,10,22,0.85)',
            backdropFilter: 'blur(16px)',
            pointerEvents: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: 7, height: 7, borderRadius: '50%',
              background: info.color, boxShadow: `0 0 8px ${info.color}`,
            }} />
            <span style={{
              fontSize: '0.78rem', fontWeight: 600, color: '#f0f4ff',
              fontFamily: "'Space Grotesk', sans-serif", whiteSpace: 'nowrap',
            }}>
              {info.name}
            </span>
          </div>
          <div style={{
            fontSize: '0.65rem', color: 'rgba(240,244,255,0.4)',
            marginTop: 2, paddingLeft: '1.2rem',
          }}>
            Click to explore
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Smart Mouse Wheel & Double-Click Zoom Controller ─── */
function MouseZoomHandler({ controlsRef, onScrollToNext }) {
  const { camera, gl } = useThree();

  useEffect(() => {
    const dom = gl.domElement;
    if (!dom) return;

    let lastScrollTime = 0;

    const onWheel = (e) => {
      if (!controlsRef.current) return;
      const controls = controlsRef.current;
      const target = controls.target;
      const dist = camera.position.distanceTo(target);

      // Trackpad pinch or Ctrl/Cmd + wheel always zooms
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const factor = e.deltaY < 0 ? 0.9 : 1.1;
        const newDist = dist * factor;
        if (newDist >= 4 && newDist <= 45) {
          camera.position.lerp(target, 1 - factor);
          controls.update();
        }
        return;
      }

      // Normal wheel UP: Zoom IN into the solar system
      if (e.deltaY < 0) {
        e.preventDefault();
        if (dist > 4.5) {
          camera.position.lerp(target, 0.12);
          controls.update();
        }
      } else if (e.deltaY > 0) {
        // Wheel DOWN:
        if (dist < 28) {
          // If zoomed in, zoom out back to full solar system view
          e.preventDefault();
          const dir = new THREE.Vector3().subVectors(camera.position, target).normalize();
          camera.position.addScaledVector(dir, 1.8);
          controls.update();
        } else {
          // Already at full solar system view -> smoothly scroll page to next section!
          const now = Date.now();
          if (now - lastScrollTime > 700) {
            lastScrollTime = now;
            onScrollToNext?.();
          }
        }
      }
    };

    // Double-click on canvas to zoom in
    const onDblClick = () => {
      if (!controlsRef.current) return;
      const controls = controlsRef.current;
      const target = controls.target;
      if (camera.position.distanceTo(target) > 8) {
        camera.position.lerp(target, 0.35);
        controls.update();
      }
    };

    dom.addEventListener('wheel', onWheel, { passive: false });
    dom.addEventListener('dblclick', onDblClick);
    return () => {
      dom.removeEventListener('wheel', onWheel);
      dom.removeEventListener('dblclick', onDblClick);
    };
  }, [camera, gl, controlsRef, onScrollToNext]);

  return null;
}

/* ════════════════════════════════════════
   MAIN HERO
   ════════════════════════════════════════ */
export default function Hero() {
  const controlsRef = useRef(null);
  const [clickedPlanet, setClickedPlanet] = useState(null);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);

  const scrollToServices = useCallback(() => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  }, []);

  const handleZoomIn = useCallback(() => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;
    const cam = controls.object;
    const target = controls.target;
    if (cam.position.distanceTo(target) > 5) {
      cam.position.lerp(target, 0.25);
      controls.update();
    }
  }, []);

  const handleZoomOut = useCallback(() => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;
    const cam = controls.object;
    const target = controls.target;
    if (cam.position.distanceTo(target) < 45) {
      const dir = new THREE.Vector3().subVectors(cam.position, target).normalize();
      cam.position.addScaledVector(dir, 4);
      controls.update();
    }
  }, []);

  const handleReset = useCallback(() => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;
    controls.target.set(0, 0, 0);
    controls.object.position.set(0, 12, 28);
    controls.object.zoom = 1;
    controls.object.updateProjectionMatrix();
    controls.update();
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        minHeight: 600,
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 62% 45%, #060d20 0%, #030609 55%, #020408 100%)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Grid */}
      <div className="grid-overlay" style={{ position: 'absolute', inset: 0, opacity: 0.3, zIndex: 1, pointerEvents: 'none' }} />

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 60% 50%, transparent 25%, rgba(2,4,8,0.55) 80%)',
      }} />

      {/* ══════════════════════════════════
          3D CANVAS — Fullscreen Universe (Under/Behind Left Content)
          ══════════════════════════════════ */}
      <div style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        cursor: 'grab',
      }}>
        <Canvas
          /* ── Camera positioned so full solar system is visible ── */
          camera={{ position: [0, 12, 28], fov: 50 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.25} color="#c0d0ff" />
            <directionalLight position={[8, 12, 6]} intensity={1.0} color="#fffbe8" />
            <directionalLight position={[-8, -6, -6]} intensity={0.3} color="#3311aa" />

            {/* Deep star field */}
            <Stars radius={100} depth={80} count={4000} factor={4} saturation={0.5} fade speed={0.3} />

            {/* GLB Solar System */}
            <SolarSystemModel
              onPlanetClick={setClickedPlanet}
              onPlanetHover={setHoveredPlanet}
            />

            {/* 3D Interactive Controls: Drag to Rotate & Slide */}
            <OrbitControls
              ref={controlsRef}
              makeDefault
              enableZoom={false}
              enablePan={true}
              enableRotate={true}
              enableDamping={true}
              dampingFactor={0.06}
              panSpeed={1.2}
              rotateSpeed={0.8}
            />

            {/* Mouse wheel & double-click zoom handler without blocking page scroll */}
            <MouseZoomHandler controlsRef={controlsRef} onScrollToNext={scrollToServices} />

            <Preload all />
          </Suspense>
        </Canvas>

        {/* Hover tooltip */}
        <HoverTooltip info={hoveredPlanet} />

        {/* Click popup */}
        <PlanetPopup
          info={clickedPlanet}
          onClose={() => setClickedPlanet(null)}
          onExplore={scrollToServices}
        />

        {/* ─── Bottom-Right Controls Dock: Mouse Zoom & Next Section ─── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            position: 'absolute',
            bottom: 'clamp(1.5rem, 3vw, 2.5rem)',
            right: 'clamp(1.5rem, 3vw, 2.5rem)',
            zIndex: 25,
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            pointerEvents: 'auto',
          }}
        >
          {/* Zoom Buttons for mouse click */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '0.32rem 0.45rem',
            borderRadius: 100,
            background: 'rgba(6, 13, 32, 0.85)',
            border: '1px solid rgba(14, 165, 233, 0.35)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.7), 0 0 20px rgba(14, 165, 233, 0.15)',
          }}>
            <button
              type="button"
              onClick={handleZoomIn}
              title="Zoom In (or Scroll Wheel Up)"
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.06)',
                color: '#f0f4ff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.95rem',
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
            >
              +
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              title="Zoom Out (or Scroll Wheel Down)"
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.06)',
                color: '#f0f4ff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.95rem',
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
            >
              −
            </button>
            <button
              type="button"
              onClick={handleReset}
              title="Reset Zoom & Camera View"
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.06)',
                color: 'rgba(240, 244, 255, 0.75)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                transition: 'all 0.2s',
              }}
            >
              ↺
            </button>
          </div>

          {/* Explore Services Scroll Button */}
          <motion.button
            onClick={scrollToServices}
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.72rem 1.35rem',
              borderRadius: 100,
              background: 'rgba(6, 13, 32, 0.85)',
              border: '1px solid rgba(14, 165, 233, 0.45)',
              backdropFilter: 'blur(16px)',
              color: '#f0f4ff',
              cursor: 'pointer',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.82rem',
              fontWeight: 600,
              boxShadow: '0 8px 32px rgba(0,0,0,0.7), 0 0 24px rgba(14, 165, 233, 0.25)',
              transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
            whileHover={{
              scale: 1.04,
              borderColor: '#0ea5e9',
              boxShadow: '0 8px 36px rgba(0,0,0,0.85), 0 0 35px rgba(14, 165, 233, 0.5)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#0ea5e9', boxShadow: '0 0 10px #0ea5e9',
            }} />
            <span>Explore Services</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'inline-block', fontSize: '0.9rem', color: '#0ea5e9', fontWeight: 700 }}
            >
              ↓
            </motion.span>
          </motion.button>
        </motion.div>
      </div>

      {/* ══════════════════════════════════
          LEFT CONTENT — Transparent floating text over 3D solar system
          ══════════════════════════════════ */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: 'min(46%, 600px)',
        paddingLeft: 'clamp(2rem, 5vw, 5rem)',
        paddingRight: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        background: 'transparent',
        pointerEvents: 'none',
      }}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            padding: '0.35rem 0.9rem', borderRadius: 100, width: 'fit-content',
            border: '1px solid rgba(14,165,233,0.3)',
            background: 'rgba(14,165,233,0.07)',
            backdropFilter: 'blur(8px)',
            pointerEvents: 'auto',
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#0ea5e9', boxShadow: '0 0 10px #0ea5e9', display: 'inline-block',
            }}
          />
          <span style={{
            fontSize: '0.63rem', letterSpacing: '0.22em', color: '#0ea5e9',
            fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif",
          }}>
            NAVIGATE THE YOI UNIVERSE
          </span>
        </motion.div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(2.2rem, 5vw, 6rem)',
          fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.95, margin: 0,
          textShadow: '0 4px 30px rgba(0,0,0,0.9), 0 0 50px rgba(0,0,0,0.8)',
        }}>
          <div>
            <WordReveal delay={0.5}>EXPLORE&nbsp;</WordReveal>
            <WordReveal delay={0.63}>THE</WordReveal>
          </div>
          <div style={{ marginTop: '0.08em' }}>
            <WordReveal delay={0.78}>
              <span style={{
                background: 'linear-gradient(120deg, #60c8ff 0%, #9b6eff 45%, #06d6f7 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                GALACTIC
              </span>
            </WordReveal>
          </div>
          <div style={{ marginTop: '0.04em' }}>
            <WordReveal delay={0.93}>
              <span style={{ color: '#f0f4ff' }}>MAP</span>
            </WordReveal>
          </div>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.22rem)',
            color: 'rgba(240,244,255,0.76)', fontWeight: 400, lineHeight: 1.3, margin: 0,
            fontFamily: "'Space Grotesk', sans-serif",
            textShadow: '0 2px 16px rgba(0,0,0,0.95)',
          }}
        >
          Navigate the Yoi Universe
        </motion.p>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{
            fontSize: 'clamp(0.8rem, 1.1vw, 0.93rem)',
            color: 'rgba(240,244,255,0.6)', lineHeight: 1.7, margin: 0, maxWidth: 420,
            textShadow: '0 2px 14px rgba(0,0,0,0.95)',
          }}
        >
          We engineer growth systems that help ambitious<br />businesses build, scale, and automate.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.35 }}
          style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap', alignItems: 'center', pointerEvents: 'auto' }}
        >
          <MagneticButton>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.78rem 1.7rem', borderRadius: 100,
              background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
              color: '#fff', fontSize: '0.84rem', fontWeight: 700,
              fontFamily: "'Space Grotesk', sans-serif",
              boxShadow: '0 0 40px rgba(14,165,233,0.4), 0 0 80px rgba(139,92,246,0.2)',
              whiteSpace: 'nowrap',
            }}>
              Schedule Strategy Call&nbsp;→
            </span>
          </MagneticButton>

          <MagneticButton onClick={scrollToServices}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.78rem 1.5rem', borderRadius: 100,
              border: '1px solid rgba(240,244,255,0.15)',
              color: 'rgba(240,244,255,0.7)',
              fontSize: '0.84rem', fontWeight: 500,
              fontFamily: "'Space Grotesk', sans-serif",
              background: 'rgba(255,255,255,0.03)', whiteSpace: 'nowrap',
            }}>
              Explore the Universe
            </span>
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          style={{
            display: 'flex', gap: '2rem',
            paddingTop: '0.5rem',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            width: 'fit-content',
            pointerEvents: 'auto',
          }}
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)',
                fontWeight: 700, letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                {s.value}
              </div>
              <div style={{
                fontSize: '0.62rem', color: 'rgba(240,244,255,0.45)',
                letterSpacing: '0.1em', marginTop: 2,
                textShadow: '0 2px 10px rgba(0,0,0,0.9)',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        onClick={scrollToServices}
        style={{
          position: 'absolute', bottom: 34,
          left: 'clamp(2rem, 5vw, 5rem)',
          zIndex: 12,
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          cursor: 'pointer',
          pointerEvents: 'auto',
        }}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          style={{
            width: 36, height: 36, borderRadius: '50%',
            border: '1px solid rgba(14,165,233,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(14,165,233,0.06)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2v8M2 7l4 4 4-4" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        <span style={{ fontSize: '0.62rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)' }}>
          SCROLL TO EXPLORE
        </span>
      </motion.div>

      {/* Mobile */}
      <style>{`
        @media (max-width: 768px) {
          #hero { flex-direction: column; justify-content: flex-end; padding-bottom: 4.5rem; }
          #hero > div:nth-child(4) { width: 100% !important; padding: 0 1.5rem !important; }
        }
      `}</style>
    </section>
  );
}
