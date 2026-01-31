/**
 * Mind Map Layout Engines
 * Automatic node positioning algorithms for different visualization styles
 */

import { CanvasNode, CanvasConnection } from '@/components/projects/EnhancedInfiniteCanvasWorkspace'

export type LayoutType = 'FORCE_GRAPH' | 'TREE' | 'RADIAL' | 'INFINITE_CANVAS'

interface LayoutNode {
  id: string
  x: number
  y: number
  width: number
  height: number
}

interface Point {
  x: number
  y: number
}

/**
 * Tree Layout - Hierarchical top-down arrangement
 * Ideal for projects with clear parent-child relationships
 */
export function applyTreeLayout(
  nodes: CanvasNode[],
  connections: CanvasConnection[],
  options: {
    orientation?: 'vertical' | 'horizontal'
    levelSpacing?: number
    siblingSpacing?: number
    rootNodeId?: string
  } = {}
): CanvasNode[] {
  const {
    orientation = 'vertical',
    levelSpacing = 200,
    siblingSpacing = 50,
    rootNodeId
  } = options

  if (nodes.length === 0) return nodes

  // Build adjacency map
  const children = new Map<string, string[]>()
  const parents = new Map<string, string>()

  connections.forEach(conn => {
    if (!children.has(conn.from)) {
      children.set(conn.from, [])
    }
    children.get(conn.from)!.push(conn.to)
    parents.set(conn.to, conn.from)
  })

  // Find root node (node with no parent or specified root)
  let root = rootNodeId || nodes.find(n => !parents.has(n.id))?.id

  // If no root found, use the node with most connections
  if (!root) {
    root = nodes.reduce((max, node) => {
      const connectionCount = (children.get(node.id)?.length || 0) +
                            (parents.has(node.id) ? 1 : 0)
      const maxCount = (children.get(max.id)?.length || 0) +
                      (parents.has(max.id) ? 1 : 0)
      return connectionCount > maxCount ? node : max
    }).id
  }

  // Calculate tree structure with levels
  const levels = new Map<string, number>()
  const visited = new Set<string>()

  function assignLevels(nodeId: string, level: number) {
    if (visited.has(nodeId)) return
    visited.add(nodeId)
    levels.set(nodeId, level)

    const nodeChildren = children.get(nodeId) || []
    nodeChildren.forEach(childId => assignLevels(childId, level + 1))
  }

  assignLevels(root, 0)

  // Handle disconnected nodes
  nodes.forEach(node => {
    if (!visited.has(node.id)) {
      assignLevels(node.id, 0)
    }
  })

  // Group nodes by level
  const nodesByLevel = new Map<number, string[]>()
  levels.forEach((level, nodeId) => {
    if (!nodesByLevel.has(level)) {
      nodesByLevel.set(level, [])
    }
    nodesByLevel.get(level)!.push(nodeId)
  })

  // Calculate positions
  const positioned = new Map<string, Point>()
  const nodeMap = new Map(nodes.map(n => [n.id, n]))

  let maxLevel = Math.max(...Array.from(levels.values()))

  for (let level = 0; level <= maxLevel; level++) {
    const levelNodes = nodesByLevel.get(level) || []
    const totalWidth = levelNodes.reduce((sum, id) => {
      const node = nodeMap.get(id)!
      return sum + node.width + siblingSpacing
    }, -siblingSpacing)

    let currentX = -totalWidth / 2

    levelNodes.forEach(nodeId => {
      const node = nodeMap.get(nodeId)!

      if (orientation === 'vertical') {
        positioned.set(nodeId, {
          x: currentX,
          y: level * levelSpacing
        })
      } else {
        positioned.set(nodeId, {
          x: level * levelSpacing,
          y: currentX
        })
      }

      currentX += node.width + siblingSpacing
    })
  }

  // Center the tree
  const allX = Array.from(positioned.values()).map(p => p.x)
  const allY = Array.from(positioned.values()).map(p => p.y)
  const minX = Math.min(...allX)
  const minY = Math.min(...allY)
  const offsetX = 400 - minX
  const offsetY = 300 - minY

  // Apply positions to nodes
  return nodes.map(node => {
    const pos = positioned.get(node.id) || { x: 0, y: 0 }
    return {
      ...node,
      x: pos.x + offsetX,
      y: pos.y + offsetY
    }
  })
}

/**
 * Radial Layout - Circular arrangement around center
 * Ideal for showing relationships radiating from a central concept
 */
