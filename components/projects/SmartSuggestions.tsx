'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Sparkles, Wand2, RefreshCw, ThumbsUp, ThumbsDown, Copy,
  Lightbulb, Tag, Target, FileText, TrendingUp, Zap, Plus,
  MessageSquare, X, ChevronDown, ChevronUp
} from 'lucide-react'

type SuggestionType = 'name' | 'tagline' | 'tags' | 'goal' | 'section' | 'description'

interface Suggestion {
  id: string
  type: SuggestionType
  content: string
  reasoning?: string
  confidence: 'high' | 'medium' | 'low'
}

interface SmartSuggestionsProps {
  // Context for generating suggestions
  category?: string
  description?: string
  mission?: string
  existingTags?: string[]
  projectType?: string

  // Callbacks
  onAcceptSuggestion?: (type: SuggestionType, content: string) => void
  onRejectSuggestion?: (suggestionId: string) => void

  // Display options
  compact?: boolean
  showReasoningByDefault?: boolean
  maxSuggestions?: number
}

// Suggestion generators (in real app, these would call an AI API)
const generateNameSuggestions = (category?: string, description?: string): Suggestion[] => {
  const categoryNames: Record<string, string[]> = {
    'environment': [
      'Green Earth Initiative',
      'EcoVision Collective',
      'Planet Guardians Project',
      'Sustainable Futures Alliance'
    ],
    'agriculture': [
      'Urban Harvest Network',
      'Seed to Table Project',
      'Community Roots Initiative',
      'FarmFresh Collective'
    ],
    'energy': [
      'Solar Horizons Project',
      'Clean Energy Coalition',
      'Renewable Futures Initiative',
      'Power from Nature Alliance'
    ],
    'education': [
      'Knowledge Garden Project',
      'Learn & Grow Initiative',
      'Bright Minds Collective',
      'Education for All Alliance'
    ]
  }

  const names = categoryNames[category || ''] || [
    'Impact Initiative',
    'Change Makers Collective',
    'Community Vision Project',
    'Future Builders Alliance'
  ]

  return names.slice(0, 3).map((name, idx) => ({
    id: `name-${idx}`,
    type: 'name',
    content: name,
    reasoning: `Based on your ${category || 'project'} category and common naming patterns for successful projects`,
    confidence: idx === 0 ? 'high' : idx === 1 ? 'medium' : 'low'
  }))
}

const generateTaglineSuggestions = (name?: string, category?: string): Suggestion[] => {
  const patterns = [
    'Building a sustainable future, together',
    'Where community meets impact',
    'Growing change from the ground up',
    'Empowering action through collaboration'
  ]

  return patterns.slice(0, 3).map((tagline, idx) => ({
    id: `tagline-${idx}`,
    type: 'tagline',
    content: tagline,
    reasoning: 'Crafted to be memorable, actionable, and inspiring',
    confidence: idx === 0 ? 'high' : 'medium'
  }))
}

const generateTagSuggestions = (category?: string, description?: string): Suggestion[] => {
  const categoryTags: Record<string, string[]> = {
    'environment': ['sustainability', 'climate-action', 'conservation', 'green-living', 'eco-friendly'],
    'agriculture': ['urban-farming', 'organic', 'food-security', 'permaculture', 'community-garden'],
    'energy': ['renewable', 'solar', 'clean-energy', 'carbon-neutral', 'energy-efficiency'],
    'education': ['learning', 'youth', 'workshops', 'capacity-building', 'skills-development']
  }

  const tags = categoryTags[category || ''] || ['community', 'impact', 'collaboration', 'innovation', 'grassroots']

  return tags.slice(0, 5).map((tag, idx) => ({
    id: `tag-${idx}`,
    type: 'tags',
    content: tag,
    reasoning: `Popular tag in ${category || 'community'} projects that helps with discoverability`,
    confidence: idx < 2 ? 'high' : idx < 4 ? 'medium' : 'low'
  }))
}

