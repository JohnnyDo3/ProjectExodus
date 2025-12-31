import type { ArchitecturalElement } from '../../types';

export const CLERESTORY: ArchitecturalElement = {
  id: 'clerestory',
  slug: 'clerestory',
  name: 'Clerestory',
  alternativeNames: ['Clearstory', 'Clearstorey', 'Upper Windows'],
  pronunciation: {
    phonetic: 'KLEER-stor-ee',
    language: 'English',
  },
  etymology: {
    origin: 'Middle English',
    meaning: 'From "clear" (light) + "story" (level) - the clear or light-filled story',
    rootWord: 'clerestorie',
  },
  category: 'WINDOW',
  subcategory: 'upper_windows',
  periods: ['ANCIENT_EGYPTIAN', 'ANCIENT_ROMAN', 'ROMANESQUE', 'GOTHIC', 'RENAISSANCE', 'MODERN', 'CONTEMPORARY'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/clerestory-primary.jpg',
    gallery: [
      '/images/architecture/elements/clerestory-gothic.jpg',
      '/images/architecture/elements/clerestory-modern.jpg',
      '/images/architecture/elements/clerestory-basilica.jpg',
    ],
    diagram: '/images/architecture/diagrams/clerestory.svg',
  },

  description: {
    ELEMENTARY: 'A clerestory is a row of windows placed high up on a wall, above the roof of a lower section of the building. Imagine windows near the ceiling that let light pour down from above! Ancient Egyptians used clerestories in their temples, and medieval churches had beautiful clerestories with stained glass. The high placement brings light deep into the building without losing privacy or wall space below. Modern buildings still use clerestories to fill rooms with natural daylight!',
    MIDDLE_SCHOOL: 'A clerestory (pronounced "KLEER-story") is an upper level of wall containing windows, positioned above adjacent rooflines to admit light into the interior. In churches, the clerestory rises above the side aisle roofs, with windows illuminating the central nave. This architectural element solves the problem of bringing natural light into large, deep buildings. The elevated window position provides light without compromising privacy or lower wall surfaces needed for other purposes. Clerestories appear in various building types across history-from ancient Egyptian temples and Roman basilicas to Gothic cathedrals and modern museums and houses.',
    HIGH_SCHOOL: 'The clerestory is an architectural feature consisting of a high section of wall with windows above eye level, typically rising above adjacent rooflines or lower interior spaces. In basilican church plans, the clerestory forms the upper wall of the central nave, positioned above the side aisle roofs, with windows providing natural illumination to the central space. The structural arrangement requires supporting the clerestory wall, typically through columns or piers below, with the side aisle roofs serving as buttresses. Functionally, clerestories solve multiple challenges: deep daylighting (bringing light far into building interiors), thermal stack effect (warm air rises, aiding ventilation), and spatial hierarchy (taller central spaces). Historical applications include ancient temples, Roman basilicas, Romanesque and Gothic churches, and industrial buildings. Modern architecture extensively employs clerestories in museums, libraries, schools, and residences for natural daylighting and energy efficiency.',
    UNDERGRADUATE: 'Clerestory analysis encompasses structural systems, daylighting performance, and spatial composition across architectural traditions. Structurally, clerestories create vertical discontinuities requiring careful load distribution. In basilican arrangements, nave columns or piers support the clerestory wall and roof, with side aisles providing lateral stability. Gothic development enabled larger clerestory windows through pointed arches, rib vaulting, and flying buttresses transferring lateral loads away from clerestory walls. Environmental performance includes daylighting (high windows distribute diffuse light reducing glare), ventilation (stack effect draws air upward and out), and thermal management (separating daylight from direct solar heat gain). Design considerations involve window sizing (balancing light admission with structural requirements), proportional relationships (clerestory height to nave width), and orientation (optimizing solar access while managing heat gain). Regional traditions developed distinctive clerestory types: Roman basilicas with simple arcaded clerestories, Romanesque thick-walled clerestories with small windows, Gothic thin-walled clerestories with extensive glazing, industrial sawtooth clerestories. Contemporary applications emphasize sustainable design-daylighting reducing electric lighting energy, natural ventilation, and integration with building systems. Analysis must address clerestories\' multiple functions: environmental performance, spatial definition, structural expression, and stylistic characterization.',
    GRADUATE: 'Critical clerestory scholarship addresses technological evolution, environmental performance, and symbolic functions across architectural contexts. Ancient precedents include Egyptian hypostyle halls (Karnak Temple) with stone grille clerestories and Roman basilicas establishing the clerestory-over-aisles typology. Early Christian adoption of basilican form transmitted clerestory traditions to religious architecture. Romanesque clerestories featured thick masonry walls with relatively small window openings, reflecting structural limitations and aesthetic preferences. Gothic development represents significant technological advancement-pointed arches and rib vaulting enabled taller clerestories, flying buttresses transferred lateral loads, and structural refinement permitted increasing window size (culminating in Rayonnant Gothic with minimal wall surface). Engineering analysis reveals empirical understanding of load distribution, lateral stability, and wind forces. Environmental research demonstrates clerestory daylighting effectiveness-high windows provide deeper light penetration and more even distribution than low windows. Ventilation performance through stack effect (buoyancy-driven airflow) provides passive cooling. Industrial architecture developed specialized clerestory types-sawtooth roofs with north-facing clerestories for consistent diffuse light in factories. Modern movement architects employed clerestories for functional daylighting and spatial expression. Contemporary sustainable design emphasizes clerestories in high-performance buildings-daylighting strategies, natural ventilation, and reduced energy consumption. Analysis must examine clerestories within multiple frameworks: structural innovation, environmental science, spatial experience, and stylistic evolution.',
    PHD: 'Advanced clerestory scholarship requires interdisciplinary methodologies: structural engineering analyzing load distribution and stability; environmental building science investigating daylighting and ventilation performance; architectural history examining clerestory evolution across cultures; conservation science addressing historic clerestory preservation; and sustainable design research optimizing contemporary applications. Research questions include: What structural innovations enabled clerestory development across periods? How do clerestories perform environmentally in different climates and building types? What symbolic meanings attached to clerestories in religious architecture? How should conservation balance historic character with performance improvement? What roles can clerestories play in sustainable building design? Primary sources include historical building treatises (Vitruvius, Alberti), medieval master builder manuscripts, building archaeology revealing construction techniques, and contemporary building science research. Theoretical frameworks encompass tectonics (clerestory structural expression), environmental design (passive strategies), phenomenology (spatial experience of top-lit spaces), semiotics (clerestory as sign of sacred or important space), and sustainability theory. Methodological approaches include computational daylighting simulation, thermal and ventilation modeling, photogrammetry and laser scanning of historic examples, and post-occupancy evaluation of contemporary clerestory buildings. Key debates address: optimal clerestory proportions for different latitudes and building types; balancing daylighting benefits with thermal loads; appropriate interventions in historic clerestory windows; and clerestories in net-zero energy buildings. Emerging research employs advanced simulation, smart glass technologies in clerestories, and integration with active building systems while maintaining passive strategies.',
  },

  history: {
    ELEMENTARY: 'Clerestory windows are very old-ancient Egyptians used them in their temples over 3,000 years ago! The windows were cut high in thick stone walls to let light shine down on statues of gods. Romans built clerestories in their big public buildings too. During the Middle Ages, churches had beautiful clerestory windows with colorful stained glass that made rainbow light inside. Modern architects still love clerestories because they bring in lots of natural daylight and make rooms feel bright and airy. You might have clerestory windows in your school or library!',
    MIDDLE_SCHOOL: 'Clerestories have ancient origins. Egyptian temples (c. 1500-1000 BCE) featured stone grille clerestories in hypostyle halls. Roman basilicas (civic buildings) established the clerestory-over-side-aisles arrangement that early Christians adopted for church architecture (4th century CE onward). Romanesque churches (11th-12th centuries) featured modest clerestories with thick walls and relatively small windows. Gothic architecture (12th-16th centuries) dramatically expanded clerestory glazing through structural innovations-pointed arches, flying buttresses, and rib vaults enabled walls of glass in cathedrals like Chartres and Sainte-Chapelle. Industrial Revolution factories used sawtooth clerestories for consistent north light. Modern architects (Le Corbusier, Louis Kahn) employed clerestories for natural daylighting. Contemporary sustainable design emphasizes clerestories for energy-efficient buildings.',
    HIGH_SCHOOL: 'Clerestory evolution reflects structural capabilities and changing attitudes toward natural light. Ancient Egyptian precedents (Karnak Temple hypostyle hall, c. 1290 BCE) featured stone lattice clerestories illuminating columned halls. Roman basilicas (Basilica of Maxentius, 308-312 CE) established the clerestory-nave-aisle typology. Early Christian churches adopted basilican form with clerestories (Old St. Peter\'s, 4th century CE). Byzantine architecture featured clerestories beneath domes (Hagia Sophia, 537 CE). Romanesque clerestories (Durham Cathedral, 1093-1133) had thick walls with small window openings. Gothic development dramatically increased clerestory glazing: Early Gothic (Notre-Dame, begun 1163), High Gothic (Chartres Cathedral, 1194-1220), and Rayonnant Gothic (Sainte-Chapelle, 1241-1248) progressively enlarged windows. Industrial architecture developed specialized clerestories-sawtooth roofs in textile mills (19th century). Modern movement architects employed clerestories functionally and expressively (Le Corbusier\'s Ronchamp, 1954; Kahn\'s Kimbell Art Museum, 1972). Contemporary sustainable architecture emphasizes clerestory daylighting for energy efficiency.',
    UNDERGRADUATE: 'Clerestory history demonstrates the relationship between structural innovation, functional requirements, and aesthetic expression across cultures and periods. Egyptian temple clerestories (Karnak, Luxor) employed massive stone construction with grille openings. Roman engineering enabled larger clerestories through arch and vault technology-basilicas established central nave with clerestory over side aisles, influencing subsequent Christian architecture. Byzantine clerestories beneath domes required sophisticated understanding of dome thrust and supporting structures (Hagia Sophia demonstrates complex clerestory-pendentive-dome integration). Romanesque clerestories reflected thick-wall construction and limited window technology-small openings in massive walls (Saint-Sernin Toulouse, Santiago de Compostela). Gothic structural innovations transformed clerestory possibilities: pointed arches concentrated loads, rib vaulting distributed forces, flying buttresses transferred lateral thrust away from walls. This enabled progressive window enlargement: Sens Cathedral (begun 1140s) modest clerestories, Chartres Cathedral significant expansion, Sainte-Chapelle near-complete glazing. Regional variations emerged-French emphasis on height and light, English decorated clerestories. Industrial clerestories served functional lighting-sawtooth roofs with north-facing glass provided consistent diffuse light for manufacturing. Modern movement architects theorized and implemented clerestories-Le Corbusier\'s Five Points included roof gardens with clerestories, Kahn developed sophisticated vault-and-clerestory systems. Contemporary applications balance traditional passive benefits with advanced glazing technology and building system integration.',
    GRADUATE: 'Critical clerestory scholarship addresses structural innovation, environmental performance, symbolic meanings, and contemporary applications across architectural traditions. Ancient precedents reveal early understanding of top-lighting benefits despite limited structural capabilities-Egyptian stone grilles, Roman arched clerestories. Early Christian adoption of basilican form with clerestories carried symbolic associations-divine light from above illuminating sacred space. Theological interpretation connected clerestory light to spiritual enlightenment. Structural analysis of Romanesque clerestories reveals tensions between desired window size and wall stability-thick walls, small openings, heavy roof loads. Gothic development represents breakthrough-systematic structural refinement enabled unprecedented clerestory glazing. Engineering investigation (Viollet-le-Duc, modern researchers) reveals empirical understanding of load distribution, buttressing requirements, and wind loads. Environmental science research demonstrates clerestory performance-daylighting effectiveness, thermal stratification, natural ventilation through stack effect. Regional studies reveal distinctive traditions-French Rayonnant emphasis on maximum glazing, English Perpendicular panel tracery, Spanish retention of smaller clerestories. Industrial clerestory development responded to manufacturing needs-consistent diffuse lighting, heat management, large-span structures. Modern movement theoretical discourse emphasized honest expression of structure and function, with clerestories demonstrating both. Contemporary research addresses clerestories in high-performance buildings-daylighting metrics (daylight factors, glare control), thermal modeling (solar heat gain management), and ventilation optimization. Conservation challenges include historic window restoration, upgrading glazing performance while maintaining character, and structural stabilization.',
    PHD: 'Advanced clerestory scholarship employs multiple disciplinary approaches: structural archaeology examining historical construction techniques; environmental building science analyzing daylighting and thermal performance; architectural history documenting evolution across cultures; conservation science developing preservation strategies; and sustainable design research optimizing contemporary applications. Research questions include: How did empirical structural knowledge enable clerestory development before engineering science? What environmental conditions and cultural factors shaped regional clerestory traditions? What symbolic and theological meanings attached to clerestory light in religious architecture? How can historic clerestories be conserved while improving performance? What roles should clerestories play in sustainable building design across different climates and building types? Primary sources include ancient building remains (archaeological evidence), medieval building accounts and manuscripts (construction documentation), architectural treatises (Vitruvius, Alberti, Viollet-le-Duc), and building science research publications. Methodological frameworks encompass structural mechanics (load distribution analysis), environmental science (daylighting and ventilation modeling), phenomenology (spatial experience of top-lit spaces), iconology (symbolic interpretation of light), and sustainability assessment. Analytical methods include computational fluid dynamics (airflow modeling), raytracing simulation (daylighting analysis), finite element analysis (structural behavior), and post-occupancy evaluation (actual performance). Key debates address: optimal clerestory design for different contexts; balancing daylighting benefits with heat gain/loss; appropriate conservation interventions; and clerestories in net-zero energy buildings. Emerging research employs advanced simulation tools, electrochromic glazing in clerestories, integrated photovoltaic-clerestory systems, and machine learning optimization of clerestory design parameters.',
  },

  characteristics: [
    'High windows above adjacent rooflines or lower spaces',
    'Positioned above eye level, often near ceiling',
    'Brings natural light deep into building interiors',
    'Common in basilican church plans (nave over aisles)',
    'Creates thermal stack effect for ventilation',
    'Maintains privacy while admitting light',
    'Can be continuous row or individual windows',
    'Used in ancient, medieval, and modern architecture',
  ],

  famousExamples: [
    { name: 'Karnak Temple', location: 'Luxor, Egypt', year: 'c. 1290 BCE', description: 'Ancient Egyptian stone grille clerestories in hypostyle hall' },
    { name: 'Hagia Sophia', location: 'Istanbul, Turkey', year: '537 CE', description: 'Byzantine clerestory windows beneath central dome' },
    { name: 'Chartres Cathedral', location: 'Chartres, France', year: '1194-1220', description: 'Gothic clerestory with extensive stained glass' },
    { name: 'Sainte-Chapelle', location: 'Paris, France', year: '1241-1248', description: 'Rayonnant Gothic with maximized clerestory glazing' },
    { name: 'Kimbell Art Museum', location: 'Fort Worth, Texas, USA', year: '1972', description: 'Louis Kahn\'s vaulted clerestory system for museum lighting' },
    { name: 'Menil Collection', location: 'Houston, Texas, USA', year: '1987', description: 'Renzo Piano\'s sophisticated clerestory daylighting for art' },
  ],

  confusionPairs: [
    {
      elementId: 'triforium',
      reason: 'Both are upper levels in church architecture',
      distinction: 'Triforium is arcaded gallery below clerestory; clerestory has windows to exterior',
    },
    {
      elementId: 'high-windows',
      reason: 'Both are elevated windows',
      distinction: 'Clerestory specifically refers to upper level above adjacent roofs; high windows is more general',
    },
  ],

  searchTags: ['clerestory', 'clearstory', 'high windows', 'upper windows', 'nave', 'basilica', 'church', 'daylighting', 'gothic', 'natural light', 'ventilation'],

  arMetadata: {
    modelPath: '/models/architecture/clerestory.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Clerestory Windows', position: { x: 0, y: 0.9, z: 0 } },
      { label: 'Nave Wall', position: { x: 0, y: 0.7, z: 0 } },
      { label: 'Side Aisle Roof', position: { x: 0.5, y: 0.5, z: 0 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
