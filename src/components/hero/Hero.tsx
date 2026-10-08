'use client';

import React from 'react';
import { portfolioData } from '@/data/portfolioData';
import { HeroCarousel3D } from './HeroCarousel3D';
import { MagneticLink } from '@/components/ui/MagneticLink';

export function Hero() {
  const { siteInfo } = portfolioData;

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        className="site-container hero-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        {/* Title Group */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <h1
            className="hero-title"
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 400,
              color: 'var(--color-white)',
              textAlign: 'center',
              margin: 0,
              width: '100%',
              textTransform: 'uppercase',
              userSelect: 'none',
              letterSpacing: '0em',
            }}
          >
            {siteInfo.name}
          </h1>

          <div
            className="hero-role"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(14px, 1.4vw, 18px)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-white)',
              marginTop: '12px',
              fontWeight: 500,
            }}
          >
            {siteInfo.role}
          </div>

          <p
            className="hero-subtitle"
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-muted)',
              textAlign: 'center',
              margin: 0,
              marginTop: '16px',
              maxWidth: '640px',
              whiteSpace: 'normal',
            }}
          >
            {siteInfo.tagline}
          </p>

          {/* Action CTAs */}
          <div
            className="hero-ctas"
            style={{
              display: 'flex',
              gap: '28px',
              marginTop: '24px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MagneticLink
              href="#contact"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--color-white)',
              }}
            >
              Start a Project
            </MagneticLink>
            <MagneticLink
              href="#work"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '15px',
                color: 'var(--color-muted)',
              }}
            >
              View My Work
            </MagneticLink>
          </div>
        </div>

        {/* 3D Showcase Carousel */}
        <div className="hero-carousel-wrapper" style={{ width: '100%', marginTop: '39px' }}>
          <HeroCarousel3D />
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          padding: 80px 0 30px;
        }

        .hero-title {
          font-size: 180px;
          line-height: 1.2em;
          width: 100%;
        }

        .hero-subtitle {
          font-size: 16px;
          line-height: 1.4em;
          max-width: 640px;
        }

        @media (max-width: 1199.98px) {
          .hero-title {
            font-size: clamp(80px, 11vw, 130px);
          }
        }

        @media (max-width: 809.98px) {
          .hero-section {
            padding: 70px 0 20px;
          }

          .hero-title {
            font-size: 56px !important;
            line-height: 1.2em !important;
            width: 100% !important;
            max-width: 100% !important;
          }

          .hero-role {
            font-size: 12px !important;
            letter-spacing: 0.15em !important;
          }

          .hero-subtitle {
            font-size: 15px !important;
            line-height: 1.4em !important;
            width: 100% !important;
            max-width: 100% !important;
          }

          .hero-ctas {
            gap: 20px !important;
          }

          .hero-carousel-wrapper {
            margin-top: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
