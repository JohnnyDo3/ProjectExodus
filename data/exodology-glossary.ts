// Exodology Glossary
// Comprehensive terminology for the discipline

export interface GlossaryTerm {
  id: string
  term: string
  definition: string
  category: 'core' | 'framework' | 'practice' | 'systems' | 'governance' | 'justice'
  relatedTerms?: string[]
  examples?: string[]
  seeAlso?: string[] // IDs of related terms
  level: 'foundational' | 'intermediate' | 'advanced'
}

export const glossaryTerms: GlossaryTerm[] = [
  // CORE CONCEPTS
  {
    id: 'exodology',
    term: 'Exodology',
    definition: 'The systematic study of how complex systems—social, technical, ecological, and their hybrids—undergo fundamental transformation from one stable state to another. Exodology focuses on understanding and guiding ethical transitions.',
    category: 'core',
    relatedTerms: ['transition', 'system', 'stewardship'],
    level: 'foundational'
  },
  {
    id: 'transition',
    term: 'Transition',
    definition: 'A fundamental transformation of a system from one stable configuration to another. Distinguished from incremental change by its depth, affecting multiple interconnected dimensions (technological, institutional, behavioral, cultural) simultaneously.',
    category: 'core',
    examples: [
      'The shift from horse-drawn transport to automobiles',
      'The ongoing energy transition from fossil fuels to renewables',
      'Agricultural transitions from industrial to sustainable practices'
    ],
    relatedTerms: ['regime-shift', 'transformation'],
    level: 'foundational'
  },
  {
    id: 'system',
    term: 'System',
    definition: 'An interconnected set of elements—technological, institutional, behavioral, and cultural—that function as an integrated whole. Systems exhibit emergent properties that cannot be understood by examining parts in isolation.',
    category: 'core',
    examples: [
      'The food system (farms, processing, distribution, retail, consumers)',
      'The energy system (generation, transmission, distribution, consumption)',
      'The transportation system (vehicles, infrastructure, regulations, behaviors)'
    ],
    level: 'foundational'
  },
  {
    id: 'stewardship',
    term: 'Stewardship',
    definition: 'The practice of intentionally guiding transitions toward beneficial outcomes while maintaining ethical responsibility for consequences. Stewardship acknowledges the limits of control while accepting the obligation to act wisely.',
    category: 'core',
    relatedTerms: ['governance', 'ethics', 'adaptive-management'],
    level: 'foundational'
  },

  // FRAMEWORK TERMS (MLP)
  {
    id: 'regime',
    term: 'Regime',
    definition: 'The dominant, stable configuration of a sociotechnical system, characterized by aligned rules, practices, technologies, and actor networks that reproduce the system over time. Regimes provide stability but also create resistance to change.',
    category: 'framework',
    examples: [
      'The fossil fuel-based energy regime',
      'The industrial agricultural regime',
      'The automobile-centered mobility regime'
    ],
    seeAlso: ['niche', 'landscape'],
    level: 'foundational'
  },
  {
    id: 'niche',
    term: 'Niche',
    definition: 'A protected space where alternative configurations, practices, and technologies can develop shielded from mainstream market selection. Niches serve as incubators for innovations that may eventually challenge or replace regimes.',
    category: 'framework',
    examples: [
      'Early electric vehicle markets supported by subsidies',
      'Organic farming supported by certification schemes',
      'Community energy cooperatives'
    ],
    seeAlso: ['regime', 'niche-innovation'],
    level: 'foundational'
  },
  {
    id: 'landscape',
    term: 'Landscape',
    definition: 'The broader contextual factors that influence but are largely outside the control of regime actors. Landscape elements change slowly and create background conditions that can enable or constrain transitions.',
    category: 'framework',
    examples: [
      'Climate change as a landscape pressure',
      'Demographic shifts',
      'Deep cultural values',
      'Macroeconomic conditions'
    ],
    seeAlso: ['regime', 'niche'],
    level: 'foundational'
  },
  {
    id: 'multi-level-perspective',
    term: 'Multi-Level Perspective (MLP)',
    definition: 'An analytical framework that explains transitions as emerging from interactions between three levels: niches (where innovations develop), regimes (the dominant system configuration), and landscapes (broader contextual factors). Transitions occur when niche innovations break through as regimes destabilize under landscape pressure.',
    category: 'framework',
    seeAlso: ['niche', 'regime', 'landscape'],
    level: 'intermediate'
  },
  {
    id: 'niche-innovation',
    term: 'Niche Innovation',
    definition: 'Novel technologies, practices, or organizational forms that develop in protected spaces and may eventually compete with or replace dominant regime configurations.',
    category: 'framework',
    examples: [
      'Solar PV in early subsidized markets',
      'Car-sharing services challenging car ownership',
      'Plant-based proteins challenging meat production'
    ],
    level: 'intermediate'
  },
  {
    id: 'regime-shift',
    term: 'Regime Shift',
    definition: 'The transformation of a dominant system configuration to a fundamentally different one. Regime shifts involve changes in rules, technologies, actor networks, and practices.',
    category: 'framework',
    level: 'intermediate'
  },

  // SYSTEMS CONCEPTS
  {
    id: 'lock-in',
    term: 'Lock-in',
    definition: 'The condition where systems resist change due to accumulated advantages, interdependencies, and increasing returns. Lock-in operates across technological, institutional, and behavioral dimensions simultaneously.',
    category: 'systems',
    examples: [
      'QWERTY keyboard layout persistence',
      'Fossil fuel infrastructure lock-in',
      'Automobile-dependent urban design'
    ],
    seeAlso: ['path-dependence', 'carbon-lock-in'],
    level: 'foundational'
  },
  {
    id: 'carbon-lock-in',
    term: 'Carbon Lock-in',
    definition: 'The specific form of lock-in that perpetuates fossil fuel dependence through interconnected technological, institutional, and behavioral systems that co-evolved around carbon-intensive energy.',
    category: 'systems',
    seeAlso: ['lock-in'],
    level: 'intermediate'
  },
  {
    id: 'path-dependence',
    term: 'Path Dependence',
    definition: 'The phenomenon where past decisions and developments constrain future possibilities. Historical events can determine which paths remain open, even when those paths are not optimal.',
    category: 'systems',
    seeAlso: ['lock-in'],
    level: 'foundational'
  },
  {
    id: 'feedback-loop',
    term: 'Feedback Loop',
    definition: 'A circular causal chain where outputs of a system become inputs that influence future behavior. Positive (reinforcing) loops amplify change; negative (balancing) loops resist change.',
    category: 'systems',
    examples: [
      'Reinforcing loop: More roads → more driving → more congestion → demand for more roads',
      'Balancing loop: Price increases → reduced demand → price decreases'
    ],
    level: 'foundational'
  },
  {
    id: 'leverage-point',
    term: 'Leverage Point',
    definition: 'A place in a system where a small intervention can produce large effects. Leverage points range from least effective (parameters) to most effective (paradigms).',
    category: 'systems',
    examples: [
      'Low leverage: Adjusting a subsidy level',
      'Medium leverage: Changing the rules of the system',
      'High leverage: Shifting the goals of the system',
      'Highest leverage: Transforming the underlying paradigm'
    ],
    level: 'intermediate'
  },
  {
    id: 'resilience',
    term: 'Resilience',
    definition: 'The capacity of a system to absorb disturbance and reorganize while retaining essentially the same function, structure, and identity. Resilience is not about returning to a previous state but about maintaining core functions.',
    category: 'systems',
    seeAlso: ['adaptive-capacity', 'transformability'],
    level: 'foundational'
  },
  {
    id: 'adaptive-capacity',
    term: 'Adaptive Capacity',
    definition: 'The ability of a system to adjust its responses to changing conditions and to learn from experience. High adaptive capacity enables systems to navigate transitions more effectively.',
    category: 'systems',
    seeAlso: ['resilience'],
    level: 'intermediate'
  },
  {
    id: 'transformability',
    term: 'Transformability',
    definition: 'The capacity to create a fundamentally new system when the existing system is untenable. Unlike resilience (maintaining function), transformability involves deliberately changing to a different system configuration.',
    category: 'systems',
    seeAlso: ['resilience', 'transition'],
    level: 'advanced'
  },
  {
    id: 'threshold',
    term: 'Threshold',
    definition: 'A critical point at which a system shifts to a qualitatively different state. Once crossed, thresholds are often difficult or impossible to reverse.',
    category: 'systems',
    examples: [
      'Climate tipping points',
      'Ecosystem collapse thresholds',
      'Social tipping points for behavior change'
    ],
    level: 'intermediate'
  },
  {
    id: 'emergence',
    term: 'Emergence',
    definition: 'The phenomenon where system-level properties arise from interactions between components that cannot be predicted from the properties of individual parts. Emergent properties are irreducible to lower-level explanations.',
    category: 'systems',
    level: 'advanced'
  },
  {
    id: 'panarchy',
    term: 'Panarchy',
    definition: 'A model of nested adaptive cycles at multiple scales, showing how systems at different levels (local, regional, global) interact. Small-scale changes can cascade upward (revolt), while larger scales provide memory and stability (remember).',
    category: 'systems',
    level: 'advanced'
  },

  // PRACTICE TERMS
  {
    id: 'transition-management',
    term: 'Transition Management',
    definition: 'A governance approach for navigating sustainability transitions that combines long-term vision with short-term experimentation. Key elements include transition arenas, backcasting, and protected niche experiments.',
    category: 'practice',
    level: 'intermediate'
  },
  {
    id: 'transition-arena',
    term: 'Transition Arena',
    definition: 'A small network of frontrunners from different sectors who develop shared visions and initiate transition experiments. Arenas operate outside normal policy processes to enable more radical innovation.',
    category: 'practice',
    seeAlso: ['transition-management'],
    level: 'intermediate'
  },
  {
    id: 'backcasting',
    term: 'Backcasting',
    definition: 'A planning method that starts with defining a desirable future and then works backward to identify the steps and pathways needed to reach that future from the present.',
    category: 'practice',
    level: 'intermediate'
  },
  {
    id: 'transition-experiment',
    term: 'Transition Experiment',
    definition: 'A practical project designed to test new technologies, practices, or social arrangements that could contribute to broader system transition. Experiments generate learning that informs scaling strategies.',
    category: 'practice',
    level: 'intermediate'
  },
  {
    id: 'adaptive-management',
    term: 'Adaptive Management',
    definition: 'An approach that treats interventions as experiments, systematically learning from outcomes and adjusting strategies accordingly. Adaptive management acknowledges uncertainty and builds in mechanisms for course correction.',
    category: 'practice',
    level: 'foundational'
  },
  {
    id: 'frontrunner',
    term: 'Frontrunner',
    definition: 'An individual or organization that pioneers new practices ahead of mainstream adoption. Frontrunners often operate in niches and can be key actors in initiating transitions.',
    category: 'practice',
    level: 'foundational'
  },
  {
    id: 'catalyst',
    term: 'Catalyst',
    definition: 'An event, condition, or intervention that triggers or accelerates transition dynamics. Catalysts can be external shocks or deliberate actions that destabilize existing regimes.',
    category: 'practice',
    examples: [
      'Oil price shocks catalyzing energy efficiency efforts',
      'Extreme weather events catalyzing climate action',
      'Regulatory changes opening space for alternatives'
    ],
    level: 'foundational'
  },
  {
    id: 'scaling',
    term: 'Scaling',
    definition: 'The process of expanding successful niche innovations to broader adoption. Scaling can occur through replication (copying to new contexts), growth (expanding existing initiatives), or translation (adapting principles to different settings).',
    category: 'practice',
    level: 'intermediate'
  },

  // GOVERNANCE TERMS
  {
    id: 'polycentric-governance',
    term: 'Polycentric Governance',
    definition: 'A governance approach with multiple centers of decision-making at different scales that are formally independent but may function as a coherent system through mutual adjustment and learning.',
    category: 'governance',
    level: 'advanced'
  },
  {
    id: 'reflexive-governance',
    term: 'Reflexive Governance',
    definition: 'Governance that is aware of its own limitations, able to question its assumptions, and designed to learn and adapt. Reflexive governance acknowledges that governing complex systems requires ongoing adjustment.',
    category: 'governance',
    level: 'advanced'
  },
  {
    id: 'incumbent',
    term: 'Incumbent',
    definition: 'Established actors who benefit from and have stakes in maintaining the current regime. Incumbents may resist transitions or may be enrolled as partners depending on their interests and strategies.',
    category: 'governance',
    level: 'foundational'
  },
  {
    id: 'regime-resistance',
    term: 'Regime Resistance',
    definition: 'Active efforts by incumbent actors to maintain existing system configurations and prevent or slow transitions that threaten their interests.',
    category: 'governance',
    seeAlso: ['incumbent', 'regime'],
    level: 'intermediate'
  },

  // JUSTICE TERMS
  {
    id: 'just-transition',
    term: 'Just Transition',
    definition: 'A framework ensuring that transitions to sustainable systems are fair and equitable, protecting workers and communities who may be negatively affected while distributing benefits widely.',
    category: 'justice',
    level: 'foundational'
  },
  {
    id: 'distributional-justice',
    term: 'Distributional Justice',
    definition: 'Concerns about how the benefits and burdens of transitions are distributed across different groups, regions, and generations.',
    category: 'justice',
    seeAlso: ['procedural-justice', 'recognition-justice'],
    level: 'intermediate'
  },
  {
    id: 'procedural-justice',
    term: 'Procedural Justice',
    definition: 'Concerns about fairness in decision-making processes, including who participates, how decisions are made, and whether processes are transparent and inclusive.',
    category: 'justice',
    seeAlso: ['distributional-justice', 'recognition-justice'],
    level: 'intermediate'
  },
  {
    id: 'recognition-justice',
    term: 'Recognition Justice',
    definition: 'Concerns about whether different groups, identities, and forms of knowledge are respected and valued in transition processes.',
    category: 'justice',
    seeAlso: ['distributional-justice', 'procedural-justice'],
    level: 'intermediate'
  },
  {
    id: 'energy-justice',
    term: 'Energy Justice',
    definition: 'Application of justice frameworks specifically to energy systems, addressing how energy benefits and burdens are distributed, how energy decisions are made, and whose energy needs are recognized.',
    category: 'justice',
    level: 'intermediate'
  },
  {
    id: 'frontline-community',
    term: 'Frontline Community',
    definition: 'Communities that bear disproportionate burdens from environmental harms or are first to experience the impacts of system failures and transitions.',
    category: 'justice',
    level: 'foundational'
  }
]

// Categories for filtering
export const glossaryCategories = {
  'core': { name: 'Core Concepts', description: 'Fundamental concepts in Exodology' },
  'framework': { name: 'Analytical Frameworks', description: 'Frameworks for analyzing transitions' },
  'systems': { name: 'Systems Thinking', description: 'Concepts from systems science' },
  'practice': { name: 'Practice & Methods', description: 'Approaches to guiding transitions' },
  'governance': { name: 'Governance', description: 'Governing transition processes' },
  'justice': { name: 'Justice & Equity', description: 'Fairness in transitions' }
}

// Helper to get terms by category
export function getTermsByCategory(category: string): GlossaryTerm[] {
  return glossaryTerms.filter(t => t.category === category)
}

// Helper to get term by ID
export function getTermById(id: string): GlossaryTerm | undefined {
  return glossaryTerms.find(t => t.id === id)
}

// Helper to search terms
export function searchTerms(query: string): GlossaryTerm[] {
  const q = query.toLowerCase()
  return glossaryTerms.filter(t =>
    t.term.toLowerCase().includes(q) ||
    t.definition.toLowerCase().includes(q)
  )
}
