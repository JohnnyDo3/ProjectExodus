import type { ArchitecturalElement } from '../../types';

export const TYMPANUM: ArchitecturalElement = {
  id: 'tympanum',
  slug: 'tympanum',
  name: 'Tympanum',
  alternativeNames: ['Tympan', 'Doorway Panel', 'Portal Lunette'],
  pronunciation: {
    phonetic: 'TIM-puh-num',
    language: 'Latin',
  },
  etymology: {
    origin: 'Latin',
    meaning: 'Drum or panel',
    rootWord: 'tympanum (from Greek tympanon)',
  },
  category: 'DOOR',
  subcategory: 'door_surrounds',
  periods: ['classical-greek', 'roman', 'romanesque', 'gothic', 'renaissance', 'neoclassical'],
  regions: ['MEDITERRANEAN', 'NORTHERN_EUROPE', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/tympanum-primary.jpg',
    gallery: [
      '/images/architecture/elements/tympanum-gothic.jpg',
      '/images/architecture/elements/tympanum-romanesque.jpg',
    ],
    diagram: '/images/architecture/diagrams/tympanum-detail.svg',
  },

  description: {
    ELEMENTARY: 'A tympanum is the special decorative area above a doorway, usually shaped like a half-circle or triangle. It\'s like a picture frame above a door where builders put carvings and sculptures to tell stories!',
    MIDDLE_SCHOOL: 'The tympanum is the semicircular or triangular decorative panel above a doorway, enclosed by an arch or pediment. In medieval churches, tympanums featured elaborate carved scenes from the Bible, while classical buildings often showed gods or important symbols.',
    HIGH_SCHOOL: 'The tympanum is the recessed face of a pediment or the area enclosed by an arch above a doorway. In classical architecture, it provided a field for relief sculpture within temple pediments. In Romanesque and Gothic architecture, the tympanum became a primary location for elaborate sculptural programs depicting biblical narratives, Last Judgment scenes, and theological concepts.',
    UNDERGRADUATE: 'The tympanum represents a key architectural element bridging structure and decoration. In classical architecture, the tympanum occupies the triangular field of the pediment, while in medieval architecture, it fills the lunette shape created by a portal arch. The compositional challenges of fitting narrative programs within these geometric constraints led to sophisticated hierarchical arrangements, with Christ or the Virgin typically at the apex.',
    GRADUATE: 'The tympanum constitutes a privileged iconographic space where architectural form and sculptural program intersect. Romanesque tympanums employed hieratic composition emphasizing theological hierarchy, while Gothic examples developed more naturalistic figure styles within increasingly complex narrative structures. The evolution of tympanum design reveals changing approaches to religious instruction, artistic naturalism, and the relationship between architecture and sculpture.',
    PHD: 'The architectural tympanum represents a crucial site for examining the semiotics of sacred space, the transmission of iconographic programs, and the workshop practices of medieval sculpture. Analysis must address the liturgical functions of portal programs, the relationship between textual sources and visual representation, and regional variations in compositional strategies. Contemporary scholarly debates engage questions of audience reception, gender representation in tympanum programs, and the restoration ethics of weathered medieval sculpture.',
  },

  history: {
    ELEMENTARY: 'Ancient Greeks first used tympanums in their triangular temple roofs. Later, medieval church builders made them into beautiful storytelling spaces with carved scenes from religious stories!',
    MIDDLE_SCHOOL: 'The tympanum originated in classical Greek and Roman architecture as the triangular area within pediments. During the Romanesque period (1000-1200 CE), tympanums above church portals became important locations for religious sculpture. Gothic architects continued this tradition with even more elaborate carved scenes.',
    HIGH_SCHOOL: 'Classical tympanums appeared in Greek temple pediments as early as the 6th century BCE, housing relief or freestanding sculpture. The form evolved through Roman architecture and was revived during the Romanesque period as a key element of church portal design. Vézelay, Autun, and Moissac feature masterpiece Romanesque tympanums. Gothic examples like Chartres developed greater naturalism and narrative complexity.',
    UNDERGRADUATE: 'The tympanum\'s architectural history traces from classical pediment sculpture through early Christian adaptations to the flowering of Romanesque and Gothic portal programs. The Romanesque tympanum, exemplified by Gislebertus\'s Last Judgment at Autun (c. 1130), established conventions for depicting Christ in Majesty, the Last Judgment, and other theological themes. Gothic development emphasized increasingly naturalistic figure styles and complex multi-register narratives, as seen at Chartres (c. 1145-1155).',
    GRADUATE: 'The evolution of tympanum design reveals shifting relationships between architectural and sculptural practices. Early medieval tympanums often reused Roman sarcophagi, while mature Romanesque programs developed distinctive regional schools-French hieratic monumentality versus Spanish dynamic movement. Gothic tympanums participated in broader trends toward naturalism and emotional expression, with developments in figure proportion, drapery, and spatial composition. Renaissance revivals reinterpreted classical precedents, while neoclassical tympanums often remained plain or featured abstract ornament.',
    PHD: 'Scholarly analysis of tympanum programs engages multiple methodological frameworks: iconographic studies tracing motif transmission, stylistic analysis revealing workshop practices and regional schools, liturgical studies examining the relationship between portal programs and ritual practice, and reception studies considering medieval audience experiences. Recent work employs digital reconstruction to understand original polychromy, examines gender dynamics in hagiographic programs, and applies phenomenological approaches to the embodied experience of approaching medieval portals.',
  },

  characteristics: [
    'Semicircular or triangular field above doorway',
    'Enclosed by arch or pediment',
    'Primary location for relief sculpture',
    'Often depicts religious or mythological scenes',
    'Hierarchical composition (central figure at apex)',
    'Relationship to lintel and archivolt framing',
  ],

  famousExamples: [
    { name: 'Abbey Church of Sainte-Foy', location: 'Conques, France', year: 'c. 1107-1125', description: 'Romanesque Last Judgment tympanum' },
    { name: 'Autun Cathedral', location: 'Autun, France', year: 'c. 1130', description: 'Gislebertus\'s masterpiece Last Judgment' },
    { name: 'Chartres Cathedral', location: 'Chartres, France', year: 'c. 1145-1155', description: 'Royal Portal tympanums depicting Christ' },
    { name: 'Parthenon', location: 'Athens, Greece', year: '447-432 BCE', description: 'Classical pediment tympanum (partially surviving)' },
    { name: 'Vézelay Abbey', location: 'Vézelay, France', year: 'c. 1130', description: 'Mission of the Apostles tympanum' },
  ],

  confusionPairs: [
    {
      elementId: 'lintel',
      reason: 'Both are horizontal elements above doors',
      distinction: 'Lintel is the structural beam; tympanum is the decorative semicircular area above it',
    },
    {
      elementId: 'architrave',
      reason: 'Both frame doorways',
      distinction: 'Architrave is the vertical and horizontal molding around the door; tympanum is the enclosed decorative field above',
    },
  ],

  searchTags: ['door', 'portal', 'sculpture', 'medieval', 'gothic', 'romanesque', 'pediment', 'arch', 'carved', 'semicircular', 'biblical'],

  arMetadata: {
    modelPath: '/models/architecture/tympanum.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Semicircular Field', position: { x: 0, y: 0.7, z: 0 } },
      { label: 'Central Figure', position: { x: 0, y: 0.8, z: 0 } },
      { label: 'Surrounding Figures', position: { x: 0.3, y: 0.5, z: 0 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
