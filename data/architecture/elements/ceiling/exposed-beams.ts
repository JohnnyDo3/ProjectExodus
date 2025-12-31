import type { ArchitecturalElement } from '../../types';

export const EXPOSED_BEAMS: ArchitecturalElement = {
  id: 'exposed-beams',
  slug: 'exposed-beams',
  name: 'Exposed Beams',
  alternativeNames: ['Open Beams', 'Ceiling Beams', 'Timber Beams', 'Structural Beams'],
  pronunciation: {
    phonetic: 'eks-POHZD BEEMZ',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'Visible structural support members (beam from Old English "beam" - tree, timber)',
    rootWord: 'Old English "bēam" (tree, wood, timber)',
  },
  category: 'CEILING',
  subcategory: 'ceiling_structure',
  periods: ['MEDIEVAL', 'TUDOR', 'COLONIAL_AMERICAN', 'ARTS_AND_CRAFTS', 'CONTEMPORARY'],
  regions: ['WESTERN_EUROPE', 'NORTH_AMERICA', 'SCANDINAVIA', 'EAST_ASIA', 'GLOBAL'],

  images: {
    primary: '/images/architecture/elements/exposed-beams-primary.jpg',
    gallery: [
      '/images/architecture/elements/exposed-beams-medieval.jpg',
      '/images/architecture/elements/exposed-beams-modern.jpg',
    ],
    diagram: '/images/architecture/diagrams/exposed-beams-construction.svg',
  },

  description: {
    ELEMENTARY: 'Exposed beams are the wooden or metal bars you can see on the ceiling that hold up the roof or upper floor. Instead of hiding them behind drywall or plaster like in most modern houses, you can see the actual beams! They look like big, strong boards running across the ceiling. Medieval castles and old farmhouses have real exposed beams. Modern homes sometimes add fake beams because people like how they look-they make rooms feel cozy and interesting.',
    MIDDLE_SCHOOL: 'Exposed beams are structural ceiling members-typically timber, but sometimes steel or concrete-left visible rather than concealed behind finish materials. Historically, exposing beams was practical and economical: why cover structural elements that could be attractive? Traditional timber-frame buildings featured heavy hewn beams supporting floor joists or roof rafters. Beam spacing, size, and joinery details varied by region and period. Exposed beams create visual interest, emphasize horizontal lines, and make spaces feel more rustic or traditional. Contemporary architecture may expose beams for aesthetic effect even when not structurally necessary, sometimes using decorative faux beams made from lightweight materials.',
    HIGH_SCHOOL: 'Exposed ceiling beams serve structural functions while creating significant aesthetic character. Structurally, beams span between supports carrying floor or roof loads. Traditional timber beams used various wood species (oak, chestnut, fir) sized according to span and load. Joinery systems-mortise-and-tenon, dovetail, pegged connections-joined beams to posts and rafters. Beam arrangement creates patterns: parallel beams, coffered grids, or complex systems in timber-frame construction. Surface treatments range from rough-hewn to smooth planed, natural finish to painted or stained. Contemporary exposed beams may be structural steel, glue-laminated timber, or engineered lumber. Faux beams-hollow boxes of lightweight material-provide the exposed beam aesthetic without structural function. Design considerations include beam size relative to room scale, spacing rhythm, and integration with lighting and services.',
    UNDERGRADUATE: 'Exposed beam design integrates structural engineering, historical precedent, and spatial aesthetics. Structural analysis determines beam sizing based on span, loading, material properties, and deflection limits. Historical timber engineering employed empirical rules refined over centuries; modern practice uses computational analysis. Timber species selection balances structural capacity, durability, appearance, and cost. Joinery systems must transfer loads while allowing wood movement. Aesthetic considerations include beam proportion relative to room dimensions, spacing rhythm, and surface character. Regional timber-frame traditions developed distinctive beam arrangements-English close-studded framing, German half-timbering, Japanese post-and-beam. Contemporary practice may expose structural members (glulam, steel) or apply non-structural decorative beams. Integration challenges include accommodating mechanical systems, electrical services, and lighting within beam frameworks.',
    GRADUATE: 'Scholarly analysis of exposed beams addresses vernacular building traditions, structural history, and conservation methodology. Research examines regional timber-frame systems, documenting joinery techniques, wood species usage, and construction sequences. Dendrochronology enables dating historical timbers and understanding historical forest management. Structural analysis investigates load-bearing behavior, including long-term deflection and decay effects. Conservation challenges include assessing structural condition, treating biological deterioration, and reinforcing inadequate members while preserving historical fabric. Cultural studies examine the symbolic meanings of exposed structure-authenticity, craftsmanship, connection to natural materials. Contemporary practice debates when to expose structure versus when structural expression becomes scenographic. Building science research addresses thermal bridging, air leakage, and moisture issues in exposed beam systems.',
    PHD: 'Exposed beam research encompasses multiple scholarly domains. Architectural history investigates timber-frame building traditions across cultures, examining technological development, regional variations, and craft transmission. Material science characterizes wood properties, deterioration mechanisms, and treatment methods. Structural engineering research analyzes historical timber systems using modern methods, revealing design logic and safety factors. Conservation science develops assessment protocols and intervention strategies for historic timbers. Dendrochronology provides chronological data and historical climate information. Cultural studies examine exposed beams as markers of authenticity, vernacular tradition, and connection to pre-industrial building. Contemporary research addresses new timber technologies (mass timber, CLT) and their architectural expression, sustainable forestry and wood construction, and the tension between structural honesty and aesthetic effect in exposed beam design.',
  },

  history: {
    ELEMENTARY: 'For thousands of years, people built houses and buildings with wooden beams, and they just left them showing because there was no reason to cover them up! Medieval castles, Tudor houses, and old farmhouses all have exposed beams. In the 1900s, most new buildings started hiding their structure behind walls and ceilings. But then in the 1970s-1980s, people started to like the old look again. Now many modern houses show their beams (or add fake ones) to make rooms look more interesting and natural.',
    MIDDLE_SCHOOL: 'Exposed beams have been fundamental to building construction since ancient times across many cultures. Medieval European timber-frame buildings featured prominent exposed structural members. Different regions developed distinctive traditions: English oak frames, Alpine log construction, Japanese post-and-beam systems. The Industrial Revolution introduced iron and steel beams. Early 20th-century Modernism sometimes exposed structure (Le Corbusier, Mies van der Rohe), though often in concrete or steel rather than timber. Mid-century ranch houses occasionally featured exposed beams. Arts and Crafts and Contemporary movements embraced exposed timber as honest expression of natural materials and traditional craft. Today, exposed beams appear in both renovations of historic structures and new construction seeking traditional or rustic character.',
    HIGH_SCHOOL: 'The history of exposed beams reflects technological development, aesthetic movements, and changing relationships with structural expression. Ancient civilizations built with timber frames-Greek temple roofs, Roman basilicas, Asian post-and-beam traditions. Medieval European timber framing developed sophisticated joinery systems enabling complex structures. Regional variations emerged based on available timber, climate, and cultural preferences. Renaissance and Baroque architecture sometimes concealed structure behind ornamental ceilings, but vernacular buildings maintained exposed beams. Industrial-era iron and steel introduced new structural expressions. Arts and Crafts ideology celebrated honest structural expression and craft traditions, reviving interest in exposed timber. Modernist architecture debated structural honesty, sometimes exposing structure, sometimes treating it scenographically. Contemporary practice continues diverse approaches from authentic timber-frame construction to decorative faux beams.',
    UNDERGRADUATE: 'Exposed beam history reveals evolving relationships between structure, aesthetics, and architectural theory. Pre-industrial building necessarily worked with available materials-timber where forests existed, creating regionally distinctive systems. Medieval European timber framing reached extraordinary sophistication in joinery and spatial organization. Guilds maintained craft knowledge through apprenticeship. Pattern books eventually disseminated designs. Industrial materials-cast iron, steel, reinforced concrete-transformed structural possibilities. Architectural theory debated ornament versus structural expression. Arts and Crafts rejected industrial dishonesty, celebrating hand-crafted timber work. Early Modernism explored new structural materials (steel, concrete) while debating whether to expose or clothe structure. Post-war period saw both concealment of structure and its expression. Postmodernism sometimes treated exposed structure ironically. Contemporary practice ranges from high-performance timber engineering to nostalgic decorative beams.',
    GRADUATE: 'Scholarly examination of exposed beams addresses vernacular architecture studies, structural history, craft traditions, and architectural theory. Research documents regional timber-frame systems, analyzing construction methods, material usage, and spatial organization. Comparative studies reveal cultural differences in structural expression and finish. Historical investigation examines workshop practices, material supply chains, and economic factors. Conservation research develops assessment methodology and intervention strategies for historic timber structures. Architectural theory scholarship examines debates over structural honesty, ornament, and authenticity. Material culture studies investigate the symbolic meanings attached to exposed wood-naturalness, tradition, craftsmanship. Contemporary research addresses sustainable timber construction technologies, including mass timber and cross-laminated timber, and their implications for architectural expression.',
    PHD: 'Exposed beam research engages diverse scholarly methodologies. Vernacular architecture studies document traditional timber-frame systems worldwide, investigating technological development, regional variations, and cultural meanings. Material science research characterizes wood species, deterioration patterns, and treatment methods. Dendrochronology enables precise dating and provides historical climate data. Structural engineering analysis applies modern methods to historical systems, revealing design principles and safety margins. Conservation science develops evidence-based protocols for assessment, stabilization, and repair. Art and architectural history situates timber traditions within broader cultural contexts, examining patronage, workshop organization, and aesthetic theory. Craft studies investigate knowledge transmission and skilled practice. Contemporary research addresses new timber technologies-engineered lumber, mass timber construction-and debates over structural authenticity versus scenographic expression. Sustainability studies examine timber construction in carbon sequestration and renewable material contexts.',
  },

  characteristics: [
    'Visible structural ceiling members',
    'Typically timber, but also steel or concrete',
    'Span between supports carrying loads',
    'Create horizontal visual lines',
    'Can be actual structure or decorative',
    'Surface may be rough-hewn or smooth',
    'Various wood species and finishes',
    'Size and spacing create rhythm and scale',
  ],

  famousExamples: [
    { name: 'Westminster Hall', location: 'London, England', year: '1097 (hammerbeam roof 1393-1401)', description: 'Magnificent medieval timber hammerbeam roof' },
    { name: 'Gamble House', location: 'Pasadena, USA', year: '1908', description: 'Arts and Crafts exposed timber ceiling systems' },
    { name: 'Horyu-ji Temple', location: 'Nara, Japan', year: '607 CE (rebuilt)', description: 'Ancient Japanese post-and-beam construction' },
    { name: 'Ely Cathedral Octagon', location: 'Ely, England', year: '1322-1342', description: 'Medieval timber lantern with exposed structure' },
    { name: 'Fallingwater', location: 'Pennsylvania, USA', year: '1937', description: 'Frank Lloyd Wright\'s integration of natural materials including wood beams' },
  ],

  confusionPairs: [
    {
      elementId: 'coffered-ceiling',
      reason: 'Both show ceiling structure and patterns',
      distinction: 'Exposed beams show actual structural members; coffered ceilings have decorative recessed panels in regular grids',
    },
    {
      elementId: 'truss',
      reason: 'Both are timber structural systems',
      distinction: 'Exposed beams are horizontal spanning members; trusses are triangulated frameworks distributing loads',
    },
  ],

  searchTags: ['ceiling', 'beams', 'timber', 'wood', 'structure', 'medieval', 'rustic', 'exposed', 'structural', 'frame'],

  arMetadata: {
    modelPath: '/models/architecture/exposed-beams.glb',
    scale: 1.2,
    rotatable: true,
    annotations: [
      { label: 'Main Beam', position: { x: 0, y: 0.1, z: 0 } },
      { label: 'Joist', position: { x: 0.15, y: 0, z: 0.1 } },
      { label: 'Mortise-Tenon Joint', position: { x: 0.2, y: 0.1, z: 0 } },
    ],
  },

  difficultyScore: 1,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
