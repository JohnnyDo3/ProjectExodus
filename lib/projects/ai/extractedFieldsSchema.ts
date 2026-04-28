import { z } from 'zod'

// ──────────────────────────────────────────────────────────────────────
// Shape of the structured fields Sage extracts from a plan or chat.
// Mirrors the create-initiative form's state. Every field is optional —
// Sage fills what she can confidently determine and leaves the rest.
// ──────────────────────────────────────────────────────────────────────

export const subprojectSchema = z.object({
  name: z.string().min(1).max(120),
  description: z.string().max(2000).optional(),
})
export type ExtractedSubproject = z.infer<typeof subprojectSchema>

export const mindMapNodeSchema = z.object({
  label: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  type: z.enum(['IDEA', 'GOAL', 'TASK', 'QUESTION', 'RESOURCE', 'MILESTONE']).optional(),
})
export type ExtractedMindMapNode = z.infer<typeof mindMapNodeSchema>

export const mindMapConnectionSchema = z.object({
  from: z.string().min(1).max(200), // label of source node
  to: z.string().min(1).max(200),   // label of target node
  type: z.enum(['RELATED', 'DEPENDS_ON', 'LEADS_TO', 'PART_OF']).optional(),
})
export type ExtractedMindMapConnection = z.infer<typeof mindMapConnectionSchema>

export const extractedFieldsSchema = z.object({
  // Step 1 — Vision
  name: z.string().max(150).optional(),
  tagline: z.string().max(280).optional(),
  description: z.string().max(5000).optional(),
  mission: z.string().max(2000).optional(),
  goal: z.string().max(2000).optional(),
  theme: z.enum([
    'nature', 'solar', 'lunar', 'forest', 'ocean', 'fire',
    'earth', 'sky', 'rose', 'amethyst', 'arctic', 'sunset',
  ]).optional(),

  // Step 2 — Foundation
  category: z.string().max(80).optional(),
  projectStatus: z.enum(['PLANNING', 'ACTIVE', 'COMPLETED', 'ARCHIVED']).optional(),
  tags: z.array(z.string().max(40)).max(20).optional(),
  visibility: z.enum(['PUBLIC', 'UNLISTED']).optional(),

  // Step 3 — Structure
  subprojects: z.array(subprojectSchema).max(20).optional(),

  // Step 4 — Mind Map (best-effort, may be empty for short plans)
  mindMapNodes: z.array(mindMapNodeSchema).max(40).optional(),
  mindMapConnections: z.array(mindMapConnectionSchema).max(60).optional(),

  // Step 5 — Collaboration
  enableDiscussions: z.boolean().optional(),
  enableResearch: z.boolean().optional(),
  enableLearning: z.boolean().optional(),
  requireApproval: z.boolean().optional(),

  // Sage's own commentary — surfaced to the user above the form so they
  // know what she was confident about and what she guessed.
  sageNotes: z.string().max(800).optional(),
})

export type ExtractedFields = z.infer<typeof extractedFieldsSchema>

// JSON-Schema-ish shape for Gemini's responseSchema parameter. Gemini's
// structured-output config wants a schema in OpenAPI-3 dialect.
export const GEMINI_RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    name: { type: 'string', description: 'Short project name (≤150 chars). Title-case.' },
    tagline: { type: 'string', description: 'One-sentence pitch (≤280 chars).' },
    description: { type: 'string', description: 'Public-facing description (1-3 paragraphs).' },
    mission: { type: 'string', description: 'Mission statement — why this exists.' },
    goal: { type: 'string', description: 'Primary measurable goal.' },
    theme: {
      type: 'string',
      enum: [
        'nature', 'solar', 'lunar', 'forest', 'ocean', 'fire',
        'earth', 'sky', 'rose', 'amethyst', 'arctic', 'sunset',
      ],
      description: 'Visual theme that best fits the tone of the plan.'
    },
    category: { type: 'string', description: 'Best-fit category, e.g. "Renewable Energy", "Regenerative Agriculture".' },
    projectStatus: {
      type: 'string',
      enum: ['PLANNING', 'ACTIVE', 'COMPLETED', 'ARCHIVED'],
      description: 'Lifecycle stage. Default to PLANNING for brand-new initiatives.'
    },
    tags: {
      type: 'array',
      items: { type: 'string' },
      description: '3-8 short topic tags, lowercase, no hashtags.'
    },
    visibility: { type: 'string', enum: ['PUBLIC', 'UNLISTED'] },
    subprojects: {
      type: 'array',
      description: 'Distinct workstreams or sub-initiatives mentioned in the plan.',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
        },
        required: ['name'],
      },
    },
    mindMapNodes: {
      type: 'array',
      description: 'Best-effort mindmap nodes derived from the plan. Use sparingly — only if the plan implies clear concepts.',
      items: {
        type: 'object',
        properties: {
          label: { type: 'string' },
          description: { type: 'string' },
          type: { type: 'string', enum: ['IDEA', 'GOAL', 'TASK', 'QUESTION', 'RESOURCE', 'MILESTONE'] },
        },
        required: ['label'],
      },
    },
    mindMapConnections: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          from: { type: 'string' },
          to: { type: 'string' },
          type: { type: 'string', enum: ['RELATED', 'DEPENDS_ON', 'LEADS_TO', 'PART_OF'] },
        },
        required: ['from', 'to'],
      },
    },
    enableDiscussions: { type: 'boolean' },
    enableResearch: { type: 'boolean' },
    enableLearning: { type: 'boolean' },
    requireApproval: { type: 'boolean' },
    sageNotes: {
      type: 'string',
      description: 'Friendly 1-3 sentence summary of what you extracted and any caveats. Speak as Sage.'
    },
  },
} as const
