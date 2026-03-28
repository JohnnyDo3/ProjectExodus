import type { ArchitecturalElement } from '../../types';

export const TOWER: ArchitecturalElement = {
  id: 'tower',
  slug: 'tower',
  name: 'Tower',
  alternativeNames: ['Keep', 'Donjon', 'Turris', 'Bergfried'],
  pronunciation: {
    phonetic: 'TOW-er',
    language: 'English',
  },
  etymology: {
    origin: 'Old English/Latin',
    meaning: 'A tall, narrow fortified structure',
    rootWord: 'From Old English "torr" and Latin "turris", from Greek "tyrris"',
  },
  category: 'FORTIFICATION',
  subcategory: 'defensive_structures',
  periods: ['ANCIENT', 'MEDIEVAL', 'RENAISSANCE', 'BAROQUE'],
  regions: ['WESTERN_EUROPE', 'MIDDLE_EAST', 'EAST_ASIA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/tower-primary.jpg',
    gallery: [
      '/images/architecture/elements/tower-castle-keep.jpg',
      '/images/architecture/elements/tower-city-wall.jpg',
    ],
    diagram: '/images/architecture/diagrams/tower-types.svg',
  },

  description: {
    ELEMENTARY: 'A tower is a tall, strong building used to watch for enemies and defend a castle or city. Soldiers could stand on top and see far away, and the thick walls kept everyone safe inside. Some towers are round and some are square!',
    MIDDLE_SCHOOL: 'Fortification towers are tall defensive structures built into castle walls or standing alone as keeps. They provided height advantage for archers, observation of approaching enemies, and secure refuge during sieges. Towers come in various shapes — round towers deflected projectiles better, while square towers offered more interior space.',
    HIGH_SCHOOL: 'The fortification tower serves multiple military functions: elevated observation, flanking fire along curtain walls, and last-resort refuge (the keep or donjon). Design evolved from Roman square watchtowers through Norman rectangular keeps to the round towers of Edwardian concentric castles. Key features include thick walls (often 10+ feet), arrow loops, murder holes, and spiral staircases designed to disadvantage right-handed attackers ascending.',
    UNDERGRADUATE: 'Tower architecture reflects the evolving relationship between offensive and defensive technologies. Roman castra featured regularly spaced interval towers for wall-flanking fire. Medieval keeps (donjons) combined residential and military functions in vertical organization. The shift from square to round plans responded to mining and trebuchet threats — curved surfaces better distributed impact forces. Tower placement within castle complexes reveals sophisticated understanding of defensive geometry and overlapping fields of fire.',
    GRADUATE: 'Analysis of fortification towers reveals the dialectic between attack and defense technologies. The transition from shell keeps to towered curtain walls (exemplified by Edward I\'s Welsh castles) represents a revolution in defensive thinking — from passive resistance to active defense through flanking fire. Cross-cultural comparison with East Asian watchtowers, Islamic ribāṭ towers, and West African tata somba reveals convergent solutions to vertical defense. Conservation addresses structural assessment, material consolidation, and interpretation of ruined structures.',
    PHD: 'Tower research integrates castellology, military history, structural archaeology, and landscape studies. Current scholarship examines towers as instruments of lordship and territorial control beyond purely military function. Computational analysis of sight lines and fields of fire quantifies defensive effectiveness. Material studies using mortar analysis and dendrochronology refine construction chronologies. Post-medieval tower reuse — as prisons, residences, and romantic ruins — reveals changing cultural attitudes toward fortification.',
  },

  history: {
    ELEMENTARY: 'People have built towers for protection for thousands of years. Ancient Romans built watchtowers along their borders. In the Middle Ages, castles had tall towers called keeps where the lord lived. As cannons got stronger, towers had to change their design to survive attacks.',
    MIDDLE_SCHOOL: 'Fortification towers date back to ancient Mesopotamia and Egypt. Roman frontier defense relied on watchtower networks. Medieval Europe saw the golden age of tower construction — from Norman square keeps (Tower of London, 1066) to sophisticated round towers. The introduction of gunpowder gradually made tall, thin towers obsolete, leading to lower, thicker bastioned fortifications by the 16th century.',
    HIGH_SCHOOL: 'Tower evolution spans millennia of military architecture. Ancient examples include Jericho\'s tower (c. 8000 BCE), one of humanity\'s earliest monumental structures. Roman watchtowers (burgi) defended frontiers. The medieval period produced the most diverse tower types: Norman keeps, Welsh round towers, Italian tower houses. Gunpowder artillery prompted the shift to squat, angled bastions (trace italienne) by the 16th century, rendering vertical towers militarily obsolete.',
    UNDERGRADUATE: 'The fortification tower\'s evolution traces the history of siege warfare. Hellenistic advances in poliorcetics produced sophisticated tower designs (Helepolis siege tower). Roman interval towers on walls like Hadrian\'s Wall established spacing principles for mutual flanking support. Medieval innovation peaked with concentric castle planning (Beaumaris, Krak des Chevaliers). The tower\'s decline as a military form after gunpowder paradoxically coincided with its symbolic apotheosis in residential tower houses (Scottish, Irish, Italian).',
    GRADUATE: 'Historical analysis of fortification towers reveals complex interplay between technology, society, and landscape. Regional traditions — the torre of Italian communes, the peel towers of the Anglo-Scottish border, the atalayas of Al-Andalus — served distinct social and military purposes. The castellological debate over the relative importance of military versus residential functions continues to generate productive scholarship.',
    PHD: 'Tower studies currently engage with landscape archaeology (GIS analysis of intervisibility networks), materials science (mortar typologies for dating), and social history (towers as expressions of lordship). Interdisciplinary approaches examine the tower in its full cultural context — military, residential, symbolic, and economic — moving beyond purely functional interpretation.',
  },

  characteristics: [
    'Tall vertical structure with thick defensive walls',
    'Elevated position for observation and ranged defense',
    'Various plans: round, square, D-shaped, polygonal',
    'Arrow loops, murder holes, and machicolations',
    'Spiral staircases typically clockwise ascending',
    'Multiple floors for storage, habitation, and defense',
    'Often integrated into curtain wall systems',
  ],

  famousExamples: [
    { name: 'Tower of London (White Tower)', location: 'London, England', year: '1078', description: 'Norman keep that became the iconic symbol of English royal power' },
    { name: 'Krak des Chevaliers', location: 'Homs, Syria', year: '1142', description: 'Crusader castle with sophisticated concentric tower system' },
    { name: 'Torre di San Gimignano', location: 'San Gimignano, Italy', year: '1200s', description: 'Medieval tower houses symbolizing family power and prestige' },
    { name: 'Harlech Castle', location: 'Gwynedd, Wales', year: '1283', description: 'Edwardian concentric castle with massive twin-towered gatehouse' },
  ],

  confusionPairs: [
    {
      elementId: 'battlement',
      reason: 'Both are defensive castle features',
      distinction: 'A tower is a complete tall structure; a battlement is the notched parapet atop walls or towers',
    },
    {
      elementId: 'bell-tower',
      reason: 'Both are tall tower structures',
      distinction: 'Fortification towers serve military defense; bell towers serve religious/civic functions to house bells',
    },
  ],

  searchTags: ['castle', 'keep', 'donjon', 'fortification', 'defense', 'medieval', 'watchtower', 'military'],

  arMetadata: {
    modelPath: '/models/architecture/tower.glb',
    scale: 0.2,
    rotatable: true,
    annotations: [
      { label: 'Battlements', position: { x: 0, y: 1, z: 0 } },
      { label: 'Arrow Loop', position: { x: 0.5, y: 0.6, z: 0.3 } },
      { label: 'Entrance', position: { x: 0, y: 0.1, z: 0.5 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
