'use client';

import React, { useEffect, useState, useRef } from 'react';
import { portfolioData } from '@/data/portfolioData';
import { MagneticLink } from '@/components/ui/MagneticLink';

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Keep visible near the very top of the page
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 5) {
        // Scrolling down -> hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 5) {
        // Scrolling up -> reveal navbar
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { siteInfo, navigation } = portfolioData;

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        transform: isVisible ? 'translateY(0)' : 'translateY(-80px)',
        transition: 'transform 0.8s cubic-bezier(0.32, 0.94, 0.6, 1)',
        pointerEvents: 'auto',
      }}
    >
      <div className="site-container nav-container">
        {/* Brand */}
        <div className="nav-brand-col">
          <a
            href="/"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: '19.2px',
              color: 'var(--color-white)',
              textDecoration: 'none',
              letterSpacing: '0.02em',
            }}
          >
            {siteInfo.name}
          </a>
        </div>

        {/* Navigation items (hidden on mobile) */}
        <div className="nav-desktop-item nav-links-col">
          {navigation.map((item) => (
            <MagneticLink
              key={item.label}
              href={item.href}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '15px',
                lineHeight: '19.2px',
                color: 'var(--color-muted)',
                letterSpacing: '0.02em',
              }}
            >
              {item.label}
            </MagneticLink>
          ))}
        </div>

        {/* CTA Button */}
        <div className="nav-contact-col" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <MagneticLink
            href="#contact"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '15px',
              fontWeight: 500,
              color: 'var(--color-white)',
              letterSpacing: '0.02em',
            }}
          >
            Let's Talk
          </MagneticLink>
        </div>
      </div>

      <style jsx>{`
        .nav-container {
          height: 74px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-brand-col {
          flex: 0 0 auto;
        }

        .nav-links-col {
          display: flex;
          align-items: center;
          gap: 36px;
        }

        @media (max-width: 809.98px) {
          .nav-container {
            height: 58px;
          }

          .nav-desktop-item {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}
