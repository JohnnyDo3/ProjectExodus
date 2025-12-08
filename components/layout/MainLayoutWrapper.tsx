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

  if (isAdminRoute) {
    // Admin pages - completely clean, no theming decorations
    return <>{children}</>
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
