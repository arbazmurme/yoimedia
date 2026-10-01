'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const principles = [
  {
    number: '01',
    title: 'Strategy before execution',
    desc: 'Every campaign, funnel, and system is designed with a clear roadmap before a single dollar is spent.',
    color: '#0ea5e9',
  },
  {
    number: '02',
    title: 'Systems before speed',
    desc: 'We build for compounding returns. Sustainable infrastructure beats fast-and-fragile tactics.',
    color: '#8b5cf6',
  },
  {
    number: '03',
    title: 'Long-term leverage over short-term tactics',
    desc: 'We align incentives. Our success is measured by your growth, not your monthly spend.',
    color: '#f59e0b',
  },
];

export default function Approach() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="approach"
      style={{
        position: 'relative',
        padding: '10rem 0',
        overflow: 'hidden',
        background: '#020408',
      }}
    >
      {/* Decorative lines */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.1) 30%, rgba(14,165,233,0.1) 70%, transparent)',
        pointerEvents: 'none',
      }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <div ref={ref}>
          {/* Header */}
          <div style={{ marginBottom: '5rem' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                color: '#0ea5e9',
                marginBottom: '1.5rem',
                fontWeight: 600,
              }}
            >
              SECTION 04
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                marginBottom: '1.5rem',
                color: '#f0f4ff',
              }}
            >
              OUR
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                APPROACH
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                color: 'rgba(240,244,255,0.5)',
                maxWidth: 600,
              }}
            >
              We don't behave like a typical digital marketing agency.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                fontWeight: 600,
                color: '#f0f4ff',
                letterSpacing: '-0.02em',
                marginTop: '0.5rem',
              }}
            >
              We operate as a growth partner.
            </motion.p>
          </div>

          {/* Principles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '6rem' }}>
            {principles.map((p, i) => (
              <motion.div
                key={p.number}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.12, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '2.5rem',
                  padding: '2rem 2.5rem',
                  borderRadius: 16,
                  border: `1px solid ${p.color}15`,
                  background: `${p.color}04`,
                  cursor: 'none',
                  transition: 'all 0.3s ease',
                }}
                whileHover={{
                  borderColor: `${p.color}40`,
                  background: `${p.color}08`,
                  x: 8,
                }}
                data-cursor="hover"
              >
                {/* Number */}
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '3rem',
                  fontWeight: 700,
                  color: p.color,
                  opacity: 0.2,
                  lineHeight: 1,
                  flexShrink: 0,
                  letterSpacing: '-0.04em',
                }}>
                  {p.number}
                </span>

                {/* Content */}
                <div>
                  <h3 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(1rem, 1.8vw, 1.4rem)',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    color: '#f0f4ff',
                    marginBottom: '0.5rem',
                  }}>
                    {p.title}
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    color: 'rgba(240,244,255,0.45)',
                    lineHeight: 1.6,
                    maxWidth: 500,
                  }}>
                    {p.desc}
                  </p>
                </div>

                {/* Accent dot */}
                <div style={{
                  marginLeft: 'auto',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: p.color,
                  flexShrink: 0,
                  boxShadow: `0 0 12px ${p.color}`,
                  alignSelf: 'center',
                }} />
              </motion.div>
            ))}
          </div>

          {/* Final statement */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{
              textAlign: 'center',
              padding: '4rem',
              borderRadius: 24,
              border: '1px solid rgba(14,165,233,0.1)',
              background: 'rgba(6,13,24,0.5)',
              backdropFilter: 'blur(20px)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background: 'linear-gradient(90deg, transparent, #0ea5e9, #8b5cf6, transparent)',
            }} />

            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: '#f0f4ff',
              lineHeight: 1.4,
            }}>
              Marketing is not an expense.
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                It's infrastructure.
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
