import type { ArchitecturalElement } from '../../types';

export const ARCHITRAVE: ArchitecturalElement = {
  id: 'architrave',
  slug: 'architrave',
  name: 'Architrave',
  alternativeNames: ['Epistyle', 'Door Surround', 'Door Frame Molding'],
  pronunciation: {
    phonetic: 'AR-kih-trayv',
    language: 'Latin',
  },
  etymology: {
    origin: 'Italian/Latin',
    meaning: 'Chief beam',
    rootWord: 'architra (from archi- chief + trabs beam)',
  },
  category: 'DOOR',
  subcategory: 'door_surrounds',
  periods: ['classical-greek', 'roman', 'renaissance', 'baroque', 'neoclassical', 'beaux-arts'],
  regions: ['MEDITERRANEAN', 'NORTHERN_EUROPE', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/architrave-primary.jpg',
    gallery: [
      '/images/architecture/elements/architrave-classical.jpg',
      '/images/architecture/elements/architrave-renaissance.jpg',
    ],
    diagram: '/images/architecture/diagrams/architrave-detail.svg',
  },

  description: {
    ELEMENTARY: 'An architrave is the decorative frame that goes all around a door or window, like putting a picture frame around a doorway! It makes the opening look fancy and important.',
    MIDDLE_SCHOOL: 'The architrave is the molded frame surrounding a door or window opening. It consists of decorative trim that covers the joint between the wall and the door frame. In classical architecture, the architrave is also the lowest part of the entablature, resting directly on column capitals.',
    HIGH_SCHOOL: 'The architrave serves dual functions in classical architecture: as the lowest division of the entablature (resting on columns) and as the decorative molding framing door and window openings. Door and window architraves typically consist of stepped or molded profiles that articulate the transition between wall surface and opening, often incorporating classical molding profiles like fascias, ovolo, and cyma forms.',
    UNDERGRADUATE: 'The architrave represents a key element in classical design vocabulary, functioning structurally as the primary beam spanning between columns while serving decoratively to frame openings and articulate the wall surface. Classical theory codified architrave proportions relative to column diameter and overall order proportions. Renaissance theorists like Serlio and Palladio established canonical profiles for door and window architraves, typically featuring three stepped fascias or elaborately molded forms.',
    GRADUATE: 'The architrave embodies fundamental principles of classical tectonic expression—visually expressing structural spanning while providing ornamental elaboration through molding profiles. The element\'s dual role in entablature and as opening surround reveals classical architecture\'s systematic approach to formal articulation. Analysis of architrave design across periods reveals evolving relationships between structural expression and decorative elaboration, from Greek simplicity through Roman embellishment to Renaissance rationalization and Baroque exuberance.',
    PHD: 'The architrave constitutes a crucial element for examining classical architectural theory and practice, embodying tensions between tectonic expression and ornamental elaboration. Scholarly analysis must address the element\'s structural origins in timber construction, its translation into stone, and its subsequent evolution as a primarily decorative element. Comparative studies reveal how different periods and regions interpreted architrave proportions and profiles, from Greek three-fascia arrangements through Roman variations to Renaissance codifications and later departures. Contemporary debates engage questions of appropriate restoration practice and the element\'s relevance in modern classical design.',
  },

  history: {
    ELEMENTARY: 'The ancient Greeks invented the architrave as the beam that sat on top of columns. Later builders liked how it looked and started using it around doors and windows too!',
    MIDDLE_SCHOOL: 'In ancient Greek temples, the architrave was the stone beam resting directly on column capitals, forming the lowest part of the roof structure. The Romans copied this idea and also began using architrave moldings to frame doors and windows in all types of buildings.',
    HIGH_SCHOOL: 'The architrave originated as a structural element in Greek post-and-lintel construction, forming the beam spanning between columns in the classical orders. Each order developed characteristic architrave profiles—Doric with plain or subtly subdivided faces, Ionic typically showing three horizontal bands (fasciae), and Corinthian featuring more elaborate moldings. Roman architecture extended architrave use to door and window surrounds, establishing it as a key decorative element independent of its structural role.',
    UNDERGRADUATE: 'The architrave\'s development traces from structural necessity in Greek timber temples through stone translation in the archaic period to codification in mature classical orders. Vitruvius documented proportional relationships between architrave height and column diameter, while archaeological evidence reveals regional variations. Renaissance architects, studying Roman ruins and Vitruvian texts, systematized architrave design, with Palladio\'s Quattro Libri establishing influential prototypes for door and window surrounds that would dominate European and American classical architecture through the 19th century.',
    GRADUATE: 'The architrave\'s evolution reveals fundamental shifts in architectural thinking from Greek structural rationalism through Roman spatial elaboration to Renaissance theoretical systematization. Greek architraves maintained clear relationships to timber origins, with triglyphs marking beam ends. Roman practice separated structural and decorative functions, applying architrave forms to arched openings where they served no structural purpose. This disjunction between form and function became a source of theoretical debate in Renaissance and neoclassical periods, with purists like Laugier criticizing decorative architraves as dishonest while practitioners defended them as legitimate artistic expression.',
    PHD: 'Scholarly engagement with the architrave addresses multiple historiographical questions: the element\'s role in debates about architectural origins and tectonic honesty, its transmission across cultures and periods, and its function as a carrier of architectural meaning. Recent work examines how Renaissance architects reconciled Vitruvian theory with actual Roman practice, how pattern books disseminated architrave designs globally, and how different cultural contexts adapted classical forms. Digital analysis of molding profiles reveals workshop practices and regional variations, while conservation studies address material degradation and restoration ethics.',
  },

  characteristics: [
    'Frames door or window openings',
    'Stepped fascias or molded profiles',
    'Covers joint between wall and frame',
    'Proportioned to opening size',
    'May include crossettes (ears) at corners',
    'Classical molding profiles (ovolo, cyma, etc.)',
  ],

  famousExamples: [
    { name: 'Parthenon', location: 'Athens, Greece', year: '447-432 BCE', description: 'Classic Greek Doric architrave' },
    { name: 'Pantheon', location: 'Rome, Italy', year: '126 CE', description: 'Monumental interior architraves' },
    { name: 'Palazzo Farnese', location: 'Rome, Italy', year: '1534-1546', description: 'Renaissance window architraves by Michelangelo' },
    { name: 'Villa Rotonda', location: 'Vicenza, Italy', year: '1567-1592', description: 'Palladio\'s canonical door and window surrounds' },
    { name: 'Brandenburg Gate', location: 'Berlin, Germany', year: '1788-1791', description: 'Neoclassical Doric architrave' },
  ],

  confusionPairs: [
    {
      elementId: 'lintel',
      reason: 'Both are horizontal elements above openings',
      distinction: 'Lintel is the structural beam; architrave is the decorative molding that frames the entire opening including sides',
    },
    {
      elementId: 'entablature',
      reason: 'Architrave is part of the entablature',
      distinction: 'Entablature is the entire horizontal element above columns (architrave + frieze + cornice); architrave is just the lowest portion',
    },
  ],

  searchTags: ['door', 'window', 'frame', 'molding', 'classical', 'trim', 'entablature', 'greek', 'roman', 'renaissance', 'surround'],

  arMetadata: {
    modelPath: '/models/architecture/architrave.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Upper Fascia', position: { x: 0, y: 0.9, z: 0 } },
      { label: 'Middle Fascia', position: { x: 0, y: 0.7, z: 0 } },
      { label: 'Lower Fascia', position: { x: 0, y: 0.5, z: 0 } },
      { label: 'Corner Block', position: { x: 0.4, y: 0.9, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
