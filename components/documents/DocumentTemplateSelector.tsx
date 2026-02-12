'use client'

import { useState, useMemo } from 'react'
import {
  DOCUMENT_TEMPLATES,
  TEMPLATE_CATEGORIES,
  DocumentTemplate,
  TemplateCategory,
} from '@/data/document-templates'
import { Button } from '@/components/ui/Button'
import { sanitizeHtml } from '@/lib/utils/sanitize'
import { Card, CardContent } from '@/components/ui/Card'
import {
  FileText,
  X,
  Search,
  ChevronRight,
  Users,
  Lightbulb,
  RotateCcw,
  Code,
  Target,
  Bug,
  FlaskConical,
  Palette,
  FileEdit,
  Loader2,
  Folder,
  Sparkles,
  LucideIcon,
} from 'lucide-react'

interface DocumentTemplateSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (template: DocumentTemplate, customTitle?: string) => Promise<void>
  projectId: string
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

// Category icons
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  'General': FileText,
  'Project Management': Folder,
  'Engineering': Code,
  'Content': FileEdit,
}

// Category color mapping
const CATEGORY_COLORS: Record<string, string> = {
  'General': 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700',
  'Project Management': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700',
  'Engineering': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-700',
  'Content': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-700',
}

export function DocumentTemplateSelector({
  isOpen,
  onClose,
  onSelect,
  projectId,
}: DocumentTemplateSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all')
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null)
  const [customTitle, setCustomTitle] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const filteredTemplates = useMemo(() => {
    let result = [...DOCUMENT_TEMPLATES]

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((t) => t.category === selectedCategory)
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (template) =>
          template.name.toLowerCase().includes(query) ||
          template.description.toLowerCase().includes(query) ||
          template.category.toLowerCase().includes(query)
      )
    }

    // Sort by popularity
    result.sort((a, b) => b.popularity - a.popularity)

    return result
  }, [searchQuery, selectedCategory])

  // Group by category for display
  const groupedTemplates = useMemo(() => {
    if (selectedCategory !== 'all') {
      return { [selectedCategory]: filteredTemplates }
    }

    const groups: Record<string, DocumentTemplate[]> = {}
    filteredTemplates.forEach((template) => {
      if (!groups[template.category]) {
        groups[template.category] = []
      }
      groups[template.category].push(template)
    })

    // Sort categories
    const sortedGroups: Record<string, DocumentTemplate[]> = {}
    TEMPLATE_CATEGORIES.forEach(({ id }) => {
      if (groups[id]) {
        sortedGroups[id] = groups[id]
      }
    })

    return sortedGroups
  }, [filteredTemplates, selectedCategory])

  if (!isOpen) return null

  const handleCreateDocument = async () => {
    if (!selectedTemplate) return

    setIsCreating(true)
    try {
      await onSelect(selectedTemplate, customTitle || undefined)
      onClose()
    } catch (error) {
      console.error('Failed to create document:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleClose = () => {
    setSelectedTemplate(null)
    setCustomTitle('')
    setSearchQuery('')
    setSelectedCategory('all')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[var(--background)] rounded-2xl shadow-2xl border-2 border-[var(--border)] max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col mx-4">
        {/* Header */}
        <div className="p-6 border-b border-[var(--border)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[var(--primary)]/10 rounded-lg">
                <Sparkles className="w-5 h-5 text-[var(--primary)]" />
              </div>
              <div>
                <h2 className="text-xl font-black text-[var(--foreground)]">
                  {selectedTemplate ? 'Customize Document' : 'Choose a Template'}
                </h2>
                <p className="text-sm text-[var(--muted)]">
                  {selectedTemplate
                    ? 'Set a title and create your document'
                    : 'Select a template to get started quickly'}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-[var(--muted)] rounded-lg transition-colors"
              disabled={isCreating}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!selectedTemplate && (
            <div className="flex gap-3">
              {/* Category filter */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                      : 'bg-[var(--muted)]/50 hover:bg-[var(--muted)]'
                  }`}
                >
                  All
                </button>
                {TEMPLATE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                        : 'bg-[var(--muted)]/50 hover:bg-[var(--muted)]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!selectedTemplate ? (
            // Template Grid
            <div className="space-y-8">
              {Object.entries(groupedTemplates).map(([category, templates]) => {
                const CategoryIcon = CATEGORY_ICONS[category] || Folder
                const categoryInfo = TEMPLATE_CATEGORIES.find((c) => c.id === category)

                return (
                  <div key={category}>
                    <div className="flex items-center gap-2 mb-4">
                      <CategoryIcon className="w-5 h-5 text-[var(--primary)]" />
                      <h3 className="font-bold text-base">{category}</h3>
                      {categoryInfo && (
                        <span className="text-xs text-[var(--muted)]">
                          - {categoryInfo.description}
                        </span>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {templates.map((template) => {
                        const Icon = ICON_MAP[template.icon] || FileText
                        const categoryColor = CATEGORY_COLORS[template.category] || CATEGORY_COLORS['General']

                        return (
                          <Card
                            key={template.id}
                            className="border-2 hover:border-[var(--primary)] transition-all duration-200 cursor-pointer group hover:shadow-lg"
                            onClick={() => setSelectedTemplate(template)}
                          >
                            <CardContent className="p-5">
                              <div className="flex items-start gap-3 mb-3">
                                <div className="p-3 rounded-xl bg-[var(--primary)]/10 group-hover:bg-[var(--primary)]/20 transition-colors">
                                  <Icon className="w-6 h-6 text-[var(--primary)]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-bold text-base mb-1 line-clamp-1">
                                    {template.name}
                                  </h3>
                                  <span
                                    className={`text-[10px] px-2 py-0.5 rounded-full inline-block font-medium ${categoryColor}`}
                                  >
                                    {template.category}
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm text-[var(--muted)] line-clamp-2 mb-3 min-h-[2.5rem]">
                                {template.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-[var(--muted)]">
                                  {template.type.replace(/_/g, ' ')}
                                </span>
                                <ChevronRight className="w-4 h-4 text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </div>
                )
              })}

              {Object.keys(groupedTemplates).length === 0 && (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--muted)]/30 mb-4">
                    <FileText className="w-8 h-8 text-[var(--muted)]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">No templates found</h3>
                  <p className="text-sm text-[var(--muted)]">
                    Try adjusting your search or filter
                  </p>
                </div>
              )}
            </div>
          ) : (
            // Template Customization
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex items-start gap-4 p-5 bg-[var(--muted)]/30 rounded-xl">
                {(() => {
                  const Icon = ICON_MAP[selectedTemplate.icon] || FileText
                  return (
                    <div className="p-3 rounded-xl bg-[var(--primary)]/10">
                      <Icon className="w-8 h-8 text-[var(--primary)]" />
                    </div>
                  )
                })()}
                <div className="flex-1">
                  <h3 className="font-black text-xl mb-2">{selectedTemplate.name}</h3>
                  <p className="text-sm text-[var(--muted)] mb-3">
                    {selectedTemplate.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs">
                    <span
                      className={`px-2 py-1 rounded-full font-medium ${
                        CATEGORY_COLORS[selectedTemplate.category] || CATEGORY_COLORS['General']
                      }`}
                    >
                      {selectedTemplate.category}
                    </span>
                    <span className="px-2 py-1 bg-[var(--background)] rounded">
                      {selectedTemplate.type.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">
                  Document Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder={selectedTemplate.name}
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[var(--border)] rounded-xl bg-[var(--background)] text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none font-semibold"
                  autoFocus
                />
                <p className="text-xs text-[var(--muted)] mt-1">
                  Leave blank to use default: "{selectedTemplate.name}"
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Template Preview</label>
                <div className="p-4 bg-white dark:bg-slate-900 border-2 border-[var(--border)] rounded-xl max-h-72 overflow-y-auto shadow-inner">
                  <div
                    className="prose prose-sm max-w-none
                      prose-headings:font-bold prose-headings:text-[var(--foreground)]
                      prose-h1:text-lg prose-h1:mb-3
                      prose-h2:text-base prose-h2:mb-2 prose-h2:mt-4
                      prose-h3:text-sm prose-h3:mb-2 prose-h3:mt-3
                      prose-p:text-[var(--foreground)] prose-p:my-2
                      prose-li:text-[var(--foreground)]
                      prose-table:my-3 prose-table:text-xs
                      prose-th:bg-[var(--muted)]/30 prose-th:p-2
                      prose-td:p-2 prose-td:border prose-td:border-[var(--border)]"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(selectedTemplate.content) }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
                <Button
                  variant="outline"
                  onClick={() => setSelectedTemplate(null)}
                  disabled={isCreating}
                  className="font-bold"
                >
                  <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
                  BACK
                </Button>
                <Button
                  onClick={handleCreateDocument}
                  disabled={isCreating}
                  className="font-bold flex-1"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      CREATING...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      CREATE DOCUMENT
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!selectedTemplate && (
          <div className="p-4 border-t border-[var(--border)] bg-[var(--muted)]/20">
            <p className="text-xs text-[var(--muted)] text-center">
              {filteredTemplates.length} template
              {filteredTemplates.length !== 1 ? 's' : ''} available
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DocumentTemplateSelector
