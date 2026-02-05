'use client'

import { useState, useEffect, useMemo } from 'react'
import { Editor } from '@tiptap/react'
import { List, ChevronRight, ChevronDown, BookOpen, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Heading {
  id: string
  level: number
  text: string
  pos: number
}

interface TableOfContentsProps {
  editor: Editor | null
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

export function TableOfContents({
  editor,
  isCollapsed = false,
  onToggleCollapse,
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeHeading, setActiveHeading] = useState<string | null>(null)
  const [collapsedHeadings, setCollapsedHeadings] = useState<Set<string>>(new Set())

  // Extract headings from editor content
  useEffect(() => {
    if (!editor) {
      setHeadings([])
      return
    }

    const extractHeadings = () => {
      const extracted: Heading[] = []
      let headingIndex = 0

      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === 'heading') {
          const level = node.attrs.level as number
          const text = node.textContent || `Heading ${headingIndex + 1}`
          const id = `heading-${pos}`

          extracted.push({
            id,
            level,
            text,
            pos,
          })
          headingIndex++
        }
      })

      setHeadings(extracted)
    }

    extractHeadings()

    // Listen for content changes
    editor.on('update', extractHeadings)

    return () => {
      editor.off('update', extractHeadings)
    }
  }, [editor])

  // Build hierarchical structure for rendering
  const hierarchicalHeadings = useMemo(() => {
    const result: (Heading & { children: Heading[] })[] = []
    const stack: (Heading & { children: Heading[] })[] = []

    headings.forEach((heading) => {
      const item = { ...heading, children: [] }

      // Find parent based on level
      while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
        stack.pop()
      }

      if (stack.length === 0) {
        result.push(item)
      } else {
        stack[stack.length - 1].children.push(item)
      }

      stack.push(item)
    })

    return result
  }, [headings])

  const scrollToHeading = (pos: number) => {
    if (!editor) return

    // Set selection to the heading position
    editor.commands.setTextSelection(pos)

    // Scroll into view
    const domSelection = window.getSelection()
    if (domSelection && domSelection.rangeCount > 0) {
      const range = domSelection.getRangeAt(0)
      const element = range.startContainer.parentElement
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const toggleCollapsed = (headingId: string) => {
    setCollapsedHeadings((prev) => {
      const next = new Set(prev)
      if (next.has(headingId)) {
        next.delete(headingId)
      } else {
        next.add(headingId)
      }
      return next
    })
  }

  const renderHeading = (
    heading: Heading & { children: Heading[] },
    depth: number = 0
  ) => {
    const isCollapsedItem = collapsedHeadings.has(heading.id)
    const hasChildren = heading.children.length > 0
    const isActive = activeHeading === heading.id

    return (
      <div key={heading.id}>
        <div
          className={`group flex items-center gap-1 py-1 px-2 rounded cursor-pointer transition-colors ${
            isActive
              ? 'bg-[var(--primary)]/10 text-[var(--primary)]'
              : 'hover:bg-[var(--secondary)]/10'
          }`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          {/* Collapse toggle */}
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleCollapsed(heading.id)
              }}
              className="p-0.5 hover:bg-[var(--secondary)]/20 rounded"
            >
              {isCollapsedItem ? (
                <ChevronRight className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          ) : (
            <div className="w-4" />
          )}

          {/* Heading text */}
          <button
            onClick={() => scrollToHeading(heading.pos)}
            className="flex-1 text-left truncate text-sm"
          >
            {heading.text}
          </button>

          {/* Level indicator */}
          <span className="opacity-0 group-hover:opacity-100 text-[10px] text-[var(--muted)]">
            H{heading.level}
          </span>
        </div>

        {/* Children */}
        {hasChildren && !isCollapsedItem && (
          <div>
            {heading.children.map((child) =>
              renderHeading(child as Heading & { children: Heading[] }, depth + 1)
            )}
          </div>
        )}
      </div>
    )
  }

  if (isCollapsed) {
    return (
      <button
        onClick={onToggleCollapse}
        className="flex items-center gap-2 px-3 py-2 w-full text-left hover:bg-[var(--secondary)]/10 rounded-lg transition-colors"
      >
        <List className="w-4 h-4" />
        <span className="font-semibold text-sm">Outline</span>
        {headings.length > 0 && (
          <span className="ml-auto text-xs text-[var(--muted)]">{headings.length}</span>
        )}
      </button>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <List className="w-4 h-4" />
          <span className="font-bold text-sm">Outline</span>
        </div>
        {onToggleCollapse && (
          <Button
            size="sm"
            variant="ghost"
            onClick={onToggleCollapse}
            className="h-7 w-7 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-2">
        {hierarchicalHeadings.length > 0 ? (
          hierarchicalHeadings.map((heading) =>
            renderHeading(heading as Heading & { children: Heading[] })
          )
        ) : (
          <div className="text-center py-8">
            <BookOpen className="w-8 h-8 mx-auto mb-3 text-[var(--muted)] opacity-50" />
            <p className="text-sm text-[var(--muted)]">No headings yet</p>
            <p className="text-xs text-[var(--muted)] mt-1">
              Add headings to see the outline
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TableOfContents
