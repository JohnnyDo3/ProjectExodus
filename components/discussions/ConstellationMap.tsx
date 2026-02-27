'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { forceSimulation, forceManyBody, forceCollide, forceLink, forceX, forceY, type SimulationNodeDatum, type SimulationLinkDatum } from 'd3-force'
import { ZoomIn, ZoomOut, Maximize2, Move } from 'lucide-react'
import type { ActivityItem } from './ActivityCard'

// ── Types ────────────────────────────────────────────────────────────────

interface ConstellationMapProps {
  items: ActivityItem[]
}

interface MapNode extends SimulationNodeDatum {
  id: string
  label: string
  category: string
  type: string
  engagement: number
  radius: number
  targetUrl: string
  userName: string
}

interface MapLink extends SimulationLinkDatum<MapNode> {
  strength: number
}

// ── Category config ──────────────────────────────────────────────────────

const CATEGORIES: Record<string, { color: string; glow: string; label: string; regionAngle: number }> = {
  discussions: { color: '#60a5fa', glow: '#3b82f6', label: 'Discussions', regionAngle: 0 },
  articles:    { color: '#f59e0b', glow: '#d97706', label: 'Articles', regionAngle: 72 },
  projects:    { color: '#34d399', glow: '#10b981', label: 'Projects', regionAngle: 144 },
  members:     { color: '#a78bfa', glow: '#8b5cf6', label: 'Members', regionAngle: 216 },
  events:      { color: '#f472b6', glow: '#ec4899', label: 'Events', regionAngle: 288 },
}

const MAP_WIDTH = 1600
const MAP_HEIGHT = 1200

// ── Component ────────────────────────────────────────────────────────────

