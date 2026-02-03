/**
 * Structural Engineering Comparison Sets
 *
 * Comprehensive educational content for:
 * - Bracing Types (Lateral Force Resisting Systems)
 * - Truss Types (Triangulated Structural Systems)
 * - Foundation Types (Structural Support Systems)
 * - Load Types (Forces Acting on Structures)
 */

import {
  DiagonalBracingSVG,
  XBracingSVG,
  KBracingSVG,
  ChevronBracingSVG,
  InvertedChevronBracingSVG,
  KneeBracingSVG,
  EccentricBracingSVG,
  MomentFrameSVG,
  KingPostTrussSVG,
  QueenPostTrussSVG,
  PrattTrussSVG,
  HoweTrussSVG,
  WarrenTrussSVG,
  FinkTrussSVG,
  BowstringTrussSVG,
  VierendeelTrussSVG,
  LatticeTrussSVG,
  SpreadFootingSVG,
  StripFootingSVG,
  CombinedFootingSVG,
  MatFoundationSVG,
  DrivenPileSVG,
  BoredPileSVG,
  CaissonFoundationSVG,
  FloatingFoundationSVG,
  RubbleTrenchSVG,
  DeadLoadSVG,
  LiveLoadSVG,
  WindLoadSVG,
  SeismicLoadSVG,
  SnowLoadSVG,
  RainLoadSVG,
  ImpactLoadSVG,
  ThermalLoadSVG,
  HydrostaticLoadSVG,
} from '@/components/architecture/elements/structural'

import type { ComparisonSet } from './comparisonSets'

// =============================================================================
// BRACING TYPES - Lateral Force Resisting Systems
// =============================================================================

export const bracingTypesComparison: ComparisonSet = {
  id: 'bracing-types',
  category: 'structural' as ComparisonSet['category'],
  difficulty: 'intermediate',
  title: 'Bracing Systems',
  subtitle: 'How buildings resist lateral forces from wind and earthquakes',
  description: 'Bracing systems are the backbone of a building\'s resistance to horizontal forces. From ancient timber knee braces to modern eccentric braced frames, these systems determine how structures survive wind storms and earthquakes.',

  elements: [
    { id: 'diagonal-bracing', name: 'Diagonal', component: DiagonalBracingSVG },
    { id: 'x-bracing', name: 'X-Bracing', component: XBracingSVG },
    { id: 'chevron-bracing', name: 'Chevron', component: ChevronBracingSVG },
    { id: 'eccentric-bracing', name: 'Eccentric', component: EccentricBracingSVG },
  ],

  features: [
    {
      label: 'Pattern',
      values: {
        'diagonal-bracing': 'Single diagonal member connecting opposite corners',
        'x-bracing': 'Two diagonals crossing in the center (X shape)',
        'chevron-bracing': 'Inverted V meeting at beam centerline',
        'eccentric-bracing': 'Diagonals offset from column, creating "link beam"',
      },
      highlighted: true,
    },
    {
      label: 'Force Direction',
      values: {
        'diagonal-bracing': 'Resists forces in ONE direction only',
        'x-bracing': 'Resists forces in BOTH directions',
        'chevron-bracing': 'Resists forces in both directions',
        'eccentric-bracing': 'Resists forces while allowing energy dissipation',
      },
      highlighted: true,
    },
    {
      label: 'Historical Origin',
      values: {
        'diagonal-bracing': 'Ancient - timber framing since antiquity',
        'x-bracing': '19th century - steel frame buildings',
        'chevron-bracing': '20th century - modern steel construction',
        'eccentric-bracing': '1970s - developed for seismic zones',
      },
    },
    {
      label: 'Seismic Performance',
      values: {
        'diagonal-bracing': 'Basic - can buckle in compression',
        'x-bracing': 'Good - redundancy from two members',
        'chevron-bracing': 'Good - but beam must resist unbalanced forces',
        'eccentric-bracing': 'Excellent - link beam yields and absorbs energy',
      },
    },
    {
      label: 'Architectural Impact',
      values: {
        'diagonal-bracing': 'Obstructs one diagonal of frame',
        'x-bracing': 'Obstructs entire frame opening',
        'chevron-bracing': 'Leaves lower portion open for doors/windows',
        'eccentric-bracing': 'Creates architectural feature from link beam',
      },
    },
    {
      label: 'Best Applications',
      values: {
        'diagonal-bracing': 'Low-rise buildings, temporary structures',
        'x-bracing': 'Industrial buildings, parking garages',
        'chevron-bracing': 'Commercial buildings, moderate seismic zones',
        'eccentric-bracing': 'High-rise buildings in earthquake zones',
      },
    },
  ],

  culturalContext: 'Bracing systems evolved from intuitive timber construction (knee braces in medieval barns) to scientifically engineered steel systems. The 1906 San Francisco earthquake and 1971 San Fernando earthquake drove major innovations, leading to eccentric braced frames that can absorb earthquake energy by controlled yielding of "link" beams.',

  historicalTimeline: 'Knee bracing (ancient) → Diagonal bracing (1800s) → X-bracing (1880s steel frames) → Chevron/V-bracing (1950s) → Eccentric bracing (1970s) → Buckling-restrained braces (1990s)',

  memoryTip: '**D**iagonal = **D**irect (one way), **X** = e**X**tra coverage (both ways), **C**hevron = **C**enter meeting (at beam), **E**ccentric = **E**nergy absorbing (offset link)',

  matchingGame: {
    question: 'Match each description to the correct bracing type',
    items: [
      { id: 'single-diagonal', text: 'Single diagonal - resists force in one direction', correctElementId: 'diagonal-bracing' },
      { id: 'crossing-diagonals', text: 'Two crossing diagonals - resists both directions', correctElementId: 'x-bracing' },
      { id: 'v-shape', text: 'Inverted V meeting at beam center', correctElementId: 'chevron-bracing' },
      { id: 'link-beam', text: 'Offset connection creating energy-absorbing link', correctElementId: 'eccentric-bracing' },
    ],
  },

  quizQuestions: [
    {
      id: 'both-directions',
      question: 'Which bracing type resists lateral forces in BOTH directions?',
      type: 'multiple-choice',
      correctAnswer: 'x-bracing',
      options: ['diagonal-bracing', 'x-bracing', 'knee-bracing'],
      explanation: 'X-bracing uses two crossing diagonals, so one is always in tension regardless of which direction the force comes from.',
    },
    {
      id: 'seismic-best',
      question: 'Which bracing system is specifically designed for earthquake energy dissipation?',
      type: 'multiple-choice',
      correctAnswer: 'eccentric-bracing',
      options: ['x-bracing', 'chevron-bracing', 'eccentric-bracing'],
      explanation: 'Eccentric braced frames (EBF) have a deliberately offset "link beam" that yields during earthquakes, absorbing energy and protecting the rest of the structure.',
    },
  ],
}

