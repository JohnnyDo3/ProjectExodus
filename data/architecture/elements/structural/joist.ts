import type { ArchitecturalElement } from '../../types';

export const JOIST: ArchitecturalElement = {
  id: 'joist',
  slug: 'joist',
  name: 'Joist',
  alternativeNames: ['Floor Joist', 'Ceiling Joist', 'Common Joist', 'Binding Joist'],
  pronunciation: {
    phonetic: 'JOYST',
    language: 'English',
  },
  etymology: {
    origin: 'Old French',
    meaning: 'A horizontal timber supporting a floor or ceiling',
    rootWord: 'From Old French "giste" (beam, resting place), from Latin "jacēre" (to lie)',
  },
  category: 'STRUCTURAL',
  subcategory: 'framing',
  periods: ['ANCIENT', 'MEDIEVAL', 'RENAISSANCE', 'COLONIAL', 'CONTEMPORARY'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/joist-primary.jpg',
    gallery: [
      '/images/architecture/elements/joist-floor-framing.jpg',
      '/images/architecture/elements/joist-exposed-ceiling.jpg',
    ],
    diagram: '/images/architecture/diagrams/joist-types.svg',
  },

  description: {
    ELEMENTARY: 'A joist is a horizontal beam that holds up the floor you walk on! Joists run side by side under the floorboards like a row of bridges. They\'re usually hidden under the floor, but in some old buildings you can see them as exposed beams on the ceiling below.',
    MIDDLE_SCHOOL: 'Joists are horizontal structural members that span between walls or beams to support floors and ceilings. They\'re typically spaced 12 to 24 inches apart and carry the weight of everything on the floor above — people, furniture, and the floor material itself. Traditional joists are made of wood, but modern buildings may use steel or engineered lumber.',
    HIGH_SCHOOL: 'Joists are repetitive horizontal framing members that transfer floor and ceiling loads to supporting walls or beams. Design considers span, spacing, loading, and material properties. Traditional solid-sawn lumber joists are limited in span; engineered alternatives (I-joists, open-web trusses) achieve longer spans with less material. Joist sizing follows prescriptive span tables or engineering calculations based on bending stress and deflection limits.',
    UNDERGRADUATE: 'Joist systems represent the fundamental floor-framing solution in light construction. Structural behavior follows simple beam theory — bending moment and shear govern design, with deflection often controlling for longer spans. System efficiency depends on load distribution through sheathing diaphragms. Historical evolution from hewn timber to dimensional lumber to engineered products (TJI, open-web floor trusses) reflects advances in material efficiency and manufacturing. Fire resistance ratings depend on joist material, depth, and ceiling protection.',
    GRADUATE: 'Joist analysis engages structural optimization, vibration serviceability, and building science. Floor vibration under human footfall — a serviceability criterion increasingly governing design — requires consideration of joist frequency, damping, and mass. Hygrothermal performance of joist spaces affects moisture management and insulation strategy. Historical joist systems (medieval jetties using cantilevered joists, Japanese traditional construction) reveal sophisticated empirical engineering.',
    PHD: 'Current joist research addresses vibration performance (human perception thresholds, prediction methodologies), fire behavior (charring rates in mass timber, composite action loss in steel), and sustainability metrics (embodied carbon comparison across material systems). Conservation science examines historic joist assessment — non-destructive evaluation techniques including resistance drilling, ultrasonic pulse velocity, and stress wave timing enable in-situ structural evaluation of timber joists in heritage buildings.',
  },

  history: {
    ELEMENTARY: 'People have been using joists to make floors for thousands of years. In ancient Rome, builders used wooden joists to create floors in their tall apartment buildings called insulae. Medieval builders learned to make joists that could reach across wider rooms. Today, special engineered joists can span even farther!',
    MIDDLE_SCHOOL: 'Joists have been essential to multi-story construction since antiquity. Roman insulae (apartment buildings) used wooden joist floors up to five stories high. Medieval timber framing developed sophisticated joist systems including jetties — cantilevered joists that projected upper floors beyond the wall below. The Industrial Revolution introduced iron and steel joists. Modern engineered wood I-joists and open-web trusses have expanded span capabilities.',
    HIGH_SCHOOL: 'Joist technology evolved with construction demands. Ancient Egyptian and Roman builders used round or squared timber joists for multi-story buildings. Medieval developments included binding joists (large members supporting smaller common joists) and jettied construction. The 19th century brought standardized dimensional lumber and iron/steel alternatives. The 20th century introduced plywood-web I-joists and metal plate-connected floor trusses, transforming residential and commercial floor framing.',
    UNDERGRADUATE: 'Joist evolution reflects broader shifts in construction technology and material science. Pre-industrial joists were hewn from large timbers, with dimensions governed by empirical rules and available tree sizes. Industrial standardization of dimensional lumber (the 2x system) enabled prescriptive code tables but limited spans. Engineered lumber (I-joists, LVL, PSL) and open-web trusses overcome these limitations. The parallel development of steel joists — from rolled sections to manufactured bar joists — addressed commercial and industrial demands.',
    GRADUATE: 'Historical joist analysis illuminates construction economics and technology transfer. The shift from heavy timber to light-frame joist systems in 19th-century America represented a fundamental change in construction labor — from specialized joiners to general carpenters. International building traditions offer alternative approaches: Japanese traditional construction using large timber beams without repetitive joists, and German Fachwerkhaus traditions integrating joists into complex timber frames.',
    PHD: 'Joist research currently addresses mass timber systems (CLT floor panels vs. discrete joist systems), acoustic performance (impact sound insulation in multi-family construction), and life-cycle analysis (comparing timber, steel, and concrete joist systems). Archaeological analysis of joist pockets in historic masonry reveals construction sequences and original floor configurations in buildings that have undergone multiple modifications.',
  },

  characteristics: [
    'Horizontal members spanning between supports',
    'Repetitive spacing (typically 12-24 inches on center)',
    'Carries floor/ceiling loads in bending',
    'Materials: solid lumber, engineered wood, steel, concrete',
    'Connected to walls/beams at each end',
    'Covered by subfloor sheathing above',
    'Size governed by span, spacing, and load requirements',
  ],

  famousExamples: [
    { name: 'Roman Insulae', location: 'Rome, Italy', year: '100 CE', description: 'Multi-story apartment buildings with timber joist floor systems' },
    { name: 'Medieval Jettied Houses', location: 'York, England', year: '1300s', description: 'Timber-frame buildings with cantilevered joist projections' },
    { name: 'Crystal Palace', location: 'London, England', year: '1851', description: 'Pioneering use of standardized iron floor joists in prefabricated construction' },
    { name: 'Balloon Frame Houses', location: 'Chicago, USA', year: '1832', description: 'Revolutionary light-frame system using standardized lumber joists' },
  ],

  confusionPairs: [
    {
      elementId: 'rafter',
      reason: 'Both are repetitive framing members',
      distinction: 'Joists are horizontal members supporting floors/ceilings; rafters are sloped members supporting roofs',
    },
    {
      elementId: 'exposed-beams',
      reason: 'Both are horizontal structural members visible from below',
      distinction: 'Joists are smaller, closely spaced framing; exposed beams are larger, more widely spaced primary structural members',
    },
  ],

  searchTags: ['floor', 'framing', 'structural', 'beam', 'timber', 'construction', 'horizontal', 'span'],

  arMetadata: {
    modelPath: '/models/architecture/joist.glb',
    scale: 0.4,
    rotatable: true,
    annotations: [
      { label: 'Joist', position: { x: 0, y: 0.5, z: 0 } },
      { label: 'Subfloor', position: { x: 0, y: 0.7, z: 0 } },
      { label: 'Bearing Wall', position: { x: 0.5, y: 0.3, z: 0.5 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
