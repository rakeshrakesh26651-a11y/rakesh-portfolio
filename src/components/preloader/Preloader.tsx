'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const letters = textRef.current?.querySelectorAll('.preloader-char');
    if (!containerRef.current || !letters || letters.length === 0) {
      onComplete?.();
      setIsFinished(true);
      return;
    }

    const safetyTimer = setTimeout(() => {
      setIsFinished(true);
      onComplete?.();
    }, 2500);

    const tl = gsap.timeline({
      onComplete: () => {
        clearTimeout(safetyTimer);
        setIsFinished(true);
        onComplete?.();
      },
    });

    // Initial state
    gsap.set(letters, {
      y: 40,
      opacity: 0,
      filter: 'blur(8px)',
    });

    // Animate letters in
    tl.to(letters, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      stagger: 0.05,
      ease: 'power3.out',
    })
      // Hold briefly
      .to({}, { duration: 0.5 })
      // Slide up curtain
      .to(containerRef.current, {
        yPercent: -100,
        duration: 1.1,
        ease: 'power4.inOut',
      });

    return () => {
      clearTimeout(safetyTimer);
      tl.kill();
    };
  }, [onComplete]);

  if (isFinished) return null;

  const word = 'RAKESH'.split('');

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'all',
        overflow: 'hidden',
      }}
    >
      <h1
        ref={textRef}
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(44px, 8vw, 100px)',
          fontWeight: 400,
          letterSpacing: '-0.01em',
          lineHeight: '0.9em',
          textAlign: 'center',
          color: '#ffffff',
          textTransform: 'uppercase',
          display: 'flex',
          gap: 'clamp(4px, 1vw, 12px)',
          userSelect: 'none',
        }}
      >
        <span style={{ display: 'inline-flex' }}>
          {word.map((char, index) => (
            <span
              key={`c-${index}`}
              className="preloader-char"
              style={{ display: 'inline-block' }}
            >
              {char}
            </span>
          ))}
        </span>
      </h1>
    </div>
  );
}