// =============================================================================
// TRUSS TYPES - Triangulated Structural Systems
// =============================================================================

export const trussTypesComparison: ComparisonSet = {
  id: 'truss-types',
  category: 'structural' as ComparisonSet['category'],
  difficulty: 'intermediate',
  title: 'Truss Systems',
  subtitle: 'From medieval timber to modern steel bridges',
  description: 'Trusses use triangulation to efficiently span long distances. Each truss type has a distinct pattern of diagonal and vertical members that determines whether they work in tension or compression.',

  elements: [
    { id: 'pratt-truss', name: 'Pratt', component: PrattTrussSVG },
    { id: 'howe-truss', name: 'Howe', component: HoweTrussSVG },
    { id: 'warren-truss', name: 'Warren', component: WarrenTrussSVG },
    { id: 'king-post-truss', name: 'King Post', component: KingPostTrussSVG },
  ],

  features: [
    {
      label: 'Diagonal Direction',
      values: {
        'pratt-truss': 'Diagonals slope TOWARD center (V pattern)',
        'howe-truss': 'Diagonals slope AWAY from center (A pattern)',
        'warren-truss': 'Alternating diagonals - NO verticals',
        'king-post-truss': 'No diagonals - single central vertical',
      },
      highlighted: true,
    },
    {
      label: 'Diagonal Stress',
      values: {
        'pratt-truss': 'Diagonals in TENSION (efficient for steel)',
        'howe-truss': 'Diagonals in COMPRESSION (good for timber)',
        'warren-truss': 'Alternating tension/compression',
        'king-post-truss': 'Central post in tension, struts in compression',
      },
      highlighted: true,
    },
    {
      label: 'Year Invented',
      values: {
        'pratt-truss': '1844 - Thomas & Caleb Pratt (USA)',
        'howe-truss': '1840 - William Howe (USA)',
        'warren-truss': '1848 - James Warren (UK)',
        'king-post-truss': 'Medieval - origin unknown',
      },
    },
    {
      label: 'Best Material',
      values: {
        'pratt-truss': 'Steel (tension members can be slender)',
        'howe-truss': 'Timber (wood good in compression)',
        'warren-truss': 'Steel (simple connections)',
        'king-post-truss': 'Timber (traditional construction)',
      },
    },
    {
      label: 'Common Uses',
      values: {
        'pratt-truss': 'Steel bridges, industrial roofs',
        'howe-truss': 'Historic covered bridges, timber frames',
        'warren-truss': 'Modern bridges, long-span roofs',
        'king-post-truss': 'Residential roofs, small spans',
      },
    },
    {
      label: 'Famous Examples',
      values: {
        'pratt-truss': 'Many railroad bridges across USA',
        'howe-truss': 'Covered bridges of New England',
        'warren-truss': 'George Washington Bridge approach',
        'king-post-truss': 'Traditional barns and churches worldwide',
      },
    },
  ],

  culturalContext: 'The "Truss Wars" of the 1840s-50s saw American engineers racing to patent better bridge designs. William Howe\'s 1840 truss worked well with wood (compression diagonals), while the Pratt brothers\' 1844 design became dominant when steel replaced timber because tension members can be much lighter than compression members.',

  historicalTimeline: 'King Post (Medieval) → Queen Post (Medieval) → Howe Truss (1840) → Pratt Truss (1844) → Warren Truss (1848) → Fink Truss (1854) → Modern variations (1900s+)',

  memoryTip: '**P**ratt = **P**ointing in (diagonals toward center), **H**owe = **H**anging out (diagonals away from center), **W**arren = **W**ithout verticals, **K**ing = **K**ingle post (one central)',

  matchingGame: {
    question: 'Match each description to the correct truss type',
    items: [
      { id: 'tension-diagonals', text: 'Diagonals in tension - slope toward center', correctElementId: 'pratt-truss' },
      { id: 'compression-diagonals', text: 'Diagonals in compression - slope away from center', correctElementId: 'howe-truss' },
      { id: 'no-verticals', text: 'Equilateral triangles - no vertical members', correctElementId: 'warren-truss' },
      { id: 'single-post', text: 'Simplest form - single central vertical post', correctElementId: 'king-post-truss' },
    ],
  },

  quizQuestions: [
    {
      id: 'steel-best',
      question: 'Which truss is most efficient for STEEL construction?',
      type: 'multiple-choice',
      correctAnswer: 'pratt-truss',
      options: ['pratt-truss', 'howe-truss', 'king-post-truss'],
      explanation: 'The Pratt truss puts diagonals in tension. Steel tension members can be very slender (cables even), making it highly efficient.',
    },
    {
      id: 'timber-best',
      question: 'Which truss was designed specifically for TIMBER construction?',
      type: 'multiple-choice',
      correctAnswer: 'howe-truss',
      options: ['pratt-truss', 'howe-truss', 'warren-truss'],
      explanation: 'The Howe truss puts diagonals in compression. Timber performs well in compression, making this design ideal for wooden covered bridges.',
    },
  ],
}

