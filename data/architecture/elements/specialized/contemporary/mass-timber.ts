import type { ArchitecturalElement } from '../../../types';

export const MASS_TIMBER: ArchitecturalElement = {
  id: 'mass-timber',
  slug: 'mass-timber',
  name: 'Mass Timber',
  alternativeNames: ['CLT', 'Cross-Laminated Timber', 'Glulam', 'Laminated Wood', 'Engineered Timber'],
  pronunciation: {
    phonetic: 'MASS TIM-ber',
    language: 'English',
  },
  etymology: {
    origin: 'English',
    meaning: 'Large-scale engineered wood structural elements',
    rootWord: 'From Latin "massa" (lump, mass) + Old English "timber" (wood building material)',
  },
  category: 'STRUCTURAL',
  subcategory: 'structural_materials',
  periods: ['SUSTAINABLE', 'CONTEMPORARY', 'GREEN_ARCHITECTURE'],
  regions: ['GLOBAL', 'WESTERN_EUROPE', 'NORTH_AMERICA', 'OCEANIA', 'SCANDINAVIA'],

  images: {
    primary: '/images/architecture/elements/mass-timber-primary.jpg',
    gallery: [
      '/images/architecture/elements/mass-timber-detail.jpg',
      '/images/architecture/elements/mass-timber-construction.jpg',
      '/images/architecture/elements/mass-timber-interior.jpg',
    ],
    diagram: '/images/architecture/diagrams/mass-timber-layers.svg',
  },

  description: {
    ELEMENTARY: 'Mass timber is super-strong wood made by gluing many layers of regular wood together. It\'s like making plywood but much thicker and stronger! These big wooden beams and panels can build tall buildings, just like steel and concrete. Mass timber is better for the environment because trees absorb carbon dioxide as they grow, and wood buildings store that carbon instead of releasing it.',
    MIDDLE_SCHOOL: 'Mass timber refers to engineered wood products strong enough to build multi-story structures. The two main types are CLT (Cross-Laminated Timber)-thick panels made of wood boards stacked in perpendicular layers-and glulam (glue-laminated timber)-large beams made of wood boards glued together. Mass timber buildings are lighter than concrete, faster to construct (prefabricated panels), and store carbon. Wood is treated to resist fire, achieving required fire ratings. Mass timber enables sustainable construction with renewable materials.',
    HIGH_SCHOOL: 'Mass timber construction uses engineered wood products including CLT (cross-laminated timber panels, typically 3-7 layers, 60-300mm thick) and glulam beams. Manufacturing involves dimensional lumber graded for strength, adhesive bonding, and hydraulic pressing. Structural advantages include high strength-to-weight ratio, seismic performance (lighter buildings reduce foundation loads), and dimensional stability. Sustainability benefits include carbon sequestration (1m³ of wood stores ~0.9 tonnes CO₂), renewable material sourcing from sustainably managed forests, and lower embodied energy than concrete or steel. Fire protection uses encapsulation, char-rating calculations, and sprinkler systems. Building codes increasingly permit mass timber for mid-rise and tall construction.',
    UNDERGRADUATE: 'Mass timber structural design involves multiple engineered wood products: CLT (cross-laminated timber for panels), glulam (glue-laminated timber for beams/columns), NLT (nail-laminated timber), and DLT (dowel-laminated timber). Structural analysis addresses orthotropic material properties, connection design (steel plates, self-tapping screws, dowels), and lateral load systems (often hybrid with concrete cores). Fire engineering employs sacrificial char layer calculations-wood chars predictably at ~0.7mm/minute, underlying wood remains structural. Acoustic performance requires careful detailing to achieve adequate sound transmission class ratings. Lifecycle assessment demonstrates carbon benefits: sustainable forestry creates carbon sink, wood products store carbon long-term, and avoided emissions from lower embodied energy. Contemporary research examines tall timber construction (18+ stories), hybrid systems, and biophilic benefits.',
    GRADUATE: 'Mass timber research encompasses material science, structural engineering, fire science, and environmental assessment. Material research examines long-term performance under sustained loading (creep), moisture-induced dimensional changes, adhesive durability, and engineered wood composites optimization. Structural investigation includes seismic performance testing (shake table studies), connection ductility research, and hybrid system development (combining timber with steel/concrete). Fire research employs full-scale fire tests, advanced modeling of charring rates and heat transfer, and encapsulation strategies. Lifecycle analysis compares forest carbon sequestration rates, manufacturing energy, construction embodied carbon, building operational impacts, and end-of-life scenarios (reuse, recycling, combustion with energy recovery). Economic studies examine cost competitiveness, construction speed advantages, and market development barriers.',
    PHD: 'Scholarly investigation of mass timber engages forest ecology, structural engineering, building science, environmental policy, and architectural theory. Research methodologies include comparative lifecycle assessment across building structural systems and geographies, post-occupancy structural monitoring, long-term material degradation studies, and techno-economic analysis of mass timber supply chains. Critical scholarship examines mass timber within climate change mitigation discourse, questioning whether sustainable forest management can scale to meet widespread adoption, analyzing certification systems (FSC, PEFC), and examining tensions between timber construction and forest conservation. Theoretical work addresses wood\'s cultural meanings-associations with craft, naturalness, and environmental values-and how these shape contemporary wood architecture. Historical research traces mass timber from precedents (early glulam development, 1900s-1930s) through contemporary CLT innovation (1990s Austria) to global proliferation.',
  },

  history: {
    ELEMENTARY: 'People have built with wood forever, but mass timber is a new invention from the 1990s in Europe. Engineers figured out how to make super-strong wood panels and beams by gluing regular wood boards together in layers. The first tall mass timber building was built in London in 2009. Now countries around the world are building with mass timber because it\'s sustainable and beautiful!',
    MIDDLE_SCHOOL: 'Traditional timber construction has ancient roots, but modern mass timber emerged in the 1990s. CLT was developed in Austria and Germany, with the first CLT plant opening in Austria in 1995. Early mass timber buildings were low-rise. Stadthaus in London (2009), a 9-story residential building, demonstrated tall timber construction potential. Brock Commons at the University of British Columbia (2017) reached 18 stories, becoming the world\'s tallest mass timber building at the time. Building code changes in North America and Europe have progressively increased allowable heights for timber construction.',
    HIGH_SCHOOL: 'Glulam development began early 1900s; CLT was invented in Switzerland in 1991 and commercialized in Austria mid-1990s. European adoption preceded North American uptake by 15-20 years. Key projects demonstrating viability: Stadthaus Murray Grove London (2009, 9 stories), Forté Apartments Melbourne (2012, 10 stories), Treet Bergen Norway (2015, 14 stories), and Brock Commons Vancouver (2017, 18 stories). Building code evolution enabled taller construction: International Building Code 2021 allows Type IV-A construction up to 18 stories. Market drivers include carbon reduction goals, biophilic design interest, and construction speed advantages. Challenges include fire perception, acoustic performance, and moisture management during construction.',
    UNDERGRADUATE: 'Historical development of mass timber traces from early glulam patents (Otto Hetzer, 1906; Karl Mohrmann, 1930s) through CLT innovation (Gerhard Schickhofer and colleagues, 1990s Austria) to contemporary proliferation. Austrian and German timber industries developed manufacturing capabilities and design standards. Swiss and Scandinavian architects demonstrated architectural possibilities. Technology transfer to North America occurred 2000s-2010s through research partnerships, code development efforts, and demonstration projects. Enabling factors include: CNC manufacturing precision, structural analysis software, adhesive technology improvements, and building code reforms. Contemporary evolution includes hybrid structures (mass timber + concrete cores), tall timber buildings (20+ stories proposed/under construction), and large-span applications (sports halls, airport terminals). Research networks (FPInnovations Canada, WoodWorks USA, TU Graz Austria) drive continued innovation.',
    GRADUATE: 'Mass timber historiography examines innovation diffusion, building industry transformation, and environmental policy drivers. CLT development occurred through university-industry collaboration in regions with strong forestry sectors and woodworking traditions. Code change processes involved extensive fire testing, structural research, and stakeholder coordination across material interests (timber industry promoting, concrete/steel industries resisting). Market adoption patterns reveal regional variation-rapid uptake in Central Europe, growing adoption in Scandinavia and Canada, slower adoption in US despite large forest resources. Research examines factors including: regulatory environments, professional training and knowledge dissemination, material supply chain development, cost competitiveness, and cultural attitudes toward wood construction. Critical analysis questions sustainability claims, examining whether mass timber displaces high-carbon materials or simply enables building expansion, and whether forestry practices meet sustainability standards.',
    PHD: 'Contemporary scholarship on mass timber engages multiple disciplines: forest ecology (sustainable timber yield), carbon accounting (sequestration vs. emissions), building physics (long-term performance), fire science (safety equivalency to non-combustibles), and political economy (industry development and lobbying). Research examines how mass timber has been positioned within climate change mitigation strategy, analyzing both potential and limitations. Lifecycle assessment studies reveal complexity-carbon benefits depend on forest management practices, displacement of alternative materials, building longevity, and end-of-life treatment. Critical theory addresses mass timber within broader sustainable development discourse, questioning whether technical solutions can address systemic overconsumption. Cultural analysis examines wood\'s symbolic values and how mass timber architecture articulates environmental commitments. Comparative research across national contexts examines how policy frameworks, cultural traditions, and forest resources shape mass timber adoption trajectories.',
  },

  characteristics: [
    'Engineered wood panels (CLT) and beams (glulam)',
    'Prefabricated components for rapid assembly',
    'High strength-to-weight ratio',
    'Carbon storage in building structure',
    'Lower embodied energy than concrete/steel',
    'Exposed wood creates warm interior aesthetics',
    'Fire-resistant through char layer formation',
    'Requires moisture protection during construction',
  ],

  famousExamples: [
    { name: 'Brock Commons Tallwood House', location: 'Vancouver, Canada', year: '2017', description: '18-story mass timber student residence, hybrid CLT and glulam' },
    { name: 'Mjøstårnet', location: 'Brumunddal, Norway', year: '2019', description: 'World\'s tallest timber building at 85.4m (18 stories)' },
    { name: 'T3 Building', location: 'Minneapolis, USA', year: '2016', description: 'First modern mass timber office building in United States' },
    { name: 'Swatch Omega Headquarters', location: 'Biel, Switzerland', year: '2019', description: 'Shigeru Ban\'s timber grid roof structure spanning 35m' },
    { name: 'The Carbon12', location: 'Portland, USA', year: '2018', description: '8-story mass timber residential building demonstrating carbon benefits' },
  ],

  confusionPairs: [
    {
      elementId: 'traditional-timber-frame',
      reason: 'Both use wood as structural material',
      distinction: 'Traditional timber uses solid wood posts/beams; mass timber uses engineered products (CLT panels, glulam) enabling taller, wider-span construction',
    },
    {
      elementId: 'plywood',
      reason: 'Both are laminated wood products',
      distinction: 'Plywood is thin sheets for sheathing; mass timber (CLT) is thick structural panels (60-300mm) replacing concrete floors/walls',
    },
  ],

  searchTags: ['wood', 'timber', 'clt', 'glulam', 'sustainable', 'carbon', 'engineered', 'green', 'renewable', 'structure'],

  arMetadata: {
    modelPath: '/models/architecture/mass-timber.glb',
    scale: 0.4,
    rotatable: true,
    annotations: [
      { label: 'CLT Panel Layers', position: { x: 0, y: 0.5, z: 0 } },
      { label: 'Glulam Beam', position: { x: 0.5, y: 0.7, z: 0 } },
      { label: 'Cross-Grain Orientation', position: { x: 0.2, y: 0.3, z: 0.1 } },
      { label: 'Steel Connection Plate', position: { x: 0.5, y: 0.5, z: 0 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
