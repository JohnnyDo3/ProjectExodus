import type { ArchitecturalElement } from '../../types';

export const TUDOR_ARCH: ArchitecturalElement = {
  id: 'tudor-arch',
  slug: 'tudor-arch',
  name: 'Tudor Arch',
  alternativeNames: ['Four-Centered Arch', 'Depressed Arch', 'English Arch'],
  pronunciation: {
    phonetic: 'TOO-der arch',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'Named after the Tudor dynasty (1485-1603) when it was popular',
    rootWord: 'Tudor (English royal house)',
  },
  category: 'STRUCTURAL',
  subcategory: 'arches',
  periods: ['PERPENDICULAR_GOTHIC', 'TUDOR', 'GOTHIC_REVIVAL'],
  regions: ['NORTHERN_EUROPE', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/tudor-arch-primary.jpg',
    gallery: [],
    diagram: '/images/architecture/diagrams/tudor-arch.svg',
  },

  description: {
    ELEMENTARY: 'A Tudor arch is wide and flat, with a gentle point at the top. It\'s named after the Tudor kings and queens of England like Henry VIII. You\'ll see it on old English buildings, especially doorways and fireplaces in grand houses.',
    MIDDLE_SCHOOL: 'The Tudor arch is a flattened, four-centered arch with a wide span and shallow rise. It became popular in England during the Tudor period (1485-1603). It\'s great for wide doorways and windows because it spans a large opening without needing to be very tall.',
    HIGH_SCHOOL: 'The Tudor arch, technically a four-centered arch, features a wide, flattened profile with a gentle point at the crown. It emerged in English Perpendicular Gothic architecture and became a hallmark of Tudor-era buildings. Its geometry uses four circle centers to create the characteristic broad, shallow curve.',
    UNDERGRADUATE: 'The four-centered (Tudor) arch represents English Perpendicular Gothic\'s preference for flattened, horizontal emphasis. The geometry-two large arcs at the base, two smaller arcs forming the point-creates maximum width with minimal rise. This enabled wider openings in the characteristically horizontal compositions of late medieval English architecture.',
    GRADUATE: 'Tudor arch analysis addresses the late English Gothic preference for horizontal emphasis and maximum fenestration. The geometric construction-requiring four arc centers-demonstrates sophisticated design knowledge. The arch\'s structural behavior differs from two-centered pointed arches, with implications for thrust distribution and buttressing requirements.',
    PHD: 'Advanced Tudor arch scholarship examines the form\'s emergence in Perpendicular Gothic, its relationship to changing spatial and liturgical requirements, and its role in defining English national architectural identity. The arch\'s revival in 19th-century Tudor Revival and Collegiate Gothic architecture extends investigation into modern reception.',
  },

  history: {
    ELEMENTARY: 'The Tudor arch became popular in England starting around 1400 and was used a lot during the time of King Henry VIII and Queen Elizabeth I. You can see it in Hampton Court Palace and many old English colleges and manor houses.',
    MIDDLE_SCHOOL: 'The Tudor arch developed during England\'s Perpendicular Gothic period (c. 1350-1530) and continued through the Tudor dynasty. It appears in royal palaces like Hampton Court, university colleges at Oxford and Cambridge, and parish churches across England. Gothic Revival architects brought it back in the 1800s.',
    HIGH_SCHOOL: 'The four-centered arch emerged in English Perpendicular Gothic architecture around the mid-14th century, becoming particularly associated with Tudor-era buildings. Its horizontal emphasis suited the large windows and doorways of late medieval English churches and secular buildings. The form was revived in 19th-century Collegiate Gothic architecture.',
    UNDERGRADUATE: 'The Tudor arch\'s development reflects changing English architectural priorities in the late medieval period. The Perpendicular style\'s emphasis on vertical mullions and horizontal transoms favored flattened arch forms. Analysis of monuments from King\'s College Chapel to Hampton Court reveals consistent geometric principles despite varying scales and contexts.',
    GRADUATE: 'Critical analysis of the Tudor arch addresses its role in defining English national style, its structural characteristics, and its revival reception. The form\'s association with English identity-from medieval origins through Tudor appropriation to Victorian revival-reveals architecture\'s entanglement with national politics and cultural memory.',
    PHD: 'Tudor arch scholarship engages architectural history, geometric analysis, and cultural studies. Questions include: the precise origins of four-centered construction, the relationship between arch form and other Perpendicular characteristics, and the ideological dimensions of Tudor arch revival in Victorian institutional architecture.',
  },

  characteristics: [
    'Four-centered construction',
    'Wide span with shallow rise',
    'Gentle point at crown',
    'Flattened, horizontal emphasis',
    'Characteristic of English Gothic',
    'Popular for wide doorways',
  ],

  famousExamples: [
    { name: 'King\'s College Chapel', location: 'Cambridge, UK', year: '1446-1515', description: 'Perpendicular Gothic with Tudor arches' },
    { name: 'Hampton Court Palace', location: 'Surrey, UK', year: '1515-1540', description: 'Tudor royal palace' },
    { name: 'Bath Abbey', location: 'Bath, UK', year: '1499-1616', description: 'Perpendicular Gothic church' },
    { name: 'Yale University', location: 'New Haven, USA', year: '20th century', description: 'Collegiate Gothic revival' },
  ],

  confusionPairs: [
    {
      elementId: 'pointed-arch',
      reason: 'Both have pointed tops',
      distinction: 'Tudor is wide and flattened; Pointed (Gothic) is taller and steeper',
    },
    {
      elementId: 'ogee-arch',
      reason: 'Both are late Gothic forms',
      distinction: 'Tudor is flattened with simple curves; Ogee has S-shaped curves',
    },
  ],

  searchTags: ['arch', 'tudor', 'four-centered', 'english', 'perpendicular', 'gothic', 'henry viii', 'cambridge', 'oxford'],

  arMetadata: {
    modelPath: '/models/architecture/tudor-arch.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Shallow Point', position: { x: 0, y: 0.6, z: 0 } },
      { label: 'Wide Span', position: { x: 0.4, y: 0.25, z: 0 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
