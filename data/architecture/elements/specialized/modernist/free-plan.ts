import type { ArchitecturalElement } from '../../../types';

export const FREE_PLAN: ArchitecturalElement = {
  id: 'free-plan',
  slug: 'free-plan',
  name: 'Free Plan',
  alternativeNames: ['Plan Libre', 'Open Plan', 'Free Floor Plan'],
  pronunciation: {
    phonetic: 'FREE PLAN',
    language: 'English',
  },
  etymology: {
    origin: 'French',
    meaning: 'A floor plan freed from structural constraints',
    rootWord: 'plan libre (French)',
  },
  category: 'INTERIOR',
  subcategory: 'modernist_principles',
  periods: ['international-style', 'brutalism', 'contemporary'],
  regions: ['WESTERN_EUROPE', 'NORTH_AMERICA', 'ASIA', 'SOUTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/free-plan-primary.jpg',
    gallery: [
      '/images/architecture/elements/free-plan-savoye.jpg',
      '/images/architecture/elements/free-plan-farnsworth.jpg',
    ],
    diagram: '/images/architecture/diagrams/free-plan.svg',
  },

  description: {
    ELEMENTARY: 'A free plan means the inside walls of a building can go anywhere because they don\'t need to hold up the roof! The building stands on columns or a frame, so you can arrange rooms however you want. It\'s like building with blocks-you can change the layout anytime.',
    MIDDLE_SCHOOL: 'The free plan is a design concept where interior walls are not structural and can be placed anywhere, enabled by a skeletal frame (concrete or steel) that carries all loads. This was one of Le Corbusier\'s Five Points of Architecture. Unlike traditional buildings where walls support the structure, free plan buildings use columns, allowing architects to design flexible, open interior spaces independent of the structural system.',
    HIGH_SCHOOL: 'The free plan principle emerged from reinforced concrete and steel frame construction, which transferred structural loads to columns instead of walls. This liberated interior walls from load-bearing duties, allowing them to be positioned freely according to functional needs rather than structural requirements. The result was unprecedented spatial flexibility: open flowing spaces, movable partitions, and floor plans that could be modified without compromising structural integrity.',
    UNDERGRADUATE: 'The free plan represents a fundamental shift in architectural design thinking, enabled by modern structural systems. By separating structure (frame) from enclosure (walls), architects gained freedom to manipulate interior space without structural constraints. This principle manifests in multiple ways: completely open spaces (Mies), free-flowing interconnected rooms (Le Corbusier), or flexible layouts with movable partitions (Japanese Metabolism). The free plan also enables programmatic flexibility, allowing buildings to adapt to changing uses over time.',
    GRADUATE: 'The free plan embodies core Modernist principles: structural rationalism (expressing the frame), functionalism (form follows use), and spatial innovation (new experiential possibilities). Analysis must consider both technical prerequisites (structural systems, span capabilities) and phenomenological effects (spatial flow, visual continuity, light penetration). The concept influenced diverse building types from domestic architecture (open living spaces) to corporate offices (flexible workstations). Critical examination reveals tensions between theoretical freedom and practical constraints (mechanical systems, acoustic privacy, thermal zoning).',
    PHD: 'Scholarly investigation of the free plan requires engagement with architectural theory, structural history, and spatial philosophy. Key questions include: How did the free plan reshape domestic life and work patterns? What are the genealogical relationships between the free plan, Japanese traditional architecture, and Arts and Crafts spatial ideals? How does structural type (concrete frame vs. steel) influence plan freedom? Contemporary research addresses: the free plan\'s role in adaptive reuse, its relationship to contemporary open-office critique, environmental implications (thermal and acoustic), and manifestations in digital design (parametric planning). The concept remains influential but faces reassessment regarding privacy, scale, and programmatic specificity.',
  },

  history: {
    ELEMENTARY: 'Le Corbusier came up with the idea of the free plan in the 1920s. His Villa Savoye (1929) showed how you could have big open spaces inside instead of lots of small rooms with walls everywhere. This idea changed how people designed houses and buildings forever.',
    MIDDLE_SCHOOL: 'The free plan emerged in the 1910s-1920s as architects explored possibilities of reinforced concrete construction. Le Corbusier\'s Dom-ino House proposal (1914) established the basic concept, theorized in his Five Points of Architecture (1927), and demonstrated in Villa Savoye (1929). Mies van der Rohe pursued free plan ideals to ultimate conclusions in buildings like Farnsworth House (1951), where interior space became almost completely open.',
    HIGH_SCHOOL: 'The free plan concept developed from multiple sources: 19th-century iron construction, Frank Lloyd Wright\'s Prairie houses (flowing spaces), and Adolf Loos\'s Raumplan (spatial planning). Le Corbusier codified the principle theoretically (1920s) while Mies van der Rohe explored minimal enclosure. Post-war applications included office buildings (open plans for flexibility), schools (transformable spaces), and housing (adaptable layouts). The concept influenced diverse movements including Metabolism and High-Tech architecture.',
    UNDERGRADUATE: 'Free plan development can be traced through key projects: Le Corbusier\'s Dom-ino system (1914-15) establishing the principle, Villa Stein (1927) demonstrating complex spatial relationships, Villa Savoye (1929-31) achieving canonical expression. Parallel developments include Mies\'s Barcelona Pavilion (1929) with free-flowing space, Eileen Gray\'s E-1027 (1929) with flexible furniture systems, and Wright\'s Usonian houses with open living areas. Post-war examples like Eames House (1949) and Farnsworth House (1951) showed domestic applications, while office buildings universally adopted open plans.',
    GRADUATE: 'The historiography of the free plan encompasses technical innovation (structural systems), formal exploration (spatial composition), and social theory (new ways of living/working). Le Corbusier\'s formulation synthesized diverse influences including Auguste Perret\'s concrete frames and Japanese spatial fluidity. Mies\'s reductive approach eliminated walls almost entirely (universal space), while later architects developed hybrid strategies (Metabolism\'s megastructures, Archigram\'s plug-in systems). Critical assessment must address both successes (flexibility, openness) and failures (acoustic problems, lack of privacy, unsuitability for certain programs). Contemporary scholarship examines the free plan through lenses of sustainability (thermal zoning), social behavior (open office critique), and digital design (parametric planning).',
    PHD: 'Academic analysis of the free plan requires interdisciplinary approaches encompassing architectural theory, structural engineering, social history, and philosophy of space. Research areas include: the concept\'s intellectual genealogy (from Viollet-le-Duc\'s structural rationalism through CIAM functionalism), its diverse implementations across cultures and building types, its relationship to modern life patterns (suburban living, office work), and its long-term performance (adaptability vs. obsolescence). Critical questions: Does structural freedom produce spatial quality? How do free plans accommodate privacy, hierarchy, and ritual? What are environmental implications? Contemporary research examines: post-pandemic reconsideration of open offices, free plan strategies in adaptive reuse, and algorithmic planning tools. The concept remains foundational yet contested.',
  },

  characteristics: [
    'Structural frame (columns) independent of interior walls',
    'Non-load-bearing interior partitions',
    'Flexible spatial arrangements',
    'Open, flowing spaces possible',
    'Ability to modify layout without structural changes',
    'Visual continuity between spaces',
  ],

  famousExamples: [
    { name: 'Villa Savoye', location: 'Poissy, France', year: '1929-1931', description: 'Le Corbusier\'s canonical demonstration of the plan libre principle' },
    { name: 'Farnsworth House', location: 'Plano, Illinois, USA', year: '1945-1951', description: 'Mies van der Rohe\'s ultimate free plan with minimal partitions' },
    { name: 'Barcelona Pavilion', location: 'Barcelona, Spain', year: '1929', description: 'Mies van der Rohe\'s free-flowing space defined by freestanding walls' },
    { name: 'Eames House (Case Study House #8)', location: 'Los Angeles, USA', year: '1949', description: 'Charles and Ray Eames\'s flexible domestic space with movable storage units' },
    { name: 'Neue Nationalgalerie', location: 'Berlin, Germany', year: '1962-1968', description: 'Mies van der Rohe\'s universal space supported by eight columns' },
  ],

  confusionPairs: [
    {
      elementId: 'open-plan',
      reason: 'Both describe non-compartmentalized interior space',
      distinction: 'Free plan is a structural principle (walls freed from structural duty); open plan describes the resulting spatial arrangement',
    },
  ],

  searchTags: ['free plan', 'plan libre', 'corbusier', 'modern', 'open space', 'flexible', 'structural frame', 'five points', 'interior', 'mies'],

  arMetadata: {
    modelPath: '/models/architecture/free-plan.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Structural Columns (grid)', position: { x: 0.4, y: 0.5, z: 0.4 } },
      { label: 'Non-structural Partition Walls', position: { x: 0, y: 0.5, z: 0 } },
      { label: 'Open Space', position: { x: -0.3, y: 0.5, z: -0.3 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
