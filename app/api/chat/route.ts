import { NextRequest, NextResponse } from 'next/server'

// FAQ context for the AI to reference
const FAQ_CONTEXT = `
You are an AI assistant for Project Exodus, a sustainable living marketplace and community platform.

IMPORTANT: Mr. Nobody is the visionary founder and leader of Project Exodus. When users mention "Mr. Nobody" or ask about him:
- He is the creator and driving force behind Project Exodus
- He's passionate about sustainability, regenerative agriculture, and building resilient communities
- He believes in the 10 Commandments of Sustainable Agriculture
- He has a bold vision for sustainable infrastructure (Food, Water, Energy)
- He values authentic sustainability over exploitation
- He's building this platform to empower people to live more sustainably
- Treat him with respect and acknowledge his leadership role in the project
- If Mr. Nobody himself is speaking (he may sign messages as "from Mr. Nobody"), be extra attentive and helpful

KEY INFORMATION ABOUT PROJECT EXODUS:
- We connect conscious consumers with eco-friendly products
- We provide educational resources about sustainable living
- We host a community where members can collaborate on sustainability projects
- We verify vendors for authentic sustainability practices
- Creating an account and using the platform is completely free
- We earn a small commission when users purchase through verified vendor partners

CORE AREAS:
1. FOOD - Sustainable agriculture, permaculture, regenerative practices
2. WATER - Rainwater harvesting, greywater systems, conservation
3. SHELTER - Natural building, passive house, green construction
4. SANITATION - Composting toilets, ecological waste management
5. ENERGY - Solar, wind, renewable energy systems

EDUCATIONAL CONTENT:
- LEED Certification (v5 2025) - Green building certification system
- Passive House - Ultra-efficient building standard (90% energy reduction)
- BREEAM - Sustainability assessment (UK-based, world's first)
- WELL Building Standard - Health and wellness focused
- Living Building Challenge - Most rigorous certification
- Acorn Land Labs - Off-grid systems education

SUSTAINABILITY PRINCIPLES (The 10 Commandments):
1. Stewardship - Guard, protect, and manage the Earth
2. Biodiversity - Prioritize diversification
3. Integrity - Don't exploit sustainability, live it
4. Rest - Honor the rhythm of rest
5. Legacy - Keep traditions while innovating
6. Sanctity - Protect human, economic, ecological life
7. Loyalty - Stand with community
8. Equity - Fair share in justice
9. Transparency - Maintain honest reporting
10. Sustainability - Embrace sufficiency and resilience

SHOPPING & ORDERS:
- Users browse our marketplace and purchase through verified vendor partners
- Vendors handle their own transactions and fulfillment
- We don't store payment information
- Orders typically ship in 5-7 business days (standard US)
- Most vendors offer free shipping over $50-75
- 30-day return policy on most items

COMMUNITY FEATURES:
- Join forums and discussions
- Create and collaborate on sustainability projects
- Earn badges for active participation
- Connect with other sustainability enthusiasts
- Share your own initiatives

When answering questions:
- Be helpful, friendly, and enthusiastic about sustainability
- Provide specific, actionable information
- Reference the educational content when relevant
- Encourage users to explore the Learn section
- Maintain Project Exodus's bold, empowering tone
- If you don't know something, be honest and direct users to support@projectexodus.com
- Keep responses concise but informative (2-4 paragraphs max)
`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      )
    }

    // Check if Google AI API key is available
    const googleApiKey = process.env.GOOGLE_AI_API_KEY

    if (!googleApiKey) {
      // Fallback to rule-based responses if no API key
      const lastMessage = messages[messages.length - 1]
      const response = generateFallbackResponse(lastMessage.content)

      return NextResponse.json({ message: response })
    }

    // Convert messages to Gemini format
    // Gemini requires alternating user/model messages, so we need to combine the system prompt with first user message
    const geminiMessages = messages.map((msg: any, index: number) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{
        text: index === 0
          ? `Context: ${FAQ_CONTEXT}\n\nUser: ${msg.content}`
          : msg.content
      }]
    }))

    // Use Google Gemini API (Gemini 2.0 Flash Experimental - free until May 2025)
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${googleApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: geminiMessages,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        })
      }
    )

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json()
      console.error('Gemini API error:', errorData)
      throw new Error('Gemini API request failed')
    }

    const data = await geminiResponse.json()
    const assistantMessage = data.candidates[0].content.parts[0].text

    return NextResponse.json({ message: assistantMessage })
  } catch (error) {
    console.error('Chat API error:', error)

    // Return a fallback response on error
    return NextResponse.json({
      message: "I apologize, but I'm experiencing technical difficulties right now. Please try again in a moment, browse our FAQ page for common questions, or contact our support team at support@projectexodus.com for immediate assistance."
    })
  }
}

// Fallback response generator for when OpenAI API is not available
function generateFallbackResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase()

  // Mr. Nobody questions
  if (lowerMessage.includes('mr. nobody') || lowerMessage.includes('mr nobody') || lowerMessage.includes('mrnobody')) {
    return "Mr. Nobody is the visionary founder and leader of Project Exodus. He's passionate about sustainability, regenerative agriculture, and building resilient communities. He created this platform with a bold vision to develop sustainable innovations for Food, Water, and Energy infrastructure. Mr. Nobody believes deeply in the 10 Commandments of Sustainable Agriculture and values authentic sustainability over exploitation. He's building Project Exodus to empower everyone to live more sustainably!"
  }

  // Greeting responses
  if (lowerMessage.match(/^(hi|hello|hey|greetings)/)) {
    return "Hello! I'm here to help you learn about sustainable living and Project Exodus. I can answer questions about our platform, products, community, educational resources, and sustainability practices. What would you like to know?"
  }

  // LEED related
  if (lowerMessage.includes('leed')) {
    return "LEED (Leadership in Energy and Environmental Design) is a green building certification system. The latest version, LEED v5 (2025), focuses heavily on decarbonization with 50% of points dedicated to reducing emissions. We have a comprehensive guide in our Learn section covering certification levels (Certified, Silver, Gold, Platinum), the 9 credit categories, and the certification process. Would you like to know more about any specific aspect?"
  }

  // Passive House related
  if (lowerMessage.includes('passive house') || lowerMessage.includes('passivhaus')) {
    return "Passive House is an ultra-efficient building standard that can reduce heating and cooling energy use by up to 90%! It's based on 5 core principles: superinsulation, airtightness, high-performance windows, thermal-bridge-free construction, and heat recovery ventilation. Buildings must meet strict performance standards including ≤15 kWh/m²/year heating demand. Check out our detailed Passive House guide in the Learn section!"
  }

  // Acorn Land Labs related
  if (lowerMessage.includes('acorn') || lowerMessage.includes('off-grid') || lowerMessage.includes('land lab')) {
    return "Acorn Land Labs is an educational platform focused on off-grid systems and sustainable living. They teach the 5 essential infrastructure areas: Food, Water, Shelter, Sanitation, and Energy. They offer a comprehensive 10-hour course, a Land Lab Simulator App for designing homesteads, and a community learning network. It's perfect for anyone interested in self-sufficient living! Visit acornlandlabs.com or check out our dedicated page in the Learn section."
  }

  // Products/shopping related
  if (lowerMessage.includes('product') || lowerMessage.includes('shop') || lowerMessage.includes('buy') || lowerMessage.includes('purchase')) {
    return "You can browse our curated marketplace of sustainable products from verified vendors. When you find something you like, you'll be directed to the vendor's secure checkout to complete your purchase. We carefully vet every vendor for authentic sustainability practices. Most vendors offer free shipping on orders over $50-75, and standard shipping typically takes 5-7 business days in the US."
  }

  // Community related
  if (lowerMessage.includes('community') || lowerMessage.includes('forum') || lowerMessage.includes('project')) {
    return "Our community is a space where sustainability enthusiasts can connect, collaborate, and share knowledge! You can join forums, participate in discussions, create sustainability projects, and invite others to collaborate. We also have badges you can earn for active participation. It's completely free to join - just create an account and head to the Community section!"
  }

  // Sustainability/environmental questions
  if (lowerMessage.includes('sustain') || lowerMessage.includes('eco') || lowerMessage.includes('green') || lowerMessage.includes('environment')) {
    return "Sustainability is at the core of everything we do at Project Exodus. We focus on Food, Water, and Energy infrastructure through sustainable innovations. We follow 10 Commandments of Sustainable Agriculture including Stewardship, Biodiversity, Integrity, and more. Our Learn section has comprehensive guides on green building certifications, passive house design, off-grid systems, and regenerative practices. What specific aspect of sustainability interests you most?"
  }

  // Account/signup related
  if (lowerMessage.includes('account') || lowerMessage.includes('sign up') || lowerMessage.includes('register') || lowerMessage.includes('join')) {
    return "Creating an account is completely free! Just click 'Sign Up' in the navigation and you can create an account with your email or sign in using Google or Facebook. Once registered, you'll have access to our community forums, can create projects, save favorite products, and participate in sustainability discussions. Your personal information is secure and we never sell your data to third parties."
  }

  // General Project Exodus questions
  if (lowerMessage.includes('what is') || lowerMessage.includes('about') || lowerMessage.includes('project exodus')) {
    return "Project Exodus is a sustainable living marketplace and community platform. We're developing sustainable innovations to implement as new environmental infrastructure, focusing on Food, Water, and Energy. We connect conscious consumers with verified eco-friendly products, provide comprehensive educational resources, and host a community where members can collaborate on sustainability projects. Our mission is to ensure that everyone who joins our family loves sustainability as much as we do!"
  }

  // Pricing/cost questions
  if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('fee') || lowerMessage.includes('free')) {
    return "Using Project Exodus is completely free! Creating an account, browsing products, reading educational content, and joining the community doesn't cost anything. We earn a small commission when you purchase products through our verified vendor partners. Product prices vary by vendor, but many offer free shipping on orders over $50-75."
  }

  // Default response
  return "That's a great question! While I can help with general information about Project Exodus, sustainable living practices, our educational resources (LEED, Passive House, Acorn Land Labs, etc.), community features, and shopping, I might need to direct you to more specific resources. You can browse our comprehensive FAQ page, explore our Learn section, or contact our support team at support@projectexodus.com for detailed assistance. What specific topic would you like to explore?"
}
