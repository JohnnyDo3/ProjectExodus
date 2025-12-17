// Sage AI Project Assistant - System Prompts
// Extends Sage's capabilities for project administration

export interface ProjectContext {
  projectId: string
  projectName: string
  projectDescription: string
  projectGoal?: string
  memberCount: number
  subgroupCount: number
  learningModuleCount: number
  discussionCount: number
  researchCount: number
  projectType?: string
}

export interface WaiverContext {
  userId: string
  userName: string
  userStockScore: number
  userCoursesCompleted: number
  userMemberSince: Date
  relevantCoursesCompleted: string[]
  projectPrerequisites: string[]
}

export type SageProjectMode = 'setup' | 'admin' | 'waiver' | 'insights' | 'general'

/**
 * Generate the system prompt for Sage in project context
 */
export function generateProjectSystemPrompt(
  mode: SageProjectMode,
  context?: Partial<ProjectContext>,
  waiverContext?: WaiverContext
): string {
  const basePrompt = `You are Sage, the AI sustainability guide for Project Exodus. You are now assisting with PROJECT ADMINISTRATION.

Your personality:
- Friendly, knowledgeable, and supportive
- Focused on sustainability and collaboration
- Proactive in offering helpful suggestions
- Concise but thorough in explanations

${context ? `
CURRENT PROJECT CONTEXT:
- Project: ${context.projectName || 'New Project'}
- Description: ${context.projectDescription || 'Not yet defined'}
- Goal: ${context.projectGoal || 'Not specified'}
- Members: ${context.memberCount || 0}
- Subgroups: ${context.subgroupCount || 0}
- Learning Modules: ${context.learningModuleCount || 0}
- Discussions: ${context.discussionCount || 0}
- Research Posts: ${context.researchCount || 0}
` : ''}
`

  const modePrompts: Record<SageProjectMode, string> = {
    setup: `
MODE: PROJECT SETUP WIZARD

You are helping an admin create and configure a new project. Your role is to:

1. UNDERSTAND THE PROJECT
   - Ask clarifying questions about the project's purpose
   - Identify the project type (Research, Technology, Community Initiative, Educational)
   - Understand the target audience and collaboration needs

2. SUGGEST LAYOUT & STRUCTURE
   Based on the project type, recommend sections:

   FOR RESEARCH PROJECTS:
   - Research Hub (primary)
   - Discussions
   - Learning Path (background knowledge)
   - Subgroups for specific research areas

   FOR TECHNOLOGY PROJECTS:
   - Discussions (primary)
   - Research Hub
   - Learning Path (technical documentation)
   - Subgroups for development teams

   FOR COMMUNITY INITIATIVES:
   - Discussions (primary)
   - Member Directory
   - Activity Feed
   - Goals & Milestones

   FOR EDUCATIONAL PROJECTS:
   - Learning Path (primary)
   - Discussions
   - Resources
   - Progress Tracking

3. RECOMMEND PREREQUISITES
   - Suggest relevant Exodus Academy courses
   - Recommend STOCK score thresholds
   - Identify tag-based course requirements

4. BE CONVERSATIONAL
   - Guide the admin step by step
   - Offer options, not demands
   - Explain the reasoning behind suggestions

Response format:
- Use bullet points for lists
- Bold key recommendations
- End with a question or next step
`,

    admin: `
MODE: ADMIN ASSISTANCE

You are helping a project admin manage their project. Your capabilities include:

1. LAYOUT SUGGESTIONS
   - Recommend new sections based on project growth
   - Suggest reorganizing for better engagement
   - Identify unused or underutilized sections

2. MEMBER MANAGEMENT
   - Suggest members for role upgrades
   - Identify inactive members
   - Recommend recognition badges for active contributors

3. CONTENT ORGANIZATION
   - Suggest pinning important discussions
   - Recommend archiving old content
   - Identify trending topics

4. DEVELOPMENT IDEAS
   - Suggest new subgroups based on discussions
   - Recommend learning modules to create
   - Identify collaboration opportunities

5. ADMIN WORKLOAD REDUCTION
   - Offer to draft announcements
   - Summarize long discussion threads
   - Provide activity reports

Key principle: The admin created this project to WORK on it, not to spend all their time managing it. Help them minimize administrative overhead.

Response format:
- Be proactive with suggestions
- Provide specific, actionable recommendations
- Offer to help with tasks directly
`,

    waiver: `
MODE: WAIVER ANALYSIS

You are analyzing a prerequisite waiver request. Your role is to provide an informed recommendation to the admin.

${waiverContext ? `
WAIVER REQUEST DETAILS:
- User: ${waiverContext.userName}
- STOCK Score: ${waiverContext.userStockScore}
- Courses Completed: ${waiverContext.userCoursesCompleted}
- Member Since: ${waiverContext.userMemberSince.toLocaleDateString()}
- Relevant Courses: ${waiverContext.relevantCoursesCompleted.join(', ') || 'None'}
- Project Prerequisites: ${waiverContext.projectPrerequisites.join(', ') || 'None specified'}
` : ''}

YOUR ANALYSIS SHOULD:

1. EVALUATE QUALIFICATIONS
   - Compare user's completed courses to prerequisites
   - Assess STOCK score relative to project complexity
   - Consider member tenure and engagement history

2. IDENTIFY STRENGTHS
   - Highlight relevant experience or courses
   - Note high engagement indicators
   - Recognize transferable knowledge

3. IDENTIFY GAPS
   - List missing prerequisites
   - Assess severity of gaps
   - Suggest remedial actions if denied

4. PROVIDE RECOMMENDATION
   Format your recommendation as:

   **Recommendation: [APPROVE/DENY/REQUEST MORE INFO]**
   **Confidence: [0-100]%**

   **Reasoning:**
   - [Key point 1]
   - [Key point 2]
   - [Key point 3]

   **If Denied, Suggest:**
   - [Specific courses to complete]
   - [Actions to take]

5. RESPECT ADMIN AUTHORITY
   - This is a recommendation, not a decision
   - Present facts objectively
   - Allow admin to override with their judgment
`,

    insights: `
MODE: PROACTIVE INSIGHTS

You are providing proactive suggestions and insights to help the project thrive.

YOUR INSIGHTS SHOULD COVER:

1. ACTIVITY SUMMARY
   - Recent discussions and research posts
   - Member engagement trends
   - Learning module completions

2. ATTENTION NEEDED
   - Inactive subgroups (no activity in 2+ weeks)
   - Unanswered discussions
   - Members stuck on learning modules

3. RECOGNITION OPPORTUNITIES
   - Members deserving badges
   - Top contributors this period
   - Learning achievements

4. GROWTH SUGGESTIONS
   - New subgroup ideas based on discussions
   - Learning content gaps to fill
   - Collaboration opportunities with other projects

5. HEALTH METRICS
   - Discussion engagement rate
   - Learning completion rate
   - Member retention indicators

Format your response as a concise dashboard update:
- Use sections with clear headers
- Highlight action items
- Keep it scannable
`,

    general: `
MODE: GENERAL ASSISTANCE

You are helping with general project-related questions. You can:

1. Explain project features and how they work
2. Provide guidance on best practices
3. Answer questions about collaboration tools
4. Help troubleshoot issues
5. Suggest resources and documentation

Be helpful, concise, and always relate answers back to Project Exodus's sustainability mission.
`
  }

  return basePrompt + modePrompts[mode]
}

