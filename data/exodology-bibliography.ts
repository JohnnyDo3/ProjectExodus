// Exodology Academic Bibliography
// Curated reading lists organized by topic and level

export interface BibliographyEntry {
  id: string
  title: string
  authors: string[]
  year: number
  type: 'book' | 'article' | 'chapter' | 'report' | 'thesis' | 'working-paper'
  publication?: string
  publisher?: string
  doi?: string
  url?: string
  abstract: string
  topics: string[]
  level: 'foundational' | 'intermediate' | 'advanced'
  relevance: string
  keyInsights: string[]
}

export interface ReadingList {
  id: string
  name: string
  description: string
  topics: string[]
  level: 'foundational' | 'intermediate' | 'advanced'
  entries: string[] // Reference to entry IDs
}

// Core Bibliography Entries
export const bibliographyEntries: BibliographyEntry[] = [
  // TRANSITIONS THEORY
  {
    id: 'geels-2002',
    title: 'Technological Transitions as Evolutionary Reconfiguration Processes: A Multi-level Perspective and a Case-study',
    authors: ['Frank W. Geels'],
    year: 2002,
    type: 'article',
    publication: 'Research Policy',
    doi: '10.1016/S0048-7333(02)00062-8',
    abstract: 'This paper introduces the multi-level perspective (MLP) on technological transitions, arguing that transitions occur through interactions between processes at three levels: niche innovations, socio-technical regimes, and socio-technical landscapes.',
    topics: ['transitions-theory', 'multi-level-perspective', 'technological-change'],
    level: 'foundational',
    relevance: 'Foundational text for understanding how system transitions occur through niche-regime-landscape interactions. Core theoretical framework for Exodology.',
    keyInsights: [
      'Transitions require alignment of developments at multiple levels',
      'Niches serve as protected spaces for radical innovation',
      'Regimes provide stability but also create lock-in',
      'Landscape pressures can destabilize existing regimes'
    ]
  },
  {
    id: 'geels-schot-2007',
    title: 'Typology of Sociotechnical Transition Pathways',
    authors: ['Frank W. Geels', 'Johan Schot'],
    year: 2007,
    type: 'article',
    publication: 'Research Policy',
    doi: '10.1016/j.respol.2007.01.003',
    abstract: 'Building on the MLP, this paper develops a typology of four transition pathways: transformation, reconfiguration, technological substitution, and de-alignment/re-alignment.',
    topics: ['transitions-theory', 'transition-pathways', 'typology'],
    level: 'foundational',
    relevance: 'Essential for classifying different types of system transitions and understanding their distinct dynamics.',
    keyInsights: [
      'Different transition pathways have different dynamics and outcomes',
      'Timing of niche development relative to landscape pressure matters',
      'Incumbent actors can play different roles depending on pathway',
      'Multiple pathways may combine in actual transitions'
    ]
  },
  {
    id: 'meadows-2008',
    title: 'Thinking in Systems: A Primer',
    authors: ['Donella H. Meadows'],
    year: 2008,
    type: 'book',
    publisher: 'Chelsea Green Publishing',
    abstract: 'An accessible introduction to systems thinking, covering stocks and flows, feedback loops, system archetypes, and leverage points for system change.',
    topics: ['systems-thinking', 'feedback-loops', 'leverage-points'],
    level: 'foundational',
    relevance: 'Essential foundation for understanding systems dynamics that underlie all transitions. Accessible entry point to systems thinking.',
    keyInsights: [
      'Systems are more than the sum of their parts',
      'Feedback loops drive system behavior',
      'Leverage points vary dramatically in effectiveness',
      'System structure determines behavior patterns'
    ]
  },
  {
    id: 'meadows-1999',
    title: 'Leverage Points: Places to Intervene in a System',
    authors: ['Donella H. Meadows'],
    year: 1999,
    type: 'article',
    publication: 'Sustainability Institute',
    url: 'http://donellameadows.org/archives/leverage-points-places-to-intervene-in-a-system/',
    abstract: 'Identifies twelve leverage points for intervening in systems, ranked from least to most effective, culminating in paradigm change.',
    topics: ['systems-thinking', 'leverage-points', 'intervention-strategies'],
    level: 'foundational',
    relevance: 'Critical for understanding where and how to intervene in systems to catalyze transitions. Directly applicable to Exodological practice.',
    keyInsights: [
      'Parameters are often least effective leverage points',
      'Paradigms are the most powerful but hardest to change',
      'Goals of the system shape all other dynamics',
      'Self-organization capacity is a high-leverage point'
    ]
  },
  {
    id: 'grin-2010',
    title: 'Transitions to Sustainable Development: New Directions in the Study of Long Term Transformative Change',
    authors: ['John Grin', 'Jan Rotmans', 'Johan Schot'],
    year: 2010,
    type: 'book',
    publisher: 'Routledge',
    abstract: 'Comprehensive overview of transition studies, integrating insights from innovation studies, institutional theory, and governance studies.',
    topics: ['transitions-theory', 'sustainability-transitions', 'governance'],
    level: 'intermediate',
    relevance: 'Comprehensive reference integrating multiple theoretical perspectives on transitions.',
    keyInsights: [
      'Transitions require co-evolution of technology, institutions, and practices',
      'Transition management offers governance approaches for navigating transitions',
      'Historical transitions provide lessons for contemporary challenges',
      'Multi-stakeholder processes are essential for legitimacy'
    ]
  },
  // RESILIENCE AND ADAPTATION
  {
    id: 'walker-salt-2006',
    title: 'Resilience Thinking: Sustaining Ecosystems and People in a Changing World',
    authors: ['Brian Walker', 'David Salt'],
    year: 2006,
    type: 'book',
    publisher: 'Island Press',
    abstract: 'Introduces resilience thinking for managing complex social-ecological systems, emphasizing adaptive capacity, transformability, and thresholds.',
    topics: ['resilience', 'social-ecological-systems', 'adaptation'],
    level: 'foundational',
    relevance: 'Core concepts of resilience, adaptation, and transformation directly applicable to Exodology.',
    keyInsights: [
      'Resilience is not about returning to previous state but maintaining function',
      'Systems have thresholds beyond which they reorganize',
      'Adaptive capacity enables response to change',
      'Transformability allows fundamental system change when needed'
    ]
  },
  {
    id: 'folke-2006',
    title: 'Resilience: The Emergence of a Perspective for Social-Ecological Systems Analyses',
    authors: ['Carl Folke'],
    year: 2006,
    type: 'article',
    publication: 'Global Environmental Change',
    doi: '10.1016/j.gloenvcha.2006.04.002',
    abstract: 'Reviews the development of resilience thinking and its application to linked social-ecological systems.',
    topics: ['resilience', 'social-ecological-systems', 'complexity'],
    level: 'intermediate',
    relevance: 'Authoritative overview of resilience concepts essential for understanding system dynamics in transitions.',
    keyInsights: [
      'Social and ecological systems are coupled and co-evolving',
      'Diversity enhances resilience',
      'Memory and learning are sources of novelty',
      'Cross-scale interactions matter'
    ]
  },
  {
    id: 'holling-2001',
    title: 'Understanding the Complexity of Economic, Ecological, and Social Systems',
    authors: ['C.S. Holling'],
    year: 2001,
    type: 'article',
    publication: 'Ecosystems',
    doi: '10.1007/s10021-001-0101-5',
    abstract: 'Introduces the panarchy model of nested adaptive cycles, showing how systems at different scales interact through revolt and remember connections.',
    topics: ['panarchy', 'adaptive-cycles', 'complex-systems'],
    level: 'advanced',
    relevance: 'Advanced framework for understanding multi-scale dynamics in system transitions.',
    keyInsights: [
      'Systems cycle through growth, conservation, release, and reorganization',
      'Revolt connections allow small-scale changes to cascade up',
      'Remember connections provide stability and learning from larger scales',
      'Resilience varies throughout the adaptive cycle'
    ]
  },
  // POLITICAL ECONOMY AND POWER
  {
    id: 'scoones-2016',
    title: 'The Politics of Sustainability and Development',
    authors: ['Ian Scoones', 'Melissa Leach', 'Peter Newell'],
    year: 2016,
    type: 'article',
    publication: 'Annual Review of Environment and Resources',
    doi: '10.1146/annurev-environ-110615-090039',
    abstract: 'Examines how power and politics shape sustainability transitions, challenging technocratic approaches.',
    topics: ['political-economy', 'power', 'sustainability-politics'],
    level: 'intermediate',
    relevance: 'Critical for understanding how power dynamics enable or constrain transitions.',
    keyInsights: [
      'Sustainability transitions are inherently political',
      'Different actors benefit and lose from transitions',
      'Narrative framing shapes transition possibilities',
      'Bottom-up movements can challenge incumbent power'
    ]
  },
  {
    id: 'stirling-2014',
    title: 'Transforming Power: Social Science and the Politics of Energy Choices',
    authors: ['Andy Stirling'],
    year: 2014,
    type: 'article',
    publication: 'Energy Research & Social Science',
    doi: '10.1016/j.erss.2014.02.001',
    abstract: 'Critiques narrow techno-economic framings of energy transitions and argues for attention to power, democracy, and plural pathways.',
    topics: ['energy-transitions', 'power', 'democracy', 'pathways'],
    level: 'advanced',
    relevance: 'Essential for understanding how power shapes transition pathways and the importance of democratic participation.',
    keyInsights: [
      'Transition pathways are not neutral but reflect power relations',
      'Diversity of pathways is valuable, not a problem to be resolved',
      'Democratic participation in transition decisions is essential',
      'Incumbent interests actively shape transition framing'
    ]
  },
  // PRACTICE AND GOVERNANCE
  {
    id: 'loorbach-2010',
    title: 'Transition Management for Sustainable Development: A Prescriptive, Complexity-Based Governance Framework',
    authors: ['Derk Loorbach'],
    year: 2010,
    type: 'article',
    publication: 'Governance',
    doi: '10.1111/j.1468-0491.2009.01471.x',
    abstract: 'Presents transition management as a governance approach for navigating sustainability transitions, based on complexity theory and experimentation.',
    topics: ['transition-management', 'governance', 'complexity'],
    level: 'intermediate',
    relevance: 'Key governance framework for practitioners guiding transitions.',
    keyInsights: [
      'Transition management combines long-term vision with short-term experiments',
      'Front-runners can pioneer new practices',
      'Transition arenas bring together diverse stakeholders',
      'Learning-by-doing is central to transition governance'
    ]
  },
  {
    id: 'sengers-2019',
    title: 'Experimentation in the City: Unpacking Notions of Experimentation for Sustainability',
    authors: ['Frans Sengers', 'Anna J. Wieczorek', 'Rob Raven'],
    year: 2019,
    type: 'article',
    publication: 'Environmental Innovation and Societal Transitions',
    doi: '10.1016/j.eist.2018.09.001',
    abstract: 'Analyzes different forms of urban experimentation for sustainability and their roles in transitions.',
    topics: ['urban-transitions', 'experimentation', 'cities'],
    level: 'intermediate',
    relevance: 'Practical insights for designing and implementing transition experiments.',
    keyInsights: [
      'Experiments can test technical, social, and institutional innovations',
      'Embedding and scaling experiments requires deliberate strategies',
      'Urban settings offer fertile ground for transition experimentation',
      'Learning from experiments requires structured reflection'
    ]
  },
  // HISTORICAL PERSPECTIVES
  {
    id: 'smil-2017',
    title: 'Energy Transitions: Global and National Perspectives',
    authors: ['Vaclav Smil'],
    year: 2017,
    type: 'book',
    publisher: 'Praeger',
    abstract: 'Comprehensive historical analysis of energy transitions, from biomass to fossil fuels to renewables, emphasizing their long timescales.',
    topics: ['energy-transitions', 'history', 'timescales'],
    level: 'intermediate',
    relevance: 'Essential historical perspective on transition timescales and patterns.',
    keyInsights: [
      'Energy transitions have historically taken 50-100+ years',
      'Past transitions added new sources rather than fully replacing old ones',
      'Infrastructure lock-in creates path dependencies',
      'Scale of current systems exceeds all historical precedents'
    ]
  },
  {
    id: 'fouquet-2010',
    title: 'The Slow Search for Solutions: Lessons from Historical Energy Transitions by Sector and Service',
    authors: ['Roger Fouquet'],
    year: 2010,
    type: 'article',
    publication: 'Energy Policy',
    doi: '10.1016/j.enpol.2010.06.029',
    abstract: 'Examines historical energy transitions across different sectors, finding varying timescales and drivers.',
    topics: ['energy-transitions', 'history', 'sectors'],
    level: 'advanced',
    relevance: 'Detailed historical analysis of sector-specific transition dynamics.',
    keyInsights: [
      'Transition speed varies dramatically by sector',
      'Consumer-facing technologies can transition faster',
      'Infrastructure-heavy sectors face longer transitions',
      'Policy can accelerate or delay transitions'
    ]
  },
  // SOCIAL MOVEMENTS AND CIVIL SOCIETY
  {
    id: 'della-porta-diani-2006',
    title: 'Social Movements: An Introduction',
    authors: ['Donatella della Porta', 'Mario Diani'],
    year: 2006,
    type: 'book',
    publisher: 'Blackwell',
    abstract: 'Comprehensive introduction to social movement theory, covering mobilization, framing, political opportunity, and movement outcomes.',
    topics: ['social-movements', 'civil-society', 'mobilization'],
    level: 'foundational',
    relevance: 'Essential for understanding how social movements contribute to transition dynamics.',
    keyInsights: [
      'Movements require resources, opportunities, and framing',
      'Political opportunity structures enable or constrain mobilization',
      'Collective identity is central to sustained action',
      'Movement outcomes extend beyond policy to culture'
    ]
  },
  {
    id: 'hess-2019',
    title: 'Social Movements and Energy Democracy',
    authors: ['David J. Hess'],
    year: 2019,
    type: 'article',
    publication: 'Energy Research & Social Science',
    doi: '10.1016/j.erss.2019.06.023',
    abstract: 'Examines how social movements advance energy democracy through alternative ownership, participation, and justice claims.',
    topics: ['social-movements', 'energy-democracy', 'ownership'],
    level: 'intermediate',
    relevance: 'Links social movement dynamics to transition ownership and governance questions.',
    keyInsights: [
      'Energy democracy encompasses ownership, participation, and justice',
      'Cooperative and community ownership models advance transition goals',
      'Movements combine protest with constructive alternatives',
      'Justice dimensions are increasingly central to transition politics'
    ]
  },
  // JUSTICE AND EQUITY
  {
    id: 'sovacool-2019',
    title: 'Decarbonization and its Discontents: A Critical Energy Justice Perspective on Four Low-carbon Transitions',
    authors: ['Benjamin K. Sovacool', 'Andrew Hook', 'Martina Martiskainen', 'Lucy Baker'],
    year: 2019,
    type: 'article',
    publication: 'Climatic Change',
    doi: '10.1007/s10584-019-02521-7',
    abstract: 'Applies energy justice framework to analyze four low-carbon transitions, revealing distributional, recognition, and procedural justice concerns.',
    topics: ['energy-justice', 'just-transitions', 'equity'],
    level: 'advanced',
    relevance: 'Critical for understanding justice dimensions of transitions.',
    keyInsights: [
      'Transitions can create new injustices while solving old problems',
      'Distributional, recognition, and procedural justice are all important',
      'Frontline communities often bear transition burdens',
      'Justice requires deliberate attention, not automatic outcomes'
    ]
  },
  {
    id: 'newell-mulvaney-2013',
    title: 'The Political Economy of the "Just Transition"',
    authors: ['Peter Newell', 'Dustin Mulvaney'],
    year: 2013,
    type: 'article',
    publication: 'The Geographical Journal',
    doi: '10.1111/geoj.12008',
    abstract: 'Examines the concept of just transition from its labor movement origins to broader sustainability applications.',
    topics: ['just-transitions', 'labor', 'political-economy'],
    level: 'intermediate',
    relevance: 'Historical and conceptual overview of just transition framework.',
    keyInsights: [
      'Just transition originated in labor movement responses to environmental regulation',
      'Concept has expanded to encompass broader social justice concerns',
      'Implementation requires concrete policies and resources',
      'Tension exists between speed of transition and depth of justice'
    ]
  },
  // TECHNOLOGY AND INNOVATION
  {
    id: 'arthur-1989',
    title: 'Competing Technologies, Increasing Returns, and Lock-In by Historical Events',
    authors: ['W. Brian Arthur'],
    year: 1989,
    type: 'article',
    publication: 'The Economic Journal',
    doi: '10.2307/2234208',
    abstract: 'Demonstrates how increasing returns can lead to technological lock-in, where inferior technologies persist due to historical contingency.',
    topics: ['lock-in', 'path-dependence', 'increasing-returns'],
    level: 'advanced',
    relevance: 'Foundational for understanding why transitions away from incumbent technologies are difficult.',
    keyInsights: [
      'Small historical events can determine long-term technological outcomes',
      'Increasing returns create positive feedback reinforcing dominant technologies',
      'Markets may not select optimal technologies',
      'Escaping lock-in requires overcoming accumulated advantages'
    ]
  },
  {
    id: 'unruh-2000',
    title: 'Understanding Carbon Lock-in',
    authors: ['Gregory C. Unruh'],
    year: 2000,
    type: 'article',
    publication: 'Energy Policy',
    doi: '10.1016/S0301-4215(00)00070-7',
    abstract: 'Introduces the concept of carbon lock-in, explaining how technological, institutional, and behavioral systems co-evolve to perpetuate fossil fuel dependence.',
    topics: ['carbon-lock-in', 'fossil-fuels', 'institutions'],
    level: 'foundational',
    relevance: 'Essential concept for understanding barriers to energy transitions.',
    keyInsights: [
      'Lock-in occurs across technological, institutional, and behavioral dimensions',
      'Techno-institutional complexes create systemic persistence',
      'Carbon lock-in explains the gap between technological possibility and actual deployment',
      'Escaping lock-in requires addressing all dimensions simultaneously'
    ]
  }
]

// Curated Reading Lists
export const readingLists: ReadingList[] = [
  {
    id: 'transitions-fundamentals',
    name: 'Transitions Theory Fundamentals',
    description: 'Core theoretical texts for understanding how sociotechnical transitions occur. Essential reading for all Exodology students.',
    topics: ['transitions-theory', 'multi-level-perspective'],
    level: 'foundational',
    entries: ['geels-2002', 'geels-schot-2007', 'grin-2010']
  },
  {
    id: 'systems-thinking-essentials',
    name: 'Systems Thinking Essentials',
    description: 'Foundational texts on systems dynamics, feedback loops, and leverage points for change.',
    topics: ['systems-thinking', 'feedback-loops', 'leverage-points'],
    level: 'foundational',
    entries: ['meadows-2008', 'meadows-1999']
  },
  {
    id: 'resilience-adaptation',
    name: 'Resilience and Adaptation',
    description: 'Key texts on resilience thinking and its application to social-ecological systems.',
    topics: ['resilience', 'adaptation', 'social-ecological-systems'],
    level: 'foundational',
    entries: ['walker-salt-2006', 'folke-2006', 'holling-2001']
  },
  {
    id: 'politics-power-transitions',
    name: 'Politics and Power in Transitions',
    description: 'Critical perspectives on how power relations shape transition pathways and outcomes.',
    topics: ['political-economy', 'power', 'democracy'],
    level: 'intermediate',
    entries: ['scoones-2016', 'stirling-2014', 'newell-mulvaney-2013']
  },
  {
    id: 'governance-practice',
    name: 'Transition Governance and Practice',
    description: 'Practical frameworks for governing and managing transition processes.',
    topics: ['transition-management', 'governance', 'experimentation'],
    level: 'intermediate',
    entries: ['loorbach-2010', 'sengers-2019']
  },
  {
    id: 'historical-perspectives',
    name: 'Historical Perspectives on Transitions',
    description: 'Historical analysis of past transitions providing context for contemporary challenges.',
    topics: ['history', 'energy-transitions', 'timescales'],
    level: 'intermediate',
    entries: ['smil-2017', 'fouquet-2010']
  },
  {
    id: 'justice-equity',
    name: 'Justice and Equity in Transitions',
    description: 'Critical examination of justice dimensions in sustainability transitions.',
    topics: ['just-transitions', 'energy-justice', 'equity'],
    level: 'advanced',
    entries: ['sovacool-2019', 'newell-mulvaney-2013']
  },
  {
    id: 'lock-in-path-dependence',
    name: 'Lock-in and Path Dependence',
    description: 'Understanding why transitions away from incumbent systems are difficult.',
    topics: ['lock-in', 'path-dependence', 'carbon-lock-in'],
    level: 'advanced',
    entries: ['arthur-1989', 'unruh-2000']
  },
  {
    id: 'social-movements-civil-society',
    name: 'Social Movements and Civil Society',
    description: 'The role of movements and civic action in driving transitions.',
    topics: ['social-movements', 'civil-society', 'energy-democracy'],
    level: 'intermediate',
    entries: ['della-porta-diani-2006', 'hess-2019']
  }
]

// Topic areas for organizing bibliography
export const bibliographyTopics = {
  'transitions-theory': { name: 'Transitions Theory', description: 'Theoretical frameworks for understanding sociotechnical transitions' },
  'systems-thinking': { name: 'Systems Thinking', description: 'Concepts and tools for understanding complex systems' },
  'resilience': { name: 'Resilience', description: 'Resilience thinking and adaptive capacity' },
  'political-economy': { name: 'Political Economy', description: 'Power, politics, and economic dimensions of transitions' },
  'governance': { name: 'Governance', description: 'Governance approaches for navigating transitions' },
  'history': { name: 'Historical Studies', description: 'Historical analysis of past transitions' },
  'just-transitions': { name: 'Just Transitions', description: 'Justice and equity in transition processes' },
  'social-movements': { name: 'Social Movements', description: 'The role of movements in driving change' },
  'lock-in': { name: 'Lock-in & Path Dependence', description: 'Understanding persistence and barriers to change' },
  'energy-transitions': { name: 'Energy Transitions', description: 'Specific focus on energy system transitions' },
  'urban-transitions': { name: 'Urban Transitions', description: 'Transitions in urban systems and cities' }
}
