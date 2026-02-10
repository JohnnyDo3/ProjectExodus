'use client'

import { useState } from 'react'
import { X, FileText, File, FileCode, Download, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { ExportFormat } from '@/lib/documents'

interface ExportDialogProps {
  isOpen: boolean
  format: ExportFormat
  documentTitle: string
  onClose: () => void
  onExport: (options: ExportOptions) => void
}

interface ExportOptions {
  pageSize: 'a4' | 'letter' | 'legal'
  orientation: 'portrait' | 'landscape'
  includeMetadata: boolean
  includeTableOfContents: boolean
  theme: 'light' | 'dark' | 'auto'
  margins: {
    top: number
    right: number
    bottom: number
    left: number
  }
}

const FORMAT_INFO: Record<
  ExportFormat,
  { label: string; icon: React.ReactNode; description: string }
> = {
  pdf: {
    label: 'PDF Document',
    icon: <FileText className="w-5 h-5" />,
    description: 'Portable Document Format - best for printing and sharing',
  },
  docx: {
    label: 'Word Document',
    icon: <File className="w-5 h-5" />,
    description: 'Microsoft Word format - best for editing',
  },
  html: {
    label: 'HTML',
    icon: <FileCode className="w-5 h-5" />,
    description: 'Web page format - best for web publishing',
  },
  md: {
    label: 'Markdown',
    icon: <FileCode className="w-5 h-5" />,
    description: 'Plain text with formatting - best for developers',
  },
  txt: {
    label: 'Plain Text',
    icon: <FileText className="w-5 h-5" />,
    description: 'No formatting - universal compatibility',
  },
}

const PAGE_SIZES = [
  { value: 'a4', label: 'A4 (210 x 297 mm)' },
  { value: 'letter', label: 'Letter (8.5 x 11 in)' },
  { value: 'legal', label: 'Legal (8.5 x 14 in)' },
]

const ORIENTATIONS = [
  { value: 'portrait', label: 'Portrait' },
  { value: 'landscape', label: 'Landscape' },
]

const THEMES = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'auto', label: 'Auto (System)' },
]

export function ExportDialog({
  isOpen,
  format,
  documentTitle,
  onClose,
  onExport,
}: ExportDialogProps) {
  const [options, setOptions] = useState<ExportOptions>({
    pageSize: 'a4',
    orientation: 'portrait',
    includeMetadata: true,
    includeTableOfContents: false,
    theme: 'light',
    margins: { top: 40, right: 40, bottom: 40, left: 40 },
  })
  const [isExporting, setIsExporting] = useState(false)

  if (!isOpen) return null

  const formatInfo = FORMAT_INFO[format]

  const handleExport = async () => {
    setIsExporting(true)
    try {
      await onExport(options)
    } finally {
      setIsExporting(false)
    }
  }

  const showPageOptions = ['pdf', 'docx'].includes(format)
  const showThemeOptions = format === 'html'
  const showTocOption = ['pdf', 'docx', 'html'].includes(format)

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                {formatInfo.icon}
              </div>
              <div>
                <h2 className="font-bold">Export as {formatInfo.label}</h2>
                <p className="text-xs text-[var(--muted)]">{formatInfo.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[var(--secondary)]/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Document info */}
            <div className="p-3 bg-[var(--secondary)]/10 rounded-lg">
              <p className="text-sm">
                <span className="text-[var(--muted)]">Document:</span>{' '}
                <span className="font-medium">{documentTitle}</span>
              </p>
            </div>

            {/* Page size (PDF/DOCX only) */}
            {showPageOptions && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Page Size</label>
                <div className="grid grid-cols-3 gap-2">
                  {PAGE_SIZES.map((size) => (
                    <button
                      key={size.value}
                      onClick={() =>
                        setOptions((prev) => ({
                          ...prev,
                          pageSize: size.value as 'a4' | 'letter' | 'legal',
                        }))
                      }
                      className={`px-3 py-2 text-xs rounded-lg border transition-colors ${
                        options.pageSize === size.value
                          ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]'
                          : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                      }`}
                    >
                      {size.label.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Orientation (PDF only) */}
            {format === 'pdf' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Orientation</label>
                <div className="grid grid-cols-2 gap-2">
                  {ORIENTATIONS.map((orient) => (
                    <button
                      key={orient.value}
                      onClick={() =>
                        setOptions((prev) => ({
                          ...prev,
                          orientation: orient.value as 'portrait' | 'landscape',
                        }))
                      }
                      className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                        options.orientation === orient.value
                          ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]'
                          : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                      }`}
                    >
                      {orient.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Theme (HTML only) */}
            {showThemeOptions && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Theme</label>
                <div className="grid grid-cols-3 gap-2">
                  {THEMES.map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() =>
                        setOptions((prev) => ({
                          ...prev,
                          theme: theme.value as 'light' | 'dark' | 'auto',
                        }))
                      }
                      className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                        options.theme === theme.value
                          ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]'
                          : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                      }`}
                    >
                      {theme.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Margins (PDF only) */}
            {format === 'pdf' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Margins (px)</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
                    <div key={side} className="space-y-1">
                      <label className="text-[10px] text-[var(--muted)] uppercase">
                        {side}
                      </label>
                      <input
                        type="number"
                        value={options.margins[side]}
                        onChange={(e) =>
                          setOptions((prev) => ({
                            ...prev,
                            margins: {
                              ...prev.margins,
                              [side]: parseInt(e.target.value) || 0,
                            },
                          }))
                        }
                        className="w-full px-2 py-1.5 text-sm border border-[var(--border)] rounded-lg bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
                        min={0}
                        max={200}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.includeMetadata}
                  onChange={(e) =>
                    setOptions((prev) => ({
                      ...prev,
                      includeMetadata: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
                />
                <div>
                  <span className="text-sm font-medium">Include metadata</span>
                  <p className="text-xs text-[var(--muted)]">
                    Add title, author, and date information
                  </p>
                </div>
              </label>

              {showTocOption && (
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.includeTableOfContents}
                    onChange={(e) =>
                      setOptions((prev) => ({
                        ...prev,
                        includeTableOfContents: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]"
                  />
                  <div>
                    <span className="text-sm font-medium">Include table of contents</span>
                    <p className="text-xs text-[var(--muted)]">
                      Generate a TOC from document headings
                    </p>
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[var(--border)] bg-[var(--secondary)]/5">
            <Button variant="ghost" onClick={onClose} disabled={isExporting}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleExport}
              disabled={isExporting}
              className="gap-2"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Export
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ExportDialog
