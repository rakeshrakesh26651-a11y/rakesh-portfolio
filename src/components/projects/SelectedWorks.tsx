'use client';

import React from 'react';
import { portfolioData } from '@/data/portfolioData';
import { ProjectCard } from './ProjectCard';

export function SelectedWorks() {
  const { projects } = portfolioData;

  const gustoCafe = projects.find((p) => p.id === 'gusto-cafe') || projects[0];
  const weddingCouple = projects.find((p) => p.id === 'wedding-couple') || projects[1];
  const gymFitness = projects.find((p) => p.id === 'gym-fitness') || projects[2];
  const premiumJewellery = projects.find((p) => p.id === 'premium-jewellery') || projects[3];
  const nivyuga = projects.find((p) => p.id === 'nivyuga') || projects[4];
  const mysorePlant = projects.find((p) => p.id === 'mysore-plant') || projects[5];
  const himalayanHarvest = projects.find((p) => p.id === 'himalayan-harvest') || projects[6];

  return (
    <section
      id="work"
      className="works-section"
      style={{
        width: '100%',
        position: 'relative',
      }}
    >
      <div className="site-container">
        {/* Section Header */}
        <div
          className="selected-works-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '64px',
            gap: '24px',
          }}
        >
          <h2
            className="heading-section"
            style={{
              margin: 0,
            }}
          >
            Selected Works
          </h2>
          <p
            className="text-mono-base"
            style={{
              maxWidth: '520px',
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            A collection of{' '}
            <span style={{ color: 'var(--color-white)' }}>production websites</span>,{' '}
            <span style={{ color: 'var(--color-white)' }}>e-commerce platforms</span> and{' '}
            <span style={{ color: 'var(--color-white)' }}>digital brand experiences</span> built and deployed across my{' '}
            <span style={{ color: 'var(--color-white)' }}>first year of development</span>.
          </p>
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
