/**
 * Visual Export Utilities for Mind Maps
 * Exports canvas to SVG, PNG, and PDF formats
 */

import { CanvasNode, CanvasConnection } from '@/components/projects/EnhancedInfiniteCanvasWorkspace'

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
  'related': { color: '#94A3B8', dash: '5,5' },
  'depends': { color: '#3B82F6', dash: '0' },
  'leads-to': { color: '#10B981', dash: '10,5' },
  'blocks': { color: '#EF4444', dash: '3,3' },
  'supports': { color: '#8B5CF6', dash: '8,4' },
  'conflicts': { color: '#F59E0B', dash: '2,4' }
}

interface ExportOptions {
  title?: string
  includeTitle?: boolean
  backgroundColor?: string
  padding?: number
}

/**
 * Calculate bounds of all nodes
 */
function calculateBounds(nodes: CanvasNode[]) {
  if (nodes.length === 0) {
    return { minX: 0, minY: 0, maxX: 800, maxY: 600 }
  }

  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  nodes.forEach(node => {
    minX = Math.min(minX, node.x)
    minY = Math.min(minY, node.y)
    maxX = Math.max(maxX, node.x + node.width)
    maxY = Math.max(maxY, node.y + node.height)
  })

  return { minX, minY, maxX, maxY }
}

/**
 * Generate SVG representation of mind map
 */
