import type { ArchitecturalElement } from '../../types';

export const ENTASIS: ArchitecturalElement = {
  id: 'entasis',
  slug: 'entasis',
  name: 'Entasis',
  alternativeNames: ['Column Swelling', 'Column Curve', 'Optical Correction'],
  pronunciation: {
    phonetic: 'EN-tuh-sis',
    language: 'English',
  },
  etymology: {
    origin: 'Greek',
    meaning: 'Stretching or straining',
    rootWord: 'entasis (ἔντασις)',
  },
  category: 'COLUMN',
  subcategory: 'column_parts',
  periods: ['ANCIENT_GREEK', 'ANCIENT_ROMAN', 'RENAISSANCE', 'NEOCLASSICAL'],
  regions: ['MEDITERRANEAN', 'NORTHERN_EUROPE', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/entasis-primary.jpg',
    gallery: [],
    diagram: '/images/architecture/diagrams/entasis.svg',
  },

  description: {
    ELEMENTARY: 'Entasis is a clever trick! When you look at a straight column from far away, it looks like it\'s skinnier in the middle. So ancient Greek builders made columns slightly fatter in the middle to make them LOOK perfectly straight. It\'s like an optical illusion in reverse!',
    MIDDLE_SCHOOL: 'Entasis is the subtle outward curve in a classical column\'s shaft. Greeks discovered that perfectly straight columns look slightly concave (pinched in the middle) from a distance. By adding a gentle convex curve, they made columns appear perfectly straight to the eye.',
    HIGH_SCHOOL: 'Entasis refers to the subtle convex curve applied to column shafts as an optical refinement. Greek architects recognized that parallel-sided columns appear to curve inward, so they introduced a slight swelling—greatest at about one-third of the height—to counteract this optical illusion and create the appearance of perfect straightness.',
    UNDERGRADUATE: 'Entasis represents one of several optical refinements employed in Greek temple design, alongside stylobate curvature and column inclination. The curve\'s precise generation—whether by conic section or other geometric method—has been debated since antiquity. Vitruvius describes the principle, though Greek original methods remain partially reconstructed from monument analysis.',
    GRADUATE: 'Entasis analysis engages questions of Greek optical theory, workshop practice, and the relationship between prescription and execution. The phenomenon raises fundamental questions about the nature of visual perception in architectural experience. Debate continues regarding whether entasis served purely optical functions or also expressed metaphorical "strain" of load-bearing.',
    PHD: 'Entasis scholarship addresses the intersection of optics, aesthetics, and construction practice in Greek architecture. The refinement\'s presence across diverse monuments and orders suggests systematic knowledge transmission, yet documentary evidence is limited. Analysis must synthesize Vitruvian prescription, archaeological measurement, and theoretical interpretation to understand this phenomenon.',
  },

  history: {
    ELEMENTARY: 'Ancient Greek builders discovered this trick over 2,500 years ago. They were so careful about making buildings look perfect that they curved columns, tilted them slightly, and even curved the floor—all to correct for how our eyes see things!',
    MIDDLE_SCHOOL: 'Greek architects developed entasis by the 5th century BCE, perfecting it in buildings like the Parthenon. Roman architect Vitruvius later wrote about it, helping Renaissance architects understand the technique. Modern architects still consider entasis when designing classical buildings.',
    HIGH_SCHOOL: 'Entasis is documented in Greek architecture from the Archaic period onward, reaching refinement in Classical temples. The Parthenon demonstrates sophisticated application of entasis along with other optical corrections. Vitruvius\'s description transmitted the concept to Renaissance theorists, who debated its proper application and generation.',
    UNDERGRADUATE: 'The development of entasis reflects Greek architectural sophistication in addressing optical phenomena. Analysis of monuments from the Temple of Hera at Samos through the Parthenon reveals evolving practices. Renaissance architects, working from Vitruvian texts and direct monument study, developed various methods for generating entasis curves, from graphic projection to calculated diminution.',
    GRADUATE: 'Critical entasis studies examine the relationship between ancient optical theory, practical construction, and aesthetic goals. The refinement\'s subtle nature—often only centimeters of deviation—raises questions about perceptual thresholds and the role of craft knowledge in Greek building. Post-antique reception reveals varying understandings of both the phenomenon and its purposes.',
    PHD: 'Advanced entasis research addresses the phenomenon from multiple perspectives: the archaeology of individual monuments, the history of optical theory, the reconstruction of ancient workshop practices, and the reception of entasis concepts across periods. The refinement serves as a case study for examining how buildings encode sophisticated knowledge of perception and aesthetics.',
  },

  characteristics: [
    'Subtle convex curve on column shaft',
    'Greatest swelling at 1/3 of height',
    'Corrects optical illusion of concavity',
    'Measured in millimeters',
    'Part of Greek "optical refinements"',
    'Makes columns appear straight',
  ],

  famousExamples: [
    { name: 'The Parthenon', location: 'Athens, Greece', year: '447-432 BCE', description: 'Perfect example of entasis and optical refinements' },
    { name: 'Temple of Hephaestus', location: 'Athens, Greece', year: '449-415 BCE', description: 'Well-preserved Doric entasis' },
    { name: 'Maison Carrée', location: 'Nîmes, France', year: '19 BCE', description: 'Roman application of entasis' },
  ],

  confusionPairs: [],

  searchTags: ['column', 'greek', 'optical', 'curve', 'refinement', 'entasis', 'swelling', 'perception', 'parthenon'],

  arMetadata: {
    modelPath: '/models/architecture/entasis.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Maximum Swelling', position: { x: 0.12, y: 0.33, z: 0 } },
      { label: 'Taper to Capital', position: { x: 0.08, y: 0.85, z: 0 } },
    ],
  },

  difficultyScore: 4, // Subtle concept, harder to spot
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
