import type { ArchitecturalElement } from '../../types';

export const HA_HA: ArchitecturalElement = {
  id: 'ha-ha',
  slug: 'ha-ha',
  name: 'Ha-Ha',
  alternativeNames: ['Sunk Fence', 'Sunken Fence', 'Haw-Haw', 'Ah-Ah'],
  pronunciation: {
    phonetic: 'HAH-hah',
    language: 'English',
  },
  etymology: {
    origin: 'French/English',
    meaning: 'Exclamation of surprise',
    rootWord: 'From French "ah-ah!" - the surprise of discovering the hidden ditch',
  },
  category: 'GARDEN',
  subcategory: 'boundaries',
  periods: ['BAROQUE', 'GEORGIAN', 'PICTURESQUE', 'VICTORIAN', 'CONTEMPORARY'],
  regions: ['FRANCE', 'ENGLAND', 'NORTH_AMERICA', 'WESTERN_EUROPE'],

  images: {
    primary: '/images/architecture/elements/ha-ha-primary.jpg',
    gallery: [
      '/images/architecture/elements/ha-ha-landscape.jpg',
      '/images/architecture/elements/ha-ha-section.jpg',
    ],
    diagram: '/images/architecture/diagrams/ha-ha-section.svg',
  },

  description: {
    ELEMENTARY: 'A ha-ha is a super clever garden trick! It\'s a hidden ditch with a wall on one side that keeps animals out but doesn\'t block your view. From the house, it looks like the garden goes on forever into the countryside with no fence! It got its funny name because people would say "Ha ha!" when they discovered the surprise ditch.',
    MIDDLE_SCHOOL: 'A ha-ha is a recessed landscape boundary-a ditch with a retaining wall on one side. From the house, the wall is invisible below eye level, creating an uninterrupted view of lawn extending into parkland. The vertical wall prevents livestock from crossing while eliminating visual barriers. The name supposedly comes from the exclamation of surprise upon discovering the hidden barrier. Ha-has enabled the English landscape garden style.',
    HIGH_SCHOOL: 'The ha-ha is an engineering solution to the landscape design problem of boundary without visual interruption. Construction involves excavating a ditch and building a retaining wall on the garden side, positioned to remain invisible from primary viewpoints. Depth typically 6-8 feet, sufficient to deter livestock. The far slope is graded for mowing access. This device enabled the integration of garden and pastoral landscape, eliminating the visual barrier of walls or hedges while maintaining practical separation.',
    UNDERGRADUATE: 'Ha-ha design integrates landscape theory, civil engineering, and visual perception. Technical considerations include retaining wall construction (masonry or brick), drainage systems, and slope stability. Sight line analysis determines wall height and placement relative to viewpoints. The ha-ha embodies Enlightenment aesthetic theory-the integration of garden and natural landscape, the triumph of artifice creating an appearance of unmediated nature. Contemporary applications include museums and institutional grounds.',
    GRADUATE: 'Ha-ha analysis encompasses landscape history, engineering, and aesthetic philosophy. Research examines construction methods, drainage systems, and deterioration patterns. Historical investigation addresses the ha-ha\'s role in English landscape theory-eliminating Baroque formality\'s visual boundaries while maintaining practical control. Conservation challenges include structural assessment of aging retaining walls, appropriate repair of historic masonry, and safety considerations for now-unexpected drops in public landscapes.',
    PHD: 'Research into ha-has engages landscape history, engineering history, and visual culture. Scholarly investigation examines French military ditch precedents, the device\'s theorization by landscape writers (Walpole, Repton), and its dissemination through pattern books. Current research addresses regional variations in construction, the relationship between ha-has and enclosure movement economics, and engineering analysis of structural failures. Conservation science develops non-invasive assessment methods for buried structures.',
  },

  history: {
    ELEMENTARY: 'Ha-has were invented in France over 300 years ago for fancy gardens. English gardeners loved them because they could keep sheep in the fields but make it look like their fancy lawn went all the way to the horizon! Capability Brown, a famous garden designer, used ha-has in almost all his parks. The king\'s deer park at Versailles had an early ha-ha.',
    MIDDLE_SCHOOL: 'Ha-has originated in 17th-century French fortification design as fosses or dry ditches. English landscape gardeners adopted them in the early 1700s. Charles Bridgeman used ha-has extensively, and Capability Brown made them standard features. Horace Walpole credited the ha-ha with liberating English gardens from Dutch formality. By the Georgian era, estates throughout Britain incorporated ha-has. The device spread to colonial America and remains in use today.',
    HIGH_SCHOOL: 'Military engineering precedents (French fosses, Italian defensive ditches) influenced garden ha-ha development. John James\'s 1712 translation of d\'Argenville\'s treatise introduced the term to England. Landscape designers-Bridgeman, Kent, Brown-employed ha-has to achieve picturesque integration of garden and park. The device enabled the characteristic 18th-century English park landscape. Victorian estates continued the tradition. Contemporary heritage sites maintain historic ha-has while addressing safety concerns.',
    UNDERGRADUATE: 'Ha-ha history reflects changing concepts of property, landscape aesthetics, and human relationship to nature. French military engineering provided technical precedent, but English landscape theory supplied philosophical justification-Addison\'s writings on natural beauty, Walpole\'s celebration of liberated landscape. The ha-ha\'s peak coincided with agricultural enclosure, enabling visual appropriation of surrounding farmland while maintaining legal boundaries. The device materially instantiated Enlightenment desire for prospect and visual possession.',
    GRADUATE: 'Historical analysis of ha-has examines landscape theory, agricultural history, and engineering practice. Research addresses construction specifications in historical texts, archaeological investigation of historic examples, and the relationship between ha-ha placement and landscape composition. Estate records reveal construction costs and methods. Conservation challenges include structural stabilization without compromising historical integrity and managing visitor safety at heritage sites with hidden drops.',
    PHD: 'Ha-ha scholarship engages landscape history, agricultural economics, and visual culture. Methodologies include archival research (estate accounts, landscape plans), archaeological excavation (construction methods, drainage systems), and theoretical analysis (visual appropriation, property boundaries). Current research examines the ha-ha\'s role in English class relations (visual inclusion, physical exclusion), comparative analysis with Continental boundary solutions, and engineering analysis of structural longevity and failure modes.',
  },

  characteristics: [
    'Sunken ditch with retaining wall',
    'Invisible from primary viewpoint',
    'Prevents livestock crossing',
    'Eliminates visual boundary barriers',
    'Typically 6-8 feet deep',
    'Masonry or brick retaining wall',
    'Graded far slope for maintenance',
  ],

  famousExamples: [
    { name: 'Blenheim Palace', location: 'Oxfordshire, UK', year: '1764', description: 'Capability Brown\'s extensive ha-ha system' },
    { name: 'Stowe Landscape Gardens', location: 'Buckinghamshire, UK', year: '1730s', description: 'Charles Bridgeman\'s pioneering ha-ha design' },
    { name: 'Chatsworth House', location: 'Derbyshire, UK', year: '1760s', description: 'Capability Brown ha-ha integrating garden and park' },
    { name: 'Monticello', location: 'Virginia, USA', year: '1806', description: 'Thomas Jefferson\'s American interpretation' },
    { name: 'Yorkshire Sculpture Park', location: 'West Bretton, UK', year: 'Historic/Maintained', description: 'Preserved 18th-century estate ha-ha system' },
  ],

  confusionPairs: [
    {
      elementId: 'terrace',
      reason: 'Both involve level changes in landscape',
      distinction: 'Ha-has are invisible boundary ditches; terraces are visible level platforms for display or walking',
    },
    {
      elementId: 'moat',
      reason: 'Both are boundary ditches',
      distinction: 'Ha-has are dry ditches for visual effect; moats are water-filled defensive features',
    },
    {
      elementId: 'retaining-wall',
      reason: 'Both incorporate retaining walls',
      distinction: 'Ha-ha walls are deliberately hidden below sight lines; retaining walls are typically visible structural elements',
    },
  ],

  searchTags: ['landscape', 'boundary', 'ditch', 'invisible', 'English garden', 'Capability Brown', 'retaining wall', 'pastoral'],

  arMetadata: {
    modelPath: '/models/architecture/ha-ha.glb',
    scale: 0.5,
    rotatable: true,
    annotations: [
      { label: 'Retaining Wall', position: { x: 0, y: 0.8, z: 0 } },
      { label: 'Ditch/Fosse', position: { x: 0, y: -0.5, z: 0.5 } },
      { label: 'Far Slope', position: { x: 0, y: -0.3, z: 1.5 } },
      { label: 'Lawn Level', position: { x: 0, y: 0, z: -0.5 } },
    ],
  },

  difficultyScore: 4,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
