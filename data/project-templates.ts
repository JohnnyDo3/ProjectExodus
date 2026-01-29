/**
 * Project Templates
 * Pre-designed templates for common project types
 */

import {
  Leaf, TreePine, Droplet, Sun, Wind, Recycle, Users, BookOpen,
  Lightbulb, Sprout, Home, Heart, GraduationCap, Megaphone,
  Building2, Mountain, Fish, Bird, Flower2, Apple
} from 'lucide-react'

export interface ProjectTemplate {
  id: string
  name: string
  tagline: string
  description: string
  mission: string
  category: string
  tags: string[]
  theme: string
  icon: any
  gradient: string
  color: string
  suggestedGoal: string
  features: {
    enableDiscussions: boolean
    enableResearch: boolean
    enableLearning: boolean
    requireApproval: boolean
  }
  sections?: Array<{
    title: string
    content: string
  }>
  popularity: number // For sorting
}

export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'community-garden',
    name: 'Community Garden',
    tagline: 'Growing food, community, and sustainability together',
    description: 'A collaborative urban garden project bringing neighbors together to grow fresh, organic produce while building community connections and promoting sustainable living practices.',
    mission: 'To create accessible green spaces where community members can learn sustainable agriculture, share resources, and harvest nutritious food while fostering environmental stewardship.',
    category: 'agriculture',
    tags: ['urban-farming', 'community', 'organic', 'food-security'],
    theme: 'nature',
    icon: Sprout,
    gradient: 'from-emerald-500 to-green-600',
    color: '#10b981',
    suggestedGoal: 'Establish 10 raised garden beds and engage 50 community members within 6 months',
    features: {
      enableDiscussions: true,
      enableResearch: true,
      enableLearning: true,
      requireApproval: false,
    },
    sections: [
      {
        title: 'Getting Started',
        content: 'Learn about plot selection, soil preparation, and seasonal planting schedules.'
      },
      {
        title: 'Growing Calendar',
        content: 'Track what to plant each season and when to harvest.'
      },
      {
        title: 'Community Events',
        content: 'Organize workshops, harvest festivals, and seed swaps.'
      }
    ],
    popularity: 95,
  },
  {
    id: 'renewable-energy',
    name: 'Renewable Energy Initiative',
    tagline: 'Powering our future with clean, sustainable energy',
    description: 'A comprehensive project focused on transitioning to renewable energy sources through solar, wind, and other clean technologies, reducing carbon footprint and energy costs.',
    mission: 'To accelerate the adoption of renewable energy in our community by providing education, resources, and collective purchasing power for sustainable energy solutions.',
    category: 'energy',
    tags: ['solar', 'wind', 'clean-energy', 'carbon-reduction'],
    theme: 'solar',
    icon: Sun,
    gradient: 'from-yellow-500 to-orange-600',
    color: '#f59e0b',
    suggestedGoal: 'Install 100kW of community solar capacity and educate 200 households about renewable energy',
    features: {
      enableDiscussions: true,
      enableResearch: true,
      enableLearning: true,
      requireApproval: false,
    },
    sections: [
      {
        title: 'Solar Assessment',
        content: 'Evaluate your property for solar potential and calculate savings.'
      },
      {
        title: 'Technology Guide',
        content: 'Learn about different renewable energy technologies and their applications.'
      },
      {
        title: 'Funding & Incentives',
        content: 'Discover grants, tax credits, and financing options for renewable energy.'
      }
    ],
    popularity: 88,
  },
  {
    id: 'zero-waste',
    name: 'Zero Waste Community',
    tagline: 'Reducing waste to nothing, one step at a time',
    description: 'A grassroots movement to eliminate waste in our community through reduction, reuse, recycling, and composting programs that transform how we consume and dispose.',
    mission: 'To achieve zero waste by 2030 through education, infrastructure development, and behavior change that prioritizes circular economy principles.',
    category: 'environment',
    tags: ['zero-waste', 'recycling', 'composting', 'circular-economy'],
    theme: 'nature',
    icon: Recycle,
    gradient: 'from-teal-500 to-cyan-600',
    color: '#14b8a6',
    suggestedGoal: 'Divert 80% of community waste from landfills within 18 months',
    features: {
      enableDiscussions: true,
      enableResearch: true,
      enableLearning: true,
      requireApproval: false,
    },
    sections: [
      {
        title: 'Waste Audit',
        content: 'Track and analyze your waste streams to identify reduction opportunities.'
      },
      {
        title: 'Composting Guide',
        content: 'Set up home composting systems and community collection programs.'
      },
      {
        title: 'Refill Stations',
        content: 'Map and create locations for package-free shopping.'
      }
    ],
    popularity: 92,
  },
  {
    id: 'forest-restoration',
    name: 'Forest Restoration Project',
    tagline: 'Rewilding our landscapes, one tree at a time',
    description: 'A large-scale reforestation effort to restore degraded ecosystems, enhance biodiversity, and sequester carbon through native tree planting and ecosystem management.',
    mission: 'To restore 1,000 acres of native forest habitat, creating wildlife corridors and demonstrating the power of nature-based climate solutions.',
    category: 'environment',
    tags: ['reforestation', 'biodiversity', 'carbon-sequestration', 'wildlife'],
    theme: 'forest',
    icon: TreePine,
    gradient: 'from-green-600 to-emerald-700',
    color: '#059669',
    suggestedGoal: 'Plant 50,000 native trees and restore 100 acres in year one',
    features: {
      enableDiscussions: true,
      enableResearch: true,
      enableLearning: true,
      requireApproval: false,
    },
    sections: [
      {
        title: 'Species Selection',
        content: 'Choose native trees appropriate for your ecosystem and climate.'
      },
      {
        title: 'Planting Events',
        content: 'Organize community tree-planting days and volunteer coordination.'
      },
      {
        title: 'Monitoring',
        content: 'Track tree survival rates, growth, and ecosystem health indicators.'
      }
    ],
    popularity: 85,
  },
  {
    id: 'watershed-protection',
    name: 'Watershed Protection Alliance',
    tagline: 'Safeguarding our water, sustaining our future',
    description: 'A collaborative effort to protect and restore local waterways through pollution prevention, habitat restoration, and sustainable water management practices.',
    mission: 'To ensure clean, abundant water for current and future generations by protecting watersheds and promoting responsible water stewardship throughout our community.',
    category: 'environment',
    tags: ['water-quality', 'conservation', 'habitat-restoration', 'watersheds'],
    theme: 'ocean',
    icon: Droplet,
    gradient: 'from-blue-500 to-cyan-600',
    color: '#0ea5e9',
    suggestedGoal: 'Restore 5 stream miles and reduce watershed pollution by 40%',
    features: {
      enableDiscussions: true,
      enableResearch: true,
      enableLearning: true,
      requireApproval: false,
    },
    sections: [
      {
        title: 'Water Testing',
        content: 'Conduct regular water quality monitoring and citizen science.'
      },
      {
        title: 'Stream Restoration',
        content: 'Remove invasive species and plant native riparian buffers.'
      },
      {
        title: 'Stormwater Management',
        content: 'Implement green infrastructure to reduce runoff pollution.'
      }
    ],
    popularity: 78,
  },
  {
    id: 'education-hub',
    name: 'Sustainability Education Hub',
    tagline: 'Learning today for a sustainable tomorrow',
    description: 'An educational initiative providing workshops, courses, and resources to empower individuals with the knowledge and skills for sustainable living and environmental stewardship.',
    mission: 'To create an informed, engaged community through accessible sustainability education that transforms understanding into meaningful action.',
    category: 'education',
    tags: ['education', 'workshops', 'training', 'capacity-building'],
    theme: 'lunar',
    icon: GraduationCap,
    gradient: 'from-indigo-500 to-purple-600',
    color: '#6366f1',
    suggestedGoal: 'Train 500 community members through 50 workshops in one year',
    features: {
      enableDiscussions: true,
      enableResearch: true,
      enableLearning: true,
      requireApproval: false,
    },
    sections: [
      {
        title: 'Course Catalog',
        content: 'Browse workshops on composting, energy efficiency, and sustainable living.'
      },
      {
        title: 'Certification Programs',
        content: 'Complete structured learning paths and earn sustainability certificates.'
      },
      {
        title: 'Resource Library',
        content: 'Access guides, videos, and tools for self-directed learning.'
      }
    ],
    popularity: 90,
  },
  {
    id: 'advocacy-campaign',
    name: 'Climate Advocacy Campaign',
    tagline: 'Amplifying voices for climate justice',
    description: 'A grassroots advocacy movement mobilizing citizens to demand bold climate action through policy engagement, public awareness campaigns, and direct action.',
    mission: 'To drive systemic change by organizing community voices, influencing policy, and holding decision-makers accountable for climate action.',
    category: 'advocacy',
    tags: ['climate-justice', 'policy', 'activism', 'organizing'],
    theme: 'fire',
    icon: Megaphone,
    gradient: 'from-red-500 to-orange-600',
    color: '#ef4444',
    suggestedGoal: 'Mobilize 1,000 advocates and pass 3 local climate policies',
    features: {
      enableDiscussions: true,
      enableResearch: true,
      enableLearning: false,
      requireApproval: false,
    },
    sections: [
      {
        title: 'Campaign Strategy',
        content: 'Develop targeted campaigns for specific policy wins.'
      },
      {
        title: 'Volunteer Mobilization',
        content: 'Recruit, train, and coordinate community advocates.'
      },
      {
        title: 'Media Toolkit',
        content: 'Access press release templates, talking points, and social media assets.'
      }
    ],
    popularity: 82,
  },
  {
    id: 'green-building',
    name: 'Green Building Collective',
    tagline: 'Constructing sustainable spaces for thriving communities',
    description: 'A network of architects, builders, and homeowners advancing green building practices through sustainable design, energy efficiency, and healthy materials.',
    mission: 'To transform the built environment by demonstrating that sustainable buildings are healthier, more efficient, and better for people and planet.',
    category: 'technology',
    tags: ['green-building', 'sustainable-design', 'energy-efficiency', 'leed'],
    theme: 'nature',
    icon: Building2,
    gradient: 'from-slate-600 to-stone-700',
    color: '#64748b',
    suggestedGoal: 'Certify 20 green buildings and train 100 builders in sustainable practices',
    features: {
      enableDiscussions: true,
      enableResearch: true,
      enableLearning: true,
      requireApproval: false,
    },
    sections: [
      {
        title: 'Design Principles',
        content: 'Learn passive solar design, natural ventilation, and daylighting.'
      },
      {
        title: 'Material Selection',
        content: 'Choose low-carbon, non-toxic, and locally-sourced building materials.'
      },
      {
        title: 'Case Studies',
        content: 'Explore successful green building projects and lessons learned.'
      }
    ],
    popularity: 75,
  },
  {
    id: 'food-forest',
    name: 'Urban Food Forest',
    tagline: 'Abundant, edible ecosystems in our cities',
    description: 'A permaculture-designed public food forest creating multi-layered edible landscapes that provide free food while demonstrating regenerative agriculture principles.',
    mission: 'To establish self-sustaining food forests that feed communities, restore urban ecology, and reconnect people with nature and food production.',
    category: 'agriculture',
    tags: ['permaculture', 'food-forest', 'edible-landscaping', 'food-security'],
    theme: 'forest',
    icon: Apple,
    gradient: 'from-rose-500 to-red-600',
    color: '#f43f5e',
    suggestedGoal: 'Plant 2-acre food forest with 100+ edible species accessible to all',
    features: {
      enableDiscussions: true,
      enableResearch: true,
      enableLearning: true,
      requireApproval: false,
    },
    sections: [
      {
        title: 'Site Design',
        content: 'Map your food forest guilds, layers, and water management systems.'
      },
      {
        title: 'Species Guide',
        content: 'Select fruit trees, berry bushes, herbs, and perennial vegetables.'
      },
      {
        title: 'Harvest Calendar',
        content: 'Track when different plants produce throughout the seasons.'
      }
    ],
    popularity: 87,
  },
  {
    id: 'blank-canvas',
    name: 'Start from Scratch',
    tagline: 'Build your unique vision from the ground up',
    description: 'Create a completely custom project tailored to your specific sustainability goals and community needs.',
    mission: '',
    category: '',
    tags: [],
    theme: 'nature',
    icon: Lightbulb,
    gradient: 'from-violet-500 to-purple-600',
    color: '#8b5cf6',
    suggestedGoal: '',
    features: {
      enableDiscussions: true,
      enableResearch: true,
      enableLearning: true,
      requireApproval: false,
    },
    sections: [],
    popularity: 100, // Always show first as an option
  },
]

export function getTemplateById(id: string): ProjectTemplate | undefined {
  return PROJECT_TEMPLATES.find(t => t.id === id)
}

export function getTemplatesByCategory(category: string): ProjectTemplate[] {
  return PROJECT_TEMPLATES.filter(t => t.category === category).sort((a, b) => b.popularity - a.popularity)
}

export function getPopularTemplates(limit: number = 6): ProjectTemplate[] {
  return [...PROJECT_TEMPLATES]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit)
}
