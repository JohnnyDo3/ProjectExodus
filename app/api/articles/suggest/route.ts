import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

// Sage's personality context for helping with articles
const SAGE_CONTEXT = `
You are Sage, the friendly AI assistant for Project Exodus. You're helping a user craft the perfect article.
Your job is to analyze their article content and suggest:
1. Compelling excerpts/summaries
2. Hook-worthy opening lines
3. Quotable moments from the article
4. Strong call-to-action endings

Be creative, engaging, and match the sustainability-focused tone of Project Exodus.
Keep suggestions concise and impactful.
`

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { content, title, type = 'all' } = await request.json()

    if (!content || content.trim().length < 50) {
      return NextResponse.json(
        { success: false, error: 'Please provide at least 50 characters of content for suggestions' },
        { status: 400 }
      )
    }

    const googleApiKey = process.env.GOOGLE_AI_API_KEY

    if (!googleApiKey) {
      // Fallback to algorithmic suggestions if no API key
      return NextResponse.json({
        success: true,
        data: generateFallbackSuggestions(content, title),
      })
    }

    // Build the prompt based on what type of suggestions are requested
    let prompt = ''

    if (type === 'all' || type === 'excerpts') {
      prompt += `
EXCERPTS: Generate 3 different excerpt options (each 1-2 sentences, max 200 characters) that summarize the article compellingly. Make them varied in style - one factual, one emotional, one intriguing.
`
    }

    if (type === 'all' || type === 'hooks') {
      prompt += `
HOOKS: Generate 3 attention-grabbing opening hook alternatives (each 1 sentence) that would make readers want to read more.
`
    }

    if (type === 'all' || type === 'quotes') {
      prompt += `
QUOTES: Identify 3 most quotable/shareable sentences or phrases from the article that would work well as pull quotes or social media snippets.
`
    }

    if (type === 'all' || type === 'ctas') {
      prompt += `
CALLS TO ACTION: Generate 3 strong closing call-to-action suggestions that encourage reader engagement.
`
    }

    const fullPrompt = `${SAGE_CONTEXT}

The user is writing an article${title ? ` titled "${title}"` : ''}.

ARTICLE CONTENT:
${content.substring(0, 3000)}${content.length > 3000 ? '...' : ''}

Please analyze this article and provide suggestions in the following format. Use JSON format for easy parsing:

${prompt}

Respond with a JSON object like:
{
  "excerpts": ["excerpt 1", "excerpt 2", "excerpt 3"],
  "hooks": ["hook 1", "hook 2", "hook 3"],
  "quotes": ["quote 1", "quote 2", "quote 3"],
  "ctas": ["cta 1", "cta 2", "cta 3"],
  "sage_tip": "A brief tip from Sage about improving the article (optional)"
}

Only include the keys that were requested. Keep it helpful and constructive!`

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${googleApiKey}`

    const geminiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [{ text: fullPrompt }]
        }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 1000,
        }
      })
    })

    if (!geminiResponse.ok) {
      console.error('Gemini API error:', await geminiResponse.text())
      // Fallback to algorithmic suggestions
      return NextResponse.json({
        success: true,
        data: generateFallbackSuggestions(content, title),
      })
    }

    const data = await geminiResponse.json()
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || ''

    // Try to parse JSON from response
    try {
      // Extract JSON from the response (it might have markdown code blocks)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const suggestions = JSON.parse(jsonMatch[0])
        return NextResponse.json({
          success: true,
          data: suggestions,
        })
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError)
    }

    // If parsing failed, return fallback
    return NextResponse.json({
      success: true,
      data: generateFallbackSuggestions(content, title),
    })

  } catch (error) {
    console.error('Error generating suggestions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate suggestions' },
      { status: 500 }
    )
  }
}

// Fallback algorithmic suggestions when AI is unavailable
function generateFallbackSuggestions(content: string, title?: string): any {
  const cleanContent = content.replace(/[#*_`~\[\]]/g, '').trim()
  const sentences = cleanContent.split(/[.!?]+/).filter(s => s.trim().length > 20)
  const words = cleanContent.split(/\s+/)

  // Generate excerpt options
  const excerpts = [
    // First ~150 chars
    cleanContent.substring(0, 150).trim() + '...',
    // A sentence from the middle
    sentences[Math.floor(sentences.length / 2)]?.trim().substring(0, 150) + '...' || cleanContent.substring(0, 150) + '...',
    // Last meaningful sentence
    sentences[sentences.length - 2]?.trim().substring(0, 150) + '...' || cleanContent.substring(0, 150) + '...',
  ]

  // Generate hook suggestions
  const hooks = [
    `Discover how ${title?.toLowerCase() || 'this topic'} is changing the way we think about sustainability.`,
    sentences[0]?.trim() || `Here's what you need to know about ${title?.toLowerCase() || 'sustainable living'}.`,
    `What if I told you that ${title?.toLowerCase() || 'this simple change'} could transform your approach to eco-friendly living?`,
  ]

  // Find quotable sentences (shorter, punchy ones)
  const quotes = sentences
    .filter(s => s.trim().length > 30 && s.trim().length < 120)
    .slice(0, 3)
    .map(s => s.trim())

  if (quotes.length < 3) {
    quotes.push(
      `"${title || 'Sustainability'}" is more than a buzzword—it's a way of life.`,
      'Small changes lead to big impact.',
      'Together, we can build a more sustainable future.'
    )
  }

  // CTA suggestions
  const ctas = [
    'Join the conversation in the comments below. What are your thoughts?',
    'Ready to take action? Explore our Learn section for practical guides.',
    'Share this article with someone who needs to read it today.',
  ]

  return {
    excerpts: excerpts.slice(0, 3),
    hooks: hooks.slice(0, 3),
    quotes: quotes.slice(0, 3),
    ctas,
    sage_tip: `Great start! Consider adding a personal story or specific example to make your article more relatable. Articles with real-world examples tend to resonate more with readers.`,
  }
}
