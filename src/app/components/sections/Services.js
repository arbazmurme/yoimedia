'use client';

import { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { motion, useInView } from 'framer-motion';
import ServicesPlanets from '../3d/ServicesPlanets';
import ParticleField from '../3d/ParticleField';
import dynamic from 'next/dynamic';

const services = [
  {
    id: '01',
    name: 'Performance Marketing',
    desc: 'Data-driven campaigns engineered for maximum ROI and measurable growth.',
    color: '#f97316',
    icon: '◈',
    tag: 'Growth Funnels',
    stat: '3.4× ROI',
  },
  {
    id: '02',
    name: 'Web Development',
    desc: 'Premium digital experiences built with cutting-edge technology.',
    color: '#0ea5e9',
    icon: '⬡',
    tag: 'Next.js & WebGL',
    stat: '99.9% Perf',
  },
  {
    id: '03',
    name: 'SEO / AEO / GEO',
    desc: 'Search visibility across all modern discovery platforms.',
    color: '#22c55e',
    icon: '◎',
    tag: 'AI Optimization',
    stat: '+240% Reach',
  },
  {
    id: '04',
    name: 'Social Media',
    desc: 'Community building and organic growth at scale.',
    color: '#8b5cf6',
    icon: '❋',
    tag: 'Viral Scale',
    stat: '10M+ Impr',
  },
  {
    id: '05',
    name: 'Content & Creative',
    desc: 'Strategic storytelling that moves people and builds brands.',
    color: '#ec4899',
    icon: '✦',
    tag: 'Brand Narratives',
    stat: 'High Conv',
  },
  {
    id: '06',
    name: 'Lead Generation',
    desc: 'High-conversion funnels that turn attention into revenue.',
    color: '#06b6d4',
    icon: '⊕',
    tag: 'Pipeline Auto',
    stat: '5× Pipeline',
  },
  {
    id: '07',
    name: 'AI & Automation',
    desc: 'Intelligent systems that scale your operations without scaling headcount.',
    color: '#f59e0b',
    icon: '⬢',
    tag: 'Autonomous AI',
    stat: '80% Saved',
  },
  {
    id: '08',
    name: 'Branding & Positioning',
    desc: 'Identity systems that resonate and differentiate.',
    color: '#ef4444',
    icon: '◉',
    tag: 'Market Leader',
    stat: 'Elite Tier',
  },
];

function ServiceCard({ service, index }) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: '-40px' });
  const [hovered, setHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotateX(-y * 22);
    setRotateY(x * 22);
    setGlarePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-cursor="planet"
        style={{
          position: 'relative',
          padding: '2.2rem 2rem',
          borderRadius: 20,
          background: hovered
            ? `linear-gradient(135deg, rgba(16, 24, 48, 0.9) 0%, rgba(8, 14, 28, 0.98) 100%)`
            : `linear-gradient(135deg, rgba(10, 16, 32, 0.65) 0%, rgba(5, 9, 18, 0.8) 100%)`,
          border: `1px solid ${hovered ? service.color + '75' : 'rgba(255,255,255,0.08)'}`,
          backdropFilter: 'blur(20px)',
          boxShadow: hovered
            ? `0 25px 60px -10px rgba(0,0,0,0.85), 0 0 45px ${service.color}25, inset 0 1px 0 rgba(255,255,255,0.2), inset 0 0 20px ${service.color}15`
            : `0 15px 35px -10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)`,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${hovered ? 'translateZ(18px) scale3d(1.02, 1.02, 1.02)' : 'translateZ(0px) scale3d(1, 1, 1)'}`,
          transition: hovered
            ? 'border-color 0.3s, background 0.3s, box-shadow 0.3s'
            : 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
          cursor: 'pointer',
          overflow: 'hidden',
        }}
      >
        {/* Holographic light sheen following cursor */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 20,
            pointerEvents: 'none',
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(circle 240px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.14), transparent 70%)`,
            transition: 'opacity 0.3s ease',
            zIndex: 1,
          }}
        />

        {/* Ambient Top Glow Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${service.color}, transparent)`,
            opacity: hovered ? 1 : 0.35,
            transition: 'opacity 0.4s',
            zIndex: 2,
          }}
        />

        {/* Sci-Fi Corner Brackets */}
        <div
          style={{
            position: 'absolute',
            top: 8,
            left: 8,
            width: 10,
            height: 10,
            borderTop: `2px solid ${hovered ? service.color : 'rgba(255,255,255,0.15)'}`,
            borderLeft: `2px solid ${hovered ? service.color : 'rgba(255,255,255,0.15)'}`,
            transition: 'border-color 0.3s',
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 10,
            height: 10,
            borderTop: `2px solid ${hovered ? service.color : 'rgba(255,255,255,0.15)'}`,
            borderRight: `2px solid ${hovered ? service.color : 'rgba(255,255,255,0.15)'}`,
            transition: 'border-color 0.3s',
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: 8,
            width: 10,
            height: 10,
            borderBottom: `2px solid ${hovered ? service.color : 'rgba(255,255,255,0.15)'}`,
            borderLeft: `2px solid ${hovered ? service.color : 'rgba(255,255,255,0.15)'}`,
            transition: 'border-color 0.3s',
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            width: 10,
            height: 10,
            borderBottom: `2px solid ${hovered ? service.color : 'rgba(255,255,255,0.15)'}`,
            borderRight: `2px solid ${hovered ? service.color : 'rgba(255,255,255,0.15)'}`,
            transition: 'border-color 0.3s',
            zIndex: 2,
          }}
        />

        {/* 3D Content Container with translateZ layers */}
        <div style={{ position: 'relative', zIndex: 3, transformStyle: 'preserve-3d' }}>
          {/* Top row: Planet ID + 3D Orb Icon */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.8rem',
              transform: 'translateZ(25px)',
            }}
          >
            {/* Planet ID + Status badge */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.25rem 0.65rem',
                borderRadius: 100,
                background: `${service.color}15`,
                border: `1px solid ${service.color}35`,
                width: 'fit-content',
              }}>
                <span style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: service.color,
                  boxShadow: `0 0 8px ${service.color}`,
                }} />
                <span style={{
                  fontSize: '0.62rem',
                  letterSpacing: '0.18em',
                  color: service.color,
                  fontWeight: 700,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>
                  PLANET {service.id}
                </span>
              </div>
              <span style={{
                fontSize: '0.6rem',
                color: 'rgba(240,244,255,0.4)',
                letterSpacing: '0.08em',
                paddingLeft: '0.2rem',
              }}>
                {service.tag}
              </span>
            </div>

            {/* 3D Glowing Planet Sphere with Orbital Ring */}
            <div
              style={{
                position: 'relative',
                width: 52,
                height: 52,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `translateZ(45px) ${hovered ? 'scale(1.15) rotate(12deg)' : 'scale(1)'}`,
                transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            >
              {/* Outer atmospheric glow */}
              <div
                style={{
                  position: 'absolute',
                  inset: -6,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${service.color}45, transparent 70%)`,
                  opacity: hovered ? 1 : 0.4,
                  transition: 'opacity 0.4s',
                }}
              />

              {/* 3D Planet Body */}
              <div
                style={{
                  position: 'absolute',
                  inset: 4,
                  borderRadius: '50%',
                  background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${service.color} 50%, #030610 100%)`,
                  boxShadow: `0 0 20px ${service.color}60, inset -4px -4px 10px rgba(0,0,0,0.8), inset 4px 4px 10px rgba(255,255,255,0.4)`,
                  border: `1px solid ${service.color}80`,
                }}
              />

              {/* Holographic orbital ring */}
              <div
                style={{
                  position: 'absolute',
                  width: 58,
                  height: 18,
                  borderRadius: '50%',
                  border: `1.5px solid ${service.color}90`,
                  transform: 'rotate(-25deg)',
                  boxShadow: `0 0 10px ${service.color}40`,
                  pointerEvents: 'none',
                }}
              />

              {/* Icon symbol centered */}
              <span
                style={{
                  position: 'relative',
                  zIndex: 2,
                  fontSize: '1.25rem',
                  color: '#ffffff',
                  fontWeight: 700,
                  textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                }}
              >
                {service.icon}
              </span>
            </div>
          </div>

          {/* Service Name with 3D Depth */}
          <h3
            style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              marginBottom: '0.85rem',
              fontFamily: "'Space Grotesk', sans-serif",
              transform: 'translateZ(30px)',
              transition: 'transform 0.3s ease',
            }}
          >
            {service.name}
          </h3>

          {/* Description */}
          <p
            style={{
              fontSize: '0.86rem',
              color: 'rgba(240,244,255,0.55)',
              lineHeight: 1.65,
              marginBottom: '1.8rem',
              transform: 'translateZ(20px)',
            }}
          >
            {service.desc}
          </p>

          {/* Bottom Card Footer: Metric & Explore Action */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              transform: 'translateZ(25px)',
            }}
          >
            {/* Stat Pill */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: service.color,
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              <span style={{ color: 'rgba(240,244,255,0.35)', fontWeight: 400 }}>BENCHMARK:</span>
              <span>{service.stat}</span>
            </div>

            {/* Explore button pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.4rem 0.9rem',
                borderRadius: 100,
                background: hovered ? service.color : 'rgba(255,255,255,0.05)',
                color: hovered ? '#ffffff' : 'rgba(240,244,255,0.7)',
                border: `1px solid ${hovered ? service.color : 'rgba(255,255,255,0.1)'}`,
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                fontFamily: "'Space Grotesk', sans-serif",
                transition: 'all 0.3s ease',
                boxShadow: hovered ? `0 0 20px ${service.color}60` : 'none',
              }}
            >
              <span>EXPLORE</span>
              <motion.span
                animate={{ x: hovered ? [0, 4, 0] : 0 }}
                transition={{ duration: 0.8, repeat: hovered ? Infinity : 0 }}
                style={{ display: 'inline-block' }}
              >
                →
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Services() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true, margin: '-100px' });

  return (
    <section
      id="services"
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '10rem 0 6rem',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #020408 0%, #040b14 50%, #020408 100%)',
      }}
    >
      {/* 3D canvas */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        opacity: 0.6,
      }}>
        <Canvas camera={{ position: [0, 2, 14], fov: 55 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.1} />
            <Stars radius={60} depth={30} count={2000} factor={3} fade speed={0.3} />
            <ParticleField count={800} color="#8b5cf6" spread={50} />
            <ServicesPlanets />
          </Suspense>
        </Canvas>
      </div>

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div ref={titleRef} style={{ marginBottom: '4.5rem', maxWidth: 950 }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.3em',
              color: '#8b5cf6',
              marginBottom: '1.2rem',
              fontWeight: 600,
            }}
          >
            SECTION 01
          </motion.div>

          {/* PLANETARY SERVICES on 1 line */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2rem, 4.2vw, 4.2rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: '1.2rem',
              color: '#f0f4ff',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '0.35em',
            }}
          >
            <span>PLANETARY</span>
            <span
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: '#06b6d4',
              }}
            >
              SERVICES
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: '1.05rem',
              color: 'rgba(240,244,255,0.5)',
              lineHeight: 1.6,
            }}
          >
            Everything your growth universe needs.
          </motion.p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}>
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
