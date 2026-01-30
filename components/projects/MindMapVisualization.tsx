'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Network, Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCcw,
  Filter, Eye, EyeOff, Layers, Download, Share2, Grid3x3,
  Sparkles, TrendingUp, Activity, AlertCircle, Target, Type
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import type { CanvasNode, CanvasConnection, NodeType, ConnectionType } from './InfiniteCanvasWorkspace'

// Dynamically import ForceGraph2D with SSR disabled
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center space-y-3">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"/>
        <p className="text-sm font-medium text-theme-muted">Loading graph...</p>
      </div>
    </div>
  )
})

interface MindMapVisualizationProps {
  nodes: CanvasNode[]
  connections: CanvasConnection[]
  onNodeClick?: (node: CanvasNode) => void
  onConnectionClick?: (connection: CanvasConnection) => void
  height?: number
  width?: number
}

interface GraphNode {
  id: string
  name: string
  val: number // Size of node
  type: NodeType
  color: string
  originalNode: CanvasNode
}

interface GraphLink {
  source: string
  target: string
  type: ConnectionType
  color: string
  label?: string
  originalConnection: CanvasConnection
}

const NODE_TYPE_CONFIG = {
  idea: { icon: '💡', color: '#FCD34D', size: 15, label: 'Idea' },
  task: { icon: '✅', color: '#60A5FA', size: 12, label: 'Task' },
  milestone: { icon: '🎯', color: '#F472B6', size: 18, label: 'Milestone' },
  resource: { icon: '📦', color: '#A78BFA', size: 10, label: 'Resource' },
  note: { icon: '📝', color: '#34D399', size: 8, label: 'Note' },
  decision: { icon: '🎲', color: '#FB923C', size: 14, label: 'Decision' },
  risk: { icon: '⚠️', color: '#EF4444', size: 16, label: 'Risk' },
  opportunity: { icon: '🌟', color: '#10B981', size: 16, label: 'Opportunity' }
}

const CONNECTION_TYPE_CONFIG = {
  'related': { color: '#94A3B8', width: 1, dash: [5, 5] },
  'depends': { color: '#3B82F6', width: 2, dash: [] },
  'leads-to': { color: '#10B981', width: 2, dash: [10, 5] },
  'blocks': { color: '#EF4444', width: 3, dash: [] },
  'supports': { color: '#8B5CF6', width: 2, dash: [8, 4] },
  'conflicts': { color: '#F59E0B', width: 2, dash: [2, 4] }
}

