import type { ArchitecturalElement } from '../../types';

export const FINIAL: ArchitecturalElement = {
  id: 'finial',
  slug: 'finial',
  name: 'Finial',
  alternativeNames: ['Pinnacle Ornament', 'Roof Ornament', 'Terminal Ornament'],
  pronunciation: {
    phonetic: 'FY-nee-ul or FIN-ee-ul',
    language: 'English',
  },
  etymology: {
    origin: 'Latin',
    meaning: 'End or finish',
    rootWord: 'Finis (end, boundary)',
  },
  category: 'DECORATIVE',
  subcategory: 'architectural_ornament',
  periods: ['GOTHIC', 'RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL', 'GOTHIC_REVIVAL', 'BEAUX_ARTS'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'NORTHERN_EUROPE', 'MIDDLE_EAST', 'SOUTH_ASIA', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/finial-primary.jpg',
    gallery: [
      '/images/architecture/elements/finial-gothic.jpg',
      '/images/architecture/elements/finial-variations.jpg',
    ],
    diagram: '/images/architecture/diagrams/finial-types.svg',
  },

  description: {
    ELEMENTARY: 'A finial is a decorative ornament that sits on top of a roof, spire, or fence post - like a fancy hat for a building! They can be shaped like flowers, pineapples, flames, or pointy spikes. Finials make buildings look finished and complete, which is why they\'re called finials (from the word "final").',
    MIDDLE_SCHOOL: 'A finial is a decorative element placed at the apex, corner, or terminal point of architectural features including roofs, gables, pinnacles, spires, canopies, and fence posts. Finials serve both aesthetic and symbolic purposes, providing visual completion while sometimes conveying meaning through their forms. Common shapes include fleur-de-lis, crosses, urns, balls, pineapples, and flame forms. They appear across many architectural styles and cultures.',
    HIGH_SCHOOL: 'The finial represents a universal architectural device for marking terminations and transitions, appearing in virtually all building traditions. Functionally, finials provide visual emphasis at key points - roof peaks, tower summits, corner pinnacles. Symbolically, they often carry specific meanings: crosses on churches, fleur-de-lis in French royal architecture, pineapples representing hospitality, flames suggesting enlightenment. Materials range from stone and metal to wood and terracotta. Gothic architecture employed elaborate pinnacle finials, while classical traditions favored acroteria, urns, and flame forms.',
    UNDERGRADUATE: 'Finials constitute a significant category of architectural ornament serving both compositional and symbolic functions. Compositionally, they provide vertical emphasis and visual termination, drawing the eye upward and marking significant points in the architectural hierarchy. The proportional relationship between finial and support varies by tradition - Gothic finials are often substantial relative to their pinnacles, while classical finials tend toward greater delicacy. Specific forms carry conventional meanings: the acorn symbolizes potential, the pinecone represents enlightenment, the pineapple hospitality. Technical considerations include weatherproofing, lightning protection, and structural attachment to prevent wind damage.',
    GRADUATE: 'Finial design and deployment reveal sophisticated approaches to architectural completion and symbolic communication. In Gothic architecture, crocketed finials atop pinnacles serve structural purposes (weighting buttress pinnacles) while contributing to vertical emphasis. Classical finials typically take forms including flames, urns, and spheres, with specific conventions governing their application to different building types. Cross-cultural examination reveals both universal principles (marking significant points) and culture-specific forms (Islamic crescent finials, Hindu kalasha pots). The Renaissance systematized classical finial types through treatises, while Gothic Revival produced increasingly elaborate pinnacle finials. Technical challenges include wind loading, thermal movement, and preventing water infiltration at attachment points.',
    PHD: 'Finial research encompasses technical, formal, and semantic dimensions. Structural analysis addresses wind loading, thermal stressing, and historical failure modes. Formal analysis examines proportional systems and the relationship between finial design and architectural character. Semantic research investigates symbolic meanings across cultures and periods - from ancient Egyptian lotus finials to Islamic crescent finials to Christian crosses. Questions include: How did finial forms evolve? What governed their application to specific building types? How did symbolic meanings change across contexts? Conservation research addresses deterioration patterns (particularly lightning damage and frost action), traditional attachment methods, and replacement strategies. Contemporary theoretical work examines finials as liminal elements mediating between architecture and sky, material and symbolic realms.',
  },

  history: {
    ELEMENTARY: 'People have been putting decorative tops on buildings for thousands of years! Ancient Egyptians used lotus flowers, while medieval European builders made fancy pointed finials for church towers. Different cultures chose different shapes - some liked crosses, others preferred crescents or golden balls. Today, you can still see finials on old buildings and even on fancy fences and furniture.',
    MIDDLE_SCHOOL: 'Finials have ancient origins - Egyptian temples featured lotus and papyrus finials, Greek temples had acroteria (pediment ornaments), and Roman buildings used various terminal ornaments. Medieval European architecture developed elaborate finials, especially in Gothic style with crocketed stone finials topping pinnacles. Renaissance and Baroque periods used classical forms - urns, flames, spheres. Islamic architecture employed crescent finials, while Asian traditions developed distinct forms. The 19th century saw widespread use of cast iron and zinc finials on residential and commercial buildings.',
    HIGH_SCHOOL: 'Finial traditions evolved independently across cultures while serving similar compositional functions. Ancient Mediterranean architecture featured acroteria (palmette or statue finials on pediment corners). Gothic architecture (12th-16th centuries) developed elaborate stone finials with crockets (leaf-like projections) topping buttress pinnacles and spires. Renaissance theorists codified classical finial types - flames, urns, spheres, obelisks - for different building types. Islamic architecture employed crescent and orb finials on mosques and minarets. The Industrial Revolution enabled mass-produced metal finials, democratizing ornament previously requiring skilled stone carving. Gothic Revival produced increasingly elaborate finials in cast iron and zinc.',
    UNDERGRADUATE: 'Finial development reflects both technical capabilities and symbolic systems. Ancient stone finials required sophisticated carving and secure attachment; metal finials enabled greater delicacy and complex forms. Gothic finials evolved from simple crosses to elaborate crocketed compositions, often serving the structural function of weighting buttress pinnacles against lateral thrust. Renaissance systematization established conventional finial types: flames for enlightenment, urns for funerary associations, spheres for celestial reference. Islamic architecture developed distinct traditions including crescent finials (often with stars) referencing religious symbolism. The 19th century saw both archaeological revival (accurate reproduction of historical types) and creative elaboration in new materials including cast iron, pressed zinc, and terracotta.',
    GRADUATE: 'Scholarly examination of finials addresses multiple dimensions. Technical research investigates attachment methods, structural performance, and material behavior - Gothic stone finials\' weathering patterns differ from metal finials\' corrosion issues. Formal analysis examines proportional systems and stylistic evolution. Iconographic research addresses symbolic meanings, which often vary by context - the same pineapple finial may signify hospitality in one tradition and exotic luxury in another. Comparative studies reveal both universal principles and culture-specific developments. Conservation challenges include replicating lost finials from fragmentary evidence, repairing traditional attachment systems, and addressing lightning damage. Modern research employs 3D scanning to document historical finials and wind tunnel testing to understand structural loads.',
    PHD: 'Finial research offers interdisciplinary opportunities spanning architectural history, materials science, structural engineering, and semiotics. Key research areas include: technical analysis of historical attachment methods and failure modes; comparative iconographic studies across cultures; examination of industrialization\'s impact on finial production and distribution; investigation of gender associations in finial symbolism (phallic interpretations versus interpretations emphasizing completion). Digital humanities approaches enable analysis of finial populations across large datasets, revealing regional variations and evolutionary patterns. Conservation science addresses deterioration mechanisms specific to exposed terminal elements. Theoretical work examines finials as liminal ornaments mediating between architecture and sky, secular and sacred realms, exploring their phenomenological and semiotic functions.',
  },

  characteristics: [
    'Placed at terminal points - roofs, pinnacles, posts',
    'Provides visual completion and emphasis',
    'Often carries symbolic meaning through form',
    'Materials include stone, metal, wood, terracotta',
    'Scales proportionally to supporting element',
    'Subject to weathering and lightning damage',
  ],

  famousExamples: [
    { name: 'Notre-Dame de Paris Spire', location: 'Paris, France', year: '1859-1860 (destroyed 2019)', description: 'Elaborate Gothic Revival finial by Viollet-le-Duc' },
    { name: 'Taj Mahal Minarets', location: 'Agra, India', year: '1632-1653', description: 'Persian-style lotus and finial combination' },
    { name: 'Chrysler Building', location: 'New York City, USA', year: '1928-1930', description: 'Art Deco stainless steel spire finial' },
    { name: 'King\'s College Chapel', location: 'Cambridge, England', year: '1446-1515', description: 'Gothic pinnacle finials with royal emblems' },
    { name: 'Dome of the Rock', location: 'Jerusalem', year: '691 CE (finial later)', description: 'Islamic crescent finial on dome' },
  ],

  confusionPairs: [
    {
      elementId: 'pinnacle',
      reason: 'Finials often top pinnacles',
      distinction: 'Pinnacles are vertical architectural elements; finials are the ornaments at their tops',
    },
    {
      elementId: 'acroterion',
      reason: 'Both are terminal ornaments',
      distinction: 'Acroteria specifically ornament classical pediments; finials are more general terminal ornaments',
    },
  ],

  searchTags: ['ornament', 'terminal', 'roof', 'spire', 'pinnacle', 'finial', 'top', 'decoration', 'summit', 'apex'],

  arMetadata: {
    modelPath: '/models/architecture/finial.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Ornamental Top', position: { x: 0, y: 0.1, z: 0 } },
      { label: 'Shaft', position: { x: 0, y: 0, z: 0 } },
      { label: 'Base/Mounting', position: { x: 0, y: -0.05, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
