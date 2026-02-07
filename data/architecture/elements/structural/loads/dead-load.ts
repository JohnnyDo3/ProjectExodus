import type { ArchitecturalElement } from '../../../types';

export const DEAD_LOAD: ArchitecturalElement = {
  id: 'dead-load',
  slug: 'dead-load',
  name: 'Dead Load',
  alternativeNames: ['Permanent Load', 'Self-Weight', 'Static Load'],
  pronunciation: {
    phonetic: 'DED LOHD',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: '"Dead" refers to the permanent, unmoving nature of these loads - they don\'t change during the building\'s life',
    rootWord: 'dead (unchanging) + load',
  },
  category: 'STRUCTURAL',
  subcategory: 'load_types',
  periods: ['roman', 'gothic', 'renaissance', 'chicago-school', 'international-style', 'contemporary'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/dead-load-primary.jpg',
    gallery: [
      '/images/architecture/elements/dead-load-diagram.jpg',
      '/images/architecture/elements/dead-load-building.jpg',
    ],
    diagram: '/images/architecture/diagrams/dead-load.svg',
  },

  description: {
    ELEMENTARY: 'Dead load is the weight of the building itself - like the floors, walls, roof, and everything that stays in place forever. It\'s called "dead" because it doesn\'t move or change, unlike people walking around (that\'s live load!).',
    MIDDLE_SCHOOL: 'Dead load is the permanent weight of all the parts of a building: the structure (beams, columns, floors), the finishes (flooring, ceiling tiles), and fixed equipment (HVAC units, plumbing). Unlike live loads which change, dead loads stay constant throughout the building\'s life.',
    HIGH_SCHOOL: 'Dead loads are permanent gravity loads from the self-weight of structural and non-structural components. Engineers calculate dead loads from material densities and component dimensions. Dead loads are well-defined and predictable, unlike variable loads such as occupancy. In load combinations, dead load typically has a lower safety factor because of its certainty.',
    UNDERGRADUATE: 'Dead load comprises the in-place weight of building components including structural members, floor systems, roofing, mechanical equipment, and permanent partitions. Per ASCE 7, dead load D enters load combinations with load factors ranging from 0.9 to 1.4 depending on the combination and whether dead load is favorable or unfavorable for the limit state considered.',
    GRADUATE: 'The treatment of dead load in structural reliability reflects its relatively low coefficient of variation (typically 0.10). Research on dead load statistics has informed the calibration of LRFD load factors. Complex structures require careful tracking of self-weight during staged construction analysis, as dead load distribution may differ from the final condition.',
    PHD: 'Advanced treatment of dead loads encompasses statistical characterization of material densities and as-built dimensions, staged construction analysis accounting for time-dependent material properties, and the reliability implications of dead load uncertainty in long-span and slender structures where self-weight dominates design. Research on reduction of dead load through material innovation (UHPC, CLT) continues.',
  },

  history: {
    ELEMENTARY: 'Engineers have always had to think about how heavy buildings are. Ancient builders used stone, which is very heavy. Today we use lighter materials like steel and concrete, but we still have to carefully calculate the weight of everything!',
    MIDDLE_SCHOOL: 'Understanding dead loads became more important as buildings grew taller. In ancient times, massive stone structures were over-designed. The development of structural analysis in the 1800s allowed engineers to calculate exact loads and use materials more efficiently. Lighter materials like steel and reinforced concrete reduced dead loads.',
    HIGH_SCHOOL: 'The systematic consideration of dead loads developed with structural engineering in the 19th century. As material costs became significant, engineers needed accurate load estimates. Standard weights for materials were tabulated. The distinction between dead and live loads became formalized in building codes in the early 20th century.',
    UNDERGRADUATE: 'The formalization of dead load in building codes reflects the development of structural reliability. Early codes specified allowable stresses without explicit load factors. The transition to LRFD in the late 20th century required statistical characterization of dead load variability to calibrate appropriate factors. ASCE 7 provides detailed guidance on dead load determination.',
    GRADUATE: 'Research on dead load statistics has revealed that variability comes from material density variations, dimensional tolerances, and as-built differences from design drawings. These sources are well-characterized, resulting in relatively low coefficients of variation. Construction practice, including the weight of formwork and equipment, may temporarily exceed design dead loads during construction.',
    PHD: 'Advanced research on dead loads addresses the intersection of material science, construction practice, and reliability theory. Topics include: the development of lightweight cementitious materials, the statistical characterization of innovative materials like CLT, and the treatment of uncertainty in long-span structures where dead load variability significantly affects reliability.',
  },

  characteristics: [
    'Permanent weight of building components',
    'Acts vertically downward (gravity)',
    'Remains constant throughout building life',
    'Highly predictable with low variability',
    'Includes structure, finishes, fixed equipment',
    'Calculated from material densities and dimensions',
  ],

  famousExamples: [
    { name: 'Gothic Cathedrals', location: 'Europe', year: 'Medieval', description: 'Massive stone dead loads requiring flying buttresses' },
    { name: 'Burj Khalifa', location: 'Dubai, UAE', year: '2010', description: '500,000 tonnes of dead load on mat foundation' },
    { name: 'Golden Gate Bridge', location: 'San Francisco, USA', year: '1937', description: 'Dead load of 380,000 tons of steel' },
  ],

  confusionPairs: [
    {
      elementId: 'live-load',
      reason: 'Both are gravity loads',
      distinction: 'Dead load is PERMANENT (building weight); live load is VARIABLE (people, furniture, movable)',
    },
    {
      elementId: 'seismic-load',
      reason: 'Dead load affects seismic forces',
      distinction: 'Dead load acts VERTICALLY (gravity); seismic forces act HORIZONTALLY (based on building mass)',
    },
  ],

  searchTags: ['load', 'structural', 'dead', 'permanent', 'gravity', 'weight', 'self-weight', 'design', 'constant'],

  difficultyScore: 1,
  dateAdded: new Date('2026-02-07'),
  lastUpdated: new Date('2026-02-07'),
};
