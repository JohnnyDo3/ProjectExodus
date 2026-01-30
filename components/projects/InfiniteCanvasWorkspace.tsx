'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import {
  ZoomIn, ZoomOut, Maximize2, Minimize2, Grid3x3, Plus, Trash2,
  Move, Link2, Circle, Square, Diamond, Star, Type, Image as ImageIcon,
  Palette, Save, Download, Upload, Undo, Redo, Lock, Unlock,
  Eye, EyeOff, Layers, AlignCenter, Copy, Scissors
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

// Node types for mind mapping
export type NodeType = 'idea' | 'task' | 'milestone' | 'resource' | 'note' | 'decision' | 'risk' | 'opportunity'
export type ConnectionType = 'related' | 'depends' | 'leads-to' | 'blocks' | 'supports' | 'conflicts'

export interface CanvasNode {
  id: string
  type: NodeType
  x: number
  y: number
  width: number
  height: number
  content: string
  color: string
  locked: boolean
  visible: boolean
  metadata?: {
    priority?: 'low' | 'medium' | 'high'
    status?: 'todo' | 'in-progress' | 'done'
    assignee?: string
    dueDate?: string
    tags?: string[]
  }
}

export interface CanvasConnection {
  id: string
  from: string
  to: string
  type: ConnectionType
  label?: string
  color?: string
}

interface InfiniteCanvasWorkspaceProps {
  projectId?: string
  initialNodes?: CanvasNode[]
  initialConnections?: CanvasConnection[]
  onSave?: (nodes: CanvasNode[], connections: CanvasConnection[]) => void
  readOnly?: boolean
}

const NODE_TYPE_CONFIG = {
  idea: { icon: '💡', color: '#FCD34D', label: 'Idea' },
  task: { icon: '✅', color: '#60A5FA', label: 'Task' },
  milestone: { icon: '🎯', color: '#F472B6', label: 'Milestone' },
  resource: { icon: '📦', color: '#A78BFA', label: 'Resource' },
  note: { icon: '📝', color: '#34D399', label: 'Note' },
  decision: { icon: '🎲', color: '#FB923C', label: 'Decision' },
  risk: { icon: '⚠️', color: '#EF4444', label: 'Risk' },
  opportunity: { icon: '🌟', color: '#10B981', label: 'Opportunity' }
}

const CONNECTION_TYPE_CONFIG = {
  'related': { color: '#94A3B8', dash: '5,5', label: 'Related to' },
  'depends': { color: '#3B82F6', dash: '0', label: 'Depends on' },
  'leads-to': { color: '#10B981', dash: '10,5', label: 'Leads to' },
  'blocks': { color: '#EF4444', dash: '3,3', label: 'Blocks' },
  'supports': { color: '#8B5CF6', dash: '8,4', label: 'Supports' },
  'conflicts': { color: '#F59E0B', dash: '2,4', label: 'Conflicts with' }
}

