'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Leaf,
  Send,
  X,
  Minimize2,
  Maximize2,
  Sparkles,
  Loader2,
  Bot,
  User,
  Settings,
  Lightbulb,
  ShieldCheck,
  BarChart3
} from 'lucide-react'

type SageMode = 'setup' | 'admin' | 'waiver' | 'insights' | 'general'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ProjectSageProps {
  projectId: string
  projectName?: string
  mode?: SageMode
  isOpen?: boolean
  onClose?: () => void
  className?: string
  // For waiver analysis
  waiverUserId?: string
  // Callback for when Sage makes suggestions
  onSuggestion?: (suggestion: string) => void
}

const MODE_CONFIG: Record<SageMode, { icon: typeof Leaf; label: string; color: string }> = {
  setup: { icon: Settings, label: 'Setup Wizard', color: 'from-violet-500 to-purple-600' },
  admin: { icon: Sparkles, label: 'Admin Assistant', color: 'from-emerald-500 to-teal-600' },
  waiver: { icon: ShieldCheck, label: 'Waiver Analysis', color: 'from-amber-500 to-orange-600' },
  insights: { icon: BarChart3, label: 'Insights', color: 'from-blue-500 to-cyan-600' },
  general: { icon: Leaf, label: 'Sage', color: 'from-green-500 to-emerald-600' }
}

export function ProjectSage({
  projectId,
  projectName = 'Project',
  mode = 'general',
  isOpen: controlledIsOpen,
  onClose,
  className = '',
  waiverUserId,
  onSuggestion
}: ProjectSageProps) {
  const [isOpen, setIsOpen] = useState(controlledIsOpen ?? false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const modeConfig = MODE_CONFIG[mode]
  const ModeIcon = modeConfig.icon

  // Sync controlled state
  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      setIsOpen(controlledIsOpen)
    }
  }, [controlledIsOpen])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Add initial greeting based on mode
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = getInitialGreeting(mode, projectName)
      setMessages([{
        id: 'greeting',
        role: 'assistant',
        content: greeting,
        timestamp: new Date()
      }])
    }
  }, [isOpen, mode, projectName, messages.length])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    onClose?.()
  }, [onClose])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch(`/api/projects/${projectId}/sage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          })),
          mode,
          waiverContext: waiverUserId ? { userId: waiverUserId } : undefined
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])

      // Check for suggestions in the response
      if (data.suggestions && onSuggestion) {
        data.suggestions.forEach((s: string) => onSuggestion(s))
      }

    } catch {
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br ${modeConfig.color} text-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center ${className}`}
        aria-label="Open Sage Assistant"
      >
        <ModeIcon className="w-6 h-6" />
        <motion.div
          className="absolute inset-0 rounded-full bg-white/20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          height: isMinimized ? 'auto' : '600px'
        }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className={`fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden flex flex-col ${className}`}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${modeConfig.color} p-4 text-white flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Sage</h3>
              <p className="text-xs text-white/80">{modeConfig.label} - {projectName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              aria-label={isMinimized ? 'Maximize' : 'Minimize'}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={handleClose}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        {!isMinimized && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                    message.role === 'user'
                      ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                      : `bg-gradient-to-br ${modeConfig.color} text-white`
                  }`}>
                    {message.role === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div className={`max-w-[80%] rounded-xl px-4 py-2.5 ${
                    message.role === 'user'
                      ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                      : 'bg-[var(--muted)] text-[var(--foreground)]'
                  }`}>
                    <div className="text-sm whitespace-pre-wrap prose prose-sm max-w-none dark:prose-invert">
                      {formatMessage(message.content)}
                    </div>
                    <p className="text-[10px] opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${modeConfig.color} text-white`}>
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-[var(--muted)] rounded-xl px-4 py-3">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-[var(--foreground)]/40 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-[var(--foreground)]/40 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-[var(--foreground)]/40 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick suggestions for specific modes */}
            {messages.length === 1 && mode !== 'general' && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {getQuickSuggestions(mode).map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setInput(suggestion)
                        inputRef.current?.focus()
                      }}
                      className="px-3 py-1.5 text-xs bg-[var(--muted)] hover:bg-[var(--muted)]/80 rounded-full transition-colors flex items-center gap-1.5"
                    >
                      <Lightbulb className="w-3 h-3" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-[var(--border)]">
              <div className="flex gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Sage anything..."
                  className="flex-1 resize-none rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 max-h-24"
                  rows={1}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    input.trim() && !isLoading
                      ? `bg-gradient-to-r ${modeConfig.color} text-white hover:opacity-90`
                      : 'bg-[var(--muted)] text-[var(--muted-foreground)] cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

