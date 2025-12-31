import type { ArchitecturalElement } from '../../types';

export const SPIRAL_STAIR: ArchitecturalElement = {
  id: 'spiral-stair',
  slug: 'spiral-stair',
  name: 'Spiral Staircase',
  alternativeNames: ['Helical Stair', 'Spiral Stair', 'Corkscrew Stair', 'Caracol'],
  pronunciation: {
    phonetic: 'SPY-ruhl STAIR-kays',
    language: 'English',
  },
  etymology: {
    origin: 'Latin/Greek',
    meaning: 'Coil or helix',
    rootWord: 'From Latin "spira" (coil) via Greek "speira"',
  },
  category: 'FLOOR',
  subcategory: 'stairs',
  periods: ['ANCIENT_ROMAN', 'MEDIEVAL', 'RENAISSANCE', 'BAROQUE', 'MODERN', 'CONTEMPORARY'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/spiral-stair-primary.jpg',
    gallery: [
      '/images/architecture/elements/spiral-stair-bramante.jpg',
      '/images/architecture/elements/spiral-stair-modern.jpg',
    ],
    diagram: '/images/architecture/diagrams/spiral-stair-geometry.svg',
  },

  description: {
    ELEMENTARY: 'A spiral staircase winds around and around like a spring or a seashell! It takes up very little space because it goes up in a circle. Some spiral stairs are in castle towers, and some are in fancy modern buildings.',
    MIDDLE_SCHOOL: 'Spiral staircases rotate around a central column or open core as they ascend. They\'re space-efficient because they fit in a circular footprint. Medieval castles used them in towers for defense-right-handed defenders could swing swords more easily going down than attackers going up!',
    HIGH_SCHOOL: 'Spiral staircases follow a helical path around a central axis, which may be a solid newel column or an open void. Their compact footprint makes them ideal for tight spaces. Geometrically, they can be true helices with consistent radius or "spiral" with increasing radius. Defensive medieval towers featured clockwise-ascending stairs to advantage right-handed defenders.',
    UNDERGRADUATE: 'Spiral stair design involves complex geometry: tread depth varies from inner to outer edge, rise-run ratios must maintain walkable proportions, and structural loads concentrate on the central support. True spirals (Archimedean) differ from helixes (constant radius). Notable examples include Bramante\'s double-helix stair at the Vatican and the self-supporting stone helicoids of Spanish caracol stairs.',
    GRADUATE: 'Spiral stair analysis encompasses structural mechanics, building code compliance, and phenomenological experience. Structural types range from central-column-supported to cantilevered treads. Code requirements address headroom clearance, tread dimensions (walking line), and emergency egress limitations. The experiential dimension-compression, rotation, revelation-engages architectural phenomenology.',
    PHD: 'Research into spiral stairs addresses structural optimization, historical construction techniques, and experiential qualities. Engineering analysis includes finite element modeling of cantilevered treads and dynamic loads. Historical research examines construction methods from Roman stone stairs to Renaissance double-helixes. Phenomenological study investigates the stair as architectural promenade and spatial threshold.',
  },

  history: {
    ELEMENTARY: 'Spiral stairs have been around for thousands of years! Ancient Romans built them in their columns like Trajan\'s Column. In the Middle Ages, castle towers had spiral stairs inside. Today architects make them from glass and steel for dramatic effect.',
    MIDDLE_SCHOOL: 'Ancient Romans built spiral stairs inside monumental columns like Trajan\'s Column (113 CE). Medieval towers featured spiral stairs for defense and access. The Renaissance saw ornamental spiral stairs, including Bramante\'s famous double-helix at the Vatican (1505). Modern architects like Frank Lloyd Wright created dramatic helical stairs.',
    HIGH_SCHOOL: 'Roman spiral stairs were primarily functional, embedded in columns and tower cores. Medieval military architecture exploited their defensive potential-narrow dimensions, clockwise rotation, central column for sword arm advantage. Renaissance architecture transformed the spiral into ornament, exemplified by Palladio\'s oval stairs and Michelangelo\'s Laurentian Library vestibule. Modern steel and glass technology enabled freestanding helixes.',
    UNDERGRADUATE: 'The spiral stair\'s evolution demonstrates architecture\'s negotiation of function and form. Roman precedents influenced medieval tower stairs, which prioritized defense over comfort. Renaissance experimentation produced the "double-helix" allowing separate up/down traffic (Chambord, Vatican). The 19th century introduced cast iron spirals for industrial and domestic use. Modern engineering enabled cantilevered and tensioned designs.',
    GRADUATE: 'Historical analysis of spiral stairs reveals changing relationships between structure, function, and symbolism. Medieval stair orientation was codified for defense but also carried symbolic associations (clockwise ascent toward heaven). Renaissance theorists debated spiral geometry-Palladio preferred oval plans. Industrial production democratized the form, while 20th-century innovation (Tafel, Wright, Foster) restored its status as architectural set-piece.',
    PHD: 'Spiral stair historiography engages military architecture, construction history, and phenomenological theory. Research examines documentary evidence for stair-direction conventions, archaeological investigation of stone-cutting techniques, and the transmission of geometric knowledge through treatises. Contemporary scholarship addresses experiential qualities: the stair as threshold, the rotation as spatial transformation.',
  },

  characteristics: [
    'Helical path around central axis',
    'Compact circular or oval footprint',
    'Treads widen from center to edge',
    'Central support column or cantilevered',
    'May be open (void center) or closed',
    'Building codes restrict primary egress use',
    'Creates dramatic spatial experience',
  ],

  famousExamples: [
    { name: 'Bramante Staircase', location: 'Vatican Museums, Rome', year: '1505/1932', description: 'Famous double-helix design with intertwined ramps' },
    { name: 'Trajan\'s Column Stair', location: 'Rome, Italy', year: '113 CE', description: 'Ancient Roman spiral inside a commemorative column' },
    { name: 'Château de Chambord', location: 'Chambord, France', year: '1519-1547', description: 'Double-helix stair possibly designed by Leonardo da Vinci' },
    { name: 'Guggenheim Museum', location: 'New York City, USA', year: '1959', description: 'Frank Lloyd Wright\'s continuous spiral ramp gallery' },
    { name: 'Apple Store Fifth Avenue', location: 'New York City, USA', year: '2006', description: 'Glass spiral stair in iconic glass cube' },
  ],

  confusionPairs: [
    {
      elementId: 'helical-ramp',
      reason: 'Both follow a helical path',
      distinction: 'Spiral stairs have discrete steps; helical ramps are continuous inclined surfaces',
    },
    {
      elementId: 'curved-stair',
      reason: 'Both feature curved geometry',
      distinction: 'Spiral stairs rotate around a central axis; curved stairs arc but may not complete a full rotation',
    },
  ],

  searchTags: ['staircase', 'helix', 'spiral', 'vertical circulation', 'medieval', 'space-saving', 'tower', 'caracol'],

  arMetadata: {
    modelPath: '/models/architecture/spiral-stair.glb',
    scale: 0.5,
    rotatable: true,
    annotations: [
      { label: 'Central Newel', position: { x: 0, y: 1, z: 0 } },
      { label: 'Helical Handrail', position: { x: 0.8, y: 1.5, z: 0 } },
      { label: 'Wedge Tread', position: { x: 0.4, y: 0.5, z: 0.4 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
