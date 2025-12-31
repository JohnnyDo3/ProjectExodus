import type { ArchitecturalElement } from '../../types';

export const NICHE: ArchitecturalElement = {
  id: 'niche',
  slug: 'niche',
  name: 'Niche',
  alternativeNames: ['Wall Recess', 'Alcove', 'Aedicule', 'Tabernacle'],
  pronunciation: {
    phonetic: 'NICH or NEESH',
    language: 'English/French',
  },
  etymology: {
    origin: 'French/Italian',
    meaning: 'Nest or recess',
    rootWord: 'From Italian "nicchia" via Latin "nidus" (nest)',
  },
  category: 'WALL',
  subcategory: 'wall_features',
  periods: ['ANCIENT_ROMAN', 'RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL', 'CONTEMPORARY'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/niche-primary.jpg',
    gallery: [
      '/images/architecture/elements/niche-baroque.jpg',
      '/images/architecture/elements/niche-modern.jpg',
    ],
    diagram: '/images/architecture/diagrams/niche-types.svg',
  },

  description: {
    ELEMENTARY: 'A niche is a special hole or hollow space built into a wall. It\'s like a little room inside the wall! People put statues, vases, or other pretty things inside niches. Sometimes the top is curved like a half-dome called a shell.',
    MIDDLE_SCHOOL: 'A niche is a recess in a wall, often with a curved back (semicircular) and sometimes topped with a half-dome. Ancient Romans created niches for statues of gods. Renaissance and Baroque buildings used them to display sculptures. Modern niches might hold TVs, firewood, or decorative objects.',
    HIGH_SCHOOL: 'The architectural niche is a wall recess designed to contain sculpture, decorative objects, or functional elements. Classical niches typically feature semicircular plans with half-dome (conch) tops. Types include aedicula niches (framed with columns and pediment), shell niches (scalloped conch), and tabernacle niches (elaborate Gothic frames). Construction requires careful wall thickness planning.',
    UNDERGRADUATE: 'Niche design integrates structural accommodation, spatial composition, and display function. Roman precedents established the vocabulary: exedra (large curved recess), aedicula (columned frame), conch (shell-topped). Renaissance theorists codified proportions relating niche dimensions to contained figures. Structural considerations include wall thickness requirements and load transfer around the void. Lighting-natural or artificial-critically affects display quality.',
    GRADUATE: 'Niche analysis encompasses structural accommodation, art historical context, and phenomenological experience. Research examines the niche\'s role in sculptural programs, the relationship between container and contained, and the spatial experience of revelation and concealment. Contemporary practice reinterprets the niche for display, storage, and spatial articulation. Conservation addresses original polychromy and lighting conditions.',
    PHD: 'Research into architectural niches engages art history, archaeology, and architectural theory. Investigations include the iconographic programs of niche sequences, construction techniques across periods (carved vs. built), and the phenomenology of embedded space. Current scholarship examines the niche\'s persistence in contemporary architecture and its adaptation in retail and residential design.',
  },

  history: {
    ELEMENTARY: 'Ancient Romans loved niches-they put statues of their gods in them. Later, during the Renaissance, artists filled niches with beautiful marble sculptures. Today, people still use niches in their homes to show off special things or store items.',
    MIDDLE_SCHOOL: 'Roman architecture developed the niche for religious and commemorative statuary. The Pantheon\'s interior features alternating rectangular and curved niches. Renaissance Florence showcased guild patron saints in exterior niches (Orsanmichele). Baroque architecture elaborated niches with theatrical lighting. Modern architecture uses niches for both display and storage.',
    HIGH_SCHOOL: 'Roman niches derived from Greek practice but achieved new sophistication-the Pantheon\'s alternating niches articulate its cylindrical interior. Renaissance buildings integrated niches into facade compositions (Brunelleschi\'s Ospedale degli Innocenti). Baroque architects exploited niches for dramatic sculptural display. Nineteenth-century eclecticism revived all historical types. Modernism rejected applied ornament but retained functional recesses.',
    UNDERGRADUATE: 'Niche history reveals changing relationships between architecture and sculpture. Roman niches housed cult images and commemorative portraits within standardized formats. Medieval practice transformed niches into tabernacles with elaborate Gothic frames. Renaissance integration of architecture and sculpture culminated in Michelangelo\'s Medici Chapel. Baroque staging exploited lighting for theatrical effect. Contemporary practice abstracts the niche for functional and aesthetic purposes.',
    GRADUATE: 'Historical analysis of niches examines the collaboration between architects and sculptors, the programming of niche sequences, and the technology of niche construction. Research addresses how niche proportions responded to sculptural requirements, how lighting was managed, and how iconographic programs were organized. Conservation challenges include understanding original polychromy, reconstructing lost sculpture, and managing environmental conditions.',
    PHD: 'Niche scholarship engages art historical method, architectural theory, and conservation science. Research programs examine the social commissioning of niche programs, the economics of sculptural production, and the reception history of major ensembles. Current investigations address the relationship between virtual and physical display, the adaptation of niche concepts in retail design, and the conservation of exterior stone niches.',
  },

  characteristics: [
    'Recessed space within a wall',
    'Often semicircular in plan',
    'May have conch (half-dome) top',
    'Designed to display sculpture or objects',
    'Can be framed with columns (aedicule)',
    'Requires adequate wall thickness',
    'Lighting affects display quality',
  ],

  famousExamples: [
    { name: 'Pantheon Interior Niches', location: 'Rome, Italy', year: '126 CE', description: 'Alternating curved and rectangular niches articulating the rotunda' },
    { name: 'Orsanmichele Niches', location: 'Florence, Italy', year: '14th-15th century', description: 'Guild patron saint statues in tabernacle niches' },
    { name: 'Trevi Fountain Central Niche', location: 'Rome, Italy', year: '1762', description: 'Oceanus statue in triumphal arch niche' },
    { name: 'Medici Chapel Niches', location: 'Florence, Italy', year: '1520-1534', description: 'Michelangelo\'s integrated sculptural-architectural composition' },
    { name: 'Lincoln Memorial', location: 'Washington D.C., USA', year: '1922', description: 'Massive niche containing Daniel Chester French\'s seated Lincoln' },
  ],

  confusionPairs: [
    {
      elementId: 'alcove',
      reason: 'Both are recesses in walls',
      distinction: 'Niches are typically small and for display; alcoves are larger spaces for furniture or people',
    },
    {
      elementId: 'exedra',
      reason: 'Both are curved recesses',
      distinction: 'Niches are smaller and for single objects; exedrae are larger curved recesses often with seating',
    },
  ],

  searchTags: ['recess', 'sculpture', 'display', 'wall', 'shell', 'conch', 'aedicule', 'roman', 'baroque'],

  arMetadata: {
    modelPath: '/models/architecture/niche.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Shell Conch', position: { x: 0, y: 0.8, z: 0.2 } },
      { label: 'Recess Depth', position: { x: 0, y: 0.4, z: 0.3 } },
      { label: 'Base Plinth', position: { x: 0, y: 0.1, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
