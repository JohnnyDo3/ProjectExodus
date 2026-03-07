import type { ArchitecturalElement } from '../../types';

export const RAFTER: ArchitecturalElement = {
  id: 'rafter',
  slug: 'rafter',
  name: 'Rafter',
  alternativeNames: ['Common Rafter', 'Roof Rafter', 'Spar', 'Couple'],
  pronunciation: {
    phonetic: 'RAF-ter',
    language: 'English',
  },
  etymology: {
    origin: 'Old English',
    meaning: 'A sloping timber forming the framework of a roof',
    rootWord: 'From Old English "ræfter" (rafter, beam), related to Old Norse "raptr"',
  },
  category: 'ROOF',
  subcategory: 'framing',
  periods: ['ANCIENT', 'MEDIEVAL', 'RENAISSANCE', 'COLONIAL', 'CONTEMPORARY'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/rafter-primary.jpg',
    gallery: [
      '/images/architecture/elements/rafter-exposed-interior.jpg',
      '/images/architecture/elements/rafter-construction.jpg',
    ],
    diagram: '/images/architecture/diagrams/rafter-types.svg',
  },

  description: {
    ELEMENTARY: 'Rafters are the sloping beams that make up the shape of a roof. They go from the top peak of the roof down to the edges of the walls, like the ribs of an umbrella. When you look at a roof being built, the rafters are the skeleton that gives the roof its shape!',
    MIDDLE_SCHOOL: 'Rafters are sloped structural members that form the primary framework of a pitched roof. They extend from the ridge (peak) to the eaves (edge), supporting the roof sheathing and covering materials. Common rafters run the full slope; hip and valley rafters occur where roof planes intersect. Rafters are typically spaced 16 to 24 inches apart.',
    HIGH_SCHOOL: 'Rafters are inclined framing members that transfer roof loads — dead load (roofing materials), live load (snow, maintenance), and wind — to the building\'s walls or beams. Types include common rafters (full slope), hip rafters (diagonal at hip intersections), valley rafters (diagonal at valleys), jack rafters (shortened, meeting hip/valley), and cripple rafters. Design requires calculation of rafter length, birdsmouth cuts, and tail cuts using roof geometry.',
    UNDERGRADUATE: 'Rafter systems embody the geometric and structural logic of pitched-roof construction. The rafter\'s structural behavior combines bending (perpendicular to slope) and axial forces (thrust at the bearing point). Collar ties or ceiling joists resist outward thrust at the plate line. Traditional roof carpentry — layout by the "framing square" method — encoded structural geometry in craft practice. The decline of stick-framed rafter roofs in favor of manufactured trusses reflects the industrialization of residential construction.',
    GRADUATE: 'Rafter analysis addresses the intersection of structural mechanics, building science, and craft history. Traditional rafter systems with purlins (common in European and Asian traditions) differ fundamentally from common rafter systems (predominant in Anglo-American practice) in load paths and material efficiency. The thermal performance of rafter-insulated roofs (condensation risk in cold climates) presents building science challenges distinct from truss-framed attic spaces. Conservation of historic rafter roofs requires understanding original joint types and load paths.',
    PHD: 'Rafter research engages construction history (dendrochronological dating of historic roof timbers), structural assessment (remaining capacity of deteriorated rafters), and building physics (moisture dynamics in insulated rafter spaces). Comparative studies of rafter traditions across cultures — Japanese taruki, Scandinavian sperrer, Germanic Sparren — reveal independent development of similar structural solutions. Current work addresses the sustainability implications of stick-framed rafter roofs versus manufactured trusses in whole-building life-cycle analysis.',
  },

  history: {
    ELEMENTARY: 'Rafters have been used since people first built houses with sloped roofs thousands of years ago. In ancient times, rafters were made from tree trunks or branches. Medieval builders became experts at cutting and fitting rafters into complex roof shapes. Today, many roofs use pre-made trusses instead of individual rafters, but rafters are still used in custom-built homes.',
    MIDDLE_SCHOOL: 'Rafter construction has been fundamental to roofing since the Bronze Age. Ancient Greek temples used stone and timber rafter systems. Medieval European carpenters developed sophisticated rafter assemblies — coupled rafters, scissor rafters, and crown-post roofs. The 19th century standardized rafter sizes with dimensional lumber. The 20th century saw manufactured roof trusses largely replace hand-cut rafter systems in production housing.',
    HIGH_SCHOOL: 'Rafter technology evolved alongside timber construction traditions. Roman carpentry used sophisticated rafter-and-purlin systems for large spans. Medieval developments included the couple close roof (paired rafters with collar), crown-post roof, and hammerbeam roof — each addressing greater span requirements. Pattern-book dissemination of rafter geometry in the 18th-19th centuries standardized practice. Post-WWII housing demand drove the shift to gang-nail-plate trusses, though custom work still relies on site-cut rafters.',
    UNDERGRADUATE: 'Rafter history illuminates the evolution of structural carpentry. English medieval roof carpentry — the most extensively documented tradition — shows progression from simple coupled rafters through crown-post and hammerbeam systems. Continental European traditions developed alternative solutions: the Pfetten (purlin) system with common rafters supported on horizontal purlins, versus the Sparren (rafter) system relying on rafter pairs alone. This distinction persists in modern practice across regions.',
    GRADUATE: 'Historical rafter analysis provides dating evidence through dendrochronology and typological classification of joints. Regional carpentry traditions — the "rafter roof" versus "purlin roof" distinction in European building — reflect different approaches to spanning, material use, and labor organization. The 20th-century transition from site-cut rafters to factory-made trusses represents a significant shift in construction labor, skill requirements, and building design flexibility.',
    PHD: 'Rafter scholarship intersects dendrochronology (tree-ring dating of roof timbers as historical evidence), vernacular architecture studies (regional rafter traditions as cultural indicators), and structural engineering (assessment methodologies for historic timber roofs). Current research examines the loss of traditional rafter-cutting skills, the comparative sustainability of rafter-built versus truss-built roofs, and the structural performance of historic rafter joints under modern loading requirements.',
  },

  characteristics: [
    'Sloped members running from ridge to eaves',
    'Typically spaced 16-24 inches on center',
    'Birdsmouth cut for bearing on wall plate',
    'Types: common, hip, valley, jack, cripple',
    'Materials: solid lumber, engineered wood, steel',
    'Transfers roof loads to walls and beams',
    'Pairs resist outward thrust with ties or joists',
  ],

  famousExamples: [
    { name: 'Westminster Hall', location: 'London, England', year: '1395', description: 'Hammerbeam roof with massive arched rafter system spanning 68 feet' },
    { name: 'Stave Churches of Norway', location: 'Various, Norway', year: '1100s', description: 'Complex rafter systems creating distinctive multi-tiered rooflines' },
    { name: 'Hōryū-ji Temple', location: 'Nara, Japan', year: '607', description: 'Ancient temple with traditional Japanese rafter (taruki) roof construction' },
    { name: 'Château de Chambord', location: 'Loire Valley, France', year: '1547', description: 'Renaissance château with elaborate decorative rafter work in its iconic roofscape' },
  ],

  confusionPairs: [
    {
      elementId: 'ridgepole',
      reason: 'Both are roof framing members',
      distinction: 'Rafters slope from ridge to eaves; the ridgepole runs horizontally at the peak where rafters meet',
    },
    {
      elementId: 'joist',
      reason: 'Both are repetitive framing members',
      distinction: 'Rafters are sloped members in roofs; joists are horizontal members in floors and ceilings',
    },
  ],

  searchTags: ['roof', 'framing', 'timber', 'slope', 'pitch', 'structural', 'carpentry', 'construction'],

  arMetadata: {
    modelPath: '/models/architecture/rafter.glb',
    scale: 0.3,
    rotatable: true,
    annotations: [
      { label: 'Ridge Connection', position: { x: 0, y: 1, z: 0 } },
      { label: 'Birdsmouth Cut', position: { x: 0.5, y: 0.3, z: 0.3 } },
      { label: 'Rafter Tail', position: { x: 0.7, y: 0.1, z: 0.5 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
