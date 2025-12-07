'use client'

import { useState } from 'react'
import { Plus, Briefcase, FileText, MessageCircle, Users, Settings, X, Zap } from 'lucide-react'
import Link from 'next/link'
import { useIsMobile } from '@/hooks/useIsMobile'

interface QuickActionsBarProps {
  onCustomize?: () => void
  isCustomizing?: boolean
  className?: string
}

// Actions with solid dark backgrounds for guaranteed readability
const actions = [
  {
    id: 'project',
    label: 'New Project',
    icon: Briefcase,
    href: '/community/projects/new',
    bgColor: 'var(--foreground)',
  },
  {
    id: 'article',
    label: 'Write Article',
    icon: FileText,
    href: '/articles/write',
    bgColor: 'var(--foreground)',
  },
  {
    id: 'discussion',
    label: 'Start Discussion',
    icon: MessageCircle,
    href: '/community/forum/new',
    bgColor: 'var(--foreground)',
  },
  {
    id: 'network',
    label: 'Browse Network',
    icon: Users,
    href: '/network/browse',
    bgColor: 'var(--foreground)',
  },
]

export function QuickActionsBar({
  onCustomize,
  isCustomizing = false,
  className = '',
}: QuickActionsBarProps) {
  const isMobile = useIsMobile()
  const [isExpanded, setIsExpanded] = useState(false)

  // Mobile: Floating Action Button (FAB)
  if (isMobile) {
    return (
      <>
        {/* Overlay */}
        {isExpanded && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsExpanded(false)}
          />
        )}

        {/* Expanded actions */}
        {isExpanded && (
          <div className="fixed bottom-24 right-4 z-50 flex flex-col-reverse gap-3">
            {actions.map((action, index) => {
              const Icon = action.icon
              return (
                <Link
                  key={action.id}
                  href={action.href}
                  className="flex items-center gap-3 pl-4 pr-5 py-3 rounded-full shadow-lg animate-fadeInUp"
                  style={{
                    backgroundColor: action.bgColor,
                    color: 'var(--background)',
                    animationDelay: `${index * 50}ms`,
                  }}
                  onClick={() => setIsExpanded(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-bold text-sm whitespace-nowrap">{action.label}</span>
                </Link>
              )
            })}

            {/* Customize button */}
            {onCustomize && (
              <button
                onClick={() => {
                  setIsExpanded(false)
                  onCustomize()
                }}
                className={`
                  flex items-center gap-3 pl-4 pr-5 py-3 rounded-full
                  ${isCustomizing ? 'bg-white text-[var(--primary)]' : 'bg-[var(--muted)] text-[var(--foreground)]'}
                  shadow-lg animate-fadeInUp
                `}
                style={{
                  animationDelay: `${actions.length * 50}ms`,
                }}
              >
                <Settings className="w-5 h-5" />
                <span className="font-bold text-sm whitespace-nowrap">
                  {isCustomizing ? 'Done' : 'Customize'}
                </span>
              </button>
            )}
          </div>
        )}

        {/* FAB */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`
            fixed bottom-6 right-4 z-50 w-14 h-14 rounded-full
            shadow-lg flex items-center justify-center
            transition-transform active:scale-95
            ${isExpanded ? 'rotate-45' : ''}
          `}
          style={{
            backgroundColor: 'var(--foreground)',
            color: 'var(--background)',
          }}
        >
          {isExpanded ? (
            <X className="w-6 h-6" />
          ) : (
            <Plus className="w-6 h-6" />
          )}
        </button>

        <style jsx global>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.2s ease-out forwards;
          }
        `}</style>
      </>
    )
  }

  // Desktop: Horizontal action bar
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Quick actions */}
      <div className="flex items-center gap-2 p-2 bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-lg">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.id}
              href={action.href}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
              style={{
                backgroundColor: action.bgColor,
                color: 'var(--background)',
              }}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden lg:inline">{action.label}</span>
            </Link>
          )
        })}

        {/* Divider */}
        <div className="w-px h-8 bg-[var(--border)]" />

        {/* Customize button */}
        {onCustomize && (
          <button
            onClick={onCustomize}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all font-bold text-sm"
            style={{
              backgroundColor: isCustomizing ? 'var(--foreground)' : 'var(--muted)',
              color: isCustomizing ? 'var(--background)' : 'var(--foreground)',
            }}
          >
            <Settings className={`w-4 h-4 ${isCustomizing ? 'animate-spin-slow' : ''}`} />
            <span className="hidden lg:inline">
              {isCustomizing ? 'Done' : 'Customize'}
            </span>
          </button>
        )}
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  )
}
