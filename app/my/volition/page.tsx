'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import {
  User,
  Settings,
  Award,
  Leaf,
  Users,
  Briefcase,
  Target,
  Zap,
  BookOpen,
  MessageCircle,
  TrendingUp,
  Wind,
  Droplet,
  Flame,
  Lock,
  Unlock,
  RotateCcw,
  Palette,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import GridLayout from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import Widget from '@/components/dashboard/Widget'

// Widget type definition
type WidgetKey = 'profile' | 'projects' | 'learning' | 'impact' | 'network' | 'achievements' | 'actions' | 'stats'

interface WidgetConfig {
  i: string
  x: number
  y: number
  w: number
  h: number
  minW?: number
  minH?: number
  theme: 'primary' | 'accent' | 'secondary'
}

// Default layout configurations
const LAYOUT_PRESETS = {
  balanced: [
    { i: 'profile', x: 0, y: 0, w: 4, h: 3, minW: 3, minH: 3, theme: 'primary' as const },
    { i: 'projects', x: 4, y: 0, w: 6, h: 3, minW: 4, minH: 3, theme: 'primary' as const },
    { i: 'actions', x: 10, y: 0, w: 2, h: 3, minW: 2, minH: 3, theme: 'secondary' as const },
    { i: 'impact', x: 0, y: 3, w: 6, h: 4, minW: 4, minH: 3, theme: 'secondary' as const },
    { i: 'learning', x: 6, y: 3, w: 4, h: 4, minW: 3, minH: 3, theme: 'accent' as const },
    { i: 'network', x: 10, y: 3, w: 2, h: 4, minW: 2, minH: 3, theme: 'primary' as const },
    { i: 'stats', x: 0, y: 7, w: 6, h: 2, minW: 4, minH: 2, theme: 'primary' as const },
    { i: 'achievements', x: 6, y: 7, w: 6, h: 2, minW: 4, minH: 2, theme: 'accent' as const },
  ],
  focused: [
    { i: 'profile', x: 0, y: 0, w: 3, h: 3, minW: 3, minH: 3, theme: 'primary' as const },
    { i: 'projects', x: 3, y: 0, w: 9, h: 4, minW: 4, minH: 3, theme: 'primary' as const },
    { i: 'impact', x: 0, y: 3, w: 12, h: 3, minW: 4, minH: 3, theme: 'secondary' as const },
    { i: 'learning', x: 0, y: 6, w: 6, h: 3, minW: 3, minH: 3, theme: 'accent' as const },
    { i: 'network', x: 6, y: 6, w: 6, h: 3, minW: 3, minH: 3, theme: 'primary' as const },
    { i: 'stats', x: 0, y: 9, w: 12, h: 2, minW: 4, minH: 2, theme: 'primary' as const },
    { i: 'achievements', x: 0, y: 11, w: 8, h: 2, minW: 4, minH: 2, theme: 'accent' as const },
    { i: 'actions', x: 8, y: 11, w: 4, h: 2, minW: 2, minH: 2, theme: 'secondary' as const },
  ],
  compact: [
    { i: 'profile', x: 0, y: 0, w: 3, h: 2, minW: 3, minH: 2, theme: 'primary' as const },
    { i: 'stats', x: 3, y: 0, w: 6, h: 2, minW: 4, minH: 2, theme: 'primary' as const },
    { i: 'actions', x: 9, y: 0, w: 3, h: 2, minW: 2, minH: 2, theme: 'secondary' as const },
    { i: 'projects', x: 0, y: 2, w: 4, h: 3, minW: 3, minH: 2, theme: 'primary' as const },
    { i: 'learning', x: 4, y: 2, w: 4, h: 3, minW: 3, minH: 2, theme: 'accent' as const },
    { i: 'network', x: 8, y: 2, w: 4, h: 3, minW: 3, minH: 2, theme: 'primary' as const },
    { i: 'impact', x: 0, y: 5, w: 6, h: 3, minW: 4, minH: 2, theme: 'secondary' as const },
    { i: 'achievements', x: 6, y: 5, w: 6, h: 3, minW: 4, minH: 2, theme: 'accent' as const },
  ],
  detailed: [
    { i: 'profile', x: 0, y: 0, w: 4, h: 4, minW: 3, minH: 3, theme: 'primary' as const },
    { i: 'stats', x: 4, y: 0, w: 8, h: 2, minW: 4, minH: 2, theme: 'primary' as const },
    { i: 'projects', x: 4, y: 2, w: 8, h: 4, minW: 4, minH: 3, theme: 'primary' as const },
    { i: 'impact', x: 0, y: 4, w: 12, h: 4, minW: 4, minH: 3, theme: 'secondary' as const },
    { i: 'learning', x: 0, y: 8, w: 6, h: 4, minW: 3, minH: 3, theme: 'accent' as const },
    { i: 'network', x: 6, y: 8, w: 6, h: 4, minW: 3, minH: 3, theme: 'primary' as const },
    { i: 'achievements', x: 0, y: 12, w: 8, h: 3, minW: 4, minH: 2, theme: 'accent' as const },
    { i: 'actions', x: 8, y: 12, w: 4, h: 3, minW: 2, minH: 2, theme: 'secondary' as const },
  ],
}

