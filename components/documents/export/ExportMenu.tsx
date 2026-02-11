'use client'

import { useState, useCallback } from 'react'
import {
  Download,
  FileText,
  FileCode,
  File,
  Printer,
  ChevronDown,
  Loader2,
  Check,
  AlertCircle,
  Settings,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ExportDialog } from './ExportDialog'
import {
  htmlToMarkdown,
  htmlToPlainText,
  generateStandaloneHtml,
  generateDocx,
  printToPdf,
  sanitizeFilename,
  downloadFile,
  type ExportFormat,
} from '@/lib/documents'

interface ExportMenuProps {
  documentId: string
  documentTitle: string
  documentContent?: string
  author?: string
  createdAt?: Date
  updatedAt?: Date
  onExport?: (format: ExportFormat) => Promise<void>
  onPrint?: () => void
}

interface ExportOption {
  format: ExportFormat
  label: string
  description: string
  icon: React.ReactNode
  extension: string
  hasSettings?: boolean
}

const EXPORT_OPTIONS: ExportOption[] = [
  {
    format: 'pdf',
    label: 'PDF Document',
    description: 'Portable Document Format',
    icon: <FileText className="w-4 h-4" />,
    extension: '.pdf',
    hasSettings: true,
  },
  {
    format: 'docx',
    label: 'Word Document',
    description: 'Microsoft Word format',
    icon: <File className="w-4 h-4" />,
    extension: '.docx',
    hasSettings: true,
  },
  {
    format: 'md',
    label: 'Markdown',
    description: 'Plain text with formatting',
    icon: <FileCode className="w-4 h-4" />,
    extension: '.md',
  },
  {
    format: 'html',
    label: 'HTML',
    description: 'Web page format',
    icon: <FileCode className="w-4 h-4" />,
    extension: '.html',
    hasSettings: true,
  },
  {
    format: 'txt',
    label: 'Plain Text',
    description: 'No formatting',
    icon: <FileText className="w-4 h-4" />,
    extension: '.txt',
  },
]

