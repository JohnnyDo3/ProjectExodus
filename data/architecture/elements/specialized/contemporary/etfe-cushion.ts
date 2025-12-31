import type { ArchitecturalElement } from '../../../types';

export const ETFE_CUSHION: ArchitecturalElement = {
  id: 'etfe-cushion',
  slug: 'etfe-cushion',
  name: 'ETFE Cushion',
  alternativeNames: ['ETFE Pillow', 'Pneumatic ETFE', 'Air-Inflated Panel', 'Foil Cushion', 'ETFE Bubble'],
  pronunciation: {
    phonetic: 'EE-tee-eff-EE KUSH-un',
    language: 'English',
  },
  etymology: {
    origin: 'Chemical nomenclature + English',
    meaning: 'Ethylene TetraFluoroEthylene inflated cushion',
    rootWord: 'ETFE = chemical formula for fluoropolymer; cushion = inflated pillow shape',
  },
  category: 'FACADE',
  subcategory: 'membrane_systems',
  periods: ['HIGH_TECH', 'CONTEMPORARY', 'SUSTAINABLE'],
  regions: ['GLOBAL', 'WESTERN_EUROPE', 'EAST_ASIA', 'NORTH_AMERICA'],

  images: {
    primary: '/images/architecture/elements/etfe-cushion-primary.jpg',
    gallery: [
      '/images/architecture/elements/etfe-cushion-detail.jpg',
      '/images/architecture/elements/etfe-cushion-interior.jpg',
      '/images/architecture/elements/etfe-cushion-night.jpg',
    ],
    diagram: '/images/architecture/diagrams/etfe-cushion-assembly.svg',
  },

  description: {
    ELEMENTARY: 'An ETFE cushion is a plastic bubble that covers buildings instead of glass! It\'s made of super-strong clear plastic filled with air, like a transparent pillow. ETFE weighs almost nothing compared to glass, lets in lots of light, and can even change colors with special printing. The Eden Project in England has huge geodesic domes covered in these bubbles!',
    MIDDLE_SCHOOL: 'ETFE (Ethylene TetraFluoroEthylene) cushions are lightweight transparent structures made from thin fluoropolymer film. Typically, 2-5 layers of ETFE film are welded into cushions and inflated with air (pressure: 200-500 Pa). The inflated cushions provide thermal insulation, structural stability, and transparency. ETFE weighs about 1% as much as glass for equivalent area, transmits more light, and is highly durable (30+ year lifespan). Used for large-span roof enclosures and facades.',
    HIGH_SCHOOL: 'ETFE cushion systems consist of aluminum frames supporting pneumatically inflated multilayer foil pillows. Film thickness typically ranges 50-200 microns; cushions are 2-5 layers deep (commonly 3-layer). Constant low-pressure air inflation (managed by automated systems) maintains structural form and provides thermal insulation (R-value approximately 1.5-2.0 per layer). Advantages include extreme light weight (0.35 kg/m² vs. glass at 25-30 kg/m²), high light transmission (up to 95%), UV resistance, self-cleaning properties, and recyclability. Limitations include lower thermal performance than high-performance glass and acoustic transparency.',
    UNDERGRADUATE: 'ETFE cushion technology involves material science, pneumatic structures, and building physics. The fluoropolymer exhibits exceptional properties: tensile strength 40-50 MPa, elongation at break 400-500%, melting point 267°C, and >98% transparency to wavelengths 400-1,000nm. Cushion design parameters include film thickness, number of layers, inflation pressure, and printed patterns (which can control solar gain). Structural analysis addresses wind loading, pressure cycling, and tear propagation. Installation requires precise frame extrusion profiles and automated inflation control. Environmental performance considerations include exceptional daylight factors (reducing electric lighting), moderate thermal insulation, and minimal embodied energy versus glass.',
    GRADUATE: 'Research on ETFE cushions examines long-term material behavior, structural optimization, and environmental performance integration. Material studies address UV degradation, stress-cracking resistance, and soil accumulation patterns (affecting self-cleaning). Structural research includes finite element modeling of pneumatic behavior, fatigue analysis of welded seams, and development of spanning capability through optimized cushion geometry. Environmental innovation includes printed patterns optimizing solar gain seasonally, integration with photovoltaic printing, and phase-change materials in cushion cavities for thermal mass. Lifecycle analysis compares environmental impact across material production, transportation, installation, operation, and end-of-life recycling.',
    PHD: 'Scholarly investigation of ETFE technology encompasses polymer chemistry, structural membrane theory, and sustainable architecture discourse. Research addresses the material\'s development from aerospace applications to architectural use, examining technology transfer and adaptation processes. Comparative studies analyze post-occupancy performance data from major installations, assessing actual versus predicted thermal performance, maintenance requirements, and occupant satisfaction. Theoretical work examines ETFE\'s role in contemporary architecture\'s fascination with transparency and lightness, questioning whether material properties drive design or marketing narratives shape adoption. Critical scholarship addresses the concentration of ETFE manufacturing and installation expertise with few global firms, examining implications for knowledge diffusion and project costs.',
  },

  history: {
    ELEMENTARY: 'ETFE was invented in the 1970s for use in spaceships and airplanes because it\'s lightweight and tough. In the 1990s, architects discovered they could use it for buildings. The first big ETFE building was the Eden Project in England (2001), with giant transparent bubbles covering tropical gardens. Now ETFE is used for stadiums, aquariums, and other buildings worldwide!',
    MIDDLE_SCHOOL: 'ETFE was developed by DuPont in the 1970s for aerospace applications. Architectural use began in the 1980s with small projects. The technology gained prominence with the Eden Project (2001) in Cornwall, UK-massive geodesic biomes clad with ETFE cushions. The Allianz Arena in Munich (2005) demonstrated ETFE for stadium enclosures with color-changing capabilities. The Beijing National Aquatics Center (2008) showcased ETFE on a global stage, featuring the distinctive "Water Cube" appearance.',
    HIGH_SCHOOL: 'ETFE polymer was developed in 1970s for chemical-resistant applications. German engineer Stefan Lehnert pioneered architectural applications in the 1980s. Early projects were modest greenhouses and zoo enclosures. The Eden Project (2001) marked ETFE\'s breakthrough-37,500m² of cushions covering multiple biomes, demonstrating viability for large-scale architectural applications. Key subsequent projects: Allianz Arena (2005, 66,000m² color-changing facade), Beijing Aquatics Center (2008, innovative bubble-pattern geometry), and Khan Shatyr Entertainment Center (2010, world\'s largest tent structure).',
    UNDERGRADUATE: 'Historical development of ETFE cushions traces from material invention (DuPont, 1970s) through early architectural experimentation (Vector Foiltec, Ceno Membrane Technology, 1980s-90s) to mainstream adoption (2000s-present). Enabling factors included development of reliable welding techniques for film seams, automation of inflation control systems, and engineering methodologies for large-span pneumatic structures. The Eden Project demonstrated technical feasibility and captured public imagination. Olympic venues (Beijing 2008, London 2012) provided global visibility. Contemporary evolution includes integrated printing technologies for solar control, photovoltaic ETFE for energy generation, and improved thermal performance through additional layers and low-e coatings.',
    GRADUATE: 'ETFE historiography examines the convergence of material innovation, structural engineering, and architectural aesthetics. Research traces technology transfer from aerospace/industrial applications to architecture, analyzing the role of specialized firms (particularly Vector Foiltec) in developing architectural applications. Historical scholarship addresses how high-profile projects like Eden Project and Olympics venues drove adoption, creating market acceptance and engineering confidence. Comparative research examines regional variations in ETFE use-prominent in Europe and Asia, less common in North America despite technical suitability. Studies analyze the gap between ETFE\'s sustainable building claims and lifecycle performance, examining maintenance requirements, replacement cycles, and actual energy performance.',
    PHD: 'Contemporary scholarship on ETFE technology engages questions of materiality, sustainability narratives, and architectural innovation diffusion. Research examines how ETFE\'s visual qualities-transparency, luminosity, lightweight appearance-align with contemporary architectural values emphasizing dematerialization and environmental connection. Critical analysis questions whether ETFE represents genuine sustainable innovation or aesthetic novelty with limited climate-specific applicability. Theoretical work addresses ETFE structures\' phenomenological qualities, examining occupant experiences of diffused light and visual transparency. Historical investigation analyzes the role of signature projects and celebrity architects in establishing ETFE\'s legitimacy, examining the feedback loop between architectural media representation and industry adoption.',
  },

  characteristics: [
    'Lightweight fluoropolymer film (50-200 microns)',
    'Pneumatically inflated cushions (2-5 layers)',
    'Extremely lightweight: 1% of equivalent glass weight',
    'High light transmission: up to 95%',
    'Self-cleaning surface (non-stick properties)',
    'Recyclable at end of life',
    'Inflation pressure: 200-500 Pa (managed by automated system)',
    'Typical lifespan: 30-50 years',
  ],

  famousExamples: [
    { name: 'Eden Project', location: 'Cornwall, UK', year: '2001', description: 'Grimshaw Architects\' geodesic biomes with 37,500m² ETFE cushions' },
    { name: 'Beijing National Aquatics Center', location: 'Beijing, China', year: '2008', description: 'The "Water Cube" with bubble-pattern ETFE cladding' },
    { name: 'Allianz Arena', location: 'Munich, Germany', year: '2005', description: 'Herzog & de Meuron\'s stadium with 66,000m² color-changing ETFE' },
    { name: 'Khan Shatyr Entertainment Center', location: 'Nur-Sultan, Kazakhstan', year: '2010', description: 'Foster + Partners\' 150m high tent structure with ETFE roof' },
    { name: 'Esplanade Theatres', location: 'Singapore', year: '2002', description: 'The "Durian" with distinctive ETFE sunshading system' },
  ],

  confusionPairs: [
    {
      elementId: 'glass-dome',
      reason: 'Both create transparent enclosures',
      distinction: 'ETFE cushions are pneumatic plastic film weighing 1% of glass; glass domes are rigid structural glazing systems',
    },
    {
      elementId: 'tensile-membrane',
      reason: 'Both are lightweight roof/facade systems',
      distinction: 'ETFE is transparent and pneumatically inflated; traditional tensile membranes (PVC, PTFE) are opaque/translucent and mechanically tensioned',
    },
  ],

  searchTags: ['membrane', 'plastic', 'transparent', 'lightweight', 'inflated', 'pneumatic', 'modern', 'stadium', 'etfe', 'foil'],

  arMetadata: {
    modelPath: '/models/architecture/etfe-cushion.glb',
    scale: 0.6,
    rotatable: true,
    annotations: [
      { label: 'ETFE Film Layers', position: { x: 0, y: 0.3, z: 0 } },
      { label: 'Air Inflation', position: { x: 0, y: 0, z: 0 } },
      { label: 'Aluminum Frame', position: { x: 0.4, y: 0.5, z: 0 } },
      { label: 'Printed Pattern (optional)', position: { x: 0.2, y: 0.4, z: 0.1 } },
    ],
  },

  difficultyScore: 3,
  dateAdded: new Date('2024-01-20'),
  lastUpdated: new Date('2024-01-20'),
};
