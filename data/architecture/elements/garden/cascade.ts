import type { ArchitecturalElement } from '../../types';

export const CASCADE: ArchitecturalElement = {
  id: 'cascade',
  slug: 'cascade',
  name: 'Cascade',
  alternativeNames: ['Water Cascade', 'Water Staircase', 'Stepped Falls', 'Cascata'],
  pronunciation: {
    phonetic: 'kas-KAYD',
    language: 'English',
  },
  etymology: {
    origin: 'Italian/French',
    meaning: 'To fall',
    rootWord: 'From Italian "cascata" and Latin "cadere" (to fall)',
  },
  category: 'GARDEN',
  subcategory: 'water_features',
  periods: ['RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL', 'ROMANTIC', 'MODERN', 'CONTEMPORARY'],
  regions: ['ITALY', 'FRANCE', 'WESTERN_EUROPE', 'RUSSIA', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/cascade-primary.jpg',
    gallery: [
      '/images/architecture/elements/cascade-villa-este.jpg',
      '/images/architecture/elements/cascade-peterhof.jpg',
    ],
    diagram: '/images/architecture/diagrams/cascade-hydraulics.svg',
  },

  description: {
    ELEMENTARY: 'A cascade is like a staircase for water! Instead of steps for people to walk down, water flows and tumbles down a series of steps or slopes. The water splashes and makes beautiful sounds as it falls from one level to the next. Cascades are often found in fancy gardens and parks.',
    MIDDLE_SCHOOL: 'A cascade is a water feature where water flows down a series of stepped surfaces or sloped channels, creating a dramatic visual and auditory effect. The stepped design creates turbulence, aerating the water and producing cascading sounds. Renaissance Italian gardens pioneered the use of cascades as theatrical landscape elements that demonstrated hydraulic mastery.',
    HIGH_SCHOOL: 'The cascade is an engineered water feature employing gravity to move water down a series of graduated steps, slopes, or terraces. Design variables include step height, tread depth, water volume, and surface treatment. The cascade serves both aesthetic and functional purposes-creating visual drama, generating sound, cooling the air, and oxygenating water. Historical examples demonstrate sophisticated hydraulic engineering.',
    UNDERGRADUATE: 'Cascade design integrates hydraulic engineering, landscape architecture, and experiential design. Technical considerations include water source elevation, flow rate calculation, step geometry for optimal sheeting or splashing effects, and basin sizing for recirculation. Surface materials affect water behavior-smooth surfaces create sheets, rough surfaces create turbulence. The cascade functions as kinetic sculpture, microclimate modifier, and acoustic element.',
    GRADUATE: 'Cascade analysis encompasses fluid dynamics, garden history, and environmental performance. Research examines historical hydraulic systems, including gravity-fed mountain springs and engineered pumping. Flow characteristics depend on Reynolds number, step nosing details, and surface roughness. Contemporary practice addresses water conservation through recirculation systems, energy efficiency in pumping, and integration with stormwater management.',
    PHD: 'Research into cascades addresses hydraulic archaeology, landscape theory, and sustainable water design. Investigations include the reconstruction of Renaissance hydraulic systems, the aesthetic theory of moving water in garden composition, and the quantification of evaporative cooling effects. Current scholarship examines the cultural transmission of cascade design traditions, the adaptation of cascades to water-scarce climates, and the role of cascades in urban heat mitigation.',
  },

  history: {
    ELEMENTARY: 'Italian Renaissance gardens first made cascades famous-water would flow down hillsides in beautiful patterns! Kings and nobles competed to build the most spectacular cascades. The Villa d\'Este near Rome has hundreds of fountains and amazing cascades built over 400 years ago.',
    MIDDLE_SCHOOL: 'Renaissance Italian gardens (1500s-1600s) pioneered dramatic cascades exploiting hillside topography. Villa d\'Este and Villa Lante featured elaborate cascade sequences. French gardens at Versailles and Saint-Cloud adapted the tradition. Russian Peter the Great created the Grand Cascade at Peterhof. English landscape gardens used cascades more naturalistically. Contemporary cascades range from traditional to abstract.',
    HIGH_SCHOOL: 'Renaissance hydraulic engineers exploited natural elevation changes to create spectacular cascades without pumping. Cardinal d\'Este\'s 1550s garden featured the Hundred Fountains cascade. Baroque gardens amplified theatrical effects. French classical tradition formalized cascade geometry (Le Nôtre\'s work). Picturesque tradition naturalized cascades. Modernist examples abstract the water stair concept. Contemporary sustainable design emphasizes water recirculation.',
    UNDERGRADUATE: 'Cascade history reveals evolving hydraulic technology and aesthetic theory. Renaissance garden theory positioned cascades as demonstrations of human control over nature. Baroque practice maximized theatrical impact through scale and sound. Neoclassical theory debated naturalistic versus geometric approaches. Victorian engineering enabled cascades independent of natural elevation. Contemporary practice balances historical references with sustainable water management and accessibility requirements.',
    GRADUATE: 'Historical analysis of cascades examines hydraulic engineering, patronage, and garden theory. Research addresses technical achievements like Villa d\'Este\'s gravity-fed system, the symbolic programs of cascade iconography, and the transmission of cascade design through treatises and direct observation. Conservation challenges include maintaining historic hydraulic systems, managing biological growth, and adapting cascades for contemporary water management standards.',
    PHD: 'Cascade scholarship engages multiple disciplines: hydraulic archaeology (reconstructing ancient water systems), art history (analyzing cascades within garden iconographic programs), and environmental engineering (measuring performance). Methodologies include archival research in hydraulic treatises, computational fluid dynamics modeling of historical systems, and environmental monitoring of cooling effects. Current research examines water-efficient cascade design, the role of cascades in biodiverse habitat creation, and cultural landscape preservation.',
  },

  characteristics: [
    'Water flows down stepped or sloped surfaces',
    'Creates visual and auditory effects',
    'Requires elevation change or pumping',
    'Step geometry controls flow pattern',
    'Aerates and cools water',
    'Often integrated with hillside topography',
    'Recirculating systems common in modern examples',
  ],

  famousExamples: [
    { name: 'Villa d\'Este Cascades', location: 'Tivoli, Italy', year: '1550-1572', description: 'Renaissance masterpiece with elaborate cascade sequences' },
    { name: 'Grand Cascade at Peterhof', location: 'St. Petersburg, Russia', year: '1714-1724', description: 'Baroque cascade with 64 fountains and 255 sculptures' },
    { name: 'Chatsworth House Cascade', location: 'Derbyshire, UK', year: '1696', description: 'English baroque cascade by Grillet' },
    { name: 'Longwood Gardens Cascade', location: 'Pennsylvania, USA', year: '1906-1930', description: 'American estate garden with Italian-inspired cascades' },
    { name: 'Water Cascade at Alnwick Garden', location: 'Northumberland, UK', year: '2001', description: 'Contemporary cascade with 30 weirs in modern design' },
  ],

  confusionPairs: [
    {
      elementId: 'fountain',
      reason: 'Both are water features',
      distinction: 'Cascades flow water down stepped surfaces; fountains jet or spray water upward or outward',
    },
    {
      elementId: 'canal',
      reason: 'Both are formal water features',
      distinction: 'Cascades involve vertical elevation change with flowing water; canals are horizontal linear water channels',
    },
  ],

  searchTags: ['water', 'steps', 'flow', 'waterfall', 'garden', 'baroque', 'renaissance', 'hydraulics', 'staircase'],

  arMetadata: {
    modelPath: '/models/architecture/cascade.glb',
    scale: 0.5,
    rotatable: true,
    annotations: [
      { label: 'Upper Basin', position: { x: 0, y: 2, z: 0 } },
      { label: 'Stepped Falls', position: { x: 0, y: 1, z: 0 } },
      { label: 'Lower Basin', position: { x: 0, y: 0, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
