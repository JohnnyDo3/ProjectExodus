import type { ArchitecturalElement } from '../../types';

export const FLAGSTONE: ArchitecturalElement = {
  id: 'flagstone',
  slug: 'flagstone',
  name: 'Flagstone',
  alternativeNames: ['Flag Paving', 'Stone Flags', 'Slab Paving'],
  pronunciation: {
    phonetic: 'FLAG-stohn',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'Flat stone suitable for paving',
    rootWord: 'From Old Norse "flaga" (slab or layer)',
  },
  category: 'FLOOR',
  subcategory: 'paving',
  periods: ['ANCIENT', 'MEDIEVAL', 'RENAISSANCE', 'NEOCLASSICAL', 'MODERN', 'CONTEMPORARY'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/flagstone-primary.jpg',
    gallery: [
      '/images/architecture/elements/flagstone-pattern.jpg',
      '/images/architecture/elements/flagstone-outdoor.jpg',
    ],
    diagram: '/images/architecture/diagrams/flagstone-installation.svg',
  },

  description: {
    ELEMENTARY: 'Flagstone is a type of flat stone used to make patios, paths, and floors. The stones are cut into flat pieces that fit together like puzzle pieces. Each stone is a different shape and size, which creates beautiful natural patterns. You might see flagstone on garden paths or outdoor patios!',
    MIDDLE_SCHOOL: 'Flagstone refers to sedimentary rock split into flat slabs used for paving. Common types include sandstone, slate, limestone, and quartzite. The irregular shapes are fitted together with mortar or sand-filled joints. Flagstone has been used for thousands of years because it\'s naturally flat, durable, and requires minimal processing.',
    HIGH_SCHOOL: 'Flagstone paving utilizes naturally stratified sedimentary rocks that split along bedding planes to create flat surfaces. Installation methods include dry-laid (sand base), mortar-set (concrete base), or wet-laid (mortar joints). The material\'s inherent variation in color, texture, and shape creates organic patterns valued in both historical and contemporary landscape design.',
    UNDERGRADUATE: 'Flagstone represents one of humanity\'s earliest processed building materials, requiring only splitting rather than cutting. Geological formation determines characteristics: sandstone offers warm tones and porosity, slate provides fine grain and cleavage, limestone yields consistent bedding planes. Installation methodology affects drainage, frost heaving resistance, and longevity. The material\'s thermal mass and permeability make it relevant to contemporary sustainable landscape architecture.',
    GRADUATE: 'Flagstone analysis encompasses geological characterization, quarrying techniques, installation systems, and weathering behavior. Selection criteria include compressive strength, absorption rate, freeze-thaw durability, and slip resistance. Contemporary practice addresses sourcing sustainability, carbon footprint of transport, permeable joint systems, and integration with stormwater management. Historical preservation involves matching replacement stone to original quarry sources and traditional laying patterns.',
    PHD: 'Flagstone studies engage geology, material science, construction history, and cultural landscape preservation. Research addresses the relationship between regional geology and vernacular paving traditions, evolution of quarrying technology, and deterioration mechanisms in historic pavements. Contemporary scholarship examines lifecycle analysis, embodied energy comparisons with manufactured pavers, and the role of permeable natural stone paving in urban heat island mitigation and ecological landscape infrastructure.',
  },

  history: {
    ELEMENTARY: 'People have been using flat stones for floors and paths for thousands of years. Ancient Romans built roads with flagstone that you can still walk on today! Castles in Europe have flagstone floors that are hundreds of years old. It\'s one of the oldest building materials still used today.',
    MIDDLE_SCHOOL: 'Flagstone paving dates to ancient civilizations including Egypt, Greece, and Rome. Roman roads often featured large stone slabs (viae silice stratae). Medieval European castles, monasteries, and town squares used local flagstone. The material remained dominant for exterior paving until the 20th century introduction of concrete. Traditional laying techniques were passed down through generations of stonemasons.',
    HIGH_SCHOOL: 'Archaeological evidence shows flagstone use in Mesopotamia (3000 BCE) and ancient Egypt. Roman engineers developed sophisticated laying techniques with graded stone, sand bedding, and drainage systems. Medieval guilds standardized flagstone sizing and laying patterns. The Industrial Revolution introduced powered stone saws, enabling more uniform cutting. Arts and Crafts movement designers revived irregular flagstone patterns as a reaction against industrial materials.',
    UNDERGRADUATE: 'Flagstone history reflects the intersection of geology, technology, and cultural aesthetics. Regional variations developed based on available stone types and climate requirements. British "York stone" (sandstone) became the standard for urban paving from the 18th-19th centuries. American Colonial architecture adapted local stone types (Pennsylvania bluestone, Tennessee crab orchard stone). Modern decline followed concrete paver development, with contemporary revival driven by sustainability concerns and landscape naturalism.',
    GRADUATE: 'Historical flagstone practice reveals evolving relationships between quarrying, transportation infrastructure, and building economics. Canal and railway development enabled wider distribution of prestigious stone types. Municipal paving standards emerged in 19th-century industrial cities, specifying stone type, thickness, and laying methods. Twentieth-century decline resulted from concrete\'s cost advantage and mechanized installation. Contemporary revival reflects both heritage aesthetics and verified environmental advantages including permeability, thermal properties, and longevity.',
    PHD: 'Flagstone historiography encompasses industrial archaeology, vernacular landscape studies, and material culture. Research examines the social organization of historical quarrying communities, standardization of stone grading systems, and documentation of extinct quarries. Conservation challenges include matching historic stone when quarries are depleted, understanding traditional lime mortar versus modern bedding, and balancing preservation with accessibility requirements. Contemporary scholarship addresses flagstone\'s role in biophilic design theory and climate-adaptive landscape infrastructure.',
  },

  characteristics: [
    'Natural sedimentary stone split along bedding planes',
    'Irregular shapes fitted together in organic patterns',
    'Thickness typically 1-3 inches for pedestrian use',
    'Naturally slip-resistant textured surface',
    'Excellent durability and weather resistance',
    'Permeable when dry-laid or with sand joints',
    'Low maintenance with 50+ year lifespan',
    'Regional color variations based on stone type',
  ],

  famousExamples: [
    { name: 'Roman Forum', location: 'Rome, Italy', year: '46 BCE', description: 'Ancient basalt flagstone paving still intact after 2000+ years' },
    { name: 'Edinburgh Old Town', location: 'Edinburgh, Scotland', year: 'Medieval-18th century', description: 'Historic sandstone flag pavements throughout old city' },
    { name: 'Central Park Pathways', location: 'New York City, USA', year: '1858-1873', description: 'Olmsted\'s naturalistic flagstone paths using local schist' },
    { name: 'Alhambra Courtyards', location: 'Granada, Spain', year: '13th-14th century', description: 'Moorish gardens featuring limestone flagstone paving' },
    { name: 'Fallingwater Terraces', location: 'Pennsylvania, USA', year: '1936-1939', description: 'Frank Lloyd Wright\'s use of local sandstone flagging' },
  ],

  confusionPairs: [
    {
      elementId: 'cobblestone',
      reason: 'Both are natural stone paving materials',
      distinction: 'Flagstone uses flat slabs; cobblestone uses rounded stones set vertically',
    },
    {
      elementId: 'slate-tile',
      reason: 'Slate can be used as flagstone',
      distinction: 'Flagstone refers to any flat natural stone paving; slate tiles are uniformly cut manufactured products',
    },
  ],

  searchTags: ['paving', 'natural stone', 'sedimentary', 'sandstone', 'slate', 'limestone', 'outdoor', 'patio', 'path', 'landscape'],

  arMetadata: {
    modelPath: '/models/architecture/flagstone.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Natural Bedding Plane', position: { x: 0.2, y: 0, z: 0.1 } },
      { label: 'Irregular Edge', position: { x: -0.2, y: 0, z: 0.2 } },
      { label: 'Joint (Sand or Mortar)', position: { x: 0, y: 0, z: -0.15 } },
    ],
  },

  difficultyScore: 1,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
