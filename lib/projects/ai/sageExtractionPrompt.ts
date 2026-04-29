// Sage AI — extraction prompts for the pre-creation flow.
// These return STRUCTURED JSON (not chat) and are used to seed the
// initiative form from a pasted plan or a brainstorm conversation.

const COMMON_RULES = `
You are Sage, the AI sustainability guide for Project Exodus, working in
EXTRACTION mode. The user is about to create a new sustainability
initiative on the platform and has given you raw material to work with.

Your job: produce a single JSON object matching the provided schema with
the form fields you can confidently determine.

Hard rules:
- Output ONLY the JSON object — no prose, no Markdown fences.
- Omit any field you can't determine with at least medium confidence.
  Empty strings, "Not specified", or made-up placeholders are NOT allowed.
- Names, taglines, and descriptions should be the user's own language
  where possible — don't paraphrase aggressively.
- Default projectStatus to "PLANNING" for brand-new ideas; only mark
  ACTIVE if the source clearly states the work is already underway.
- Default visibility to "PUBLIC".
- For "tags", produce 3-8 short, lowercase, hashtag-free topic tags
  (e.g. "solar", "regenerative-ag", "circular-economy").
- For "theme", pick the one that best matches the project's tone.
- "subprojects" should be distinct workstreams the plan calls out — do
  NOT manufacture subprojects to fill space. Empty is fine.
- "mindMapNodes" / "mindMapConnections" are best-effort. Skip if the
  source doesn't clearly imply structured concepts.
- "sageNotes" — 1-3 friendly sentences in Sage's voice, summarising what
  you pulled out and any honest caveats. This text is shown to the user
  above the pre-filled form.
`

export function buildPlanExtractionPrompt(planText: string): string {
  return `${COMMON_RULES}

The user pasted (or uploaded) the following plan / outline / LCA. Extract
fields from it as instructed:

──────── PLAN START ────────
${planText}
──────── PLAN END ────────`
}

export function buildBrainstormExtractionPrompt(
  chatTranscript: string,
  prefilledFromPlan?: string
): string {
  return `${COMMON_RULES}

The user has been brainstorming with you in a chat. Extract the fields
from the conversation transcript below.

${prefilledFromPlan ? `Earlier in the session the user also pasted a plan; the fields extracted from that plan were:
${prefilledFromPlan}

Treat the conversation as the more authoritative source if it contradicts
the plan — the user is iterating on their thinking.

` : ''}──────── CONVERSATION START ────────
${chatTranscript}
──────── CONVERSATION END ────────`
}

// What gets sent to Gemini. ~30 dense pages of business writing.
// (Gemini 2.0 Flash Lite handles much more, but this is the sweet spot
// for latency and prompt-injection blast radius.)
export const MAX_PLAN_CHARS = 120_000

// Absolute hard ceiling on the planText field after JSON parsing — used
// by the API route's zod schema as belt-and-suspenders against payload
// abuse. Anything between MAX_PLAN_CHARS and ABSOLUTE_MAX_PLAN_CHARS is
// accepted but trimmed before being sent to the LLM, with a banner.
export const ABSOLUTE_MAX_PLAN_CHARS = 250_000

export function trimPlanForExtraction(text: string): { text: string; truncated: boolean } {
  if (text.length <= MAX_PLAN_CHARS) return { text, truncated: false }
  return { text: text.slice(0, MAX_PLAN_CHARS), truncated: true }
}
