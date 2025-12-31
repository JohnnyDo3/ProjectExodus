import type { ArchitecturalElement } from '../../../types';

export const BRISE_SOLEIL: ArchitecturalElement = {
  id: 'brise-soleil',
  slug: 'brise-soleil',
  name: 'Brise-soleil',
  alternativeNames: ['Sun Breaker', 'Solar Shading', 'Sun Screen', 'Sunshade'],
  pronunciation: {
    phonetic: 'breez-so-LAY',
    language: 'French',
  },
  etymology: {
    origin: 'French',
    meaning: 'Sun breaker or sun shield',
    rootWord: 'briser (to break) + soleil (sun)',
  },
  category: 'FACADE',
  subcategory: 'modernist_systems',
  periods: ['international-style', 'brutalism', 'metabolism', 'sustainable'],
  regions: ['SOUTH_AMERICA', 'MIDDLE_EAST', 'ASIA', 'AFRICA', 'WESTERN_EUROPE'],

  images: {
    primary: '/images/architecture/elements/brise-soleil-primary.jpg',
    gallery: [
      '/images/architecture/elements/brise-soleil-chandigarh.jpg',
      '/images/architecture/elements/brise-soleil-brasilia.jpg',
    ],
    diagram: '/images/architecture/diagrams/brise-soleil.svg',
  },

  description: {
    ELEMENTARY: 'A brise-soleil is like a big sunshade for a building! It\'s made of horizontal or vertical bars that stick out from the walls to block the hot sun while still letting light and air through. Think of it like the slats on window blinds, but on the outside of a building.',
    MIDDLE_SCHOOL: 'Brise-soleil are fixed exterior shading devices-usually horizontal or vertical fins, louvers, or grilles-that protect building facades from direct sunlight. Pioneered by Le Corbusier for hot climates, these elements reduce solar heat gain and glare while maintaining views and natural ventilation. The geometry is calculated based on sun angles to provide optimal shading during peak solar exposure.',
    HIGH_SCHOOL: 'Brise-soleil represent a climate-responsive architectural element developed as Modern architecture spread to tropical and subtropical regions. These fixed shading systems use concrete, metal, or wood elements arranged to block high-angle sun (summer/midday) while admitting low-angle sun (winter/morning/evening). Le Corbusier pioneered the integration of brise-soleil into building facades, transforming a functional requirement into an architectural expression that became iconic in buildings from India to Brazil.',
    UNDERGRADUATE: 'The brise-soleil emerged from the tension between Modernist glass architecture and climatic reality. While glass facades suited temperate European climates, they caused severe overheating in tropical regions. Le Corbusier\'s solution employed fixed exterior shading calculated using sun path diagrams, blocking direct sun while permitting indirect light and airflow. The element\'s geometry varies by latitude, orientation, and climate-horizontal for south facades, vertical for east/west. Beyond function, brise-soleil became an aesthetic feature, creating rhythmic facades and modulated light/shadow effects.',
    GRADUATE: 'Analysis of brise-soleil must address thermal physics (solar radiation, heat gain reduction), geometrical calculation (sun angle analysis, shading coefficients), material considerations (thermal mass, reflectivity), and aesthetic implications (facade articulation, cultural expression). Le Corbusier\'s development of brise-soleil (1930s-1960s) paralleled his global practice, with each project responding to specific climatic conditions. The element represents climate-responsive Modernism, contrasting with the hermetically sealed glass boxes of corporate International Style. Contemporary developments include operable systems, integrated photovoltaics, and parametric design enabling complex geometries.',
    PHD: 'Scholarly examination of brise-soleil requires interdisciplinary engagement with architectural history, building physics, climate studies, and cultural theory. Research questions include: How effective are brise-soleil in various climatic zones? What cultural meanings attach to sun-shading in different contexts? How did this element spread globally from European origins? Key topics: Le Corbusier\'s climatic thinking evolution (from Algiers to Chandigarh), regional adaptations by local architects (Niemeyer, Reidy, Correa), comparative thermal performance, and aesthetic/symbolic functions beyond shading. Contemporary research addresses: dynamic systems, integrated energy generation, computational design optimization, and the element\'s role in sustainable architecture. The brise-soleil exemplifies both Modernism\'s aspiration to universal principles and the necessity of local adaptation.',
  },

  history: {
    ELEMENTARY: 'Le Corbusier invented brise-soleil in the 1930s when he realized his glass buildings were too hot in sunny countries like Brazil and India. He designed special sun-blocking systems that kept buildings cool while still being beautiful. Now you can see them on buildings in hot places all over the world.',
    MIDDLE_SCHOOL: 'While traditional architecture used various sun-shading methods, the modern brise-soleil was developed by Le Corbusier in the 1930s-40s for projects in Algeria, Brazil (Ministry of Education, 1936-43), and India (Chandigarh, 1950s). The element spread through tropical Modernism, appearing in buildings by Oscar Niemeyer, Affonso Reidy, and others. It became a defining feature of architecture in hot climates, balancing Modernist aesthetics with environmental necessity.',
    HIGH_SCHOOL: 'Brise-soleil development began with Le Corbusier\'s unrealized projects for North Africa (1930s) and was first built at the Ministry of Education and Health in Rio de Janeiro (1936-43, with local architects). The concept evolved through Chandigarh (1950s), where Le Corbusier created diverse brise-soleil systems for different building types. Brazilian architects (Niemeyer, Reidy, Roberto brothers) developed distinctive interpretations. The element spread globally, appearing in buildings from Kuwait to Singapore, and influenced later high-tech and sustainable architecture.',
    UNDERGRADUATE: 'The brise-soleil concept evolved from vernacular precedents (mashrabiya screens, shutters) through Le Corbusier\'s systematic approach. Key projects include: Ministry of Education and Health, Rio (1936-43, first built example), Unité d\'Habitation, Marseille (1947-52, deep balconies as brise-soleil), Chandigarh buildings (1950s, diverse concrete and ceramic systems). Parallel developments occurred in Brazilian Modernism (Niemeyer\'s Alvorada Palace, 1958; Reidy\'s Pedregulho, 1947-58) and Middle Eastern practice (Kuwait National Assembly, 1972-82). Contemporary applications include: Jean Nouvel\'s Institut du Monde Arabe (1987, mechanical shutters), Foster\'s Masdar Institute (2010), and numerous sustainable office buildings.',
    GRADUATE: 'The historiography of brise-soleil encompasses technological development (solar analysis tools, material systems), theoretical evolution (from functional necessity to design element), and cultural diffusion (European concept adapted globally). Critical analysis must address: Le Corbusier\'s shift from universal International Style to climate-specific solutions, regional interpretations that incorporated local traditions (Brazilian azulejos, Indian jaalis), and performance assessments of various systems. The element\'s aesthetic dimensions-creating rhythmic facades, modulating light-often overshadowed energy performance. Contemporary scholarship examines: comparative thermal effectiveness, cultural appropriation questions, preservation of aging systems, and integration with smart building technologies.',
    PHD: 'Academic research on brise-soleil spans multiple disciplines: architectural history (concept genealogy), building science (thermal performance), digital humanities (parametric modeling), and cultural studies (technology transfer, postcolonial architecture). Key research areas: quantifying energy savings across climate zones, analyzing geometric optimization strategies, examining cultural meanings in different contexts, studying material degradation and maintenance, and exploring contemporary innovations (kinetic systems, bio-inspired designs). Critical questions: Did brise-soleil succeed as climate adaptation or merely as aesthetic device? How did this European innovation interact with indigenous shading traditions? What lessons apply to contemporary sustainable design? The element remains relevant as architecture confronts climate change, with renewed interest in passive strategies and cultural specificity.',
  },

  characteristics: [
    'Fixed or movable exterior shading elements',
    'Horizontal fins, vertical blades, or grille patterns',
    'Calculated based on sun angles and latitude',
    'Reduces solar heat gain and glare',
    'Maintains views and natural ventilation',
    'Creates rhythmic shadow patterns on facades',
  ],

  famousExamples: [
    { name: 'Ministry of Education and Health', location: 'Rio de Janeiro, Brazil', year: '1936-1943', description: 'Le Corbusier with Niemeyer and Costa-first major brise-soleil application' },
    { name: 'Secretariat Building', location: 'Chandigarh, India', year: '1952-1958', description: 'Le Corbusier\'s massive concrete brise-soleil system' },
    { name: 'Alvorada Palace', location: 'Brasília, Brazil', year: '1958', description: 'Oscar Niemeyer\'s sculptural curved brise-soleil columns' },
    { name: 'Kuwait National Assembly', location: 'Kuwait City, Kuwait', year: '1972-1982', description: 'Jørn Utzon\'s monumental concrete sunshades' },
    { name: 'Institut du Monde Arabe', location: 'Paris, France', year: '1987', description: 'Jean Nouvel\'s mechanical iris-like shutters inspired by Islamic screens' },
  ],

  confusionPairs: [
    {
      elementId: 'louver',
      reason: 'Both involve slanted blades for shading',
      distinction: 'Brise-soleil is a specific architectural sun-shading system on building exteriors; louvers are a general category including ventilation slats',
    },
  ],

  searchTags: ['brise-soleil', 'sunshade', 'corbusier', 'modern', 'tropical', 'climate', 'shading', 'louver', 'solar control', 'passive design'],

  arMetadata: {
    modelPath: '/models/architecture/brise-soleil.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Horizontal Fins', position: { x: 0, y: 0.6, z: 0.2 } },
      { label: 'Shadow Pattern', position: { x: 0, y: 0.5, z: 0 } },
      { label: 'Window Behind', position: { x: 0, y: 0.5, z: -0.1 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