export function applyRadialLayout(
  nodes: CanvasNode[],
  connections: CanvasConnection[],
  options: {
    centerNodeId?: string
    radius?: number
    startAngle?: number
    groupByType?: boolean
  } = {}
): CanvasNode[] {
  const {
    centerNodeId,
    radius = 300,
    startAngle = 0,
    groupByType = false
  } = options

  if (nodes.length === 0) return nodes

  // Find center node
  let centerNode: CanvasNode | undefined

  if (centerNodeId) {
    centerNode = nodes.find(n => n.id === centerNodeId)
  }

  // If no center specified, use the most connected node
  if (!centerNode) {
    const connectionCounts = new Map<string, number>()
    connections.forEach(conn => {
      connectionCounts.set(conn.from, (connectionCounts.get(conn.from) || 0) + 1)
      connectionCounts.set(conn.to, (connectionCounts.get(conn.to) || 0) + 1)
    })

    centerNode = nodes.reduce((max, node) => {
      const count = connectionCounts.get(node.id) || 0
      const maxCount = connectionCounts.get(max.id) || 0
      return count > maxCount ? node : max
    })
  }

  const centerX = 400
  const centerY = 300

  // Position center node
  const positioned = new Map<string, Point>()
  positioned.set(centerNode.id, { x: centerX, y: centerY })

  // Get surrounding nodes
  const surroundingNodes = nodes.filter(n => n.id !== centerNode.id)

  if (groupByType) {
    // Group nodes by type and arrange each group in a sector
    const nodesByType = new Map<string, CanvasNode[]>()
    surroundingNodes.forEach(node => {
      if (!nodesByType.has(node.type)) {
        nodesByType.set(node.type, [])
      }
      nodesByType.get(node.type)!.push(node)
    })

    const types = Array.from(nodesByType.keys())
    const sectorAngle = (Math.PI * 2) / types.length

    types.forEach((type, typeIndex) => {
      const typeNodes = nodesByType.get(type)!
      const sectorStart = startAngle + typeIndex * sectorAngle
      const angleStep = sectorAngle / (typeNodes.length + 1)

      typeNodes.forEach((node, nodeIndex) => {
        const angle = sectorStart + (nodeIndex + 1) * angleStep
        const distance = radius + (nodeIndex % 2) * 50 // Slight variation in radius

        positioned.set(node.id, {
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance
        })
      })
    })
  } else {
    // Arrange all nodes evenly in a circle
    const angleStep = (Math.PI * 2) / surroundingNodes.length

    surroundingNodes.forEach((node, index) => {
      const angle = startAngle + index * angleStep
      positioned.set(node.id, {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius
      })
    })
  }

  // Apply positions to nodes
  return nodes.map(node => {
    const pos = positioned.get(node.id) || { x: 0, y: 0 }
    return {
      ...node,
      x: pos.x,
      y: pos.y
    }
  })
}

/**
 * Force-Directed Layout - Physics-based organic arrangement
 * Uses simulated forces to create natural-looking layouts
 */
export function applyForceDirectedLayout(
  nodes: CanvasNode[],
  connections: CanvasConnection[],
  options: {
    iterations?: number
    repulsion?: number
    attraction?: number
    centerGravity?: number
  } = {}
): CanvasNode[] {
  const {
    iterations = 100,
    repulsion = 5000,
    attraction = 0.01,
    centerGravity = 0.1
  } = options

  if (nodes.length === 0) return nodes

  // Initialize with random positions if not set
  const positions = nodes.map(node => ({
    id: node.id,
    x: node.x || Math.random() * 800,
    y: node.y || Math.random() * 600,
    vx: 0,
    vy: 0
  }))

  const centerX = 400
  const centerY = 300

  // Build connection map
  const adjacency = new Map<string, Set<string>>()
  connections.forEach(conn => {
    if (!adjacency.has(conn.from)) adjacency.set(conn.from, new Set())
    if (!adjacency.has(conn.to)) adjacency.set(conn.to, new Set())
    adjacency.get(conn.from)!.add(conn.to)
    adjacency.get(conn.to)!.add(conn.from)
  })

  // Physics simulation
  for (let iteration = 0; iteration < iterations; iteration++) {
    const temperature = 1 - iteration / iterations

    // Calculate forces
    positions.forEach((node, i) => {
      let fx = 0
      let fy = 0

      // Repulsion from all other nodes
      positions.forEach((other, j) => {
        if (i === j) return
        const dx = node.x - other.x
        const dy = node.y - other.y
        const distance = Math.sqrt(dx * dx + dy * dy) || 1
        const force = repulsion / (distance * distance)
        fx += (dx / distance) * force
        fy += (dy / distance) * force
      })

      // Attraction to connected nodes
      const neighbors = adjacency.get(node.id) || new Set()
      neighbors.forEach(neighborId => {
        const neighbor = positions.find(p => p.id === neighborId)
        if (!neighbor) return
        const dx = neighbor.x - node.x
        const dy = neighbor.y - node.y
        const distance = Math.sqrt(dx * dx + dy * dy) || 1
        fx += dx * attraction
        fy += dy * attraction
      })

      // Gravity towards center
      const dcx = centerX - node.x
      const dcy = centerY - node.y
      fx += dcx * centerGravity
      fy += dcy * centerGravity

      // Apply forces with cooling
      node.vx = (node.vx + fx) * 0.8 * temperature
      node.vy = (node.vy + fy) * 0.8 * temperature
    })

    // Update positions
    positions.forEach(node => {
      node.x += node.vx
      node.y += node.vy
    })
  }

  // Apply final positions
  const posMap = new Map(positions.map(p => [p.id, { x: p.x, y: p.y }]))

  return nodes.map(node => {
    const pos = posMap.get(node.id) || { x: node.x, y: node.y }
    return {
      ...node,
      x: pos.x,
      y: pos.y
    }
  })
}

