// Exodology Case Study Library
// Documented system transitions analyzed through the Exodological framework

export interface CaseStudy {
  id: string
  title: string
  subtitle: string
  category: 'energy' | 'urban' | 'agricultural' | 'industrial' | 'institutional' | 'technological'
  scale: 'local' | 'regional' | 'national' | 'global'
  duration: string
  location: string
  year: number
  status: 'completed' | 'ongoing' | 'planned'
  image?: string
  summary: string
  context: {
    background: string
    initialSystem: string
    pressures: string[]
    stakeholders: string[]
  }
  exodologicalAnalysis: {
    transitionType: string
    phaseIdentification: string
    keyMechanisms: string[]
    resistancePatterns: string[]
    catalyticEvents: string[]
  }
  implementation: {
    approach: string
    timeline: { phase: string; duration: string; activities: string }[]
    challenges: string[]
    adaptations: string[]
  }
  outcomes: {
    successes: string[]
    limitations: string[]
    unexpectedResults: string[]
    metrics: { label: string; before: string; after: string }[]
  }
  lessonsLearned: string[]
  implications: string
  references: { title: string; author: string; year: number; type: string }[]
  contributors: string[]
  lastUpdated: string
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'german-energiewende',
    title: 'The German Energiewende',
    subtitle: 'National Energy System Transformation',
    category: 'energy',
    scale: 'national',
    duration: '2000-present',
    location: 'Germany',
    year: 2000,
    status: 'ongoing',
    summary: 'Germany\'s ambitious transition from nuclear and fossil fuels to renewable energy represents one of the most significant documented system transitions in modern history. This case study analyzes the Energiewende through an Exodological lens, examining the interplay of policy, technology, social movements, and economic forces.',
    context: {
      background: 'Following the Chernobyl disaster in 1986 and growing environmental awareness, Germany began questioning its energy paradigm. The anti-nuclear movement gained momentum, while concerns about climate change added pressure for decarbonization. By 2000, a coalition government committed to phasing out nuclear power and dramatically expanding renewables.',
      initialSystem: 'Centralized energy production dominated by nuclear (30%), coal (50%), and natural gas (15%), with minimal renewable contribution. Large utility companies controlled generation, transmission, and distribution in an oligopolistic market structure.',
      pressures: [
        'Public opposition to nuclear power post-Chernobyl',
        'EU climate commitments and emissions targets',
        'Rising fossil fuel import costs',
        'Technological improvements in solar and wind',
        'Citizen energy cooperative movement',
        'Fukushima disaster (2011) as acceleration catalyst'
      ],
      stakeholders: [
        'Federal government and state (Länder) governments',
        'Major utilities (E.ON, RWE, EnBW, Vattenfall)',
        'Citizen energy cooperatives (over 900 by 2020)',
        'Industrial energy consumers',
        'Environmental organizations',
        'Labor unions in coal regions',
        'Technology manufacturers'
      ]
    },
    exodologicalAnalysis: {
      transitionType: 'Paradigmatic Shift with Structural Reconfiguration',
      phaseIdentification: 'Currently in Late Transition Phase with elements of Consolidation emerging. Initial Destabilization (1986-2000) created conditions; Acceleration Phase (2000-2015) saw rapid renewable deployment; current phase involves grid integration challenges and coal phase-out.',
      keyMechanisms: [
        'Feed-in tariffs creating guaranteed returns for renewable investment',
        'Decentralization of ownership (50% of renewables citizen-owned by 2012)',
        'Technological learning curves driving cost reductions',
        'Regulatory frameworks mandating grid access for renewables',
        'Public narrative shift framing transition as national project'
      ],
      resistancePatterns: [
        'Incumbent utility financial distress and political lobbying',
        'Grid infrastructure limitations creating bottlenecks',
        'Regional opposition to transmission line construction',
        'Coal region economic transition challenges',
        'Industrial competitiveness concerns over energy costs'
      ],
      catalyticEvents: [
        'Chernobyl disaster (1986) - initial paradigm questioning',
        'Red-Green coalition government (1998) - political window',
        'Renewable Energy Act passage (2000) - institutional framework',
        'Fukushima disaster (2011) - acceleration trigger',
        'Paris Agreement (2015) - international commitment reinforcement'
      ]
    },
    implementation: {
      approach: 'Policy-driven transition with market mechanisms, combining regulatory mandates with economic incentives while attempting to manage social and regional equity concerns.',
      timeline: [
        { phase: 'Foundation', duration: '1990-2000', activities: 'Anti-nuclear movement building, initial feed-in law (1991), political coalition formation' },
        { phase: 'Launch', duration: '2000-2004', activities: 'Renewable Energy Act, nuclear phase-out agreement, solar and wind deployment acceleration' },
        { phase: 'Expansion', duration: '2004-2011', activities: 'Massive renewable capacity additions, citizen cooperative proliferation, grid stress emergence' },
        { phase: 'Acceleration', duration: '2011-2017', activities: 'Post-Fukushima nuclear acceleration, coal phase-out discussions, market design reforms' },
        { phase: 'Integration', duration: '2017-present', activities: 'Grid modernization, sector coupling, hydrogen strategy, coal exit law' }
      ],
      challenges: [
        'Maintaining grid stability with variable renewable generation',
        'Managing electricity price increases for consumers and industry',
        'Coordinating federal-state implementation differences',
        'Addressing stranded assets and utility financial viability',
        'Ensuring just transition for coal-dependent regions'
      ],
      adaptations: [
        'Shift from feed-in tariffs to auction systems (2017)',
        'Creation of capacity reserve mechanisms',
        'Structural adjustment fund for coal regions (€40 billion)',
        'Hydrogen strategy integration (2020)',
        'European grid interconnection enhancement'
      ]
    },
    outcomes: {
      successes: [
        'Renewable electricity share increased from 6% (2000) to 46% (2022)',
        'Over 900 citizen energy cooperatives formed',
        'Global technology leadership in solar and wind manufacturing (early phase)',
        'Demonstrated viability of large-scale renewable integration',
        'Created replicable policy models adopted internationally'
      ],
      limitations: [
        'Emissions reductions slower than targeted due to coal persistence',
        'Higher electricity prices than EU average',
        'Grid congestion requiring expensive redispatch',
        'Loss of solar manufacturing to China',
        'Regional inequality in transition benefits'
      ],
      unexpectedResults: [
        'Utility business model disruption more severe than anticipated',
        'Citizen ownership became dominant force (not foreseen in policy design)',
        'Negative wholesale electricity prices during high renewable production',
        'Political backlash creating renewable deployment slowdown (2018-2020)'
      ],
      metrics: [
        { label: 'Renewable Share', before: '6% (2000)', after: '46% (2022)' },
        { label: 'Nuclear Share', before: '30% (2000)', after: '6% (2022)' },
        { label: 'CO2 Emissions (energy)', before: '383 Mt (2000)', after: '247 Mt (2022)' },
        { label: 'Renewable Jobs', before: '~30,000 (2000)', after: '~300,000 (2022)' },
        { label: 'Citizen Ownership', before: 'Minimal', after: '~42% of capacity' }
      ]
    },
    lessonsLearned: [
      'Stable, long-term policy frameworks are essential for investor confidence',
      'Decentralized ownership can accelerate transition but complicates coordination',
      'Grid infrastructure investment must parallel generation capacity additions',
      'Social acceptance requires visible local benefits and fair cost distribution',
      'Incumbent resistance is inevitable but manageable with political will',
      'Transition timelines are typically longer than initial projections',
      'Catalytic events can accelerate but also create path dependencies',
      'Just transition measures for affected communities are politically necessary'
    ],
    implications: 'The Energiewende demonstrates that national-scale energy system transitions are technically and politically feasible, while revealing the complexity of managing multiple simultaneous transformations. Key Exodological insights include the importance of opening political windows during catalytic events, the power of distributed ownership in building transition constituencies, and the necessity of adaptive governance as unexpected dynamics emerge. The case underscores that transitions are non-linear, contested, and require sustained political commitment over decades.',
    references: [
      { title: 'The German Energiewende: History and Status Quo', author: 'Hake et al.', year: 2015, type: 'Journal Article' },
      { title: 'Germany\'s Energy Transition: A Comparative Perspective', author: 'Beveridge & Kern', year: 2013, type: 'Book Chapter' },
      { title: 'The Political Economy of Energy Transition', author: 'Geels et al.', year: 2017, type: 'Journal Article' },
      { title: 'Energiewende: The German Energy Transition', author: 'Morris & Jungjohann', year: 2016, type: 'Book' }
    ],
    contributors: ['Prof. Maria Steinberg', 'Dr. Klaus Weber', 'Exodology Research Collective'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'cuba-urban-agriculture',
    title: 'Cuba\'s Urban Agriculture Revolution',
    subtitle: 'Crisis-Driven Food System Transformation',
    category: 'agricultural',
    scale: 'national',
    duration: '1989-2005',
    location: 'Cuba',
    year: 1989,
    status: 'completed',
    summary: 'Following the Soviet collapse, Cuba underwent a rapid, unplanned transition from industrial to organic urban agriculture. This case represents a paradigmatic example of crisis-catalyzed system transformation, demonstrating both the potential and limitations of rapid adaptive change under extreme pressure.',
    context: {
      background: 'Cuba\'s pre-1989 agricultural system was heavily industrialized and dependent on Soviet imports: petroleum for mechanization, synthetic fertilizers, pesticides, and animal feed. When the Soviet Union collapsed, Cuba lost 80% of its import capacity virtually overnight, triggering what the government termed the "Special Period."',
      initialSystem: 'Highly mechanized, monoculture-based state farms producing sugar for export. Food security dependent on imports (57% of calories). Centralized distribution through state channels. Minimal urban food production.',
      pressures: [
        'Loss of 80% of import capacity (1989-1992)',
        'Petroleum availability dropped 53%',
        'Fertilizer imports dropped 77%',
        'Food availability dropped 30-50%',
        'Average caloric intake fell from 2,900 to 1,800 calories/day',
        'US embargo intensification'
      ],
      stakeholders: [
        'Cuban government (planning and resources)',
        'Urban residents (labor and consumption)',
        'Scientists and agricultural researchers',
        'State farm workers transitioning to urban gardens',
        'International solidarity organizations',
        'Local community organizations (CDRs)'
      ]
    },
    exodologicalAnalysis: {
      transitionType: 'Crisis-Induced Rapid Restructuring',
      phaseIdentification: 'Compressed transition phases: Shock/Destabilization (1989-1993), Rapid Reorganization (1993-1998), Consolidation (1998-2005). The crisis compressed what might have been decades of gradual transition into approximately five years of intensive transformation.',
      keyMechanisms: [
        'State resource reallocation to urban agriculture',
        'Land reform enabling urban growing spaces',
        'Knowledge networks disseminating agroecological techniques',
        'Emergence of organoponicos (raised-bed urban gardens)',
        'Local markets incentivizing production',
        'Scientist-farmer collaboration for biological pest control'
      ],
      resistancePatterns: [
        'Initial bureaucratic resistance to decentralization',
        'Skills gap among urban population for agricultural work',
        'Infrastructure limitations (water, tools, seeds)',
        'Quality concerns in biological input production',
        'Distribution system adaptation challenges'
      ],
      catalyticEvents: [
        'Soviet collapse (1989) - systemic shock',
        'Tightening of US embargo (1992) - external pressure',
        'Food crisis peak (1993-1994) - necessity driver',
        'Government policy shift to prioritize urban agriculture (1994)',
        'First organoponico success demonstrations (1994-1995)'
      ]
    },
    implementation: {
      approach: 'Emergency adaptive response combining top-down resource allocation with bottom-up innovation. State provided land, materials, and technical support while local initiatives drove experimentation and adaptation.',
      timeline: [
        { phase: 'Crisis Onset', duration: '1989-1992', activities: 'Soviet collapse, import crisis, initial food shortages, scattered survival gardens' },
        { phase: 'Organized Response', duration: '1993-1995', activities: 'Government urban agriculture program, first organoponicos, agroecology research scaling' },
        { phase: 'Rapid Expansion', duration: '1995-1998', activities: 'Thousands of urban gardens established, distribution systems created, training programs launched' },
        { phase: 'Maturation', duration: '1998-2005', activities: 'Productivity optimization, market integration, institutional stabilization' }
      ],
      challenges: [
        'Severe input scarcity (petroleum, chemicals, equipment)',
        'Knowledge gap in organic/agroecological methods',
        'Water infrastructure for urban irrigation',
        'Land access in densely built urban areas',
        'Initial low productivity and quality issues'
      ],
      adaptations: [
        'Development of biological pest control production centers',
        'Vermiculture for organic fertilizer production',
        'Raised-bed systems (organoponicos) for contaminated or paved areas',
        'Intensive intercropping and succession planting',
        'Local seed saving and exchange networks'
      ]
    },
    outcomes: {
      successes: [
        'Havana producing 50% of its fresh vegetables by 2000',
        'Over 380,000 urban farms and gardens created nationally',
        'Complete transition to organic methods in urban areas',
        'Creation of sustainable model studied internationally',
        'Improved food security and nutritional diversity'
      ],
      limitations: [
        'Limited ability to replace all pre-crisis calories',
        'Continued protein deficiency challenges',
        'Labor-intensive nature limiting scalability',
        'Vulnerability to climate events (hurricanes)',
        'Dependency on state support for inputs'
      ],
      unexpectedResults: [
        'Emergence of cooperative ownership models',
        'Revival of traditional farming knowledge',
        'Health improvements from organic produce access',
        'Community social cohesion benefits',
        'International interest and "agro-tourism"'
      ],
      metrics: [
        { label: 'Urban Vegetable Production (Havana)', before: '<5%', after: '50%+ (2000)' },
        { label: 'Urban Gardens', before: 'Minimal', after: '380,000+ nationwide' },
        { label: 'Organic Production', before: '~0%', after: '~65% of vegetables' },
        { label: 'Agricultural Employment', before: 'Concentrated rural', after: '350,000+ urban' },
        { label: 'Food Self-Sufficiency', before: '43%', after: '~70% (vegetables)' }
      ]
    },
    lessonsLearned: [
      'Crisis can catalyze transformation otherwise considered impossible',
      'Necessity drives rapid innovation and adoption',
      'Scientific-practitioner collaboration accelerates knowledge transfer',
      'Decentralization can emerge even in centralized political systems',
      'Urban spaces contain significant underutilized agricultural potential',
      'Agroecological methods can achieve high productivity at scale',
      'Social organization is as important as technical solutions',
      'Transitions under duress have different dynamics than planned transitions'
    ],
    implications: 'Cuba\'s experience offers crucial Exodological insights into crisis-driven transitions. It demonstrates that societies can reorganize fundamental systems rapidly when survival demands it, but also that such transitions carry high human costs and may not be fully replicable under non-crisis conditions. The case highlights the importance of pre-existing social organization, scientific capacity, and government responsiveness in enabling rapid adaptation. It challenges assumptions about the time required for agricultural transitions and demonstrates the viability of agroecological approaches at urban scale.',
    references: [
      { title: 'Sustainable Agriculture and Resistance: Transforming Food Production in Cuba', author: 'Funes et al.', year: 2002, type: 'Book' },
      { title: 'Cuba\'s Urban Agriculture Movement', author: 'Altieri & Funes-Monzote', year: 2012, type: 'Journal Article' },
      { title: 'The Power of Community: How Cuba Survived Peak Oil', author: 'Morgan', year: 2006, type: 'Documentary' }
    ],
    contributors: ['Dr. Fernando Funes-Monzote', 'Prof. Miguel Altieri', 'Exodology Research Collective'],
    lastUpdated: '2024-02-20'
  },
  {
    id: 'rotterdam-climate-adaptation',
    title: 'Rotterdam Climate Adaptation Program',
    subtitle: 'Urban Infrastructure System Transformation',
    category: 'urban',
    scale: 'regional',
    duration: '2008-present',
    location: 'Rotterdam, Netherlands',
    year: 2008,
    status: 'ongoing',
    summary: 'Rotterdam\'s comprehensive approach to climate adaptation represents a proactive, planned system transition addressing sea level rise, extreme precipitation, and urban heat. The city has systematically transformed its relationship with water from resistance to integration.',
    context: {
      background: 'Rotterdam, Europe\'s largest port, sits largely below sea level in the Rhine-Meuse delta. Traditional Dutch water management focused on keeping water out through dikes and pumping. Climate change projections indicated this approach would become increasingly inadequate and expensive.',
      initialSystem: 'Conventional "grey infrastructure" water management: dikes, pumping stations, underground drainage. Separation between water management and urban planning. Reactive approach to flooding events.',
      pressures: [
        'Sea level rise projections (0.5-1m by 2100)',
        'Increased precipitation intensity and frequency',
        'Urban heat island intensification',
        'Aging infrastructure requiring replacement',
        'EU Water Framework Directive requirements',
        'Delta Committee recommendations (2008)'
      ],
      stakeholders: [
        'City of Rotterdam (municipal government)',
        'Water boards (regional water authorities)',
        'Port of Rotterdam (economic driver)',
        'Residents and businesses',
        'Knowledge institutions (TU Delft, UNESCO-IHE)',
        'Insurance industry',
        'Real estate developers'
      ]
    },
    exodologicalAnalysis: {
      transitionType: 'Anticipatory Paradigm Shift',
      phaseIdentification: 'Currently in Advanced Implementation Phase. Visioning/Planning (2005-2010), Pilot Projects (2010-2015), Mainstreaming (2015-present). Notable for being driven by anticipated rather than realized crisis.',
      keyMechanisms: [
        'Integrated spatial planning linking water and urban development',
        'Multi-functional infrastructure design (water squares, green roofs)',
        'Public-private partnership financing models',
        'Knowledge platform connecting research and practice',
        'Citizen engagement and co-design processes',
        'Regulatory integration requiring climate adaptation in development'
      ],
      resistancePatterns: [
        'Initial skepticism about urgency from some sectors',
        'Higher upfront costs for adaptive infrastructure',
        'Coordination challenges across jurisdictional boundaries',
        'Property owner resistance to green roof requirements',
        'Tension between port expansion and adaptation needs'
      ],
      catalyticEvents: [
        'Delta Committee report (2008) - authoritative framing',
        'Extreme rainfall events (2011, 2014) - tangible demonstrations',
        'Rotterdam Climate Initiative launch (2007) - political commitment',
        'EU Mayors Adapt initiative (2014) - network effects',
        'Paris Agreement (2015) - international framework'
      ]
    },
    implementation: {
      approach: 'Long-term strategic planning with incremental implementation, emphasizing multi-functional solutions that provide co-benefits beyond climate adaptation. Strong emphasis on knowledge development and international exchange.',
      timeline: [
        { phase: 'Foundation', duration: '2005-2010', activities: 'Rotterdam Climate Proof program launch, vulnerability assessments, strategy development' },
        { phase: 'Demonstration', duration: '2010-2015', activities: 'Pilot projects (water squares, green roofs), monitoring and evaluation, citizen engagement' },
        { phase: 'Scaling', duration: '2015-2020', activities: 'Policy mainstreaming, regulatory requirements, private sector integration' },
        { phase: 'Maturation', duration: '2020-present', activities: 'District-scale implementation, international knowledge sharing, strategy updating' }
      ],
      challenges: [
        'Integrating adaptation into existing urban fabric',
        'Financing long-term infrastructure investments',
        'Balancing adaptation with other urban priorities',
        'Maintaining political commitment across electoral cycles',
        'Coordinating with regional and national water management'
      ],
      adaptations: [
        'Water squares designed as public amenities during dry periods',
        'Green roof subsidies and eventual requirements',
        'Floating urban development prototypes',
        'Underground water storage in parking garages',
        'Cool corridors integrating green and blue infrastructure'
      ]
    },
    outcomes: {
      successes: [
        'Over 200,000 m² of green roofs installed by 2020',
        'Water squares managing millions of liters during peak events',
        'Reduced urban heat island effect in adapted areas',
        'Rotterdam recognized as global leader in urban adaptation',
        'Knowledge export generating economic and diplomatic value'
      ],
      limitations: [
        'High-risk areas still require traditional protection',
        'Adaptation retrofitting slower than new construction integration',
        'Socioeconomic disparities in adaptation investment',
        'Full system transformation still decades away',
        'Some solutions untested at extreme climate scenarios'
      ],
      unexpectedResults: [
        'Strong real estate market interest in adapted properties',
        'Public space quality improvements beyond adaptation benefits',
        'Youth engagement through education programs',
        'International city network influence on EU policy'
      ],
      metrics: [
        { label: 'Green Roof Coverage', before: 'Minimal', after: '200,000+ m²' },
        { label: 'Water Storage Capacity', before: 'Conventional drainage', after: '+25 million liters' },
        { label: 'Combined Sewer Overflow Events', before: '~10/year', after: '~4/year' },
        { label: 'Urban Tree Canopy', before: 'Declining', after: '+20% in target areas' }
      ]
    },
    lessonsLearned: [
      'Anticipatory transitions require compelling narratives about future risks',
      'Multi-functional solutions build broader coalitions of support',
      'Visible demonstration projects accelerate adoption',
      'Long-term commitment requires institutional embedding',
      'Knowledge development and sharing strengthens implementation',
      'Co-benefits (livability, aesthetics) may matter more than primary function',
      'Incremental implementation allows learning and adjustment',
      'International networks provide validation and learning opportunities'
    ],
    implications: 'Rotterdam demonstrates that proactive, anticipatory system transitions are possible when supported by credible risk assessments, political leadership, and innovative solutions that provide co-benefits. The case offers Exodological insights into how transitions can be initiated before crisis, the role of knowledge institutions in supporting change, and the importance of making adaptation visible and valuable beyond its primary function. It also illustrates the longer timescales and different dynamics of planned versus crisis-driven transitions.',
    references: [
      { title: 'Rotterdam Climate Change Adaptation Strategy', author: 'City of Rotterdam', year: 2013, type: 'Report' },
      { title: 'Urban Climate Adaptation in the Netherlands', author: 'Runhaar et al.', year: 2012, type: 'Journal Article' },
      { title: 'Climate Adaptation and Flood Risk in Coastal Cities', author: 'Aerts et al.', year: 2014, type: 'Book' }
    ],
    contributors: ['Dr. Arnoud Molenaar', 'Rotterdam Climate Initiative Team', 'Exodology Research Collective'],
    lastUpdated: '2024-03-10'
  },
  {
    id: 'denmark-wind-power',
    title: 'Denmark\'s Wind Power Transition',
    subtitle: 'From Oil Dependency to Wind Leadership',
    category: 'energy',
    scale: 'national',
    duration: '1973-2020',
    location: 'Denmark',
    year: 1973,
    status: 'completed',
    summary: 'Denmark\'s transformation from near-total oil dependency to generating over 50% of electricity from wind represents a multi-decade transition shaped by oil crises, anti-nuclear movements, cooperative ownership, and sustained industrial policy.',
    context: {
      background: 'In 1973, Denmark imported 99% of its energy, primarily as oil. The oil crisis exposed this vulnerability, while the global anti-nuclear movement found strong expression in Danish society, closing off the nuclear path taken by neighbors.',
      initialSystem: 'Centralized electricity system based on imported oil and coal. Large utilities controlling generation. Minimal renewable energy or energy efficiency focus.',
      pressures: [
        'Oil price shocks (1973, 1979)',
        'Energy import dependency vulnerability',
        'Strong anti-nuclear public opinion',
        'Environmental movement growth',
        'Rural development concerns',
        'Industrial policy for technology leadership'
      ],
      stakeholders: [
        'Danish government',
        'Wind turbine cooperatives',
        'Risø National Laboratory',
        'Emerging wind industry (Vestas, etc.)',
        'Utilities (reluctant initially)',
        'Rural communities',
        'Environmental organizations'
      ]
    },
    exodologicalAnalysis: {
      transitionType: 'Gradual Paradigm Shift with Niche Development',
      phaseIdentification: 'Full transition arc from Destabilization (1973-1979) through Niche Formation (1979-1990), Acceleration (1990-2005), and Consolidation (2005-2020).',
      keyMechanisms: [
        'R&D investment through national laboratory',
        'Feed-in tariffs guaranteeing prices',
        'Cooperative ownership enabling local investment',
        'Distance rules limiting utility-scale initially',
        'Technology learning and cost reduction',
        'Export market development'
      ],
      resistancePatterns: [
        'Utility skepticism and reluctant integration',
        'Intermittency management challenges',
        'Aesthetic objections (visual impact)',
        'Grid integration costs',
        'Competition from gas post-North Sea development'
      ],
      catalyticEvents: [
        'First oil crisis (1973) - initial shock',
        'Anti-nuclear movement victory (late 1970s)',
        'Government R&D commitment (1979)',
        'First feed-in tariff (1981)',
        'Offshore development breakthrough (1991)'
      ]
    },
    implementation: {
      approach: 'Long-term industrial policy combining R&D investment, market creation through feed-in tariffs, and enabling frameworks for cooperative ownership.',
      timeline: [
        { phase: 'Crisis Response', duration: '1973-1979', activities: 'Energy conservation measures, oil alternatives exploration, anti-nuclear decision' },
        { phase: 'Technology Development', duration: '1979-1990', activities: 'Risø test station, early commercial turbines, cooperative wind farms, first incentives' },
        { phase: 'Market Growth', duration: '1990-2005', activities: 'Feed-in tariff expansion, industry scaling, offshore development, export growth' },
        { phase: 'System Integration', duration: '2005-2020', activities: 'Grid modernization, electricity market integration, 50%+ wind share achievement' }
      ],
      challenges: [
        'Initial technology reliability issues',
        'Utility resistance to grid access',
        'Managing variable generation',
        'Balancing domestic deployment with export focus',
        'Maintaining political support through governments'
      ],
      adaptations: [
        'Grid interconnections with Nordic neighbors',
        'Flexible power plants for balancing',
        'Electricity market design for variable renewables',
        'Offshore expansion when onshore saturated',
        'Power-to-X strategies for sector coupling'
      ]
    },
    outcomes: {
      successes: [
        'Wind provides 50%+ of Danish electricity (2020)',
        'Global leader in wind technology and exports',
        'Vestas and Ørsted among global industry leaders',
        'Near-complete phase-out of coal',
        'Model for wind development adopted globally'
      ],
      limitations: [
        'Total energy still includes significant oil (transport)',
        'Relies on interconnections for system balancing',
        'High electricity prices relative to some neighbors',
        'Rural-urban divide in transition benefits'
      ],
      unexpectedResults: [
        'Emergence of globally competitive industry',
        'Offshore wind becoming major export',
        'Attraction of international investment',
        'Influence on EU renewable policy'
      ],
      metrics: [
        { label: 'Wind Share of Electricity', before: '0% (1973)', after: '50%+ (2020)' },
        { label: 'Oil Dependency', before: '99% of energy', after: '<15% of energy' },
        { label: 'Wind Industry Jobs', before: '0', after: '33,000+' },
        { label: 'Wind Turbine Exports', before: '0', after: '€8+ billion/year' }
      ]
    },
    lessonsLearned: [
      'Multi-decade transitions require sustained political commitment',
      'Crisis can open policy windows but follow-through matters more',
      'Cooperative ownership builds enduring social acceptance',
      'R&D investment creates technology leadership opportunities',
      'Industrial policy can shape global industries',
      'Grid integration challenges intensify with scale',
      'Anti-nuclear movements can enable rather than obstruct transitions'
    ],
    implications: 'Denmark\'s wind transition illustrates the full arc of a successful energy system transformation over nearly five decades. Key Exodological insights include the importance of crisis in opening political windows, the role of distributed ownership in building and maintaining transition constituencies, and the value of patient industrial policy. The case demonstrates that transitions to renewable energy are not merely technical but profoundly political and social, requiring alignment of institutions, ownership structures, and public narratives.',
    references: [
      { title: 'The Danish Wind Industry: A Success Story', author: 'Meyer', year: 2007, type: 'Journal Article' },
      { title: 'Windfall: The Booming Business of Rural Wind Farms', author: 'Gipe', year: 2004, type: 'Book' },
      { title: 'Danish Energy Policy 1970-2010', author: 'Danish Energy Agency', year: 2011, type: 'Report' }
    ],
    contributors: ['Dr. Preben Maegaard', 'Dr. Niels Meyer', 'Exodology Research Collective'],
    lastUpdated: '2024-01-30'
  },
  {
    id: 'bhutan-gross-national-happiness',
    title: 'Bhutan\'s Gross National Happiness Framework',
    subtitle: 'National Development Paradigm Transformation',
    category: 'institutional',
    scale: 'national',
    duration: '1972-present',
    location: 'Bhutan',
    year: 1972,
    status: 'ongoing',
    summary: 'Bhutan\'s adoption of Gross National Happiness (GNH) as an alternative to GDP represents a fundamental paradigm shift in national development philosophy. This case examines how a small nation challenged dominant development metrics and institutionalized alternative measures of progress.',
    context: {
      background: 'When Bhutan began opening to the modern world in the 1960s-70s, its King observed the social disruption modernization had caused in neighboring countries. This led to a deliberate choice to pursue development differently, formally articulated as GNH in 1972.',
      initialSystem: 'Traditional Buddhist kingdom largely isolated from modern development paradigms. Limited formal economy, subsistence agriculture, strong cultural and religious institutions.',
      pressures: [
        'Modernization pressures from globalization',
        'Neighboring countries\' development patterns',
        'Youth aspirations for economic opportunities',
        'Need for international engagement and investment',
        'Preservation of cultural identity',
        'Environmental conservation imperatives'
      ],
      stakeholders: [
        'Bhutanese monarchy',
        'Government ministries',
        'Centre for Bhutan Studies',
        'International development agencies',
        'Buddhist monastic institutions',
        'Rural communities',
        'Youth population'
      ]
    },
    exodologicalAnalysis: {
      transitionType: 'Paradigmatic Innovation and Institutional Embedding',
      phaseIdentification: 'Conceptualization (1972-1990), Operationalization (1990-2008), Institutionalization (2008-present). Remarkably deliberate and planned transition with strong political continuity.',
      keyMechanisms: [
        'Royal leadership and continuity',
        'Constitutional embedding of GNH principles',
        'GNH screening of all policies and projects',
        'Regular national GNH surveys',
        'Integration into planning and budgeting processes',
        'International advocacy creating external validation'
      ],
      resistancePatterns: [
        'International skepticism and criticism',
        'Internal tensions between GNH and economic aspirations',
        'Youth unemployment challenges',
        'Difficulty quantifying subjective wellbeing',
        'Balancing tradition with modernization'
      ],
      catalyticEvents: [
        'Fourth King\'s GNH declaration (1972)',
        'First GNH Commission established (1998)',
        'GNH Index developed (2008)',
        'Constitutional incorporation (2008)',
        'UN resolution on happiness (2011)'
      ]
    },
    implementation: {
      approach: 'Top-down paradigm introduction with gradual operationalization and institutionalization. Unique combination of royal authority, democratic transition, and technocratic development of measurement tools.',
      timeline: [
        { phase: 'Conceptualization', duration: '1972-1990', activities: 'Philosophical articulation, initial policy orientation, gradual modernization' },
        { phase: 'Operationalization', duration: '1990-2008', activities: 'Four pillars defined, GNH Commission, beginning of measurement development' },
        { phase: 'Institutionalization', duration: '2008-present', activities: 'Constitution, GNH Index, policy screening, democratic integration' }
      ],
      challenges: [
        'Translating philosophy into measurable policy',
        'Balancing cultural preservation with youth aspirations',
        'Managing tourist economy sustainably',
        'Addressing inequalities within GNH framework',
        'Maintaining distinctiveness while engaging globally'
      ],
      adaptations: [
        'Development of 9-domain GNH Index',
        'Policy screening tool for all government initiatives',
        'Environmental conservation as GNH pillar',
        'High-value, low-volume tourism policy',
        'Free education and healthcare as GNH implementation'
      ]
    },
    outcomes: {
      successes: [
        '97% forest cover maintained',
        'Free education and healthcare achieved',
        'Constitutional democracy established (2008)',
        'International influence on wellbeing measures',
        'Distinct national identity preserved during modernization'
      ],
      limitations: [
        'Youth unemployment remains significant',
        'Rural-urban development disparities',
        'Some citizens prioritize economic development',
        'External economic dependencies persist',
        'Replication challenges for other nations'
      ],
      unexpectedResults: [
        'Global interest in alternative development metrics',
        'Diplomatic soft power from GNH leadership',
        'Attraction of values-aligned tourists and researchers',
        'Influence on UN sustainable development discussions'
      ],
      metrics: [
        { label: 'Forest Coverage', before: 'High', after: '97% maintained' },
        { label: 'GNH Survey Sufficiency', before: 'N/A', after: '91% sufficiently happy (2015)' },
        { label: 'Carbon Status', before: 'N/A', after: 'Net carbon negative' },
        { label: 'Life Expectancy', before: '~45 years (1970)', after: '71 years (2020)' }
      ]
    },
    lessonsLearned: [
      'Paradigm shifts require authoritative champions and institutional continuity',
      'Alternative metrics need operational tools to influence policy',
      'Cultural grounding strengthens transition resilience',
      'Small nations can pioneer paradigm innovations',
      'Constitutional embedding protects transitions from political cycles',
      'Tensions between traditional values and modern aspirations require ongoing negotiation',
      'International advocacy can reinforce domestic legitimacy'
    ],
    implications: 'Bhutan\'s GNH case offers unique Exodological insights into paradigmatic transitions at the level of fundamental development philosophy. It demonstrates that alternatives to dominant paradigms can be institutionalized, but require exceptional political conditions (in this case, respected monarchy transitioning to democracy). The case raises questions about replicability while providing concrete tools (GNH Index, policy screening) that have influenced wellbeing measurement globally. It illustrates how transitions in measurement paradigms can precede and enable transitions in material practices.',
    references: [
      { title: 'Happiness: Lessons from a New Science', author: 'Layard', year: 2005, type: 'Book' },
      { title: 'GNH and Development: An Overview', author: 'Ura et al.', year: 2012, type: 'Report' },
      { title: 'Bhutan\'s Gross National Happiness Index', author: 'Centre for Bhutan Studies', year: 2015, type: 'Report' }
    ],
    contributors: ['Dr. Karma Ura', 'Centre for Bhutan Studies', 'Exodology Research Collective'],
    lastUpdated: '2024-02-15'
  }
]

// Categories for filtering
export const caseStudyCategories = {
  energy: { name: 'Energy Systems', icon: 'Zap', color: 'amber' },
  urban: { name: 'Urban Systems', icon: 'Building', color: 'blue' },
  agricultural: { name: 'Agricultural Systems', icon: 'Leaf', color: 'green' },
  industrial: { name: 'Industrial Systems', icon: 'Factory', color: 'slate' },
  institutional: { name: 'Institutional Systems', icon: 'Landmark', color: 'purple' },
  technological: { name: 'Technological Systems', icon: 'Cpu', color: 'cyan' }
}

// Analysis template for standardized case study structure
export const caseStudyTemplate = {
  sections: [
    { id: 'context', name: 'Context & Background', description: 'Historical background, initial system state, pressures, and stakeholders' },
    { id: 'analysis', name: 'Exodological Analysis', description: 'Transition type, phase identification, key mechanisms, resistance patterns' },
    { id: 'implementation', name: 'Implementation', description: 'Approach, timeline, challenges, and adaptations' },
    { id: 'outcomes', name: 'Outcomes', description: 'Successes, limitations, unexpected results, and metrics' },
    { id: 'lessons', name: 'Lessons & Implications', description: 'Key takeaways and broader implications for Exodology' }
  ],
  transitionTypes: [
    'Paradigmatic Shift',
    'Structural Reconfiguration',
    'Crisis-Induced Restructuring',
    'Anticipatory Transition',
    'Gradual Evolution',
    'Technology-Driven Transformation'
  ],
  phases: [
    'Pre-Development',
    'Destabilization',
    'Acceleration',
    'Stabilization',
    'Consolidation'
  ]
}
