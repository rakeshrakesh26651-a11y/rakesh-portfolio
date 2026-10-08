'use client';

import React, { useState } from 'react';

interface MagneticLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function MagneticLink({
  href,
  children,
  className = '',
  target,
  rel,
  style,
  onClick,
}: MagneticLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    if (!e.defaultPrevented && href.startsWith('#') && href.length > 1) {
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        const lenis = (window as any).__lenis;
        if (lenis) {
          lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.2 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        if (window.history.pushState) {
          window.history.pushState(null, '', href);
        }
      }
    }
  };

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        textDecoration: 'none',
        overflow: 'hidden',
        cursor: 'pointer',
        paddingBottom: '2px',
        ...style,
      }}
      className={`group ${className}`}
    >
      <span>{children}</span>
      <span
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '1px',
          backgroundColor: '#ffffff',
          transformOrigin: 'left',
          transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      />
    </a>
  );
}
