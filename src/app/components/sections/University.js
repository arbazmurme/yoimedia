'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const uniCourses = [
  { id: '01', title: 'Website Development', desc: 'WordPress, Shopify, and fully coded custom web applications.', color: '#0ea5e9', icon: '⬡' },
  { id: '02', title: 'Performance Marketing', desc: 'Master Google Ads, Meta Ads, and LinkedIn advertising.', color: '#f97316', icon: '◈' },
  { id: '03', title: 'SEO, GEO & AEO', desc: 'Search visibility optimization for all modern platforms.', color: '#22c55e', icon: '◎' },
  { id: '04', title: 'AI & Automation', desc: 'Scale output without scaling headcount using agentic AI.', color: '#f59e0b', icon: '⬢' },
  { id: '05', title: 'Brand Building', desc: 'Premium brand creation and positioning strategies.', color: '#8b5cf6', icon: '✦' },
  { id: '06', title: 'Digital Sales', desc: 'Structured, scalable sales systems for high growth.', color: '#06b6d4', icon: '❋' },
];

export default function University() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="university"
      style={{
        position: 'relative',
        padding: '10rem 0',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #020408 0%, #04080f 100%)',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80vw',
        height: '40vh',
        background: 'radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <div ref={ref}>
          {/* Header */}
          <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: '#8b5cf6', marginBottom: '1.5rem', fontWeight: 600 }}
            >
              SECTION 07
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
              YOI®{' '}
              <span style={{
                background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                UNIVERSITY
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontSize: '1rem', color: 'rgba(240,244,255,0.4)' }}
            >
              Build the skills. Build the future.
            </motion.p>
          </div>

          {/* Courses grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.25rem',
            marginBottom: '3rem',
          }}>
            {uniCourses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                data-cursor="hover"
                style={{
                  padding: '2.5rem 2rem',
                  borderRadius: 16,
                  border: `1px solid ${course.color}15`,
                  background: `${course.color}05`,
                  cursor: 'none',
                  transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                whileHover={{
                  y: -6,
                  borderColor: `${course.color}40`,
                  background: `${course.color}08`,
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 1,
                  background: `linear-gradient(90deg, transparent, ${course.color}60, transparent)`,
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: course.color, fontWeight: 600, opacity: 0.7 }}>
                    ORBIT {course.id}
                  </span>
                  <span style={{
                    fontSize: '1.8rem',
                    color: course.color,
                    textShadow: `0 0 20px ${course.color}`,
                  }}>
                    {course.icon}
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
                  {course.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(240,244,255,0.45)', lineHeight: 1.6 }}>
                  {course.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ textAlign: 'center' }}
          >
            <a
              href="#"
              data-cursor="cta"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.9rem 2.5rem',
                borderRadius: 100,
                border: '1px solid rgba(139,92,246,0.4)',
                color: '#8b5cf6',
                fontSize: '0.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                background: 'rgba(139,92,246,0.06)',
                cursor: 'none',
                letterSpacing: '0.02em',
                fontFamily: "'Space Grotesk', sans-serif",
                transition: 'all 0.3s ease',
              }}
            >
              Learn More →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
