'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';

export default function Brands() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="brands"
      style={{
        position: 'relative',
        padding: '10rem 0',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #040c1c 0%, #020408 100%)',
      }}
    >
      {/* Large glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70vw',
        height: '70vh',
        background: 'radial-gradient(ellipse, rgba(14,165,233,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <div ref={ref}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              style={{ fontSize: '0.7rem', letterSpacing: '0.3em', color: '#0ea5e9', marginBottom: '1.5rem', fontWeight: 600 }}
            >
              SECTION 06
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
                color: '#f0f4ff',
              }}
            >
              OUR{' '}
              <span style={{
                background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                BRANDS
              </span>
            </motion.h2>
          </div>

          {/* Main brand card */}
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{
              maxWidth: 800,
              margin: '0 auto',
              padding: '4rem',
              borderRadius: 32,
              border: '1px solid rgba(14,165,233,0.15)',
              background: 'rgba(6,13,24,0.7)',
              backdropFilter: 'blur(30px)',
              position: 'relative',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            {/* Decorative lines */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background: 'linear-gradient(90deg, transparent, #0ea5e9, #8b5cf6, transparent)',
            }} />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 1,
              background: 'linear-gradient(90deg, transparent, #0ea5e9, #8b5cf6, transparent)',
              opacity: 0.3,
            }} />

            {/* Animated brand logo */}
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 30px rgba(14,165,233,0.3)',
                  '0 0 60px rgba(139,92,246,0.4)',
                  '0 0 30px rgba(14,165,233,0.3)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 100,
                height: 100,
                borderRadius: '50%',
                border: '1px solid rgba(14,165,233,0.3)',
                background: 'rgba(14,165,233,0.08)',
                marginBottom: '2rem',
              }}
            >
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '2rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Yoi®
              </span>
            </motion.div>

            <h3 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(1.8rem, 3vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: '#f0f4ff',
              marginBottom: '1.5rem',
            }}>
              Yoi® Marketing
            </h3>

            <p style={{
              fontSize: '1rem',
              color: 'rgba(240,244,255,0.5)',
              lineHeight: 1.7,
              maxWidth: 600,
              margin: '0 auto 2.5rem',
            }}>
              Premium digital advertising, performance marketing, search engine visibility (SEO/GEO/AEO),
              and high-performance lead acquisition systems engineered for global brands.
            </p>

            <MagneticButton>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.9rem 2rem',
                borderRadius: 100,
                background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.02em',
                fontFamily: "'Space Grotesk', sans-serif",
                boxShadow: '0 0 40px rgba(14,165,233,0.25)',
              }}>
                Explore Brand →
              </span>
            </MagneticButton>

            {/* Orbital decorations */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 280,
                height: 280,
                border: '1px solid rgba(14,165,233,0.07)',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 380,
                height: 380,
                border: '1px dashed rgba(139,92,246,0.07)',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
