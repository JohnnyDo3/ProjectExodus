'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

interface MainLayoutWrapperProps {
  children: React.ReactNode
}

export function MainLayoutWrapper({ children }: MainLayoutWrapperProps) {
  const pathname = usePathname()

  // Don't show main site header/footer on admin pages
  const isAdminRoute = pathname?.startsWith('/admin')

  if (isAdminRoute) {
    // Admin pages have their own layout - just render children
    return <>{children}</>
  }

  // Regular pages get the header and footer
  return (
    <div className="relative z-10">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