const generateGoalSuggestions = (category?: string, mission?: string): Suggestion[] => {
  const goalTemplates = [
    'Engage 100 community members within 6 months',
    'Complete 5 successful pilot projects by year end',
    'Reduce carbon footprint by 30% in target area',
    'Train 50 volunteers in sustainable practices'
  ]

  return goalTemplates.slice(0, 3).map((goal, idx) => ({
    id: `goal-${idx}`,
    type: 'goal',
    content: goal,
    reasoning: 'SMART goal (Specific, Measurable, Achievable, Relevant, Time-bound)',
    confidence: idx === 0 ? 'high' : 'medium'
  }))
}

const generateSectionSuggestions = (category?: string): Suggestion[] => {
  const sections = [
    { title: 'Get Involved', content: 'Learn how you can contribute to this project' },
    { title: 'Impact Stories', content: 'Real stories from community members' },
    { title: 'Resources', content: 'Helpful materials and guides' },
    { title: 'Events Calendar', content: 'Upcoming activities and meetings' }
  ]

  return sections.slice(0, 3).map((section, idx) => ({
    id: `section-${idx}`,
    type: 'section',
    content: `${section.title}: ${section.content}`,
    reasoning: 'Common section that increases engagement and transparency',
    confidence: idx === 0 ? 'high' : 'medium'
  }))
}

