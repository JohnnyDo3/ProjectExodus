import type { ArchitecturalElement } from '../../types';

export const PORTCULLIS: ArchitecturalElement = {
  id: 'portcullis',
  slug: 'portcullis',
  name: 'Portcullis',
  alternativeNames: ['Sliding Gate', 'Drop Gate', 'Porte coulisse'],
  pronunciation: {
    phonetic: 'port-KUL-iss',
    language: 'Old French',
  },
  etymology: {
    origin: 'Old French',
    meaning: 'Sliding door',
    rootWord: 'porte coulisse (sliding door)',
  },
  category: 'FORTIFICATION',
  subcategory: 'entry_control',
  periods: ['medieval', 'romanesque', 'gothic', 'renaissance'],
  regions: ['NORTHERN_EUROPE', 'MEDITERRANEAN'],

  images: {
    primary: '/images/architecture/elements/portcullis-primary.jpg',
    gallery: [
      '/images/architecture/elements/portcullis-raised.jpg',
      '/images/architecture/elements/portcullis-mechanism.jpg',
    ],
    diagram: '/images/architecture/diagrams/portcullis-system.svg',
  },

  description: {
    ELEMENTARY: 'A portcullis is a heavy gate made of wood and iron bars that slides up and down in slots in a castle gateway! It drops down quickly from above to block the entrance when enemies attack. The pointed bottom tips could trap enemies underneath!',
    MIDDLE_SCHOOL: 'A portcullis is a vertically sliding gate, typically made of iron-reinforced wood or iron grillework, that protects castle gateways. It slides in vertical grooves cut into the gateway walls and is raised and lowered by chains or ropes attached to a windlass mechanism above. When lowered, the pointed iron tips at the bottom could trap or injure attackers. Castles often had multiple portcullises in a single gateway passage.',
    HIGH_SCHOOL: 'The portcullis is a heavy vertical sliding barrier, typically constructed of oak lattice reinforced with iron bands and terminating in pointed iron spikes. It operates in vertical grooves (coulisses) cut into the gateway masonry and is raised by chains or cables running over pulleys to a windlass mechanism in the gatehouse room above. The portcullis could be dropped rapidly in emergency (though controlled descent was typical) and provided multiple defensive advantages: blocking entry, trapping attackers between multiple portcullises, allowing defenders to fire through the grille at trapped enemies, and resisting battering and fire better than wooden doors. Medieval gatehouses often combined portcullises with other defenses including murder holes, arrow slits, and heavy doors.',
    UNDERGRADUATE: 'The portcullis represents sophisticated defensive engineering integrating mechanical, structural, and tactical innovations. The element\'s construction required precision manufacturing—the lattice frame (typically 3-4 inch oak timbers) had to slide smoothly in masonry grooves while heavy iron reinforcement (bands and spikes) added weight for effective dropping. The raising mechanism employed mechanical advantage through windlass and pulley systems, though even with these aids, raising heavy portcullises (some weighing over a ton) required substantial effort. Tactical deployment varied: single portcullises provided basic gateway protection, while complex gatehouses featured multiple portcullises with "killing zones" between them. The pointed bottom spikes served multiple functions: improving drop penetration, trapping enemies, and preventing lifting from below. Archaeological evidence reveals various portcullis designs from simple grilles to elaborate multi-ton mechanisms.',
    GRADUATE: 'The portcullis embodies medieval mechanical engineering applied to defensive architecture. Analysis reveals sophisticated understanding of multiple engineering principles: the structural design balancing weight against operational feasibility, the mechanical systems providing necessary lifting forces, and the precise tolerances required for reliable operation. The element\'s tactical effectiveness derived from multiple characteristics: speed of closure (though slower than dramatic portrayals suggest), resistance to attack (iron bars resisting cutting, weight resisting lifting), ability to control access while maintaining visibility and ventilation, and integration with other defensive systems. Regional variations emerged—English castles favored heavy timber-and-iron portcullises, Continental fortifications sometimes used primarily iron construction, and later designs incorporated improvements based on operational experience. Documentary evidence including building accounts reveals portcullis construction costs and specialized craftsmen required. The element\'s decline followed changes in siege warfare—artillery bombardment rendered traditional gatehouses vulnerable, though portcullises persisted in some contexts into the gunpowder era.',
    PHD: 'The portcullis constitutes a significant element for examining medieval engineering, defensive technology, and the material culture of fortification. Scholarly research addresses multiple dimensions: mechanical engineering analysis of raising systems and operational characteristics, metallurgical studies of iron component fabrication, archaeological investigation of portcullis grooves and mechanism housing revealing design variations, and historical research examining construction accounts and operational records. Experimental archaeology reconstructs portcullis mechanisms, testing operational characteristics and revealing practical constraints. Studies of surviving portcullises document construction techniques, materials, and wear patterns from actual use. The element\'s tactical role in gateway defense receives attention in military history research, with siege accounts describing portcullis operation and effectiveness. Regional studies reveal distinctive traditions in portcullis design and deployment. Conservation challenges include corrosion of iron components, wear of lifting mechanisms, and damage to groove masonry. Contemporary research examines portcullises in heritage interpretation, analyzing how these dramatic elements communicate medieval defensive technology.',
  },

  history: {
    ELEMENTARY: 'Ancient Romans used early versions of sliding gates, but medieval castle builders perfected the portcullis around 900 years ago. Famous castles like the Tower of London had multiple portcullises to make it almost impossible for enemies to break in!',
    MIDDLE_SCHOOL: 'The portcullis developed from ancient precedents including Roman city gate barriers. Medieval European castles systematically adopted portcullises from the 12th century onward, with designs becoming increasingly sophisticated. English castles particularly favored portcullises, often incorporating multiple examples in elaborate gatehouses. By the 14th century, portcullises were standard features in major fortifications. They remained in use into the gunpowder era before declining as castle defenses evolved.',
    HIGH_SCHOOL: 'Portcullis history traces from ancient prototypes through medieval refinement to early modern decline. Roman and Byzantine gates sometimes featured simple sliding barriers. The true portcullis emerged in medieval Europe by the 12th century, with early examples including simple wooden grilles. Thirteenth-century development produced more sophisticated designs with iron reinforcement and improved mechanisms—Edward I\'s Welsh castles (1277-1304) featured elaborate multi-portcullis systems. Fourteenth-century refinements included heavier construction and better mechanical systems. Late medieval and Tudor periods maintained portcullis use despite changing military technology. Post-medieval architecture occasionally incorporated decorative portcullises without functional mechanisms.',
    UNDERGRADUATE: 'Portcullis development reveals evolving defensive technology and mechanical engineering capabilities. Roman precedents including gate barriers at Pompeii established basic concepts. Medieval innovation created the distinctive medieval portcullis with its lattice construction, iron reinforcement, and windlass mechanism. Technological evolution included improved materials (better iron working), refined mechanics (more efficient raising systems), and tactical integration (multiple portcullises with coordinated operation). English military architecture particularly emphasized portcullises—Edwardian castles like Harlech and Beaumaris featured sophisticated multi-barrier gateway systems. Documentary evidence including building accounts reveals construction costs, material sources, and craftsmen involved. The portcullis\'s longevity compared to other medieval defensive features resulted from its effectiveness against traditional siege methods—battering, fire-setting, cutting through wooden doors. Only artillery bombardment effectively countered portcullises, leading to gradual obsolescence.',
    GRADUATE: 'The portcullis\'s history encompasses mechanical technology evolution, materials development, and defensive architecture sophistication. Research reveals progressive refinement in construction techniques—early lattice portcullises evolved toward heavier timber-and-iron hybrid construction, while some late medieval examples used primarily iron. Mechanical system development shows increasing sophistication in windlass designs, pulley arrangements, and chain/cable materials. Archaeological investigation documents portcullis groove wear patterns and damage, revealing operational histories. Regional variations emerged: English tradition favored heavy timber frames with iron reinforcement, French and continental designs showed more variation, and some fortifications experimented with specialized designs for specific tactical situations. The portcullis\'s integration with complete defensive systems receives scholarly attention, examining how portcullises coordinated with doors, murder holes, and other gateway defenses. Maintenance requirements and operational challenges documented in administrative records reveal practical aspects of portcullis use.',
    PHD: 'Scholarly engagement with portcullis history employs interdisciplinary methodologies: archaeological investigation documenting physical evidence, engineering analysis examining mechanical systems and operational characteristics, metallurgical study analyzing iron components, and historical research interpreting construction accounts and operational records. Recent work employs experimental archaeology reconstructing full-scale functional portcullises, revealing practical insights about construction, operation, and maintenance. Studies examine portcullis remains for evidence of combat damage, operational wear, and modifications. Comparative research documents regional variations and developmental trajectories. The element\'s symbolic dimension receives attention—portcullises as emblems of impregnability and feudal power. Conservation research addresses deterioration of surviving portcullises and associated mechanisms, developing appropriate intervention strategies. Contemporary scholarship examines portcullises in popular culture and heritage interpretation, analyzing how these elements shape public understanding of medieval castles and warfare.',
  },

  characteristics: [
    'Vertical sliding barrier',
    'Wood lattice with iron reinforcement',
    'Pointed iron spikes at bottom',
    'Slides in vertical masonry grooves',
    'Raised by windlass mechanism',
    'Often multiple in series',
  ],

  famousExamples: [
    { name: 'Tower of London', location: 'London, England', year: '11th-14th century', description: 'Multiple portcullises including Traitor\'s Gate' },
    { name: 'Harlech Castle', location: 'Wales', year: '1283-1290', description: 'Edwardian castle with sophisticated portcullis systems' },
    { name: 'Warwick Castle', location: 'Warwickshire, England', year: '14th century', description: 'Well-preserved gatehouse portcullises' },
    { name: 'Bodiam Castle', location: 'East Sussex, England', year: '1385', description: 'Intact portcullis grooves and mechanism housing' },
    { name: 'Château de Pierrefonds', location: 'Pierrefonds, France', year: '14th century (restored 19th)', description: 'Restored portcullis system' },
  },

  confusionPairs: [
    {
      elementId: 'drawbridge',
      reason: 'Both are movable gateway defenses',
      distinction: 'Drawbridge raises horizontally across moats; portcullis drops vertically in the gateway passage',
    },
    {
      elementId: 'gate',
      reason: 'Both control entry',
      distinction: 'Gate is a hinged door; portcullis is a vertical sliding grille that can trap attackers and allow firing through',
    },
  },

  searchTags: ['castle', 'fortification', 'gateway', 'sliding', 'gate', 'defense', 'medieval', 'iron', 'lattice', 'barrier', 'mechanism'],

  arMetadata: {
    modelPath: '/models/architecture/portcullis.glb',
    scale: 1.5,
    rotatable: true,
    annotations: [
      { label: 'Lifting Chains', position: { x: 0, y: 1.0, z: 0 } },
      { label: 'Iron Grille', position: { x: 0, y: 0.6, z: 0 } },
      { label: 'Pointed Spikes', position: { x: 0, y: 0.1, z: 0 } },
      { label: 'Groove Track', position: { x: 0.3, y: 0.5, z: 0 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
