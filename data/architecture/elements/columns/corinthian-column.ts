import type { ArchitecturalElement } from '../../types';

export const CORINTHIAN_COLUMN: ArchitecturalElement = {
  id: 'corinthian-column',
  slug: 'corinthian-column',
  name: 'Corinthian Column',
  alternativeNames: ['Corinthian Order', 'Acanthus Column', 'Leafy Capital'],
  pronunciation: {
    phonetic: 'kor-IN-thee-un',
    language: 'English',
  },
  etymology: {
    origin: 'Greek',
    meaning: 'Named after the city of Corinth, though invented in Athens',
    rootWord: 'Korinthios (Κορίνθιος)',
  },
  category: 'COLUMN',
  subcategory: 'column_orders',
  periods: ['ANCIENT_GREEK', 'ANCIENT_ROMAN', 'RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL', 'BEAUX_ARTS'],
  regions: ['MEDITERRANEAN', 'NORTHERN_EUROPE', 'CENTRAL_EUROPE', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/corinthian-column-primary.jpg',
    gallery: [
      '/images/architecture/elements/corinthian-pantheon.jpg',
      '/images/architecture/elements/corinthian-capital-detail.jpg',
    ],
    diagram: '/images/architecture/diagrams/corinthian-order.svg',
  },

  description: {
    ELEMENTARY: 'The Corinthian column is the fanciest of all Greek columns! Its top is decorated with beautiful carved leaves from the acanthus plant, curling and reaching upward. Legend says a sculptor was inspired by seeing an acanthus plant growing around a basket on a young girl\'s grave.',
    MIDDLE_SCHOOL: 'The Corinthian order is the most ornate of the three Greek orders. Its tall capital features two rows of acanthus leaves with small volutes (scrolls) emerging from the top. It\'s even more slender than Ionic, and the Romans absolutely loved it for their grandest buildings.',
    HIGH_SCHOOL: 'The Corinthian order, likely invented in Athens in the 5th century BCE, is characterized by its elaborate capital featuring two tiers of acanthus leaves and corner volutes. Legend attributes its invention to the sculptor Callimachus. The order became the Romans\' favorite, appearing in temples, triumphal arches, and public buildings throughout the Empire.',
    UNDERGRADUATE: 'The Corinthian order represents the final development of the Greek columnar tradition. Its capital-featuring two rows of acanthus leaves, caulicoli (stems), and volutes at all four corners-solved the "corner problem" that plagued Ionic design. Greek use was primarily interior (Temple of Apollo at Bassae), while Roman adoption made it the dominant order for imperial architecture.',
    GRADUATE: 'The Corinthian order\'s development from its earliest appearance at the Temple of Apollo at Bassae (c. 429 BCE) through its Roman imperial apogee reveals significant formal evolution. The Vitruvian account of Callimachus\'s invention represents etiological mythology rather than history. Analysis of capital typologies-from the severe "Bassae type" to the elaborate Roman "Normal Corinthian"-illuminates workshop practices and regional variations.',
    PHD: 'Corinthian order studies address the order\'s invention, diffusion, and symbolic meanings. The relative paucity of Greek Corinthian examples compared to Roman proliferation raises questions about cultural appropriation and ideological deployment. The capital\'s botanical forms invite iconographical analysis connecting architectural ornament to broader symbolic systems in Mediterranean antiquity.',
  },

  history: {
    ELEMENTARY: 'There\'s a beautiful legend about how Corinthian was invented! A sculptor named Callimachus saw an acanthus plant growing around a basket on a girl\'s grave, and it inspired him to create the leafy capital. The Romans used this column style more than any other for their grandest buildings.',
    MIDDLE_SCHOOL: 'The Corinthian order was invented in Greece around 450 BCE. Greeks used it sparingly, mostly for interiors. But the Romans fell in love with it! The Pantheon in Rome, temples, and triumphal arches all showcase ornate Corinthian columns. It became the symbol of Roman imperial power and grandeur.',
    HIGH_SCHOOL: 'The earliest known Corinthian capital appears at the Temple of Apollo at Bassae (429 BCE) as an interior column. Greeks used Corinthian selectively, but Romans adopted it enthusiastically for exterior use. The Maison Carrée at Nîmes and Pantheon portico represent Roman Corinthian perfection. Renaissance and Baroque architects considered it the supreme order for sacred and prestigious buildings.',
    UNDERGRADUATE: 'The emergence of the Corinthian order at Bassae represents a significant departure from canonical Doric and Ionic. Whether invented by Callimachus (as Vitruvius claims) or evolved from Near Eastern foliate capitals remains debated. Hellenistic developments at the Tower of the Winds in Athens and the Temple of Olympian Zeus prefigure Roman standardization. The order\'s association with luxury and imperial power shaped its deployment throughout the Roman world.',
    GRADUATE: 'Corinthian order historiography grapples with questions of origin, meaning, and transmission. The dramatic shift from Greek reserve to Roman enthusiasm invites explanation. Analysis of the "Normal Corinthian" capital, standardized by the Augustan period, reveals workshop systematization. The order\'s deployment at sites from the Pantheon to provincial temples indicates imperial architectural policy.',
    PHD: 'Advanced Corinthian studies examine capital typologies, workshop traditions, and ideological functions. The acanthus itself-whether Acanthus spinosus or mollis-carries symbolic associations with immortality and regeneration. Post-antique reception, from Renaissance theorists\' hierarchies of orders through Neoclassical banking palaces to modernist rejection, constitutes a rich field for examining architectural meaning across cultural contexts.',
  },

  characteristics: [
    'Bell-shaped capital with acanthus leaves',
    'Two rows of 8 acanthus leaves each',
    'Small volutes at corners (helices)',
    'Very slender proportions (height 10× diameter)',
    'Most ornate of the Greek orders',
    'Same base and fluting as Ionic',
  ],

  famousExamples: [
    { name: 'Pantheon', location: 'Rome, Italy', year: '113-125 CE', description: 'Massive Corinthian portico' },
    { name: 'Temple of Olympian Zeus', location: 'Athens, Greece', year: '131 CE', description: 'Largest Corinthian temple in Athens' },
    { name: 'Maison Carrée', location: 'Nîmes, France', year: '19 BCE', description: 'Best-preserved Roman Corinthian temple' },
    { name: 'St. Peter\'s Basilica', location: 'Vatican City', year: '1506-1626', description: 'Giant Corinthian order on façade' },
    { name: 'U.S. Supreme Court', location: 'Washington D.C., USA', year: '1932-1935', description: 'Neoclassical Corinthian entrance' },
  ],

  confusionPairs: [
    {
      elementId: 'composite-column',
      reason: 'Both have acanthus leaves on capital',
      distinction: 'Corinthian has only small corner volutes; Composite adds large Ionic volutes above the leaves',
    },
    {
      elementId: 'ionic-column',
      reason: 'Both are ornate with elegant proportions',
      distinction: 'Ionic has scroll volutes only; Corinthian has acanthus leaves',
    },
  ],

  searchTags: ['column', 'greek', 'roman', 'order', 'classical', 'acanthus', 'leaves', 'ornate', 'fancy', 'corinthian', 'callimachus'],

  arMetadata: {
    modelPath: '/models/architecture/corinthian-column.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Acanthus Leaves', position: { x: 0.12, y: 0.92, z: 0 } },
      { label: 'Helices (Volutes)', position: { x: 0.1, y: 0.98, z: 0.1 } },
      { label: 'Caulicoli', position: { x: 0.08, y: 0.85, z: 0 } },
      { label: 'Fluting', position: { x: 0.08, y: 0.5, z: 0 } },
    ],
  },

  difficultyScore: 1, // Very recognizable leafy capital
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
