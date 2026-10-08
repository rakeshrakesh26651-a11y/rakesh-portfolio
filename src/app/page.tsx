'use client';

import React from 'react';
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

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />

      {/* Main Foreground Container */}
      <main
        style={{
          position: 'relative',
          zIndex: 2,
          backgroundColor: '#000000',
          boxShadow: '0 40px 80px rgba(0, 0, 0, 0.9)',
          overflow: 'hidden',
          marginBottom: 'var(--footer-height)',
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
