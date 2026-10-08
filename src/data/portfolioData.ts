export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  year: string;
  image: string;
  liveUrl: string;
  speed?: number;
}

export interface ServiceItemData {
  number: string;
  title: string;
  description: string;
}

export interface TechItemData {
  pillar: string;
  technologies: string;
  value: string;
}

export interface StatItemData {
  targetValue: number;
  padZero?: boolean;
  suffix: string;
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export const contactLinks = {
  whatsapp: "https://wa.me/919739090490",
  instagram: "https://instagram.com/_rakesh_2005",
  email: "mailto:rakeshrakesh26651@gmail.com",
};

export const socialLinks = {
  instagram: contactLinks.instagram,
  github: '',
  linkedin: '',
  whatsapp: contactLinks.whatsapp,
};

export const portfolioData = {
  siteInfo: {
    name: 'RAKESH',
    role: 'Full-Stack Web Developer',
    studioLabel: 'Available for Projects',
    inquiryLabel: 'Direct Inquiries',
    inquiryEmail: 'rakeshrakesh26651@gmail.com',
    contactLink: '#contact',
    tagline:
      'I design and build modern, high-performance websites and digital experiences that help businesses stand out, build trust, and grow online.',
    copyright: '© 2026 Rakesh. All rights reserved.',
    creatorName: 'Rakesh',
  },

  heroCarousel: [
    '/images/projects/gusto-cafe.jpg',
    '/images/projects/wedding-couple.jpg',
    '/images/projects/gym-fitness.jpg',
    '/images/projects/jewellery.jpg',
    '/images/projects/himalayan-harvest.jpg',
  ],

  projects: [
    {
      id: 'gusto-cafe',
      title: 'Gusto Cafe',
      category: 'Restaurant / Business Website',
      description:
        'A modern cafe website designed to showcase the brand, menu, atmosphere, and customer experience through a premium digital presence.',
      year: '2026',
      image: '/images/projects/gusto-cafe.jpg',
      liveUrl: 'https://gusto-cafe-iota.vercel.app/',
      speed: 120,
    },
    {
      id: 'wedding-couple',
      title: 'Wedding Couple',
      category: 'Wedding / Personal Website',
      description:
        "A romantic and visually engaging wedding website designed to present the couple's story, wedding details, and special moments through an elegant digital experience.",
      year: '2026',
      image: '/images/projects/wedding-couple.jpg',
      liveUrl: 'https://weddingcouple-five.vercel.app/',
      speed: 65,
    },
    {
      id: 'gym-fitness',
      title: 'Gym Fitness',
      category: 'Fitness / Business Website',
      description:
        'A modern fitness website focused on strong visual presentation, services, programs, and an energetic user experience.',
      year: '2026',
      image: '/images/projects/gym-fitness.jpg',
      liveUrl: 'https://gymfitness-flame.vercel.app/',
      speed: 85,
    },
    {
      id: 'premium-jewellery',
      title: 'Premium Jewellery',
      category: 'Jewellery / E-Commerce',
      description:
        'A premium jewellery website designed around elegant visuals, product presentation, refined typography, and a luxury shopping experience.',
      year: '2026',
      image: '/images/projects/jewellery.jpg',
      liveUrl: 'https://jewellery-mauve-eta.vercel.app/',
      speed: 60,
    },
    {
      id: 'nivyuga',
      title: 'Nivyuga',
      category: 'Business Website',
      description:
        'A modern business website focused on presenting the brand professionally with a clean interface, responsive design, and engaging user experience.',
      year: '2026',
      image: '/images/projects/nivyuga.jpg',
      liveUrl: 'https://nivyuga.vercel.app/',
      speed: 130,
    },
    {
      id: 'mysore-plant',
      title: 'Mysore Plant',
      category: 'Plant / Business Website',
      description:
        'A modern website created for a plant business to showcase products, build trust, and provide customers with a professional online presence.',
      year: '2026',
      image: '/images/projects/mysore-plant.jpg',
      liveUrl: 'https://mysoreplant.vercel.app/',
      speed: 125,
    },
    {
      id: 'himalayan-harvest',
      title: 'Himalayan Harvest Honey',
      category: 'E-Commerce / Honey Brand',
      description:
        'A premium honey e-commerce website featuring product discovery, honey varieties, product options, customer reviews, policies, and online purchasing.',
      year: '2026',
      image: '/images/projects/himalayan-harvest.jpg',
      liveUrl: 'https://honey-navy-psi.vercel.app/',
      speed: 70,
    },
    {
      id: 'build-interior',
      title: 'Build Interior',
      category: 'Interior Design',
      description:
        'A modern luxury interior design website crafted with elegant editorial layouts, architectural aesthetics, and high-end project showcases.',
      year: '2026',
      image: '/images/projects/build-interior.jpg',
      liveUrl: 'https://buildinterior.vercel.app/',
      speed: 85,
    },
  ] as ProjectItem[],

  about: {
    eyebrow: 'ABOUT ME',
    statementLines: [
      "I'm Rakesh, a full-stack web developer focused",
      'on creating modern, high-quality websites',
      "and web applications that don't just look good",
      '— they work.',
    ],
    portraitImage: '/images/about-portrait.png',
    paragraph1Words: [
      { text: 'Over the ' },
      { text: 'past year', highlight: true },
      { text: ", I've built multiple " },
      { text: 'real-world websites', highlight: true },
      { text: ' for different types of ' },
      { text: 'businesses', highlight: true },
      { text: ', ' },
      { text: 'brands', highlight: true },
      { text: ', and ' },
      { text: 'personal projects', highlight: true },
      { text: '.' },
    ],
    paragraph2Words: [
      { text: 'I combine ' },
      { text: 'modern development', highlight: true },
      { text: ', ' },
      { text: 'premium UI design', highlight: true },
      { text: ', ' },
      { text: 'smooth interactions', highlight: true },
      { text: ', ' },
      { text: 'responsive layouts', highlight: true },
      { text: ', and ' },
      { text: 'performance-focused engineering', highlight: true },
      { text: " to create websites that don't just look good — " },
      { text: 'they work', highlight: true },
      { text: '.' },
    ],
    paragraph3Words: [
      { text: "I'm constantly " },
      { text: 'experimenting', highlight: true },
      { text: ', ' },
      { text: 'learning', highlight: true },
      { text: ', and pushing my ' },
      { text: 'development skills', highlight: true },
      { text: ' by building real projects from ' },
      { text: 'idea to deployment', highlight: true },
      { text: '.' },
    ],
    buttonText: "Let's Talk",
    buttonLink: '#contact',
  },

  services: [
    {
      number: '01',
      title: 'Website Development',
      description: 'Modern, responsive websites built with clean code and optimized for performance.',
    },
    {
      number: '02',
      title: 'Full-Stack Development',
      description: 'Complete web applications with frontend, backend, databases, APIs, authentication, and integrations.',
    },
    {
      number: '03',
      title: 'Premium UI Development',
      description: 'High-end interfaces with strong typography, layouts, interactions, and visual hierarchy.',
    },
    {
      number: '04',
      title: 'E-Commerce Development',
      description: 'Modern online stores with product presentation, product management, checkout, payments, and responsive experiences.',
    },
    {
      number: '05',
      title: 'Website Redesign',
      description: 'Transform outdated websites into modern, professional digital experiences.',
    },
    {
      number: '06',
      title: 'Performance & Optimization',
      description: 'Improve loading speed, responsiveness, SEO, accessibility, and overall website performance.',
    },
  ] as ServiceItemData[],

  techAndWhy: [
    {
      pillar: 'MODERN DEVELOPMENT',
      technologies: 'Next.js · React · TypeScript · JavaScript · Node.js',
      value: 'Built with modern technologies and production-ready development practices.',
    },
    {
      pillar: 'PREMIUM DESIGN',
      technologies: 'GSAP · ScrollTrigger · Framer Motion · Tailwind CSS',
      value: 'Strong typography, spacing, layouts, interactions, and visual hierarchy.',
    },
    {
      pillar: 'HIGH PERFORMANCE',
      technologies: 'Lenis · Next.js · Performance Optimization · SEO',
      value: 'Fast, responsive websites designed to provide a smooth user experience.',
    },
    {
      pillar: 'FULLY RESPONSIVE',
      technologies: 'Modern CSS · Fluid Breakpoints · Mobile-First Architecture',
      value: 'Every website is designed to work beautifully across desktop, tablet, and mobile.',
    },
    {
      pillar: 'BACKEND & DATA',
      technologies: 'PostgreSQL · MongoDB · Supabase · Firebase · REST APIs',
      value: 'Complete web applications with robust databases, APIs, and authentication.',
    },
    {
      pillar: 'BUSINESS FOCUSED',
      technologies: 'Git · GitHub · Vercel Production Deployments',
      value: 'Websites built to help businesses establish credibility and create more opportunities.',
    },
  ] as TechItemData[],

  stats: [
    {
      targetValue: 7,
      padZero: true,
      suffix: '+',
      label: 'Websites Built',
    },
    {
      targetValue: 1,
      padZero: true,
      suffix: '',
      label: 'Year of Development',
    },
    {
      targetValue: 7,
      padZero: true,
      suffix: '+',
      label: 'Real Projects',
    },
    {
      targetValue: 100,
      padZero: false,
      suffix: '%',
      label: 'Focus on Quality',
    },
  ] as StatItemData[],

  contact: {
    title: "LET'S WORK TOGETHER",
    subtitle:
      'Have a project, business, brand, or idea in mind?\n\nLet’s build something great together.',
    options: [
      {
        id: 'whatsapp',
        label: 'WHATSAPP',
        description: 'Chat with me directly',
        href: contactLinks.whatsapp,
        external: true,
      },
      {
        id: 'instagram',
        label: 'INSTAGRAM',
        description: 'See my latest work',
        href: contactLinks.instagram,
        external: true,
      },
      {
        id: 'gmail',
        label: 'GMAIL',
        description: 'Send me an email',
        href: contactLinks.email,
        external: false,
      },
    ],
  },

  navigation: [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ] as NavLink[],

  footerNavigation: [
    { label: 'WORK', href: '#work' },
    { label: 'ABOUT', href: '#about' },
    { label: 'SERVICES', href: '#services' },
    { label: 'CONTACT', href: '#contact' },
  ] as NavLink[],
};