// =============================================================================
// FOUNDATION TYPES - Structural Support Systems
// =============================================================================

export const foundationTypesComparison: ComparisonSet = {
  id: 'foundation-types',
  category: 'structural' as ComparisonSet['category'],
  difficulty: 'intermediate',
  title: 'Foundation Systems',
  subtitle: 'How buildings transfer loads to the earth',
  description: 'Foundations are the hidden heroes of construction, transferring building loads safely to the ground. The choice depends on soil conditions, load magnitude, and groundwater - get it wrong and buildings sink, tilt, or crack.',

  elements: [
    { id: 'spread-footing', name: 'Spread Footing', component: SpreadFootingSVG },
    { id: 'mat-foundation', name: 'Mat/Raft', component: MatFoundationSVG },
    { id: 'driven-pile', name: 'Driven Pile', component: DrivenPileSVG },
    { id: 'caisson-foundation', name: 'Caisson', component: CaissonFoundationSVG },
  ],

  features: [
    {
      label: 'Depth Category',
      values: {
        'spread-footing': 'SHALLOW - near surface (< 3m typically)',
        'mat-foundation': 'SHALLOW - full building footprint slab',
        'driven-pile': 'DEEP - extends to bearing stratum (10-50m+)',
        'caisson-foundation': 'DEEP - large diameter shaft (10-80m+)',
      },
      highlighted: true,
    },
    {
      label: 'Load Transfer',
      values: {
        'spread-footing': 'Spreads column load over larger soil area',
        'mat-foundation': 'Distributes entire building load uniformly',
        'driven-pile': 'Friction along shaft + end bearing',
        'caisson-foundation': 'End bearing on rock/hard stratum',
      },
      highlighted: true,
    },
    {
      label: 'Soil Conditions',
      values: {
        'spread-footing': 'Good bearing capacity near surface',
        'mat-foundation': 'Weak soil OR very heavy loads',
        'driven-pile': 'Poor surface soil, good deep bearing',
        'caisson-foundation': 'Deep rock or very heavy point loads',
      },
    },
    {
      label: 'Construction Method',
      values: {
        'spread-footing': 'Excavate, form, pour concrete',
        'mat-foundation': 'Large excavation, reinforcement grid, mass pour',
        'driven-pile': 'Hammer/vibrate prefab piles into ground',
        'caisson-foundation': 'Drill large shaft, workers inspect, pour concrete',
      },
    },
    {
      label: 'Typical Uses',
      values: {
        'spread-footing': 'Residential, low-rise commercial',
        'mat-foundation': 'High-rise towers, industrial facilities',
        'driven-pile': 'Bridges, waterfront, variable soils',
        'caisson-foundation': 'Major bridges, skyscrapers, heavy industry',
      },
    },
    {
      label: 'Famous Examples',
      values: {
        'spread-footing': 'Most houses and small buildings',
        'mat-foundation': 'Burj Khalifa (3.7m thick mat)',
        'driven-pile': 'San Francisco waterfront buildings',
        'caisson-foundation': 'Brooklyn Bridge (pneumatic caissons 1870s)',
      },
    },
  ],

  culturalContext: 'Foundation engineering has determined the fate of civilizations. The Romans used concrete rafts and timber piles. Venice floats on millions of wooden piles. The Leaning Tower of Pisa\'s famous tilt resulted from inadequate foundation depth. Modern deep foundations make skyscrapers possible on any terrain.',

  historicalTimeline: 'Stone footings (ancient) → Roman concrete foundations → Timber piles (medieval) → Pneumatic caissons (1850s) → Driven concrete piles (1900s) → Drilled shafts (1950s) → Modern analysis (1970s+)',

  memoryTip: '**S**pread = **S**hallow pad, **M**at = **M**assive slab, **P**ile = **P**ushed deep, **C**aisson = **C**an inspect inside',

  matchingGame: {
    question: 'Match each description to the correct foundation type',
    items: [
      { id: 'column-pad', text: 'Single pad spreading column load near surface', correctElementId: 'spread-footing' },
      { id: 'full-slab', text: 'Entire building on one thick slab', correctElementId: 'mat-foundation' },
      { id: 'hammered-deep', text: 'Prefab elements hammered into ground', correctElementId: 'driven-pile' },
      { id: 'large-shaft', text: 'Large diameter shaft - workers can enter', correctElementId: 'caisson-foundation' },
    ],
  },

  quizQuestions: [
    {
      id: 'weak-soil',
      question: 'What foundation type is best for WEAK surface soils with good bearing capacity deep below?',
      type: 'multiple-choice',
      correctAnswer: 'driven-pile',
      options: ['spread-footing', 'mat-foundation', 'driven-pile'],
      explanation: 'Driven piles transfer loads through weak surface soils to stronger bearing strata below, either through friction along the shaft or end bearing.',
    },
    {
      id: 'skyscraper',
      question: 'The Burj Khalifa uses what type of foundation?',
      type: 'multiple-choice',
      correctAnswer: 'mat-foundation',
      options: ['spread-footing', 'mat-foundation', 'caisson-foundation'],
      explanation: 'The Burj Khalifa sits on a 3.7-meter-thick reinforced concrete mat foundation that distributes the building\'s massive load.',
    },
  ],
}

