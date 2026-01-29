import type { ArchitecturalElement } from '../../types';

export const MONOLITHIC_CHURCH: ArchitecturalElement = {
  id: 'monolithic-church',
  slug: 'monolithic-church',
  name: 'Monolithic Church',
  alternativeNames: ['Rock-Cut Church', 'Rock-Hewn Church', 'Subtractive Architecture'],
  pronunciation: {
    phonetic: 'mon-oh-LITH-ik CHURCH',
    language: 'Greek/English',
  },
  etymology: {
    origin: 'Greek',
    meaning: 'Single stone',
    rootWord: 'monolithos (mono = single, lithos = stone)',
  },
  category: 'RELIGIOUS',
  subcategory: 'christian',
  periods: ['medieval-ethiopian', 'byzantine'],
  regions: ['EAST_AFRICA', 'ETHIOPIAN_HIGHLANDS'],

  images: {
    primary: '/images/architecture/elements/monolithic-church-primary.jpg',
    gallery: [
      '/images/architecture/elements/monolithic-church-biete-ghiorgis.jpg',
      '/images/architecture/elements/monolithic-church-carving.jpg',
    ],
    diagram: '/images/architecture/diagrams/monolithic-church-construction.svg',
  },

  description: {
    ELEMENTARY: 'A monolithic church is carved from one huge piece of solid rock - like sculpting a giant statue! Workers dug down from the top, carving away rock to reveal the church inside. The most famous one looks like a giant cross when you look down at it from above!',
    MIDDLE_SCHOOL: 'Monolithic churches are entire buildings carved from single pieces of living rock through subtractive architecture - creating by removing material rather than adding it. Ethiopian builders carved 11 churches at Lalibela using top-down excavation, digging trenches around the perimeter to isolate each structure. Unlike normal buildings with foundations, walls, and roofs built separately, these churches are single continuous stone masses with no seams or mortar.',
    HIGH_SCHOOL: 'Monolithic churches represent a unique architectural paradigm where buildings are created entirely through excavation rather than construction. The process begins by tracing the building perimeter on the rock surface, then carving deep trenches to isolate the main mass. Workers carved from top to bottom, shaping the exterior while simultaneously hollowing the interior. The Ethiopian examples at Lalibela (12th-13th century) were carved from volcanic basalt using only hand tools - chisels, axes, hammers, and blades. The structures maintain complete structural integrity with their parent rock while featuring sophisticated architectural elements including columns, vaults, and decorative details, all carved from the same stone.',
    UNDERGRADUATE: 'Monolithic church construction exemplifies subtractive architecture, a paradigm fundamentally different from additive building traditions. The technique requires inverse planning - architects must envision the final form while designing excavation sequences. Lalibela\'s churches demonstrate sophisticated engineering: excavation trenches serve multiple functions including structural isolation, drainage, ceremonial access, and interconnection through tunnel networks. The buildings combine architectural influences - Axumite traditions (alternating recessed/projecting layers), Byzantine Christian forms (cruciform plans, barrel vaults), and indigenous innovations (complete structural monolithicity). Material considerations include working with porous basaltic scoriae, managing underground water tables, and exploiting the rock\'s natural stratification. Structural advantages include earthquake resistance (no joints to fail), temperature stability, and eternal durability since weathering cannot separate components.',
    GRADUATE: 'Monolithic church architecture reveals remarkable sophistication in structural planning, geometric precision, and theological symbolism. The construction methodology inverts traditional architectural practice - plans must account for three-dimensional excavation sequences while maintaining structural integrity at every stage. Ethiopian builders developed specialized knowledge of basalt properties, including natural fracture planes, water infiltration patterns, and carving techniques for different rock densities. The four categories of Lalibela churches (fully monolithic vs. semi-monolithic) demonstrate progressive mastery of isolation techniques. Architectural analysis reveals intentional simulation of constructed architecture - carved beams imitating timber construction, column capitals suggesting separate elements, and facade articulation resembling built stone courses. This representational layer suggests theoretical understanding of architectural vocabulary beyond mere excavation. Theological dimensions include the New Jerusalem concept, with church placement and interconnection creating a sacred landscape. UNESCO documentation and conservation science address unique preservation challenges including water infiltration, structural monitoring of excavated forms, and tourism impact.',
    PHD: 'Monolithic church architecture constitutes a critical case study for examining architectural cognition, material practice, and cultural transmission. Recent photogrammetric surveys and structural analysis challenge traditional chronologies and attribution narratives, suggesting construction may have occurred over longer periods with multiple workshop traditions. Computational modeling examines stress distribution in excavated forms, revealing sophisticated empirical understanding of structural behavior despite absence of written technical treatises. Comparative analysis with other rock-cut traditions (Petra, Ellora, Cappadocia) reveals both universal excavation principles and culturally specific innovations. The relationship between architectural form and liturgical practice demonstrates adaptation of Byzantine spatial programs to subtractive construction constraints. Debate continues regarding construction dating, workshop organization, and the role of external influences versus indigenous innovation. Contemporary research employs interdisciplinary approaches: structural geology informing understanding of site selection and excavation feasibility, architectural archaeology documenting construction sequences through tool marks and aborted excavations, liturgical studies analyzing spatial organization, and conservation science developing monitoring systems for excavated structures. The churches present unique heritage challenges including managing groundwater, monitoring structural stability without traditional load paths, and balancing tourism access with preservation of fragile rock surfaces.',
  },

  history: {
    ELEMENTARY: 'King Lalibela of Ethiopia wanted to create a "New Jerusalem" so Christians wouldn\'t have to travel to the real Jerusalem. In the 12th century, his workers carved 11 amazing churches from solid rock. The churches took many years to build - legend says angels helped finish them!',
    MIDDLE_SCHOOL: 'The rock-cut churches of Lalibela were created during Ethiopia\'s Zagwe Dynasty (12th-13th century), commissioned by King Lalibela. According to tradition, the king wanted to create a pilgrimage site after Muslim conquests made travel to Jerusalem difficult. Over approximately 24 years, workers carved 11 churches from volcanic basalt. The churches were designed as a symbolic New Jerusalem with features named after biblical locations. The site remains an active pilgrimage destination and became a UNESCO World Heritage Site in 1978.',
    HIGH_SCHOOL: 'Monolithic church construction at Lalibela occurred during the Zagwe Dynasty reign of King Lalibela (r. c. 1181-1221), though recent research suggests construction may have spanned longer periods. The 11 churches are organized into two main groups separated by a Jordan River representation. The northern group includes Biete Medhane Alem (largest rock-hewn church in the world), while the southern group features Biete Ghiorgis, the most architecturally refined with its Greek cross plan. Construction required extraordinary organization - excavating over 3,400 cubic meters of rock for Biete Ghiorgis alone, while maintaining structural integrity. The churches show Axumite architectural influence (Ethiopia\'s earlier kingdom) combined with Byzantine Christian forms introduced through Egyptian Coptic connections. The site served political functions (legitimizing Zagwe rule) and religious purposes (creating Ethiopian sacred geography independent of Jerusalem).',
    UNDERGRADUATE: 'The Lalibela churches\' construction context reveals complex intersections of religious devotion, political legitimacy, architectural innovation, and cultural identity. The Zagwe Dynasty (1137-1270) succeeded the Aksumite kingdom, facing legitimacy challenges from Solomonic claimants. Monumental architecture served to establish authority while creating distinctively Ethiopian Christian sacred space. Scholarly debate addresses construction chronology - hagiographic traditions attribute all 11 churches to King Lalibela\'s reign, but architectural analysis suggests some churches may predate him while others were completed after. The churches demonstrate knowledge of Byzantine architecture despite Ethiopia\'s relative isolation, likely transmitted through Egyptian Coptic connections. Rock-cut construction built on earlier Ethiopian traditions (Tigray region rock churches) while achieving unprecedented scale and sophistication. The architectural program creates theological geography: church names reference Jerusalem sites (Golgotha, Calvary), the Jordan River divides church groups, and underground passages suggest catacombs. This architectural pilgrimage destination maintained Ethiopian Christianity during periods of Islamic expansion and external pressure. Portuguese contact (16th century) brought European awareness, though isolation preserved architectural integrity until 20th-century tourism.',
    GRADUATE: 'Monolithic church architecture at Lalibela must be understood within Ethiopia\'s distinctive Christian architectural tradition, pre-Aksumite building practices, and medieval political dynamics. Archaeological evidence suggests rock-cut architecture in Ethiopia predates Lalibela, with Tigray region examples possibly dating to earlier centuries. The Zagwe Dynasty period saw intensification and monumentalization of this tradition, possibly involving multiple royal patrons beyond King Lalibela. Recent dendrochronological and structural analysis challenges unified construction narratives, suggesting multiple building campaigns with evolving architectural sophistication. The churches reveal selective adoption of external influences - Byzantine spatial planning, Coptic decorative programs, possibly Nubian construction techniques - integrated with indigenous architectural vocabulary including Axumite timber-beam simulation and Ethiopian cross motifs. The rock-cut paradigm enabled architectural forms difficult or impossible with conventional construction: Biete Ghiorgis\'s Greek cross plan carved from single rock mass demonstrates geometric precision and structural daring. Conservation challenges emerged with increased tourism (UNESCO designation 1978), water infiltration issues, and earthquake vulnerability assessment. Contemporary scholarship employs geotechnical analysis, 3D documentation, and comparative studies with other rock-cut traditions to understand construction methodologies, workshop organization, and architectural decision-making within subtractive building constraints.',
    PHD: 'Scholarly engagement with Lalibela\'s monolithic churches addresses historiographic questions, construction technology, architectural cognition, and conservation science. Critical examination of hagiographic sources (Gadla Lalibela) and oral traditions reveals complex narratives shaped by dynastic politics and religious legitimation. Dating methodologies employing architectural style analysis, excavation sequence reconstruction, and limited radiocarbon evidence produce contested chronologies with some scholars proposing construction spanning three centuries rather than single-reign attribution. Structural engineering research examines rock mass assessment, excavation stability during construction, and seismic vulnerability analysis given Ethiopia\'s tectonically active location. Architectural analysis investigates the relationship between subtractive construction and formal vocabulary - whether carved details faithfully reproduce built prototypes or represent creative adaptations. Comparative studies with other rock-cut sites (Petra, Ellora, Cappadocia, Tigray) reveal both technological commonalities and cultural particularities in excavation techniques, structural solutions, and symbolic programs. Recent photogrammetric surveys enable detailed documentation for conservation planning and virtual reconstruction of weathered or damaged features. Heritage management research addresses challenges including groundwater management systems, structural monitoring of excavated forms, visitor impact mitigation, and balancing active religious use with preservation requirements. Contemporary debates engage questions of indigenous innovation versus external influence, the role of oral vs. written transmission in construction knowledge, and methodologies for studying architecture without traditional archival documentation.',
  },

  characteristics: [
    'Carved from single piece of living rock',
    'Top-down excavation methodology',
    'No seams, mortar, or foundations',
    'Complete structural continuity with parent rock',
    'Excavation trenches forming courtyards',
    'Internally hollowed with carved details',
    'Simulation of constructed architecture',
    'Earthquake-resistant monolithic construction',
  ],

  famousExamples: [
    {
      name: 'Biete Ghiorgis (Church of St. George)',
      location: 'Lalibela, Ethiopia',
      year: 'c. 1200',
      description: 'Greek cross plan carved 12 meters deep, most architecturally refined of Lalibela churches, symbol of Ethiopian Christianity',
    },
    {
      name: 'Biete Medhane Alem',
      location: 'Lalibela, Ethiopia',
      year: 'c. 1180-1200',
      description: 'Largest monolithic rock-cut church in the world, measuring 33.7m x 23.7m x 11.5m high, with 72 columns and 5 aisles',
    },
    {
      name: 'Biete Maryam',
      location: 'Lalibela, Ethiopia',
      year: 'c. 1180-1200',
      description: 'Possibly oldest of the Lalibela churches, featuring elaborate interior carving and ceiling paintings',
    },
    {
      name: 'Debre Damo',
      location: 'Tigray, Ethiopia',
      year: 'c. 6th century',
      description: 'Earlier Ethiopian rock-cut monastery accessible only by rope climb, demonstrating pre-Lalibela rock excavation tradition',
    },
  ],

  confusionPairs: [
    {
      elementId: 'cave-architecture',
      reason: 'Both involve excavation into rock',
      distinction: 'Monolithic churches are fully carved free from surrounding rock with complete exterior facades; cave architecture retains rock face as entrance and is excavated inward',
    },
    {
      elementId: 'rock-cut-tomb',
      reason: 'Both use subtractive construction techniques',
      distinction: 'Monolithic churches are fully isolated structures with all sides exposed; rock-cut tombs are excavated into cliff faces with only the entrance facade visible',
    },
    {
      elementId: 'stone-masonry-church',
      reason: 'Visual similarity when carved details imitate built construction',
      distinction: 'Monolithic churches are single continuous rock masses created by subtraction; masonry churches are assembled from separate stones using mortar',
    },
  ],

  searchTags: [
    'ethiopia',
    'lalibela',
    'rock-cut',
    'excavation',
    'monolithic',
    'subtractive',
    'zagwe',
    'christian',
    'church',
    'unesco',
    'medieval',
    'biete ghiorgis',
    'single stone',
    'carved',
    'african architecture',
  ],

  arMetadata: {
    modelPath: '/models/architecture/monolithic-church.glb',
    scale: 3.0,
    rotatable: true,
    annotations: [
      { label: 'Excavation Trench', position: { x: -0.5, y: 0.2, z: 0 } },
      { label: 'Carved Facade', position: { x: 0, y: 0.6, z: 0.3 } },
      { label: 'Triple-Stepped Platform', position: { x: 0, y: 0.1, z: 0 } },
      { label: 'Greek Cross Plan', position: { x: 0, y: 0.9, z: 0 } },
      { label: 'Continuous Rock Mass', position: { x: 0.3, y: 0.4, z: -0.2 } },
    ],
  },

  difficultyScore: 4,
  dateAdded: new Date('2026-01-29'),
  lastUpdated: new Date('2026-01-29'),
};
