import type { ArchitecturalElement } from '../../../types';

export const RAMMED_EARTH: ArchitecturalElement = {
  id: 'rammed-earth',
  slug: 'rammed-earth',
  name: 'Rammed Earth',
  alternativeNames: ['Pisé', 'Taipa', 'Tapial', 'Compressed Earth'],
  pronunciation: {
    phonetic: 'RAMD URTH',
    language: 'English',
  },
  etymology: {
    origin: 'English descriptive term; French "pisé" from "piser" (to pound)',
    meaning: 'Earth compacted by ramming or pounding',
    rootWord: 'Pisé (French)',
  },
  category: 'WALL',
  subcategory: 'earthen_construction',
  periods: ['ANCIENT', 'MEDIEVAL', 'VERNACULAR', 'CONTEMPORARY'],
  regions: ['WORLDWIDE', 'CHINA', 'MIDDLE_EAST', 'EUROPE', 'AFRICA', 'NORTH_AMERICA', 'AUSTRALIA'],

  images: {
    primary: '/images/architecture/elements/rammed-earth-primary.jpg',
    gallery: [
      '/images/architecture/elements/rammed-earth-wall.jpg',
      '/images/architecture/elements/rammed-earth-construction.jpg',
      '/images/architecture/elements/rammed-earth-layers.jpg',
    ],
    diagram: '/images/architecture/diagrams/rammed-earth-construction.svg',
  },

  description: {
    ELEMENTARY: 'Rammed earth is a way of building walls by packing moist dirt tightly between boards, like building a dirt sandwich! Workers put up wooden boards on both sides, fill the space with special soil, then pound it down really hard with heavy tools until it\'s solid as concrete. The boards are removed and reused higher up, leaving beautiful striped walls showing the layers. These walls are super strong, last for centuries, and keep buildings cool in summer and warm in winter. The natural earth colors create beautiful patterns - you can see stripes of different colored soils like layers in a rainbow cake!',
    MIDDLE_SCHOOL: 'Rammed earth construction creates monolithic walls by compacting moistened subsoil in layers within temporary formwork. The process involves placing formwork (traditionally wood, now often steel or aluminum), filling it with 4-6 inch lifts of prepared earth mixture, and pneumatically or manually ramming each layer until compressed to about half its original height. The formwork is then removed and repositioned for the next section. The soil mixture typically contains clay, sand, and gravel in specific proportions (5-15% clay ideal), with moisture content around 10%. The compression creates interlocking particles, forming a solid, load-bearing wall without firing or chemical binding. Completed walls cure through air-drying over several months, achieving compressive strengths comparable to concrete. The distinctive horizontal layer lines create natural aesthetic appeal.',
    HIGH_SCHOOL: 'Rammed earth represents an ancient construction technology experiencing contemporary revival due to sustainability advantages. The technique requires careful soil selection - ideal composition includes 5-15% clay (binder), 15-30% silt, and remainder sand and gravel (aggregate). Excessive clay causes cracking; insufficient clay reduces strength. Moisture content critically affects compaction - typically 8-12% optimal. Traditional manual ramming has largely been replaced by pneumatic tampers achieving better compression and efficiency. Formwork systems range from simple plywood with external bracing to sophisticated modular systems. Wall thickness typically ranges from 12-24 inches for structural walls. Compressive strength reaches 300-600 psi when properly constructed, adequate for load-bearing multi-story buildings. Thermal mass properties provide passive climate control. Modern stabilized rammed earth incorporates 5-10% cement or lime, significantly increasing strength and moisture resistance while maintaining sustainability benefits.',
    UNDERGRADUATE: 'Rammed earth construction involves complex material science, structural engineering, and construction methodology considerations. Soil characterization employs particle size distribution analysis, Atterberg limits testing, and proctor compaction testing to optimize mixture design. The relationship between clay content, moisture content, and compaction energy determines final strength and durability. Traditional unstabilized rammed earth relies purely on mechanical interlocking and clay binding, while stabilized variants incorporate cement, lime, or other binders, significantly altering material properties. Structural analysis addresses compressive strength (typically 300-900 psi depending on stabilization), minimal tensile capacity necessitating thick walls and limited openings, and seismic performance requiring specialized detailing. Thermal performance analysis reveals thermal diffusivity of approximately 12 hours for 12-inch walls, creating significant phase lag moderating interior temperatures. Moisture management critically affects durability - protective measures include raised foundations, roof overhangs, and surface treatments. Modern formwork engineering enables efficient construction through modular systems and hydraulic components.',
    GRADUATE: 'Scholarly examination of rammed earth addresses materials science, structural performance, thermal physics, construction methodology, and sustainability assessment. Materials research investigates particle packing theory, clay mineralogy effects on bonding, optimal gradation curves, and stabilizer chemistry. Recent research examines alternative stabilizers (biopolymers, geopolymers, natural fibers) seeking improved performance with lower environmental impact. Structural research addresses compressive and flexural behavior, failure modes, seismic performance, and reinforcement strategies. Questions include optimal reinforcement configurations for seismic regions and how to model complex soil-structure interaction. Thermal research employs finite element analysis and computational fluid dynamics to optimize wall configurations for various climates, examining the interplay between thermal mass, insulation, and ventilation. Construction research develops improved formwork systems, compaction methodologies, and quality control protocols. Life-cycle assessment quantifies environmental benefits - embodied energy typically 10-20% of conventional construction, but questions remain about durability and maintenance implications. Conservation research addresses historical rammed earth preservation.',
    PHD: 'Rammed earth research offers rich interdisciplinary opportunities spanning geotechnical engineering, materials science, architectural history, building physics, and sustainability science. Advanced materials research employs scanning electron microscopy, x-ray computed tomography, and nanoindentation to understand microstructural bonding mechanisms and optimize mixture designs. Some work investigates bio-cementation using microbially-induced calcite precipitation as sustainable stabilization. Geotechnical research addresses constitutive modeling of partially saturated compacted soils under architectural loading conditions, including moisture-dependent behavior and long-term creep. Structural engineering research investigates seismic performance through shake table testing and numerical modeling, developing design methodologies for earthquake-resistant construction. Building physics research optimizes hygrothermal performance through coupled heat-moisture transfer modeling, addressing climate-specific design strategies. Archaeological and architectural history research traces rammed earth evolution across civilizations - Chinese Fujian tulou, Great Wall sections, Roman opus caementicium variants, French pisé traditions. Questions persist about technological diffusion and independent invention. Contemporary practice research examines barriers to adoption and develops prefabrication strategies for industrialization. Sustainability research employs comprehensive life-cycle assessment addressing embodied carbon, operational energy, durability, and end-of-life scenarios.',
  },

  history: {
    ELEMENTARY: 'People have been building with rammed earth for over 8,000 years! The ancient Chinese used it to build parts of the Great Wall, and old rammed earth buildings still stand in many countries. Long ago, people discovered that pounding dirt between boards made super-strong walls that lasted for generations. During the 1800s, builders in France and America wrote instruction books about rammed earth construction. The technique was mostly forgotten when concrete became popular, but now it\'s making a comeback because it\'s good for the environment and creates beautiful, comfortable buildings.',
    MIDDLE_SCHOOL: 'Rammed earth construction dates to at least 8000 BCE in the Middle East and was extensively developed in China from the Neolithic period. Sections of the Great Wall of China (7th century BCE onward) employed rammed earth construction. The technique spread across the ancient world - Phoenicians, Carthaginians, and Romans used variants. Islamic architecture employed rammed earth (tapia) widely in North Africa and Spain. In 18th-19th century Europe, particularly France, rammed earth (pisé) was systematically studied and standardized, with François Cointeraux\'s 1790s publications promoting the technique. European colonizers introduced rammed earth to Australia and the Americas. The technique declined with industrialization but revived from the 1970s onward due to environmental concerns and improved construction methodologies.',
    HIGH_SCHOOL: 'Rammed earth represents one of humanity\'s most ancient and geographically widespread construction technologies. Archaeological evidence dates the technique to Pre-Pottery Neolithic B period (8000-6000 BCE) in the Levant. Chinese development produced sophisticated applications including defensive walls, residential structures (Fujian tulou earthen roundhouses, 12th-20th centuries), and Great Wall sections. Phoenicians and Carthaginians spread the technique around the Mediterranean; Roman military engineers employed it for temporary fortifications. Islamic architecture extensively used tapia/tabiya rammed earth in North Africa and Al-Andalus - the Alhambra contains rammed earth sections. The technique persisted in rural European vernacular architecture. Systematic documentation began with French engineers in the 1790s - François Cointeraux published influential treatises standardizing pisé construction. The technique spread to colonial territories. Henry David Thoreau advocated for it in America. Industrialization marginalized the technique by the early 20th century. Revival began in the 1970s driven by sustainability movements and improved pneumatic ramming technology.',
    UNDERGRADUATE: 'Rammed earth historiography addresses questions of technological origins, diffusion patterns, regional variations, and cyclical decline and revival. The technique\'s appearance in widely separated ancient cultures (China, Middle East, North Africa, Europe) raises questions about independent invention versus knowledge transmission along trade routes. Chinese rammed earth tradition demonstrates technological sophistication - tulou structures reach 5 stories and house hundreds of people, incorporating sophisticated structural and defensive features. Islamic rammed earth evolved distinctive regional variants - Moroccan pisé, Andalusian tapia, Arabian tabiya. European rationalization during the Enlightenment produced technical literature attempting to standardize and promote the technique. François Cointeraux\'s work (1790s) systematically documented methods and promoted widespread adoption. The technique spread to European colonies in the 19th century. Competing industrialized materials (fired brick, concrete) marginalized rammed earth by the early 20th century. Contemporary revival (1970s-present) draws on environmental advantages while incorporating modern engineering, stabilization, and mechanization. Current research addresses seismic performance, thermal optimization, and industrialization potential.',
    GRADUATE: 'Scholarly examination of rammed earth addresses archaeological, technological, sociocultural, and environmental dimensions across temporal and geographic scales. Archaeological research continues refining chronologies and examining technological variations - recent work employs scientific analysis to understand ancient mixture designs and construction processes. Questions persist about transmission routes and the relationship between geographically separated traditions. Architectural history research examines rammed earth\'s position within various building traditions - when was it vernacular necessity versus aesthetic choice? How did it relate to social hierarchies? Technical history research traces methodological evolution, particularly 18th-19th century European rationalization and contemporary mechanization. François Cointeraux\'s work represents crucial transition from traditional craft knowledge to systematic technical documentation. Sociocultural research addresses changing perceptions - from poverty-associated vernacular to sustainability-driven contemporary prestige. What explains cyclical acceptance and rejection? Contemporary research examines institutional and cultural barriers to adoption despite environmental benefits. Conservation science develops appropriate methodologies for preserving historical rammed earth, addressing challenges of irreversible deterioration and compatible interventions.',
    PHD: 'Rammed earth research presents exceptional opportunities for interdisciplinary investigation spanning archaeology, materials science, architectural history, anthropology, and sustainability science. Archaeological research employs scientific analysis (micromorphology, geochemistry, dating) to understand ancient technologies and inform current practice - what sophisticated knowledge did ancient builders possess? How can traditional wisdom inform contemporary engineering? Materials science research investigates historical mixture designs and construction processes through analysis of archaeological and historical structures, combining with experimental archaeology to reconstruct traditional techniques. Architectural history examines rammed earth\'s role across different architectural traditions and time periods, addressing questions of style, meaning, and cultural significance. Anthropological research investigates traditional knowledge systems and their transmission - how was sophisticated empirical understanding encoded and transmitted without scientific frameworks? Sociocultural research examines contemporary meanings and perceptions - why does environmental superiority not guarantee adoption? What cultural, institutional, and economic factors affect acceptance? Sustainability science employs life-cycle assessment and embodied energy analysis, but questions remain about durability, maintenance, and end-of-life implications. Building science research optimizes performance through advanced modeling. Engineering research addresses structural performance, particularly seismic behavior. Conservation science develops evidence-based intervention methodologies. Cross-cultural comparative research examines relationships between geographically separated traditions.',
  },

  characteristics: [
    'Monolithic earthen walls created by compacting soil in formwork',
    'Distinctive horizontal layering from sequential compaction lifts',
    'Typical wall thickness 12-24 inches for structural applications',
    'High thermal mass providing passive temperature regulation',
    'Compressive strength 300-900 psi depending on soil and stabilization',
    'Low embodied energy and carbon footprint',
  ],

  famousExamples: [
    { name: 'Great Wall of China (sections)', location: 'China', year: '7th century BCE-17th century CE', description: 'Extensive sections built with rammed earth construction' },
    { name: 'Fujian Tulou', location: 'Fujian Province, China', year: '12th-20th centuries', description: 'Massive communal earthen roundhouses, 3-5 stories tall' },
    { name: 'Alhambra (sections)', location: 'Granada, Spain', year: '13th-14th centuries', description: 'Tapia (rammed earth) walls within the palace complex' },
    { name: 'Chapel of Reconciliation', location: 'Berlin, Germany', year: '2000', description: 'Contemporary rammed earth religious building on Berlin Wall site' },
    { name: 'Ricola Kräuterzentrum', location: 'Laufen, Switzerland', year: '2014', description: 'Modern rammed earth industrial building by Herzog & de Meuron' },
  ],

  confusionPairs: [
    {
      elementId: 'adobe',
      reason: 'Both are earthen construction using clay-rich soil',
      distinction: 'Rammed earth compacts moist soil in formwork creating monolithic walls; adobe forms sun-dried bricks laid with mortar',
    },
    {
      elementId: 'cob',
      reason: 'Both use earthen materials for wall construction',
      distinction: 'Rammed earth compacts relatively dry soil in formwork; cob applies wet clayey mixture by hand without formwork, often with thick straw content',
    },
  ],

  searchTags: ['vernacular', 'earthen', 'sustainable', 'pisé', 'thermal mass', 'compressed earth', 'natural materials', 'traditional', 'contemporary'],

  arMetadata: {
    modelPath: '/models/architecture/rammed-earth.glb',
    scale: 1.0,
    rotatable: true,
    annotations: [
      { label: 'Compaction Layer', position: { x: 0, y: 0.1, z: 0 } },
      { label: 'Formwork Marks', position: { x: 0.15, y: 0.05, z: 0 } },
      { label: 'Horizontal Stratification', position: { x: 0, y: 0.15, z: 0 } },
      { label: 'Monolithic Wall', position: { x: 0, y: 0, z: 0.08 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
};
