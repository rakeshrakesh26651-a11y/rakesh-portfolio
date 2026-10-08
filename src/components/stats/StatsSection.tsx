'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '@/data/portfolioData';
import { RollingCounter } from './RollingCounter';

gsap.registerPlugin(ScrollTrigger);

export function StatsSection() {
  const { stats } = portfolioData;
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rowRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) return;

      const items = rowRef.current?.querySelectorAll('.stat-item');
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { yPercent: 110, opacity: 0, filter: 'blur(4px)' },
          {
            yPercent: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.85,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rowRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="stats-section"
      style={{
        width: '100%',
        position: 'relative',
      }}
    >
      <div className="site-container">
        <div className="stats-content-wrapper">
          <div ref={rowRef} className="stats-row">
            {stats.map((stat, index) => (
              <div key={`stat-${index}`} style={{ overflow: 'hidden', width: '100%' }}>
                <div
                  className="stat-item"
                  style={{ willChange: 'transform, opacity, filter' }}
                >
                  <RollingCounter
                    targetValue={stat.targetValue}
                    padZero={stat.padZero}
                    suffix={stat.suffix}
                    label={stat.label}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .stats-section {
          padding: 48px 0 80px;
        }

        .stats-content-wrapper {
          width: 85%;
          margin-left: auto;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
          align-items: flex-start;
          width: 100%;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 1024px) {
          .stats-content-wrapper {
            width: 100%;
            margin-left: 0;
          }

          .stats-row {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
        }

        @media (max-width: 809.98px) {
          .stats-section {
            padding: 48px 0 60px;
          }

          .stats-content-wrapper {
            width: 100%;
            margin-left: 0;
          }

          .stats-row {
            display: flex;
            flex-direction: column;
            gap: 48px;
          }
        }
      `}</style>
    </section>
  );
}
