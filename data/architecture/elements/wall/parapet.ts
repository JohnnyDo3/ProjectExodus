import type { ArchitecturalElement } from '../../types';

export const PARAPET: ArchitecturalElement = {
  id: 'parapet',
  slug: 'parapet',
  name: 'Parapet',
  alternativeNames: ['Parapet Wall', 'Roof Wall', 'Balustrade Wall', 'Attic Wall'],
  pronunciation: {
    phonetic: 'PAIR-uh-pet or PAIR-uh-pit',
    language: 'English',
  },
  etymology: {
    origin: 'Italian/French',
    meaning: 'Chest-high protection',
    rootWord: 'From Italian "parapetto" (chest-high wall) from "parare" (to defend) + "petto" (chest)',
  },
  category: 'WALL',
  subcategory: 'wall_types',
  periods: ['ANCIENT', 'MEDIEVAL', 'RENAISSANCE', 'MODERN', 'CONTEMPORARY'],
  regions: ['GLOBAL'],

  images: {
    primary: '/images/architecture/elements/parapet-primary.jpg',
    gallery: [
      '/images/architecture/elements/parapet-battlemented.jpg',
      '/images/architecture/elements/parapet-modern.jpg',
    ],
    diagram: '/images/architecture/diagrams/parapet-types.svg',
  },

  description: {
    ELEMENTARY: 'A parapet is a low wall that runs along the edge of a roof, balcony, or bridge. It\'s like a safety fence that keeps people from falling off! In medieval castles, soldiers hid behind parapets while defending the castle. Today, parapets on buildings hide air conditioning equipment and keep people safe on roof decks.',
    MIDDLE_SCHOOL: 'Parapets are protective walls extending above rooflines, typically 3-4 feet high. Functions include: safety (preventing falls from roofs), fire protection (preventing fire spread between buildings), equipment screening (hiding HVAC units), and aesthetic concealment (hiding flat roof edges). Types include solid parapets, perforated parapets, and battlemented parapets (with merlons and crenels). Building codes require parapets on many flat-roof buildings.',
    HIGH_SCHOOL: 'Architectural parapets serve multiple functions: life safety (guardrail for roof access), fire separation (party walls between buildings), equipment screening, and architectural expression. Design considerations include height (building codes typically require 42-inch minimum for occupied roofs), structural stability (cantilevered or braced), waterproofing (critical flashing details at roof-wall intersection), and material selection. Historic types include plain, battlemented (crenellated), perforated, and shaped parapets. Modern building codes drive parapet requirements, especially in urban fire zones.',
    UNDERGRADUATE: 'Parapet design integrates code compliance, building envelope performance, and architectural character. Structural considerations include wind loads (parapets catch significant wind pressure), seismic forces (cantilevered elements vulnerable to earthquake damage), and construction loads. Waterproofing requires careful detailing: through-wall flashing, reglets for membrane termination, and proper coping to prevent water infiltration behind roofing. Historic parapets contribute significantly to building character-cornice-topped parapets on commercial buildings, battlemented parapets on Gothic Revival, shaped parapets on Mission Revival. Contemporary practice balances functional requirements with design intent.',
    GRADUATE: 'Parapet research addresses structural performance, envelope technology, and conservation challenges. Wind engineering studies quantify parapet loading and optimize bracing strategies. Building science research examines moisture management-thermal bridging at parapet bases causes condensation and ice damming; proper insulation and air sealing are critical. Seismic research investigates parapet failure modes and retrofit strategies-unreinforced masonry parapets are significant earthquake hazards. Conservation work addresses historic parapet deterioration, structural instability, and water infiltration while preserving character-defining features. Contemporary research develops high-performance parapet assemblies balancing energy efficiency, durability, and aesthetics.',
    PHD: 'Parapet scholarship engages structural engineering, building science, and seismic risk mitigation. Research programs investigate wind load distributions on parapets through computational fluid dynamics and wind tunnel testing, informing efficient design. Hygrothermal research models moisture accumulation in parapet assemblies, developing strategies to prevent condensation and ice damming. Earthquake engineering research quantifies parapet collapse risks-particularly unreinforced masonry parapets in historic buildings-and develops retrofit techniques balancing preservation and safety. Conservation research addresses deterioration mechanisms, compatible repair materials, and performance improvement strategies for historic parapets, employing material science, structural analysis, and heritage values assessment.',
  },

  history: {
    ELEMENTARY: 'Parapets were first used on ancient forts and castles for protection-soldiers could hide behind them while fighting. Later, people discovered parapets could keep buildings safer from fire spreading. Today, building rules often require parapets on flat-roof buildings for safety and to hide rooftop equipment.',
    MIDDLE_SCHOOL: 'Ancient fortifications used parapets for defensive positions. Medieval castles developed crenellated parapets (battlements) allowing archers to shoot while remaining protected. Renaissance palaces employed decorative parapets concealing roof structures. Victorian commercial buildings used parapets to meet fire codes (preventing fire spread) and create impressive false fronts. Modern building codes require parapets for fire separation, fall protection, and equipment screening.',
    HIGH_SCHOOL: 'Parapet history reveals evolving functions from military to safety to aesthetic. Ancient Mesopotamian and Egyptian fortifications employed parapets for defense. Medieval European castles refined battlemented parapets with merlons (solid sections) and crenels (gaps). Italian Renaissance palaces used parapets to conceal roof slopes, creating cubic masses. Nineteenth-century urban building codes mandated parapets as fire barriers between buildings. Western American commercial buildings used false-front parapets for architectural presence. Modern codes continue requiring parapets for fire and safety, while designers exploit them for architectural expression.',
    UNDERGRADUATE: 'Parapet evolution traces military origins through fire safety adoption to contemporary multifunctional performance. Ancient defensive architecture established the protective parapet-Mesopotamian ziggurat parapets, Egyptian temple enclosures, Greek acropolis walls. Medieval military engineering developed elaborate battlements-varying crenel widths, machicolations, covered wall-walks. Renaissance concealment of roofs behind parapets enabled classical proportions. Industrial-era fire codes mandated party wall parapets extending above roofs. Chicago school commercial architecture employed decorative parapets defining skylines. Modern seismic codes recognize parapet hazards, requiring reinforcement or removal. Contemporary practice integrates sustainability concerns-thermal performance, water management.',
    GRADUATE: 'Historical analysis of parapets examines the transition from military necessity through fire safety requirement to architectural expression. Research addresses construction techniques across periods, code evolution driving parapet adoption, and regional variations in forms. Archaeological investigation documents ancient parapet systems. Architectural history traces decorative parapet evolution-Gothic battlements, Renaissance balustrades, Victorian false fronts. Conservation scholarship confronts widespread parapet deterioration and seismic vulnerability, developing retrofit strategies that preserve historic character while improving safety and performance. Contemporary research applies building science to parapet design, addressing thermal bridging, moisture management, and sustainable materials.',
    PHD: 'Parapet historiography engages military history, building regulation, and seismic risk assessment. Research programs investigate the diffusion of parapet technologies across cultures, the development of fire codes mandating parapets in dense urban areas, and the architectural exploitation of code-required elements. Seismic research has identified unreinforced masonry parapets as major life-safety hazards-research quantifies risks and develops retrofit strategies balancing preservation and safety. Building science research addresses parapet thermal performance and moisture management, developing high-performance assemblies. Conservation science investigates deterioration mechanisms and develops compatible repair materials through petrographic analysis, mortar characterization, and accelerated weathering tests.',
  },

  characteristics: [
    'Low wall extending above roofline',
    'Typically 3-4 feet (42 inches code minimum) high',
    'Functions: safety, fire protection, screening',
    'Types: solid, perforated, battlemented',
    'Requires careful waterproofing at base',
    'Subject to significant wind loads',
    'Vulnerable to seismic damage if unreinforced masonry',
  ],

  famousExamples: [
    { name: 'Great Wall of China Battlements', location: 'China', year: '7th century BCE-17th century CE', description: 'Crenellated parapets protecting defenders along the wall' },
    { name: 'Tower of London Battlements', location: 'London, England', year: '11th-14th century', description: 'Medieval fortress with elaborate battlemented parapets' },
    { name: 'Palazzo Vecchio Parapet', location: 'Florence, Italy', year: '1299-1314', description: 'Crenellated parapet crowning the medieval palace tower' },
    { name: 'Chicago Tribune Tower', location: 'Chicago, USA', year: '1925', description: 'Gothic Revival skyscraper with flying buttresses and parapets' },
    { name: 'Mission San Xavier del Bac', location: 'Arizona, USA', year: '1783-1797', description: 'Spanish Mission with elaborate scrolled parapets' },
  ],

  confusionPairs: [
    {
      elementId: 'balustrade',
      reason: 'Both are protective barriers',
      distinction: 'Balustrades have vertical balusters supporting a handrail; parapets are solid or perforated walls',
    },
    {
      elementId: 'battlement',
      reason: 'Both are found atop castle walls',
      distinction: 'Battlement is a specific parapet type with alternating solid (merlons) and open (crenels) sections; parapet is the general term for any roof-edge wall',
    },
    {
      elementId: 'coping',
      reason: 'Both are at the top of walls',
      distinction: 'Coping is the protective cap on top of a parapet; parapet is the wall itself',
    },
  ],

  searchTags: ['roof', 'wall', 'protection', 'battlement', 'safety', 'fire', 'castle', 'screening', 'edge'],

  arMetadata: {
    modelPath: '/models/architecture/parapet.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Coping Cap', position: { x: 0, y: 1.2, z: 0 } },
      { label: 'Parapet Wall', position: { x: 0, y: 0.6, z: 0 } },
      { label: 'Roof-Wall Flashing', position: { x: 0, y: 0.1, z: -0.1 } },
    ],
  },

  difficultyScore: 2,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
