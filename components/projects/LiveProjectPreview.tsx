'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import {
  Eye, Globe2, Lock, Archive, Users, Calendar, Target, Heart,
  ExternalLink, Sparkles, TrendingUp, MessageCircle, BookOpen,
  X, Maximize2, Minimize2
} from 'lucide-react'
import { ProjectSection } from './VisualSectionBuilder'

interface LiveProjectPreviewProps {
  // Project data
  name: string
  tagline?: string
  description: string
  mission?: string
  goal?: string
  category?: string
  tags: string[]
  visibility: string
  theme: string
  coverImage?: string | null
  status?: string
  sections?: ProjectSection[]

  // Theme colors
  themeColors?: {
    primary: string
    accent: string
    gradient: string
  }

  // Settings
  enableDiscussions?: boolean
  enableResearch?: boolean
  enableLearning?: boolean

  // Display options
  viewMode?: 'card' | 'page' | 'mobile'
  showControls?: boolean
  onClose?: () => void
  isFullscreen?: boolean
  onToggleFullscreen?: () => void
}

const VISIBILITY_CONFIG = {
  PUBLIC: { icon: Globe2, label: 'Public', color: 'emerald' },
  PRIVATE: { icon: Lock, label: 'Private', color: 'violet' },
  DRAFT: { icon: Archive, label: 'Draft', color: 'amber' }
}

const STATUS_CONFIG = {
  PLANNING: { label: 'Planning', color: 'blue', icon: '📋' },
  ACTIVE: { label: 'Active', color: 'green', icon: '🚀' },
  COMPLETED: { label: 'Completed', color: 'purple', icon: '✅' }
}

