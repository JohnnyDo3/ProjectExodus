// Helper for calling Gemini in structured-output mode (responseMimeType:
// application/json + responseSchema). Used by initiative-draft extraction
// endpoints so the JSON returned matches the form's field shape directly.

const GEMINI_API_KEY = process.env.GOOGLE_AI_API_KEY
const GEMINI_MODEL = 'gemini-2.0-flash-lite'

// Safety thresholds tuned for sustainability-platform content. Business
// plans, LCAs, and climate-related discussions routinely mention things
// that the default BLOCK_MEDIUM_AND_ABOVE setting would flag — chemical
// safety, hazardous waste handling, geopolitical risk, climate disasters,
// supply-chain conflicts, etc. BLOCK_ONLY_HIGH keeps obvious abuse out
// without nuking legitimate content. Hate speech stays stricter.
const SAFETY_SETTINGS = [
  { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
  { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
  { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
  { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
]

interface CallStructuredOpts {
  systemPrompt: string
  userMessage: string
  responseSchema: unknown
  maxOutputTokens?: number
  temperature?: number
}

/**
 * Calls Gemini with responseMimeType=application/json and a JSON schema.
 * Returns the parsed JSON object. Throws if the API key is missing, the
 * call fails, or the response isn't valid JSON.
 */
export async function callGeminiStructured<T = unknown>(
  opts: CallStructuredOpts
): Promise<T> {
  if (!GEMINI_API_KEY) {
    throw new Error('GOOGLE_AI_API_KEY is not configured')
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`

  const body = {
    contents: [{ role: 'user', parts: [{ text: opts.userMessage }] }],
    systemInstruction: { parts: [{ text: opts.systemPrompt }] },
    generationConfig: {
      temperature: opts.temperature ?? 0.4,
      maxOutputTokens: opts.maxOutputTokens ?? 2048,
      responseMimeType: 'application/json',
      responseSchema: opts.responseSchema,
    },
    safetySettings: SAFETY_SETTINGS,
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(45_000),
  })

  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    throw new Error(`Gemini structured call failed (${res.status}): ${errText.slice(0, 300)}`)
  }

  const data = await res.json()

  // Gemini signals safety blocks two ways: a top-level promptFeedback.blockReason,
  // or a candidate with finishReason='SAFETY' and no content.parts. Either way
  // the response is unusable. Surface a specific error so the caller can tell
  // the user "your content tripped a filter" instead of a generic crash.
  const blockReason = data?.promptFeedback?.blockReason
  const finishReason = data?.candidates?.[0]?.finishReason
  if (blockReason || finishReason === 'SAFETY') {
    throw new Error(
      `Sage's safety filter blocked this content (${blockReason || finishReason}). ` +
      `If your plan discusses sensitive topics like hazardous materials or geopolitical risk, ` +
      `try paraphrasing the most flagged section.`
    )
  }
  if (finishReason === 'RECITATION') {
    throw new Error('Sage stopped because the content matched a copyrighted source too closely. Paraphrase and try again.')
  }

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text || typeof text !== 'string') {
    throw new Error('Gemini structured response had no text content')
  }

  try {
    return JSON.parse(text) as T
  } catch {
    throw new Error('Gemini structured response was not valid JSON')
  }
}
