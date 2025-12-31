import type { ArchitecturalElement } from '../../types';

export const QUOINS: ArchitecturalElement = {
  id: 'quoins',
  slug: 'quoins',
  name: 'Quoins',
  alternativeNames: ['Corner Stones', 'Angle Stones', 'Coin'],
  pronunciation: {
    phonetic: 'KOYNS',
    language: 'English',
  },
  etymology: {
    origin: 'French',
    meaning: 'From "coin" meaning corner or angle',
    rootWord: 'coin (French)',
  },
  category: 'FACADE',
  subcategory: 'corner_treatment',
  periods: ['ANCIENT_ROMAN', 'RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL', 'GEORGIAN', 'COLONIAL_AMERICAN', 'BEAUX_ARTS'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'EASTERN_EUROPE', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/quoins-primary.jpg',
    gallery: [
      '/images/architecture/elements/quoins-rusticated.jpg',
      '/images/architecture/elements/quoins-colonial.jpg',
      '/images/architecture/elements/quoins-alternating.jpg',
    ],
    diagram: '/images/architecture/diagrams/quoins.svg',
  },

  description: {
    ELEMENTARY: 'Quoins are special stones at the corners of buildings that look different from the rest of the wall! They\'re usually larger and stick out a bit, often alternating between long and short pieces. They make corners look strong and important, like the building is saying "Look how solid I am!" You can spot them on fancy old buildings, especially brick houses with stone corners.',
    MIDDLE_SCHOOL: 'Quoins are architectural elements consisting of emphasized corner stones that contrast with the adjacent wall surface. Typically made of dressed stone while surrounding walls are brick, or cut to project from the wall plane, quoins create visual emphasis at building corners. They often alternate in size-long stones (stretchers) bonding into one wall alternate with short stones (headers) bonding into the perpendicular wall. Besides visual effect, quoins originally provided structural reinforcement at vulnerable corner points.',
    HIGH_SCHOOL: 'Quoins are decorative and structural elements emphasizing building corners through contrasting material, texture, or projection. Classical applications feature alternating large and small blocks creating rhythmic corner patterns. Variations include: smooth quoins on rusticated walls, rusticated quoins on smooth walls, contrasting stone on brick construction, and projecting blocks creating shadow patterns. Renaissance and Baroque architects used quoins to articulate corners and establish visual hierarchies. Georgian and Colonial architecture adopted quoins as signifiers of quality construction and Classical taste. While originally structural (reinforcing corners in rubble masonry), quoins became primarily decorative in later applications.',
    UNDERGRADUATE: 'Quoins represent the intersection of structural logic and decorative articulation in Classical and vernacular architecture. Structurally, quoins bonded perpendicular walls together, particularly important in rubble or brick masonry where corners were vulnerable points. The alternating long-short pattern (stretcher-header) demonstrates this structural function. As architecture evolved toward more stable construction systems, quoins became increasingly decorative. Renaissance architects employed quoins to emphasize corners and create material contrasts-stone quoins on brick walls, smooth quoins on rusticated surfaces, or rusticated quoins on smooth walls. Palladio and later theorists codified quoin usage in villa and palazzo design. British Georgian architecture made quoins standard features, transmitted to colonial America where they signified quality construction and Classical taste. Analysis must distinguish structural quoins (in medieval and early Renaissance masonry) from decorative quoins (applied to later buildings with stable wall systems).',
    GRADUATE: 'Critical quoin analysis addresses the element\'s evolution from structural necessity to decorative convention. Archaeological and construction history evidence reveals quoins\' role in bonding perpendicular masonry walls, particularly in rubble or coursed stonework where corner integrity was critical. The alternating stretcher-header pattern derives from this bonding function. Renaissance architectural development saw quoins transition toward decorative emphasis-creating material contrasts, articulating corners, establishing rhythmic patterns. Theoretical discourse from Serlio through Georgian pattern books codified quoin applications and variations. Analysis must examine how quoins function within broader systems of facade articulation: establishing visual weight at corners, creating material hierarchies, demonstrating construction quality, and signaling Classical knowledge. Regional variations reveal different quoin traditions-Italian rusticated quoins, French smooth quoins, British contrasting-material quoins. The persistence of quoins in revivalist architecture (Georgian, Federal, Colonial Revival) raises questions about architectural convention, historical reference, and the maintenance of building traditions divorced from structural necessity.',
    PHD: 'Advanced quoin scholarship engages technical, aesthetic, and cultural dimensions of corner articulation across architectural traditions. Research methodologies include: construction archaeology examining quoin structural functions; analysis of theoretical texts and pattern books prescribing quoin usage; investigation of quoins within regional building traditions; and critical examination of quoins as architectural signs and cultural markers. Key research questions include: How did quoins evolve from structural elements to decorative conventions? What meanings did quoins carry in different architectural contexts? How did pattern books and builders\' guides transmit quoin traditions? What roles did quoins play in vernacular architecture and popular building practices? Primary sources range from Serlio\'s architectural treatise through Georgian pattern books (Halfpenny, Pain) to American builders\' guides (Asher Benjamin). Theoretical frameworks encompass tectonics (quoins as expression of construction logic), semiotics (quoins as signs of quality and Classical taste), and vernacular architecture studies (quoins in popular building). Critical analysis reveals quoins functioning simultaneously as construction solutions, aesthetic choices, and cultural signifiers of building quality and architectural sophistication.',
  },

  history: {
    ELEMENTARY: 'Quoins were invented to solve a problem: corners of stone buildings could crack or crumble where two walls met. By using special big stones that locked the walls together, builders made corners super strong! Even after builders learned other ways to make strong corners, they kept using quoins because they looked so good. Today, you can see quoins on brick houses making the corners look fancy and important!',
    MIDDLE_SCHOOL: 'Quoins originated in ancient masonry construction as structural reinforcement for corners in stone and brick buildings. Romans used quoins in various construction types. During the Renaissance, Italian architects revived quoins as both structural and decorative elements-stone quoins on brick palazzi, rusticated quoins creating visual emphasis. Palladio\'s villas (1550s-1570s) demonstrated refined quoin usage. British architecture adopted quoins extensively in the Georgian period (1714-1830), often using contrasting stone on brick houses. Colonial American architecture imported quoin usage, where it became a standard feature of quality buildings. Quoins appeared on various building types from grand houses to modest dwellings, often reduced to purely decorative function.',
    HIGH_SCHOOL: 'Quoin development reflects the evolution from structural necessity to architectural convention. Medieval masons used quoins to strengthen corners in rubble masonry and early brick construction. Renaissance architects studied ancient examples and developed systematic quoin applications-Palazzo Farnese (1534-1546) features refined quoins, while various Palladio villas demonstrate quoin usage in different contexts. Serlio\'s treatise (1537-1551) illustrated quoin patterns and applications. British architecture extensively adopted quoins during the Georgian period, where contrasting stone quoins on brick facades became standard practice. Pattern books by Batty Langley, William Halfpenny, and others codified quoin details. Colonial American architecture imported these conventions, with quoins appearing on houses throughout the colonies. Federal and Greek Revival styles continued quoin usage. As construction technology advanced (cavity walls, steel frames), quoins became purely decorative, yet persisted in revivalist architecture through the 20th century.',
    UNDERGRADUATE: 'Quoin history demonstrates the persistence of architectural conventions beyond their structural origins. Medieval construction employed quoins functionally-bonding perpendicular walls in stone masonry and reinforcing vulnerable corners. Renaissance architects reinterpreted quoins through Classical lens, studying Roman examples and developing refined applications. Palazzo Medici-Riccardi (1444-1484) features rusticated quoins integrated with rusticated walls. Palazzo Farnese demonstrates subtle quoin emphasis. Palladio\'s systematic approach varied quoin treatment by building type and material-stone villas, brick palazzi. Theoretical codification came through Serlio\'s illustrations and subsequent treatises. British Palladianism made quoins standard features, transmitted through pattern books enabling wide dissemination. American colonial builders relied on pattern books and established conventions, producing regional variations-Virginia brick with stone quoins, New England wood quoins on clapboard. As structural function declined (improved mortar, cavity walls, framing systems), quoins persisted as decorative conventions and signals of quality construction. Revivalist movements maintained quoin usage divorced from structural necessity.',
    GRADUATE: 'Critical quoin scholarship addresses the element\'s technical evolution, theoretical codification, and cultural significance. Construction archaeology reveals quoin structural functions in various masonry traditions-Roman opus quadratum, medieval rubble masonry, Renaissance brick and stone combinations. Analysis distinguishes truly structural quoins (bonding perpendicular walls) from decorative emphasis (applied to stable wall systems). Renaissance reception involved both functional understanding and aesthetic development-quoins articulate corners, create material hierarchies, demonstrate construction quality. Theoretical discourse from Serlio through Georgian pattern books codified quoin applications, proportions, and appropriate contexts. British architectural practice made quoins conventional, codified in pattern books enabling transmission to provincial builders and colonial contexts. American adaptation shows quoin conventions spreading through pattern book diffusion and builders\' practices, with regional material variations (stone, brick, wood). The persistence of quoins in 19th-20th century revivalist architecture (Colonial Revival, Georgian Revival) demonstrates architectural convention operating independently of functional necessity-quoins as signs of quality, historical reference, and architectural sophistication.',
    PHD: 'Advanced quoin scholarship engages multiple research domains: construction history examining quoin structural and technical functions; architectural history tracing quoin development and regional variations; book history investigating pattern book transmission of quoin conventions; and cultural history examining quoins as markers of taste, quality, and social aspiration. Research questions include: How did quoin practices evolve across different masonry traditions? What roles did theoretical texts and pattern books play in codifying and transmitting quoin conventions? How did quoins function within vernacular building practices? What cultural meanings attached to quoin usage in different contexts? Primary sources encompass Renaissance treatises (Serlio, Palladio), Georgian pattern books (Halfpenny, Pain, Swan), American builders\' guides (Benjamin, Lafever), and building archaeology. Theoretical frameworks include tectonics (quoins expressing construction logic), semiotics (quoins as architectural signs), vernacular architecture studies (quoins in popular building), and social history (quoins as markers of class and taste). Contemporary approaches examine quoins through materiality studies, phenomenology of corners and edges, and critical analysis of architectural convention and historical reference.',
  },

  characteristics: [
    'Emphasized stones at building corners',
    'Often alternating long (stretcher) and short (header) pattern',
    'Contrast with adjacent wall (material, color, or texture)',
    'May project from wall plane creating shadows',
    'Originally structural, bonding perpendicular walls',
    'Later became primarily decorative',
    'Common in Georgian, Colonial, and Neoclassical architecture',
  ],

  famousExamples: [
    { name: 'Palazzo Farnese', location: 'Rome, Italy', year: '1534-1546', description: 'Refined Renaissance quoin treatment' },
    { name: 'Villa Foscari (La Malcontenta)', location: 'Mira, Italy', year: '1558-1560', description: 'Palladio\'s systematic quoin usage' },
    { name: 'Queen\'s House', location: 'Greenwich, England', year: '1616-1635', description: 'Early English Classical quoins by Inigo Jones' },
    { name: 'Independence Hall', location: 'Philadelphia, Pennsylvania, USA', year: '1732-1753', description: 'Georgian quoins in American colonial architecture' },
    { name: 'Monticello', location: 'Charlottesville, Virginia, USA', year: '1768-1809', description: 'Jefferson\'s brick with stone quoins' },
  ],

  confusionPairs: [
    {
      elementId: 'rustication',
      reason: 'Both emphasize stonework with texture and projection',
      distinction: 'Quoins are specifically at corners; rustication covers entire wall surfaces',
    },
  ],

  searchTags: ['quoins', 'corners', 'stones', 'brick', 'masonry', 'georgian', 'colonial', 'renaissance', 'alternating', 'facade', 'structural'],

  arMetadata: {
    modelPath: '/models/architecture/quoins.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Stretcher (long stone)', position: { x: 0, y: 0.7, z: 0 } },
      { label: 'Header (short stone)', position: { x: 0, y: 0.5, z: 0 } },
      { label: 'Corner Joint', position: { x: 0.1, y: 0.6, z: 0.1 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
