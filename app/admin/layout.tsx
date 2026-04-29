'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useHasMounted } from '@/lib/hooks/useHasMounted'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { AdminPusherProvider } from '@/components/admin/AdminPusherProvider'
import { Loader2 } from 'lucide-react'

interface AdminStats {
  pendingProducts: number
  openReports: number
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const hasMounted = useHasMounted()
  const router = useRouter()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [stats, setStats] = useState<AdminStats>({ pendingProducts: 0, openReports: 0 })

  // Fetch sidebar stats (pending items counts)
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/stats/sidebar')
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to fetch admin stats:', error)
    }
  }, [])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchStats()
      // Refresh stats every minute
      const interval = setInterval(fetchStats, 60000)
      return () => clearInterval(interval)
    }
  }, [status, fetchStats])

  // Load sidebar collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('adminSidebarCollapsed')
    if (saved) {
      setSidebarCollapsed(saved === 'true')
    }
  }, [])

  // Save sidebar collapsed state to localStorage
  const handleSidebarToggle = () => {
    const newState = !sidebarCollapsed
    setSidebarCollapsed(newState)
    localStorage.setItem('adminSidebarCollapsed', String(newState))
  }

  // Show loading state while checking auth — only post-mount, to avoid
  // a SSR/CSR hydration mismatch (React #418).
  if (hasMounted && status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-emerald-600 mx-auto mb-4 animate-spin" />
          <p className="text-slate-600 font-medium">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  // Redirect if not authenticated or not admin
  if (status === 'unauthenticated') {
    router.push('/auth/signin')
    return null
  }

  return (
    <AdminPusherProvider>
      <div className="min-h-screen bg-slate-100">
        {/* Sidebar */}
        <AdminSidebar
          pendingProducts={stats.pendingProducts}
          openReports={stats.openReports}
          collapsed={sidebarCollapsed}
          onToggle={handleSidebarToggle}
        />

        {/* Header */}
        <AdminHeader sidebarCollapsed={sidebarCollapsed} />

        {/* Main Content */}
        <main
          className={`
            pt-16 min-h-screen
            transition-all duration-300
            ${sidebarCollapsed ? 'pl-16' : 'pl-64'}
          `}
        >
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </AdminPusherProvider>
  )
}