export function MindMapVisualization({
  nodes,
  connections,
  onNodeClick,
  onConnectionClick,
  height = 600,
  width = 800
}: MindMapVisualizationProps) {
  const graphRef = useRef<any>(null)
  const [graphData, setGraphData] = useState<{ nodes: GraphNode[], links: GraphLink[] }>({ nodes: [], links: [] })
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [selectedConnection, setSelectedConnection] = useState<string | null>(null)
  const [highlightNodes, setHighlightNodes] = useState<Set<string>>(new Set())
  const [highlightLinks, setHighlightLinks] = useState<Set<string>>(new Set())
  const [hoverNode, setHoverNode] = useState<GraphNode | null>(null)

  // Display options
  const [showLabels, setShowLabels] = useState(true)
  const [showParticles, setShowParticles] = useState(false)
  const [enablePhysics, setEnablePhysics] = useState(true)
  const [colorByType, setColorByType] = useState(true)
  const [filterTypes, setFilterTypes] = useState<Set<NodeType>>(new Set())
  const [layoutMode, setLayoutMode] = useState<'force' | 'circular' | 'hierarchical'>('force')

  // Stats
  const [stats, setStats] = useState({
    totalNodes: 0,
    totalConnections: 0,
    clusters: 0,
    avgConnections: 0
  })

  // Convert canvas data to graph format
  useEffect(() => {
    const visibleNodes = nodes.filter(n => n.visible && !filterTypes.has(n.type))

    const graphNodes: GraphNode[] = visibleNodes.map(node => {
      const config = NODE_TYPE_CONFIG[node.type]
      return {
        id: node.id,
        name: node.content.slice(0, 30) + (node.content.length > 30 ? '...' : ''),
        val: config.size,
        type: node.type,
        color: colorByType ? config.color : node.color,
        originalNode: node
      }
    })

    const nodeIds = new Set(graphNodes.map(n => n.id))
    const graphLinks: GraphLink[] = connections
      .filter(conn => nodeIds.has(conn.from) && nodeIds.has(conn.to))
      .map(conn => {
        const config = CONNECTION_TYPE_CONFIG[conn.type]
        return {
          source: conn.from,
          target: conn.to,
          type: conn.type,
          color: conn.color || config.color,
          label: conn.label,
          originalConnection: conn
        }
      })

    setGraphData({ nodes: graphNodes, links: graphLinks })

    // Calculate stats
    const avgConns = graphLinks.length > 0 ? (graphLinks.length * 2 / graphNodes.length).toFixed(1) : '0'
    setStats({
      totalNodes: graphNodes.length,
      totalConnections: graphLinks.length,
      clusters: estimateClusters(graphNodes, graphLinks),
      avgConnections: parseFloat(avgConns)
    })
  }, [nodes, connections, filterTypes, colorByType])

  // Estimate number of clusters using connected components
  const estimateClusters = (nodes: GraphNode[], links: GraphLink[]) => {
    if (nodes.length === 0) return 0

    const adjacency = new Map<string, Set<string>>()
    nodes.forEach(n => adjacency.set(n.id, new Set()))

    links.forEach(l => {
      adjacency.get(l.source as string)?.add(l.target as string)
      adjacency.get(l.target as string)?.add(l.source as string)
    })

    const visited = new Set<string>()
    let clusters = 0

    const dfs = (nodeId: string) => {
      visited.add(nodeId)
      adjacency.get(nodeId)?.forEach(neighbor => {
        if (!visited.has(neighbor)) dfs(neighbor)
      })
    }

    nodes.forEach(node => {
      if (!visited.has(node.id)) {
        dfs(node.id)
        clusters++
      }
    })

    return clusters
  }

  // Handle node hover
  const handleNodeHover = useCallback((node: GraphNode | null) => {
    setHoverNode(node)

    if (!node) {
      setHighlightNodes(new Set())
      setHighlightLinks(new Set())
      return
    }

    const neighbors = new Set<string>()
    const linkSet = new Set<string>()

    graphData.links.forEach(link => {
      if (link.source === node.id || (link.source as any).id === node.id) {
        const targetId = typeof link.target === 'string' ? link.target : (link.target as any).id
        neighbors.add(targetId)
        linkSet.add(`${link.source}-${link.target}`)
      }
      if (link.target === node.id || (link.target as any).id === node.id) {
        const sourceId = typeof link.source === 'string' ? link.source : (link.source as any).id
        neighbors.add(sourceId)
        linkSet.add(`${link.source}-${link.target}`)
      }
    })

    neighbors.add(node.id)
    setHighlightNodes(neighbors)
    setHighlightLinks(linkSet)
  }, [graphData.links])

  // Handle node click
  const handleNodeClick = useCallback((node: GraphNode) => {
    setSelectedNode(node.id === selectedNode ? null : node.id)
    onNodeClick?.(node.originalNode)
  }, [selectedNode, onNodeClick])

  // Handle link click
  const handleLinkClick = useCallback((link: GraphLink) => {
    const linkId = `${link.source}-${link.target}`
    setSelectedConnection(linkId === selectedConnection ? null : linkId)
    onConnectionClick?.(link.originalConnection)
  }, [selectedConnection, onConnectionClick])

  // Graph controls
  const zoomToFit = () => graphRef.current?.zoomToFit(400)
  const centerGraph = () => graphRef.current?.centerAt(0, 0, 1000)

  // Toggle filter
  const toggleFilter = (type: NodeType) => {
    setFilterTypes(prev => {
      const next = new Set(prev)
      if (next.has(type)) {
        next.delete(type)
      } else {
        next.add(type)
      }
      return next
    })
  }

  // Export graph as image
  const exportGraph = () => {
    const canvas = graphRef.current?.renderer()?.domElement
    if (!canvas) return

    const link = document.createElement('a')
    link.download = `mindmap-${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  // Custom node rendering
  const paintNode = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const label = node.name
    const fontSize = 12 / globalScale
    const config = NODE_TYPE_CONFIG[node.type as NodeType]
    const isHighlight = highlightNodes.size === 0 || highlightNodes.has(node.id)
    const isSelected = selectedNode === node.id

    // Draw node circle
    ctx.beginPath()
    ctx.arc(node.x, node.y, node.val, 0, 2 * Math.PI)
    ctx.fillStyle = isHighlight ? node.color : `${node.color}40`
    ctx.fill()

    if (isSelected) {
      ctx.strokeStyle = '#8B5CF6'
      ctx.lineWidth = 3 / globalScale
      ctx.stroke()
    }

    // Draw icon
    ctx.font = `${node.val}px Arial`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(config.icon, node.x, node.y)

    // Draw label
    if (showLabels && (globalScale > 1 || isSelected)) {
      ctx.font = `${fontSize}px Sans-Serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      ctx.fillStyle = isHighlight ? '#1F2937' : '#9CA3AF'
      ctx.fillText(label, node.x, node.y + node.val + 2)
    }
  }, [highlightNodes, selectedNode, showLabels])

  // Custom link rendering
  const paintLink = useCallback((link: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const linkId = `${link.source.id}-${link.target.id}`
    const isHighlight = highlightLinks.size === 0 || highlightLinks.has(linkId)
    const isSelected = selectedConnection === linkId
    const config = CONNECTION_TYPE_CONFIG[link.type as ConnectionType]

    ctx.beginPath()
    ctx.moveTo(link.source.x, link.source.y)
    ctx.lineTo(link.target.x, link.target.y)

    ctx.strokeStyle = isHighlight ? link.color : `${link.color}40`
    ctx.lineWidth = (isSelected ? config.width * 2 : config.width) / globalScale

    if (config.dash.length > 0) {
      ctx.setLineDash(config.dash.map(d => d / globalScale))
    } else {
      ctx.setLineDash([])
    }

    ctx.stroke()
    ctx.setLineDash([])

    // Draw arrow
    if (isHighlight) {
      const arrowLength = 10 / globalScale
      const arrowWidth = 6 / globalScale
      const dx = link.target.x - link.source.x
      const dy = link.target.y - link.source.y
      const angle = Math.atan2(dy, dx)
      const distance = Math.sqrt(dx * dx + dy * dy)
      const arrowX = link.source.x + (distance - link.target.val) * Math.cos(angle)
      const arrowY = link.source.y + (distance - link.target.val) * Math.sin(angle)

      ctx.beginPath()
      ctx.moveTo(arrowX, arrowY)
      ctx.lineTo(
        arrowX - arrowLength * Math.cos(angle - Math.PI / 6),
        arrowY - arrowLength * Math.sin(angle - Math.PI / 6)
      )
      ctx.lineTo(
        arrowX - arrowLength * Math.cos(angle + Math.PI / 6),
        arrowY - arrowLength * Math.sin(angle + Math.PI / 6)
      )
      ctx.closePath()
      ctx.fillStyle = link.color
      ctx.fill()
    }
  }, [highlightLinks, selectedConnection])

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Toolbar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-4">
        <Card className="flex-1 max-w-4xl">
          <CardContent className="p-3 flex items-center gap-2 flex-wrap">
            {/* View controls */}
            <div className="flex items-center gap-1 border-r pr-2">
              <Button size="sm" variant="ghost" onClick={zoomToFit} title="Fit to View">
                <Maximize2 className="w-4 h-4"/>
              </Button>
              <Button size="sm" variant="ghost" onClick={centerGraph} title="Center">
                <RotateCcw className="w-4 h-4"/>
              </Button>
            </div>

            {/* Display options */}
            <div className="flex items-center gap-1 border-r pr-2">
              <Button
                size="sm"
                variant={showLabels ? 'primary' : 'ghost'}
                onClick={() => setShowLabels(!showLabels)}
                title="Toggle Labels"
              >
                <Type className="w-4 h-4"/>
              </Button>
              <Button
                size="sm"
                variant={showParticles ? 'primary' : 'ghost'}
                onClick={() => setShowParticles(!showParticles)}
                title="Toggle Particles"
              >
                <Sparkles className="w-4 h-4"/>
              </Button>
              <Button
                size="sm"
                variant={enablePhysics ? 'primary' : 'ghost'}
                onClick={() => setEnablePhysics(!enablePhysics)}
                title="Toggle Physics"
              >
                <Activity className="w-4 h-4"/>
              </Button>
            </div>

            {/* Node type filters */}
            <div className="flex items-center gap-1 border-r pr-2 flex-wrap">
              {(Object.keys(NODE_TYPE_CONFIG) as NodeType[]).slice(0, 4).map(type => {
                const config = NODE_TYPE_CONFIG[type]
                const isFiltered = filterTypes.has(type)
                return (
                  <button
                    key={type}
                    onClick={() => toggleFilter(type)}
                    className={`px-2 py-1 rounded text-xs transition-all ${
                      isFiltered
                        ? 'opacity-30 grayscale'
                        : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: config.color }}
                    title={config.label}
                  >
                    {config.icon}
                  </button>
                )
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <Button size="sm" variant="ghost" onClick={exportGraph} title="Export Image">
                <Download className="w-4 h-4"/>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardContent className="p-3 flex items-center gap-3">
            <div className="text-center">
              <div className="text-xs text-theme-muted">Nodes</div>
              <div className="text-sm font-bold">{stats.totalNodes}</div>
            </div>
            <div className="w-px h-8 bg-[var(--border)]"/>
            <div className="text-center">
              <div className="text-xs text-theme-muted">Links</div>
              <div className="text-sm font-bold">{stats.totalConnections}</div>
            </div>
            <div className="w-px h-8 bg-[var(--border)]"/>
            <div className="text-center">
              <div className="text-xs text-theme-muted">Clusters</div>
              <div className="text-sm font-bold">{stats.clusters}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graph */}
      <div className="absolute inset-0 pt-20">
        {typeof window !== 'undefined' && (
          <ForceGraph2D
            ref={graphRef}
            graphData={graphData as any}
            nodeLabel="name"
            nodeVal="val"
            nodeColor="color"
            linkColor="color"
            linkDirectionalParticles={showParticles ? 2 : 0}
            linkDirectionalParticleSpeed={0.005}
            onNodeHover={handleNodeHover as any}
            onNodeClick={handleNodeClick as any}
            onLinkClick={handleLinkClick as any}
            nodeCanvasObject={paintNode as any}
            linkCanvasObject={paintLink as any}
            cooldownTicks={enablePhysics ? undefined : 0}
            d3AlphaDecay={0.02}
            d3VelocityDecay={0.3}
            width={width}
            height={height - 100}
          />
        )}
      </div>

      {/* Hover tooltip */}
      <AnimatePresence>
        {hoverNode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute bottom-4 left-4 z-10 max-w-xs"
          >
            <Card>
              <CardContent className="p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{NODE_TYPE_CONFIG[hoverNode.type].icon}</span>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold">{hoverNode.originalNode.content}</h4>
                    <p className="text-xs text-theme-muted">{NODE_TYPE_CONFIG[hoverNode.type].label}</p>
                  </div>
                </div>

                {hoverNode.originalNode.metadata && (
                  <div className="flex gap-1 flex-wrap">
                    {hoverNode.originalNode.metadata.priority && (
                      <Badge size="sm" variant="warning">
                        {hoverNode.originalNode.metadata.priority}
                      </Badge>
                    )}
                    {hoverNode.originalNode.metadata.status && (
                      <Badge size="sm" variant="primary">
                        {hoverNode.originalNode.metadata.status}
                      </Badge>
                    )}
                  </div>
                )}

                <div className="text-xs text-theme-muted">
                  {highlightNodes.size - 1} connections
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {graphData.nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Card className="max-w-md">
            <CardContent className="p-6 text-center space-y-3">
              <Network className="w-12 h-12 mx-auto text-theme-muted"/>
              <h3 className="text-lg font-bold">No Nodes to Visualize</h3>
              <p className="text-sm text-theme-muted">
                Create nodes on the canvas to see them visualized as a mind map.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
