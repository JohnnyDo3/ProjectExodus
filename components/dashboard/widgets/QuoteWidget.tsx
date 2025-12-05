'use client'

import { useState, useEffect } from 'react'
import { Quote, RefreshCw } from 'lucide-react'
import { WidgetWrapper } from '../WidgetWrapper'

interface QuoteWidgetProps {
  onRemove?: () => void
}

const quotes = [
  { text: "The greatest threat to our planet is the belief that someone else will save it.", author: "Robert Swan" },
  { text: "We do not inherit the Earth from our ancestors; we borrow it from our children.", author: "Native American Proverb" },
  { text: "The Earth does not belong to us: we belong to the Earth.", author: "Marlee Matlin" },
  { text: "In every walk with nature, one receives far more than he seeks.", author: "John Muir" },
  { text: "What we are doing to the forests of the world is but a mirror reflection of what we are doing to ourselves.", author: "Mahatma Gandhi" },
  { text: "The environment is where we all meet; where we all have a mutual interest.", author: "Lady Bird Johnson" },
  { text: "Nature is not a place to visit. It is home.", author: "Gary Snyder" },
  { text: "Look deep into nature, and then you will understand everything better.", author: "Albert Einstein" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James" },
  { text: "Be the change you wish to see in the world.", author: "Mahatma Gandhi" },
  { text: "Progress is impossible without change.", author: "George Bernard Shaw" },
  { text: "A journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Small acts, when multiplied by millions of people, can transform the world.", author: "Howard Zinn" },
]

export function QuoteWidget({ onRemove }: QuoteWidgetProps) {
  const [currentQuote, setCurrentQuote] = useState(quotes[0])
  const [isAnimating, setIsAnimating] = useState(false)

  // Get a random quote on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    setCurrentQuote(quotes[randomIndex])
  }, [])

  const getNewQuote = () => {
    setIsAnimating(true)
    setTimeout(() => {
      let newIndex = Math.floor(Math.random() * quotes.length)
      // Avoid same quote
      while (quotes[newIndex].text === currentQuote.text && quotes.length > 1) {
        newIndex = Math.floor(Math.random() * quotes.length)
      }
      setCurrentQuote(quotes[newIndex])
      setIsAnimating(false)
    }, 200)
  }

  return (
    <WidgetWrapper
      id="quote"
      title="Daily Inspiration"
      icon={Quote}
      theme="primary"
      onRemove={onRemove}
      showRemove={!!onRemove}
      headerActions={
        <button
          onClick={getNewQuote}
          className="p-1.5 rounded-lg hover:bg-[var(--muted)] transition-colors"
          title="New quote"
        >
          <RefreshCw className={`w-4 h-4 text-[var(--foreground)]/60 ${isAnimating ? 'animate-spin' : ''}`} />
        </button>
      }
    >
      <div className="h-full flex flex-col justify-center p-4">
        <div className={`transition-opacity duration-200 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <blockquote className="text-sm sm:text-base font-medium text-[var(--foreground)] leading-relaxed italic">
            "{currentQuote.text}"
          </blockquote>
          <p className="text-xs font-semibold text-[var(--primary)] mt-3">
            — {currentQuote.author}
          </p>
        </div>
      </div>
    </WidgetWrapper>
  )
}
