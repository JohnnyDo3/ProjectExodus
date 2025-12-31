import type { ArchitecturalElement } from '../../types';

export const COPING: ArchitecturalElement = {
  id: 'coping',
  slug: 'coping',
  name: 'Coping',
  alternativeNames: ['Wall Cap', 'Cope', 'Coping Stone', 'Cap Stone'],
  pronunciation: {
    phonetic: 'KOH-ping',
    language: 'English',
  },
  etymology: {
    origin: 'Latin/French',
    meaning: 'To strike, cope, or cover',
    rootWord: 'From Latin "cappa" (cape, covering) via Old French "coper" (to strike, cut)',
  },
  category: 'WALL',
  subcategory: 'wall_features',
  periods: ['ANCIENT', 'MEDIEVAL', 'RENAISSANCE', 'MODERN', 'CONTEMPORARY'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/coping-primary.jpg',
    gallery: [
      '/images/architecture/elements/coping-stone.jpg',
      '/images/architecture/elements/coping-metal.jpg',
    ],
    diagram: '/images/architecture/diagrams/coping-types.svg',
  },

  description: {
    ELEMENTARY: 'Coping is like a protective hat for walls! It\'s the cap on top of walls that keeps rain from soaking into the wall and ruining it. Coping stones often stick out a little bit past the wall edge so water drips off instead of running down the wall face. You\'ll see coping on garden walls, bridge walls, and parapets on buildings.',
    MIDDLE_SCHOOL: 'Coping is the protective cap placed on top of freestanding walls, parapets, and piers to shed water away from the wall structure. Proper coping prevents water infiltration that causes freeze-thaw damage, efflorescence, and structural deterioration. Types include flat, sloped, saddle (peaked), and beveled. Materials include stone, concrete, metal, and terracotta. Key features: drip edge (undercut to prevent water tracking) and overhang beyond wall face.',
    HIGH_SCHOOL: 'Architectural coping serves critical weatherproofing and aesthetic functions atop walls. Design considerations include water shedding (sloped top surface), drip edge detailing (throat or kerf on underside), material durability (freeze-thaw resistance), and dimensional stability (thermal movement). Traditional stone coping features individual units with end joints sealed with mortar or lead. Metal coping (copper, aluminum, steel) offers continuous coverage with expansion joints. Improper coping design leads to accelerated wall deterioration through water infiltration, salt migration, and freeze-thaw cycling.',
    UNDERGRADUATE: 'Coping design integrates building physics, material science, and detailing craft. Effective coping requires: adequate slope (minimum 1:12) for drainage, overhang (minimum 1-2 inches) with drip edge, continuous waterproofing at joints, and accommodation of thermal movement. Material selection addresses durability (stone types, metal corrosion resistance), thermal conductivity (thermal breaks for metal coping), and aesthetic compatibility. Installation details include setting beds, joint sealants, and anchorage systems. Contemporary practice includes prefabricated systems with integrated waterproofing. Failure analysis often identifies coping deficiencies as primary moisture infiltration sources.',
    GRADUATE: 'Coping research addresses building envelope performance, material durability, and conservation technology. Investigations examine moisture transport mechanisms in wall assemblies, freeze-thaw deterioration patterns, and the effectiveness of various coping profiles. Material research includes stone weathering (salt crystallization, thermal cycling), metal corrosion in different exposures, and sealant longevity. Conservation challenges include matching historic materials, replicating complex profiles, and improving performance while maintaining historic character. Contemporary research develops high-performance coping systems for demanding exposures and sustainable materials (recycled content, low-embodied energy).',
    PHD: 'Coping scholarship engages building science, materials engineering, and architectural conservation. Research programs investigate the physics of moisture infiltration, quantifying the protective value of proper coping design through hygrothermal modeling and field monitoring. Material science research examines deterioration mechanisms-salt weathering of stone, corrosion of metals, degradation of sealants-and develops accelerated testing protocols. Conservation science addresses analysis of historic coping systems, documentation of regional traditions, and development of compatible repair materials. Current investigations address climate adaptation-designing coping for increased precipitation intensity and freeze-thaw cycles.',
  },

  history: {
    ELEMENTARY: 'People figured out thousands of years ago that walls last longer if you put a protective cap on top. Ancient civilizations used flat stones. Medieval castle builders used fancy carved stones for their wall tops. Today we use stone, concrete, or metal copings to protect everything from garden walls to skyscrapers.',
    MIDDLE_SCHOOL: 'Ancient civilizations (Egypt, Mesopotamia, Greece) used stone copings on significant walls. Roman engineering developed sophisticated coping profiles with drip edges. Medieval fortifications required durable coping atop parapets and curtain walls. Renaissance architecture refined coping proportions and profiles. Industrial era introduced cast stone and metal copings. Modern building science established performance requirements for coping systems based on moisture infiltration research.',
    HIGH_SCHOOL: 'Coping history reveals evolving understanding of building weathering. Ancient examples show intuitive water shedding-overhanging stones on perimeter walls. Roman engineering codified coping design: Vitruvius described proper overhang and drip edges. Medieval masons developed regional coping traditions-distinctive profiles in different stone regions. Gothic architecture employed elaborate carved copings with pinnacles and battlements. Industrial production enabled standardized concrete and metal copings. Twentieth-century building science quantified coping performance requirements, establishing standards for drip edges, slopes, and sealants.',
    UNDERGRADUATE: 'Coping evolution tracks construction technology and building science understanding. Roman concrete construction required effective coping to protect porous aggregate cores-carefully shaped stone copings survive on ancient walls. Medieval castle builders developed chamfered copings deflecting projectiles while shedding water. Renaissance theorists documented coping proportions related to wall thickness and projection. Victorian pattern books published coping profiles for various wall types. Modern testing (water spray, freeze-thaw cycles) established performance-based requirements. Contemporary practice balances traditional forms with modern materials (through-wall flashing, high-performance sealants).',
    GRADUATE: 'Historical analysis of coping examines the intersection of craft knowledge, material properties, and building performance. Research documents regional coping traditions, correlating profiles with local stone characteristics and climate. Archaeological investigation reveals ancient waterproofing techniques-lead joints, bitumen sealants. Conservation scholarship addresses deterioration patterns, correlating coping design with wall condition-poorly designed copings accelerate wall degradation. Contemporary research applies building science to historic walls: hygrothermal modeling guides conservation interventions, quantifying how improved coping affects moisture regimes in historic masonry.',
    PHD: 'Coping historiography engages construction history, material science, and conservation theory. Research programs investigate the transmission of technical knowledge through craft traditions and pattern books, document regional variations in coping design, and analyze the relationship between coping performance and wall longevity. Scientific investigation employs petrographic analysis (stone identification, weathering characterization), forensic investigation of failures (moisture mapping, salt analysis), and performance testing of historic and modern systems. Current scholarship addresses climate change adaptation-designing coping systems for more severe weather, increased precipitation, and greater freeze-thaw cycling.',
  },

  characteristics: [
    'Protective cap on top of walls',
    'Sheds water away from wall',
    'Projects beyond wall face (1-2+ inches)',
    'Includes drip edge on underside',
    'Common materials: stone, concrete, metal, terracotta',
    'Profiles: flat, sloped, saddle, beveled',
    'Critical for wall longevity',
  ],

  famousExamples: [
    { name: 'Great Wall of China Coping', location: 'China', year: '7th century BCE-17th century CE', description: 'Brick copings protecting the wall walk surface' },
    { name: 'Hadrian\'s Wall', location: 'Northern England', year: '122-128 CE', description: 'Roman stone copings on defensive wall sections' },
    { name: 'Alhambra Courtyard Walls', location: 'Granada, Spain', year: '14th century', description: 'Carved stone copings with Islamic geometric patterns' },
    { name: 'Central Park Stone Walls', location: 'New York City, USA', year: '1857-1873', description: 'Schist copings on rustic stone walls throughout the park' },
    { name: 'Fallingwater Terraces', location: 'Pennsylvania, USA', year: '1939', description: 'Cantilevered concrete copings by Frank Lloyd Wright' },
  ],

  confusionPairs: [
    {
      elementId: 'parapet',
      reason: 'Both are at the top of walls',
      distinction: 'Parapet is the wall itself extending above the roof; coping is the protective cap on top of the parapet',
    },
    {
      elementId: 'cornice',
      reason: 'Both are horizontal projecting elements',
      distinction: 'Cornice is the decorative top of a building wall/facade; coping is the functional water-shedding cap on freestanding walls',
    },
    {
      elementId: 'drip-edge',
      reason: 'Both shed water',
      distinction: 'Drip edge is a specific detail (undercut groove) on the underside of copings, cornices, and sills; coping is the entire wall cap',
    },
  ],

  searchTags: ['cap', 'wall', 'protection', 'weathering', 'stone', 'water', 'parapet', 'masonry', 'detail'],

  arMetadata: {
    modelPath: '/models/architecture/coping.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Sloped Top Surface', position: { x: 0, y: 0.2, z: 0 } },
      { label: 'Drip Edge', position: { x: 0.5, y: 0.1, z: 0 } },
      { label: 'Overhang', position: { x: 0.6, y: 0.15, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
