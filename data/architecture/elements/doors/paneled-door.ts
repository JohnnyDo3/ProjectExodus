import type { ArchitecturalElement } from '../../types';

export const PANELED_DOOR: ArchitecturalElement = {
  id: 'paneled-door',
  slug: 'paneled-door',
  name: 'Paneled Door',
  alternativeNames: ['Panel Door', 'Raised Panel Door', 'Recessed Panel Door', 'Multi-Panel Door'],
  pronunciation: {
    phonetic: 'PAN-uld door',
    language: 'English',
  },
  etymology: {
    origin: 'Middle English',
    meaning: 'Door divided into distinct sections or panels',
    rootWord: 'panel (from Old French panel, piece of cloth)',
  },
  category: 'DOOR',
  subcategory: 'door_types',
  periods: ['medieval', 'renaissance', 'baroque', 'neoclassical', 'colonial-american', 'modern'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/paneled-door-primary.jpg',
    gallery: [
      '/images/architecture/elements/paneled-door-six-panel.jpg',
      '/images/architecture/elements/paneled-door-raised.jpg',
      '/images/architecture/elements/paneled-door-recessed.jpg',
    ],
    diagram: '/images/architecture/diagrams/paneled-door-detail.svg',
  },

  description: {
    ELEMENTARY: 'A paneled door has rectangular sections called panels that fit into a wooden frame. The panels can stick out (raised) or go in (recessed). Most houses have paneled doors because they\'re strong and look nice!',
    MIDDLE_SCHOOL: 'The paneled door consists of rectangular panels set within a framework of vertical stiles and horizontal rails. Panels may be flat, raised, or recessed. This construction method prevents warping by allowing the wood panels to expand and contract within the frame. Common configurations include four-panel, six-panel, and eight-panel designs.',
    HIGH_SCHOOL: 'The paneled door represents a sophisticated joinery solution that addresses wood\'s tendency to warp and split with changes in moisture. The frame-and-panel construction features vertical stiles and horizontal rails joined with mortise-and-tenon joints, creating openings for floating panels. Raised panels are beveled at edges to create depth, while recessed panels sit below the frame surface. The six-panel configuration became standard in Georgian and Colonial architecture, with panel proportions following classical design principles.',
    UNDERGRADUATE: 'Panel door construction demonstrates understanding of wood movement and structural joinery. The frame uses quarter-sawn stock for dimensional stability, with mortise-and-tenon or dowel joints at corners. Panels float within grooves cut into frame members, allowing seasonal expansion and contraction without splitting. Raised panels are created through beveling or fielding, producing shadow lines that enhance visual interest. Panel configuration evolved with architectural styles-medieval doors featured fewer, larger panels while Georgian architecture standardized the six-panel arrangement with proportions derived from golden ratio principles.',
    GRADUATE: 'The paneled door\'s evolution reflects changing woodworking technology, design aesthetics, and social status indicators. Medieval plank doors gave way to frame-and-panel construction as sawmill technology improved and joinery skills advanced. Renaissance pattern books codified panel proportions and molding profiles. Georgian and Federal periods established the six-panel door as the vernacular standard, with panel size and molding complexity indicating room hierarchy-larger panels and more elaborate moldings marked formal spaces. Industrialization enabled machine-made components, democratizing previously expensive joinery while Victorian taste favored more complex panel configurations.',
    PHD: 'Scholarly analysis of paneled doors addresses technological history, social semiotics, and conservation science. Research examines medieval frame-and-panel development as response to wood scarcity and dimensional instability, investigates how panel configuration and molding complexity encoded social status and room function in Georgian architecture, and applies dendrochronology to date historic doors. Conservation studies address appropriate repair techniques for failed joints, panel replacement matching historic stock, and finish analysis revealing original paint schemes. Contemporary research develops sustainable alternatives to old-growth timber while maintaining traditional proportions and joinery methods.',
  },

  history: {
    ELEMENTARY: 'Paneled doors started being used about 800 years ago in castles and churches. Before that, doors were just made of wooden boards nailed together. Paneled doors were fancier and stronger!',
    MIDDLE_SCHOOL: 'Paneled doors emerged in medieval Europe as woodworking skills advanced. Early examples featured two or three large panels. By the Renaissance, panel configurations became more elaborate and standardized. Georgian architecture (1714-1830) popularized the six-panel door, which became standard in British and American homes. Victorian era introduced more varied panel designs.',
    HIGH_SCHOOL: 'The frame-and-panel door originated in medieval Europe around the 13th century as an improvement over plank-and-batten doors. Renaissance architecture saw panel configurations standardize, with Italian and French pattern books codifying proportions. The six-panel door emerged in early Georgian England (c. 1720s) and spread throughout British colonies. Panel configurations indicated room importance-formal rooms received doors with larger, more elaborate panels. American Colonial and Federal architecture adopted British six-panel standards while developing regional variations.',
    UNDERGRADUATE: 'Paneled door evolution reflects technological advancement and changing aesthetic preferences. Medieval frame-and-panel construction addressed timber scarcity and wood movement, initially featuring minimal panels in gothic-influenced designs. Renaissance treatises by Serlio and Palladio established proportional systems governing panel dimensions. Early Georgian architecture standardized the symmetrical six-panel configuration with top panels smaller than bottom panels, proportions possibly derived from golden ratio or practical considerations of hand placement. Federal period American variations included cross-and-bible panel configurations. Victorian eclecticism introduced asymmetrical panels, applied moldings, and exotic wood veneers.',
    GRADUATE: 'The paneled door\'s history intersects technological innovation, craft tradition, and social meaning. Medieval adoption resulted from improved sawmill technology enabling thinner stock and refined joinery tools. Renaissance codification through pattern books transmitted design standards across Europe and eventually to colonies. Georgian standardization of the six-panel door created a vernacular language encoding social hierarchies through subtle variations-molding profiles, panel bevels, and wood species indicated status. Industrial Revolution machine production made paneled doors accessible beyond elite buildings, while simultaneously enabling Victorian complexity through machine-carved ornament. Arts and Crafts movement later rejected industrial production, returning to hand-crafted panel doors.',
    PHD: 'Scholarly engagement with paneled door history encompasses multiple approaches: technological history examining tools and techniques enabling frame-and-panel joinery, architectural history tracing stylistic evolution and pattern book transmission, social history analyzing doors as status indicators and spatial boundaries, and material culture studies interpreting surface treatments and hardware choices. Recent research employs computer modeling to analyze traditional proportional systems, applies conservation science to inform restoration practice, and examines how paneled doors functioned within larger systems of architectural meaning-panel configuration, molding profiles, and painted finishes operating together to signal room function and owner status.',
  },

  characteristics: [
    'Frame-and-panel construction',
    'Vertical stiles and horizontal rails',
    'Floating panels within frame',
    'Panels may be raised, recessed, or flat',
    'Six-panel configuration most common',
    'Mortise-and-tenon joinery',
    'Allows wood movement without warping',
  ],

  famousExamples: [
    { name: 'Mount Vernon', location: 'Virginia, USA', year: '1757', description: 'George Washington\'s mansion features period six-panel doors throughout' },
    { name: 'Hampton Court Palace', location: 'London, England', year: '1514-1521', description: 'Tudor-era paneled doors with linenfold panels' },
    { name: 'Independence Hall', location: 'Philadelphia, USA', year: '1753', description: 'Georgian six-panel doors with raised panels' },
    { name: 'Château de Fontainebleau', location: 'Fontainebleau, France', year: '16th century', description: 'Elaborate French Renaissance paneled doors' },
    { name: 'Monticello', location: 'Virginia, USA', year: '1772', description: 'Thomas Jefferson\'s Federal-style paneled doors' },
  ],

  confusionPairs: [
    {
      elementId: 'flush-door',
      reason: 'Both are common door types',
      distinction: 'Paneled doors have visible frame and panels; flush doors have smooth, flat surface',
    },
    {
      elementId: 'batten-door',
      reason: 'Both are traditional wooden doors',
      distinction: 'Paneled doors use frame-and-panel joinery; batten doors use vertical boards held by horizontal battens',
    },
  ],

  searchTags: ['door', 'panel', 'raised', 'recessed', 'six-panel', 'Georgian', 'Colonial', 'frame', 'stile', 'rail', 'joinery'],

  arMetadata: {
    modelPath: '/models/architecture/paneled-door.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Top Rail', position: { x: 0, y: 0.9, z: 0 } },
      { label: 'Stile', position: { x: -0.4, y: 0.5, z: 0 } },
      { label: 'Lock Rail', position: { x: 0, y: 0.4, z: 0 } },
      { label: 'Raised Panel', position: { x: 0.2, y: 0.7, z: 0.05 } },
      { label: 'Bottom Rail', position: { x: 0, y: 0.1, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