// =============================================================================
// LOAD TYPES - Forces Acting on Structures
// =============================================================================

export const loadTypesComparison: ComparisonSet = {
  id: 'load-types',
  category: 'structural' as ComparisonSet['category'],
  difficulty: 'beginner',
  title: 'Structural Loads',
  subtitle: 'Understanding forces that act on buildings',
  description: 'Every structure must resist multiple types of forces. Engineers must account for permanent loads, occupancy, weather, earthquakes, and more. Understanding loads is the first step in structural design.',

  elements: [
    { id: 'dead-load', name: 'Dead Load', component: DeadLoadSVG },
    { id: 'live-load', name: 'Live Load', component: LiveLoadSVG },
    { id: 'wind-load', name: 'Wind Load', component: WindLoadSVG },
    { id: 'seismic-load', name: 'Seismic Load', component: SeismicLoadSVG },
  ],

  features: [
    {
      label: 'Definition',
      values: {
        'dead-load': 'Permanent weight of structure itself',
        'live-load': 'Variable loads from occupancy and use',
        'wind-load': 'Lateral pressure from air movement',
        'seismic-load': 'Inertial forces from ground shaking',
      },
      highlighted: true,
    },
    {
      label: 'Variability',
      values: {
        'dead-load': 'CONSTANT - calculated from material weights',
        'live-load': 'VARIABLE - changes with building use',
        'wind-load': 'VARIABLE - depends on weather conditions',
        'seismic-load': 'RARE but EXTREME - unpredictable occurrence',
      },
      highlighted: true,
    },
    {
      label: 'Direction',
      values: {
        'dead-load': 'Vertical (gravity) - always downward',
        'live-load': 'Vertical (gravity) - always downward',
        'wind-load': 'Horizontal (lateral) + uplift on roofs',
        'seismic-load': 'Horizontal (lateral) - from ground motion',
      },
    },
    {
      label: 'Examples',
      values: {
        'dead-load': 'Beams, columns, floors, walls, roofing, finishes',
        'live-load': 'People, furniture, vehicles, movable equipment',
        'wind-load': 'Hurricane winds, everyday breezes',
        'seismic-load': 'Earthquake ground acceleration',
      },
    },
    {
      label: 'Code Requirements',
      values: {
        'dead-load': 'Calculate from actual material weights',
        'live-load': 'Minimum values per occupancy type (psf)',
        'wind-load': 'Based on location, height, exposure',
        'seismic-load': 'Based on location, soil, building type',
      },
    },
    {
      label: 'Design Philosophy',
      values: {
        'dead-load': 'Always present - must support 100%',
        'live-load': 'May reduce for large areas (statistical)',
        'wind-load': 'Probabilistic - 50 or 100 year return period',
        'seismic-load': 'Life safety - survive major earthquake',
      },
    },
  ],

  culturalContext: 'Understanding loads transformed construction from craft to science. Romans knew dead loads intuitively. Live loads became standardized after floor collapses in the 1800s. Wind engineering advanced after the 1940 Tacoma Narrows Bridge collapse. Seismic design revolutionized after major earthquakes in Japan (1923) and California (1971).',

  historicalTimeline: 'Intuitive construction (ancient) → Dead load calculations (1700s) → Live load standards (1850s) → Wind tunnel testing (1900s) → Seismic codes (1920s Japan, 1970s USA) → Modern performance-based design (2000s)',

  memoryTip: '**D**ead = **D**oesn\'t move (permanent), **L**ive = **L**iving things (people, movable), **W**ind = **W**eather lateral, **S**eismic = **S**haking ground',

  matchingGame: {
    question: 'Match each description to the correct load type',
    items: [
      { id: 'permanent-weight', text: 'Permanent weight of structure itself', correctElementId: 'dead-load' },
      { id: 'occupancy', text: 'Variable loads from people and furniture', correctElementId: 'live-load' },
      { id: 'lateral-pressure', text: 'Lateral pressure from air movement', correctElementId: 'wind-load' },
      { id: 'ground-shaking', text: 'Inertial forces from ground acceleration', correctElementId: 'seismic-load' },
    ],
  },

  quizQuestions: [
    {
      id: 'constant-load',
      question: 'Which load type is CONSTANT and predictable?',
      type: 'multiple-choice',
      correctAnswer: 'dead-load',
      options: ['dead-load', 'live-load', 'wind-load'],
      explanation: 'Dead load is the permanent weight of the structure itself. It can be precisely calculated from material weights and doesn\'t change during the building\'s life.',
    },
    {
      id: 'lateral-load',
      question: 'Which loads act primarily in the HORIZONTAL direction?',
      type: 'multiple-choice',
      correctAnswer: 'wind-load',
      options: ['dead-load', 'live-load', 'wind-load'],
      explanation: 'Wind and seismic loads act laterally (horizontally), which is why buildings need bracing systems to resist them. Dead and live loads act vertically.',
    },
  ],
}

