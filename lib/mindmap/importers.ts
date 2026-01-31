/**
 * Mind Map Import Utilities
 * Support importing from various external mind mapping formats
 */

import { CanvasNode, CanvasConnection, NodeType, ConnectionType } from '@/components/projects/EnhancedInfiniteCanvasWorkspace'

const NODE_TYPE_CONFIG = {
  idea: { color: '#FCD34D' },
  task: { color: '#60A5FA' },
  milestone: { color: '#F472B6' },
  resource: { color: '#A78BFA' },
  note: { color: '#34D399' },
  decision: { color: '#FB923C' },
  risk: { color: '#EF4444' },
  opportunity: { color: '#10B981' }
}

/**
 * Import from JSON (Project Exodus format)
 */
export function importFromJSON(jsonString: string): { nodes: CanvasNode[], connections: CanvasConnection[] } {
  try {
    const data = JSON.parse(jsonString)

    // Validate format
    if (!data.nodes || !Array.isArray(data.nodes)) {
      throw new Error('Invalid format: nodes array required')
    }

    // Map nodes
    const nodes: CanvasNode[] = data.nodes.map((node: any) => ({
      id: node.id || `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: (node.type || 'idea') as NodeType,
      x: node.x || Math.random() * 600,
      y: node.y || Math.random() * 400,
      width: node.width || 200,
      height: node.height || 120,
      content: node.content || node.label || 'Untitled',
      color: node.color || NODE_TYPE_CONFIG[node.type as NodeType]?.color || '#FCD34D',
      locked: node.locked || false,
      visible: node.visible !== false,
      metadata: node.metadata || {}
    }))

    // Map connections
    const connections: CanvasConnection[] = (data.connections || []).map((conn: any) => ({
      id: conn.id || `conn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      from: conn.from || conn.source || conn.fromId,
      to: conn.to || conn.target || conn.toId,
      type: (conn.type || 'related') as ConnectionType,
      label: conn.label,
      color: conn.color
    }))

    return { nodes, connections }
  } catch (error) {
    console.error('Failed to import JSON:', error)
    throw new Error('Invalid JSON format or structure')
  }
}

/**
 * Import from Markdown (simple outline format)
 * Supports:
 * - # Headers as milestones
 * - ## Subheaders as tasks
 * - * Bullets as ideas
 * - [ ] Checkboxes as tasks
 */
export function importFromMarkdown(markdown: string): { nodes: CanvasNode[], connections: CanvasConnection[] } {
  const lines = markdown.split('\n').filter(line => line.trim())
  const nodes: CanvasNode[] = []
  const connections: CanvasConnection[] = []

  let currentY = 100
  let lastNodeByLevel: { [level: number]: CanvasNode } = {}

  lines.forEach((line, index) => {
    const trimmed = line.trim()
    if (!trimmed) return

    let node: CanvasNode | null = null
    let level = 0

    // H1 = Milestone
    if (trimmed.startsWith('# ')) {
      level = 1
      node = {
        id: `node-${index}`,
        type: 'milestone',
        x: 100,
        y: currentY,
        width: 250,
        height: 120,
        content: trimmed.substring(2).trim(),
        color: NODE_TYPE_CONFIG.milestone.color,
        locked: false,
        visible: true
      }
    }
    // H2 = Task
    else if (trimmed.startsWith('## ')) {
      level = 2
      node = {
        id: `node-${index}`,
        type: 'task',
        x: 300,
        y: currentY,
        width: 200,
        height: 100,
        content: trimmed.substring(3).trim(),
        color: NODE_TYPE_CONFIG.task.color,
        locked: false,
        visible: true
      }
    }
    // H3 = Note
    else if (trimmed.startsWith('### ')) {
      level = 3
      node = {
        id: `node-${index}`,
        type: 'note',
        x: 500,
        y: currentY,
        width: 180,
        height: 90,
        content: trimmed.substring(4).trim(),
        color: NODE_TYPE_CONFIG.note.color,
        locked: false,
        visible: true
      }
    }
    // Checkbox = Task
    else if (trimmed.match(/^[-*]\s+\[[ x]\]/)) {
      level = 2
      const isCompleted = trimmed.includes('[x]')
      const content = trimmed.replace(/^[-*]\s+\[[ x]\]\s*/, '')
      node = {
        id: `node-${index}`,
        type: 'task',
        x: 300,
        y: currentY,
        width: 200,
        height: 100,
        content,
        color: NODE_TYPE_CONFIG.task.color,
        locked: false,
        visible: true,
        metadata: {
          status: isCompleted ? 'done' : 'todo'
        }
      }
    }
    // Bullet = Idea
    else if (trimmed.match(/^[-*+]\s+/)) {
      level = 2
      node = {
        id: `node-${index}`,
        type: 'idea',
        x: 200,
        y: currentY,
        width: 200,
        height: 100,
        content: trimmed.replace(/^[-*+]\s+/, ''),
        color: NODE_TYPE_CONFIG.idea.color,
        locked: false,
        visible: true
      }
    }

    if (node) {
      nodes.push(node)

      // Create connection to parent level
      if (level > 1 && lastNodeByLevel[level - 1]) {
        connections.push({
          id: `conn-${index}`,
          from: lastNodeByLevel[level - 1].id,
          to: node.id,
          type: 'leads-to'
        })
      }

      lastNodeByLevel[level] = node
      currentY += 150
    }
  })

  return { nodes, connections }
}

