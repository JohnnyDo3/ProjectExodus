'use client'

import { useState, useMemo } from 'react'
import { X, ArrowLeftRight, ArrowLeft, ArrowRight, Eye, Split, List } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface DocumentVersion {
  id: string
  versionNumber: number
  title: string
  content: string
  wordCount: number
  name?: string | null
  createdBy: {
    id: string
    name: string | null
    image: string | null
  }
  createdAt: Date | string
}

type DiffViewMode = 'inline' | 'side-by-side'

interface VersionDiffProps {
  isOpen: boolean
  version1: DocumentVersion
  version2: DocumentVersion
  onClose: () => void
  onRestoreVersion?: (version: DocumentVersion) => void
}

interface DiffLine {
  type: 'unchanged' | 'added' | 'removed'
  content: string
  lineNumber1?: number
  lineNumber2?: number
}

// Simple diff algorithm for text comparison
function computeDiff(text1: string, text2: string): DiffLine[] {
  // Strip HTML tags for comparison
  const stripHtml = (html: string) => {
    const temp = document.createElement('div')
    temp.innerHTML = html
    return temp.textContent || temp.innerText || ''
  }

  const lines1 = stripHtml(text1).split('\n')
  const lines2 = stripHtml(text2).split('\n')

  const result: DiffLine[] = []

  // Simple LCS-based diff
  const lcs = computeLCS(lines1, lines2)

  let i = 0
  let j = 0
  let lcsIndex = 0

  while (i < lines1.length || j < lines2.length) {
    if (lcsIndex < lcs.length && i < lines1.length && lines1[i] === lcs[lcsIndex]) {
      if (j < lines2.length && lines2[j] === lcs[lcsIndex]) {
        // Unchanged line
        result.push({
          type: 'unchanged',
          content: lines1[i],
          lineNumber1: i + 1,
          lineNumber2: j + 1,
        })
        i++
        j++
        lcsIndex++
      } else {
        // Line added in version2
        result.push({
          type: 'added',
          content: lines2[j],
          lineNumber2: j + 1,
        })
        j++
      }
    } else if (i < lines1.length) {
      // Line removed from version1
      result.push({
        type: 'removed',
        content: lines1[i],
        lineNumber1: i + 1,
      })
      i++
    } else if (j < lines2.length) {
      // Line added in version2
      result.push({
        type: 'added',
        content: lines2[j],
        lineNumber2: j + 1,
      })
      j++
    }
  }

  return result
}

// Compute Longest Common Subsequence
function computeLCS(arr1: string[], arr2: string[]): string[] {
  const m = arr1.length
  const n = arr2.length
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0))

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (arr1[i - 1] === arr2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  // Backtrack to find LCS
  const lcs: string[] = []
  let i = m
  let j = n

  while (i > 0 && j > 0) {
    if (arr1[i - 1] === arr2[j - 1]) {
      lcs.unshift(arr1[i - 1])
      i--
      j--
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--
    } else {
      j--
    }
  }

  return lcs
}

