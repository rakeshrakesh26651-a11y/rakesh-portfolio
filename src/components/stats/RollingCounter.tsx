'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RollingDigitProps {
  digit: number;
  isTriggered: boolean;
  delay?: number;
}

function RollingDigit({ digit, isTriggered, delay = 0 }: RollingDigitProps) {
  const columnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!columnRef.current || !isTriggered) return;

    // Smooth roll up to the target digit
    gsap.to(columnRef.current, {
      yPercent: -digit * 10, // 10 digits (0-9), each is 10% of total height
      duration: 1.5,
      delay: delay,
      ease: 'power3.inOut',
    });
  }, [digit, isTriggered, delay]);

  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div
      style={{
        display: 'inline-block',
        height: '1em',
        overflow: 'hidden',
        position: 'relative',
        verticalAlign: 'top',
      }}
    >
      <div
        ref={columnRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          transform: 'translateY(0%)',
        }}
      >
        {digits.map((d) => (
          <div
            key={d}
            style={{
              height: '1em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}

interface RollingCounterProps {
  targetValue: number;
  padZero?: boolean;
  suffix?: string;
  label: string;
}

export function RollingCounter({
  targetValue,
  padZero = false,
  suffix = '',
  label,
}: RollingCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 85%',
      onEnter: () => setIsTriggered(true),
      once: true,
    });

    return () => st.kill();
  }, []);

  const digitChars = (
    padZero && targetValue < 10
      ? String(targetValue).padStart(2, '0')
      : String(targetValue)
  )
    .split('')
    .map(Number);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      {/* Digits Container */}
      <div
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(56px, 7vw, 100px)',
          fontWeight: 400,
          lineHeight: '1em',
          letterSpacing: '-0.02em',
          color: 'var(--color-white)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {digitChars.map((digit, index) => (
          <RollingDigit
            key={`d-${index}`}
            digit={digit}
            isTriggered={isTriggered}
            delay={index * 0.1}
          />
        ))}
        {suffix && (
          <span style={{ marginLeft: '2px', lineHeight: '1em' }}>
            {suffix}
          </span>
        )}
      </div>

      {/* Label */}
      <p
        className="text-mono-base"
        style={{
          marginTop: '16px',
          color: 'var(--color-muted)',
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </p>
    </div>
  );
}
