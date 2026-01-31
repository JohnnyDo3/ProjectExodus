/**
 * Mind Map Templates
 * Pre-built node and connection structures for common sustainability project types
 */

export interface MindMapTemplateNode {
  id: string
  type: 'IDEA' | 'TASK' | 'MILESTONE' | 'RESOURCE' | 'NOTE' | 'DECISION' | 'RISK' | 'OPPORTUNITY'
  label: string
  description: string
  x: number
  y: number
}

export interface MindMapTemplateConnection {
  from: string
  to: string
  type: 'RELATED' | 'DEPENDS' | 'LEADS_TO' | 'BLOCKS' | 'SUPPORTS' | 'CONFLICTS'
}

export interface MindMapTemplate {
  id: string
  name: string
  description: string
  category: string
  icon: string
  nodes: MindMapTemplateNode[]
  connections: MindMapTemplateConnection[]
  popularity: number
}

export const MINDMAP_TEMPLATES: MindMapTemplate[] = [
  {
    id: 'blank-canvas',
    name: 'Blank Canvas',
    description: 'Start from scratch with an empty mind map',
    category: 'General',
    icon: '🎨',
    nodes: [],
    connections: [],
    popularity: 10
  },

  {
    id: 'community-garden',
    name: 'Community Garden Project',
    description: 'Organize a community garden from planning to harvest',
    category: 'Agriculture',
    icon: '🌱',
    nodes: [
      {
        id: 'central',
        type: 'MILESTONE',
        label: 'Community Garden Launch',
        description: 'Central goal - launch a thriving community garden',
        x: 400,
        y: 300
      },
      {
        id: 'location',
        type: 'TASK',
        label: 'Secure Garden Location',
        description: 'Find and secure suitable land for the garden',
        x: 200,
        y: 150
      },
      {
        id: 'soil-test',
        type: 'TASK',
        label: 'Conduct Soil Testing',
        description: 'Test soil quality and contamination levels',
        x: 200,
        y: 300
      },
      {
        id: 'volunteers',
        type: 'RESOURCE',
        label: 'Recruit Volunteers',
        description: 'Build a team of dedicated gardeners',
        x: 200,
        y: 450
      },
      {
        id: 'funding',
        type: 'RESOURCE',
        label: 'Secure Funding',
        description: 'Apply for grants and organize fundraising',
        x: 600,
        y: 150
      },
      {
        id: 'tools',
        type: 'RESOURCE',
        label: 'Acquire Tools & Supplies',
        description: 'Purchase or collect donated gardening equipment',
        x: 600,
        y: 300
      },
      {
        id: 'workshops',
        type: 'IDEA',
        label: 'Host Gardening Workshops',
        description: 'Educate community members on sustainable practices',
        x: 600,
        y: 450
      },
      {
        id: 'water',
        type: 'DECISION',
        label: 'Water System Design',
        description: 'Decide between rainwater collection vs municipal water',
        x: 400,
        y: 150
      },
      {
        id: 'contamination',
        type: 'RISK',
        label: 'Soil Contamination Risk',
        description: 'Potential contamination from previous land use',
        x: 100,
        y: 350
      },
      {
        id: 'partnership',
        type: 'OPPORTUNITY',
        label: 'Partner with Local Schools',
        description: 'Create educational programs for students',
        x: 700,
        y: 200
      }
    ],
    connections: [
      { from: 'location', to: 'central', type: 'LEADS_TO' },
      { from: 'soil-test', to: 'central', type: 'LEADS_TO' },
      { from: 'volunteers', to: 'central', type: 'SUPPORTS' },
      { from: 'funding', to: 'central', type: 'SUPPORTS' },
      { from: 'tools', to: 'central', type: 'SUPPORTS' },
      { from: 'workshops', to: 'volunteers', type: 'SUPPORTS' },
      { from: 'water', to: 'central', type: 'DEPENDS' },
      { from: 'funding', to: 'tools', type: 'LEADS_TO' },
      { from: 'contamination', to: 'soil-test', type: 'RELATED' },
      { from: 'partnership', to: 'workshops', type: 'SUPPORTS' },
      { from: 'contamination', to: 'location', type: 'BLOCKS' }
    ],
    popularity: 9
  },

  {
    id: 'renewable-energy',
    name: 'Renewable Energy Initiative',
    description: 'Plan and implement renewable energy systems',
    category: 'Energy',
    icon: '☀️',
    nodes: [
      {
        id: 'goal',
        type: 'MILESTONE',
        label: 'Deploy Renewable Energy System',
        description: 'Successfully install and operate renewable energy',
        x: 400,
        y: 300
      },
      {
        id: 'site-assessment',
        type: 'TASK',
        label: 'Site Assessment',
        description: 'Evaluate solar/wind potential of location',
        x: 200,
        y: 200
      },
      {
        id: 'tech-selection',
        type: 'DECISION',
        label: 'Technology Selection',
        description: 'Choose between solar, wind, or hybrid system',
        x: 400,
        y: 150
      },
      {
        id: 'permits',
        type: 'TASK',
        label: 'Obtain Permits',
        description: 'Navigate regulatory requirements',
        x: 200,
        y: 350
      },
      {
        id: 'financing',
        type: 'RESOURCE',
        label: 'Secure Financing',
        description: 'Loans, grants, or power purchase agreements',
        x: 600,
        y: 200
      },
      {
        id: 'installation',
        type: 'TASK',
        label: 'System Installation',
        description: 'Physical installation of equipment',
        x: 600,
        y: 350
      },
      {
        id: 'grid-connection',
        type: 'TASK',
        label: 'Grid Connection',
        description: 'Connect to electrical grid for net metering',
        x: 400,
        y: 450
      },
      {
        id: 'maintenance',
        type: 'NOTE',
        label: 'Ongoing Maintenance Plan',
        description: 'Regular inspections and cleaning schedule',
        x: 700,
        y: 300
      },
      {
        id: 'weather-risk',
        type: 'RISK',
        label: 'Weather Damage Risk',
        description: 'Storms and extreme weather could damage equipment',
        x: 700,
        y: 450
      },
      {
        id: 'savings',
        type: 'OPPORTUNITY',
        label: 'Energy Cost Savings',
        description: 'Significant reduction in electricity bills',
        x: 100,
        y: 300
      }
    ],
    connections: [
      { from: 'site-assessment', to: 'tech-selection', type: 'LEADS_TO' },
      { from: 'tech-selection', to: 'goal', type: 'LEADS_TO' },
      { from: 'permits', to: 'installation', type: 'DEPENDS' },
      { from: 'financing', to: 'installation', type: 'DEPENDS' },
      { from: 'installation', to: 'goal', type: 'LEADS_TO' },
      { from: 'grid-connection', to: 'goal', type: 'SUPPORTS' },
      { from: 'goal', to: 'maintenance', type: 'LEADS_TO' },
      { from: 'weather-risk', to: 'maintenance', type: 'RELATED' },
      { from: 'goal', to: 'savings', type: 'LEADS_TO' }
    ],
    popularity: 8
  },

  {
    id: 'zero-waste',
    name: 'Zero Waste Campaign',
    description: 'Implement a comprehensive zero waste program',
    category: 'Waste Reduction',
    icon: '♻️',
    nodes: [
      {
        id: 'zero-waste-goal',
        type: 'MILESTONE',
        label: 'Achieve Zero Waste Status',
        description: 'Divert 90%+ waste from landfills',
        x: 400,
        y: 300
      },
      {
        id: 'waste-audit',
        type: 'TASK',
        label: 'Conduct Waste Audit',
        description: 'Analyze current waste streams',
        x: 200,
        y: 200
      },
      {
        id: 'composting',
        type: 'IDEA',
        label: 'Implement Composting Program',
        description: 'Organic waste composting system',
        x: 300,
        y: 400
      },
      {
        id: 'recycling',
        type: 'IDEA',
        label: 'Enhanced Recycling System',
        description: 'Multi-stream recycling stations',
        x: 500,
        y: 400
      },
      {
        id: 'education',
        type: 'TASK',
        label: 'Community Education',
        description: 'Workshops on waste reduction',
        x: 600,
        y: 250
      },
      {
        id: 'reuse',
        type: 'RESOURCE',
        label: 'Reuse Center',
        description: 'Collection point for reusable items',
        x: 200,
        y: 350
      },
      {
        id: 'policy',
        type: 'DECISION',
        label: 'Ban Single-Use Plastics',
        description: 'Policy decision on plastic restrictions',
        x: 400,
        y: 150
      },
      {
        id: 'participation',
        type: 'RISK',
        label: 'Low Participation Risk',
        description: 'Community may not adopt new practices',
        x: 100,
        y: 300
      },
      {
        id: 'cost-savings',
        type: 'OPPORTUNITY',
        label: 'Reduced Disposal Costs',
        description: 'Lower landfill fees and waste management costs',
        x: 650,
        y: 350
      }
    ],
    connections: [
      { from: 'waste-audit', to: 'zero-waste-goal', type: 'LEADS_TO' },
      { from: 'composting', to: 'zero-waste-goal', type: 'SUPPORTS' },
      { from: 'recycling', to: 'zero-waste-goal', type: 'SUPPORTS' },
      { from: 'education', to: 'composting', type: 'SUPPORTS' },
      { from: 'education', to: 'recycling', type: 'SUPPORTS' },
      { from: 'reuse', to: 'zero-waste-goal', type: 'SUPPORTS' },
      { from: 'policy', to: 'zero-waste-goal', type: 'SUPPORTS' },
      { from: 'participation', to: 'education', type: 'BLOCKS' },
      { from: 'zero-waste-goal', to: 'cost-savings', type: 'LEADS_TO' }
    ],
    popularity: 7
  },

  {
    id: 'watershed-protection',
    name: 'Watershed Protection Project',
    description: 'Protect and restore local water resources',
    category: 'Water',
    icon: '💧',
    nodes: [
      {
        id: 'clean-watershed',
        type: 'MILESTONE',
        label: 'Restored Healthy Watershed',
        description: 'Achieve improved water quality metrics',
        x: 400,
        y: 300
      },
      {
        id: 'water-testing',
        type: 'TASK',
        label: 'Baseline Water Testing',
        description: 'Establish current water quality metrics',
        x: 200,
        y: 200
      },
      {
        id: 'buffer-zones',
        type: 'IDEA',
        label: 'Create Riparian Buffer Zones',
        description: 'Plant native vegetation along waterways',
        x: 300,
        y: 400
      },
      {
        id: 'stormwater',
        type: 'IDEA',
        label: 'Stormwater Management',
        description: 'Rain gardens and bioswales',
        x: 500,
        y: 400
      },
      {
        id: 'pollution-sources',
        type: 'TASK',
        label: 'Identify Pollution Sources',
        description: 'Map and monitor contamination points',
        x: 200,
        y: 350
      },
      {
        id: 'volunteers',
        type: 'RESOURCE',
        label: 'Stream Cleanup Volunteers',
        description: 'Organize community cleanup events',
        x: 600,
        y: 250
      },
      {
        id: 'funding',
        type: 'RESOURCE',
        label: 'Grant Funding',
        description: 'EPA and state water quality grants',
        x: 600,
        y: 350
      },
      {
        id: 'development',
        type: 'RISK',
        label: 'Upstream Development',
        description: 'New construction increasing runoff',
        x: 100,
        y: 250
      },
      {
        id: 'recreation',
        type: 'OPPORTUNITY',
        label: 'Enhanced Recreation',
        description: 'Better fishing, swimming, kayaking',
        x: 650,
        y: 200
      }
    ],
    connections: [
      { from: 'water-testing', to: 'clean-watershed', type: 'LEADS_TO' },
      { from: 'buffer-zones', to: 'clean-watershed', type: 'SUPPORTS' },
      { from: 'stormwater', to: 'clean-watershed', type: 'SUPPORTS' },
      { from: 'pollution-sources', to: 'buffer-zones', type: 'LEADS_TO' },
      { from: 'volunteers', to: 'buffer-zones', type: 'SUPPORTS' },
      { from: 'funding', to: 'buffer-zones', type: 'SUPPORTS' },
      { from: 'funding', to: 'stormwater', type: 'SUPPORTS' },
      { from: 'development', to: 'clean-watershed', type: 'BLOCKS' },
      { from: 'clean-watershed', to: 'recreation', type: 'LEADS_TO' }
    ],
    popularity: 6
  },

  {
    id: 'education-program',
    name: 'Sustainability Education Hub',
    description: 'Create comprehensive environmental education programs',
    category: 'Education',
    icon: '📚',
    nodes: [
      {
        id: 'ed-hub',
        type: 'MILESTONE',
        label: 'Launch Education Hub',
        description: 'Fully operational education center',
        x: 400,
        y: 300
      },
      {
        id: 'curriculum',
        type: 'TASK',
        label: 'Develop Curriculum',
        description: 'Age-appropriate sustainability courses',
        x: 200,
        y: 200
      },
      {
        id: 'workshops',
        type: 'IDEA',
        label: 'Hands-On Workshops',
        description: 'Composting, gardening, energy efficiency',
        x: 300,
        y: 400
      },
      {
        id: 'field-trips',
        type: 'IDEA',
        label: 'Eco Field Trips',
        description: 'Visits to renewable energy sites',
        x: 500,
        y: 400
      },
      {
        id: 'instructors',
        type: 'RESOURCE',
        label: 'Recruit Instructors',
        description: 'Environmental educators and experts',
        x: 600,
        y: 250
      },
      {
        id: 'space',
        type: 'TASK',
        label: 'Secure Teaching Space',
        description: 'Classroom and outdoor learning areas',
        x: 200,
        y: 350
      },
      {
        id: 'partnerships',
        type: 'OPPORTUNITY',
        label: 'School Partnerships',
        description: 'Collaborate with local school districts',
        x: 650,
        y: 350
      },
      {
        id: 'certification',
        type: 'DECISION',
        label: 'Offer Certifications',
        description: 'Decide on formal certification program',
        x: 400,
        y: 150
      }
    ],
    connections: [
      { from: 'curriculum', to: 'ed-hub', type: 'DEPENDS' },
      { from: 'workshops', to: 'ed-hub', type: 'SUPPORTS' },
      { from: 'field-trips', to: 'ed-hub', type: 'SUPPORTS' },
      { from: 'instructors', to: 'ed-hub', type: 'DEPENDS' },
      { from: 'space', to: 'ed-hub', type: 'DEPENDS' },
      { from: 'partnerships', to: 'ed-hub', type: 'SUPPORTS' },
      { from: 'certification', to: 'ed-hub', type: 'RELATED' },
      { from: 'curriculum', to: 'workshops', type: 'LEADS_TO' },
      { from: 'curriculum', to: 'field-trips', type: 'LEADS_TO' }
    ],
    popularity: 5
  },

  {
    id: 'forest-restoration',
    name: 'Forest Restoration Initiative',
    description: 'Restore degraded forest ecosystems',
    category: 'Conservation',
    icon: '🌲',
    nodes: [
      {
        id: 'forest-restored',
        type: 'MILESTONE',
        label: 'Healthy Forest Ecosystem',
        description: '1000 acres of restored forest',
        x: 400,
        y: 300
      },
      {
        id: 'site-survey',
        type: 'TASK',
        label: 'Ecological Site Survey',
        description: 'Assess current forest health',
        x: 200,
        y: 200
      },
      {
        id: 'native-planting',
        type: 'IDEA',
        label: 'Native Tree Planting',
        description: 'Plant indigenous species',
        x: 300,
        y: 400
      },
      {
        id: 'invasive-removal',
        type: 'TASK',
        label: 'Remove Invasive Species',
        description: 'Clear non-native vegetation',
        x: 500,
        y: 400
      },
      {
        id: 'seedlings',
        type: 'RESOURCE',
        label: 'Acquire Seedlings',
        description: 'Source native tree seedlings',
        x: 600,
        y: 250
      },
      {
        id: 'monitoring',
        type: 'NOTE',
        label: 'Long-term Monitoring',
        description: 'Track forest health over decades',
        x: 650,
        y: 350
      },
      {
        id: 'wildfire',
        type: 'RISK',
        label: 'Wildfire Risk',
        description: 'Climate change increasing fire danger',
        x: 100,
        y: 300
      },
      {
        id: 'carbon',
        type: 'OPPORTUNITY',
        label: 'Carbon Sequestration',
        description: 'Potential carbon credit revenue',
        x: 200,
        y: 450
      }
    ],
    connections: [
      { from: 'site-survey', to: 'native-planting', type: 'LEADS_TO' },
      { from: 'native-planting', to: 'forest-restored', type: 'LEADS_TO' },
      { from: 'invasive-removal', to: 'forest-restored', type: 'SUPPORTS' },
      { from: 'seedlings', to: 'native-planting', type: 'DEPENDS' },
      { from: 'forest-restored', to: 'monitoring', type: 'LEADS_TO' },
      { from: 'wildfire', to: 'forest-restored', type: 'BLOCKS' },
      { from: 'forest-restored', to: 'carbon', type: 'LEADS_TO' }
    ],
    popularity: 4
  },

  {
    id: 'climate-advocacy',
    name: 'Climate Advocacy Campaign',
    description: 'Build political will for climate action',
    category: 'Advocacy',
    icon: '📢',
    nodes: [
      {
        id: 'policy-win',
        type: 'MILESTONE',
        label: 'Pass Climate Legislation',
        description: 'Achieve policy victory',
        x: 400,
        y: 300
      },
      {
        id: 'coalition',
        type: 'TASK',
        label: 'Build Coalition',
        description: 'Unite environmental groups',
        x: 200,
        y: 200
      },
      {
        id: 'petition',
        type: 'IDEA',
        label: 'Launch Petition Drive',
        description: 'Collect 10,000 signatures',
        x: 300,
        y: 400
      },
      {
        id: 'lobby',
        type: 'TASK',
        label: 'Lobby Decision Makers',
        description: 'Meet with elected officials',
        x: 500,
        y: 400
      },
      {
        id: 'media',
        type: 'IDEA',
        label: 'Media Campaign',
        description: 'Op-eds, press releases, social media',
        x: 600,
        y: 250
      },
      {
        id: 'opposition',
        type: 'RISK',
        label: 'Industry Opposition',
        description: 'Well-funded opposition campaign',
        x: 100,
        y: 300
      },
      {
        id: 'momentum',
        type: 'OPPORTUNITY',
        label: 'Growing Public Support',
        description: 'Increasing climate awareness',
        x: 650,
        y: 350
      }
    ],
    connections: [
      { from: 'coalition', to: 'policy-win', type: 'SUPPORTS' },
      { from: 'petition', to: 'policy-win', type: 'SUPPORTS' },
      { from: 'lobby', to: 'policy-win', type: 'LEADS_TO' },
      { from: 'media', to: 'lobby', type: 'SUPPORTS' },
      { from: 'media', to: 'petition', type: 'SUPPORTS' },
      { from: 'opposition', to: 'policy-win', type: 'BLOCKS' },
      { from: 'momentum', to: 'policy-win', type: 'SUPPORTS' }
    ],
    popularity: 3
  }
]

/**
 * Get template by ID
 */
export function getTemplateById(id: string): MindMapTemplate | undefined {
  return MINDMAP_TEMPLATES.find(t => t.id === id)
}

/**
 * Get templates by category
 */
export function getTemplatesByCategory(category: string): MindMapTemplate[] {
  return MINDMAP_TEMPLATES.filter(t => t.category === category)
}

/**
 * Get all unique categories
 */
export function getTemplateCategories(): string[] {
  return [...new Set(MINDMAP_TEMPLATES.map(t => t.category))]
}

/**
 * Sort templates by popularity
 */
export function getPopularTemplates(limit?: number): MindMapTemplate[] {
  const sorted = [...MINDMAP_TEMPLATES].sort((a, b) => b.popularity - a.popularity)
  return limit ? sorted.slice(0, limit) : sorted
}
