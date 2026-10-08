'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  description: string;
  year: string;
  image: string;
  liveUrl: string;
  aspectRatio?: string;
  width?: string;
  speed?: number;
  className?: string;
}

export function ProjectCard({
  id,
  title,
  category,
  description,
  year,
  image,
  liveUrl,
  aspectRatio = '1 / 1',
  width = '100%',
  speed = 80,
  className = '',
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) return;

      // 1. Card-level differential translation on desktop
      const isMobile = window.innerWidth <= 809.98;
      if (!isMobile && cardRef.current) {
        const differentialY = ((speed - 85) / 100) * 45;
        if (Math.abs(differentialY) > 2) {
          gsap.fromTo(
            cardRef.current,
            { y: differentialY },
            {
              y: -differentialY,
              ease: 'none',
              scrollTrigger: {
                trigger: cardRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
              },
            }
          );
        }
      }

      // 2. Masked clip-path image reveal on viewport entry
      gsap.fromTo(
        containerRef.current,
        {
          clipPath: 'inset(10% 0% 10% 0%)',
          opacity: 0.85,
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 3. Scroll-linked Parallax & Scale scrub
      const factor = (speed - 100) / 100;
      const yStart = -10 + factor * 22;
      const yEnd = 10 - factor * 22;

      gsap.fromTo(
        imageRef.current,
        {
          yPercent: yStart,
          scale: 1.08,
        },
        {
          yPercent: yEnd,
          scale: 1.0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // 4. Staggered project metadata & description reveal
      if (textRef.current) {
        const textItems = textRef.current.children;
        gsap.fromTo(
          textItems,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, cardRef);

    return () => ctx.revert();
  }, [speed]);

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(liveUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      ref={cardRef}
      className={`project-card ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: width,
        position: 'relative',
        willChange: 'transform',
      }}
    >
      {/* Image container mask with parallax */}
      <div
        ref={containerRef}
        onClick={handleImageClick}
        style={{
          width: '100%',
          aspectRatio: aspectRatio,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#050505',
          borderRadius: '2px',
          cursor: 'pointer',
          willChange: 'clip-path, opacity',
        }}
        title={`Visit ${title}`}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            transform: isHovered ? 'scale(1.04)' : 'scale(1.0)',
            transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imageRef}
            src={image}
            alt={title}
            style={{
              width: '100%',
              height: '120%',
              position: 'absolute',
              top: '-10%',
              left: 0,
              objectFit: 'cover',
              willChange: 'transform',
            }}
          />
        </div>
      </div>

      {/* Project info & metadata */}
      <div
        ref={textRef}
        style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h4
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(20px, 2vw, 24px)',
              fontWeight: 400,
              lineHeight: 1.2,
              color: 'var(--color-white)',
              letterSpacing: '0em',
              margin: 0,
            }}
          >
            {title}
          </h4>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              color: 'var(--color-muted)',
            }}
          >
            {year}
          </span>
        </div>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--color-muted)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          {category}
        </span>

        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            lineHeight: 1.45,
            color: 'var(--color-secondary)',
            margin: '4px 0 10px',
          }}
        >
          {description}
        </p>

        {/* Project CTA Button / Link */}
        <div>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              color: isHovered ? 'var(--color-white)' : 'var(--color-secondary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              paddingBottom: '2px',
              borderBottom: `1px solid ${isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.35)'}`,
              transition: 'border-color 0.3s ease, color 0.3s ease',
              cursor: 'pointer',
            }}
          >
            Visit Website
            <span aria-hidden="true" style={{ fontSize: '12px' }}>
              ↗
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
