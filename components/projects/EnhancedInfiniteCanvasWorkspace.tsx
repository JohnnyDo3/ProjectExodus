'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import {
  ZoomIn, ZoomOut, Maximize2, Minimize2, Grid3x3, Plus, Trash2,
  Move, Link2, Circle, Square, Diamond, Star, Type, Image as ImageIcon,
  Palette, Save, Download, Upload, Undo, Redo, Lock, Unlock,
  Eye, EyeOff, Layers, AlignCenter, Copy, Scissors, Search, FileImage, FileText,
  Workflow, GitBranch, Target, Sparkles as SparklesIcon
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { exportAsSVG, exportAsPNG, exportAsPDF } from '@/lib/mindmap/visualExport'
import {
  applyLayout,
  autoSelectLayout,
  type LayoutType
} from '@/lib/mindmap/layoutEngines'
import { autoImport } from '@/lib/mindmap/importers'

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
  mindMapId?: string
  initialNodes?: CanvasNode[]
  initialConnections?: CanvasConnection[]
  onSave?: (nodes: CanvasNode[], connections: CanvasConnection[]) => Promise<void>
  readOnly?: boolean
  autoSave?: boolean
  autoSaveInterval?: number
}

interface ContextMenu {
  x: number
  y: number
  nodeId?: string
  connectionId?: string
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

export function EnhancedInfiniteCanvasWorkspace({
  projectId,
  mindMapId,
  initialNodes = [],
  initialConnections = [],
  onSave,
  readOnly = false,
  autoSave = false,
  autoSaveInterval = 30000 // 30 seconds
}: InfiniteCanvasWorkspaceProps) {
  // Canvas state
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [nodes, setNodes] = useState<CanvasNode[]>(initialNodes)
  const [connections, setConnections] = useState<CanvasConnection[]>(initialConnections)

  // Multi-select state
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set())
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectionBox, setSelectionBox] = useState<{ x: number, y: number, width: number, height: number } | null>(null)
  const [selectionStart, setSelectionStart] = useState<{ x: number, y: number } | null>(null)

  // Interaction state
  const [isDragging, setIsDragging] = useState(false)
  const [isPanning, setIsPanning] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectFrom, setConnectFrom] = useState<string | null>(null)
  const [tempConnection, setTempConnection] = useState<{ x: number, y: number } | null>(null)

  // Context menu state
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null)

  // UI state
  const [showGrid, setShowGrid] = useState(true)
  const [showMinimap, setShowMinimap] = useState(true)
  const [activeNodeType, setActiveNodeType] = useState<NodeType>('idea')
  const [activeConnectionType, setActiveConnectionType] = useState<ConnectionType>('related')

  // History state
  const [history, setHistory] = useState<{ nodes: CanvasNode[], connections: CanvasConnection[] }[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  // Search state
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  // Auto-save state
  const [isSaving, setIsSaving] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Export menu state
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  // Layout state
  const [currentLayout, setCurrentLayout] = useState<LayoutType>('INFINITE_CANVAS')
  const [showLayoutMenu, setShowLayoutMenu] = useState(false)
  const [isApplyingLayout, setIsApplyingLayout] = useState(false)

  const canvasRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Track changes for auto-save
  useEffect(() => {
    setHasUnsavedChanges(true)
  }, [nodes, connections])

  // Auto-save functionality
  useEffect(() => {
    if (!autoSave || !onSave || !hasUnsavedChanges || readOnly) return

    autoSaveTimerRef.current = setTimeout(async () => {
      await handleSave()
    }, autoSaveInterval)

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current)
      }
    }
  }, [autoSave, hasUnsavedChanges, nodes, connections, autoSaveInterval])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (readOnly) return

      // Ctrl/Cmd + Z - Undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
      }

      // Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y - Redo
      if (((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) ||
          ((e.ctrlKey || e.metaKey) && e.key === 'y')) {
        e.preventDefault()
        redo()
      }

      // Ctrl/Cmd + S - Save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }

      // Ctrl/Cmd + A - Select all
      if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault()
        selectAllNodes()
      }

      // Ctrl/Cmd + C - Copy selected nodes
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        e.preventDefault()
        copySelectedNodes()
      }

      // Ctrl/Cmd + V - Paste nodes
      if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        e.preventDefault()
        pasteNodes()
      }

      // Delete or Backspace - Delete selected
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault()
        deleteSelectedNodes()
      }

      // Escape - Clear selection or cancel action
      if (e.key === 'Escape') {
        e.preventDefault()
        clearSelection()
        setIsConnecting(false)
        setConnectFrom(null)
        setTempConnection(null)
        setContextMenu(null)
      }

      // N - New node at center
      if (e.key === 'n' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault()
        addNodeAtCenter()
      }

      // Ctrl/Cmd + F - Search
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault()
        setShowSearch(true)
      }

      // Space + Drag - Pan mode (handled separately)
      if (e.key === ' ' && !e.repeat) {
        e.preventDefault()
        setIsPanning(true)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        setIsPanning(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [readOnly, selectedNodes, nodes, connections, historyIndex, history])

  // Close context menu and all menus on click
  useEffect(() => {
    const handleClick = () => {
      setContextMenu(null)
      setShowExportMenu(false)
      setShowLayoutMenu(false)
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

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

  // Add node at canvas center
  const addNodeAtCenter = useCallback(() => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    addNode(rect.width / 2, rect.height / 2)
  }, [addNode])

  // Delete node
  const deleteNode = useCallback((nodeId: string) => {
    const newNodes = nodes.filter(n => n.id !== nodeId)
    const newConnections = connections.filter(c => c.from !== nodeId && c.to !== nodeId)
    setNodes(newNodes)
    setConnections(newConnections)
    saveToHistory(newNodes, newConnections)
  }, [nodes, connections])

  // Delete selected nodes
  const deleteSelectedNodes = useCallback(() => {
    if (selectedNodes.size === 0) return
    const newNodes = nodes.filter(n => !selectedNodes.has(n.id))
    const newConnections = connections.filter(c => !selectedNodes.has(c.from) && !selectedNodes.has(c.to))
    setNodes(newNodes)
    setConnections(newConnections)
    setSelectedNodes(new Set())
    saveToHistory(newNodes, newConnections)
  }, [nodes, connections, selectedNodes])

  // Update node
  const updateNode = useCallback((nodeId: string, updates: Partial<CanvasNode>) => {
    setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, ...updates } : n))
  }, [])

  // Update multiple nodes
  const updateNodes = useCallback((updates: Map<string, Partial<CanvasNode>>) => {
    setNodes(prev => prev.map(n => {
      const update = updates.get(n.id)
      return update ? { ...n, ...update } : n
    }))
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

    const newConnections = [...connections, newConnection]
    setConnections(newConnections)
    setIsConnecting(false)
    setConnectFrom(null)
    setTempConnection(null)
    saveToHistory(nodes, newConnections)
  }, [activeConnectionType, connections, nodes])

  // Delete connection
  const deleteConnection = useCallback((connId: string) => {
    const newConnections = connections.filter(c => c.id !== connId)
    setConnections(newConnections)
    saveToHistory(nodes, newConnections)
  }, [connections, nodes])

  // Selection functions
  const selectAllNodes = useCallback(() => {
    setSelectedNodes(new Set(nodes.map(n => n.id)))
  }, [nodes])

  const clearSelection = useCallback(() => {
    setSelectedNodes(new Set())
  }, [])

  const toggleNodeSelection = useCallback((nodeId: string, multiSelect: boolean = false) => {
    setSelectedNodes(prev => {
      const next = new Set(multiSelect ? prev : [])
      if (prev.has(nodeId) && multiSelect) {
        next.delete(nodeId)
      } else {
        next.add(nodeId)
      }
      return next
    })
  }, [])

  // Copy/Paste functions
  const [clipboard, setClipboard] = useState<{ nodes: CanvasNode[], connections: CanvasConnection[] } | null>(null)

  const copySelectedNodes = useCallback(() => {
    const selectedNodesList = nodes.filter(n => selectedNodes.has(n.id))
    const selectedConnectionsList = connections.filter(c =>
      selectedNodes.has(c.from) && selectedNodes.has(c.to)
    )
    setClipboard({ nodes: selectedNodesList, connections: selectedConnectionsList })
  }, [nodes, connections, selectedNodes])

  const pasteNodes = useCallback(() => {
    if (!clipboard) return

    const idMap = new Map<string, string>()
    const newNodes: CanvasNode[] = clipboard.nodes.map(node => {
      const newId = `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      idMap.set(node.id, newId)
      return {
        ...node,
        id: newId,
        x: node.x + 50,
        y: node.y + 50
      }
    })

    const newConnections: CanvasConnection[] = clipboard.connections.map(conn => ({
      ...conn,
      id: `conn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      from: idMap.get(conn.from) || conn.from,
      to: idMap.get(conn.to) || conn.to
    }))

    setNodes(prev => [...prev, ...newNodes])
    setConnections(prev => [...prev, ...newConnections])
    setSelectedNodes(new Set(newNodes.map(n => n.id)))
    saveToHistory([...nodes, ...newNodes], [...connections, ...newConnections])
  }, [clipboard, nodes, connections])

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

  // Handle canvas interactions
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (readOnly || e.button !== 0) return // Only left click

    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Start selection box if Shift is held or in selection mode
    if (!isConnecting && (e.shiftKey || isPanning)) {
      setIsSelecting(true)
      setSelectionStart({ x, y })
      setSelectionBox({ x, y, width: 0, height: 0 })
    }
  }

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSelecting || !selectionStart) return

    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const width = x - selectionStart.x
    const height = y - selectionStart.y

    setSelectionBox({
      x: width < 0 ? x : selectionStart.x,
      y: height < 0 ? y : selectionStart.y,
      width: Math.abs(width),
      height: Math.abs(height)
    })
  }

  const handleCanvasMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isSelecting && selectionBox) {
      // Select nodes within selection box
      const box = selectionBox
      const selected = new Set<string>()

      nodes.forEach(node => {
        const nodeX = node.x * zoom + pan.x
        const nodeY = node.y * zoom + pan.y
        const nodeWidth = node.width * zoom
        const nodeHeight = node.height * zoom

        // Check if node intersects with selection box
        if (
          nodeX < box.x + box.width &&
          nodeX + nodeWidth > box.x &&
          nodeY < box.y + box.height &&
          nodeY + nodeHeight > box.y
        ) {
          selected.add(node.id)
        }
      })

      setSelectedNodes(selected)
      setIsSelecting(false)
      setSelectionBox(null)
      setSelectionStart(null)
    }
  }

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

    // Single click clears selection if not holding Shift
    if (!e.shiftKey) {
      clearSelection()
    }
  }

  // Context menu handler
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY })
  }

  // Handle save
  const handleSave = async () => {
    if (!onSave || isSaving) return

    setIsSaving(true)
    try {
      await onSave(nodes, connections)
      setHasUnsavedChanges(false)
      setLastSaved(new Date())
    } catch (error) {
      console.error('Failed to save:', error)
    } finally {
      setIsSaving(false)
    }
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

  // Visual export handlers
  const handleExportSVG = async () => {
    setIsExporting(true)
    setShowExportMenu(false)
    try {
      exportAsSVG(nodes, connections, `mindmap-${Date.now()}`, {
        title: 'Mind Map Export',
        includeTitle: true
      })
    } catch (error) {
      console.error('Failed to export SVG:', error)
      alert('Failed to export SVG. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportPNG = async () => {
    setIsExporting(true)
    setShowExportMenu(false)
    try {
      await exportAsPNG(nodes, connections, `mindmap-${Date.now()}`, {
        title: 'Mind Map Export',
        includeTitle: true
      }, 2) // 2x scale for higher resolution
    } catch (error) {
      console.error('Failed to export PNG:', error)
      alert('Failed to export PNG. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportPDF = async () => {
    setIsExporting(true)
    setShowExportMenu(false)
    try {
      await exportAsPDF(nodes, connections, `mindmap-${Date.now()}`, {
        title: 'Mind Map Export',
        includeTitle: true
      })
    } catch (error) {
      console.error('Failed to export PDF:', error)
      alert('Failed to export PDF. Please allow popups and try again.')
    } finally {
      setIsExporting(false)
    }
  }

  // Layout handlers
  const handleApplyLayout = (layoutType: LayoutType) => {
    setIsApplyingLayout(true)
    setShowLayoutMenu(false)

    try {
      const layoutedNodes = applyLayout(nodes, connections, layoutType, {
        orientation: 'vertical',
        radius: 300,
        levelSpacing: 200,
        siblingSpacing: 50
      })

      setNodes(layoutedNodes)
      setCurrentLayout(layoutType)
      saveToHistory(layoutedNodes, connections)
    } catch (error) {
      console.error('Failed to apply layout:', error)
      alert('Failed to apply layout. Please try again.')
    } finally {
      setIsApplyingLayout(false)
    }
  }

  const handleAutoLayout = () => {
    const bestLayout = autoSelectLayout(nodes, connections)
    handleApplyLayout(bestLayout)
  }

  const importCanvas = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string
        const { nodes: importedNodes, connections: importedConnections } = autoImport(content, file.name)

        if (importedNodes && importedNodes.length > 0) {
          setNodes(importedNodes)
          setConnections(importedConnections)
          saveToHistory(importedNodes, importedConnections)
          alert(`Successfully imported ${importedNodes.length} nodes and ${importedConnections.length} connections from ${file.name}`)
        } else {
          alert('No nodes found in the imported file')
        }
      } catch (err) {
        console.error('Failed to import file:', err)
        alert(`Failed to import file: ${err instanceof Error ? err.message : 'Unknown error'}`)
      }
    }
    reader.readAsText(file)
  }

  // Filter nodes by search query
  const filteredNodes = searchQuery
    ? nodes.filter(node =>
        node.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        NODE_TYPE_CONFIG[node.type].label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : nodes

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 overflow-hidden">
      {/* Toolbar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-4 flex-wrap">
        <Card className="flex-1 max-w-4xl">
          <CardContent className="p-3 flex items-center gap-2 flex-wrap">
            {/* Zoom controls */}
            <div className="flex items-center gap-1 border-r pr-2">
              <Button size="sm" variant="ghost" onClick={zoomOut} title="Zoom Out (-)">
                <ZoomOut className="w-4 h-4"/>
              </Button>
              <span className="text-xs font-mono min-w-12 text-center">{Math.round(zoom * 100)}%</span>
              <Button size="sm" variant="ghost" onClick={zoomIn} title="Zoom In (+)">
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
                        ? 'bg-purple-500 text-white scale-110'
                        : 'hover:bg-[var(--muted)] text-theme-muted'
                    }`}
                    title={`${NODE_TYPE_CONFIG[type].label} (Click to select)`}
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
                  title="Connect Nodes (L)"
                >
                  <Link2 className="w-4 h-4"/>
                </Button>
                <Button
                  size="sm"
                  variant={showGrid ? 'primary' : 'ghost'}
                  onClick={() => setShowGrid(!showGrid)}
                  title="Toggle Grid (G)"
                >
                  <Grid3x3 className="w-4 h-4"/>
                </Button>
                <Button
                  size="sm"
                  variant={showMinimap ? 'primary' : 'ghost'}
                  onClick={() => setShowMinimap(!showMinimap)}
                  title="Toggle Minimap (M)"
                >
                  <Layers className="w-4 h-4"/>
                </Button>
                <Button
                  size="sm"
                  variant={showSearch ? 'primary' : 'ghost'}
                  onClick={() => setShowSearch(!showSearch)}
                  title="Search (Ctrl+F)"
                >
                  <Search className="w-4 h-4"/>
                </Button>

                {/* Layout menu */}
                <div className="relative">
                  <Button
                    size="sm"
                    variant={showLayoutMenu ? 'primary' : 'ghost'}
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowLayoutMenu(!showLayoutMenu)
                    }}
                    disabled={isApplyingLayout}
                    title="Layout Options"
                  >
                    <Workflow className="w-4 h-4"/>
                  </Button>

                  {/* Layout dropdown */}
                  {showLayoutMenu && (
                    <div className="absolute top-full left-0 mt-1 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-[var(--border)] py-1 min-w-[180px] z-50">
                      <button
                        onClick={() => handleApplyLayout('TREE')}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--muted)] flex items-center gap-2"
                      >
                        <GitBranch className="w-4 h-4"/>
                        Tree Layout
                      </button>
                      <button
                        onClick={() => handleApplyLayout('RADIAL')}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--muted)] flex items-center gap-2"
                      >
                        <Target className="w-4 h-4"/>
                        Radial Layout
                      </button>
                      <button
                        onClick={() => handleApplyLayout('FORCE_GRAPH')}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--muted)] flex items-center gap-2"
                      >
                        <Workflow className="w-4 h-4"/>
                        Force-Directed
                      </button>
                      <div className="h-px bg-[var(--border)] my-1"/>
                      <button
                        onClick={handleAutoLayout}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--muted)] flex items-center gap-2 text-purple-600 dark:text-purple-400"
                      >
                        <SparklesIcon className="w-4 h-4"/>
                        Auto Layout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* History */}
            {!readOnly && (
              <div className="flex items-center gap-1 border-r pr-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={undo}
                  disabled={historyIndex <= 0}
                  title="Undo (Ctrl+Z)"
                >
                  <Undo className="w-4 h-4"/>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={redo}
                  disabled={historyIndex >= history.length - 1}
                  title="Redo (Ctrl+Y)"
                >
                  <Redo className="w-4 h-4"/>
                </Button>
              </div>
            )}

            {/* Save/Export */}
            <div className="flex items-center gap-1 relative">
              {!readOnly && (
                <>
                  <Button
                    size="sm"
                    variant={hasUnsavedChanges ? 'primary' : 'ghost'}
                    onClick={handleSave}
                    disabled={isSaving}
                    title="Save (Ctrl+S)"
                  >
                    <Save className="w-4 h-4 mr-1"/>
                    {isSaving ? 'Saving...' : hasUnsavedChanges ? 'Save*' : 'Saved'}
                  </Button>

                  {/* Export dropdown */}
                  <div className="relative">
                    <Button
                      size="sm"
                      variant={showExportMenu ? 'primary' : 'ghost'}
                      onClick={() => setShowExportMenu(!showExportMenu)}
                      disabled={isExporting}
                      title="Export Mind Map"
                    >
                      <Download className="w-4 h-4 mr-1"/>
                      {isExporting ? 'Exporting...' : 'Export'}
                    </Button>

                    {/* Export menu */}
                    {showExportMenu && (
                      <div className="absolute top-full right-0 mt-1 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-[var(--border)] py-1 min-w-[160px] z-50">
                        <button
                          onClick={handleExportSVG}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--muted)] flex items-center gap-2"
                        >
                          <FileImage className="w-4 h-4"/>
                          Export as SVG
                        </button>
                        <button
                          onClick={handleExportPNG}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--muted)] flex items-center gap-2"
                        >
                          <FileImage className="w-4 h-4"/>
                          Export as PNG
                        </button>
                        <button
                          onClick={handleExportPDF}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--muted)] flex items-center gap-2"
                        >
                          <FileText className="w-4 h-4"/>
                          Export as PDF
                        </button>
                        <div className="h-px bg-[var(--border)] my-1"/>
                        <button
                          onClick={() => {
                            exportCanvas()
                            setShowExportMenu(false)
                          }}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--muted)] flex items-center gap-2"
                        >
                          <Download className="w-4 h-4"/>
                          Export as JSON
                        </button>
                      </div>
                    )}
                  </div>

                  <label className="cursor-pointer inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-lg font-medium transition-all duration-200 hover:bg-[var(--muted)] text-[var(--foreground)] bg-transparent" title="Import Mind Map (JSON, Markdown, CSV, FreeMind)">
                    <Upload className="w-4 h-4"/>
                    <input type="file" accept=".json,.md,.markdown,.csv,.mm,.xml" onChange={importCanvas} className="hidden"/>
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
            {selectedNodes.size > 0 && (
              <>
                <div className="w-px h-8 bg-[var(--border)]"/>
                <div className="text-center">
                  <div className="text-xs text-theme-muted">Selected</div>
                  <div className="text-sm font-bold text-purple-600">{selectedNodes.size}</div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Search bar */}
      {showSearch && (
        <div className="absolute top-20 left-4 z-20">
          <Card className="w-80">
            <CardContent className="p-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search nodes..."
                className="w-full px-3 py-2 rounded-lg bg-[var(--muted)] text-[var(--foreground)] placeholder:text-theme-muted focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
              {searchQuery && (
                <div className="mt-2 text-xs text-theme-muted">
                  Found {filteredNodes.length} node{filteredNodes.length !== 1 ? 's' : ''}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Auto-save indicator */}
      {autoSave && lastSaved && (
        <div className="absolute top-4 right-4 z-10">
          <div className="text-xs text-theme-muted bg-white dark:bg-slate-800 px-2 py-1 rounded shadow">
            Last saved: {lastSaved.toLocaleTimeString()}
          </div>
        </div>
      )}

      {/* Canvas */}
      <div
        ref={canvasRef}
        className={`absolute inset-0 ${isPanning ? 'cursor-move' : 'cursor-crosshair'}`}
        onClick={handleCanvasClick}
        onContextMenu={handleContextMenu}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        style={{
          backgroundImage: showGrid ?
            'radial-gradient(circle, rgba(148, 163, 184, 0.2) 1px, transparent 1px)' : 'none',
          backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
          backgroundPosition: `${pan.x}px ${pan.y}px`
        }}
      >
        {/* Selection box */}
        {isSelecting && selectionBox && (
          <div
            className="absolute border-2 border-purple-500 bg-purple-500/10 pointer-events-none"
            style={{
              left: selectionBox.x,
              top: selectionBox.y,
              width: selectionBox.width,
              height: selectionBox.height
            }}
          />
        )}

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
                  className="pointer-events-auto cursor-pointer hover:stroke-[3]"
                  onClick={() => setContextMenu({ x: (x1 + x2) / 2, y: (y1 + y2) / 2, connectionId: conn.id })}
                />
                {conn.label && (
                  <text
                    x={(x1 + x2) / 2}
                    y={(y1 + y2) / 2}
                    fill={conn.color || config.color}
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="pointer-events-none"
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
          {(searchQuery ? filteredNodes : nodes).filter(n => n.visible).map(node => (
            <CanvasNodeComponent
              key={node.id}
              node={node}
              zoom={zoom}
              pan={pan}
              isSelected={selectedNodes.has(node.id)}
              isConnecting={isConnecting}
              isHighlighted={searchQuery ? filteredNodes.includes(node) : false}
              onSelect={(multiSelect) => toggleNodeSelection(node.id, multiSelect)}
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
              onContextMenu={(e) => {
                e.preventDefault()
                setContextMenu({ x: e.clientX, y: e.clientY, nodeId: node.id })
              }}
              readOnly={readOnly}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Context menu */}
      {contextMenu && (
        <ContextMenuComponent
          x={contextMenu.x}
          y={contextMenu.y}
          nodeId={contextMenu.nodeId}
          connectionId={contextMenu.connectionId}
          onDeleteNode={(id) => deleteNode(id)}
          onDeleteConnection={(id) => deleteConnection(id)}
          onDuplicateNode={(id) => {
            const node = nodes.find(n => n.id === id)
            if (node) {
              const newNode = { ...node, id: `node-${Date.now()}`, x: node.x + 50, y: node.y + 50 }
              setNodes(prev => [...prev, newNode])
            }
          }}
          onLockNode={(id) => updateNode(id, { locked: !nodes.find(n => n.id === id)?.locked })}
          onClose={() => setContextMenu(null)}
        />
      )}

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
              <h3 className="text-lg font-bold">Welcome to Enhanced Canvas</h3>
              <p className="text-sm text-theme-muted">
                Double-click anywhere to create a new node, or press N to add at center.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-left pt-2">
                <div><kbd className="px-1 py-0.5 bg-[var(--muted)] rounded text-[10px]">Double Click</kbd> Create node</div>
                <div><kbd className="px-1 py-0.5 bg-[var(--muted)] rounded text-[10px]">Drag</kbd> Move node</div>
                <div><kbd className="px-1 py-0.5 bg-[var(--muted)] rounded text-[10px]">Shift+Drag</kbd> Multi-select</div>
                <div><kbd className="px-1 py-0.5 bg-[var(--muted)] rounded text-[10px]">Ctrl+A</kbd> Select all</div>
                <div><kbd className="px-1 py-0.5 bg-[var(--muted)] rounded text-[10px]">Ctrl+Z</kbd> Undo</div>
                <div><kbd className="px-1 py-0.5 bg-[var(--muted)] rounded text-[10px]">Ctrl+Y</kbd> Redo</div>
                <div><kbd className="px-1 py-0.5 bg-[var(--muted)] rounded text-[10px]">Ctrl+C</kbd> Copy</div>
                <div><kbd className="px-1 py-0.5 bg-[var(--muted)] rounded text-[10px]">Ctrl+V</kbd> Paste</div>
                <div><kbd className="px-1 py-0.5 bg-[var(--muted)] rounded text-[10px]">Del</kbd> Delete</div>
                <div><kbd className="px-1 py-0.5 bg-[var(--muted)] rounded text-[10px]">N</kbd> New node</div>
                <div><kbd className="px-1 py-0.5 bg-[var(--muted)] rounded text-[10px]">Ctrl+F</kbd> Search</div>
                <div><kbd className="px-1 py-0.5 bg-[var(--muted)] rounded text-[10px]">Esc</kbd> Cancel/Clear</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Keyboard shortcuts help */}
      <div className="absolute bottom-4 left-4 z-10">
        <button
          onClick={() => {
            // Show keyboard shortcuts modal
          }}
          className="text-xs text-theme-muted hover:text-[var(--foreground)] transition-colors"
          title="View keyboard shortcuts"
        >
          Press ? for help
        </button>
      </div>
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
  isHighlighted: boolean
  onSelect: (multiSelect: boolean) => void
  onUpdate: (updates: Partial<CanvasNode>) => void
  onDelete: () => void
  onConnectStart: () => void
  onConnectEnd: (nodeId: string) => void
  onMouseMove: (x: number, y: number) => void
  onContextMenu: (e: React.MouseEvent) => void
  readOnly: boolean
}

function CanvasNodeComponent({
  node,
  zoom,
  pan,
  isSelected,
  isConnecting,
  isHighlighted,
  onSelect,
  onUpdate,
  onDelete,
  onConnectStart,
  onConnectEnd,
  onMouseMove,
  onContextMenu,
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
          onSelect(e.shiftKey || e.ctrlKey || e.metaKey)
        }
      }}
      onDoubleClick={handleDoubleClick}
      onMouseMove={(e) => {
        if (isConnecting) {
          const rect = e.currentTarget.getBoundingClientRect()
          onMouseMove(rect.left + rect.width / 2, rect.top + rect.height / 2)
        }
      }}
      onContextMenu={onContextMenu}
      className={`absolute ${isConnecting ? 'cursor-crosshair' : 'cursor-move'}`}
      style={{
        left: node.x * zoom + pan.x,
        top: node.y * zoom + pan.y,
        width: node.width * zoom,
        height: node.height * zoom,
        zIndex: isSelected ? 10 : 1
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: isHighlighted ? 1.05 : 1
      }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <div
        className={`w-full h-full rounded-lg shadow-lg transition-all ${
          isSelected ? 'ring-4 ring-purple-500 ring-opacity-50 shadow-2xl' : ''
        } ${
          isHighlighted ? 'ring-2 ring-yellow-400 animate-pulse' : ''
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
              style={{ fontSize: `${12}px` }}
            />
          ) : (
            <div
              className="text-xs font-medium whitespace-pre-wrap"
              style={{ fontSize: `${12}px` }}
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

// Context Menu Component
interface ContextMenuProps {
  x: number
  y: number
  nodeId?: string
  connectionId?: string
  onDeleteNode: (id: string) => void
  onDeleteConnection: (id: string) => void
  onDuplicateNode: (id: string) => void
  onLockNode: (id: string) => void
  onClose: () => void
}

function ContextMenuComponent({
  x,
  y,
  nodeId,
  connectionId,
  onDeleteNode,
  onDeleteConnection,
  onDuplicateNode,
  onLockNode,
  onClose
}: ContextMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed z-50 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-[var(--border)] py-1 min-w-[160px]"
      style={{ left: x, top: y }}
      onClick={(e) => e.stopPropagation()}
    >
      {nodeId && (
        <>
          <button
            onClick={() => {
              onDuplicateNode(nodeId)
              onClose()
            }}
            className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--muted)] flex items-center gap-2"
          >
            <Copy className="w-4 h-4"/>
            Duplicate
          </button>
          <button
            onClick={() => {
              onLockNode(nodeId)
              onClose()
            }}
            className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--muted)] flex items-center gap-2"
          >
            <Lock className="w-4 h-4"/>
            Lock/Unlock
          </button>
          <div className="h-px bg-[var(--border)] my-1"/>
          <button
            onClick={() => {
              onDeleteNode(nodeId)
              onClose()
            }}
            className="w-full px-4 py-2 text-left text-sm hover:bg-red-500/10 text-red-600 flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4"/>
            Delete
          </button>
        </>
      )}
      {connectionId && (
        <button
          onClick={() => {
            onDeleteConnection(connectionId)
            onClose()
          }}
          className="w-full px-4 py-2 text-left text-sm hover:bg-red-500/10 text-red-600 flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4"/>
          Delete Connection
        </button>
      )}
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
