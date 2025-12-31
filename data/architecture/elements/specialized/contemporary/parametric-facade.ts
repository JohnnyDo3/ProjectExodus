import type { ArchitecturalElement } from '../../../types';

export const PARAMETRIC_FACADE: ArchitecturalElement = {
  id: 'parametric-facade',
  slug: 'parametric-facade',
  name: 'Parametric Facade',
  alternativeNames: ['Algorithmic Facade', 'Computational Skin', 'Generative Facade', 'Digital Pattern Facade'],
  pronunciation: {
    phonetic: 'par-uh-MET-rik fuh-SAHD',
    language: 'English',
  },
  etymology: {
    origin: 'Greek + French',
    meaning: 'Parameter-driven building face',
    rootWord: 'From Greek "para" (beside) + "metron" (measure) + French "façade" (face)',
  },
  category: 'FACADE',
  subcategory: 'computational_systems',
  periods: ['PARAMETRICISM', 'NEO_FUTURISM', 'CONTEMPORARY'],
  regions: ['GLOBAL', 'EAST_ASIA', 'MIDDLE_EAST', 'WESTERN_EUROPE'],

  images: {
    primary: '/images/architecture/elements/parametric-facade-primary.jpg',
    gallery: [
      '/images/architecture/elements/parametric-facade-detail.jpg',
      '/images/architecture/elements/parametric-facade-night.jpg',
      '/images/architecture/elements/parametric-facade-pattern.jpg',
    ],
    diagram: '/images/architecture/diagrams/parametric-facade-system.svg',
  },

  description: {
    ELEMENTARY: 'A parametric facade is a building skin with a special pattern created by computers. Instead of someone drawing every single piece, the computer uses math rules to make amazing designs that repeat and change. It\'s like having a computer draw thousands of snowflakes, each one a little different!',
    MIDDLE_SCHOOL: 'Parametric facades use computer algorithms to generate complex patterns on building exteriors. Designers create mathematical rules that control the shape, size, and spacing of facade elements. By adjusting parameters (like "open 30% for shade" or "vary depth by 10cm"), the computer generates thousands of unique components that work together as a complete system.',
    HIGH_SCHOOL: 'Parametric design uses computational algorithms to generate building facades based on multiple variables. Designers define relationships between parameters-solar orientation, view angles, structural loads, aesthetic patterns-and software generates geometry that optimizes these factors. The facade becomes a performance-driven skin, often featuring mass-customized components fabricated using CNC machinery and robotic assembly.',
    UNDERGRADUATE: 'Parametric facades represent the intersection of computational design, digital fabrication, and environmental performance. Using software like Grasshopper, designers create algorithms that generate geometry responsive to environmental data, structural requirements, and aesthetic intent. Each panel can be unique yet systematically derived. Performance considerations include solar shading, natural ventilation, daylighting optimization, and thermal mass. Digital fabrication enables economical production of mass-customized components.',
    GRADUATE: 'Parametric facade design integrates computational geometry, building performance simulation, and advanced manufacturing. Algorithms encode design logic relating environmental analysis, structural optimization, and aesthetic principles. Tools include genetic algorithms for multi-objective optimization, computational fluid dynamics for airflow analysis, and raytracing for daylighting studies. Research addresses the integration of parametric design with sustainable performance metrics and lifecycle analysis.',
    PHD: 'Scholarly investigation of parametric facades examines the epistemological shift from drawing to coding in architectural production, the implications of algorithm-driven design for architectural authorship, and the tension between computational optimization and aesthetic judgment. Research methodologies include comparative analysis of parametric workflows, assessment of performance claims versus measured outcomes, and critical theory addressing the cultural implications of algorithmic architecture. Historical scholarship traces parametric design from mathematical architecture through early CAD to contemporary computational practice.',
  },

  history: {
    ELEMENTARY: 'Parametric facades became possible when computers got powerful enough to design complex patterns, starting in the early 2000s. Architects like Zaha Hadid started making buildings with flowing, curved shapes that would have been impossible to draw by hand. Now architects around the world use special computer programs to design amazing building skins!',
    MIDDLE_SCHOOL: 'Parametric design emerged in the 2000s as architectural software became powerful enough to handle complex algorithms. Early pioneers included Zaha Hadid and Patrik Schumacher, who developed software that could generate flowing, organic forms. The Al Bahar Towers (2012) in Abu Dhabi featured a parametric sunscreen that responds to sun angles, demonstrating how these facades can improve building performance.',
    HIGH_SCHOOL: 'Parametric architecture evolved from 1990s-2000s experiments with digital design tools. Gehry Partners\' use of CATIA aerospace software for complex geometries paved the way. Grasshopper plugin for Rhino (2007) democratized parametric design. Early examples like the Watercube (2008) used Weaire-Phelan foam geometry. Contemporary projects combine algorithmic form-finding with environmental performance-the Al Bahar dynamic facade adjusts 1,000+ panels in response to sun position.',
    UNDERGRADUATE: 'Parametric facade development traces from mathematical architecture (Frei Otto\'s form-finding experiments, 1950s-70s) through early digital modeling (Gehry Technologies, 1990s) to contemporary algorithm-driven design. Key technological enablers include accessible parametric software (Grasshopper, 2007), building information modeling integration, environmental analysis plugins, and digital fabrication. Landmark projects demonstrate evolution: Sage Gateshead (2004, early digital form), Al Bahar Towers (2012, responsive system), Morpheus Hotel (2018, exoskeleton integration).',
    GRADUATE: 'Historical analysis of parametric facades examines the convergence of computational geometry, environmental engineering, and digital fabrication. Theoretical foundations include D\'Arcy Thompson\'s biological morphology, Christopher Alexander\'s pattern languages, and Frei Otto\'s physical computation. Practical development occurred through aerospace software adaptation, parametric plugin development, and integration with fabrication technologies (CNC milling, robotic assembly, 3D printing). Critical assessment addresses the gap between computational complexity and environmental performance, questioning whether algorithmic sophistication produces measurable sustainability benefits.',
    PHD: 'Parametric facade historiography engages questions of technological determinism, architectural agency, and the cultural meanings of computational design. Research examines the role of software companies in shaping design possibilities, the transfer of aerospace and automotive technologies to architecture, and the global circulation of parametric design culture through publications, conferences, and professional networks. Contemporary scholarship critically assesses parametricism\'s environmental claims, examining post-occupancy performance data and lifecycle impacts. Theoretical work addresses algorithmic architecture\'s relationship to late capitalism, digital culture, and ecological crisis.',
  },

  characteristics: [
    'Computer-generated geometric patterns',
    'Algorithm-driven component variation',
    'Often responsive to environmental data',
    'Mass-customized fabrication',
    'Integration of structure and ornament',
    'Digital fabrication (CNC, robotic)',
    'Performance-driven geometry',
    'Complex organic or geometric forms',
  ],

  famousExamples: [
    { name: 'Morpheus Hotel', location: 'Macau, China', year: '2018', description: 'Zaha Hadid\'s exoskeletal facade with parametric voids' },
    { name: 'Al Bahar Towers', location: 'Abu Dhabi, UAE', year: '2012', description: 'Dynamic parametric sunscreen with 1,000+ responsive panels' },
    { name: 'Beijing National Aquatics Center', location: 'Beijing, China', year: '2008', description: 'ETFE facade based on Weaire-Phelan foam geometry' },
    { name: 'Heydar Aliyev Center', location: 'Baku, Azerbaijan', year: '2012', description: 'Continuous flowing facade merging ground and roof' },
    { name: 'Harbin Opera House', location: 'Harbin, China', year: '2015', description: 'Parametric curves responding to landscape topography' },
  ],

  confusionPairs: [
    {
      elementId: 'curtain-wall',
      reason: 'Both are contemporary facade systems',
      distinction: 'Curtain walls are standardized systems; parametric facades use algorithms to generate unique, varied components',
    },
    {
      elementId: 'brise-soleil',
      reason: 'Both can feature sunshading elements',
      distinction: 'Brise-soleil are functional sunshades; parametric facades integrate computation, often combining ornament and performance',
    },
  ],

  searchTags: ['computational', 'algorithm', 'digital', 'contemporary', 'zaha-hadid', 'grasshopper', 'custom', 'pattern', 'generative'],

  arMetadata: {
    modelPath: '/models/architecture/parametric-facade.glb',
    scale: 0.4,
    rotatable: true,
    annotations: [
      { label: 'Algorithmic Pattern Module', position: { x: 0, y: 0.5, z: 0 } },
      { label: 'Variable Panel Depth', position: { x: 0.3, y: 0.3, z: 0.2 } },
      { label: 'Structural Attachment', position: { x: 0, y: 0, z: -0.1 } },
      { label: 'Parametric Variation', position: { x: -0.3, y: 0.7, z: 0.1 } },
    ],
  },

  difficultyScore: 4,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
