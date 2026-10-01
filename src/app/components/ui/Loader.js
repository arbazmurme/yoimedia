'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('brand'); // brand, init, loading, done
  const intervalRef = useRef(null);

  useEffect(() => {
    // Show brand name first
    const t1 = setTimeout(() => setPhase('init'), 800);
    const t2 = setTimeout(() => setPhase('loading'), 1400);

    // Progress animation
    const t3 = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(intervalRef.current);
            setTimeout(() => {
              setPhase('done');
              setTimeout(onComplete, 600);
            }, 300);
            return 100;
          }
          const increment = prev < 70 ? Math.random() * 4 + 1 : Math.random() * 1.5 + 0.5;
          return Math.min(prev + increment, 100);
        });
      }, 50);
    }, 1600);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onComplete]);

  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
    color: ['#0ea5e9', '#8b5cf6', '#06b6d4', '#f59e0b'][Math.floor(Math.random() * 4)],
  }));

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="loader-screen"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, #040b14 0%, #020408 100%)',
          }}
        >
          {/* Background particles */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            {particles.map((p) => (
              <motion.div
                key={p.id}
                style={{
                  position: 'absolute',
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                  borderRadius: '50%',
                  background: p.color,
                  boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [0, -60, -120],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>

          {/* Rotating abstract ring */}
          <div style={{ position: 'absolute', opacity: 0.15 }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{
                width: 300,
                height: 300,
                border: '1px solid #0ea5e9',
                borderRadius: '50%',
                borderTopColor: 'transparent',
              }}
            />
          </div>
          <div style={{ position: 'absolute', opacity: 0.1 }}>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              style={{
                width: 420,
                height: 420,
                border: '1px solid #8b5cf6',
                borderRadius: '50%',
                borderBottomColor: 'transparent',
              }}
            />
          </div>

          {/* Main content */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(3rem, 8vw, 5rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: 'none',
                lineHeight: 1,
              }}>
                Yoi®
              </div>
            </motion.div>

            {/* Status text */}
            <AnimatePresence mode="wait">
              {phase === 'init' && (
                <motion.div
                  key="init"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    marginTop: 12,
                    fontSize: '0.7rem',
                    letterSpacing: '0.3em',
                    color: '#8892b0',
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  INITIALIZING UNIVERSE...
                </motion.div>
              )}
              {phase === 'loading' && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    marginTop: 12,
                    fontSize: '0.7rem',
                    letterSpacing: '0.3em',
                    color: '#8892b0',
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  INITIALIZING UNIVERSE...
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress bar */}
            {(phase === 'loading' || phase === 'done') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{ marginTop: 40 }}
              >
                {/* Bar */}
                <div style={{
                  width: 240,
                  height: 1,
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}>
                  <motion.div
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #0ea5e9, #8b5cf6)',
                      boxShadow: '0 0 12px #0ea5e9',
                    }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: 'linear', duration: 0.1 }}
                  />
                </div>

                {/* Percentage */}
                <div style={{
                  marginTop: 12,
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  color: 'rgba(255,255,255,0.3)',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>
                  {Math.floor(progress)}%
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
