import type { ArchitecturalElement } from '../../types';

export const BALUSTER: ArchitecturalElement = {
  id: 'baluster',
  slug: 'baluster',
  name: 'Baluster',
  alternativeNames: ['Spindle', 'Banister', 'Balustrade Column'],
  pronunciation: {
    phonetic: 'BAL-uh-ster',
    language: 'English',
  },
  etymology: {
    origin: 'Italian/Greek',
    meaning: 'Pomegranate flower',
    rootWord: 'From Italian "balaustro" via Greek "balaustion" (pomegranate flower)',
  },
  category: 'FLOOR',
  subcategory: 'stair_parts',
  periods: ['RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL', 'VICTORIAN', 'CONTEMPORARY'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/baluster-primary.jpg',
    gallery: [
      '/images/architecture/elements/baluster-turned.jpg',
      '/images/architecture/elements/baluster-stone.jpg',
    ],
    diagram: '/images/architecture/diagrams/baluster-anatomy.svg',
  },

  description: {
    ELEMENTARY: 'A baluster is one of the short posts that hold up the handrail on stairs or balconies. They look like tiny decorated columns, often with bulges in the middle like a vase. When you put many balusters together with a rail on top, you have a balustrade!',
    MIDDLE_SCHOOL: 'Balusters are the vertical supports that form the infill of a balustrade or stair railing. They connect the handrail above to the base rail or stair treads below. Classical balusters have a vase-like shape inspired by pomegranate flowers. They can be made of stone, wood, metal, or modern materials.',
    HIGH_SCHOOL: 'The baluster is a shaped vertical member supporting a handrail in a balustrade system. Classical balusters feature a characteristic double-belly profile with a narrow neck and wider base. Renaissance architects derived the form from ancient Roman precedents and the shape of pomegranate flower buds. Spacing between balusters is typically 4-6 inches for safety.',
    UNDERGRADUATE: 'Baluster design reveals the intersection of structural function and decorative convention. The classical vase-form profile distributes material efficiently while creating visual rhythm. Renaissance theorists (Alberti, Palladio) codified proportions relating baluster height to base width. Turning technology enabled elaborate profiles in wood, while stone balusters required carving or template-based cutting. Modern codes govern spacing (typically 4" maximum) for child safety.',
    GRADUATE: 'Baluster analysis encompasses structural mechanics, manufacturing technology, and stylistic evolution. Load paths differ between wood (tension/compression in grain) and stone (compression only). Historical turning and carving techniques determined profile possibilities. Stylistic variation-from Renaissance vase-forms through Georgian stick balusters to Victorian eclectic designs-reflects broader aesthetic movements. Contemporary practice includes cable, glass, and tensioned-rod alternatives.',
    PHD: 'Research into balusters addresses craft history, structural behavior, and decorative vocabulary. Turned baluster profiles constitute a specialized woodworking taxonomy with regional variations. Stone balusters reveal quarrying, transportation, and carving practices. Theoretical analysis examines the baluster\'s role in classical order systems-the miniature column that extends architectural vocabulary to the human scale of touch and safety.',
  },

  history: {
    ELEMENTARY: 'The ancient Romans used balusters, but they became really popular during the Renaissance about 500 years ago. Italian architects designed beautiful stone balusters for palace balconies and grand staircases. Wood balusters became common in houses when woodworking tools improved.',
    MIDDLE_SCHOOL: 'Ancient Assyrian and Roman architecture featured early baluster forms. Renaissance architects revived and refined the baluster, with Bramante\'s Tempietto (1502) showcasing classical stone balustrades. Baroque and Rococo periods produced increasingly elaborate turned wood balusters. The Industrial Revolution enabled mass-produced cast iron and pressed metal balusters for Victorian buildings.',
    HIGH_SCHOOL: 'Archaeological evidence shows baluster-like elements in Assyrian window grilles. Roman architecture used stone balusters in balustrades, though few survive. Renaissance architects, studying Roman ruins, developed systematic baluster proportions. The lathe enabled complex turned profiles in wood. Cast iron technology (19th century) democratized ornamental metalwork. Modernism rejected the baluster in favor of minimal rails and cables.',
    UNDERGRADUATE: 'Baluster history traces technological and stylistic development. Ancient precedents (Assyrian, Roman) established the vase-form vocabulary. Renaissance theorization-particularly Vignola\'s rule relating height to seven diameters-codified proportions. Baroque elaboration produced deeply carved and gilded examples. Industrial production enabled pattern-book standardization. The 20th century saw both continued traditional craftsmanship and modernist alternatives (Mies van der Rohe\'s steel and glass rails).',
    GRADUATE: 'Historical analysis of balusters reveals production technology, trade networks, and stylistic transmission. Turned wood balusters reflect lathe technology development and species availability. Stone baluster production requires understanding quarry economics and carving guilds. Pattern books (especially Batty Langley\'s) disseminated standard profiles. Contemporary conservation addresses matching historic profiles and compatible material selection.',
    PHD: 'Baluster scholarship engages decorative arts history, craft technology, and building archaeology. Research examines the transmission of turned profiles across regions and periods, the economic organization of baluster production, and the baluster\'s role in the system of classical ornament. Conservation science addresses material degradation-wood decay, stone weathering, cast iron corrosion-and develops appropriate intervention methodologies.',
  },

  characteristics: [
    'Vertical member supporting handrail',
    'Classical vase-form profile with double belly',
    'Typically 4" maximum spacing for safety',
    'Made in stone, wood, metal, or composite',
    'Part of balustrade system with rail and base',
    'Height proportional to balustrade function',
    'Can be turned, carved, or cast',
  ],

  famousExamples: [
    { name: 'Tempietto Balustrade', location: 'Rome, Italy', year: '1502', description: 'Bramante\'s Renaissance masterpiece with classical stone balusters' },
    { name: 'St. Peter\'s Baldacchino', location: 'Vatican City', year: '1623-1634', description: 'Bernini\'s bronze twisted columns with balustrade' },
    { name: 'Palace of Versailles', location: 'Versailles, France', year: '1682', description: 'Extensive stone balustrades along rooflines and terraces' },
    { name: 'Royal Pavilion', location: 'Brighton, UK', year: '1815-1823', description: 'Cast iron balusters in Indian-influenced design' },
    { name: 'Grand Central Terminal', location: 'New York City, USA', year: '1913', description: 'Monumental marble balusters on grand staircase' },
  ],

  confusionPairs: [
    {
      elementId: 'newel-post',
      reason: 'Both are vertical stair elements',
      distinction: 'Balusters are the repetitive infill supports; newel posts are the larger structural posts at corners and ends',
    },
    {
      elementId: 'spindle',
      reason: 'Terms sometimes used interchangeably',
      distinction: 'Spindle often refers specifically to turned wood balusters; baluster is the broader architectural term',
    },
  ],

  searchTags: ['staircase', 'balustrade', 'railing', 'spindle', 'handrail', 'turned', 'classical', 'safety'],

  arMetadata: {
    modelPath: '/models/architecture/baluster.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Upper Fillet', position: { x: 0, y: 0.9, z: 0 } },
      { label: 'Belly', position: { x: 0, y: 0.5, z: 0.1 } },
      { label: 'Base Block', position: { x: 0, y: 0.1, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
