import type { ArchitecturalElement } from '../../types';

export const GARDEN_WALL: ArchitecturalElement = {
  id: 'garden-wall',
  slug: 'garden-wall',
  name: 'Garden Wall',
  alternativeNames: ['Enclosure Wall', 'Walled Garden', 'Garden Boundary', 'Estate Wall'],
  pronunciation: {
    phonetic: 'GAR-den WAWL',
    language: 'English',
  },
  etymology: {
    origin: 'Old English/Old French',
    meaning: 'Enclosed cultivated ground',
    rootWord: 'Garden from Old French "gardin"; Wall from Latin "vallum" (rampart)',
  },
  category: 'GARDEN',
  subcategory: 'boundary_structures',
  periods: ['MEDIEVAL', 'RENAISSANCE', 'BAROQUE', 'GEORGIAN', 'VICTORIAN', 'ARTS_AND_CRAFTS'],
  regions: ['WESTERN_EUROPE', 'BRITAIN', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/garden-wall-primary.jpg',
    gallery: [
      '/images/architecture/elements/garden-wall-brick.jpg',
      '/images/architecture/elements/garden-wall-espalier.jpg',
    ],
    diagram: '/images/architecture/diagrams/garden-wall-construction.svg',
  },

  description: {
    ELEMENTARY: 'A garden wall is a tall wall that goes around a garden to protect it. Walls keep out cold wind and hungry animals! They also create warm spots where fruit trees can grow better. Some garden walls are made of red brick, and some are made of stone.',
    MIDDLE_SCHOOL: 'Garden walls are boundary structures that enclose gardens for protection, privacy, and microclimate creation. Built from brick, stone, or other masonry, they range from simple barriers to highly decorative structures. Garden walls create sheltered environments, allowing cultivation of tender plants. They also serve aesthetic purposes-organizing space, providing backdrops for plantings, and supporting trained fruit trees (espalier).',
    HIGH_SCHOOL: 'The garden wall serves multiple functions: defining boundaries, providing security, creating microclimates, and offering support for plants. Construction typically employs brick or stone masonry with coping to shed water. Height, thickness, and orientation affect environmental performance-south-facing walls in the Northern Hemisphere absorb and radiate heat, extending growing seasons. Decorative treatments include different bonding patterns, niches, and gates.',
    UNDERGRADUATE: 'Garden wall design integrates structural engineering, horticulture, and landscape architecture. Technical considerations include foundation design, drainage, material thermal mass, and wall thickness for stability. Environmental functions include wind protection (reducing evapotranspiration), heat retention (thermal mass absorbs daytime heat and releases it at night), and support for trained plants. Historical walled gardens demonstrate sophisticated understanding of microclimate manipulation for fruit production.',
    GRADUATE: 'Garden wall analysis encompasses structural engineering, garden history, and environmental science. Research examines historical construction techniques (lime mortar, brick bonds), the development of walled garden design for food production, and the thermal performance of different wall materials and orientations. Contemporary practice addresses conservation of historic garden walls, sustainable materials, and the integration of walls with modern garden functions including rainwater management and wildlife habitat.',
    PHD: 'Research into garden walls addresses agricultural history, construction technology, and cultural landscape preservation. Investigations include the role of walled gardens in estate food production, the transfer of wall construction knowledge through pattern books, and the environmental performance of wall materials. Methodologies include archaeological investigation of historic walls, thermal imaging of microclimate effects, and comparative analysis of regional wall traditions. Current scholarship examines sustainable garden wall construction, the conservation of historic kitchen gardens, and the revival of productive walled gardens.',
  },

  history: {
    ELEMENTARY: 'In medieval times, monastery gardens had walls to protect vegetables and herbs. Rich people in England and France built beautiful walled gardens to grow peaches and grapes-the walls made the gardens warm! Victorian walled gardens could grow pineapples in England because the brick walls held heat from the sun.',
    MIDDLE_SCHOOL: 'Medieval monastery gardens used walls for protection and cultivation. Renaissance estates developed elaborate walled gardens (giardino segreto). British walled gardens reached peak sophistication in the 18th-19th centuries-brick walls with southern exposure allowed fruit cultivation beyond normal ranges. Victorian kitchen gardens employed walls for espaliered fruit trees. The Arts and Crafts movement celebrated traditional garden wall craftsmanship.',
    HIGH_SCHOOL: 'Medieval enclosed gardens (hortus conclusus) served practical and symbolic functions. Renaissance Italian gardens used walls to create garden rooms. British tradition developed specialized fruit walls-heated walls, walls with glass covers (hot walls), and serpentine crinkle-crankle walls that provided self-buttressing and multiple aspects. Victorian era represented the apex of productive walled garden design. Decline followed World War I labor shortages.',
    UNDERGRADUATE: 'Garden wall history reveals changing relationships between horticulture, economics, and social status. Medieval walls protected monastic herbaria and orchards. Renaissance walls created sequential garden spaces. British kitchen gardens developed walls as specialized horticultural infrastructure supporting luxury fruit production. Technological innovations included hot walls with internal flues, angled walls to maximize sun exposure, and serpentine walls reducing construction costs. The decline of estate gardens led to wall abandonment and deterioration.',
    GRADUATE: 'Historical analysis of garden walls examines agricultural technology, construction practice, and estate economy. Research addresses the technical development of fruit walls, the labor requirements of walled garden maintenance, and the social geography of walled versus open gardens. Regional variations include Scottish heated walls, Dutch market garden walls, and French potager walls. Conservation challenges include stabilizing historic walls, managing vegetation effects on masonry, and finding sustainable uses for abandoned walled gardens.',
    PHD: 'Garden wall scholarship engages multiple disciplines: agricultural history (productive garden systems), architectural history (construction techniques and regional variations), and conservation science (materials analysis and decay mechanisms). Methodologies include archaeological investigation of wall structures, archival research in estate records documenting wall construction and maintenance, and dendrochronological analysis of espaliered trees. Current research examines the revival of walled kitchen gardens for local food production, sustainable conservation approaches for historic walls, and the cultural landscape significance of walled garden ensembles.',
  },

  characteristics: [
    'Brick, stone, or masonry construction',
    'Defines and encloses garden space',
    'Creates sheltered microclimate',
    'Provides support for trained plants',
    'Typically 6-12 feet in height',
    'Coping protects wall top from water',
    'Gates provide access points',
  ],

  famousExamples: [
    { name: 'Walled Garden at Heligan', location: 'Cornwall, UK', year: '1780s-1890s', description: 'Restored Victorian productive walled garden complex' },
    { name: 'Crinkle-Crankle Wall', location: 'University of Virginia, USA', year: '1825-1826', description: 'Thomas Jefferson\'s serpentine garden wall' },
    { name: 'Walled Garden at Kylemore Abbey', location: 'Connemara, Ireland', year: '1867', description: 'Victorian Gothic revival walled garden' },
    { name: 'Fruit Walls at Monticello', location: 'Virginia, USA', year: '1806-1809', description: 'Jefferson\'s experimental fruit garden walls' },
    { name: 'Walled Garden at Sissinghurst', location: 'Kent, UK', year: '1930s', description: 'Vita Sackville-West\'s Arts and Crafts garden within Tudor walls' },
  ],

  confusionPairs: [
    {
      elementId: 'ha-ha',
      reason: 'Both are garden boundary structures',
      distinction: 'Garden walls are vertical above-ground barriers; ha-has are sunken ditches with retaining walls creating invisible boundaries',
    },
    {
      elementId: 'hedge',
      reason: 'Both define garden boundaries',
      distinction: 'Garden walls are permanent masonry structures; hedges are living plant barriers',
    },
  ],

  searchTags: ['wall', 'brick', 'stone', 'boundary', 'enclosure', 'walled', 'microclimate', 'espalier', 'kitchen garden'],

  arMetadata: {
    modelPath: '/models/architecture/garden-wall.glb',
    scale: 0.5,
    rotatable: true,
    annotations: [
      { label: 'Brick Coursing', position: { x: 0, y: 1, z: 0 } },
      { label: 'Coping Stone', position: { x: 0, y: 2, z: 0 } },
      { label: 'Foundation', position: { x: 0, y: -0.5, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
