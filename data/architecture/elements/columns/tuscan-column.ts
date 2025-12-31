import type { ArchitecturalElement } from '../../types';

export const TUSCAN_COLUMN: ArchitecturalElement = {
  id: 'tuscan-column',
  slug: 'tuscan-column',
  name: 'Tuscan Column',
  alternativeNames: ['Tuscan Order', 'Roman Tuscan', 'Etruscan Order'],
  pronunciation: {
    phonetic: 'TUS-kun',
    language: 'English',
  },
  etymology: {
    origin: 'Latin',
    meaning: 'Named after Tuscany, home of the Etruscans',
    rootWord: 'Tuscanus',
  },
  category: 'COLUMN',
  subcategory: 'column_orders',
  periods: ['ANCIENT_ROMAN', 'RENAISSANCE', 'NEOCLASSICAL'],
  regions: ['MEDITERRANEAN', 'NORTHERN_EUROPE', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/tuscan-column-primary.jpg',
    gallery: [],
    diagram: '/images/architecture/diagrams/tuscan-order.svg',
  },

  description: {
    ELEMENTARY: 'The Tuscan column is the simplest of all Roman columns. It\'s like a Doric column but even plainer-with a smooth shaft instead of grooves, and a simple round base. It\'s strong and straightforward!',
    MIDDLE_SCHOOL: 'The Tuscan order is the simplest Roman column style, even plainer than Doric. It has a smooth, unfluted shaft with a simple base and capital. Romans used it for practical buildings like markets and military structures where decoration wasn\'t important.',
    HIGH_SCHOOL: 'The Tuscan order, described by Vitruvius as derived from Etruscan temples, is the simplest of the five Classical orders. It features a plain, unfluted shaft, a simple base with a single torus molding, and a basic capital. Renaissance theorists associated it with rural and military architecture.',
    UNDERGRADUATE: 'The Tuscan order represents either a Roman simplification of Doric or an independent Italic tradition derived from Etruscan wooden temples. Vitruvius describes Tuscan proportions (7:1 height-to-diameter ratio) and its use for temple architecture. Renaissance theorists from Alberti to Palladio codified its associations with rusticity and fortification.',
    GRADUATE: 'The historical reality of a distinct "Tuscan order" in ancient architecture remains debated. While Vitruvius describes Tuscan temples, archaeological evidence is limited. The order as theorized in Renaissance treatises may represent a scholarly construct as much as an archaeological recovery, though Etruscan temples do show distinctive features.',
    PHD: 'Tuscan order studies intersect with questions of Etruscan architecture, Vitruvian interpretation, and Renaissance architectural theory. The relationship between Vitruvian prescriptions and Etruscan archaeological remains presents methodological challenges. Post-antique reception of Tuscan as "appropriate" for military and rustic contexts reveals ideological assumptions about architectural decorum.',
  },

  history: {
    ELEMENTARY: 'The Tuscan column comes from the Etruscans, people who lived in Italy before the Romans became powerful. Romans borrowed their simple column style for buildings that needed to be strong but not fancy, like forts and stables.',
    MIDDLE_SCHOOL: 'The Tuscan order comes from the Etruscans of ancient Italy. Romans adopted and simplified it for utilitarian buildings. During the Renaissance, architects like Palladio used Tuscan for the ground floors of buildings, stables, and military architecture-places where simplicity meant strength.',
    HIGH_SCHOOL: 'Vitruvius attributes the Tuscan order to Etruscan temple architecture. Roman examples are rare, suggesting primarily utilitarian use. Renaissance theorists, including Serlio and Palladio, systematized Tuscan as appropriate for fortifications, prisons, and "masculine" architecture-the lowest in their hierarchy of orders.',
    UNDERGRADUATE: 'The Tuscan order\'s historical development is complicated by the gap between Vitruvian description and archaeological evidence. Etruscan temples at Veii and Orvieto show wooden construction techniques, but stone Tuscan orders are largely Renaissance creations based on textual interpretation. The order\'s theoretical role in Renaissance decorum systems shaped its deployment in military and agricultural contexts.',
    GRADUATE: 'Critical analysis of the Tuscan order reveals tensions between textual authority and material evidence. Vitruvius\'s description of Tuscan temples may describe practices already archaic in his time. Renaissance reception transformed fragmentary classical information into a systematic theory of appropriate use, associating Tuscan with fortitude and severity.',
    PHD: 'Tuscan order scholarship engages questions of archaeological evidence, Vitruvian interpretation, and theoretical construction. The gap between ancient sources and Renaissance systematization illuminates broader questions about classical reception. The order\'s deployment in contexts from rural villas to prisons reveals assumptions about social hierarchy encoded in architectural vocabulary.',
  },

  characteristics: [
    'Plain, unfluted shaft (smoothest column)',
    'Simple base with single torus molding',
    'Plain capital (simpler than Doric)',
    'Stocky proportions (height 7× diameter)',
    'The simplest of all five orders',
    'No decorative elements whatsoever',
  ],

  famousExamples: [
    { name: 'Market Gate of Miletus', location: 'Pergamon Museum, Berlin', year: '2nd century CE', description: 'Roman market architecture' },
    { name: 'Villa Rotonda', location: 'Vicenza, Italy', year: '1567-1571', description: 'Palladio\'s use of Tuscan ground floor' },
    { name: 'Covent Garden', location: 'London, UK', year: '1630s', description: 'Inigo Jones Tuscan piazza' },
  ],

  confusionPairs: [
    {
      elementId: 'doric-column',
      reason: 'Both are simple, sturdy orders',
      distinction: 'Doric has 20 flutes and no base; Tuscan is smooth with a base',
    },
  ],

  searchTags: ['column', 'roman', 'order', 'simple', 'plain', 'etruscan', 'tuscan', 'unfluted', 'smooth'],

  arMetadata: {
    modelPath: '/models/architecture/tuscan-column.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Plain Capital', position: { x: 0, y: 0.95, z: 0 } },
      { label: 'Smooth Shaft', position: { x: 0.12, y: 0.5, z: 0 } },
      { label: 'Simple Base', position: { x: 0, y: 0.05, z: 0.1 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
