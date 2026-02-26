'use client'

import Link from 'next/link'
import { User, MessageSquare, FileText, Briefcase, Heart, Calendar, UserPlus, Repeat } from 'lucide-react'

export interface ActivityItem {
  id: string
  type: string
  category: string
  title: string
  preview: string
  userName: string
  userImage: string | null
  userId: string
  targetUrl: string
  imageUrl: string | null
  engagement: number
  createdAt: string
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

const TYPE_LABEL: Record<string, string> = {
  post: 'Post',
  article: 'Article',
  project: 'Project',
  forum_post: 'Forum',
  comment: 'Comment',
  new_member: 'New Member',
  follow: 'Connection',
  event: 'Event',
}

const BENTO_CLASSES = ['bento-card-a', 'bento-card-b', 'bento-card-c', 'bento-card-d']

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`
  return `${Math.floor(seconds / 86400)}d`
}

interface ActivityCardProps {
  item: ActivityItem
  index: number
  featured?: boolean
}

export function ActivityCard({ item, index, featured = false }: ActivityCardProps) {
  const Icon = TYPE_ICON[item.type] || MessageSquare
  const bentoClass = BENTO_CLASSES[index % 4]
  const delay = index * 0.07

  return (
    <Link href={item.targetUrl}>
      <article
        className={`${bentoClass} card-breathe group relative overflow-hidden bg-[var(--background)] border border-[var(--border)] hover:border-[var(--primary)] transition-colors duration-300 stagger-in ${
          featured ? 'p-5 sm:p-6' : 'p-4'
        }`}
        style={{ animationDelay: `${delay}s` }}
      >
        {/* Daily Prophet image frame */}
        {item.imageUrl && (
          <div className={`prophet-frame mb-3 ${featured ? 'aspect-[16/9]' : 'aspect-[3/2]'}`}>
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Type badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
            <Icon className="w-3 h-3" />
            {TYPE_LABEL[item.type] || item.type}
          </span>
          <span className="text-[9px] text-[var(--muted-foreground)]">
            {timeAgo(item.createdAt)}
          </span>
        </div>

        {/* Title */}
        <h3 className={`font-headline font-bold leading-snug text-[var(--foreground)] group-hover:underline decoration-1 underline-offset-2 ${
          featured ? 'text-xl sm:text-2xl mb-2' : 'text-sm mb-1'
        }`}>
          {item.title}
        </h3>

        {/* Preview text */}
        {item.preview && (
          <p className={`font-body-serif text-[var(--muted-foreground)] leading-relaxed ${
            featured ? 'text-sm line-clamp-3 newspaper-justify' : 'text-xs line-clamp-2'
          }`}>
            {item.preview}
          </p>
        )}

        {/* Footer: user + engagement */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-[var(--border)]">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-[var(--muted)] flex items-center justify-center overflow-hidden">
              {item.userImage ? (
                <img src={item.userImage} alt={item.userName} className="w-full h-full object-cover" />
              ) : (
                <User className="w-3 h-3 text-[var(--muted-foreground)]" />
              )}
            </div>
            <span className="text-[10px] font-bold text-[var(--muted-foreground)]">
              {item.userName}
            </span>
          </div>
          {item.engagement > 0 && (
            <span className="flex items-center gap-1 text-[10px] text-[var(--muted-foreground)]">
              <Heart className="w-3 h-3" />
              {item.engagement}
            </span>
          )}
        </div>

        {/* New item ripple effect (shown via parent adding .is-new class) */}
        <div className="absolute inset-0 pointer-events-none rounded-inherit">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[var(--primary)] opacity-0 group-[.is-new]:activity-ripple" />
        </div>
      </article>
    </Link>
  )
}
