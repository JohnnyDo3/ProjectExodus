import type { ArchitecturalElement } from '../../types';

export const WAFFLE_SLAB: ArchitecturalElement = {
  id: 'waffle-slab',
  slug: 'waffle-slab',
  name: 'Waffle Slab',
  alternativeNames: ['Two-Way Joist System', 'Grid Slab', 'Coffered Slab', 'Waffle Raft'],
  pronunciation: {
    phonetic: 'WAH-ful SLAB',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'Grid-patterned concrete slab resembling a waffle',
    rootWord: 'Descriptive term from visual similarity to breakfast waffle',
  },
  category: 'FLOOR',
  subcategory: 'structural',
  periods: ['MODERN', 'CONTEMPORARY'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/waffle-slab-primary.jpg',
    gallery: [
      '/images/architecture/elements/waffle-slab-underside.jpg',
      '/images/architecture/elements/waffle-slab-construction.jpg',
    ],
    diagram: '/images/architecture/diagrams/waffle-slab-section.svg',
  },

  description: {
    ELEMENTARY: 'A waffle slab is a special kind of concrete floor that looks like a waffle from underneath! It has a grid pattern of squares that make it strong but lighter than a regular flat floor. The pattern helps the floor hold more weight while using less concrete. It\'s used in big buildings like schools, malls, and parking garages.',
    MIDDLE_SCHOOL: 'Waffle slabs are reinforced concrete floor systems with a grid of recessed square pockets on the underside. This two-way ribbed structure reduces weight while maintaining strength. The ribs run in both directions (unlike one-way joist systems), creating the characteristic waffle pattern. This design allows for longer spans between columns and is efficient for large, open floor plans.',
    HIGH_SCHOOL: 'Waffle slab construction uses a grid of intersecting concrete ribs (joists) typically 3-6 feet apart, with solid concrete areas at column locations. The voids between ribs are formed using removable fiberglass or plastic dome forms. This reduces the slab\'s self-weight by 30-50% compared to flat slabs while providing excellent two-way bending resistance. The system is economical for spans of 30-50 feet and heavy loading conditions.',
    UNDERGRADUATE: 'Waffle slabs represent an optimization of concrete structural efficiency through geometric configuration. The bidirectional rib system distributes loads along two axes, reducing moments and deflections. Design parameters include rib spacing (typically 900-1500mm), rib depth, top slab thickness, and solid head areas at columns. The system excels when repetitive bay sizes, moderate-to-heavy loads, and architectural desire for exposed structure align. Integration with MEP systems requires coordination of ductwork with the grid pattern.',
    GRADUATE: 'Analysis of waffle slabs involves complex load distribution, punching shear at columns, and serviceability considerations. Design methodologies include equivalent frame analysis, finite element modeling, and direct design method adaptations. Contemporary practice addresses sustainability through reduced concrete volume, potential for exposed thermal mass, and recyclability of formwork systems. Innovation areas include post-tensioning integration, hybrid steel-concrete systems, and use of fiber-reinforced concrete to reduce reinforcement congestion at rib intersections.',
    PHD: 'Waffle slab research encompasses structural optimization, construction methodology, and lifecycle performance. Studies examine topology optimization algorithms for rib spacing, assessment of long-term deflection behavior, and seismic performance characteristics. Material innovations include ultra-high-performance concrete for thinner ribs and textile-reinforced concrete alternatives. Sustainability research addresses embodied carbon reduction strategies, potential for biogenic aggregate incorporation, and end-of-life deconstruction methods. Historical analysis traces development from 1950s innovation through contemporary parametric design applications.',
  },

  history: {
    ELEMENTARY: 'Waffle slabs were invented in the 1950s when engineers wanted to build bigger rooms without as many columns in the way. They figured out that making the concrete floor look like a waffle made it just as strong but much lighter. Today, it\'s a popular choice for buildings that need big, open spaces.',
    MIDDLE_SCHOOL: 'The waffle slab system was developed in the mid-20th century as engineers sought more efficient concrete structures. Early applications appeared in the 1950s-1960s, enabled by the development of reusable fiberglass dome forms. The system gained popularity during the construction boom of the 1960s-1970s for commercial buildings, parking structures, and educational facilities requiring large column-free spaces.',
    HIGH_SCHOOL: 'Waffle slab development emerged from post-World War II innovations in concrete technology and formwork systems. Engineers recognized that removing concrete from areas with minimal stress improved structural efficiency. The 1950s introduction of standardized dome formwork made the system economically viable. Brutalist architecture of the 1960s-1970s often exposed waffle slabs as dramatic ceiling features. Computer analysis in the 1980s enabled optimization of rib spacing and depth for specific loading conditions.',
    UNDERGRADUATE: 'The waffle slab represents the application of structural optimization principles to concrete construction. Its development paralleled advances in reinforced concrete theory, particularly two-way slab behavior understanding. Mid-century modernist architects (Paul Rudolph, Louis Kahn) exploited the system\'s formal qualities. The 1970s energy crisis spurred interest in exposed waffle slabs for thermal mass. Contemporary resurgence reflects both sustainable design interest in material efficiency and parametric design tools enabling non-uniform grid patterns.',
    GRADUATE: 'Historical development of waffle slabs illustrates the intersection of structural theory, construction economics, and architectural expression. Early research by Westergaard and Nichols established theoretical foundations. Post-war material availability and labor costs favored mechanized formwork systems. Case studies reveal regional variations in adoption based on construction culture and seismic requirements. Decline in 1980s-1990s resulted from acoustic concerns, MEP integration challenges, and competition from post-tensioned flat slabs. Twenty-first century revival correlates with digital design tools and renewed emphasis on structural expression.',
    PHD: 'Waffle slab historiography engages construction history, structural engineering evolution, and architectural technology studies. Research examines the system\'s role in modernist spatial ambitions, analysis of pioneering projects (including failures), and documentation of regional form-making variations. Conservation challenges for mid-century waffle slab buildings include concrete carbonation, reinforcement corrosion, and modification for contemporary loading/code requirements. Contemporary scholarship addresses the system\'s potential in mass timber hybrid structures and its applicability to 3D-printed concrete construction.',
  },

  characteristics: [
    'Two-way ribbed concrete structural system',
    'Grid pattern of recessed square pockets on underside',
    'Reduces slab weight by 30-50% versus flat slabs',
    'Typical rib spacing 3-6 feet (900-1800mm)',
    'Economical for spans of 30-50 feet',
    'Solid concrete sections at column locations',
    'Can be exposed as architectural ceiling feature',
    'Provides excellent two-way load distribution',
  ],

  famousExamples: [
    { name: 'Yale Art and Architecture Building', location: 'New Haven, Connecticut, USA', year: '1963', description: 'Paul Rudolph\'s Brutalist masterwork with exposed waffle slabs' },
    { name: 'Richards Medical Research Laboratories', location: 'Philadelphia, Pennsylvania, USA', year: '1961', description: 'Louis Kahn\'s design featuring prominent waffle slab ceilings' },
    { name: 'National Theatre', location: 'London, UK', year: '1976', description: 'Denys Lasdun\'s Brutalist complex with extensive waffle slab structure' },
    { name: 'Boston City Hall', location: 'Boston, Massachusetts, USA', year: '1968', description: 'Kallmann McKinnell & Knowles\'s iconic Brutalist waffle slab floors' },
    { name: 'Barbican Centre', location: 'London, UK', year: '1982', description: 'Chamberlin, Powell and Bon\'s massive residential and cultural complex' },
  ],

  confusionPairs: [
    {
      elementId: 'coffered-ceiling',
      reason: 'Both have recessed grid patterns',
      distinction: 'Waffle slabs are structural floor systems; coffered ceilings are decorative non-structural elements',
    },
    {
      elementId: 'one-way-joist',
      reason: 'Both are ribbed concrete systems',
      distinction: 'Waffle slabs have ribs in both directions forming a grid; one-way joists run parallel in a single direction',
    },
  ],

  searchTags: ['concrete', 'structural', 'grid', 'two-way', 'joist', 'slab', 'modern', 'brutalist', 'engineering', 'efficient'],

  arMetadata: {
    modelPath: '/models/architecture/waffle-slab.glb',
    scale: 0.8,
    rotatable: true,
    annotations: [
      { label: 'Top Slab', position: { x: 0, y: 0.3, z: 0 } },
      { label: 'Concrete Ribs (Joists)', position: { x: 0.2, y: 0.1, z: 0.2 } },
      { label: 'Dome Void', position: { x: -0.15, y: 0, z: -0.15 } },
      { label: 'Solid Column Head', position: { x: 0.4, y: 0.15, z: 0.4 } },
    ],
  },

  difficultyScore: 4,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
