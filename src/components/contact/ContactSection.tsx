'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const contactLinks = {
  whatsapp: 'https://wa.me/919739090490',
  instagram: 'https://instagram.com/_rakesh_2005',
  email: 'mailto:rakeshrakesh26651@gmail.com',
};

const contactOptions = [
  {
    id: 'whatsapp',
    title: 'WHATSAPP',
    description: 'Chat with me directly',
    href: contactLinks.whatsapp,
    isExternal: true,
  },
  {
    id: 'instagram',
    title: 'INSTAGRAM',
    description: 'See my latest work',
    href: contactLinks.instagram,
    isExternal: true,
  },
  {
    id: 'gmail',
    title: 'GMAIL',
    description: 'Send me an email',
    href: contactLinks.email,
    isExternal: false,
  },
];

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="contact-section"
      style={{
        width: '100%',
        position: 'relative',
        padding: '96px 0 110px',
      }}
    >
      <div className="site-container">
        <div
          ref={contentRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '920px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
              marginBottom: '20px',
            }}
          >
            GET IN TOUCH
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(38px, 5.5vw, 76px)',
              fontWeight: 400,
              lineHeight: 1.15,
              color: 'var(--color-white)',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              margin: '0 0 24px',
            }}
          >
            LET'S WORK TOGETHER
          </h2>

          <div
            className="text-mono-base"
            style={{
              maxWidth: '560px',
              lineHeight: 1.6,
              color: 'var(--color-muted)',
              marginBottom: '48px',
            }}
          >
            <p style={{ margin: '0 0 8px' }}>
              Have a project, business, brand, or idea in mind?
            </p>
            <p style={{ margin: 0, color: 'var(--color-white)' }}>
              Let's build something great together.
            </p>
          </div>

          {/* Three Premium Contact Options */}
          <div className="contact-options-grid">
            {contactOptions.map((option) => (
              <a
                key={option.id}
                href={option.href}
                target={option.isExternal ? '_blank' : undefined}
                rel={option.isExternal ? 'noopener noreferrer' : undefined}
                className="contact-option-card group"
              >
                <div className="contact-card-header">
                  <div className="contact-card-title-wrap">
                    <span className="contact-card-title">{option.title}</span>
                    <span className="contact-card-underline" />
                  </div>
                  <span className="contact-card-arrow" aria-hidden="true">
                    →
                  </span>
                </div>

                <p className="contact-card-description">{option.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-options-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          width: 100%;
        }

        .contact-option-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          padding: 28px 24px;
          background-color: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--color-border);
          border-radius: 2px;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.3s ease, border-color 0.3s ease;
          width: 100%;
          min-height: 110px;
          justifyContent: space-between;
          box-sizing: border-box;
        }

        .contact-option-card:hover,
        .contact-option-card:focus-visible {
          background-color: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.4);
          outline: none;
        }

        .contact-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .contact-card-title-wrap {
          position: relative;
          display: inline-flex;
          flex-direction: column;
          padding-bottom: 3px;
        }

        .contact-card-title {
          font-family: var(--font-mono);
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-white);
        }

        .contact-card-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: #ffffff;
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .contact-option-card:hover .contact-card-underline,
        .contact-option-card:focus-visible .contact-card-underline {
          transform: scaleX(1);
        }

        .contact-card-arrow {
          font-family: var(--font-mono);
          font-size: 16px;
          color: var(--color-white);
          transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          line-height: 1;
        }

        .contact-option-card:hover .contact-card-arrow,
        .contact-option-card:focus-visible .contact-card-arrow {
          transform: translateX(5px);
        }

        .contact-card-description {
          font-family: var(--font-mono);
          font-size: 13px;
          line-height: 1.45;
          color: var(--color-muted);
          margin: 12px 0 0 0;
          transition: color 0.3s ease;
        }

        .contact-option-card:hover .contact-card-description,
        .contact-option-card:focus-visible .contact-card-description {
          color: rgba(255, 255, 255, 0.9);
        }

        @media (max-width: 809.98px) {
          .contact-options-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .contact-option-card {
            padding: 22px 20px;
            min-height: 90px;
          }
        }
      `}</style>
    </section>
  );
}
