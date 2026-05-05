// Groq client for LLM calls. Cheaper/free quota than Gemini Flash Lite
// (~14k req/day vs 1.5k) and Llama 3.3 70B is a strong model. Used as
// the primary provider with Gemini as a fallback (see llmStructured.ts
// for structured-JSON, callGroqChat for plain chat).

const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_MODEL = 'llama-3.3-70b-versatile'
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'

interface CallStructuredOpts {
  systemPrompt: string
  userMessage: string
  /** JSON schema (OpenAPI-3 dialect). Injected into the system prompt
   *  since Groq doesn't natively enforce schemas — Zod validates after. */
  responseSchema: unknown
  maxOutputTokens?: number
  temperature?: number
}

export interface GroqChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface CallChatOpts {
  systemPrompt: string
  messages: Array<{ role: 'user' | 'assistant'; content: string }>
  maxOutputTokens?: number
  temperature?: number
}

export function isGroqConfigured(): boolean {
  return Boolean(GROQ_API_KEY)
}

// ── Shared error handling for both call shapes ─────────────────────
async function readGroqError(res: Response): Promise<never> {
  const errText = await res.text().catch(() => '')
  if (res.status === 429) {
    throw new Error(
      'Sage is over the Groq API\'s rate limit right now. ' +
      'Try again in a minute, or the admin can upgrade the API plan.'
    )
  }
  if (res.status === 401 || res.status === 403) {
    throw new Error('Sage isn\'t connected to Groq right now. The admin needs to fix the API key.')
  }
  if (res.status >= 500) {
    throw new Error('Groq is having trouble at the moment. Try again in a minute.')
  }
  throw new Error(`Groq call failed (${res.status}): ${errText.slice(0, 200).replace(/\s+/g, ' ').trim()}`)
}

function checkFinishReason(finishReason: string | undefined): void {
  if (finishReason === 'content_filter') {
    throw new Error(
      'Sage\'s safety filter blocked this content. ' +
      'If your message touches on sensitive topics, try paraphrasing.'
    )
  }
}

// ── Structured (JSON) call ─────────────────────────────────────────

export async function callGroqStructured<T = unknown>(
  opts: CallStructuredOpts
): Promise<T> {
  if (!GROQ_API_KEY) throw new Error('GROQ_API_KEY is not configured')

  const schemaInstruction =
    `\n\nYou MUST respond with a single JSON object that conforms to this JSON schema (OpenAPI-3 dialect):\n` +
    `\`\`\`json\n${JSON.stringify(opts.responseSchema, null, 2)}\n\`\`\`\n` +
    `Return ONLY the JSON object — no Markdown fences, no commentary.`

  const body = {
    model: GROQ_MODEL,
    messages: [
      { role: 'system', content: opts.systemPrompt + schemaInstruction },
      { role: 'user', content: opts.userMessage },
    ],
    response_format: { type: 'json_object' },
    temperature: opts.temperature ?? 0.4,
    max_tokens: opts.maxOutputTokens ?? 2048,
  }

  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(45_000),
  })

  if (!res.ok) await readGroqError(res)

  const data = await res.json()
  const content = data?.choices?.[0]?.message?.content
  checkFinishReason(data?.choices?.[0]?.finish_reason)
  if (!content || typeof content !== 'string') {
    throw new Error('Groq response had no text content')
  }
  try {
    return JSON.parse(content) as T
  } catch {
    throw new Error('Groq response was not valid JSON')
  }
}

// ── Plain chat call (returns assistant text) ───────────────────────

export async function callGroqChat(opts: CallChatOpts): Promise<string> {
  if (!GROQ_API_KEY) throw new Error('GROQ_API_KEY is not configured')

  const messages: GroqChatMessage[] = [
    { role: 'system', content: opts.systemPrompt },
    ...opts.messages.map(m => ({ role: m.role, content: m.content }) as GroqChatMessage),
  ]

  const body = {
    model: GROQ_MODEL,
    messages,
    temperature: opts.temperature ?? 0.7,
    max_tokens: opts.maxOutputTokens ?? 1024,
  }

  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(30_000),
  })

  if (!res.ok) await readGroqError(res)

  const data = await res.json()
  const content = data?.choices?.[0]?.message?.content
  checkFinishReason(data?.choices?.[0]?.finish_reason)
  if (!content || typeof content !== 'string') {
    throw new Error('Groq response had no text content')
  }
  return content
}
