import type { ArchitecturalElement } from '../../types';

export const PLINTH: ArchitecturalElement = {
  id: 'plinth',
  slug: 'plinth',
  name: 'Plinth',
  alternativeNames: ['Base Block', 'Socle', 'Stylobate', 'Foundation Block'],
  pronunciation: {
    phonetic: 'PLINTH',
    language: 'English',
  },
  etymology: {
    origin: 'Greek',
    meaning: 'Brick or tile',
    rootWord: 'From Greek "plinthos" (brick, tile, squared stone)',
  },
  category: 'WALL',
  subcategory: 'wall_features',
  periods: ['ANCIENT_GREEK', 'ANCIENT_ROMAN', 'RENAISSANCE', 'NEOCLASSICAL', 'CONTEMPORARY'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/plinth-primary.jpg',
    gallery: [
      '/images/architecture/elements/plinth-column.jpg',
      '/images/architecture/elements/plinth-building.jpg',
    ],
    diagram: '/images/architecture/diagrams/plinth-types.svg',
  },

  description: {
    ELEMENTARY: 'A plinth is the bottom block that a column or wall sits on. Think of it like the base of a trophy or a stepping stone! It makes the column look more important and keeps it from sitting directly on the ground. The plinth is usually square or rectangular and sticks out a little from the column.',
    MIDDLE_SCHOOL: 'The plinth is the lowest, squared base block of a column, wall, or building. It serves both practical and aesthetic purposes: it protects the base from damage and moisture while visually anchoring the structure to the ground. Ancient Greeks used plinths under columns in temples. Modern buildings often have plinth courses-rows of stone at the base.',
    HIGH_SCHOOL: 'Architecturally, the plinth functions as a transitional element between the ground plane and the vertical structure. In classical architecture, the plinth sits beneath the column base (below the torus and scotia moldings). Building plinths, or plinth courses, protect the wall base from moisture and physical damage. Proportionally, plinth height typically equals 1/3 to 1/2 the column diameter. Materials often differ from the wall above for visual and practical contrast.',
    UNDERGRADUATE: 'Plinth design addresses structural, protective, and compositional concerns. In classical orders, the plinth receives the column shaft through the base moldings, distributing loads and preventing direct ground contact. Building plinths mitigate ground moisture through material selection (dense stone, brick) and detailing (damp-proof courses). Urban architecture employs plinths to negotiate grade changes and activate street-level zones. Contemporary practice reconceives the plinth for commercial ground floors and parking podiums.',
    GRADUATE: 'Plinth analysis encompasses structural load distribution, material weathering, and urban design theory. Research examines historical construction techniques, the relationship between plinth height and perceived monumentality, and strategies for adapting plinths to accessibility requirements. Contemporary discourse addresses the active plinth in mixed-use development-commercial or institutional programs activating the base of residential towers-and the plinth\'s role in mediating between building and urban context.',
    PHD: 'Plinth scholarship engages classical archaeology, construction technology, and urban design theory. Investigations include ancient construction sequences, the evolution of base moldings across periods, and conservation of deteriorated plinths. Current research examines the plinth as an urban design tool for creating active, pedestrian-oriented streetscapes, analyzing precedents from traditional urbanism through contemporary mixed-use development. Climate adaptation research addresses plinth design for flood resilience.',
  },

  history: {
    ELEMENTARY: 'Ancient Greeks started using plinths under their temple columns thousands of years ago. The plinth made the column look stronger and more important. Today, architects still use plinths at the bottom of buildings, especially fancy ones that want to look grand and important.',
    MIDDLE_SCHOOL: 'Greek temples established the plinth as essential to column design. The Parthenon\'s columns rest on multi-stepped bases (stylobate and stereobate). Roman architecture continued the tradition while also developing building plinths for wall protection. Renaissance architects studied ancient plinths and codified their proportions. Modern architecture uses plinths both traditionally (bank buildings) and inventively (raised podiums for towers).',
    HIGH_SCHOOL: 'Classical Greek architecture formalized the plinth within each order\'s canon. The Doric order\'s simplest form placed columns directly on the stylobate, while Ionic and Corinthian orders developed elaborate base moldings atop plinths. Roman architecture standardized the plinth for both freestanding columns and engaged pilasters. Renaissance theorists (Palladio, Vignola) precisely documented plinth proportions. Industrial-era buildings used stone plinths to protect brick walls. Modernism often eliminated the plinth for pure volumes, though recent urbanism has revived it.',
    UNDERGRADUATE: 'Plinth history traces from Greek refinement of proportional relationships through Roman standardization to Renaissance codification. Vitruvius described load distribution through plinths; Renaissance theorists measured and published ancient precedents. The 19th century saw plinths deployed for practical masonry protection and visual gravitas. Modernist rejection of applied ornament eliminated traditional plinths, though the functional base persisted. Contemporary urbanism revives the plinth as an active, mixed-use zone mediating tower and street.',
    GRADUATE: 'Historical analysis of plinths examines evolving construction technology, changing proportional systems, and the plinth\'s role in architectural composition. Research addresses quarrying and carving techniques, the relationship between plinth design and foundation technology, and regional variations in form. Contemporary scholarship investigates the plinth\'s urban design function, examining how commercial or institutional plinths activate streetscapes beneath residential towers, drawing on precedents from traditional mixed-use urbanism.',
    PHD: 'Plinth scholarship engages classical archaeology, construction history, and urban design theory. Research programs examine ancient construction sequences through material analysis, trace the transmission of proportional canons across periods, and document conservation challenges for weathered stone plinths. Current investigations address the plinth\'s contemporary reinvention as an active urban interface, analyzing successful precedents and developing design guidelines. Climate research examines plinth design for flood adaptation and sea-level rise.',
  },

  characteristics: [
    'Square or rectangular base block',
    'Supports columns, walls, or entire buildings',
    'Typically projects beyond element above',
    'Often made of durable stone',
    'Protects from ground moisture',
    'Visually anchors structure to ground',
    'Height typically 1/3 to 1/2 column diameter',
  ],

  famousExamples: [
    { name: 'Parthenon Stylobate', location: 'Athens, Greece', year: '447-432 BCE', description: 'Three-stepped plinth platform for Doric columns' },
    { name: 'Palazzo Rucellai', location: 'Florence, Italy', year: '1446-1451', description: 'Rusticated stone plinth course by Alberti' },
    { name: 'British Museum', location: 'London, England', year: '1823-1852', description: 'Monumental plinth supporting Ionic colonnade' },
    { name: 'National Gallery of Art', location: 'Washington D.C., USA', year: '1941', description: 'Neoclassical building with prominent marble plinth' },
    { name: 'The Shard Plinth', location: 'London, England', year: '2012', description: 'Contemporary active plinth with commercial spaces at tower base' },
  ],

  confusionPairs: [
    {
      elementId: 'base',
      reason: 'Both are at the bottom of columns',
      distinction: 'The plinth is the squared bottom block; the base includes the plinth plus decorative moldings above it (torus, scotia)',
    },
    {
      elementId: 'pedestal',
      reason: 'Both support columns or objects',
      distinction: 'A plinth is typically simple and integral to the column; a pedestal is a taller, independent structure with its own base, die, and cap',
    },
    {
      elementId: 'stylobate',
      reason: 'Both are platforms for columns',
      distinction: 'Stylobate is the continuous platform supporting a row of columns (like a floor); plinth is the individual base block under each column',
    },
  ],

  searchTags: ['base', 'foundation', 'column', 'support', 'classical', 'greek', 'ground', 'block'],

  arMetadata: {
    modelPath: '/models/architecture/plinth.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Square Base Block', position: { x: 0, y: 0.1, z: 0 } },
      { label: 'Projection Beyond Column', position: { x: 0.6, y: 0.2, z: 0 } },
      { label: 'Ground Interface', position: { x: 0, y: 0, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
