// Provider-agnostic structured-JSON LLM call. Tries Groq first
// (higher free quota — ~14k req/day, Llama 3.3 70B), falls back to
// Gemini if Groq isn't configured, hits its rate limit, or has an
// outage. Either provider's response is validated by Zod downstream.
//
// Env vars:
//   GROQ_API_KEY        — primary. Free signup at console.groq.com.
//   GOOGLE_AI_API_KEY   — fallback. Existing key used by other Sage routes.
// At least one must be set for any of this to work.

import { callGeminiStructured } from './geminiStructured'
import { callGroqStructured, isGroqConfigured } from './groqStructured'

interface CallStructuredOpts {
  systemPrompt: string
  userMessage: string
  responseSchema: unknown
  maxOutputTokens?: number
  temperature?: number
}

const FALLBACK_TRIGGERS = [
  'Sage is over',           // any provider rate-limit message
  'Groq is having trouble',
  'Gemini is having trouble',
  'Groq response had no text',
  'Groq response was not valid JSON',
]

function shouldFallback(message: string): boolean {
  return FALLBACK_TRIGGERS.some(t => message.includes(t))
}

export async function callLlmStructured<T = unknown>(
  opts: CallStructuredOpts
): Promise<T> {
  // Try Groq first when configured.
  if (isGroqConfigured()) {
    try {
      return await callGroqStructured<T>(opts)
    } catch (err) {
      const message = err instanceof Error ? err.message : ''
      if (!shouldFallback(message)) throw err
      console.warn('[llmStructured] Groq failed, trying Gemini fallback:', message)
      // fall through to Gemini below
    }
  }
  // Fall back (or primary, if Groq isn't configured) to Gemini.
  return callGeminiStructured<T>(opts)
}
