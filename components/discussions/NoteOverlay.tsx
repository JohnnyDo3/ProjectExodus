'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { X, ExternalLink, MessageSquare, FileText, Briefcase, Calendar, Users, MessageCircle, ThumbsUp, ThumbsDown, Hash, Clock } from 'lucide-react'
import type { ActivityItem } from './ActivityCard'
import { LANE_CONFIG } from './GuitarHeroNote'

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

interface NoteOverlayProps {
  item: ActivityItem | null
  laneCategory: string
  onClose: () => void
}

export function NoteOverlay({ item, laneCategory, onClose }: NoteOverlayProps) {
  const router = useRouter()
  const config = LANE_CONFIG[laneCategory] || LANE_CONFIG.posts

  useEffect(() => {
    if (!item) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [item, onClose])

  if (!item) return null

  const Icon = TYPE_ICON[item.type] || MessageSquare

  const handleOpen = () => {
    if (item.targetUrl) {
      router.push(item.targetUrl)
    }
    onClose()
  }

  const timeAgo = (() => {
    const diff = Date.now() - new Date(item.createdAt).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'just now'
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  })()

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop - darkened with lane color tint */}
      <div
        className="absolute inset-0 backdrop-blur-md"
        style={{ background: `${config.color}08` }}
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* Card */}
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden border-2 animate-in zoom-in-95 fade-in duration-200"
        style={{
          borderColor: `${config.color}60`,
          background: 'rgba(0,0,0,0.9)',
          boxShadow: `0 0 60px ${config.color}20, 0 25px 50px rgba(0,0,0,0.5)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div
          className="h-1"
          style={{ background: `linear-gradient(90deg, transparent, ${config.color}, transparent)` }}
        />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: `${config.color}20`, border: `1px solid ${config.color}40` }}
            >
              <Icon className="w-4 h-4" style={{ color: config.color }} />
            </div>
            <div>
              <span
                className="text-[10px] font-black uppercase tracking-[0.15em]"
                style={{ color: config.color }}
              >
                {item.type?.replace('_', ' ') || laneCategory}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Clock className="w-2.5 h-2.5 text-white/30" />
                <span className="text-[10px] text-white/30 font-medium">{timeAgo}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-white/40 hover:text-white/70" />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 pb-4 space-y-4">
          {/* Image preview if available */}
          {item.imageUrl && (
            <div className="rounded-xl overflow-hidden border border-white/10">
              <img
                src={item.imageUrl}
                alt=""
                className="w-full h-48 object-cover"
              />
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg font-bold text-white leading-snug">
            {item.title}
          </h3>

          {/* Preview text */}
          {item.preview && (
            <p className="text-sm text-white/60 leading-relaxed">
              {item.preview}
            </p>
          )}

          {/* Author row */}
          <div className="flex items-center gap-3 pt-2 border-t border-white/10">
            {item.userImage ? (
              <img
                src={item.userImage}
                alt=""
                className="w-9 h-9 rounded-full object-cover border-2"
                style={{ borderColor: `${config.color}40` }}
              />
            ) : (
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white/80"
                style={{ background: `${config.color}30` }}
              >
                {(item.userName || '?')[0]?.toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white/90 truncate">{item.userName}</p>
              {item.engagement > 0 && (
                <p className="text-[10px] text-white/40">
                  {item.engagement} engagement
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 px-5 py-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white/60 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            Close
          </button>
          {item.targetUrl && (
            <button
              onClick={handleOpen}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-colors hover:brightness-110"
              style={{
                background: `linear-gradient(135deg, ${config.color}CC, ${config.color}90)`,
                boxShadow: `0 4px 20px ${config.color}40`,
              }}
            >
              <ExternalLink className="w-4 h-4" />
              Open
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
