'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function StatItem({ value, label, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      style={{ textAlign: 'center' }}
    >
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
        fontWeight: 700,
        letterSpacing: '-0.04em',
        background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '0.8rem',
        color: 'rgba(240,244,255,0.4)',
        letterSpacing: '0.1em',
        marginTop: 4,
      }}>
        {label}
      </div>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      style={{
        position: 'relative',
        padding: '10rem 0',
        overflow: 'hidden',
        background: '#020408',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        height: '80vh',
        background: 'radial-gradient(ellipse, rgba(14,165,233,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '6rem',
            alignItems: 'center',
          }}
        >
          {/* Left column */}
          <div>
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
              SECTION 02
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2.5rem, 4vw, 4.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                marginBottom: '2.5rem',
                color: '#f0f4ff',
              }}
            >
              INSIDE
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                YOI®
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                fontSize: '1rem',
                color: 'rgba(240,244,255,0.5)',
                lineHeight: 1.8,
                marginBottom: '1.5rem',
              }}
            >
              Yoi® Media is a Hyderabad-based digital marketing and AI growth company,
              operating under the brand Yoi® Marketing.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                fontSize: '1rem',
                color: 'rgba(240,244,255,0.5)',
                lineHeight: 1.8,
              }}
            >
              We help founders and businesses build scalable growth systems designed for the long run.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '2rem',
                marginTop: '3rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <StatItem value="150+" label="BRANDS SCALED" delay={0.6} />
              <StatItem value="8+" label="YEARS BUILDING" delay={0.7} />
              <StatItem value="3×" label="AVG GROWTH" delay={0.8} />
            </motion.div>
          </div>

          {/* Right column — large statement */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              style={{
                padding: '3rem',
                borderRadius: 24,
                border: '1px solid rgba(14,165,233,0.1)',
                background: 'rgba(6,13,24,0.6)',
                backdropFilter: 'blur(20px)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top glow line */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                background: 'linear-gradient(90deg, transparent, #0ea5e9, transparent)',
              }} />

              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
                color: '#f0f4ff',
                marginBottom: '1.5rem',
              }}>
                We don't run random campaigns.
              </div>

              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1.1,
              }}>
                We engineer growth.
              </div>

              <div style={{
                marginTop: '2rem',
                padding: '1rem 1.5rem',
                borderRadius: 12,
                background: 'rgba(14,165,233,0.06)',
                border: '1px solid rgba(14,165,233,0.12)',
                fontSize: '0.85rem',
                color: 'rgba(240,244,255,0.5)',
                lineHeight: 1.6,
              }}>
                <span style={{ color: '#0ea5e9', fontWeight: 600 }}>BUILD. SCALE. AUTOMATE.</span>
                {' '}— Our core philosophy isn't a slogan. It's a system.
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .section-container > div {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