export function ExportMenu({
  documentId,
  documentTitle,
  documentContent = '',
  author = '',
  createdAt,
  updatedAt,
  onExport,
  onPrint,
}: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [exportingFormat, setExportingFormat] = useState<ExportFormat | null>(null)
  const [exportedFormat, setExportedFormat] = useState<ExportFormat | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)
  const [settingsFormat, setSettingsFormat] = useState<ExportFormat | null>(null)

  const handleExport = useCallback(
    async (format: ExportFormat, options?: Record<string, any>) => {
      setExportingFormat(format)
      setError(null)

      try {
        // If there's a custom onExport handler that fetches from server
        if (onExport && !documentContent) {
          await onExport(format)
          setExportedFormat(format)
          setTimeout(() => setExportedFormat(null), 2000)
          return
        }

        // Client-side export with content
        const content = documentContent
        const title = documentTitle || 'document'
        const safeFilename = sanitizeFilename(title)

        let blob: Blob
        let filename: string

        switch (format) {
          case 'md': {
            const markdown = htmlToMarkdown(content, {
              includeTitle: options?.includeMetadata !== false,
              documentTitle: title,
              preserveImages: true,
            })
            blob = new Blob([markdown], { type: 'text/markdown; charset=utf-8' })
            filename = `${safeFilename}.md`
            break
          }

          case 'txt': {
            let text = htmlToPlainText(content)
            if (options?.includeMetadata !== false) {
              const header = [
                title,
                '='.repeat(title.length),
                '',
                author ? `Author: ${author}` : '',
                createdAt ? `Created: ${createdAt.toLocaleDateString()}` : '',
                '',
                '-'.repeat(40),
                '',
              ]
                .filter(Boolean)
                .join('\n')
              text = header + text
            }
            blob = new Blob([text], { type: 'text/plain; charset=utf-8' })
            filename = `${safeFilename}.txt`
            break
          }

          case 'html': {
            const html = generateStandaloneHtml(content, {
              title,
              author,
              createdAt,
              updatedAt,
              includeMetadata: options?.includeMetadata !== false,
              includeTableOfContents: options?.includeTableOfContents || false,
              theme: options?.theme || 'light',
              pageSize: options?.pageSize || 'a4',
            })
            blob = new Blob([html], { type: 'text/html; charset=utf-8' })
            filename = `${safeFilename}.html`
            break
          }

          case 'docx': {
            try {
              blob = await generateDocx(content, {
                title,
                author,
                createdAt,
                includeTableOfContents: options?.includeTableOfContents || false,
                pageSize: options?.pageSize || 'a4',
              })
              filename = `${safeFilename}.docx`
            } catch (err) {
              throw new Error(
                'Failed to generate Word document. Please ensure the docx package is installed.'
              )
            }
            break
          }

          case 'pdf': {
            // Use print-to-PDF approach for client-side
            printToPdf(content, {
              title,
              author,
              createdAt,
              pageSize: options?.pageSize || 'a4',
              orientation: options?.orientation || 'portrait',
              includeHeader: options?.includeMetadata !== false,
            })
            setExportedFormat(format)
            setTimeout(() => setExportedFormat(null), 2000)
            return
          }

          default:
            throw new Error(`Unsupported format: ${format}`)
        }

        downloadFile(blob, filename)
        setExportedFormat(format)
        setTimeout(() => setExportedFormat(null), 2000)
      } catch (err) {
        console.error('Export failed:', err)
        setError(err instanceof Error ? err.message : 'Export failed')
        setTimeout(() => setError(null), 5000)
      } finally {
        setExportingFormat(null)
      }
    },
    [documentContent, documentTitle, author, createdAt, updatedAt, onExport]
  )

  const handleOpenSettings = (format: ExportFormat) => {
    setSettingsFormat(format)
    setShowSettingsDialog(true)
    setIsOpen(false)
  }

  const handleSettingsExport = (options: Record<string, any>) => {
    if (settingsFormat) {
      handleExport(settingsFormat, options)
    }
    setShowSettingsDialog(false)
    setSettingsFormat(null)
  }

  return (
    <>
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="h-8 px-3 gap-1 font-bold"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export</span>
          <ChevronDown className="w-3 h-3" />
        </Button>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

            {/* Dropdown */}
            <div className="absolute top-full right-0 mt-1 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-xl z-50 min-w-[280px] py-1">
              <div className="px-3 py-2 border-b border-[var(--border)]">
                <div className="text-xs font-medium text-[var(--muted)]">
                  Export "{documentTitle.slice(0, 25)}
                  {documentTitle.length > 25 ? '...' : ''}"
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="px-3 py-2 bg-red-500/10 border-b border-[var(--border)]">
                  <div className="flex items-center gap-2 text-red-500 text-xs">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {/* Export options */}
              {EXPORT_OPTIONS.map((option) => {
                const isExporting = exportingFormat === option.format
                const isExported = exportedFormat === option.format

                return (
                  <div key={option.format} className="flex items-center">
                    <button
                      onClick={() => handleExport(option.format)}
                      disabled={isExporting}
                      className="flex-1 flex items-center gap-3 px-3 py-2 text-left hover:bg-[var(--secondary)]/10 transition-colors disabled:opacity-50"
                    >
                      <div className="p-1.5 rounded bg-[var(--secondary)]/20 text-[var(--muted)]">
                        {isExporting ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : isExported ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          option.icon
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{option.label}</div>
                        <div className="text-xs text-[var(--muted)]">{option.description}</div>
                      </div>
                      <span className="text-xs text-[var(--muted)]">{option.extension}</span>
                    </button>

                    {option.hasSettings && (
                      <button
                        onClick={() => handleOpenSettings(option.format)}
                        className="p-2 hover:bg-[var(--secondary)]/10 transition-colors rounded"
                        title="Export settings"
                      >
                        <Settings className="w-4 h-4 text-[var(--muted)]" />
                      </button>
                    )}
                  </div>
                )
              })}

              {/* Print option */}
              {onPrint && (
                <>
                  <div className="border-t border-[var(--border)] my-1" />
                  <button
                    onClick={() => {
                      onPrint()
                      setIsOpen(false)
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-[var(--secondary)]/10 transition-colors"
                  >
                    <div className="p-1.5 rounded bg-[var(--secondary)]/20 text-[var(--muted)]">
                      <Printer className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">Print</div>
                      <div className="text-xs text-[var(--muted)]">Open print dialog</div>
                    </div>
                    <span className="text-xs text-[var(--muted)]">Ctrl+P</span>
                  </button>
                </>
              )}

              {/* Server export link */}
              <div className="border-t border-[var(--border)] my-1" />
              <div className="px-3 py-2 text-xs text-[var(--muted)]">
                <a
                  href={`/api/documents/${documentId}/export?format=html`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  Open export API directly
                </a>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Settings Dialog */}
      {showSettingsDialog && settingsFormat && (
        <ExportDialog
          isOpen={showSettingsDialog}
          format={settingsFormat}
          documentTitle={documentTitle}
          onClose={() => {
            setShowSettingsDialog(false)
            setSettingsFormat(null)
          }}
          onExport={handleSettingsExport}
        />
      )}
    </>
  )
}

export default ExportMenu
