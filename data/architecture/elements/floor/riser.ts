import type { ArchitecturalElement } from '../../types';

export const RISER: ArchitecturalElement = {
  id: 'riser',
  slug: 'riser',
  name: 'Riser',
  alternativeNames: ['Stair Riser', 'Vertical Face', 'Step Face'],
  pronunciation: {
    phonetic: 'RY-zer',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'The vertical element that rises between treads',
    rootWord: 'From verb "to rise" (to move upward)',
  },
  category: 'FLOOR',
  subcategory: 'circulation',
  periods: ['ANCIENT', 'CLASSICAL', 'MEDIEVAL', 'RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL', 'MODERN', 'CONTEMPORARY'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/riser-primary.jpg',
    gallery: [
      '/images/architecture/elements/riser-detail.jpg',
      '/images/architecture/elements/riser-types.jpg',
    ],
    diagram: '/images/architecture/diagrams/riser-dimensions.svg',
  },

  description: {
    ELEMENTARY: 'The riser is the upright part of a stair step that goes up and down. It\'s like a little wall between each step. When you climb stairs, your toes bump against the riser as you go up. Some modern stairs don\'t have risers at all - those are called "open riser" stairs where you can see through between the steps!',
    MIDDLE_SCHOOL: 'A riser is the vertical board or surface that connects one tread to the next in a staircase. Riser height is measured from the top of one tread to the top of the next. Building codes limit maximum riser height (typically 7-7.75 inches) to prevent stairs from being too steep. All risers in a flight must be the same height for safety. Some contemporary stairs eliminate risers entirely, creating an open, see-through design.',
    HIGH_SCHOOL: 'Stair risers provide the vertical component of stair geometry and can serve structural, safety, and aesthetic functions. Closed risers (solid vertical faces) prevent objects from falling through and provide structural bracing. Open risers (absent vertical faces) create visual transparency and spatial lightness. Riser height follows the inverse relationship with tread depth expressed in Blondel\'s formula (2R + T = 24-25 inches). Code requirements typically limit residential risers to 196mm (7.75 inches) maximum with 4mm maximum variation within a flight.',
    UNDERGRADUATE: 'Riser design addresses biomechanical efficiency, safety regulations, and architectural expression. Lower risers reduce climbing effort but require more floor space; steeper risers are spatially efficient but more fatiguing. Structural role varies: in closed riser stairs, they brace treads and resist deflection; in open riser construction, treads cantilever or require alternative bracing. Contemporary practice navigates code requirements for riser enclosure (preventing 4-inch sphere passage), visual preferences for transparency, and accessibility considerations for users with mobility or vision impairments.',
    GRADUATE: 'Riser analysis encompasses ergonomics, structural mechanics, and code interpretation. Research indicates riser height significantly affects energy expenditure and fall risk, with optimal heights around 170-180mm for typical adult populations. Open versus closed riser debates involve structural efficiency (open risers require stronger treads), psychological factors (acrophobia on transparent stairs), and code compliance (gaps, child safety). Contemporary innovations include perforated risers providing partial transparency, integrated lighting, and parametrically varied heights in monumental stairs. Acoustic considerations include footfall noise transmission in multi-story buildings.',
    PHD: 'Riser research integrates biomechanics, accident epidemiology, structural optimization, and phenomenology of movement. Studies employ motion analysis to correlate riser heights with gait patterns, muscle activation, and fall mechanisms. Material investigations examine impact resistance, acoustic damping, and durability under foot traffic. Building code evolution research traces safety standard development from accident data. Interdisciplinary scholarship addresses cultural variations in stair climbing habits, the psychological experience of open versus closed risers, and the riser\'s role in architectural expression from monumental baroque staircases to minimalist contemporary designs.',
  },

  history: {
    ELEMENTARY: 'For thousands of years, stairs have had risers to keep them strong and safe. Ancient builders carved risers into stone when they made stairs for temples and palaces. In modern times, some architects started leaving out risers to make stairs look light and floating. Both types of stairs - with and without risers - are still used today!',
    MIDDLE_SCHOOL: 'Risers have been integral to stair construction since ancient times. Egyptian, Greek, and Roman stairs typically featured solid risers carved from stone or built with masonry. Medieval wooden stairs used vertical boards as risers. The Renaissance formalized proportional relationships between risers and treads. Modern architecture introduced open riser stairs in the early 20th century, challenging traditional construction. Contemporary practice uses both approaches depending on functional and aesthetic requirements.',
    HIGH_SCHOOL: 'The riser\'s role has evolved from purely structural necessity to architectural choice. Ancient and medieval construction required solid risers for structural stability in stone and timber stairs. Renaissance theorists like Palladio documented ideal riser proportions. Industrial-era safety research established maximum heights to prevent accidents. The Modernist movement (1920s-1960s) celebrated structural minimalism, pioneering open riser stairs. Contemporary open riser designs became feasible with steel and engineered timber allowing cantilevered treads without intermediate support.',
    UNDERGRADUATE: 'Riser history reflects changing construction technology and aesthetic priorities. Pre-industrial stairs required closed risers for structural triangulation. Blondel\'s 1675 formula codified the riser-tread relationship based on average stride. Nineteenth-century building code development standardized riser heights following industrial accident analysis. Modernist architects (Mies van der Rohe, Marcel Breuer) eliminated risers to emphasize spatial flow and structural honesty. Post-1970s building codes addressed open riser safety through gap restrictions. Contemporary practice balances transparency desires with code compliance and user psychology.',
    GRADUATE: 'Historical analysis of riser design reveals tensions between safety, efficiency, and expression. Medieval steep stairs with high risers reflected space constraints and different body mechanics assumptions. Baroque monumental stairs featured low risers (120-140mm) for processional grandeur. Twentieth-century safety science established evidence-based height limits. The open riser\'s modernist origins (expressing structural truthfulness) contrast with contemporary motivations (luxury aesthetics, spatial openness). Regional code variations reflect different safety philosophies, with European standards permitting greater design freedom than North American equivalents.',
    PHD: 'Riser historiography examines the intersection of embodied practice, regulatory frameworks, and architectural ideology. Research addresses historical anthropometric assumptions underlying traditional proportions, documentation of regional vernacular variations, and the cultural meaning of processional versus utilitarian stair types. Conservation challenges include adapting historic stairs with non-compliant riser heights to contemporary codes. Contemporary scholarship investigates the phenomenology of open versus closed risers, psychological research on acrophobia and transparent floors, and the democratization of grand stair proportions (historically reserved for elite spaces) in contemporary residential architecture.',
  },

  characteristics: [
    'Vertical surface connecting consecutive treads',
    'Typical height: 7-7.75 inches (175-196mm) maximum',
    'Must be uniform throughout a flight (±4mm)',
    'Closed risers: solid face preventing object passage',
    'Open risers: absent vertical face for transparency',
    'Relationship to tread: 2R + T = 24-25 inches (Blondel)',
    'Lower risers = easier climb but more space required',
    'Materials: wood, drywall, metal, glass, or none (open)',
  ],

  famousExamples: [
    { name: 'Château de Chambord Double Helix', location: 'France', year: '1519-1547', description: 'Intricate stone risers in da Vinci-attributed staircase' },
    { name: 'Odessa Steps', location: 'Odessa, Ukraine', year: '1837-1841', description: 'Monumental granite risers creating dramatic civic stair' },
    { name: 'Scala Regia', location: 'Vatican City', year: '1663-1666', description: 'Bernini\'s baroque stairs with progressively varying riser heights' },
    { name: 'Barcelona Pavilion', location: 'Barcelona, Spain', year: '1929', description: 'Mies van der Rohe\'s minimal open riser stairs' },
    { name: 'Apple Store Grand Central', location: 'New York City, USA', year: '2011', description: 'Contemporary open riser glass and steel stair' },
  ],

  confusionPairs: [
    {
      elementId: 'tread',
      reason: 'Both are fundamental stair components',
      distinction: 'Riser is the vertical surface between steps; tread is the horizontal surface you step on',
    },
    {
      elementId: 'stringer',
      reason: 'Both are vertical stair elements',
      distinction: 'Riser connects treads vertically in the center; stringer is the diagonal support beam at the sides',
    },
  ],

  searchTags: ['stair', 'vertical', 'step', 'height', 'closed', 'open', 'circulation', 'building code', 'safety'],

  arMetadata: {
    modelPath: '/models/architecture/riser.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Vertical Face', position: { x: 0, y: 0.2, z: 0.3 } },
      { label: 'Riser Height', position: { x: -0.3, y: 0.15, z: 0.3 } },
      { label: 'Connection to Lower Tread', position: { x: 0, y: 0, z: 0.3 } },
      { label: 'Connection to Upper Tread', position: { x: 0, y: 0.4, z: 0.3 } },
    ],
  },

  difficultyScore: 1,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
