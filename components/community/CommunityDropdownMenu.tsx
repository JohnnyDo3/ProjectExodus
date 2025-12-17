'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown, MessageSquare, Rocket, Users, BookOpen, Lock,
  Sparkles, MessagesSquare
} from 'lucide-react'
import Link from 'next/link'

interface CommunityDropdownMenuProps {
  isAuthenticated: boolean
}

const menuItems = [
  {
    label: 'Feed',
    href: '/community/feed',
    icon: MessageSquare,
    description: 'Social posts and updates'
  },
  {
    label: 'Forum',
    href: '/community/forum',
    icon: MessagesSquare,
    description: 'Community discussions'
  },
  {
    label: 'Projects',
    href: '/community/projects',
    icon: Rocket,
    description: 'Collaborate on initiatives'
  },
  {
    label: 'Network',
    href: '/community/users',
    icon: Users,
    description: 'Connect with changemakers'
  },
  {
    label: 'Courses',
    href: '/learn',
    icon: BookOpen,
    description: 'Learn and grow'
  },
]

export function CommunityDropdownMenu({ isAuthenticated }: CommunityDropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)]/50 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Sparkles className="w-4 h-4 text-[var(--primary)]" />
        <span className="font-medium text-[var(--foreground)]">Community</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-[var(--muted-foreground)]" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full left-0 mt-2 w-64 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl overflow-hidden z-50"
          >
            <div className="p-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon

                if (isAuthenticated) {
                  // Unlocked state - fully functional
                  return (
                    <Link key={item.label} href={item.href} onClick={() => setIsOpen(false)}>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--muted)] transition-colors cursor-pointer group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center group-hover:bg-[var(--primary)]/20 transition-colors">
                          <Icon className="w-4 h-4 text-[var(--primary)]" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-[var(--foreground)] text-sm">
                            {item.label}
                          </div>
                          <div className="text-xs text-[var(--muted-foreground)]">
                            {item.description}
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  )
                } else {
                  // Locked state - ghost appearance
                  return (
                    <Link key={item.label} href="/auth/signin" onClick={() => setIsOpen(false)}>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--muted)]/50 transition-colors cursor-pointer group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-[var(--muted)] flex items-center justify-center relative">
                          <Icon className="w-4 h-4 text-[var(--muted-foreground)]/50" />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center">
                            <Lock className="w-2.5 h-2.5 text-[var(--muted-foreground)]" />
                          </div>
                        </div>
                        <div className="flex-1 opacity-50">
                          <div className="font-medium text-[var(--muted-foreground)] text-sm">
                            {item.label}
                          </div>
                          <div className="text-xs text-[var(--muted-foreground)]/70">
                            Sign in to access
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  )
                }
              })}
            </div>

            {!isAuthenticated && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="border-t border-[var(--border)] p-3 bg-[var(--muted)]/30"
              >
                <p className="text-xs text-center text-[var(--muted-foreground)]">
                  Join free to unlock all features
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
