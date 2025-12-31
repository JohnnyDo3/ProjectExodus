import type { ArchitecturalElement } from '../../types';

export const BRIDGE: ArchitecturalElement = {
  id: 'bridge',
  slug: 'bridge',
  name: 'Bridge',
  alternativeNames: ['Span', 'Viaduct', 'Overpass', 'Pont'],
  pronunciation: {
    phonetic: 'BRIJ',
    language: 'Old English',
  },
  etymology: {
    origin: 'Old English/Germanic',
    meaning: 'Structure spanning obstacle',
    rootWord: 'From Old English "brycg" related to Proto-Germanic "brugjō"',
  },
  category: 'URBAN',
  subcategory: 'infrastructure',
  periods: ['ancient-roman', 'medieval', 'renaissance', 'industrial-revolution', 'modern', 'contemporary'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/bridge-primary.jpg',
    gallery: [
      '/images/architecture/elements/bridge-brooklyn.jpg',
      '/images/architecture/elements/bridge-roman.jpg',
    ],
    diagram: '/images/architecture/diagrams/bridge-types.svg',
  },

  description: {
    ELEMENTARY: 'A bridge is a structure that helps people cross over water, valleys, or roads! Bridges can be made of stone, wood, steel, or concrete. Some bridges are very simple, and others are huge and beautiful. The Golden Gate Bridge in San Francisco is a famous bridge painted orange-red. Bridges are important because they connect places that would otherwise be hard to reach.',
    MIDDLE_SCHOOL: 'A bridge is a structure spanning and providing passage over an obstacle like water, valley, or road. Main bridge types include beam (simple supported spans), arch (curved compression structures), truss (triangulated frameworks), suspension (cables supporting deck), and cable-stayed (cables from towers to deck). Materials include stone, timber, iron, steel, and concrete. Bridges serve transportation, commerce, and can become architectural landmarks.',
    HIGH_SCHOOL: 'Bridge design addresses span requirements, load capacity, and site conditions through various structural systems. Beam bridges use bending resistance. Arch bridges work in compression, transferring loads to abutments. Truss bridges distribute loads through triangulated members. Suspension bridges use tensile cables from anchorages over towers. Cable-stayed bridges use direct cable support. Design considerations include foundation conditions, clearance requirements, seismic forces, wind loads, and aesthetic integration with surroundings.',
    UNDERGRADUATE: 'Bridge engineering integrates structural analysis, materials science, and construction methodology. Design process includes site investigation, load analysis (dead loads, live loads, dynamic loads, environmental forces), structural system selection, foundation design, and detail development. Material choices affect span capabilities, construction methods, maintenance requirements, and lifecycle costs. Contemporary practice addresses sustainability, resilience to climate change, and integration with multimodal transportation systems. Advanced analysis uses finite element modeling and wind tunnel testing.',
    GRADUATE: 'Bridge analysis addresses structural optimization, construction sequencing, and infrastructure resilience. Research examines long-span bridge behavior under complex loading, innovative materials (high-performance concrete, fiber-reinforced polymers), construction technologies (incremental launching, balanced cantilever), and monitoring systems for structural health assessment. Contemporary challenges include retrofitting aging infrastructure, designing for increased loads and extreme weather, and balancing engineering performance with architectural expression.',
    PHD: 'Bridge scholarship engages structural engineering, materials science, and infrastructure studies. Methodologies include experimental testing of structural systems, computational modeling of nonlinear behavior, and historical analysis of bridge evolution. Current research addresses ultra-high-performance materials, self-monitoring smart structures, seismic isolation systems, sustainable life-cycle design, and the role of signature bridges in urban identity and economic development.',
  },

  history: {
    ELEMENTARY: 'People built simple bridges from logs and ropes thousands of years ago! The Romans built strong stone arch bridges, and some still stand today. In the 1800s, engineers learned to build bridges from iron and steel, making them much longer. The Brooklyn Bridge opened in 1883 and amazed everyone. Today, engineers design incredible bridges that span huge distances using computers to make sure they\'re safe.',
    MIDDLE_SCHOOL: 'Ancient civilizations built timber and stone bridges. Romans engineered arch bridges throughout their empire-the Ponte Fabricio (62 BCE) still carries traffic. Medieval Europe built fortified bridges with towers and chapels. The Industrial Revolution introduced iron bridges-the Iron Bridge at Coalbrookdale (1779) pioneered the material. Suspension bridge development culminated in the Brooklyn Bridge (1883). 20th-century advances in steel and concrete enabled longer spans. Cable-stayed bridges became popular from the 1950s.',
    HIGH_SCHOOL: 'Early bridge engineering relied on empirical methods and natural materials. Roman arch bridge technology achieved remarkable durability through precise voussoir cutting and hydraulic cement. Medieval bridges combined infrastructure with commerce and defense-London Bridge housed shops. Renaissance engineers like Palladio published bridge treatises. The Industrial Revolution transformed bridge building: cast iron (1779), wrought iron (1840s), steel (1880s). Suspension bridge development progressed from simple chains to wire cables. Concrete enabled new forms like Maillart\'s deck-stiffened arches (1900s). Modern long-span bridges use aerodynamic decks after Tacoma Narrows collapse (1940).',
    UNDERGRADUATE: 'Bridge history reveals material innovation, structural understanding, and construction technology evolution. Roman engineering achieved efficient arch geometry and foundation techniques. Medieval builders developed pointed arches for longer spans. Renaissance theory applied geometry to bridge design. Industrial materials enabled new structural types: cast iron compression members, wrought iron tension members, steel combinations. Suspension bridge development required understanding cable behavior and wind forces. Reinforced concrete introduced by Hennebique and developed by Maillart enabled expressive forms. Contemporary practice uses high-strength materials, computer analysis, and advanced construction methods.',
    GRADUATE: 'Historical analysis of bridges examines technological innovation, engineering knowledge transmission, and infrastructure\'s social role. Research addresses the evolution from craft-based building to scientific engineering, the influence of catastrophic failures on design codes, and the relationship between bridge form and available materials. Contemporary challenges include preserving historic bridges while meeting modern traffic demands, adapting infrastructure for climate resilience, and balancing standardized versus signature designs in public infrastructure.',
    PHD: 'Bridge scholarship engages engineering history, materials science, and infrastructure studies. Methodologies include archaeological investigation of ancient construction techniques, structural analysis of historic bridges, and failure analysis informing design evolution. Current research examines bridges in colonial infrastructure systems, the aesthetics of engineering structures, gender and labor in bridge construction, and the politics of infrastructure investment and maintenance prioritization.',
  },

  characteristics: [
    'Spans obstacle (water, valley, road)',
    'Supports passage (vehicles, pedestrians, trains)',
    'Various structural systems (arch, beam, suspension)',
    'Foundation at each end (abutments)',
    'Designed for specific loads',
    'May serve as urban landmark',
    'Requires regular maintenance',
  ],

  famousExamples: [
    { name: 'Ponte Vecchio', location: 'Florence, Italy', year: '1345', description: 'Medieval stone arch bridge with shops' },
    { name: 'Brooklyn Bridge', location: 'New York City, USA', year: '1883', description: 'Steel wire suspension bridge, 486m main span' },
    { name: 'Golden Gate Bridge', location: 'San Francisco, USA', year: '1937', description: 'Iconic suspension bridge with 1,280m main span' },
    { name: 'Millau Viaduct', location: 'Southern France', year: '2004', description: 'World\'s tallest bridge, cable-stayed, 343m tall' },
    { name: 'Akashi Kaikyo Bridge', location: 'Japan', year: '1998', description: 'World\'s longest suspension span at 1,991 meters' },
  ],

  confusionPairs: [
    {
      elementId: 'aqueduct',
      reason: 'Both span obstacles with arches',
      distinction: 'Bridges carry traffic (roads, trains, pedestrians); aqueducts carry water in channels',
    },
    {
      elementId: 'viaduct',
      reason: 'Terms sometimes used interchangeably',
      distinction: 'Viaducts specifically refer to long elevated roadways on multiple arches or piers; bridges generally span single obstacles',
    },
  ],

  searchTags: ['bridge', 'span', 'crossing', 'arch', 'suspension', 'infrastructure', 'engineering', 'urban'],

  arMetadata: {
    modelPath: '/models/architecture/bridge.glb',
    scale: 0.05,
    rotatable: true,
    annotations: [
      { label: 'Deck', position: { x: 0, y: 1, z: 0 } },
      { label: 'Pier/Tower', position: { x: 0, y: 2, z: 0 } },
      { label: 'Abutment', position: { x: 3, y: 0.5, z: 0 } },
      { label: 'Arch/Cable', position: { x: 1, y: 1.5, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
