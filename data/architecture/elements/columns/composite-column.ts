import type { ArchitecturalElement } from '../../types';

export const COMPOSITE_COLUMN: ArchitecturalElement = {
  id: 'composite-column',
  slug: 'composite-column',
  name: 'Composite Column',
  alternativeNames: ['Composite Order', 'Roman Composite', 'Compound Order'],
  pronunciation: {
    phonetic: 'kom-POZ-it',
    language: 'English',
  },
  etymology: {
    origin: 'Latin',
    meaning: 'Combined or composed of multiple elements',
    rootWord: 'compositus (put together)',
  },
  category: 'COLUMN',
  subcategory: 'column_orders',
  periods: ['ANCIENT_ROMAN', 'RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL'],
  regions: ['MEDITERRANEAN', 'CENTRAL_EUROPE', 'NORTHERN_EUROPE', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/composite-column-primary.jpg',
    gallery: [],
    diagram: '/images/architecture/diagrams/composite-order.svg',
  },

  description: {
    ELEMENTARY: 'The Composite column is like a super fancy mashup! Romans combined the scrolly volutes from Ionic columns with the leafy acanthus from Corinthian to make something even more ornate. It\'s the most decorated column of all!',
    MIDDLE_SCHOOL: 'The Composite order is a Roman invention that combines the best of Ionic and Corinthian. It has the large spiral volutes of Ionic sitting above the acanthus leaves of Corinthian. Romans used it on their most important triumphal arches and temples.',
    HIGH_SCHOOL: 'The Composite order, invented by Romans in the 1st century CE, combines Ionic volutes with Corinthian acanthus leaves. Not described by Vitruvius, it appears prominently on imperial monuments like the Arch of Titus. Renaissance theorists classified it as the most ornate and "heroic" of the five orders.',
    UNDERGRADUATE: 'The Composite order represents Roman architectural innovation, combining Ionic\'s volutes with Corinthian\'s acanthus leaves in a capital taller and more ornate than either parent form. Its absence from Vitruvius suggests post-Augustan development. The order\'s prominent use on triumphal arches associates it with imperial victory and divine status.',
    GRADUATE: 'The Composite order\'s development in the early Imperial period reflects Roman confidence in surpassing Greek precedent. Analysis of its deployment on monuments from the Arch of Titus to the Arch of Septimius Severus reveals programmatic associations with triumph and apotheosis. Renaissance theorists\' elevation of Composite to the apex of the order hierarchy reveals assumptions about cultural progress.',
    PHD: 'Composite order studies address questions of Roman architectural innovation, imperial iconography, and Renaissance reception. The order\'s absence from Vitruvius yet prominence in imperial monuments invites investigation of its symbolic functions. Post-antique theorization of Composite as "supreme" reveals how architectural orders served as vehicles for cultural ideology across historical periods.',
  },

  history: {
    ELEMENTARY: 'The Romans invented the Composite column because they wanted something fancier than anything the Greeks had made! They put it on their victory arches to celebrate winning wars. It\'s the fanciest column ever made!',
    MIDDLE_SCHOOL: 'Romans invented the Composite order around 80 CE, first appearing on the Arch of Titus celebrating victory in Jerusalem. It combines Greek elements in a uniquely Roman way. Renaissance architects considered it the most prestigious order, perfect for royal palaces and important churches.',
    HIGH_SCHOOL: 'The Composite order first appears definitively on the Arch of Titus (81 CE), though earlier examples may exist. Its combination of Ionic and Corinthian elements represents Roman innovation rather than Greek tradition. Renaissance theorists from Alberti onwards included it as the fifth order, often associating it with heroic or divine subjects.',
    UNDERGRADUATE: 'The Composite order\'s emergence in early Imperial Rome reflects a culture confident in synthesizing and surpassing Greek precedent. Its deployment on triumphal arches created associations with victory, divinity, and imperial authority. Renaissance theory, particularly Serlio\'s codification of five orders, positioned Composite at the apex of a hierarchical system.',
    GRADUATE: 'Critical analysis of the Composite order addresses its ideological functions in Roman imperial architecture. The combination of Ionic and Corinthian elements may have carried specific symbolic meanings related to the synthesis of Greek cultural authority with Roman political power. Its Renaissance positioning as "supreme" order reveals assumptions about cultural hierarchy and progress.',
    PHD: 'Composite order scholarship examines the order\'s development, deployment, and reception across periods. Questions include: its precise date of emergence, its symbolic meanings in Roman contexts, and the ideological implications of Renaissance hierarchization. The order\'s use in Baroque and Neoclassical contexts extends investigation into modern period deployments of classical vocabulary.',
  },

  characteristics: [
    'Combines Ionic volutes + Corinthian acanthus',
    'Largest volutes of any order',
    'Acanthus leaves below the volutes',
    'Most ornate capital of all orders',
    'Same slender proportions as Corinthian',
    'Roman invention (not Greek)',
  ],

  famousExamples: [
    { name: 'Arch of Titus', location: 'Rome, Italy', year: '81 CE', description: 'First major use of Composite' },
    { name: 'Arch of Septimius Severus', location: 'Rome, Italy', year: '203 CE', description: 'Triumphal arch with Composite columns' },
    { name: 'St. Peter\'s Basilica interior', location: 'Vatican City', year: '1506-1626', description: 'Massive Composite pilasters' },
    { name: 'Palace of Versailles', location: 'Versailles, France', year: '1661-1715', description: 'Royal Composite grandeur' },
  ],

  confusionPairs: [
    {
      elementId: 'corinthian-column',
      reason: 'Both have acanthus leaves',
      distinction: 'Composite adds large Ionic volutes above the leaves; Corinthian has only small corner helices',
    },
    {
      elementId: 'ionic-column',
      reason: 'Both have volute scrolls',
      distinction: 'Composite adds acanthus leaves below the volutes; Ionic has only volutes',
    },
  ],

  searchTags: ['column', 'roman', 'order', 'composite', 'ornate', 'volute', 'acanthus', 'triumphal', 'fancy'],

  arMetadata: {
    modelPath: '/models/architecture/composite-column.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Ionic Volutes', position: { x: 0.12, y: 0.98, z: 0 } },
      { label: 'Acanthus Leaves', position: { x: 0.1, y: 0.88, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
