import type { ArchitecturalElement } from '../../types';

export const CRENEL: ArchitecturalElement = {
  id: 'crenel',
  slug: 'crenel',
  name: 'Crenel',
  alternativeNames: ['Embrasure', 'Battlement Gap', 'Crenelle'],
  pronunciation: {
    phonetic: 'kreh-NEL',
    language: 'Old French',
  },
  etymology: {
    origin: 'Old French',
    meaning: 'Notch or gap',
    rootWord: 'crenel (from Latin crena, notch)',
  },
  category: 'FORTIFICATION',
  subcategory: 'wall_top',
  periods: ['medieval', 'romanesque', 'gothic'],
  regions: ['NORTHERN_EUROPE', 'MIDDLE_EAST', 'MEDITERRANEAN'],

  images: {
    primary: '/images/architecture/elements/crenel-primary.jpg',
    gallery: [
      '/images/architecture/elements/crenel-wide.jpg',
      '/images/architecture/elements/crenel-defensive.jpg',
    ],
    diagram: '/images/architecture/diagrams/crenel-function.svg',
  },

  description: {
    ELEMENTARY: 'A crenel is the gap or opening between the tall stone parts (merlons) on a castle wall. Soldiers stood in the crenels to shoot arrows at enemies, then ducked behind the merlons to stay safe. It\'s like a window for fighting!',
    MIDDLE_SCHOOL: 'The crenel, also called an embrasure, is the open space between merlons in a battlement. These gaps allowed castle defenders to observe approaching enemies, shoot arrows, and later fire guns. Defenders could move between crenels along the wall-walk while using merlons for protection between shots.',
    HIGH_SCHOOL: 'The crenel is the gap or opening in a crenellated parapet between adjacent merlons, providing a defensive firing position and observation point. Crenel width varied based on tactical requirements, typically ranging from 2 to 4 feet—wide enough for a defender to shoot through but narrow enough to limit exposure. The crenel opening extended from the wall-walk level to the top of the parapet, creating a vertical slot. Defenders could lean into the crenel to fire downward at attackers near the wall base or shoot outward at more distant targets. The ratio of crenel to merlon width influenced the battlement\'s defensive character, with narrower crenels providing more protection but reducing firing positions.',
    UNDERGRADUATE: 'The crenel represents a fundamental defensive element balancing offensive capability against protection. Its design evolved through practical military experience—width had to accommodate a defender with weapon (crossbow or longbow) while minimizing exposed area, depth (wall thickness) affected shooting angles, and height determined coverage zones. Medieval military architecture developed variations including splayed crenels (wider on the interior for better movement), crenels with removable wooden shutters for temporary closure, and later modifications for early firearms. The crenel\'s proportional relationship to merlons influenced overall defensive effectiveness—approximately equal widths became standard, though variations existed based on specific defensive requirements. Analysis of medieval siege accounts reveals how defenders used crenels tactically, with coordination among multiple positions providing overlapping fields of fire.',
    GRADUATE: 'The crenel embodies medieval defensive architecture\'s sophisticated understanding of tactical requirements and human factors. Research reveals careful consideration of multiple variables: crenel width balancing weapon accommodation against exposure time, wall thickness creating firing angles, parapet height affecting sight lines, and spacing between crenels determining defender density. Archaeological evidence shows evolution responding to weapons development—early crenels for archers evolved to accommodate crossbows, then later firearms. The element\'s effectiveness depended on the complete defensive system including machicolations, arrow slits in merlons, and hoarding providing additional protected positions. Documentary sources including medieval military manuals describe proper crenel use—shooting techniques, coordination between defenders, and protection protocols. The crenel\'s obsolescence followed artillery development, as solid parapets with gun loops proved more effective against cannon fire.',
    PHD: 'The crenel constitutes a significant element for examining medieval military architecture, defensive tactics, and human factors in fortification design. Scholarly research employs experimental archaeology reconstructing medieval archery and crossbow use from crenels, revealing capabilities and limitations. Visibility analysis using computer modeling determines coverage zones from different crenel positions. Archaeological studies document crenel modifications through building histories, showing tactical adaptations. Comparative research examines regional variations—European versus Middle Eastern crenel proportions, differences in Christian versus Islamic fortifications—revealing how military cultures developed distinctive approaches. Historical accounts of sieges provide information about actual crenel use in combat. Conservation challenges include weathered crenel edges, structural damage from impacts, and appropriate restoration balancing historical accuracy with visitor safety. Contemporary research examines crenels in heritage interpretation, analyzing how these elements communicate castle function to modern visitors.',
  },

  history: {
    ELEMENTARY: 'Ancient fortress builders made gaps in their walls so soldiers could see enemies and shoot arrows. Medieval castle builders perfected these gaps, called crenels, making them the right size for defending the castle. The pattern of gaps and solid parts became the classic castle look!',
    MIDDLE_SCHOOL: 'Crenels appeared in ancient fortifications from Mesopotamia and Egypt through Roman frontier forts. Medieval European castles developed standardized crenel designs from the 11th century onward. The Crusades influenced European crenel design through exposure to Middle Eastern fortress architecture. As gunpowder weapons emerged, crenels were modified with gun loops, but eventually solid parapets with specialized openings replaced traditional crenellations.',
    HIGH_SCHOOL: 'Crenel history parallels battlement development from ancient precedents through medieval refinement. Ancient Near Eastern fortifications featured simple crenellations providing observation and missile positions. Roman military architecture employed crenels in frontier fortifications and city walls. Norman castle building (11th-12th centuries) systematized crenel design with relatively standardized dimensions. The 12th-13th centuries saw refinement based on combat experience and Crusader exposure to sophisticated Middle Eastern fortifications. Late medieval period introduced modifications for firearms including widened bases and reinforced surrounds. Artillery development rendered traditional crenels obsolete by the 16th century, though decorative crenellations persisted in civilian architecture.',
    UNDERGRADUATE: 'Crenel development reveals evolution in defensive architecture responding to weapons and tactics. Early medieval crenels served archers using relatively short bows, with narrow openings limiting exposure. Development of the crossbow (11th-12th centuries) influenced crenel width—crossbows required different shooting stances and more space. Crusader castles showed Middle Eastern influence including varied crenel proportions and sophisticated defensive systems integrating crenels with other defensive features. Thirteenth-century military architecture optimized crenel designs, with treatises and building records indicating deliberate planning. The introduction of gunpowder weapons prompted modifications—late medieval crenels sometimes widened at the base for guns, though purpose-built gun loops eventually superseded traditional crenellations. Regional variations reflect different military traditions and threat environments.',
    GRADUATE: 'The crenel\'s history encompasses military technology evolution, tactical doctrine development, and practical combat experience shaping architectural form. Research documents how crenel design responded to specific weapons—dimensions accommodating different bow types, modifications for crossbows, adaptations for early firearms. Archaeological evidence including combat damage patterns reveals actual use in sieges, while medieval military manuals describe proper defensive techniques. Regional studies show distinctive approaches: French crenels often integrated with machicolations, English designs emphasized straightforward defensive function, Islamic architecture developed decorative crenellations alongside military forms. The transition from military to symbolic use occurred gradually—15th-century palace crenellations served status display rather than defense, while actual fortifications evolved toward gunpowder-era designs. Documentary evidence including building accounts and military specifications reveals how crenel standards were established and maintained.',
    PHD: 'Scholarly engagement with crenel history employs diverse methodologies: experimental archaeology testing medieval weapons from replica crenels, visibility analysis modeling sight lines and coverage zones, archaeological investigation documenting construction and modification, and historical research analyzing tactical doctrines and siege accounts. Recent work challenges assumptions about standardization, revealing greater variation in crenel design than previously recognized, with adaptation to local conditions and specific defensive requirements. Studies of medieval military manuals and siege narratives provide insights into actual crenel use in combat. Conservation research addresses crenel-specific deterioration including edge weathering, impact damage, and inappropriate historical modifications. Contemporary scholarship examines how crenels function in heritage tourism and castle interpretation, analyzing visitor understanding of defensive architecture and medieval warfare.',
  },

  characteristics: [
    'Open gap between merlons',
    'Typically 2-4 feet wide',
    'Extends from wall-walk to parapet top',
    'Allows observation and firing',
    'May be splayed wider inside',
    'Sometimes had removable shutters',
  ],

  famousExamples: [
    { name: 'Carcassonne', location: 'Carcassonne, France', year: '12th-13th century', description: 'Extensive medieval crenels with multiple defensive features' },
    { name: 'Krak des Chevaliers', location: 'Syria', year: '1142-1271', description: 'Crusader castle with sophisticated crenel systems' },
    { name: 'Conwy Castle', location: 'Wales', year: '1283-1289', description: 'Edwardian castle with well-preserved crenels' },
    { name: 'Tower of London', location: 'London, England', year: '1078-1399', description: 'Multiple periods of crenel construction' },
    { name: 'Château de Coucy', location: 'Coucy-le-Château, France', year: '1225-1242', description: 'Advanced medieval fortification crenels' },
  ],

  confusionPairs: [
    {
      elementId: 'merlon',
      reason: 'Both are parts of battlements',
      distinction: 'Crenel is the open gap; merlon is the solid upright section between crenels',
    },
    {
      elementId: 'arrow-slit',
      reason: 'Both are defensive openings',
      distinction: 'Crenel is an open parapet gap for shooting and observation; arrow slit is a narrow vertical slot in a wall or merlon',
    },
  },

  searchTags: ['battlement', 'castle', 'fortification', 'gap', 'opening', 'defense', 'medieval', 'embrasure', 'wall', 'shooting'],

  arMetadata: {
    modelPath: '/models/architecture/crenel.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Top Opening', position: { x: 0, y: 1.0, z: 0 } },
      { label: 'Firing Position', position: { x: 0, y: 0.7, z: 0 } },
      { label: 'Wall-Walk Level', position: { x: 0, y: 0.3, z: 0 } },
      { label: 'Adjacent Merlon', position: { x: 0.4, y: 0.7, z: 0 } },
    ],
  },

  difficultyScore: 1,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
