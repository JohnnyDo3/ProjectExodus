'use client'

import { Editor } from '@tiptap/react'
import { useState, useCallback } from 'react'
import {
  Bold, Italic, Underline, Strikethrough, Code, Heading1, Heading2, Heading3,
  List, ListOrdered, ListChecks, Quote, Link2, Image as ImageIcon, Table as TableIcon,
  Undo, Redo, Save, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Highlighter, Subscript, Superscript, RemoveFormatting, Minus, Type,
  ChevronDown, Palette, MoreHorizontal, Maximize2, Search, Keyboard,
  FileText, Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface EditorToolbarProps {
  editor: Editor | null
  onSave?: () => Promise<void>
  isSaving?: boolean
  hasUnsavedChanges?: boolean
  lastSaved?: Date | null
  onFindReplace?: () => void
  onZoom?: () => void
  onFocusMode?: () => void
  onKeyboardShortcuts?: () => void
  zoom?: number
  showAdvanced?: boolean
}

export function EditorToolbar({
  editor,
  onSave,
  isSaving = false,
  hasUnsavedChanges = false,
  lastSaved,
  onFindReplace,
  onZoom,
  onFocusMode,
  onKeyboardShortcuts,
  zoom = 100,
  showAdvanced = true,
}: EditorToolbarProps) {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showHighlightPicker, setShowHighlightPicker] = useState(false)
  const [showHeadingMenu, setShowHeadingMenu] = useState(false)

  const colors = [
    { name: 'Default', value: 'inherit' },
    { name: 'Gray', value: '#6b7280' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Yellow', value: '#eab308' },
    { name: 'Green', value: '#22c55e' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Purple', value: '#a855f7' },
    { name: 'Pink', value: '#ec4899' },
  ]

  const highlightColors = [
    { name: 'Yellow', value: '#fef08a' },
    { name: 'Green', value: '#bbf7d0' },
    { name: 'Blue', value: '#bfdbfe' },
    { name: 'Pink', value: '#fbcfe8' },
    { name: 'Purple', value: '#e9d5ff' },
    { name: 'Orange', value: '#fed7aa' },
  ]

  const setLink = useCallback(() => {
    if (!editor) return

    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('Enter URL:', previousUrl)

    if (url === null) return

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const addImage = useCallback(() => {
    if (!editor) return

    const url = window.prompt('Enter image URL:')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const addTable = useCallback(() => {
    if (!editor) return

    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }, [editor])

  if (!editor) return null

  return (
    <div className="sticky top-0 z-20 bg-[var(--background)] border-b border-[var(--border)]">
      {/* Main Toolbar Row */}
      <div className="flex items-center gap-1 p-2 flex-wrap">
        {/* Undo/Redo */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-[var(--border)]">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo (Ctrl+Z)"
            className="h-8 w-8 p-0"
          >
            <Undo className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo (Ctrl+Y)"
            className="h-8 w-8 p-0"
          >
            <Redo className="w-4 h-4" />
          </Button>
        </div>

        {/* Heading Dropdown */}
        <div className="relative pr-2 border-r border-[var(--border)]">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowHeadingMenu(!showHeadingMenu)}
            className="h-8 px-2 gap-1"
          >
            <Type className="w-4 h-4" />
            <span className="text-xs">
              {editor.isActive('heading', { level: 1 }) ? 'H1' :
               editor.isActive('heading', { level: 2 }) ? 'H2' :
               editor.isActive('heading', { level: 3 }) ? 'H3' :
               editor.isActive('heading', { level: 4 }) ? 'H4' : 'Normal'}
            </span>
            <ChevronDown className="w-3 h-3" />
          </Button>
          {showHeadingMenu && (
            <div className="absolute top-full left-0 mt-1 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-lg py-1 z-50 min-w-[120px]">
              <button
                className="w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--secondary)]/20 flex items-center gap-2"
                onClick={() => { editor.chain().focus().setParagraph().run(); setShowHeadingMenu(false); }}
              >
                <Type className="w-4 h-4" /> Normal
              </button>
              <button
                className="w-full px-3 py-1.5 text-left text-lg font-bold hover:bg-[var(--secondary)]/20 flex items-center gap-2"
                onClick={() => { editor.chain().focus().toggleHeading({ level: 1 }).run(); setShowHeadingMenu(false); }}
              >
                <Heading1 className="w-4 h-4" /> Heading 1
              </button>
              <button
                className="w-full px-3 py-1.5 text-left text-base font-bold hover:bg-[var(--secondary)]/20 flex items-center gap-2"
                onClick={() => { editor.chain().focus().toggleHeading({ level: 2 }).run(); setShowHeadingMenu(false); }}
              >
                <Heading2 className="w-4 h-4" /> Heading 2
              </button>
              <button
                className="w-full px-3 py-1.5 text-left text-sm font-bold hover:bg-[var(--secondary)]/20 flex items-center gap-2"
                onClick={() => { editor.chain().focus().toggleHeading({ level: 3 }).run(); setShowHeadingMenu(false); }}
              >
                <Heading3 className="w-4 h-4" /> Heading 3
              </button>
            </div>
          )}
        </div>

        {/* Text Formatting */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-[var(--border)]">
          <Button
            size="sm"
            variant={editor.isActive('bold') ? 'primary' : 'ghost'}
            onClick={() => editor.chain().focus().toggleBold().run()}
            title="Bold (Ctrl+B)"
            className="h-8 w-8 p-0"
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant={editor.isActive('italic') ? 'primary' : 'ghost'}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            title="Italic (Ctrl+I)"
            className="h-8 w-8 p-0"
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant={editor.isActive('underline') ? 'primary' : 'ghost'}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            title="Underline (Ctrl+U)"
            className="h-8 w-8 p-0"
          >
            <Underline className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant={editor.isActive('strike') ? 'primary' : 'ghost'}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            title="Strikethrough"
            className="h-8 w-8 p-0"
          >
            <Strikethrough className="w-4 h-4" />
          </Button>
        </div>

        {/* Color Pickers */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-[var(--border)]">
          <div className="relative">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => { setShowColorPicker(!showColorPicker); setShowHighlightPicker(false); }}
              title="Text Color"
              className="h-8 w-8 p-0"
            >
              <Palette className="w-4 h-4" />
            </Button>
            {showColorPicker && (
              <div className="absolute top-full left-0 mt-1 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-lg p-2 z-50 grid grid-cols-3 gap-1">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    className="w-6 h-6 rounded border border-[var(--border)] hover:scale-110 transition-transform"
                    style={{ backgroundColor: color.value === 'inherit' ? 'var(--foreground)' : color.value }}
                    onClick={() => {
                      if (color.value === 'inherit') {
                        editor.chain().focus().unsetColor().run()
                      } else {
                        editor.chain().focus().setColor(color.value).run()
                      }
                      setShowColorPicker(false)
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <Button
              size="sm"
              variant={editor.isActive('highlight') ? 'primary' : 'ghost'}
              onClick={() => { setShowHighlightPicker(!showHighlightPicker); setShowColorPicker(false); }}
              title="Highlight"
              className="h-8 w-8 p-0"
            >
              <Highlighter className="w-4 h-4" />
            </Button>
            {showHighlightPicker && (
              <div className="absolute top-full left-0 mt-1 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-lg p-2 z-50 grid grid-cols-3 gap-1">
                {highlightColors.map((color) => (
                  <button
                    key={color.value}
                    className="w-6 h-6 rounded border border-[var(--border)] hover:scale-110 transition-transform"
                    style={{ backgroundColor: color.value }}
                    onClick={() => {
                      editor.chain().focus().toggleHighlight({ color: color.value }).run()
                      setShowHighlightPicker(false)
                    }}
                    title={color.name}
                  />
                ))}
                <button
                  className="w-6 h-6 rounded border border-[var(--border)] hover:scale-110 transition-transform flex items-center justify-center text-xs"
                  onClick={() => {
                    editor.chain().focus().unsetHighlight().run()
                    setShowHighlightPicker(false)
                  }}
                  title="Remove highlight"
                >
                  <RemoveFormatting className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-[var(--border)]">
          <Button
            size="sm"
            variant={editor.isActive('bulletList') ? 'primary' : 'ghost'}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            title="Bullet List"
            className="h-8 w-8 p-0"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant={editor.isActive('orderedList') ? 'primary' : 'ghost'}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            title="Numbered List"
            className="h-8 w-8 p-0"
          >
            <ListOrdered className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant={editor.isActive('taskList') ? 'primary' : 'ghost'}
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            title="Task List"
            className="h-8 w-8 p-0"
          >
            <ListChecks className="w-4 h-4" />
          </Button>
        </div>

        {/* Blocks & Insert */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-[var(--border)]">
          <Button
            size="sm"
            variant={editor.isActive('blockquote') ? 'primary' : 'ghost'}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            title="Quote"
            className="h-8 w-8 p-0"
          >
            <Quote className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant={editor.isActive('codeBlock') ? 'primary' : 'ghost'}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            title="Code Block"
            className="h-8 w-8 p-0"
          >
            <Code className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Horizontal Rule"
            className="h-8 w-8 p-0"
          >
            <Minus className="w-4 h-4" />
          </Button>
        </div>

        {/* Insert Items */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-[var(--border)]">
          <Button
            size="sm"
            variant={editor.isActive('link') ? 'primary' : 'ghost'}
            onClick={setLink}
            title="Insert Link (Ctrl+K)"
            className="h-8 w-8 p-0"
          >
            <Link2 className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={addImage}
            title="Insert Image"
            className="h-8 w-8 p-0"
          >
            <ImageIcon className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={addTable}
            title="Insert Table"
            className="h-8 w-8 p-0"
          >
            <TableIcon className="w-4 h-4" />
          </Button>
        </div>

        {/* Superscript/Subscript */}
        {showAdvanced && (
          <div className="flex items-center gap-0.5 pr-2 border-r border-[var(--border)]">
            <Button
              size="sm"
              variant={editor.isActive('superscript') ? 'primary' : 'ghost'}
              onClick={() => editor.chain().focus().toggleSuperscript().run()}
              title="Superscript"
              className="h-8 w-8 p-0"
            >
              <Superscript className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={editor.isActive('subscript') ? 'primary' : 'ghost'}
              onClick={() => editor.chain().focus().toggleSubscript().run()}
              title="Subscript"
              className="h-8 w-8 p-0"
            >
              <Subscript className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
              title="Clear Formatting"
              className="h-8 w-8 p-0"
            >
              <RemoveFormatting className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right side tools */}
        <div className="flex items-center gap-2">
          {onFindReplace && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onFindReplace}
              title="Find & Replace (Ctrl+F)"
              className="h-8 px-2 gap-1"
            >
              <Search className="w-4 h-4" />
            </Button>
          )}

          {onFocusMode && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onFocusMode}
              title="Focus Mode"
              className="h-8 px-2 gap-1"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          )}

          {onKeyboardShortcuts && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onKeyboardShortcuts}
              title="Keyboard Shortcuts"
              className="h-8 px-2 gap-1"
            >
              <Keyboard className="w-4 h-4" />
            </Button>
          )}

          {/* Save Status & Button */}
          <div className="flex items-center gap-2 pl-2 border-l border-[var(--border)]">
            {lastSaved && (
              <span className="text-xs text-[var(--muted)]">
                {hasUnsavedChanges ? 'Unsaved changes' : `Saved ${lastSaved.toLocaleTimeString()}`}
              </span>
            )}
            {onSave && (
              <Button
                size="sm"
                variant={hasUnsavedChanges ? 'primary' : 'ghost'}
                onClick={onSave}
                disabled={isSaving || !hasUnsavedChanges}
                className="h-8 px-3 gap-1 font-bold"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Close dropdowns when clicking outside */}
      {(showColorPicker || showHighlightPicker || showHeadingMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowColorPicker(false)
            setShowHighlightPicker(false)
            setShowHeadingMenu(false)
          }}
        />
      )}
    </div>
  )
}

export default EditorToolbar
