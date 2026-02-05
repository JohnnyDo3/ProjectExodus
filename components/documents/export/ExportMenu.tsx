'use client'

import { useState } from 'react'
import {
  Download, FileText, FileCode, File, FileImage, Printer,
  ChevronDown, Loader2, Check
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

type ExportFormat = 'pdf' | 'docx' | 'md' | 'html' | 'txt'

interface ExportMenuProps {
  documentId: string
  documentTitle: string
  onExport: (format: ExportFormat) => Promise<void>
  onPrint?: () => void
}

const EXPORT_OPTIONS: {
  format: ExportFormat
  label: string
  description: string
  icon: React.ReactNode
  extension: string
}[] = [
  {
    format: 'pdf',
    label: 'PDF Document',
    description: 'Portable Document Format',
    icon: <FileText className="w-4 h-4" />,
    extension: '.pdf',
  },
  {
    format: 'docx',
    label: 'Word Document',
    description: 'Microsoft Word format',
    icon: <File className="w-4 h-4" />,
    extension: '.docx',
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
  onExport,
  onPrint,
}: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [exportingFormat, setExportingFormat] = useState<ExportFormat | null>(null)
  const [exportedFormat, setExportedFormat] = useState<ExportFormat | null>(null)

  const handleExport = async (format: ExportFormat) => {
    setExportingFormat(format)
    try {
      await onExport(format)
      setExportedFormat(format)
      setTimeout(() => setExportedFormat(null), 2000)
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setExportingFormat(null)
    }
  }

  return (
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
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-1 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-xl z-50 min-w-[240px] py-1">
            <div className="px-3 py-2 border-b border-[var(--border)]">
              <div className="text-xs font-medium text-[var(--muted)]">
                Export "{documentTitle.slice(0, 20)}{documentTitle.length > 20 ? '...' : ''}"
              </div>
            </div>

            {/* Export options */}
            {EXPORT_OPTIONS.map((option) => {
              const isExporting = exportingFormat === option.format
              const isExported = exportedFormat === option.format

              return (
                <button
                  key={option.format}
                  onClick={() => handleExport(option.format)}
                  disabled={isExporting}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-[var(--secondary)]/10 transition-colors disabled:opacity-50"
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
                    <div className="text-xs text-[var(--muted)]">
                      {option.description}
                    </div>
                  </div>
                  <span className="text-xs text-[var(--muted)]">
                    {option.extension}
                  </span>
                </button>
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
                    <div className="text-xs text-[var(--muted)]">
                      Open print dialog
                    </div>
                  </div>
                  <span className="text-xs text-[var(--muted)]">Ctrl+P</span>
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default ExportMenu
