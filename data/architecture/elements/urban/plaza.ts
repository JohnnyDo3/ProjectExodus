import type { ArchitecturalElement } from '../../types';

export const PLAZA: ArchitecturalElement = {
  id: 'plaza',
  slug: 'plaza',
  name: 'Plaza',
  alternativeNames: ['Piazza', 'Square', 'Place', 'Platz'],
  pronunciation: {
    phonetic: 'PLAH-zuh',
    language: 'Spanish',
  },
  etymology: {
    origin: 'Spanish/Latin',
    meaning: 'Open public space',
    rootWord: 'From Latin "platea" (broad street) via Greek "plateia"',
  },
  category: 'URBAN',
  subcategory: 'public_spaces',
  periods: ['ANCIENT_GREEK', 'ANCIENT_ROMAN', 'MEDIEVAL', 'RENAISSANCE', 'BAROQUE', 'MODERN', 'CONTEMPORARY'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'LATIN_AMERICA', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/plaza-primary.jpg',
    gallery: [
      '/images/architecture/elements/plaza-siena.jpg',
      '/images/architecture/elements/plaza-modern.jpg',
    ],
    diagram: '/images/architecture/diagrams/plaza-types.svg',
  },

  description: {
    ELEMENTARY: 'A plaza is an open outdoor space in a city where people can gather, like a big outdoor living room! There might be fountains, benches, statues, and places to sit. It\'s surrounded by buildings and is a great place for markets, festivals, or just hanging out.',
    MIDDLE_SCHOOL: 'A plaza is a public open space in urban areas, typically paved and surrounded by buildings. Plazas serve as gathering places for markets, celebrations, and daily social life. Famous examples include St. Peter\'s Square in Rome and Times Square in New York. Good plazas have places to sit, shade, and things to look at.',
    HIGH_SCHOOL: 'The plaza is an intentionally designed public open space, typically bounded by building facades that define its edges. Functions include commerce (markets), ceremony (parades, celebrations), and daily social exchange. Design elements include paving patterns, level changes, water features, seating, and vegetation. Historical development traces from Greek agora through Roman forum to Renaissance piazza.',
    UNDERGRADUATE: 'Plaza design integrates urban morphology, social programming, and microclimate management. Spatial definition depends on the enclosure ratio (building height to space width). Successful plazas require a clear hierarchy of spaces, appropriate scale, access to sunlight, protection from wind, and activating uses at ground-floor edges. Contemporary practice addresses accessibility, security, and flexible programming.',
    GRADUATE: 'Plaza analysis engages urban design, public space theory, and social geography. Research examines how spatial configuration shapes social interaction, how programming strategies activate spaces, and how management regimes affect public access. Contemporary challenges include balancing surveillance and openness, providing for diverse users, and designing for climate resilience.',
    PHD: 'Research into plazas addresses urban morphology, public sphere theory, and design methodology. Investigations include historical analysis of plaza evolution, ethnographic study of contemporary usage patterns, and evaluation of design interventions. Current scholarship examines the privatization of public space, the role of plazas in urban resilience, and inclusive design for diverse populations.',
  },

  history: {
    ELEMENTARY: 'Ancient Greeks had the agora-a big open space where people shopped, talked, and voted! The Romans had forums for similar purposes. In the Middle Ages, towns had market squares. Renaissance architects designed beautiful plazas with fountains and statues that we still visit today.',
    MIDDLE_SCHOOL: 'Greek agoras served as marketplaces and civic centers. Roman forums combined commercial, religious, and political functions. Medieval market squares developed organically at crossroads. Renaissance architects designed unified plazas with harmonious building facades. Baroque plazas featured dramatic perspectives and fountains. Modern plazas have ranged from successful to widely criticized.',
    HIGH_SCHOOL: 'The Greek agora established the plaza as civic center-Athens\' agora hosted the birth of democracy. Roman forums systematized the type with standardized components (temple, basilica, market). Medieval squares emerged from practical needs-markets, wells, church forecourts. Renaissance design imposed geometric order (Piazza del Campidoglio). Baroque staging created theatrical effects. Modernist plazas often failed to attract users.',
    UNDERGRADUATE: 'Plaza history reveals evolving urban theories and social structures. Greek agora design reflected democratic assembly. Roman forum planning expressed imperial order. Medieval organic growth responded to commercial needs. Renaissance geometric intervention asserted rational control. Baroque perspective manipulation served absolutist display. Modernist abstraction often ignored human-scale needs, while contemporary practice draws lessons from historical successes.',
    GRADUATE: 'Historical analysis of plazas examines spatial morphology, social function, and design theory. Research addresses the relationship between plaza form and civic culture, the influence of design treatises on plaza development, and the social geography of use over time. Contemporary challenges include adapting historic plazas for new functions while preserving heritage character.',
    PHD: 'Plaza scholarship engages urban history, archaeology, and design research. Methodologies include archaeological investigation of ancient plazas, historical analysis of design intentions and reception, and ethnographic study of contemporary use. Current research examines the privatization and securitization of public space, climate-responsive plaza design, and the role of plazas in urban mental health.',
  },

  characteristics: [
    'Open public space in urban setting',
    'Defined by surrounding building facades',
    'Paved surface for pedestrian use',
    'Designed for gathering and events',
    'May include fountains, monuments, seating',
    'Ground-floor uses activate edges',
    'Scale relates to function and enclosure',
  ],

  famousExamples: [
    { name: 'Piazza San Marco', location: 'Venice, Italy', year: '9th century-present', description: 'Napoleon called it "the finest drawing room in Europe"' },
    { name: 'Plaza Mayor', location: 'Madrid, Spain', year: '1619', description: 'Arcaded Spanish plaza for markets and bullfights' },
    { name: 'Piazza del Campo', location: 'Siena, Italy', year: '13th-14th century', description: 'Shell-shaped medieval plaza hosting the Palio' },
    { name: 'Rockefeller Center Plaza', location: 'New York City, USA', year: '1939', description: 'Sunken plaza with seasonal skating rink' },
    { name: 'Federation Square', location: 'Melbourne, Australia', year: '2002', description: 'Contemporary civic plaza with fractured geometry' },
  ],

  confusionPairs: [
    {
      elementId: 'courtyard',
      reason: 'Both are outdoor open spaces',
      distinction: 'Plazas are public urban spaces; courtyards are enclosed private or semi-private spaces within buildings',
    },
    {
      elementId: 'park',
      reason: 'Both are public outdoor spaces',
      distinction: 'Plazas are paved hardscape spaces; parks are primarily landscaped with vegetation',
    },
  ],

  searchTags: ['urban', 'public space', 'square', 'piazza', 'gathering', 'civic', 'pedestrian', 'city center'],

  arMetadata: {
    modelPath: '/models/architecture/plaza.glb',
    scale: 0.2,
    rotatable: true,
    annotations: [
      { label: 'Central Feature', position: { x: 0, y: 0.5, z: 0 } },
      { label: 'Building Edge', position: { x: 2, y: 1, z: 0 } },
      { label: 'Paving Pattern', position: { x: 1, y: 0, z: 1 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
