import type { ArchitecturalElement } from '../../../types';

export const GERBERETTE: ArchitecturalElement = {
  id: 'gerberette',
  slug: 'gerberette',
  name: 'Gerberette',
  alternativeNames: ['Cast Steel Bracket', 'Rocker Beam', 'Cantilever Bracket', 'Gerber Joint'],
  pronunciation: {
    phonetic: 'zhair-buh-RET',
    language: 'French',
  },
  etymology: {
    origin: 'French',
    meaning: 'Named after engineer Heinrich Gerber who invented the pin-jointed cantilever beam',
    rootWord: 'From German engineer Gerber + French diminutive suffix -ette',
  },
  category: 'STRUCTURAL',
  subcategory: 'high_tech',
  periods: ['high-tech', 'contemporary'],
  regions: ['WESTERN_EUROPE', 'NORTH_AMERICA', 'EAST_ASIA'],

  images: {
    primary: '/images/architecture/elements/gerberette-primary.jpg',
    gallery: [
      '/images/architecture/elements/gerberette-pompidou.jpg',
      '/images/architecture/elements/gerberette-detail.jpg',
      '/images/architecture/elements/gerberette-casting.jpg',
    ],
    diagram: '/images/architecture/diagrams/gerberette-system.svg',
  },

  description: {
    ELEMENTARY: 'A gerberette is a special cast steel bracket that looks like a giant mechanical part. It\'s like a strong metal arm that sticks out from a column to support floor beams. The Centre Pompidou has famous gerberettes-big sculptural steel pieces that hold up the building while looking like beautiful machine parts. They show how engineers and architects can make structural pieces look amazing!',
    MIDDLE_SCHOOL: 'Gerberettes are cast steel cantilever brackets that project from columns to support floor beams at mid-span. This creates a pin-jointed system that reduces bending moments in beams. Invented for bridge construction, gerberettes became iconic architectural elements at Centre Pompidou, where massive cast steel pieces form dramatic sculptural statements while performing precise structural functions. They exemplify High-Tech\'s celebration of engineering as architecture.',
    HIGH_SCHOOL: 'The gerberette system uses cantilevered brackets projecting from columns, supporting beams at points of inflection (where bending moment reverses). This creates statically determinate structures with reduced member sizes. At Centre Pompidou, cast steel gerberettes cantilever 7 meters, supporting main beams that span between them. The system allows large column-free spaces and expresses structural logic through sculptural cast forms. Engineering requirements include precise casting tolerances, connection detailing, and thermal expansion accommodation.',
    UNDERGRADUATE: 'Gerberettes function as rocker beams in cantilever-suspended beam systems, creating points of zero moment in continuous spans. Structural advantages include determinate behavior (no moment redistribution), smaller beam sections (reduced moments), and construction logic (sequential erection). Centre Pompidou\'s gerberettes are cast steel (not fabricated), enabling complex organic forms optimized for stress distribution. Contemporary applications are rare-the system requires significant engineering investment and specialized fabrication. The element represents High-Tech\'s peak expression of technology-as-architecture.',
    GRADUATE: 'Gerberette structural systems engage advanced statics, material optimization, and fabrication technology. The cantilever length, support points, and beam spans must be coordinated to achieve moment inflection at supports. Centre Pompidou\'s gerberettes underwent extensive scale model testing and finite element analysis. Cast steel enables sculptural forms following stress patterns-compression zones thicken, tension zones thin. Research areas include optimization of cast structural forms, 3D-printed steel nodes (contemporary equivalent), and the relationship between structural rationality and architectural expression.',
    PHD: 'Gerberette scholarship examines the intersection of structural engineering, industrial production, and architectural aesthetics. The element represents High-Tech\'s ambition to transform engineering logic into architectural poetry. Historical research documents the design development, testing protocols, and fabrication challenges of Pompidou\'s gerberettes. Critical analysis questions whether such bespoke, expensive structural gestures truly represent technological efficiency or constitute technological ornament-structure styled to appear hyper-engineered. Contemporary work explores digital fabrication enabling similar custom-optimized structural nodes without traditional casting limitations.',
  },

  history: {
    ELEMENTARY: 'Gerberettes were invented in the 1860s by a German engineer named Heinrich Gerber for building bridges. But they became famous in architecture when Renzo Piano and Richard Rogers used huge decorative versions at the Centre Pompidou in Paris (1977). These cast steel sculptures are both beautiful art and hard-working structural parts-true High-Tech style!',
    MIDDLE_SCHOOL: 'Heinrich Gerber invented the pin-jointed cantilever system for bridges in 1866, creating statically determinate structures. The principle remained primarily in bridge engineering until Rogers and Piano used it architecturally at Centre Pompidou (1977). Their massive cast steel gerberettes became iconic symbols of High-Tech architecture. While other architects explored cast steel nodes, gerberettes remained rare due to fabrication complexity and cost.',
    HIGH_SCHOOL: 'Gerber\'s 1866 bridge system solved structural problems through cantilevered brackets creating pin joints at moment inflection points. The principle entered architecture through postwar engineering-influenced design. Centre Pompidou (1977) transformed utilitarian brackets into sculptural cast steel forms, each 10 tons, engineered by Ove Arup. The gerberettes enabled 48-meter column-free spans for flexible gallery spaces. No subsequent project matched Pompidou\'s gerberette scale, though the concept influenced thinking about expressive structural connections.',
    UNDERGRADUATE: 'Gerberette history interweaves civil engineering (bridge construction), structural innovation (statically determinate systems), and architectural expression (technology-as-ornament). Pompidou\'s gerberettes required unprecedented scale casting-the foundry created full-scale wooden patterns for sand casting. Structural testing included 1:3 scale models loaded to failure. The engineering team (Peter Rice of Arup) developed the sculptural forms through iterative analysis and optimization. Contemporary digital fabrication offers new possibilities for complex structural nodes, though few projects justify the investment.',
    GRADUATE: 'Historical analysis reveals gerberettes\' trajectory from bridge engineering pragmatism to architectural iconography. Peter Rice\'s engineering philosophy-making structure visible and celebrated-found perfect expression in Pompidou\'s cast steel pieces. Documentation of the design process shows tension between structural optimization (minimizing material) and architectural presence (ensuring visual mass). The fabrication challenges-pattern-making, casting tolerances, connection detailing-pushed 1970s industrial capacity. Contemporary scholarship examines whether gerberettes represent structural honesty or constitute ornamental structure-they work structurally but aren\'t necessary (alternative systems could achieve similar spans).',
    PHD: 'Gerberette scholarship engages engineering history, architectural theory, and industrial technology. Research examines the broader context of cast steel in architecture-largely abandoned after WWII but revived by High-Tech architects seeking sculptural structural expression. Critical analysis interrogates the "honesty" claims-gerberettes are deliberately over-scaled for visual impact, not pure structural efficiency. The relationship between engineering analysis (stress optimization) and sculptural form-making (aesthetic refinement) reveals collaboration between architects and engineers. Contemporary research addresses digital fabrication enabling similar bespoke structural nodes, questioning whether technological advances democratize what were elite, expensive gestures.',
  },

  characteristics: [
    'Cast steel cantilever bracket',
    'Projects from column to support beam mid-span',
    'Creates pin-jointed structural system',
    'Sculptural organic form following stress patterns',
    'Reduces bending moments in beams',
    'Requires precise engineering and casting',
    'Iconic High-Tech architectural element',
  ],

  famousExamples: [
    {
      name: 'Centre Pompidou',
      location: 'Paris, France',
      year: '1977',
      description: 'Rogers/Piano\'s cultural center with massive cast steel gerberettes-10 tons each, 7m cantilevers'
    },
    {
      name: 'Gerber Viaduct',
      location: 'Bamberg, Germany',
      year: '1867',
      description: 'Heinrich Gerber\'s original application of the cantilever bracket system in bridge engineering'
    },
    {
      name: 'Lloyd\'s Building',
      location: 'London, UK',
      year: '1986',
      description: 'Richard Rogers\' building with cast structural nodes (conceptually related to gerberettes)'
    },
    {
      name: 'Stansted Airport Terminal',
      location: 'London, UK',
      year: '1991',
      description: 'Norman Foster\'s terminal with cast steel tree column capitals (similar expressive structural casting)'
    },
    {
      name: 'PA Technology Centre',
      location: 'Princeton, USA',
      year: '1985',
      description: 'Richard Rogers with cast steel structural connections influenced by gerberette principle'
    },
  ],

  confusionPairs: [
    {
      elementId: 'cantilever',
      reason: 'Gerberettes are cantilevered elements',
      distinction: 'Gerberettes are specific cast steel brackets creating pin joints; cantilevers are any projecting structural elements',
    },
    {
      elementId: 'bracket',
      reason: 'Both are structural support elements',
      distinction: 'Gerberettes are precision-engineered cast steel rocker beams; brackets are general support elements of various materials and forms',
    },
  ],

  searchTags: ['high-tech', 'cast-steel', 'structural', 'pompidou', 'bracket', 'cantilever', 'engineering', 'rogers', 'piano', 'peter-rice'],

  arMetadata: {
    modelPath: '/models/architecture/gerberette.glb',
    scale: 0.15,
    rotatable: true,
    annotations: [
      { label: 'Cast Steel Body', position: { x: 0, y: 0.5, z: 0 } },
      { label: 'Column Connection Point', position: { x: -0.5, y: 0, z: 0 } },
      { label: 'Beam Support Point (Pin)', position: { x: 0.7, y: 0.5, z: 0 } },
      { label: 'Tie Rod Connection', position: { x: 0.7, y: 0.2, z: 0 } },
    ],
  },

  difficultyScore: 5,
  dateAdded: new Date('2024-12-31'),
  lastUpdated: new Date('2024-12-31'),
};
