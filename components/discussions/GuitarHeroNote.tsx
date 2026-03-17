'use client'

import { MessageSquare, FileText, Briefcase, Calendar, Users, MessageCircle, Heart, ThumbsUp, ThumbsDown, Hash } from 'lucide-react'
import type { ActivityItem } from './ActivityCard'

// Full community lane config - original lanes + extended lanes for column content
export const LANE_CONFIG: Record<string, { lane: number; color: string; glow: string; bg: string }> = {
  posts:       { lane: 0, color: '#FF6B6B', glow: '0 0 20px #FF6B6B80, 0 0 40px #FF6B6B40', bg: 'rgba(255,107,107,0.08)' },
  articles:    { lane: 1, color: '#4ECDC4', glow: '0 0 20px #4ECDC480, 0 0 40px #4ECDC440', bg: 'rgba(78,205,196,0.08)' },
  projects:    { lane: 2, color: '#45B7D1', glow: '0 0 20px #45B7D180, 0 0 40px #45B7D140', bg: 'rgba(69,183,209,0.08)' },
  events:      { lane: 3, color: '#A78BFA', glow: '0 0 20px #A78BFA80, 0 0 40px #A78BFA40', bg: 'rgba(167,139,250,0.08)' },
  members:     { lane: 4, color: '#F472B6', glow: '0 0 20px #F472B680, 0 0 40px #F472B640', bg: 'rgba(244,114,182,0.08)' },
  discussions: { lane: 5, color: '#FBBF24', glow: '0 0 20px #FBBF2480, 0 0 40px #FBBF2440', bg: 'rgba(251,191,36,0.08)' },
  stats:       { lane: 6, color: '#34D399', glow: '0 0 20px #34D39980, 0 0 40px #34D39940', bg: 'rgba(52,211,153,0.08)' },
  network:     { lane: 7, color: '#818CF8', glow: '0 0 20px #818CF880, 0 0 40px #818CF840', bg: 'rgba(129,140,248,0.08)' },
}

// Map item types to lanes
export function getLaneCategory(item: ActivityItem): string {
  const type = item.type || item.category
  if (type === 'post') return 'posts'
  if (type === 'article') return 'articles'
  if (type === 'project') return 'projects'
  if (type === 'event') return 'events'
  if (type === 'new_member' || type === 'follow') return 'members'
  if (type === 'forum_post' || type === 'comment') return 'discussions'
  if (type === 'like' || type === 'dislike') return 'posts'
  // Fallback by category
  if (item.category === 'articles') return 'articles'
  if (item.category === 'projects') return 'projects'
  if (item.category === 'events') return 'events'
  if (item.category === 'members') return 'members'
  if (item.category === 'discussions' || item.category === 'forums') return 'discussions'
  return 'posts'
}

const TYPE_ICON: Record<string, typeof MessageSquare> = {
  post: MessageSquare,
  article: FileText,
  project: Briefcase,
  event: Calendar,
  new_member: Users,
  follow: Users,
  comment: MessageCircle,
  forum_post: Hash,
  like: ThumbsUp,
  dislike: ThumbsDown,
}

interface GuitarHeroNoteProps {
  item: ActivityItem
  laneCategory: string
  animationDuration: number
  onSplash: () => void
  onSelect?: (item: ActivityItem, laneCategory: string) => void
  dataKey?: number
}

export function GuitarHeroNote({ item, laneCategory, animationDuration, onSplash, onSelect, dataKey }: GuitarHeroNoteProps) {
  const config = LANE_CONFIG[laneCategory] || LANE_CONFIG.posts
  const Icon = TYPE_ICON[item.type] || MessageSquare

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onSelect) {
      onSelect(item, laneCategory)
    }
  }

  return (
    <div
      className="gh-note absolute left-0 right-0 mx-2"
      data-note-key={dataKey}
      style={{
        animation: `gh-note-fall ${animationDuration}s linear forwards`,
        '--note-color': config.color,
        '--note-glow': config.glow,
      } as React.CSSProperties}
      onAnimationEnd={onSplash}
    >
      <div
        onClick={handleClick}
        className="relative rounded-xl border px-3 py-2.5 backdrop-blur-sm transition-all hover:scale-105 cursor-pointer hover:brightness-125 active:scale-95"
        style={{
          borderColor: `${config.color}60`,
          background: config.bg,
          boxShadow: config.glow,
        }}
      >
        {/* Type badge */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <Icon className="w-3 h-3 flex-shrink-0" style={{ color: config.color }} />
          <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: config.color }}>
            {item.type?.replace('_', ' ') || laneCategory}
          </span>
          {item.engagement > 0 && (
            <span className="ml-auto text-[8px] font-bold text-white/40">
              {item.engagement}
            </span>
          )}
        </div>

        {/* Title */}
        <p className="text-xs font-bold text-white/90 leading-tight line-clamp-2 mb-1">
          {item.title}
        </p>

        {/* Preview text */}
        {item.preview && (
          <p className="text-[10px] text-white/40 leading-tight line-clamp-1 mb-1.5">
            {item.preview}
          </p>
        )}

        {/* Author + time */}
        <div className="flex items-center gap-1.5">
          {item.userImage ? (
            <img
              src={item.userImage}
              alt=""
              className="w-4 h-4 rounded-full border"
              style={{ borderColor: `${config.color}40` }}
            />
          ) : (
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-bold text-white/80"
              style={{ background: `${config.color}30` }}
            >
              {(item.userName || '?')[0]?.toUpperCase()}
            </div>
          )}
          <span className="text-[10px] text-white/50 truncate">{item.userName}</span>
        </div>
      </div>
    </div>
  )
}
