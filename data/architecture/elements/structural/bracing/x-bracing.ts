import type { ArchitecturalElement } from '../../../types';

export const X_BRACING: ArchitecturalElement = {
  id: 'x-bracing',
  slug: 'x-bracing',
  name: 'X-Bracing',
  alternativeNames: ['Cross Bracing', 'Tension-Only X-Brace', 'Diagonal Cross Bracing'],
  pronunciation: {
    phonetic: 'EKS BRAY-sing',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'Named for the X-shape formed by two crossing diagonal members',
    rootWord: 'X (letter shape) + bracing',
  },
  category: 'STRUCTURAL',
  subcategory: 'bracing_systems',
  periods: ['chicago-school', 'art-deco', 'international-style', 'high-tech', 'contemporary'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/x-bracing-primary.jpg',
    gallery: [
      '/images/architecture/elements/x-bracing-steel.jpg',
      '/images/architecture/elements/x-bracing-bridge.jpg',
    ],
    diagram: '/images/architecture/diagrams/x-bracing.svg',
  },

  description: {
    ELEMENTARY: 'X-bracing is when two diagonal pieces cross each other to make an X shape in a building frame. It\'s like making an X with your fingers - very strong! No matter which way you push the building, one of the diagonals will hold it up.',
    MIDDLE_SCHOOL: 'X-bracing (or cross bracing) uses two diagonal members that cross at the center of a frame bay. When lateral forces push the building one way, one diagonal stretches (tension) while the other relaxes. Push the other way, and they switch roles. This gives resistance in both directions.',
    HIGH_SCHOOL: 'X-bracing provides bi-directional lateral resistance by employing two diagonal members that intersect at the bay center. Under lateral loading, one diagonal experiences tension while the other may buckle in compression (tension-only design) or both share loads (tension-compression design). X-bracing is common in steel structures including bridges, buildings, and towers.',
    UNDERGRADUATE: 'X-bracing configurations can be designed as tension-only or tension-compression systems. In tension-only X-bracing, slender rods or cables are used; the compression diagonal buckles harmlessly while the tension diagonal carries all lateral load. Tension-compression X-bracing uses stockier members where both diagonals contribute, requiring consideration of connection geometry at the intersection.',
    GRADUATE: 'The seismic performance of X-bracing depends critically on whether a tension-only or tension-compression system is employed. Tension-only X-bracing avoids compression buckling issues but requires careful detailing of turnbuckles and connection pre-tension. Research on intermediate intersection connections in tension-compression X-bracing has informed AISC 341 provisions addressing out-of-plane buckling and fatigue at connection points.',
    PHD: 'Advanced modeling of X-bracing systems addresses the complex interaction of braces at the intersection point, including out-of-plane behavior and gusset plate demands under cyclic loading. Research on replaceable X-brace systems, including bolted splice connections designed as structural fuses, represents current frontiers. Probabilistic assessment of system reliability must account for the load redistribution after first brace fracture.',
  },

  history: {
    ELEMENTARY: 'X-bracing has been used for hundreds of years in bridges and buildings. Engineers discovered that crossing two diagonal pieces makes an even stronger structure than just one diagonal!',
    MIDDLE_SCHOOL: 'X-bracing became popular during the industrial revolution when iron and steel bridges needed to span long distances. The famous Eiffel Tower (1889) uses X-bracing throughout its structure. Today, X-bracing is one of the most common bracing systems in steel construction.',
    HIGH_SCHOOL: 'The systematic use of X-bracing developed with iron bridge construction in the early 19th century. The redundancy of two diagonals provided safety - if one failed, the other could carry load. The Forth Bridge in Scotland (1890) prominently features X-bracing in its massive cantilevers. X-bracing remains popular for its efficiency and clear load path.',
    UNDERGRADUATE: 'X-bracing evolved from empirical iron construction to rational design with the development of graphic statics and truss analysis. Early tension-only X-bracing used flat bars or rods with turnbuckles for adjustment. The transition to tension-compression systems came with the development of rolled steel sections and welded connections in the 20th century.',
    GRADUATE: 'The seismic design of X-bracing underwent significant revision following the 1994 Northridge earthquake. Research revealed that brace fractures often initiated at connections, leading to requirements for net section reinforcement and middle brace connections designed for out-of-plane buckling demands. Current AISC 341 provisions reflect extensive full-scale testing of X-braced frames.',
    PHD: 'Contemporary research on X-bracing explores the system-level implications of component behavior. Topics include: sequential brace fracture and load redistribution, the effect of brace slenderness on post-fracture gravity load capacity, and the development of computational tools predicting fracture locations and timing. Self-centering X-braced frames using post-tensioned connections represent an emerging research direction.',
  },

  characteristics: [
    'Two diagonal members crossing in an X pattern',
    'Provides resistance in both horizontal directions',
    'Can be tension-only (slender) or tension-compression (stocky)',
    'Diagonals may or may not connect at intersection',
    'Common in bridges, towers, and buildings',
    'High structural efficiency for lateral load resistance',
  ],

  famousExamples: [
    { name: 'Eiffel Tower', location: 'Paris, France', year: '1889', description: 'Iconic use of X-bracing throughout structure' },
    { name: 'Forth Bridge', location: 'Scotland', year: '1890', description: 'Cantilever railway bridge with prominent X-bracing' },
    { name: 'Centre Pompidou', location: 'Paris, France', year: '1977', description: 'Exposed X-bracing as architectural feature' },
    { name: 'John Hancock Center', location: 'Chicago, USA', year: '1969', description: 'Giant X-bracing visible on exterior' },
  ],

  confusionPairs: [
    {
      elementId: 'diagonal-bracing',
      reason: 'Both use diagonal members',
      distinction: 'X-bracing uses TWO crossing diagonals; diagonal bracing uses ONE single diagonal',
    },
    {
      elementId: 'chevron-bracing',
      reason: 'Both provide bi-directional resistance',
      distinction: 'X-bracing diagonals cross at center; chevron diagonals meet at beam midpoint forming an inverted V',
    },
  ],

  searchTags: ['bracing', 'structural', 'cross', 'X', 'lateral', 'tension', 'steel', 'bridge', 'tower', 'earthquake'],

  difficultyScore: 2,
  dateAdded: new Date('2026-02-07'),
  lastUpdated: new Date('2026-02-07'),
};