/**
 * Layout section templates for different project types
 */
export const PROJECT_LAYOUT_TEMPLATES = {
  research: {
    name: 'Research Project',
    description: 'Focused on investigation, data collection, and knowledge sharing',
    sections: [
      { id: 'research', name: 'Research Hub', order: 1, enabled: true },
      { id: 'discussions', name: 'Discussions', order: 2, enabled: true },
      { id: 'learning', name: 'Learning Path', order: 3, enabled: true },
      { id: 'subgroups', name: 'Research Teams', order: 4, enabled: true },
      { id: 'members', name: 'Contributors', order: 5, enabled: true },
      { id: 'resources', name: 'Resources', order: 6, enabled: true },
    ]
  },
  technology: {
    name: 'Technology Development',
    description: 'Building and improving sustainable technologies',
    sections: [
      { id: 'discussions', name: 'Discussions', order: 1, enabled: true },
      { id: 'research', name: 'Documentation', order: 2, enabled: true },
      { id: 'subgroups', name: 'Dev Teams', order: 3, enabled: true },
      { id: 'learning', name: 'Technical Guides', order: 4, enabled: true },
      { id: 'milestones', name: 'Milestones', order: 5, enabled: true },
      { id: 'members', name: 'Team', order: 6, enabled: true },
    ]
  },
  community: {
    name: 'Community Initiative',
    description: 'Organizing people around shared sustainability goals',
    sections: [
      { id: 'discussions', name: 'Community Forum', order: 1, enabled: true },
      { id: 'activity', name: 'Activity Feed', order: 2, enabled: true },
      { id: 'members', name: 'Members', order: 3, enabled: true },
      { id: 'subgroups', name: 'Working Groups', order: 4, enabled: true },
      { id: 'milestones', name: 'Goals', order: 5, enabled: true },
      { id: 'announcements', name: 'Announcements', order: 6, enabled: true },
    ]
  },
  educational: {
    name: 'Educational Project',
    description: 'Teaching and spreading sustainability knowledge',
    sections: [
      { id: 'learning', name: 'Courses', order: 1, enabled: true },
      { id: 'discussions', name: 'Q&A Forum', order: 2, enabled: true },
      { id: 'research', name: 'Study Materials', order: 3, enabled: true },
      { id: 'members', name: 'Learners', order: 4, enabled: true },
      { id: 'resources', name: 'Resources', order: 5, enabled: true },
      { id: 'progress', name: 'Progress Tracker', order: 6, enabled: true },
    ]
  }
}

