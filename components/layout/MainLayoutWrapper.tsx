'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

// Lazy load decorative/non-critical components (client-only, no SSR)
const LazySkyBackground = dynamic(
  () => import('@/components/theme/SkyBackground').then(mod => ({ default: mod.SkyBackground })),
  { ssr: false }
)
const LazyProjectExodusAI = dynamic(
  () => import('@/components/ai/ProjectExodusAI').then(mod => ({ default: mod.ProjectExodusAI })),
  { ssr: false }
)
const LazyDecorativeBranches = dynamic(
  () => import('@/components/decorative/DecorativeBranches').then(mod => ({ default: mod.DecorativeBranches })),
  { ssr: false }
)

interface MainLayoutWrapperProps {
  children: React.ReactNode
  skyBackground?: React.ReactNode
  decorativeBranches?: React.ReactNode
  aiAssistant?: React.ReactNode
}

export function MainLayoutWrapper({
  children,
  skyBackground,
  decorativeBranches,
  aiAssistant
}: MainLayoutWrapperProps) {
  // Use lazy-loaded versions if props not provided
  const sky = skyBackground ?? <LazySkyBackground />
  const branches = decorativeBranches ?? <LazyDecorativeBranches />
  const ai = aiAssistant ?? <LazyProjectExodusAI />
  const pathname = usePathname()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  // Don't show main site header/footer/decorations on admin pages
  const isAdminRoute = pathname?.startsWith('/admin')

  // Full-screen pages that should not have footer and should not scroll
  const isFullScreenPage = pathname === '/messages' || pathname === '/notifications' || pathname === '/fishbowl/personal'

  // Pages that should not have footer but need scrolling (fishbowl + content below)
  const isScrollableFullPage = pathname === '/network'

  // Learning module pages - no footer, full viewport height, no scroll
  const isLearningPage = pathname?.startsWith('/learn/modules/')

  // Architecture game pages - no footer, full viewport height, no scroll
  const isArchitectureGame = pathname?.startsWith('/architecture/play')

  // Project creation wizard - no footer, full viewport height, no scroll
  const isProjectWizard = pathname === '/community/projects/new'

  if (isAdminRoute) {
    // Admin pages - completely clean, no theming decorations
    return <>{children}</>
  }

  // Architecture game pages get minimal UI - no footer, no scroll
  if (isArchitectureGame) {
    return (
      <>
        {sky}
        <div className="relative z-10 h-screen flex flex-col" style={{ height: '100dvh' }}>
          <Header />
          <div className="flex-1 overflow-hidden min-h-0">
            {children}
          </div>
        </div>
        {ai}
      </>
    )
  }

  // Learning pages get minimal UI - no footer, no scroll
  if (isLearningPage) {
    return (
      <>
        {sky}
        <div className="relative z-10 h-screen flex flex-col" style={{ height: '100dvh' }}>
          <Header />
          <div className="flex-1 overflow-hidden min-h-0">
            {children}
          </div>
        </div>
        {ai}
      </>
    )
  }

  // Project wizard - no footer, scrollable content
  if (isProjectWizard) {
    return (
      <>
        {sky}
        <div className="relative z-10 h-screen flex flex-col overflow-hidden" style={{ height: '100dvh' }}>
          <Header />
          <div className="flex-1 overflow-y-auto min-h-0">
            {children}
          </div>
        </div>
        {ai}
      </>
    )
  }

  // Scrollable full-screen pages (network) - no footer, but content scrolls
  if (isScrollableFullPage) {
    return (
      <>
        {sky}
        <div className="relative z-10">
          <Header />
          {children}
        </div>
        {ai}
      </>
    )
  }

  // Full-screen pages (messages, notifications, fishbowl) - no footer, viewport height with internal scroll only
  if (isFullScreenPage) {
    return (
      <>
        {sky}
        <div className="relative z-10 h-screen flex flex-col" style={{ height: '100dvh' }}>
          <Header />
          <div className="flex-1 overflow-hidden min-h-0">
            {children}
          </div>
        </div>
        {ai}
      </>
    )
  }

  // Regular pages get all the bells and whistles
  return (
    <>
      {sky}
      {branches}
      <div className="relative z-10">
        <Header />
        {children}
        <Footer />
      </div>
      {ai}
    </>
  )
}
