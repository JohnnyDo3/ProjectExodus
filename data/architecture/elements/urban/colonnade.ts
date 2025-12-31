import type { ArchitecturalElement } from '../../types';

export const COLONNADE: ArchitecturalElement = {
  id: 'colonnade',
  slug: 'colonnade',
  name: 'Colonnade',
  alternativeNames: ['Column Row', 'Peristyle', 'Stoa', 'Portico Colonnade'],
  pronunciation: {
    phonetic: 'kol-uh-NAYD',
    language: 'French',
  },
  etymology: {
    origin: 'French/Latin',
    meaning: 'Row of columns',
    rootWord: 'From Latin "columna" (column) via French "colonnade"',
  },
  category: 'URBAN',
  subcategory: 'structural_sequence',
  periods: ['classical-greek', 'roman', 'renaissance', 'baroque', 'neoclassical', 'beaux-arts'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/colonnade-primary.jpg',
    gallery: [
      '/images/architecture/elements/colonnade-stpeter.jpg',
      '/images/architecture/elements/colonnade-louvre.jpg',
    ],
    diagram: '/images/architecture/diagrams/colonnade-types.svg',
  },

  description: {
    ELEMENTARY: 'A colonnade is a row of columns standing in a line, like soldiers at attention! The columns hold up a roof or a ceiling beam called an entablature. You often see them along the front of important buildings like museums, courthouses, or palaces. They create a covered walkway where people can stay dry when it rains.',
    MIDDLE_SCHOOL: 'A colonnade is a long sequence of columns supporting an entablature (horizontal beam structure). Colonnades can stand alone or be attached to buildings. They create covered walkways, define spaces, and add grandeur to architecture. Ancient Greeks used colonnades around temples and in public gathering spaces called stoas. The spacing and style of columns follows specific architectural orders.',
    HIGH_SCHOOL: 'The colonnade is a rhythmic sequence of columns supporting a continuous entablature, creating modular spaces defined by the intercolumniation (spacing between columns). Functions include providing covered circulation, defining urban edges, and expressing architectural order. Types include freestanding colonnades, building-attached colonnades, and curved colonnades. Design considerations include column order, spacing ratios, and relationship to surrounding architecture.',
    UNDERGRADUATE: 'Colonnade design engages structural principles, proportional systems, and spatial organization. The intercolumniation follows classical ratios: pycnostyle (1.5 diameters), systyle (2 diameters), eustyle (2.25 diameters), diastyle (3 diameters), and araeostyle (4 diameters). Structural considerations include entablature span, lateral stability, and foundation loads. Contemporary applications range from historicist reproductions to abstract interpretations of the columnar rhythm.',
    GRADUATE: 'Colonnade analysis addresses architectural theory, urban design, and tectonic expression. Research examines how colonnades mediate between building and city, create transitional spaces, and establish rhythmic order. Contemporary practice explores the colonnade as climate modifier, spatial organizer, and architectural language. Studies include performance analysis of shading effectiveness, structural optimization, and phenomenological experiences of rhythmic repetition.',
    PHD: 'Colonnade scholarship engages architectural history, structural theory, and urban morphology. Research methodologies include historical analysis of proportional systems, computational modeling of structural behavior, and ethnographic study of spatial use. Current investigations examine the colonnade in post-colonial contexts, sustainable adaptations for climate control, and the phenomenology of walking through repeated structural elements.',
  },

  history: {
    ELEMENTARY: 'The ancient Egyptians built some of the first colonnades at their temples thousands of years ago! The Greeks made beautiful colonnades for their temples and marketplaces. Romans built huge colonnades around their forums. During the Renaissance, architects brought back these classical designs. Today, we still use colonnades for important government buildings and museums.',
    MIDDLE_SCHOOL: 'Egyptian temples featured colonnades with papyrus and lotus-shaped columns. Greek stoas (covered colonnades) lined marketplaces and provided shade. The Parthenon has a colonnade surrounding the temple. Romans built grand colonnades around forums and basilicas. Renaissance architects studied Roman examples and created new colonnades for palaces and churches. Baroque designers curved colonnades dramatically, like at St. Peter\'s Square. Neoclassical architecture revived the colonnade worldwide.',
    HIGH_SCHOOL: 'Egyptian hypostyle halls at Karnak demonstrated early colonnade principles. Greek stoas combined colonnade and retail functions-Athens\' Stoa of Attalos served as shopping arcade. Roman forum colonnades established urban-scale applications. Renaissance theorists like Palladio systematized colonnade proportions. Bernini\'s elliptical colonnades at St. Peter\'s (1656-1667) created theatrical urban space. Neoclassical architects deployed colonnades globally, from the US Capitol to the British Museum.',
    UNDERGRADUATE: 'Colonnade history reveals evolving architectural theories and structural capabilities. Egyptian post-and-lintel systems established the basic type. Greek refinements addressed optical corrections and proportional systems. Roman concrete technology enabled longer spans between columns. Renaissance study of Vitruvius revived ancient principles. Baroque manipulation created dynamic spatial sequences. Neoclassical standardization spread the colonnade to civic architecture worldwide. Modern materials enable reinterpretation with steel and concrete.',
    GRADUATE: 'Historical analysis of colonnades examines structural innovation, proportional theory, and urban function. Research addresses the transition from trabeated Greek systems to Roman arcuated alternatives, the influence of pattern books on colonnade dissemination, and the social meanings of colonnade spaces. Contemporary challenges include adapting historical colonnade types for seismic regions, integrating modern building systems, and addressing accessibility requirements.',
    PHD: 'Colonnade scholarship engages architectural archaeology, structural history, and design theory. Methodologies include archaeological investigation of ancient construction techniques, historical analysis of theoretical treatises, and comparative studies across cultures. Current research examines colonnades in non-Western contexts, the role of colonnades in colonial architecture, and computational analysis of proportional systems across historical periods.',
  },

  characteristics: [
    'Row of regularly spaced columns',
    'Supports continuous entablature',
    'Creates covered walkway or space',
    'Follows specific architectural order',
    'Rhythmic repetition of structural elements',
    'Can be freestanding or building-attached',
    'Defines spatial boundaries',
  ],

  famousExamples: [
    { name: 'Colonnade of St. Peter\'s Square', location: 'Vatican City', year: '1656-1667', description: 'Bernini\'s curved colonnade embracing the piazza with 284 columns' },
    { name: 'Stoa of Attalos', location: 'Athens, Greece', year: '159-138 BCE', description: 'Ancient Greek colonnade reconstructed in 1950s' },
    { name: 'Louvre Colonnade', location: 'Paris, France', year: '1667-1670', description: 'Perrault\'s classical colonnade on the east facade' },
    { name: 'US Supreme Court', location: 'Washington DC, USA', year: '1935', description: 'Neoclassical colonnade with Corinthian columns' },
    { name: 'Karlovy Vary Colonnade', location: 'Karlovy Vary, Czech Republic', year: '1881', description: 'Cast-iron spa colonnade over thermal springs' },
  ],

  confusionPairs: [
    {
      elementId: 'portico',
      reason: 'Both feature rows of columns',
      distinction: 'Porticos are attached to building entrances; colonnades are extended sequences that can stand alone or run along entire building lengths',
    },
    {
      elementId: 'arcade',
      reason: 'Both create covered walkways',
      distinction: 'Colonnades use columns supporting straight entablatures; arcades use arches between columns or piers',
    },
  ],

  searchTags: ['columns', 'row', 'walkway', 'classical', 'entablature', 'peristyle', 'stoa', 'urban'],

  arMetadata: {
    modelPath: '/models/architecture/colonnade.glb',
    scale: 0.15,
    rotatable: true,
    annotations: [
      { label: 'Column', position: { x: 0, y: 1.5, z: 0 } },
      { label: 'Entablature', position: { x: 0.5, y: 2.5, z: 0 } },
      { label: 'Intercolumniation', position: { x: 1.5, y: 1, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
