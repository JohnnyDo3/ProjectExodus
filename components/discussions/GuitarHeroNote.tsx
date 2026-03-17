'use client'

import { MessageSquare, FileText, Briefcase, Calendar, UserPlus, Repeat } from 'lucide-react'
import type { ActivityItem } from './ActivityCard'

// Lane config: category → lane index + colors
export const LANE_CONFIG: Record<string, { lane: number; color: string; glow: string; bg: string }> = {
  posts:    { lane: 0, color: '#FF6B6B', glow: '0 0 20px #FF6B6B80, 0 0 40px #FF6B6B40', bg: 'rgba(255,107,107,0.08)' },
  articles: { lane: 1, color: '#4ECDC4', glow: '0 0 20px #4ECDC480, 0 0 40px #4ECDC440', bg: 'rgba(78,205,196,0.08)' },
  projects: { lane: 2, color: '#45B7D1', glow: '0 0 20px #45B7D180, 0 0 40px #45B7D140', bg: 'rgba(69,183,209,0.08)' },
  events:   { lane: 3, color: '#A78BFA', glow: '0 0 20px #A78BFA80, 0 0 40px #A78BFA40', bg: 'rgba(167,139,250,0.08)' },
  members:  { lane: 4, color: '#F472B6', glow: '0 0 20px #F472B680, 0 0 40px #F472B640', bg: 'rgba(244,114,182,0.08)' },
}

// Map item types/categories to lane categories
export function getLaneCategory(item: ActivityItem): string {
  const type = item.type || item.category
  if (type === 'post' || type === 'comment' || type === 'forum_post') return 'posts'
  if (type === 'article') return 'articles'
  if (type === 'project') return 'projects'
  if (type === 'event') return 'events'
  if (type === 'new_member' || type === 'follow') return 'members'
  // Fallback based on category field
  if (item.category === 'posts' || item.category === 'forums') return 'posts'
  if (item.category === 'articles') return 'articles'
  if (item.category === 'projects') return 'projects'
  if (item.category === 'events') return 'events'
  if (item.category === 'members') return 'members'
  return 'posts'
}

const TYPE_ICON: Record<string, typeof MessageSquare> = {
  post: MessageSquare,
  article: FileText,
  project: Briefcase,
  forum_post: MessageSquare,
  comment: MessageSquare,
  new_member: UserPlus,
  follow: Repeat,
  event: Calendar,
}

interface GuitarHeroNoteProps {
  item: ActivityItem
  laneCategory: string
  animationDuration: number // seconds for the fall
  onSplash: () => void
}

export function GuitarHeroNote({ item, laneCategory, animationDuration, onSplash }: GuitarHeroNoteProps) {
  const config = LANE_CONFIG[laneCategory] || LANE_CONFIG.posts
  const Icon = TYPE_ICON[item.type] || MessageSquare

  return (
    <div
      className="gh-note absolute left-0 right-0 mx-2"
      style={{
        animation: `gh-note-fall ${animationDuration}s linear forwards`,
        '--note-color': config.color,
        '--note-glow': config.glow,
      } as React.CSSProperties}
      onAnimationEnd={onSplash}
    >
      <div
        className="relative rounded-xl border px-3 py-2.5 backdrop-blur-sm transition-transform hover:scale-105"
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
