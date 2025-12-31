import type { ArchitecturalElement } from '../../types';

export const FOUNTAIN: ArchitecturalElement = {
  id: 'fountain',
  slug: 'fountain',
  name: 'Fountain',
  alternativeNames: ['Water Feature', 'Jet d\'Eau', 'Fons'],
  pronunciation: {
    phonetic: 'FOWN-tin',
    language: 'English',
  },
  etymology: {
    origin: 'Latin',
    meaning: 'Spring or source',
    rootWord: 'From Latin "fons, fontis" (spring)',
  },
  category: 'GARDEN',
  subcategory: 'water_features',
  periods: ['ANCIENT_ROMAN', 'RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL', 'MODERN', 'CONTEMPORARY'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'MIDDLE_EAST', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/fountain-primary.jpg',
    gallery: [
      '/images/architecture/elements/fountain-trevi.jpg',
      '/images/architecture/elements/fountain-modern.jpg',
    ],
    diagram: '/images/architecture/diagrams/fountain-mechanics.svg',
  },

  description: {
    ELEMENTARY: 'A fountain is a structure that shoots water up into the air or lets it flow into a pool. Some fountains have statues of people or animals with water coming out of them! The sound of splashing water is relaxing, and fountains make parks and plazas feel special.',
    MIDDLE_SCHOOL: 'Fountains are architectural water features that display water in motion-spraying, cascading, or flowing. They require water sources, pumps (or gravity pressure), and drainage systems. Fountains range from simple jets to elaborate sculptural compositions. They cool the air, create pleasant sounds, and serve as focal points for public spaces.',
    HIGH_SCHOOL: 'The fountain combines engineering, sculpture, and urban design. Water delivery systems include gravity-fed aqueducts, mechanical pumps, and recirculating systems. Architectural elements range from simple basins through elaborate sculptural compositions to contemporary interactive water walls. Historically, fountains marked water access points; today they serve primarily aesthetic and experiential purposes.',
    UNDERGRADUATE: 'Fountain design integrates hydraulic engineering, sculptural composition, and environmental performance. Technical considerations include head pressure, nozzle design, wind compensation, and water treatment. Design considerations address scale, viewing angles, sound quality, and lighting. Contemporary practice explores interactive fountains, fog features, and sustainable water management. The fountain serves as urban cooling device, white noise generator, and public art.',
    GRADUATE: 'Fountain analysis encompasses hydraulic engineering, art history, and urban climatology. Research examines historical water delivery systems, the iconography of fountain programs, and the microclimate effects of water evaporation. Contemporary challenges include water conservation, accessibility requirements, and balancing interactive features with safety. Fountain design increasingly integrates with sustainable stormwater management.',
    PHD: 'Research into fountains addresses hydraulic archaeology, art historical interpretation, and environmental performance. Investigations include the reconstruction of ancient water systems, the analysis of sculptural programs in cultural context, and the quantification of urban cooling effects. Current scholarship examines the sustainability of fountain maintenance, the adaptation of fountain traditions across cultures, and the role of interactive water features in public space activation.',
  },

  history: {
    ELEMENTARY: 'Ancient Romans were fountain masters-they built aqueducts to bring water to city fountains. Rich people had fountains in their houses! In the Renaissance and Baroque periods, kings built spectacular fountains like the Trevi Fountain in Rome. Today, fountains are popular in parks and plazas everywhere.',
    MIDDLE_SCHOOL: 'Roman aqueducts supplied public fountains throughout the empire. Renaissance Italian gardens featured elaborate fountain sequences. Baroque Rome became the "city of fountains" with works by Bernini. Versailles demonstrated French hydraulic engineering. Industrial-era pumps enabled fountains without gravity pressure. Contemporary fountains range from traditional to interactive digital installations.',
    HIGH_SCHOOL: 'Ancient fountains depended on gravity-fed water supplies-springs or aqueducts. Roman fountain engineering achieved remarkable sophistication. Islamic tradition developed fountains for courtyard cooling (Alhambra). Renaissance water theaters displayed hydraulic virtuosity. Baroque monumental fountains served papal urban renewal (Trevi, Navona). Industrial technology democratized fountain construction. Contemporary practice explores sustainability and interactivity.',
    UNDERGRADUATE: 'Fountain history reveals changing relationships between technology, display, and public life. Roman public fountains symbolized imperial beneficence. Medieval fountains served practical water supply. Renaissance courts exploited hydraulic technology for theatrical garden features. Baroque fountains anchored urban renewal programs. Victorian public fountains combined temperance advocacy with civic pride. Contemporary practice navigates water scarcity, energy use, and public engagement.',
    GRADUATE: 'Historical analysis of fountains examines hydraulic engineering, patronage structures, and urban ceremony. Research addresses the technical achievement of ancient water systems, the iconographic programs of fountain sculpture, and the social geography of water access. Conservation challenges include maintaining historic hydraulic systems, protecting sculptural elements, and adapting fountains for contemporary water management.',
    PHD: 'Fountain scholarship engages archaeology, art history, and environmental engineering. Methodologies include hydraulic archaeology (reconstructing ancient systems), iconographic analysis (interpreting sculptural programs), and environmental monitoring (measuring cooling effects). Current research examines the sustainability of fountain maintenance in water-scarce regions, the integration of fountains with stormwater management, and the design of interactive water features for diverse public engagement.',
  },

  characteristics: [
    'Displays water in motion',
    'Requires water source and circulation',
    'May include sculptural elements',
    'Creates cooling and sound effects',
    'Serves as focal point or destination',
    'Lighting enhances night appearance',
    'Needs regular maintenance',
  ],

  famousExamples: [
    { name: 'Trevi Fountain', location: 'Rome, Italy', year: '1762', description: 'Baroque masterpiece by Salvi and others' },
    { name: 'Fountains of Versailles', location: 'Versailles, France', year: '1661-1689', description: 'Extensive garden fountain system for Louis XIV' },
    { name: 'Fountain of the Four Rivers', location: 'Rome, Italy', year: '1651', description: 'Bernini\'s theatrical Baroque fountain' },
    { name: 'Jet d\'Eau', location: 'Geneva, Switzerland', year: '1886', description: '140-meter water jet, city landmark' },
    { name: 'Crown Fountain', location: 'Chicago, USA', year: '2004', description: 'Plensa\'s interactive LED and water installation' },
  ],

  confusionPairs: [
    {
      elementId: 'pool',
      reason: 'Both are water features',
      distinction: 'Fountains actively move water; pools are still-water features',
    },
    {
      elementId: 'cascade',
      reason: 'Both involve moving water',
      distinction: 'Fountains jet or spray water; cascades flow water down stepped surfaces',
    },
  ],

  searchTags: ['water', 'jet', 'spray', 'sculpture', 'public space', 'baroque', 'garden', 'urban', 'cooling'],

  arMetadata: {
    modelPath: '/models/architecture/fountain.glb',
    scale: 0.4,
    rotatable: true,
    annotations: [
      { label: 'Water Jet', position: { x: 0, y: 1.5, z: 0 } },
      { label: 'Basin', position: { x: 0.5, y: 0.2, z: 0.5 } },
      { label: 'Sculptural Element', position: { x: 0, y: 0.8, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
