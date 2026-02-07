import type { ArchitecturalElement } from '../../../types';

export const PRATT_TRUSS: ArchitecturalElement = {
  id: 'pratt-truss',
  slug: 'pratt-truss',
  name: 'Pratt Truss',
  alternativeNames: ['Pratt Bridge', 'N-Truss'],
  pronunciation: {
    phonetic: 'PRAT TRUSS',
    language: 'English',
  },
  etymology: {
    origin: 'English (surname)',
    meaning: 'Named after inventors Thomas and Caleb Pratt who patented the design in 1844',
    rootWord: 'Pratt (inventors\' surname)',
  },
  category: 'STRUCTURAL',
  subcategory: 'truss_systems',
  periods: ['chicago-school', 'art-deco', 'international-style', 'contemporary'],
  regions: ['NORTH_AMERICA', 'EUROPE', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/pratt-truss-primary.jpg',
    gallery: [
      '/images/architecture/elements/pratt-truss-bridge.jpg',
      '/images/architecture/elements/pratt-truss-roof.jpg',
    ],
    diagram: '/images/architecture/diagrams/pratt-truss.svg',
  },

  description: {
    ELEMENTARY: 'A Pratt truss is a bridge or roof structure that looks like a series of triangles. The slanted pieces (diagonals) point toward the middle, like arrows pointing at each other. This design is very efficient for steel bridges!',
    MIDDLE_SCHOOL: 'The Pratt truss has vertical members and diagonal members that slope toward the center of the span. This creates a pattern where the diagonals form a V shape at each panel. Under normal loading, the diagonals carry tension (pulling forces), which makes it ideal for steel construction since steel is very strong in tension.',
    HIGH_SCHOOL: 'The Pratt truss, patented in 1844, arranges diagonal members to experience tension under gravity loads while vertical members experience compression. This is optimal for steel construction because tension members can be more slender than compression members. The top chord is in compression, the bottom chord in tension, creating a clear stress pattern.',
    UNDERGRADUATE: 'The Pratt truss exemplifies rational structural design where member orientation follows stress patterns. Under gravity loading, diagonals slope toward midspan and are in tension; verticals are in compression. This allows tension diagonals to be designed as slender rods or angles, reducing weight. Panel point loads simplify analysis, making Pratt trusses ideal for determinate structural analysis.',
    GRADUATE: 'The Pratt truss configuration demonstrates the interplay between material efficiency and constructability. The tension diagonal pattern emerged with iron and steel construction, where tension members could be efficiently designed as angle sections or rods. Secondary stresses from member continuity at joints, addressed by Manderla and other 19th-century researchers, inform modern connection design.',
    PHD: 'Advanced analysis of Pratt trusses encompasses fatigue behavior of riveted and welded connections, redundancy assessment for fracture-critical designations, and load rating of historic structures. Research on non-composite and composite Pratt truss bridges addresses the evolution of live load distribution factors and their application to rating and rehabilitation of the extensive North American bridge inventory.',
  },

  history: {
    ELEMENTARY: 'Two American inventors, Thomas and Caleb Pratt, came up with this bridge design in 1844. It became one of the most popular bridge types in America, especially for railroad bridges. Many old railroad bridges still standing today are Pratt trusses!',
    MIDDLE_SCHOOL: 'Thomas and Caleb Pratt patented their truss design in 1844. It quickly became popular for railroad bridges because it used materials efficiently - the steel parts that were stretched (tension) could be thinner than the parts being squeezed (compression). Thousands of Pratt truss bridges were built across America during the railroad expansion.',
    HIGH_SCHOOL: 'The Pratt truss was patented in 1844, during the American railroad boom. Its efficiency made it the dominant bridge type for over a century. The design was optimized for iron and steel, with tension diagonals that could use the full strength of the material without buckling concerns. The Pratt brothers\' father, Azariah Pratt, was also a noted bridge builder.',
    UNDERGRADUATE: 'The Pratt truss patent of 1844 represented a shift from compression-oriented designs (like the Howe truss) to tension-oriented systems suited to iron and steel. The change from cast iron to wrought iron and steel, which excelled in tension, made the Pratt configuration dominant. Standard Pratt truss designs were developed by railroads and published in engineering manuals.',
    GRADUATE: 'The dominance of the Pratt truss in 19th and early 20th century bridge construction reflects the rational application of structural mechanics to economical design. The configuration minimized material use by exploiting steel\'s tension capacity. Standardization by railroad companies enabled rapid construction. The extensive inventory of historic Pratt truss bridges now presents preservation and rating challenges.',
    PHD: 'Research on Pratt truss bridges addresses the interrelated challenges of historic preservation, structural assessment, and continued service. Topics include: fatigue assessment of built-up member connections, system redundancy analysis, and the development of refined load distribution factors for rating. The American Railway Engineering and Maintenance-of-Way Association (AREMA) provisions reflect ongoing research into the behavior of these structures.',
  },

  characteristics: [
    'Diagonals slope toward center of span',
    'Diagonals in tension under gravity loads',
    'Verticals in compression',
    'Top chord in compression, bottom chord in tension',
    'Efficient for steel construction',
    'Common panel point configuration simplifies analysis',
  ],

  famousExamples: [
    { name: 'Thousands of Railroad Bridges', location: 'USA', year: '1850s-1950s', description: 'Standard design for American railroads' },
    { name: 'Historic Covered Bridges', location: 'USA', year: '1840s-1900s', description: 'Timber versions protected by roofing' },
    { name: 'Industrial Roof Structures', location: 'Global', year: '1900s-present', description: 'Common for long-span roofs' },
  ],

  confusionPairs: [
    {
      elementId: 'howe-truss',
      reason: 'Similar appearance with different diagonal orientation',
      distinction: 'Pratt diagonals point IN toward center (tension); Howe diagonals point OUT from center (compression)',
    },
    {
      elementId: 'warren-truss',
      reason: 'Both are common truss types',
      distinction: 'Pratt has verticals + diagonals; Warren has ONLY equilateral triangles, no verticals',
    },
  ],

  searchTags: ['truss', 'structural', 'bridge', 'Pratt', 'railroad', 'tension', 'steel', 'span', 'roof'],

  difficultyScore: 3,
  dateAdded: new Date('2026-02-07'),
  lastUpdated: new Date('2026-02-07'),
};
