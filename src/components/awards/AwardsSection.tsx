'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '@/data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export function AwardsSection() {
  const { techAndWhy } = portfolioData;
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) return;

      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (tableRef.current) {
        const rows = tableRef.current.querySelectorAll('.award-body-row');
        gsap.fromTo(
          rows,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: tableRef.current,
              start: 'top 82%',
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
      id="about-stack"
      ref={sectionRef}
      className="awards-section"
      style={{
        width: '100%',
        position: 'relative',
      }}
    >
      <div className="site-container">
        {/* Section Heading */}
        <div style={{ marginBottom: '48px', overflow: 'hidden' }}>
          <h2
            ref={headingRef}
            className="heading-section"
            style={{
              margin: 0,
              maxWidth: '650px',
            }}
          >
            Why Work With Me
          </h2>
        </div>

        {/* Content Wrapper (70% width on right) matching Patrick Jane layout */}
        <div ref={tableRef} className="awards-content-wrapper">
          {/* Table Header */}
          <div
            className="awards-grid-row awards-header-row"
            style={{
              paddingBottom: '16px',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <h5 className="award-col-year award-header-text">PILLAR</h5>
            <h5 className="award-col-project award-header-text">TECH STACK</h5>
            <h5 className="award-col-award award-header-text">VALUE &amp; IMPACT</h5>
          </div>

          {/* Table Body */}
          {techAndWhy.map((item, index) => (
            <div
              key={`tech-${index}`}
              className="awards-grid-row award-body-row"
              style={{
                paddingTop: '20px',
                paddingBottom: '20px',
                borderBottom: '1px solid var(--color-border-subtle)',
              }}
            >
              <span
                className="award-col-year text-mono-base"
                style={{
                  fontWeight: 500,
                  color: 'var(--color-white)',
                  letterSpacing: '0.02em',
                }}
              >
                {item.pillar}
              </span>
              <span
                className="award-col-project text-mono-base"
                style={{
                  color: 'rgb(210, 210, 210)',
                  lineHeight: 1.4,
                }}
              >
                {item.technologies}
              </span>
              <span
                className="award-col-award text-mono-base"
                style={{
                  color: 'var(--color-muted)',
                  lineHeight: 1.4,
                }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .awards-section {
          padding: 48px 0;
        }

        .awards-content-wrapper {
          width: 70%;
          margin-left: auto;
          display: flex;
          flex-direction: column;
        }

        .awards-grid-row {
          display: grid;
          grid-template-columns: 190px 260px 1fr;
          align-items: baseline;
          gap: 24px;
        }

        .award-header-text {
          font-family: var(--font-serif);
          font-size: 18px;
          font-weight: 400;
          color: var(--color-white);
          margin: 0;
          letter-spacing: 0.05em;
        }

        .award-body-row:hover .text-mono-base {
          color: var(--color-white) !important;
          transition: color 0.2s ease;
        }

        @media (max-width: 1024px) {
          .awards-content-wrapper {
            width: 100%;
          }

          .awards-grid-row {
            grid-template-columns: 170px 220px 1fr;
            gap: 16px;
          }
        }

        @media (max-width: 809.98px) {
          .awards-section {
            padding: 48px 0 0;
          }

          .awards-content-wrapper {
            width: 100%;
            margin-left: 0;
          }

          .awards-grid-row {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .awards-header-row {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
