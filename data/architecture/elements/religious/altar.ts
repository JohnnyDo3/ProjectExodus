import type { ArchitecturalElement } from '../../types';

export const ALTAR: ArchitecturalElement = {
  id: 'altar',
  slug: 'altar',
  name: 'Altar',
  alternativeNames: ['High Altar', 'Holy Table', 'Communion Table', 'Sacrificial Table'],
  pronunciation: {
    phonetic: 'AWL-ter',
    language: 'Latin',
  },
  etymology: {
    origin: 'Latin',
    meaning: 'High place for sacrifice or offerings',
    rootWord: 'altare (from altus, meaning high)',
  },
  category: 'RELIGIOUS',
  subcategory: 'christian-liturgical',
  periods: ['roman', 'byzantine', 'romanesque', 'gothic', 'renaissance', 'baroque', 'neoclassical'],
  regions: ['EUROPE', 'AMERICAS', 'MIDDLE_EAST', 'ASIA', 'AFRICA'],

  images: {
    primary: '/images/architecture/elements/altar-primary.jpg',
    gallery: [
      '/images/architecture/elements/altar-baroque.jpg',
      '/images/architecture/elements/altar-gothic.jpg',
      '/images/architecture/elements/altar-modern.jpg',
    ],
    diagram: '/images/architecture/diagrams/altar-detail.svg',
  },

  description: {
    ELEMENTARY: 'An altar is a special table in a church where important religious ceremonies happen. It\'s usually at the front of the church and is the most important piece of furniture. Many altars are beautifully decorated with candles, crosses, and colorful cloths!',
    MIDDLE_SCHOOL: 'The altar is the central liturgical furnishing in Christian churches, serving as the table for the Eucharist (Holy Communion). Positioned in the sanctuary or chancel, it represents the table of the Last Supper and the place of sacrifice. Traditional altars are made of stone or marble and often contain relics of saints. The altar is typically elevated on a platform (predella) and may be backed by an ornamental screen (reredos) or covered by a canopy (baldachin). Altar design varies significantly across denominations and periods, from simple wooden tables in Protestant churches to elaborate Baroque marble compositions in Catholic cathedrals.',
    HIGH_SCHOOL: 'The altar functions as the focal point of Christian worship space, representing both table and sacrifice. Architectural development shows evolution from early Christian simple wooden tables to medieval stone block altars (often containing martyrs\' relics), to elaborate Renaissance and Baroque compositions integrating architecture, sculpture, and painting. Traditional Catholic altars faced east (ad orientem) with the priest\'s back to the congregation until liturgical reforms of Vatican II (1962-65) introduced versus populum (facing the people) altars. Altar construction follows specific liturgical requirements: traditionally a single stone slab (mensa) supported by a base, containing a sealed cavity (sepulcrum) for relics. The altar\'s placement within the sanctuary, its relationship to the reredos and tabernacle, and its decorative treatment express theological concepts and denominational traditions. Surrounding elements include altar rails (separating sanctuary from nave), altar steps, credence table, and liturgical furnishings.',
    UNDERGRADUATE: 'The altar embodies theological concepts through architectural and material expression. Liturgical theology views the altar simultaneously as the table of the Last Supper (meal aspect) and Calvary (sacrificial aspect), creating tension between horizontal table and vertical monument that architectural design negotiates. Medieval altars incorporated architectural shrines housing relics, creating sacred landscapes of memory and intercession. Renaissance and Baroque altarpieces transformed altars into comprehensive artistic programs integrating painting, sculpture, and architecture to create theological narratives and spiritual experiences. The Counter-Reformation promoted magnificent altars as expressions of Catholic doctrine, while Protestant traditions favored simpler communion tables emphasizing Word over Sacrament. Vatican II reforms fundamentally changed altar design, requiring freestanding altars accessible from all sides for versus populum celebration, reducing architectural elaboration. Contemporary scholarship examines how altar design mediates between tradition and liturgical function, sacred and communal aspects of worship. Regional traditions developed distinctive altar vocabularies: Italian Baroque theatrical compositions, Spanish retablos, Northern European winged altarpieces, Orthodox iconostasis-altar relationships.',
    GRADUATE: 'The altar represents a nexus of theological, liturgical, and artistic concerns in sacred architecture. Scholarly analysis addresses the altar\'s symbolic and functional complexity: as mensa (table) it recalls the Last Supper and emphasizes meal and community; as ara (sacrificial stone) it references Calvary and emphasizes sacrifice and atonement; as tomb (through relic containment) it connects to martyrial tradition and communion of saints. Medieval development created increasingly elaborate altar compositions: Romanesque block altars with simple frontals (antependia), Gothic altarpieces integrating painting and sculpture, late medieval winged altarpieces (triptychs, polyptychs) creating transformable sacred environments. The relationship between altar and reredos evolved from simple decoration to architectural-artistic unity in Baroque retablos mayor that absorbed the altar into comprehensive spatial compositions. Liturgical movement scholarship critically examined historical accretions distinguishing between essential and contingent elements, leading to Vatican II reforms emphasizing altar as simple, dignified table. Contemporary debates address appropriate forms for freestanding versus populum altars, the role of tradition in contemporary design, and conservation of historic altars while accommodating current liturgy.',
    PHD: 'The altar constitutes a central element for examining Christian liturgical architecture, theology\'s spatial expression, and sacred art\'s evolution. Research employs multiple approaches: liturgical-theological analysis examining how altar design embodies changing understandings of Eucharist and priesthood; art historical investigation of altarpiece development as comprehensive artistic programs; archaeological study of early Christian altars establishing liturgical practice evolution; conservation science addressing deterioration of historic altars including polychromy, gilding, and structural integrity. Debates address the altar\'s origins-whether derived from Roman funerary practices, Jewish Temple sacrifice, or domestic meal tables-with implications for theological interpretation. Medieval scholarship examines relic cult influences on altar design and consecration practices. Reformation studies analyze divergent Protestant and Catholic altar theologies and their architectural expressions. Vatican II research addresses liturgical reform\'s architectural implications, sometimes creating conflicts between historic preservation and contemporary liturgical requirements. Cross-cultural studies examine Christian altar traditions in non-Western contexts, showing adaptation to local architectural and cultural frameworks. Contemporary work addresses modern altar design seeking authentic expression of current liturgical understanding while maintaining continuity with tradition, debates about repositioning versus multiplying altars in historic churches, and phenomenological studies of altar experience in worship.',
  },

  history: {
    ELEMENTARY: 'The first Christians used simple wooden tables for their meals and prayers, just like at the Last Supper. Over time, as Christianity grew, altars became bigger and more beautiful. Kings and queens wanted to make the most amazing altars to honor God!',
    MIDDLE_SCHOOL: 'Early Christians (1st-3rd centuries) celebrated Eucharist on simple wooden tables in homes. After Christianity became legal (313 CE), churches were built with permanent stone altars. Medieval practice required stone altars containing martyrs\' relics. Romanesque altars (1000-1200) were simple stone blocks, but Gothic period (1200-1500) saw development of elaborate altarpieces. The Renaissance and Baroque periods (1400-1700) created magnificent altar compositions integrating architecture, sculpture, and painting. Protestant Reformation (16th century) led to simpler communion tables in Protestant churches. Vatican II (1962-65) reformed Catholic altar design, requiring freestanding altars allowing celebration facing the people.',
    HIGH_SCHOOL: 'Altar evolution reflects changing liturgical practice and theological emphasis. Early Christian practice (1st-4th centuries) used wooden tables in house churches, with the earliest stone altars appearing in martyrial basilicas built over saints\' tombs. Byzantine tradition developed altar placement behind iconostasis screens with specific liturgical choreography. Western medieval development created increasingly elaborate altars: Romanesque period established stone altar requirements with relic containment and liturgical regulations (Council of Carthage, 401 CE). Gothic innovations included ciborium canopies, reredos screens, and eventually integrated altarpieces. Late medieval altars became architectural-artistic complexes with carved or painted retables, predella scenes, and sculptural programs. Renaissance innovations introduced classical architectural framing, while Baroque design created theatrical compositions with dramatic sculpture and illusionistic painting. Counter-Reformation promoted magnificent altars as expressions of Catholic doctrine against Protestant simplification. The 19th-century Gothic Revival created elaborate neo-Gothic altars. Liturgical Movement (early 20th century) questioned medieval accretions, leading to Vatican II reforms requiring simple, freestanding altars versus populum.',
    UNDERGRADUATE: 'Altar history reveals evolving Christian theology, liturgy, and artistic expression. Early Church debates addressed altar theology, with some Eastern Fathers viewing the altar as representing Christ\'s body. The requirement for stone altars and relic containment (codified in various councils) connected altars to martyrial tradition and created demand for relics, sometimes leading to problematic practices. Medieval altar development shows regional variations: Italian focus on architectural-sculptural framing (baldachins, ciboria), Northern European emphasis on painted wings (triptychs by Van Eyck, Grünewald), Iberian integration of altar into comprehensive retablos. Gothic period saw altars multiply-high altars, side chapel altars, chantry altars-creating complex liturgical landscapes. Reformation theology fundamentally questioned altar-as-sacrifice, leading Lutheran and Reformed traditions toward simple communion tables emphasizing meal over sacrifice. Catholic Counter-Reformation responded with increasingly magnificent altars (Bernini\'s St. Peter\'s baldachin, 1624-33). Baroque retablos mayor in Spain and Latin America created totalized sacred environments. The 20th-century Liturgical Movement critically examined historical development, distinguishing essential from contingent, leading to Vatican II altar reforms that required freestanding construction, simpler design, and versus populum orientation.',
    GRADUATE: 'The altar\'s evolution encompasses theological debates, liturgical developments, and artistic innovation. Early Christian practice showed diversity-some communities continued Jewish meal blessing traditions while others emphasized sacrificial interpretation. Archaeological evidence from Roman catacombs and early basilicas reveals simple arrangements evolving toward architectural elaboration. Byzantine synthesis created distinctive altar theology and practice (proskomide preparation, Great Entrance procession) architecturally expressed through iconostasis-altar relationships. Western medieval development responded to multiple pressures: relic veneration, private masses requiring multiple altars, donor patronage funding elaborate altarpieces, theological elaboration of Eucharistic doctrine (transubstantiation defined 1215). Gothic altarpieces evolved into comprehensive programs: Isenheim Altarpiece\'s transformable wings created different visual environments for liturgical seasons. Late medieval multiplication of altars (chantry foundations, guild altars) created spatial and liturgical complexity. Reformation critiques (Zwingli, Calvin) rejected altar-as-sacrifice theology, leading to iconoclasm and altar removal. Lutheran mediating position retained altars with reformed theology. Catholic response through Council of Trent (1545-63) reaffirmed traditional altar theology while regulating practices. Baroque altar-retablos reached apotheosis in Iberian world, creating immersive sacred theaters. Enlightenment and 19th-century historicism produced varied responses from neoclassical simplicity to Gothic Revival elaboration.',
    PHD: 'Scholarly engagement with altar history employs multiple methodologies revealing complex interactions between theology, liturgy, art, and architecture. Archaeological investigations establish early Christian practice diversity, challenging teleological narratives of linear development. Liturgical historians reconstruct changing Eucharistic theologies and their spatial implications. Art historians analyze altarpiece iconographic programs, patronage patterns, and artistic innovation. Recent scholarship employs cultural history approaches examining altars as sites of memory, power, and identity. Material culture studies investigate altar production including stone procurement, relic acquisition networks, and workshop organization. Conservation science addresses technical questions about historic altar construction, polychromy techniques, and deterioration mechanisms while navigating tensions between preservation and liturgical use. Vatican II implementation studies reveal varied responses to reformed liturgy-ranging from destruction of historic altars to creative adaptations maintaining historic ensembles while adding versus populum altars. Cross-cultural studies examine Christian altar traditions in Asia, Africa, Latin America, showing creative adaptation to local architectural and cultural contexts (inculturation). Contemporary work addresses appropriate altar design expressing current liturgical understanding while maintaining tradition continuity. Phenomenological studies examine worship experience, investigating how altar design and placement affect congregational participation and spiritual experience. Digital humanities approaches analyze large datasets revealing patterns in altar dedication inscriptions, dimensions, and iconographic programs.',
  },

  characteristics: [
    'Central liturgical table in Christian worship',
    'Positioned in sanctuary or chancel',
    'Traditional construction from stone or marble',
    'Often contains relics of saints',
    'May be elevated on platform (predella)',
    'Can be backed by reredos or covered by baldachin',
    'Focal point of church architecture',
  ],

  famousExamples: [
    { name: 'St. Peter\'s Basilica Baldachin Altar', location: 'Vatican City', year: '1624-1633', description: 'Bernini\'s bronze baldachin over papal altar' },
    { name: 'Ghent Altarpiece', location: 'Saint Bavo Cathedral, Ghent, Belgium', year: '1432', description: 'Van Eyck brothers\' polyptych altarpiece masterpiece' },
    { name: 'Isenheim Altarpiece', location: 'Unterlinden Museum, Colmar, France', year: '1512-1516', description: 'Grünewald\'s transformable winged altarpiece' },
    { name: 'San Marco Pala d\'Oro', location: 'Venice, Italy', year: '976-1345', description: 'Byzantine-Gothic golden enamel altarpiece' },
    { name: 'Westminster Abbey High Altar', location: 'London, England', year: '1268 (rebuilt 1935)', description: 'Gothic altar with Cosmati pavement' },
  ],

  confusionPairs: [
    {
      elementId: 'reredos',
      reason: 'Both are central sanctuary elements',
      distinction: 'Altar is the table for Eucharist; reredos is the decorative screen behind the altar',
    },
    {
      elementId: 'tabernacle',
      reason: 'Both hold sacred objects in churches',
      distinction: 'Altar is the table for celebrating Mass; tabernacle is the locked box storing consecrated hosts',
    },
  ],

  searchTags: ['church', 'christian', 'catholic', 'liturgy', 'eucharist', 'communion', 'sanctuary', 'mass', 'sacrifice', 'table', 'sacred'],

  arMetadata: {
    modelPath: '/models/architecture/altar.glb',
    scale: 1.2,
    rotatable: true,
    annotations: [
      { label: 'Altar Mensa (Table Top)', position: { x: 0, y: 0.9, z: 0 } },
      { label: 'Predella (Platform)', position: { x: 0, y: 0.2, z: 0 } },
      { label: 'Frontal/Antependium', position: { x: 0, y: 0.5, z: 0.4 } },
      { label: 'Altar Candles', position: { x: 0.3, y: 1.0, z: 0 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
