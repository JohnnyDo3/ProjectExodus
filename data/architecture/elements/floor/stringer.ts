import type { ArchitecturalElement } from '../../types';

export const STRINGER: ArchitecturalElement = {
  id: 'stringer',
  slug: 'stringer',
  name: 'Stringer',
  alternativeNames: ['Stair Stringer', 'Carriage', 'String Board', 'Staircase Carriage'],
  pronunciation: {
    phonetic: 'STRING-er',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'Supporting string or beam',
    rootWord: 'From "string" (linear support member)',
  },
  category: 'FLOOR',
  subcategory: 'stairs',
  periods: ['MEDIEVAL', 'RENAISSANCE', 'COLONIAL', 'MODERN', 'CONTEMPORARY'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/stringer-primary.jpg',
    gallery: [
      '/images/architecture/elements/stringer-cutout.jpg',
      '/images/architecture/elements/stringer-exposed.jpg',
    ],
    diagram: '/images/architecture/diagrams/stringer-types.svg',
  },

  description: {
    ELEMENTARY: 'A stringer is the strong slanted board on the side of a staircase that holds up all the steps. It\'s like the backbone of the stairs! Some stringers are hidden inside the wall, and some are left showing so you can see the zigzag pattern of the steps.',
    MIDDLE_SCHOOL: 'Stringers are the structural supports running along the sides or underneath a staircase that carry the weight of the treads and risers. There are two main types: cut stringers (sawtooth-shaped to support treads) and closed stringers (solid boards where treads are housed in grooves). Stringers transfer stair loads to the floor structure.',
    HIGH_SCHOOL: 'A stringer is the primary structural member of a staircase, typically an inclined beam supporting the treads and risers. Cut or open stringers have a sawtooth profile where treads rest directly on the cutouts. Closed or housed stringers are solid, with treads fitted into routed grooves. Center stringers may be used in wider stairs. Stringers must be calculated for combined live and dead loads, considering span, material strength, and deflection limits.',
    UNDERGRADUATE: 'Stringer design involves structural engineering, material properties, and building code compliance. Analysis includes determining optimal spacing (typically 36-48 inches), sizing for loads (40-60 PSF residential), and detailing connections at top and bottom. Cut stringer geometry requires precise layout: rise and run calculations, effective depth at narrowest point, and headroom clearance. Material options-dimensional lumber, steel channels, reinforced concrete-each present distinct fabrication and connection requirements. Open stringers create visual lightness; closed stringers provide lateral stiffness.',
    GRADUATE: 'Advanced stringer analysis addresses structural optimization, historic construction techniques, and contemporary innovations. Wood stringers require consideration of grain orientation, notch depth effects on strength, and long-term deflection (creep). Steel stringers enable longer spans and thinner profiles but require fire protection in many occupancies. Historic documentation reveals regional variations-New England string-and-plank construction, Pennsylvania German vaulted stringers. Contemporary practice includes cantilevered stairs with minimal or concealed stringers, requiring sophisticated load transfer detailing.',
    PHD: 'Stringer research encompasses structural mechanics, construction history, and innovative systems. Engineering analysis includes finite element modeling of complex geometries, vibration analysis for serviceability, and connection behavior under cyclic loading. Historical research examines the transition from log-and-plank stairs to framed stringers, guild knowledge transmission, and pattern book influence. Contemporary investigation addresses material innovation (glulam, carbon fiber reinforcement), prefabrication techniques, and regulatory evolution regarding stringerless or mono-stringer designs.',
  },

  history: {
    ELEMENTARY: 'For thousands of years, people made stairs by notching logs or stacking stones. When carpenters learned to saw wood into boards, they invented stringers to make stairs lighter and stronger. Today\'s stairs still use stringers, but they might be made of steel or concrete instead of wood.',
    MIDDLE_SCHOOL: 'Early stairs were simple notched logs or stacked stone. Medieval European carpentry developed framed stairs with rough-hewn stringers. The 16th-17th centuries saw refinement of housed stringer techniques, allowing more elegant designs. Industrial Revolution steel production enabled metal stringers for grand public stairs. 20th-century engineering allowed dramatic cantilevered designs with hidden or minimal stringers.',
    HIGH_SCHOOL: 'Stringer development parallels woodworking technology and architectural ambition. Medieval construction used massive hewn timbers with simple notching. Renaissance joinery introduced housed stringers with precisely fitted treads. Colonial American pattern books (Asher Benjamin, Peter Nicholson) standardized stringer layouts and proportions. The 19th century brought industrial production-milled lumber dimensions, cast iron stringers, later steel channels. Modern engineering enabled reduced profiles and innovative geometries.',
    UNDERGRADUATE: 'The history of stringers reflects advancing material technology and structural understanding. Pre-industrial construction relied on empirical rules and craft knowledge transmitted through apprenticeship. Pattern books rationalized stringer design, providing pitch boards and geometric layout methods. The shift to dimensional lumber standardized construction but initially without engineered design. Mid-20th century building codes formalized stringer requirements: depth-to-span ratios, maximum notch depths, bearing details. Contemporary practice includes proprietary systems and performance-based design allowing optimized solutions.',
    GRADUATE: 'Stringer historiography engages construction technology, craft knowledge transmission, and regulatory development. Documentary research examines carpentry manuals, patent records, and building regulations. Archaeological investigation of historical buildings reveals regional variations in construction methods. The transition from craft-based to engineered design involved changing labor organization and professional boundaries. Conservation challenges include assessing structural adequacy of historic stringers, reinforcing deteriorated members, and replicating traditional profiles with contemporary materials.',
    PHD: 'Scholarly investigation of stringers addresses multiple dimensions: structural mechanics (load paths, failure modes), construction history (technological development, regional variations), and material culture (craft knowledge, pattern book circulation). Current research includes digital documentation of historic stair construction, structural assessment methodologies for heritage buildings, and the sociology of building trades. Engineering research examines innovative systems-glass stringers, hybrid timber-steel, adaptive geometries-while addressing code development and performance validation.',
  },

  characteristics: [
    'Inclined structural member supporting stairs',
    'Cut type: sawtooth profile supporting treads',
    'Closed type: solid with routed grooves',
    'Typically one on each side, sometimes center',
    'Must be sized for combined loads and deflection',
    'Connection details critical at top and bottom',
    'May be exposed (decorative) or concealed',
  ],

  famousExamples: [
    { name: 'Rookery Building Light Court', location: 'Chicago, USA', year: '1888', description: 'Ornamental iron stair stringers by Burnham and Root' },
    { name: 'Paris Opera Garnier Grand Staircase', location: 'Paris, France', year: '1875', description: 'Elaborate marble stairs with decorative stringers' },
    { name: 'Bramante Staircase', location: 'Vatican Museums, Rome', year: '1505', description: 'Masonry stringers supporting spiral stone stairs' },
    { name: 'Frank Lloyd Wright Home Studio', location: 'Oak Park, USA', year: '1889-1898', description: 'Innovative open stringer design with geometric details' },
    { name: 'Apple Store Milan', location: 'Milan, Italy', year: '2021', description: 'Modern glass stairs with minimal steel stringers' },
  ],

  confusionPairs: [
    {
      elementId: 'baluster',
      reason: 'Both are stair components',
      distinction: 'Stringers are structural supports holding up stairs; balusters are vertical posts in railings',
    },
    {
      elementId: 'tread',
      reason: 'Both are essential stair parts',
      distinction: 'Stringers support the stairs from sides/below; treads are the horizontal walking surfaces',
    },
    {
      elementId: 'beam',
      reason: 'Both are structural members',
      distinction: 'Stringers specifically support stairs at an incline; beams are general horizontal spanning members',
    },
  ],

  searchTags: ['stairs', 'structure', 'support', 'carriage', 'carpentry', 'framing', 'staircase', 'beam'],

  arMetadata: {
    modelPath: '/models/architecture/stringer.glb',
    scale: 0.8,
    rotatable: true,
    annotations: [
      { label: 'Sawtooth Cut Profile', position: { x: 0.5, y: 0.5, z: 0.1 } },
      { label: 'Tread Support', position: { x: 0.3, y: 0.8, z: 0 } },
      { label: 'Bottom Landing Connection', position: { x: 0.1, y: 0.1, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
