import heroArt from '../assets/hero.png'

/** Image map — local hero art + verified remote photos */
export const siteImages = {
  hero: {
    main: {
      src: heroArt,
      alt: 'GSM — structured growth systems',
    },
    accent: {
      src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80&auto=format&fit=crop',
      alt: 'Analytics dashboard representing structured growth',
    },
  },
  problem: {
    src: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&q=80&auto=format&fit=crop',
    alt: 'Professionals discussing business challenges',
  },
  philosophy: {
    src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1100&q=80&auto=format&fit=crop',
    alt: 'Strategic planning session in modern office',
  },
  process: {
    src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80&auto=format&fit=crop',
    alt: 'Consulting workshop and execution planning',
  },
  about: {
    team: {
      src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80&auto=format&fit=crop',
      alt: 'Diverse leadership team in discussion',
    },
    vision: {
      src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=80&auto=format&fit=crop',
      alt: 'Collaborative workspace symbolizing market expansion',
    },
  },
  services: {
    audit: {
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80&auto=format&fit=crop',
      alt: 'Data review for market positioning audit',
    },
    strategy: {
      src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=80&auto=format&fit=crop',
      alt: 'Team defining business growth strategy',
    },
    'market-entry': {
      src: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=700&q=80&auto=format&fit=crop',
      alt: 'Global market and expansion planning',
    },
    brand: {
      src: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=700&q=80&auto=format&fit=crop',
      alt: 'Corporate building representing brand authority',
    },
  },
  industries: [
    {
      src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80&auto=format&fit=crop',
      alt: 'Manufacturing facility',
      label: 'Manufacturing',
    },
    {
      src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500&q=80&auto=format&fit=crop',
      alt: 'Hospitality and hotel business',
      label: 'Hospitality',
    },
    {
      src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80&auto=format&fit=crop',
      alt: 'Healthcare professionals',
      label: 'Healthcare',
    },
    {
      src: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&q=80&auto=format&fit=crop',
      alt: 'Real estate and property development',
      label: 'Real estate',
    },
  ],
  contact: {
    src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80&auto=format&fit=crop',
    alt: 'Professional consultation and partnership',
  },
  pageHero: {
    about: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80&auto=format&fit=crop',
    services: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=700&q=80&auto=format&fit=crop',
    industries: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=700&q=80&auto=format&fit=crop',
    contact: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=700&q=80&auto=format&fit=crop',
  },
}

/** Shown when a remote image fails to load */
export const imageFallback =
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80&auto=format&fit=crop'
