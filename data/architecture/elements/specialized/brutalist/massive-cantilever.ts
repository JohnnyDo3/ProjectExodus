import type { ArchitecturalElement } from '../../../types';

export const MASSIVE_CANTILEVER: ArchitecturalElement = {
  id: 'massive-cantilever',
  slug: 'massive-cantilever',
  name: 'Massive Cantilever',
  alternativeNames: ['Cantilevered Concrete Form', 'Heavy Overhang', 'Projecting Concrete Mass'],
  pronunciation: {
    phonetic: 'MAS-iv KAN-til-ee-ver',
    language: 'English',
  },
  etymology: {
    origin: 'English/Latin',
    meaning: 'Massive (large, heavy) + cantilever (projecting beam supported only at one end)',
    rootWord: 'Latin massa (lump, mass) + possibly cant (edge) + lever',
  },
  category: 'STRUCTURAL',
  subcategory: 'structural_expression',
  periods: ['brutalism'],
  regions: ['EUROPE', 'NORTH_AMERICA', 'ASIA', 'SOUTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/massive-cantilever-primary.jpg',
    gallery: [
      '/images/architecture/elements/cantilever-boston-city-hall.jpg',
      '/images/architecture/elements/cantilever-habitat.jpg',
      '/images/architecture/elements/cantilever-underside.jpg',
    ],
    diagram: '/images/architecture/diagrams/massive-cantilever.svg',
  },

  description: {
    ELEMENTARY: 'A massive cantilever is when a heavy part of a concrete building sticks out over empty space, like a diving board! The concrete floor or wall hangs in the air without any poles underneath to hold it up. It looks like it\'s floating and seems to defy gravity. Brutalist architects loved to show off this amazing engineering trick.',
    MIDDLE_SCHOOL: 'A massive cantilever is a large concrete structural element that projects horizontally beyond its support, with no columns or walls underneath. In Brutalist architecture, these dramatic overhangs demonstrate concrete\'s structural capacity and create bold, gravity-defying forms. Examples include projecting upper floors, deep overhangs, and sculptural balconies that express the building\'s structural logic.',
    HIGH_SCHOOL: 'Massive cantilevers in Brutalist architecture are heavy concrete elements extending beyond their vertical support, relying on tensile reinforcement and structural depth to resist bending moments. These dramatic projections (often 3-10 meters) serve multiple purposes: creating covered spaces below, expressing structural forces, achieving dynamic compositions, and demonstrating concrete\'s engineering potential. The visible thickness and weight emphasize material honesty.',
    UNDERGRADUATE: 'Massive cantilevers represent a key tectonic strategy in Brutalist design, exploiting reinforced concrete\'s ability to resist tensile stresses. Structural depth requirements (typically span/8 to span/10) become aesthetic features rather than concealed necessities. Engineers like Ove Arup enabled ambitious cantilevers through careful calculation of moment distribution, shear forces, and deflection limits. Boston City Hall\'s upper-floor cantilevers (1968) exemplify this approach, projecting dramatically while housing mechanical systems within structural depth.',
    GRADUATE: 'The massive cantilever embodies Brutalism\'s ethical and aesthetic commitments to structural expression and material truth. Unlike lighter steel cantilevers concealed behind cladding, concrete cantilevers reveal their structural depth, reinforcement requirements (through tie locations), and load paths. Critical analysis must address the tension between structural "honesty" and the extensive hidden reinforcement enabling these dramatic gestures. The weathering of cantilevered elements-particularly undersides-presents conservation challenges distinct from vertical surfaces.',
    PHD: 'Scholarly examination of massive cantilevers requires integrating structural engineering history, architectural phenomenology, and building performance analysis. Research questions include: How did computational tools (emerging in the 1960s) enable increasingly bold cantilevers? What role did contractor expertise play in realizing complex reinforcement schemes? How do users phenomenologically experience spaces beneath hovering masses? Contemporary assessment must address structural adequacy under updated loading codes, concrete carbonation in thin sections, and thermal bridging through cantilevered slabs.',
  },

  history: {
    ELEMENTARY: 'In the 1960s, architects and engineers figured out how to make concrete so strong that huge pieces could hang in mid-air. Buildings like Boston City Hall and Habitat 67 showed off these amazing floating concrete boxes. People were amazed-and sometimes a little scared-by these bold, heavy structures hanging overhead!',
    MIDDLE_SCHOOL: 'Massive concrete cantilevers became possible through advances in reinforced concrete engineering in the 1950s-60s. Architects like Le Corbusier, Kenzo Tange, and the team behind Boston City Hall used dramatic cantilevers to express structural power and create sheltered public spaces. The technique peaked in the 1960s-70s as computers helped engineers calculate more complex forms.',
    HIGH_SCHOOL: 'The development of massive cantilevers paralleled Brutalism\'s rise (1955-1975), enabled by three factors: improved concrete technology, structural calculation advances, and ideological commitments to expressing forces. Le Corbusier\'s Chandigarh buildings (1950s) pioneered monumental cantilevers. Boston City Hall (1968), Habitat 67 (1967), and Geisel Library San Diego (1970) pushed cantilever scale to dramatic extremes, creating iconic silhouettes while generating maintenance challenges.',
    UNDERGRADUATE: 'Massive cantilevers emerged from collaboration between architecturally ambitious designers and innovative structural engineers. Ove Arup\'s work with Denys Lasdun, Pier Luigi Nervi\'s contributions to UNESCO Paris (1958), and Moshe Safdie\'s engineering team at Habitat 67 demonstrate this partnership. The scale of cantilevers increased through the 1960s: early examples projected 3-4 meters, while later buildings achieved 8-10 meter cantilevers. Computer-aided calculation (emerging 1965+) enabled verification of complex load conditions.',
    GRADUATE: 'The historiography of massive cantilevers intersects with debates about technological determinism in architecture. While often presented as inevitable expressions of structural logic, archival research reveals extensive design iteration, cost concerns, and contractor skepticism. The University of Massachusetts Dartmouth (Paul Rudolph, 1963-66) documents show cantilever designs revised multiple times balancing architectural intent against constructability. Regional building traditions influenced cantilever adoption: less common in earthquake-prone areas.',
    PHD: 'Critical scholarship on massive cantilevers addresses multiple themes: the rhetoric of structural expression versus actual force distribution, the role of hidden post-tensioning in enabling "massive" appearances, phenomenological responses to hovering weight, and long-term structural performance. Recent engineering assessments reveal that some celebrated cantilevers require strengthening due to inadequate original design, concrete deterioration, or updated loading requirements. Oral histories with structural engineers provide crucial insights into design compromises not evident in published documentation.',
  },

  characteristics: [
    'Heavy concrete element projecting beyond support',
    'Visible structural depth (thick slabs)',
    'No columns or walls beneath projection',
    'Typically 3-10 meter projection distance',
    'Emphasized through shadow and undercutting',
    'Express compressive and tensile forces',
  ],

  famousExamples: [
    { name: 'Boston City Hall', location: 'Boston, USA', year: '1968', description: 'Dramatic upper-floor cantilevers over brick plaza' },
    { name: 'Habitat 67', location: 'Montreal, Canada', year: '1967', description: 'Stacked concrete modules creating multiple cantilevers' },
    { name: 'Geisel Library', location: 'San Diego, USA', year: '1970', description: 'Inverted pyramid with massive upper floors cantilevering outward' },
    { name: 'National Theatre', location: 'London, UK', year: '1976', description: 'Terraced cantilevers stepping toward the Thames' },
    { name: 'Barbican Estate', location: 'London, UK', year: '1965-1976', description: 'Residential towers with projecting balcony slabs' },
  ],

  confusionPairs: [
    {
      elementId: 'flying-buttress',
      reason: 'Both are projecting structural elements',
      distinction: 'Flying buttresses transfer thrust externally; cantilevers project horizontally using internal reinforcement',
    },
    {
      elementId: 'corbel',
      reason: 'Both project from vertical supports',
      distinction: 'Corbels are small brackets; massive cantilevers are large-scale structural slabs',
    },
  ],

  searchTags: ['cantilever', 'concrete', 'brutalist', 'structural', 'overhang', 'projection', 'engineering', 'gravity-defying'],

  arMetadata: {
    modelPath: '/models/architecture/massive-cantilever.glb',
    scale: 0.8,
    rotatable: true,
    annotations: [
      { label: 'Cantilevered Slab', position: { x: 0.5, y: 0.7, z: 0 } },
      { label: 'Support Point', position: { x: -0.3, y: 0.7, z: 0 } },
      { label: 'Structural Depth', position: { x: 0.3, y: 0.65, z: 0.1 } },
      { label: 'Underside', position: { x: 0.4, y: 0.6, z: 0 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
