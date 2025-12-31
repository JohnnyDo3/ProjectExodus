import type { ArchitecturalElement } from '../../types';

export const STRING_COURSE: ArchitecturalElement = {
  id: 'string-course',
  slug: 'string-course',
  name: 'String Course',
  alternativeNames: ['Belt Course', 'Band Course', 'Sill Course', 'Cordon'],
  pronunciation: {
    phonetic: 'STRING kors',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'From "string" referring to a horizontal line or cord stretched to guide masonry laying',
    rootWord: 'string + course (layer of masonry)',
  },
  category: 'FACADE',
  subcategory: 'horizontal_division',
  periods: ['roman', 'romanesque', 'gothic', 'renaissance', 'baroque', 'neoclassical', 'beaux-arts'],
  regions: ['MEDITERRANEAN', 'WESTERN_EUROPE', 'EASTERN_EUROPE', 'NORTH_AMERICA', 'BRITAIN'],

  images: {
    primary: '/images/architecture/elements/string-course-primary.jpg',
    gallery: [
      '/images/architecture/elements/string-course-renaissance.jpg',
      '/images/architecture/elements/string-course-gothic.jpg',
      '/images/architecture/elements/string-course-neoclassical.jpg',
    ],
    diagram: '/images/architecture/diagrams/string-course-placement.svg',
  },

  description: {
    ELEMENTARY: 'A string course is like a decorative belt around a building! It\'s a row of stones or bricks that sticks out a little bit from the wall and goes all the way around the building at the same height. Just like how a belt wraps around your waist, a string course wraps around a building. It helps divide the building into different sections and makes it look more interesting!',
    MIDDLE_SCHOOL: 'A string course is a continuous horizontal band or molding that projects from the exterior wall of a building. It runs around the entire perimeter at a consistent height, often marking the division between floors. String courses can be simple flat bands or elaborately carved moldings. They serve both decorative and practical purposes: visually breaking up tall wall surfaces, emphasizing horizontal lines, marking floor levels, and sometimes acting as a drip edge to direct water away from the wall below.',
    HIGH_SCHOOL: 'String courses are horizontal projecting bands of masonry or molding that encircle buildings at regular intervals, typically marking floor divisions or creating visual proportions. These architectural elements evolved from functional water-shedding ledges into important compositional devices. Types include simple flat bands, molded profiles, and enriched courses with carved decoration. In Classical architecture, string courses often align with interior floor levels, creating exterior expression of internal organization. Gothic architecture employed string courses to unify horizontal elements across facades with vertical emphasis. Renaissance and Baroque architects used string courses to create sophisticated proportional systems and to unite multiple buildings within palatial complexes.',
    UNDERGRADUATE: 'String courses function simultaneously as tectonic expression, compositional device, and weathering detail. Technically, projecting string courses act as drip edges, directing rainwater away from wall surfaces below and preventing water infiltration at vulnerable horizontal joints. Compositionally, they establish horizontal rhythms, create visual bases for upper stories, and can modulate perceived building height and proportions. In Classical systems, string courses typically align with floor levels, expressing internal organization externally. Different profiles carry different associations: simple flat bands suggest restraint; enriched carved courses suggest elaboration. Architectural theorists from Vitruvius through the Renaissance codified appropriate string course usage within the Classical orders. The element\'s evolution demonstrates architecture\'s capacity to transform functional necessity into aesthetic opportunity.',
    GRADUATE: 'Critical analysis of string courses addresses their multivalent architectural functions: structural logic (expressing horizontal floor divisions), tectonic honesty (revealing construction layers), compositional hierarchy (establishing proportional relationships), and symbolic meaning (suggesting stability and order). Theoretical discourse from Alberti through Serlio addressed string course integration within ordinate systems. String courses mediate between structural reality and architectural representation-they mark actual floor levels while potentially creating false readings of internal organization. In urban contexts, string courses establish horizontal alignments across street facades, creating visual unity among multiple buildings. Mannerist experiments disrupted string course continuity for expressive effect. Baroque architects employed string courses to create complex surface articulation and shadow patterns. Analysis must address variation in projection depth, profile complexity, and decorative enrichment across building hierarchies-palaces versus utilitarian structures, primary facades versus secondary elevations.',
    PHD: 'Advanced string course scholarship engages technical, aesthetic, and semantic dimensions across historical and cultural contexts. Research questions include: How did string courses evolve from construction logic to compositional device? What meanings did different string course types and placements carry? How did theoretical discourse shape usage and interpretation? Methodological approaches encompass technical analysis of construction and weathering functions; examination of proportional systems governing string course placement; investigation of string courses within larger facade composition strategies; and analysis of string course variations across building types and social hierarchies. Key theoretical texts include Alberti\'s discussion of horizontal divisions, Serlio\'s illustration of appropriate string course profiles for different orders, and Palladio\'s proportional systems integrating string courses. Critical frameworks address string courses through tectonics (expression of construction), semiotics (horizontal divisions as architectural signs), and phenomenology (string courses\' role in perceiving facade composition and scale). The element exemplifies architecture\'s transformation of practical necessity into aesthetic language, simultaneously solving technical problems and creating visual effects.',
  },

  history: {
    ELEMENTARY: 'String courses have been used for thousands of years! Ancient Roman builders used them on their grand buildings to make them look organized and strong. During the Middle Ages, castle builders added string courses to their towers and walls. In the Renaissance (about 500 years ago), architects in Italy used beautiful string courses on palaces to divide up the floors and make the buildings look balanced and elegant.',
    MIDDLE_SCHOOL: 'String courses appeared in ancient Roman architecture, marking floor divisions on multi-story buildings like insulae (apartment blocks) and public structures. Medieval builders used string courses on castles, cathedrals, and civic buildings, often incorporating them at window sill heights. Renaissance architects in 15th-century Italy systematically employed string courses to create proportional facade systems-Palazzo Rucellai by Alberti (1446-1451) demonstrates sophisticated string course integration with pilaster orders. Baroque architects used string courses to unify palace complexes and create horizontal emphasis. Neoclassical and Beaux-Arts architects continued string course usage, often aligning them across entire city blocks to create urban visual harmony.',
    HIGH_SCHOOL: 'String course development traces from Roman precedents through medieval practices to Renaissance systematization. Roman architecture employed projecting courses on multi-story structures, establishing the precedent of expressing floor divisions externally. Medieval architecture continued this practice, particularly in civic and religious buildings-Gothic cathedrals often feature string courses running across facades at consistent heights. Renaissance theorization began with Alberti, who discussed horizontal divisions in facade design. Palazzo Rucellai demonstrates coordinated string courses with pilaster orders, creating integrated compositional systems. Serlio\'s treatise (1537-1551) illustrated appropriate string course profiles for different architectural orders. Baroque architects like Bernini and Borromini used string courses to create complex facade articulation. French Classical architecture established rigorous systems-Versailles demonstrates coordinated string courses across vast palace facades. Neoclassical architects employed string courses on institutional buildings. Beaux-Arts practice refined string course usage in urban contexts, creating horizontal alignments across entire streets.',
    UNDERGRADUATE: 'String course evolution demonstrates the transformation of construction detail into sophisticated design element. Roman examples include the Colosseum\'s exterior, where string courses mark each level, and Trajan\'s Market, with projecting courses defining floor divisions. Medieval continuity appears in Romanesque churches and Gothic cathedrals-Notre-Dame de Paris features string courses coordinating horizontal elements. Renaissance systematization involved theoretical codification and practical refinement. Alberti\'s Palazzo Rucellai pioneered integration of string courses with applied Classical orders, creating unified proportional systems. Bramante\'s Palazzo Caprini (House of Raphael, 1501-1510) employed string courses to separate rusticated ground floor from ordinate upper story. Serlio\'s treatise illustrated string course profiles appropriate to different orders. Michelangelo\'s Palazzo Farnese demonstrates masterful string course usage, creating powerful horizontal emphasis. French Classical architecture developed rigorous facade systems-Place des Vosges demonstrates coordinated string courses creating urban unity. Baroque architects employed string courses in complex surface articulation. Neoclassical architects returned to stricter Classical string course usage.',
    GRADUATE: 'Critical string course studies address technical functions, compositional roles, and theoretical discourse. Roman precedents established string courses as expressing multi-story construction and marking floor divisions. Medieval practices varied-Romanesque employed simple projecting bands; Gothic integrated string courses with vertical bay systems. Renaissance reception involved both archaeological study and theoretical systematization. Alberti\'s De re aedificatoria discussed horizontal divisions in creating facade harmony. Serlio\'s treatise provided practical guidance on string course profiles for different orders and building types. Built examples demonstrate variations from Palazzo Rucellai\'s refined coordination to Palazzo Farnese\'s powerful simplicity. Mannerist experiments sometimes disrupted string course continuity for expressive effect. Baroque architects employed string courses in creating complex surface articulation-Borromini\'s San Carlo alle Quattro Fontane shows sophisticated string course integration. French Classical theory emphasized string course role in creating proportional systems and urban harmony. Neoclassical archaeology informed more archaeologically correct applications. Analysis must address string course variations across building hierarchies-palace versus house, urban versus rural-and their role in construction of social meaning through architecture.',
    PHD: 'Advanced string course scholarship engages multiple disciplinary perspectives: technical analysis of construction methods and weathering functions; historical investigation of evolving usage patterns; theoretical examination of prescriptive texts; and critical interpretation of cultural meanings. Research questions include: How did string courses function within different proportional systems? What relationships existed between theoretical prescriptions and built practice? How did string course usage vary across building types and social contexts? Primary sources include Vitruvius (limited discussion), Alberti (De re aedificatoria), Serlio (architectural treatise), Palladio, and French academic theory. Methodological frameworks encompass tectonics (string courses as expression of construction), semiotics (horizontal divisions as architectural language), reception theory (how periods reinterpreted precedents), and urban morphology (string courses in creating streetscape unity). Critical analysis reveals string courses functioning simultaneously as weathering detail, proportional device, and marker of architectural intention. Contemporary theoretical approaches examine string courses through materiality studies, phenomenology of facade perception, and critical urbanism addressing visual coherence in historic districts versus contemporary pluralism.',
  },

  characteristics: [
    'Continuous horizontal band projecting from wall surface',
    'Runs around entire building perimeter at consistent height',
    'Typically marks floor levels or window sill heights',
    'Can be simple flat bands or elaborately molded',
    'Creates visual division of tall wall surfaces',
    'Often aligns with interior floor levels',
    'May function as drip edge for water management',
    'Establishes horizontal rhythm on facades',
  ],

  famousExamples: [
    {
      name: 'Palazzo Rucellai',
      location: 'Florence, Italy',
      year: '1446-1451',
      description: 'Alberti\'s refined string courses coordinating with pilaster orders',
    },
    {
      name: 'Palazzo Farnese',
      location: 'Rome, Italy',
      year: '1534-1546',
      description: 'Michelangelo\'s powerful string courses creating strong horizontal divisions',
    },
    {
      name: 'Place des Vosges',
      location: 'Paris, France',
      year: '1605-1612',
      description: 'Coordinated string courses creating urban harmony across entire square',
    },
    {
      name: 'Somerset House',
      location: 'London, England',
      year: '1776-1796',
      description: 'William Chambers\' Neoclassical string courses marking floor levels',
    },
    {
      name: 'Boston Public Library',
      location: 'Boston, Massachusetts, USA',
      year: '1888-1895',
      description: 'McKim, Mead & White\'s Beaux-Arts string courses creating proportional system',
    },
  ],

  confusionPairs: [
    {
      elementId: 'cornice',
      reason: 'Both are horizontal projecting bands',
      distinction: 'Cornices are at the top of a building or major section; string courses are at intermediate levels marking floors',
    },
    {
      elementId: 'frieze',
      reason: 'Both are horizontal bands on facades',
      distinction: 'Friezes are part of the entablature in Classical architecture; string courses are separate horizontal divisions',
    },
  ],

  searchTags: [
    'string course',
    'belt course',
    'band course',
    'horizontal',
    'facade division',
    'molding',
    'floor marker',
    'drip edge',
    'classical architecture',
  ],

  arMetadata: {
    modelPath: '/models/architecture/string-course.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Projection', position: { x: 0, y: 0, z: 0.1 } },
      { label: 'Molded Profile', position: { x: 0, y: -0.05, z: 0.05 } },
      { label: 'Drip Edge', position: { x: 0, y: -0.1, z: 0.15 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
