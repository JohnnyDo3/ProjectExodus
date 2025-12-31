import type { ArchitecturalElement } from '../../types';

export const TREAD: ArchitecturalElement = {
  id: 'tread',
  slug: 'tread',
  name: 'Tread',
  alternativeNames: ['Stair Tread', 'Step', 'Going', 'Run'],
  pronunciation: {
    phonetic: 'TRED',
    language: 'English',
  },
  etymology: {
    origin: 'Old English',
    meaning: 'The horizontal surface where the foot steps',
    rootWord: 'From Old English "tredan" (to step or walk)',
  },
  category: 'FLOOR',
  subcategory: 'circulation',
  periods: ['ANCIENT', 'CLASSICAL', 'MEDIEVAL', 'RENAISSANCE', 'BAROQUE', 'NEOCLASSICAL', 'MODERN', 'CONTEMPORARY'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/tread-primary.jpg',
    gallery: [
      '/images/architecture/elements/tread-types.jpg',
      '/images/architecture/elements/tread-detail.jpg',
    ],
    diagram: '/images/architecture/diagrams/tread-dimensions.svg',
  },

  description: {
    ELEMENTARY: 'The tread is the flat part of a stair step where you put your foot. It\'s the part you actually walk on when going up or down stairs. Treads need to be big enough for your whole foot to fit comfortably and safely. Different stairs have different sized treads, but they\'re all there to give you a safe place to step!',
    MIDDLE_SCHOOL: 'A tread is the horizontal walking surface of a stair step. The tread depth (called the "going" or "run") is the measurement from the front edge to the back edge. Building codes specify minimum tread depths for safety, typically 10-11 inches for residential stairs. The front edge of the tread, which overhangs the riser below, is called the nosing. Treads must be slip-resistant and uniform in depth throughout a staircase.',
    HIGH_SCHOOL: 'Stair treads are the primary load-bearing components where users place their feet during ascent and descent. Tread geometry follows the relationship between riser height and tread depth, typically expressed as 2R + T = 24-25 inches (Blondel\'s formula). Code requirements specify minimum depths (typically 280mm residential, 250mm commercial), maximum variation between treads (3-4mm), and nosing projection (19-38mm). Materials include wood, stone, concrete, steel, and composites, each requiring specific anti-slip treatments.',
    UNDERGRADUATE: 'Tread design integrates ergonomic, structural, and safety considerations. The going dimension affects gait biomechanics, with comfortable dimensions allowing natural foot placement and weight transfer. Structural design addresses concentrated loads, impact forces, and fatigue under repeated loading. Nosing profiles influence trip hazards while providing visual contrast for accessibility. Contemporary practice considers acoustic properties (footfall noise transmission), thermal characteristics (cold bridging in exterior stairs), and material sustainability. Innovations include prefabricated tread systems and integrated LED lighting.',
    GRADUATE: 'Tread analysis encompasses human factors engineering, material science, and regulatory compliance. Research on stair safety identifies tread depth as critical to fall prevention, with inconsistent depths significantly increasing accident risk. Material specifications address slip resistance coefficients, wear resistance, and maintenance requirements. Detailing considerations include thermal expansion, acoustic isolation, drainage (exterior stairs), and vandal resistance in public settings. Contemporary investigations examine universal design principles, aging-in-place adaptations, and smart stair systems with embedded sensors monitoring usage and detecting falls.',
    PHD: 'Tread studies engage biomechanics, accident analysis, material durability, and environmental psychology. Research employs motion capture analysis of gait patterns on various tread geometries, finite element modeling of stress distributions, and epidemiological studies correlating tread design with injury rates. Material science investigations examine nano-textured surfaces for slip resistance, self-healing concrete for durability, and phase-change materials for ice prevention. Interdisciplinary research addresses the phenomenology of stair climbing, cultural variations in stair preferences, and the role of tread design in promoting physical activity in built environments.',
  },

  history: {
    ELEMENTARY: 'Stairs and treads have been around for thousands of years. Ancient people carved steps into stone to climb hills and build pyramids. The Ancient Greeks and Romans figured out good sizes for treads that made stairs comfortable to climb. The same basic rules they discovered are still used today when building stairs in homes and buildings!',
    MIDDLE_SCHOOL: 'Treads have evolved from natural stone and carved wood in ancient structures to precisely manufactured components. Ancient civilizations (Egypt, Mesopotamia, Greece, Rome) established proportional relationships between tread and riser dimensions. Medieval builders codified these in guild practices. The Renaissance architect Palladio documented ideal stair proportions. The Industrial Revolution enabled standardized manufactured treads. Modern building codes formalized safety requirements based on accident research.',
    HIGH_SCHOOL: 'The dimensional relationship between treads and risers was systematically studied by 17th-century French architect François Blondel, whose formula (2R + T = 24-25 inches) remains foundational. Industrialization brought machine-cut uniform treads replacing hand-worked variations. Early 20th-century safety research following workplace accidents led to code standardization. Mid-century innovations included precast concrete treads, metal pan stairs with concrete fill, and composite materials. Contemporary practice emphasizes universal design principles and evidence-based dimensional standards.',
    UNDERGRADUATE: 'Tread history reflects evolving understanding of human factors and safety engineering. Ancient proportions were based on observation and experience. Renaissance treatises formalized these into design rules. Nineteenth-century industrial accidents prompted systematic safety research. Templer\'s seminal "The Staircase" (1992) synthesized biomechanical research, establishing evidence-based design standards. Contemporary developments include slip resistance testing standards (ASTM, BS), accessibility requirements (ADA, ISO), and sustainable material specifications. Digital fabrication enables mass customization of tread geometries.',
    GRADUATE: 'Historical analysis of tread design reveals the transition from craft knowledge to scientific investigation. Medieval guild regulations specified tread dimensions locally. Enlightenment architects attempted universal rules based on proportion theory. Twentieth-century research employed biomechanics, accident statistics, and psychological factors. The 1970s accessibility movement reformed tread design for mobility-impaired users. Contemporary practice navigates tensions between historical preservation (maintaining original tread dimensions), code compliance, and universal design aspirations.',
    PHD: 'Tread historiography examines the social construction of comfort and safety standards. Research addresses regional variations in historical tread proportions, correlation with average population anthropometrics, and cultural attitudes toward stair climbing. Conservation challenges include balancing historic fabric preservation with contemporary safety codes, particularly in worn stone treads. Contemporary scholarship investigates the democratization of comfortable stair design (historically, grand stairs had generous treads; servants\' stairs had minimal dimensions) and the stair\'s role in sedentary lifestyle critique and active design initiatives.',
  },

  characteristics: [
    'Horizontal walking surface of a stair step',
    'Typical depth: 10-11 inches (250-280mm) residential',
    'Must be uniform throughout a flight (±3-4mm)',
    'Front edge (nosing) overhangs riser by 19-38mm',
    'Requires slip-resistant surface treatment',
    'Materials: wood, stone, concrete, steel, composites',
    'Load-bearing component supporting user weight',
    'Relationship to riser: 2R + T = 24-25 inches (Blondel)',
  ],

  famousExamples: [
    { name: 'Spanish Steps', location: 'Rome, Italy', year: '1723-1725', description: 'Travertine marble treads on monumental public staircase' },
    { name: 'Laurentian Library Staircase', location: 'Florence, Italy', year: '1559', description: 'Michelangelo\'s sculptural pietra serena stone treads' },
    { name: 'Guggenheim Museum Ramp', location: 'New York City, USA', year: '1959', description: 'Frank Lloyd Wright\'s gently sloped continuous tread surface' },
    { name: 'Hagia Sophia', location: 'Istanbul, Turkey', year: '537 CE', description: 'Ancient marble treads worn by centuries of pilgrims' },
    { name: 'Vessel', location: 'New York City, USA', year: '2019', description: 'Thomas Heatherwick\'s 2,500 bronze-clad steel treads' },
  ],

  confusionPairs: [
    {
      elementId: 'riser',
      reason: 'Both are fundamental stair components',
      distinction: 'Tread is the horizontal surface you step on; riser is the vertical surface between treads',
    },
    {
      elementId: 'nosing',
      reason: 'Nosing is part of the tread',
      distinction: 'Tread is the entire horizontal surface; nosing specifically refers to the projecting front edge',
    },
  ],

  searchTags: ['stair', 'step', 'horizontal', 'going', 'run', 'walking surface', 'circulation', 'safety', 'building code'],

  arMetadata: {
    modelPath: '/models/architecture/tread.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Walking Surface', position: { x: 0, y: 0.05, z: 0 } },
      { label: 'Nosing (Front Edge)', position: { x: 0.3, y: 0.05, z: 0 } },
      { label: 'Tread Depth (Going)', position: { x: 0, y: 0.05, z: -0.2 } },
      { label: 'Anti-Slip Treatment', position: { x: -0.2, y: 0.05, z: 0.1 } },
    ],
  },

  difficultyScore: 1,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
