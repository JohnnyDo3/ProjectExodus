'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Bell, User, LogOut, Settings, ChevronDown, Home } from 'lucide-react'
import { AdminAlertBell } from './AdminAlertBell'

interface AdminHeaderProps {
  sidebarCollapsed: boolean
}

export function AdminHeader({ sidebarCollapsed }: AdminHeaderProps) {
  const { data: session } = useSession()
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <header
      className={`
        fixed top-0 right-0 h-16 bg-[var(--card)] border-b-2 border-[var(--border)]
        flex items-center justify-between px-6 z-[40]
        transition-all duration-300
        ${sidebarCollapsed ? 'left-16' : 'left-64'}
      `}
    >
      {/* Page Title / Breadcrumb Area */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-[var(--foreground)]">
          Admin Dashboard
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Back to Site */}
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-theme-muted hover:bg-[var(--muted)] transition-colors"
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">View Site</span>
        </Link>

        {/* Admin Alerts */}
        <AdminAlertBell />

        {/* User Menu */}
        {session && (
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-theme-primary flex items-center justify-center">
                <User className="w-4 h-4 text-[var(--primary-foreground)]" />
              </div>
              <span className="hidden sm:block text-sm font-medium text-[var(--foreground)] max-w-[120px] truncate">
                {session.user?.name || session.user?.email}
              </span>
              <ChevronDown className="w-4 h-4 text-theme-muted" />
            </button>

            {userMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-[100]"
                  onClick={() => setUserMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-[var(--card)] rounded-xl shadow-lg border-2 border-[var(--border)] overflow-hidden z-[101]">
                  <div className="p-4 border-b-2 border-[var(--border)]">
                    <p className="font-bold text-[var(--foreground)]">
                      {session.user?.name}
                    </p>
                    <p className="text-sm text-theme-muted truncate">
                      {session.user?.email}
                    </p>
                  </div>
                  <div className="p-2">
                    <Link
                      href="/admin/settings"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4 text-theme-muted" />
                      <span className="text-sm font-medium text-[var(--foreground)]">Settings</span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--muted)] transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4 text-theme-secondary" />
                      <span className="text-sm font-medium text-theme-secondary">Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
