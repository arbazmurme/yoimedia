'use client';

import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState('default'); // default | expanded | orbit | magnetic

  useEffect(() => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile) return;

    const handleMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleOver = (e) => {
      const el = e.target;
      if (el.closest('[data-cursor="planet"]')) {
        setCursorState('orbit');
      } else if (el.closest('button') || el.closest('a') || el.closest('[data-cursor="cta"]')) {
        setCursorState('magnetic');
      } else if (el.closest('[data-cursor="hover"]')) {
        setCursorState('expanded');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseover', handleOver);

    let raf;
    const animate = () => {
      if (!dotRef.current || !ringRef.current) {
        raf = requestAnimationFrame(animate);
        return;
      }

      // Dot follows instantly
      dotRef.current.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`;

      // Ring follows with lag
      ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.12;
      ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.12;
      
      const ringSize = cursorState === 'expanded' || cursorState === 'magnetic' ? 52 : cursorState === 'orbit' ? 44 : 32;
      ringRef.current.style.transform = `translate(${ringPosRef.current.x - ringSize / 2}px, ${ringPosRef.current.y - ringSize / 2}px)`;

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      cancelAnimationFrame(raf);
    };
  }, [cursorState]);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          width: cursorState === 'orbit' ? 6 : 8,
          height: cursorState === 'orbit' ? 6 : 8,
        }}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${cursorState === 'expanded' || cursorState === 'magnetic' ? 'expanded' : ''} ${cursorState === 'orbit' ? 'orbit' : ''}`}
        style={{
          width: cursorState === 'expanded' || cursorState === 'magnetic' ? 52 : cursorState === 'orbit' ? 44 : 32,
          height: cursorState === 'expanded' || cursorState === 'magnetic' ? 52 : cursorState === 'orbit' ? 44 : 32,
        }}
      />
    </>
  );
}
