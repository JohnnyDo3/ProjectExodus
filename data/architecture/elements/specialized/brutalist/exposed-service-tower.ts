import type { ArchitecturalElement } from '../../../types';

export const EXPOSED_SERVICE_TOWER: ArchitecturalElement = {
  id: 'exposed-service-tower',
  slug: 'exposed-service-tower',
  name: 'Exposed Service Tower',
  alternativeNames: ['Service Core', 'Mechanical Tower', 'Servant Tower', 'Utility Stack'],
  pronunciation: {
    phonetic: 'eks-POHZD SUR-vis TOW-er',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'Exposed (visible, unconcealed) + service (mechanical/utility systems) + tower (vertical structure)',
    rootWord: 'Latin servitium (servitude, service)',
  },
  category: 'STRUCTURAL',
  subcategory: 'service_expression',
  periods: ['brutalism', 'high-tech'],
  regions: ['EUROPE', 'NORTH_AMERICA', 'ASIA'],

  images: {
    primary: '/images/architecture/elements/exposed-service-tower-primary.jpg',
    gallery: [
      '/images/architecture/elements/service-tower-trellick.jpg',
      '/images/architecture/elements/service-tower-barbican.jpg',
      '/images/architecture/elements/service-tower-detail.jpg',
    ],
    diagram: '/images/architecture/diagrams/exposed-service-tower.svg',
  },

  description: {
    ELEMENTARY: 'An exposed service tower is a separate concrete tower attached to a building that holds all the "behind-the-scenes" stuff like elevators, stairs, water pipes, and heating systems. Instead of hiding these things inside the building, architects made them into their own tower that you can see from outside. It\'s like the building\'s backbone showing on the outside!',
    MIDDLE_SCHOOL: 'Exposed service towers are vertical concrete cores separated from the main building mass, containing elevators, fire stairs, mechanical systems, and utilities. In Brutalist architecture, these "servant" spaces are expressed as distinct architectural elements rather than hidden within the building. Famous examples include Trellick Tower\'s detached service core connected by bridges, making the building\'s functional organization visually clear.',
    HIGH_SCHOOL: 'Exposed service towers embody Brutalism\'s principle of "honest" functional expression, separating "served" spaces (living/working areas) from "servant" spaces (circulation and services) into distinct formal elements. This strategy, influenced by Louis Kahn\'s servant/served theory, creates vertical cores housing elevators, fire stairs, mechanical shafts, and utilities. The separation offers advantages: freed interior layouts, efficient central servicing, distinct formal composition, and clear legibility of building organization.',
    UNDERGRADUATE: 'Exposed service towers represent a key organizational strategy in Brutalist design, drawing on Louis Kahn\'s distinction between "served" and "servant" spaces. By consolidating circulation and mechanical systems into separate towers, architects achieved: 1) structural efficiency (rigid cores resist lateral loads), 2) plan flexibility (column-free served spaces), 3) expressive honesty (visible functional hierarchy), 4) maintenance access (concentrated services). Ernő Goldfinger\'s Trellick Tower (1972) exemplifies this: a detached 31-story service tower connected by bridges every third floor.',
    GRADUATE: 'The exposed service tower embodies complex intersections of structural engineering, building systems integration, and architectural theory in Brutalist practice. While rhetorically justified through "honest expression," the strategy involves extensive hidden infrastructure-services still distribute horizontally through slabs. Critical analysis must examine actual performance: Do separated cores improve functionality or create access problems? Structural engineers note that detached cores require robust connection details to resist wind loads and seismic forces. Environmental performance varies: some towers improve natural ventilation; others create thermal bridging.',
    PHD: 'Scholarly examination of exposed service towers requires integrating architectural theory, building science, and social housing critique. Louis Kahn\'s servant/served concept provided theoretical foundation, but British and Japanese interpretations differed significantly. Research questions include: How did fire codes influence service tower configurations? What construction cost implications resulted from separation? How do residents experience bridge connections and centralized access? Conservation challenges involve updating mechanical systems, elevator modernization within constrained towers, and structural assessment of connection bridges after decades of thermal cycling.',
  },

  history: {
    ELEMENTARY: 'In 1952, an architect named Louis Kahn had an idea: what if we separated the "working parts" of a building from the "living parts"? In the 1960s-70s, architects in Britain especially loved this idea and built tall apartment buildings with service towers standing next to them. Trellick Tower in London (1972) is the most famous-it has a skinny tower connected to the main building by bridges!',
    MIDDLE_SCHOOL: 'The concept of exposed service towers developed from Louis Kahn\'s "servant and served spaces" theory in the 1950s. Kahn\'s Richards Medical Research Laboratories (1960) demonstrated vertical service towers, though in brick. Brutalist architects adopted this in concrete: James Stirling\'s Leicester Engineering Building (1963) and Ernő Goldfinger\'s Trellick Tower (1972) made service towers prominent design features, influencing housing and institutional buildings through the 1970s.',
    HIGH_SCHOOL: 'Exposed service towers emerged through the confluence of structural innovation, modernist theory, and practical building requirements in the 1960s-70s. Louis Kahn\'s theoretical writings (1955-65) provided intellectual foundation. British architects Ernő Goldfinger, the Smithsons, and Chamberlin, Powell and Bon applied the concept to social housing, creating dramatic tower compositions. The strategy addressed fire safety (protected stairs in separate cores), servicing efficiency, and formal expressiveness. By 1980, maintenance complexity and public housing criticism reduced their use.',
    UNDERGRADUATE: 'The development of exposed service towers involved multiple precedents: 1) Louis Kahn\'s servant/served theory and built works (1957-65), 2) Le Corbusier\'s Unité d\'Habitation "vertical streets," 3) Japanese Metabolist concepts of megastructure servicing, and 4) structural engineering advances in core-stabilized high-rises. Key British applications include Chamberlin, Powell and Bon\'s Barbican towers (1969-76) with integrated service cores, and Goldfinger\'s Balfron (1967) and Trellick (1972) towers with fully detached cores. Regional variations appeared: less common in earthquake-prone areas due to connection complexities.',
    GRADUATE: 'The historiography of exposed service towers intersects with debates about architectural functionalism, social housing design, and megastructural thinking. Archival research reveals that "honest expression" often masked pragmatic concerns-fire regulations mandated separated egress, and construction phasing sometimes drove core separation. The Barbican documentation shows extensive debate about whether to integrate or separate cores, with final decisions balancing aesthetic intent, structural efficiency, and cost. Critical scholarship examines whether tower separation improved or complicated resident access, particularly for elderly or disabled occupants.',
    PHD: 'Critical analysis of exposed service towers must address architectural theory, building performance, and social outcomes. Louis Kahn\'s servant/served concept provided powerful rhetoric but often oversimplified complex servicing requirements. Recent building science evaluations reveal mixed performance: some service towers facilitate system upgrades; others create access bottlenecks and thermal bridging. Sociological studies document resident perceptions-some appreciate clear organization; others report inconvenience and security concerns with bridge connections. Conservation challenges include elevator modernization (difficult in narrow towers), mechanical system replacement, and structural assessment of connecting bridges subject to thermal expansion and wind-induced movement.',
  },

  characteristics: [
    'Vertical concrete tower separate from main mass',
    'Contains elevators, stairs, utilities, mechanical systems',
    'Connected to main building via bridges/links',
    'Distinct formal element in composition',
    'Often cylindrical or rectangular in plan',
    'Visible expression of servant/served organization',
  ],

  famousExamples: [
    { name: 'Trellick Tower', location: 'London, UK', year: '1972', description: 'Ernő Goldfinger\'s 31-story tower with detached service core' },
    { name: 'Balfron Tower', location: 'London, UK', year: '1967', description: 'Goldfinger\'s earlier tower with separated service core' },
    { name: 'Barbican Estate', location: 'London, UK', year: '1965-1976', description: 'Residential towers with prominent service cores' },
    { name: 'Richards Medical Research Laboratories', location: 'Philadelphia, USA', year: '1960', description: 'Louis Kahn\'s influential servant tower concept in brick' },
    { name: 'Nakagin Capsule Tower', location: 'Tokyo, Japan', year: '1972', description: 'Metabolist building with central service cores and plugin units' },
  ],

  confusionPairs: [
    {
      elementId: 'elevator-shaft',
      reason: 'Both are vertical circulation elements',
      distinction: 'Service towers are separated architectural elements; elevator shafts are typically integrated within buildings',
    },
    {
      elementId: 'minaret',
      reason: 'Both are vertical towers attached to buildings',
      distinction: 'Minarets are religious towers for call to prayer; service towers house mechanical and circulation systems',
    },
  ],

  searchTags: ['service-tower', 'brutalist', 'concrete', 'vertical-core', 'elevator', 'mechanical', 'servant-served', 'goldfinger'],

  arMetadata: {
    modelPath: '/models/architecture/exposed-service-tower.glb',
    scale: 0.6,
    rotatable: true,
    annotations: [
      { label: 'Service Tower', position: { x: 0.4, y: 0.5, z: 0 } },
      { label: 'Connection Bridge', position: { x: 0.15, y: 0.6, z: 0 } },
      { label: 'Main Building Mass', position: { x: -0.3, y: 0.4, z: 0 } },
      { label: 'Elevator/Stair Core', position: { x: 0.4, y: 0.7, z: 0 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