export function SmartSuggestions({
  category,
  description,
  mission,
  existingTags = [],
  projectType,
  onAcceptSuggestion,
  onRejectSuggestion,
  compact = false,
  showReasoningByDefault = false,
  maxSuggestions = 3
}: SmartSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [expandedSuggestions, setExpandedSuggestions] = useState<Set<string>>(new Set())
  const [likedSuggestions, setLikedSuggestions] = useState<Set<string>>(new Set())
  const [activeType, setActiveType] = useState<SuggestionType | null>(null)
  const [showPanel, setShowPanel] = useState(true)

  const generateSuggestions = (type: SuggestionType) => {
    setIsGenerating(true)
    setActiveType(type)

    // Simulate API call delay
    setTimeout(() => {
      let newSuggestions: Suggestion[] = []

      switch (type) {
        case 'name':
          newSuggestions = generateNameSuggestions(category, description)
          break
        case 'tagline':
          newSuggestions = generateTaglineSuggestions(description, category)
          break
        case 'tags':
          newSuggestions = generateTagSuggestions(category, description)
          break
        case 'goal':
          newSuggestions = generateGoalSuggestions(category, mission)
          break
        case 'section':
          newSuggestions = generateSectionSuggestions(category)
          break
      }

      setSuggestions(newSuggestions.slice(0, maxSuggestions))
      setIsGenerating(false)
    }, 800)
  }

  const handleAccept = (suggestion: Suggestion) => {
    onAcceptSuggestion?.(suggestion.type, suggestion.content)
    setLikedSuggestions(prev => new Set([...prev, suggestion.id]))

    // Remove from suggestions after short delay
    setTimeout(() => {
      setSuggestions(prev => prev.filter(s => s.id !== suggestion.id))
    }, 500)
  }

  const handleReject = (suggestionId: string) => {
    onRejectSuggestion?.(suggestionId)
    setSuggestions(prev => prev.filter(s => s.id !== suggestionId))
  }

  const toggleExpanded = (suggestionId: string) => {
    setExpandedSuggestions(prev => {
      const next = new Set(prev)
      if (next.has(suggestionId)) {
        next.delete(suggestionId)
      } else {
        next.add(suggestionId)
      }
      return next
    })
  }

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  if (!showPanel) {
    return (
      <button
        onClick={() => setShowPanel(true)}
        className="fixed bottom-24 right-6 z-30 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      >
        <Sparkles className="w-6 h-6 text-white"/>
      </button>
    )
  }

  if (compact) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-500"/>
            AI Suggestions
          </h4>
          <button
            onClick={() => setShowPanel(false)}
            className="p-1 hover:bg-[var(--muted)] rounded transition-colors"
          >
            <X className="w-3.5 h-3.5"/>
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => generateSuggestions('name')}
            size="sm"
            variant="outline"
            className="text-xs"
            disabled={isGenerating}
          >
            <Wand2 className="w-3 h-3 mr-1"/>
            Name Ideas
          </Button>
          <Button
            onClick={() => generateSuggestions('tagline')}
            size="sm"
            variant="outline"
            className="text-xs"
            disabled={isGenerating}
          >
            <MessageSquare className="w-3 h-3 mr-1"/>
            Taglines
          </Button>
          <Button
            onClick={() => generateSuggestions('tags')}
            size="sm"
            variant="outline"
            className="text-xs"
            disabled={isGenerating}
          >
            <Tag className="w-3 h-3 mr-1"/>
            Tags
          </Button>
          <Button
            onClick={() => generateSuggestions('goal')}
            size="sm"
            variant="outline"
            className="text-xs"
            disabled={isGenerating}
          >
            <Target className="w-3 h-3 mr-1"/>
            Goals
          </Button>
        </div>

        <AnimatePresence mode="popLayout">
          {suggestions.map((suggestion) => (
            <CompactSuggestionCard
              key={suggestion.id}
              suggestion={suggestion}
              onAccept={handleAccept}
              onReject={handleReject}
              isLiked={likedSuggestions.has(suggestion.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <Card className="border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-pink-500/5">
      <CardContent className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white"/>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">
                AI-Powered Suggestions
              </h3>
              <p className="text-[10px] text-theme-muted">
                Let AI help you craft an amazing project
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowPanel(false)}
            className="p-1.5 hover:bg-[var(--muted)] rounded transition-colors"
          >
            <X className="w-4 h-4"/>
          </button>
        </div>

        {/* Suggestion Type Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <SuggestionTypeButton
            icon={Wand2}
            label="Names"
            active={activeType === 'name'}
            onClick={() => generateSuggestions('name')}
            disabled={isGenerating}
          />
          <SuggestionTypeButton
            icon={MessageSquare}
            label="Taglines"
            active={activeType === 'tagline'}
            onClick={() => generateSuggestions('tagline')}
            disabled={isGenerating}
          />
          <SuggestionTypeButton
            icon={Tag}
            label="Tags"
            active={activeType === 'tags'}
            onClick={() => generateSuggestions('tags')}
            disabled={isGenerating}
          />
          <SuggestionTypeButton
            icon={Target}
            label="Goals"
            active={activeType === 'goal'}
            onClick={() => generateSuggestions('goal')}
            disabled={isGenerating}
          />
        </div>

        {/* Suggestions List */}
        <AnimatePresence mode="popLayout">
          {isGenerating ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-8"
            >
              <div className="text-center space-y-3">
                <div className="relative w-12 h-12 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-spin opacity-20"/>
                  <div className="absolute inset-2 rounded-full bg-[var(--background)] flex items-center justify-center">
                    <Zap className="w-5 h-5 text-purple-500 animate-pulse"/>
                  </div>
                </div>
                <p className="text-sm font-medium text-theme-muted">
                  Generating suggestions...
                </p>
              </div>
            </motion.div>
          ) : suggestions.length > 0 ? (
            <div className="space-y-2">
              {suggestions.map((suggestion) => (
                <SuggestionCard
                  key={suggestion.id}
                  suggestion={suggestion}
                  expanded={expandedSuggestions.has(suggestion.id)}
                  onToggleExpanded={toggleExpanded}
                  onAccept={handleAccept}
                  onReject={handleReject}
                  onCopy={copyToClipboard}
                  isLiked={likedSuggestions.has(suggestion.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Lightbulb className="w-12 h-12 mx-auto mb-3 text-theme-muted opacity-30"/>
              <p className="text-sm text-theme-muted">
                Select a suggestion type above to get AI-powered ideas
              </p>
            </div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

// Helper Components

interface SuggestionTypeButtonProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  active: boolean
  onClick: () => void
  disabled: boolean
}

function SuggestionTypeButton({ icon: Icon, label, active, onClick, disabled }: SuggestionTypeButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
        active
          ? 'border-purple-500 bg-purple-500/10'
          : 'border-[var(--border)] hover:border-purple-500/30'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <Icon className={`w-4 h-4 mx-auto mb-1 ${active ? 'text-purple-500' : 'text-theme-muted'}`}/>
      <p className={`text-xs font-bold ${active ? 'text-purple-500' : 'text-theme-muted'}`}>
        {label}
      </p>
    </button>
  )
}

interface SuggestionCardProps {
  suggestion: Suggestion
  expanded: boolean
  onToggleExpanded: (id: string) => void
  onAccept: (suggestion: Suggestion) => void
  onReject: (id: string) => void
  onCopy: (content: string) => void
  isLiked: boolean
}

function SuggestionCard({ suggestion, expanded, onToggleExpanded, onAccept, onReject, onCopy, isLiked }: SuggestionCardProps) {
  const confidenceColors: Record<'high' | 'medium' | 'low', string> = {
    high: 'from-green-500 to-emerald-500',
    medium: 'from-yellow-500 to-orange-500',
    low: 'from-gray-500 to-slate-500'
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`p-3 rounded-lg border-2 transition-all ${
        isLiked ? 'border-green-500/50 bg-green-500/5' : 'border-[var(--border)] hover:border-purple-500/30'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Confidence indicator */}
        <div className={`w-1 h-full rounded-full bg-gradient-to-b ${confidenceColors[suggestion.confidence]}`}/>

        <div className="flex-1 min-w-0">
          {/* Content */}
          <p className="text-sm font-medium mb-2">{suggestion.content}</p>

          {/* Reasoning (expandable) */}
          {suggestion.reasoning && (
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-xs text-theme-muted italic mb-2">
                    💡 {suggestion.reasoning}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => onAccept(suggestion)}
              className="flex items-center gap-1 px-2 py-1 bg-green-500/10 hover:bg-green-500/20 rounded text-green-600 transition-colors"
              disabled={isLiked}
            >
              <ThumbsUp className="w-3 h-3"/>
              <span className="text-xs font-bold">Use This</span>
            </button>

            <button
              onClick={() => onReject(suggestion.id)}
              className="p-1 hover:bg-red-500/10 rounded text-red-500 transition-colors"
            >
              <ThumbsDown className="w-3 h-3"/>
            </button>

            <button
              onClick={() => onCopy(suggestion.content)}
              className="p-1 hover:bg-[var(--muted)] rounded transition-colors"
            >
              <Copy className="w-3 h-3"/>
            </button>

            {suggestion.reasoning && (
              <button
                onClick={() => onToggleExpanded(suggestion.id)}
                className="ml-auto p-1 hover:bg-[var(--muted)] rounded transition-colors"
              >
                {expanded ? <ChevronUp className="w-3 h-3"/> : <ChevronDown className="w-3 h-3"/>}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

interface CompactSuggestionCardProps {
  suggestion: Suggestion
  onAccept: (suggestion: Suggestion) => void
  onReject: (id: string) => void
  isLiked: boolean
}

function CompactSuggestionCard({ suggestion, onAccept, onReject, isLiked }: CompactSuggestionCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`p-2 rounded-lg border transition-all ${
        isLiked ? 'border-green-500/50 bg-green-500/5' : 'border-[var(--border)]'
      }`}
    >
      <div className="flex items-center gap-2">
        <p className="text-xs flex-1">{suggestion.content}</p>
        <button
          onClick={() => onAccept(suggestion)}
          className="p-1 hover:bg-green-500/10 rounded text-green-600"
          disabled={isLiked}
        >
          <Plus className="w-3.5 h-3.5"/>
        </button>
        <button
          onClick={() => onReject(suggestion.id)}
          className="p-1 hover:bg-red-500/10 rounded text-red-500"
        >
          <X className="w-3.5 h-3.5"/>
        </button>
      </div>
    </motion.div>
  )
}
