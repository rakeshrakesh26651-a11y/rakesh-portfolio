'use client';

import React from 'react';
import { portfolioData } from '@/data/portfolioData';
import { RollingCounter } from './RollingCounter';

export function StatsSection() {
  const { stats } = portfolioData;

  return (
    <section
      id="stats"
      className="stats-section"
      style={{
        width: '100%',
        position: 'relative',
      }}
    >
      <div className="site-container">
        <div className="stats-content-wrapper">
          <div className="stats-row">
            {stats.map((stat, index) => (
              <div key={`stat-${index}`} className="stat-item">
                <RollingCounter
                  targetValue={stat.targetValue}
                  padZero={stat.padZero}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .stats-section {
          padding: 48px 0 80px;
        }

        .stats-content-wrapper {
          width: 85%;
          margin-left: auto;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
          align-items: flex-start;
          width: 100%;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 1024px) {
          .stats-content-wrapper {
            width: 100%;
            margin-left: 0;
          }

          .stats-row {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }
        }

        @media (max-width: 809.98px) {
          .stats-section {
            padding: 48px 0 60px;
          }

          .stats-content-wrapper {
            width: 100%;
            margin-left: 0;
          }

          .stats-row {
            display: flex;
            flex-direction: column;
            gap: 48px;
          }
        }
      `}</style>
    </section>
  );
}
