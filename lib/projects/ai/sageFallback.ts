// Sage AI Fallback Responses for Project Mode
// Used when Gemini API is unavailable

import { SageProjectMode, ProjectContext, WaiverContext } from './sageProjectPrompt'

interface FallbackOptions {
  mode: SageProjectMode
  query: string
  projectContext?: Partial<ProjectContext>
  waiverContext?: WaiverContext
}

/**
 * Generate fallback response when AI API is unavailable
 */
export function getProjectFallbackResponse(options: FallbackOptions): string {
  const { mode, query, projectContext, waiverContext } = options
  const lowerQuery = query.toLowerCase()

  // Mode-specific fallbacks
  switch (mode) {
    case 'setup':
      return getSetupFallback(lowerQuery, projectContext)
    case 'admin':
      return getAdminFallback(lowerQuery, projectContext)
    case 'waiver':
      return getWaiverFallback(waiverContext)
    case 'insights':
      return getInsightsFallback(projectContext)
    case 'general':
    default:
      return getGeneralFallback(lowerQuery)
  }
}

function getSetupFallback(query: string, context?: Partial<ProjectContext>): string {
  if (query.includes('layout') || query.includes('section') || query.includes('structure')) {
    return `For a ${context?.projectType || 'general'} project, I recommend starting with:

**Essential Sections:**
1. **Discussions** - For member collaboration and idea sharing
2. **Research Hub** - To share findings and resources
3. **Learning Path** - Help new members get up to speed

**Optional Sections to Add Later:**
- Subgroups for specialized teams
- Member Directory
- Milestones & Goals
- Resources library

You can always customize the layout as your project grows. Would you like me to explain any of these sections in more detail?`
  }

  if (query.includes('prerequisite') || query.includes('requirement') || query.includes('course')) {
    return `For project prerequisites, you have several options:

**Types of Prerequisites:**
1. **Exodus Academy Courses** - Require specific courses from the learning platform
2. **Tag-Based** - Require any courses matching certain tags (e.g., "sustainability")
3. **STOCK Score** - Set a minimum contribution score
4. **Project Modules** - Require your project's own learning content

**Best Practice:**
Start with 1-2 fundamental prerequisites and add more as needed. You can always waive requirements for experienced members.

What type of prerequisite would you like to set up?`
  }

  if (query.includes('type') || query.includes('category') || query.includes('kind')) {
    return `Project Exodus supports several project types:

**1. Research Project**
Focus: Investigation, data collection, knowledge sharing
Best for: Academic research, sustainability studies, environmental monitoring

**2. Technology Development**
Focus: Building sustainable technologies
Best for: Open-source tools, green tech innovation, software development

**3. Community Initiative**
Focus: Organizing people around shared goals
Best for: Local sustainability groups, advocacy, community action

**4. Educational Project**
Focus: Teaching and spreading knowledge
Best for: Course creation, workshops, training programs

Which type best matches your project's goals?`
  }

  // Default setup response
  return `I'm here to help you set up your project! I can assist with:

- **Layout & Structure** - Choose sections for your project
- **Prerequisites** - Set requirements for contributors
- **Project Type** - Match your goals to a template
- **Best Practices** - Tips for successful collaboration

What aspect would you like to start with?`
}

function getAdminFallback(query: string, context?: Partial<ProjectContext>): string {
  if (query.includes('member') || query.includes('role') || query.includes('permission')) {
    return `**Member Management Options:**

**Roles Available:**
- **Viewer** - Can view content, learning in progress
- **Contributor** - Can add discussions, research, comments
- **Moderator** - Can moderate content, approve posts
- **Admin** - Full control over settings and members
- **Owner** - Project creator (cannot be removed)

**Quick Actions:**
- Promote active contributors to Moderator
- Review members who haven't engaged recently
- Check pending waiver requests

What would you like to do?`
  }

  if (query.includes('badge') || query.includes('recognition') || query.includes('reward')) {
    return `**Recognition Badges Available:**

- **Pioneer** - Early contributors (joined in first 30 days)
- **Scholar** - Completed all learning + 10+ contributions
- **Mentor** - Helped 5+ members complete learning
- **Researcher** - Posted 10+ research articles
- **Catalyst** - Started 5+ popular discussions
- **Steward** - Active for 6+ months
- **Top Contributor** - Highest contribution score

Badges are awarded based on tracked activity. I can help identify members who qualify!`
  }

  if (query.includes('announcement') || query.includes('update') || query.includes('notify')) {
    return `**Project Announcements:**

To create an announcement:
1. Go to Project Settings > Announcements
2. Write your update
3. Choose notification settings (who gets notified)

**Tips:**
- Keep announcements concise
- Highlight action items clearly
- Use for important updates only (avoid notification fatigue)

Would you like help drafting an announcement?`
  }

  // Default admin response
  return `**Admin Assistance Available:**

I can help you with:
- **Member Management** - Roles, permissions, engagement
- **Content Organization** - Pinning, archiving, organizing
- **Recognition** - Identify members for badges
- **Announcements** - Draft project updates
- **Growth Ideas** - Suggestions for new subgroups/content

What area needs attention?`
}

