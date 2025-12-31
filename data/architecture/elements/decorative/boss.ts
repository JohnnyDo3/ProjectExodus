import type { ArchitecturalElement } from '../../types';

export const BOSS: ArchitecturalElement = {
  id: 'boss',
  slug: 'boss',
  name: 'Boss',
  alternativeNames: ['Keystone Boss', 'Ceiling Boss', 'Vault Boss', 'Decorative Knob'],
  pronunciation: {
    phonetic: 'BAWSS',
    language: 'English',
  },
  etymology: {
    origin: 'Old French/Latin',
    meaning: 'Protuberance or swelling',
    rootWord: 'Boce (Old French) from bōtia (leather bag/swelling)',
  },
  category: 'DECORATIVE',
  subcategory: 'structural_ornament',
  periods: ['ROMANESQUE', 'GOTHIC', 'PERPENDICULAR_GOTHIC', 'TUDOR', 'GOTHIC_REVIVAL', 'VICTORIAN'],
  regions: ['WESTERN_EUROPE', 'NORTHERN_EUROPE', 'BRITISH_ISLES', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/boss-primary.jpg',
    gallery: [
      '/images/architecture/elements/boss-vault.jpg',
      '/images/architecture/elements/boss-carved.jpg',
    ],
    diagram: '/images/architecture/diagrams/boss-anatomy.svg',
  },

  description: {
    ELEMENTARY: 'A boss is a fancy carved decoration that sticks out from a ceiling, especially where stone ribs meet in a vaulted ceiling. Think of it like a beautiful button covering the spot where ceiling beams come together. Bosses can be carved with flowers, faces, shields, or other designs, making ceilings interesting to look at.',
    MIDDLE_SCHOOL: 'A boss is a projecting ornamental element, typically located at the intersection of ribs in a vaulted ceiling. Originally serving the practical purpose of concealing the junction where stone ribs meet, bosses evolved into highly decorative features. They can be carved with various motifs including foliage, heraldic devices, religious symbols, or narrative scenes. Bosses range from simple geometric forms to elaborate three-dimensional sculptures.',
    HIGH_SCHOOL: 'The boss represents both a functional and decorative element in Gothic vaulted architecture. Positioned at rib intersections, bosses cover the complex joinery where multiple stone ribs converge, transforming a structural necessity into an artistic opportunity. Medieval masons developed increasingly elaborate boss designs, from simple circular forms in early Romanesque work to deeply undercut foliate and figural carvings in Perpendicular Gothic. The boss\'s prominence at ceiling intersections made it an ideal location for displaying heraldry, religious imagery, or donor portraits.',
    UNDERGRADUATE: 'The architectural boss evolved from a practical covering element into a significant component of Gothic decorative programs. Structurally, the boss conceals the complex stereotomy where ribs meet, often masking iron cramps or wooden pins that secure the assembly. Aesthetically, bosses punctuate vaulting patterns, emphasizing geometric organization and drawing the eye upward. English Perpendicular Gothic developed particularly elaborate boss programs, with pendant bosses extending downward as quasi-structural elements. The boss\'s three-dimensional nature allowed for sculptural complexity impossible in flat relief carving.',
    GRADUATE: 'Boss design demonstrates the Gothic synthesis of structural rationalism and ornamental elaboration. Technical analysis reveals bosses as keystone elements that help stabilize rib intersections through wedging action, though their structural contribution is debated. The evolution from simple Romanesque bosses to elaborate Perpendicular pendants reflects changing attitudes toward decoration and structure. Programs of narrative or heraldic bosses created "readable" ceilings conveying religious or political messages. The boss\'s position high in the vault required consideration of viewing angles and lighting conditions, influencing compositional choices. Conservation challenges include the vulnerability of projecting elements to vibration damage and the difficulty of accessing ceiling-mounted features.',
    PHD: 'The boss presents rich research opportunities examining the intersection of structural necessity, artistic expression, and symbolic communication. Technical studies using photogrammetry and 3D scanning document boss geometry and carving techniques, revealing workshop practices and individual hand identification. Structural analysis investigates actual load distribution and the mechanical role of bosses versus purely decorative interpretation. Iconographic research examines boss programs as coherent visual narratives, particularly in monastic and collegiate settings. Cross-cultural studies compare Gothic bosses with pendant ornaments in Islamic muqarnas and Hindu temple ceilings. Conservation science addresses stone deterioration, particularly of deeply undercut features, and develops monitoring systems for detecting vibration-induced cracking. Contemporary scholarship also explores bosses through phenomenological approaches examining upward gaze and spatial experience.',
  },

  history: {
    ELEMENTARY: 'Bosses first appeared about 900 years ago when builders started making beautiful arched stone ceilings in churches. They needed something to cover the spot where ceiling ribs met, so they carved decorative bosses. English churches became famous for having the most elaborate and beautiful ceiling bosses, some carved with angels, flowers, or telling Bible stories.',
    MIDDLE_SCHOOL: 'Bosses emerged in Romanesque architecture around the 11th century as functional rib-junction covers. Gothic masons in the 12th-13th centuries developed increasingly ornamental bosses, incorporating foliage, geometric patterns, and figural sculpture. English Gothic, particularly the Perpendicular style (14th-16th centuries), produced the most elaborate bosses, including pendant bosses that hang down like stalactites. Gothic Revival in the 19th century revived boss carving as part of the medieval revival movement.',
    HIGH_SCHOOL: 'The boss evolved alongside rib vault development in Romanesque and Gothic architecture. Early Norman examples in Durham Cathedral (begun 1093) show simple circular bosses. French Gothic cathedrals like Notre-Dame de Paris incorporated more elaborate foliate bosses. English masons particularly excelled at boss carving, creating extensive programs at Canterbury, Wells, and Exeter Cathedrals. The late Gothic Perpendicular style produced pendant bosses at King\'s College Chapel, Cambridge, and Westminster Abbey\'s Henry VII Chapel, where bosses became quasi-structural fan vault elements.',
    UNDERGRADUATE: 'Boss development reflects broader evolution in Gothic vault design and ornamental philosophy. Romanesque precedents in buildings like Saint-Sernin in Toulouse established the basic form. Early Gothic French practice emphasized geometric and foliate designs. English Decorated Gothic (13th-14th centuries) developed complex narrative and heraldic boss programs, as at Exeter Cathedral with its extensive vault boss sequence. Perpendicular Gothic innovation produced pendant bosses - dramatically projecting elements that blur distinctions between ornament and structure. Renaissance and Baroque architects largely abandoned bosses in favor of coffered or painted ceilings, though Gothic Revival architects enthusiastically revived the form.',
    GRADUATE: 'Scholarly examination of bosses addresses technical, iconographic, and theoretical questions. Structural studies debate whether bosses serve genuine load-bearing functions or primarily conceal joinery. The mechanics of pendant bosses, which appear to defy gravity, have been examined through structural analysis revealing complex internal armatures. Iconographic research has decoded extensive boss programs, such as the theological narrative at Norwich Cathedral cloisters. Workshop studies identify individual carvers through stylistic analysis and tool marks. The Gothic Revival reinterpretation of bosses, often based on imperfect understanding of medieval construction, created new hybrid forms. Conservation challenges particularly affect projecting bosses vulnerable to vibration from bells, wind, and modern traffic.',
    PHD: 'The boss serves as an exemplary subject for interdisciplinary architectural research. Key areas include: structural mechanics analysis using finite element modeling to determine load distribution; geometric studies reconstructing layout and carving processes; art historical iconographic analysis decoding visual programs; social historical research examining heraldic and donor bosses as evidence of patronage networks; material science investigation of stone selection and deterioration patterns; digital documentation using photogrammetry to create 3D archives; experimental archaeology recreating medieval carving and installation techniques; comparative studies with pendant ornaments in other traditions (Islamic muqarnas, Indian temple ceilings); conservation science developing monitoring and stabilization strategies; and phenomenological research examining how bosses structure spatial experience and direct visual attention in vaulted spaces.',
  },

  characteristics: [
    'Projecting ornamental element at rib intersections',
    'Conceals junction of multiple ribs in vaulted ceilings',
    'Can be simple geometric or highly elaborate carved forms',
    'Often features foliage, heraldry, or narrative scenes',
    'Pendant bosses project significantly downward',
    'Primarily associated with Gothic and Gothic Revival',
  ],

  famousExamples: [
    { name: 'Durham Cathedral', location: 'Durham, England', year: '1093-1133', description: 'Early Norman rib vault bosses' },
    { name: 'Exeter Cathedral Nave', location: 'Exeter, England', year: '1288-1369', description: 'Extensive program of narrative and foliate bosses' },
    { name: 'Canterbury Cathedral Cloisters', location: 'Canterbury, England', year: '1397-1414', description: 'Over 800 carved heraldic and figural bosses' },
    { name: 'King\'s College Chapel', location: 'Cambridge, England', year: '1446-1515', description: 'Magnificent pendant bosses in fan vaulting' },
    { name: 'Henry VII Chapel', location: 'Westminster Abbey, London', year: '1503-1512', description: 'Elaborate pendant bosses appearing to defy gravity' },
  ],

  confusionPairs: [
    {
      elementId: 'keystone',
      reason: 'Both are central elements at structural junctions',
      distinction: 'Keystones are in arch centers locking voussoirs; bosses are at rib intersections in vaults and are more decorative',
    },
    {
      elementId: 'pendant',
      reason: 'Both project downward from ceilings',
      distinction: 'Bosses are at rib junctions; pendants are independent hanging elements supporting upper structures',
    },
  ],

  searchTags: ['vault', 'ceiling', 'rib', 'ornament', 'gothic', 'carved', 'keystone', 'boss', 'decoration', 'intersection'],

  arMetadata: {
    modelPath: '/models/architecture/boss.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Carved Surface', position: { x: 0, y: -0.08, z: 0 } },
      { label: 'Projection', position: { x: 0, y: 0, z: 0.1 } },
      { label: 'Rib Junction', position: { x: 0.06, y: 0.06, z: 0 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
