'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData, socialLinks } from '@/data/portfolioData';
import { MagneticLink } from '@/components/ui/MagneticLink';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const { footerNavigation, siteInfo } = portfolioData;

  const footerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const brandTextRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  const activeSocials = [
    { label: 'Instagram', href: socialLinks.instagram },
    { label: 'GitHub', href: socialLinks.github },
    { label: 'LinkedIn', href: socialLinks.linkedin },
    { label: 'WhatsApp', href: socialLinks.whatsapp },
  ].filter((item) => Boolean(item.href && item.href.trim().length > 0));

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) return;

      const isMobile = window.innerWidth <= 809.98;

      // 1. Navigation links: masked upward reveal with stagger
      if (navRef.current) {
        const navLinks = navRef.current.querySelectorAll('.footer-nav-link');
        gsap.fromTo(
          navLinks,
          {
            yPercent: 120,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: navRef.current,
              start: isMobile ? 'top 92%' : 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Large Brand Text (RAKESH):
      // Horizontal cinematic movement across/into viewport scrubbed to scrolling
      if (brandTextRef.current) {
        const moveDistance = isMobile ? 45 : 85;
        gsap.fromTo(
          brandTextRef.current,
          {
            x: -moveDistance,
            opacity: 0,
            filter: 'blur(6px)',
          },
          {
            x: 0,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: isMobile ? 'top 88%' : 'top 82%',
              end: isMobile ? 'bottom 95%' : 'bottom 90%',
              scrub: 1.2,
            },
          }
        );
      }

      // 3. Role & Bio text reveal
      if (roleRef.current && bioRef.current) {
        gsap.fromTo(
          [roleRef.current, bioRef.current],
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: brandTextRef.current || footerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 4. Bottom metadata & social links: reveal last
      if (bottomRowRef.current) {
        gsap.fromTo(
          bottomRowRef.current,
          {
            y: 24,
            opacity: 0,
            clipPath: 'inset(20% 0% 0% 0%)',
          },
          {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bottomRowRef.current,
              start: 'top 95%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Refresh ScrollTrigger coordinates after mounting to synchronize with Lenis
      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);

      return () => {
        clearTimeout(refreshTimer);
      };
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer id="footer" ref={footerRef} className="site-footer">
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
        {/* Centered Navigation Links with masked container */}
        <div ref={navRef} className="footer-nav-menu">
          {footerNavigation.map((link) => (
            <div
              key={link.label}
              className="footer-nav-item"
              style={{ overflow: 'hidden' }}
            >
              <MagneticLink
                href={link.href}
                className="footer-nav-link"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 400,
                  color: 'var(--color-white)',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  display: 'inline-block',
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
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              overflow: 'hidden',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <span
              ref={brandTextRef}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(28px, 4vw, 44px)',
                color: 'var(--color-white)',
                letterSpacing: '0.05em',
                display: 'inline-block',
                willChange: 'transform, filter, opacity',
              }}
            >
              {siteInfo.name}
            </span>
          </div>
          <span
            ref={roleRef}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              color: 'var(--color-secondary)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'inline-block',
            }}
          >
            {siteInfo.role}
          </span>
          <p
            ref={bioRef}
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
        <div ref={bottomRowRef} className="footer-bottom-row">
          {/* Left Column: Socials + Copyright */}
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
          position: relative;
          z-index: 2;
          width: 100%;
          min-height: 520px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 80px 16px 36px;
          background-color: transparent !important;
          overflow: hidden;
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
            min-height: auto;
            margin-top: -16px;
            padding: 24px 16px 32px;
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
