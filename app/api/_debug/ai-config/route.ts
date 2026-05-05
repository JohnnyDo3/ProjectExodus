import { NextResponse } from 'next/server'
import { auth } from '@/auth'

/**
 * Diagnostic: returns which AI providers the running deployment can see
 * via env vars. Used to debug "I set GROQ_API_KEY but Sage still uses
 * Gemini" — the answer is almost always "the env var didn't get
 * applied to this deployment yet". Auth-gated so the public can't
 * fingerprint our config; only logged-in users see anything.
 */
export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const groqKey = process.env.GROQ_API_KEY
  const geminiKey = process.env.GOOGLE_AI_API_KEY

  return NextResponse.json({
    groq: {
      configured: Boolean(groqKey),
      keyPrefix: groqKey ? groqKey.slice(0, 4) : null,
      keyLength: groqKey?.length ?? 0,
    },
    gemini: {
      configured: Boolean(geminiKey),
      keyPrefix: geminiKey ? geminiKey.slice(0, 4) : null,
      keyLength: geminiKey?.length ?? 0,
    },
    primaryProvider: groqKey ? 'groq' : (geminiKey ? 'gemini' : 'none'),
    note: groqKey
      ? 'Groq is configured. Sage will use Groq first, falling back to Gemini if it fails.'
      : geminiKey
      ? 'Only Gemini is configured. To use Groq (higher free quota), set GROQ_API_KEY in env vars and REDEPLOY.'
      : 'No AI provider configured. Sage will use rule-based fallback responses only.',
  })
}