export function VersionDiff({
  isOpen,
  version1,
  version2,
  onClose,
  onRestoreVersion,
}: VersionDiffProps) {
  const [viewMode, setViewMode] = useState<DiffViewMode>('inline')

  // Ensure version1 is older
  const [older, newer] = useMemo(() => {
    if (version1.versionNumber < version2.versionNumber) {
      return [version1, version2]
    }
    return [version2, version1]
  }, [version1, version2])

  // Compute diff
  const diffLines = useMemo(() => {
    return computeDiff(older.content, newer.content)
  }, [older.content, newer.content])

  // Stats
  const stats = useMemo(() => {
    const added = diffLines.filter((l) => l.type === 'added').length
    const removed = diffLines.filter((l) => l.type === 'removed').length
    return { added, removed }
  }, [diffLines])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-8 bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold">Compare Versions</h2>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2 py-0.5 bg-red-500/10 text-red-500 rounded">
                v{older.versionNumber}
              </span>
              <ArrowRight className="w-4 h-4 text-[var(--muted)]" />
              <span className="px-2 py-0.5 bg-green-500/10 text-green-500 rounded">
                v{newer.versionNumber}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View mode toggle */}
            <div className="flex items-center bg-[var(--secondary)]/20 rounded-lg p-0.5">
              <Button
                size="sm"
                variant={viewMode === 'inline' ? 'primary' : 'ghost'}
                onClick={() => setViewMode('inline')}
                className="h-7 px-2 text-xs"
              >
                <List className="w-3 h-3 mr-1" />
                Inline
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'side-by-side' ? 'primary' : 'ghost'}
                onClick={() => setViewMode('side-by-side')}
                className="h-7 px-2 text-xs"
              >
                <Split className="w-3 h-3 mr-1" />
                Side by Side
              </Button>
            </div>

            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Version info bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[var(--secondary)]/5 border-b border-[var(--border)]">
          <div className="flex items-center gap-4">
            {/* Older version info */}
            <div className="flex items-center gap-2">
              {older.createdBy.image ? (
                <img
                  src={older.createdBy.image}
                  alt={older.createdBy.name || 'User'}
                  className="w-5 h-5 rounded-full object-cover"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 text-xs font-bold">
                  {older.createdBy.name?.[0]?.toUpperCase() || '?'}
                </div>
              )}
              <span className="text-sm">
                {older.name || `v${older.versionNumber}`}
              </span>
              <span className="text-xs text-[var(--muted)]">
                ({older.wordCount} words)
              </span>
            </div>

            <ArrowLeftRight className="w-4 h-4 text-[var(--muted)]" />

            {/* Newer version info */}
            <div className="flex items-center gap-2">
              {newer.createdBy.image ? (
                <img
                  src={newer.createdBy.image}
                  alt={newer.createdBy.name || 'User'}
                  className="w-5 h-5 rounded-full object-cover"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 text-xs font-bold">
                  {newer.createdBy.name?.[0]?.toUpperCase() || '?'}
                </div>
              )}
              <span className="text-sm">
                {newer.name || `v${newer.versionNumber}`}
              </span>
              <span className="text-xs text-[var(--muted)]">
                ({newer.wordCount} words)
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm">
            <span className="text-green-500">+{stats.added} added</span>
            <span className="text-red-500">-{stats.removed} removed</span>
            <span className="text-[var(--muted)]">
              {Math.abs(newer.wordCount - older.wordCount)} words{' '}
              {newer.wordCount >= older.wordCount ? 'added' : 'removed'}
            </span>
          </div>
        </div>

        {/* Diff content */}
        <div className="flex-1 overflow-auto">
          {viewMode === 'inline' ? (
            // Inline diff view
            <div className="font-mono text-sm">
              {diffLines.map((line, index) => (
                <div
                  key={index}
                  className={`flex ${
                    line.type === 'added'
                      ? 'bg-green-500/10'
                      : line.type === 'removed'
                      ? 'bg-red-500/10'
                      : ''
                  }`}
                >
                  {/* Line numbers */}
                  <div className="flex-shrink-0 w-20 flex border-r border-[var(--border)]">
                    <span className="w-10 px-2 py-0.5 text-right text-xs text-[var(--muted)] bg-[var(--secondary)]/10">
                      {line.lineNumber1 || ''}
                    </span>
                    <span className="w-10 px-2 py-0.5 text-right text-xs text-[var(--muted)] bg-[var(--secondary)]/10">
                      {line.lineNumber2 || ''}
                    </span>
                  </div>

                  {/* Indicator */}
                  <div className="w-6 flex-shrink-0 flex items-center justify-center text-xs font-bold">
                    {line.type === 'added' && (
                      <span className="text-green-500">+</span>
                    )}
                    {line.type === 'removed' && (
                      <span className="text-red-500">-</span>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 px-2 py-0.5 whitespace-pre-wrap ${
                    line.type === 'added'
                      ? 'text-green-700 dark:text-green-400'
                      : line.type === 'removed'
                      ? 'text-red-700 dark:text-red-400'
                      : ''
                  }`}>
                    {line.content || '\u00A0'}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Side by side view
            <div className="flex h-full">
              {/* Older version */}
              <div className="flex-1 border-r border-[var(--border)] overflow-auto">
                <div className="sticky top-0 px-3 py-1.5 bg-[var(--background)] border-b border-[var(--border)] text-xs font-medium">
                  {older.name || `Version ${older.versionNumber}`} (Older)
                </div>
                <div className="font-mono text-sm">
                  {diffLines.map((line, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        line.type === 'removed' ? 'bg-red-500/10' : ''
                      }`}
                    >
                      <span className="w-10 flex-shrink-0 px-2 py-0.5 text-right text-xs text-[var(--muted)] bg-[var(--secondary)]/10 border-r border-[var(--border)]">
                        {line.lineNumber1 || ''}
                      </span>
                      <div className={`flex-1 px-2 py-0.5 whitespace-pre-wrap ${
                        line.type === 'removed'
                          ? 'text-red-700 dark:text-red-400'
                          : line.type === 'added'
                          ? 'invisible'
                          : ''
                      }`}>
                        {line.type !== 'added' ? (line.content || '\u00A0') : '\u00A0'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newer version */}
              <div className="flex-1 overflow-auto">
                <div className="sticky top-0 px-3 py-1.5 bg-[var(--background)] border-b border-[var(--border)] text-xs font-medium">
                  {newer.name || `Version ${newer.versionNumber}`} (Newer)
                </div>
                <div className="font-mono text-sm">
                  {diffLines.map((line, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        line.type === 'added' ? 'bg-green-500/10' : ''
                      }`}
                    >
                      <span className="w-10 flex-shrink-0 px-2 py-0.5 text-right text-xs text-[var(--muted)] bg-[var(--secondary)]/10 border-r border-[var(--border)]">
                        {line.lineNumber2 || ''}
                      </span>
                      <div className={`flex-1 px-2 py-0.5 whitespace-pre-wrap ${
                        line.type === 'added'
                          ? 'text-green-700 dark:text-green-400'
                          : line.type === 'removed'
                          ? 'invisible'
                          : ''
                      }`}>
                        {line.type !== 'removed' ? (line.content || '\u00A0') : '\u00A0'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-[var(--border)] bg-[var(--secondary)]/5">
          <div className="text-xs text-[var(--muted)]">
            Showing changes from v{older.versionNumber} to v{newer.versionNumber}
          </div>
          <div className="flex items-center gap-2">
            {onRestoreVersion && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onRestoreVersion(older)}
                  className="text-xs"
                >
                  Restore v{older.versionNumber}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onRestoreVersion(newer)}
                  className="text-xs"
                >
                  Restore v{newer.versionNumber}
                </Button>
              </>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="text-xs"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default VersionDiff
