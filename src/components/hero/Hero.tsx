'use client';

import React, { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { portfolioData } from '@/data/portfolioData';
import { HeroCarousel3D } from './HeroCarousel3D';
import { MagneticLink } from '@/components/ui/MagneticLink';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const taglineGroups = [
  'I design and build modern, high-performance websites',
  'and digital experiences that help businesses stand out,',
  'build trust, and grow online.',
];

export function Hero() {
  const { siteInfo } = portfolioData;

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    let cleanupLiftListener: (() => void) | undefined;

    const ctx = gsap.context(() => {
      const runEntrance = (baseDelay = 0) => {
        const tl = gsap.timeline();

        // Initial states
        if (titleRef.current) {
          gsap.set(titleRef.current, {
            yPercent: 100,
            y: 0,
            opacity: 0,
            filter: 'blur(6px)',
          });
        }
        if (roleRef.current) {
          gsap.set(roleRef.current, {
            y: 20,
            opacity: 0,
          });
        }
        gsap.set('.hero-desc-group', {
          y: 20,
          opacity: 0,
        });
        gsap.set('.hero-cta-item', {
          y: 16,
          opacity: 0,
        });

        // RAKESH: masked overflow-hidden reveal
        // translateY(100%) -> 0, opacity 0 -> 1, blur(6px) -> 0, duration ~1.1s, ease: power4.out, delay ~0.2s
        if (titleRef.current) {
          tl.to(
            titleRef.current,
            {
              yPercent: 0,
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 1.1,
              ease: 'power4.out',
            },
            baseDelay + 0.2
          );
        }

        // Subtitle: translateY(20px) -> 0, opacity 0 -> 1, delay ~0.6s
        if (roleRef.current) {
          tl.to(
            roleRef.current,
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
            },
            baseDelay + 0.6
          );
        }

        // Description: line/group stagger reveal, translateY(20px) -> 0, opacity 0 -> 1
        const descGroups = descRef.current?.querySelectorAll('.hero-desc-group');
        if (descGroups && descGroups.length > 0) {
          tl.to(
            descGroups,
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.12,
              ease: 'power3.out',
            },
            baseDelay + 0.8
          );
        } else if (descRef.current) {
          tl.to(
            descRef.current,
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
            },
            baseDelay + 0.8
          );
        }

        // CTAs: subtle translateY + fade, slight stagger
        const ctaItems = ctasRef.current?.querySelectorAll('.hero-cta-item');
        if (ctaItems && ctaItems.length > 0) {
          tl.to(
            ctaItems,
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.12,
              ease: 'power3.out',
            },
            baseDelay + 1.05
          );
        }
      };

      // Check if Preloader is actively in the DOM
      const preloaderActive = Boolean(document.querySelector('.preloader-char'));
      if (preloaderActive) {
        let started = false;
        const onLift = () => {
          if (started) return;
          started = true;
          runEntrance(0);
        };

        window.addEventListener('preloaderLift', onLift, { once: true });
        const timer = setTimeout(onLift, 1350);

        cleanupLiftListener = () => {
          window.removeEventListener('preloaderLift', onLift);
          clearTimeout(timer);
        };
      } else {
        runEntrance(0);
      }
    }, sectionRef);

    return () => {
      cleanupLiftListener?.();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
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
          {/* Masked Title Wrapper */}
          <div
            className="hero-title-mask"
            style={{
              overflow: 'hidden',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              paddingBottom: '8px',
              marginBottom: '-8px',
            }}
          >
            <h1
              ref={titleRef}
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
                opacity: 0,
                filter: 'blur(6px)',
                willChange: 'transform, opacity, filter',
              }}
            >
              {siteInfo.name}
            </h1>
          </div>

          <div
            ref={roleRef}
            className="hero-role"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(14px, 1.4vw, 18px)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-white)',
              marginTop: '12px',
              fontWeight: 500,
              opacity: 0,
              willChange: 'transform, opacity',
            }}
          >
            {siteInfo.role}
          </div>

          <p
            ref={descRef}
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
            {taglineGroups.map((group, idx) => (
              <span
                key={idx}
                className="hero-desc-group"
                style={{
                  display: 'inline-block',
                  opacity: 0,
                  willChange: 'transform, opacity',
                  marginRight: idx < taglineGroups.length - 1 ? '0.3em' : undefined,
                }}
              >
                {group}
              </span>
            ))}
          </p>

          {/* Action CTAs */}
          <div
            ref={ctasRef}
            className="hero-ctas"
            style={{
              display: 'flex',
              gap: '28px',
              marginTop: '24px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              className="hero-cta-item"
              style={{
                opacity: 0,
                willChange: 'transform, opacity',
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
            </div>
            <div
              className="hero-cta-item"
              style={{
                opacity: 0,
                willChange: 'transform, opacity',
              }}
            >
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
