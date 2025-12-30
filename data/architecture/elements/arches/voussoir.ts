import type { ArchitecturalElement } from '../../types';

export const VOUSSOIR: ArchitecturalElement = {
  id: 'voussoir',
  slug: 'voussoir',
  name: 'Voussoir',
  alternativeNames: ['Arch Stone', 'Wedge Stone', 'Arch Block'],
  pronunciation: {
    phonetic: 'voo-SWAHR',
    language: 'French/English',
  },
  etymology: {
    origin: 'French',
    meaning: 'Wedge-shaped stone forming part of an arch',
    rootWord: 'voussure (arch curve)',
  },
  category: 'STRUCTURAL',
  subcategory: 'arches',
  periods: ['ANCIENT_ROMAN', 'ROMANESQUE', 'GOTHIC', 'RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL'],
  regions: ['MEDITERRANEAN', 'NORTHERN_EUROPE', 'CENTRAL_EUROPE', 'MIDDLE_EAST', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/voussoir-primary.jpg',
    gallery: [],
    diagram: '/images/architecture/diagrams/voussoir.svg',
  },

  description: {
    ELEMENTARY: 'Voussoirs are the wedge-shaped stones that make up an arch! They\'re wider at the top than the bottom, so they fit together perfectly in a curve. Each one pushes against its neighbors to hold the arch up.',
    MIDDLE_SCHOOL: 'Voussoirs are the individual wedge-shaped stones or bricks that form an arch. Each is tapered—wider at the outer edge (extrados) and narrower at the inner edge (intrados). When fitted together, they create a self-supporting curved structure through compression.',
    HIGH_SCHOOL: 'Voussoirs are the wedge-shaped units composing an arch, each transferring loads to its neighbors through compression. The geometric requirement—that each stone\'s sides radiate toward the arch center—creates the characteristic wedge shape. The keystone is the central voussoir at the crown.',
    UNDERGRADUATE: 'Voussoir construction represents a fundamental principle of masonry arch mechanics. Each wedge-shaped unit\'s geometry ensures that loads are transferred through compression normal to the bed joints. Proper voussoir cutting requires understanding of the arch\'s geometry and the radiating pattern of joint lines toward the center.',
    GRADUATE: 'Voussoir analysis addresses stereotomy (the art of stone cutting), structural mechanics, and construction practice. Historical development of voussoir cutting, from simple radial geometry to complex warped surfaces in three-dimensional vaults, reveals evolving geometric and practical knowledge.',
    PHD: 'Advanced voussoir studies engage structural mechanics, the history of stereotomy, and construction archaeology. Analysis of voussoir joints, cutting patterns, and assembly sequences in historical monuments reveals workshop practices and technical knowledge transmission.',
  },

  history: {
    ELEMENTARY: 'People have been making voussoirs for thousands of years! Ancient Romans were especially good at cutting stones into perfect wedge shapes. In places like Córdoba, Spain, builders used alternating red and white voussoirs to make beautiful striped arches.',
    MIDDLE_SCHOOL: 'Voussoir construction was perfected by Roman builders who needed consistent wedge stones for their many arches, vaults, and domes. Medieval masons continued the tradition, and some created decorative effects using alternating colored voussoirs, as seen in the Great Mosque of Córdoba.',
    HIGH_SCHOOL: 'Voussoir cutting (stereotomy) developed as a specialized craft in Roman and medieval architecture. The geometric principles governing voussoir shape—radial joints, appropriate taper—were transmitted through workshop traditions. Renaissance treatises systematized this knowledge, while Islamic builders developed distinctive decorative approaches using polychrome voussoirs.',
    UNDERGRADUATE: 'The history of voussoir construction parallels the development of arch and vault architecture. Roman standardization enabled efficient construction across the empire. Medieval development of complex vault forms required increasingly sophisticated stereotomy. Renaissance codification transformed craft knowledge into theoretical geometry.',
    GRADUATE: 'Critical analysis of voussoir construction addresses the relationship between geometric theory and workshop practice. The transmission of stereotomic knowledge through apprenticeship, pattern books, and treatises reveals different modes of technical education. Analysis of actual monuments often reveals gaps between theoretical prescriptions and practical solutions.',
    PHD: 'Voussoir scholarship engages the history of mathematics, craft practice, and architectural technology. Questions include: the relationship between theoretical stereotomy and practical stone cutting, the role of geometric knowledge in defining professional identity, and the transition from craft-based to scientifically grounded construction practice.',
  },

  characteristics: [
    'Wedge-shaped arch stone',
    'Wider at extrados (outside edge)',
    'Narrower at intrados (inside edge)',
    'Sides radiate toward arch center',
    'Transfers load through compression',
    'Keystone is the central voussoir',
  ],

  famousExamples: [
    { name: 'Pont du Gard', location: 'Southern France', year: '19 BCE', description: 'Massive Roman voussoirs' },
    { name: 'Great Mosque of Córdoba', location: 'Córdoba, Spain', year: '784-987 CE', description: 'Alternating red-white voussoirs' },
    { name: 'Colosseum', location: 'Rome, Italy', year: '70-80 CE', description: 'Systematic voussoir construction' },
  ],

  confusionPairs: [
    {
      elementId: 'keystone',
      reason: 'Keystone is a specific voussoir',
      distinction: 'Voussoir = any wedge stone in arch; Keystone = specifically the one at the crown',
    },
  ],

  searchTags: ['arch', 'voussoir', 'stone', 'wedge', 'masonry', 'structural', 'stereotomy', 'construction'],

  arMetadata: {
    modelPath: '/models/architecture/voussoir.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Extrados (outer)', position: { x: 0, y: 0.8, z: 0.15 } },
      { label: 'Intrados (inner)', position: { x: 0, y: 0.2, z: 0.1 } },
      { label: 'Bed Joint', position: { x: 0.12, y: 0.5, z: 0 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
