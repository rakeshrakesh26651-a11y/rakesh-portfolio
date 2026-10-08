'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '@/data/portfolioData';
import { MagneticLink } from '@/components/ui/MagneticLink';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const { about } = portfolioData;
  const sectionRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const eyebrowRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) return;

      // 1. Eyebrow reveal
      if (eyebrowRef.current) {
        gsap.fromTo(
          eyebrowRef.current,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: eyebrowRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Statement lines masked reveal
      if (statementRef.current) {
        const lines = statementRef.current.querySelectorAll('.statement-line');
        gsap.fromTo(
          lines,
          {
            yPercent: 100,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statementRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 3. Portrait image masked reveal + scroll parallax scrub
      if (imageContainerRef.current && imageRef.current) {
        gsap.fromTo(
          imageContainerRef.current,
          {
            clipPath: 'inset(12% 0% 12% 0%)',
            opacity: 0.85,
          },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        gsap.fromTo(
          imageRef.current,
          { yPercent: -12, scale: 1.06 },
          {
            yPercent: 12,
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // 4. Narrative column paragraphs & CTA stagger reveal
      if (narrativeRef.current) {
        const paragraphs = narrativeRef.current.querySelectorAll('.about-paragraph, .about-cta');
        gsap.fromTo(
          paragraphs,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: narrativeRef.current,
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
      id="about"
      ref={sectionRef}
      className="about-section"
      style={{
        width: '100%',
        position: 'relative',
      }}
    >
      <div className="site-container">
        {/* Section Eyebrow */}
        <div ref={eyebrowRef} style={{ marginBottom: '24px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
            }}
          >
            {about.eyebrow}
          </span>
        </div>

        {/* Editorial statement headline with GSAP reveal */}
        <div
          ref={statementRef}
          style={{
            marginBottom: '80px',
            width: '100%',
          }}
        >
          {about.statementLines.map((line, index) => (
            <div
              key={`stmt-${index}`}
              style={{
                overflow: 'hidden',
                lineHeight: 1.15,
              }}
            >
              <h2
                className="statement-line"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(26px, 4.25vw, 62px)',
                  fontWeight: 400,
                  lineHeight: 1.15,
                  letterSpacing: '-0.025em',
                  color: 'var(--color-white)',
                  margin: 0,
                  whiteSpace: 'normal',
                }}
              >
                {line}
              </h2>
            </div>
          ))}
        </div>

        {/* Bottom content: Portrait Image + Narrative Paragraphs + CTA */}
        <div className="about-content-grid">
          {/* Portrait Column */}
          <div className="about-image-column">
            <div
              ref={imageContainerRef}
              style={{
                width: '100%',
                maxWidth: '430px',
                height: 'auto',
                aspectRatio: '447 / 558',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#050505',
                borderRadius: '2px',
                willChange: 'clip-path, opacity',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imageRef}
                src={about.portraitImage}
                alt="Rakesh portrait"
                style={{
                  width: '100%',
                  height: '120%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: '-10%',
                  left: 0,
                  willChange: 'transform',
                }}
              />
            </div>
          </div>

          {/* Narrative Column */}
          <div ref={narrativeRef} className="about-narrative-column">
            {/* Paragraph 1 */}
            <p
              className="text-mono-base about-paragraph"
              style={{
                lineHeight: 1.4,
                marginBottom: '28px',
              }}
            >
              {about.paragraph1Words.map((chunk, idx) => (
                <span
                  key={`p1-${idx}`}
                  style={{
                    color: chunk.highlight ? 'var(--color-white)' : 'var(--color-muted)',
                  }}
                >
                  {chunk.text}
                </span>
              ))}
            </p>

            {/* Paragraph 2 */}
            <p
              className="text-mono-base about-paragraph"
              style={{
                lineHeight: 1.4,
                marginBottom: '28px',
              }}
            >
              {about.paragraph2Words.map((chunk, idx) => (
                <span
                  key={`p2-${idx}`}
                  style={{
                    color: chunk.highlight ? 'var(--color-white)' : 'var(--color-muted)',
                  }}
                >
                  {chunk.text}
                </span>
              ))}
            </p>

            {/* Paragraph 3 */}
            <p
              className="text-mono-base about-paragraph"
              style={{
                lineHeight: 1.4,
                marginBottom: '40px',
              }}
            >
              {about.paragraph3Words.map((chunk, idx) => (
                <span
                  key={`p3-${idx}`}
                  style={{
                    color: chunk.highlight ? 'var(--color-white)' : 'var(--color-muted)',
                  }}
                >
                  {chunk.text}
                </span>
              ))}
            </p>

            {/* Let's Talk CTA */}
            <div>
              <MagneticLink
                href={about.buttonLink}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: 'var(--color-white)',
                }}
              >
                {about.buttonText}
              </MagneticLink>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-section {
          padding: 48px 0;
        }

        .about-content-grid {
          display: grid;
          grid-template-columns: 430px 1fr;
          gap: 64px;
          align-items: flex-start;
        }

        .about-narrative-column {
          max-width: 563px;
          margin-left: auto;
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 1024px) {
          .about-content-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .about-image-column {
            max-width: 430px;
          }

          .about-narrative-column {
            margin-left: 0;
            max-width: 100%;
          }
        }

        @media (max-width: 809.98px) {
          .about-section {
            padding: 48px 0 16px;
          }

          .about-content-grid {
            gap: 32px;
          }
        }
      `}</style>
    </section>
  );
}
