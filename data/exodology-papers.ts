// Exodology Research Papers and Working Documents
// Academic papers, theses, and working documents

export interface ResearchPaper {
  id: string
  title: string
  authors: string[]
  type: 'working-paper' | 'thesis' | 'policy-brief' | 'technical-report' | 'methodology'
  status: 'draft' | 'peer-review' | 'published' | 'archived'
  year: number
  abstract: string
  keywords: string[]
  relatedPaths?: string[]
  downloads?: number
  featured?: boolean
}

export const researchPapers: ResearchPaper[] = [
  {
    id: 'wp-2024-001',
    title: 'Toward a Unified Framework for Exodological Analysis',
    authors: ['Exodology Founding Committee'],
    type: 'working-paper',
    status: 'published',
    year: 2024,
    abstract: 'This foundational working paper synthesizes insights from transitions studies, resilience thinking, and political economy to propose an integrated analytical framework for the study of system transitions. We argue that existing approaches, while valuable, remain fragmented across disciplines. Exodology offers a synthesis that maintains theoretical coherence while enabling practical application.',
    keywords: ['theoretical-framework', 'synthesis', 'transitions-theory', 'methodology'],
    featured: true,
    downloads: 342
  },
  {
    id: 'wp-2024-002',
    title: 'Multi-Level Perspective Revisited: Implications for Practice',
    authors: ['Sarah Lindqvist', 'Marcus Okonkwo'],
    type: 'working-paper',
    status: 'published',
    year: 2024,
    abstract: 'The multi-level perspective (MLP) has become central to transition studies but faces critiques regarding its operationalization in practice. This paper examines how practitioners can apply MLP insights while addressing concerns about its treatment of agency, power, and geography. We propose practical heuristics that maintain analytical power while enabling action-oriented analysis.',
    keywords: ['multi-level-perspective', 'practice', 'methodology', 'agency'],
    relatedPaths: ['foundation'],
    downloads: 187
  },
  {
    id: 'wp-2024-003',
    title: 'Justice in Transitions: A Framework for Assessment',
    authors: ['Marcus Okonkwo', 'Priya Sharma'],
    type: 'working-paper',
    status: 'peer-review',
    year: 2024,
    abstract: 'Transitions inevitably create winners and losers. This paper develops a comprehensive framework for assessing justice dimensions in transition processes, encompassing distributional, procedural, and recognition justice. We apply the framework to three case studies spanning energy, agricultural, and urban transitions, deriving practical guidance for transition stewards.',
    keywords: ['justice', 'equity', 'assessment', 'transitions'],
    relatedPaths: ['political-economy'],
    downloads: 156
  },
  {
    id: 'thesis-2024-001',
    title: 'Community Resilience in Agricultural Transitions: Lessons from Mediterranean Landscapes',
    authors: ['Elena Vasquez'],
    type: 'thesis',
    status: 'published',
    year: 2024,
    abstract: 'This doctoral thesis examines how farming communities in Mediterranean Europe have navigated transitions driven by climate change, market pressures, and policy shifts. Through comparative case studies in Spain, Italy, and Greece, we identify factors that enable community resilience during agricultural transitions, with particular attention to collective action, knowledge networks, and institutional support.',
    keywords: ['agriculture', 'community-resilience', 'mediterranean', 'climate-adaptation'],
    relatedPaths: ['resilience-adaptation'],
    featured: true,
    downloads: 89
  },
  {
    id: 'pb-2024-001',
    title: 'Just Transition in Coal Regions: Policy Recommendations',
    authors: ['Priya Sharma', 'Coalition for Just Transition'],
    type: 'policy-brief',
    status: 'published',
    year: 2024,
    abstract: 'As nations accelerate coal phase-outs, coal-dependent communities face profound disruption. This policy brief synthesizes research on just transitions and offers concrete recommendations for policymakers. Key recommendations include early stakeholder engagement, diversified economic development, worker retraining programs, and social protection measures.',
    keywords: ['just-transition', 'coal', 'policy', 'workers'],
    downloads: 423
  },
  {
    id: 'wp-2024-004',
    title: 'Niche-Regime Dynamics in Non-Western Contexts: A Comparative Analysis',
    authors: ['Hiroshi Tanaka', 'Marcus Okonkwo'],
    type: 'working-paper',
    status: 'draft',
    year: 2024,
    abstract: 'Transition studies frameworks emerged primarily from European contexts and may require adaptation for application elsewhere. This paper compares niche-regime dynamics across Asian and African case studies, identifying where standard frameworks apply and where modification is needed. We propose context-sensitive adaptations that maintain analytical power while respecting institutional diversity.',
    keywords: ['comparative-analysis', 'asia', 'africa', 'context-sensitivity'],
    relatedPaths: ['foundation']
  },
  {
    id: 'tr-2024-001',
    title: 'Transition Readiness Assessment: Technical Guidelines',
    authors: ['Sarah Lindqvist', 'Nordic Transition Lab'],
    type: 'technical-report',
    status: 'published',
    year: 2024,
    abstract: 'This technical report provides detailed guidelines for assessing transition readiness in organizations, communities, and sectors. The assessment framework covers seven dimensions: strategic alignment, stakeholder engagement, resource availability, institutional capacity, knowledge assets, network strength, and adaptive capacity. Includes practical tools, templates, and scoring rubrics.',
    keywords: ['assessment', 'readiness', 'tools', 'methodology'],
    relatedPaths: ['innovation-entrepreneurship'],
    downloads: 267
  },
  {
    id: 'wp-2024-005',
    title: 'The Role of Narrative in Transition Processes',
    authors: ['James Morrison', 'Ana Reis'],
    type: 'working-paper',
    status: 'peer-review',
    year: 2024,
    abstract: 'Transitions are not only material processes but also narrative ones. This paper examines how stories, frames, and discourse shape transition dynamics. Drawing on historical and contemporary cases, we show how narrative can enable coalition-building, legitimize change, and shape which futures seem possible. Practical implications for transition advocates are discussed.',
    keywords: ['narrative', 'discourse', 'framing', 'legitimacy'],
    downloads: 78
  },
  {
    id: 'meth-2024-001',
    title: 'Case Study Methods for Exodological Research',
    authors: ['Exodology Methods Working Group'],
    type: 'methodology',
    status: 'published',
    year: 2024,
    abstract: 'Case studies are fundamental to Exodological research, but methodological standards have been inconsistent. This document establishes guidelines for case study design, data collection, analysis, and presentation in Exodological research. We address issues of generalizability, comparison, and theory-building while respecting the complexity of transition cases.',
    keywords: ['methodology', 'case-studies', 'research-design', 'standards'],
    featured: true,
    downloads: 198
  },
  {
    id: 'wp-2024-006',
    title: 'Social Movements as Transition Actors: Beyond Resistance',
    authors: ['Michael Green', 'Ana Reis'],
    type: 'working-paper',
    status: 'draft',
    year: 2024,
    abstract: 'Social movements are often studied as forces of resistance, but their role in proposing and building alternatives deserves more attention. This paper examines how movements contribute to transitions not only by challenging regimes but by developing niche innovations, creating prefigurative practices, and shifting cultural norms. Implications for movement-academic collaboration are explored.',
    keywords: ['social-movements', 'alternatives', 'prefiguration', 'niche-innovation'],
    relatedPaths: ['social-cultural']
  },
  {
    id: 'pb-2024-002',
    title: 'Municipal Transition Planning: A Practical Guide',
    authors: ['Sarah Lindqvist', 'Urban Transitions Network'],
    type: 'policy-brief',
    status: 'published',
    year: 2024,
    abstract: 'Cities are increasingly adopting transition-oriented approaches to sustainability planning. This guide provides municipal staff and elected officials with practical steps for integrating transition thinking into city planning. Topics covered include vision development, stakeholder engagement, transition arenas, experimentation, and monitoring.',
    keywords: ['municipal', 'urban', 'planning', 'practice'],
    relatedPaths: ['innovation-entrepreneurship'],
    downloads: 312
  },
  {
    id: 'wp-2024-007',
    title: 'Technological Lock-in and Escape Routes: Contemporary Perspectives',
    authors: ['Hiroshi Tanaka'],
    type: 'working-paper',
    status: 'published',
    year: 2024,
    abstract: 'The concept of technological lock-in, developed in the late 20th century, requires updating for contemporary conditions. This paper examines how digitalization, globalization, and accelerating change affect lock-in dynamics and potential escape routes. We identify strategies that have enabled incumbents to participate in transitions rather than resist them.',
    keywords: ['lock-in', 'technological-change', 'incumbents', 'strategy'],
    relatedPaths: ['foundation'],
    downloads: 145
  }
]

// Paper types for filtering
export const paperTypes = {
  'working-paper': { name: 'Working Papers', description: 'In-progress research for discussion' },
  'thesis': { name: 'Theses', description: 'Doctoral and masters theses' },
  'policy-brief': { name: 'Policy Briefs', description: 'Actionable recommendations for policymakers' },
  'technical-report': { name: 'Technical Reports', description: 'Detailed methodological and technical guidance' },
  'methodology': { name: 'Methodology', description: 'Standards and methods for research' }
}

// Paper status descriptions
export const paperStatuses = {
  'draft': { name: 'Draft', description: 'Early-stage work, subject to significant revision' },
  'peer-review': { name: 'Under Review', description: 'Currently in peer review process' },
  'published': { name: 'Published', description: 'Final version, peer-reviewed where applicable' },
  'archived': { name: 'Archived', description: 'Superseded by newer versions' }
}
