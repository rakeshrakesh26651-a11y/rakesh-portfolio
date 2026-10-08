import type { Metadata } from 'next';
import './globals.css';
import { SmoothScroll } from '@/components/animations/SmoothScroll';

export const metadata: Metadata = {
  title: 'Rakesh — Full-Stack Web Developer',
  description:
    'Rakesh is a full-stack web developer building modern, high-performance websites and digital experiences for businesses, brands, and entrepreneurs.',
  openGraph: {
    title: 'Rakesh — Full-Stack Web Developer',
    description: 'Modern websites, web applications, and digital experiences built by Rakesh.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/Gambarino-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <SmoothScroll>
          <div className="grain-overlay" aria-hidden="true" />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
