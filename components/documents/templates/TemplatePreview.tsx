'use client'

import { sanitizeHtml } from '@/lib/utils/sanitize'
import {
  X,
  FileText,
  Star,
  CheckCircle,
  Users,
  Lightbulb,
  RotateCcw,
  Code,
  Target,
  Bug,
  FlaskConical,
  Palette,
  FileEdit,
  LucideIcon,
  Eye,
} from 'lucide-react'
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

// Icon mapping from icon name string to component
const ICON_MAP: Record<string, LucideIcon> = {
  FileText,
  Users,
  Lightbulb,
  RotateCcw,
  Code,
  Target,
  Bug,
  FlaskConical,
  Palette,
  FileEdit,
}

// Category color mapping
const CATEGORY_COLORS: Record<string, string> = {
  'General': 'bg-slate-500/10 text-slate-600 dark:text-slate-400',
  'Project Management': 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  'Engineering': 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  'Content': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
}

export function TemplatePreview({
  template,
  customTitle,
  onTitleChange,
  onUse,
  onClose,
}: TemplatePreviewProps) {
  const IconComponent = template.icon ? (ICON_MAP[template.icon] || FileText) : FileText
  const categoryColor = CATEGORY_COLORS[template.category] || CATEGORY_COLORS['General']

  // Calculate word count from HTML content
  const wordCount = template.content
    .replace(/<[^>]*>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-[var(--primary)]" />
          <h3 className="font-bold text-sm">Template Preview</h3>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={onClose}
          className="h-7 w-7 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Template info */}
      <div className="p-4 border-b border-[var(--border)] bg-[var(--muted)]/10">
        <div className="flex items-start gap-3">
          <div
            className={`p-2.5 rounded-xl ${
              template.isBuiltIn
                ? 'bg-[var(--primary)]/10 text-[var(--primary)]'
                : 'bg-[var(--secondary)]/20 text-[var(--muted)]'
            }`}
          >
            <IconComponent className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-base truncate">{template.name}</h4>
              {template.isBuiltIn && (
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
              )}
            </div>
            <p className="text-sm text-[var(--muted)] mt-1 line-clamp-2">
              {template.description || 'No description'}
            </p>
            <div className="flex items-center gap-3 mt-3">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColor}`}>
                {template.category}
              </span>
              <span className="text-xs text-[var(--muted)]">
                ~{wordCount} words
              </span>
              {template.usageCount > 0 && (
                <span className="text-xs text-[var(--muted)]">
                  Used {template.usageCount} times
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Custom title input */}
        {onTitleChange && (
          <div className="mt-4">
            <label className="block text-xs font-bold text-[var(--foreground)] mb-1.5">
              Document Title
            </label>
            <input
              type="text"
              value={customTitle || ''}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder={template.name}
              className="w-full px-3 py-2.5 text-sm bg-[var(--background)] border-2 border-[var(--border)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition-colors"
            />
            <p className="text-[10px] text-[var(--muted)] mt-1.5">
              Leave blank to use template name as title
            </p>
          </div>
        )}
      </div>

      {/* Content preview */}
      <div className="flex-1 overflow-auto p-4">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-[var(--muted)]" />
          <span className="text-xs font-bold text-[var(--muted)] uppercase tracking-wide">
            Content Preview
          </span>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 border border-[var(--border)] rounded-xl shadow-inner">
          <div
            className="prose prose-sm max-w-none text-sm
              prose-headings:font-bold prose-headings:text-[var(--foreground)]
              prose-h1:text-lg prose-h1:mb-3
              prose-h2:text-base prose-h2:mb-2 prose-h2:mt-4
              prose-h3:text-sm prose-h3:mb-2 prose-h3:mt-3
              prose-p:text-[var(--foreground)] prose-p:my-2
              prose-li:text-[var(--foreground)] prose-li:my-0.5
              prose-ul:my-2 prose-ol:my-2
              prose-table:my-3 prose-table:text-xs
              prose-th:bg-[var(--muted)]/30 prose-th:p-2 prose-th:text-left
              prose-td:p-2 prose-td:border prose-td:border-[var(--border)]
              prose-pre:bg-[var(--muted)]/30 prose-pre:p-3 prose-pre:rounded-lg
              prose-code:bg-[var(--muted)]/30 prose-code:px-1 prose-code:rounded
              prose-blockquote:border-l-4 prose-blockquote:border-[var(--primary)] prose-blockquote:pl-4 prose-blockquote:italic
              prose-strong:font-bold prose-strong:text-[var(--foreground)]
              prose-em:italic"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(template.content) }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-[var(--border)] bg-[var(--muted)]/10">
        <Button onClick={onUse} className="w-full font-bold py-3">
          <CheckCircle className="w-5 h-5 mr-2" />
          Use This Template
        </Button>
        <p className="text-[10px] text-center text-[var(--muted)] mt-2">
          Creates a new document with this template content
        </p>
      </div>
    </div>
  )
}

export default TemplatePreview
