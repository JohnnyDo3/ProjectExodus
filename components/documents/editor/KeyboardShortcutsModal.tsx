'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface KeyboardShortcutsModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ShortcutGroup {
  title: string
  shortcuts: { keys: string[]; description: string }[]
}

const SHORTCUT_GROUPS: ShortcutGroup[] = [
  {
    title: 'Text Formatting',
    shortcuts: [
      { keys: ['Ctrl', 'B'], description: 'Bold' },
      { keys: ['Ctrl', 'I'], description: 'Italic' },
      { keys: ['Ctrl', 'U'], description: 'Underline' },
      { keys: ['Ctrl', 'Shift', 'X'], description: 'Strikethrough' },
      { keys: ['Ctrl', 'E'], description: 'Inline code' },
      { keys: ['Ctrl', '`'], description: 'Code block' },
    ],
  },
  {
    title: 'Headings',
    shortcuts: [
      { keys: ['Ctrl', 'Alt', '1'], description: 'Heading 1' },
      { keys: ['Ctrl', 'Alt', '2'], description: 'Heading 2' },
      { keys: ['Ctrl', 'Alt', '3'], description: 'Heading 3' },
      { keys: ['Ctrl', 'Alt', '0'], description: 'Normal paragraph' },
    ],
  },
  {
    title: 'Lists',
    shortcuts: [
      { keys: ['Ctrl', 'Shift', '8'], description: 'Bullet list' },
      { keys: ['Ctrl', 'Shift', '7'], description: 'Numbered list' },
      { keys: ['Ctrl', 'Shift', '9'], description: 'Task list' },
      { keys: ['Tab'], description: 'Indent list item' },
      { keys: ['Shift', 'Tab'], description: 'Outdent list item' },
    ],
  },
  {
    title: 'Blocks & Structure',
    shortcuts: [
      { keys: ['Ctrl', 'Shift', 'B'], description: 'Blockquote' },
      { keys: ['Ctrl', 'Enter'], description: 'Insert line break' },
      { keys: ['---'], description: 'Horizontal rule (type & enter)' },
    ],
  },
  {
    title: 'Links & Media',
    shortcuts: [
      { keys: ['Ctrl', 'K'], description: 'Insert/edit link' },
      { keys: ['Ctrl', 'Shift', 'K'], description: 'Remove link' },
    ],
  },
  {
    title: 'Navigation',
    shortcuts: [
      { keys: ['Ctrl', 'F'], description: 'Find & replace' },
      { keys: ['Ctrl', 'G'], description: 'Go to heading' },
      { keys: ['F3'], description: 'Find next' },
      { keys: ['Shift', 'F3'], description: 'Find previous' },
    ],
  },
  {
    title: 'Selection',
    shortcuts: [
      { keys: ['Ctrl', 'A'], description: 'Select all' },
      { keys: ['Ctrl', 'D'], description: 'Select word' },
      { keys: ['Ctrl', 'Shift', 'L'], description: 'Select line' },
    ],
  },
  {
    title: 'History',
    shortcuts: [
      { keys: ['Ctrl', 'Z'], description: 'Undo' },
      { keys: ['Ctrl', 'Y'], description: 'Redo' },
      { keys: ['Ctrl', 'Shift', 'Z'], description: 'Redo (alternative)' },
    ],
  },
  {
    title: 'Document',
    shortcuts: [
      { keys: ['Ctrl', 'S'], description: 'Save document' },
      { keys: ['Ctrl', 'P'], description: 'Print / export PDF' },
      { keys: ['Ctrl', 'Shift', 'F'], description: 'Focus mode' },
      { keys: ['Esc'], description: 'Exit focus mode / close dialog' },
    ],
  },
  {
    title: 'Quick Commands',
    shortcuts: [
      { keys: ['/'], description: 'Open slash command menu' },
      { keys: ['@'], description: 'Mention a user' },
    ],
  },
]

export function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[800px] md:max-h-[80vh] bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <h2 className="text-lg font-bold">Keyboard Shortcuts</h2>
          <Button
            size="sm"
            variant="ghost"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid md:grid-cols-2 gap-6">
            {SHORTCUT_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-bold mb-3 text-[var(--primary)]">
                  {group.title}
                </h3>
                <div className="space-y-2">
                  {group.shortcuts.map((shortcut, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-1"
                    >
                      <span className="text-sm text-[var(--muted)]">
                        {shortcut.description}
                      </span>
                      <div className="flex items-center gap-1">
                        {shortcut.keys.map((key, keyIndex) => (
                          <span key={keyIndex} className="flex items-center">
                            <kbd className="px-2 py-0.5 text-xs font-mono bg-[var(--secondary)]/30 border border-[var(--border)] rounded shadow-sm">
                              {key}
                            </kbd>
                            {keyIndex < shortcut.keys.length - 1 && (
                              <span className="text-[var(--muted)] mx-0.5">+</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--border)] text-center">
          <p className="text-xs text-[var(--muted)]">
            On Mac, use <kbd className="px-1 py-0.5 text-[10px] font-mono bg-[var(--secondary)]/30 border border-[var(--border)] rounded">Cmd</kbd> instead of <kbd className="px-1 py-0.5 text-[10px] font-mono bg-[var(--secondary)]/30 border border-[var(--border)] rounded">Ctrl</kbd>
          </p>
        </div>
      </div>
    </>
  )
}

export default KeyboardShortcutsModal
