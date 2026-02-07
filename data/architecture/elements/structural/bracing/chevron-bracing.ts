import type { ArchitecturalElement } from '../../../types';

export const CHEVRON_BRACING: ArchitecturalElement = {
  id: 'chevron-bracing',
  slug: 'chevron-bracing',
  name: 'Chevron Bracing',
  alternativeNames: ['Inverted V-Bracing', 'V-Bracing', 'K-Bracing (incorrectly)'],
  pronunciation: {
    phonetic: 'SHEV-ron BRAY-sing',
    language: 'English/French',
  },
  etymology: {
    origin: 'Old French',
    meaning: 'From "chevron" meaning rafter, referring to the inverted V shape resembling roof rafters',
    rootWord: 'chevron (rafter) + bracing',
  },
  category: 'STRUCTURAL',
  subcategory: 'bracing_systems',
  periods: ['international-style', 'high-tech', 'contemporary'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/chevron-bracing-primary.jpg',
    gallery: [
      '/images/architecture/elements/chevron-bracing-steel.jpg',
      '/images/architecture/elements/chevron-bracing-modern.jpg',
    ],
    diagram: '/images/architecture/diagrams/chevron-bracing.svg',
  },

  description: {
    ELEMENTARY: 'Chevron bracing looks like an upside-down V or the letter A without the crossbar. Two diagonal pieces come down from the top corners and meet in the middle of the bottom beam. It leaves the bottom corners open for doors and windows!',
    MIDDLE_SCHOOL: 'Chevron bracing uses two diagonal members that form an inverted V shape, meeting at the center of the floor beam. Unlike X-bracing which blocks the entire bay, chevron bracing leaves the lower portion open for doorways. The braces work together to resist forces from either direction.',
    HIGH_SCHOOL: 'Chevron bracing (inverted V-bracing) provides lateral resistance while maintaining accessibility at the lower part of the frame. The two diagonal members connect to the beam at its midpoint. This creates a special challenge: under lateral load, the braces exert unbalanced vertical forces on the beam, which must be designed to resist this demand.',
    UNDERGRADUATE: 'Chevron braced frames concentrate significant forces at the beam-brace intersection. When one brace buckles and the other yields, the force imbalance subjects the beam to flexure. AISC 341 requires the beam to resist the unbalanced vertical load corresponding to expected brace forces. Special proportioning requirements limit the ratio of tension to compression brace capacities.',
    GRADUATE: 'The post-buckling behavior of chevron braced frames has been extensively studied following seismic events. The beam flexural demands at the brace intersection, combined with cyclic local buckling of the compression brace, create complex load paths. Research on beam hinging mechanisms and connection rotation demands has informed current provisions for beam and connection design.',
    PHD: 'Advanced modeling of chevron frames addresses the interaction between brace buckling, beam plastification, and connection performance under cyclic loading. Research topics include: distributed plasticity models capturing beam-brace interaction, fracture prediction at brace local buckling locations, and the development of self-centering chevron systems. Performance-based design frameworks for chevron frames must account for the sequential failure mechanisms.',
  },

  history: {
    ELEMENTARY: 'Chevron bracing became popular in modern buildings because it allows architects to put doors and windows at the bottom of the frame while still making the building strong against wind and earthquakes.',
    MIDDLE_SCHOOL: 'Chevron bracing developed in the mid-20th century as architects wanted bracing that didn\'t block entire wall openings. It became especially popular for commercial buildings where ground-floor storefronts and entries were important. Modern earthquake engineering has refined its design.',
    HIGH_SCHOOL: 'Chevron bracing emerged as a response to the architectural constraint of X-bracing blocking openings. However, the 1994 Northridge earthquake revealed that some chevron-braced buildings suffered beam failures at the brace intersection. This led to significant code changes requiring stronger beams in chevron configurations.',
    UNDERGRADUATE: 'The evolution of chevron bracing design reflects the iterative nature of earthquake engineering. Pre-1994 designs often used beams sized for gravity loads alone. Post-Northridge studies demonstrated that beam flexure under unbalanced brace forces was a critical failure mode. AISC 341 now requires explicit consideration of post-buckling brace forces in beam design.',
    GRADUATE: 'Research following Northridge focused on the nonlinear behavior of chevron frames under cyclic loading. Full-scale tests revealed that weak beams led to premature frame instability. The development of special concentrically braced frame provisions included specific requirements for chevron beams based on expected brace capacities and the distribution of forces between tension and compression braces.',
    PHD: 'Current research on chevron bracing explores alternatives to the conventional beam-centered intersection, including "zipper" frames that use vertical members to distribute forces between floors. Computational modeling advances enable simulation of brace fracture propagation and its effect on frame stability. The development of replaceable brace systems for chevron frames represents ongoing work in resilient structural systems.',
  },

  characteristics: [
    'Two diagonals meeting at beam center (inverted V shape)',
    'Leaves lower portion of bay open for access',
    'Creates unbalanced vertical force on beam',
    'Beam must be designed for post-buckling brace forces',
    'Common in commercial and institutional buildings',
    'May be inverted (regular V) in some applications',
  ],

  famousExamples: [
    { name: 'Modern Office Buildings', location: 'Global', year: '1960s-present', description: 'Common bracing for commercial structures' },
    { name: 'Parking Structures', location: 'Global', year: '1970s-present', description: 'Often visible at building perimeter' },
    { name: 'Convention Centers', location: 'Global', year: 'Contemporary', description: 'Large-span structures with architectural bracing' },
  ],

  confusionPairs: [
    {
      elementId: 'x-bracing',
      reason: 'Both provide lateral resistance',
      distinction: 'Chevron braces meet at beam midpoint (V shape); X-bracing crosses at bay center (X shape)',
    },
    {
      elementId: 'k-bracing',
      reason: 'Similar names and diagonal configurations',
      distinction: 'Chevron meets at beam; K-bracing meets at column mid-height (now discouraged due to column failure risk)',
    },
  ],

  searchTags: ['bracing', 'structural', 'chevron', 'V', 'inverted', 'lateral', 'steel', 'seismic', 'commercial'],

  difficultyScore: 3,
  dateAdded: new Date('2026-02-07'),
  lastUpdated: new Date('2026-02-07'),
};