export default function MyVolitionPage() {
  const { data: session, status } = useSession()
  const [projects, setProjects] = useState<any[]>([])
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Dashboard customization state
  const [layout, setLayout] = useState<WidgetConfig[]>(LAYOUT_PRESETS.balanced)
  const [currentPreset, setCurrentPreset] = useState<keyof typeof LAYOUT_PRESETS>('balanced')
  const [hiddenWidgets, setHiddenWidgets] = useState<Set<WidgetKey>>(new Set())
  const [collapsedWidgets, setCollapsedWidgets] = useState<Set<WidgetKey>>(new Set())
  const [isLayoutLocked, setIsLayoutLocked] = useState(false)
  const [customizationOpen, setCustomizationOpen] = useState(false)

  // Impact metrics
  const [impactMetrics] = useState({
    co2Saved: 127,
    wasteReduced: 89,
    energySaved: 234,
    waterSaved: 1450,
  })

  // Badge progress
  const [badges] = useState([
    { name: 'Eco Warrior', icon: '🌱', progress: 75 },
    { name: 'Knowledge Seeker', icon: '📚', progress: 60 },
    { name: 'Community Builder', icon: '🤝', progress: 40 },
    { name: 'Impact Maker', icon: '💚', progress: 85 },
  ])

  // Load saved customization from localStorage
  useEffect(() => {
    const savedLayout = localStorage.getItem('volition-layout')
    const savedPreset = localStorage.getItem('volition-preset')
    const savedHidden = localStorage.getItem('volition-hidden')
    const savedCollapsed = localStorage.getItem('volition-collapsed')
    const savedLocked = localStorage.getItem('volition-locked')

    if (savedLayout) {
      try {
        setLayout(JSON.parse(savedLayout))
      } catch (e) {
        console.error('Failed to load layout:', e)
      }
    }

    if (savedPreset && savedPreset in LAYOUT_PRESETS) {
      setCurrentPreset(savedPreset as keyof typeof LAYOUT_PRESETS)
    }

    if (savedHidden) {
      try {
        setHiddenWidgets(new Set(JSON.parse(savedHidden)))
      } catch (e) {
        console.error('Failed to load hidden widgets:', e)
      }
    }

    if (savedCollapsed) {
      try {
        setCollapsedWidgets(new Set(JSON.parse(savedCollapsed)))
      } catch (e) {
        console.error('Failed to load collapsed widgets:', e)
      }
    }

    if (savedLocked) {
      setIsLayoutLocked(savedLocked === 'true')
    }
  }, [])

  // Fetch data
  useEffect(() => {
    if (session?.user?.id) {
      Promise.all([fetchProjects(), fetchProfile()]).finally(() => setIsLoading(false))
    }
  }, [session?.user?.id])

  // Save layout changes
  useEffect(() => {
    localStorage.setItem('volition-layout', JSON.stringify(layout))
  }, [layout])

  useEffect(() => {
    localStorage.setItem('volition-preset', currentPreset)
  }, [currentPreset])

  useEffect(() => {
    localStorage.setItem('volition-hidden', JSON.stringify([...hiddenWidgets]))
  }, [hiddenWidgets])

  useEffect(() => {
    localStorage.setItem('volition-collapsed', JSON.stringify([...collapsedWidgets]))
  }, [collapsedWidgets])

  useEffect(() => {
    localStorage.setItem('volition-locked', String(isLayoutLocked))
  }, [isLayoutLocked])

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects')
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          const userProjects = data.data.filter(
            (p: any) =>
              p.members.some((m: any) => m.userId === session?.user?.id) ||
              p.creatorId === session?.user?.id
          )
          setProjects(userProjects.slice(0, 4))
        }
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const fetchProfile = async () => {
    try {
      const res = await fetch(`/api/users/${session?.user?.id}`)
      if (res.ok) {
        const data = await res.json()
        if (data.success) setUserProfile(data.data)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  // Layout handlers
  const handleLayoutChange = (newLayout: any[]) => {
    if (isLayoutLocked) return

    // Map back to our WidgetConfig format
    const updatedLayout = layout.map(widget => {
      const newPos = newLayout.find(item => item.i === widget.i)
      if (newPos) {
        return { ...widget, x: newPos.x, y: newPos.y, w: newPos.w, h: newPos.h }
      }
      return widget
    })

    setLayout(updatedLayout)
  }

  const changePreset = (preset: keyof typeof LAYOUT_PRESETS) => {
    setLayout(LAYOUT_PRESETS[preset])
    setCurrentPreset(preset)
  }

  const resetLayout = () => {
    setLayout(LAYOUT_PRESETS.balanced)
    setCurrentPreset('balanced')
    setHiddenWidgets(new Set())
    setCollapsedWidgets(new Set())
  }

  const toggleWidgetVisibility = (widget: WidgetKey) => {
    setHiddenWidgets(prev => {
      const newSet = new Set(prev)
      if (newSet.has(widget)) {
        newSet.delete(widget)
      } else {
        newSet.add(widget)
      }
      return newSet
    })
  }

  const toggleWidgetCollapse = (widget: WidgetKey) => {
    setCollapsedWidgets(prev => {
      const newSet = new Set(prev)
      if (newSet.has(widget)) {
        newSet.delete(widget)
      } else {
        newSet.add(widget)
      }
      return newSet
    })
  }

  const changeWidgetTheme = (widgetId: string, theme: 'primary' | 'accent' | 'secondary') => {
    setLayout(prev => prev.map(w => w.i === widgetId ? { ...w, theme } : w))
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-theme-muted">Loading Your Dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect('/auth/signin')
  }

  const user = session.user

  // Get visible layout (filter out hidden widgets)
  const visibleLayout = layout.filter(widget => !hiddenWidgets.has(widget.i as WidgetKey))

  return (
    <div className="min-h-screen bg-[var(--background)] pb-20">
      {/* Header - Solid Background with Full Mission Statement */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-[var(--primary)]/95 via-[var(--accent)]/95 to-[var(--secondary)]/95 backdrop-blur-sm border-b-2 border-theme-primary">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <Zap className="w-6 h-6 text-white flex-shrink-0 mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-xl font-black text-white leading-tight">MY VOLITION</h1>
                  <span className="text-white/60">•</span>
                  <p className="text-sm font-bold text-white/80">Command Center</p>
                </div>
                <p className="text-xs font-medium text-white/70 leading-relaxed">
                  This is YOUR dashboard to track how much you contribute and become part of Project Exodus
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCustomizationOpen(!customizationOpen)}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-bold text-xs transition-colors flex items-center gap-2 backdrop-blur-sm"
              >
                <Palette className="w-4 h-4" />
                CUSTOMIZE
              </button>
              <Link href="/settings">
                <button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-bold text-xs transition-colors flex items-center gap-2 backdrop-blur-sm">
                  <Settings className="w-4 h-4" />
                  SETTINGS
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Customization Panel */}
      {customizationOpen && (
        <div className="fixed top-24 right-6 w-80 max-h-[calc(100vh-7rem)] overflow-y-auto bg-[var(--card)] border-2 border-theme-primary rounded-xl shadow-2xl z-40">
          <div className="p-4">
            <h3 className="text-sm font-black text-[var(--foreground)] mb-3 flex items-center gap-2">
              <Palette className="w-4 h-4 text-theme-primary" />
              DASHBOARD CUSTOMIZATION
            </h3>

            {/* Layout Presets */}
            <div className="mb-4">
              <h4 className="text-xs font-bold text-[var(--foreground)] mb-2">LAYOUT PRESETS</h4>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(LAYOUT_PRESETS) as Array<keyof typeof LAYOUT_PRESETS>).map(preset => (
                  <button
                    key={preset}
                    onClick={() => changePreset(preset)}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors capitalize ${
                      currentPreset === preset
                        ? 'bg-[var(--primary)] text-white'
                        : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/10'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Layout Controls */}
            <div className="space-y-2 mb-4">
              <button
                onClick={() => setIsLayoutLocked(!isLayoutLocked)}
                className={`w-full px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors ${
                  isLayoutLocked
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/10 border border-theme-primary'
                }`}
              >
                {isLayoutLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                {isLayoutLocked ? 'Layout Locked' : 'Unlock to Customize'}
              </button>

              <button
                onClick={resetLayout}
                className="w-full px-3 py-2 bg-[var(--muted)] hover:bg-[var(--secondary)]/10 border border-theme-secondary rounded-lg text-xs font-bold text-[var(--foreground)] flex items-center gap-2 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset to Default
              </button>
            </div>

            {/* Widget Visibility */}
            <div className="border-t border-[var(--border)] pt-4">
              <h4 className="text-xs font-bold text-[var(--foreground)] mb-2">SHOW/HIDE WIDGETS</h4>
              <div className="space-y-2">
                {[
                  { key: 'profile' as WidgetKey, label: 'Profile', icon: User },
                  { key: 'projects' as WidgetKey, label: 'Active Projects', icon: Briefcase },
                  { key: 'learning' as WidgetKey, label: 'Learning Journey', icon: BookOpen },
                  { key: 'impact' as WidgetKey, label: 'Environmental Impact', icon: Leaf },
                  { key: 'network' as WidgetKey, label: 'Your Network', icon: Users },
                  { key: 'achievements' as WidgetKey, label: 'Achievements', icon: Award },
                  { key: 'actions' as WidgetKey, label: 'Quick Actions', icon: Zap },
                  { key: 'stats' as WidgetKey, label: 'Stats Overview', icon: TrendingUp },
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => toggleWidgetVisibility(key)}
                    className={`w-full px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors ${
                      hiddenWidgets.has(key)
                        ? 'bg-[var(--muted)] text-theme-muted'
                        : 'bg-[var(--primary)]/10 text-[var(--foreground)] border border-theme-primary'
                    }`}
                  >
                    {hiddenWidgets.has(key) ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <Icon className="w-3 h-3" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Grid */}
      <div className="container mx-auto px-6 py-6">
        <GridLayout
          className="layout"
          layout={visibleLayout}
          cols={12}
          rowHeight={80}
          width={1200}
          onLayoutChange={handleLayoutChange}
          isDraggable={!isLayoutLocked}
          isResizable={!isLayoutLocked}
          compactType="vertical"
          preventCollision={false}
        >
          {/* Profile Widget */}
          {!hiddenWidgets.has('profile') && (
            <div key="profile">
              <Widget
                id="profile"
                title="YOUR PROFILE"
                icon={User}
                theme={layout.find(w => w.i === 'profile')?.theme || 'primary'}
                collapsed={collapsedWidgets.has('profile')}
                onToggleCollapse={() => toggleWidgetCollapse('profile')}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center border-2 border-white shadow-lg">
                    {user?.image ? (
                      <img src={user.image} alt={user.name || 'User'} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[var(--foreground)]">{user?.name || 'You'}</h3>
                    <p className="text-[10px] font-medium text-theme-muted">{userProfile?.headline || 'Sustainability Advocate'}</p>
                  </div>
                  <div className="flex gap-4 pt-2">
                    <div>
                      <div className="text-lg font-black text-theme-primary">{userProfile?._count?.followers || 0}</div>
                      <div className="text-[9px] font-bold text-theme-muted">FOLLOWERS</div>
                    </div>
                    <div>
                      <div className="text-lg font-black text-theme-accent">{projects.length}</div>
                      <div className="text-[9px] font-bold text-theme-muted">PROJECTS</div>
                    </div>
                  </div>
                </div>
              </Widget>
            </div>
          )}

          {/* Projects Widget */}
          {!hiddenWidgets.has('projects') && (
            <div key="projects">
              <Widget
                id="projects"
                title="ACTIVE PROJECTS"
                icon={Briefcase}
                theme={layout.find(w => w.i === 'projects')?.theme || 'primary'}
                collapsed={collapsedWidgets.has('projects')}
                onToggleCollapse={() => toggleWidgetCollapse('projects')}
              >
                <div className="space-y-2">
                  {projects.length > 0 ? (
                    projects.slice(0, 3).map((project) => (
                      <Link key={project.id} href={`/community/projects/${project.slug}`}>
                        <div className="p-2 bg-[var(--muted)] rounded-lg hover:bg-[var(--accent)]/10 transition-all cursor-pointer border border-transparent hover:border-theme-accent">
                          <p className="text-[10px] font-black text-[var(--foreground)] line-clamp-1">{project.name}</p>
                          <p className="text-[9px] font-medium text-theme-muted line-clamp-1">{project.status}</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-[10px] font-bold text-theme-muted mb-2">No projects yet</p>
                      <Link href="/community/projects/new">
                        <button className="px-3 py-1.5 bg-[var(--primary)] text-white rounded text-[10px] font-bold hover:bg-[var(--accent)] transition-colors">
                          START ONE
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </Widget>
            </div>
          )}

          {/* Learning Widget */}
          {!hiddenWidgets.has('learning') && (
            <div key="learning">
              <Widget
                id="learning"
                title="LEARNING JOURNEY"
                icon={BookOpen}
                theme={layout.find(w => w.i === 'learning')?.theme || 'accent'}
                collapsed={collapsedWidgets.has('learning')}
                onToggleCollapse={() => toggleWidgetCollapse('learning')}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-[var(--muted)] rounded">
                    <span className="text-[10px] font-bold text-theme-muted">Articles Read</span>
                    <span className="text-base font-black text-theme-primary">12</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[var(--muted)] rounded">
                    <span className="text-[10px] font-bold text-theme-muted">Courses Done</span>
                    <span className="text-base font-black text-theme-accent">3</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[var(--muted)] rounded">
                    <span className="text-[10px] font-bold text-theme-muted">Learning Hours</span>
                    <span className="text-base font-black text-theme-secondary">24h</span>
                  </div>
                </div>
              </Widget>
            </div>
          )}

          {/* Impact Widget */}
          {!hiddenWidgets.has('impact') && (
            <div key="impact">
              <Widget
                id="impact"
                title="ENVIRONMENTAL IMPACT"
                icon={Leaf}
                theme={layout.find(w => w.i === 'impact')?.theme || 'secondary'}
                collapsed={collapsedWidgets.has('impact')}
                onToggleCollapse={() => toggleWidgetCollapse('impact')}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Wind className="w-3 h-3 text-theme-primary flex-shrink-0" />
                      <span className="text-[10px] font-bold text-theme-muted">CO₂ Saved</span>
                    </div>
                    <span className="text-base font-black text-theme-primary">{impactMetrics.co2Saved}kg</span>
                  </div>
                  <div className="h-1.5 bg-[var(--muted)] rounded-full">
                    <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full" style={{ width: '63%' }} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Droplet className="w-3 h-3 text-theme-accent flex-shrink-0" />
                      <span className="text-[10px] font-bold text-theme-muted">Water Saved</span>
                    </div>
                    <span className="text-base font-black text-theme-accent">{impactMetrics.waterSaved}gal</span>
                  </div>
                  <div className="h-1.5 bg-[var(--muted)] rounded-full">
                    <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" style={{ width: '91%' }} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-theme-secondary flex-shrink-0" />
                      <span className="text-[10px] font-bold text-theme-muted">Energy Saved</span>
                    </div>
                    <span className="text-base font-black text-theme-secondary">{impactMetrics.energySaved}kWh</span>
                  </div>
                  <div className="h-1.5 bg-[var(--muted)] rounded-full">
                    <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full" style={{ width: '78%' }} />
                  </div>
                </div>
              </Widget>
            </div>
          )}

          {/* Network Widget */}
          {!hiddenWidgets.has('network') && (
            <div key="network">
              <Widget
                id="network"
                title="YOUR NETWORK"
                icon={Users}
                theme={layout.find(w => w.i === 'network')?.theme || 'primary'}
                collapsed={collapsedWidgets.has('network')}
                onToggleCollapse={() => toggleWidgetCollapse('network')}
              >
                <div className="space-y-2">
                  <div className="p-2.5 bg-gradient-to-br from-[var(--primary)]/10 to-transparent border border-theme-primary rounded-lg text-center">
                    <div className="text-xl font-black text-theme-primary">{userProfile?._count?.followers || 0}</div>
                    <div className="text-[9px] font-bold text-theme-muted">CONNECTIONS</div>
                  </div>
                  <div className="p-2.5 bg-gradient-to-br from-[var(--accent)]/10 to-transparent border border-theme-accent rounded-lg text-center">
                    <div className="text-xl font-black text-theme-accent">5</div>
                    <div className="text-[9px] font-bold text-theme-muted">COMMUNITIES</div>
                  </div>
                  <Link href="/network">
                    <button className="w-full px-3 py-1.5 bg-[var(--primary)] text-white rounded-lg text-[10px] font-bold hover:bg-[var(--accent)] transition-colors">
                      VIEW NETWORK →
                    </button>
                  </Link>
                </div>
              </Widget>
            </div>
          )}

          {/* Achievements Widget */}
          {!hiddenWidgets.has('achievements') && (
            <div key="achievements">
              <Widget
                id="achievements"
                title="ACHIEVEMENTS"
                icon={Award}
                theme={layout.find(w => w.i === 'achievements')?.theme || 'accent'}
                collapsed={collapsedWidgets.has('achievements')}
                onToggleCollapse={() => toggleWidgetCollapse('achievements')}
              >
                <div className="grid grid-cols-4 gap-2">
                  {badges.map((badge, i) => (
                    <div key={i} className="text-center p-2 bg-[var(--muted)] rounded-lg">
                      <div className="text-xl mb-1">{badge.icon}</div>
                      <div className="text-[8px] font-bold text-theme-muted mb-1 line-clamp-1">{badge.name}</div>
                      <div className="h-1 bg-[var(--background)] rounded-full">
                        <div className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full" style={{ width: `${badge.progress}%` }} />
                      </div>
                      <div className="text-[8px] font-black text-theme-primary mt-0.5">{badge.progress}%</div>
                    </div>
                  ))}
                </div>
              </Widget>
            </div>
          )}

          {/* Quick Actions Widget */}
          {!hiddenWidgets.has('actions') && (
            <div key="actions">
              <Widget
                id="actions"
                title="QUICK ACTIONS"
                icon={Zap}
                theme={layout.find(w => w.i === 'actions')?.theme || 'secondary'}
                collapsed={collapsedWidgets.has('actions')}
                onToggleCollapse={() => toggleWidgetCollapse('actions')}
              >
                <div className="space-y-2">
                  <Link href="/community/projects/new">
                    <button className="w-full px-2.5 py-2 bg-[var(--muted)] hover:bg-[var(--primary)]/10 border border-transparent hover:border-theme-primary rounded-lg text-[10px] font-bold text-[var(--foreground)] flex items-center gap-2 transition-all">
                      <Briefcase className="w-3 h-3 flex-shrink-0" />
                      Start Project
                    </button>
                  </Link>
                  <Link href="/learn">
                    <button className="w-full px-2.5 py-2 bg-[var(--muted)] hover:bg-[var(--accent)]/10 border border-transparent hover:border-theme-accent rounded-lg text-[10px] font-bold text-[var(--foreground)] flex items-center gap-2 transition-all">
                      <BookOpen className="w-3 h-3 flex-shrink-0" />
                      Write Article
                    </button>
                  </Link>
                  <Link href="/community/forum">
                    <button className="w-full px-2.5 py-2 bg-[var(--muted)] hover:bg-[var(--secondary)]/10 border border-transparent hover:border-theme-secondary rounded-lg text-[10px] font-bold text-[var(--foreground)] flex items-center gap-2 transition-all">
                      <MessageCircle className="w-3 h-3 flex-shrink-0" />
                      Join Discussion
                    </button>
                  </Link>
                  <Link href="/network/browse">
                    <button className="w-full px-2.5 py-2 bg-[var(--muted)] hover:bg-[var(--primary)]/10 border border-transparent hover:border-theme-primary rounded-lg text-[10px] font-bold text-[var(--foreground)] flex items-center gap-2 transition-all">
                      <Users className="w-3 h-3 flex-shrink-0" />
                      Connect
                    </button>
                  </Link>
                </div>
              </Widget>
            </div>
          )}

          {/* Stats Overview Widget */}
          {!hiddenWidgets.has('stats') && (
            <div key="stats">
              <Widget
                id="stats"
                title="STATS OVERVIEW"
                icon={TrendingUp}
                theme={layout.find(w => w.i === 'stats')?.theme || 'primary'}
                collapsed={collapsedWidgets.has('stats')}
                onToggleCollapse={() => toggleWidgetCollapse('stats')}
              >
                <div className="flex items-center justify-around">
                  <div className="text-center">
                    <div className="flex items-center gap-1.5 justify-center mb-1">
                      <TrendingUp className="w-4 h-4 text-theme-primary" />
                      <span className="text-xs font-bold text-[var(--foreground)]">Impact</span>
                    </div>
                    <div className="text-xl font-black text-theme-primary">742</div>
                  </div>
                  <div className="w-px h-12 bg-[var(--border)]" />
                  <div className="text-center">
                    <div className="flex items-center gap-1.5 justify-center mb-1">
                      <Flame className="w-4 h-4 text-theme-accent" />
                      <span className="text-xs font-bold text-[var(--foreground)]">Streak</span>
                    </div>
                    <div className="text-xl font-black text-theme-accent">12d</div>
                  </div>
                  <div className="w-px h-12 bg-[var(--border)]" />
                  <div className="text-center">
                    <div className="flex items-center gap-1.5 justify-center mb-1">
                      <Target className="w-4 h-4 text-theme-secondary" />
                      <span className="text-xs font-bold text-[var(--foreground)]">Level</span>
                    </div>
                    <div className="text-xl font-black text-theme-secondary">8</div>
                  </div>
                </div>
              </Widget>
            </div>
          )}
        </GridLayout>
      </div>
    </div>
  )
}
