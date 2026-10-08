'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '@/data/portfolioData';
import { ProjectCard } from './ProjectCard';

gsap.registerPlugin(ScrollTrigger);

export function SelectedWorks() {
  const { projects } = portfolioData;

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const gustoCafe = projects.find((p) => p.id === 'gusto-cafe') || projects[0];
  const weddingCouple = projects.find((p) => p.id === 'wedding-couple') || projects[1];
  const gymFitness = projects.find((p) => p.id === 'gym-fitness') || projects[2];
  const premiumJewellery = projects.find((p) => p.id === 'premium-jewellery') || projects[3];
  const nivyuga = projects.find((p) => p.id === 'nivyuga') || projects[4];
  const mysorePlant = projects.find((p) => p.id === 'mysore-plant') || projects[5];
  const himalayanHarvest = projects.find((p) => p.id === 'himalayan-harvest') || projects[6];
  const buildInterior = projects.find((p) => p.id === 'build-interior') || projects[7];

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) return;

      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { yPercent: 110, opacity: 0, filter: 'blur(4px)' },
          {
            yPercent: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Subtle scroll-linked parallax for heading
        gsap.to(titleRef.current, {
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      const descLines = descRef.current?.querySelectorAll('.works-desc-line');
      if (descLines && descLines.length > 0) {
        gsap.fromTo(
          descLines,
          { yPercent: 110, opacity: 0, filter: 'blur(4px)' },
          {
            yPercent: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.85,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
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
      id="work"
      ref={sectionRef}
      className="works-section"
      style={{
        width: '100%',
        position: 'relative',
      }}
    >
      <div className="site-container">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="selected-works-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '64px',
            gap: '24px',
          }}
        >
          <div style={{ overflow: 'hidden' }}>
            <h2
              ref={titleRef}
              className="heading-section"
              style={{
                margin: 0,
                opacity: 0,
                willChange: 'transform, opacity, filter',
              }}
            >
              Selected Works
            </h2>
          </div>
          <div
            ref={descRef}
            className="text-mono-base"
            style={{
              maxWidth: '520px',
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span
                className="works-desc-line"
                style={{
                  display: 'block',
                  opacity: 0,
                  willChange: 'transform, opacity, filter',
                }}
              >
                A collection of <span style={{ color: 'var(--color-white)' }}>production websites</span>,{' '}
                <span style={{ color: 'var(--color-white)' }}>e-commerce platforms</span>
              </span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span
                className="works-desc-line"
                style={{
                  display: 'block',
                  opacity: 0,
                  willChange: 'transform, opacity, filter',
                }}
              >
                and <span style={{ color: 'var(--color-white)' }}>digital brand experiences</span> built and deployed
              </span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span
                className="works-desc-line"
                style={{
                  display: 'block',
                  opacity: 0,
                  willChange: 'transform, opacity, filter',
                }}
              >
                across my <span style={{ color: 'var(--color-white)' }}>first year of development</span>.
              </span>
            </span>
          </div>
        </div>

        {/* Desktop Layout Rows */}
        <div className="projects-grid">
          {/* Row 1: Left 352px, Right 704px */}
          <div className="project-row row-1">
            <div className="card-small">
              <ProjectCard {...gustoCafe} width="100%" />
            </div>
            <div className="card-large">
              <ProjectCard {...weddingCouple} width="100%" />
            </div>
          </div>

          {/* Row 2: Center 704px */}
          <div className="project-row row-2">
            <div className="card-center">
              <ProjectCard {...gymFitness} width="100%" />
            </div>
          </div>

          {/* Row 3: Left 704px, Right 352px */}
          <div className="project-row row-3">
            <div className="card-large">
              <ProjectCard {...premiumJewellery} width="100%" />
            </div>
            <div className="card-small">
              <ProjectCard {...nivyuga} width="100%" />
            </div>
          </div>

          {/* Row 4: Left 352px, Right 704px */}
          <div className="project-row row-4">
            <div className="card-small">
              <ProjectCard {...mysorePlant} width="100%" />
            </div>
            <div className="card-large">
              <ProjectCard {...himalayanHarvest} width="100%" />
            </div>
          </div>

          {/* Row 5: Center 704px */}
          <div className="project-row row-5">
            <div className="card-center">
              <ProjectCard {...buildInterior} width="100%" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .works-section {
          padding: 48px 0;
        }

        .projects-grid {
          display: flex;
          flex-direction: column;
          gap: 72px;
        }

        .project-row {
          display: flex;
          align-items: flex-start;
          width: 100%;
        }

        .row-1 {
          justify-content: space-between;
        }

        .row-2 {
          justify-content: center;
        }

        .row-3 {
          justify-content: space-between;
        }

        .row-4 {
          justify-content: space-between;
        }

        .row-5 {
          justify-content: center;
        }

        .card-small {
          width: 352px;
          max-width: 100%;
        }

        .card-large {
          width: 704px;
          max-width: 100%;
        }

        .card-center {
          width: 704px;
          max-width: 100%;
        }

        @media (max-width: 1199.98px) {
          .card-small {
            width: 38%;
          }
          .card-large {
            width: 58%;
          }
          .card-center {
            width: 70%;
          }
        }

        @media (max-width: 809.98px) {
          .works-section {
            padding: 16px 0;
          }

          .selected-works-header {
            flex-direction: column;
            gap: 20px;
            margin-bottom: 40px;
          }

          .projects-grid {
            gap: 48px;
          }

          .project-row {
            flex-direction: column;
            gap: 48px;
          }

          .card-small,
          .card-large,
          .card-center {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
