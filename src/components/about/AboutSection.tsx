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

  useEffect(() => {
    if (!statementRef.current) return;

    const lines = statementRef.current.querySelectorAll('.statement-line');

    const ctx = gsap.context(() => {
      // Reveal statement lines with cubic-bezier ease matching original
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
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Subtle parallax on portrait image
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
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
        <div style={{ marginBottom: '24px' }}>
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
              style={{
                width: '100%',
                maxWidth: '430px',
                height: 'auto',
                aspectRatio: '447 / 558',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#050505',
                borderRadius: '2px',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imageRef}
                src={about.portraitImage}
                alt="Rakesh portrait"
                style={{
                  width: '100%',
                  height: '110%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: '-5%',
                  left: 0,
                }}
              />
            </div>
          </div>

          {/* Narrative Column */}
          <div className="about-narrative-column">
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
