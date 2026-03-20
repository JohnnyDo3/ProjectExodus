'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Leaf,
  ChevronRight,
  MessageSquare,
  FileText,
  Users,
  AlertCircle,
  Award,
  TrendingUp,
  Lightbulb,
  X,
  RefreshCw
} from 'lucide-react'

interface Insight {
  id: string
  type: 'activity' | 'attention' | 'recognition' | 'growth'
  icon: typeof Leaf
  title: string
  description: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
}

interface SageInsightsPanelProps {
  projectId: string
  projectName: string
  compact?: boolean
  className?: string
}

export function SageInsightsPanel({
  projectId,
  projectName,
  compact = false,
  className = ''
}: SageInsightsPanelProps) {
  const [insights, setInsights] = useState<Insight[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set())
  const [expanded, setExpanded] = useState(!compact)

  useEffect(() => {
    fetchInsights()
  }, [projectId])

  const fetchInsights = async () => {
    setLoading(true)
    setError(null)

    try {
      // In production, this would call the insights API
      // For now, generate mock insights based on project data
      const response = await fetch(`/api/projects/${projectId}/sage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Give me a quick insights summary' }],
          mode: 'insights'
        })
      })

      if (!response.ok) {
        throw new Error('Failed to fetch insights')
      }

      // Generate insights from the response
      // In a real implementation, the API would return structured insights
      const mockInsights: Insight[] = [
        {
          id: '1',
          type: 'activity',
          icon: MessageSquare,
          title: 'New Discussions',
          description: 'Activity is up - review recent posts',
          action: {
            label: 'View Discussions',
            href: `/community/projects/${projectId}/discussions`
          }
        },
        {
          id: '2',
          type: 'attention',
          icon: AlertCircle,
          title: 'Pending Waivers',
          description: 'Review waiver requests',
          action: {
            label: 'Review',
            href: `/community/projects/${projectId}/settings/waivers`
          }
        },
        {
          id: '3',
          type: 'recognition',
          icon: Award,
          title: 'Badge Candidates',
          description: 'Members ready for recognition',
          action: {
            label: 'Award Badges',
            href: `/community/projects/${projectId}/members`
          }
        },
        {
          id: '4',
          type: 'growth',
          icon: Lightbulb,
          title: 'Growth Opportunity',
          description: 'Consider adding a new subgroup',
          action: {
            label: 'Create Subgroup',
            href: `/community/projects/${projectId}/subgroups/new`
          }
        }
      ]

      setInsights(mockInsights)
    } catch {
      setError('Unable to load insights')
    } finally {
      setLoading(false)
    }
  }

  const dismissInsight = (id: string) => {
    setDismissedIds(prev => new Set([...prev, id]))
  }

  const visibleInsights = insights.filter(i => !dismissedIds.has(i.id))

  if (compact && !expanded) {
    return (
      <motion.button
        onClick={() => setExpanded(true)}
        className={`flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-lg hover:border-emerald-500/40 transition-colors ${className}`}
      >
        <Leaf className="w-4 h-4 text-emerald-500" />
        <span className="text-sm font-medium">Sage Insights</span>
        {visibleInsights.length > 0 && (
          <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center">
            {visibleInsights.length}
          </span>
        )}
        <ChevronRight className="w-4 h-4 ml-auto" />
      </motion.button>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/20 rounded-xl overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-emerald-500/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Sage Insights</h3>
            <p className="text-[10px] text-[var(--muted-foreground)]">{projectName}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={fetchInsights}
            disabled={loading}
            className="p-1.5 hover:bg-[var(--muted)] rounded-lg transition-colors"
            title="Refresh insights"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          {compact && (
            <button
              onClick={() => setExpanded(false)}
              className="p-1.5 hover:bg-[var(--muted)] rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        {loading ? (
          <div className="flex items-center justify-center py-6">
            <RefreshCw className="w-5 h-5 animate-spin text-emerald-500" />
          </div>
        ) : error ? (
          <div className="text-center py-4 text-sm text-[var(--muted-foreground)]">
            {error}
          </div>
        ) : visibleInsights.length === 0 ? (
          <div className="text-center py-4">
            <TrendingUp className="w-8 h-8 mx-auto text-emerald-500/50 mb-2" />
            <p className="text-sm text-[var(--muted-foreground)]">
              All caught up! No new insights.
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {visibleInsights.map((insight) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10, height: 0 }}
                className="group relative bg-[var(--card)] border border-[var(--border)] rounded-lg p-3 hover:border-emerald-500/30 transition-colors"
              >
                <button
                  onClick={() => dismissInsight(insight.id)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 hover:bg-[var(--muted)] rounded transition-all"
                >
                  <X className="w-3 h-3" />
                </button>

                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    insight.type === 'activity' ? 'bg-blue-500/10 text-blue-500' :
                    insight.type === 'attention' ? 'bg-amber-500/10 text-amber-500' :
                    insight.type === 'recognition' ? 'bg-purple-500/10 text-purple-500' :
                    'bg-emerald-500/10 text-emerald-500'
                  }`}>
                    <insight.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium">{insight.title}</h4>
                    <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                      {insight.description}
                    </p>
                    {insight.action && (
                      <a
                        href={insight.action.href}
                        onClick={insight.action.onClick}
                        className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-emerald-500 hover:text-emerald-600 transition-colors"
                      >
                        {insight.action.label}
                        <ChevronRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Footer */}
      {visibleInsights.length > 0 && (
        <div className="px-4 py-2 border-t border-emerald-500/10">
          <a
            href={`/community/projects/${projectId}/settings`}
            className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors flex items-center gap-1"
          >
            <span>View all insights</span>
            <ChevronRight className="w-3 h-3" />
          </a>
        </div>
      )}
    </motion.div>
  )
}

export default SageInsightsPanel
