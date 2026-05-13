'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { Extension, Node, mergeAttributes } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { useCallback, useEffect, useState, useRef } from 'react'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image as ImageIcon,
  Upload,
  Undo,
  Redo,
  Code,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  IndentIncrease,
  IndentDecrease,
  Highlighter,
  Subscript as SubIcon,
  Superscript as SuperIcon,
  Palette,
  FileCode,
  BookOpen,
  Sparkles,
} from 'lucide-react'

interface TipTapEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
  onPaste?: (text: string) => void
}

// Figure / Figcaption nodes for journalism-style captioned images.
// StarterKit doesn't ship these, so we add them minimally:
//   <figure>
//     <img ... />
//     <figcaption>Caption text · <em>Photo credit</em></figcaption>
//   </figure>
// renderHTML passes attributes through, parseHTML matches the tags
// directly so pasted HTML containing figures (e.g. mammoth's DOCX
// output) is preserved.
const Figure = Node.create({
  name: 'figure',
  group: 'block',
  content: 'image figcaption?',
  isolating: true,
  parseHTML() {
    return [{ tag: 'figure' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['figure', mergeAttributes(HTMLAttributes), 0]
  },
})

const Figcaption = Node.create({
  name: 'figcaption',
  content: 'inline*',
  parseHTML() {
    return [{ tag: 'figcaption' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['figcaption', mergeAttributes(HTMLAttributes), 0]
  },
})

// Pull-quote — a separate node from the regular Blockquote so toggling
// it doesn't clobber existing block quotes. Renders as
// <blockquote class="pull-quote">...</blockquote>; styled in globals.css
// with the larger Playfair Display + border-top/bottom treatment.
// Toggled from the toolbar via the built-in toggleWrap command, so
// no custom addCommands needed.
const PullQuote = Node.create({
  name: 'pullquote',
  group: 'block',
  content: 'block+',
  defining: true,
  parseHTML() {
    return [{ tag: 'blockquote.pull-quote' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['blockquote', mergeAttributes(HTMLAttributes, { class: 'pull-quote' }), 0]
  },
})

// Tab key handler. TipTap's StarterKit only binds Tab when the caret is
// inside a list item (sink / lift the item). Outside lists it does
// nothing, which lets the browser steal Tab and move focus to the next
// form control — so a writer trying to indent a paragraph just loses
// focus. This extension adds:
//   • In a list      Tab/Shift+Tab nest/unnest the list item (unchanged).
//   • Anywhere else  Tab inserts 4 non-breaking spaces (an indent that
//                    survives HTML's whitespace collapsing) and Shift+Tab
//                    deletes them when they precede the caret.
const TabIndent = Extension.create({
  name: 'tabIndent',
  addKeyboardShortcuts() {
    const INDENT = '    '
    return {
      Tab: () => {
        if (this.editor.isActive('listItem')) {
          return this.editor.commands.sinkListItem('listItem')
        }
        return this.editor.commands.insertContent(INDENT)
      },
      'Shift-Tab': () => {
        if (this.editor.isActive('listItem')) {
          return this.editor.commands.liftListItem('listItem')
        }
        // Best-effort outdent: if the four chars immediately before the
        // caret are our indent block, delete them.
        const { from } = this.editor.state.selection
        const start = Math.max(0, from - INDENT.length)
        const text = this.editor.state.doc.textBetween(start, from)
        if (text === INDENT) {
          return this.editor.chain().focus().deleteRange({ from: start, to: from }).run()
        }
        return false
      },
    }
  },
})

// Citation format patterns
const citationPatterns = {
  // MLA: Author Last, First. "Title." Container, vol. #, no. #, Year, pp. #-#.
  mla: /^([A-Z][a-z]+(?:,\s+[A-Z][a-z]+)?(?:\s+et\s+al\.)?)\.\s+"([^"]+)"\.\s*([^,]+)(?:,\s*vol\.\s*(\d+))?(?:,\s*no\.\s*(\d+))?(?:,\s*(\d{4}))?(?:,\s*pp?\.\s*([\d-]+))?\.?$/i,

  // APA: Author, A. A. (Year). Title of work. Publisher. DOI/URL
  apa: /^([A-Z][a-z]+(?:,\s+[A-Z]\.(?:\s+[A-Z]\.)?)?(?:\s+&\s+[A-Z][a-z]+(?:,\s+[A-Z]\.(?:\s+[A-Z]\.)?)?)*)\s+\((\d{4})\)\.\s+(.+?)(?:\.\s+([^.]+?))?(?:\.\s+(https?:\/\/[^\s]+|doi:[^\s]+))?\.?$/i,

  // Chicago: Author Last, First. Title of Work. Place: Publisher, Year.
  chicago: /^([A-Z][a-z]+(?:,\s+[A-Z][a-z]+)?(?:\s+and\s+[A-Z][a-z]+(?:,\s+[A-Z][a-z]+)?)?)\.\s+(.+?)(?:\.\s+([^:]+):\s+([^,]+),?\s*)?(\d{4})\.?$/i,
}

export interface ParsedCitation {
  format: 'MLA' | 'APA' | 'Chicago' | 'Unknown'
  authors: string
  title: string
  year?: string
  publisher?: string
  volume?: string
  issue?: string
  pages?: string
  url?: string
  raw: string
}

export function parseCitation(text: string): ParsedCitation | null {
  const trimmed = text.trim()

  // Try MLA
  const mlaMatch = trimmed.match(citationPatterns.mla)
  if (mlaMatch) {
    return {
      format: 'MLA',
      authors: mlaMatch[1],
      title: mlaMatch[2],
      publisher: mlaMatch[3],
      volume: mlaMatch[4],
      issue: mlaMatch[5],
      year: mlaMatch[6],
      pages: mlaMatch[7],
      raw: trimmed,
    }
  }

  // Try APA
  const apaMatch = trimmed.match(citationPatterns.apa)
  if (apaMatch) {
    return {
      format: 'APA',
      authors: apaMatch[1],
      year: apaMatch[2],
      title: apaMatch[3],
      publisher: apaMatch[4],
      url: apaMatch[5],
      raw: trimmed,
    }
  }

  // Try Chicago
  const chicagoMatch = trimmed.match(citationPatterns.chicago)
  if (chicagoMatch) {
    return {
      format: 'Chicago',
      authors: chicagoMatch[1],
      title: chicagoMatch[2],
      publisher: chicagoMatch[4] || chicagoMatch[3],
      year: chicagoMatch[5],
      raw: trimmed,
    }
  }

  return null
}

export default function TipTapEditor({
  content,
  onChange,
  placeholder = 'Start writing your article...',
  onPaste,
}: TipTapEditorProps) {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showImageMenu, setShowImageMenu] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [citationNotification, setCitationNotification] = useState<ParsedCitation | null>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        codeBlock: {
          HTMLAttributes: {
            class: 'code-block',
          },
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[var(--primary)] underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full rounded-lg',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Subscript,
      Superscript,
      TextStyle,
      Color,
      TabIndent,
      Figure,
      Figcaption,
      PullQuote,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-lg max-w-none min-h-[400px] focus:outline-none p-4',
      },
      handlePaste: (view, event) => {
        const text = event.clipboardData?.getData('text/plain')
        if (text && onPaste) {
          // Check for citation format
          const citation = parseCitation(text)
          if (citation) {
            setCitationNotification(citation)
            onPaste(text)
            // Auto-dismiss after 5 seconds
            setTimeout(() => setCitationNotification(null), 5000)
          }
        }
        return false // Let TipTap handle the paste normally
      },
    },
  })

  // Sync editor content when the prop changes externally (e.g. re-parse)
  useEffect(() => {
    if (editor && content !== undefined) {
      const currentContent = editor.getHTML()
      // Only update if the content actually differs (avoids cursor reset on self-edits)
      if (currentContent !== content) {
        editor.commands.setContent(content, { emitUpdate: false })
      }
    }
  }, [editor, content])

  // Dismiss citation notification
  const dismissCitation = useCallback(() => {
    setCitationNotification(null)
  }, [])

  if (!editor) {
    return (
      <div className="editor-loading">
        <div className="loading-spinner"></div>
        <p>Loading editor...</p>
      </div>
    )
  }

  const addLink = () => {
    const url = window.prompt('Enter URL:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  // Escape user-supplied caption / credit text for safe HTML insertion.
  // Used only for figure / figcaption text, which the schema-aware
  // sanitizer will validate again on save.
  const escapeForHtml = (s: string) =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')

  const insertImageWithMetadata = (src: string) => {
    const caption = (window.prompt('Caption (optional — leave blank to skip):') || '').trim()
    const credit = (window.prompt('Photo credit (optional — e.g. "Photo: Jane Smith"):') || '').trim()
    if (!caption && !credit) {
      // No metadata — fall back to plain image insertion.
      editor.chain().focus().setImage({ src }).run()
      return
    }
    const captionParts: string[] = []
    if (caption) captionParts.push(escapeForHtml(caption))
    if (credit) captionParts.push(`<em>${escapeForHtml(credit)}</em>`)
    const figureHtml = `<figure><img src="${escapeForHtml(src)}" alt="${escapeForHtml(caption)}" /><figcaption>${captionParts.join(' · ')}</figcaption></figure>`
    editor.chain().focus().insertContent(figureHtml).run()
  }

  const addImageFromUrl = () => {
    const url = window.prompt('Enter image URL:')
    if (url) insertImageWithMetadata(url)
    setShowImageMenu(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      alert('Only JPEG, PNG, and WebP images are allowed.')
      e.target.value = ''
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be under 5MB.')
      e.target.value = ''
      return
    }

    setImageUploading(true)
    setShowImageMenu(false)
    try {
      const reader = new FileReader()
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64, folder: 'articles' }),
      })

      const data = await res.json()
      if (data.success && data.data?.url) {
        insertImageWithMetadata(data.data.url)
      } else {
        alert(data.error || 'Failed to upload image.')
      }
    } catch {
      alert('Failed to upload image. Please try again.')
    } finally {
      setImageUploading(false)
      e.target.value = ''
    }
  }

  const setColor = (color: string) => {
    editor.chain().focus().setColor(color).run()
    setShowColorPicker(false)
  }

  // Indent/Outdent using margin classes
  const indent = () => {
    // Get current selection and wrap in a div with indent class or update existing
    const { from, to } = editor.state.selection
    const currentNode = editor.state.doc.nodeAt(from)

    // For now, we'll use blockquote as a semantic indent
    // This is a common pattern in rich text editors
    if (!editor.isActive('blockquote')) {
      editor.chain().focus().setBlockquote().run()
    }
  }

  const outdent = () => {
    if (editor.isActive('blockquote')) {
      editor.chain().focus().unsetBlockquote().run()
    }
  }

  const colors = [
    '#000000', '#374151', '#6B7280', '#9CA3AF',
    '#EF4444', '#F97316', '#EAB308', '#22C55E',
    '#14B8A6', '#3B82F6', '#8B5CF6', '#EC4899',
  ]

  return (
    <div className="tiptap-editor">
      {/* Citation Detection Notification */}
      {citationNotification && (
        <div className="citation-notification">
          <div className="citation-header">
            <BookOpen size={16} />
            <span>{citationNotification.format} Citation Detected!</span>
            <button onClick={dismissCitation} className="citation-dismiss">×</button>
          </div>
          <div className="citation-details">
            <p><strong>Author:</strong> {citationNotification.authors}</p>
            <p><strong>Title:</strong> {citationNotification.title}</p>
            {citationNotification.year && <p><strong>Year:</strong> {citationNotification.year}</p>}
            {citationNotification.publisher && <p><strong>Publisher:</strong> {citationNotification.publisher}</p>}
          </div>
          <p className="citation-hint">
            <Sparkles size={12} /> This will be added to your references automatically
          </p>
        </div>
      )}

      <div className="editor-toolbar">
        {/* Text Formatting */}
        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`toolbar-btn ${editor.isActive('bold') ? 'active' : ''}`}
            title="Bold (Ctrl+B)"
          >
            <Bold size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`toolbar-btn ${editor.isActive('italic') ? 'active' : ''}`}
            title="Italic (Ctrl+I)"
          >
            <Italic size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`toolbar-btn ${editor.isActive('underline') ? 'active' : ''}`}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`toolbar-btn ${editor.isActive('strike') ? 'active' : ''}`}
            title="Strikethrough"
          >
            <Strikethrough size={18} />
          </button>
        </div>

        <div className="toolbar-divider" />

        {/* Advanced Formatting */}
        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHighlight({ color: '#fef08a' }).run()}
            className={`toolbar-btn ${editor.isActive('highlight') ? 'active' : ''}`}
            title="Highlight"
          >
            <Highlighter size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            className={`toolbar-btn ${editor.isActive('subscript') ? 'active' : ''}`}
            title="Subscript"
          >
            <SubIcon size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            className={`toolbar-btn ${editor.isActive('superscript') ? 'active' : ''}`}
            title="Superscript"
          >
            <SuperIcon size={18} />
          </button>
          <div className="color-picker-wrapper">
            <button
              type="button"
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="toolbar-btn"
              title="Text Color"
            >
              <Palette size={18} />
            </button>
            {showColorPicker && (
              <div className="color-picker-dropdown">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setColor(color)}
                    className="color-swatch"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="toolbar-divider" />

        {/* Headings */}
        <div className="toolbar-group">
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`toolbar-btn ${editor.isActive('heading', { level: 1 }) ? 'active' : ''}`}
            title="Heading 1"
          >
            <Heading1 size={18} />
          </button>
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`toolbar-btn ${editor.isActive('heading', { level: 2 }) ? 'active' : ''}`}
            title="Heading 2"
          >
            <Heading2 size={18} />
          </button>
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={`toolbar-btn ${editor.isActive('heading', { level: 3 }) ? 'active' : ''}`}
            title="Heading 3"
          >
            <Heading3 size={18} />
          </button>
        </div>

        <div className="toolbar-divider" />

        {/* Text Alignment */}
        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`toolbar-btn ${editor.isActive({ textAlign: 'left' }) ? 'active' : ''}`}
            title="Align Left"
          >
            <AlignLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`toolbar-btn ${editor.isActive({ textAlign: 'center' }) ? 'active' : ''}`}
            title="Align Center"
          >
            <AlignCenter size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`toolbar-btn ${editor.isActive({ textAlign: 'right' }) ? 'active' : ''}`}
            title="Align Right"
          >
            <AlignRight size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`toolbar-btn ${editor.isActive({ textAlign: 'justify' }) ? 'active' : ''}`}
            title="Justify"
          >
            <AlignJustify size={18} />
          </button>
        </div>

        <div className="toolbar-divider" />

        {/* Lists & Indent */}
        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`toolbar-btn ${editor.isActive('bulletList') ? 'active' : ''}`}
            title="Bullet List"
          >
            <List size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`toolbar-btn ${editor.isActive('orderedList') ? 'active' : ''}`}
            title="Numbered List"
          >
            <ListOrdered size={18} />
          </button>
          <button
            type="button"
            onClick={indent}
            className={`toolbar-btn ${editor.isActive('blockquote') ? 'active' : ''}`}
            title="Indent (Quote)"
          >
            <IndentIncrease size={18} />
          </button>
          <button
            type="button"
            onClick={outdent}
            className="toolbar-btn"
            title="Outdent"
          >
            <IndentDecrease size={18} />
          </button>
        </div>

        <div className="toolbar-divider" />

        {/* Blocks */}
        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`toolbar-btn ${editor.isActive('blockquote') ? 'active' : ''}`}
            title="Quote"
          >
            <Quote size={18} />
          </button>
          <button
            type="button"
            onClick={() => {
              // toggleWrap is built into TipTap; wraps the current
              // block-level selection in a pullquote node (or unwraps
              // if it's already inside one).
              editor.chain().focus().toggleWrap('pullquote').run()
            }}
            className={`toolbar-btn ${editor.isActive('pullquote') ? 'active' : ''}`}
            title="Pull-quote"
          >
            <Quote size={18} className="text-theme-primary" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`toolbar-btn ${editor.isActive('code') ? 'active' : ''}`}
            title="Inline Code"
          >
            <Code size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`toolbar-btn ${editor.isActive('codeBlock') ? 'active' : ''}`}
            title="Code Block"
          >
            <FileCode size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="toolbar-btn"
            title="Horizontal Rule"
          >
            <Minus size={18} />
          </button>
        </div>

        <div className="toolbar-divider" />

        {/* Media */}
        <div className="toolbar-group">
          <button
            type="button"
            onClick={addLink}
            className={`toolbar-btn ${editor.isActive('link') ? 'active' : ''}`}
            title="Add Link"
          >
            <LinkIcon size={18} />
          </button>
          <div className="image-picker-wrapper">
            <button
              type="button"
              onClick={() => setShowImageMenu(!showImageMenu)}
              className={`toolbar-btn ${imageUploading ? 'active' : ''}`}
              title="Add Image"
              disabled={imageUploading}
            >
              {imageUploading ? <Upload size={18} className="animate-pulse" /> : <ImageIcon size={18} />}
            </button>
            {showImageMenu && (
              <div className="image-picker-dropdown">
                <button
                  type="button"
                  onClick={addImageFromUrl}
                  className="image-picker-option"
                >
                  <LinkIcon size={14} />
                  <span>From URL</span>
                </button>
                <button
                  type="button"
                  onClick={() => { imageInputRef.current?.click(); }}
                  className="image-picker-option"
                >
                  <Upload size={14} />
                  <span>Upload File</span>
                </button>
              </div>
            )}
            <input
              ref={imageInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageUpload}
              className="hidden"
              style={{ display: 'none' }}
            />
          </div>
        </div>

        <div className="toolbar-divider" />

        {/* History */}
        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="toolbar-btn"
            title="Undo (Ctrl+Z)"
          >
            <Undo size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="toolbar-btn"
            title="Redo (Ctrl+Y)"
          >
            <Redo size={18} />
          </button>
        </div>
      </div>

      <EditorContent editor={editor} className="editor-content" />

      <style jsx>{`
        .tiptap-editor {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
        }

        .citation-notification {
          background: linear-gradient(135deg, var(--primary)/10, var(--accent)/10);
          border-bottom: 1px solid var(--primary)/30;
          padding: 12px 16px;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .citation-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          color: var(--primary);
          margin-bottom: 8px;
        }

        .citation-dismiss {
          margin-left: auto;
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          color: var(--muted-foreground);
          padding: 0 4px;
        }

        .citation-dismiss:hover {
          color: var(--foreground);
        }

        .citation-details {
          font-size: 13px;
          color: var(--foreground);
          padding-left: 24px;
        }

        .citation-details p {
          margin: 4px 0;
        }

        .citation-hint {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: var(--muted-foreground);
          margin-top: 8px;
          padding-left: 24px;
        }

        .editor-toolbar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 4px;
          padding: 12px;
          background: var(--muted);
          border-bottom: 1px solid var(--border);
        }

        .toolbar-group {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .toolbar-divider {
          width: 1px;
          height: 24px;
          background: var(--border);
          margin: 0 8px;
        }

        .toolbar-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: transparent;
          border: none;
          border-radius: 6px;
          color: var(--foreground);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .toolbar-btn:hover:not(:disabled) {
          background: var(--background);
        }

        .toolbar-btn.active {
          background: var(--primary);
          color: white;
        }

        .toolbar-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .color-picker-wrapper,
        .image-picker-wrapper {
          position: relative;
        }

        .image-picker-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 50;
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 6px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          margin-top: 4px;
          min-width: 140px;
        }

        .image-picker-option {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          font-size: 13px;
          color: var(--foreground);
          background: transparent;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.15s ease;
        }

        .image-picker-option:hover {
          background: var(--muted);
        }

        .color-picker-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 50;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 4px;
          padding: 8px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          margin-top: 4px;
        }

        .color-swatch {
          width: 24px;
          height: 24px;
          border-radius: 4px;
          border: 1px solid var(--border);
          cursor: pointer;
          transition: transform 0.15s ease;
        }

        .color-swatch:hover {
          transform: scale(1.15);
        }

        .editor-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px;
          color: var(--muted-foreground);
        }

        .loading-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--muted);
          border-top-color: var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 12px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .toolbar-divider {
            display: none;
          }

          .editor-toolbar {
            gap: 2px;
          }
        }
      `}</style>

      <style jsx global>{`
        .editor-content .ProseMirror {
          min-height: 400px;
          padding: 24px;
          color: var(--foreground);
        }

        .editor-content .ProseMirror:focus {
          outline: none;
        }

        .editor-content .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: var(--muted-foreground);
          pointer-events: none;
          height: 0;
        }

        .editor-content .ProseMirror h1 {
          font-size: 2em;
          font-weight: 700;
          margin: 1em 0 0.5em;
          color: var(--foreground);
        }

        .editor-content .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: 600;
          margin: 1em 0 0.5em;
          color: var(--foreground);
        }

        .editor-content .ProseMirror h3 {
          font-size: 1.25em;
          font-weight: 600;
          margin: 1em 0 0.5em;
          color: var(--foreground);
        }

        .editor-content .ProseMirror p {
          margin: 0.75em 0;
          line-height: 1.7;
        }

        .editor-content .ProseMirror ul,
        .editor-content .ProseMirror ol {
          padding-left: 1.5em;
          margin: 0.75em 0;
        }

        .editor-content .ProseMirror li {
          margin: 0.25em 0;
        }

        .editor-content .ProseMirror blockquote {
          border-left: 4px solid var(--primary);
          padding-left: 1em;
          margin: 1em 0 1em 1em;
          color: var(--muted-foreground);
          font-style: italic;
        }

        /* Nested blockquotes for indent levels */
        .editor-content .ProseMirror blockquote blockquote {
          margin-left: 1em;
        }

        .editor-content .ProseMirror code {
          background: var(--muted);
          padding: 0.2em 0.4em;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.9em;
        }

        .editor-content .ProseMirror pre {
          background: var(--muted);
          padding: 1em;
          border-radius: 8px;
          overflow-x: auto;
          font-family: 'Fira Code', 'Consolas', monospace;
        }

        .editor-content .ProseMirror pre code {
          background: none;
          padding: 0;
        }

        .editor-content .ProseMirror hr {
          border: none;
          border-top: 2px solid var(--border);
          margin: 2em 0;
        }

        .editor-content .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1em 0;
        }

        .editor-content .ProseMirror figure {
          margin: 1.5em 0;
        }

        .editor-content .ProseMirror figure img {
          margin: 0;
        }

        .editor-content .ProseMirror figcaption {
          margin-top: 0.5em;
          padding: 0 0.25em;
          font-size: 0.875em;
          color: var(--muted-foreground);
          font-style: normal;
          line-height: 1.5;
        }

        .editor-content .ProseMirror figcaption em {
          font-style: italic;
          opacity: 0.85;
        }

        .editor-content .ProseMirror a {
          color: var(--primary);
          text-decoration: underline;
        }

        /* Text alignment styles */
        .editor-content .ProseMirror [style*="text-align: center"] {
          text-align: center;
        }

        .editor-content .ProseMirror [style*="text-align: right"] {
          text-align: right;
        }

        .editor-content .ProseMirror [style*="text-align: justify"] {
          text-align: justify;
        }

        /* Highlight styles */
        .editor-content .ProseMirror mark {
          background-color: #fef08a;
          padding: 0.1em 0.2em;
          border-radius: 2px;
        }

        /* Subscript and Superscript */
        .editor-content .ProseMirror sub {
          font-size: 0.75em;
          vertical-align: sub;
        }

        .editor-content .ProseMirror sup {
          font-size: 0.75em;
          vertical-align: super;
        }
      `}</style>
    </div>
  )
}
