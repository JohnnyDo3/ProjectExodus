import type { ArchitecturalElement } from '../../types';

export const ROUND_ARCH: ArchitecturalElement = {
  id: 'round-arch',
  slug: 'round-arch',
  name: 'Round Arch',
  alternativeNames: ['Roman Arch', 'Semicircular Arch', 'Romanesque Arch'],
  pronunciation: {
    phonetic: 'round arch',
    language: 'English',
  },
  etymology: {
    origin: 'Latin',
    meaning: 'A curved structure in the shape of a half-circle',
    rootWord: 'arcus (bow, arch)',
  },
  category: 'STRUCTURAL',
  subcategory: 'arches',
  periods: ['ANCIENT_ROMAN', 'BYZANTINE', 'ROMANESQUE', 'RENAISSANCE', 'NEOCLASSICAL'],
  regions: ['MEDITERRANEAN', 'NORTHERN_EUROPE', 'CENTRAL_EUROPE', 'MIDDLE_EAST'],

  images: {
    primary: '/images/architecture/elements/round-arch-primary.jpg',
    gallery: [
      '/images/architecture/elements/colosseum-arches.jpg',
      '/images/architecture/elements/aqueduct-arches.jpg',
    ],
    diagram: '/images/architecture/diagrams/round-arch.svg',
  },

  description: {
    ELEMENTARY: 'A round arch is shaped like half a circle! The Romans were masters at building these, using them for bridges, aqueducts, and buildings like the Colosseum. The curved shape is really strong and can hold a lot of weight.',
    MIDDLE_SCHOOL: 'The round arch, also called a semicircular arch, forms a perfect half-circle. Romans perfected this design, using it to build massive structures like the Colosseum and aqueducts. The curved shape distributes weight outward to the supporting walls or columns.',
    HIGH_SCHOOL: 'The round arch, characterized by its semicircular profile, was the fundamental structural element of Roman architecture. The arch transfers loads through compression to its supports (imposts), enabling wide spans without the limitations of post-and-lintel construction. This innovation enabled Roman engineering achievements from bridges to basilicas.',
    UNDERGRADUATE: 'The round arch represents a fundamental structural innovation, redirecting gravitational loads laterally through compression to abutments. While precedents exist in Mesopotamia and Etruria, Roman builders systematized arch construction, developing centering techniques and voussoir cutting that enabled repetitive, efficient construction across the empire.',
    GRADUATE: 'The mechanics of round arch behavior—the conversion of vertical loads to lateral thrust, the necessity of adequate abutment—informed both Roman engineering practice and post-antique understanding. Analysis of Roman monuments reveals sophisticated understanding of structural action, material properties, and construction sequences.',
    PHD: 'Round arch studies encompass structural mechanics, construction history, and cultural analysis. The arch\'s development from Mesopotamian and Etruscan precedents through Roman systematization to medieval transformation reveals complex processes of technological transfer and innovation. Its symbolic associations—from Roman triumph to Romanesque spirituality—extend analysis beyond structure to meaning.',
  },

  history: {
    ELEMENTARY: 'The Romans didn\'t invent the arch, but they made it famous! They used round arches to build the Colosseum, giant aqueducts carrying water across valleys, and triumphal arches celebrating military victories. Later, Romanesque churches used round arches everywhere.',
    MIDDLE_SCHOOL: 'While earlier civilizations used arches, Romans perfected round arch construction. The Pont du Gard aqueduct, Colosseum, and triumphal arches showcase Roman mastery. After Rome fell, Romanesque architecture (11th-12th centuries) continued the round arch tradition in churches and castles across Europe.',
    HIGH_SCHOOL: 'The round arch emerged in Mesopotamia and was developed by Etruscans before Roman adoption and systematization. Roman concrete construction amplified the arch\'s potential, enabling structures like the Pantheon dome (extended arch principle). Romanesque architecture perpetuated the round arch, while Gothic innovations eventually introduced the pointed arch.',
    UNDERGRADUATE: 'The round arch\'s history reflects complex patterns of technological diffusion and innovation. Mesopotamian brick arches, Etruscan stone construction, and Roman systematization represent distinct developmental phases. Analysis of Roman monuments reveals evolving construction practices, from cut stone voussoirs to concrete arch rings, each with specific structural implications.',
    GRADUATE: 'Critical analysis of round arch development addresses questions of technological transfer, material innovation, and structural understanding. The relationship between Etruscan precedent and Roman practice, the role of concrete in transforming arch possibilities, and the Romanesque "revival" versus continuity all require nuanced examination.',
    PHD: 'Round arch scholarship encompasses archaeological evidence, structural analysis, and historiographical inquiry. Questions include: the relative independence versus derivation of various ancient arch traditions, the construction knowledge embedded in Roman practice, and the mechanisms of transmission to medieval builders. The arch\'s symbolic deployment—in triumphal contexts, ecclesiastical settings—extends analysis to cultural history.',
  },

  characteristics: [
    'Semicircular (half-circle) shape',
    'Composed of wedge-shaped voussoirs',
    'Keystone at the crown',
    'Transfers load through compression',
    'Requires lateral support (abutment)',
    'Most structurally stable arch form',
  ],

  famousExamples: [
    { name: 'Colosseum', location: 'Rome, Italy', year: '70-80 CE', description: 'Rows of round arches in Roman amphitheater' },
    { name: 'Pont du Gard', location: 'Southern France', year: '19 BCE', description: 'Roman aqueduct with three tiers of arches' },
    { name: 'Arch of Constantine', location: 'Rome, Italy', year: '315 CE', description: 'Triumphal arch with round openings' },
    { name: 'Durham Cathedral', location: 'Durham, UK', year: '1093-1133', description: 'Romanesque round arched nave' },
    { name: 'Speyer Cathedral', location: 'Speyer, Germany', year: '1030-1106', description: 'Imperial Romanesque architecture' },
  ],

  confusionPairs: [
    {
      elementId: 'pointed-arch',
      reason: 'Both are fundamental arch types',
      distinction: 'Round arch is semicircular; Pointed arch comes to a peak',
    },
    {
      elementId: 'horseshoe-arch',
      reason: 'Both are curved arch types',
      distinction: 'Round arch is exactly half a circle; Horseshoe extends past the semicircle',
    },
  ],

  searchTags: ['arch', 'roman', 'round', 'semicircular', 'romanesque', 'colosseum', 'aqueduct', 'structural'],

  arMetadata: {
    modelPath: '/models/architecture/round-arch.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Keystone', position: { x: 0, y: 0.95, z: 0 } },
      { label: 'Voussoirs', position: { x: 0.3, y: 0.7, z: 0 } },
      { label: 'Impost', position: { x: 0.5, y: 0.05, z: 0 } },
    ],
  },

  difficultyScore: 1,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
