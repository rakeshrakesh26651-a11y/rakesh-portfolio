'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { portfolioData } from '@/data/portfolioData';

export function HeroCarousel3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotatorRef = useRef<HTMLDivElement>(null);
  
  const angleRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const lastXRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const [isGrabbing, setIsGrabbing] = useState<boolean>(false);

  const images = portfolioData.heroCarousel;
  const cardCount = images.length;
  const radius = 286.2874; // exact pentagon apothem from reference site

  // Animation frame loop for continuous auto-rotation & momentum
  useEffect(() => {
    let animId: number;

    const loop = () => {
      if (!isDraggingRef.current) {
        // Apply friction to drag velocity
        if (Math.abs(velocityRef.current) > 0.02) {
          angleRef.current += velocityRef.current;
          velocityRef.current *= 0.95;
        } else {
          // Normal auto-rotation speed (~0.12 deg/frame)
          angleRef.current += 0.12;
        }
      }

      if (rotatorRef.current) {
        rotatorRef.current.style.transform = `translateZ(-${radius}px) rotateY(${angleRef.current}deg)`;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [radius]);

  // Pointer drag interactions
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = true;
    setIsGrabbing(true);
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    velocityRef.current = 0;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    
    // Sensitivity factor
    const angleDelta = deltaX * 0.35;
    angleRef.current += angleDelta;
    velocityRef.current = angleDelta;

    if (rotatorRef.current) {
      rotatorRef.current.style.transform = `translateZ(-${radius}px) rotateY(${angleRef.current}deg)`;
    }
  }, [radius]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = false;
    setIsGrabbing(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        width: '100%',
        height: '390px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'transparent',
        perspective: '3000px',
        cursor: isGrabbing ? 'grabbing' : 'grab',
        touchAction: 'none',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(-7deg)',
        }}
      >
        <div
          ref={rotatorRef}
          style={{
            position: 'relative',
            width: '320px',
            height: '390px',
            transformStyle: 'preserve-3d',
            transform: `translateZ(-${radius}px) rotateY(0deg)`,
          }}
        >
          {images.map((src, index) => {
            const angle = index * (360 / cardCount);
            return (
              <div
                key={`card-${index}`}
                style={{
                  position: 'absolute',
                  inset: 0,
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Front Face */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    backfaceVisibility: 'hidden',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${src})`,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
                  }}
                />
                {/* Back Face */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    backfaceVisibility: 'hidden',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${src})`,
                    transform: 'rotateY(180deg)',
                    filter: 'brightness(0.55)',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
