import type { ArchitecturalElement } from '../../types';

export const MINARET: ArchitecturalElement = {
  id: 'minaret',
  slug: 'minaret',
  name: 'Minaret',
  alternativeNames: ['Manara', 'Tower of Light', 'Muezzin Tower'],
  pronunciation: {
    phonetic: 'min-uh-RET',
    language: 'Arabic/French',
  },
  etymology: {
    origin: 'Arabic',
    meaning: 'Lighthouse or place of light',
    rootWord: 'manara (lighthouse, from nar, fire)',
  },
  category: 'RELIGIOUS',
  subcategory: 'islamic',
  periods: ['early-islamic', 'moorish', 'ottoman', 'mughal'],
  regions: ['MIDDLE_EAST', 'NORTH_AFRICA', 'SOUTH_ASIA', 'EAST_ASIA'],

  images: {
    primary: '/images/architecture/elements/minaret-primary.jpg',
    gallery: [
      '/images/architecture/elements/minaret-ottoman.jpg',
      '/images/architecture/elements/minaret-spiral.jpg',
    ],
    diagram: '/images/architecture/diagrams/minaret-types.svg',
  },

  description: {
    ELEMENTARY: 'A minaret is a tall, thin tower next to a mosque where someone called a muezzin climbs up to call Muslims to prayer five times a day. Minarets can be round, square, or octagonal, and they often have beautiful decorations and a balcony near the top!',
    MIDDLE_SCHOOL: 'The minaret is a distinctive tower associated with mosques, from which the call to prayer (adhan) is proclaimed. Minarets vary in style across Islamic regions-Middle Eastern minarets often have round shafts, Turkish minarets are slender and pointed, and North African minarets tend to be square. A typical minaret includes a shaft (tower body), one or more balconies for the muezzin, and a crown (often domed or conical top).',
    HIGH_SCHOOL: 'The minaret is a tower rising from or adjacent to mosques, serving both functional purposes (providing an elevated position for the call to prayer) and symbolic roles (marking mosques in urban landscapes and expressing Islamic architectural identity). Minaret typology varies regionally: Syrian square stone towers, Persian cylindrical brick forms, Ottoman pencil-thin examples, Maghrebi square towers, and Mughal multi-tiered structures. Structural elements typically include a base integrated with the mosque, a shaft (circular, square, or polygonal), one or more projecting balconies (sherefe), and a crown element. Decoration employs Islamic artistic vocabularies including geometric patterns, calligraphy, tilework, and carved stonework.',
    UNDERGRADUATE: 'The minaret represents one of Islam\'s most recognizable architectural elements, evolving from functional necessity into symbolic expression of Islamic presence and architectural creativity. The element\'s development shows remarkable regional diversity while maintaining core functional requirements. Structural considerations vary by form-square minarets require different engineering than cylindrical ones, while extremely slender Ottoman examples demanded sophisticated understanding of lateral stability. The minaret\'s relationship to mosque planning varies from integral (minarets incorporated into mosque structure) to detached (free-standing minarets connected by passage). Acoustic considerations influenced design, though modern amplification has transformed the functional relationship. The minaret\'s symbolic dimensions include vertical emphasis suggesting spiritual aspiration, visual landmark identifying Muslim communities, and architectural canvas for demonstrating cultural and technological achievements.',
    GRADUATE: 'The minaret embodies complex relationships between religious function, regional identity, structural innovation, and aesthetic expression in Islamic architecture. Typological analysis reveals distinct regional schools: early Syrian/Egyptian square stone minarets deriving from church tower precedents, Abbasid spiral minarets referencing Mesopotamian ziggurats, Seljuk cylindrical brick towers showcasing mathematical brick patterns, Ottoman synthesis achieving unprecedented slenderness through refined proportional systems, and Mughal elaborations incorporating Hindu architectural influences. Structural evolution shows progressive refinement-achieving greater heights with more slender proportions required advances in foundation design, material quality, and proportional understanding. The element\'s acoustic function, though practically superseded by technology, shaped design through balcony placement and opening orientation. Contemporary scholarship examines minarets as expressions of political power, community identity, and architectural ambition.',
    PHD: 'The minaret constitutes a rich field for research examining Islamic architectural development, structural engineering evolution, regional cultural identity, and the relationship between function and form. Scholarly work addresses multiple dimensions: architectural history tracing typological development and regional variations, structural analysis examining engineering solutions for vertical structures, acoustic studies investigating sound projection characteristics, and cultural studies analyzing symbolic meanings and social functions. Recent research employs digital documentation revealing construction techniques, structural modeling testing historical designs, and comparative studies examining cross-cultural influences. Archaeological investigation of early minarets informs understanding of origins and evolution. The element\'s colonial and postcolonial dimensions receive attention-minaret construction as assertion of Islamic identity, colonial regulations restricting minaret heights, and contemporary debates about minaret construction in non-Muslim majority contexts. Conservation challenges include foundation settlement, structural cracking from earthquakes, and deterioration of decorative elements.',
  },

  history: {
    ELEMENTARY: 'The first mosques didn\'t have minarets-the call to prayer was given from rooftops! The oldest surviving minaret was built over 1,300 years ago. Different Muslim countries developed their own special minaret styles, from square North African towers to thin Ottoman minarets that look like needles pointing to heaven!',
    MIDDLE_SCHOOL: 'Early mosques lacked minarets, with the call to prayer given from rooftops or doorways. The first purpose-built minarets appeared in the late 7th-early 8th centuries. Different regional styles evolved: massive square Maghrebi towers, spiral Abbasid forms, pencil-thin Ottoman examples, and elaborate Mughal minarets. Famous examples include the Malwiya Minaret (848-852 CE) with its spiraling ramp and the Qutb Minar (1192-1220) in Delhi.',
    HIGH_SCHOOL: 'Minaret development began in the late 7th century, evolving from earlier structures including church towers and pre-Islamic Syrian bell towers. Early Islamic minarets served practical purposes (call to prayer from elevation) while establishing distinctive Islamic architectural identity. Regional schools emerged: Umayyad Syrian square towers, Abbasid monumental spirals (Great Mosque of Samarra, 848-852), North African square minarets (Koutoubia, Marrakech, 1147-1195), Seljuk cylindrical brick forms, Ottoman refined slender proportions, and Mughal synthesis incorporating Indian elements. The minaret\'s function evolved with technology-modern amplification reduced the acoustic necessity while the symbolic role persisted. Contemporary debates address minaret construction in non-Muslim contexts and heritage conservation of historic examples.',
    UNDERGRADUATE: 'Minaret history reveals complex cultural, technological, and artistic development within Islamic architecture. Early debates about minaret legitimacy (some scholars questioning additions to original mosque forms) were resolved in favor of acceptance by the 8th century. Regional typologies developed through combination of local building traditions, available materials, and cultural preferences: Syrian/Egyptian square masonry towers influenced by regional bell tower precedents, Iraqi spiral minarets referencing Mesopotamian architectural heritage, Persian cylindrical brick towers showcasing sophisticated geometric brick patterns, Maghrebi square towers with distinctive proportional systems, Anatolian stone and brick combinations, Ottoman stone minarets achieving unprecedented slenderness, and South Asian multi-balcony elaborations. Structural evolution shows progressive understanding-achieving the 73-meter height of the Qutb Minar or the slender proportions of Sinan\'s minarets required sophisticated engineering. Competition between rulers and patrons drove increasing architectural ambition.',
    GRADUATE: 'The minaret\'s evolution encompasses multiple analytical frameworks: architectural history examining formal development and regional variations, structural engineering analyzing construction techniques and stability solutions, religious studies addressing liturgical functions and theological debates, political history examining minarets as expressions of power and legitimacy, and urban studies analyzing minarets\' roles in city morphology. Research reveals how minarets synthesized diverse influences-Syrian church towers, Roman lighthouses, Sassanian fire temples-into distinctive Islamic forms. Regional schools developed systematic approaches: Maghrebi proportional systems relating minaret height to mosque dimensions, Ottoman refinements achieving visual lightness through precise proportions and material transitions, Mughal decorative elaborations. The element\'s symbolic dimensions evolved from simple functional marker to political statement, community symbol, and architectural showcase. Modern contexts introduce new considerations including heritage conservation, contemporary interpretations of traditional forms, and debates about minaret construction in pluralistic societies.',
    PHD: 'Scholarly engagement with minaret history employs diverse methodologies: archaeological investigation of early examples revealing origins and construction techniques, architectural analysis documenting typological development, structural modeling testing historical stability solutions, acoustic studies examining sound projection, and cultural analysis interpreting social meanings. Recent work challenges simplistic diffusion narratives, revealing multiple independent innovations and complex cross-cultural exchanges. Digital documentation enables precise geometric analysis revealing proportional systems and construction sequences. Studies of medieval architectural treatises provide insights into design knowledge. Research on minaret inscriptions and decorative programs reveals ideological messages. Conservation science addresses deterioration patterns specific to vertical structures including foundation settlement, material weathering, and seismic vulnerability. Contemporary scholarship examines minaret controversies in Europe and elsewhere, analyzing how these structures function as symbols in identity politics. Postcolonial studies examine minaret construction as assertion of cultural presence and responses to colonial-era restrictions.',
  },

  characteristics: [
    'Tall tower associated with mosques',
    'One or more balconies (sherefe)',
    'Regional variations in form (square, round, polygonal)',
    'Decorative elements (tilework, calligraphy, geometry)',
    'Accessed by internal staircase',
    'Crowned with dome, cone, or pavilion',
  ],

  famousExamples: [
    { name: 'Great Mosque of Samarra (Malwiya)', location: 'Samarra, Iraq', year: '848-852 CE', description: 'Spiral minaret 52 meters tall' },
    { name: 'Koutoubia Mosque', location: 'Marrakech, Morocco', year: '1147-1195', description: 'Classic Maghrebi square minaret' },
    { name: 'Qutb Minar', location: 'Delhi, India', year: '1192-1220', description: 'Victory tower, 73 meters tall' },
    { name: 'Süleymaniye Mosque', location: 'Istanbul, Turkey', year: '1550-1558', description: 'Sinan\'s masterpiece with four slender minarets' },
    { name: 'Hassan Tower', location: 'Rabat, Morocco', year: '1195', description: 'Incomplete Almohad minaret' },
  ],

  confusionPairs: [
    {
      elementId: 'bell-tower',
      reason: 'Both are religious towers for calling faithful',
      distinction: 'Minaret is Islamic for call to prayer; bell tower is Christian and contains bells',
    },
    {
      elementId: 'pagoda',
      reason: 'Both are tall religious towers',
      distinction: 'Minaret is attached to mosques and cylindrical/square; pagoda is East Asian Buddhist with multiple tiers',
    },
  ],

  searchTags: ['mosque', 'islamic', 'tower', 'call-to-prayer', 'adhan', 'muslim', 'ottoman', 'mughal', 'tall', 'religious'],

  arMetadata: {
    modelPath: '/models/architecture/minaret.glb',
    scale: 3.0,
    rotatable: true,
    annotations: [
      { label: 'Crown/Finial', position: { x: 0, y: 1.0, z: 0 } },
      { label: 'Balcony (Sherefe)', position: { x: 0.1, y: 0.7, z: 0 } },
      { label: 'Shaft', position: { x: 0, y: 0.4, z: 0 } },
      { label: 'Base', position: { x: 0, y: 0.1, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
