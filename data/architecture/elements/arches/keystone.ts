import type { ArchitecturalElement } from '../../types';

export const KEYSTONE: ArchitecturalElement = {
  id: 'keystone',
  slug: 'keystone',
  name: 'Keystone',
  alternativeNames: ['Crown Stone', 'Key Block', 'Capstone'],
  pronunciation: {
    phonetic: 'KEE-stohn',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'The stone that locks the arch together',
    rootWord: 'key (essential part) + stone',
  },
  category: 'STRUCTURAL',
  subcategory: 'arches',
  periods: ['ANCIENT_ROMAN', 'ROMANESQUE', 'GOTHIC', 'RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL'],
  regions: ['MEDITERRANEAN', 'NORTHERN_EUROPE', 'CENTRAL_EUROPE', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/keystone-primary.jpg',
    gallery: [],
    diagram: '/images/architecture/diagrams/keystone.svg',
  },

  description: {
    ELEMENTARY: 'The keystone is the special wedge-shaped stone at the very top of an arch! It\'s like the last piece of a puzzle that holds everything together. Without the keystone, the whole arch would fall down.',
    MIDDLE_SCHOOL: 'The keystone is the central, wedge-shaped stone at the crown of an arch. It\'s the last stone placed during construction, and it locks all the other stones in position. Architects often made keystones larger and decorated them with faces or designs.',
    HIGH_SCHOOL: 'The keystone is the central voussoir at an arch\'s apex, completing the structural system and locking the arch into compression. Positioned last during construction after the supporting centering is in place, the keystone\'s insertion transforms a collection of wedge-shaped stones into a self-supporting structure.',
    UNDERGRADUATE: 'The keystone occupies the critical position at an arch\'s crown, where its insertion completes the compression ring. While all voussoirs contribute equally to structural action, the keystone\'s position at the apex makes it conceptually central—the "key" that locks the system. Decorative elaboration of keystones reflects their perceived importance.',
    GRADUATE: 'Keystone analysis addresses both structural mechanics and symbolic significance. While engineering analysis reveals that keystones bear no special loads (all voussoirs function similarly in compression), cultural understanding consistently emphasizes the keystone\'s importance. This gap between technical reality and popular perception illuminates architecture\'s symbolic dimensions.',
    PHD: 'Advanced keystone studies examine the gap between structural behavior and cultural meaning. The keystone metaphor extends into political and social discourse, with implications for understanding how architectural forms acquire meanings beyond their technical functions. Historical investigation traces how keystone symbolism evolved across periods.',
  },

  history: {
    ELEMENTARY: 'Romans perfected the art of building arches with keystones over 2,000 years ago. They put sculptures of gods or important people on their keystones. Today, "keystone" has come to mean anything really important—like the "keystone" of an organization!',
    MIDDLE_SCHOOL: 'Ancient Romans understood that the keystone completed and locked the arch structure. They often decorated keystones with carved heads—gods, emperors, or symbolic figures. The word "keystone" has become a metaphor for anything essential or fundamental, like Pennsylvania being called the "Keystone State."',
    HIGH_SCHOOL: 'The keystone has been understood as structurally critical since ancient times, though modern engineering reveals that all voussoirs share loads equally. Roman and later architects elaborated keystones as decorative elements, often featuring projecting blocks or carved heads. The keystone\'s symbolic association with essential importance transcends its technical function.',
    UNDERGRADUATE: 'Keystone development reflects the tension between technical function and symbolic meaning. While structurally equivalent to other voussoirs, keystones receive disproportionate decorative attention—from Roman mascarons through Baroque cartouches. This treatment reveals cultural investment in making visible the conceptual "key" to arch structure.',
    GRADUATE: 'Critical keystone analysis addresses the construction of architectural meaning. The keystone\'s elevation to special status, despite equivalent structural contribution to other voussoirs, demonstrates how cultural narratives shape building understanding. Investigation extends to keystone metaphors in political and philosophical discourse.',
    PHD: 'Keystone scholarship engages structural analysis, cultural history, and the semiotics of architecture. The gap between technical reality (equal voussoir contribution) and cultural perception (keystone as essential) illuminates broader questions about how buildings acquire meanings. Investigation traces keystone symbolism from ancient construction to modern political metaphor.',
  },

  characteristics: [
    'Wedge-shaped stone at arch crown',
    'Last stone placed in construction',
    'Locks arch into compression',
    'Often larger or decorated',
    'Frequently carved with faces/designs',
    'Metaphor for essential elements',
  ],

  famousExamples: [
    { name: 'Arch of Constantine', location: 'Rome, Italy', year: '315 CE', description: 'Roman keystones with imperial imagery' },
    { name: 'Palazzo Pitti', location: 'Florence, Italy', year: '1458-', description: 'Massive rusticated keystones' },
    { name: 'Paris Opera House', location: 'Paris, France', year: '1861-1875', description: 'Elaborate Baroque keystones' },
  ],

  confusionPairs: [
    {
      elementId: 'voussoir',
      reason: 'Keystone is a type of voussoir',
      distinction: 'Keystone is at the apex; Voussoirs are all the wedge stones (including keystone)',
    },
  ],

  searchTags: ['arch', 'keystone', 'stone', 'structural', 'crown', 'apex', 'wedge', 'roman', 'essential'],

  arMetadata: {
    modelPath: '/models/architecture/keystone.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Keystone', position: { x: 0, y: 0.5, z: 0.1 } },
      { label: 'Wedge Shape', position: { x: 0.1, y: 0.3, z: 0 } },
    ],
  },

  difficultyScore: 1,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
