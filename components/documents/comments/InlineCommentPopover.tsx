'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, AtSign } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface User {
  id: string
  name: string | null
  image: string | null
}

interface InlineCommentPopoverProps {
  isOpen: boolean
  position: { top: number; left: number }
  selectedText: string
  selectionRange?: { from: number; to: number }
  projectMembers?: User[]
  onClose: () => void
  onSubmit: (content: string, quotedText: string, position: { from: number; to: number }) => Promise<void>
}

export function InlineCommentPopover({
  isOpen,
  position,
  selectedText,
  selectionRange,
  projectMembers = [],
  onClose,
  onSubmit,
}: InlineCommentPopoverProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showMentions, setShowMentions] = useState(false)
  const [mentionSearch, setMentionSearch] = useState('')
  const [cursorPosition, setCursorPosition] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  // Focus textarea when popover opens
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [isOpen])

  // Handle @ mentions
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    const cursorPos = e.target.selectionStart
    setContent(value)
    setCursorPosition(cursorPos)

    // Check if we should show mention suggestions
    const textBeforeCursor = value.substring(0, cursorPos)
    const atMatch = textBeforeCursor.match(/@(\w*)$/)

    if (atMatch) {
      setShowMentions(true)
      setMentionSearch(atMatch[1])
    } else {
      setShowMentions(false)
      setMentionSearch('')
    }
  }

  // Filter members based on search
  const filteredMembers = projectMembers.filter((member) =>
    member.name?.toLowerCase().includes(mentionSearch.toLowerCase())
  )

  // Insert mention
  const insertMention = (user: User) => {
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

    // Refocus textarea
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus()
        const newCursorPos = atIndex + (user.name?.length || 0) + 2
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos)
      }
    }, 0)
  }

  const handleSubmit = async () => {
    if (!content.trim() || !selectionRange) return

    setIsSubmitting(true)
    try {
      await onSubmit(content, selectedText, selectionRange)
      setContent('')
      onClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleSubmit()
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Popover */}
      <div
        ref={popoverRef}
        className="fixed z-50 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-xl w-80"
        style={{
          top: position.top,
          left: position.left,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[var(--primary)]" />
            <span className="font-semibold text-sm">Add Comment</span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={onClose}
            className="h-6 w-6 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Quoted text preview */}
        {selectedText && (
          <div className="mx-3 mt-3 px-3 py-2 bg-yellow-100/50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded-r">
            <p className="text-xs text-[var(--muted)] italic line-clamp-2">
              "{selectedText}"
            </p>
          </div>
        )}

        {/* Comment input */}
        <div className="p-3 relative">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Write a comment... (Use @ to mention)"
            className="w-full px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 resize-none"
            rows={3}
          />

          {/* Mention suggestions */}
          {showMentions && filteredMembers.length > 0 && (
            <div className="absolute left-3 right-3 bottom-full mb-1 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-lg max-h-32 overflow-y-auto">
              {filteredMembers.slice(0, 5).map((member) => (
                <button
                  key={member.id}
                  onClick={() => insertMention(member)}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[var(--secondary)]/10 text-left"
                >
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name || 'User'}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] text-xs font-bold">
                      {member.name?.[0]?.toUpperCase() || '?'}
                    </div>
                  )}
                  <span className="text-sm truncate">{member.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-3 border-t border-[var(--border)] bg-[var(--secondary)]/5">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
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
              }}
              className="h-7 px-2 text-xs"
              title="Mention someone"
            >
              <AtSign className="w-3 h-3 mr-1" />
              Mention
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[var(--muted)]">
              Ctrl+Enter to submit
            </span>
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={isSubmitting || !content.trim()}
              className="h-7 px-3 text-xs font-bold"
            >
              {isSubmitting ? (
                'Posting...'
              ) : (
                <>
                  <Send className="w-3 h-3 mr-1" />
                  Comment
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default InlineCommentPopover
