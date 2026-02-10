'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, AtSign, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { MentionSuggestions } from './MentionSuggestions'

interface User {
  id: string
  name: string | null
  image: string | null
  headline?: string | null
}

interface CommentFormProps {
  placeholder?: string
  submitLabel?: string
  projectMembers?: User[]
  autoFocus?: boolean
  isSubmitting?: boolean
  onSubmit: (content: string) => Promise<void>
  onCancel?: () => void
  showCancelButton?: boolean
  minRows?: number
  maxRows?: number
}

export function CommentForm({
  placeholder = 'Write a comment...',
  submitLabel = 'Comment',
  projectMembers = [],
  autoFocus = false,
  isSubmitting = false,
  onSubmit,
  onCancel,
  showCancelButton = false,
  minRows = 2,
  maxRows = 6,
}: CommentFormProps) {
  const [content, setContent] = useState('')
  const [showMentions, setShowMentions] = useState(false)
  const [mentionSearch, setMentionSearch] = useState('')
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 })
  const [cursorPosition, setCursorPosition] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      const lineHeight = 20
      const minHeight = minRows * lineHeight + 16
      const maxHeight = maxRows * lineHeight + 16
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = `${Math.min(Math.max(scrollHeight, minHeight), maxHeight)}px`
    }
  }, [content, minRows, maxRows])

  // Focus on mount if autoFocus
  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [autoFocus])

  // Handle input change and detect @ mentions
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    const cursorPos = e.target.selectionStart
    setContent(value)
    setCursorPosition(cursorPos)

    // Check if we should show mention suggestions
    const textBeforeCursor = value.substring(0, cursorPos)
    const atMatch = textBeforeCursor.match(/@(\w*)$/)

    if (atMatch && projectMembers.length > 0) {
      // Calculate position for mention popup
      if (textareaRef.current) {
        const rect = textareaRef.current.getBoundingClientRect()
        // Position below the cursor area
        setMentionPosition({
          top: rect.bottom + window.scrollY + 4,
          left: rect.left + window.scrollX,
        })
      }
      setShowMentions(true)
      setMentionSearch(atMatch[1])
    } else {
      setShowMentions(false)
      setMentionSearch('')
    }
  }, [projectMembers.length])

  // Insert mention into content
  const handleSelectMention = useCallback((user: User) => {
    const textBeforeCursor = content.substring(0, cursorPosition)
    const textAfterCursor = content.substring(cursorPosition)

    // Find the @ symbol
    const atIndex = textBeforeCursor.lastIndexOf('@')
    const newText =
      textBeforeCursor.substring(0, atIndex) +
      `@${user.name} ` +
      textAfterCursor

    setContent(newText)
    setShowMentions(false)

    // Refocus textarea and set cursor position
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus()
        const newCursorPos = atIndex + (user.name?.length || 0) + 2
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos)
      }
    }, 0)
  }, [content, cursorPosition])

  // Handle submit
  const handleSubmit = async () => {
    if (!content.trim() || isSubmitting) return

    try {
      await onSubmit(content.trim())
      setContent('')
    } catch (error) {
      console.error('Error submitting comment:', error)
    }
  }

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleSubmit()
    } else if (e.key === 'Escape') {
      if (showMentions) {
        setShowMentions(false)
      } else if (onCancel) {
        onCancel()
      }
    }
  }

  // Insert @ symbol
  const handleInsertAt = () => {
    if (textareaRef.current) {
      const pos = textareaRef.current.selectionStart
      const newContent = content.substring(0, pos) + '@' + content.substring(pos)
      setContent(newContent)
      setShowMentions(true)
      setMentionSearch('')
      setTimeout(() => {
        textareaRef.current?.focus()
        textareaRef.current?.setSelectionRange(pos + 1, pos + 1)
      }, 0)
    }
  }

  return (
    <div className="relative">
      {/* Textarea */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isSubmitting}
          className="w-full px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 resize-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ minHeight: `${minRows * 20 + 16}px` }}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-1">
          {projectMembers.length > 0 && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={handleInsertAt}
              disabled={isSubmitting}
              className="h-7 px-2 text-xs"
              title="Mention someone (@)"
            >
              <AtSign className="w-3 h-3 mr-1" />
              Mention
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[var(--muted)] hidden sm:inline">
            Ctrl+Enter to submit
          </span>
          {showCancelButton && onCancel && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={onCancel}
              disabled={isSubmitting}
              className="h-7 px-3 text-xs"
            >
              Cancel
            </Button>
          )}
          <Button
            type="button"
            size="sm"
            onClick={handleSubmit}
            disabled={isSubmitting || !content.trim()}
            className="h-7 px-3 text-xs font-bold"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <Send className="w-3 h-3 mr-1" />
                {submitLabel}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Mention suggestions */}
      <MentionSuggestions
        isOpen={showMentions}
        position={mentionPosition}
        searchTerm={mentionSearch}
        users={projectMembers}
        onSelect={handleSelectMention}
        onClose={() => setShowMentions(false)}
      />
    </div>
  )
}

export default CommentForm
