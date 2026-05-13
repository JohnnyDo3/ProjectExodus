import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { rateLimit, rateLimitResponse } from '@/lib/rate-limit'
import { z } from 'zod'
import { callLlmStructured } from '@/lib/projects/ai/llmStructured'

const requestSchema = z.object({
  title: z.string().max(300).optional(),
  excerpt: z.string().max(2000).optional(),
  content: z.string().max(20_000).optional(),
})

const responseSchema = {
  type: 'object',
  properties: {
    tags: {
      type: 'array',
      description:
        '5-8 short topic tags (1-3 words each, lowercase, no leading "#"). ' +
        'Reflect the article\'s core subjects, not generic words like "article" / "post".',
      items: { type: 'string' },
    },
  },
  required: ['tags'],
} as const

const SYSTEM_PROMPT = `You are Sage, the AI guide for Project Exodus, a sustainability hub.
Your job here: read an article and produce a small set of crisp topic tags
that help readers find similar work via search and topic pages.

Rules:
- Return between 5 and 8 tags.
- Each tag is lowercase, 1-3 words, no leading hash.
- Use hyphens for multi-word tags ("circular-economy", not "circular economy").
- Prefer concrete topics over generic words. Skip "article", "blog", "essay".
- Skip the publication name ("project exodus").
- Output ONLY the JSON object — no commentary, no Markdown fences.`

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 20/hr is generous for an interactive button — guards against
  // someone hammering the endpoint to burn AI quota.
  const limit = await rateLimit(req, { id: 'tag-suggest', limit: 20, windowSeconds: 3600 })
  if (!limit.success) return rateLimitResponse(limit.reset)

  let body: unknown
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }
  const parsed = requestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 400 })
  }
  const { title = '', excerpt = '', content = '' } = parsed.data

  // Strip HTML tags from the body sample so the LLM sees clean prose.
  const bodyText = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 6000)
  if (!title && !excerpt && !bodyText) {
    return NextResponse.json({ error: 'Need at least a title, excerpt, or some body content.' }, { status: 400 })
  }

  const userMessage = [
    title && `Title: ${title}`,
    excerpt && `Excerpt: ${excerpt}`,
    bodyText && `Body excerpt:\n${bodyText}`,
  ].filter(Boolean).join('\n\n')

  let raw: { tags?: unknown }
  try {
    raw = await callLlmStructured<{ tags?: unknown }>({
      systemPrompt: SYSTEM_PROMPT,
      userMessage,
      responseSchema,
      maxOutputTokens: 256,
      temperature: 0.4,
    })
  } catch (err) {
    console.error('Tag suggestion failed:', err)
    const message = err instanceof Error ? err.message : 'unknown'
    const friendly =
      message.startsWith('Sage is over') ||
      message.startsWith("Sage isn't connected")
        ? message
        : 'Sage couldn\'t suggest tags right now. Try again in a moment.'
    return NextResponse.json({ error: friendly }, { status: 502 })
  }

  // Clean the LLM output: strip leading hashes, lowercase, hyphenate
  // spaces, dedupe, cap at 8.
  const seen = new Set<string>()
  const tags: string[] = []
  if (Array.isArray(raw.tags)) {
    for (const t of raw.tags) {
      if (typeof t !== 'string') continue
      const cleaned = t
        .toLowerCase()
        .replace(/^#+\s*/, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 40)
      if (!cleaned || seen.has(cleaned)) continue
      seen.add(cleaned)
      tags.push(cleaned)
      if (tags.length >= 8) break
    }
  }

  return NextResponse.json({ tags })
}
