import type { ArchitecturalElement } from '../../types';

export const BATTLEMENT: ArchitecturalElement = {
  id: 'battlement',
  slug: 'battlement',
  name: 'Battlement',
  alternativeNames: ['Crenellation', 'Crenellated Parapet', 'Embrasure System'],
  pronunciation: {
    phonetic: 'BAT-ul-ment',
    language: 'Old French',
  },
  etymology: {
    origin: 'Old French',
    meaning: 'Fortified parapet',
    rootWord: 'bataillier (to fortify)',
  },
  category: 'FORTIFICATION',
  subcategory: 'wall_top',
  periods: ['medieval', 'romanesque', 'gothic', 'renaissance'],
  regions: ['NORTHERN_EUROPE', 'MIDDLE_EAST', 'MEDITERRANEAN'],

  images: {
    primary: '/images/architecture/elements/battlement-primary.jpg',
    gallery: [
      '/images/architecture/elements/battlement-castle.jpg',
      '/images/architecture/elements/battlement-tower.jpg',
    ],
    diagram: '/images/architecture/diagrams/battlement-detail.svg',
  },

  description: {
    ELEMENTARY: 'Battlements are the top parts of castle walls that look like teeth with gaps! The tall parts (merlons) protect soldiers, while the gaps (crenels) let them shoot arrows at enemies. It\'s like a giant stone shield with windows for fighting!',
    MIDDLE_SCHOOL: 'A battlement is a defensive parapet on top of a castle wall or tower, consisting of alternating raised sections (merlons) and openings (crenels or embrasures). Defenders stood behind the merlons for protection while using the crenels to shoot arrows or observe attackers. Battlements became the iconic symbol of medieval castles and fortifications.',
    HIGH_SCHOOL: 'The battlement is a parapet consisting of a series of merlons (solid upright sections) alternating with crenels (open gaps), providing defensive positions atop walls and towers. The system allows defenders to observe and fire upon attackers while maintaining protection by moving between crenels. Battlements typically include a walkway (wall-walk or allure) behind the parapet, sometimes protected by an inner parapet. Variations include merlons with arrow slits, crenels of varying widths, and decorative crenellation on non-military buildings. The right to crenellate (add battlements) was a feudal privilege requiring royal license in England.',
    UNDERGRADUATE: 'The battlement represents an efficient defensive solution balancing protection and offensive capability. The element\'s proportions evolved through military experience—merlon width typically equals or slightly exceeds crenel width, while merlon height provides head-to-shoulder protection for standing defenders. The system\'s effectiveness depended on adequate walkway width, parapet thickness, and coordination among defenders. Battlements evolved from simple rectangular forms to sophisticated designs including machicolations between merlons, covered walkways (hoardings), and decorative elaborations. Regional variations emerged—Middle Eastern battlements often featured smaller, more numerous crenels, while European forms showed greater standardization. The element\'s transition from military necessity to architectural symbol occurred as gunpowder rendered traditional defenses obsolete.',
    GRADUATE: 'The battlement embodies the intersection of military functionality and architectural expression in medieval fortification. Analysis reveals sophisticated defensive thinking—the alternating solid-void rhythm provided both protection and firing positions, while the walkway enabled rapid defender movement along wall tops. The element\'s evolution reflects changing military technology: early medieval simple crenellation proved adequate against arrows and siege engines, but later developments including machicolations, hoardings, and eventually gun loops responded to evolving threats. The battlement\'s symbolic dimension emerged early, with crenellation rights becoming feudal privileges signaling lordship. Post-medieval use primarily emphasized this symbolic function, with castles built for romantic effect rather than defense maintaining elaborate battlements.',
    PHD: 'The battlement constitutes a significant research area examining relationships between military technology, architectural form, and social symbolism. Scholarly work addresses the element\'s military effectiveness through experimental archaeology and historical siege accounts, revealing both capabilities and limitations. Archaeological studies document battlement construction techniques, modifications during buildings\' active defensive lives, and later alterations for aesthetic purposes. Legal history research examines crenellation licenses as indicators of feudal relationships and regional power structures. The battlement\'s transformation from functional element to romantic symbol reflects broader cultural shifts from military architecture to picturesque aesthetics. Conservation challenges include weathering of exposed parapet stones, structural movement, and appropriate reconstruction of damaged sections balancing historical accuracy with safety requirements.',
  },

  history: {
    ELEMENTARY: 'Ancient builders put battlements on castle walls over 3,000 years ago! Medieval knights and soldiers stood behind them to defend their castles. Even after castles stopped being needed for fighting, people kept adding battlements because they looked so cool!',
    MIDDLE_SCHOOL: 'Battlements appeared in ancient fortifications including Egyptian, Mesopotamian, and Greek walls. Medieval Europe systematized their use from the 9th century onward. The Crusades influenced European battlement design through exposure to Middle Eastern fortifications. By the late Middle Ages, battlements became decorative as well as defensive. After gunpowder rendered them militarily obsolete, battlements continued as romantic architectural features.',
    HIGH_SCHOOL: 'Battlement history spans from ancient prototypes through medieval military development to modern ornamental use. Ancient Near Eastern and Egyptian fortifications featured early crenellations. Roman fortifications employed battlements on city walls and frontier forts. Medieval European development systematized battlement design, with Carolingian and Norman architecture establishing standard forms. Crusader castles (Krak des Chevaliers, 1142-1271) showed sophisticated battlement systems. English law required licenses to crenellate from the 12th century, making battlements status symbols. Tudor and later architecture used battlements decoratively. Gothic Revival and Victorian architecture revived battlements for romantic effect.',
    UNDERGRADUATE: 'Battlement development reveals evolving military architecture responding to changing weapons and siege tactics. Ancient precedents including Assyrian and Greek fortifications established basic principles. Medieval refinement occurred through practical experience—early Norman keeps with simple crenellation evolved into complex 13th-century systems with multiple defensive features. The element\'s proportions stabilized around optimal dimensions balancing protection against exposure. Regional variations emerged: French battlements often incorporated machicolations, English forms favored solid merlons, and Islamic architecture developed distinctive crenellation patterns. The transition from military to symbolic function began before battlements became fully obsolete, with 15th-century domestic buildings incorporating decorative crenellation. This dual function—practical defense and status symbol—persisted through the medieval period.',
    GRADUATE: 'The battlement\'s history encompasses military technology evolution, architectural typology development, and cultural symbolism. Research reveals sophisticated medieval understanding of defensive architecture—battlement placement maximized firing coverage while minimizing exposed areas, walkway design enabled rapid troop movement, and merlon construction provided protection against increasingly powerful projectile weapons. The element\'s legal dimension, particularly English crenellation licenses, reveals feudal power structures and royal control over military capability. Archaeological evidence shows continuous modification of battlements responding to military developments, with later additions including gun loops and heightened parapets. The battlement\'s persistence in post-medieval architecture reflects romantic medievalism, with Tudor, Gothic Revival, and Victorian buildings employing crenellation for aesthetic and symbolic purposes divorced from military function.',
    PHD: 'Scholarly engagement with battlement history employs diverse methodologies: military history analyzing defensive effectiveness through siege accounts and experimental archaeology, architectural history tracing typological development, legal history examining crenellation licenses as social documents, and building archaeology revealing construction sequences and modifications. Recent research challenges assumptions about military determinism, showing aesthetic and symbolic considerations influenced medieval battlement design. Studies employ computer modeling to test battlement effectiveness against different weapons, while archaeological investigations reveal construction techniques and workforce organization. Conservation research addresses deterioration patterns specific to exposed parapets and develops appropriate intervention strategies. Contemporary work examines battlement representations in popular culture, tourism, and heritage interpretation, revealing how these elements shape modern perceptions of medieval architecture.',
  },

  characteristics: [
    'Alternating merlons (solid) and crenels (gaps)',
    'Located atop walls and towers',
    'Provides protection for defenders',
    'Enables observation and offensive action',
    'Walkway (wall-walk) behind parapet',
    'Symbol of fortification and feudal power',
  ],

  famousExamples: [
    { name: 'Tower of London', location: 'London, England', year: '1078-1399', description: 'Extensive Norman and medieval battlements' },
    { name: 'Carcassonne', location: 'Carcassonne, France', year: '12th-13th century', description: 'Elaborate medieval crenellations' },
    { name: 'Krak des Chevaliers', location: 'Syria', year: '1142-1271', description: 'Crusader castle battlements' },
    { name: 'Warwick Castle', location: 'Warwickshire, England', year: '1068-1604', description: 'Multiple periods of battlements' },
    { name: 'Alhambra', location: 'Granada, Spain', year: '1238-1391', description: 'Islamic-style crenellations' },
  ],

  confusionPairs: [
    {
      elementId: 'parapet',
      reason: 'Both are protective wall tops',
      distinction: 'Parapet is a solid low wall; battlement has alternating solid and open sections (merlons and crenels)',
    },
    {
      elementId: 'merlon',
      reason: 'Merlons are part of battlements',
      distinction: 'Merlon is the solid upright section; battlement is the complete system of merlons and crenels',
    },
  },

  searchTags: ['castle', 'fortification', 'wall', 'defense', 'medieval', 'crenel', 'merlon', 'parapet', 'tower', 'crenellation'],

  arMetadata: {
    modelPath: '/models/architecture/battlement.glb',
    scale: 1.5,
    rotatable: true,
    annotations: [
      { label: 'Merlon (Solid)', position: { x: 0, y: 0.9, z: 0 } },
      { label: 'Crenel (Gap)', position: { x: 0.3, y: 0.7, z: 0 } },
      { label: 'Wall-Walk', position: { x: 0, y: 0.4, z: 0 } },
      { label: 'Inner Parapet', position: { x: 0, y: 0.5, z: -0.3 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
