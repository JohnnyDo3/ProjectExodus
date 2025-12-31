import type { ArchitecturalElement } from '../../types';

export const BALUSTRADE: ArchitecturalElement = {
  id: 'balustrade',
  slug: 'balustrade',
  name: 'Balustrade',
  alternativeNames: ['Railing', 'Parapet', 'Baluster Rail'],
  pronunciation: {
    phonetic: 'BAL-uh-strayd',
    language: 'English',
  },
  etymology: {
    origin: 'French/Italian',
    meaning: 'From "balaustra" referring to the pomegranate flower whose shape resembles balusters',
    rootWord: 'balaustra (Italian)',
  },
  category: 'FACADE',
  subcategory: 'protective_elements',
  periods: ['RENAISSANCE', 'MANNERISM', 'BAROQUE', 'ROCOCO', 'NEOCLASSICAL', 'BEAUX_ARTS'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'EASTERN_EUROPE', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/balustrade-primary.jpg',
    gallery: [
      '/images/architecture/elements/balustrade-staircase.jpg',
      '/images/architecture/elements/balustrade-rooftop.jpg',
      '/images/architecture/elements/balustrade-terrace.jpg',
    ],
    diagram: '/images/architecture/diagrams/balustrade.svg',
  },

  description: {
    ELEMENTARY: 'A balustrade is like a fancy fence made of little columns! It\'s a row of small vase-shaped posts (called balusters) with a rail on top. You\'ll see balustrades along staircases, on balconies, and running along the tops of grand buildings. They keep people safe from falling while looking beautiful and elegant!',
    MIDDLE_SCHOOL: 'A balustrade is a protective railing system consisting of a top rail supported by a series of short vertical posts called balusters. Balusters are typically vase or column-shaped, swelling at the base and sometimes at the middle. Balustrades appear on staircases, balconies, terraces, and rooflines. Renaissance architects revived this Classical element, and it became a standard feature in formal architecture. The balustrade combines practical safety with decorative elegance.',
    HIGH_SCHOOL: 'A balustrade consists of a handrail or coping supported by regularly spaced balusters-short vertical elements typically featuring turned profiles with swelling and narrowing sections. The complete assembly rests on a base rail or plinth. While functionally providing safety barriers, balustrades serve important aesthetic roles in Classical and formal architecture. Applications include staircases (interior and exterior), balconies, terraces, parapets, and roof edges. Renaissance architects studied ancient Roman precedents and developed standardized baluster profiles. Baroque and Rococo designers created elaborate balustrade variations. The element became essential in creating unified Classical compositions from Renaissance through Beaux-Arts periods.',
    UNDERGRADUATE: 'The balustrade represents a key element in Classical architectural vocabulary, serving both functional and compositional purposes. Structurally, balustrades provide safety barriers for elevated spaces-stairs, balconies, terraces, roof edges. Aesthetically, they create rhythmic patterns, establish scale relationships, and complete architectural compositions. The baluster itself evolved from ancient precedents through Renaissance codification. Michelangelo\'s innovative balustrades (Capitoline Hill) influenced subsequent development. Theoretical discourse from Serlio through Palladio established proportional systems for baluster design and spacing. Applications vary by location: stair balustrades follow rake angles and establish processional qualities; rooftop balustrades create skyline silhouettes and mask roof structures; terrace balustrades define outdoor spaces and frame views. Material variations include stone (most formal), wood (common in interiors), and later cast iron and concrete. Analysis must address balustrades\' roles in establishing architectural character, creating transitional spaces, and demonstrating craftsmanship.',
    GRADUATE: 'Critical balustrade analysis addresses the element\'s technical, aesthetic, and symbolic dimensions. Archaeological evidence suggests ancient precedents, though most surviving examples date from Renaissance onwards. Renaissance architects studied Roman fragments and developed systematic baluster designs. Michelangelo\'s Campidoglio balustrades (1536+) demonstrated innovative applications-framing stairs, defining plaza edges, integrating with architectural orders. Theoretical codification came through Serlio (illustrating baluster profiles), Vignola, and Palladio (establishing proportional systems). Balustrades function within multiple systems: structurally as safety barriers, compositionally as rhythmic elements, spatially as boundaries defining zones, and symbolically as markers of formality and Classical taste. Baroque architects elaborated balustrade designs, introducing more complex profiles and decorative variations. Regional traditions developed-Italian stone balustrades, French variants, English interpretations. Material innovations included cast iron balustrades enabling mass production and wider dissemination. Analysis must examine how balustrades articulate spaces, establish architectural hierarchies, and contribute to overall compositional effects.',
    PHD: 'Advanced balustrade scholarship engages multiple research domains: construction history examining balustrade structural systems and material technologies; design history tracing baluster profile development and regional variations; architectural theory investigating balustrade proportional systems and appropriate applications; and cultural history examining balustrades as markers of social status and architectural sophistication. Research questions include: How did Renaissance architects reconstruct ancient balustrade practices from fragmentary evidence? What role did theoretical treatises play in codifying baluster design? How did balustrades function within broader Classical architectural systems? What cultural meanings attached to balustrade usage in different contexts? Primary sources include Renaissance treatises (Serlio, Vignola, Palladio), pattern books transmitting baluster profiles, and building archaeology revealing construction techniques. Theoretical frameworks encompass tectonics (balustrades as functional barriers), formal analysis (balustrades as rhythmic compositional elements), semiotics (balustrades as signs of formality), and material culture studies (balustrades demonstrating craftsmanship and taste). Critical approaches examine balustrades through phenomenology (bodily interaction with protective barriers), social history (balustrades marking class distinctions), and vernacular architecture studies (balustrade simplification in popular building).',
  },

  history: {
    ELEMENTARY: 'The balustrade was invented in Italy during the Renaissance, about 500-600 years ago. Architects loved the graceful shapes of the little columns holding up the rail. Soon balustrades appeared everywhere-on grand staircases, palace balconies, and rooftops. Famous artists like Michelangelo designed beautiful balustrades. The idea spread across Europe and then to America, where you can still see balustrades on historic buildings and fancy homes!',
    MIDDLE_SCHOOL: 'While ancient buildings may have had primitive balustrades, the Classical balustrade as we know it developed during the Italian Renaissance (15th-16th centuries). Architects studied Roman remains and created standardized baluster designs. Michelangelo designed influential balustrades for the Capitoline Hill (1536+) in Rome. Sebastiano Serlio\'s architectural treatise (1537-1551) illustrated various baluster profiles, helping spread standardized designs. Baroque architects elaborated on Renaissance models, creating more ornate balustrades. The element spread throughout Europe and to colonial territories, becoming standard in formal architecture. The Industrial Revolution enabled mass-produced cast iron balustrades, making them more accessible.',
    HIGH_SCHOOL: 'Balustrade development traces from possible ancient precedents through Renaissance codification to widespread adoption. While some scholars identify ancient balustrade-like elements, the standardized Classical balustrade emerged in 15th-century Italy. Early examples appear in works by Giuliano da Sangallo and Bramante. Michelangelo\'s Campidoglio complex (begun 1536) featured innovative balustrade applications-monumental stairs, plaza edges, building parapets. Theoretical codification came through architectural treatises: Serlio illustrated baluster types (1537), Vignola established proportional systems (1562), Palladio refined balustrade design principles (1570). Applications expanded from exterior stairs and terraces to interior grand staircases. Baroque architects developed more elaborate profiles and decorative variations. French architecture under Louis XIV used balustrades extensively at Versailles and other royal projects. British architecture adopted balustrades in Palladian and Georgian styles. American architecture imported balustrade usage through colonial builders and later through pattern books.',
    UNDERGRADUATE: 'Balustrade evolution demonstrates Renaissance architectural innovation through ancient precedent reinterpretation and systematic design development. Archaeological evidence for ancient balustrades remains limited, though some scholars identify proto-balustrades in Hellenistic and Roman contexts. Renaissance architects developed the Classical balustrade through combined archaeological study and design innovation. Giuliano da Sangallo\'s works (1480s-1490s) show early Renaissance balustrades. Bramante\'s Tempietto (1502) included balustrade elements. Michelangelo\'s transformative Campidoglio balustrades demonstrated multiple applications and established influential precedents. Theoretical systematization came through treatise writers: Serlio\'s Libro Quarto illustrated six baluster types with proportional guidelines; Vignola\'s Regola established precise proportional systems; Palladio integrated balustrades into comprehensive villa and palazzo designs. Regional developments included distinctive French balustrades (Louvre, Versailles), British Palladian adaptations (Burlington, Kent), and Italian regional variations. Material innovations expanded possibilities-stone balustrades in formal contexts, wood in vernacular applications, cast iron enabling industrial production and wider accessibility. Neoclassical archaeology influenced more "correct" ancient-inspired designs.',
    GRADUATE: 'Critical balustrade scholarship addresses technical evolution, theoretical development, and cultural significance across architectural traditions. Renaissance reconstruction of ancient practice involved limited archaeological evidence, requiring substantial innovation masked as revival. Analysis of specific monuments reveals design development: Bramante\'s early experiments, Michelangelo\'s monumental applications, Vignola\'s proportional codification, Palladio\'s systematic integration. Theoretical discourse established balustrade design principles and appropriate applications-relating baluster proportions to human scale, architectural orders, and specific contexts (stairs, terraces, parapets). Regional traditions developed distinctive characteristics-Italian stone balustrades with robust profiles, French elaborate designs, English restraint. Material studies reveal construction techniques and technological innovations-stone cutting and joinery, wood turning, cast iron molding. Social and cultural analysis examines balustrades as markers of architectural sophistication and social status-distinguishing grand from modest buildings, formal from vernacular architecture. Industrial production transformed balustrade accessibility, enabling wider dissemination divorced from original craft traditions. Revivalist movements maintained balustrade usage as essential Classical signifier.',
    PHD: 'Advanced balustrade scholarship engages multiple methodological approaches: archaeological investigation of ancient precedents and Renaissance interpretations; technical analysis of construction methods and material systems; theoretical examination of design principles and proportional systems; pattern book studies tracking design transmission; and cultural interpretation of balustrades as social and architectural signifiers. Key research questions include: How did Renaissance architects construct balustrade traditions from limited ancient evidence? What roles did theoretical treatises and pattern books play in establishing and transmitting balustrade conventions? How did balustrades function within broader Classical architectural vocabularies? What relationships existed between balustrade design and social hierarchies? Primary sources include Renaissance treatises (Serlio, Vignola, Palladio, Scamozzi), pattern books enabling popular dissemination, building archaeology, and historical carpentry/masonry manuals. Theoretical frameworks encompass design history (baluster profile evolution), tectonics (balustrades as functional and symbolic elements), semiotics (balustrades as architectural signs), material culture studies (craftsmanship and technological change), and social history (balustrades marking class and taste). Contemporary approaches examine balustrades through phenomenology (haptic and visual experience), accessibility studies (historical barriers and inclusive design), and critical analysis of Classical convention persistence.',
  },

  characteristics: [
    'Top rail or coping',
    'Series of balusters (vase-shaped posts)',
    'Base rail or plinth',
    'Regular spacing creating rhythmic pattern',
    'Turned profile with swelling and narrowing',
    'Used on stairs, balconies, terraces, roof edges',
    'Materials: stone, wood, cast iron, concrete',
  ],

  famousExamples: [
    { name: 'Capitoline Hill', location: 'Rome, Italy', year: '1536-1546', description: 'Michelangelo\'s monumental stair balustrades' },
    { name: 'Villa Foscari (La Malcontenta)', location: 'Mira, Italy', year: '1558-1560', description: 'Palladio\'s Classical balustrade design' },
    { name: 'Palace of Versailles', location: 'Versailles, France', year: '1661-1710', description: 'Elaborate Baroque balustrades by Le Vau and Hardouin-Mansart' },
    { name: 'Chiswick House', location: 'London, England', year: '1726-1729', description: 'Palladian balustrades by Lord Burlington' },
    { name: 'US Capitol', location: 'Washington D.C., USA', year: '1800-1866', description: 'Neoclassical balustrades on stairs and terraces' },
  ],

  confusionPairs: [
    {
      elementId: 'parapet',
      reason: 'Both appear at roof edges and elevated platforms',
      distinction: 'Balustrade has individual balusters; parapet is a solid wall',
    },
    {
      elementId: 'railing',
      reason: 'Both are protective barriers',
      distinction: 'Balustrade specifically has decorative balusters; railing is more general term',
    },
  ],

  searchTags: ['balustrade', 'baluster', 'railing', 'staircase', 'terrace', 'parapet', 'renaissance', 'classical', 'columns', 'safety', 'facade'],

  arMetadata: {
    modelPath: '/models/architecture/balustrade.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Top Rail', position: { x: 0, y: 0.9, z: 0 } },
      { label: 'Baluster', position: { x: 0, y: 0.5, z: 0 } },
      { label: 'Base Rail', position: { x: 0, y: 0.1, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
