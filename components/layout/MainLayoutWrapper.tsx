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

  if (isAdminRoute) {
    // Admin pages - completely clean, no theming decorations
    return <>{children}</>
  }

  // Learning pages get minimal UI - no footer, no scroll
  if (isLearningPage) {
    return (
      <>
        {skyBackground}
        <div className="relative z-10 h-screen overflow-hidden flex flex-col">
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
        {!isFullScreenPage && <Footer />}
      </div>
      {aiAssistant}
    </>
  )
}
