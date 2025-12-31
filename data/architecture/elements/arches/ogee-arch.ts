import type { ArchitecturalElement } from '../../types';

export const OGEE_ARCH: ArchitecturalElement = {
  id: 'ogee-arch',
  slug: 'ogee-arch',
  name: 'Ogee Arch',
  alternativeNames: ['Cyma Arch', 'S-Curve Arch', 'Inflected Arch'],
  pronunciation: {
    phonetic: 'OH-jee arch',
    language: 'English',
  },
  etymology: {
    origin: 'French',
    meaning: 'Derived from ogive, originally meaning a pointed arch',
    rootWord: 'ogive (French)',
  },
  category: 'STRUCTURAL',
  subcategory: 'arches',
  periods: ['GOTHIC', 'DECORATED_GOTHIC', 'INDIAN'],
  regions: ['NORTHERN_EUROPE', 'SOUTH_ASIA', 'MIDDLE_EAST'],

  images: {
    primary: '/images/architecture/elements/ogee-arch-primary.jpg',
    gallery: [],
    diagram: '/images/architecture/diagrams/ogee-arch.svg',
  },

  description: {
    ELEMENTARY: 'An ogee arch has a really fancy S-curved shape! Each side curves outward at the bottom, then curves inward to meet at a point at the top. It looks like two S\'s facing each other. You\'ll see them on fancy doors and windows.',
    MIDDLE_SCHOOL: 'The ogee arch features an S-shaped curve on each side-convex at the bottom, then concave as it rises to a pointed apex. It\'s very decorative and was popular in late Gothic architecture. You\'ll also see it in Indian Mughal buildings like the Taj Mahal.',
    HIGH_SCHOOL: 'The ogee arch combines concave and convex curves, creating an S-shaped profile that rises to a point. It emerged in late medieval Decorated Gothic architecture (14th century) and appears independently in Islamic and Indian traditions. Structurally weaker than simpler arches, it was used primarily for decorative effect.',
    UNDERGRADUATE: 'The ogee arch represents the late Gothic tendency toward complex, flowing forms. The double-curved profile-convex below, concave above-creates visual dynamism but reduces structural efficiency. The form\'s appearance in both European Gothic and Indo-Islamic architecture raises questions about independent invention versus transmission.',
    GRADUATE: 'Ogee arch analysis addresses the late medieval preference for complex curves over structural clarity. The relationship between European ogee and similar forms in Indian and Islamic architecture remains debated. The arch\'s decorative emphasis reflects changing priorities in late Gothic design toward surface elaboration.',
    PHD: 'Advanced ogee arch scholarship examines the form\'s emergence in specific cultural contexts, its relationship to molding profiles (cyma recta/reversa), and its distribution across architectural traditions. Questions of independent invention, possible transmission routes, and changing aesthetic values inform investigation.',
  },

  history: {
    ELEMENTARY: 'Ogee arches became popular in England in the 1300s when builders wanted fancier decorations. They\'re not as strong as simple arches, so they were used for pretty doorways and windows, not for holding up heavy buildings.',
    MIDDLE_SCHOOL: 'The ogee arch developed in 14th-century England during the Decorated Gothic period, when architects favored elaborate, flowing designs. It also appeared in Mughal Indian architecture, giving buildings like the Taj Mahal their distinctive doorway shapes. Whether these traditions influenced each other is debated.',
    HIGH_SCHOOL: 'The ogee arch emerged in English Decorated Gothic architecture (c. 1290-1350), representing a shift from structural innovation to surface decoration. Similar forms in Indo-Islamic architecture (Bengal, Mughal) may represent independent development or cultural exchange. The arch\'s visual complexity prioritized aesthetics over structural efficiency.',
    UNDERGRADUATE: 'The ogee arch\'s development in European Gothic architecture reflects the Decorated period\'s emphasis on curvilinear tracery and surface elaboration. Analysis of the form\'s structural behavior reveals limited load-bearing capacity compared to pointed or round arches, confirming its primarily decorative function. The parallel development in South Asian architecture presents historiographical challenges.',
    GRADUATE: 'Critical analysis of the ogee arch addresses its position in late Gothic aesthetics, its structural limitations, and questions of cultural transmission. The relationship between European ogee, Bengali "pointed with shoulders" arches, and Mughal forms requires careful examination of chronology and possible contact routes.',
    PHD: 'Ogee arch scholarship engages architectural history, structural analysis, and questions of cultural exchange. The form\'s emergence in multiple traditions invites comparison of aesthetic values and design processes. Investigation extends to the arch\'s reception in Gothic Revival and its role in characterizing "late" Gothic as decorative rather than structural.',
  },

  characteristics: [
    'Double-curved S-shape on each side',
    'Convex at base, concave near apex',
    'Rises to a pointed top',
    'More decorative than structural',
    'Common in Decorated Gothic and Mughal',
    'Creates flowing, dynamic profile',
  ],

  famousExamples: [
    { name: 'Ely Cathedral Lady Chapel', location: 'Ely, UK', year: '1321-1349', description: 'Decorated Gothic ogee arches' },
    { name: 'Taj Mahal', location: 'Agra, India', year: '1632-1653', description: 'Mughal ogee (cusped) arches' },
    { name: 'St. Mary Redcliffe', location: 'Bristol, UK', year: '14th-15th century', description: 'Elaborate ogee doorway' },
  ],

  confusionPairs: [
    {
      elementId: 'pointed-arch',
      reason: 'Both have pointed tops',
      distinction: 'Ogee has S-curved sides; Pointed arch has simple curves meeting at apex',
    },
    {
      elementId: 'tudor-arch',
      reason: 'Both are decorative arch forms',
      distinction: 'Ogee has S-curves; Tudor is a flattened four-centered arch',
    },
  ],

  searchTags: ['arch', 'ogee', 'gothic', 'decorated', 'mughal', 's-curve', 'cyma', 'ornamental', 'indian'],

  arMetadata: {
    modelPath: '/models/architecture/ogee-arch.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Pointed Apex', position: { x: 0, y: 0.98, z: 0 } },
      { label: 'Concave Curve', position: { x: 0.2, y: 0.75, z: 0 } },
      { label: 'Convex Curve', position: { x: 0.35, y: 0.25, z: 0 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