// =============================================================================
// ADDITIONAL SPECIALIZED SETS
// =============================================================================

export const advancedBracingComparison: ComparisonSet = {
  id: 'advanced-bracing',
  category: 'structural' as ComparisonSet['category'],
  difficulty: 'advanced',
  title: 'Advanced Bracing Systems',
  subtitle: 'Specialized systems for seismic and architectural requirements',
  description: 'Beyond basic bracing, modern structures use sophisticated systems that balance structural performance with architectural flexibility.',

  elements: [
    { id: 'k-bracing', name: 'K-Bracing', component: KBracingSVG },
    { id: 'inverted-chevron-bracing', name: 'Inverted Chevron', component: InvertedChevronBracingSVG },
    { id: 'knee-bracing', name: 'Knee Bracing', component: KneeBracingSVG },
    { id: 'moment-frame', name: 'Moment Frame', component: MomentFrameSVG },
  ],

  features: [
    {
      label: 'Key Feature',
      values: {
        'k-bracing': 'Diagonals meet at column mid-height',
        'inverted-chevron-bracing': 'V-shape with apex at bottom beam',
        'knee-bracing': 'Short diagonals at corners only',
        'moment-frame': 'NO bracing - rigid beam-column connections',
      },
      highlighted: true,
    },
    {
      label: 'Seismic Concern',
      values: {
        'k-bracing': 'CAUTION: Can cause column failure - limited use',
        'inverted-chevron-bracing': 'Good: Similar to chevron performance',
        'knee-bracing': 'Limited: For low-seismic zones only',
        'moment-frame': 'Excellent: Ductile behavior, but expensive',
      },
    },
    {
      label: 'Architectural Benefit',
      values: {
        'k-bracing': 'Allows door/window at frame corner',
        'inverted-chevron-bracing': 'Upper portion of frame open',
        'knee-bracing': 'Frame mostly open - traditional aesthetics',
        'moment-frame': 'Completely open - no diagonal obstructions',
      },
    },
    {
      label: 'Historical Context',
      values: {
        'k-bracing': '20th century - now avoided in seismic zones',
        'inverted-chevron-bracing': 'Modern alternative to chevron',
        'knee-bracing': 'Medieval timber framing tradition',
        'moment-frame': '1890s Chicago School, perfected 1960s+',
      },
    },
  ],

  culturalContext: 'The moment frame emerged from the Chicago School architects who wanted open floor plans. After seismic failures in the 1994 Northridge earthquake revealed welding defects, connection design was revolutionized. K-bracing, once common, is now restricted after failures showed it could buckle columns.',

  memoryTip: '**K** = meets at column (K shape), Inverted = **I**nverted V at bottom, **K**nee = **K**orner only, **M**oment = **M**issing bracing (rigid joints)',

  matchingGame: {
    question: 'Match each description to the correct system',
    items: [
      { id: 'column-mid', text: 'Diagonals meet at column mid-height', correctElementId: 'k-bracing' },
      { id: 'apex-bottom', text: 'V-shape with apex at lower beam', correctElementId: 'inverted-chevron-bracing' },
      { id: 'corners-only', text: 'Short diagonals at corners only', correctElementId: 'knee-bracing' },
      { id: 'no-diagonals', text: 'No diagonals - rigid connections only', correctElementId: 'moment-frame' },
    ],
  },
}

