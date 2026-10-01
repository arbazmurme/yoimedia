'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Brands', href: '#brands' },
  { label: 'University', href: '#university' },
  { label: 'AI & Automation', href: '#ai' },
  { label: 'Careers', href: '#careers' },
];

export default function Navbar({ scrolled = false }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.5 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '1.2rem 3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.4s ease',
          background: scrolled ? 'rgba(2,4,8,0.85)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(14,165,233,0.1)' : 'none',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
        }}
      >
        {/* Logo */}
        <a href="#" style={{ textDecoration: 'none', cursor: 'none' }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.5rem',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Yoi®
          </motion.div>
        </a>

        {/* Desktop nav */}
        <div
          style={{
            display: 'flex',
            gap: '2.5rem',
            alignItems: 'center',
          }}
          className="hidden-mobile"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-cursor="hover"
              style={{
                color: 'rgba(240,244,255,0.6)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                letterSpacing: '0.05em',
                fontWeight: 500,
                transition: 'color 0.3s ease',
                cursor: 'none',
              }}
              onMouseEnter={(e) => e.target.style.color = '#f0f4ff'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(240,244,255,0.6)'}
            >
              {link.label}
            </a>
          ))}

          <MagneticButton>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.4rem',
              borderRadius: '100px',
              border: '1px solid rgba(14,165,233,0.5)',
              color: '#0ea5e9',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              background: 'rgba(14,165,233,0.06)',
              transition: 'all 0.3s ease',
              fontFamily: "'Space Grotesk', sans-serif",
              whiteSpace: 'nowrap',
            }}>
              Schedule Call →
            </span>
          </MagneticButton>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-only"
          style={{
            background: 'none',
            border: '1px solid rgba(14,165,233,0.3)',
            borderRadius: 8,
            padding: '0.5rem 0.7rem',
            color: '#0ea5e9',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
          }}
          aria-label="Toggle menu"
        >
          <span style={{ display: 'block', width: 22, height: 1.5, background: '#0ea5e9', borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none' }} />
          <span style={{ display: 'block', width: 22, height: 1.5, background: '#0ea5e9', borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }} />
          <span style={{ display: 'block', width: 22, height: 1.5, background: '#0ea5e9', borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '85vw',
              maxWidth: 380,
              height: '100dvh',
              background: 'rgba(4,10,20,0.97)',
              backdropFilter: 'blur(30px)',
              borderLeft: '1px solid rgba(14,165,233,0.15)',
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              padding: '6rem 2.5rem 3rem',
              gap: '2rem',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 + 0.1 }}
                style={{
                  color: '#f0f4ff',
                  textDecoration: 'none',
                  fontSize: '1.6rem',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                marginTop: 'auto',
                padding: '1rem 2rem',
                borderRadius: 100,
                background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
                color: '#fff',
                textDecoration: 'none',
                textAlign: 'center',
                fontWeight: 700,
                fontSize: '1rem',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Schedule Strategy Call
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </>
  );
}
