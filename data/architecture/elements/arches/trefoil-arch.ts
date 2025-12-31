import type { ArchitecturalElement } from '../../types';

export const TREFOIL_ARCH: ArchitecturalElement = {
  id: 'trefoil-arch',
  slug: 'trefoil-arch',
  name: 'Trefoil Arch',
  alternativeNames: ['Three-Lobed Arch', 'Trifoil Arch', 'Cloverleaf Arch'],
  pronunciation: {
    phonetic: 'TREE-foil arch',
    language: 'English',
  },
  etymology: {
    origin: 'Latin/French',
    meaning: 'Three leaves, referring to its three-lobed shape',
    rootWord: 'tres (three) + folium (leaf)',
  },
  category: 'STRUCTURAL',
  subcategory: 'arches',
  periods: ['ROMANESQUE', 'GOTHIC', 'GOTHIC_REVIVAL'],
  regions: ['NORTHERN_EUROPE', 'CENTRAL_EUROPE', 'MEDITERRANEAN'],

  images: {
    primary: '/images/architecture/elements/trefoil-arch-primary.jpg',
    gallery: [],
    diagram: '/images/architecture/diagrams/trefoil-arch.svg',
  },

  description: {
    ELEMENTARY: 'A trefoil arch has three round bumps, like a three-leaf clover! The word "trefoil" means three leaves. In church windows, these arches represent the Holy Trinity (Father, Son, and Holy Spirit).',
    MIDDLE_SCHOOL: 'The trefoil arch features three rounded lobes, resembling a three-leaf clover or shamrock. Common in Gothic church architecture, it often symbolizes the Trinity. You\'ll find trefoils in window tracery, decorative panels, and arcade openings.',
    HIGH_SCHOOL: 'The trefoil arch incorporates three circular arcs (lobes) within an overall pointed or round arch frame. Primarily decorative, it appears in Gothic tracery, blind arcading, and architectural ornament. The form carries Christian symbolic associations with the Trinity.',
    UNDERGRADUATE: 'The trefoil arch belongs to a family of multifoil or cusped arches developed in Romanesque and Gothic architecture. The three-lobed form (trefoil), along with quatrefoil (four lobes) and cinquefoil (five lobes), provided decorative vocabulary for tracery and arcade enrichment. Symbolic associations with the Trinity reinforced ecclesiastical appropriateness.',
    GRADUATE: 'Multifoil arch analysis addresses the development of cusped forms in medieval architecture, their geometric construction, and symbolic meanings. The relationship between trefoil, quatrefoil, and cinquefoil forms, and their deployment in specific architectural contexts, reveals systematic decorative programs.',
    PHD: 'Advanced multifoil arch scholarship examines origins, symbolic programs, and construction practices. Questions include: the relationship to Islamic multifoil precedents, the role of geometry in medieval design, and the meanings attributed to specific foil numbers in medieval iconography.',
  },

  history: {
    ELEMENTARY: 'Medieval churches used trefoil arches to decorate windows and doors. The three parts reminded Christians of the Trinity. You can see trefoils carved in stone all over Gothic cathedrals, like little clovers made of stone!',
    MIDDLE_SCHOOL: 'Trefoil arches developed in Romanesque architecture and became common in Gothic design. They appear in window tracery, arcades, and decorative panels. The three-lobed shape symbolized the Holy Trinity, making it especially appropriate for church architecture.',
    HIGH_SCHOOL: 'The trefoil arch emerged in Romanesque architecture and was elaborated in Gothic practice. Its appearance in tracery, arcading, and decorative programs reflects both formal preferences and symbolic associations. Related forms (quatrefoil, cinquefoil) expanded the decorative vocabulary of medieval architecture.',
    UNDERGRADUATE: 'Multifoil arch development can be traced from Romanesque origins through Gothic elaboration. The geometric construction of cusped arches required sophisticated design knowledge. Symbolic interpretations-trefoil as Trinity, quatrefoil as the Evangelists-informed appropriate deployment while providing opportunities for decorative enrichment.',
    GRADUATE: 'Critical analysis of multifoil arches addresses construction techniques, symbolic programs, and stylistic evolution. The relationship between European multifoil forms and Islamic precedents (particularly cusped and multifoil arches in Spain and Sicily) presents questions of transmission and adaptation.',
    PHD: 'Multifoil arch scholarship engages medieval geometry, iconography, and cross-cultural exchange. Analysis extends from construction practice to meaning, examining how foil number, context, and combination created legible symbolic programs while providing opportunities for formal elaboration.',
  },

  characteristics: [
    'Three rounded lobes or cusps',
    'Resembles three-leaf clover',
    'Primarily decorative function',
    'Common in Gothic tracery',
    'Symbolic of the Trinity',
    'Related to quatrefoil (4) and cinquefoil (5)',
  ],

  famousExamples: [
    { name: 'Notre-Dame de Paris', location: 'Paris, France', year: '1163-1345', description: 'Trefoil tracery in galleries' },
    { name: 'Lincoln Cathedral', location: 'Lincoln, UK', year: '1185-1311', description: 'Elaborate trefoil arcading' },
    { name: 'Reims Cathedral', location: 'Reims, France', year: '1211-1275', description: 'Trefoils in rose window tracery' },
  ],

  confusionPairs: [
    {
      elementId: 'pointed-arch',
      reason: 'Trefoils often occur within pointed frames',
      distinction: 'Trefoil has three internal lobes; Pointed arch is smooth-sided',
    },
  ],

  searchTags: ['arch', 'trefoil', 'gothic', 'tracery', 'clover', 'trinity', 'medieval', 'cusped', 'decorative'],

  arMetadata: {
    modelPath: '/models/architecture/trefoil-arch.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Upper Lobe', position: { x: 0, y: 0.7, z: 0 } },
      { label: 'Side Lobes', position: { x: 0.3, y: 0.4, z: 0 } },
      { label: 'Cusps', position: { x: 0.15, y: 0.5, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
