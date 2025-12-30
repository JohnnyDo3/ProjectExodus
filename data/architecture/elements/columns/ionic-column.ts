import type { ArchitecturalElement } from '../../types';

export const IONIC_COLUMN: ArchitecturalElement = {
  id: 'ionic-column',
  slug: 'ionic-column',
  name: 'Ionic Column',
  alternativeNames: ['Ionic Order', 'Greek Ionic', 'Scroll Column'],
  pronunciation: {
    phonetic: 'eye-ON-ik',
    language: 'English',
  },
  etymology: {
    origin: 'Greek',
    meaning: 'Named after the Ionian Greeks of Asia Minor who developed it',
    rootWord: 'Iōnikos (Ἰωνικός)',
  },
  category: 'COLUMN',
  subcategory: 'column_orders',
  periods: ['ANCIENT_GREEK', 'ANCIENT_ROMAN', 'RENAISSANCE', 'NEOCLASSICAL', 'BEAUX_ARTS'],
  regions: ['MEDITERRANEAN', 'MIDDLE_EAST', 'NORTHERN_EUROPE', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/ionic-column-primary.jpg',
    gallery: [
      '/images/architecture/elements/ionic-erechtheion.jpg',
      '/images/architecture/elements/ionic-capital-detail.jpg',
    ],
    diagram: '/images/architecture/diagrams/ionic-order.svg',
  },

  description: {
    ELEMENTARY: 'The Ionic column is like Doric\'s fancier cousin! It\'s taller and thinner, and the top has beautiful spiral scrolls called volutes that look like rams\' horns or seashells. It also has a decorated base at the bottom, unlike the plain Doric.',
    MIDDLE_SCHOOL: 'The Ionic order is more elegant than Doric, with slender proportions and distinctive scroll-shaped decorations called volutes on its capital. It stands on a molded base and has 24 narrow flutes separated by flat bands (fillets). The Greeks considered it a more "feminine" order.',
    HIGH_SCHOOL: 'The Ionic order, originating in 6th century BCE Ionia (western Turkey), is characterized by its volute capital, slender proportions (height 8-9 times diameter), and attic base. The volutes represent stylized ram\'s horns or nautilus shells. Unlike Doric, the Ionic frieze is continuous rather than divided into triglyphs and metopes.',
    UNDERGRADUATE: 'The Ionic order represents East Greek architectural innovation, synthesizing influences from Aeolic capitals, Near Eastern ornament, and Egyptian lotus forms. Its proportional system establishes greater attenuation than Doric, with canonical height-to-diameter ratios around 9:1. The continuous frieze enables narrative sculptural programs, as at the Parthenon\'s interior colonnade.',
    GRADUATE: 'The Ionic order\'s development reflects complex cultural exchanges across the ancient Mediterranean. The volute capital appears in multiple variations—diagonal, four-sided (as at the Temple of Athena Nike)—indicating ongoing experimentation. Vitruvian associations with feminine grace have been critically examined as later rationalizations of formal differences.',
    PHD: 'Ionic order studies engage questions of cultural transmission, workshop practices, and architectural symbolism. The order\'s origins in Ionia, its relationship to Aeolic and Near Eastern precedents, and its adoption in mainland Greece constitute active research areas. Analysis of specific monuments reveals considerable variation in proportions, base profiles, and capital forms that complicate canonical descriptions.',
  },

  history: {
    ELEMENTARY: 'The Ionic column was invented by Greeks living in what is now Turkey, about 2,500 years ago. A famous Ionic building is the Temple of Athena Nike on the Acropolis in Athens—it\'s small but beautiful! The scrolls on top make it easy to recognize.',
    MIDDLE_SCHOOL: 'The Ionic order developed in the Greek cities of Ionia (now Turkey) around 560 BCE. The Temple of Artemis at Ephesus, one of the Seven Wonders of the Ancient World, was Ionic. The Erechtheion on the Athenian Acropolis shows perfect Ionic design. Romans loved Ionic and used it extensively.',
    HIGH_SCHOOL: 'Ionic emerged in eastern Greece around the mid-6th century BCE, with early examples at Samos and Ephesus. The order reached Athens in the late 5th century, appearing in the Erechtheion and Temple of Athena Nike. Roman Ionic, as described by Vitruvius, standardized the four-sided capital addressing the "corner problem" that plagued two-sided Greek versions.',
    UNDERGRADUATE: 'The Ionic order\'s development can be traced through monuments from the Archaic Temple of Hera at Samos through the Classical Erechtheion. The order\'s transmission to mainland Greece accompanied cultural exchanges during the Persian Wars. Hellenistic and Roman adaptations include the four-faced capital (attributed to Callimachus), the angular capital, and varied base profiles.',
    GRADUATE: 'Ionic order historiography addresses contested questions of origins, transmission, and meaning. Aeolic capitals, Near Eastern palmettes, and Egyptian lotus forms all contribute to the order\'s formal vocabulary. The association of Ionic with female proportions in Vitruvius reflects Roman-era gender symbolism that may not reflect Greek understandings.',
    PHD: 'Advanced Ionic studies examine workshop traditions, proportional systems, and semantic functions across historical contexts. The relationship between architectural orders and Greek ethnic identities (Dorian/Ionian) is now understood as a later construct. Reception studies trace Ionic\'s deployment from Renaissance treatises through Beaux-Arts academicism to modernist rejections.',
  },

  characteristics: [
    'Volute (scroll) capital - the defining feature',
    'Slender proportions (height 8-9× diameter)',
    '24 narrow flutes with flat fillets between',
    'Attic or Asiatic base',
    'Continuous frieze without triglyphs',
    'Egg-and-dart molding on capital',
  ],

  famousExamples: [
    { name: 'Erechtheion', location: 'Athens, Greece', year: '421-406 BCE', description: 'Complex temple with perfect Ionic columns' },
    { name: 'Temple of Athena Nike', location: 'Athens, Greece', year: '427-424 BCE', description: 'Small but perfectly proportioned Ionic temple' },
    { name: 'Temple of Artemis', location: 'Ephesus, Turkey', year: '550 BCE', description: 'One of the Seven Wonders (destroyed)' },
    { name: 'British Museum', location: 'London, UK', year: '1823-1852', description: 'Greek Revival Ionic colonnade' },
    { name: 'Jefferson Memorial', location: 'Washington D.C., USA', year: '1939-1943', description: 'Neoclassical Ionic rotunda' },
  ],

  confusionPairs: [
    {
      elementId: 'corinthian-column',
      reason: 'Both are ornate Greek orders with bases',
      distinction: 'Ionic has scroll volutes; Corinthian has acanthus leaf capital',
    },
    {
      elementId: 'composite-column',
      reason: 'Composite combines Ionic volutes with Corinthian leaves',
      distinction: 'Ionic has only volutes; Composite adds acanthus leaves below',
    },
  ],

  searchTags: ['column', 'greek', 'order', 'classical', 'volute', 'scroll', 'ionic', 'elegant', 'temple', 'feminine'],

  arMetadata: {
    modelPath: '/models/architecture/ionic-column.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Volutes', position: { x: 0.12, y: 0.95, z: 0 } },
      { label: 'Egg & Dart', position: { x: 0, y: 0.88, z: 0.1 } },
      { label: 'Fluting', position: { x: 0.1, y: 0.5, z: 0 } },
      { label: 'Base', position: { x: 0, y: 0.05, z: 0.1 } },
    ],
  },

  difficultyScore: 1, // Very recognizable scrolls
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
