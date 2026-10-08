'use client';

import React from 'react';
import { portfolioData, socialLinks } from '@/data/portfolioData';
import { MagneticLink } from '@/components/ui/MagneticLink';

export function Footer() {
  const { footerNavigation, siteInfo } = portfolioData;

  const activeSocials = [
    { label: 'Instagram', href: socialLinks.instagram },
    { label: 'GitHub', href: socialLinks.github },
    { label: 'LinkedIn', href: socialLinks.linkedin },
    { label: 'WhatsApp', href: socialLinks.whatsapp },
  ].filter((item) => Boolean(item.href && item.href.trim().length > 0));

  return (
    <footer id="footer" className="site-footer">
      <div
        className="site-container"
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
          flex: 1,
        }}
      >
        {/* Centered Navigation Links matching original typography */}
        <div className="footer-nav-menu">
          {footerNavigation.map((link) => (
            <div key={link.label}>
              <MagneticLink
                href={link.href}
                className="footer-nav-link"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 400,
                  color: 'var(--color-white)',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                }}
              >
                {link.label}
              </MagneticLink>
            </div>
          ))}
        </div>

        {/* Identity & Bio */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '8px',
            marginBottom: '24px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '22px',
              color: 'var(--color-white)',
              letterSpacing: '0.05em',
            }}
          >
            {siteInfo.name}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              color: 'var(--color-secondary)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {siteInfo.role}
          </span>
          <p
            className="text-mono-sm"
            style={{
              color: 'var(--color-muted)',
              maxWidth: '480px',
              margin: '4px 0 0',
              lineHeight: 1.4,
            }}
          >
            Building modern websites, web applications, and digital experiences.
          </p>
        </div>

        {/* Bottom Metadata & Socials */}
        <div className="footer-bottom-row">
          {/* Left Column: Socials (hidden if empty) + Copyright */}
          <div className="footer-left-col">
            {activeSocials.length > 0 && (
              <div className="footer-socials-row">
                {activeSocials.map((social) => (
                  <MagneticLink
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: 'var(--color-white)',
                    }}
                  >
                    {social.label}
                  </MagneticLink>
                ))}
              </div>
            )}

            <p className="text-mono-sm" style={{ color: 'var(--color-muted)', margin: 0 }}>
              {siteInfo.copyright}
            </p>
          </div>

          {/* Right Column: Credits */}
          <div className="footer-right-col">
            <span className="text-mono-sm">
              Portfolio of{' '}
              <span style={{ color: 'var(--color-white)' }}>
                {siteInfo.creatorName}
              </span>
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .site-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: var(--footer-height);
          background-color: #000000;
          background-image: var(--bg-vignette);
          background-attachment: fixed;
          background-size: 100vw 100vh;
          background-repeat: no-repeat;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px 16px 24px;
        }

        .footer-nav-menu {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: auto;
          margin-bottom: auto;
        }

        :global(.footer-nav-link) {
          font-size: 32px !important;
          line-height: 38.4px !important;
        }

        .footer-bottom-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          width: 100%;
        }

        .footer-left-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
        }

        .footer-socials-row {
          display: flex;
          gap: 18px;
          align-items: center;
        }

        .footer-right-col {
          display: flex;
          gap: 24px;
          align-items: center;
        }

        @media (max-width: 809.98px) {
          .site-footer {
            position: relative;
            z-index: 3;
            height: auto;
            margin-top: -16px;
            padding: 0 16px 24px;
          }

          .footer-nav-menu {
            margin-top: 0;
            margin-bottom: 24px;
          }

          :global(.footer-nav-link) {
            font-size: 22px !important;
            line-height: 26px !important;
          }

          .footer-bottom-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }

          .footer-right-col {
            gap: 16px;
          }
        }
      `}</style>
    </footer>
  );
}