export const advancedTrussComparison: ComparisonSet = {
  id: 'advanced-trusses',
  category: 'structural' as ComparisonSet['category'],
  difficulty: 'advanced',
  title: 'Specialized Truss Systems',
  subtitle: 'Complex trusses for long spans and special requirements',
  description: 'These truss types represent engineering innovations for specific challenges - curved roofs, open passages, and record-breaking spans.',

  elements: [
    { id: 'bowstring-truss', name: 'Bowstring', component: BowstringTrussSVG },
    { id: 'vierendeel-truss', name: 'Vierendeel', component: VierendeelTrussSVG },
    { id: 'fink-truss', name: 'Fink', component: FinkTrussSVG },
    { id: 'lattice-truss', name: 'Lattice', component: LatticeTrussSVG },
  ],

  features: [
    {
      label: 'Unique Feature',
      values: {
        'bowstring-truss': 'CURVED top chord (like an archer\'s bow)',
        'vierendeel-truss': 'NO DIAGONALS - rectangular openings',
        'fink-truss': 'W-PATTERN web members',
        'lattice-truss': 'DENSE mesh of overlapping diagonals',
      },
      highlighted: true,
    },
    {
      label: 'Structural Principle',
      values: {
        'bowstring-truss': 'Arch action in top chord reduces forces',
        'vierendeel-truss': 'Rigid frame action (moment connections)',
        'fink-truss': 'Subdivided panels for longer spans',
        'lattice-truss': 'Many small members share the load',
      },
    },
    {
      label: 'Best Application',
      values: {
        'bowstring-truss': 'Long-span roofs, arenas, hangars',
        'vierendeel-truss': 'Bridges needing unobstructed view/access',
        'fink-truss': 'Residential roofs, long-span pitched roofs',
        'lattice-truss': 'Historic covered bridges, decorative trusses',
      },
    },
    {
      label: 'Origin',
      values: {
        'bowstring-truss': '1840s - efficiency for arch roofs',
        'vierendeel-truss': '1896 - Belgian engineer Arthur Vierendeel',
        'fink-truss': '1854 - Albert Fink for railways',
        'lattice-truss': '1820 - Ithiel Town\'s patented design',
      },
    },
  ],

  culturalContext: 'The Vierendeel truss was considered structurally "wrong" because it violates the principle of triangulation, but rigid connections make it work. Town\'s lattice truss was so simple that untrained carpenters could build it with wooden pegs, spreading bridge construction across rural America.',

  memoryTip: '**B**owstring = **B**ow shaped (curved), **V**ierendeel = **V**oid of diagonals (rectangular), **F**ink = **F**an-W pattern, **L**attice = **L**ots of crossing members',

  matchingGame: {
    question: 'Match each description to the correct truss',
    items: [
      { id: 'curved-top', text: 'Curved top chord - arch efficiency', correctElementId: 'bowstring-truss' },
      { id: 'no-diagonals', text: 'No diagonals - rectangular openings only', correctElementId: 'vierendeel-truss' },
      { id: 'w-pattern', text: 'W-pattern subdivided web members', correctElementId: 'fink-truss' },
      { id: 'dense-mesh', text: 'Dense overlapping diagonal mesh', correctElementId: 'lattice-truss' },
    ],
  },
}

