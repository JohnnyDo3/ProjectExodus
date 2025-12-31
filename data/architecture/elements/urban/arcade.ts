import type { ArchitecturalElement } from '../../types';

export const ARCADE: ArchitecturalElement = {
  id: 'arcade',
  slug: 'arcade',
  name: 'Arcade',
  alternativeNames: ['Colonnade', 'Loggia', 'Covered Walkway', 'Gallery'],
  pronunciation: {
    phonetic: 'ar-KAYD',
    language: 'English',
  },
  etymology: {
    origin: 'French/Latin',
    meaning: 'Arched passage',
    rootWord: 'From Latin "arcus" (arch) via French "arcade"',
  },
  category: 'URBAN',
  subcategory: 'covered_spaces',
  periods: ['ANCIENT_ROMAN', 'MEDIEVAL', 'RENAISSANCE', 'VICTORIAN', 'MODERN', 'CONTEMPORARY'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'NORTH_AMERICA', 'EAST_ASIA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/arcade-primary.jpg',
    gallery: [
      '/images/architecture/elements/arcade-milan.jpg',
      '/images/architecture/elements/arcade-bologna.jpg',
    ],
    diagram: '/images/architecture/diagrams/arcade-types.svg',
  },

  description: {
    ELEMENTARY: 'An arcade is a covered walkway with arches along one or both sides. It\'s like a roofed sidewalk! You can walk through even when it\'s raining or sunny. Old cities like Bologna, Italy have miles of arcades, and fancy malls are often called arcades too.',
    MIDDLE_SCHOOL: 'An arcade is a covered passage with arched openings on one or both sides. They provide weather protection while maintaining connection to the street. Historic examples line streets in Bologna (38 kilometers!) and Paris. Shopping arcades-covered passages with shops-developed in the 19th century and influenced modern mall design.',
    HIGH_SCHOOL: 'The arcade is a covered passageway formed by a series of arches supported on columns or piers. Urban arcades provide weather-protected pedestrian routes while maintaining visual and physical connection to streets. Types include street arcades (Bologna), shopping arcades (Burlington Arcade, London), and internal gallery arcades (Galleria Vittorio Emanuele II). They represent a hybrid public-private space.',
    UNDERGRADUATE: 'Arcade design mediates between interior and exterior, public and private. Structural systems range from masonry arches through iron and glass to contemporary tension structures. Urban arcades address climate adaptation, commercial frontage, and pedestrian comfort. Shopping arcades pioneered interior climate-controlled retail environments. Contemporary practice navigates heritage preservation, adaptive reuse, and new construction in varying contexts.',
    GRADUATE: 'Arcade analysis engages urban morphology, retail geography, and public space theory. Research examines the arcade\'s role in urban pedestrian networks, its evolution from weather protection to commercial typology, and its influence on covered mall development. Contemporary challenges include maintaining arcade vitality, balancing preservation with adaptation, and integrating arcades into sustainable urban design.',
    PHD: 'Research into arcades addresses architectural typology, urban economics, and cultural history. Walter Benjamin\'s unfinished "Arcades Project" established the 19th-century shopping arcade as key to understanding modernity. Current scholarship examines arcade heritage preservation, the decline and revival of traditional arcades, and the relationship between arcades and contemporary retail environments.',
  },

  history: {
    ELEMENTARY: 'Ancient Romans built arcades for shade and shelter. In medieval Italy, cities like Bologna added arcades to almost every street. In the 1800s, architects built beautiful glass-roofed shopping arcades. Today\'s shopping malls grew from these elegant covered passages.',
    MIDDLE_SCHOOL: 'Roman architecture featured arcades in forums and theaters. Medieval Bologna required property owners to build arcades, creating an integrated covered network. The 19th century saw luxury shopping arcades with glass roofs-Burlington Arcade (1819) and Galleria Vittorio Emanuele II (1877) established the type. These influenced 20th-century enclosed shopping malls.',
    HIGH_SCHOOL: 'Roman arcades provided shelter in public buildings and market streets. Medieval Italian cities mandated arcade construction for weather protection and commercial display. Renaissance loggias served ceremonial and social functions. Industrial-era iron and glass technology enabled the covered shopping arcade-a new building type that transformed retail. Contemporary practice includes both heritage preservation and innovative new designs.',
    UNDERGRADUATE: 'Arcade history reveals the type\'s evolution from structural necessity to commercial strategy. Roman arcades derived from colonnade traditions. Medieval mandates created integrated urban networks-Bologna\'s porticoes now have UNESCO status. Enlightenment-era passages exploited commercial potential. Victorian iron-and-glass arcades pioneered interior retail environments. The 20th-century shopping mall represents both evolution and transformation of the type.',
    GRADUATE: 'Historical analysis of arcades examines urban regulation, construction technology, and commercial culture. Research addresses the economics of arcade construction (who built, who benefited), the diffusion of arcade types across cities, and the transition from street arcades to interior passages. Benjamin\'s cultural criticism positions the arcade as emblematic of 19th-century capitalism. Contemporary scholarship examines arcade decline and revival.',
    PHD: 'Arcade scholarship engages urban history, architectural typology, and cultural theory. Research methodologies include archival investigation of construction records, morphological analysis of arcade networks, and ethnographic study of contemporary use. Current investigations examine arcade heritage designation, strategies for revitalizing declining arcades, and the relationship between traditional arcades and contemporary covered public space.',
  },

  characteristics: [
    'Covered passage with arched openings',
    'Supported on columns or piers',
    'Weather-protected pedestrian route',
    'Connects to street visually and physically',
    'May include shops or other uses',
    'Various structural systems',
    'Hybrid public-private character',
  ],

  famousExamples: [
    { name: 'Galleria Vittorio Emanuele II', location: 'Milan, Italy', year: '1877', description: 'Iron-and-glass cruciform arcade, prototype for shopping malls' },
    { name: 'Bologna Porticoes', location: 'Bologna, Italy', year: 'Medieval-present', description: '38 kilometers of UNESCO-listed arcades' },
    { name: 'Burlington Arcade', location: 'London, UK', year: '1819', description: 'Regency-era luxury shopping arcade' },
    { name: 'GUM Department Store', location: 'Moscow, Russia', year: '1893', description: 'Iron-and-glass arcades along Red Square' },
    { name: 'Royal Arcade', location: 'Melbourne, Australia', year: '1870', description: 'Victorian arcade with original shopfronts' },
  ],

  confusionPairs: [
    {
      elementId: 'colonnade',
      reason: 'Both are covered walkways with columns',
      distinction: 'Arcades have arched openings; colonnades have flat entablatures on columns',
    },
    {
      elementId: 'loggia',
      reason: 'Both are covered semi-outdoor spaces',
      distinction: 'Arcades are passage-focused; loggias are often destination spaces for sitting or viewing',
    },
  ],

  searchTags: ['covered', 'walkway', 'arches', 'shopping', 'pedestrian', 'urban', 'gallery', 'passage'],

  arMetadata: {
    modelPath: '/models/architecture/arcade.glb',
    scale: 0.3,
    rotatable: true,
    annotations: [
      { label: 'Arch', position: { x: 0, y: 1.5, z: 0.5 } },
      { label: 'Column/Pier', position: { x: 0.5, y: 0.5, z: 0.5 } },
      { label: 'Vaulted Ceiling', position: { x: 0, y: 2, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
