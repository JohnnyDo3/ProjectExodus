import type { ArchitecturalElement } from '../../../types';

export const TENSION_CABLE: ArchitecturalElement = {
  id: 'tension-cable',
  slug: 'tension-cable',
  name: 'Tension Cable',
  alternativeNames: ['Tensile Cable', 'Suspension Cable', 'Structural Cable', 'Wire Rope Structure'],
  pronunciation: {
    phonetic: 'TEN-shun KAY-bul',
    language: 'English',
  },
  etymology: {
    origin: 'English/Latin',
    meaning: 'Cable under pulling force used as structural element',
    rootWord: 'From Latin "tensio" (stretching) and "capulum" (rope)',
  },
  category: 'STRUCTURAL',
  subcategory: 'high_tech',
  periods: ['high-tech', 'contemporary'],
  regions: ['WESTERN_EUROPE', 'NORTH_AMERICA', 'EAST_ASIA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/tension-cable-primary.jpg',
    gallery: [
      '/images/architecture/elements/tension-cable-millennium-dome.jpg',
      '/images/architecture/elements/tension-cable-detail.jpg',
      '/images/architecture/elements/tension-cable-munich.jpg',
    ],
    diagram: '/images/architecture/diagrams/tension-cable-system.svg',
  },

  description: {
    ELEMENTARY: 'Tension cables are super-strong steel wires that hold up roofs and buildings by pulling, like the cables on a suspension bridge! Instead of heavy columns and beams pushing down, these cables work by being stretched tight. They can create amazing curved shapes and let architects build huge spaces without posts in the way.',
    MIDDLE_SCHOOL: 'Structural tension cables are high-strength steel wires that support roofs and canopies through tension (pulling force) rather than compression. Unlike rigid beams, cables are flexible and can only work in tension, forming catenary curves. This efficient structural system allows long spans with minimal material, creating dramatic lightweight structures typical of High-Tech architecture.',
    HIGH_SCHOOL: 'Tension cable structures exploit steel\'s exceptional tensile strength to create efficient long-span systems. Cable types include suspension systems (cables hang from masts), cable-stayed (cables run from masts to supported surface), and tensile membrane structures (cables pre-tension fabric). The geometry is governed by physics-cables naturally form catenary curves under gravity. Tensioning systems and anchoring details are critical engineering components.',
    UNDERGRADUATE: 'Tension cable structures represent pure structural efficiency-cables carry only axial tension with no bending moments. System types include single-curvature (suspension), double-curvature (anticlastic saddle forms), and cable trusses (triangulated cable networks). Analysis requires nonlinear geometric analysis due to cable flexibility and large deflections. Key design considerations include pre-tensioning requirements, dynamic behavior (wind, vibration), temperature effects on cable tension, and long-term creep and relaxation.',
    GRADUATE: 'Advanced tension structure design engages form-finding algorithms, nonlinear structural dynamics, and material science. Cable materials include galvanized steel, stainless steel, and emerging fiber composites. Research areas include wind-structure interaction (flutter, galloping), seismic performance of suspended structures, and fatigue in cable anchorages. Contemporary development explores hybrid systems combining cables with rigid elements and integration with deployable/adaptive structures. Computational form-finding uses physical modeling (hanging chain models) or numerical methods (dynamic relaxation).',
    PHD: 'Tension structure research spans structural mechanics, architectural geometry, and construction technology. Historical scholarship examines the evolution from suspension bridge engineering through Frei Otto\'s experiments to High-Tech applications. Current research includes topology optimization of cable networks, reliability-based design accounting for cable failure modes, and lifecycle assessment of tension structures versus conventional systems. Critical analysis questions the claimed material efficiency when considering foundations, masts, and maintenance requirements of tension systems.',
  },

  history: {
    ELEMENTARY: 'People have used cables for thousands of years in bridges, but using them in buildings is more recent. In the 1960s-70s, architects started experimenting with cable roofs for Olympic stadiums and exhibition halls. The Millennium Dome in London (2000) has one of the world\'s largest cable-supported roofs, spanning almost a kilometer!',
    MIDDLE_SCHOOL: 'Tension cables evolved from suspension bridge engineering (19th century) through Frei Otto\'s pioneering tensile structures (1950s-70s) to High-Tech applications. The Munich Olympic Stadium (1972) demonstrated cables\' architectural potential. Rogers\' Millennium Dome (2000) created the world\'s largest cable-supported roof. Contemporary architects use cables for terminal roofs, stadiums, and membrane structures worldwide.',
    HIGH_SCHOOL: 'Structural cables emerged from bridge engineering-John Roebling\'s Brooklyn Bridge (1883) demonstrated steel cable potential. Frei Otto pioneered architectural applications, developing form-finding techniques and lightweight membrane structures (German Pavilion, Expo \'67). High-Tech architects adopted cables for flexibility and technological expression. Major examples include Munich Olympic Stadium (Behnisch/Otto, 1972), Stansted Airport (Foster, 1991), and Millennium Dome (Rogers, 2000).',
    UNDERGRADUATE: 'Tension structure history traces from ancient tent traditions and suspension bridges through systematic engineering development. Key figures include Buckminster Fuller (tensegrity concept), Frei Otto (physical form-finding), and engineers like Ove Arup (Munich Olympics engineering). High-Tech architects embraced cables for their dematerialized aesthetic and structural efficiency. The 1990s-2000s saw proliferation in airport terminals and stadiums. Contemporary development includes deployable structures and integration with ETFE cushions.',
    GRADUATE: 'Historical analysis reveals tension structures\' relationship to broader architectural and engineering currents. Otto\'s work connected to biology, optimization, and sustainable design-ideas resonant in contemporary parametric design. The technology enabled signature High-Tech buildings but required sophisticated engineering-the appearance of simplicity masked complex analysis and detailing. Economic factors favored tension structures for large-span, temporary, or budget-constrained projects. Contemporary challenges include aging cable infrastructure and replacement strategies.',
    PHD: 'Scholarly research examines tension structures through lenses of structural optimization, architectural expression, and cultural meaning. Historical work documents the parallel development of form-finding methods and computational structural analysis. Critical scholarship questions the sustainability claims-while material-efficient in structural terms, tension structures often require energy-intensive climate control and regular maintenance. Contemporary research addresses the conservation of historic tension structures, including cable replacement and membrane renewal, engaging heritage and technical questions.',
  },

  characteristics: [
    'High-strength steel cables in tension',
    'Lightweight structural system',
    'Long-span capability with minimal material',
    'Forms natural catenary curves',
    'Requires pre-tensioning and anchoring',
    'Often combined with membrane roofs',
    'Creates distinctive curved geometries',
  ],

  famousExamples: [
    {
      name: 'Millennium Dome (The O2)',
      location: 'London, UK',
      year: '2000',
      description: 'Rogers\' enormous cable-supported dome with 365-meter diameter'
    },
    {
      name: 'Munich Olympic Stadium',
      location: 'Munich, Germany',
      year: '1972',
      description: 'Behnisch and Otto\'s pioneering tent-like cable roof structure'
    },
    {
      name: 'Stansted Airport Terminal',
      location: 'London, UK',
      year: '1991',
      description: 'Foster\'s terminal with cable-stayed roof supported by tree columns'
    },
    {
      name: 'Dulles Airport Terminal',
      location: 'Washington DC, USA',
      year: '1962',
      description: 'Saarinen\'s suspended cable roof forming dramatic catenary curve'
    },
    {
      name: 'German Pavilion Expo 67',
      location: 'Montreal, Canada',
      year: '1967',
      description: 'Frei Otto\'s experimental tensile membrane structure'
    },
  ],

  confusionPairs: [
    {
      elementId: 'suspension-bridge',
      reason: 'Both use tension cables for support',
      distinction: 'Suspension bridges carry vertical deck loads; architectural cables typically support roofs or canopies with different load patterns',
    },
    {
      elementId: 'cable-stayed',
      reason: 'Both use cables as primary structure',
      distinction: 'Cable-stayed systems have straight cables from masts to surface; suspension systems use draped catenary cables between supports',
    },
  ],

  searchTags: ['high-tech', 'cable', 'tension', 'lightweight', 'membrane', 'suspension', 'catenary', 'stadium', 'rogers', 'foster', 'otto'],

  arMetadata: {
    modelPath: '/models/architecture/tension-cable.glb',
    scale: 0.4,
    rotatable: true,
    annotations: [
      { label: 'Main Suspension Cable', position: { x: 0, y: 2, z: 0 } },
      { label: 'Anchor Point', position: { x: -2, y: 0, z: 0 } },
      { label: 'Cable Clamp', position: { x: 0.5, y: 1.5, z: 0 } },
      { label: 'Tensioning Device', position: { x: 1.8, y: 0.2, z: 0 } },
    ],
  },

  difficultyScore: 4,
  dateAdded: new Date('2024-12-31'),
  lastUpdated: new Date('2024-12-31'),
};
