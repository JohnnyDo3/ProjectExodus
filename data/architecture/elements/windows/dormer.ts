import type { ArchitecturalElement } from '../../types';

export const DORMER: ArchitecturalElement = {
  id: 'dormer',
  slug: 'dormer',
  name: 'Dormer',
  alternativeNames: ['Dormer Window', 'Roof Window', 'Lucarne'],
  pronunciation: {
    phonetic: 'DOR-mer',
    language: 'English',
  },
  etymology: {
    origin: 'French',
    meaning: 'From "dormir" (to sleep) - originally windows in sleeping quarters under the roof',
    rootWord: 'dormeor (Old French)',
  },
  category: 'WINDOW',
  subcategory: 'roof_windows',
  periods: ['MEDIEVAL', 'RENAISSANCE', 'BAROQUE', 'GEORGIAN', 'COLONIAL_AMERICAN', 'VICTORIAN', 'ARTS_AND_CRAFTS'],
  regions: ['WESTERN_EUROPE', 'NORTHERN_EUROPE', 'NORTH_AMERICA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/dormer-primary.jpg',
    gallery: [
      '/images/architecture/elements/dormer-gable.jpg',
      '/images/architecture/elements/dormer-shed.jpg',
      '/images/architecture/elements/dormer-eyebrow.jpg',
    ],
    diagram: '/images/architecture/diagrams/dormer-types.svg',
  },

  description: {
    ELEMENTARY: 'A dormer is a special window that pokes out from a slanted roof! Instead of being flat in the roof, it has its own little roof and walls, creating a small room or window space inside the attic. Dormers let light and fresh air into the upper floor of a house and give people more headroom to stand up. They come in different shapes—some have triangular roofs like little houses, some have curved tops, and some are just flat!',
    MIDDLE_SCHOOL: 'A dormer is a roofed structure containing a window that projects vertically from a sloping roof. The dormer has its own roof (often gabled, hipped, or shed-style) and vertical walls, creating additional headroom and usable space in attic areas. Dormers serve multiple functions: providing natural light to upper floors, improving ventilation, increasing interior ceiling height, and adding architectural interest to roof lines. Common dormer types include gabled (triangular roof), hipped (roof sloping on all sides), shed (single slope), and eyebrow (curved). Dormers have been used for centuries in various architectural styles from medieval cottages to Colonial houses to modern homes.',
    HIGH_SCHOOL: 'Dormers are vertical window structures projecting from sloping roofs, featuring their own roofs, walls, and windows. The dormer interrupts the roof slope to create vertical window openings, increasing attic usability for living or storage space. Structural systems involve framing openings in the main roof structure and building independent framing for the dormer walls and roof. Dormer types include: gabled (with triangular pediment), hipped (roof sloping on multiple sides), shed (single sloping roof), eyebrow (curved without side walls), and wall (extending from wall face). Historically, dormers evolved from simple roof openings to elaborate architectural features. French château architecture featured elaborate dormers (lucarnes). Colonial American architecture adopted dormers as practical and aesthetic elements. Dormer design considerations include roof pitch compatibility, structural integration, weather protection (flashing and waterproofing), and proportional relationships to the main building.',
    UNDERGRADUATE: 'Dormer analysis encompasses structural engineering, environmental performance, and architectural composition. Structurally, dormers require interrupting the roof framing system—cutting rafters and installing headers to create openings, then constructing independent framing for dormer walls and roofs. Load distribution must account for disrupted roof structure and additional snow/wind loads on dormer surfaces. Waterproofing is critical—valleys between dormer roofs and main roofs are vulnerable leak points requiring careful flashing. Environmental functions include daylighting (bringing natural light deep into attic spaces), ventilation (operable dormer windows improve air circulation), and thermal performance (dormers affect overall building envelope). Design considerations involve proportional relationships—dormer size, spacing, and alignment affect facade composition. Regional traditions developed distinctive dormer types: French lucarnes with elaborate decoration, Dutch Colonial gambrel roofs with shed dormers, Cape Cod gabled dormers, Victorian wall dormers. Contemporary applications balance traditional aesthetics with modern performance requirements—energy codes, egress requirements for habitable attics, and daylighting strategies. Analysis must address dormers\' multiple roles: functional space creation, compositional rhythm, stylistic characterization, and environmental performance.',
    GRADUATE: 'Critical dormer scholarship addresses technological evolution, regional building traditions, stylistic associations, and contemporary performance integration. Historical development traces from pragmatic medieval roof openings through increasingly elaborate Renaissance and Baroque examples to standardized vernacular types. French château architecture developed dormers (lucarnes) as major design features—elaborate stone structures with Classical detailing (Château de Chambord, Château de Blois). Regional traditions shaped dormer characteristics: steep-roofed northern European dormers for snow shedding, shallow American dormers on lower-pitch roofs, distinct types associated with building styles (Cape Cod gabled dormers, Craftsman shed dormers). Structural evolution involved improving framing techniques, waterproofing systems, and integration with evolving roof technologies. Building regulation analysis reveals dormers\' roles in habitable attic space—codes addressing ceiling height, egress, light/ventilation. The tension between traditional dormer forms and modern performance requirements creates design challenges—historic preservation versus energy efficiency, authentic detailing versus contemporary construction. Contemporary sustainable design emphasizes dormers for daylighting (reducing electric lighting), ventilation (passive cooling), and solar access (photovoltaic integration). Analysis must examine dormers within multiple frameworks: regional building culture, stylistic evolution, construction technology, building performance, and heritage conservation.',
    PHD: 'Advanced dormer scholarship requires interdisciplinary methodologies: construction history analyzing framing systems and waterproofing evolution; regional architecture studies examining vernacular traditions; environmental science investigating daylighting and ventilation performance; heritage conservation addressing dormer alterations and additions; and architectural theory examining dormers in compositional systems. Research questions include: How did dormer construction techniques evolve across regions and periods? What cultural and economic factors shaped regional dormer traditions? How did dormers contribute to architectural style characterization? What tensions exist between traditional dormer forms and contemporary performance requirements? How should conservation practice address historic dormers and appropriate new dormers on historic buildings? Primary sources include builders\' manuals and pattern books (revealing construction details), building regulations (addressing habitability standards), architectural publications (documenting style-specific dormers), and building archaeology (examining historical construction). Theoretical frameworks encompass vernacular architecture studies (regional traditions and building culture), tectonics (dormer construction expression), environmental design (daylighting and ventilation strategies), phenomenology (spatial experience of dormer-lit attics), and conservation theory (intervention principles). Contemporary approaches employ building science methods (thermal modeling, daylighting simulation), digital documentation (laser scanning historic dormers), and interdisciplinary heritage studies. Emerging research addresses climate adaptation—dormers in passive cooling strategies, resilience to extreme weather events, and integration with renewable energy systems.',
  },

  history: {
    ELEMENTARY: 'Dormers have been around for hundreds of years! People invented them to make attic spaces brighter and more useful. In old houses, attics were often dark and cramped, but adding dormers brought in light and gave people room to stand up. French castles from the Renaissance had really fancy dormers with lots of decoration. When European settlers came to America, they brought dormer designs with them. Cape Cod houses (built by early American colonists) have charming gabled dormers that are now famous. Today, builders still add dormers to houses to create extra bedrooms or offices in the attic!',
    MIDDLE_SCHOOL: 'Dormers evolved from simple roof openings in medieval buildings to elaborate architectural features. French Renaissance châteaux (15th-17th centuries) featured highly decorative dormers called lucarnes, often with Classical pediments and ornate carvings (Château de Chambord, 1519-1547). Different building styles developed characteristic dormer types: Colonial American houses used simple gabled dormers; Dutch Colonial featured shed dormers on gambrel roofs; Georgian architecture employed regularly spaced dormers; Victorian styles added elaborate decorated dormers. The 20th century saw dormers become standard features for expanding attic living space, with Cape Cod Revival and Colonial Revival styles making traditional dormers popular. Modern architecture sometimes integrates dormers into minimalist designs.',
    HIGH_SCHOOL: 'Dormer history reflects evolving attitudes toward attic space utilization and architectural expression. Medieval buildings featured modest dormers for light and ventilation in upper floors and attics. French Renaissance architecture elevated dormers to major design elements—Château de Chambord (begun 1519) and Château de Blois feature elaborate stone lucarnes with Classical decoration rivaling ground-floor windows in scale and ornamentation. Regional building traditions developed distinctive dormer types: Northern European steep dormers for heavy snow loads, English vernacular cottages with thatched dormers, Dutch Colonial gambrel roofs with continuous shed dormers. American colonial architecture adapted European precedents—Cape Cod houses (17th-18th centuries) featured simple gabled dormers, Georgian Colonial employed regularly spaced dormers creating rhythmic patterns. Victorian architecture used dormers extensively, with styles ranging from Gothic Revival pointed dormers to Second Empire mansard roofs lined with elaborate dormers. 20th-century developments included standardized dormer framing techniques, improved waterproofing systems, and building codes addressing habitability. Contemporary sustainable design emphasizes dormers for daylighting and passive ventilation.',
    UNDERGRADUATE: 'Dormer evolution demonstrates the transformation of functional necessity into architectural expression across regional and stylistic contexts. Medieval dormers served pragmatic functions—lighting and ventilating attic spaces used for storage or servants\' quarters. French Renaissance architecture transformed dormers into ornamental features—François I\'s châteaux feature dormers as important as facade windows, with Classical pediments, pilasters, and sculptural decoration. This established French dormer (lucarne) tradition continuing through Baroque and Neoclassical periods. Regional building cultures developed distinctive dormer types responding to climate, materials, and aesthetic preferences. Northern European traditions emphasized steep dormers for snow management. English vernacular developed gabled and hipped dormers integrated with thatched and tile roofing. American colonial architecture shows European influence adaptation: Cape Cod gabled dormers (responding to steep roofs and harsh weather), Dutch Colonial continuous shed dormers (maximizing attic headroom), Georgian symmetrical dormer arrangements (compositional regularity). Victorian proliferation of dormer types reflected style diversity—Gothic Revival pointed dormers, Italianate arched dormers, Second Empire mansard dormers, Queen Anne multiple dormer types. Construction technology evolution improved dormer weatherproofing—from simple lead or copper flashing to modern multi-layer systems. Building codes began addressing dormers when attics became habitable space—requiring minimum ceiling heights, egress windows, ventilation. Contemporary dormer design balances traditional aesthetics, performance requirements (energy codes, daylighting), and construction economics.',
    GRADUATE: 'Critical dormer scholarship addresses technological development, regional traditions, stylistic functions, and contemporary challenges across historical and cultural contexts. French Renaissance dormer evolution from François I through Louis XIV demonstrates dormers\' transformation from functional elements to architectural status symbols. Analysis of specific châteaux reveals dormer design sophistication—proportional systems, Classical ornament application, integration with roof composition. Regional studies uncover distinctive building cultures: Scandinavian dormers responding to snow loads and daylighting needs in northern latitudes; British traditions varying by region and roof covering material; American regional types reflecting settlement patterns and climate. Construction history reveals technological evolution—framing techniques from timber carpentry through balloon framing to modern platform framing; waterproofing from simple metal flashings to complex multi-layer systems; window technology from small casements to large fixed and operable units. Building regulation history shows dormers\' role in expanding habitable space—codes defining minimum dimensions, egress requirements, light/ventilation standards. Style analysis reveals dormers as stylistic signifiers—Cape Cod Revival dormers signaling traditional American domesticity, modernist flat-roofed dormers expressing contemporary aesthetics. Conservation practice addresses dormer challenges: appropriate new dormers on historic buildings, restoration of historic dormers, balancing character preservation with performance improvement. Contemporary sustainable design research investigates dormers in passive strategies—daylighting optimization, natural ventilation, thermal performance.',
    PHD: 'Advanced dormer scholarship employs multiple methodological approaches: construction archaeology examining historical framing and waterproofing systems; regional architecture studies documenting vernacular traditions; environmental building science analyzing daylighting and ventilation performance; heritage conservation developing intervention principles; and architectural history examining dormers in stylistic evolution. Research questions include: How did construction techniques and materials shape regional dormer traditions? What cultural meanings attached to dormers in different architectural contexts? How did dormers function in architectural composition across styles? What tensions exist between traditional forms and contemporary performance? How should conservation balance character preservation with habitability improvement? Primary sources include builders\' manuals (Asher Benjamin, Minard Lafever) revealing construction details, architectural pattern books documenting style-specific dormers, building codes addressing attic habitability, and physical evidence from building archaeology. Theoretical frameworks encompass vernacular architecture studies (regional building culture), tectonics (dormer as construction expression), environmental design (passive strategies), phenomenology (attic space experience), and conservation theory (intervention ethics). Contemporary research employs building science methods—computational daylighting analysis, thermal performance modeling, moisture analysis. Digital documentation enables precise recording of historic dormer construction. Interdisciplinary approaches examine dormers as technical solutions, cultural expressions, and sites of negotiation between tradition and performance. Emerging research addresses climate adaptation—dormers in passive cooling, resilience to extreme weather, and integration with renewable technologies.',
  },

  characteristics: [
    'Vertical window structure projecting from sloped roof',
    'Has own roof, walls, and window',
    'Provides light and ventilation to attic spaces',
    'Increases headroom and usable floor area',
    'Types: gabled, hipped, shed, eyebrow, wall dormer',
    'Requires careful waterproofing at roof intersection',
    'Can be functional, decorative, or both',
    'Common in many architectural styles',
  ],

  famousExamples: [
    { name: 'Château de Chambord', location: 'Loire Valley, France', year: '1519-1547', description: 'Elaborate Renaissance lucarnes with Classical decoration' },
    { name: 'Château de Blois', location: 'Blois, France', year: '13th-17th centuries', description: 'French Renaissance dormers on François I wing' },
    { name: 'Cape Cod Cottages', location: 'Massachusetts, USA', year: '17th-18th centuries', description: 'Simple gabled dormers on steep roofs' },
    { name: 'Colonial Williamsburg', location: 'Virginia, USA', year: '18th century', description: 'Georgian regularly-spaced dormers' },
    { name: 'Victorian Row Houses', location: 'San Francisco, USA', year: '1870s-1900s', description: 'Varied dormer types in Queen Anne and Stick styles' },
  ],

  confusionPairs: [
    {
      elementId: 'skylight',
      reason: 'Both are roof windows',
      distinction: 'Dormer projects vertically with own roof; skylight is flush with roof slope',
    },
    {
      elementId: 'gable',
      reason: 'Gabled dormer resembles small gable',
      distinction: 'Dormer is window structure on roof; gable is triangular wall end',
    },
  ],

  searchTags: ['dormer', 'roof window', 'attic', 'gabled', 'shed', 'eyebrow', 'lucarne', 'colonial', 'cape cod', 'victorian', 'ventilation'],

  arMetadata: {
    modelPath: '/models/architecture/dormer.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Dormer Roof', position: { x: 0, y: 0.9, z: 0 } },
      { label: 'Dormer Wall', position: { x: 0, y: 0.7, z: 0.1 } },
      { label: 'Window', position: { x: 0, y: 0.6, z: 0.15 } },
      { label: 'Main Roof', position: { x: 0.3, y: 0.5, z: 0 } },
    ],
  },

  difficultyScore: 1,
  dateAdded: new Date('2024-01-01'),
  lastUpdated: new Date('2024-01-01'),
};
