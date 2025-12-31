import type { ArchitecturalElement } from '../../types';

export const TRANSEPT: ArchitecturalElement = {
  id: 'transept',
  slug: 'transept',
  name: 'Transept',
  alternativeNames: ['Cross Arm', 'Crossing Wing', 'Transversal Arm'],
  pronunciation: {
    phonetic: 'TRAN-sept',
    language: 'Latin',
  },
  etymology: {
    origin: 'Latin',
    meaning: 'Cross-enclosure or separated area',
    rootWord: 'trans (across) + septum (enclosure)',
  },
  category: 'RELIGIOUS',
  subcategory: 'christian-structural',
  periods: ['roman', 'byzantine', 'romanesque', 'gothic', 'renaissance', 'baroque', 'neoclassical'],
  regions: ['EUROPE', 'AMERICAS'],

  images: {
    primary: '/images/architecture/elements/transept-primary.jpg',
    gallery: [
      '/images/architecture/elements/transept-aerial.jpg',
      '/images/architecture/elements/transept-interior.jpg',
      '/images/architecture/elements/transept-crossing.jpg',
    ],
    diagram: '/images/architecture/diagrams/transept-plan.svg',
  },

  description: {
    ELEMENTARY: 'A transept is the part of a church that crosses the main hall, making the building look like a giant cross from above! It\'s like the arms of the cross, sticking out on both sides. When you stand in the middle where they cross, you can look in four directions!',
    MIDDLE_SCHOOL: 'The transept is the transverse section of a cruciform (cross-shaped) church that intersects the main nave at right angles, creating the characteristic cross plan. It typically consists of two arms-north transept and south transept-extending perpendicular to the nave. The point where nave, transept, and chancel meet is called the crossing, often marked by a tower or dome. Transepts provide additional space for chapels, altars, and congregation, while symbolically reinforcing the church\'s cruciform shape representing Christ\'s cross. The transept\'s length, height, and architectural treatment vary by period and region, from simple Romanesque projections to elaborate Gothic spaces with their own aisles and rose windows.',
    HIGH_SCHOOL: 'The transept creates the cruciform plan that became standard in Western Christian architecture, particularly after the early medieval period. Architecturally, it serves multiple functions: providing structural support at the crossing (often bearing a tower or dome), creating additional liturgical space for chapels and altars, accommodating larger congregations, and establishing axial relationships within the building. The transept\'s development shows chronological progression: Early Christian basilicas often lacked distinct transepts, Romanesque churches established clear transept projections, Gothic cathedrals developed elaborate transept elevations matching nave height with triforium and clerestory levels, Renaissance and Baroque designs varied transept prominence. The crossing where transept and nave meet presents significant structural challenges, typically requiring additional support through piers, arches, and sometimes pendentives or squinches when supporting towers or domes. Transept facades, especially in Gothic cathedrals, often featured major portals and rose windows, creating secondary architectural focal points.',
    UNDERGRADUATE: 'The transept embodies both symbolic and functional dimensions in church architecture. Liturgically, transepts provided spaces for additional altars (especially important before liturgical reforms when multiple simultaneous masses were common), choir seating in monastic churches, and chapels for private devotion or chantry foundations. Structurally, the transept-nave intersection creates the crossing, a critical architectural challenge requiring sophisticated engineering to support towers or domes while maintaining open interior space. Different regional traditions developed distinctive transept treatments: Early Christian Roman basilicas (Old St. Peter\'s) had low, wide transepts; Byzantine churches integrated transepts differently, often with domed crossings; Romanesque churches created dramatic crossings with towers; Gothic cathedrals developed soaring transept elevations (Chartres, Canterbury); English Gothic favored prominent transepts projecting far beyond aisles; Italian churches sometimes minimized transepts in favor of single-volume spaces. The transept\'s symbolic cruciform plan expresses Christian theology-the building as body of Christ, with crossing representing intersection of divine and human. Modern movements questioned the transept\'s necessity, with some 20th-century churches abandoning cruciform plans for centralized or longitudinal alternatives.',
    GRADUATE: 'The transept represents a complex architectural element whose development reveals evolving liturgical, structural, and symbolic priorities. Scholarly analysis addresses the transept\'s origins-debated connections to Roman triumphal arch precedents, martyrial architecture, or liturgical requirements for additional altars. Early Christian development shows variation: some basilicas had continuous transepts (Old St. Peter\'s continuous western transept), others developed projecting arms. The transept\'s relationship to the liturgical program evolved: in monastic churches, transepts often housed choir stalls; in pilgrimage churches, they provided circulation around shrine-altars; in cathedral foundations, they accommodated chapter functions. Structurally, the crossing presents engineering challenges addressed through various means: Byzantine pendentives transferring dome weight to corner piers, Romanesque groin vaults over crossings, Gothic ribbed vaults allowing greater heights, Renaissance and Baroque domes requiring elaborate systems of buttressing and weight distribution. Regional scholarship examines distinctive traditions: English Gothic "Perpendicular" style with prominent transepts and large windows, French Gothic integration of transepts into unified elevation, German hall churches sometimes minimizing transept projection, Spanish churches adapting transepts to local liturgical customs. Contemporary research addresses transept function in modern liturgy (Vatican II emphasis on congregation participation affects transept use), conservation of historic transepts (structural issues with crossing towers, roof drainage), and contemporary church design (whether cruciform plans remain meaningful).',
    PHD: 'Scholarly investigation of transepts employs multiple approaches revealing complex interactions between liturgy, structure, symbolism, and aesthetics. Archaeological research establishes early Christian transept development, with debates about whether transepts derive from Roman building types (basilicas with tribunes), funeral architecture (martyria), or purely liturgical requirements. Liturgical historians examine how changing practices influenced transept design: multiplication of altars following medieval devotional practices, choir placement in monastic churches, processional routes in pilgrimage churches, chapter functions in cathedrals. Structural engineering research analyzes crossing design challenges, examining how builders addressed concentration of loads from towers or domes, comparing solutions across traditions (Byzantine pendentives vs. Gothic ribbed vaults vs. Renaissance domes on drums). Art historical studies investigate transept decoration programs-portal sculpture (Chartres north transept royal portal), rose windows, altarpieces, wall paintings-examining how these create autonomous artistic environments within larger buildings. Symbolic interpretation addresses cruciform plan meanings, though recent scholarship cautions against overreading explicit symbolism, noting that practical considerations often influenced design as much as theology. Conservation science examines transept-specific deterioration including crossing tower settlement causing cracking, roof valley drainage problems, and differential movement between nave and transept. Contemporary research investigates modern transept design in new churches (questioning traditional cruciform vs. alternative plans), adaptive reuse of historic churches (how transept spaces function in new uses), and phenomenological studies of transept spatial experience (relationships between crossing, nave, and transept arms).',
  },

  history: {
    ELEMENTARY: 'Early churches were simple rectangular buildings. As Christianity grew, builders started adding the cross arms (transepts) to make churches look like the cross Jesus died on. This made the buildings bigger and more special!',
    MIDDLE_SCHOOL: 'The earliest Christian churches (3rd-4th centuries) were simple rectangular basilicas without transepts. The first transepts appeared in the 4th century (Old St. Peter\'s Basilica, Rome, 319-333 CE) creating a continuous cross-arm before the apse. Byzantine churches developed their own transept traditions, often with domed crossings. Romanesque period (1000-1200) established clear projecting transepts with crossing towers. Gothic architecture (1200-1500) created elaborate transept designs with matching nave heights and magnificent rose windows. Renaissance and Baroque periods varied in transept treatment, sometimes reducing projection for classical unity. The 19th century Gothic Revival emphasized prominent transepts, while 20th century modernism questioned their necessity.',
    HIGH_SCHOOL: 'Transept evolution reflects changing architectural, liturgical, and symbolic priorities. Early Christian basilicas generally lacked transepts, but by the 4th century, some major churches incorporated transverse elements (Old St. Peter\'s continuous transept, 4th century). Byzantine architecture developed centralized plans with transepts integrated into domed crossing schemes (Hagia Sophia, 532-537, though debated as true transept). Western medieval development shows clear progression: Early medieval churches had simple transepts (St. Denis, 754-775), Romanesque established projecting transepts with towers (Speyer Cathedral, 1030-1106), Gothic created elaborate transept elevations matching nave complexity (Chartres Cathedral, 1194-1220, with famous rose windows). English Gothic developed particularly prominent transepts (Salisbury Cathedral, 1220-1258, with double transepts). Italian Gothic often minimized transepts for unitary spatial effects (Florence Cathedral, 1296-1436). Renaissance theorists debated appropriate church plans-centralized vs. longitudinal cruciform-with varying transept treatments resulting. Baroque integrated transepts into dynamic spatial compositions (St. Peter\'s, final 17th-century form). The 20th-century Liturgical Movement questioned traditional cruciform plans, leading to experimental alternatives, though many contemporary churches maintain transepts for symbolic and spatial reasons.',
    UNDERGRADUATE: 'Transept history reveals complex interplay between liturgical function, structural innovation, and symbolic expression. Early development shows regional variation: Syrian churches developed distinctive transept treatments, North African basilicas varied in transept adoption, while Italian and Frankish churches gradually established transepts as standard. The requirement for multiple altars (private masses, chantry foundations, guild altars) made transepts functionally valuable for medieval churches. Monastic churches used transepts for choir placement (Cistercian churches had characteristic squared transepts, Benedictine churches often more elaborate). Pilgrimage churches developed transepts with radiating chapels facilitating circulation around relics. The structural challenge of crossing towers or domes drove innovation: Romanesque builders experimented with various vaulting systems, Gothic engineers developed sophisticated ribbed vaults allowing unprecedented heights, Renaissance architects studied Roman examples (Pantheon) for dome inspiration. Regional schools developed distinctive characters: Norman Romanesque with massive crossing towers (Durham Cathedral, 1093-1133), French Gothic with elegant integration of transept into unified elevation (Amiens Cathedral, 1220-1270), English Perpendicular with prominent transepts and large windows (York Minster transepts, 13th-15th centuries), German hall churches minimizing distinction between nave and transept spaces. Symbolic interpretation emphasized cruciform plan as representing Christ\'s body, pilgrimage as imitatio Christi, and orientation expressing cosmological meanings.',
    GRADUATE: 'Scholarly analysis of transept development employs multiple methodologies revealing evolving architectural, liturgical, and cultural contexts. Archaeological investigation establishes chronologies and construction sequences, sometimes revealing that transepts were later additions to initially simple plans. Liturgical historians examine how changing practices influenced transept requirements: the shift from few altars to multiplication of altars (11th-13th centuries) made transept space valuable; monastic reforms (Cluny, Cîteaux) had architectural implications for transept design; later medieval chantry foundations located in transepts; Reformation liturgical changes affected transept use (removal of side altars); Vatican II emphasis on congregational participation raised questions about transept relevance. Structural analysis examines engineering solutions for crossing challenges: comparative studies of Byzantine pendentive systems, Romanesque groin and ribbed vaults, Gothic skeletal structure, and Renaissance dome construction. Art historical research investigates transept decorative programs as autonomous units: transept portal sculpture (Chartres north transept royal portal, south transept Last Judgment), rose windows as major artistic commissions, transept altarpieces and wall painting cycles. Conservation science addresses characteristic transept problems: crossing tower settlement causing structural damage, differential movement between nave and transept creating cracks, complex roof geometries creating water penetration issues. Contemporary scholarship examines modern transept design debates, adaptive reuse challenges, and cross-cultural Christian architecture (how non-Western cultures adapted or rejected cruciform plans).',
    PHD: 'The transept constitutes a crucial element for examining Christian architectural development, liturgical evolution, and symbolic expression through built form. Research employs diverse approaches: archaeological investigation establishing regional and chronological patterns of transept adoption; structural engineering analysis examining solutions to crossing challenges; liturgical-historical research connecting spatial arrangements to worship practices; art historical studies of transept decorative programs; theoretical interpretation of cruciform symbolism; conservation science addressing deterioration patterns. Debates address fundamental questions: Did transepts derive from specific Roman building types or emerge from Christian liturgical requirements? How did transept development relate to martyrial architecture and relic veneration? What drove regional variation in transept treatment? Recent work employs comparative methodologies examining transepts across Christian traditions (Eastern Orthodox, Oriental Orthodox, Catholic, Anglican, Protestant), revealing both shared patterns and distinctive developments. Digital technologies enable new research: 3D scanning documents complex crossing geometries, structural modeling analyzes historical engineering solutions, spatial analysis examines circulation and sight lines. Conservation research addresses specific transept challenges including tower settlement, vault stability, roof drainage, and climate control in large volumes. Contemporary architectural research investigates whether traditional cruciform plans remain meaningful for current liturgy and congregational patterns, examining successful modern examples maintaining traditional forms and innovative alternatives. Phenomenological studies analyze spatial experience of transepts, examining how crossing spaces function as threshold zones within larger buildings.',
  },

  characteristics: [
    'Transverse section crossing the nave',
    'Creates cruciform church plan',
    'Typically has north and south arms',
    'Intersects nave at the crossing',
    'Often supports tower or dome at crossing',
    'May contain chapels and altars',
    'Can have its own rose windows and portals',
  ],

  famousExamples: [
    { name: 'Chartres Cathedral', location: 'Chartres, France', year: '1194-1220', description: 'Gothic transepts with magnificent rose windows' },
    { name: 'Canterbury Cathedral', location: 'Canterbury, England', year: '1070-1834', description: 'Multiple building periods with prominent transepts' },
    { name: 'Florence Cathedral', location: 'Florence, Italy', year: '1296-1436', description: 'Renaissance transepts supporting Brunelleschi\'s dome' },
    { name: 'St. Paul\'s Cathedral', location: 'London, England', year: '1675-1710', description: 'Baroque transepts under Wren\'s famous dome' },
    { name: 'Salisbury Cathedral', location: 'Salisbury, England', year: '1220-1258', description: 'Early English Gothic with double transepts' },
  ],

  confusionPairs: [
    {
      elementId: 'nave',
      reason: 'Both are major church spatial divisions',
      distinction: 'Nave is the main longitudinal section; transept is the transverse section crossing the nave',
    },
    {
      elementId: 'crossing',
      reason: 'Terms often used together',
      distinction: 'Transept is the cross arm itself; crossing is the intersection point where nave and transept meet',
    },
  ],

  searchTags: ['church', 'cathedral', 'cross', 'cruciform', 'christian', 'gothic', 'romanesque', 'nave', 'crossing', 'tower', 'arm'],

  arMetadata: {
    modelPath: '/models/architecture/transept.glb',
    scale: 2.5,
    rotatable: true,
    annotations: [
      { label: 'North Transept Arm', position: { x: 0, y: 0.5, z: -1.0 } },
      { label: 'South Transept Arm', position: { x: 0, y: 0.5, z: 1.0 } },
      { label: 'Crossing', position: { x: 0, y: 0.8, z: 0 } },
      { label: 'Transept Rose Window', position: { x: -1.2, y: 0.7, z: 0 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
