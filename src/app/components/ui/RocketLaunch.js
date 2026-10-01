'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RocketLaunch({ trigger = true, onComplete }) {
  const [phase, setPhase] = useState('idle'); // 'idle' | 'igniting' | 'launching' | 'finished'

  useEffect(() => {
    if (!trigger) return;

    // Small delay so site is visible
    const timerIgnite = setTimeout(() => {
      setPhase('igniting');
    }, 150);

    const timerLaunch = setTimeout(() => {
      setPhase('launching');
    }, 550);

    const timerFinish = setTimeout(() => {
      setPhase('finished');
      if (onComplete) onComplete();
    }, 3200);

    return () => {
      clearTimeout(timerIgnite);
      clearTimeout(timerLaunch);
      clearTimeout(timerFinish);
    };
  }, [trigger, onComplete]);

  if (phase === 'finished' || phase === 'idle') return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {/* Ambient launch light flare across the bottom */}
      <AnimatePresence>
        {(phase === 'igniting' || phase === 'launching') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: phase === 'launching' ? [0.6, 0.9, 0] : [0.3, 0.7, 0.4],
              scale: phase === 'launching' ? [1, 1.8, 2] : 1,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: phase === 'launching' ? 1.6 : 0.4, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              bottom: '-10%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80vw',
              height: '350px',
              background: 'radial-gradient(ellipse at 50% 100%, rgba(249, 115, 22, 0.35) 0%, rgba(14, 165, 233, 0.18) 40%, transparent 75%)',
              filter: 'blur(30px)',
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* Supersonic shockwave ring as rocket accelerates */}
      {phase === 'launching' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.1, y: '50vh', x: '-50%' }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.2, 2.8],
            y: ['60vh', '50vh'],
          }}
          transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            left: '50%',
            top: 0,
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            border: '2px solid rgba(14, 165, 233, 0.7)',
            boxShadow: '0 0 35px rgba(14, 165, 233, 0.6), inset 0 0 25px rgba(249, 115, 22, 0.4)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Main Rocket Assembly */}
      <motion.div
        initial={{
          x: '-50%',
          y: '108vh',
          scale: 0.9,
        }}
        animate={
          phase === 'igniting'
            ? {
                x: ['-50%', '-50.7%', '-49.3%', '-50.5%', '-49.5%', '-50%'],
                y: '94vh',
                scale: 0.95,
                transition: {
                  duration: 0.4,
                  ease: 'easeInOut',
                  repeat: 1,
                },
              }
            : phase === 'launching'
            ? {
                x: ['-50%', '-50.3%', '-49.7%', '-50%'],
                y: '-140vh',
                scale: [0.95, 1.08, 0.98],
                transition: {
                  duration: 2.1,
                  ease: [0.4, 0.05, 0.15, 1], // Rapid authentic rocket ascent
                },
              }
            : {}
        }
        style={{
          position: 'fixed',
          left: '50%',
          top: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transformOrigin: 'center center',
          filter: 'drop-shadow(0 0 25px rgba(249, 115, 22, 0.6)) drop-shadow(0 0 50px rgba(14, 165, 233, 0.4))',
        }}
      >
        {/* Rocket Image */}
        <div style={{ position: 'relative', width: 'clamp(120px, 15vw, 170px)' }}>
          <img
            src="/retro-rocket-primed-for-launch-png.webp"
            alt="Yoi Retro Rocket"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              filter: 'contrast(1.1) brightness(1.05)',
            }}
          />

          {/* Engine Core Flare */}
          <motion.div
            animate={{
              opacity: phase === 'launching' ? [0.85, 1, 0.85] : [0.5, 0.85, 0.6],
              scale: phase === 'launching' ? [1.1, 1.4, 1.15] : [0.95, 1.1, 1],
            }}
            transition={{
              duration: 0.12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              bottom: '-28px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '56px',
              height: '90px',
              background: 'radial-gradient(ellipse at 50% 25%, #ffffff 0%, #fef08a 30%, #f97316 65%, transparent 90%)',
              borderRadius: '50%',
              filter: 'blur(5px)',
              pointerEvents: 'none',
              zIndex: -1,
            }}
          />
        </div>

        {/* Thruster Plume Flame Stream */}
        <motion.div
          initial={{ opacity: 0, height: 40 }}
          animate={{
            opacity: phase === 'launching' ? [0.92, 1, 0.95] : 0.6,
            height: phase === 'launching' ? [160, 260, 200] : 70,
          }}
          transition={{
            duration: 0.18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            width: '32px',
            marginTop: '-18px',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(254, 240, 138, 0.95) 20%, rgba(249, 115, 22, 0.9) 45%, rgba(239, 68, 68, 0.7) 75%, transparent 100%)',
            borderRadius: '0 0 50% 50%',
            filter: 'blur(4px)',
            boxShadow: '0 15px 45px rgba(249, 115, 22, 0.85), 0 0 80px rgba(14, 165, 233, 0.6)',
          }}
        />

        {/* Smoke Puffs Billowing Behind */}
        {phase === 'launching' && (
          <div style={{ position: 'relative', width: 1, height: 1 }}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, 180 + i * 45],
                  x: [0, (i % 2 === 0 ? 1 : -1) * (18 + i * 14)],
                  opacity: [0.85, 0],
                  scale: [0.6, 2.6 + i * 0.45],
                }}
                transition={{
                  duration: 0.55 + i * 0.12,
                  repeat: Infinity,
                  delay: i * 0.07,
                  ease: 'easeOut',
                }}
                style={{
                  position: 'absolute',
                  top: 15,
                  left: -18,
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.7) 0%, rgba(249, 115, 22, 0.4) 35%, rgba(14, 165, 233, 0.2) 70%, transparent 100%)',
                  filter: 'blur(6px)',
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
