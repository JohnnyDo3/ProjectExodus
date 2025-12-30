import type { ArchitecturalElement } from '../../types';

export const ORIEL_WINDOW: ArchitecturalElement = {
  id: 'oriel-window',
  slug: 'oriel-window',
  name: 'Oriel Window',
  alternativeNames: ['Oriel', 'Projecting Bay', 'Cantilevered Bay Window'],
  pronunciation: {
    phonetic: 'OR-ee-el WIN-doh',
    language: 'English',
  },
  etymology: {
    origin: 'Old French',
    meaning: 'From "oriol" meaning gallery or porch, possibly from Latin "oratorium"',
    rootWord: 'oriol (Old French)',
  },
  category: 'WINDOW',
  subcategory: 'projecting_windows',
  periods: ['MEDIEVAL', 'GOTHIC', 'TUDOR', 'ELIZABETHAN', 'JACOBEAN', 'GOTHIC_REVIVAL', 'VICTORIAN'],
  regions: ['WESTERN_EUROPE', 'NORTHERN_EUROPE', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/oriel-window-primary.jpg',
    gallery: [
      '/images/architecture/elements/oriel-window-tudor.jpg',
      '/images/architecture/elements/oriel-window-oxford.jpg',
      '/images/architecture/elements/oriel-window-timber.jpg',
    ],
    diagram: '/images/architecture/diagrams/oriel-window.svg',
  },

  description: {
    ELEMENTARY: 'An oriel window is a special window that sticks out from the wall of a building on the upper floors! Unlike regular windows that are flat against the wall, oriel windows project outward like little rooms hanging from the building. They\'re usually held up by fancy stone or wooden brackets. These windows give people inside more space and better views in multiple directions. You\'ll see them on old castles, Tudor houses, and fancy Victorian buildings!',
    MIDDLE_SCHOOL: 'An oriel window is a projecting window that extends outward from an upper floor of a building, supported by brackets, corbels, or cantilevered construction rather than extending to the ground. Unlike bay windows (which start at ground level), oriels begin at an upper floor and project from the wall plane. This design provides increased interior floor space, better light admission from multiple angles, and improved views along the street or surrounding landscape. Oriels typically feature multiple window panes arranged in three or more faces. The supporting brackets are often decorative, carved in stone or wood. Oriel windows were popular in medieval and Tudor architecture and revived in Gothic Revival and Victorian styles.',
    HIGH_SCHOOL: 'The oriel window is a distinctive architectural feature consisting of a windowed projection extending from an upper story wall, typically supported by corbels, brackets, or cantilevered construction. The structural system distinguishes oriels from bay windows—oriels do not extend to the ground but are supported from the wall, while bay windows rest on foundations or corbeled masonry from lower floors. Medieval oriel windows served practical purposes: increasing interior space in constrained urban lots, improving lighting and ventilation, and providing enhanced views for surveillance or street watching. The projection typically features windows on three or more faces (front and angled sides), creating polygonal or curved forms. Oriel construction varies by period and region—stone corbels in Gothic buildings, elaborate timber framing in Tudor houses, cast iron brackets in Victorian revivals. The element carries strong historical associations with medieval and Tudor architecture.',
    UNDERGRADUATE: 'Oriel window analysis requires understanding structural systems, spatial functions, and stylistic significance. Structurally, oriels employ cantilever or corbel principles—projecting elements supported by brackets built into the wall or cantilevered from floor joists. Medieval stone oriels often feature elaborate corbel systems, sometimes incorporating sculptural elements. Timber-framed buildings use jettied construction where each floor projects slightly, with oriels extending this principle vertically at specific locations. Functionally, oriels serve multiple purposes: increasing usable floor area (particularly valuable in dense urban contexts), improving daylighting through multi-directional glazing, enhancing views and surveillance capabilities, and creating spatial variety in interiors. The window configuration typically includes a central front window flanked by angled side windows, creating 3, 5, or more faces. Regional variations include: English Gothic stone oriels on collegiate and ecclesiastical buildings (Oxford and Cambridge colleges); Tudor timber-framed oriels with leaded glass; Elizabethan and Jacobean elaborate multi-story oriels; Victorian Gothic Revival reinterpretations in various materials. Analysis must address oriels within urban contexts—their role in medieval street architecture and relationship to building regulations.',
    GRADUATE: 'Critical oriel window scholarship addresses structural innovation, urban spatial practices, and symbolic functions across historical contexts. Medieval development of oriel windows relates to urban conditions—constrained building lots encouraged vertical projection to maximize interior space. Building regulations in some medieval cities addressed oriel construction, establishing minimum heights above street level to maintain passage. Structural analysis reveals sophisticated cantilever understanding—stone corbels distribute loads into wall mass, timber oriels utilize floor joist projection and careful load balancing. The relationship between oriel development and glass technology deserves examination—early oriels featured small openings with minimal glazing, while later periods (especially Tudor) incorporated extensive glazed areas as glass became more available. Collegiate architecture (Oxford, Cambridge) employed oriels extensively, often marking important rooms (master\'s lodgings, fellows\' chambers). Iconographic functions included surveillance (watching street activities), social display (demonstrating wealth and architectural sophistication), and spatial claim (extending private space into public realm). Gothic Revival architects studied medieval precedents and incorporated oriels as signifiers of historical authenticity. Victorian applications ranged from archaeological reproductions to creative reinterpretations in new materials (cast iron, steel framing). Analysis must address oriels\' roles in urban morphology, building technology evolution, and the construction of architectural historicism.',
    PHD: 'Advanced oriel window scholarship employs multiple methodological frameworks: structural analysis of corbel and cantilever systems; urban history examining oriel windows in medieval street architecture; building archaeology investigating construction techniques and material choices; social history analyzing oriel functions in domestic and institutional contexts; and architectural theory addressing oriel symbolism and revival. Research questions include: What structural knowledge enabled medieval oriel construction? How did urban regulations shape oriel development? What social and functional factors motivated oriel adoption? How did oriel windows construct institutional identity in collegiate architecture? What meanings did Gothic Revival architects assign to oriel reuse? Primary sources include medieval building accounts, urban building regulations, archaeological evidence from standing structures, and Victorian architectural publications. Methodological approaches encompass structural mechanics (cantilever and corbel analysis), urban morphology (oriel windows in street architecture), materiality studies (stone, timber, glass, iron), phenomenology (spatial experience of projected spaces), and reception theory (Gothic Revival interpretations). Key debates address: relationships between structural innovation and spatial demands in urban contexts; oriel functions in surveillance and social display; roles in constructing collegiate and domestic identities; and Gothic Revival authenticity versus creative reinterpretation. Contemporary theoretical frameworks examine oriels through urban space theory (private projection into public realm), environmental performance (daylighting and thermal effects), and heritage conservation (structural stabilization and appropriate intervention).',
  },

  history: {
    ELEMENTARY: 'Oriel windows first appeared in the Middle Ages in Europe, especially in England, about 600-800 years ago. In crowded medieval cities, buildings were packed close together on narrow streets. Builders discovered they could make rooms bigger by adding windows that stuck out from upper floors! These oriel windows were held up by fancy stone brackets. Rich people and important buildings like colleges had the most elaborate oriels. When the Victorian era came (about 150 years ago), architects fell in love with medieval styles again and built lots of new buildings with oriel windows!',
    MIDDLE_SCHOOL: 'Oriel windows emerged in medieval European architecture, particularly in England during the 13th-15th centuries. They solved practical problems in dense urban environments—adding floor space and light without increasing the building\'s ground footprint. Medieval guildhalls, colleges (Oxford and Cambridge), and wealthy townhouses featured elaborate stone oriels. Tudor architecture (1485-1603) made extensive use of timber-framed oriels with leaded glass windows. As architectural styles changed, oriels became less common, but Gothic Revival architects in the 19th century revived them as characteristic medieval elements. Victorian architects incorporated oriels into houses, schools, and civic buildings, often using new materials like cast iron for brackets.',
    HIGH_SCHOOL: 'Oriel window development traces from medieval practical solutions through Tudor elaboration to Victorian revival. Early English Gothic buildings (13th-14th centuries) featured modest stone oriels on ecclesiastical and collegiate buildings—the term "oriel" possibly derives from Oriel College, Oxford (founded 1326), known for its windows. Medieval urban architecture employed oriels to maximize space on constrained lots while maintaining street access below. Late medieval and Tudor periods (15th-16th centuries) saw proliferation of oriels, particularly in timber-framed buildings where jettied construction facilitated their addition. Regional variations emerged—Cotswold stone oriels, East Anglian timber oriels, urban versus rural applications. Building regulations in some cities governed oriel construction heights and projections. The Classical revival (17th-18th centuries) largely abandoned oriels as unsuitable for symmetrical facades. Gothic Revival architects (Pugin, Ruskin era) studied medieval precedents and reintroduced oriels as authentic medieval elements. Victorian applications ranged from scholarly recreations to creative adaptations using iron, steel, and improved glass technology.',
    UNDERGRADUATE: 'Oriel window history demonstrates the interplay between urban conditions, structural capability, and architectural fashion. Medieval development (13th-15th centuries) responded to urban spatial constraints—narrow street frontages encouraged vertical building and spatial projection where permitted. Archaeological evidence and surviving examples reveal construction evolution: early modest stone oriels on ecclesiastical buildings, later elaborate multi-story examples on collegiate and domestic architecture. Oxford and Cambridge colleges provide rich oriel traditions—Oriel College (c. 1326), Corpus Christi (1517), Trinity (1555). Tudor period oriels achieved maximum elaboration in timber-framed construction, exploiting jettied building techniques and increasingly available glass. Regional studies reveal distinctive traditions: Cotswold limestone oriels with carved corbels, Chester timber oriels in continuous rows, London oriels in brick buildings. Urban regulations addressed oriels: London Building Acts specified minimum heights and maximum projections. Classical period architects rejected oriels as incompatible with symmetrical composition and Classical vocabulary. Gothic Revival involved both archaeological study and creative reinterpretation. Pugin\'s works and writings promoted oriels as authentic medieval elements. Victorian architects employed oriels widely, enabled by new materials—cast iron brackets, steel framing, large glass panes. Arts and Crafts movement embraced oriels as traditional building elements. Analysis must address oriels within urban morphology, building technology, and stylistic evolution.',
    GRADUATE: 'Critical oriel scholarship addresses structural innovation, urban spatial practices, institutional identity, and architectural revival across historical contexts. Medieval oriel development demonstrates sophisticated structural understanding—corbel systems distributing cantilevered loads, masonry and timber techniques for different building types. Urban history analysis reveals oriels\' roles in negotiating constrained sites and building regulations. Collegiate architecture provides concentrated oriel traditions—Oxford and Cambridge examples mark important rooms, construct institutional identity, and demonstrate architectural patronage. Social history examines oriel functions: practical space increase, improved surveillance of street activities, social display of wealth and architectural sophistication. The relationship between oriel proliferation and glass technology deserves examination—late medieval and Tudor expansion coincides with improved glass availability and larger pane production. Regional building traditions shaped oriel characteristics—materials (stone, timber, brick), construction techniques, decorative treatments. Gothic Revival reception involved complex negotiations between archaeological accuracy and contemporary needs. Pugin\'s theoretical writings promoted oriels as morally superior medieval elements. Victorian applications show tension between scholarly reproduction and creative adaptation. Technical innovations (cast iron, steel, plate glass) enabled new oriel possibilities while maintaining historical associations. Analysis must address oriels\' multiple functions: structural achievement, urban space negotiation, institutional and domestic identity construction, and vehicles for historical reference.',
    PHD: 'Advanced oriel window scholarship requires interdisciplinary approaches: structural engineering analysis (corbel and cantilever systems), urban history (oriels in medieval street architecture and building regulation), building archaeology (construction techniques across materials and periods), social history (oriel functions in surveillance, display, and identity), architectural theory (oriel symbolism and revival meanings), and conservation science (structural stabilization strategies). Research questions include: What empirical structural knowledge enabled medieval oriel construction? How did urban spatial pressures and regulations shape oriel development? What roles did oriels play in constructing collegiate, ecclesiastical, and domestic identities? How did glass technology availability affect oriel design evolution? What meanings did Gothic Revival architects assign to oriel reintroduction? How do contemporary conservation principles address historic oriel structural issues? Primary sources include medieval building accounts (revealing construction costs and techniques), urban building regulations, collegiate archives (documenting oriel patronage), Gothic Revival architectural publications, and physical evidence from building archaeology. Theoretical frameworks encompass structural mechanics, urban morphology, materiality studies, social space theory (private projection into public realm), phenomenology (spatial experience), reception theory (Gothic Revival interpretations), and conservation theory. Contemporary approaches employ digital documentation (laser scanning, photogrammetry), computational structural analysis, and interdisciplinary heritage studies examining oriels as technical achievements, spatial devices, and cultural signifiers.',
  },

  characteristics: [
    'Window projection from upper floor, not ground level',
    'Supported by corbels, brackets, or cantilevers',
    'Typically multi-faced (3, 5, or more sides)',
    'Provides expanded interior space',
    'Improves lighting and views from multiple angles',
    'Common in medieval, Tudor, and Victorian Gothic architecture',
    'Often features decorative supporting elements',
    'Distinguished from bay windows by not extending to ground',
  ],

  famousExamples: [
    { name: 'Oriel College', location: 'Oxford, England', year: '1326+', description: 'Medieval college with namesake oriel windows' },
    { name: 'Corpus Christi College', location: 'Cambridge, England', year: '1517+', description: 'Tudor oriel windows on collegiate buildings' },
    { name: 'Crooked House', location: 'Lavenham, England', year: '14th century', description: 'Medieval timber-framed house with prominent oriel' },
    { name: 'Chester Rows', location: 'Chester, England', year: '13th-17th centuries', description: 'Medieval covered walkways with timber oriel windows' },
    { name: 'Hever Castle', location: 'Kent, England', year: '1270+', description: 'Tudor manor house with stone oriel windows' },
  ],

  confusionPairs: [
    {
      elementId: 'bay-window',
      reason: 'Both project from building facades',
      distinction: 'Bay window extends from ground to roof; oriel starts at upper floor on brackets',
    },
    {
      elementId: 'bow-window',
      reason: 'Both are projecting windows',
      distinction: 'Bow window is curved; oriel is typically polygonal and must be on upper floor',
    },
  ],

  searchTags: ['oriel window', 'projecting', 'bay', 'medieval', 'tudor', 'gothic', 'bracket', 'corbel', 'cantilevered', 'upper floor', 'victorian'],

  arMetadata: {
    modelPath: '/models/architecture/oriel-window.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Window Projection', position: { x: 0, y: 0.7, z: 0.3 } },
      { label: 'Corbel/Bracket', position: { x: 0, y: 0.5, z: 0.1 } },
      { label: 'Angled Side Windows', position: { x: 0.2, y: 0.7, z: 0.2 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
