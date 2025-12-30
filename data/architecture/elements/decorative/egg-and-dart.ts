import type { ArchitecturalElement } from '../../types';

export const EGG_AND_DART: ArchitecturalElement = {
  id: 'egg-and-dart',
  slug: 'egg-and-dart',
  name: 'Egg-and-Dart',
  alternativeNames: ['Egg and Tongue', 'Egg and Anchor', 'Echinus Molding'],
  pronunciation: {
    phonetic: 'EGG-and-DART',
    language: 'English',
  },
  etymology: {
    origin: 'English descriptive',
    meaning: 'Named for the alternating egg-shaped and dart-shaped elements',
    rootWord: 'Descriptive term based on visual appearance',
  },
  category: 'DECORATIVE',
  subcategory: 'classical_ornament',
  periods: ['ANCIENT_GREEK', 'ANCIENT_ROMAN', 'RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL', 'BEAUX_ARTS'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'NORTHERN_EUROPE', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/egg-and-dart-primary.jpg',
    gallery: [
      '/images/architecture/elements/egg-and-dart-detail.jpg',
      '/images/architecture/elements/egg-and-dart-variations.jpg',
    ],
    diagram: '/images/architecture/diagrams/egg-and-dart-pattern.svg',
  },

  description: {
    ELEMENTARY: 'Egg-and-dart is a repeating pattern carved into molding that looks like eggs with arrows (darts) between them. Ancient builders thought this pattern was beautiful and used it to decorate important buildings. You can still see it on fancy buildings today!',
    MIDDLE_SCHOOL: 'Egg-and-dart is a decorative pattern consisting of alternating oval (egg) shapes and pointed (dart or arrow) shapes carved into an ovolo molding. It\'s one of the most recognizable classical ornament patterns, typically found on Ionic and Corinthian capitals, cornices, and door frames. The pattern creates a rhythmic, elegant appearance.',
    HIGH_SCHOOL: 'The egg-and-dart motif represents a canonical ornamental pattern in classical architecture, characterized by alternating convex ovoid forms and pointed dart or anchor shapes carved in relief. Typically applied to ovolo (quarter-round convex) moldings, this ornament appears prominently in Ionic and Corinthian orders. The pattern\'s origins likely relate to fertility symbolism, with variations appearing across different periods and regions.',
    UNDERGRADUATE: 'Egg-and-dart ornament constitutes a key element in the classical vocabulary of architectural enrichment, with specific applications governed by the architectural orders. The pattern traditionally adorns the echinus of Ionic capitals and ovolo moldings in entablatures. Proportional relationships dictate that eggs be approximately 1.5 times their width in height, with darts occupying roughly half the egg width. The motif\'s roots in Greek decorative arts suggest possible symbolic meanings related to life and protection.',
    GRADUATE: 'The egg-and-dart motif presents significant questions regarding the transmission of ornamental conventions and their meanings. While ancient sources don\'t explicitly explain the symbolism, Renaissance theorists and later scholars proposed various interpretations linking eggs to generation and darts to protection. Analysis of Greek and Roman examples reveals considerable variation in execution, from crisp, geometric forms to naturalistic treatments. The pattern\'s persistence through multiple revivals demonstrates its fundamental role in classical architectural language.',
    PHD: 'Critical examination of egg-and-dart ornament intersects multiple research domains: iconography, craft practice, proportional theory, and architectural semiotics. Questions include: What were the ancient symbolic meanings, if any? How did medieval builders reinterpret classical egg-and-dart when they encountered Roman remains? What role did Renaissance pattern books play in standardizing the motif? Contemporary research also addresses technical execution - hand carving versus mechanical reproduction - and conservation challenges. The motif\'s continued use in contemporary classicism raises theoretical questions about ornamental meaning in modern contexts.',
  },

  history: {
    ELEMENTARY: 'Ancient Greeks invented the egg-and-dart pattern over 2,500 years ago. They carved it by hand into marble on their temples. The Romans loved this pattern too and used it all over their empire. Builders have been copying this beautiful design ever since!',
    MIDDLE_SCHOOL: 'The egg-and-dart pattern originated in ancient Greece around the 6th-5th centuries BCE, appearing on Ionic capitals and moldings. Greek artisans likely drew inspiration from earlier Near Eastern designs. Romans adopted and spread the pattern throughout their empire. Renaissance architects revived egg-and-dart in the 1400s-1500s, and it became a standard ornament through the Neoclassical and Beaux-Arts periods.',
    HIGH_SCHOOL: 'Egg-and-dart ornament emerged in Archaic Greek architecture (6th century BCE), with early examples showing experimentation in form and spacing. By the Classical period (5th-4th centuries BCE), the pattern had been refined to characteristic proportions seen on the Erechtheion. Roman craftsmen produced both hand-carved and molded versions. Renaissance architects, studying Roman remains, codified the pattern in treatises, ensuring its continued use through subsequent classical revivals.',
    UNDERGRADUATE: 'The development of egg-and-dart ornament traces from possible origins in ancient Near Eastern palmette and lotus motifs through Greek refinement and Roman standardization. The Temple of Apollo at Bassae demonstrates transitional forms. By the Hellenistic period, egg-and-dart had become a conventional element of Ionic capitals. Roman workshops developed terra-cotta molds for mass production. Renaissance recovery of the motif relied heavily on studying the Temple of Fortuna Virilis and other Roman monuments, as few Greek examples were accessible.',
    GRADUATE: 'Scholarly analysis of egg-and-dart ornament addresses questions of origin, meaning, and transmission. While some scholars link the motif to Egyptian lotus patterns, others see independent Greek development. The alternation of ovoid and pointed forms may encode fertility and protective symbolism, though ancient textual evidence is lacking. Renaissance systematization, particularly in Vignola\'s and Palladio\'s treatises, created idealized versions that influenced centuries of practice. The 19th-century development of machine carving and composition ornament democratized egg-and-dart but raised questions about craft authenticity.',
    PHD: 'The egg-and-dart motif offers rich possibilities for interdisciplinary research combining archaeology, art history, and theory. Key questions include: How did regional Greek workshops develop distinct styles? What explains Roman preference for certain variant forms? How did Renaissance architects choose among competing ancient precedents? Contemporary research employs digital documentation to analyze proportional systems across historical examples, revealing greater variation than treatises suggest. Conservation science examines deterioration patterns and appropriate repair strategies. Theoretical inquiry addresses the motif\'s semiotic function and its role in contemporary classical practice.',
  },

  characteristics: [
    'Alternating egg-shaped and dart-shaped elements',
    'Carved in relief on ovolo moldings',
    'Eggs typically oval and convex',
    'Darts pointed, often resembling arrows or anchors',
    'Rhythmic repetition creates continuous pattern',
    'Typical of Ionic and Corinthian orders',
  ],

  famousExamples: [
    { name: 'Erechtheion Capital', location: 'Athens, Greece', year: '421-406 BCE', description: 'Classic Greek egg-and-dart on Ionic capitals' },
    { name: 'Temple of Portunus', location: 'Rome, Italy', year: '120-80 BCE', description: 'Roman egg-and-dart on Ionic order' },
    { name: 'Palazzo Rucellai', location: 'Florence, Italy', year: '1446-1451', description: 'Early Renaissance revival of egg-and-dart' },
    { name: 'Palace of Versailles', location: 'Versailles, France', year: '1661-1715', description: 'Elaborate Baroque egg-and-dart ornament' },
    { name: 'Marble House', location: 'Newport, Rhode Island, USA', year: '1888-1892', description: 'Beaux-Arts egg-and-dart in Gilded Age mansion' },
  ],

  confusionPairs: [
    {
      elementId: 'bead-and-reel',
      reason: 'Both are repeating classical ornament patterns',
      distinction: 'Egg-and-dart has oval eggs with pointed darts; bead-and-reel has round beads with disk-shaped reels',
    },
    {
      elementId: 'leaf-and-dart',
      reason: 'Similar name and structure',
      distinction: 'Egg-and-dart uses egg shapes; leaf-and-dart uses stylized leaves',
    },
  ],

  searchTags: ['ornament', 'molding', 'classical', 'ionic', 'pattern', 'carved', 'decoration', 'egg', 'dart', 'ovolo'],

  arMetadata: {
    modelPath: '/models/architecture/egg-and-dart.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Egg', position: { x: -0.05, y: 0, z: 0.05 } },
      { label: 'Dart', position: { x: 0.05, y: 0, z: 0.05 } },
      { label: 'Ovolo Molding', position: { x: 0, y: -0.05, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
