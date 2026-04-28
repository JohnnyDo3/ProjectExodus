// Helper for calling Gemini in structured-output mode (responseMimeType:
// application/json + responseSchema). Used by initiative-draft extraction
// endpoints so the JSON returned matches the form's field shape directly.

const GEMINI_API_KEY = process.env.GOOGLE_AI_API_KEY
const GEMINI_MODEL = 'gemini-2.0-flash-lite'

const SAFETY_SETTINGS = [
  { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
  { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
  { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
  { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
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
