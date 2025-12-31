import type { ArchitecturalElement } from '../../types';

export const MIHRAB: ArchitecturalElement = {
  id: 'mihrab',
  slug: 'mihrab',
  name: 'Mihrab',
  alternativeNames: ['Prayer Niche', 'Qibla Niche', 'Mehrab'],
  pronunciation: {
    phonetic: 'MEE-rob',
    language: 'Arabic',
  },
  etymology: {
    origin: 'Arabic',
    meaning: 'Place of fighting (spiritual struggle) or sanctuary',
    rootWord: 'mihrab (from root h-r-b)',
  },
  category: 'RELIGIOUS',
  subcategory: 'islamic',
  periods: ['early-islamic', 'moorish', 'ottoman', 'mughal', 'safavid'],
  regions: ['MIDDLE_EAST', 'NORTH_AFRICA', 'SOUTH_ASIA', 'CENTRAL_ASIA'],

  images: {
    primary: '/images/architecture/elements/mihrab-primary.jpg',
    gallery: [
      '/images/architecture/elements/mihrab-tile.jpg',
      '/images/architecture/elements/mihrab-carved.jpg',
    ],
    diagram: '/images/architecture/diagrams/mihrab-detail.svg',
  },

  description: {
    ELEMENTARY: 'A mihrab is a special decorated niche (like a fancy indent) in the wall of a mosque that shows Muslims which direction to face when they pray-toward Mecca. It\'s usually the most beautifully decorated part of the mosque, with colorful tiles, carvings, and sometimes golden decorations!',
    MIDDLE_SCHOOL: 'The mihrab is a semicircular niche in the qibla wall of a mosque, indicating the direction of Mecca for prayer. It serves as the focal point of the mosque\'s interior and is typically the most ornately decorated element, featuring calligraphy, geometric patterns, tilework, carved plaster or stone, and sometimes precious materials. The imam leads prayers from the mihrab area. Architecturally, mihrabs range from simple niches to elaborate architectural compositions with surrounding frames and overhead domes.',
    HIGH_SCHOOL: 'The mihrab is an ornamental niche in the qibla wall (the wall facing Mecca) that marks the direction of prayer in mosques. Beyond its functional role as a directional indicator, the mihrab serves symbolic purposes representing the presence of the Prophet and providing architectural focus for prayer spaces. Typical mihrab design includes a recessed niche (often semicircular or polygonal in plan), an elaborate frame with engaged columns or pilasters, an arch with muqarnas or other decorative treatment, and surrounding zones of calligraphy and ornament. Materials and techniques vary regionally-carved marble in Syrian mosques, glazed tilework in Persian examples, carved stone and inlay in Mughal mosques, and painted decoration in Ottoman mosques. The mihrab often relates to other mosque elements including the minbar (pulpit) to its right and a dome above the prayer space.',
    UNDERGRADUATE: 'The mihrab represents one of Islam\'s most important architectural-liturgical elements, embodying theological concepts through architectural and decorative means. The element\'s development from simple directional marker to elaborate architectural composition reflects evolving mosque design and Islamic aesthetic traditions. Structurally, mihrabs typically create a recessed alcove in the qibla wall, though some feature only surface decoration without actual recession. The depth of recession varies from shallow niches to small chambers capable of containing the imam. The mihrab\'s proportional relationships to the prayer hall, its placement (typically on the wall\'s central axis, though some mosques have multiple mihrabs), and its integration with surrounding architectural elements reveal sophisticated design thinking. Regional schools developed distinctive mihrab vocabularies: Umayyad mosaic decoration, Abbasid carved stucco, Seljuk brick patterns, Mamluk marble opus sectile, Persian tilework, Ottoman calligraphic compositions, and Mughal pietra dura inlay.',
    GRADUATE: 'The mihrab embodies the intersection of architectural, decorative, and theological dimensions in Islamic religious space. Analysis reveals complex functional and symbolic roles: the practical function orienting prayer, the symbolic representation of the Prophet\'s leadership position, the architectural device creating hierarchical focus in prayer halls, and the artistic canvas for displaying calligraphic and geometric Islamic art. The element\'s formal evolution shows adaptation to diverse regional traditions while maintaining core identity. Scholarly debates address the mihrab\'s pre-Islamic origins (possible derivation from Christian apses, though theological prohibitions against figurative representation led to distinctively Islamic decorative programs), the timing of its universal adoption (appearing by the late 7th-early 8th century), and variations in symbolic interpretation across Islamic traditions. The mihrab\'s decorative programs often include specific Quranic verses (particularly those referencing prayer and divine presence), geometric patterns symbolizing divine order, and vegetal motifs representing paradise. Contemporary scholarship examines mihrab design in modern mosques, conservation of historic examples, and the element\'s role in Islamic architectural identity.',
    PHD: 'The mihrab constitutes a crucial element for examining Islamic architectural development, theological expression through form, and regional artistic traditions. Scholarly research addresses multiple questions: the element\'s historical origins and early development (debated connections to Christian liturgical architecture versus indigenous Islamic innovation), the establishment of standard mihrab forms and their transmission across the Islamic world, regional variations in design and decoration, and the mihrab\'s role in mosque spatial organization. Epigraphic studies analyze mihrab inscriptions revealing patronage, dating, and theological messages. Art historical research examines decorative programs, identifying workshop traditions and artistic influences. Archaeological investigations document early mihrabs, including the controversial Medina mosque mihrab (possibly 8th century). Conservation science addresses deterioration of mihrab materials including tilework, carved stone, and inlay. Contemporary research examines how historic mihrabs inform modern mosque design, debates about mihrab orientation accuracy (using GPS versus traditional methods), and the element\'s function in communicating Islamic architectural identity in diverse cultural contexts. Theoretical work addresses the mihrab as sacred space within sacred space and its phenomenological impact on worship experience.',
  },

  history: {
    ELEMENTARY: 'The Prophet Muhammad prayed without a mihrab-people just knew which way was Mecca. His followers added the mihrab later to help everyone pray in the right direction. Over time, mihrabs became more and more beautiful with amazing decorations!',
    MIDDLE_SCHOOL: 'The earliest mosques lacked mihrabs, with the Prophet Muhammad leading prayers toward Jerusalem, then Mecca, without architectural markers. The first mihrab was likely added to the Prophet\'s Mosque in Medina during its renovation (706-710 CE) under Caliph al-Walid I. From this origin, mihrabs spread throughout the Islamic world, evolving from simple niches to elaborate architectural features. Each region developed distinctive styles-Syrian carved stone, Persian tilework, Maghrebi plaster, Mughal marble inlay.',
    HIGH_SCHOOL: 'Mihrab development began in the late 7th-early 8th centuries, approximately 75 years after the Prophet\'s death. The earliest confirmed mihrabs include those in the Damascus Umayyad Mosque (705-715 CE) featuring elaborate mosaic decoration. Subsequent evolution created regional typologies: Abbasid carved stucco mihrabs (Samarra), Fatimid carved stone examples, Seljuk brick and tilework compositions, Mamluk marble opus sectile (Cairo), Persian tilework masterpieces (Isfahan), Mughal pietra dura inlay (Taj Mahal mosque), and Ottoman painted decoration. The mihrab\'s integration with surrounding architectural elements evolved from simple wall niches to complex compositions with flanking columns, overhead domes, and elaborate frames. Modern period shows both continuation of traditional forms and contemporary reinterpretations.',
    UNDERGRADUATE: 'The mihrab\'s history reveals evolving Islamic liturgical practice, artistic development, and regional identity expression. Early debates about the mihrab\'s legitimacy (some scholars viewed it as bid\'ah or innovation) were resolved in its favor, with theological justification emphasizing its role in unifying the prayer direction and honoring the imam\'s position. Regional evolution produced distinct traditions: Umayyad Syrian mosaic work influenced by Byzantine traditions, Abbasid Iraqi carved stucco demonstrating Sassanian influences, North African carved plaster with geometric emphasis, Persian tilework developing sophisticated polychrome techniques, Anatolian stone carving, Mamluk geometric marble inlay, Safavid architectural ceramic programs, Mughal synthesis of Islamic and Hindu decorative traditions, and Ottoman calligraphic compositions. The mihrab became a vehicle for artistic innovation while maintaining consistent functional and symbolic roles. Patronage records reveal mihrabs as objects of particular investment and care, with skilled craftsmen specializing in mihrab creation.',
    GRADUATE: 'The mihrab\'s evolution encompasses theological debates, artistic development, and cultural identity expression. Research reveals complex origins-while Medinan tradition attributes the first mihrab to al-Walid\'s renovation (706-710 CE), archaeological evidence and literary sources suggest possible earlier examples. The element\'s rapid universal adoption indicates strong functional and symbolic appeal. Regional schools developed through interaction of Islamic religious requirements with local artistic traditions: Syrian-Umayyad integration of Byzantine mosaic technique with Islamic geometric and vegetal patterns, Persian development of sophisticated tilework techniques creating mihrab masterpieces, Mamluk opus sectile marble inlay combining geometry with calligraphy, Mughal adaptation of Hindu pietra dura techniques. Scholarly debates address the mihrab\'s symbolic meanings-representations of divine presence, the Prophet\'s leadership position, the gate to paradise, or pure architectural-liturgical device. Cross-cultural influences receive attention, including mutual influences between Islamic mihrabs and Christian apses, Jewish Torah arks. Contemporary developments show both traditionalist reproduction of historical forms and modernist reinterpretations abstracting mihrab essence.',
    PHD: 'Scholarly engagement with mihrab history employs multiple methodologies: archaeological investigation of early examples establishing chronologies, epigraphic analysis revealing patronage and dating, art historical research examining decorative programs and workshop traditions, architectural analysis studying spatial integration, and theoretical interpretation addressing symbolic meanings. Recent work challenges teleological narratives, showing ongoing variation and experimentation rather than linear development toward ideal forms. Digital humanities approaches analyze large datasets of mihrabs, revealing patterns in proportions, decoration, and inscriptions. Material culture studies examine mihrab production including procurement of precious materials, workshop organization, and technical processes. Conservation research addresses deterioration patterns specific to mihrabs including tile loss, structural cracking from building movement, and damage from worship activities. Contemporary scholarship examines mihrab roles in Islamic identity expression, particularly in minority Muslim communities where mihrabs serve as clear Islamic markers. Debates about qibla orientation accuracy using modern versus traditional methods have practical implications for mihrab placement in new mosques.',
  },

  characteristics: [
    'Niche in qibla wall facing Mecca',
    'Most ornately decorated mosque element',
    'Often semicircular or polygonal in plan',
    'Surrounded by decorative frame',
    'Features calligraphy and geometric patterns',
    'May have dome above',
  ],

  famousExamples: [
    { name: 'Great Mosque of Cordoba', location: 'Córdoba, Spain', year: '785-987 CE', description: 'Elaborate horseshoe arch mihrab with mosaics' },
    { name: 'Great Mosque of Kairouan', location: 'Kairouan, Tunisia', year: '9th century', description: 'Tilework and marble mihrab' },
    { name: 'Masjid-i Jami', location: 'Isfahan, Iran', year: '11th-17th century', description: 'Stunning tilework mihrabs' },
    { name: 'Sultan Hassan Mosque', location: 'Cairo, Egypt', year: '1356-1363', description: 'Mamluk marble opus sectile mihrab' },
    { name: 'Taj Mahal Mosque', location: 'Agra, India', year: '1632-1653', description: 'White marble inlay mihrab' },
  ],

  confusionPairs: [
    {
      elementId: 'minbar',
      reason: 'Both are focal elements in mosques',
      distinction: 'Mihrab is a niche indicating prayer direction; minbar is a stepped pulpit for sermons, typically to the right of mihrab',
    },
    {
      elementId: 'apse',
      reason: 'Both are niches in religious buildings',
      distinction: 'Apse is a semicircular recess in Christian churches (often with altar); mihrab is Islamic prayer direction niche (no altar)',
    },
  ],

  searchTags: ['mosque', 'islamic', 'niche', 'prayer', 'qibla', 'mecca', 'direction', 'decorated', 'calligraphy', 'tile'],

  arMetadata: {
    modelPath: '/models/architecture/mihrab.glb',
    scale: 1.5,
    rotatable: true,
    annotations: [
      { label: 'Arch with Muqarnas', position: { x: 0, y: 0.9, z: 0 } },
      { label: 'Niche Interior', position: { x: 0, y: 0.5, z: -0.2 } },
      { label: 'Decorative Frame', position: { x: 0.3, y: 0.6, z: 0 } },
      { label: 'Calligraphic Band', position: { x: 0, y: 0.8, z: 0 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
