'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '@/data/portfolioData';
import { ServiceItem } from './ServiceItem';

gsap.registerPlugin(ScrollTrigger);

export function ServicesSection() {
  const { services } = portfolioData;
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) return;

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="services-section"
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
              textTransform: 'uppercase',
              margin: 0,
              maxWidth: '650px',
            }}
          >
            EXPERTISE &amp; SERVICES
          </h2>
        </div>

        {/* 9-Column Services Layout matching reference */}
        <div className="services-grid">
          <div className="services-spacer" />
          <div className="services-list">
            {services.map((service) => (
              <ServiceItem
                key={service.number}
                number={service.number}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .services-section {
          padding: 48px 0;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(9, 1fr);
          gap: 28px;
          width: 100%;
        }

        .services-spacer {
          grid-column: span 3;
        }

        .services-list {
          grid-column: span 6;
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        @media (max-width: 809.98px) {
          .services-section {
            padding: 48px 0 0;
          }

          .services-grid {
            display: flex;
            flex-direction: column;
            gap: 0;
          }

          .services-spacer {
            display: none;
          }

          .services-list {
            grid-column: 1 / -1;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
