'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const positions = [
  { title: 'Senior AI Engineer', dept: 'Engineering', color: '#f59e0b', desc: 'Build the next generation of marketing AI agents.' },
  { title: 'Performance Marketer', dept: 'Marketing', color: '#0ea5e9', desc: 'Manage high-budget ad campaigns and optimize ROAS.' },
  { title: 'React / Next.js Developer', dept: 'Engineering', color: '#8b5cf6', desc: 'Craft stunning 3D interactive web experiences.' },
  { title: 'SEO Strategist', dept: 'Marketing', color: '#22c55e', desc: 'Lead organic growth for international clients.' },
  { title: 'Content Creator', dept: 'Creative', color: '#ec4899', desc: 'Produce engaging video and text content across platforms.' },
  { title: 'Graphic Designer', dept: 'Creative', color: '#06b6d4', desc: 'Create stunning visual assets for modern brands.' },
  { title: 'Digital Sales Specialist', dept: 'Sales', color: '#f97316', desc: 'Drive growth by connecting with potential clients.' },
];

const deptColors = {
  Engineering: '#f59e0b',
  Marketing: '#0ea5e9',
  Creative: '#ec4899',
  Sales: '#f97316',
};

export default function Careers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="careers"
      style={{
        position: 'relative',
        padding: '10rem 0',
        overflow: 'hidden',
        background: '#020408',
      }}
    >
      {/* Cosmic background glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '-10%',
        width: '50vw',
        height: '50vh',
        background: 'radial-gradient(ellipse, rgba(245,158,11,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <div ref={ref}>
          {/* Header */}
          <div style={{ marginBottom: '4rem' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: '#f59e0b', marginBottom: '1.5rem', fontWeight: 600 }}
            >
              SECTION 09
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
                marginBottom: '1rem',
                color: '#f0f4ff',
              }}
            >
              JOIN THE
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                CREW
              </span>
            </motion.h2>
          </div>

          {/* Positions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '3rem' }}>
            {positions.map((pos, i) => (
              <motion.div
                key={pos.title}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.07, ease: [0.23, 1, 0.32, 1] }}
                data-cursor="hover"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.5rem 2rem',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.05)',
                  background: 'rgba(255,255,255,0.01)',
                  cursor: 'none',
                  transition: 'all 0.3s ease',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
                whileHover={{
                  borderColor: `${pos.color}30`,
                  background: `${pos.color}05`,
                  x: 6,
                }}
              >
                {/* Left */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: `${pos.color}15`,
                    border: `1px solid ${pos.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <div style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: pos.color,
                      boxShadow: `0 0 8px ${pos.color}`,
                    }} />
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#f0f4ff',
                      letterSpacing: '-0.01em',
                    }}>
                      {pos.title}
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: 'rgba(240,244,255,0.4)', marginTop: 2 }}>
                      {pos.desc}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.1em',
                    color: deptColors[pos.dept],
                    padding: '0.25rem 0.8rem',
                    borderRadius: 100,
                    border: `1px solid ${deptColors[pos.dept]}30`,
                    background: `${deptColors[pos.dept]}10`,
                    fontWeight: 600,
                  }}>
                    {pos.dept}
                  </span>
                  <span style={{ color: 'rgba(240,244,255,0.2)', fontSize: '0.9rem' }}>→</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '2rem',
            }}
          >
            <p style={{
              fontSize: '0.95rem',
              color: 'rgba(240,244,255,0.4)',
              maxWidth: 500,
              lineHeight: 1.6,
            }}>
              Don't see your perfect orbit?{' '}
              <span style={{ color: '#f59e0b' }}>We're always looking for cosmic talent.</span>
            </p>

            <a
              href="#"
              data-cursor="cta"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.9rem 2rem',
                borderRadius: 100,
                background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                color: '#000',
                fontSize: '0.9rem',
                fontWeight: 700,
                textDecoration: 'none',
                cursor: 'none',
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: '0.02em',
              }}
            >
              View Open Positions →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
