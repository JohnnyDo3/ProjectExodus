'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Editor } from '@tiptap/react'
import {
  Heading1, Heading2, Heading3, List, ListOrdered, ListChecks,
  Quote, Code, Image as ImageIcon, Table as TableIcon, Minus,
  Link2, Type, FileText, CheckSquare
} from 'lucide-react'

interface SlashCommandMenuProps {
  editor: Editor | null
  isOpen: boolean
  position: { top: number; left: number }
  onClose: () => void
  onSelect: (command: SlashCommand) => void
}

export interface SlashCommand {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  aliases?: string[]
  action: (editor: Editor) => void
}

const SLASH_COMMANDS: SlashCommand[] = [
  {
    id: 'paragraph',
    title: 'Paragraph',
    description: 'Plain text paragraph',
    icon: <Type className="w-4 h-4" />,
    aliases: ['p', 'text', 'normal'],
    action: (editor) => editor.chain().focus().setParagraph().run(),
  },
  {
    id: 'heading1',
    title: 'Heading 1',
    description: 'Large section heading',
    icon: <Heading1 className="w-4 h-4" />,
    aliases: ['h1', '#'],
    action: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    id: 'heading2',
    title: 'Heading 2',
    description: 'Medium section heading',
    icon: <Heading2 className="w-4 h-4" />,
    aliases: ['h2', '##'],
    action: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    id: 'heading3',
    title: 'Heading 3',
    description: 'Small section heading',
    icon: <Heading3 className="w-4 h-4" />,
    aliases: ['h3', '###'],
    action: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
  },
  {
    id: 'bullet',
    title: 'Bullet List',
    description: 'Create a bullet list',
    icon: <List className="w-4 h-4" />,
    aliases: ['ul', '-', '*', 'unordered'],
    action: (editor) => editor.chain().focus().toggleBulletList().run(),
  },
  {
    id: 'numbered',
    title: 'Numbered List',
    description: 'Create a numbered list',
    icon: <ListOrdered className="w-4 h-4" />,
    aliases: ['ol', '1.', 'ordered'],
    action: (editor) => editor.chain().focus().toggleOrderedList().run(),
  },
  {
    id: 'todo',
    title: 'To-do List',
    description: 'Track tasks with checkboxes',
    icon: <ListChecks className="w-4 h-4" />,
    aliases: ['task', 'checkbox', '[]', 'checklist'],
    action: (editor) => editor.chain().focus().toggleTaskList().run(),
  },
  {
    id: 'quote',
    title: 'Quote',
    description: 'Capture a quote',
    icon: <Quote className="w-4 h-4" />,
    aliases: ['blockquote', '>'],
    action: (editor) => editor.chain().focus().toggleBlockquote().run(),
  },
  {
    id: 'code',
    title: 'Code Block',
    description: 'Display code with syntax',
    icon: <Code className="w-4 h-4" />,
    aliases: ['```', 'codeblock', 'pre'],
    action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
  },
  {
    id: 'divider',
    title: 'Divider',
    description: 'Horizontal rule',
    icon: <Minus className="w-4 h-4" />,
    aliases: ['hr', '---', 'line', 'separator'],
    action: (editor) => editor.chain().focus().setHorizontalRule().run(),
  },
  {
    id: 'image',
    title: 'Image',
    description: 'Upload or embed an image',
    icon: <ImageIcon className="w-4 h-4" />,
    aliases: ['img', 'picture', 'photo'],
    action: (editor) => {
      const url = window.prompt('Enter image URL:')
      if (url) {
        editor.chain().focus().setImage({ src: url }).run()
      }
    },
  },
  {
    id: 'table',
    title: 'Table',
    description: 'Add a table',
    icon: <TableIcon className="w-4 h-4" />,
    aliases: ['grid'],
    action: (editor) => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
  },
  {
    id: 'link',
    title: 'Link',
    description: 'Add a hyperlink',
    icon: <Link2 className="w-4 h-4" />,
    aliases: ['url', 'href', 'a'],
    action: (editor) => {
      const url = window.prompt('Enter URL:')
      if (url) {
        editor.chain().focus().setLink({ href: url }).run()
      }
    },
  },
]

export function SlashCommandMenu({
  editor,
  isOpen,
  position,
  onClose,
  onSelect,
}: SlashCommandMenuProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)

  // Filter commands based on search
  const filteredCommands = SLASH_COMMANDS.filter((command) => {
    const search = searchTerm.toLowerCase()
    return (
      command.title.toLowerCase().includes(search) ||
      command.description.toLowerCase().includes(search) ||
      command.aliases?.some((alias) => alias.toLowerCase().includes(search))
    )
  })

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [searchTerm])

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex((prev) =>
            prev < filteredCommands.length - 1 ? prev + 1 : 0
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredCommands.length - 1
          )
          break
        case 'Enter':
          e.preventDefault()
          if (filteredCommands[selectedIndex]) {
            handleSelect(filteredCommands[selectedIndex])
          }
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, filteredCommands])

  // Scroll selected item into view
  useEffect(() => {
    if (menuRef.current && filteredCommands.length > 0) {
      const selectedItem = menuRef.current.querySelector(`[data-index="${selectedIndex}"]`)
      selectedItem?.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex])

  const handleSelect = (command: SlashCommand) => {
    if (!editor) return

    // Delete the slash character and any search text
    const { from } = editor.state.selection
    const textBefore = editor.state.doc.textBetween(Math.max(0, from - 50), from)
    const slashIndex = textBefore.lastIndexOf('/')
    if (slashIndex !== -1) {
      const deleteFrom = from - (textBefore.length - slashIndex)
      editor.chain().focus().deleteRange({ from: deleteFrom, to: from }).run()
    }

    // Execute the command
    command.action(editor)
    onSelect(command)
    onClose()
    setSearchTerm('')
  }

  if (!isOpen || !editor) return null

  return (
    <>
      {/* Backdrop to capture clicks outside */}
      <div
        className="fixed inset-0 z-40"
        onClick={() => {
          onClose()
          setSearchTerm('')
        }}
      />

      {/* Command Menu */}
      <div
        ref={menuRef}
        className="fixed z-50 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-xl overflow-hidden"
        style={{
          top: position.top,
          left: position.left,
          width: '280px',
          maxHeight: '320px',
        }}
      >
        {/* Search input */}
        <div className="p-2 border-b border-[var(--border)]">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search commands..."
            className="w-full px-2 py-1.5 text-sm bg-transparent focus:outline-none"
            autoFocus
          />
        </div>

        {/* Commands list */}
        <div className="overflow-y-auto max-h-[260px]">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((command, index) => (
              <button
                key={command.id}
                data-index={index}
                onClick={() => handleSelect(command)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-colors ${
                  index === selectedIndex
                    ? 'bg-[var(--primary)]/10'
                    : 'hover:bg-[var(--secondary)]/10'
                }`}
              >
                <div className={`p-1.5 rounded ${
                  index === selectedIndex
                    ? 'bg-[var(--primary)]/20 text-[var(--primary)]'
                    : 'bg-[var(--secondary)]/20 text-[var(--muted)]'
                }`}>
                  {command.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{command.title}</div>
                  <div className="text-xs text-[var(--muted)] truncate">{command.description}</div>
                </div>
              </button>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-[var(--muted)]">
              No commands found
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="p-2 border-t border-[var(--border)] text-[10px] text-[var(--muted)] flex items-center justify-between">
          <span>↑↓ Navigate</span>
          <span>↵ Select</span>
          <span>Esc Close</span>
        </div>
      </div>
    </>
  )
}

export default SlashCommandMenu
