'use client'

import Link from 'next/link'
import {
  Link2,
  MessageCircle,
  BookOpen,
  Briefcase,
  Users,
  ShoppingBag,
  FileText,
  Settings,
} from 'lucide-react'
import { WidgetWrapper } from '../WidgetWrapper'

interface QuickLinksWidgetProps {
  onRemove?: () => void
}

const quickLinks = [
  { href: '/community/feed', label: 'Feed', icon: MessageCircle, color: 'from-blue-500 to-cyan-500' },
  { href: '/learn', label: 'Learn', icon: BookOpen, color: 'from-purple-500 to-pink-500' },
  { href: '/community/projects', label: 'Projects', icon: Briefcase, color: 'from-green-500 to-emerald-500' },
  { href: '/network', label: 'Network', icon: Users, color: 'from-orange-500 to-amber-500' },
  { href: '/marketplace', label: 'Shop', icon: ShoppingBag, color: 'from-red-500 to-rose-500' },
  { href: '/articles', label: 'Articles', icon: FileText, color: 'from-indigo-500 to-violet-500' },
]

export function QuickLinksWidget({ onRemove }: QuickLinksWidgetProps) {
  return (
    <WidgetWrapper
      id="quicklinks"
      title="Quick Links"
      icon={Link2}
      theme="secondary"
      onRemove={onRemove}
      showRemove={!!onRemove}
    >
      <div className="h-full p-3 overflow-y-auto">
        <div className="grid grid-cols-3 gap-2">
          {quickLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link key={link.href} href={link.href}>
                <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-[var(--muted)]/50 hover:bg-[var(--muted)] transition-colors cursor-pointer group">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[10px] font-medium text-[var(--foreground)]/70 group-hover:text-[var(--foreground)] transition-colors">
                    {link.label}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </WidgetWrapper>
  )
}
