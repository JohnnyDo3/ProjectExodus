import type { ArchitecturalElement } from '../../types';

export const ALCOVE: ArchitecturalElement = {
  id: 'alcove',
  slug: 'alcove',
  name: 'Alcove',
  alternativeNames: ['Nook', 'Recess', 'Bay', 'Inglenook'],
  pronunciation: {
    phonetic: 'AL-kohv',
    language: 'English',
  },
  etymology: {
    origin: 'Arabic/Spanish',
    meaning: 'Vaulted chamber',
    rootWord: 'From Arabic "al-qubba" (the vault) via Spanish "alcoba" (bedroom)',
  },
  category: 'WALL',
  subcategory: 'wall_features',
  periods: ['MOORISH', 'MEDIEVAL', 'RENAISSANCE', 'VICTORIAN', 'CONTEMPORARY'],
  regions: ['IBERIA', 'MEDITERRANEAN', 'WESTERN_EUROPE', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/alcove-primary.jpg',
    gallery: [
      '/images/architecture/elements/alcove-reading-nook.jpg',
      '/images/architecture/elements/alcove-bed.jpg',
    ],
    diagram: '/images/architecture/diagrams/alcove-types.svg',
  },

  description: {
    ELEMENTARY: 'An alcove is a cozy little space built into a wall-like a private hideaway in a room! It\'s bigger than a niche (which holds objects) because alcoves are for people. You might find a bed, desk, or comfy reading chair in an alcove. Some alcoves have arched tops like little caves.',
    MIDDLE_SCHOOL: 'An alcove is a recessed space within a room, large enough to accommodate furniture or create a distinct zone. Unlike niches (for objects), alcoves serve functional purposes: sleeping alcoves (bed nooks), inglenooks (fireplace seating), or study alcoves. They create intimate spaces within larger rooms. Alcoves can be original to the building design or created during renovations. Common dimensions: 5-8 feet wide, 3-6 feet deep.',
    HIGH_SCHOOL: 'Architecturally, alcoves define subsidiary spaces within principal rooms through wall recesses. Historical precedents include Moorish alcoba (sleeping chambers), medieval inglenooks (fireplace seating niches), and Victorian bed alcoves. Design considerations include depth (adequate for function), lighting (often reduced), ventilation, and proportion to the main room. Alcoves can be formed by structural walls, partitions, or furniture built-ins. Contemporary open-plan design uses alcoves to create defined zones without full walls.',
    UNDERGRADUATE: 'Alcove design addresses spatial hierarchy, functional accommodation, and phenomenological experience. Unlike full rooms, alcoves maintain visual and spatial connection to the primary space while creating acoustic and visual separation. Historical examples demonstrate cultural variations: Islamic architecture\'s alcoba provides privacy in communal spaces; English inglenooks offer warmth and intimacy; Japanese tokonoma alcoves display art. Structural formation varies: load-bearing walls (limiting alteration), partition walls (flexible), or thick wall construction (common in masonry). Contemporary practice employs alcoves in compact housing for spatial efficiency.',
    GRADUATE: 'Alcove analysis encompasses spatial composition, sensory experience, and cultural practice. Research examines the alcove\'s role in mediating public and private realms, creating graduated intimacy within dwellings. Phenomenological study addresses the embodied experience of enclosure, shelter, and prospect-refuge. Conservation challenges include documenting altered spaces, preserving historic built-in furniture, and adapting alcoves to modern environmental systems. Contemporary research investigates alcoves in micro-housing and flexible residential design, analyzing precedents from historical efficiency to Japanese spatial strategies.',
    PHD: 'Alcove scholarship engages architectural phenomenology, domestic space theory, and conservation practice. Research programs examine the cultural construction of privacy, the transmission of spatial types across regions, and the relationship between alcove design and social practices. Scientific investigation addresses acoustic performance, thermal comfort in semi-enclosed spaces, and daylight distribution. Current scholarship explores the alcove\'s contemporary relevance in compact urban housing, co-living models, and adaptable domestic architecture, developing design strategies from historical and contemporary precedents.',
  },

  history: {
    ELEMENTARY: 'A long time ago in Spain, people learned about alcoves from Arabic architecture. Rich people had special alcoves for sleeping that could be hidden behind curtains. In England, people made cozy alcoves by fireplaces called inglenooks. Today, people love alcoves for reading, sleeping, or just having a quiet spot to relax.',
    MIDDLE_SCHOOL: 'Alcoves entered European architecture through Islamic Spain (Moorish alcoba-private sleeping chambers). Medieval Europe developed inglenooks-fireplace alcoves with built-in seating. Renaissance palaces included alcoves for beds, separated by curtains or screens. Victorian homes featured alcoves for beds, desks, or display. Modernist open planning initially rejected alcoves, but contemporary design revives them for spatial definition without walls.',
    HIGH_SCHOOL: 'The alcove\'s history traces through multiple cultural streams. Islamic architecture developed the alcoba (sleeping alcove) for privacy within communal rooms-Alhambra\'s palace rooms exemplify this. Medieval castles and manor houses created inglenooks flanking large fireplaces, providing warmth and intimacy. French Rococo architecture employed alcoves for elaborate bed presentations. Victorian middle-class homes used alcoves to maximize small rooms. Modernism\'s open plans eliminated many alcoves, but contemporary housing revives them for flexible, efficient space use.',
    UNDERGRADUATE: 'Alcove history reveals evolving domestic practices and spatial organization. Moorish Spain transmitted the alcoba tradition to Christian Europe; Alhambra\'s palace alcoves demonstrate sophisticated spatial layering. Tudor and Jacobean architecture developed inglenooks with settle benches. French state bedrooms (Louis XIV) elevated the bed alcove to ceremonial status. Arts and Crafts architecture revived the inglenook as domestic focus. Modernist universal space rejected defined alcoves, though Scandinavian design maintained sleeping alcoves. Contemporary micro-housing and co-living reinvent alcoves for spatial efficiency and privacy.',
    GRADUATE: 'Historical analysis of alcoves examines the intersection of spatial form, social practice, and cultural meaning. Research addresses how alcoves mediated between communal and private activities, how they were furnished and curtained, and how they evolved with changing domestic practices. Conservation scholarship documents altered alcoves, recreates lost built-in furniture, and interprets historic use. Contemporary research analyzes successful contemporary alcove design in compact housing, examining precedents from traditional efficiency (Japanese capsule hotels, ship cabins) to contemporary micro-apartments.',
    PHD: 'Alcove historiography engages domestic space studies, phenomenology, and conservation theory. Research programs examine the transmission of spatial types-how the Islamic alcoba influenced European domestic architecture-and the relationship between alcove design and changing concepts of privacy. Scientific investigation includes acoustic analysis (speech privacy), thermal comfort modeling, and daylight studies. Current scholarship investigates the alcove\'s potential in contemporary housing challenges: urban density, co-living models, and flexible domestic space, developing evidence-based design guidelines from historical and contemporary case studies.',
  },

  characteristics: [
    'Recessed space within a larger room',
    'Large enough for furniture or people',
    'Typically 5-8 feet wide, 3-6 feet deep',
    'Often arched or vaulted',
    'Creates intimate space while maintaining connection to main room',
    'Common uses: sleeping, reading, seating',
    'May have reduced lighting or ventilation',
  ],

  famousExamples: [
    { name: 'Alhambra Palace Alcoves', location: 'Granada, Spain', year: '14th century', description: 'Moorish sleeping alcoves with ornate tile and plasterwork' },
    { name: 'Great Hall Inglenook, Haddon Hall', location: 'Derbyshire, England', year: '14th-16th century', description: 'Medieval fireplace alcove with stone seating' },
    { name: 'Palace of Versailles Royal Bedchamber', location: 'Versailles, France', year: '1701', description: 'Elaborate bed alcove with balustrade separating ceremony space' },
    { name: 'Gamble House Inglenooks', location: 'Pasadena, California, USA', year: '1908', description: 'Arts and Crafts fireplace alcoves with built-in seating' },
    { name: 'Villa Savoye Reading Alcoves', location: 'Poissy, France', year: '1931', description: 'Modernist window alcoves with built-in seating' },
  ],

  confusionPairs: [
    {
      elementId: 'niche',
      reason: 'Both are wall recesses',
      distinction: 'Niches are small and designed for displaying objects; alcoves are larger spaces for furniture or people',
    },
    {
      elementId: 'bay-window',
      reason: 'Both create additional space',
      distinction: 'Bay windows project outward from the building with windows; alcoves are interior recesses within walls',
    },
    {
      elementId: 'apse',
      reason: 'Both are semicircular recesses',
      distinction: 'Apses are large-scale architectural elements in churches; alcoves are smaller domestic spaces',
    },
  ],

  searchTags: ['recess', 'nook', 'interior', 'cozy', 'sleeping', 'reading', 'inglenook', 'moorish', 'privacy'],

  arMetadata: {
    modelPath: '/models/architecture/alcove.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Arched Opening', position: { x: 0, y: 2.0, z: 0.5 } },
      { label: 'Recessed Space', position: { x: 0, y: 1.0, z: -1.0 } },
      { label: 'Built-in Seating', position: { x: 0, y: 0.5, z: -1.2 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