export const advancedFoundationsComparison: ComparisonSet = {
  id: 'advanced-foundations',
  category: 'structural' as ComparisonSet['category'],
  difficulty: 'advanced',
  title: 'Specialized Foundation Systems',
  subtitle: 'Solutions for challenging conditions',
  description: 'When standard foundations won\'t work, engineers turn to these specialized systems for difficult soils, water, and environmental concerns.',

  elements: [
    { id: 'bored-pile', name: 'Bored Pile', component: BoredPileSVG },
    { id: 'strip-footing', name: 'Strip Footing', component: StripFootingSVG },
    { id: 'combined-footing', name: 'Combined', component: CombinedFootingSVG },
    { id: 'floating-foundation', name: 'Floating', component: FloatingFoundationSVG },
  ],

  features: [
    {
      label: 'Key Principle',
      values: {
        'bored-pile': 'Drilled and cast-in-place - no vibration',
        'strip-footing': 'Continuous footing under walls',
        'combined-footing': 'Single footing under multiple columns',
        'floating-foundation': 'Excavated weight = building weight',
      },
      highlighted: true,
    },
    {
      label: 'When Used',
      values: {
        'bored-pile': 'Urban areas, near existing structures',
        'strip-footing': 'Load-bearing wall construction',
        'combined-footing': 'Closely spaced columns, property lines',
        'floating-foundation': 'Very soft compressible soils',
      },
    },
    {
      label: 'Advantage',
      values: {
        'bored-pile': 'Low noise/vibration, can inspect before pour',
        'strip-footing': 'Simple, economical for wall loads',
        'combined-footing': 'Prevents overlapping footings',
        'floating-foundation': 'No net stress increase on soil',
      },
    },
  ],

  matchingGame: {
    question: 'Match each foundation to its key feature',
    items: [
      { id: 'no-vibration', text: 'Drilled in place - no vibration', correctElementId: 'bored-pile' },
      { id: 'continuous-wall', text: 'Continuous footing under walls', correctElementId: 'strip-footing' },
      { id: 'multi-column', text: 'One footing for multiple columns', correctElementId: 'combined-footing' },
      { id: 'weight-balance', text: 'Excavation weight balances building', correctElementId: 'floating-foundation' },
    ],
  },
}