function getInitialGreeting(mode: SageMode, projectName: string): string {
  const greetings: Record<SageMode, string> = {
    setup: `Welcome! I'm Sage, and I'll help you set up "${projectName}".

Let's start by understanding your project. What type of project is this?
- **Research** - Investigation and knowledge sharing
- **Technology** - Building sustainable tech
- **Community** - Organizing around shared goals
- **Educational** - Teaching and training

Or describe your project and I'll suggest the best structure!`,

    admin: `Hello! I'm here to help you manage "${projectName}".

I can assist with:
- **Layout & Structure** - Optimize your project's organization
- **Member Management** - Roles, permissions, recognition
- **Content** - Discussions, research, learning modules
- **Insights** - Activity reports and suggestions

What would you like to work on?`,

    waiver: `I'll help you analyze this waiver request for "${projectName}".

I'll review the user's:
- STOCK score and contribution history
- Completed courses and their relevance
- Time on the platform

Please provide the waiver details or ask me to analyze the current request.`,

    insights: `Here's your insights dashboard for "${projectName}".

I'll provide:
- **Activity Summary** - Recent engagement
- **Attention Needed** - Issues to address
- **Recognition** - Members deserving badges
- **Growth Ideas** - Suggestions for improvement

What area would you like to explore?`,

    general: `Hi! I'm Sage, your AI assistant for "${projectName}".

I can help you with anything project-related:
- Understanding features and how they work
- Best practices for collaboration
- Answering questions about the project

What can I help you with?`
  }

  return greetings[mode]
}

function getQuickSuggestions(mode: SageMode): string[] {
  const suggestions: Record<SageMode, string[]> = {
    setup: [
      'Suggest a layout',
      'What prerequisites?',
      'Help me describe my project'
    ],
    admin: [
      'Who deserves recognition?',
      'Show inactive members',
      'Draft an announcement'
    ],
    waiver: [
      'Analyze this request',
      'What are the prerequisites?',
      'Show approval history'
    ],
    insights: [
      'Weekly summary',
      'Top contributors',
      'Growth opportunities'
    ],
    general: []
  }

  return suggestions[mode]
}

function formatMessage(content: string): React.ReactNode {
  // Simple markdown-like formatting
  return content
    .split('\n')
    .map((line, i) => {
      // Bold
      // Bold - safely extract text and wrap in <strong> without dangerouslySetInnerHTML
      const parts: React.ReactNode[] = []
      const boldRegex = /\*\*(.*?)\*\*/g
      let lastIndex = 0
      let match
      // Bullet points
      if (line.startsWith('- ')) {
        line = '• ' + line.slice(2)
      }
      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.slice(lastIndex, match.index))
        }
        parts.push(<strong key={`b-${i}-${match.index}`}>{match[1]}</strong>)
        lastIndex = boldRegex.lastIndex
      }
      if (lastIndex < line.length) {
        parts.push(line.slice(lastIndex))
      }
      return (
        <span key={i}>
          {parts.length > 0 ? parts : line}
        </span>
      )
    })
    .reduce((acc: React.ReactNode[], curr, i) => {
      if (i > 0) acc.push(<br key={`br-${i}`} />)
      acc.push(curr)
      return acc
    }, [])
}

export default ProjectSage
