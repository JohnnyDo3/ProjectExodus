'use client'

import { X, FileText, Star, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Template {
  id: string
  name: string
  description: string | null
  content: string
  category: string
  icon: string | null
  isBuiltIn: boolean
  usageCount: number
  createdAt: Date | string
}

interface TemplatePreviewProps {
  template: Template
  customTitle?: string
  onTitleChange?: (title: string) => void
  onUse: () => void
  onClose: () => void
}

export function TemplatePreview({
  template,
  customTitle,
  onTitleChange,
  onUse,
  onClose,
}: TemplatePreviewProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
        <h3 className="font-bold text-sm">Preview</h3>
        <Button
          size="sm"
          variant="ghost"
          onClick={onClose}
          className="h-6 w-6 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Template info */}
      <div className="p-4 border-b border-[var(--border)]">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${
            template.isBuiltIn
              ? 'bg-[var(--primary)]/10 text-[var(--primary)]'
              : 'bg-[var(--secondary)]/20 text-[var(--muted)]'
          }`}>
            <FileText className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-bold truncate">{template.name}</h4>
              {template.isBuiltIn && (
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 flex-shrink-0" />
              )}
            </div>
            <p className="text-xs text-[var(--muted)] mt-1">
              {template.description || 'No description'}
            </p>
            <div className="flex items-center gap-2 mt-2 text-[10px] text-[var(--muted)]">
              <span className="px-1.5 py-0.5 bg-[var(--secondary)]/20 rounded capitalize">
                {template.category}
              </span>
              {template.usageCount > 0 && (
                <span>Used {template.usageCount} times</span>
              )}
            </div>
          </div>
        </div>

        {/* Custom title input */}
        {onTitleChange && (
          <div className="mt-4">
            <label className="block text-xs font-medium text-[var(--muted)] mb-1">
              Document Title
            </label>
            <input
              type="text"
              value={customTitle || ''}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder={template.name}
              className="w-full px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
            />
          </div>
        )}
      </div>

      {/* Content preview */}
      <div className="flex-1 overflow-auto p-4">
        <div className="text-xs font-medium text-[var(--muted)] mb-2">
          Content Preview
        </div>
        <div className="p-4 bg-[var(--secondary)]/5 border border-[var(--border)] rounded-lg">
          <div
            className="prose prose-sm max-w-none text-sm"
            dangerouslySetInnerHTML={{ __html: template.content }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-[var(--border)] bg-[var(--secondary)]/5">
        <Button
          onClick={onUse}
          className="w-full font-bold"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Use This Template
        </Button>
      </div>
    </div>
  )
}

export default TemplatePreview
