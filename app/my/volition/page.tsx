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
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'

// Default node positions (as percentages)
const DEFAULT_POSITIONS = {
  projects: { x: 10, y: 15 },
  learning: { x: 85, y: 15 },
  impact: { x: 10, y: 80 },
  network: { x: 85, y: 80 },
  badges: { x: 3, y: 50 },
  actions: { x: 92, y: 50 },
}

// Node type definition
type NodeKey = 'projects' | 'learning' | 'impact' | 'network' | 'badges' | 'actions'

interface NodePosition {
  x: number
  y: number
}

export default function MyVolitionPage() {
  const { data: session, status } = useSession()
  const [projects, setProjects] = useState<any[]>([])
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Customization & Layout State
  const [nodePositions, setNodePositions] = useState<Record<NodeKey, NodePosition>>(DEFAULT_POSITIONS)
  const [isLayoutLocked, setIsLayoutLocked] = useState(false)
  const [customizationOpen, setCustomizationOpen] = useState(false)
  const [hiddenNodes, setHiddenNodes] = useState<Set<NodeKey>>(new Set())
  const [isDragging, setIsDragging] = useState<NodeKey | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

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

  // Load saved layout from localStorage on mount
  useEffect(() => {
    const savedPositions = localStorage.getItem('volition-node-positions')
    const savedHidden = localStorage.getItem('volition-hidden-nodes')
    const savedLocked = localStorage.getItem('volition-layout-locked')

    if (savedPositions) {
      try {
        setNodePositions(JSON.parse(savedPositions))
      } catch (e) {
        console.error('Failed to load saved positions:', e)
      }
    }

    if (savedHidden) {
      try {
        setHiddenNodes(new Set(JSON.parse(savedHidden)))
      } catch (e) {
        console.error('Failed to load hidden nodes:', e)
      }
    }

    if (savedLocked) {
      setIsLayoutLocked(savedLocked === 'true')
    }
  }, [])

  useEffect(() => {
    if (session?.user?.id) {
      Promise.all([fetchProjects(), fetchProfile()]).finally(() => setIsLoading(false))
    }
  }, [session?.user?.id])

  // Save positions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('volition-node-positions', JSON.stringify(nodePositions))
  }, [nodePositions])

  // Save hidden nodes to localStorage
  useEffect(() => {
    localStorage.setItem('volition-hidden-nodes', JSON.stringify([...hiddenNodes]))
  }, [hiddenNodes])

  // Save locked state
  useEffect(() => {
    localStorage.setItem('volition-layout-locked', String(isLayoutLocked))
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

  // Drag handlers
  const handleMouseDown = (nodeKey: NodeKey, e: React.MouseEvent) => {
    if (isLayoutLocked) return

    e.preventDefault()
    setIsDragging(nodeKey)

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const nodeX = (nodePositions[nodeKey].x / 100) * rect.width
      const nodeY = (nodePositions[nodeKey].y / 100) * rect.height

      setDragOffset({
        x: e.clientX - nodeX,
        y: e.clientY - nodeY,
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - dragOffset.x) / rect.width) * 100
    const y = ((e.clientY - dragOffset.y) / rect.height) * 100

    // Constrain to viewport (with some padding)
    const constrainedX = Math.max(3, Math.min(92, x))
    const constrainedY = Math.max(10, Math.min(85, y))

    setNodePositions((prev) => ({
      ...prev,
      [isDragging]: { x: constrainedX, y: constrainedY },
    }))
  }

  const handleMouseUp = () => {
    setIsDragging(null)
  }

  // Reset layout to default
  const resetLayout = () => {
    setNodePositions(DEFAULT_POSITIONS)
    setHiddenNodes(new Set())
  }

  // Toggle node visibility
  const toggleNodeVisibility = (nodeKey: NodeKey) => {
    setHiddenNodes((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(nodeKey)) {
        newSet.delete(nodeKey)
      } else {
        newSet.add(nodeKey)
      }
      return newSet
    })
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg font-bold text-theme-muted">Weaving Your Network...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect('/auth/signin')
  }

  const user = session.user

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen overflow-hidden bg-[var(--background)] relative select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* SVG Connection Lines Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Dynamic connection lines - only render for visible nodes */}
        {!hiddenNodes.has('projects') && (
          <line
            x1="50%"
            y1="50%"
            x2={`${nodePositions.projects.x}%`}
            y2={`${nodePositions.projects.y}%`}
            stroke="url(#lineGradient1)"
            strokeWidth="2"
            opacity="0.4"
          />
        )}
        {!hiddenNodes.has('learning') && (
          <line
            x1="50%"
            y1="50%"
            x2={`${nodePositions.learning.x}%`}
            y2={`${nodePositions.learning.y}%`}
            stroke="url(#lineGradient1)"
            strokeWidth="2"
            opacity="0.4"
          />
        )}
        {!hiddenNodes.has('impact') && (
          <line
            x1="50%"
            y1="50%"
            x2={`${nodePositions.impact.x}%`}
            y2={`${nodePositions.impact.y}%`}
            stroke="url(#lineGradient2)"
            strokeWidth="2"
            opacity="0.4"
          />
        )}
        {!hiddenNodes.has('network') && (
          <line
            x1="50%"
            y1="50%"
            x2={`${nodePositions.network.x}%`}
            y2={`${nodePositions.network.y}%`}
            stroke="url(#lineGradient2)"
            strokeWidth="2"
            opacity="0.4"
          />
        )}
        {!hiddenNodes.has('badges') && (
          <line
            x1="50%"
            y1="50%"
            x2={`${nodePositions.badges.x}%`}
            y2={`${nodePositions.badges.y}%`}
            stroke="url(#lineGradient1)"
            strokeWidth="2"
            opacity="0.4"
          />
        )}
        {!hiddenNodes.has('actions') && (
          <line
            x1="50%"
            y1="50%"
            x2={`${nodePositions.actions.x}%`}
            y2={`${nodePositions.actions.y}%`}
            stroke="url(#lineGradient2)"
            strokeWidth="2"
            opacity="0.4"
          />
        )}

        {/* Orbital ring around center */}
        <circle cx="50%" cy="50%" r="25%" fill="none" stroke="var(--primary)" strokeWidth="1" opacity="0.1" strokeDasharray="8 4" />
        <circle cx="50%" cy="50%" r="38%" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.08" strokeDasharray="12 6" />
      </svg>

      {/* Top Bar - Compact */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-[var(--primary)]/10 via-[var(--accent)]/10 to-[var(--secondary)]/10 border-b-2 border-theme-primary flex items-center px-6 z-50">
        <div className="flex items-center gap-3 flex-1">
          <Zap className="w-6 h-6 text-theme-primary" />
          <div>
            <h1 className="text-lg font-black text-[var(--foreground)]">MY VOLITION</h1>
            <p className="text-[10px] font-bold text-theme-muted">This is YOUR portfolio—a living web showing how you contribute and become part of Project Exodus</p>
          </div>
        </div>
        <div className="flex items-center gap-3 mr-4">
          <p className="text-xs font-bold text-theme-muted">Command Center</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCustomizationOpen(!customizationOpen)}
            className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg font-bold text-xs hover:bg-[var(--secondary)] transition-colors flex items-center gap-2"
          >
            <Palette className="w-4 h-4" />
            CUSTOMIZE
          </button>
          <Link href="/settings">
            <button className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg font-bold text-xs hover:bg-[var(--accent)] transition-colors flex items-center gap-2">
              <Settings className="w-4 h-4" />
              SETTINGS
            </button>
          </Link>
        </div>
      </div>

      {/* CENTER HUB - YOU */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40">
        <div className="relative">
          {/* Pulsing glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] rounded-full blur-2xl opacity-30 animate-pulse" />

          {/* Center card */}
          <div className="relative w-48 h-48 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] rounded-full border-4 border-white shadow-2xl flex flex-col items-center justify-center p-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2 border-2 border-white/40">
              {user?.image ? (
                <img src={user.image} alt={user.name || 'User'} className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-8 h-8 text-white" />
              )}
            </div>
            <h2 className="text-sm font-black text-white text-center line-clamp-1">{user?.name || 'You'}</h2>
            <p className="text-[10px] font-bold text-white/80 text-center line-clamp-2">{userProfile?.headline || 'Sustainability Advocate'}</p>
            <div className="flex gap-3 mt-2">
              <div className="text-center">
                <div className="text-lg font-black text-white">{userProfile?._count?.followers || 0}</div>
                <div className="text-[8px] font-bold text-white/70">FOLLOWERS</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-black text-white">{projects.length}</div>
                <div className="text-[8px] font-bold text-white/70">PROJECTS</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TOP-LEFT NODE - PROJECTS */}
      {!hiddenNodes.has('projects') && (
        <div
          className="absolute z-30 transition-opacity"
          style={{
            top: `${nodePositions.projects.y}%`,
            left: `${nodePositions.projects.x}%`,
            transform: 'translate(-50%, -50%)',
            cursor: isLayoutLocked ? 'default' : 'move',
            opacity: isDragging === 'projects' ? 0.7 : 1,
          }}
          onMouseDown={(e) => handleMouseDown('projects', e)}
        >
          <div className="w-64 bg-[var(--card)] border-2 border-theme-primary rounded-xl shadow-xl p-4 pointer-events-auto">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-xs font-black text-[var(--foreground)]">ACTIVE PROJECTS</h3>
          </div>
          <div className="space-y-2">
            {projects.length > 0 ? (
              projects.slice(0, 3).map((project) => (
                <Link key={project.id} href={`/community/projects/${project.slug}`}>
                  <div className="p-2 bg-[var(--muted)] rounded-lg hover:bg-[var(--accent)]/10 transition-all cursor-pointer border border-transparent hover:border-theme-accent">
                    <p className="text-[10px] font-black text-[var(--foreground)] line-clamp-1">{project.name}</p>
                    <p className="text-[8px] font-medium text-theme-muted line-clamp-1">{project.status}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-2">
                <p className="text-[10px] font-bold text-theme-muted">No projects yet</p>
                <Link href="/community/projects/new">
                  <button className="mt-2 px-3 py-1 bg-[var(--primary)] text-white rounded text-[9px] font-bold">START ONE</button>
                </Link>
              </div>
            )}
          </div>
        </div>
        </div>
      )}

      {/* TOP-RIGHT NODE - LEARNING */}
      {!hiddenNodes.has('learning') && (
        <div
          className="absolute z-30 transition-opacity"
          style={{
            top: `${nodePositions.learning.y}%`,
            left: `${nodePositions.learning.x}%`,
            transform: 'translate(-50%, -50%)',
            cursor: isLayoutLocked ? 'default' : 'move',
            opacity: isDragging === 'learning' ? 0.7 : 1,
          }}
          onMouseDown={(e) => handleMouseDown('learning', e)}
        >
          <div className="w-64 bg-[var(--card)] border-2 border-theme-accent rounded-xl shadow-xl p-4 pointer-events-auto">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-xs font-black text-[var(--foreground)]">LEARNING JOURNEY</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-[var(--muted)] rounded">
              <span className="text-[10px] font-bold text-theme-muted">Articles Read</span>
              <span className="text-lg font-black text-theme-primary">12</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-[var(--muted)] rounded">
              <span className="text-[10px] font-bold text-theme-muted">Courses Done</span>
              <span className="text-lg font-black text-theme-accent">3</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-[var(--muted)] rounded">
              <span className="text-[10px] font-bold text-theme-muted">Learning Hours</span>
              <span className="text-lg font-black text-theme-secondary">24h</span>
            </div>
          </div>
        </div>
        </div>
      )}

      {/* BOTTOM-LEFT NODE - ENVIRONMENTAL IMPACT */}
      {!hiddenNodes.has('impact') && (
        <div
          className="absolute z-30 transition-opacity"
          style={{
            top: `${nodePositions.impact.y}%`,
            left: `${nodePositions.impact.x}%`,
            transform: 'translate(-50%, -50%)',
            cursor: isLayoutLocked ? 'default' : 'move',
            opacity: isDragging === 'impact' ? 0.7 : 1,
          }}
          onMouseDown={(e) => handleMouseDown('impact', e)}
        >
          <div className="w-64 bg-[var(--card)] border-2 border-theme-secondary rounded-xl shadow-xl p-4 pointer-events-auto">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--secondary)] to-[var(--primary)] flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-xs font-black text-[var(--foreground)]">ENVIRONMENTAL IMPACT</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Wind className="w-3 h-3 text-theme-primary" />
                <span className="text-[10px] font-bold text-theme-muted">CO₂ Saved</span>
              </div>
              <span className="text-sm font-black text-theme-primary">{impactMetrics.co2Saved}kg</span>
            </div>
            <div className="h-1.5 bg-[var(--muted)] rounded-full">
              <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full" style={{ width: '63%' }} />
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1">
                <Droplet className="w-3 h-3 text-theme-accent" />
                <span className="text-[10px] font-bold text-theme-muted">Water Saved</span>
              </div>
              <span className="text-sm font-black text-theme-accent">{impactMetrics.waterSaved}gal</span>
            </div>
            <div className="h-1.5 bg-[var(--muted)] rounded-full">
              <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" style={{ width: '91%' }} />
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-theme-secondary" />
                <span className="text-[10px] font-bold text-theme-muted">Energy Saved</span>
              </div>
              <span className="text-sm font-black text-theme-secondary">{impactMetrics.energySaved}kWh</span>
            </div>
            <div className="h-1.5 bg-[var(--muted)] rounded-full">
              <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full" style={{ width: '78%' }} />
            </div>
          </div>
        </div>
        </div>
      )}

      {/* BOTTOM-RIGHT NODE - NETWORK */}
      {!hiddenNodes.has('network') && (
        <div
          className="absolute z-30 transition-opacity"
          style={{
            top: `${nodePositions.network.y}%`,
            left: `${nodePositions.network.x}%`,
            transform: 'translate(-50%, -50%)',
            cursor: isLayoutLocked ? 'default' : 'move',
            opacity: isDragging === 'network' ? 0.7 : 1,
          }}
          onMouseDown={(e) => handleMouseDown('network', e)}
        >
          <div className="w-64 bg-[var(--card)] border-2 border-theme-primary rounded-xl shadow-xl p-4 pointer-events-auto">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-xs font-black text-[var(--foreground)]">YOUR NETWORK</h3>
          </div>
          <div className="space-y-2">
            <div className="p-3 bg-gradient-to-br from-[var(--primary)]/10 to-transparent border border-theme-primary rounded-lg">
              <div className="text-2xl font-black text-theme-primary text-center">{userProfile?._count?.followers || 0}</div>
              <div className="text-[10px] font-bold text-theme-muted text-center">CONNECTIONS</div>
            </div>
            <div className="p-3 bg-gradient-to-br from-[var(--accent)]/10 to-transparent border border-theme-accent rounded-lg">
              <div className="text-2xl font-black text-theme-accent text-center">5</div>
              <div className="text-[10px] font-bold text-theme-muted text-center">COMMUNITIES</div>
            </div>
            <Link href="/network">
              <button className="w-full px-3 py-2 bg-[var(--primary)] text-white rounded-lg text-[10px] font-bold hover:bg-[var(--accent)] transition-colors">
                VIEW NETWORK →
              </button>
            </Link>
          </div>
        </div>
        </div>
      )}

      {/* LEFT NODE - BADGES */}
      {!hiddenNodes.has('badges') && (
        <div
          className="absolute z-30 transition-opacity"
          style={{
            top: `${nodePositions.badges.y}%`,
            left: `${nodePositions.badges.x}%`,
            transform: 'translate(-50%, -50%)',
            cursor: isLayoutLocked ? 'default' : 'move',
            opacity: isDragging === 'badges' ? 0.7 : 1,
          }}
          onMouseDown={(e) => handleMouseDown('badges', e)}
        >
          <div className="w-56 bg-[var(--card)] border-2 border-theme-accent rounded-xl shadow-xl p-4 pointer-events-auto">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] flex items-center justify-center">
              <Award className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-xs font-black text-[var(--foreground)]">ACHIEVEMENTS</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {badges.map((badge, i) => (
              <div key={i} className="text-center p-2 bg-[var(--muted)] rounded-lg border border-transparent hover:border-theme-accent transition-all">
                <div className="text-2xl mb-1">{badge.icon}</div>
                <div className="text-[8px] font-bold text-theme-muted mb-1 line-clamp-1">{badge.name}</div>
                <div className="h-1 bg-[var(--background)] rounded-full">
                  <div className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full" style={{ width: `${badge.progress}%` }} />
                </div>
                <div className="text-[8px] font-black text-theme-primary mt-0.5">{badge.progress}%</div>
              </div>
            ))}
          </div>
        </div>
        </div>
      )}

      {/* RIGHT NODE - QUICK ACTIONS */}
      {!hiddenNodes.has('actions') && (
        <div
          className="absolute z-30 transition-opacity"
          style={{
            top: `${nodePositions.actions.y}%`,
            left: `${nodePositions.actions.x}%`,
            transform: 'translate(-50%, -50%)',
            cursor: isLayoutLocked ? 'default' : 'move',
            opacity: isDragging === 'actions' ? 0.7 : 1,
          }}
          onMouseDown={(e) => handleMouseDown('actions', e)}
        >
          <div className="w-56 bg-[var(--card)] border-2 border-theme-secondary rounded-xl shadow-xl p-4 pointer-events-auto">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--secondary)] to-[var(--primary)] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-xs font-black text-[var(--foreground)]">QUICK ACTIONS</h3>
          </div>
          <div className="space-y-2">
            <Link href="/community/projects/new">
              <button className="w-full px-3 py-2 bg-[var(--muted)] hover:bg-[var(--primary)]/10 border border-transparent hover:border-theme-primary rounded-lg text-[10px] font-bold text-[var(--foreground)] flex items-center gap-2 transition-all">
                <Briefcase className="w-3 h-3" />
                Start Project
              </button>
            </Link>
            <Link href="/learn">
              <button className="w-full px-3 py-2 bg-[var(--muted)] hover:bg-[var(--accent)]/10 border border-transparent hover:border-theme-accent rounded-lg text-[10px] font-bold text-[var(--foreground)] flex items-center gap-2 transition-all">
                <BookOpen className="w-3 h-3" />
                Write Article
              </button>
            </Link>
            <Link href="/community/forum">
              <button className="w-full px-3 py-2 bg-[var(--muted)] hover:bg-[var(--secondary)]/10 border border-transparent hover:border-theme-secondary rounded-lg text-[10px] font-bold text-[var(--foreground)] flex items-center gap-2 transition-all">
                <MessageCircle className="w-3 h-3" />
                Join Discussion
              </button>
            </Link>
            <Link href="/network/browse">
              <button className="w-full px-3 py-2 bg-[var(--muted)] hover:bg-[var(--primary)]/10 border border-transparent hover:border-theme-primary rounded-lg text-[10px] font-bold text-[var(--foreground)] flex items-center gap-2 transition-all">
                <Users className="w-3 h-3" />
                Connect
              </button>
            </Link>
          </div>
        </div>
        </div>
      )}

      {/* Customization Panel */}
      {customizationOpen && (
        <div className="absolute top-20 right-6 w-80 max-h-[calc(100vh-6rem)] overflow-y-auto bg-[var(--card)] border-2 border-theme-primary rounded-xl shadow-2xl p-4 z-50">
          <div className="mb-4">
            <h3 className="text-sm font-black text-[var(--foreground)] mb-2 flex items-center gap-2">
              <Palette className="w-4 h-4 text-theme-primary" />
              CUSTOMIZE YOUR WEB
            </h3>
            <p className="text-[10px] text-theme-muted">Drag nodes to arrange your personal data web. Lock layout when done.</p>
          </div>

          {/* Layout Controls */}
          <div className="space-y-3 mb-4">
            <button
              onClick={() => setIsLayoutLocked(!isLayoutLocked)}
              className={`w-full px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors ${
                isLayoutLocked
                  ? 'bg-[var(--accent)] text-white hover:bg-[var(--accent)]/80'
                  : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--primary)]/10 border border-theme-primary'
              }`}
            >
              {isLayoutLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
              {isLayoutLocked ? 'Layout Locked' : 'Unlock to Drag'}
            </button>

            <button
              onClick={resetLayout}
              className="w-full px-3 py-2 bg-[var(--muted)] hover:bg-[var(--secondary)]/10 border border-theme-secondary rounded-lg text-xs font-bold text-[var(--foreground)] flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset to Default
            </button>
          </div>

          {/* Node Visibility Toggles */}
          <div className="border-t border-[var(--border)] pt-3">
            <h4 className="text-xs font-black text-[var(--foreground)] mb-2">SHOW/HIDE NODES</h4>
            <div className="space-y-2">
              {[
                { key: 'projects' as NodeKey, label: 'Active Projects', icon: Briefcase },
                { key: 'learning' as NodeKey, label: 'Learning Journey', icon: BookOpen },
                { key: 'impact' as NodeKey, label: 'Environmental Impact', icon: Leaf },
                { key: 'network' as NodeKey, label: 'Your Network', icon: Users },
                { key: 'badges' as NodeKey, label: 'Achievements', icon: Award },
                { key: 'actions' as NodeKey, label: 'Quick Actions', icon: Zap },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => toggleNodeVisibility(key)}
                  className={`w-full px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors ${
                    hiddenNodes.has(key)
                      ? 'bg-[var(--muted)] text-theme-muted hover:bg-[var(--primary)]/10'
                      : 'bg-[var(--primary)]/10 text-[var(--foreground)] border border-theme-primary'
                  }`}
                >
                  {hiddenNodes.has(key) ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <Icon className="w-3 h-3" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Stats Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-[var(--card)]/80 backdrop-blur-md border-2 border-theme-primary rounded-full px-6 py-2 z-50">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-theme-primary" />
          <span className="text-xs font-black text-[var(--foreground)]">Impact Score: <span className="text-theme-primary">742</span></span>
        </div>
        <div className="w-px h-4 bg-[var(--border)]" />
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-theme-accent" />
          <span className="text-xs font-black text-[var(--foreground)]">Streak: <span className="text-theme-accent">12 days</span></span>
        </div>
        <div className="w-px h-4 bg-[var(--border)]" />
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-theme-secondary" />
          <span className="text-xs font-black text-[var(--foreground)]">Level: <span className="text-theme-secondary">8</span></span>
        </div>
      </div>
    </div>
  )
}
