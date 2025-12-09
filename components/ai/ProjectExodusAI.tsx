'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { MessageCircle, X, Send, Leaf, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function ProjectExodusAI() {
  const pathname = usePathname()
  const isHomepage = pathname === '/'
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [hasGreeted, setHasGreeted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Prepare greeting on homepage load (but don't auto-open)
  useEffect(() => {
    if (isHomepage && !hasGreeted) {
      // Delay greeting by 2 seconds for better UX
      const timer = setTimeout(() => {
        const greeting: Message = {
          role: 'assistant',
          content: "🌍 Welcome to Project Exodus! I'm Sage, your sustainability guide. I can help you discover eco-friendly products, calculate your carbon footprint, explore breakthrough innovations like carbon capture and green hydrogen, and learn about renewable energy, regenerative agriculture, zero waste living, green building, and more. What would you like to explore today?",
          timestamp: new Date()
        }
        setMessages([greeting])
        // Note: Removed setIsOpen(true) - user must click to open
        setHasGreeted(true)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isHomepage, hasGreeted])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue('')

    // Call the actual AI API
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      })

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const data = await response.json()

      const aiResponse: Message = {
        role: 'assistant',
        content: data.message || 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
    } catch (error) {
      console.error('AI API Error:', error)
      // Fallback to keyword matching if API fails
      const aiResponse: Message = {
        role: 'assistant',
        content: getAIResponse(currentInput),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
    }
  }

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    // Solar/Renewable Energy
    if (input.includes('solar') || input.includes('renewable energy') || input.includes('wind') || input.includes('clean energy')) {
      return "⚡ Great question! Renewable energy is transforming our world. Solar PV costs have dropped 89% since 2010, making it the cheapest electricity source in most regions. I'd recommend checking out our Renewable Energy learning page where you can discover how solar panels can save you $150,000-$300,000 over 20 years, or browse our curated solar products. Would you like me to guide you to specific resources?"
    }

    // Fashion
    if (input.includes('fashion') || input.includes('clothing') || input.includes('textile')) {
      return "👕 Sustainable fashion is crucial! The fashion industry produces 10% of global carbon emissions and 92 million tons of textile waste annually. But there's hope—circular fashion can create $560 billion in economic opportunities while reducing emissions by 143 million tons by 2030. Check out our Sustainable Fashion page to learn about ethical brands, or explore our eco-friendly clothing products!"
    }

    // Agriculture/Farming
    if (input.includes('farm') || input.includes('agriculture') || input.includes('food') || input.includes('soil')) {
      return "🌾 Regenerative agriculture is the future! Did you know that regenerative farms can sequester 3-8 tons of CO₂ per hectare annually while increasing yields by 13% and profitability by 78%? Our Regenerative Agriculture page features the 10 Commandments of Sustainable Agriculture—principles of stewardship, biodiversity, integrity, and more. Want to learn specific practices like cover cropping or no-till farming?"
    }

    // Zero Waste
    if (input.includes('waste') || input.includes('recycle') || input.includes('compost') || input.includes('plastic')) {
      return "♻️ Love your zero waste interest! Americans throw away 2.24 billion tons of waste yearly, but we can change that. The 5 R's (Refuse, Reduce, Reuse, Recycle, Rot) can help you divert 30-60% of household waste from landfills. Our Zero Waste page has room-by-room guides, and we offer eco-friendly alternatives to single-use plastics. Ready to start your zero waste journey?"
    }

    // Green Building
    if (input.includes('build') || input.includes('house') || input.includes('home') || input.includes('passive house') || input.includes('leed')) {
      return "🏡 Green building is one of the most impactful climate solutions! Buildings account for 39% of global CO₂ emissions, but high-performance green buildings can reduce energy use by 60-90% with only 0-8% additional upfront cost. Passive House standard saves $150,000-$300,000 over 20 years! Check out our Green Building page and certification guides (LEED, Passive House, etc.)."
    }

    // Water Conservation
    if (input.includes('water') || input.includes('drought') || input.includes('conserv')) {
      return "💧 Water conservation is critical! Only 0.5% of Earth's water is accessible freshwater, and 2.2 billion people lack safely managed drinking water. But simple changes like WaterSense fixtures can save 13,000+ gallons annually per household. Our Water Conservation page covers everything from rainwater harvesting to agricultural drip irrigation. What aspect interests you most?"
    }

    // Products
    if (input.includes('product') || input.includes('buy') || input.includes('shop') || input.includes('store')) {
      return "🛍️ Our marketplace features 70+ sustainable products across all categories! From Goal Zero solar generators and EcoFlow power stations to Patagonia clothing, Berkey water filters, and Subpod composters. Every product is vetted for sustainability credentials. What category are you interested in? Renewable energy, fashion, zero waste, agriculture, or home goods?"
    }

    // Carbon Calculator
    if (input.includes('carbon') || input.includes('footprint') || input.includes('calculator') || input.includes('emissions') || input.includes('calculate')) {
      return "📊 Our Carbon Footprint Calculator uses EPA-verified methodology to measure your annual CO₂ emissions across housing, transportation, food, goods, and travel. You'll get personalized recommendations showing exactly how much CO₂ you can save with specific actions. The average American emits 16 tons/year—let's see where you stand and create your reduction plan! Visit /tools/carbon-calculator to get started."
    }

    // Emerging Tech / Innovation
    if (input.includes('innovation') || input.includes('technology') || input.includes('tech') || input.includes('future') || input.includes('battery') || input.includes('hydrogen') || input.includes('carbon capture')) {
      return "🚀 Breakthrough innovations are transforming sustainability RIGHT NOW! Climeworks' DAC plants capture CO₂ from air, QuantumScape's solid-state batteries enable 500-mile EVs, green hydrogen costs dropped 70%, and vertical farms grow food with 95% less water. $1.4 trillion invested in climate tech in 2023 alone! Check out our Emerging Technologies page to explore carbon capture, advanced batteries, green hydrogen, vertical farming, and AI for climate. The future is here!"
    }

    // Success Stories / Case Studies / Examples
    if (input.includes('success') || input.includes('example') || input.includes('case study') || input.includes('proof') || input.includes('works') || input.includes('real world')) {
      return "✅ Sustainability isn't just theory—it's WORKING! Patagonia built a $3B business on activism, Interface saved $450M while going carbon-negative, Copenhagen is carbon-neutral by 2025, regenerative farms are sequestering carbon while increasing profits 78%, and net-zero buildings save 70-90% on energy. Our Success Stories page shows companies, cities, farms, and buildings proving environmental stewardship = economic prosperity. See the proof!"
    }

    // General/Default
    return "I'm here to help you on your sustainability journey! 🌱 I can guide you through:\n\n⚡ Renewable Energy (solar, wind, storage)\n👕 Sustainable Fashion (circular economy, ethical brands)\n🌾 Regenerative Agriculture (soil health, carbon sequestration)\n♻️ Zero Waste Living (the 5 R's, composting)\n🏡 Green Building (Passive House, LEED)\n💧 Water Conservation (efficiency, rainwater harvesting)\n🚀 Emerging Technologies (carbon capture, green H₂, AI)\n✅ Success Stories (real-world proof)\n📊 Carbon Calculator (measure your impact)\n\nWhat would you like to explore? Or ask me about specific products, certifications, or practices!"
  }

  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 group"
          aria-label="Open Sage"
        >
          {/* Pulsing ring animation - pointer-events-none so it doesn't expand hover area */}
          <div className="absolute -inset-2 bg-gradient-to-r from-moss-500 to-ocean-500 rounded-full opacity-50 blur group-hover:opacity-75 transition animate-pulse pointer-events-none" />

          {/* Main button */}
          <div className="relative w-full h-full bg-gradient-to-br from-moss-600 to-ocean-600 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
            <Leaf className="w-7 h-7 sm:w-8 sm:h-8 text-white" />

            {/* Notification badge if greeting is ready */}
            {messages.length > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-white text-xs font-bold">1</span>
              </div>
            )}
          </div>

          {/* Tooltip - only show on actual hover, not close proximity */}
          <div className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-[var(--card)] border-2 border-theme-primary rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            <p className="text-sm font-bold text-[var(--foreground)]">Sage - Your Sustainability Guide</p>
            <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-3 h-3 bg-[var(--card)] border-r-2 border-b-2 border-theme-primary" />
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-w-md h-[calc(100vh-2rem)] sm:h-[600px] max-h-[90vh] bg-[var(--card)] rounded-2xl shadow-2xl border-4 border-theme-primary flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-moss-600 to-ocean-600 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-white font-black text-base sm:text-lg truncate">Sage</h3>
                <p className="text-white/80 text-xs font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
                  <span className="truncate">Online</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors flex-shrink-0 ml-2"
              aria-label="Close chat"
            >
              <X className="w-6 h-6 sm:w-5 sm:h-5 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4 bg-[var(--muted)]">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-moss-600 to-ocean-600 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <p className="text-theme-muted font-semibold">
                  Ask me anything about sustainability!
                </p>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-moss-600 to-ocean-600 text-white'
                      : 'bg-[var(--card)] border-2 border-theme-primary text-[var(--foreground)]'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Leaf className="w-4 h-4 text-theme-primary" />
                      <span className="text-xs font-bold text-theme-primary">SAGE</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {message.content}
                  </p>
                  <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-white/60' : 'text-theme-muted'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 sm:p-4 bg-[var(--card)] border-t-2 border-[var(--border)] flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about sustainability..."
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-xl bg-[var(--muted)] border-2 border-[var(--border)] focus:border-theme-primary focus:outline-none text-[var(--foreground)] placeholder:text-theme-muted font-medium"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-moss-600 to-ocean-600 flex items-center justify-center hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity shadow-lg flex-shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
