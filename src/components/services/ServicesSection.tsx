'use client';

import React from 'react';
import { portfolioData } from '@/data/portfolioData';
import { ServiceItem } from './ServiceItem';

export function ServicesSection() {
  const { services } = portfolioData;

  return (
    <section
      id="services"
      className="services-section"
      style={{
        width: '100%',
        position: 'relative',
      }}
    >
      <div className="site-container">
        {/* Section Heading */}
        <div style={{ marginBottom: '48px' }}>
          <h2
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
