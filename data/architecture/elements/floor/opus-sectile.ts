import type { ArchitecturalElement } from '../../types';

export const OPUS_SECTILE: ArchitecturalElement = {
  id: 'opus-sectile',
  slug: 'opus-sectile',
  name: 'Opus Sectile',
  alternativeNames: ['Sectile Work', 'Cut Stone Inlay', 'Cosmati Pavement'],
  pronunciation: {
    phonetic: 'OH-pus SEK-til-ay',
    language: 'Latin',
  },
  etymology: {
    origin: 'Latin',
    meaning: 'Cut work',
    rootWord: 'From "opus" (work) and "sectilis" (cut)',
  },
  category: 'FLOOR',
  subcategory: 'paving',
  periods: ['ANCIENT_ROMAN', 'BYZANTINE', 'MEDIEVAL', 'RENAISSANCE', 'BAROQUE'],
  regions: ['MEDITERRANEAN', 'MIDDLE_EAST', 'WESTERN_EUROPE', 'NORTH_AFRICA'],

  images: {
    primary: '/images/architecture/elements/opus-sectile-primary.jpg',
    gallery: [
      '/images/architecture/elements/opus-sectile-roman.jpg',
      '/images/architecture/elements/opus-sectile-cosmati.jpg',
    ],
    diagram: '/images/architecture/diagrams/opus-sectile-pattern.svg',
  },

  description: {
    ELEMENTARY: 'Opus sectile is a fancy floor decoration made by cutting colorful marble and stones into shapes like circles, squares, and triangles, then fitting them together like a jigsaw puzzle! Ancient Romans used it in palaces to make floors that looked like paintings with precious stones.',
    MIDDLE_SCHOOL: 'Opus sectile is an ancient decorative technique where large pieces of colored marble, glass, or stone are cut into precise geometric or figurative shapes and fitted together to create patterns or images. Unlike mosaic which uses small uniform tesserae, opus sectile uses larger custom-cut pieces for dramatic effect.',
    HIGH_SCHOOL: 'Opus sectile flooring consists of precisely cut and shaped pieces of colored marble, porphyry, serpentine, and other decorative stones fitted together to form geometric patterns or pictorial scenes. The technique originated in ancient Rome and was later refined in Byzantine and medieval Cosmati workshops. Each piece is individually shaped to fit perfectly with its neighbors, creating seamless inlaid designs.',
    UNDERGRADUATE: 'Opus sectile represents advanced stone-working technology requiring sophisticated design planning, material selection, and cutting precision. Roman production involved sawing expensive marbles (porphyry, pavonazzetto) into thin plaques, scoring designs, and fitting pieces into prepared mortar beds. The technique distinguished itself from tessellation through larger module size and custom shaping. Medieval Cosmati masters revived the technique, combining opus sectile with glass mosaic for liturgical pavements.',
    GRADUATE: 'Analysis of opus sectile engages material procurement networks, workshop specialization, and design transmission. The technique required access to imperial quarries (Egyptian porphyry, Phrygian pavonazzetto), specialized stone-cutting tools, and geometric expertise. Scholarly investigation addresses the distinction between opus sectile proper (cut shapes) and sectilia (thin veneers), regional variations in pattern repertoires, and the conservation challenges of delaminating stone plaques.',
    PHD: 'Opus sectile research integrates classical archaeology, material science, and conservation methodology. Scientific analysis-petrographic identification, isotope studies-reconstructs material sourcing and trade patterns. Technical study examines cutting technologies, adhesive mortars, and installation sequences. Conservation challenges include mortar failure, stone delamination, and matching replacement materials. Contemporary scholarship addresses the technique\'s role in imperial display and the transmission of geometric knowledge through pattern books.',
  },

  history: {
    ELEMENTARY: 'The Romans invented opus sectile over 2,000 years ago to decorate the homes of emperors and rich families. They brought colorful stones from Egypt, Greece, and Turkey. After Rome fell, Italian artists in the 1100s rediscovered how to make it and created beautiful church floors.',
    MIDDLE_SCHOOL: 'Opus sectile developed in Rome during the late Republican period (1st century BCE) and reached its peak under the Empire. Romans imported exotic marbles from throughout the Mediterranean-purple porphyry from Egypt, green serpentine from Greece. After decline in late antiquity, medieval Roman families (Cosmati) revived the technique in the 12th century for church pavements. Renaissance architects studied ancient examples for inspiration.',
    HIGH_SCHOOL: 'Roman opus sectile evolved from simple geometric patterns to complex figurative scenes by the 1st century CE. Major examples adorned imperial residences (Domus Aurea, Basilica of Junius Bassus). The technique declined with the Roman economy but survived in Byzantine contexts. Medieval revival began with the Cosmati family workshops in 12th-century Rome, creating distinctive pavements combining opus sectile with glass mosaic. These influenced Gothic and Renaissance floor design throughout Europe.',
    UNDERGRADUATE: 'The history of opus sectile reveals changing relationships between material value, craft specialization, and architectural patronage. Imperial Roman production required centralized quarry access and specialized workshops. The technique\'s labor intensity limited it to elite contexts. Medieval Cosmati workshops operated under different economic conditions, combining ancient porphyry recycling with contemporary marble sourcing. Pattern transmission occurred through workshop tradition and architectural treatises. Conservation of historical opus sectile requires understanding original mortars and stone-cutting technologies.',
    GRADUATE: 'Opus sectile historiography addresses production economics, imperial ideology, and craft transmission. Research examines quarry organization in Roman Egypt, workshop locations in Rome (marble yards near Tiber), and pattern book circulation. The medieval revival presents questions of knowledge transmission: did Cosmati craftsmen study ancient floors directly, or work from documented patterns? Contemporary conservation challenges include identifying original versus restored sections, developing compatible mortars, and addressing environmental degradation.',
    PHD: 'Scholarly investigation of opus sectile engages multiple disciplines: classical archaeology for production contexts, materials science for stone identification and sourcing, art history for iconographic analysis, and conservation science for deterioration mechanisms. Current research addresses quarry-to-floor supply chains using isotopic analysis, workshop organization through tool mark studies, and pattern dissemination through comparative analysis. Conservation methodology negotiates between preserving original materials and ensuring structural stability, particularly for delaminating stone plaques.',
  },

  characteristics: [
    'Large custom-cut stone pieces fitted precisely',
    'Expensive materials: porphyry, serpentine, marble',
    'Geometric or figurative patterns',
    'Pieces cut to exact shapes, not uniform',
    'Set in mortar bed, ground flat',
    'Higher status than mosaic tessellation',
    'Requires expert stone-cutting skills',
  ],

  famousExamples: [
    { name: 'Basilica of Junius Bassus', location: 'Rome, Italy', year: '4th century CE', description: 'Spectacular Roman opus sectile with geometric and figurative panels' },
    { name: 'Westminster Abbey Sanctuary Pavement', location: 'London, UK', year: '1268', description: 'Cosmati work commissioned by Henry III' },
    { name: 'Santa Maria in Cosmedin', location: 'Rome, Italy', year: '12th century', description: 'Medieval Cosmati floor with geometric patterns' },
    { name: 'Basilica di San Marco', location: 'Venice, Italy', year: '11th-13th century', description: 'Byzantine-influenced opus sectile and mosaic floors' },
    { name: 'Pantheon Floor', location: 'Rome, Italy', year: '2nd century CE (restored)', description: 'Roman geometric opus sectile in circles and squares' },
  ],

  confusionPairs: [
    {
      elementId: 'mosaic-floor',
      reason: 'Both use stone pieces set in mortar',
      distinction: 'Opus sectile uses large custom-cut pieces; mosaic uses small uniform tesserae',
    },
    {
      elementId: 'terrazzo',
      reason: 'Both create decorative stone floors',
      distinction: 'Opus sectile uses precisely shaped pieces in patterns; terrazzo uses random chips in matrix',
    },
    {
      elementId: 'intarsia',
      reason: 'Both are inlay techniques',
      distinction: 'Opus sectile is stone flooring; intarsia is wood furniture/paneling',
    },
  ],

  searchTags: ['flooring', 'roman', 'marble', 'inlay', 'cosmati', 'porphyry', 'geometric', 'byzantine', 'paving', 'cut stone'],

  arMetadata: {
    modelPath: '/models/architecture/opus-sectile.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Porphyry Circle', position: { x: 0, y: 0, z: 0 } },
      { label: 'Serpentine Triangle', position: { x: 0.2, y: 0, z: 0.2 } },
      { label: 'Marble Background', position: { x: -0.2, y: 0, z: 0.1 } },
    ],
  },

  difficultyScore: 4,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
