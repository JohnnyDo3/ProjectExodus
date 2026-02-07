import type { ArchitecturalElement } from '../../../types';

export const SPREAD_FOOTING: ArchitecturalElement = {
  id: 'spread-footing',
  slug: 'spread-footing',
  name: 'Spread Footing',
  alternativeNames: ['Isolated Footing', 'Pad Footing', 'Individual Footing'],
  pronunciation: {
    phonetic: 'SPRED FOOT-ing',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'A foundation that "spreads" the concentrated column load over a larger soil area',
    rootWord: 'spread + footing',
  },
  category: 'STRUCTURAL',
  subcategory: 'foundation_systems',
  periods: ['roman', 'renaissance', 'neoclassical', 'international-style', 'contemporary'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/spread-footing-primary.jpg',
    gallery: [
      '/images/architecture/elements/spread-footing-construction.jpg',
      '/images/architecture/elements/spread-footing-section.jpg',
    ],
    diagram: '/images/architecture/diagrams/spread-footing.svg',
  },

  description: {
    ELEMENTARY: 'A spread footing is like a big flat shoe for a building column. Just like your shoes spread your weight so you don\'t sink into sand, a spread footing spreads the weight of a building column over the ground so it doesn\'t sink!',
    MIDDLE_SCHOOL: 'A spread footing is a shallow foundation that supports a single column. It\'s a thick concrete pad that\'s wider than the column it supports. By spreading the load over a larger area, it reduces the pressure on the soil below to a level the ground can handle without settling.',
    HIGH_SCHOOL: 'Spread footings are shallow foundations that distribute column loads to the soil over an enlarged area. The footing size is determined by dividing the column load by the allowable soil bearing capacity. Reinforcement is required to resist bending stresses in the footing. They are economical when soil conditions are good near the surface.',
    UNDERGRADUATE: 'Spread footings transfer column loads through bearing pressure to competent soil. Design involves: determining required area from service loads and allowable bearing capacity, sizing depth for shear (punching and wide beam), and calculating flexural reinforcement. Critical sections for shear are at distances d and d/2 from the column face per ACI 318.',
    GRADUATE: 'Advanced spread footing design considers soil-structure interaction, including the distribution of bearing pressure under eccentric loading and the effects of soil nonlinearity. Research on the reliability of bearing capacity theories (Terzaghi, Meyerhof, Hansen) informs LRFD resistance factors. Settlement analysis using elastic theory or finite element modeling complements strength-based design.',
    PHD: 'Research on spread footings addresses fundamental bearing capacity mechanics, including scale effects, shape factors, and depth factors under various loading conditions. Topics include: probabilistic bearing capacity analysis, the effect of footing roughness on failure mechanisms, and the application of limit analysis and finite element methods to complex geometries and layered soil profiles.',
  },

  history: {
    ELEMENTARY: 'People have used spread footings for thousands of years! Ancient Romans built stone foundations under their columns. Today we use reinforced concrete, which is much stronger and allows us to build taller buildings.',
    MIDDLE_SCHOOL: 'Spread footings are one of the oldest foundation types. Ancient builders placed flat stones under columns to spread the load. Modern reinforced concrete footings were developed in the late 1800s. Today, spread footings are designed using soil mechanics principles established in the 20th century.',
    HIGH_SCHOOL: 'Spread footings evolved from ancient masonry practice to modern engineered foundations. The theoretical basis for bearing capacity was established by Terzaghi in 1943. Before that, empirical rules based on soil type guided footing size. Reinforced concrete enabled more economical footings by providing tensile capacity.',
    UNDERGRADUATE: 'The evolution from empirical to rational footing design parallels the development of soil mechanics. Terzaghi\'s 1943 bearing capacity theory provided the first comprehensive framework. Subsequent modifications by Meyerhof, Hansen, and Vesic refined the approach for various footing shapes and loading conditions. ACI 318 provisions for concrete design complement geotechnical requirements.',
    GRADUATE: 'Historical development of spread footing theory reflects the broader evolution of geotechnical engineering. Early 20th century empirical bearing capacities gave way to Terzaghi\'s plasticity-based theory. Research on the effects of footing shape, depth, inclination, and proximity to slopes has refined bearing capacity equations used in current design codes.',
    PHD: 'Advanced research on spread footings continues to refine understanding of bearing capacity mechanisms. Topics include: experimental validation of theoretical failure surfaces, numerical modeling of progressive failure, and the application of reliability methods to account for spatial variability of soil properties. Research informs ongoing updates to codes including ASCE 7 and IBC.',
  },

  characteristics: [
    'Shallow foundation near ground surface',
    'Supports a single column or pier',
    'Spreads load over enlarged area',
    'Typically square or rectangular reinforced concrete',
    'Size determined by soil bearing capacity',
    'Economical for good soil conditions',
  ],

  famousExamples: [
    { name: 'Most Residential Construction', location: 'Global', year: 'Historic to present', description: 'Standard foundation for houses and low-rise buildings' },
    { name: 'Ancient Roman Temples', location: 'Italy', year: 'Ancient', description: 'Stone footings under marble columns' },
    { name: 'Commercial Buildings', location: 'Global', year: 'Modern', description: 'Common for buildings with adequate bearing capacity' },
  ],

  confusionPairs: [
    {
      elementId: 'mat-foundation',
      reason: 'Both are shallow foundations',
      distinction: 'Spread footing supports ONE column; mat foundation is a single slab under the ENTIRE building',
    },
    {
      elementId: 'driven-pile',
      reason: 'Both are foundation types',
      distinction: 'Spread footing is SHALLOW (near surface); piles are DEEP (extend to strong soil/rock below)',
    },
  ],

  searchTags: ['foundation', 'structural', 'footing', 'spread', 'shallow', 'concrete', 'bearing', 'column', 'soil'],

  difficultyScore: 2,
  dateAdded: new Date('2026-02-07'),
  lastUpdated: new Date('2026-02-07'),
};
