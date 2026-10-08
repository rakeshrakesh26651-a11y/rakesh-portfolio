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
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    // Parallax scroll effect matching Patrick Jane implementation
    const factor = (speed - 100) / 100;
    const yStart = factor * 40;
    const yEnd = -factor * 40;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { yPercent: yStart },
        {
          yPercent: yEnd,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [speed]);

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(liveUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`project-card ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: width,
        position: 'relative',
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
              height: '115%',
              position: 'absolute',
              top: '-7.5%',
              left: 0,
              objectFit: 'cover',
            }}
          />
        </div>
      </div>

      {/* Project info & metadata */}
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
