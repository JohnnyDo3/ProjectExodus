import type { ArchitecturalElement } from '../../../types';

export const DIAGRID_STRUCTURE: ArchitecturalElement = {
  id: 'diagrid-structure',
  slug: 'diagrid-structure',
  name: 'Diagrid Structure',
  alternativeNames: ['Diagonal Grid', 'Diagrid Frame', 'Diamond Grid', 'Triangulated Tube'],
  pronunciation: {
    phonetic: 'DY-uh-grid STRUK-chur',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'Diagonal structural grid',
    rootWord: 'Portmanteau of "diagonal" and "grid"',
  },
  category: 'STRUCTURAL',
  subcategory: 'framing_systems',
  periods: ['HIGH_TECH', 'CONTEMPORARY', 'NEO_FUTURISM'],
  regions: ['GLOBAL', 'NORTH_AMERICA', 'EAST_ASIA', 'WESTERN_EUROPE', 'MIDDLE_EAST'],

  images: {
    primary: '/images/architecture/elements/diagrid-structure-primary.jpg',
    gallery: [
      '/images/architecture/elements/diagrid-structure-detail.jpg',
      '/images/architecture/elements/diagrid-structure-corner.jpg',
      '/images/architecture/elements/diagrid-structure-interior.jpg',
    ],
    diagram: '/images/architecture/diagrams/diagrid-structure-forces.svg',
  },

  description: {
    ELEMENTARY: 'A diagrid is a building skeleton made of diagonal crisscrossing beams that form diamond patterns on the outside. Instead of vertical columns and horizontal beams like most buildings, the diagrid uses triangles, which are super strong! You can see the X-shaped patterns on the outside of the building.',
    MIDDLE_SCHOOL: 'Diagrid structures use a diagonal grid of steel or concrete members arranged in triangular patterns to support tall buildings. The diagonal members carry both vertical loads (weight) and lateral loads (wind, earthquakes) more efficiently than traditional vertical columns. This eliminates the need for internal vertical columns on the building perimeter, creating more flexible interior spaces and distinctive diamond-patterned facades.',
    HIGH_SCHOOL: 'The diagrid system consists of diagonal members typically arranged at 60-75 degree angles, forming triangulated modules that provide structural rigidity through geometry rather than requiring extensive internal bracing. Forces are channeled through axial loading in diagonal members, minimizing bending moments. Advantages include: structural efficiency (20-30% material savings compared to conventional frames), column-free perimeters, and inherent lateral stability. The angle of diagonal members affects structural performance and aesthetic expression.',
    UNDERGRADUATE: 'Diagrid structural analysis involves triangulated frameworks where diagonal members resist both gravity and lateral loads through primarily axial forces. Optimal diagrid angles (typically 65-75 degrees) balance vertical load path efficiency against lateral stiffness. The system acts as an exterior tube, eliminating corner columns and reducing core size requirements. Performance benefits include superior seismic resistance, efficient material use, and reduced foundation loads. Contemporary applications integrate diagrids with curtain walls, creating structurally expressive facades. Computational analysis optimizes member sizing and node design.',
    GRADUATE: 'Diagrid research examines structural optimization across multiple parameters: angle geometry, node connection design, hybrid diagrid-core systems, and integration with building services. Finite element analysis models complex load paths and optimization algorithms determine efficient configurations for specific building geometries and loading conditions. Research addresses prefabrication strategies, connection detailing for moment transfer, and performance under progressive collapse scenarios. Innovation areas include adaptive diagrids with variable geometry, composite steel-concrete diagrids, and integration of diagrid structure with building envelope performance.',
    PHD: 'Scholarly investigation of diagrid structures encompasses structural engineering, construction logistics, and architectural theory. Research methodologies include parametric studies of geometric configurations, comparative lifecycle assessment versus conventional systems, and post-occupancy structural monitoring. Theoretical work examines the diagrid\'s role in contemporary "structure as architecture" discourse, questioning the relationship between structural expression and actual performance. Historical scholarship traces the diagrid from precedents (Shukhov towers, geodesic domes) through early skyscraper applications to contemporary proliferation.',
  },

  history: {
    ELEMENTARY: 'The diagrid pattern was inspired by strong triangular shapes found in nature and older structures like the Eiffel Tower. Sir Norman Foster\'s Hearst Tower in New York (2006) made diagrids famous in modern buildings. Now you can find diagrid buildings in cities around the world because they\'re strong, use less steel, and look really cool!',
    MIDDLE_SCHOOL: 'While triangulated structures have existed for centuries (Eiffel Tower, 1889), the modern diagrid for high-rises was pioneered in the 2000s. The Swiss Re Tower in London (2004, known as "the Gherkin") by Foster + Partners demonstrated the system\'s potential. Hearst Tower, New York (2006) showcased diagrid efficiency with 20% less structural steel than conventional frames. The system has since been adopted globally.',
    HIGH_SCHOOL: 'Diagrid precedents include Vladimir Shukhov\'s hyperbolic lattice towers (1890s) and Buckminster Fuller\'s geodesic domes (1950s), but application to tall buildings emerged in the 2000s. Technological enablers included computational structural analysis, advanced connection design, and precision fabrication. Early examples: Swiss Re Tower (2004), Hearst Tower (2006), and Guangzhou IFC (2010) demonstrated structural efficiency and architectural potential. The 2010s saw proliferation across Asia and the Middle East.',
    UNDERGRADUATE: 'Historical development of diagrid systems for tall buildings traces from 19th-century lattice structures through mid-20th-century experiments (IBM Pittsburgh, 1963, featured diagonal bracing) to contemporary application. Enabling technologies include finite element analysis for complex load modeling, parametric design for geometry optimization, and advanced steel fabrication for node connections. Arup\'s research in the 1990s-2000s developed design methodologies. Foster + Partners\' practice demonstrated viability through built projects. Contemporary evolution includes supertall applications (China Zun, 528m) and hybrid systems combining diagrids with mega-cores.',
    GRADUATE: 'Diagrid historiography examines the convergence of structural engineering innovation, computational design capabilities, and architectural aesthetics valuing structural expression. Research analyzes the technology transfer from transmission towers and space frames to building applications, the role of engineering firms (particularly Arup, WSP) in system development, and the influence of specific architects (Foster, SOM) in popularizing the approach. Critical analysis questions whether structural efficiency claims hold across all building types and heights, examining post-construction structural monitoring data. Scholarship addresses diagrid proliferation in emerging economies, relating structural choice to construction capabilities and architectural ambition.',
    PHD: 'Contemporary diagrid scholarship engages questions of technological rationality, architectural expression, and global capital. Research examines how diagrid aesthetics signify technological sophistication and corporate prestige, particularly in Asian and Middle Eastern contexts. Lifecycle analysis research compares embodied energy, construction timelines, and operational performance against alternative structural systems. Theoretical work addresses the diagrid\'s role in post-modern structural expressionism, examining whether exposed structure represents authentic "truth to materials" or a new form of applied ornament. Historical investigation traces the global circulation of diagrid knowledge through engineering conferences, software tools, and architectural publications.',
  },

  characteristics: [
    'Diagonal structural members forming triangulated grid',
    'Typical angles: 60-75 degrees from horizontal',
    'Eliminates perimeter columns',
    'Combined gravity and lateral load resistance',
    'Visible structural expression on facade',
    '20-30% material savings versus conventional frames',
    'Steel or reinforced concrete construction',
    'Distinctive diamond or triangular pattern',
  ],

  famousExamples: [
    { name: 'Hearst Tower', location: 'New York City, USA', year: '2006', description: 'Foster + Partners\' diagrid over heritage base, 20% less steel' },
    { name: 'The Gherkin (30 St Mary Axe)', location: 'London, UK', year: '2004', description: 'Iconic tapered diagrid tower by Foster + Partners' },
    { name: 'Guangzhou International Finance Center', location: 'Guangzhou, China', year: '2010', description: '103-story diagrid tower, 438m tall' },
    { name: 'The Bow', location: 'Calgary, Canada', year: '2012', description: 'Foster + Partners\' crescent-shaped diagrid office building' },
    { name: 'Capital Gate', location: 'Abu Dhabi, UAE', year: '2011', description: 'World\'s furthest leaning tower with diagrid structure' },
  ],

  confusionPairs: [
    {
      elementId: 'exoskeleton',
      reason: 'Both show exterior structural systems',
      distinction: 'Diagrids specifically use diagonal triangulated grids; exoskeletons can include various external structural configurations',
    },
    {
      elementId: 'space-frame',
      reason: 'Both use triangulated structural systems',
      distinction: 'Space frames are 3D volumetric structures (often roofs); diagrids are 2D surface systems for building facades',
    },
  ],

  searchTags: ['structure', 'diagonal', 'triangle', 'steel', 'modern', 'foster', 'tower', 'efficiency', 'lattice', 'grid'],

  arMetadata: {
    modelPath: '/models/architecture/diagrid-structure.glb',
    scale: 0.3,
    rotatable: true,
    annotations: [
      { label: 'Diagonal Member', position: { x: 0.3, y: 0.5, z: 0 } },
      { label: 'Node Connection', position: { x: 0, y: 0.3, z: 0 } },
      { label: 'Triangular Module', position: { x: 0.2, y: 0.7, z: 0 } },
      { label: 'Force Path', position: { x: 0.4, y: 0.4, z: 0.1 } },
    ],
  },

  difficultyScore: 4,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
