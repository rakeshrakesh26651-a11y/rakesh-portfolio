'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServiceItemProps {
  number: string;
  title: string;
  description: string;
}

export function ServiceItem({ number, title, description }: ServiceItemProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!rowRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) return;

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rowRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: rowRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, rowRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rowRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%',
        paddingTop: '24px',
        paddingBottom: '24px',
        position: 'relative',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div ref={contentRef} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          width: '100%',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '18px',
            fontWeight: 400,
            color: isHovered ? 'var(--color-white)' : 'rgb(240, 240, 240)',
            letterSpacing: '0.04em',
            transition: 'color 0.3s ease',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '16px',
            fontWeight: 400,
            color: 'var(--color-white)',
            letterSpacing: '0.05em',
          }}
        >
          {number}
        </span>
      </div>

      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '14px',
          lineHeight: 1.5,
          color: isHovered ? 'var(--color-secondary)' : 'var(--color-muted)',
          marginTop: '10px',
          marginBottom: 0,
          maxWidth: '560px',
          transition: 'color 0.3s ease',
        }}
      >
        {description}
      </p>
      </div>

      {/* Static line separator */}
      <div
        ref={lineRef}
        style={{
          width: '100%',
          height: '1px',
          backgroundColor: 'var(--color-border)',
          marginTop: '24px',
          position: 'relative',
          overflow: 'hidden',
          transformOrigin: 'left',
          willChange: 'transform',
        }}
      >
        {/* Animated highlight line on hover */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'var(--color-white)',
            transformOrigin: 'left',
            transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        />
      </div>
    </div>
  );
}