export const environmentalLoadsComparison: ComparisonSet = {
  id: 'environmental-loads',
  category: 'structural' as ComparisonSet['category'],
  difficulty: 'intermediate',
  title: 'Environmental Loads',
  subtitle: 'Nature\'s forces on structures',
  description: 'Beyond occupancy, structures must resist environmental forces - snow, rain, temperature changes, and water pressure.',

  elements: [
    { id: 'snow-load', name: 'Snow Load', component: SnowLoadSVG },
    { id: 'rain-load', name: 'Rain Load', component: RainLoadSVG },
    { id: 'thermal-load', name: 'Thermal Load', component: ThermalLoadSVG },
    { id: 'hydrostatic-load', name: 'Hydrostatic', component: HydrostaticLoadSVG },
  ],

  features: [
    {
      label: 'Source',
      values: {
        'snow-load': 'Accumulated snow/ice on roofs',
        'rain-load': 'Ponding water on flat roofs',
        'thermal-load': 'Temperature expansion/contraction',
        'hydrostatic-load': 'Water pressure against walls',
      },
      highlighted: true,
    },
    {
      label: 'Critical Location',
      values: {
        'snow-load': 'Roofs - especially valleys and parapets',
        'rain-load': 'Flat roofs with blocked drains',
        'thermal-load': 'Long structures, exposed elements',
        'hydrostatic-load': 'Basements, retaining walls, pools',
      },
    },
    {
      label: 'Design Solution',
      values: {
        'snow-load': 'Adequate slope, strong roof structure',
        'rain-load': 'Positive drainage, secondary drains',
        'thermal-load': 'Expansion joints at intervals',
        'hydrostatic-load': 'Waterproofing + structural resistance',
      },
    },
    {
      label: 'Failure Consequence',
      values: {
        'snow-load': 'Roof collapse (many failures in heavy snow)',
        'rain-load': 'Progressive collapse (ponding instability)',
        'thermal-load': 'Cracking, buckling, joint failure',
        'hydrostatic-load': 'Flooding, wall collapse',
      },
    },
  ],

  culturalContext: 'Ponding collapse of flat roofs killed dozens in the 20th century before codes required secondary drainage. The 1978 Hartford Civic Center roof collapsed under snow load, revolutionizing snow load provisions. Thermal loads were only understood after early steel buildings developed cracks.',

  memoryTip: '**S**now = **S**tacks on roof, **R**ain = **R**ises if blocked, **T**hermal = **T**emperature movement, **H**ydrostatic = **H**₂O pressure',

  matchingGame: {
    question: 'Match each load to its primary concern',
    items: [
      { id: 'roof-weight', text: 'Accumulated weight on sloped roofs', correctElementId: 'snow-load' },
      { id: 'ponding', text: 'Pooling water causing progressive failure', correctElementId: 'rain-load' },
      { id: 'expansion', text: 'Expansion/contraction from temperature', correctElementId: 'thermal-load' },
      { id: 'water-pressure', text: 'Water pressure increasing with depth', correctElementId: 'hydrostatic-load' },
    ],
  },
}

// =============================================================================
// STRUCTURAL COMPARISON SETS REGISTRY
// =============================================================================

export const STRUCTURAL_COMPARISON_SETS: Record<string, ComparisonSet> = {
  'bracing-types': bracingTypesComparison,
  'truss-types': trussTypesComparison,
  'foundation-types': foundationTypesComparison,
  'load-types': loadTypesComparison,
  'advanced-bracing': advancedBracingComparison,
  'advanced-trusses': advancedTrussComparison,
  'advanced-foundations': advancedFoundationsComparison,
  'environmental-loads': environmentalLoadsComparison,
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getStructuralComparisonSetById(id: string): ComparisonSet | undefined {
  return STRUCTURAL_COMPARISON_SETS[id]
}

export function getAllStructuralComparisonSets(): ComparisonSet[] {
  return Object.values(STRUCTURAL_COMPARISON_SETS)
}

export function getStructuralSetsByDifficulty(difficulty: ComparisonSet['difficulty']): ComparisonSet[] {
  return Object.values(STRUCTURAL_COMPARISON_SETS).filter(set => set.difficulty === difficulty)
}
