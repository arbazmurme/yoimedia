'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';

// Lazy imports for heavy components
const Cursor = dynamic(() => import('./components/ui/Cursor'), { ssr: false });
const Loader = dynamic(() => import('./components/ui/Loader'), { ssr: false });
const Navbar = dynamic(() => import('./components/ui/Navbar'), { ssr: false });
const Footer = dynamic(() => import('./components/ui/Footer'), { ssr: false });

// Section components
import Hero from './components/sections/Hero';
const Services = dynamic(() => import('./components/sections/Services'), { ssr: false });
const About = dynamic(() => import('./components/sections/About'));
const BuildScaleAutomate = dynamic(() => import('./components/sections/BuildScaleAutomate'));
const Approach = dynamic(() => import('./components/sections/Approach'));
const WhoFor = dynamic(() => import('./components/sections/WhoFor'));
const Brands = dynamic(() => import('./components/sections/Brands'));
const University = dynamic(() => import('./components/sections/University'));
const AI = dynamic(() => import('./components/sections/AI'), { ssr: false });
const Careers = dynamic(() => import('./components/sections/Careers'));
const FinalCTA = dynamic(() => import('./components/sections/FinalCTA'), { ssr: false });

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loaded]);

  return (
    <>
      {/* Noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Custom cursor */}
      <Cursor />

      {/* Loading screen */}
      <Loader onComplete={handleLoaderComplete} />

      {/* Main site — hidden until loaded */}
      <div style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.6s ease',
        pointerEvents: loaded ? 'all' : 'none',
      }}>
        <Navbar scrolled={scrolled} />

        <main>
          <Hero />
          <Services />
          <About />
          <BuildScaleAutomate />
          <Approach />
          <WhoFor />
          <Brands />
          <University />
          <AI />
          <Careers />
          <FinalCTA />
        </main>

        <Footer />
      </div>
    </>
  );
}
