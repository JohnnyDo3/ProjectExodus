import type { ArchitecturalElement } from '../../../types';

export const SPACE_FRAME: ArchitecturalElement = {
  id: 'space-frame',
  slug: 'space-frame',
  name: 'Space Frame',
  alternativeNames: ['Space Truss', 'Three-Dimensional Truss', 'Lattice Structure', 'Geodesic Frame'],
  pronunciation: {
    phonetic: 'SPAYSS FRAYM',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'Three-dimensional structural framework spanning space',
    rootWord: 'From "space" (area) and "frame" (structure)',
  },
  category: 'STRUCTURAL',
  subcategory: 'high_tech',
  periods: ['high-tech', 'contemporary'],
  regions: ['WESTERN_EUROPE', 'NORTH_AMERICA', 'EAST_ASIA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/space-frame-primary.jpg',
    gallery: [
      '/images/architecture/elements/space-frame-sainsbury.jpg',
      '/images/architecture/elements/space-frame-pompidou.jpg',
      '/images/architecture/elements/space-frame-detail.jpg',
    ],
    diagram: '/images/architecture/diagrams/space-frame-geometry.svg',
  },

  description: {
    ELEMENTARY: 'A space frame is like a giant 3D jungle gym made of metal tubes connected in triangular patterns! These frameworks are super strong because triangles don\'t squish or wobble. Space frames can span huge distances to create giant roofs with no columns underneath, like the cool lattice roof at the Sainsbury Centre or airport terminals.',
    MIDDLE_SCHOOL: 'Space frames are three-dimensional structural systems made of interconnected struts forming triangulated patterns-typically pyramids or octahedrons. Unlike flat trusses, space frames work in three dimensions, distributing loads in multiple directions. This creates very strong, lightweight structures capable of spanning large distances. High-Tech architects exposed space frames as architectural features rather than hiding them above ceilings.',
    HIGH_SCHOOL: 'Space frame systems achieve exceptional strength-to-weight ratios through three-dimensional triangulation. Common configurations include square-on-square offset (creating pyramids), diagonal-on-square, and hexagonal geometries. Structural behavior distributes loads through axial forces in members, with minimal bending. Manufacturing typically uses modular connection nodes-spherical, plate, or proprietary systems-with standardized tubular members. Space frames enable long spans (50-150m) with shallow depth, making them ideal for exhibition halls, airports, and sports facilities.',
    UNDERGRADUATE: 'Space frame analysis employs matrix structural methods accounting for member axial forces and nodal displacements. Design considerations include buckling of compression members, connection detailing, tolerance requirements, and construction sequence. Material choices include steel (most common), aluminum (lightweight applications), and timber (recent sustainable development). Contemporary space frames integrate building services-lighting, HVAC, acoustics-within the structural depth. Research areas include deployable space frames, adaptive structures, and optimization algorithms for minimal-weight configurations.',
    GRADUATE: 'Advanced space frame design engages structural optimization, geometric configuration, and fabrication constraints. Research includes topology optimization for irregular geometries, free-form space frames for complex surfaces, and multi-objective optimization balancing structural performance, material efficiency, and aesthetic expression. Connection design is critical-standard spherical nodes enable rapid assembly but create eccentricities; direct-welded connections eliminate eccentricity but increase fabrication cost. Contemporary development explores robotic assembly, generative design, and integration of monitoring sensors for structural health assessment.',
    PHD: 'Space frame research spans structural mechanics, computational geometry, and construction technology. Historical scholarship examines development from Alexander Graham Bell\'s tetrahedral structures through Buckminster Fuller\'s geodesics to contemporary applications. Current research includes form-finding for irregular space frames, reliability analysis accounting for progressive collapse, and lifecycle assessment. Critical analysis questions whether space frames\' material efficiency (compared to planar systems) justifies fabrication complexity and connection costs. Emerging work explores responsive space frames with embedded actuation for adaptive geometries.',
  },

  history: {
    ELEMENTARY: 'Space frames were invented about 100 years ago when engineers discovered that 3D triangular patterns could create incredibly strong, light structures. They became popular in the 1950s-60s and were used for big spaces like exhibition halls and stadiums. High-Tech architects in the 1970s-80s made space frames visible and beautiful, like the silvery lattice roof on the Sainsbury Centre.',
    MIDDLE_SCHOOL: 'Alexander Graham Bell experimented with tetrahedral space structures in the early 1900s. Buckminster Fuller developed geodesic domes (1940s-50s), popularizing space frame principles. The systems became commercially viable in the 1950s-60s with standardized connectors (MERO, Unistrut). High-Tech architects embraced space frames-Foster\'s Sainsbury Centre (1978) made the lattice structure the building\'s defining feature. Today, space frames appear in airports, stadiums, and exhibition halls worldwide.',
    HIGH_SCHOOL: 'Space frame development traces from Bell\'s tetrahedral kites (1900s) and Bauersfeld\'s planetarium dome (1926) through Fuller\'s geodesic systems and Konrad Wachsmann\'s Mobilar structures (1950s). Standardized connector systems enabled commercial adoption-German MERO system (1940s), British Space Deck (1950s). High-Tech applications include Sainsbury Centre (Foster, 1978), Pompidou atrium (Rogers/Piano, 1977), and numerous airport terminals (Stansted, Kansai). Contemporary uses include free-form space frames for complex geometries (Beijing Olympics Swimming Center, 2008).',
    UNDERGRADUATE: 'Space frames emerged from multiple trajectories: engineering (efficient long-span structures), prefabrication (modular systems), and architectural geometry (form exploration). Early applications were primarily utilitarian-industrial buildings, exhibition halls. High-Tech architects aestheticized the systems, exposing intricate space frame patterns. Technical developments include computer-aided design enabling complex geometries, corrosion-resistant coatings extending durability, and fire-protection strategies. Contemporary challenges include adapting standardized systems for irregular forms and integrating services within structural depth.',
    GRADUATE: 'Historical analysis reveals space frames\' relationship to mass production, systems thinking, and technological determinism. The systems promised efficient, demountable architecture-partially realized in temporary structures, rarely in permanent buildings. High-Tech applications demonstrated aesthetic potential but often specified bespoke rather than standardized components, undermining economic rationale. Performance research documents acoustic and thermal challenges-exposed space frames within conditioned spaces create large surface area for heat loss/gain. Contemporary development includes free-form space frames (double-curved surfaces), timber space frames (CLT nodes and members), and integrated smart structures.',
    PHD: 'Space frame scholarship engages structural optimization theory, architectural geometry, and critical regionalism debates. Historical work documents parallel development in multiple countries-German engineering tradition, Fuller\'s American utopianism, British prefabrication research. Critical analysis questions whether geometric rationality produces architecture-space frames\' optimal efficiency sometimes conflicts with human-scale detail and contextual response. Contemporary research addresses digital fabrication enabling custom nodes for irregular geometries, structural health monitoring using embedded sensors, and sustainability assessment including embodied energy and end-of-life disassembly.',
  },

  characteristics: [
    'Three-dimensional triangulated framework',
    'Modular nodes and standardized members',
    'Long spans with minimal material',
    'Distributes loads in multiple directions',
    'Lightweight and structurally efficient',
    'Often exposed as architectural feature',
    'Can create flat or curved geometries',
  ],

  famousExamples: [
    {
      name: 'Sainsbury Centre for Visual Arts',
      location: 'Norwich, UK',
      year: '1978',
      description: 'Norman Foster\'s museum with exposed lattice space frame forming structural skin'
    },
    {
      name: 'Montreal Biosphère',
      location: 'Montreal, Canada',
      year: '1967',
      description: 'Buckminster Fuller\'s geodesic dome with triangulated space frame'
    },
    {
      name: 'Beijing National Aquatics Center',
      location: 'Beijing, China',
      year: '2008',
      description: 'PTW Architects\' "Water Cube" with irregular space frame based on soap bubble geometry'
    },
    {
      name: 'Stansted Airport Terminal',
      location: 'London, UK',
      year: '1991',
      description: 'Foster\'s terminal with shallow space frame roof supported by tree columns'
    },
    {
      name: 'Centre Pompidou',
      location: 'Paris, France',
      year: '1977',
      description: 'Rogers/Piano\'s cultural center with exposed space frame in interior atrium'
    },
  ],

  confusionPairs: [
    {
      elementId: 'truss',
      reason: 'Both are triangulated structural frameworks',
      distinction: 'Trusses are two-dimensional (planar); space frames are three-dimensional structures working in multiple directions',
    },
    {
      elementId: 'geodesic-dome',
      reason: 'Both use triangulated frameworks',
      distinction: 'Geodesic domes are specifically spherical space frames; space frames can be flat, curved, or irregular geometries',
    },
  ],

  searchTags: ['high-tech', 'structure', 'truss', 'lattice', 'triangulated', 'modular', 'lightweight', 'foster', 'geodesic', 'framework'],

  arMetadata: {
    modelPath: '/models/architecture/space-frame.glb',
    scale: 0.3,
    rotatable: true,
    annotations: [
      { label: 'Spherical Node Connector', position: { x: 0, y: 1, z: 0 } },
      { label: 'Tubular Member (Strut)', position: { x: 0.5, y: 0.7, z: 0.3 } },
      { label: 'Pyramid Module', position: { x: 0.3, y: 0.5, z: 0.3 } },
      { label: 'Support Point', position: { x: -1, y: 0, z: -1 } },
    ],
  },

  difficultyScore: 4,
  dateAdded: new Date('2024-12-31'),
  lastUpdated: new Date('2024-12-31'),
};
