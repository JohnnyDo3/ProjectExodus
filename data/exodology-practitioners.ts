// Exodology Practitioner Directory
// Profiles of scholars and practitioners contributing to the field

export interface Practitioner {
  id: string
  name: string
  title: string
  affiliation: string
  location: string
  avatar?: string
  bio: string
  expertise: string[]
  contributions: {
    type: 'case-study' | 'research' | 'framework' | 'education' | 'practice'
    title: string
    description: string
  }[]
  certificationLevel: 'literacy' | 'application' | 'stewardship' | 'master' | 'founding'
  links?: {
    website?: string
    orcid?: string
    researchGate?: string
  }
  activeProjects?: string[]
  featured?: boolean
}

export const practitioners: Practitioner[] = [
  {
    id: 'elena-vasquez',
    name: 'Dr. Elena Vasquez',
    title: 'Systems Ecologist & Transition Researcher',
    affiliation: 'Institute for Resilient Systems',
    location: 'Barcelona, Spain',
    bio: 'Elena combines ecological systems thinking with social science to understand how human communities can navigate environmental transitions. Her work on Mediterranean agricultural transitions has informed practical guidance for farmers adapting to climate change.',
    expertise: ['social-ecological-systems', 'agricultural-transitions', 'community-resilience', 'adaptive-management'],
    contributions: [
      {
        type: 'case-study',
        title: 'Catalan Water Commons Revival',
        description: 'Documented the transition from centralized to community-managed water systems in drought-prone regions'
      },
      {
        type: 'framework',
        title: 'Community Resilience Assessment',
        description: 'Developed practical tools for communities to assess their adaptive capacity'
      }
    ],
    certificationLevel: 'founding',
    links: {
      orcid: '0000-0002-1234-5678'
    },
    activeProjects: ['Mediterranean Agricultural Transitions Network', 'Community Climate Adaptation Toolkit'],
    featured: true
  },
  {
    id: 'marcus-okonkwo',
    name: 'Prof. Marcus Okonkwo',
    title: 'Political Economist & Governance Scholar',
    affiliation: 'Pan-African Sustainability Institute',
    location: 'Lagos, Nigeria',
    bio: 'Marcus studies how power relations and governance structures shape energy transitions across African contexts. His work emphasizes locally-appropriate pathways and challenges Northern-centric transition models.',
    expertise: ['political-economy', 'energy-justice', 'governance', 'decolonial-approaches'],
    contributions: [
      {
        type: 'research',
        title: 'Decentralized Energy Governance in West Africa',
        description: 'Comparative analysis of community energy governance models'
      },
      {
        type: 'framework',
        title: 'Justice-Centered Transition Framework',
        description: 'Methodology for centering equity in transition planning'
      }
    ],
    certificationLevel: 'founding',
    links: {
      researchGate: 'Marcus_Okonkwo'
    },
    activeProjects: ['African Energy Transitions Observatory', 'Just Transition Policy Lab'],
    featured: true
  },
  {
    id: 'sarah-lindqvist',
    name: 'Dr. Sarah Lindqvist',
    title: 'Transition Design Practitioner',
    affiliation: 'Nordic Transition Lab',
    location: 'Stockholm, Sweden',
    bio: 'Sarah bridges academic research and practical implementation, working with municipalities and organizations to design and facilitate transition processes. Her participatory approaches have been adopted across Scandinavian cities.',
    expertise: ['transition-management', 'participatory-design', 'urban-transitions', 'facilitation'],
    contributions: [
      {
        type: 'practice',
        title: 'Stockholm Climate Neutral 2040',
        description: 'Lead facilitator for city-wide transition planning process'
      },
      {
        type: 'education',
        title: 'Transition Facilitation Training',
        description: 'Curriculum for training municipal staff in transition methods'
      }
    ],
    certificationLevel: 'master',
    links: {
      website: 'https://example.com/lindqvist'
    },
    activeProjects: ['Nordic Mayors Transition Network', 'Participatory Futures Methodology'],
    featured: true
  },
  {
    id: 'hiroshi-tanaka',
    name: 'Dr. Hiroshi Tanaka',
    title: 'Innovation Systems Researcher',
    affiliation: 'Tokyo Institute of Sustainability Studies',
    location: 'Tokyo, Japan',
    bio: 'Hiroshi studies how technological innovation systems interact with social and institutional change. His comparative work on mobility transitions in Asian megacities informs urban planning globally.',
    expertise: ['innovation-systems', 'mobility-transitions', 'technological-change', 'policy-analysis'],
    contributions: [
      {
        type: 'case-study',
        title: 'Tokyo Mobility Transition',
        description: 'Analysis of how Tokyo navigated multiple transportation transitions'
      },
      {
        type: 'research',
        title: 'Niche-Regime Dynamics in Asian Contexts',
        description: 'Adapting MLP framework for Asian institutional contexts'
      }
    ],
    certificationLevel: 'stewardship',
    links: {
      orcid: '0000-0003-9876-5432'
    },
    activeProjects: ['Asian Megacities Mobility Observatory']
  },
  {
    id: 'ana-reis',
    name: 'Ana Reis',
    title: 'Community Organizer & Practitioner',
    affiliation: 'Transition Network Brazil',
    location: 'Porto Alegre, Brazil',
    bio: 'Ana works at the grassroots level, supporting community-led transition initiatives across Brazil. Her experience connects theoretical frameworks with on-the-ground realities of community organizing.',
    expertise: ['community-organizing', 'grassroots-transitions', 'food-systems', 'solidarity-economy'],
    contributions: [
      {
        type: 'practice',
        title: 'Urban Agriculture Network',
        description: 'Built network of 200+ urban gardens in Porto Alegre metropolitan area'
      },
      {
        type: 'education',
        title: 'Popular Education for Transitions',
        description: 'Adapted Exodological concepts for community education programs'
      }
    ],
    certificationLevel: 'stewardship',
    activeProjects: ['Solidarity Economy Transition Hub', 'Favela Food Sovereignty Network']
  },
  {
    id: 'james-morrison',
    name: 'Dr. James Morrison',
    title: 'Historian of Technology & Society',
    affiliation: 'University of Manchester',
    location: 'Manchester, UK',
    bio: 'James studies historical transitions to understand patterns and lessons for contemporary challenges. His work on the industrial revolution\'s social dimensions offers cautionary insights for current transition planners.',
    expertise: ['history', 'industrial-transitions', 'social-history', 'path-dependence'],
    contributions: [
      {
        type: 'research',
        title: 'The Long Industrial Transition',
        description: 'Revisiting the industrial revolution through a transitions lens'
      },
      {
        type: 'case-study',
        title: 'Manchester Cotton to Services',
        description: 'How an industrial city navigated deindustrialization'
      }
    ],
    certificationLevel: 'application',
    links: {
      orcid: '0000-0001-2345-6789'
    }
  },
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    title: 'Policy Analyst & Advocate',
    affiliation: 'Centre for Climate Policy',
    location: 'New Delhi, India',
    bio: 'Priya translates transition research into actionable policy recommendations. Her work connecting national development planning with transition thinking has influenced Indian climate policy.',
    expertise: ['policy-analysis', 'climate-policy', 'development', 'india'],
    contributions: [
      {
        type: 'research',
        title: 'Just Transition in Indian Coal Regions',
        description: 'Analysis of transition challenges and opportunities for coal-dependent communities'
      },
      {
        type: 'practice',
        title: 'State Transition Action Plans',
        description: 'Advised five Indian states on integrating transition thinking in climate planning'
      }
    ],
    certificationLevel: 'application',
    activeProjects: ['Indian Just Transition Coalition']
  },
  {
    id: 'michael-green',
    name: 'Michael Green',
    title: 'Graduate Researcher',
    affiliation: 'Utrecht University',
    location: 'Utrecht, Netherlands',
    bio: 'Michael is completing doctoral research on the role of social movements in energy transitions. His participant-observation work with climate activists offers insights into movement dynamics.',
    expertise: ['social-movements', 'energy-democracy', 'activism', 'qualitative-methods'],
    contributions: [
      {
        type: 'research',
        title: 'Activist Knowledge in Transitions',
        description: 'How movement actors produce and mobilize transition knowledge'
      }
    ],
    certificationLevel: 'literacy',
    activeProjects: ['European Climate Movement Study']
  }
]

// Expertise areas for filtering
export const expertiseAreas = {
  'social-ecological-systems': { name: 'Social-Ecological Systems', count: 0 },
  'political-economy': { name: 'Political Economy', count: 0 },
  'transition-management': { name: 'Transition Management', count: 0 },
  'energy-justice': { name: 'Energy Justice', count: 0 },
  'innovation-systems': { name: 'Innovation Systems', count: 0 },
  'community-organizing': { name: 'Community Organizing', count: 0 },
  'history': { name: 'Historical Studies', count: 0 },
  'policy-analysis': { name: 'Policy Analysis', count: 0 },
  'social-movements': { name: 'Social Movements', count: 0 },
  'urban-transitions': { name: 'Urban Transitions', count: 0 },
  'governance': { name: 'Governance', count: 0 }
}

// Calculate counts
practitioners.forEach(p => {
  p.expertise.forEach(exp => {
    if (expertiseAreas[exp as keyof typeof expertiseAreas]) {
      expertiseAreas[exp as keyof typeof expertiseAreas].count++
    }
  })
})
