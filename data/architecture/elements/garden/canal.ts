import type { ArchitecturalElement } from '../../types';

export const CANAL: ArchitecturalElement = {
  id: 'canal',
  slug: 'canal',
  name: 'Canal',
  alternativeNames: ['Garden Canal', 'Formal Water Channel', 'Reflecting Pool', 'Water Parterre'],
  pronunciation: {
    phonetic: 'kuh-NAL',
    language: 'English',
  },
  etymology: {
    origin: 'Latin',
    meaning: 'Pipe or channel',
    rootWord: 'From Latin "canalis" (pipe, channel)',
  },
  category: 'GARDEN',
  subcategory: 'water_features',
  periods: ['ANCIENT_PERSIAN', 'MUGHAL', 'BAROQUE', 'NEOCLASSICAL', 'MODERN', 'CONTEMPORARY'],
  regions: ['MIDDLE_EAST', 'INDIA', 'FRANCE', 'WESTERN_EUROPE', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/canal-primary.jpg',
    gallery: [
      '/images/architecture/elements/canal-versailles.jpg',
      '/images/architecture/elements/canal-taj-mahal.jpg',
    ],
    diagram: '/images/architecture/diagrams/canal-construction.svg',
  },

  description: {
    ELEMENTARY: 'A garden canal is a long, straight pool of water that looks like a mirror reflecting the sky and buildings! Canals are used to make gardens look more beautiful and organized. They can be narrow like a hallway or super wide. Walking beside a canal on a hot day feels cooler and more peaceful.',
    MIDDLE_SCHOOL: 'A garden canal is a formal, linear water feature with straight edges, typically rectangular in plan. Unlike natural streams, canals are engineered structures with defined walls, consistent depth, and still or slowly moving water. They serve aesthetic purposes-reflecting architecture and sky, organizing garden geometry, and creating cooling effects. Famous examples include Versailles and the Taj Mahal.',
    HIGH_SCHOOL: 'The garden canal is a formal water element characterized by geometric precision, linear extension, and reflective surface. Construction involves excavation, waterproofing (clay, concrete, or liner), and edge treatment (stone coping, turf). Canals function as primary compositional axes, organizing garden layouts and creating spatial progression. Water may be still (reflecting pool) or flowing (Persian chahar bagh tradition). Scale ranges from narrow rills to navigable waterways.',
    UNDERGRADUATE: 'Canal design integrates landscape architecture, hydraulic engineering, and environmental performance. Technical considerations include waterproofing systems, water depth for thermal mass and reflection quality, edge details for safety and aesthetics, and maintenance access. Still-water canals maximize reflective qualities; flowing canals require gradients and circulation. The canal serves as spatial organizer, microclimate modifier, and symbolic element-Persian paradise gardens used water channels to represent cosmic order.',
    GRADUATE: 'Canal analysis encompasses garden history, water engineering, and environmental science. Research examines historical waterproofing technologies (puddled clay, pozzolanic concrete), the hydraulics of gravity-fed systems, and cultural variations in canal symbolism. Contemporary challenges include managing algae growth, balancing evaporation with water conservation, and integrating canals with stormwater management. Canal design increasingly addresses habitat creation and biodiversity.',
    PHD: 'Research into garden canals addresses landscape archaeology, cultural geography, and sustainable water design. Investigations include the reconstruction of ancient Persian qanat-fed canal systems, the symbolic meaning of water in Islamic garden tradition, and the environmental performance of canals in urban heat mitigation. Current scholarship examines the adaptation of canal traditions across cultures, the development of sustainable canal maintenance practices, and the role of canals in contemporary public space design.',
  },

  history: {
    ELEMENTARY: 'Ancient Persian gardens had canals that crossed to make four sections-this design spread to India and Spain! The French king Louis XIV built the huge Grand Canal at Versailles for boat rides. At the Taj Mahal in India, a beautiful canal reflects the white marble building perfectly.',
    MIDDLE_SCHOOL: 'Persian paradise gardens (6th century BCE onward) used canals to divide gardens into quadrants (chahar bagh). Islamic tradition spread canal design to Moorish Spain and Mughal India. Renaissance Italian gardens incorporated canals. Baroque French gardens created monumental canals (Versailles Grand Canal, 1667). English landscape tradition generally rejected formal canals. Contemporary design revives canals as sustainable water features.',
    HIGH_SCHOOL: 'Ancient Persian gardens pioneered the chahar bagh system with intersecting canals representing the four rivers of paradise. Islamic garden tradition maintained this symbolism from Spain to India. Mughal gardens (Taj Mahal, Shalimar) perfected canal-based layouts. French classical gardens created canals at unprecedented scale-Versailles Grand Canal extends 1,670 meters. Modernist designers abstracted canal geometry. Contemporary practice integrates canals with ecological water management.',
    UNDERGRADUATE: 'Canal history reveals cultural attitudes toward water, geometry, and paradise. Persian tradition encoded cosmological symbolism in canal layouts. Islamic practice integrated canals with irrigation technology. Renaissance adoption of canal forms acknowledged classical precedents. French absolutist gardens used canal scale to demonstrate hydraulic mastery. English naturalistic tradition critiqued formal canals as artificial. Contemporary revival addresses both historical references and environmental performance.',
    GRADUATE: 'Historical analysis of garden canals examines hydraulic engineering, symbolic systems, and cross-cultural transmission. Research addresses the technology of qanat-fed Persian canals, the theological interpretation of Islamic garden water, and the political symbolism of French monumental canals. Conservation challenges include maintaining historic waterproofing systems, managing water quality in still canals, and adapting canal gardens for contemporary accessibility and safety standards.',
    PHD: 'Canal scholarship engages multiple disciplines: landscape archaeology (excavating ancient canal systems), religious studies (interpreting water symbolism), and environmental engineering (modeling canal performance). Methodologies include comparative analysis of canal traditions across cultures, computational modeling of historical hydraulic systems, and environmental monitoring of contemporary canal functions. Current research examines sustainable canal design for water-scarce regions, the integration of canals with urban stormwater infrastructure, and the role of canals in biodiversity conservation.',
  },

  characteristics: [
    'Linear, geometric form',
    'Straight edges and consistent width',
    'Reflective water surface',
    'Stone, concrete, or liner construction',
    'Organizes garden layout along axis',
    'May be still or flowing water',
    'Often aligned with architecture',
  ],

  famousExamples: [
    { name: 'Grand Canal at Versailles', location: 'Versailles, France', year: '1667-1679', description: 'Massive baroque canal, 1,670 meters long' },
    { name: 'Taj Mahal Garden Canal', location: 'Agra, India', year: '1632-1653', description: 'Mughal chahar bagh canal with reflecting pools' },
    { name: 'Generalife Water Gardens', location: 'Granada, Spain', year: '1302-1309', description: 'Moorish garden with narrow canal (Acequia)' },
    { name: 'Shalimar Gardens Canals', location: 'Lahore, Pakistan', year: '1641-1642', description: 'Mughal garden with tiered canal system' },
    { name: 'National Mall Reflecting Pool', location: 'Washington DC, USA', year: '1922-1923', description: 'Neoclassical reflecting canal, 618 meters long' },
  ],

  confusionPairs: [
    {
      elementId: 'cascade',
      reason: 'Both are formal water features',
      distinction: 'Canals are horizontal linear channels; cascades involve vertical water flow down steps',
    },
    {
      elementId: 'fountain',
      reason: 'Both are water features in gardens',
      distinction: 'Canals are linear channels with still or flowing water; fountains actively jet water into the air',
    },
  ],

  searchTags: ['water', 'linear', 'channel', 'reflecting', 'formal', 'baroque', 'persian', 'mughal', 'geometric'],

  arMetadata: {
    modelPath: '/models/architecture/canal.glb',
    scale: 0.6,
    rotatable: true,
    annotations: [
      { label: 'Water Channel', position: { x: 0, y: 0, z: 0 } },
      { label: 'Stone Coping', position: { x: 0.5, y: 0.3, z: 0 } },
      { label: 'Waterproofing Layer', position: { x: 0, y: -0.2, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
