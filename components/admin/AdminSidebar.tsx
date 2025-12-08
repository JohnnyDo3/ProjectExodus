'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Shield,
  Users,
  Package,
  FileText,
  FolderTree,
  Tag,
  Store,
  Flag,
  ScrollText,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
  Leaf,
} from 'lucide-react'

interface SidebarItem {
  name: string
  href?: string
  icon: React.ElementType
  children?: { name: string; href: string }[]
  badge?: number
}

interface AdminSidebarProps {
  pendingProducts?: number
  openReports?: number
  collapsed: boolean
  onToggle: () => void
}

export function AdminSidebar({
  pendingProducts = 0,
  openReports = 0,
  collapsed,
  onToggle
}: AdminSidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(['Content'])

  const sidebarItems: SidebarItem[] = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Moderation', href: '/admin/moderation', icon: Shield, badge: pendingProducts + openReports },
    { name: 'Users', href: '/admin/users', icon: Users },
    {
      name: 'Content',
      icon: Package,
      children: [
        { name: 'Products', href: '/admin/products' },
        { name: 'Articles', href: '/admin/articles/new' },
        { name: 'Categories', href: '/admin/categories' },
        { name: 'Tags', href: '/admin/tags' },
        { name: 'Vendors', href: '/admin/vendors' },
      ],
    },
    { name: 'Reports', href: '/admin/reports', icon: Flag, badge: openReports },
    { name: 'Audit Log', href: '/admin/audit', icon: ScrollText },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  const toggleExpanded = (name: string) => {
    setExpandedItems(prev =>
      prev.includes(name)
        ? prev.filter(item => item !== name)
        : [...prev, name]
    )
  }

  const isActive = (href: string) => pathname === href
  const isParentActive = (children?: { href: string }[]) =>
    children?.some(child => pathname === child.href)

  return (
    <aside
      className={`
        fixed left-0 top-0 h-full bg-[var(--card)] border-r-2 border-[var(--border)]
        transition-all duration-300 z-[50] flex flex-col
        ${collapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b-2 border-[var(--border)]">
        {!collapsed && (
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-moss-600 to-ocean-600 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-lg text-[var(--foreground)]">ADMIN</span>
          </Link>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <PanelLeft className="w-5 h-5 text-[var(--foreground)]" />
          ) : (
            <PanelLeftClose className="w-5 h-5 text-[var(--foreground)]" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const hasChildren = item.children && item.children.length > 0
            const isExpanded = expandedItems.includes(item.name)
            const active = item.href ? isActive(item.href) : isParentActive(item.children)

            if (hasChildren) {
              return (
                <li key={item.name}>
                  <button
                    onClick={() => toggleExpanded(item.name)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium
                      transition-colors
                      ${active
                        ? 'bg-theme-primary/10 text-theme-primary'
                        : 'text-[var(--foreground)] hover:bg-[var(--muted)]'
                      }
                      ${collapsed ? 'justify-center' : ''}
                    `}
                    title={collapsed ? item.name : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.name}</span>
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </>
                    )}
                  </button>
                  {!collapsed && isExpanded && item.children && (
                    <ul className="mt-1 ml-4 pl-4 border-l-2 border-[var(--border)] space-y-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`
                              block px-3 py-2 rounded-lg font-medium text-sm
                              transition-colors
                              ${isActive(child.href)
                                ? 'bg-theme-primary text-white'
                                : 'text-[var(--foreground)] hover:bg-[var(--muted)]'
                              }
                            `}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            }

            return (
              <li key={item.name}>
                <Link
                  href={item.href!}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium
                    transition-colors relative
                    ${active
                      ? 'bg-theme-primary text-white'
                      : 'text-[var(--foreground)] hover:bg-[var(--muted)]'
                    }
                    ${collapsed ? 'justify-center' : ''}
                  `}
                  title={collapsed ? item.name : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.name}</span>
                      {item.badge && item.badge > 0 && (
                        <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-red-500 text-white">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  {collapsed && item.badge && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 text-xs font-bold rounded-full bg-red-500 text-white flex items-center justify-center">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t-2 border-[var(--border)]">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-theme-muted hover:text-theme-primary transition-colors"
          >
            <Leaf className="w-4 h-4" />
            <span>Back to Site</span>
          </Link>
        </div>
      )}
    </aside>
  )
}