export function generateSVG(
  nodes: CanvasNode[],
  connections: CanvasConnection[],
  options: ExportOptions = {}
): string {
  const {
    title = 'Mind Map',
    includeTitle = true,
    backgroundColor = '#F8FAFC',
    padding = 50
  } = options

  const bounds = calculateBounds(nodes)
  const titleHeight = includeTitle ? 60 : 0
  const width = bounds.maxX - bounds.minX + padding * 2
  const height = bounds.maxY - bounds.minY + padding * 2 + titleHeight
  const offsetX = -bounds.minX + padding
  const offsetY = -bounds.minY + padding + titleHeight

  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#666"/>
    </marker>
    <filter id="shadow">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect x="0" y="0" width="${width}" height="${height}" fill="${backgroundColor}"/>

`

  // Add title if requested
  if (includeTitle) {
    svg += `  <!-- Title -->
  <text x="${width / 2}" y="35" font-family="sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="#1F2937">${escapeXml(title)}</text>

`
  }

  // Draw connections
  svg += `  <!-- Connections -->
  <g id="connections">
`
  connections.forEach(conn => {
    const fromNode = nodes.find(n => n.id === conn.from)
    const toNode = nodes.find(n => n.id === conn.to)
    if (!fromNode || !toNode) return

    const x1 = fromNode.x + fromNode.width / 2 + offsetX
    const y1 = fromNode.y + fromNode.height / 2 + offsetY
    const x2 = toNode.x + toNode.width / 2 + offsetX
    const y2 = toNode.y + toNode.height / 2 + offsetY

    const config = CONNECTION_TYPE_CONFIG[conn.type]
    const color = conn.color || config.color

    svg += `    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
      stroke="${color}" stroke-width="2" stroke-dasharray="${config.dash}"
      marker-end="url(#arrowhead)" opacity="0.8"/>
`

    if (conn.label) {
      const midX = (x1 + x2) / 2
      const midY = (y1 + y2) / 2
      svg += `    <text x="${midX}" y="${midY}" font-family="sans-serif" font-size="12"
        font-weight="bold" text-anchor="middle" fill="${color}">${escapeXml(conn.label)}</text>
`
    }
  })
  svg += `  </g>

`

  // Draw nodes
  svg += `  <!-- Nodes -->
  <g id="nodes">
`
  nodes.forEach(node => {
    if (!node.visible) return

    const x = node.x + offsetX
    const y = node.y + offsetY
    const config = NODE_TYPE_CONFIG[node.type]

    svg += `    <g id="node-${node.id}">
      <rect x="${x}" y="${y}" width="${node.width}" height="${node.height}"
        rx="8" fill="${node.color}" filter="url(#shadow)" opacity="${node.locked ? 0.7 : 1}"/>

      <!-- Node header -->
      <rect x="${x}" y="${y}" width="${node.width}" height="36"
        rx="8" fill="rgba(0,0,0,0.1)"/>

      <!-- Node type badge -->
      <text x="${x + 10}" y="${y + 24}" font-family="sans-serif" font-size="18">${config.icon}</text>
      <text x="${x + 35}" y="${y + 24}" font-family="sans-serif" font-size="10"
        font-weight="bold" fill="rgba(0,0,0,0.7)">${config.label.toUpperCase()}</text>

      <!-- Node content -->
      ${wrapText(node.content || 'Untitled', x + 10, y + 50, node.width - 20, 14, 'sans-serif')}

      <!-- Metadata -->
`

    let metaY = y + node.height - 25
    if (node.metadata?.priority) {
      const priorityColor = node.metadata.priority === 'high' ? '#EF4444' :
                           node.metadata.priority === 'medium' ? '#F59E0B' : '#6B7280'
      svg += `      <rect x="${x + 10}" y="${metaY}" width="50" height="18" rx="4" fill="${priorityColor}"/>
      <text x="${x + 35}" y="${metaY + 13}" font-family="sans-serif" font-size="10"
        font-weight="bold" text-anchor="middle" fill="white">${node.metadata.priority.toUpperCase()}</text>
`
    }

    if (node.metadata?.status) {
      const statusColor = node.metadata.status === 'done' ? '#10B981' :
                         node.metadata.status === 'in-progress' ? '#3B82F6' : '#6B7280'
      const statusX = node.metadata?.priority ? x + 65 : x + 10
      svg += `      <rect x="${statusX}" y="${metaY}" width="60" height="18" rx="4" fill="${statusColor}"/>
      <text x="${statusX + 30}" y="${metaY + 13}" font-family="sans-serif" font-size="10"
        font-weight="bold" text-anchor="middle" fill="white">${node.metadata.status.toUpperCase()}</text>
`
    }

    svg += `    </g>
`
  })
  svg += `  </g>

  <!-- Export metadata -->
  <text x="${width - 10}" y="${height - 10}" font-family="sans-serif" font-size="10"
    text-anchor="end" fill="#9CA3AF">Exported from Project Exodus</text>
</svg>`

  return svg
}

/**
 * Export mind map as SVG file
 */
export function exportAsSVG(
  nodes: CanvasNode[],
  connections: CanvasConnection[],
  filename: string = 'mindmap',
  options: ExportOptions = {}
): void {
  const svg = generateSVG(nodes, connections, options)
  const blob = new Blob([svg], { type: 'image/svg+xml' })
  downloadBlob(blob, `${filename}.svg`)
}

/**
 * Export mind map as PNG file
 */
export async function exportAsPNG(
  nodes: CanvasNode[],
  connections: CanvasConnection[],
  filename: string = 'mindmap',
  options: ExportOptions = {},
  scale: number = 2
): Promise<void> {
  const svg = generateSVG(nodes, connections, options)

  // Create an image from SVG
  const img = new Image()
  const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(svgBlob)

  return new Promise((resolve, reject) => {
    img.onload = () => {
      // Create canvas
      const canvas = document.createElement('canvas')
      canvas.width = img.width * scale
      canvas.height = img.height * scale
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        reject(new Error('Failed to get canvas context'))
        return
      }

      // Scale for higher resolution
      ctx.scale(scale, scale)
      ctx.drawImage(img, 0, 0)

      // Convert to PNG blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            downloadBlob(blob, `${filename}.png`)
            URL.revokeObjectURL(url)
            resolve()
          } else {
            reject(new Error('Failed to create PNG blob'))
          }
        },
        'image/png',
        1.0
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load SVG image'))
    }

    img.src = url
  })
}

/**
 * Export mind map as PDF file
 */
export async function exportAsPDF(
  nodes: CanvasNode[],
  connections: CanvasConnection[],
  filename: string = 'mindmap',
  options: ExportOptions = {}
): Promise<void> {
  // For PDF export, we'll use the browser's print-to-PDF functionality
  // This is a simpler approach that works without external libraries

  const svg = generateSVG(nodes, connections, options)

  // Create a new window with the SVG
  const printWindow = window.open('', '_blank')
  if (!printWindow) {
    throw new Error('Failed to open print window. Please allow popups.')
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>${options.title || 'Mind Map'}</title>
  <style>
    body {
      margin: 0;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    svg {
      max-width: 100%;
      height: auto;
    }
    @media print {
      body {
        padding: 0;
      }
    }
  </style>
</head>
<body>
  ${svg}
  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
        // Uncomment to auto-close after print dialog
        // setTimeout(function() { window.close(); }, 1000);
      }, 500);
    };
  </script>
</body>
</html>
`

  printWindow.document.write(html)
  printWindow.document.close()
}

/**
 * Helper function to wrap text in SVG
 */
function wrapText(
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  fontFamily: string
): string {
  const words = text.split(' ')
  let line = ''
  let lines: string[] = []
  const maxLines = 3

  // Simple word wrapping
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' '
    // Rough estimate: average character width is ~7px for 14px font
    const testWidth = testLine.length * 7

    if (testWidth > maxWidth && i > 0) {
      lines.push(line.trim())
      line = words[i] + ' '
    } else {
      line = testLine
    }
  }
  lines.push(line.trim())

  // Limit to max lines
  if (lines.length > maxLines) {
    lines = lines.slice(0, maxLines)
    lines[maxLines - 1] = lines[maxLines - 1].slice(0, -3) + '...'
  }

  // Generate SVG text elements
  let svg = ''
  lines.forEach((line, i) => {
    svg += `      <text x="${x}" y="${y + i * lineHeight}" font-family="${fontFamily}"
      font-size="14" font-weight="500" fill="rgba(0,0,0,0.8)">${escapeXml(line)}</text>
`
  })

  return svg
}

/**
 * Escape XML special characters
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * Download a blob as a file
 */
function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
