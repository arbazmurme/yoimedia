'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const phases = [
  {
    id: '01',
    title: 'BUILD',
    color: '#0ea5e9',
    icon: '⬡',
    desc: 'Build high-conversion websites, brand positioning, and growth foundations that outlast trends.',
    items: ['Brand Positioning', 'Web Architecture', 'Conversion Design', 'Growth Foundation'],
  },
  {
    id: '02',
    title: 'SCALE',
    color: '#8b5cf6',
    icon: '◎',
    desc: 'Scale demand using performance marketing, paid ads, SEO, and data-driven strategy.',
    items: ['Paid Advertising', 'SEO / AEO / GEO', 'Content Strategy', 'Analytics & CRO'],
  },
  {
    id: '03',
    title: 'AUTOMATE',
    color: '#f59e0b',
    icon: '⬢',
    desc: 'Automate marketing and operations with AI-powered workflows that work 24/7.',
    items: ['AI Agents', 'Lead Qualification', 'Workflow Automation', 'Sales Systems'],
  },
];

function PhaseCard({ phase, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      style={{
        flex: 1,
        padding: '3rem 2.5rem',
        borderRadius: 24,
        border: `1px solid ${phase.color}20`,
        background: `linear-gradient(135deg, ${phase.color}06 0%, rgba(2,4,8,0.8) 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top border glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: `linear-gradient(90deg, transparent, ${phase.color}, transparent)`,
      }} />

      {/* Phase number */}
      <div style={{
        fontSize: '0.65rem',
        letterSpacing: '0.25em',
        color: phase.color,
        marginBottom: '1.5rem',
        fontWeight: 600,
        opacity: 0.7,
      }}>
        PHASE {phase.id}
      </div>

      {/* Icon + title row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1.5rem',
      }}>
        <span style={{
          fontSize: '2.5rem',
          color: phase.color,
          textShadow: `0 0 20px ${phase.color}`,
          lineHeight: 1,
        }}>
          {phase.icon}
        </span>
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          color: '#f0f4ff',
          lineHeight: 1,
        }}>
          {phase.title}
        </h3>
      </div>

      {/* Description */}
      <p style={{
        fontSize: '0.9rem',
        color: 'rgba(240,244,255,0.5)',
        lineHeight: 1.7,
        marginBottom: '2rem',
      }}>
        {phase.desc}
      </p>

      {/* Items */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {phase.items.map((item) => (
          <li key={item} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.82rem',
            color: 'rgba(240,244,255,0.6)',
          }}>
            <span style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: phase.color,
              flexShrink: 0,
              boxShadow: `0 0 6px ${phase.color}`,
            }} />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function BuildScaleAutomate() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="methodology"
      style={{
        position: 'relative',
        padding: '10rem 0',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #020408 0%, #040c1c 50%, #020408 100%)',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw',
        height: '60vh',
        background: 'radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div ref={ref} style={{ marginBottom: '5rem', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.3em',
              color: '#8b5cf6',
              marginBottom: '1.5rem',
              fontWeight: 600,
            }}
          >
            SECTION 03
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.5rem, 5vw, 5.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              marginBottom: '1.5rem',
              color: '#f0f4ff',
            }}
          >
            HOW WE{' '}
            <span style={{
              background: 'linear-gradient(135deg, #8b5cf6, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              BUILD EMPIRES
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: '1rem',
              color: 'rgba(240,244,255,0.4)',
            }}
          >
            One operating system. Three stages.
          </motion.p>
        </div>

        {/* Phase cards */}
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}>
          {phases.map((phase, i) => (
            <PhaseCard key={phase.id} phase={phase} index={i} />
          ))}
        </div>

        {/* Final statement */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
          style={{
            textAlign: 'center',
            marginTop: '6rem',
          }}
        >
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2rem, 4.5vw, 4.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            color: '#f0f4ff',
          }}>
            Growth should compound.
          </div>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.5rem, 3vw, 3rem)',
            fontWeight: 500,
            letterSpacing: '-0.03em',
            color: 'rgba(240,244,255,0.3)',
            marginTop: '0.5rem',
          }}>
            If it doesn't, it's built wrong.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
