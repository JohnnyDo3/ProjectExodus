import type { ArchitecturalElement } from '../../../types';

export const SCULPTURAL_STAIRCASE: ArchitecturalElement = {
  id: 'sculptural-staircase',
  slug: 'sculptural-staircase',
  name: 'Sculptural Staircase',
  alternativeNames: ['Concrete Stair Sculpture', 'Monumental Stair', 'Expressive Stairway', 'Dramatic Stair'],
  pronunciation: {
    phonetic: 'SKULP-chur-al STAIR-kase',
    language: 'English',
  },
  etymology: {
    origin: 'English/Latin',
    meaning: 'Sculptural (three-dimensional artistic form) + staircase (structure for ascending levels)',
    rootWord: 'Latin sculptura (carving, sculpture)',
  },
  category: 'INTERIOR',
  subcategory: 'circulation_feature',
  periods: ['brutalism'],
  regions: ['EUROPE', 'NORTH_AMERICA', 'ASIA', 'SOUTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/sculptural-staircase-primary.jpg',
    gallery: [
      '/images/architecture/elements/staircase-barbican.jpg',
      '/images/architecture/elements/staircase-concrete-form.jpg',
      '/images/architecture/elements/staircase-dramatic-angle.jpg',
    ],
    diagram: '/images/architecture/diagrams/sculptural-staircase.svg',
  },

  description: {
    ELEMENTARY: 'A sculptural staircase is when stairs are so beautiful and dramatic that they look like a giant piece of art! Made from concrete, these stairs twist, fold, or float in amazing ways. Instead of hiding stairs in a corner, Brutalist architects made them the star of the room, like a sculpture you can walk on.',
    MIDDLE_SCHOOL: 'Sculptural staircases in Brutalist architecture are concrete stairs designed as dramatic, three-dimensional forms rather than purely functional elements. These stairs often feature bold geometric shapes, floating treads, sweeping curves, or angular zigzags. They become focal points in building interiors, expressing the plasticity of concrete and the building\'s spatial drama.',
    HIGH_SCHOOL: 'Sculptural staircases represent Brutalism\'s celebration of concrete as a plastic, formable material capable of creating complex three-dimensional geometries. Unlike conventional stairs concealed in service cores, these staircases occupy prominent positions, often with dramatic natural lighting. Structural systems vary: cantilevered treads from central spines, folded plate construction, or helical forms. The visible concrete construction-formwork marks, joints, and structural depth-is integral to their aesthetic impact.',
    UNDERGRADUATE: 'Sculptural staircases in Brutalist architecture exploit reinforced concrete\'s capacity for complex formwork and monolithic construction. Design strategies include: helical stairs emphasizing continuous form, zigzagging flights expressing directional changes, cantilevered treads demonstrating structural bravado, and folded-plate geometries showing spatial origami. Notable examples include the Barbican Estate\'s residential tower stairs, Boston City Hall\'s ceremonial stairs, and Paul Rudolph\'s Yale Art and Architecture Building (1963) with its interlocking stair volumes.',
    GRADUATE: 'The sculptural staircase embodies multiple Brutalist principles: structural expression (visible load paths), material honesty (exposed concrete construction), spatial drama (volumetric complexity), and phenomenological engagement (kinesthetic experience of ascent). Critical analysis reveals tensions between sculptural ambition and functional performance-some celebrated stairs prove difficult to navigate or maintain. The design and construction of complex stair geometries required sophisticated formwork engineering and often extensive mockups to resolve technical challenges.',
    PHD: 'Scholarly examination of sculptural staircases must integrate multiple frameworks: phenomenology of movement (Maurice Merleau-Ponty\'s embodied experience), structural engineering history (calculation of complex geometries), construction practice (formwork innovation), and spatial theory (Colin Rowe\'s transparency concepts). Research questions include: How did architects and engineers collaborate on geometrically complex stairs? What role did physical models play in design resolution? How do users phenomenologically experience dramatic stair spaces? Conservation challenges include wear patterns on sculptural treads and structural assessment of aging concrete in complex forms.',
  },

  history: {
    ELEMENTARY: 'Starting in the 1950s, architects decided that stairs should be exciting instead of boring! Le Corbusier made amazing spiral stairs in his buildings. Soon, other architects were creating concrete stairs that looked like ribbons, zigzags, or even floating steps. The Barbican in London and many university buildings have spectacular staircases that people still photograph today.',
    MIDDLE_SCHOOL: 'Sculptural concrete staircases emerged in the 1950s-60s as architects explored concrete\'s expressive potential. Le Corbusier\'s late work, including Chandigarh (1952-65), featured dramatic stairs. Paul Rudolph\'s Yale Art and Architecture Building (1963) made the stair the central organizing element. The Barbican Estate (1965-76) created distinctive residential tower stairs with dramatic forms and natural lighting.',
    HIGH_SCHOOL: 'The development of sculptural staircases paralleled Brutalism\'s evolution from 1955-1980. Early examples like Le Corbusier\'s Millowners\' Association Building, Ahmedabad (1954) established the precedent of stairs as sculptural features. Mid-period works (1960s) achieved greater structural daring: Boston City Hall\'s grand stair (1968), Denys Lasdun\'s University of East Anglia platforms. By the 1970s, sculptural stairs became standard in institutional buildings, though construction costs and maintenance concerns eventually limited their use.',
    UNDERGRADUATE: 'Sculptural staircases developed through interaction between architectural vision and engineering innovation. Key technical advances included: pre-calculation of complex geometries (enabled by early computers), improved formwork systems for curved surfaces, and better understanding of reinforcement layouts in non-orthogonal elements. Regional variations appeared: British examples often emphasized geometric clarity, American work favored bold cantilevers, Japanese interpretations showed refined detailing. The National Theatre London (1976) exemplifies sophisticated integration of multiple stair types.',
    GRADUATE: 'The historiography of sculptural staircases reveals debates about monumentality, accessibility, and functionality in Brutalist design. Archival research shows extensive design iteration-Paul Rudolph\'s Yale stairs underwent multiple revisions balancing drama with code compliance. Critical scholarship examines whether sculptural staircases represent democratic openness (visible circulation) or elitist monumentality (intimidating scale). Accessibility requirements (introduced 1970s-90s) challenged the sculptural stair paradigm, leading to design tensions between original intent and retrofit interventions.',
    PHD: 'Critical analysis of sculptural staircases must address multiple dimensions: the rhetoric of "honest structure" versus hidden reinforcement complexity, the gap between architectural photography and lived experience, labor practices in complex formwork construction, and evolving building codes. Recent conservation work reveals structural concerns-some iconic stairs show concrete deterioration, inadequate drainage detailing, or deflection beyond original design assumptions. Oral histories with users document both awe at spatial drama and practical difficulties with navigation, acoustics, and safety.',
  },

  characteristics: [
    'Prominent placement as spatial focal point',
    'Dramatic geometric forms (spiral, zigzag, folded)',
    'Exposed concrete construction visible',
    'Often paired with dramatic natural lighting',
    'Structural expression through cantilevers or central spine',
    'Formwork patterns and construction joints revealed',
  ],

  famousExamples: [
    { name: 'Barbican Estate', location: 'London, UK', year: '1965-1976', description: 'Residential towers with geometric concrete stairs and top lighting' },
    { name: 'Yale Art and Architecture Building', location: 'New Haven, USA', year: '1963', description: 'Paul Rudolph\'s interlocking stair volumes as spatial organizer' },
    { name: 'Boston City Hall', location: 'Boston, USA', year: '1968', description: 'Monumental ceremonial stair with brick and concrete' },
    { name: 'National Theatre', location: 'London, UK', year: '1976', description: 'Denys Lasdun\'s terraced stairs connecting multiple levels' },
    { name: 'Habitat 67', location: 'Montreal, Canada', year: '1967', description: 'Sculptural concrete stairs connecting modular housing units' },
  ],

  confusionPairs: [
    {
      elementId: 'grand-staircase',
      reason: 'Both are prominent, dramatic stairs',
      distinction: 'Grand staircases are classical/formal; sculptural staircases are modernist/expressive in concrete',
    },
    {
      elementId: 'spiral-stair',
      reason: 'Both can have helical forms',
      distinction: 'Spiral stairs are functional types; sculptural staircases emphasize artistic expression and materiality',
    },
  ],

  searchTags: ['staircase', 'brutalist', 'concrete', 'sculptural', 'dramatic', 'circulation', 'geometry', 'monumental'],

  arMetadata: {
    modelPath: '/models/architecture/sculptural-staircase.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Cantilevered Treads', position: { x: 0.2, y: 0.5, z: 0 } },
      { label: 'Central Spine', position: { x: 0, y: 0.3, z: 0 } },
      { label: 'Formwork Pattern', position: { x: -0.2, y: 0.7, z: 0.1 } },
      { label: 'Dramatic Form', position: { x: 0.3, y: 0.8, z: 0 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
