import type { ArchitecturalElement } from '../../types';

export const HANDRAIL: ArchitecturalElement = {
  id: 'handrail',
  slug: 'handrail',
  name: 'Handrail',
  alternativeNames: ['Bannister', 'Stair Rail', 'Guard Rail', 'Hand Rail'],
  pronunciation: {
    phonetic: 'HAND-rayl',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'Rail for the hand to grasp',
    rootWord: 'Compound of "hand" and "rail" (from Old French "reille")',
  },
  category: 'FLOOR',
  subcategory: 'stair_parts',
  periods: ['MEDIEVAL', 'RENAISSANCE', 'BAROQUE', 'VICTORIAN', 'MODERN', 'CONTEMPORARY'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/handrail-primary.jpg',
    gallery: [
      '/images/architecture/elements/handrail-wood.jpg',
      '/images/architecture/elements/handrail-modern.jpg',
    ],
    diagram: '/images/architecture/diagrams/handrail-profiles.svg',
  },

  description: {
    ELEMENTARY: 'A handrail is the long bar you hold onto when going up or down stairs. It helps you keep your balance and stay safe! Handrails can be made of wood, metal, or even glass, and they come in different shapes-some round, some flat on top.',
    MIDDLE_SCHOOL: 'Handrails provide support and safety along stairs and ramps. Building codes require specific heights (34-38 inches) and graspable profiles. Materials include wood (traditional), metal (modern), and glass or cable systems (contemporary). The handrail connects to balusters or a solid wall with wall-mounted brackets.',
    HIGH_SCHOOL: 'The handrail serves both functional safety requirements and aesthetic expression. Code requirements specify mounting height, graspable profile (1.25-2 inch diameter), continuous length, and extension beyond stair ends. Materials range from turned hardwood with milled profiles through wrought iron to stainless steel. The handrail often terminates in decorative volutes or returns to the wall.',
    UNDERGRADUATE: 'Handrail design integrates ergonomic requirements, structural attachment, and stylistic expression. Code provisions (ADA, IBC) govern dimensions, extensions, and graspability-reflecting biomechanical research on fall prevention. Material selection considers durability, thermal conductivity (cold metal vs. warm wood), and maintenance. Historical profiles-mopstick, lamb\'s tongue, wreath-constitute a specialized vocabulary.',
    GRADUATE: 'Handrail analysis encompasses accessibility design, craft tradition, and material technology. Research examines the ergonomics of grasp and support, the structural challenges of continuous rails (particularly wreathed sections at landings), and the cultural significance of touch as architectural experience. Contemporary practice explores tensioned cables, cantilevered glass, and embedded LED illumination.',
    PHD: 'Handrail research engages ergonomics, craft history, and phenomenological theory. Biomechanical studies inform code development. Historical research examines trade catalogs, patent records, and surviving examples to trace technological evolution. Phenomenological analysis considers the handrail as architecture\'s point of physical contact-where the body engages the building.',
  },

  history: {
    ELEMENTARY: 'People have used handrails for hundreds of years to stay safe on stairs. In old castles, they were often made of rope! Later, fancy carved wooden handrails became popular. Today we have handrails made of all kinds of materials including glass and steel.',
    MIDDLE_SCHOOL: 'Medieval stairs often lacked handrails or used simple rope guides. Renaissance and Baroque architecture developed elaborate carved and turned wood handrails. Industrial-era cast iron enabled mass production. The 20th century brought accessibility requirements that standardized handrail dimensions. Contemporary design explores minimal visible supports and innovative materials.',
    HIGH_SCHOOL: 'Handrail development reflects both craft evolution and safety consciousness. Medieval castle stairs might have wall-mounted rope or iron bars. Renaissance woodworking produced elaborate profiles and carved ornament. Georgian standardization established proportions still used today. Industrial production enabled iron and brass rails. Twentieth-century accessibility legislation (ADA, 1990) codified ergonomic requirements.',
    UNDERGRADUATE: 'The history of handrails reveals changing priorities between safety, aesthetics, and production economy. Pre-modern examples-rope, iron bars-prioritized function. Renaissance craft tradition developed complex profiles executed by specialized stair builders. Industrial production democratized ornamental work through casting and milling. Modernism stripped ornament while maintaining function. Contemporary practice reintroduces experiential richness through material innovation.',
    GRADUATE: 'Historical analysis of handrails examines craft organization, building regulation, and accessibility advocacy. Trade catalogs reveal standardized profiles and regional variations. Building code evolution shows increasing attention to fall prevention based on injury research. The disability rights movement transformed handrails from optional amenity to required accommodation, fundamentally changing architectural practice.',
    PHD: 'Handrail scholarship intersects multiple fields: ergonomic research on grasp and balance, craft history of woodworking and metalworking, social history of accessibility, and phenomenological theory of tactile architecture. Research examines how handrail standards emerged from injury data, how craft traditions transmitted profile knowledge, and how the handrail mediates bodily experience of architecture.',
  },

  characteristics: [
    'Provides support during stair or ramp use',
    'Code-specified height (34-38 inches)',
    'Graspable cross-section (1.25-2 inch diameter)',
    'Continuous along stair length',
    'Extensions beyond top and bottom of stair',
    'Returns to wall or terminates in volute',
    'Mounted on balusters or wall brackets',
  ],

  famousExamples: [
    { name: 'Tulip Stairs Handrail', location: 'Queen\'s House, London', year: '1635', description: 'First geometric self-supporting stair in Britain with wrought iron rail' },
    { name: 'Barcelona Pavilion', location: 'Barcelona, Spain', year: '1929', description: 'Mies van der Rohe\'s minimal chrome-plated handrail' },
    { name: 'Guggenheim Museum', location: 'New York City, USA', year: '1959', description: 'Continuous rail along Wright\'s spiral ramp' },
    { name: 'Apple Store Glass Stair', location: 'Various locations', year: '2000s', description: 'Structural glass balustrade with minimal stainless handrail' },
    { name: 'Vatican Museums', location: 'Vatican City', year: 'Various', description: 'Bronze handrails of Bramante and Momo staircases' },
  ],

  confusionPairs: [
    {
      elementId: 'balustrade',
      reason: 'Both are parts of stair railings',
      distinction: 'Handrail is the graspable top element; balustrade is the complete system including balusters and base',
    },
    {
      elementId: 'guardrail',
      reason: 'Both provide fall protection',
      distinction: 'Handrails are designed to be grasped during stair use; guardrails prevent falls from elevated surfaces but may not be graspable',
    },
  ],

  searchTags: ['staircase', 'safety', 'accessibility', 'railing', 'bannister', 'ada', 'ergonomic', 'grip'],

  arMetadata: {
    modelPath: '/models/architecture/handrail.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Mopstick Profile', position: { x: 0, y: 0, z: 0.05 } },
      { label: 'Volute Terminal', position: { x: 0.3, y: 0, z: 0 } },
      { label: 'Wall Bracket', position: { x: -0.3, y: -0.1, z: 0 } },
    ],
  },

  difficultyScore: 1,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