export function LiveProjectPreview({
  name,
  tagline,
  description,
  mission,
  goal,
  category,
  tags,
  visibility,
  theme,
  coverImage,
  status = 'PLANNING',
  sections = [],
  themeColors,
  enableDiscussions = true,
  enableResearch = true,
  enableLearning = true,
  viewMode = 'card',
  showControls = true,
  onClose,
  isFullscreen = false,
  onToggleFullscreen
}: LiveProjectPreviewProps) {
  const visConfig = VISIBILITY_CONFIG[visibility as keyof typeof VISIBILITY_CONFIG] || VISIBILITY_CONFIG.PUBLIC
  const statusConfig = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.PLANNING
  const VisibilityIcon = visConfig.icon

  // Apply theme colors inline
  const themeStyle = themeColors ? {
    '--preview-primary': themeColors.primary,
    '--preview-accent': themeColors.accent,
  } as React.CSSProperties : {}

  if (viewMode === 'card') {
    return <PreviewCard {...{
      name, tagline, description, category, tags, visibility, theme, coverImage,
      visConfig, VisibilityIcon, themeColors, showControls, onClose, isFullscreen, onToggleFullscreen
    }} />
  }

  if (viewMode === 'mobile') {
    return <MobilePreview {...{
      name, tagline, description, mission, goal, category, tags, visibility, status, sections,
      visConfig, statusConfig, VisibilityIcon, themeColors, enableDiscussions, enableResearch, enableLearning,
      showControls, onClose, isFullscreen, onToggleFullscreen
    }} />
  }

  // Full page preview (default)
  return (
    <div className="relative" style={themeStyle}>
      {/* Controls Header */}
      {showControls && (
        <div className="flex items-center justify-between mb-4 p-3 bg-[var(--muted)]/50 rounded-lg border border-[var(--border)]">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-theme-primary"/>
            <h3 className="text-sm font-bold text-[var(--foreground)]">Live Preview</h3>
            <Badge variant="outline" className="text-[10px]">
              {viewMode.toUpperCase()}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            {onToggleFullscreen && (
              <button
                onClick={onToggleFullscreen}
                className="p-1.5 hover:bg-[var(--muted)] rounded transition-colors"
                title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4"/>
                ) : (
                  <Maximize2 className="w-4 h-4"/>
                )}
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-red-500/10 rounded transition-colors text-red-500"
                title="Close preview"
              >
                <X className="w-4 h-4"/>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Page Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Hero Section */}
        <Card className="overflow-hidden border-2 border-[var(--border)]">
          {/* Cover Image */}
          {coverImage ? (
            <div className="relative h-48 bg-gradient-to-br from-[var(--muted)] to-[var(--background)]">
              <img
                src={coverImage}
                alt={name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
            </div>
          ) : (
            <div
              className="h-48 bg-gradient-to-br"
              style={{
                background: themeColors
                  ? `linear-gradient(135deg, ${themeColors.primary}15, ${themeColors.accent}15)`
                  : 'linear-gradient(135deg, var(--primary)/10, var(--accent)/10)'
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <Sparkles className="w-16 h-16 opacity-20"/>
              </div>
            </div>
          )}

          <CardHeader className="relative">
            {/* Status & Visibility Badges */}
            <div className="flex items-center gap-2 mb-3">
              <Badge className="text-[10px] font-bold" style={{
                background: themeColors
                  ? `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.accent})`
                  : undefined
              }}>
                {statusConfig.icon} {statusConfig.label}
              </Badge>
              <Badge variant="outline" className="text-[10px] font-bold">
                <VisibilityIcon className="w-3 h-3 mr-1"/>
                {visConfig.label}
              </Badge>
              {category && (
                <Badge variant="secondary" className="text-[10px] font-bold">
                  {category}
                </Badge>
              )}
            </div>

            {/* Title & Tagline */}
            <CardTitle className="text-2xl font-bold mb-2">
              {name || 'Untitled Project'}
            </CardTitle>
            {tagline && (
              <p className="text-sm italic text-theme-muted font-medium">
                "{tagline}"
              </p>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-[var(--muted)] rounded-full text-[10px] font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Description */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-theme-muted mb-2">
                About
              </h4>
              <p className="text-sm leading-relaxed">
                {description || 'No description yet. Add one to tell people about your project!'}
              </p>
            </div>

            {/* Mission */}
            {mission && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-theme-muted mb-2">
                  Mission
                </h4>
                <p className="text-sm leading-relaxed italic">
                  {mission}
                </p>
              </div>
            )}

            {/* Goal */}
            {goal && (
              <div className="p-3 bg-[var(--muted)]/50 rounded-lg border border-[var(--border)]">
                <div className="flex items-start gap-2">
                  <Target className="w-4 h-4 mt-0.5 flex-shrink-0" style={{
                    color: themeColors?.primary
                  }}/>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-theme-muted mb-1">
                      Primary Goal
                    </h4>
                    <p className="text-sm font-medium">
                      {goal}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Features */}
            <div className="flex flex-wrap gap-3 pt-2">
              {enableDiscussions && (
                <div className="flex items-center gap-1.5 text-xs">
                  <MessageCircle className="w-3.5 h-3.5 text-theme-primary"/>
                  <span className="font-medium">Discussions</span>
                </div>
              )}
              {enableResearch && (
                <div className="flex items-center gap-1.5 text-xs">
                  <BookOpen className="w-3.5 h-3.5 text-theme-primary"/>
                  <span className="font-medium">Research</span>
                </div>
              )}
              {enableLearning && (
                <div className="flex items-center gap-1.5 text-xs">
                  <TrendingUp className="w-3.5 h-3.5 text-theme-primary"/>
                  <span className="font-medium">Learning</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Custom Sections Preview */}
        {sections.filter(s => s.visible).length > 0 && (
          <Card className="border-2 border-[var(--border)]">
            <CardHeader>
              <CardTitle className="text-lg">Custom Sections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sections.filter(s => s.visible).map((section) => (
                <div key={section.id} className="p-3 bg-[var(--muted)]/30 rounded-lg">
                  <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
                    <section.icon className="w-4 h-4"/>
                    {section.title}
                  </h4>
                  <p className="text-xs text-theme-muted whitespace-pre-wrap">
                    {section.content || 'No content yet...'}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Stats Preview */}
        <Card className="border-2 border-[var(--border)]">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <Users className="w-5 h-5 mx-auto mb-1 text-theme-muted"/>
                <p className="text-xs text-theme-muted">Members</p>
                <p className="text-lg font-bold">1</p>
              </div>
              <div>
                <Heart className="w-5 h-5 mx-auto mb-1 text-theme-muted"/>
                <p className="text-xs text-theme-muted">Supporters</p>
                <p className="text-lg font-bold">0</p>
              </div>
              <div>
                <Calendar className="w-5 h-5 mx-auto mb-1 text-theme-muted"/>
                <p className="text-xs text-theme-muted">Created</p>
                <p className="text-lg font-bold">Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

// Compact Card Preview
function PreviewCard(props: any) {
  const { name, tagline, description, category, tags, coverImage, visConfig, VisibilityIcon, themeColors } = props

  return (
    <div className="relative">
      {props.showControls && (
        <div className="flex items-center justify-between mb-3 p-2 bg-[var(--muted)]/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Eye className="w-3.5 h-3.5 text-theme-primary"/>
            <span className="text-xs font-bold">Card Preview</span>
          </div>
          <div className="flex items-center gap-1">
            {props.onToggleFullscreen && (
              <button onClick={props.onToggleFullscreen} className="p-1 hover:bg-[var(--muted)] rounded">
                {props.isFullscreen ? <Minimize2 className="w-3.5 h-3.5"/> : <Maximize2 className="w-3.5 h-3.5"/>}
              </button>
            )}
            {props.onClose && (
              <button onClick={props.onClose} className="p-1 hover:bg-red-500/10 rounded text-red-500">
                <X className="w-3.5 h-3.5"/>
              </button>
            )}
          </div>
        </div>
      )}

      <Card className="overflow-hidden border-2 border-[var(--border)] hover:border-[var(--primary)] transition-all cursor-pointer">
        {coverImage ? (
          <div className="relative h-32 bg-[var(--muted)]">
            <img src={coverImage} alt={name} className="w-full h-full object-cover"/>
          </div>
        ) : (
          <div
            className="h-32 bg-gradient-to-br"
            style={{
              background: themeColors
                ? `linear-gradient(135deg, ${themeColors.primary}20, ${themeColors.accent}20)`
                : undefined
            }}
          />
        )}

        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-base font-bold line-clamp-1">{name || 'Untitled'}</h3>
            <VisibilityIcon className="w-4 h-4 flex-shrink-0 ml-2"/>
          </div>

          {tagline && (
            <p className="text-xs italic text-theme-muted mb-2 line-clamp-1">"{tagline}"</p>
          )}

          <p className="text-xs text-theme-muted line-clamp-2 mb-3">
            {description || 'No description'}
          </p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 3).map((tag: string, idx: number) => (
                <span key={idx} className="px-1.5 py-0.5 bg-[var(--muted)] rounded text-[9px] font-semibold">
                  #{tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="px-1.5 py-0.5 text-[9px] text-theme-muted">+{tags.length - 3}</span>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Mobile Preview
function MobilePreview(props: any) {
  return (
    <div className="relative mx-auto max-w-sm">
      {/* Mobile Frame */}
      <div className="relative bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10"/>

        {/* Screen */}
        <div className="relative bg-[var(--background)] rounded-[2rem] overflow-hidden h-[600px] overflow-y-auto">
          <div className="p-4 space-y-4">
            {/* Status bar simulation */}
            <div className="flex items-center justify-between text-[10px] opacity-50">
              <span>9:41</span>
              <span>📶 🔋</span>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <h1 className="text-xl font-bold">{props.name || 'Untitled'}</h1>
              {props.tagline && <p className="text-xs italic">"{props.tagline}"</p>}
              <p className="text-sm">{props.description || 'No description'}</p>

              {props.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {props.tags.map((tag: string, idx: number) => (
                    <span key={idx} className="px-2 py-0.5 bg-[var(--muted)] rounded-full text-[9px]">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
