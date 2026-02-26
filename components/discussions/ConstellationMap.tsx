'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { forceSimulation, forceManyBody, forceCenter, forceCollide, forceLink, type SimulationNodeDatum, type SimulationLinkDatum } from 'd3-force'
import type { ActivityItem } from './ActivityCard'

interface ConstellationMapProps {
  items: ActivityItem[]
}

interface ConstellationNode extends SimulationNodeDatum {
  id: string
  label: string
  category: string
  engagement: number
  radius: number
  targetUrl: string
}

interface ConstellationLink extends SimulationLinkDatum<ConstellationNode> {
  strength: number
}

const CATEGORY_COLOR: Record<string, string> = {
  discussions: 'var(--primary)',
  articles: 'var(--accent)',
  projects: 'var(--secondary)',
  forums: 'var(--primary)',
  members: 'var(--accent)',
  events: 'var(--secondary)',
}

export function ConstellationMap({ items }: ConstellationMapProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [nodes, setNodes] = useState<ConstellationNode[]>([])
  const [links, setLinks] = useState<ConstellationLink[]>([])
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 })
  const simulationRef = useRef<ReturnType<typeof forceSimulation<ConstellationNode>> | null>(null)

  // Measure container
  useEffect(() => {
    const updateSize = () => {
      if (svgRef.current?.parentElement) {
        const rect = svgRef.current.parentElement.getBoundingClientRect()
        setDimensions({ width: rect.width, height: Math.min(rect.width * 0.5, 450) })
      }
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // Build nodes + links from items
  useEffect(() => {
    if (items.length === 0) return

    // Deduplicate by id, take top 30 for performance
    const unique = items.slice(0, 30)
    const minEngagement = 1
    const maxEngagement = Math.max(...unique.map(i => i.engagement), 1)

    const newNodes: ConstellationNode[] = unique.map((item) => {
      const normalized = (item.engagement - minEngagement) / (maxEngagement - minEngagement || 1)
      return {
        id: item.id,
        label: item.title.length > 30 ? item.title.slice(0, 28) + '...' : item.title,
        category: item.category,
        engagement: item.engagement,
        radius: 6 + normalized * 14, // 6px to 20px
        targetUrl: item.targetUrl,
      }
    })

    // Create links between same-category items (nearby in time)
    const newLinks: ConstellationLink[] = []
    for (let i = 0; i < newNodes.length; i++) {
      for (let j = i + 1; j < Math.min(i + 4, newNodes.length); j++) {
        if (newNodes[i].category === newNodes[j].category) {
          newLinks.push({
            source: newNodes[i].id,
            target: newNodes[j].id,
            strength: 0.3,
          })
        }
      }
    }

    setNodes(newNodes)
    setLinks(newLinks)
  }, [items])

  // Run d3-force simulation
  useEffect(() => {
    if (nodes.length === 0) return

    // Stop existing simulation
    if (simulationRef.current) {
      simulationRef.current.stop()
    }

    const sim = forceSimulation<ConstellationNode>(nodes)
      .force('charge', forceManyBody<ConstellationNode>().strength(-30))
      .force('center', forceCenter(dimensions.width / 2, dimensions.height / 2))
      .force('collide', forceCollide<ConstellationNode>().radius(d => d.radius + 4))
      .force('link', forceLink<ConstellationNode, ConstellationLink>(links).id(d => d.id).strength(0.1).distance(60))
      .alpha(0.8)
      .alphaDecay(0.02)

    sim.on('tick', () => {
      setNodes(prev => prev.map((n, i) => ({
        ...n,
        x: sim.nodes()[i]?.x,
        y: sim.nodes()[i]?.y,
      })))
    })

    simulationRef.current = sim

    return () => { sim.stop() }
  }, [nodes.length, links.length, dimensions.width, dimensions.height])

  const handleNodeClick = useCallback((url: string) => {
    window.location.href = url
  }, [])

  if (items.length === 0) {
    return null
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div className="text-center mb-3">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--muted-foreground)]">
          Discussion Constellation
        </h2>
        <p className="text-[9px] text-[var(--muted-foreground)] font-body-serif italic">
          Threads connected by category. Larger nodes have more engagement.
        </p>
      </div>

      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full"
        style={{ minHeight: '250px' }}
      >
        {/* Links */}
        {links.map((link, i) => {
          const source = nodes.find(n => n.id === (typeof link.source === 'string' ? link.source : (link.source as ConstellationNode)?.id))
          const target = nodes.find(n => n.id === (typeof link.target === 'string' ? link.target : (link.target as ConstellationNode)?.id))
          if (!source?.x || !source?.y || !target?.x || !target?.y) return null
          return (
            <line
              key={`link-${i}`}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke="var(--border)"
              strokeWidth={1}
              strokeOpacity={0.4}
              strokeDasharray="3 3"
            />
          )
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          if (!node.x || !node.y) return null
          const color = CATEGORY_COLOR[node.category] || 'var(--foreground)'
          const isHovered = hoveredNode === node.id

          return (
            <g
              key={node.id}
              className="cursor-pointer constellation-node"
              onClick={() => handleNodeClick(node.targetUrl)}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Outer glow ring on hover */}
              {isHovered && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.radius + 6}
                  fill="none"
                  stroke={color}
                  strokeWidth={1}
                  opacity={0.5}
                />
              )}

              {/* Node circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.radius}
                fill={color}
                opacity={isHovered ? 1 : 0.7}
                className="transition-opacity duration-200"
              />

              {/* Label on hover */}
              {isHovered && (
                <foreignObject
                  x={node.x - 70}
                  y={node.y + node.radius + 4}
                  width={140}
                  height={50}
                >
                  <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg px-2 py-1 text-center shadow-lg">
                    <p className="text-[9px] font-bold text-[var(--foreground)] truncate">
                      {node.label}
                    </p>
                    <p className="text-[8px] text-[var(--muted-foreground)]">
                      {node.category} {node.engagement > 0 ? `• ${node.engagement}` : ''}
                    </p>
                  </div>
                </foreignObject>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
