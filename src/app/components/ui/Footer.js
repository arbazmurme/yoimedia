'use client';

import { motion } from 'framer-motion';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'About Yoi®', href: '#about' },
  { label: 'Our Brands', href: '#brands' },
  { label: 'Yoi® University', href: '#university' },
  { label: 'AI & Automations', href: '#ai' },
  { label: 'Careers', href: '#careers' },
];

const socials = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Twitter / X', href: 'https://x.com' },
  { label: 'YouTube', href: 'https://youtube.com' },
];

export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        padding: '5rem 0 3rem',
        background: '#020408',
        borderTop: '1px solid rgba(14,165,233,0.08)',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '60vw',
        height: '40vh',
        background: 'radial-gradient(ellipse, rgba(14,165,233,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '4rem',
          marginBottom: '4rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '2rem',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1rem',
            }}>
              Yoi®
            </div>
            <p style={{
              fontSize: '0.85rem',
              color: 'rgba(240,244,255,0.35)',
              lineHeight: 1.7,
              maxWidth: 260,
            }}>
              A Hyderabad-based digital marketing and AI growth company.
              We engineer growth systems that build, scale, and automate.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div style={{
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              color: 'rgba(240,244,255,0.3)',
              marginBottom: '1.5rem',
              fontWeight: 600,
            }}>
              NAVIGATION
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  data-cursor="hover"
                  style={{
                    fontSize: '0.9rem',
                    color: 'rgba(240,244,255,0.45)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    cursor: 'none',
                    width: 'fit-content',
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#f0f4ff'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(240,244,255,0.45)'}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <div style={{
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              color: 'rgba(240,244,255,0.3)',
              marginBottom: '1.5rem',
              fontWeight: 600,
            }}>
              FOLLOW THE ORBIT
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    color: 'rgba(240,244,255,0.45)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    cursor: 'none',
                    width: 'fit-content',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#0ea5e9'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(240,244,255,0.45)'; }}
                >
                  <span style={{
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    background: '#0ea5e9',
                    opacity: 0.5,
                  }} />
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.15), transparent)',
          marginBottom: '2rem',
        }} />

        {/* Bottom row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <span style={{
            fontSize: '0.8rem',
            color: 'rgba(240,244,255,0.2)',
            letterSpacing: '0.05em',
          }}>
            © Yoi® Media. All rights reserved.
          </span>
          <span style={{
            fontSize: '0.75rem',
            color: 'rgba(240,244,255,0.15)',
            letterSpacing: '0.1em',
          }}>
            BUILD. SCALE. AUTOMATE.
          </span>
          <a
            href="https://yoimedia.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.75rem',
              color: 'rgba(14,165,233,0.4)',
              textDecoration: 'none',
              cursor: 'none',
            }}
            data-cursor="hover"
          >
            yoimedia.com
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer .section-container > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
