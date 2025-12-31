import type { ArchitecturalElement } from '../../types';

export const HELICAL_RAMP: ArchitecturalElement = {
  id: 'helical-ramp',
  slug: 'helical-ramp',
  name: 'Helical Ramp',
  alternativeNames: ['Spiral Ramp', 'Continuous Ramp', 'Circular Ramp', 'Helicoidal Ramp'],
  pronunciation: {
    phonetic: 'HEL-ih-kul RAMP',
    language: 'English',
  },
  etymology: {
    origin: 'Greek',
    meaning: 'Spiral or coil-shaped inclined surface',
    rootWord: 'From Greek "helix" (spiral)',
  },
  category: 'FLOOR',
  subcategory: 'circulation',
  periods: ['ANCIENT_ROMAN', 'RENAISSANCE', 'MODERN', 'CONTEMPORARY'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/helical-ramp-primary.jpg',
    gallery: [
      '/images/architecture/elements/helical-ramp-museum.jpg',
      '/images/architecture/elements/helical-ramp-parking.jpg',
    ],
    diagram: '/images/architecture/diagrams/helical-ramp-geometry.svg',
  },

  description: {
    ELEMENTARY: 'A helical ramp is a sloped walkway that spirals around and around like a curly slide! Instead of steps, it has a smooth surface that goes up gently in circles. This makes it easy for people in wheelchairs, strollers, or anyone who can\'t use stairs to reach higher floors.',
    MIDDLE_SCHOOL: 'A helical ramp is a continuous inclined surface that wraps around a central axis in a spiral or helix shape, providing accessible vertical circulation without stairs. Unlike spiral stairs with steps, helical ramps have a smooth slope-typically 1:12 or gentler for accessibility. Famous examples include the Guggenheim Museum\'s iconic gallery ramp and many parking garage designs.',
    HIGH_SCHOOL: 'Helical ramps follow a three-dimensional curve around a central void or solid core, rising continuously at a constant or variable slope. The geometry can be a true helix (constant radius) or an Archimedean spiral (increasing radius). Design considerations include maximum slope (1:12 for ADA compliance), minimum width, handrail requirements, and headroom clearance. Structural systems range from cantilevered concrete to steel frame with decking.',
    UNDERGRADUATE: 'Helical ramp design integrates geometric planning, structural engineering, and accessibility requirements. Analysis includes slope calculation (vertical rise/horizontal run, typically 5-8% for comfort), radius determination (affects floor area efficiency), and the relationship between pitch and spatial experience. Structural considerations: cantilevered concrete ramps develop torsional and bending forces; radial beams and spiral stringers present complex load paths. Material selection affects construction feasibility-poured-in-place concrete enables sculptural forms; precast or steel systems facilitate erection.',
    GRADUATE: 'Advanced ramp analysis addresses structural optimization, experiential qualities, and code compliance nuances. Engineering investigation includes finite element analysis of complex geometries, vibration serviceability for long spans, and thermal movement in exposed ramps. Architectural analysis considers the ramp as promenade architecturale-phenomenological experience of ascent, changing views, spatial compression and release. Accessibility standards vary internationally; ADA permits 1:12 maximum (8.33%), while some jurisdictions require 1:16 (6.25%) for comfort. Historic precedents-Vatican Bramante, Guggenheim Wright-inform contemporary design.',
    PHD: 'Helical ramp research encompasses structural mechanics, architectural phenomenology, and accessibility discourse. Engineering investigation addresses optimal geometries for material efficiency, connection details at foundation and upper levels, and seismic behavior of asymmetric helical structures. Architectural theory examines the ramp\'s role in spatial narrative and bodily experience. Accessibility studies investigate user preferences, wayfinding challenges, and the intersection of universal design with architectural expression. Conservation challenges include structural assessment of historic concrete ramps (Guggenheim, Lingotto) and compatible interventions.',
  },

  history: {
    ELEMENTARY: 'The ancient Romans built spiral ramps to move carts and horses up tall buildings-they couldn\'t climb stairs! In 1959, Frank Lloyd Wright designed a famous museum in New York where visitors walk up a gentle spiral ramp to see art. Today, many parking garages use helical ramps so cars can drive up to different levels.',
    MIDDLE_SCHOOL: 'Ancient Romans constructed helical ramps for practical purposes-moving goods, animals, and vehicles to upper levels. Trajan\'s Column (113 CE) has an internal spiral staircase, but external ramps served utilitarian buildings. Renaissance architect Donato Bramante designed a famous double-helix ramp at the Vatican (1505) for papal processional use. Modern architecture embraced helical ramps for functional (parking) and artistic (museum galleries) purposes, epitomized by Wright\'s Guggenheim.',
    HIGH_SCHOOL: 'The helical ramp evolved from ancient utility to modern architectural icon. Roman examples served warehouses and stables-gradual slopes accommodating laden animals. Bramante\'s Vatican ramp (actually stairs wide enough for horses) demonstrated ceremonial potential. The automobile age made helical ramps essential for parking structures, beginning with early 20th-century garages. Frank Lloyd Wright\'s Guggenheim Museum (1959) transformed the ramp into experiential architecture. Contemporary examples range from infrastructure (Mercedes-Benz Museum, 2006) to sustainable circulation (Vancouver Convention Centre).',
    UNDERGRADUATE: 'The history of helical ramps reveals changing relationships between function, technology, and architectural expression. Roman construction knowledge enabled masonry ramps without reinforcement. Renaissance patronage allowed experiential exploration. The 20th-century automobile created functional demand, while reinforced concrete provided technical means. Wright\'s Guggenheim challenged conventional museum design-circulation becomes primary space, not secondary corridor. Later architects developed the typology: Louis Kahn\'s parking spirals, Ieoh Ming Pei\'s museums. Contemporary practice addresses sustainability (natural ventilation in parking ramps) and accessibility (gentle slopes, wayfinding).',
    GRADUATE: 'Helical ramp historiography engages construction history, mobility studies, and architectural phenomenology. Research examines how Roman engineering knowledge enabled vault construction for inclined surfaces, the transmission of geometric knowledge through treatises, and the cultural significance of processional circulation. The automobile\'s impact includes parking garage typology development and the ramp as urban infrastructure. Scholarly analysis of the Guggenheim addresses Wright\'s spatial theory, structural challenges, and conservation issues. Contemporary research investigates accessibility discourse, sustainable design strategies, and user experience.',
    PHD: 'Scholarly investigation of helical ramps addresses multiple disciplinary frameworks: structural history (construction techniques, material development), mobility studies (accessibility evolution, universal design), and phenomenological theory (bodily experience, spatial narrative). Current research includes digital documentation of historic ramps, structural assessment methodologies, and materials conservation (concrete deterioration in spiral geometries). Accessibility scholarship examines the tension between experiential richness and code compliance, international regulatory differences, and user preference studies. Contemporary design research explores parametric optimization, adaptive geometries, and integration with circulation networks.',
  },

  characteristics: [
    'Continuous inclined surface in spiral form',
    'No steps-smooth slope throughout',
    'Wraps around central void or solid core',
    'Slope typically 1:12 to 1:16 for accessibility',
    'Requires larger floor area than stairs',
    'Structural complexity in load transfer',
    'Creates distinctive spatial experience',
  ],

  famousExamples: [
    { name: 'Guggenheim Museum', location: 'New York City, USA', year: '1959', description: 'Frank Lloyd Wright\'s iconic spiral gallery ramp' },
    { name: 'Vatican Museums Bramante Staircase', location: 'Vatican City', year: '1505/1932', description: 'Double-helix design (modern version is ramp)' },
    { name: 'Mercedes-Benz Museum', location: 'Stuttgart, Germany', year: '2006', description: 'Two intertwining helical ramps through exhibit spaces' },
    { name: 'Lingotto Factory Rooftop', location: 'Turin, Italy', year: '1923', description: 'Fiat factory with helical car test track ramps' },
    { name: 'Museum of the American Revolution', location: 'Philadelphia, USA', year: '2017', description: 'Contemporary helical ramp connecting galleries' },
  ],

  confusionPairs: [
    {
      elementId: 'spiral-stair',
      reason: 'Both follow helical paths around central axis',
      distinction: 'Helical ramps have continuous smooth slopes; spiral stairs have discrete steps',
    },
    {
      elementId: 'accessibility-ramp',
      reason: 'Both provide ramped accessible circulation',
      distinction: 'Helical ramps spiral around an axis; accessibility ramps are typically straight runs with landings',
    },
    {
      elementId: 'curved-ramp',
      reason: 'Both feature curved geometry',
      distinction: 'Helical ramps complete full rotations around an axis; curved ramps arc without full circles',
    },
  ],

  searchTags: ['ramp', 'spiral', 'helix', 'accessibility', 'circulation', 'continuous', 'museum', 'parking', 'wheelchair'],

  arMetadata: {
    modelPath: '/models/architecture/helical-ramp.glb',
    scale: 0.4,
    rotatable: true,
    annotations: [
      { label: 'Continuous Slope Surface', position: { x: 0.5, y: 0.5, z: 0 } },
      { label: 'Central Void', position: { x: 0, y: 1, z: 0 } },
      { label: 'Helical Handrail', position: { x: 0.8, y: 1.5, z: 0 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
