import type { ArchitecturalElement } from '../../types';

export const NYMPHAEUM: ArchitecturalElement = {
  id: 'nymphaeum',
  slug: 'nymphaeum',
  name: 'Nymphaeum',
  alternativeNames: ['Nymphaion', 'Ninfeo', 'Monumental Fountain', 'Sacred Grotto'],
  pronunciation: {
    phonetic: 'nim-FEE-um',
    language: 'Latin',
  },
  etymology: {
    origin: 'Greek/Latin',
    meaning: 'Shrine dedicated to nymphs',
    rootWord: 'From Greek "nymphaion" (sanctuary of the nymphs)',
  },
  category: 'GARDEN',
  subcategory: 'water_features',
  periods: ['ANCIENT_GREEK', 'ROMAN', 'RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL'],
  regions: ['GREECE', 'ITALY', 'ROMAN_EMPIRE', 'WESTERN_EUROPE'],

  images: {
    primary: '/images/architecture/elements/nymphaeum-primary.jpg',
    gallery: [
      '/images/architecture/elements/nymphaeum-ephesus.jpg',
      '/images/architecture/elements/nymphaeum-villa-giulia.jpg',
    ],
    diagram: '/images/architecture/diagrams/nymphaeum-structure.svg',
  },

  description: {
    ELEMENTARY: 'A nymphaeum is a fancy grotto or cave with fountains and statues! Ancient people believed nymphs (water spirits) lived in natural springs, so they built beautiful shrines with flowing water, sculptures, and cool stone rooms. These magical water rooms were perfect places to rest on hot days.',
    MIDDLE_SCHOOL: 'A nymphaeum is a monumental fountain structure, originally a shrine dedicated to water nymphs in Greek and Roman culture. It typically features a decorated architectural backdrop, niches with sculptures, and flowing water elements. Nymphaea range from simple grotto-like recesses to elaborate multi-story facades. They served both religious and practical purposes-honoring deities and providing public water access.',
    HIGH_SCHOOL: 'The nymphaeum is an architectural water feature combining fountain, sculpture, and grotto elements within a monumental framework. Classical examples integrated architectural orders, sculptural programs, and hydraulic engineering. The semicircular or rectangular plan typically features a rear wall with niches housing statuary, water flowing from multiple points, and a collecting basin. Renaissance and Baroque revivals reinterpreted the type as garden features.',
    UNDERGRADUATE: 'Nymphaeum design integrates architecture, sculpture, and hydraulic engineering to create immersive water environments. Classical examples employed engaged columns, entablatures, and pedimented niches to frame sculptural programs depicting mythological narratives. Water sources included natural springs or aqueduct supplies. The nymphaeum functioned as ceremonial space, water distribution point, and theatrical garden feature. Renaissance revivals emphasized grotto-like rustication and artificial stalactites.',
    GRADUATE: 'Nymphaeum analysis encompasses classical archaeology, garden history, and hydraulic engineering. Research examines the development from natural spring shrines to monumental urban fountains, the iconographic programs of sculptural decoration, and the technical achievement of water delivery systems. Renaissance reinterpretation transformed the nymphaeum from functional water source to pure garden ornament. Conservation challenges include managing water infiltration, stabilizing sculptural elements, and maintaining historic hydraulic systems.',
    PHD: 'Research into nymphaea addresses ancient religion, architectural theory, and engineering history. Investigations include the ritual significance of water in Greco-Roman religion, the formal development of nymphaeum architecture, and the reconstruction of ancient hydraulic technologies. Methodologies include epigraphic analysis of dedicatory inscriptions, hydraulic archaeology of water supply systems, and comparative iconographic study of sculptural programs. Current scholarship examines the cultural transmission of nymphaeum design from antiquity through Renaissance revival.',
  },

  history: {
    ELEMENTARY: 'Ancient Greeks built shrines at natural springs where they thought water nymphs lived. Romans made huge public nymphaea with beautiful sculptures and fountains. During the Renaissance, rich families built nymphaea in their gardens to look like ancient Roman ones-but these were just for decoration and fun!',
    MIDDLE_SCHOOL: 'Greek sacred springs inspired early nymphaea (7th century BCE onward). Roman examples became monumental-the Nymphaeum of Trajan featured a massive decorated facade. These served water distribution while honoring deities. Byzantine and Islamic traditions maintained the type. Renaissance Italy revived nymphaea as garden features (Villa Giulia, Villa Lante). Baroque examples amplified theatrical effects.',
    HIGH_SCHOOL: 'Classical nymphaea evolved from simple spring shrines to elaborate urban monuments. The Nymphaeum of Herodes Atticus (Athens, 2nd century CE) exemplified the monumental type. Roman examples combined religious dedication with practical water distribution-terminal points of aqueducts. Medieval tradition declined in the West but continued in Byzantine and Islamic architecture. Renaissance antiquarian interest revived the form as garden ornament divorced from religious function.',
    UNDERGRADUATE: 'Nymphaeum history reveals changing relationships between sacred space, public utility, and ornamental architecture. Ancient examples integrated religious ritual, water engineering, and civic benefaction. The type\'s formal development shows increasing architectural elaboration and sculptural complexity. Renaissance revival reinterpreted nymphaea as secular garden features referencing classical culture. The transformation from functional water source to pure ornament reflects broader shifts in garden function and meaning.',
    GRADUATE: 'Historical analysis of nymphaea examines religious practice, hydraulic technology, and architectural patronage. Research addresses the ritual function of water in ancient religion, the engineering of spring capture and aqueduct termini, and the political symbolism of nymphaeum construction as civic benefaction. Renaissance reinterpretation involved archaeological study of ancient remains and creative adaptation to garden contexts. Conservation challenges include managing groundwater, preserving sculptural elements, and interpreting fragmentary remains.',
    PHD: 'Nymphaeum scholarship engages multiple disciplines: ancient religion (water cult practices), archaeology (excavation and reconstruction), and architectural history (formal analysis and cultural transmission). Methodologies include epigraphic study of dedicatory inscriptions, hydraulic archaeology of water systems, iconographic analysis of sculptural programs, and comparative study of revival examples. Current research examines the relationship between nymphaea and ancient water management systems, the reception of classical nymphaea in Renaissance garden theory, and conservation strategies for ancient and historic examples.',
  },

  characteristics: [
    'Combines architecture, sculpture, and water',
    'Semicircular or rectangular plan',
    'Niches for statuary',
    'Multiple water sources and flows',
    'Grotto-like or monumental facade',
    'Classical architectural orders',
    'Often features rustication or stalactites',
  ],

  famousExamples: [
    { name: 'Nymphaeum of Trajan', location: 'Ephesus, Turkey', year: '102-114 CE', description: 'Roman monumental fountain with two-story facade' },
    { name: 'Nymphaeum at Villa Giulia', location: 'Rome, Italy', year: '1551-1555', description: 'Renaissance revival with grotto and caryatids' },
    { name: 'Nymphaeum at Villa Lante', location: 'Bagnaia, Italy', year: '1566-1578', description: 'Mannerist nymphaeum with water chain' },
    { name: 'Nymphaeum of Alexander Severus', location: 'Rome, Italy', year: '222-235 CE', description: 'Ancient Roman terminal nymphaeum of aqueduct' },
    { name: 'Nymphaeum at Stourhead', location: 'Wiltshire, UK', year: '1744', description: 'English landscape garden with classical temple-nymphaeum' },
  ],

  confusionPairs: [
    {
      elementId: 'grotto',
      reason: 'Both feature cave-like architecture with water',
      distinction: 'Nymphaea have classical architectural frameworks and religious origins; grottos are more naturalistic artificial caves',
    },
    {
      elementId: 'fountain',
      reason: 'Both are monumental water features',
      distinction: 'Nymphaea are architectural ensembles combining grotto, sculpture, and water; fountains focus on water display',
    },
  ],

  searchTags: ['water', 'grotto', 'fountain', 'classical', 'roman', 'renaissance', 'sculpture', 'niche', 'sacred'],

  arMetadata: {
    modelPath: '/models/architecture/nymphaeum.glb',
    scale: 0.4,
    rotatable: true,
    annotations: [
      { label: 'Architectural Facade', position: { x: 0, y: 1.5, z: -0.5 } },
      { label: 'Sculptural Niche', position: { x: 0.5, y: 1, z: -0.4 } },
      { label: 'Water Basin', position: { x: 0, y: 0, z: 0 } },
    ],
  },

  difficultyScore: 4,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
