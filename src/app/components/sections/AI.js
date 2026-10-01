'use client';

import { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { motion, useInView } from 'framer-motion';
import AIUniverse from '../3d/AIUniverse';
import MagneticButton from '../ui/MagneticButton';

const aiSystems = [
  {
    title: '24/7 Support Bots',
    type: 'AI Agents',
    desc: 'Automated customer support that sounds human and resolves problems instantly.',
    color: '#0ea5e9',
    icon: '◈',
  },
  {
    title: 'Lead Qualification',
    type: 'Automations',
    desc: 'Automatically vet and nurture leads before they ever reach your team.',
    color: '#8b5cf6',
    icon: '⬡',
  },
  {
    title: 'Sales Assistants',
    type: 'AI Agents',
    desc: 'E-commerce assistants that drive sales, cross-sells, and upsell products.',
    color: '#f59e0b',
    icon: '◎',
  },
  {
    title: 'Workflow Automation',
    type: 'Systems',
    desc: 'Connect your entire tool stack and automate repetitive business tasks at scale.',
    color: '#22c55e',
    icon: '⬢',
  },
];

function AICard({ system, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      data-cursor="hover"
      style={{
        padding: '2rem',
        borderRadius: 16,
        border: `1px solid ${system.color}20`,
        background: `linear-gradient(135deg, ${system.color}06 0%, rgba(2,4,8,0.9) 100%)`,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'none',
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        background: `linear-gradient(90deg, transparent, ${system.color}80, transparent)`,
      }} />

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem',
      }}>
        <span style={{
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          color: system.color,
          fontWeight: 600,
          padding: '0.25rem 0.7rem',
          borderRadius: 100,
          border: `1px solid ${system.color}30`,
          background: `${system.color}10`,
        }}>
          {system.type}
        </span>
        <span style={{
          fontSize: '1.6rem',
          color: system.color,
          textShadow: `0 0 20px ${system.color}`,
        }}>
          {system.icon}
        </span>
      </div>

      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '1.1rem',
        fontWeight: 600,
        letterSpacing: '-0.01em',
        color: '#f0f4ff',
        marginBottom: '0.75rem',
      }}>
        {system.title}
      </h3>
      <p style={{
        fontSize: '0.85rem',
        color: 'rgba(240,244,255,0.45)',
        lineHeight: 1.6,
      }}>
        {system.desc}
      </p>
    </motion.div>
  );
}

export default function AI() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="ai"
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '10rem 0',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #020408 0%, #060d18 50%, #020408 100%)',
      }}
    >
      {/* Neural network canvas */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        opacity: 0.5,
      }}>
        <Canvas
          camera={{ position: [0, 0, 12], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.2} />
            <Stars radius={50} depth={20} count={1500} factor={3} fade speed={0.3} />
            <AIUniverse />
          </Suspense>
        </Canvas>
      </div>

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <div ref={ref}>
          {/* Header */}
          <div style={{ marginBottom: '4rem', maxWidth: 700 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                color: '#f59e0b',
                marginBottom: '1.5rem',
                fontWeight: 600,
              }}
            >
              SECTION 08
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2.5rem, 5.5vw, 6rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                marginBottom: '1.5rem',
                color: '#f0f4ff',
              }}
            >
              AI &
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #f59e0b, #0ea5e9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                AUTOMATIONS
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                fontSize: '1.1rem',
                color: 'rgba(240,244,255,0.45)',
                lineHeight: 1.6,
              }}
            >
              Build systems that work while you sleep.
            </motion.p>
          </div>

          {/* AI cards grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.25rem',
            marginBottom: '3rem',
          }}>
            {aiSystems.map((system, i) => (
              <AICard key={system.title} system={system} index={i} />
            ))}
          </div>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
            }}
          >
            <MagneticButton>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.9rem 2.2rem',
                borderRadius: 100,
                background: 'linear-gradient(135deg, #f59e0b, #0ea5e9)',
                color: '#000',
                fontSize: '0.9rem',
                fontWeight: 700,
                letterSpacing: '0.02em',
                fontFamily: "'Space Grotesk', sans-serif",
              }}>
                Explore AI & Automation →
              </span>
            </MagneticButton>

            <span style={{
              fontSize: '0.85rem',
              color: 'rgba(240,244,255,0.35)',
              lineHeight: 1.5,
            }}>
              Have a custom request?{' '}
              <span style={{ color: '#0ea5e9', fontWeight: 500 }}>
                Our team is ready to analyze your universe.
              </span>
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
