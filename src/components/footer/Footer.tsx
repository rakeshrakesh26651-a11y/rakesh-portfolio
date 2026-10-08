'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '@/data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const { siteInfo } = portfolioData;

  const footerRef = useRef<HTMLElement>(null);
  const brandTextRef = useRef<HTMLHeadingElement>(null);
  const copyrightRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) return;

      const isMobile = window.innerWidth <= 809.98;

      // 1. Large Brand Text (RAKESH) Masked Reveal
      if (brandTextRef.current) {
        gsap.fromTo(
          brandTextRef.current,
          {
            yPercent: 110,
            opacity: 0,
            filter: 'blur(4px)',
          },
          {
            yPercent: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: isMobile ? 'top 95%' : 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Subtle scroll-linked Y movement / parallax for huge heading
        gsap.to(brandTextRef.current, {
          y: -25,
          ease: 'none',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          },
        });
      }

      // 2. Discreet Copyright Masked Reveal
      if (copyrightRef.current) {
        gsap.fromTo(
          copyrightRef.current,
          {
            yPercent: 110,
            opacity: 0,
            filter: 'blur(4px)',
          },
          {
            yPercent: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: isMobile ? 'top 90%' : 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);

      return () => {
        clearTimeout(refreshTimer);
      };
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer id="footer" ref={footerRef} className="site-footer">
      {/* Huge Editorial RAKESH Typography */}
      <div className="footer-huge-brand-wrap">
        <h2
          ref={brandTextRef}
          className="footer-huge-name"
        >
          {siteInfo.name}
        </h2>
      </div>

      {/* Discreet bottom copyright */}
      <div className="footer-bottom-bar">
        <div style={{ overflow: 'hidden' }}>
          <p
            ref={copyrightRef}
            className="text-mono-sm copyright-text"
            style={{ willChange: 'transform, opacity, filter' }}
          >
            {siteInfo.copyright}
          </p>
        </div>
      </div>

      <style jsx>{`
        .site-footer {
          position: relative;
          z-index: 2;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding: 60px 16px 28px;
          background-color: transparent !important;
          overflow: hidden;
        }

        .footer-huge-brand-wrap {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          padding: 10px 0;
        }

        .footer-huge-name {
          font-family: var(--font-serif);
          font-size: clamp(76px, 19vw, 275px);
          font-weight: 400;
          line-height: 0.88;
          letter-spacing: -0.02em;
          text-align: center;
          color: var(--color-white);
          text-transform: uppercase;
          margin: 0 auto;
          width: 100%;
          max-width: 100%;
          white-space: nowrap;
          user-select: none;
          display: block;
          will-change: transform, filter, opacity;
        }

        .footer-bottom-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          margin-top: 24px;
        }

        .copyright-text {
          color: var(--color-muted);
          margin: 0;
          opacity: 0.5;
          text-align: center;
        }

        @media (max-width: 809.98px) {
          .site-footer {
            padding: 40px 12px 20px;
          }

          .footer-huge-name {
            font-size: clamp(70px, 18.5vw, 130px);
            letter-spacing: -0.01em;
          }

          .footer-bottom-bar {
            margin-top: 16px;
          }
        }
      `}</style>
    </footer>
  );
}
