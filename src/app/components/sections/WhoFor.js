'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';

const founders = [
  'Building for the long term',
  'Want predictable, scalable growth',
  'Need marketing systems that hold as the business grows',
  'Are tired of agencies that disappear after the onboarding call',
  'Want a true growth partner, not a vendor',
];

export default function WhoFor() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="who"
      style={{
        position: 'relative',
        padding: '10rem 0',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #020408 0%, #040c1c 100%)',
      }}
    >
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '20%',
        width: '60vw',
        height: '60vh',
        background: 'radial-gradient(ellipse, rgba(6,182,212,0.04) 0%, transparent 70%)',
        transform: 'translate(-50%,-50%)',
        pointerEvents: 'none',
      }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <div ref={ref}>
          {/* Header */}
          <div style={{ marginBottom: '4rem', maxWidth: 800 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: '#06b6d4', marginBottom: '1.5rem', fontWeight: 600 }}
            >
              SECTION 05
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2rem, 4.5vw, 5rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                marginBottom: '1.5rem',
                color: '#f0f4ff',
              }}
            >
              WHO YOI®{' '}
              <span style={{
                background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                MARKETING
              </span>
              <br />
              IS FOR
            </motion.h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center',
          }}>
            {/* Left */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                  fontSize: '1rem',
                  color: 'rgba(240,244,255,0.5)',
                  marginBottom: '2rem',
                }}
              >
                We work with founders who:
              </motion.p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {founders.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      padding: '1rem 1.5rem',
                      borderRadius: 12,
                      border: '1px solid rgba(6,182,212,0.1)',
                      background: 'rgba(6,182,212,0.03)',
                    }}
                  >
                    <span style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#06b6d4',
                      boxShadow: '0 0 8px #06b6d4',
                      flexShrink: 0,
                      marginTop: 6,
                    }} />
                    <span style={{
                      fontSize: '0.9rem',
                      color: 'rgba(240,244,255,0.7)',
                      lineHeight: 1.5,
                    }}>
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <div style={{
                padding: '3.5rem',
                borderRadius: 24,
                border: '1px solid rgba(6,182,212,0.12)',
                background: 'rgba(6,182,212,0.04)',
                backdropFilter: 'blur(20px)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 1,
                  background: 'linear-gradient(90deg, transparent, #06b6d4, transparent)',
                }} />

                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.2,
                  color: '#f0f4ff',
                  marginBottom: '2rem',
                }}>
                  If you're looking for shortcuts,{' '}
                  <span style={{
                    background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    we won't align.
                  </span>
                </div>

                <p style={{
                  fontSize: '0.9rem',
                  color: 'rgba(240,244,255,0.4)',
                  lineHeight: 1.7,
                  marginBottom: '2rem',
                }}>
                  We operate with deep conviction that marketing is a long-game. We build systems, not campaigns.
                </p>

                <MagneticButton>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.8rem 1.8rem',
                    borderRadius: 100,
                    border: '1px solid rgba(6,182,212,0.4)',
                    color: '#06b6d4',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    fontFamily: "'Space Grotesk', sans-serif",
                    background: 'rgba(6,182,212,0.06)',
                  }}>
                    Schedule Strategy Call →
                  </span>
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #who .section-container > div > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