export function ConstellationMap({ items }: ConstellationMapProps) {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const [nodes, setNodes] = useState<MapNode[]>([])
  const [links, setLinks] = useState<MapLink[]>([])
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  // Pan & zoom state
  const [scale, setScale] = useState(0.6)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [containerSize, setContainerSize] = useState({ width: 800, height: 500 })

  const simulationRef = useRef<ReturnType<typeof forceSimulation<MapNode>> | null>(null)

  // ── Container sizing ─────────────────────────────────────────────────

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setContainerSize({ width: rect.width, height: Math.max(rect.width * 0.6, 450) })
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Center the map initially
  useEffect(() => {
    setPan({
      x: (containerSize.width - MAP_WIDTH * scale) / 2,
      y: (containerSize.height - MAP_HEIGHT * scale) / 2,
    })
  }, [containerSize.width, containerSize.height]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Build nodes from items ───────────────────────────────────────────

  useEffect(() => {
    if (items.length === 0) return

    const unique = items.slice(0, 40)
    const maxEngagement = Math.max(...unique.map(i => i.engagement), 1)

    const cx = MAP_WIDTH / 2
    const cy = MAP_HEIGHT / 2
    const spreadRadius = 280

    const categoryItems: Record<string, typeof unique> = {}
    for (const item of unique) {
      if (!categoryItems[item.category]) categoryItems[item.category] = []
      categoryItems[item.category].push(item)
    }

    const newNodes: MapNode[] = []
    for (const [cat, catItems] of Object.entries(categoryItems)) {
      const config = CATEGORIES[cat] || CATEGORIES.discussions
      const angleRad = (config.regionAngle * Math.PI) / 180
      const regionCx = cx + Math.cos(angleRad) * spreadRadius
      const regionCy = cy + Math.sin(angleRad) * spreadRadius

      catItems.forEach((item, idx) => {
        const normalized = item.engagement / maxEngagement
        const subAngle = (idx / Math.max(catItems.length, 1)) * Math.PI * 2
        const subRadius = 60 + Math.random() * 80
        newNodes.push({
          id: item.id,
          label: item.title.length > 35 ? item.title.slice(0, 33) + '...' : item.title,
          category: item.category,
          type: item.type,
          engagement: item.engagement,
          radius: 10 + normalized * 18,
          targetUrl: item.targetUrl,
          userName: item.userName,
          x: regionCx + Math.cos(subAngle) * subRadius,
          y: regionCy + Math.sin(subAngle) * subRadius,
        })
      })
    }

    // Links between same-category neighbors
    const newLinks: MapLink[] = []
    for (let i = 0; i < newNodes.length; i++) {
      for (let j = i + 1; j < Math.min(i + 5, newNodes.length); j++) {
        if (newNodes[i].category === newNodes[j].category) {
          newLinks.push({ source: newNodes[i].id, target: newNodes[j].id, strength: 0.15 })
        }
      }
    }

    setNodes(newNodes)
    setLinks(newLinks)
  }, [items])

  // ── D3 force simulation ──────────────────────────────────────────────

  useEffect(() => {
    if (nodes.length === 0) return
    if (simulationRef.current) simulationRef.current.stop()

    const cx = MAP_WIDTH / 2
    const cy = MAP_HEIGHT / 2
    const spreadRadius = 280

    const sim = forceSimulation<MapNode>(nodes)
      .force('charge', forceManyBody<MapNode>().strength(-60))
      .force('collide', forceCollide<MapNode>().radius(d => d.radius + 8).strength(0.8))
      .force('link', forceLink<MapNode, MapLink>(links).id(d => d.id).strength(0.08).distance(70))
      .force('x', forceX<MapNode>().x(d => {
        const config = CATEGORIES[d.category] || CATEGORIES.discussions
        return cx + Math.cos((config.regionAngle * Math.PI) / 180) * spreadRadius
      }).strength(0.05))
      .force('y', forceY<MapNode>().y(d => {
        const config = CATEGORIES[d.category] || CATEGORIES.discussions
        return cy + Math.sin((config.regionAngle * Math.PI) / 180) * spreadRadius
      }).strength(0.05))
      .alpha(0.6)
      .alphaDecay(0.025)

    sim.on('tick', () => {
      setNodes(prev => prev.map((n, i) => {
        const simNode = sim.nodes()[i]
        return { ...n, x: simNode?.x, y: simNode?.y }
      }))
    })

    simulationRef.current = sim
    return () => { sim.stop() }
  }, [nodes.length, links.length])

  // ── Pan & zoom handlers ──────────────────────────────────────────────

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return
    e.preventDefault()
    setIsDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }, [pan])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
  }, [isDragging, dragStart])

  const handleMouseUp = useCallback(() => setIsDragging(false), [])

  // Wheel zoom — must use native addEventListener with { passive: false }
  // because React 19 registers wheel as passive, making preventDefault() a no-op.
  const viewportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY > 0 ? -0.08 : 0.08
      setScale(s => Math.min(Math.max(s + delta, 0.25), 2.5))
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  // Touch support
  const touchRef = useRef<{ dist: number }>({ dist: 0 })

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true)
      setDragStart({ x: e.touches[0].clientX - pan.x, y: e.touches[0].clientY - pan.y })
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      touchRef.current.dist = Math.sqrt(dx * dx + dy * dy)
    }
  }, [pan])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      setPan({ x: e.touches[0].clientX - dragStart.x, y: e.touches[0].clientY - dragStart.y })
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.sqrt(dx * dx + dy * dy)
      const factor = dist / touchRef.current.dist
      setScale(s => Math.min(Math.max(s * factor, 0.25), 2.5))
      touchRef.current.dist = dist
    }
  }, [isDragging, dragStart])

  const handleTouchEnd = useCallback(() => setIsDragging(false), [])

  const zoomIn = () => setScale(s => Math.min(s + 0.2, 2.5))
  const zoomOut = () => setScale(s => Math.max(s - 0.2, 0.25))
  const resetView = () => {
    setScale(0.6)
    setPan({
      x: (containerSize.width - MAP_WIDTH * 0.6) / 2,
      y: (containerSize.height - MAP_HEIGHT * 0.6) / 2,
    })
    setSelectedNode(null)
  }

  // ── Node click ───────────────────────────────────────────────────────

  const handleNodeClick = useCallback((node: MapNode) => {
    setSelectedNode(prev => prev === node.id ? null : node.id)
  }, [])

  // ── Memoized visuals ─────────────────────────────────────────────────

  const stars = useMemo(() => {
    const result: { x: number; y: number; r: number; opacity: number }[] = []
    for (let i = 0; i < 120; i++) {
      result.push({
        x: Math.random() * MAP_WIDTH,
        y: Math.random() * MAP_HEIGHT,
        r: 0.5 + Math.random() * 1.5,
        opacity: 0.15 + Math.random() * 0.4,
      })
    }
    return result
  }, [])

  const regionLabels = useMemo(() => {
    const cx = MAP_WIDTH / 2
    const cy = MAP_HEIGHT / 2
    return Object.entries(CATEGORIES).map(([key, config]) => {
      const angleRad = (config.regionAngle * Math.PI) / 180
      return {
        key,
        label: config.label,
        color: config.color,
        x: cx + Math.cos(angleRad) * 420,
        y: cy + Math.sin(angleRad) * 380,
      }
    })
  }, [])

  if (items.length === 0) return null

  const selected = selectedNode ? nodes.find(n => n.id === selectedNode) : null

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Header */}
      <div className="text-center mb-3">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--muted-foreground)]">
          Community Constellation
        </h2>
        <p className="text-[9px] text-[var(--muted-foreground)] font-body-serif italic">
          Drag to explore &bull; Scroll to zoom &bull; Click a node to inspect
        </p>
      </div>

      {/* Map viewport */}
      <div
        ref={viewportRef}
        className="relative overflow-hidden border border-[var(--border)] bg-[#0a0e1a] select-none"
        style={{ height: containerSize.height, cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* SVG world */}
        <svg
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: '0 0',
            transition: isDragging ? 'none' : 'transform 0.15s ease-out',
          }}
        >
          <defs>
            {Object.entries(CATEGORIES).map(([key, config]) => (
              <radialGradient key={key} id={`region-glow-${key}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={config.glow} stopOpacity={0.12} />
                <stop offset="70%" stopColor={config.glow} stopOpacity={0.03} />
                <stop offset="100%" stopColor={config.glow} stopOpacity={0} />
              </radialGradient>
            ))}
            <filter id="node-glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Star field */}
          {stars.map((s, i) => (
            <circle key={`star-${i}`} cx={s.x} cy={s.y} r={s.r} fill="white" opacity={s.opacity} />
          ))}

          {/* Category region glows */}
          {Object.entries(CATEGORIES).map(([key, config]) => {
            const angleRad = (config.regionAngle * Math.PI) / 180
            const rx = MAP_WIDTH / 2 + Math.cos(angleRad) * 280
            const ry = MAP_HEIGHT / 2 + Math.sin(angleRad) * 280
            return (
              <circle key={`glow-${key}`} cx={rx} cy={ry} r={220} fill={`url(#region-glow-${key})`} />
            )
          })}

          {/* Region labels */}
          {regionLabels.map(r => (
            <text
              key={r.key}
              x={r.x}
              y={r.y}
              textAnchor="middle"
              fill={r.color}
              fontSize="14"
              fontWeight="bold"
              letterSpacing="0.15em"
              opacity={0.5}
              style={{ textTransform: 'uppercase', fontFamily: 'var(--font-headline, sans-serif)' }}
            >
              {r.label}
            </text>
          ))}

          {/* Constellation lines */}
          {links.map((link, i) => {
            const source = nodes.find(n => n.id === (typeof link.source === 'string' ? link.source : (link.source as MapNode)?.id))
            const target = nodes.find(n => n.id === (typeof link.target === 'string' ? link.target : (link.target as MapNode)?.id))
            if (!source?.x || !source?.y || !target?.x || !target?.y) return null
            const color = CATEGORIES[source.category]?.color || '#ffffff'
            return (
              <line
                key={`link-${i}`}
                x1={source.x} y1={source.y}
                x2={target.x} y2={target.y}
                stroke={color} strokeWidth={0.8} strokeOpacity={0.2} strokeDasharray="4 6"
              />
            )
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            if (!node.x || !node.y) return null
            const config = CATEGORIES[node.category] || CATEGORIES.discussions
            const isHovered = hoveredNode === node.id
            const isSelected = selectedNode === node.id

            return (
              <g
                key={node.id}
                className="cursor-pointer"
                onClick={(e) => { e.stopPropagation(); handleNodeClick(node) }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Pulse ring */}
                {(isHovered || isSelected) && (
                  <>
                    <circle cx={node.x} cy={node.y} r={node.radius + 12} fill="none" stroke={config.color} strokeWidth={1} opacity={0.3}>
                      <animate attributeName="r" from={node.radius + 8} to={node.radius + 20} dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.4" to="0" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx={node.x} cy={node.y} r={node.radius + 6} fill="none" stroke={config.color} strokeWidth={1.5} opacity={0.5} />
                  </>
                )}

                {/* Main node */}
                <circle
                  cx={node.x} cy={node.y} r={node.radius}
                  fill={config.color}
                  opacity={isHovered || isSelected ? 1 : 0.7}
                  filter={isHovered || isSelected ? 'url(#node-glow)' : undefined}
                  className="transition-opacity duration-200"
                />

                {/* Inner dot */}
                <circle cx={node.x} cy={node.y} r={Math.max(node.radius * 0.3, 3)} fill="white" opacity={0.6} />

                {/* Tiny label */}
                <text
                  x={node.x} y={node.y + node.radius + 14}
                  textAnchor="middle" fill="white" fontSize="8"
                  opacity={isHovered || isSelected ? 0.9 : 0.35}
                  className="pointer-events-none transition-opacity duration-200"
                  style={{ fontFamily: 'var(--font-headline, sans-serif)', fontWeight: 700 }}
                >
                  {node.label.length > 20 ? node.label.slice(0, 18) + '...' : node.label}
                </text>
              </g>
            )
          })}
        </svg>

        {/* ── Controls ─────────────────────────────────────────────────── */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          <button onClick={zoomIn} className="w-8 h-8 flex items-center justify-center rounded bg-black/50 border border-white/20 text-white/70 hover:text-white hover:bg-black/70 transition-colors" title="Zoom in">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button onClick={zoomOut} className="w-8 h-8 flex items-center justify-center rounded bg-black/50 border border-white/20 text-white/70 hover:text-white hover:bg-black/70 transition-colors" title="Zoom out">
            <ZoomOut className="w-4 h-4" />
          </button>
          <button onClick={resetView} className="w-8 h-8 flex items-center justify-center rounded bg-black/50 border border-white/20 text-white/70 hover:text-white hover:bg-black/70 transition-colors" title="Reset view">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Drag hint */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[9px] text-white/30 z-10">
          <Move className="w-3 h-3" />
          <span>Drag to pan &bull; Scroll to zoom</span>
        </div>

        {/* ── Selected node detail panel ───────────────────────────────── */}
        {selected && selected.x && selected.y && (
          <div className="absolute bottom-3 right-3 w-64 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-3 z-10">
            <div className="flex items-start gap-2 mb-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0 mt-0.5"
                style={{ backgroundColor: CATEGORIES[selected.category]?.color || '#fff' }}
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-white leading-tight truncate">
                  {selected.label}
                </p>
                <p className="text-[10px] text-white/50 mt-0.5">
                  {selected.userName} &bull; {CATEGORIES[selected.category]?.label || selected.category}
                  {selected.engagement > 0 && ` \u2022 ${selected.engagement} engagement`}
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push(selected.targetUrl)}
              className="w-full mt-1 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white bg-white/10 border border-white/20 rounded hover:bg-white/20 transition-colors"
            >
              View &rarr;
            </button>
          </div>
        )}

        {/* ── Category legend ─────────────────────────────────────────── */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
          {Object.entries(CATEGORIES).map(([key, config]) => (
            <span key={key} className="flex items-center gap-1 text-[8px] text-white/50">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: config.color }} />
              {config.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
