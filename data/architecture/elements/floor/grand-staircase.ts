import type { ArchitecturalElement } from '../../types';

export const GRAND_STAIRCASE: ArchitecturalElement = {
  id: 'grand-staircase',
  slug: 'grand-staircase',
  name: 'Grand Staircase',
  alternativeNames: ['State Stair', 'Ceremonial Staircase', 'Principal Stair', 'Scala Regia'],
  pronunciation: {
    phonetic: 'GRAND STAIR-kays',
    language: 'English',
  },
  etymology: {
    origin: 'English/Latin',
    meaning: 'Large or impressive staircase',
    rootWord: 'From Latin "grandis" (large) and Old French "escalier"',
  },
  category: 'FLOOR',
  subcategory: 'stairs',
  periods: ['RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL', 'BEAUX_ARTS', 'CONTEMPORARY'],
  regions: ['WESTERN_EUROPE', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/grand-staircase-primary.jpg',
    gallery: [
      '/images/architecture/elements/grand-staircase-versailles.jpg',
      '/images/architecture/elements/grand-staircase-opera.jpg',
    ],
    diagram: '/images/architecture/diagrams/grand-staircase-types.svg',
  },

  description: {
    ELEMENTARY: 'A grand staircase is a really big, fancy staircase designed to make you feel important when you walk up it! You see them in palaces, opera houses, and movie theaters. They often have beautiful railings, statues, and sometimes even chandeliers above them.',
    MIDDLE_SCHOOL: 'Grand staircases are monumental stairs designed to impress and create drama. They\'re wider than normal stairs with elaborate handrails, decorative balustrades, and often split into two flights at a landing. Palaces, opera houses, and hotels use them to create memorable entrances.',
    HIGH_SCHOOL: 'The grand staircase serves ceremonial and representational functions beyond mere circulation. Architectural features include generous width (8+ feet), shallow rise-to-run ratios for easy ascent, ornate balustrades, and dramatic spatial settings. Types include imperial (split flights), flying (unsupported), and cantilevered designs.',
    UNDERGRADUATE: 'Grand staircases embody the theatrical dimension of architecture, orchestrating movement as processional display. Baroque innovations-the imperial stair (single flight splitting to two), the flying stair (minimal visible support)-remain influential. Spatial strategies include compression at entry, expansion at landing, and framed views. Materiality typically combines stone treads with elaborate metal or stone balustrades.',
    GRADUATE: 'Grand staircase analysis addresses spatial sequence, structural achievement, and social performance. Historical examples reveal evolving concepts of representation-from Baroque display through Enlightenment rationalism to Beaux-Arts eclecticism. Contemporary interpretations (Gehry, Hadid) deconstruct traditional formulas while maintaining experiential drama. Conservation addresses material deterioration and code compliance in historic structures.',
    PHD: 'Research into grand staircases engages architectural theory, social history, and building technology. The stair as architectural promenade-Garnier\'s Paris Opéra as paradigm-reveals 19th-century public culture. Structural analysis examines cantilever systems and material innovations. Social historical approaches examine the stair as stage for gendered performance and class display.',
  },

  history: {
    ELEMENTARY: 'Grand staircases became popular in European palaces about 400-500 years ago. Kings and queens wanted impressive entrances that would amaze visitors. The most famous are at Versailles in France and the Paris Opera House, where people dressed up just to walk up the stairs!',
    MIDDLE_SCHOOL: 'Renaissance Italian palaces developed ceremonial stairs, but Baroque architects made them architectural spectacles. The Spanish Steps (1725) and Versailles\' Ambassadors\' Stair (1678, destroyed) established grandeur expectations. 19th-century opera houses and train stations featured elaborate public staircases. Modern architects have reinterpreted the type for museums and cultural buildings.',
    HIGH_SCHOOL: 'Grand stair development reflects evolving concepts of architectural representation. Bramante\'s Vatican spiral (1505) and Michelangelo\'s Laurentian Library vestibule (1559) pioneered monumental stair design. Baroque palaces made the staircase a primary architectural event-Balthasar Neumann\'s Würzburg Residenz (1744) exemplifies spatial integration. The 19th century democratized grandeur in public buildings. Contemporary architects reinterpret drama through material and geometry.',
    UNDERGRADUATE: 'The grand staircase\'s history illuminates changing relationships between architecture and social performance. Italian Renaissance innovations (Bramante, Michelangelo) established formal vocabularies. French Baroque standardized the imperial type (d\'Orbay\'s Versailles stair). German Baroque achieved spatial integration (Neumann, Hildebrandt). Beaux-Arts synthesis (Garnier\'s Opéra) codified public ceremony. Modern critiques questioned monumentality while contemporary practice recovers experiential intensity.',
    GRADUATE: 'Historical analysis of grand staircases reveals evolving architectural ideologies. Renaissance humanism produced measured dignity. Baroque absolutism demanded theatrical display. Enlightenment rationalism questioned ornamental excess. Nineteenth-century public culture created new ceremonial contexts-opera, museum, department store. Modernism rejected monumentality, while postmodernism and contemporary practice variously recover, critique, or transform the type.',
    PHD: 'Grand staircase scholarship engages multiple disciplines: art history (iconographic programs, sculptural integration), social history (ceremony and etiquette), structural engineering (cantilever development), and architectural theory (phenomenology of ascent). Current research examines gendered experience of 19th-century stairs, adaptive reuse of historic examples, and contemporary reinterpretations addressing accessibility.',
  },

  characteristics: [
    'Generous width for ceremonial procession',
    'Shallow rise-to-run for comfortable ascent',
    'Elaborate balustrade and handrail',
    'Often splits at intermediate landing',
    'Dramatic spatial setting and lighting',
    'Premium materials (marble, bronze)',
    'May include sculptural program',
  ],

  famousExamples: [
    { name: 'Paris Opéra Grand Staircase', location: 'Paris, France', year: '1875', description: 'Garnier\'s theatrical masterpiece of onyx and marble' },
    { name: 'Würzburg Residenz', location: 'Würzburg, Germany', year: '1744', description: 'Neumann\'s Baroque stair under Tiepolo\'s ceiling' },
    { name: 'Spanish Steps', location: 'Rome, Italy', year: '1725', description: 'Monumental urban staircase connecting piazzas' },
    { name: 'Titanic Grand Staircase', location: 'Southampton/Liverpool (ship)', year: '1912', description: 'Famous ocean liner staircase under glass dome' },
    { name: 'New York Public Library', location: 'New York City, USA', year: '1911', description: 'Beaux-Arts marble staircase to reading rooms' },
  ],

  confusionPairs: [
    {
      elementId: 'spiral-stair',
      reason: 'Both are staircase types',
      distinction: 'Grand staircases are wide and ceremonial with straight flights; spiral stairs are compact and helical',
    },
    {
      elementId: 'perron',
      reason: 'Both can be exterior ceremonial stairs',
      distinction: 'Grand staircases are typically interior; perrons are exterior platform stairs at entrances',
    },
  ],

  searchTags: ['staircase', 'ceremonial', 'baroque', 'opera', 'palace', 'monumental', 'marble', 'processional'],

  arMetadata: {
    modelPath: '/models/architecture/grand-staircase.glb',
    scale: 0.3,
    rotatable: true,
    annotations: [
      { label: 'Landing Platform', position: { x: 0, y: 1, z: 0 } },
      { label: 'Stone Balustrade', position: { x: 1, y: 0.5, z: 0 } },
      { label: 'Marble Treads', position: { x: 0.5, y: 0.3, z: 0.5 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
