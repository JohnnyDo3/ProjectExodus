'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

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
  const pathname = usePathname()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  // Don't show main site header/footer/decorations on admin pages
  const isAdminRoute = pathname?.startsWith('/admin')

  // Full-screen pages that should not have footer and should not scroll
  const isFullScreenPage = pathname === '/messages' || pathname === '/notifications'

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
        {skyBackground}
        <div className="relative z-10 h-screen flex flex-col">
          <Header />
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </div>
        {aiAssistant}
      </>
    )
  }

  // Learning pages get minimal UI - no footer, no scroll
  if (isLearningPage) {
    return (
      <>
        {skyBackground}
        <div className="relative z-10 h-screen flex flex-col">
          <Header />
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </div>
        {aiAssistant}
      </>
    )
  }

  // Project wizard - no footer, scrollable content
  if (isProjectWizard) {
    return (
      <>
        {skyBackground}
        <div className="relative z-10 h-screen flex flex-col overflow-hidden">
          <Header />
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
        {aiAssistant}
      </>
    )
  }

  // Full-screen pages (messages, notifications) - no footer, viewport height with internal scroll only
  if (isFullScreenPage) {
    return (
      <>
        {skyBackground}
        <div className="relative z-10 h-screen flex flex-col">
          <Header />
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </div>
        {aiAssistant}
      </>
    )
  }

  // Regular pages get all the bells and whistles
  return (
    <>
      {skyBackground}
      {decorativeBranches}
      <div className="relative z-10">
        <Header />
        {children}
        <Footer />
      </div>
      {aiAssistant}
    </>
  )
}
