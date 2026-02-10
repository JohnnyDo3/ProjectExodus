/**
 * Document Templates
 * Pre-built content templates for common document types
 */

export type TemplateCategory = 'General' | 'Project Management' | 'Engineering' | 'Content'

export interface DocumentTemplate {
  id: string
  name: string
  description: string
  icon: string // Lucide icon name
  category: TemplateCategory
  type: 'GENERAL' | 'MEETING_NOTES' | 'PROPOSAL' | 'REPORT' | 'RESEARCH' | 'PLAN' | 'GUIDELINES' | 'AGENDA' | 'SPEC' | 'STORY' | 'RETRO' | 'DESIGN' | 'CONTENT' | 'BUG'
  content: string // HTML content for TipTap
  popularity: number
}

export const TEMPLATE_CATEGORIES: { id: TemplateCategory; label: string; description: string }[] = [
  { id: 'General', label: 'General', description: 'Basic and versatile templates' },
  { id: 'Project Management', label: 'Project Management', description: 'Track progress and plan projects' },
  { id: 'Engineering', label: 'Engineering', description: 'Technical documentation and specs' },
  { id: 'Content', label: 'Content', description: 'Writing and creative templates' },
]

export const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  // ============================================
  // GENERAL TEMPLATES
  // ============================================
  {
    id: 'blank',
    name: 'Blank Document',
    description: 'Start with a clean slate. Perfect for when you want complete freedom.',
    icon: 'FileText',
    category: 'General',
    type: 'GENERAL',
    content: '<p></p>',
    popularity: 100
  },

  // ============================================
  // PROJECT MANAGEMENT TEMPLATES
  // ============================================
  {
    id: 'meeting-notes',
    name: 'Meeting Notes',
    description: 'Capture meeting discussions, decisions, and action items effectively.',
    icon: 'Users',
    category: 'Project Management',
    type: 'MEETING_NOTES',
    content: `<h1>Meeting Notes</h1>

<h2>Meeting Details</h2>
<table>
  <tbody>
    <tr>
      <td><strong>Date</strong></td>
      <td>[Enter date]</td>
    </tr>
    <tr>
      <td><strong>Time</strong></td>
      <td>[Start time] - [End time]</td>
    </tr>
    <tr>
      <td><strong>Location</strong></td>
      <td>[Meeting room / Video call link]</td>
    </tr>
    <tr>
      <td><strong>Facilitator</strong></td>
      <td>[Name]</td>
    </tr>
    <tr>
      <td><strong>Note Taker</strong></td>
      <td>[Name]</td>
    </tr>
  </tbody>
</table>

<h2>Attendees</h2>
<ul>
  <li>[Name] - [Role]</li>
  <li>[Name] - [Role]</li>
  <li>[Name] - [Role]</li>
</ul>

<h2>Agenda</h2>
<ol>
  <li>[Agenda item 1] - [Time allocation]</li>
  <li>[Agenda item 2] - [Time allocation]</li>
  <li>[Agenda item 3] - [Time allocation]</li>
</ol>

<h2>Discussion Points</h2>

<h3>Topic 1: [Title]</h3>
<p><strong>Presenter:</strong> [Name]</p>
<p>[Summary of discussion, key points raised, and any decisions made]</p>

<h3>Topic 2: [Title]</h3>
<p><strong>Presenter:</strong> [Name]</p>
<p>[Summary of discussion, key points raised, and any decisions made]</p>

<h2>Action Items</h2>
<table>
  <thead>
    <tr>
      <th>Action</th>
      <th>Owner</th>
      <th>Due Date</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>[Action item description]</td>
      <td>[Name]</td>
      <td>[Date]</td>
      <td>Pending</td>
    </tr>
    <tr>
      <td>[Action item description]</td>
      <td>[Name]</td>
      <td>[Date]</td>
      <td>Pending</td>
    </tr>
    <tr>
      <td>[Action item description]</td>
      <td>[Name]</td>
      <td>[Date]</td>
      <td>Pending</td>
    </tr>
  </tbody>
</table>

<h2>Next Steps</h2>
<ul>
  <li><strong>Next meeting:</strong> [Date, Time, Location]</li>
  <li><strong>Follow-up items:</strong> [List any items requiring follow-up]</li>
</ul>

<h2>Additional Notes</h2>
<p>[Any other relevant information or notes from the meeting]</p>`,
    popularity: 95
  },

  {
    id: 'project-proposal',
    name: 'Project Proposal',
    description: 'Present a compelling case for your project with executive summary, timeline, and budget.',
    icon: 'Lightbulb',
    category: 'Project Management',
    type: 'PROPOSAL',
    content: `<h1>Project Proposal: [Project Name]</h1>
<p><em>Prepared by: [Your Name] | Date: [Date]</em></p>

<h2>Executive Summary</h2>
<p>Provide a high-level overview of the project in 2-3 paragraphs. Include the problem being addressed, your proposed solution, expected outcomes, and why this project is important. This section should give stakeholders a clear understanding of the project at a glance.</p>

<h2>Problem Statement</h2>
<h3>Current Situation</h3>
<p>[Describe the current state and pain points]</p>

<h3>Impact of the Problem</h3>
<ul>
  <li>[Impact on users/customers]</li>
  <li>[Impact on operations]</li>
  <li>[Impact on revenue/costs]</li>
  <li>[Impact on team productivity]</li>
</ul>

<h3>Why Now?</h3>
<p>[Explain the urgency and why this needs to be addressed now]</p>

<h2>Proposed Solution</h2>
<h3>Overview</h3>
<p>[Describe your proposed approach at a high level]</p>

<h3>Key Features/Components</h3>
<ul>
  <li><strong>[Feature 1]:</strong> [Description]</li>
  <li><strong>[Feature 2]:</strong> [Description]</li>
  <li><strong>[Feature 3]:</strong> [Description]</li>
</ul>

<h3>Technical Approach</h3>
<p>[Brief description of the technical strategy]</p>

<h2>Timeline</h2>
<table>
  <thead>
    <tr>
      <th>Phase</th>
      <th>Duration</th>
      <th>Key Milestones</th>
      <th>Deliverables</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Phase 1:</strong> Discovery & Planning</td>
      <td>[X weeks]</td>
      <td>[Milestones]</td>
      <td>[Deliverables]</td>
    </tr>
    <tr>
      <td><strong>Phase 2:</strong> Design & Development</td>
      <td>[X weeks]</td>
      <td>[Milestones]</td>
      <td>[Deliverables]</td>
    </tr>
    <tr>
      <td><strong>Phase 3:</strong> Testing & QA</td>
      <td>[X weeks]</td>
      <td>[Milestones]</td>
      <td>[Deliverables]</td>
    </tr>
    <tr>
      <td><strong>Phase 4:</strong> Launch & Evaluation</td>
      <td>[X weeks]</td>
      <td>[Milestones]</td>
      <td>[Deliverables]</td>
    </tr>
  </tbody>
</table>

<h2>Budget</h2>
<table>
  <thead>
    <tr>
      <th>Category</th>
      <th>Description</th>
      <th>Estimated Cost</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Personnel</td>
      <td>[Team costs, contractors]</td>
      <td>$[Amount]</td>
    </tr>
    <tr>
      <td>Technology</td>
      <td>[Software, infrastructure]</td>
      <td>$[Amount]</td>
    </tr>
    <tr>
      <td>Operations</td>
      <td>[Ongoing costs]</td>
      <td>$[Amount]</td>
    </tr>
    <tr>
      <td>Contingency</td>
      <td>[10-20% buffer]</td>
      <td>$[Amount]</td>
    </tr>
    <tr>
      <td><strong>Total</strong></td>
      <td></td>
      <td><strong>$[Total]</strong></td>
    </tr>
  </tbody>
</table>

<h2>Success Metrics</h2>
<table>
  <thead>
    <tr>
      <th>Metric</th>
      <th>Current State</th>
      <th>Target</th>
      <th>Measurement Method</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>[Metric 1]</td>
      <td>[Baseline]</td>
      <td>[Goal]</td>
      <td>[How to measure]</td>
    </tr>
    <tr>
      <td>[Metric 2]</td>
      <td>[Baseline]</td>
      <td>[Goal]</td>
      <td>[How to measure]</td>
    </tr>
    <tr>
      <td>[Metric 3]</td>
      <td>[Baseline]</td>
      <td>[Goal]</td>
      <td>[How to measure]</td>
    </tr>
  </tbody>
</table>

<h2>Risks & Mitigation</h2>
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
      <td>[Risk 1]</td>
      <td>High/Medium/Low</td>
      <td>High/Medium/Low</td>
      <td>[Strategy]</td>
    </tr>
    <tr>
      <td>[Risk 2]</td>
      <td>High/Medium/Low</td>
      <td>High/Medium/Low</td>
      <td>[Strategy]</td>
    </tr>
  </tbody>
</table>

<h2>Team & Resources</h2>
<ul>
  <li><strong>Project Lead:</strong> [Name] - [Role & responsibilities]</li>
  <li><strong>Team Members:</strong> [Names and roles]</li>
  <li><strong>Stakeholders:</strong> [Key stakeholders and their involvement]</li>
</ul>

<h2>Conclusion</h2>
<p>[Summarize the key points and provide a clear call to action. What do you need from stakeholders to move forward?]</p>

<h2>Appendix</h2>
<p>[Include any supporting materials, research, or detailed information]</p>`,
    popularity: 90
  },

  {
    id: 'retrospective',
    name: 'Retrospective',
    description: 'Reflect on what went well, what could improve, and celebrate team wins.',
    icon: 'RotateCcw',
    category: 'Project Management',
    type: 'RETRO',
    content: `<h1>Team Retrospective</h1>
<p><em>Sprint/Project: [Name] | Date: [Date]</em></p>

<h2>Retrospective Details</h2>
<table>
  <tbody>
    <tr>
      <td><strong>Sprint/Iteration</strong></td>
      <td>[Sprint number or project phase]</td>
    </tr>
    <tr>
      <td><strong>Date Range</strong></td>
      <td>[Start date] - [End date]</td>
    </tr>
    <tr>
      <td><strong>Facilitator</strong></td>
      <td>[Name]</td>
    </tr>
    <tr>
      <td><strong>Participants</strong></td>
      <td>[Team members present]</td>
    </tr>
  </tbody>
</table>

<h2>What Went Well</h2>
<p><em>Celebrate successes and things we should continue doing.</em></p>
<ul>
  <li>[Success 1 - describe what worked well]</li>
  <li>[Success 2 - describe what worked well]</li>
  <li>[Success 3 - describe what worked well]</li>
  <li>[Success 4 - describe what worked well]</li>
</ul>

<h2>What Didn't Go Well</h2>
<p><em>Identify challenges and areas for improvement (no blame, just learning).</em></p>
<ul>
  <li>[Challenge 1 - describe the issue and its impact]</li>
  <li>[Challenge 2 - describe the issue and its impact]</li>
  <li>[Challenge 3 - describe the issue and its impact]</li>
  <li>[Challenge 4 - describe the issue and its impact]</li>
</ul>

<h2>Action Items</h2>
<p><em>Concrete steps we'll take to improve in the next iteration.</em></p>
<table>
  <thead>
    <tr>
      <th>Action</th>
      <th>Owner</th>
      <th>Due Date</th>
      <th>Priority</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>[Specific action to take]</td>
      <td>[Name]</td>
      <td>[Date]</td>
      <td>High/Medium/Low</td>
    </tr>
    <tr>
      <td>[Specific action to take]</td>
      <td>[Name]</td>
      <td>[Date]</td>
      <td>High/Medium/Low</td>
    </tr>
    <tr>
      <td>[Specific action to take]</td>
      <td>[Name]</td>
      <td>[Date]</td>
      <td>High/Medium/Low</td>
    </tr>
  </tbody>
</table>

<h2>Shoutouts</h2>
<p><em>Recognize team members who went above and beyond.</em></p>
<ul>
  <li><strong>[Name]:</strong> [Reason for recognition - specific accomplishment or behavior]</li>
  <li><strong>[Name]:</strong> [Reason for recognition - specific accomplishment or behavior]</li>
  <li><strong>[Name]:</strong> [Reason for recognition - specific accomplishment or behavior]</li>
</ul>

<h2>Follow-up from Previous Retrospective</h2>
<p><em>Review action items from the last retrospective.</em></p>
<table>
  <thead>
    <tr>
      <th>Previous Action</th>
      <th>Status</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>[Action from last retro]</td>
      <td>Complete/In Progress/Not Started</td>
      <td>[Any relevant notes]</td>
    </tr>
    <tr>
      <td>[Action from last retro]</td>
      <td>Complete/In Progress/Not Started</td>
      <td>[Any relevant notes]</td>
    </tr>
  </tbody>
</table>

<h2>Team Mood</h2>
<p><em>How is the team feeling overall?</em></p>
<p><strong>Overall team sentiment:</strong> [Great / Good / Okay / Concerned]</p>
<p><strong>Notes:</strong> [Any observations about team morale or dynamics]</p>`,
    popularity: 80
  },

  // ============================================
  // ENGINEERING TEMPLATES
  // ============================================
  {
    id: 'technical-specification',
    name: 'Technical Specification',
    description: 'Document system architecture, APIs, data models, and implementation plans.',
    icon: 'Code',
    category: 'Engineering',
    type: 'SPEC',
    content: `<h1>Technical Specification</h1>
<p><em>Document Version: 1.0 | Author: [Name] | Last Updated: [Date]</em></p>

<h2>Overview</h2>
<h3>Purpose</h3>
<p>[Explain what this specification covers and its purpose]</p>

<h3>Scope</h3>
<p>[Define what is in scope and out of scope for this specification]</p>

<h3>Glossary</h3>
<table>
  <thead>
    <tr>
      <th>Term</th>
      <th>Definition</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>[Term 1]</td>
      <td>[Definition]</td>
    </tr>
    <tr>
      <td>[Term 2]</td>
      <td>[Definition]</td>
    </tr>
  </tbody>
</table>

<h2>Requirements</h2>
<h3>Functional Requirements</h3>
<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Requirement</th>
      <th>Priority</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>FR-001</td>
      <td>[Functional requirement description]</td>
      <td>Must Have</td>
      <td>[Notes]</td>
    </tr>
    <tr>
      <td>FR-002</td>
      <td>[Functional requirement description]</td>
      <td>Should Have</td>
      <td>[Notes]</td>
    </tr>
    <tr>
      <td>FR-003</td>
      <td>[Functional requirement description]</td>
      <td>Nice to Have</td>
      <td>[Notes]</td>
    </tr>
  </tbody>
</table>

<h3>Non-Functional Requirements</h3>
<ul>
  <li><strong>Performance:</strong> [Response time, throughput requirements]</li>
  <li><strong>Scalability:</strong> [Expected load, growth projections]</li>
  <li><strong>Security:</strong> [Security requirements and considerations]</li>
  <li><strong>Availability:</strong> [Uptime requirements, SLAs]</li>
  <li><strong>Maintainability:</strong> [Code quality, documentation standards]</li>
</ul>

<h2>Architecture</h2>
<h3>System Overview</h3>
<p>[High-level description of the system architecture]</p>
<p><em>[Consider adding an architecture diagram here]</em></p>

<h3>Components</h3>
<table>
  <thead>
    <tr>
      <th>Component</th>
      <th>Responsibility</th>
      <th>Technology</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>[Component 1]</td>
      <td>[What it does]</td>
      <td>[Tech stack]</td>
    </tr>
    <tr>
      <td>[Component 2]</td>
      <td>[What it does]</td>
      <td>[Tech stack]</td>
    </tr>
    <tr>
      <td>[Component 3]</td>
      <td>[What it does]</td>
      <td>[Tech stack]</td>
    </tr>
  </tbody>
</table>

<h3>Dependencies</h3>
<ul>
  <li><strong>External Services:</strong> [List external APIs or services]</li>
  <li><strong>Internal Services:</strong> [List internal dependencies]</li>
  <li><strong>Libraries:</strong> [Key libraries and frameworks]</li>
</ul>

<h2>API Design</h2>
<h3>Endpoints</h3>

<h4>Endpoint 1: [Name]</h4>
<p><code>[METHOD] /api/[path]</code></p>
<p><strong>Description:</strong> [What this endpoint does]</p>
<p><strong>Authentication:</strong> [Required/Optional/None]</p>
<p><strong>Request:</strong></p>
<pre><code>{
  "field1": "string",
  "field2": "number",
  "field3": {
    "nestedField": "boolean"
  }
}</code></pre>
<p><strong>Response:</strong></p>
<pre><code>{
  "success": true,
  "data": {
    "id": "string",
    "createdAt": "datetime"
  }
}</code></pre>
<p><strong>Error Codes:</strong></p>
<ul>
  <li><code>400</code> - Bad Request: [Description]</li>
  <li><code>401</code> - Unauthorized: [Description]</li>
  <li><code>404</code> - Not Found: [Description]</li>
  <li><code>500</code> - Server Error: [Description]</li>
</ul>

<h2>Data Models</h2>
<h3>Entity: [Name]</h3>
<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>id</td>
      <td>UUID</td>
      <td>Yes</td>
      <td>Unique identifier</td>
    </tr>
    <tr>
      <td>[field2]</td>
      <td>[Type]</td>
      <td>[Yes/No]</td>
      <td>[Description]</td>
    </tr>
    <tr>
      <td>[field3]</td>
      <td>[Type]</td>
      <td>[Yes/No]</td>
      <td>[Description]</td>
    </tr>
    <tr>
      <td>createdAt</td>
      <td>DateTime</td>
      <td>Yes</td>
      <td>Record creation timestamp</td>
    </tr>
    <tr>
      <td>updatedAt</td>
      <td>DateTime</td>
      <td>Yes</td>
      <td>Last update timestamp</td>
    </tr>
  </tbody>
</table>

<h3>Relationships</h3>
<ul>
  <li>[Entity A] has many [Entity B]</li>
  <li>[Entity B] belongs to [Entity A]</li>
  <li>[Entity C] has one [Entity D]</li>
</ul>

<h2>Implementation Plan</h2>
<h3>Phase 1: Foundation</h3>
<ul>
  <li>[ ] Set up project structure and tooling</li>
  <li>[ ] Implement core data models</li>
  <li>[ ] Create basic API endpoints</li>
</ul>

<h3>Phase 2: Core Features</h3>
<ul>
  <li>[ ] Implement [Feature 1]</li>
  <li>[ ] Implement [Feature 2]</li>
  <li>[ ] Add authentication and authorization</li>
</ul>

<h3>Phase 3: Polish & Testing</h3>
<ul>
  <li>[ ] Write unit tests</li>
  <li>[ ] Write integration tests</li>
  <li>[ ] Performance optimization</li>
  <li>[ ] Documentation</li>
</ul>

<h2>Testing Strategy</h2>
<ul>
  <li><strong>Unit Tests:</strong> [Approach and coverage targets]</li>
  <li><strong>Integration Tests:</strong> [Key scenarios to test]</li>
  <li><strong>E2E Tests:</strong> [Critical user journeys]</li>
  <li><strong>Performance Tests:</strong> [Load testing approach]</li>
</ul>

<h2>Security Considerations</h2>
<ul>
  <li>[Security consideration 1]</li>
  <li>[Security consideration 2]</li>
  <li>[Security consideration 3]</li>
</ul>

<h2>Open Questions</h2>
<ul>
  <li>[ ] [Question 1 that needs to be resolved]</li>
  <li>[ ] [Question 2 that needs to be resolved]</li>
</ul>

<h2>References</h2>
<ul>
  <li>[Link to related documents]</li>
  <li>[Link to external resources]</li>
</ul>`,
    popularity: 85
  },

  {
    id: 'user-story',
    name: 'User Story',
    description: 'Capture user needs with clear acceptance criteria and implementation notes.',
    icon: 'Target',
    category: 'Engineering',
    type: 'STORY',
    content: `<h1>User Story: [Story Title]</h1>
<p><em>Story ID: [US-XXX] | Priority: [High/Medium/Low] | Points: [X]</em></p>

<h2>User Story</h2>
<blockquote>
<p><strong>As a</strong> [type of user/persona],</p>
<p><strong>I want</strong> [goal or action],</p>
<p><strong>So that</strong> [benefit or value].</p>
</blockquote>

<h2>Background & Context</h2>
<p>[Provide additional context about why this story is important, any relevant history, or user research that informed this story]</p>

<h2>Acceptance Criteria</h2>
<p><em>The story is complete when all of the following are true:</em></p>

<h3>Functional Criteria</h3>
<ul>
  <li><strong>Given</strong> [initial context/state]<br/>
  <strong>When</strong> [action is taken]<br/>
  <strong>Then</strong> [expected result]</li>
</ul>
<ul>
  <li><strong>Given</strong> [initial context/state]<br/>
  <strong>When</strong> [action is taken]<br/>
  <strong>Then</strong> [expected result]</li>
</ul>
<ul>
  <li><strong>Given</strong> [initial context/state]<br/>
  <strong>When</strong> [action is taken]<br/>
  <strong>Then</strong> [expected result]</li>
</ul>

<h3>Non-Functional Criteria</h3>
<ul>
  <li>[ ] Accessible according to WCAG 2.1 AA standards</li>
  <li>[ ] Page load time under [X] seconds</li>
  <li>[ ] Works on mobile devices (responsive)</li>
  <li>[ ] Unit test coverage of [X]%</li>
</ul>

<h2>Design & Mockups</h2>
<p>[Link to Figma, screenshots, or describe the expected UI]</p>

<h2>Technical Notes</h2>
<h3>Implementation Approach</h3>
<p>[High-level description of how this will be implemented]</p>

<h3>Components Affected</h3>
<ul>
  <li>[Component/file 1]</li>
  <li>[Component/file 2]</li>
  <li>[Component/file 3]</li>
</ul>

<h3>API Changes</h3>
<p>[Describe any API additions or modifications needed]</p>

<h3>Database Changes</h3>
<p>[Describe any schema changes needed]</p>

<h2>Dependencies</h2>
<ul>
  <li><strong>Blocked by:</strong> [List any stories this depends on]</li>
  <li><strong>Blocks:</strong> [List any stories that depend on this]</li>
  <li><strong>Related:</strong> [List related stories]</li>
</ul>

<h2>Edge Cases & Error Handling</h2>
<table>
  <thead>
    <tr>
      <th>Scenario</th>
      <th>Expected Behavior</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>[Edge case 1]</td>
      <td>[How the system should handle it]</td>
    </tr>
    <tr>
      <td>[Edge case 2]</td>
      <td>[How the system should handle it]</td>
    </tr>
    <tr>
      <td>[Error scenario]</td>
      <td>[Error message and recovery]</td>
    </tr>
  </tbody>
</table>

<h2>Testing Notes</h2>
<ul>
  <li>[Specific testing scenarios to verify]</li>
  <li>[Test data requirements]</li>
  <li>[Manual testing steps if needed]</li>
</ul>

<h2>Open Questions</h2>
<ul>
  <li>[ ] [Question 1]</li>
  <li>[ ] [Question 2]</li>
</ul>

<h2>Definition of Done</h2>
<ul>
  <li>[ ] Code complete and reviewed</li>
  <li>[ ] Unit tests written and passing</li>
  <li>[ ] Integration tests written and passing</li>
  <li>[ ] Documentation updated</li>
  <li>[ ] Deployed to staging and verified</li>
  <li>[ ] Product owner has accepted the story</li>
</ul>`,
    popularity: 75
  },

  {
    id: 'bug-report',
    name: 'Bug Report',
    description: 'Document issues with clear reproduction steps, expected vs actual behavior.',
    icon: 'Bug',
    category: 'Engineering',
    type: 'BUG',
    content: `<h1>Bug Report: [Brief Description]</h1>
<p><em>Bug ID: [BUG-XXX] | Severity: [Critical/High/Medium/Low] | Priority: [P0/P1/P2/P3]</em></p>

<h2>Summary</h2>
<p>[One or two sentences describing the bug]</p>

<h2>Environment</h2>
<table>
  <tbody>
    <tr>
      <td><strong>Application Version</strong></td>
      <td>[Version number or commit hash]</td>
    </tr>
    <tr>
      <td><strong>Environment</strong></td>
      <td>[Production/Staging/Development]</td>
    </tr>
    <tr>
      <td><strong>Browser</strong></td>
      <td>[Browser name and version]</td>
    </tr>
    <tr>
      <td><strong>Operating System</strong></td>
      <td>[OS name and version]</td>
    </tr>
    <tr>
      <td><strong>Device</strong></td>
      <td>[Desktop/Mobile/Tablet - specific model if relevant]</td>
    </tr>
    <tr>
      <td><strong>User Account</strong></td>
      <td>[Test account used, if applicable]</td>
    </tr>
  </tbody>
</table>

<h2>Steps to Reproduce</h2>
<ol>
  <li>[First step - be specific, include URLs, button names, etc.]</li>
  <li>[Second step]</li>
  <li>[Third step]</li>
  <li>[Fourth step - the action that triggers the bug]</li>
</ol>

<h3>Preconditions</h3>
<ul>
  <li>[Any required state before starting, e.g., "User must be logged in"]</li>
  <li>[Any specific data requirements]</li>
</ul>

<h2>Expected Behavior</h2>
<p>[Describe what should happen when following the steps above]</p>

<h2>Actual Behavior</h2>
<p>[Describe what actually happens - include any error messages exactly as shown]</p>

<h2>Screenshots / Recordings</h2>
<p><em>[Attach screenshots, screen recordings, or GIFs that demonstrate the issue]</em></p>
<p>[Describe what each screenshot shows]</p>

<h2>Error Messages / Logs</h2>
<h3>Console Errors</h3>
<pre><code>[Paste any browser console errors here]</code></pre>

<h3>Network Errors</h3>
<pre><code>[Paste any relevant network request/response details]</code></pre>

<h3>Server Logs</h3>
<pre><code>[Paste any relevant server-side error logs]</code></pre>

<h2>Impact Assessment</h2>
<table>
  <tbody>
    <tr>
      <td><strong>Users Affected</strong></td>
      <td>[All users / Specific segment / Single user]</td>
    </tr>
    <tr>
      <td><strong>Frequency</strong></td>
      <td>[Always / Sometimes / Rarely]</td>
    </tr>
    <tr>
      <td><strong>Workaround Available</strong></td>
      <td>[Yes/No - describe workaround if available]</td>
    </tr>
    <tr>
      <td><strong>Business Impact</strong></td>
      <td>[Describe impact on users or business]</td>
    </tr>
  </tbody>
</table>

<h2>Additional Context</h2>
<ul>
  <li>[When did this start happening?]</li>
  <li>[Was this working before? After what change?]</li>
  <li>[Any patterns noticed - specific times, user types, etc.?]</li>
</ul>

<h2>Related Issues</h2>
<ul>
  <li>[Link to related bugs or stories]</li>
  <li>[Link to similar past issues]</li>
</ul>

<h2>Investigation Notes</h2>
<p><em>[For developers: notes from investigation]</em></p>
<ul>
  <li>[Finding 1]</li>
  <li>[Finding 2]</li>
</ul>

<h2>Proposed Fix</h2>
<p><em>[For developers: description of the planned fix]</em></p>

<h2>Verification Steps</h2>
<p><em>[Steps to verify the fix works]</em></p>
<ol>
  <li>[Step 1]</li>
  <li>[Step 2]</li>
  <li>[Confirm expected behavior]</li>
</ol>`,
    popularity: 70
  },

  // ============================================
  // CONTENT TEMPLATES
  // ============================================
  {
    id: 'research-report',
    name: 'Research Report',
    description: 'Structure research findings with abstract, methodology, analysis, and conclusions.',
    icon: 'FlaskConical',
    category: 'Content',
    type: 'RESEARCH',
    content: `<h1>[Research Title]</h1>
<p><em>Author(s): [Names] | Institution: [Organization] | Date: [Date]</em></p>

<h2>Abstract</h2>
<p>[Write a 150-300 word summary covering: research objectives, methodology used, key findings, and main conclusions. This should give readers a complete overview of your research without reading the full report.]</p>

<h2>1. Introduction</h2>
<h3>1.1 Background</h3>
<p>[Provide context for your research. What is the broader topic area? Why is this topic important?]</p>

<h3>1.2 Problem Statement</h3>
<p>[Clearly define the problem or gap in knowledge that your research addresses]</p>

<h3>1.3 Research Questions</h3>
<p><em>This research aims to answer the following questions:</em></p>
<ol>
  <li>[Primary research question]</li>
  <li>[Secondary research question]</li>
  <li>[Tertiary research question, if applicable]</li>
</ol>

<h3>1.4 Objectives</h3>
<ul>
  <li>[Objective 1]</li>
  <li>[Objective 2]</li>
  <li>[Objective 3]</li>
</ul>

<h3>1.5 Scope and Limitations</h3>
<p>[Define what is and isn't covered by this research]</p>

<h2>2. Literature Review</h2>
<h3>2.1 Theoretical Framework</h3>
<p>[Discuss relevant theories and concepts that inform your research]</p>

<h3>2.2 Previous Research</h3>
<p>[Summarize key findings from existing studies in this area]</p>

<h3>2.3 Research Gap</h3>
<p>[Explain what gaps exist in current knowledge that your research addresses]</p>

<h2>3. Methodology</h2>
<h3>3.1 Research Design</h3>
<p>[Describe your overall approach - qualitative, quantitative, mixed methods, etc.]</p>

<h3>3.2 Data Collection</h3>
<p>[Explain how you gathered your data]</p>
<ul>
  <li><strong>Sample:</strong> [Describe your sample size and selection criteria]</li>
  <li><strong>Methods:</strong> [Surveys, interviews, experiments, secondary data, etc.]</li>
  <li><strong>Timeline:</strong> [When data was collected]</li>
</ul>

<h3>3.3 Data Analysis</h3>
<p>[Describe how you analyzed the collected data]</p>

<h3>3.4 Ethical Considerations</h3>
<p>[Discuss any ethical issues and how they were addressed]</p>

<h2>4. Findings</h2>
<h3>4.1 Key Finding 1</h3>
<p>[Present your first major finding with supporting data/evidence]</p>

<h3>4.2 Key Finding 2</h3>
<p>[Present your second major finding with supporting data/evidence]</p>

<h3>4.3 Key Finding 3</h3>
<p>[Present your third major finding with supporting data/evidence]</p>

<h3>4.4 Summary of Results</h3>
<table>
  <thead>
    <tr>
      <th>Research Question</th>
      <th>Key Finding</th>
      <th>Significance</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>[RQ1]</td>
      <td>[Finding]</td>
      <td>[Why it matters]</td>
    </tr>
    <tr>
      <td>[RQ2]</td>
      <td>[Finding]</td>
      <td>[Why it matters]</td>
    </tr>
  </tbody>
</table>

<h2>5. Analysis & Discussion</h2>
<h3>5.1 Interpretation of Results</h3>
<p>[Discuss what your findings mean in the context of your research questions]</p>

<h3>5.2 Comparison with Existing Literature</h3>
<p>[How do your findings compare with previous research?]</p>

<h3>5.3 Implications</h3>
<ul>
  <li><strong>Theoretical implications:</strong> [What this means for theory]</li>
  <li><strong>Practical implications:</strong> [What this means for practice]</li>
</ul>

<h2>6. Conclusion</h2>
<h3>6.1 Summary of Key Findings</h3>
<p>[Briefly summarize the most important findings]</p>

<h3>6.2 Contributions</h3>
<p>[What new knowledge or insights does this research provide?]</p>

<h3>6.3 Limitations</h3>
<p>[Acknowledge the limitations of your research]</p>

<h3>6.4 Recommendations for Future Research</h3>
<ul>
  <li>[Recommendation 1]</li>
  <li>[Recommendation 2]</li>
  <li>[Recommendation 3]</li>
</ul>

<h2>7. References</h2>
<ol>
  <li>[Author Last, First. (Year). Title. Journal/Publisher. DOI/URL]</li>
  <li>[Author Last, First. (Year). Title. Journal/Publisher. DOI/URL]</li>
  <li>[Author Last, First. (Year). Title. Journal/Publisher. DOI/URL]</li>
  <li>[Author Last, First. (Year). Title. Journal/Publisher. DOI/URL]</li>
  <li>[Author Last, First. (Year). Title. Journal/Publisher. DOI/URL]</li>
</ol>

<h2>8. Appendices</h2>
<h3>Appendix A: [Title]</h3>
<p>[Supporting materials, raw data, survey instruments, etc.]</p>

<h3>Appendix B: [Title]</h3>
<p>[Additional supporting materials]</p>`,
    popularity: 65
  },

  {
    id: 'design-brief',
    name: 'Design Brief',
    description: 'Define project scope, objectives, audience, deliverables, and design constraints.',
    icon: 'Palette',
    category: 'Content',
    type: 'DESIGN',
    content: `<h1>Design Brief: [Project Name]</h1>
<p><em>Version: 1.0 | Date: [Date] | Prepared by: [Name]</em></p>

<h2>Project Overview</h2>
<h3>Project Summary</h3>
<p>[Provide a 2-3 sentence summary of what this design project is about]</p>

<h3>Background</h3>
<p>[Explain the context - why is this project happening? What led to this need?]</p>

<h3>Project Type</h3>
<p>[e.g., Website redesign, Mobile app, Brand identity, Marketing campaign, Product packaging, etc.]</p>

<h2>Objectives</h2>
<h3>Primary Goal</h3>
<p>[What is the main thing this design needs to achieve?]</p>

<h3>Secondary Goals</h3>
<ul>
  <li>[Secondary goal 1]</li>
  <li>[Secondary goal 2]</li>
  <li>[Secondary goal 3]</li>
</ul>

<h3>Success Metrics</h3>
<table>
  <thead>
    <tr>
      <th>Metric</th>
      <th>Current</th>
      <th>Target</th>
      <th>How to Measure</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>[Metric 1]</td>
      <td>[Baseline]</td>
      <td>[Goal]</td>
      <td>[Method]</td>
    </tr>
    <tr>
      <td>[Metric 2]</td>
      <td>[Baseline]</td>
      <td>[Goal]</td>
      <td>[Method]</td>
    </tr>
  </tbody>
</table>

<h2>Target Audience</h2>
<h3>Primary Audience</h3>
<table>
  <tbody>
    <tr>
      <td><strong>Demographics</strong></td>
      <td>[Age, gender, location, income, education, etc.]</td>
    </tr>
    <tr>
      <td><strong>Psychographics</strong></td>
      <td>[Values, interests, lifestyle, attitudes]</td>
    </tr>
    <tr>
      <td><strong>Behaviors</strong></td>
      <td>[How they interact with similar products/services]</td>
    </tr>
    <tr>
      <td><strong>Pain Points</strong></td>
      <td>[What problems do they face?]</td>
    </tr>
    <tr>
      <td><strong>Goals</strong></td>
      <td>[What are they trying to achieve?]</td>
    </tr>
  </tbody>
</table>

<h3>Secondary Audience</h3>
<p>[Describe any secondary audiences to consider]</p>

<h3>User Personas</h3>
<p><em>[Link to or describe key user personas]</em></p>

<h2>Deliverables</h2>
<table>
  <thead>
    <tr>
      <th>Deliverable</th>
      <th>Description</th>
      <th>Format</th>
      <th>Due Date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>[Deliverable 1]</td>
      <td>[Description]</td>
      <td>[Format/specs]</td>
      <td>[Date]</td>
    </tr>
    <tr>
      <td>[Deliverable 2]</td>
      <td>[Description]</td>
      <td>[Format/specs]</td>
      <td>[Date]</td>
    </tr>
    <tr>
      <td>[Deliverable 3]</td>
      <td>[Description]</td>
      <td>[Format/specs]</td>
      <td>[Date]</td>
    </tr>
  </tbody>
</table>

<h2>Timeline</h2>
<table>
  <thead>
    <tr>
      <th>Phase</th>
      <th>Activities</th>
      <th>Duration</th>
      <th>Deadline</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Discovery</strong></td>
      <td>Research, stakeholder interviews, competitive analysis</td>
      <td>[X days/weeks]</td>
      <td>[Date]</td>
    </tr>
    <tr>
      <td><strong>Concept</strong></td>
      <td>Ideation, initial concepts, mood boards</td>
      <td>[X days/weeks]</td>
      <td>[Date]</td>
    </tr>
    <tr>
      <td><strong>Design</strong></td>
      <td>Detailed design, iterations based on feedback</td>
      <td>[X days/weeks]</td>
      <td>[Date]</td>
    </tr>
    <tr>
      <td><strong>Refinement</strong></td>
      <td>Final revisions, asset preparation</td>
      <td>[X days/weeks]</td>
      <td>[Date]</td>
    </tr>
    <tr>
      <td><strong>Delivery</strong></td>
      <td>Final files, handoff, documentation</td>
      <td>[X days/weeks]</td>
      <td>[Date]</td>
    </tr>
  </tbody>
</table>

<h2>Constraints</h2>
<h3>Budget</h3>
<p>[Budget amount or range, if applicable]</p>

<h3>Technical Constraints</h3>
<ul>
  <li>[Platform/technology limitations]</li>
  <li>[File size or format requirements]</li>
  <li>[Accessibility requirements]</li>
</ul>

<h3>Brand Guidelines</h3>
<ul>
  <li>[Link to or summarize existing brand guidelines]</li>
  <li>[Required brand elements: logo, colors, fonts]</li>
  <li>[What can/cannot be changed]</li>
</ul>

<h3>Legal/Compliance</h3>
<ul>
  <li>[Any legal requirements or restrictions]</li>
  <li>[Compliance standards to follow]</li>
</ul>

<h2>Inspiration & Direction</h2>
<h3>Visual Direction</h3>
<p>[Describe the desired look and feel - modern, playful, sophisticated, minimalist, etc.]</p>

<h3>Competitor Analysis</h3>
<table>
  <thead>
    <tr>
      <th>Competitor</th>
      <th>What We Like</th>
      <th>What to Avoid</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>[Competitor 1]</td>
      <td>[Positive aspects]</td>
      <td>[Negative aspects]</td>
    </tr>
    <tr>
      <td>[Competitor 2]</td>
      <td>[Positive aspects]</td>
      <td>[Negative aspects]</td>
    </tr>
  </tbody>
</table>

<h3>Reference Examples</h3>
<p>[Links to or descriptions of designs that inspire the desired direction]</p>

<h2>Stakeholders & Approval</h2>
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Role</th>
      <th>Involvement</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>[Name]</td>
      <td>[Role]</td>
      <td>Final approval</td>
    </tr>
    <tr>
      <td>[Name]</td>
      <td>[Role]</td>
      <td>Feedback at key stages</td>
    </tr>
    <tr>
      <td>[Name]</td>
      <td>[Role]</td>
      <td>Informed of progress</td>
    </tr>
  </tbody>
</table>

<h2>Additional Notes</h2>
<p>[Any other relevant information]</p>`,
    popularity: 60
  },

  {
    id: 'content-brief',
    name: 'Content Brief',
    description: 'Plan content with topic, keywords, outline, key points, and call-to-action.',
    icon: 'FileEdit',
    category: 'Content',
    type: 'CONTENT',
    content: `<h1>Content Brief: [Content Title]</h1>
<p><em>Content Type: [Blog Post / Article / Landing Page / Email / etc.] | Due Date: [Date]</em></p>

<h2>Topic Overview</h2>
<h3>Topic</h3>
<p>[Clear, specific description of what this content is about]</p>

<h3>Working Title</h3>
<p><strong>[Primary headline/title]</strong></p>
<p><em>Alternative titles:</em></p>
<ul>
  <li>[Alternative 1]</li>
  <li>[Alternative 2]</li>
</ul>

<h3>Content Goal</h3>
<p>[What should this content achieve? e.g., educate, convert, build awareness, drive traffic]</p>

<h3>Target Audience</h3>
<table>
  <tbody>
    <tr>
      <td><strong>Who</strong></td>
      <td>[Primary audience description]</td>
    </tr>
    <tr>
      <td><strong>Their Problem</strong></td>
      <td>[What issue/question brings them to this content?]</td>
    </tr>
    <tr>
      <td><strong>Their Goal</strong></td>
      <td>[What do they want to accomplish?]</td>
    </tr>
    <tr>
      <td><strong>Knowledge Level</strong></td>
      <td>[Beginner / Intermediate / Advanced]</td>
    </tr>
  </tbody>
</table>

<h2>SEO & Keywords</h2>
<h3>Primary Keyword</h3>
<p><strong>[Main keyword/phrase to target]</strong></p>
<p>Search volume: [X] | Difficulty: [X]</p>

<h3>Secondary Keywords</h3>
<ul>
  <li>[Keyword 1] - [Search volume]</li>
  <li>[Keyword 2] - [Search volume]</li>
  <li>[Keyword 3] - [Search volume]</li>
</ul>

<h3>Related Topics to Cover</h3>
<ul>
  <li>[Related topic 1]</li>
  <li>[Related topic 2]</li>
  <li>[Related topic 3]</li>
</ul>

<h3>Search Intent</h3>
<p>[Informational / Navigational / Commercial / Transactional]</p>
<p>[Describe what searchers are looking for when they search this topic]</p>

<h2>Content Outline</h2>
<h3>Introduction</h3>
<ul>
  <li>Hook: [How to grab attention in the first line]</li>
  <li>Problem: [State the problem/question clearly]</li>
  <li>Promise: [What will the reader learn/gain?]</li>
</ul>

<h3>Main Sections</h3>
<p><strong>H2: [Section 1 Title]</strong></p>
<ul>
  <li>Key point: [Main idea to convey]</li>
  <li>H3: [Subsection if needed]</li>
  <li>H3: [Subsection if needed]</li>
</ul>

<p><strong>H2: [Section 2 Title]</strong></p>
<ul>
  <li>Key point: [Main idea to convey]</li>
  <li>H3: [Subsection if needed]</li>
  <li>H3: [Subsection if needed]</li>
</ul>

<p><strong>H2: [Section 3 Title]</strong></p>
<ul>
  <li>Key point: [Main idea to convey]</li>
  <li>H3: [Subsection if needed]</li>
  <li>H3: [Subsection if needed]</li>
</ul>

<p><strong>H2: [Section 4 Title]</strong></p>
<ul>
  <li>Key point: [Main idea to convey]</li>
  <li>H3: [Subsection if needed]</li>
</ul>

<h3>Conclusion</h3>
<ul>
  <li>Summary: [Key takeaways]</li>
  <li>CTA: [Call to action]</li>
</ul>

<h2>Key Points to Include</h2>
<p><em>These points MUST be covered in the content:</em></p>
<ul>
  <li>[ ] [Essential point 1 - why it's important]</li>
  <li>[ ] [Essential point 2 - why it's important]</li>
  <li>[ ] [Essential point 3 - why it's important]</li>
  <li>[ ] [Essential point 4 - why it's important]</li>
  <li>[ ] [Essential point 5 - why it's important]</li>
</ul>

<h2>Call to Action (CTA)</h2>
<table>
  <tbody>
    <tr>
      <td><strong>Primary CTA</strong></td>
      <td>[Main action you want readers to take]</td>
    </tr>
    <tr>
      <td><strong>CTA Placement</strong></td>
      <td>[Where in the content should CTA appear?]</td>
    </tr>
    <tr>
      <td><strong>CTA Link</strong></td>
      <td>[URL or destination]</td>
    </tr>
    <tr>
      <td><strong>Secondary CTA</strong></td>
      <td>[Alternative action, if applicable]</td>
    </tr>
  </tbody>
</table>

<h2>References & Research</h2>
<h3>Competitor Content</h3>
<ul>
  <li>[Link 1] - [What to learn from it / how to differentiate]</li>
  <li>[Link 2] - [What to learn from it / how to differentiate]</li>
  <li>[Link 3] - [What to learn from it / how to differentiate]</li>
</ul>

<h3>Data & Statistics to Include</h3>
<ul>
  <li>[Stat 1] - Source: [Link]</li>
  <li>[Stat 2] - Source: [Link]</li>
  <li>[Stat 3] - Source: [Link]</li>
</ul>

<h3>Expert Quotes</h3>
<ul>
  <li>[Quote or expert to reference]</li>
</ul>

<h2>Content Specifications</h2>
<table>
  <tbody>
    <tr>
      <td><strong>Word Count</strong></td>
      <td>[Target word count, e.g., 1500-2000 words]</td>
    </tr>
    <tr>
      <td><strong>Tone</strong></td>
      <td>[Professional / Casual / Conversational / Authoritative]</td>
    </tr>
    <tr>
      <td><strong>Reading Level</strong></td>
      <td>[Grade level or audience expertise]</td>
    </tr>
    <tr>
      <td><strong>Format</strong></td>
      <td>[How-to / Listicle / Guide / Comparison / etc.]</td>
    </tr>
  </tbody>
</table>

<h2>Visual Requirements</h2>
<ul>
  <li><strong>Featured Image:</strong> [Description of needed image]</li>
  <li><strong>In-content Images:</strong> [Number and types of images needed]</li>
  <li><strong>Infographics:</strong> [Any data visualizations needed]</li>
  <li><strong>Screenshots:</strong> [Any product/process screenshots]</li>
</ul>

<h2>Internal & External Links</h2>
<h3>Internal Links (Required)</h3>
<ul>
  <li>[Link to related content on our site]</li>
  <li>[Link to related content on our site]</li>
</ul>

<h3>External Links</h3>
<ul>
  <li>[Authoritative source to link to]</li>
  <li>[Authoritative source to link to]</li>
</ul>

<h2>Additional Notes</h2>
<p>[Any other guidance for the writer]</p>`,
    popularity: 55
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
export function getDocumentTemplatesByCategory(category: TemplateCategory): DocumentTemplate[] {
  return DOCUMENT_TEMPLATES.filter(t => t.category === category)
}

/**
 * Get all unique categories
 */
export function getDocumentTemplateCategories(): TemplateCategory[] {
  return [...new Set(DOCUMENT_TEMPLATES.map(t => t.category))]
}

/**
 * Sort templates by popularity
 */
export function getPopularDocumentTemplates(limit?: number): DocumentTemplate[] {
  const sorted = [...DOCUMENT_TEMPLATES].sort((a, b) => b.popularity - a.popularity)
  return limit ? sorted.slice(0, limit) : sorted
}

/**
 * Search templates by name or description
 */
export function searchDocumentTemplates(query: string): DocumentTemplate[] {
  const lowerQuery = query.toLowerCase()
  return DOCUMENT_TEMPLATES.filter(
    t =>
      t.name.toLowerCase().includes(lowerQuery) ||
      t.description.toLowerCase().includes(lowerQuery) ||
      t.category.toLowerCase().includes(lowerQuery)
  )
}