export function InfiniteCanvasWorkspace({
  projectId,
  initialNodes = [],
  initialConnections = [],
  onSave,
  readOnly = false
}: InfiniteCanvasWorkspaceProps) {
  // Canvas state
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [nodes, setNodes] = useState<CanvasNode[]>(initialNodes)
  const [connections, setConnections] = useState<CanvasConnection[]>(initialConnections)

  // Interaction state
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isPanning, setIsPanning] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectFrom, setConnectFrom] = useState<string | null>(null)
  const [tempConnection, setTempConnection] = useState<{ x: number, y: number } | null>(null)

  // UI state
  const [showGrid, setShowGrid] = useState(true)
  const [showMinimap, setShowMinimap] = useState(true)
  const [activeNodeType, setActiveNodeType] = useState<NodeType>('idea')
  const [activeConnectionType, setActiveConnectionType] = useState<ConnectionType>('related')
  const [history, setHistory] = useState<{ nodes: CanvasNode[], connections: CanvasConnection[] }[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const canvasRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  // Add node to canvas
  const addNode = useCallback((x: number, y: number, type: NodeType = activeNodeType) => {
    const newNode: CanvasNode = {
      id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      x: (x - pan.x) / zoom,
      y: (y - pan.y) / zoom,
      width: 200,
      height: 120,
      content: `New ${NODE_TYPE_CONFIG[type].label}`,
      color: NODE_TYPE_CONFIG[type].color,
      locked: false,
      visible: true,
      metadata: {}
    }

    setNodes(prev => [...prev, newNode])
    saveToHistory([...nodes, newNode], connections)
  }, [activeNodeType, zoom, pan, nodes, connections])

  // Delete node
  const deleteNode = useCallback((nodeId: string) => {
    setNodes(prev => prev.filter(n => n.id !== nodeId))
    setConnections(prev => prev.filter(c => c.from !== nodeId && c.to !== nodeId))
    setSelectedNode(null)
  }, [])

  // Update node
  const updateNode = useCallback((nodeId: string, updates: Partial<CanvasNode>) => {
    setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, ...updates } : n))
  }, [])

  // Add connection
  const addConnection = useCallback((fromId: string, toId: string) => {
    if (fromId === toId) return

    const newConnection: CanvasConnection = {
      id: `conn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      from: fromId,
      to: toId,
      type: activeConnectionType,
      color: CONNECTION_TYPE_CONFIG[activeConnectionType].color
    }

    setConnections(prev => [...prev, newConnection])
    setIsConnecting(false)
    setConnectFrom(null)
    setTempConnection(null)
  }, [activeConnectionType])

  // Delete connection
  const deleteConnection = useCallback((connId: string) => {
    setConnections(prev => prev.filter(c => c.id !== connId))
  }, [])

  // Zoom controls
  const zoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3))
  const zoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.3))
  const resetView = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  // History
  const saveToHistory = (nodes: CanvasNode[], connections: CanvasConnection[]) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push({ nodes: [...nodes], connections: [...connections] })
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const undo = () => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1]
      setNodes(prevState.nodes)
      setConnections(prevState.connections)
      setHistoryIndex(historyIndex - 1)
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1]
      setNodes(nextState.nodes)
      setConnections(nextState.connections)
      setHistoryIndex(historyIndex + 1)
    }
  }

  // Handle canvas click
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (readOnly) return

    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // If in connect mode and clicked on empty space, cancel
    if (isConnecting) {
      setIsConnecting(false)
      setConnectFrom(null)
      setTempConnection(null)
      return
    }

    // Double click to create node
    if (e.detail === 2) {
      addNode(x, y)
    }
  }

  // Handle save
  const handleSave = () => {
    onSave?.(nodes, connections)
  }

  // Export/Import
  const exportCanvas = () => {
    const data = { nodes, connections }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `canvas-${projectId || 'untitled'}-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importCanvas = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string)
        if (data.nodes && data.connections) {
          setNodes(data.nodes)
          setConnections(data.connections)
        }
      } catch (err) {
        console.error('Failed to import canvas:', err)
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 overflow-hidden">
      {/* Toolbar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-4">
        <Card className="flex-1 max-w-4xl">
          <CardContent className="p-3 flex items-center gap-2 flex-wrap">
            {/* Zoom controls */}
            <div className="flex items-center gap-1 border-r pr-2">
              <Button size="sm" variant="ghost" onClick={zoomOut} title="Zoom Out">
                <ZoomOut className="w-4 h-4"/>
              </Button>
              <span className="text-xs font-mono min-w-12 text-center">{Math.round(zoom * 100)}%</span>
              <Button size="sm" variant="ghost" onClick={zoomIn} title="Zoom In">
                <ZoomIn className="w-4 h-4"/>
              </Button>
              <Button size="sm" variant="ghost" onClick={resetView} title="Reset View">
                <Maximize2 className="w-4 h-4"/>
              </Button>
            </div>

            {/* Node type selector */}
            {!readOnly && (
              <div className="flex items-center gap-1 border-r pr-2">
                {(Object.keys(NODE_TYPE_CONFIG) as NodeType[]).map(type => (
                  <button
                    key={type}
                    onClick={() => setActiveNodeType(type)}
                    className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                      activeNodeType === type
                        ? 'bg-purple-500 text-white'
                        : 'hover:bg-[var(--muted)] text-theme-muted'
                    }`}
                    title={NODE_TYPE_CONFIG[type].label}
                  >
                    {NODE_TYPE_CONFIG[type].icon}
                  </button>
                ))}
              </div>
            )}

            {/* Tools */}
            {!readOnly && (
              <div className="flex items-center gap-1 border-r pr-2">
                <Button
                  size="sm"
                  variant={isConnecting ? 'primary' : 'ghost'}
                  onClick={() => setIsConnecting(!isConnecting)}
                  title="Connect Nodes"
                >
                  <Link2 className="w-4 h-4"/>
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setShowGrid(!showGrid)} title="Toggle Grid">
                  <Grid3x3 className="w-4 h-4"/>
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setShowMinimap(!showMinimap)} title="Toggle Minimap">
                  <Layers className="w-4 h-4"/>
                </Button>
              </div>
            )}

            {/* History */}
            {!readOnly && (
              <div className="flex items-center gap-1 border-r pr-2">
                <Button size="sm" variant="ghost" onClick={undo} disabled={historyIndex <= 0} title="Undo">
                  <Undo className="w-4 h-4"/>
                </Button>
                <Button size="sm" variant="ghost" onClick={redo} disabled={historyIndex >= history.length - 1} title="Redo">
                  <Redo className="w-4 h-4"/>
                </Button>
              </div>
            )}

            {/* Save/Export */}
            <div className="flex items-center gap-1">
              {!readOnly && (
                <>
                  <Button size="sm" variant="primary" onClick={handleSave} title="Save">
                    <Save className="w-4 h-4 mr-1"/>
                    Save
                  </Button>
                  <Button size="sm" variant="ghost" onClick={exportCanvas} title="Export">
                    <Download className="w-4 h-4"/>
                  </Button>
                  <label className="cursor-pointer inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-lg font-medium transition-all duration-200 hover:bg-[var(--muted)] text-[var(--foreground)] bg-transparent" title="Import">
                    <Upload className="w-4 h-4"/>
                    <input type="file" accept=".json" onChange={importCanvas} className="hidden"/>
                  </label>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardContent className="p-3 flex items-center gap-3">
            <div className="text-center">
              <div className="text-xs text-theme-muted">Nodes</div>
              <div className="text-sm font-bold">{nodes.length}</div>
            </div>
            <div className="w-px h-8 bg-[var(--border)]"/>
            <div className="text-center">
              <div className="text-xs text-theme-muted">Links</div>
              <div className="text-sm font-bold">{connections.length}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair"
        onClick={handleCanvasClick}
        style={{
          backgroundImage: showGrid ?
            'radial-gradient(circle, rgba(148, 163, 184, 0.2) 1px, transparent 1px)' : 'none',
          backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
          backgroundPosition: `${pan.x}px ${pan.y}px`
        }}
      >
        {/* SVG for connections */}
        <svg
          ref={svgRef}
          className="absolute inset-0 pointer-events-none"
          style={{ width: '100%', height: '100%' }}
        >
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="currentColor"/>
            </marker>
          </defs>

          {/* Draw connections */}
          {connections.map(conn => {
            const fromNode = nodes.find(n => n.id === conn.from)
            const toNode = nodes.find(n => n.id === conn.to)
            if (!fromNode || !toNode) return null

            const x1 = fromNode.x * zoom + pan.x + (fromNode.width * zoom) / 2
            const y1 = fromNode.y * zoom + pan.y + (fromNode.height * zoom) / 2
            const x2 = toNode.x * zoom + pan.x + (toNode.width * zoom) / 2
            const y2 = toNode.y * zoom + pan.y + (toNode.height * zoom) / 2

            const config = CONNECTION_TYPE_CONFIG[conn.type]

            return (
              <g key={conn.id}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={conn.color || config.color}
                  strokeWidth={2}
                  strokeDasharray={config.dash}
                  markerEnd="url(#arrowhead)"
                  style={{ color: conn.color || config.color }}
                />
                {conn.label && (
                  <text
                    x={(x1 + x2) / 2}
                    y={(y1 + y2) / 2}
                    fill={conn.color || config.color}
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {conn.label}
                  </text>
                )}
              </g>
            )
          })}

          {/* Temp connection while dragging */}
          {tempConnection && connectFrom && (
            <line
              x1={nodes.find(n => n.id === connectFrom)!.x * zoom + pan.x + (nodes.find(n => n.id === connectFrom)!.width * zoom) / 2}
              y1={nodes.find(n => n.id === connectFrom)!.y * zoom + pan.y + (nodes.find(n => n.id === connectFrom)!.height * zoom) / 2}
              x2={tempConnection.x}
              y2={tempConnection.y}
              stroke={CONNECTION_TYPE_CONFIG[activeConnectionType].color}
              strokeWidth={2}
              strokeDasharray="5,5"
              opacity={0.5}
            />
          )}
        </svg>

        {/* Nodes */}
        <AnimatePresence>
          {nodes.filter(n => n.visible).map(node => (
            <CanvasNodeComponent
              key={node.id}
              node={node}
              zoom={zoom}
              pan={pan}
              isSelected={selectedNode === node.id}
              isConnecting={isConnecting}
              onSelect={() => setSelectedNode(node.id)}
              onUpdate={(updates) => updateNode(node.id, updates)}
              onDelete={() => deleteNode(node.id)}
              onConnectStart={() => {
                setConnectFrom(node.id)
                setIsConnecting(true)
              }}
              onConnectEnd={(targetId) => {
                if (connectFrom && targetId !== connectFrom) {
                  addConnection(connectFrom, targetId)
                }
              }}
              onMouseMove={(x, y) => {
                if (isConnecting && connectFrom) {
                  setTempConnection({ x, y })
                }
              }}
              readOnly={readOnly}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Minimap */}
      {showMinimap && (
        <div className="absolute bottom-4 right-4 z-10">
          <Minimap nodes={nodes} connections={connections} zoom={zoom} pan={pan}/>
        </div>
      )}

      {/* Help overlay */}
      {!readOnly && nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Card className="max-w-md">
            <CardContent className="p-6 text-center space-y-3">
              <div className="text-4xl mb-2">🎨</div>
              <h3 className="text-lg font-bold">Welcome to Infinite Canvas</h3>
              <p className="text-sm text-theme-muted">
                Double-click anywhere to create a new node, or select a node type from the toolbar first.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-left pt-2">
                <div><kbd className="px-1 py-0.5 bg-[var(--muted)] rounded">Double Click</kbd> - Create node</div>
                <div><kbd className="px-1 py-0.5 bg-[var(--muted)] rounded">Drag</kbd> - Move node</div>
                <div><kbd className="px-1 py-0.5 bg-[var(--muted)] rounded">Ctrl+Z</kbd> - Undo</div>
                <div><kbd className="px-1 py-0.5 bg-[var(--muted)] rounded">Ctrl+Y</kbd> - Redo</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

// Canvas Node Component
interface CanvasNodeComponentProps {
  node: CanvasNode
  zoom: number
  pan: { x: number, y: number }
  isSelected: boolean
  isConnecting: boolean
  onSelect: () => void
  onUpdate: (updates: Partial<CanvasNode>) => void
  onDelete: () => void
  onConnectStart: () => void
  onConnectEnd: (nodeId: string) => void
  onMouseMove: (x: number, y: number) => void
  readOnly: boolean
}

function CanvasNodeComponent({
  node,
  zoom,
  pan,
  isSelected,
  isConnecting,
  onSelect,
  onUpdate,
  onDelete,
  onConnectStart,
  onConnectEnd,
  onMouseMove,
  readOnly
}: CanvasNodeComponentProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(node.content)

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (node.locked || readOnly) return

    onUpdate({
      x: node.x + info.delta.x / zoom,
      y: node.y + info.delta.y / zoom
    })
  }

  const handleDoubleClick = () => {
    if (!readOnly) {
      setIsEditing(true)
    }
  }

  const handleBlur = () => {
    setIsEditing(false)
    if (editContent !== node.content) {
      onUpdate({ content: editContent })
    }
  }

  const config = NODE_TYPE_CONFIG[node.type]

  return (
    <motion.div
      drag={!node.locked && !readOnly && !isConnecting}
      dragMomentum={false}
      onDrag={handleDrag}
      onClick={(e) => {
        e.stopPropagation()
        if (isConnecting) {
          onConnectEnd(node.id)
        } else {
          onSelect()
        }
      }}
      onDoubleClick={handleDoubleClick}
      onMouseMove={(e) => {
        if (isConnecting) {
          const rect = e.currentTarget.getBoundingClientRect()
          onMouseMove(rect.left + rect.width / 2, rect.top + rect.height / 2)
        }
      }}
      className={`absolute cursor-move ${isConnecting ? 'cursor-crosshair' : ''}`}
      style={{
        left: node.x * zoom + pan.x,
        top: node.y * zoom + pan.y,
        width: node.width * zoom,
        height: node.height * zoom,
        zIndex: isSelected ? 10 : 1
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <div
        className={`w-full h-full rounded-lg shadow-lg transition-all ${
          isSelected ? 'ring-4 ring-purple-500 ring-opacity-50' : ''
        }`}
        style={{
          backgroundColor: node.color,
          opacity: node.visible ? 1 : 0.5
        }}
      >
        {/* Node header */}
        <div className="p-2 border-b border-black/10 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-lg">{config.icon}</span>
            <Badge size="sm" variant="outline" className="text-[10px] bg-white/50">
              {config.label}
            </Badge>
          </div>
          {isSelected && !readOnly && (
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onUpdate({ locked: !node.locked })
                }}
                className="p-1 hover:bg-black/10 rounded"
                title={node.locked ? 'Unlock' : 'Lock'}
              >
                {node.locked ? <Lock className="w-3 h-3"/> : <Unlock className="w-3 h-3"/>}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onConnectStart()
                }}
                className="p-1 hover:bg-black/10 rounded"
                title="Create Connection"
              >
                <Link2 className="w-3 h-3"/>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete()
                }}
                className="p-1 hover:bg-red-500/20 rounded text-red-600"
                title="Delete"
              >
                <Trash2 className="w-3 h-3"/>
              </button>
            </div>
          )}
        </div>

        {/* Node content */}
        <div className="p-2 h-[calc(100%-48px)] overflow-auto">
          {isEditing ? (
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              onBlur={handleBlur}
              autoFocus
              className="w-full h-full bg-white/50 rounded p-1 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              style={{ fontSize: `${12 * zoom}px` }}
            />
          ) : (
            <div
              className="text-xs font-medium whitespace-pre-wrap"
              style={{ fontSize: `${12 * zoom}px` }}
            >
              {node.content || 'Double-click to edit'}
            </div>
          )}

          {/* Metadata */}
          {node.metadata && Object.keys(node.metadata).length > 0 && (
            <div className="mt-2 pt-2 border-t border-black/10 space-y-1">
              {node.metadata.priority && (
                <Badge size="sm" variant={
                  node.metadata.priority === 'high' ? 'danger' :
                  node.metadata.priority === 'medium' ? 'warning' : 'default'
                }>
                  {node.metadata.priority}
                </Badge>
              )}
              {node.metadata.status && (
                <Badge size="sm" variant={
                  node.metadata.status === 'done' ? 'success' :
                  node.metadata.status === 'in-progress' ? 'primary' : 'default'
                }>
                  {node.metadata.status}
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Minimap Component
interface MinimapProps {
  nodes: CanvasNode[]
  connections: CanvasConnection[]
  zoom: number
  pan: { x: number, y: number }
}

function Minimap({ nodes, connections, zoom, pan }: MinimapProps) {
  const minimapSize = 200
  const scale = 0.1

  return (
    <Card className="w-[200px] h-[200px] overflow-hidden">
      <CardContent className="p-0 relative bg-slate-100 dark:bg-slate-800">
        <svg width={minimapSize} height={minimapSize} className="absolute inset-0">
          {/* Connections */}
          {connections.map(conn => {
            const fromNode = nodes.find(n => n.id === conn.from)
            const toNode = nodes.find(n => n.id === conn.to)
            if (!fromNode || !toNode) return null

            return (
              <line
                key={conn.id}
                x1={fromNode.x * scale + minimapSize / 2}
                y1={fromNode.y * scale + minimapSize / 2}
                x2={toNode.x * scale + minimapSize / 2}
                y2={toNode.y * scale + minimapSize / 2}
                stroke={conn.color || '#94A3B8'}
                strokeWidth={1}
                opacity={0.5}
              />
            )
          })}

          {/* Nodes */}
          {nodes.map(node => (
            <rect
              key={node.id}
              x={node.x * scale + minimapSize / 2}
              y={node.y * scale + minimapSize / 2}
              width={node.width * scale}
              height={node.height * scale}
              fill={node.color}
              opacity={0.7}
              rx={2}
            />
          ))}

          {/* Viewport indicator */}
          <rect
            x={minimapSize / 2}
            y={minimapSize / 2}
            width={minimapSize / zoom}
            height={minimapSize / zoom}
            fill="none"
            stroke="#8B5CF6"
            strokeWidth={2}
            opacity={0.5}
          />
        </svg>
      </CardContent>
    </Card>
  )
}