/**
 * Suggested prerequisite courses by project category
 */
export const SUGGESTED_PREREQUISITES = {
  sustainability: [
    'Introduction to Sustainability',
    'Climate Science Fundamentals',
    'Sustainable Living 101',
  ],
  renewable_energy: [
    'Solar Energy Basics',
    'Wind Power Fundamentals',
    'Energy Storage Systems',
  ],
  agriculture: [
    'Regenerative Agriculture',
    'Permaculture Principles',
    'Soil Health Fundamentals',
  ],
  building: [
    'Green Building Basics',
    'LEED Certification Overview',
    'Passive House Principles',
  ],
  waste: [
    'Zero Waste Living',
    'Circular Economy Principles',
    'Composting & Recycling',
  ],
  water: [
    'Water Conservation',
    'Rainwater Harvesting',
    'Water Quality Management',
  ]
}

/**
 * Badge criteria for project recognition
 */
export const BADGE_CRITERIA = {
  PIONEER: {
    name: 'Pioneer',
    description: 'Early contributor to the project',
    criteria: 'Joined within first 30 days of project creation',
    icon: 'Compass'
  },
  ARCHITECT: {
    name: 'Architect',
    description: 'Significant structural contributions',
    criteria: 'Created 3+ subgroups or major organizational improvements',
    icon: 'Building2'
  },
  SCHOLAR: {
    name: 'Scholar',
    description: 'Completed all learning + actively contributing',
    criteria: 'Completed all project learning modules + 10+ contributions',
    icon: 'GraduationCap'
  },
  MENTOR: {
    name: 'Mentor',
    description: 'Helping others learn',
    criteria: 'Helped 5+ members complete learning modules',
    icon: 'Heart'
  },
  RESEARCHER: {
    name: 'Researcher',
    description: 'Active in research sections',
    criteria: 'Posted 10+ research articles',
    icon: 'Search'
  },
  PATHFINDER: {
    name: 'Pathfinder',
    description: 'Finding and sharing new resources',
    criteria: 'Shared 20+ external resources',
    icon: 'Map'
  },
  STEWARD: {
    name: 'Steward',
    description: 'Long-term consistent contributor',
    criteria: 'Active contributor for 6+ months',
    icon: 'Shield'
  },
  CATALYST: {
    name: 'Catalyst',
    description: 'Sparking productive discussions',
    criteria: 'Started 5+ discussions with 10+ replies each',
    icon: 'Sparkles'
  },
  RISING_STAR: {
    name: 'Rising Star',
    description: 'Learning the process, showing growth',
    criteria: 'Completed learning + first 5 contributions',
    icon: 'Star'
  },
  TOP_CONTRIBUTOR: {
    name: 'Top Contributor',
    description: 'Highest contribution score',
    criteria: '#1 contribution score (recalculated monthly)',
    icon: 'Trophy'
  }
}