function getWaiverFallback(waiverContext?: WaiverContext): string {
  if (!waiverContext) {
    return `**Waiver Analysis:**

I need more information to analyze this waiver request. Please provide:
- User's STOCK score
- Completed courses
- Project prerequisites

In general, consider approving waivers when:
- User has high STOCK score (shows platform engagement)
- User has relevant but not exact courses completed
- User has been a member for 3+ months

Consider denying when:
- User is brand new to the platform
- No relevant coursework completed
- Project requires specialized knowledge`
  }

  const { userName, userStockScore, userCoursesCompleted, relevantCoursesCompleted, projectPrerequisites } = waiverContext

  const hasRelevantCourses = relevantCoursesCompleted.length > 0
  const hasHighStock = userStockScore >= 50
  const recommendApprove = hasRelevantCourses || hasHighStock

  return `**Waiver Analysis for ${userName}:**

**User Profile:**
- STOCK Score: ${userStockScore}
- Courses Completed: ${userCoursesCompleted}
- Relevant Courses: ${relevantCoursesCompleted.length > 0 ? relevantCoursesCompleted.join(', ') : 'None'}

**Project Requirements:**
${projectPrerequisites.length > 0 ? projectPrerequisites.map(p => `- ${p}`).join('\n') : '- No specific prerequisites set'}

**Recommendation: ${recommendApprove ? 'APPROVE' : 'REVIEW NEEDED'}**
**Confidence: ${recommendApprove ? '70' : '50'}%**

**Reasoning:**
${hasHighStock ? '- High STOCK score indicates active platform engagement\n' : ''}${hasRelevantCourses ? '- Has completed some relevant coursework\n' : '- Missing relevant prerequisite courses\n'}

**Note:** This is an automated analysis. As the admin, you have full discretion to approve or deny based on your knowledge of the project's needs.`
}

function getInsightsFallback(context?: Partial<ProjectContext>): string {
  const projectName = context?.projectName || 'Your Project'

  return `**${projectName} - Insights Dashboard**

**Activity Summary:**
- Total Members: ${context?.memberCount || 'Unknown'}
- Subgroups: ${context?.subgroupCount || 0}
- Learning Modules: ${context?.learningModuleCount || 0}
- Discussions: ${context?.discussionCount || 0}
- Research Posts: ${context?.researchCount || 0}

**Suggested Actions:**
1. Review any pending member requests
2. Check for unanswered discussions
3. Recognize active contributors with badges
4. Consider creating new learning content

**Health Indicators:**
- Member Engagement: Check discussion participation
- Learning Progress: Review module completion rates
- Content Freshness: Ensure regular new posts

*For detailed analytics, please connect to the full Sage AI service.*`
}

function getGeneralFallback(query: string): string {
  if (query.includes('subgroup') || query.includes('team')) {
    return `**Subgroups in Projects:**

Subgroups are teams within your project focused on specific goals.

**Features:**
- Own leaders (can be different from project admins)
- Optional privacy (private = contribution restricted)
- Own discussions and resources
- Optional learning requirements

**Use Subgroups When:**
- You have distinct workstreams
- Different teams need separate spaces
- You want to organize by expertise area

Would you like help creating a subgroup?`
  }

  if (query.includes('research') || query.includes('article')) {
    return `**Research Posts:**

Research posts are article-style contributions with:
- **Heading** - Clear title
- **Summary** - Brief overview or your analysis
- **Source Link** - Where you found the information
- **Comments** - Discussion from other members

**Best Practices:**
- Add your own analysis, not just links
- Use tags to categorize research
- Cite sources properly

Would you like to create a research post?`
  }

  if (query.includes('learn') || query.includes('module') || query.includes('course')) {
    return `**Project Learning:**

Each project can have its own learning modules to:
- Onboard new members
- Share specialized knowledge
- Track member progress
- Set as prerequisites for contribution

**Module Types:**
- **Beginner** - Introduction to the topic
- **Intermediate** - Deeper knowledge
- **Advanced** - Expert-level content
- **Current State** - Catches up to project's progress

Would you like help creating learning content?`
  }

  // Default general response
  return `I'm Sage, your project assistant! I can help with:

- **Project Setup** - Create and configure projects
- **Admin Tasks** - Manage members, content, settings
- **Waiver Requests** - Analyze prerequisite exceptions
- **Insights** - Project health and suggestions
- **General Questions** - Any project-related help

What can I help you with today?`
}

/**
 * Extract keywords from query for better fallback matching
 */
export function extractQueryKeywords(query: string): string[] {
  const stopWords = ['the', 'a', 'an', 'is', 'are', 'was', 'were', 'what', 'how', 'can', 'do', 'does', 'i', 'you', 'we', 'my', 'your', 'this', 'that']

  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.includes(word))
}
