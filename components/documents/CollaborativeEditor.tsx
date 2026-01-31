'use client'

import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import CharacterCount from '@tiptap/extension-character-count'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import { useCallback, useEffect, useState } from 'react'
import {
  Bold, Italic, Underline, Strikethrough, Code, Heading1, Heading2, Heading3,
  List, ListOrdered, ListChecks, Quote, Link2, Image as ImageIcon, Table as TableIcon,
  Undo, Redo, Save, Eye, Clock, Users, MessageSquare, Sparkles,
  ChevronDown, Type, Palette, AlignLeft, AlignCenter, AlignRight,
  MoreHorizontal
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface CollaborativeEditorProps {
  documentId?: string
  initialContent?: string
  onSave?: (content: string) => Promise<void>
  onUpdate?: (content: string) => void
  readOnly?: boolean
  autoSave?: boolean
  autoSaveInterval?: number
  showToolbar?: boolean
  showStats?: boolean
  placeholder?: string
}

export function CollaborativeEditor({
  documentId,
  initialContent = '',
  onSave,
  onUpdate,
  readOnly = false,
  autoSave = true,
  autoSaveInterval = 30000,
  showToolbar = true,
  showStats = true,
  placeholder = 'Start writing your document...'
}: CollaborativeEditorProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showBubbleMenu, setShowBubbleMenu] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: {
          depth: 100,
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Link.configure({
        openOnClick: !readOnly,
        linkOnPaste: true,
      }),
      Image.configure({
        inline: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Highlight.configure({
        multicolor: true,
      }),
      Typography,
      CharacterCount,
      Color,
      TextStyle,
    ],
    content: initialContent,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      setHasUnsavedChanges(true)
      onUpdate?.(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none min-h-[500px] p-6',
      },
    },
  })

  // Auto-save functionality
  useEffect(() => {
    if (!autoSave || !onSave || !hasUnsavedChanges || !editor) return

    const timer = setTimeout(async () => {
      await handleSave()
    }, autoSaveInterval)

    return () => clearTimeout(timer)
  }, [autoSave, hasUnsavedChanges, editor, autoSaveInterval])

  const handleSave = async () => {
    if (!editor || !onSave) return

    setIsSaving(true)
    try {
      await onSave(editor.getHTML())
      setHasUnsavedChanges(false)
      setLastSaved(new Date())
    } catch (error) {
      console.error('Failed to save document:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const setLink = useCallback(() => {
    if (!editor) return

    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (url === null) return

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const addImage = useCallback(() => {
    if (!editor) return

    const url = window.prompt('Image URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const addTable = useCallback(() => {
    if (!editor) return

    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }, [editor])

  if (!editor) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-sm text-theme-muted">Loading editor...</div>
    </div>
  }

  const wordCount = editor.storage.characterCount.words()
  const charCount = editor.storage.characterCount.characters()

  return (
    <div className="relative w-full">
      {/* Toolbar */}
      {showToolbar && !readOnly && (
        <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-[var(--border)] shadow-sm">
          <div className="flex items-center gap-1 p-2 flex-wrap">
            {/* Text formatting */}
            <div className="flex items-center gap-0.5 border-r pr-2">
              <Button
                size="sm"
                variant={editor.isActive('bold') ? 'primary' : 'ghost'}
                onClick={() => editor.chain().focus().toggleBold().run()}
                title="Bold (Ctrl+B)"
              >
                <Bold className="w-4 h-4"/>
              </Button>
              <Button
                size="sm"
                variant={editor.isActive('italic') ? 'primary' : 'ghost'}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                title="Italic (Ctrl+I)"
              >
                <Italic className="w-4 h-4"/>
              </Button>
              <Button
                size="sm"
                variant={editor.isActive('strike') ? 'primary' : 'ghost'}
                onClick={() => editor.chain().focus().toggleStrike().run()}
                title="Strikethrough"
              >
                <Strikethrough className="w-4 h-4"/>
              </Button>
              <Button
                size="sm"
                variant={editor.isActive('code') ? 'primary' : 'ghost'}
                onClick={() => editor.chain().focus().toggleCode().run()}
                title="Inline Code"
              >
                <Code className="w-4 h-4"/>
              </Button>
            </div>

            {/* Headings */}
            <div className="flex items-center gap-0.5 border-r pr-2">
              <Button
                size="sm"
                variant={editor.isActive('heading', { level: 1 }) ? 'primary' : 'ghost'}
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                title="Heading 1"
              >
                <Heading1 className="w-4 h-4"/>
              </Button>
              <Button
                size="sm"
                variant={editor.isActive('heading', { level: 2 }) ? 'primary' : 'ghost'}
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                title="Heading 2"
              >
                <Heading2 className="w-4 h-4"/>
              </Button>
              <Button
                size="sm"
                variant={editor.isActive('heading', { level: 3 }) ? 'primary' : 'ghost'}
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                title="Heading 3"
              >
                <Heading3 className="w-4 h-4"/>
              </Button>
            </div>

            {/* Lists */}
            <div className="flex items-center gap-0.5 border-r pr-2">
              <Button
                size="sm"
                variant={editor.isActive('bulletList') ? 'primary' : 'ghost'}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                title="Bullet List"
              >
                <List className="w-4 h-4"/>
              </Button>
              <Button
                size="sm"
                variant={editor.isActive('orderedList') ? 'primary' : 'ghost'}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                title="Numbered List"
              >
                <ListOrdered className="w-4 h-4"/>
              </Button>
              <Button
                size="sm"
                variant={editor.isActive('taskList') ? 'primary' : 'ghost'}
                onClick={() => editor.chain().focus().toggleTaskList().run()}
                title="Task List"
              >
                <ListChecks className="w-4 h-4"/>
              </Button>
            </div>

            {/* Blocks */}
            <div className="flex items-center gap-0.5 border-r pr-2">
              <Button
                size="sm"
                variant={editor.isActive('blockquote') ? 'primary' : 'ghost'}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                title="Quote"
              >
                <Quote className="w-4 h-4"/>
              </Button>
              <Button
                size="sm"
                variant={editor.isActive('codeBlock') ? 'primary' : 'ghost'}
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                title="Code Block"
              >
                <Code className="w-4 h-4"/>
              </Button>
            </div>

            {/* Insert */}
            <div className="flex items-center gap-0.5 border-r pr-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={setLink}
                title="Insert Link"
              >
                <Link2 className="w-4 h-4"/>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={addImage}
                title="Insert Image"
              >
                <ImageIcon className="w-4 h-4"/>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={addTable}
                title="Insert Table"
              >
                <TableIcon className="w-4 h-4"/>
              </Button>
            </div>

            {/* History */}
            <div className="flex items-center gap-0.5 border-r pr-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                title="Undo (Ctrl+Z)"
              >
                <Undo className="w-4 h-4"/>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                title="Redo (Ctrl+Y)"
              >
                <Redo className="w-4 h-4"/>
              </Button>
            </div>

            {/* Save */}
            <div className="flex items-center gap-2 ml-auto">
              {autoSave && lastSaved && (
                <span className="text-xs text-theme-muted">
                  {hasUnsavedChanges ? 'Saving...' : `Saved ${lastSaved.toLocaleTimeString()}`}
                </span>
              )}
              <Button
                size="sm"
                variant={hasUnsavedChanges ? 'primary' : 'ghost'}
                onClick={handleSave}
                disabled={isSaving || !hasUnsavedChanges}
                title="Save (Ctrl+S)"
              >
                <Save className="w-4 h-4 mr-1"/>
                {isSaving ? 'Saving...' : hasUnsavedChanges ? 'Save' : 'Saved'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Editor content */}
      <div className="relative bg-white dark:bg-slate-900">
        <EditorContent editor={editor} />

        {/* Bubble menu for text selection */}
        {editor && !readOnly && (
          <BubbleMenu
            editor={editor}
            tippyOptions={{ duration: 100 }}
            className="bg-slate-900 dark:bg-slate-800 rounded-lg shadow-xl border border-slate-700 p-1 flex items-center gap-0.5"
          >
            <Button
              size="sm"
              variant={editor.isActive('bold') ? 'primary' : 'ghost'}
              onClick={() => editor.chain().focus().toggleBold().run()}
              className="text-white"
            >
              <Bold className="w-3 h-3"/>
            </Button>
            <Button
              size="sm"
              variant={editor.isActive('italic') ? 'primary' : 'ghost'}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className="text-white"
            >
              <Italic className="w-3 h-3"/>
            </Button>
            <Button
              size="sm"
              variant={editor.isActive('link') ? 'primary' : 'ghost'}
              onClick={setLink}
              className="text-white"
            >
              <Link2 className="w-3 h-3"/>
            </Button>
          </BubbleMenu>
        )}

        {/* Floating menu for new lines */}
        {editor && !readOnly && (
          <FloatingMenu
            editor={editor}
            tippyOptions={{ duration: 100 }}
            className="bg-slate-900 dark:bg-slate-800 rounded-lg shadow-xl border border-slate-700 p-1 flex items-center gap-0.5"
          >
            <Button
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className="text-white"
            >
              <Heading1 className="w-3 h-3"/>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className="text-white"
            >
              <List className="w-3 h-3"/>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => editor.chain().focus().toggleTaskList().run()}
              className="text-white"
            >
              <ListChecks className="w-3 h-3"/>
            </Button>
          </FloatingMenu>
        )}
      </div>

      {/* Stats bar */}
      {showStats && (
        <div className="sticky bottom-0 bg-white dark:bg-slate-900 border-t border-[var(--border)] px-4 py-2">
          <div className="flex items-center justify-between text-xs text-theme-muted">
            <div className="flex items-center gap-4">
              <span>{wordCount} words</span>
              <span>{charCount} characters</span>
            </div>
            {readOnly && (
              <Badge size="sm" variant="outline">
                <Eye className="w-3 h-3 mr-1"/>
                Read-only
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CollaborativeEditor
