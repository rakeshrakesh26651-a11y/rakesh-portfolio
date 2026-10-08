'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Preloader } from '@/components/preloader/Preloader';
import { Navbar } from '@/components/navigation/Navbar';
import { Hero } from '@/components/hero/Hero';
import { SelectedWorks } from '@/components/projects/SelectedWorks';
import { AboutSection } from '@/components/about/AboutSection';
import { ServicesSection } from '@/components/services/ServicesSection';
import { AwardsSection } from '@/components/awards/AwardsSection';
import { StatsSection } from '@/components/stats/StatsSection';
import { ContactSection } from '@/components/contact/ContactSection';
import { Footer } from '@/components/footer/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) return;

      const dividers = document.querySelectorAll('.divider-line');
      dividers.forEach((divider) => {
        gsap.fromTo(
          divider,
          { scaleX: 0, transformOrigin: 'left' },
          {
            scaleX: 1,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: divider,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);
  return (
    <>
      <Preloader />
      <Navbar />

      {/* Main Foreground Container */}
      <main
        style={{
          position: 'relative',
          zIndex: 2,
          overflow: 'hidden',
          marginBottom: 0,
        }}
      >
        <Hero />

        <div className="site-container">
          <div className="divider-line" />
        </div>

        <SelectedWorks />

        <div className="site-container">
          <div className="divider-line" />
        </div>

        <AboutSection />

        <div className="site-container">
          <div className="divider-line" />
        </div>

        <ServicesSection />

        <div className="site-container">
          <div className="divider-line" />
        </div>

        <AwardsSection />

        <div className="site-container">
          <div className="divider-line" />
        </div>

        <StatsSection />

        <div className="site-container">
          <div className="divider-line" />
        </div>

        <ContactSection />
      </main>

      {/* Sticky Curtain Reveal Footer */}
      <Footer />
    </>
  );
}
