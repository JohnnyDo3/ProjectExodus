import type { ArchitecturalElement } from '../../types';

export const FIREPLACE: ArchitecturalElement = {
  id: 'fireplace',
  slug: 'fireplace',
  name: 'Fireplace',
  alternativeNames: ['Hearth', 'Chimneypiece', 'Fireside'],
  pronunciation: {
    phonetic: 'FY-er-plays',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'Place for fire',
    rootWord: 'Compound of "fire" (Old English "fyr") and "place"',
  },
  category: 'INTERIOR',
  subcategory: 'fireplaces',
  periods: ['MEDIEVAL', 'RENAISSANCE', 'BAROQUE', 'GEORGIAN', 'VICTORIAN', 'ARTS_AND_CRAFTS', 'CONTEMPORARY'],
  regions: ['WESTERN_EUROPE', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/fireplace-primary.jpg',
    gallery: [
      '/images/architecture/elements/fireplace-georgian.jpg',
      '/images/architecture/elements/fireplace-modern.jpg',
    ],
    diagram: '/images/architecture/diagrams/fireplace-anatomy.svg',
  },

  description: {
    ELEMENTARY: 'A fireplace is a special place in a wall where you can safely burn wood to make your home warm and cozy. It has a chimney that carries the smoke up and out of the house. Many fireplaces have fancy decorated fronts called mantels where you can put pictures and decorations.',
    MIDDLE_SCHOOL: 'The fireplace is an architectural feature designed for containing fire for heating and sometimes cooking. It consists of a firebox (where the fire burns), a chimney (for smoke), and usually a decorative surround and mantelpiece. Before central heating, the fireplace was the essential center of home life.',
    HIGH_SCHOOL: 'The fireplace combines functional heating technology with architectural focus and social ritual. Components include the firebox, throat, damper, flue, and chimney for combustion and venting, plus the surround, mantel, and hearth for architectural expression. Historical development traces from medieval central hearths through wall fireplaces to efficient Rumford designs.',
    UNDERGRADUATE: 'Fireplace design integrates combustion engineering, construction technology, and architectural composition. Functional elements-firebox dimensions, throat design, flue sizing-follow principles established by Count Rumford (1796). The surround and mantelpiece constitute a primary vehicle for interior ornament, with design ranging from classical orders to modernist abstraction. Contemporary practice includes gas inserts and decorative electric units.',
    GRADUATE: 'Fireplace analysis encompasses thermodynamics, construction history, and social theory. Engineering analysis addresses combustion efficiency, draft mechanics, and heat transfer. Historical research examines the fireplace\'s evolution from central hearth to wall feature, the dissemination of improved designs through pattern books, and regional variations. Social analysis considers the fireplace as focus of domestic ritual and family gathering.',
    PHD: 'Research into fireplaces engages building science, material culture, and domestic history. Investigations include archaeological analysis of historic fireplace remains, technical assessment of efficiency claims, and social historical examination of the hearth\'s role in family life. Contemporary research addresses emissions reduction, the role of decorative fireplaces in energy-efficient buildings, and heritage value of historic chimneypieces.',
  },

  history: {
    ELEMENTARY: 'Long ago, people made fires in the middle of their homes and the smoke went out through a hole in the roof! Later, someone had the smart idea to build the fire against a wall with a chimney. As time passed, fireplaces became fancier with carved mantels and beautiful tiles.',
    MIDDLE_SCHOOL: 'Medieval halls had central open hearths with smoke escaping through roof louvers. Wall fireplaces with chimneys developed in the 11th-12th centuries. Renaissance and Georgian periods produced elaborate carved mantels. Count Rumford improved efficiency in the 1790s. Central heating reduced the fireplace to decorative feature, but it remains symbolically important.',
    HIGH_SCHOOL: 'The transition from central hearth to wall fireplace occurred gradually in medieval Europe, driven by multi-story construction. Tudor and Jacobean periods featured massive carved stone and wood chimneypieces. Georgian standardization established classical proportions. Rumford\'s shallow, angled firebox (1796) improved efficiency dramatically. Victorian elaboration gave way to Arts and Crafts simplicity. Modernism questioned the fireplace\'s necessity.',
    UNDERGRADUATE: 'Fireplace history illuminates the intersection of technology and domesticity. The shift from central hearth to wall construction enabled multi-story buildings and room subdivision. Regional variations-inglenooks, corner fireplaces, kitchen ranges-responded to local needs and traditions. The 18th-century efficiency movement (Franklin stove, Rumford fireplace) applied scientific principles. Contemporary practice navigates between heritage expectation, environmental concern, and technological substitution.',
    GRADUATE: 'Historical analysis of fireplaces examines construction technology, heat science, and domestic culture. Research addresses the transmission of improved designs through publications, the economics of fuel and labor in fireplace operation, and the social geography of heated spaces within buildings. Conservation challenges include maintaining historic function, addressing efficiency requirements, and preserving decorative fabric.',
    PHD: 'Fireplace scholarship engages multiple disciplines: archaeology (smoke-blackened deposits, hearth reconstruction), building science (historic and contemporary performance), art history (mantelpiece design and manufacture), and social history (domestic ritual and family structure). Current research examines the fireplace\'s role in zero-carbon buildings and the heritage value of maintaining functional historic fireplaces.',
  },

  characteristics: [
    'Contains fire safely within building',
    'Chimney vents combustion gases',
    'Mantelpiece provides architectural focus',
    'Hearth extends floor protection',
    'Surround frames the opening',
    'Damper controls draft',
    'Central to traditional domestic life',
  ],

  famousExamples: [
    { name: 'Hearst Castle Fireplaces', location: 'San Simeon, USA', year: '1919-1947', description: 'Antique European fireplaces installed in California mansion' },
    { name: 'Inglenook, Standen', location: 'East Grinstead, UK', year: '1894', description: 'Arts and Crafts inglenook fireplace by Philip Webb' },
    { name: 'Fallingwater Living Room', location: 'Mill Run, USA', year: '1939', description: 'Frank Lloyd Wright\'s boulder fireplace integrated with nature' },
    { name: 'Kedleston Hall Marble Hall', location: 'Derbyshire, UK', year: '1765', description: 'Robert Adam\'s neoclassical chimneypiece' },
    { name: 'Biltmore Estate Banquet Hall', location: 'Asheville, USA', year: '1895', description: 'Massive triple fireplace in America\'s largest home' },
  ],

  confusionPairs: [
    {
      elementId: 'inglenook',
      reason: 'Both involve fireplaces',
      distinction: 'A fireplace is the fire-containing element; an inglenook is a recessed seating area around a fireplace',
    },
    {
      elementId: 'stove',
      reason: 'Both provide heating',
      distinction: 'Fireplaces are open, built-in features; stoves are enclosed, freestanding heating appliances',
    },
  ],

  searchTags: ['heating', 'hearth', 'mantel', 'chimney', 'domestic', 'living room', 'warmth', 'focal point'],

  arMetadata: {
    modelPath: '/models/architecture/fireplace.glb',
    scale: 0.5,
    rotatable: true,
    annotations: [
      { label: 'Mantelpiece', position: { x: 0, y: 1.2, z: 0.1 } },
      { label: 'Firebox', position: { x: 0, y: 0.4, z: 0.2 } },
      { label: 'Hearth', position: { x: 0, y: 0, z: 0.3 } },
    ],
  },

  difficultyScore: 1,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