/**
 * Import from CSV
 * Expected columns: id,type,content,x,y
 */
export function importFromCSV(csv: string): { nodes: CanvasNode[], connections: CanvasConnection[] } {
  const lines = csv.split('\n').filter(line => line.trim())
  if (lines.length < 2) {
    throw new Error('CSV must have at least a header row and one data row')
  }

  const header = lines[0].split(',').map(h => h.trim().toLowerCase())
  const nodes: CanvasNode[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim())
    const row: { [key: string]: string } = {}

    header.forEach((key, idx) => {
      row[key] = values[idx] || ''
    })

    if (!row.content && !row.label) continue

    const node: CanvasNode = {
      id: row.id || `node-${i}`,
      type: (row.type || 'idea') as NodeType,
      x: parseFloat(row.x) || Math.random() * 600,
      y: parseFloat(row.y) || i * 150,
      width: parseFloat(row.width) || 200,
      height: parseFloat(row.height) || 120,
      content: row.content || row.label || 'Untitled',
      color: row.color || NODE_TYPE_CONFIG[row.type as NodeType]?.color || '#FCD34D',
      locked: row.locked === 'true',
      visible: row.visible !== 'false'
    }

    nodes.push(node)
  }

  return { nodes, connections: [] }
}

/**
 * Import from FreeMind XML format
 * Basic support for FreeMind mind maps
 */
export function importFromFreeMind(xml: string): { nodes: CanvasNode[], connections: CanvasConnection[] } {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'text/xml')

  if (doc.querySelector('parsererror')) {
    throw new Error('Invalid XML format')
  }

  const nodes: CanvasNode[] = []
  const connections: CanvasConnection[] = []
  let currentY = 100

  function processNode(element: Element, level: number, parentId?: string) {
    const text = element.getAttribute('TEXT') || 'Untitled'
    const id = element.getAttribute('ID') || `node-${nodes.length}`

    const node: CanvasNode = {
      id,
      type: level === 0 ? 'milestone' : level === 1 ? 'task' : 'idea',
      x: 100 + level * 200,
      y: currentY,
      width: 200,
      height: 100,
      content: text,
      color: NODE_TYPE_CONFIG[level === 0 ? 'milestone' : level === 1 ? 'task' : 'idea'].color,
      locked: false,
      visible: true
    }

    nodes.push(node)
    currentY += 120

    // Create connection to parent
    if (parentId) {
      connections.push({
        id: `conn-${connections.length}`,
        from: parentId,
        to: id,
        type: 'leads-to'
      })
    }

    // Process children
    const children = element.querySelectorAll(':scope > node')
    children.forEach(child => processNode(child, level + 1, id))
  }

  const rootNode = doc.querySelector('map > node')
  if (rootNode) {
    processNode(rootNode, 0)
  }

  return { nodes, connections }
}

/**
 * Auto-detect format and import
 */
export function autoImport(content: string, filename?: string): { nodes: CanvasNode[], connections: CanvasConnection[] } {
  const lowerFilename = filename?.toLowerCase() || ''

  try {
    // Detect by file extension
    if (lowerFilename.endsWith('.json')) {
      return importFromJSON(content)
    } else if (lowerFilename.endsWith('.md') || lowerFilename.endsWith('.markdown')) {
      return importFromMarkdown(content)
    } else if (lowerFilename.endsWith('.csv')) {
      return importFromCSV(content)
    } else if (lowerFilename.endsWith('.mm') || lowerFilename.endsWith('.xml')) {
      return importFromFreeMind(content)
    }

    // Auto-detect by content
    const trimmed = content.trim()

    // JSON detection
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      return importFromJSON(content)
    }

    // XML detection
    if (trimmed.startsWith('<?xml') || trimmed.startsWith('<map')) {
      return importFromFreeMind(content)
    }

    // Markdown detection (has headers or bullets)
    if (trimmed.match(/^#+\s+/m) || trimmed.match(/^[-*+]\s+/m)) {
      return importFromMarkdown(content)
    }

    // CSV detection (has commas)
    if (trimmed.split('\n')[0].includes(',')) {
      return importFromCSV(content)
    }

    // Default to JSON
    return importFromJSON(content)
  } catch (error) {
    console.error('Auto-import failed:', error)
    throw new Error('Could not detect file format. Please specify the format.')
  }
}

/**
 * Get supported formats
 */
export function getSupportedFormats() {
  return [
    { value: 'json', label: 'JSON', extension: '.json', mimeType: 'application/json' },
    { value: 'markdown', label: 'Markdown', extension: '.md', mimeType: 'text/markdown' },
    { value: 'csv', label: 'CSV', extension: '.csv', mimeType: 'text/csv' },
    { value: 'freemind', label: 'FreeMind XML', extension: '.mm', mimeType: 'application/xml' }
  ]
}
