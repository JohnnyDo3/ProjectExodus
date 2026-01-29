import type { ArchitecturalElement } from '../../types';

export const EXCAVATION_TRENCH: ArchitecturalElement = {
  id: 'excavation-trench',
  slug: 'excavation-trench',
  name: 'Excavation Trench',
  alternativeNames: ['Isolation Trench', 'Perimeter Trench', 'Courtyard Trench'],
  pronunciation: {
    phonetic: 'eks-kuh-VAY-shun TRENCH',
    language: 'English',
  },
  etymology: {
    origin: 'Latin',
    meaning: 'To hollow out',
    rootWord: 'excavare (ex = out, cavare = to hollow)',
  },
  category: 'URBAN',
  subcategory: 'infrastructure',
  periods: ['medieval-ethiopian'],
  regions: ['EAST_AFRICA', 'ETHIOPIAN_HIGHLANDS'],

  images: {
    primary: '/images/architecture/elements/excavation-trench-primary.jpg',
    gallery: [
      '/images/architecture/elements/excavation-trench-lalibela.jpg',
      '/images/architecture/elements/excavation-trench-system.jpg',
    ],
    diagram: '/images/architecture/diagrams/excavation-trench-plan.svg',
  },

  description: {
    ELEMENTARY: 'Excavation trenches are deep ditches carved all around monolithic buildings to separate them from the surrounding rock. They create outdoor spaces like courtyards where people can walk around the building and enter through doors!',
    MIDDLE_SCHOOL: 'Excavation trenches are deep channels carved into bedrock around the perimeter of monolithic structures to isolate them from the surrounding stone mass. At Lalibela, these trenches are up to 12 meters deep, creating courtyard spaces that provide access to the churches, connect multiple buildings through tunnel networks, and serve as drainage systems to prevent water damage.',
    HIGH_SCHOOL: 'Excavation trenches represent essential infrastructure for subtractive architecture, serving multiple critical functions simultaneously. The trenches are carved around the entire perimeter of monolithic structures to completely isolate them from parent rock. They typically feature vertical or near-vertical walls descending from ground level to the base of the excavated structure. The trenches create functional courtyards providing circulation space, ceremonial gathering areas, and architectural transition zones between ground level and the sunken buildings. Underground drainage channels connect trenches to manage rainwater and prevent flooding. Tunnel passages link trench systems between different church complexes, enabling protected movement and creating spatial hierarchies within the sacred landscape.',
    UNDERGRADUATE: 'Excavation trench systems at Lalibela demonstrate sophisticated urban planning and hydraulic engineering integrated with monolithic architecture. The trenches solve multiple technical challenges: structural isolation of carved buildings from bedrock, water management in volcanic stone with variable permeability, circulation networks connecting dispersed church locations, and creation of ceremonial spaces for liturgical processions. Trench dimensions vary by building scale - Biete Ghiorgis sits in a trapezoidal pit measuring 25m x 25m at ground level, 12m deep. The trenches\' vertical walls require careful execution to prevent collapse during excavation, suggesting sophisticated understanding of rock mechanics. Interconnecting tunnel networks create three-dimensional circulation systems with symbolic significance (suggesting catacombs, pilgrimage routes). The trenches also establish sight lines and visual relationships between buildings, with some churches visible only from specific approach angles. Archaeological evidence suggests trenches were excavated simultaneously with building carving, with workers removing material from both trench walls and building mass.',
    GRADUATE: 'The excavation trench system constitutes a sophisticated infrastructural network addressing structural, hydraulic, ceremonial, and symbolic requirements. Geotechnical analysis reveals careful site selection where rock stratification and natural fracture planes enabled deep excavation without mechanical reinforcement. Trench wall stability depends on rock quality, excavation angle, and water management - trenches incorporate drainage channels preventing hydrostatic pressure buildup. The trenches create liminal spaces mediating between ground-level daily life and sunken sacred architecture, establishing processional sequences and controlled visual revelation of churches. Comparative analysis with other rock-cut sites reveals unique aspects of Lalibela\'s approach: most rock-cut architecture (Petra, Ellora) maintains rock mass behind facades, while Lalibela achieves complete perimeter isolation. The tunnel connections between trenches create protected passages suggesting both practical functions (weather protection, security) and symbolic meanings (catacombs, spiritual journeys). UNESCO conservation monitoring addresses trench-specific challenges including wall erosion, vegetation growth causing rock degradation, and tourist pathway impacts. Recent laser scanning documentation enables detailed analysis of excavation tool marks, construction sequences, and geometric relationships between trenches and buildings.',
    PHD: 'Excavation trench systems represent a critical but understudied component of monolithic architecture, embodying sophisticated integration of structural engineering, urban planning, hydraulic systems, and symbolic landscapes. Structural analysis examines rock mass stability during and after excavation, with some trenches approaching height-to-width ratios requiring careful rock quality assessment and possibly temporary shoring systems (though no evidence survives). Hydraulic engineering research documents drainage networks including carved channels, settling basins, and discharge points, demonstrating understanding of seasonal water flow patterns and groundwater table management. Urban planning analysis reveals intentional trench network organization creating hierarchical access sequences, visual axes, and spatial relationships between church complexes. The trenches establish a sunken sacred landscape distinct from surrounding secular ground level, creating architectural pilgrimage experience before entering buildings. Symbolic interpretation considers trench systems as representations of Jerusalem topography (valleys, ravines), spiritual descent, or protective boundaries. Conservation science addresses unique challenges: trench wall weathering from rainfall and groundwater, vegetation-induced deterioration, erosion from foot traffic, and drainage system maintenance. Recent photogrammetric survey enables analysis of excavation techniques through tool mark identification, sequence reconstruction from abandoned partial trenches, and geometric precision assessment. Comparative studies with other excavation-based architectures (Cappadocian churches, Petra treasury approach) reveal both universal principles of working in bedrock and culturally specific Ethiopian innovations in complete structural isolation and network connectivity.',
  },

  history: {
    ELEMENTARY: 'When Ethiopian builders carved churches from solid rock, they first had to dig deep trenches all around to separate the church from the surrounding stone. These trenches became courtyards and pathways connecting different churches through underground tunnels!',
    MIDDLE_SCHOOL: 'The excavation trenches at Lalibela were created during the 12th-13th century alongside the monolithic churches. Workers began by marking the church outline on the rock surface, then carved trenches around the perimeter to isolate the building mass. The trenches served practical needs (drainage, access) and ceremonial functions (procession spaces, courtyards). Tunnels connecting trenches allowed pilgrims to move between churches without returning to ground level, creating a subterranean pilgrimage route.',
    HIGH_SCHOOL: 'Excavation trench construction formed the first phase of monolithic church creation at Lalibela. After selecting sites with suitable rock (volcanic basalt with manageable stratification), workers traced building perimeters and began trench excavation. The trenches were carved simultaneously from multiple points, with laborers working in coordinated teams. Trench depths vary from 5-12 meters depending on building height and design requirements. Archaeological analysis of tool marks suggests systematic excavation patterns - horizontal layers removed progressively downward. The tunnel networks connecting trenches show careful planning to maintain structural integrity while creating passages through living rock. Drainage channels incorporated into trench floors managed rainwater and prevented flooding. The trench system transformed the site from flat bedrock surface to complex three-dimensional landscape with churches sunken below original ground level.',
    UNDERGRADUATE: 'The development of excavation trench systems at Lalibela represents evolutionary refinement of earlier Ethiopian rock-cut architecture traditions. Earlier Tigray region churches (possibly 6th-11th centuries) used simpler excavation approaches, often creating cave-like spaces with rock mass retained around buildings. Lalibela\'s achievement was systematic perimeter isolation creating fully detached structures. This required significant advances in rock mechanics understanding, excavation sequencing, and structural confidence. Construction chronology debates address whether all trenches were excavated in coordinated campaigns or developed incrementally. Trench geometries reveal planning sophistication: Biete Ghiorgis sits in precisely trapezoidal pit maintaining geometric relationship with the church\'s Greek cross plan. The tunnel network suggests master planning across the entire site rather than building-by-building development. Hydraulic engineering incorporated drainage from the outset, not as afterthought, indicating integrated design thinking. The trenches also established symbolic geography - the "Jordan River" trench dividing north and south church groups creates biblical landscape references. European travelers (16th century onwards) documented the trenches in varying detail, though systematic archaeological investigation only began in the 20th century.',
    GRADUATE: 'Excavation trench development must be understood within Ethiopia\'s long rock-cut architectural tradition and specific Zagwe Dynasty political and religious objectives. Earlier Ethiopian examples show progressive movement toward complete structural isolation, with Lalibela representing the culmination. The trench systems reflect sophisticated site planning across approximately 4 hectares, suggesting central design authority and coordinated labor organization. Construction logistics required removing thousands of cubic meters of basalt - Biete Ghiorgis alone required excavating 3,400 cubic meters around the church plus 450 cubic meters from its interior. This material was either transported away (no evidence of large spoil piles) or used elsewhere, suggesting systematic quarry management. The tunnel networks reveal planned three-dimensional circulation patterns impossible to achieve through incremental development, supporting theories of master planning. Geotechnical considerations included selecting sites where rock stratification enabled stable vertical trench walls, avoiding major fracture zones that could compromise stability, and anticipating drainage requirements. The trenches create specific experiential sequences - controlled visual revelation of churches from particular approach angles, acoustic properties within trench courtyards, and microclimate effects (shade, temperature moderation). UNESCO designation (1978) initiated systematic documentation, revealing diverse trench conditions requiring varied conservation approaches - some stable, others showing erosion or structural concerns.',
    PHD: 'Scholarly engagement with excavation trench systems employs multiple analytical frameworks. Archaeological investigation examines tool mark evidence, excavation sequence reconstruction from partially completed trenches, and construction organization inferring from geometric precision and coordination between multiple excavation sites. Geotechnical research analyzes rock mass properties, natural discontinuities affecting trench stability, and weathering patterns post-excavation. Hydraulic engineering studies document drainage networks, water table management, and seasonal flow patterns. Urban planning analysis examines trench network organization, access hierarchies, visual axes, and spatial relationships. Comparative research with other rock-cut sites reveals Lalibela\'s distinctive complete isolation approach versus Petra\'s facade-only or Ellora\'s hybrid methods. Conservation science addresses deterioration mechanisms including rainfall erosion, vegetation-induced damage, salt weathering, and anthropogenic impacts from tourism. Monitoring programs employ photogrammetry, laser scanning, and structural sensors tracking wall movement. Recent research questions traditional construction chronologies, with some scholars proposing multi-phase development rather than unified campaigns. Debates address labor organization, technical knowledge transmission, and the extent of external influence versus indigenous innovation. Contemporary conservation faces competing demands - maintaining drainage functionality, managing tourist access, preserving archaeological evidence, and respecting active religious use. Digital documentation enables analysis impossible with traditional methods - three-dimensional geometric relationships, tool mark classification, excavation sequence modeling, and structural behavior simulation. These approaches reveal aspects of planning and execution sophistication previously underappreciated in scholarship focused primarily on the churches themselves rather than their infrastructural contexts.',
  },

  characteristics: [
    'Deep channels carved into bedrock',
    'Vertical or near-vertical walls',
    'Completely isolate monolithic structures',
    'Create courtyard and circulation spaces',
    'Incorporate drainage channels',
    'Connect via tunnel networks',
    'Variable depths (5-12 meters)',
    'Geometric relationships with buildings',
  ],

  famousExamples: [
    {
      name: 'Biete Ghiorgis Trench',
      location: 'Lalibela, Ethiopia',
      year: 'c. 1200',
      description: 'Trapezoidal pit 25m x 25m at ground level, 12m deep, precisely isolating the Greek cross church',
    },
    {
      name: 'Northern Church Group Trenches',
      location: 'Lalibela, Ethiopia',
      year: 'c. 1180-1200',
      description: 'Interconnected trench system linking five churches through tunnel networks',
    },
    {
      name: '"Jordan River" Trench',
      location: 'Lalibela, Ethiopia',
      year: 'c. 1180-1200',
      description: 'Major trench symbolically dividing north and south church groups, representing biblical Jordan River',
    },
  ],

  confusionPairs: [
    {
      elementId: 'moat',
      reason: 'Both are excavated trenches around structures',
      distinction: 'Excavation trenches structurally isolate buildings from parent rock and create access courtyards; moats are water-filled defensive barriers around constructed buildings',
    },
    {
      elementId: 'cloister',
      reason: 'Both create courtyard spaces around religious buildings',
      distinction: 'Excavation trenches are carved into bedrock creating sunken courtyards; cloisters are constructed covered walkways around ground-level courtyards',
    },
    {
      elementId: 'archaeological-excavation',
      reason: 'Both involve digging into earth',
      distinction: 'Excavation trenches are intentional architectural elements carved during building construction; archaeological excavations are modern investigations revealing buried structures',
    },
  ],

  searchTags: [
    'ethiopia',
    'lalibela',
    'rock-cut',
    'excavation',
    'trench',
    'courtyard',
    'drainage',
    'tunnel',
    'monolithic',
    'subtractive',
    'zagwe',
    'infrastructure',
    'urban planning',
  ],

  arMetadata: {
    modelPath: '/models/architecture/excavation-trench.glb',
    scale: 3.0,
    rotatable: true,
    annotations: [
      { label: 'Trench Wall', position: { x: -0.4, y: 0.5, z: 0 } },
      { label: 'Drainage Channel', position: { x: 0, y: 0.1, z: 0 } },
      { label: 'Tunnel Connection', position: { x: 0.4, y: 0.3, z: -0.2 } },
      { label: 'Courtyard Floor', position: { x: 0, y: 0.15, z: 0 } },
      { label: 'Church Wall', position: { x: 0, y: 0.5, z: 0.3 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2026-01-29'),
  lastUpdated: new Date('2026-01-29'),
};
