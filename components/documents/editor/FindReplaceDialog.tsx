'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Editor } from '@tiptap/react'
import { X, Search, Replace, ChevronUp, ChevronDown, CaseSensitive, WholeWord } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface FindReplaceDialogProps {
  editor: Editor | null
  isOpen: boolean
  onClose: () => void
}

interface SearchResult {
  from: number
  to: number
  index: number
}

export function FindReplaceDialog({ editor, isOpen, onClose }: FindReplaceDialogProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [replaceTerm, setReplaceTerm] = useState('')
  const [showReplace, setShowReplace] = useState(false)
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [wholeWord, setWholeWord] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [highlightedRanges, setHighlightedRanges] = useState<{ from: number; to: number }[]>([])

  // Focus search input when dialog opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        goToNext()
      } else if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault()
        goToPrevious()
      } else if (e.key === 'F3') {
        e.preventDefault()
        if (e.shiftKey) {
          goToPrevious()
        } else {
          goToNext()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, currentIndex])

  // Search for text when search term changes
  const performSearch = useCallback(() => {
    if (!editor || !searchTerm) {
      setResults([])
      setCurrentIndex(-1)
      return
    }

    const content = editor.getText()
    const searchResults: SearchResult[] = []

    let searchPattern: RegExp
    try {
      const flags = caseSensitive ? 'g' : 'gi'
      const term = wholeWord ? `\\b${escapeRegex(searchTerm)}\\b` : escapeRegex(searchTerm)
      searchPattern = new RegExp(term, flags)
    } catch {
      setResults([])
      return
    }

    let match
    let index = 0
    while ((match = searchPattern.exec(content)) !== null) {
      // Convert text position to editor position
      const from = getEditorPosition(editor, match.index)
      const to = getEditorPosition(editor, match.index + match[0].length)

      if (from !== -1 && to !== -1) {
        searchResults.push({ from, to, index: index++ })
      }
    }

    setResults(searchResults)
    setCurrentIndex(searchResults.length > 0 ? 0 : -1)

    // Highlight all matches
    if (searchResults.length > 0) {
      setHighlightedRanges(searchResults.map(r => ({ from: r.from, to: r.to })))
      // Go to first result
      scrollToResult(searchResults[0])
    }
  }, [editor, searchTerm, caseSensitive, wholeWord])

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(performSearch, 150)
    return () => clearTimeout(timer)
  }, [performSearch])

  const escapeRegex = (str: string) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  const getEditorPosition = (editor: Editor, textPosition: number): number => {
    // Simple position mapping - in real Tiptap, this would need to account for nodes
    // For basic text content, position is approximately equal
    // This is a simplification - a full implementation would walk the document structure
    return textPosition + 1 // Tiptap positions are 1-indexed
  }

  const scrollToResult = (result: SearchResult) => {
    if (!editor) return

    try {
      editor.commands.setTextSelection({ from: result.from, to: result.to })

      // Scroll into view
      const domSelection = window.getSelection()
      if (domSelection && domSelection.rangeCount > 0) {
        const range = domSelection.getRangeAt(0)
        const rect = range.getBoundingClientRect()
        if (rect.top < 100 || rect.bottom > window.innerHeight - 100) {
          range.startContainer.parentElement?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          })
        }
      }
    } catch (error) {
      console.error('Error scrolling to result:', error)
    }
  }

  const goToNext = () => {
    if (results.length === 0) return
    const newIndex = (currentIndex + 1) % results.length
    setCurrentIndex(newIndex)
    scrollToResult(results[newIndex])
  }

  const goToPrevious = () => {
    if (results.length === 0) return
    const newIndex = currentIndex <= 0 ? results.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    scrollToResult(results[newIndex])
  }

  const replaceOne = () => {
    if (!editor || currentIndex < 0 || currentIndex >= results.length) return

    const result = results[currentIndex]

    editor
      .chain()
      .focus()
      .setTextSelection({ from: result.from, to: result.to })
      .insertContent(replaceTerm)
      .run()

    // Re-search after replace
    setTimeout(performSearch, 50)
  }

  const replaceAll = () => {
    if (!editor || results.length === 0) return

    // Replace from end to start to maintain positions
    const sortedResults = [...results].sort((a, b) => b.from - a.from)

    let chain = editor.chain().focus()

    for (const result of sortedResults) {
      chain = chain
        .setTextSelection({ from: result.from, to: result.to })
        .insertContent(replaceTerm) as any
    }

    chain.run()

    // Clear results after replace all
    setResults([])
    setCurrentIndex(-1)
  }

  if (!isOpen) return null

  return (
    <div className="absolute top-14 right-4 z-30 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-xl p-3 w-80">
      {/* Close button */}
      <Button
        size="sm"
        variant="ghost"
        onClick={onClose}
        className="absolute top-2 right-2 h-6 w-6 p-0"
      >
        <X className="w-4 h-4" />
      </Button>

      {/* Search input */}
      <div className="mb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Find in document..."
            className="w-full pl-9 pr-20 py-2 text-sm bg-[var(--background)] border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Button
              size="sm"
              variant={caseSensitive ? 'primary' : 'ghost'}
              onClick={() => setCaseSensitive(!caseSensitive)}
              title="Match Case"
              className="h-6 w-6 p-0"
            >
              <CaseSensitive className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant={wholeWord ? 'primary' : 'ghost'}
              onClick={() => setWholeWord(!wholeWord)}
              title="Whole Word"
              className="h-6 w-6 p-0"
            >
              <WholeWord className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Results count and navigation */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-[var(--muted)]">
            {results.length > 0
              ? `${currentIndex + 1} of ${results.length} results`
              : searchTerm ? 'No results found' : 'Enter search term'}
          </span>
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={goToPrevious}
              disabled={results.length === 0}
              title="Previous (Shift+Enter)"
              className="h-6 w-6 p-0"
            >
              <ChevronUp className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={goToNext}
              disabled={results.length === 0}
              title="Next (Enter)"
              className="h-6 w-6 p-0"
            >
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Toggle replace section */}
      <Button
        size="sm"
        variant="ghost"
        onClick={() => setShowReplace(!showReplace)}
        className="w-full justify-start gap-2 mb-2 text-xs"
      >
        <Replace className="w-3 h-3" />
        {showReplace ? 'Hide Replace' : 'Show Replace'}
      </Button>

      {/* Replace section */}
      {showReplace && (
        <div className="space-y-2">
          <input
            type="text"
            value={replaceTerm}
            onChange={(e) => setReplaceTerm(e.target.value)}
            placeholder="Replace with..."
            className="w-full px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
          />
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={replaceOne}
              disabled={results.length === 0 || currentIndex < 0}
              className="flex-1 text-xs"
            >
              Replace
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={replaceAll}
              disabled={results.length === 0}
              className="flex-1 text-xs"
            >
              Replace All ({results.length})
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FindReplaceDialog