/**
 * Grid Layout - Organized grid arrangement
 * Simple and clean, good for many nodes
 */
export function applyGridLayout(
  nodes: CanvasNode[],
  options: {
    columns?: number
    cellWidth?: number
    cellHeight?: number
    padding?: number
  } = {}
): CanvasNode[] {
  const {
    columns = Math.ceil(Math.sqrt(nodes.length)),
    cellWidth = 250,
    cellHeight = 200,
    padding = 50
  } = options

  if (nodes.length === 0) return nodes

  return nodes.map((node, index) => {
    const row = Math.floor(index / columns)
    const col = index % columns

    return {
      ...node,
      x: padding + col * cellWidth,
      y: padding + row * cellHeight
    }
  })
}

/**
 * Circular Layout - Nodes arranged in a perfect circle
 * Good for showing equality among nodes
 */
export function applyCircularLayout(
  nodes: CanvasNode[],
  options: {
    radius?: number
    centerX?: number
    centerY?: number
    startAngle?: number
  } = {}
): CanvasNode[] {
  const {
    radius = 300,
    centerX = 400,
    centerY = 300,
    startAngle = -Math.PI / 2
  } = options

  if (nodes.length === 0) return nodes

  const angleStep = (Math.PI * 2) / nodes.length

  return nodes.map((node, index) => {
    const angle = startAngle + index * angleStep
    return {
      ...node,
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius
    }
  })
}

/**
 * Auto-select best layout based on mind map characteristics
 */
export function autoSelectLayout(
  nodes: CanvasNode[],
  connections: CanvasConnection[]
): LayoutType {
  // No connections = grid layout
  if (connections.length === 0) {
    return 'INFINITE_CANVAS'
  }

  // Build connection stats
  const connectionCounts = new Map<string, number>()
  connections.forEach(conn => {
    connectionCounts.set(conn.from, (connectionCounts.get(conn.from) || 0) + 1)
    connectionCounts.set(conn.to, (connectionCounts.get(conn.to) || 0) + 1)
  })

  const counts = Array.from(connectionCounts.values())
  const maxConnections = Math.max(...counts)
  const avgConnections = counts.reduce((a, b) => a + b, 0) / counts.length

  // If one node has significantly more connections, use radial
  if (maxConnections > avgConnections * 2) {
    return 'RADIAL'
  }

  // If many nodes with single parent-child relationships, use tree
  const hasHierarchy = connections.every(conn => {
    const childConnections = connections.filter(c => c.from === conn.to)
    return childConnections.length <= 3 // Each node has limited children
  })

  if (hasHierarchy) {
    return 'TREE'
  }

  // Default to force-directed for complex networks
  return 'FORCE_GRAPH'
}

/**
 * Apply layout to nodes based on type
 */
export function applyLayout(
  nodes: CanvasNode[],
  connections: CanvasConnection[],
  layoutType: LayoutType,
  options: any = {}
): CanvasNode[] {
  switch (layoutType) {
    case 'TREE':
      return applyTreeLayout(nodes, connections, options)
    case 'RADIAL':
      return applyRadialLayout(nodes, connections, options)
    case 'FORCE_GRAPH':
      return applyForceDirectedLayout(nodes, connections, options)
    default:
      return nodes // INFINITE_CANVAS keeps current positions
  }
}
