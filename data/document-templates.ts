/**
 * Document Templates
 * Pre-built content templates for common document types
 */

export interface DocumentTemplate {
  id: string
  name: string
  description: string
  type: 'GENERAL' | 'MEETING_NOTES' | 'PROPOSAL' | 'REPORT' | 'RESEARCH' | 'PLAN' | 'GUIDELINES' | 'AGENDA'
  icon: string
  content: string // HTML content for Tiptap
  category: string
  popularity: number
}

export const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    id: 'blank',
    name: 'Blank Document',
    description: 'Start with a clean slate',
    type: 'GENERAL',
    icon: '📄',
    content: '<p></p>',
    category: 'General',
    popularity: 10
  },

  {
    id: 'meeting-notes',
    name: 'Meeting Notes',
    description: 'Structured template for meeting documentation',
    type: 'MEETING_NOTES',
    icon: '📝',
    content: `
<h1>Meeting Notes: [Meeting Name]</h1>
<p><strong>Date:</strong> [Date]</p>
<p><strong>Time:</strong> [Time]</p>
<p><strong>Location:</strong> [Location/Virtual]</p>
<p><strong>Attendees:</strong> [List attendees]</p>

<h2>Agenda</h2>
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>

<h2>Discussion Points</h2>
<h3>Topic 1</h3>
<p>[Discussion notes]</p>

<h3>Topic 2</h3>
<p>[Discussion notes]</p>

<h2>Action Items</h2>
<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Action item 1 - Assigned to: [Name] - Due: [Date]</li>
  <li data-type="taskItem" data-checked="false">Action item 2 - Assigned to: [Name] - Due: [Date]</li>
</ul>

<h2>Next Steps</h2>
<p>[Next meeting date, follow-up items]</p>

<h2>Notes & Questions</h2>
<p>[Additional notes]</p>
    `,
    category: 'Meetings',
    popularity: 9
  },

  {
    id: 'project-proposal',
    name: 'Project Proposal',
    description: 'Comprehensive project proposal template',
    type: 'PROPOSAL',
    icon: '📋',
    content: `
<h1>Project Proposal: [Project Name]</h1>

<h2>Executive Summary</h2>
<p>Brief overview of the project (2-3 paragraphs)</p>

<h2>Problem Statement</h2>
<p>What problem does this project solve? Why is it important?</p>

<h2>Proposed Solution</h2>
<p>Description of your approach and methodology</p>

<h2>Goals & Objectives</h2>
<ul>
  <li><strong>Goal 1:</strong> [Description]</li>
  <li><strong>Goal 2:</strong> [Description]</li>
  <li><strong>Goal 3:</strong> [Description]</li>
</ul>

<h2>Timeline</h2>
<table>
  <thead>
    <tr>
      <th>Phase</th>
      <th>Duration</th>
      <th>Key Deliverables</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Phase 1: Planning</td>
      <td>[Timeframe]</td>
      <td>[Deliverables]</td>
    </tr>
    <tr>
      <td>Phase 2: Implementation</td>
      <td>[Timeframe]</td>
      <td>[Deliverables]</td>
    </tr>
    <tr>
      <td>Phase 3: Evaluation</td>
      <td>[Timeframe]</td>
      <td>[Deliverables]</td>
    </tr>
  </tbody>
</table>

<h2>Budget</h2>
<p>Estimated costs and funding requirements</p>

<h2>Team & Resources</h2>
<p>Who will work on this project and what resources are needed?</p>

<h2>Expected Impact</h2>
<p>What will be the outcomes and benefits?</p>

<h2>Risk Assessment</h2>
<ul>
  <li><strong>Risk 1:</strong> [Description] - Mitigation: [Strategy]</li>
  <li><strong>Risk 2:</strong> [Description] - Mitigation: [Strategy]</li>
</ul>

<h2>Conclusion</h2>
<p>Summary and call to action</p>
    `,
    category: 'Planning',
    popularity: 8
  },

  {
    id: 'research-report',
    name: 'Research Report',
    description: 'Academic-style research documentation',
    type: 'RESEARCH',
    icon: '🔬',
    content: `
<h1>[Research Title]</h1>
<p><strong>Author(s):</strong> [Names]</p>
<p><strong>Date:</strong> [Date]</p>

<h2>Abstract</h2>
<p>Brief summary of research objectives, methods, findings, and conclusions (150-250 words)</p>

<h2>1. Introduction</h2>
<h3>1.1 Background</h3>
<p>[Context and background information]</p>

<h3>1.2 Research Question</h3>
<p>[Main research question or hypothesis]</p>

<h3>1.3 Objectives</h3>
<ul>
  <li>Objective 1</li>
  <li>Objective 2</li>
  <li>Objective 3</li>
</ul>

<h2>2. Literature Review</h2>
<p>[Summary of existing research and knowledge gaps]</p>

<h2>3. Methodology</h2>
<h3>3.1 Research Design</h3>
<p>[Description of research approach]</p>

<h3>3.2 Data Collection</h3>
<p>[Methods used to gather data]</p>

<h3>3.3 Analysis</h3>
<p>[How data was analyzed]</p>

<h2>4. Findings</h2>
<p>[Presentation of research results]</p>

<h2>5. Discussion</h2>
<p>[Interpretation of findings and implications]</p>

<h2>6. Limitations</h2>
<p>[Constraints and limitations of the study]</p>

<h2>7. Conclusions</h2>
<p>[Summary of findings and recommendations]</p>

<h2>8. References</h2>
<ol>
  <li>[Reference 1]</li>
  <li>[Reference 2]</li>
  <li>[Reference 3]</li>
</ol>
    `,
    category: 'Research',
    popularity: 7
  },

  {
    id: 'action-plan',
    name: 'Action Plan',
    description: 'Strategic planning and execution roadmap',
    type: 'PLAN',
    icon: '🎯',
    content: `
<h1>Action Plan: [Plan Name]</h1>

<h2>Vision & Mission</h2>
<p><strong>Vision:</strong> [Long-term vision]</p>
<p><strong>Mission:</strong> [Purpose and mission statement]</p>

<h2>Goals</h2>
<ol>
  <li><strong>Goal 1:</strong> [SMART goal description]</li>
  <li><strong>Goal 2:</strong> [SMART goal description]</li>
  <li><strong>Goal 3:</strong> [SMART goal description]</li>
</ol>

<h2>Strategic Initiatives</h2>

<h3>Initiative 1: [Name]</h3>
<p><strong>Objective:</strong> [What will be achieved]</p>
<p><strong>Timeline:</strong> [Start - End dates]</p>
<p><strong>Responsible Party:</strong> [Person/Team]</p>

<h4>Action Steps:</h4>
<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Step 1 - Due: [Date]</li>
  <li data-type="taskItem" data-checked="false">Step 2 - Due: [Date]</li>
  <li data-type="taskItem" data-checked="false">Step 3 - Due: [Date]</li>
</ul>

<h4>Resources Needed:</h4>
<ul>
  <li>Resource 1</li>
  <li>Resource 2</li>
</ul>

<h4>Success Metrics:</h4>
<ul>
  <li>Metric 1: [Description]</li>
  <li>Metric 2: [Description]</li>
</ul>

<h3>Initiative 2: [Name]</h3>
<p>[Repeat structure above]</p>

<h2>Monitoring & Evaluation</h2>
<p>How progress will be tracked and reported</p>

<h2>Communication Plan</h2>
<p>How stakeholders will be kept informed</p>

<h2>Risk Management</h2>
<table>
  <thead>
    <tr>
      <th>Risk</th>
      <th>Likelihood</th>
      <th>Impact</th>
      <th>Mitigation Strategy</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>[Risk description]</td>
      <td>High/Medium/Low</td>
      <td>High/Medium/Low</td>
      <td>[Mitigation approach]</td>
    </tr>
  </tbody>
</table>
    `,
    category: 'Planning',
    popularity: 6
  },

  {
    id: 'community-guidelines',
    name: 'Community Guidelines',
    description: 'Establish community standards and expectations',
    type: 'GUIDELINES',
    icon: '📜',
    content: `
<h1>Community Guidelines</h1>

<h2>Welcome</h2>
<p>Welcome to our community! These guidelines help ensure a positive experience for everyone.</p>

<h2>Our Values</h2>
<ul>
  <li><strong>Respect:</strong> Treat all members with kindness and dignity</li>
  <li><strong>Collaboration:</strong> Work together towards common goals</li>
  <li><strong>Sustainability:</strong> Make decisions that benefit the environment</li>
  <li><strong>Transparency:</strong> Communicate openly and honestly</li>
  <li><strong>Inclusivity:</strong> Welcome diverse perspectives and backgrounds</li>
</ul>

<h2>Expected Behavior</h2>
<h3>Do:</h3>
<ul>
  <li>Be respectful and constructive in all interactions</li>
  <li>Share knowledge and help others learn</li>
  <li>Give credit where credit is due</li>
  <li>Report issues or concerns to moderators</li>
  <li>Stay on topic and contribute meaningfully</li>
</ul>

<h3>Don't:</h3>
<ul>
  <li>Harass, bully, or discriminate against anyone</li>
  <li>Share false information or spam</li>
  <li>Violate others' privacy or intellectual property</li>
  <li>Engage in commercial solicitation without permission</li>
  <li>Use offensive or inflammatory language</li>
</ul>

<h2>Content Standards</h2>
<p>All content should be:</p>
<ul>
  <li>Relevant to sustainability and community goals</li>
  <li>Factually accurate to the best of your knowledge</li>
  <li>Respectful of diverse viewpoints</li>
  <li>Free of personal attacks or harassment</li>
  <li>Legal and compliant with applicable laws</li>
</ul>

<h2>Moderation</h2>
<p>Moderators reserve the right to:</p>
<ul>
  <li>Remove content that violates these guidelines</li>
  <li>Issue warnings to members who violate rules</li>
  <li>Temporarily or permanently ban members for serious violations</li>
  <li>Make decisions on a case-by-case basis</li>
</ul>

<h2>Reporting Issues</h2>
<p>If you encounter content or behavior that violates these guidelines:</p>
<ol>
  <li>Use the report function if available</li>
  <li>Contact a moderator or admin directly</li>
  <li>Provide specific details about the issue</li>
  <li>Allow moderators time to investigate</li>
</ol>

<h2>Consequences</h2>
<p>Violations may result in:</p>
<ul>
  <li><strong>First offense:</strong> Warning and content removal</li>
  <li><strong>Second offense:</strong> Temporary suspension (7-30 days)</li>
  <li><strong>Serious/repeated offenses:</strong> Permanent ban</li>
</ul>

<h2>Appeals</h2>
<p>Members who disagree with moderation decisions may appeal by [appeal process]</p>

<h2>Updates</h2>
<p>These guidelines may be updated periodically. Major changes will be announced to the community.</p>

<p><em>Last updated: [Date]</em></p>
    `,
    category: 'Governance',
    popularity: 5
  },

  {
    id: 'progress-report',
    name: 'Progress Report',
    description: 'Track and communicate project progress',
    type: 'REPORT',
    icon: '📊',
    content: `
<h1>Progress Report: [Project Name]</h1>
<p><strong>Reporting Period:</strong> [Date Range]</p>
<p><strong>Submitted by:</strong> [Name]</p>

<h2>Executive Summary</h2>
<p>Brief overview of progress, achievements, and challenges (2-3 paragraphs)</p>

<h2>Accomplishments</h2>
<h3>Key Milestones Achieved</h3>
<ul>
  <li>✅ Milestone 1 - Completed [Date]</li>
  <li>✅ Milestone 2 - Completed [Date]</li>
  <li>✅ Milestone 3 - Completed [Date]</li>
</ul>

<h3>Activities Completed</h3>
<ul>
  <li>Activity 1</li>
  <li>Activity 2</li>
  <li>Activity 3</li>
</ul>

<h2>Current Status</h2>
<h3>In Progress</h3>
<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Task 1 - Expected completion: [Date]</li>
  <li data-type="taskItem" data-checked="false">Task 2 - Expected completion: [Date]</li>
</ul>

<h3>Upcoming</h3>
<ul>
  <li>Planned activity 1 - Starts: [Date]</li>
  <li>Planned activity 2 - Starts: [Date]</li>
</ul>

<h2>Challenges & Issues</h2>
<table>
  <thead>
    <tr>
      <th>Challenge</th>
      <th>Impact</th>
      <th>Resolution Plan</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>[Challenge description]</td>
      <td>High/Medium/Low</td>
      <td>[How it will be addressed]</td>
    </tr>
  </tbody>
</table>

<h2>Metrics & KPIs</h2>
<ul>
  <li><strong>Metric 1:</strong> [Current value] (Target: [Target value])</li>
  <li><strong>Metric 2:</strong> [Current value] (Target: [Target value])</li>
  <li><strong>Metric 3:</strong> [Current value] (Target: [Target value])</li>
</ul>

<h2>Budget Update</h2>
<p><strong>Budget Allocated:</strong> $[Amount]</p>
<p><strong>Spent to Date:</strong> $[Amount]</p>
<p><strong>Remaining:</strong> $[Amount]</p>

<h2>Next Steps</h2>
<ol>
  <li>Priority action 1</li>
  <li>Priority action 2</li>
  <li>Priority action 3</li>
</ol>

<h2>Support Needed</h2>
<p>Resources, assistance, or decisions required from stakeholders</p>

<h2>Attachments</h2>
<ul>
  <li>[Supporting document 1]</li>
  <li>[Supporting document 2]</li>
</ul>
    `,
    category: 'Reporting',
    popularity: 4
  }
]

/**
 * Get template by ID
 */
export function getDocumentTemplateById(id: string): DocumentTemplate | undefined {
  return DOCUMENT_TEMPLATES.find(t => t.id === id)
}

/**
 * Get templates by type
 */
export function getDocumentTemplatesByType(type: string): DocumentTemplate[] {
  return DOCUMENT_TEMPLATES.filter(t => t.type === type)
}

/**
 * Get templates by category
 */
export function getDocumentTemplatesByCategory(category: string): DocumentTemplate[] {
  return DOCUMENT_TEMPLATES.filter(t => t.category === category)
}

/**
 * Get all unique categories
 */
export function getDocumentTemplateCategories(): string[] {
  return [...new Set(DOCUMENT_TEMPLATES.map(t => t.category))]
}

/**
 * Sort templates by popularity
 */
export function getPopularDocumentTemplates(limit?: number): DocumentTemplate[] {
  const sorted = [...DOCUMENT_TEMPLATES].sort((a, b) => b.popularity - a.popularity)
  return limit ? sorted.slice(0, limit) : sorted
}
