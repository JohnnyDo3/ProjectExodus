'use client'

import { useState, useMemo } from 'react'
import {
  FileText,
  Search,
  X,
  Plus,
  Clock,
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
  Folder,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { TemplateCard } from './TemplateCard'
import { TemplatePreview } from './TemplatePreview'
import {
  DOCUMENT_TEMPLATES,
  TEMPLATE_CATEGORIES,
  DocumentTemplate,
  TemplateCategory,
} from '@/data/document-templates'

interface TemplateSelectorProps {
  isOpen: boolean
  recentTemplateIds?: string[]
  onSelect: (template: DocumentTemplate | null, customTitle?: string) => void
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

// Category icons
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  'General': FileText,
  'Project Management': Folder,
  'Engineering': Code,
  'Content': FileEdit,
}

export function TemplateSelector({
  isOpen,
  recentTemplateIds = [],
  onSelect,
  onClose,
}: TemplateSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all')
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [customTitle, setCustomTitle] = useState('')

  // Get recent templates from IDs
  const recentTemplates = useMemo(() => {
    return recentTemplateIds
      .map((id) => DOCUMENT_TEMPLATES.find((t) => t.id === id))
      .filter((t): t is DocumentTemplate => t !== undefined)
      .slice(0, 3)
  }, [recentTemplateIds])

  // Filter templates
  const filteredTemplates = useMemo(() => {
    let result = [...DOCUMENT_TEMPLATES]

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((t) => t.category === selectedCategory)
    }

    // Filter by search
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(term) ||
          t.description.toLowerCase().includes(term) ||
          t.category.toLowerCase().includes(term)
      )
    }

    // Sort by popularity
    result.sort((a, b) => b.popularity - a.popularity)

    return result
  }, [selectedCategory, searchTerm])

  // Group templates by category for display
  const groupedTemplates = useMemo(() => {
    if (selectedCategory !== 'all') {
      return { [selectedCategory]: filteredTemplates }
    }

    const groups: Record<string, DocumentTemplate[]> = {}
    filteredTemplates.forEach((template) => {
      const category = template.category
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(template)
    })

    // Sort categories by the order defined in TEMPLATE_CATEGORIES
    const sortedGroups: Record<string, DocumentTemplate[]> = {}
    TEMPLATE_CATEGORIES.forEach(({ id }) => {
      if (groups[id]) {
        sortedGroups[id] = groups[id]
      }
    })

    return sortedGroups
  }, [filteredTemplates, selectedCategory])

  const handleSelect = () => {
    onSelect(selectedTemplate, customTitle || undefined)
    handleClose()
  }

  const handleBlankDocument = () => {
    const blankTemplate = DOCUMENT_TEMPLATES.find((t) => t.id === 'blank')
    onSelect(blankTemplate || null, customTitle || 'Untitled Document')
    handleClose()
  }

  const handleClose = () => {
    setSelectedTemplate(null)
    setShowPreview(false)
    setCustomTitle('')
    setSearchTerm('')
    setSelectedCategory('all')
    onClose()
  }

  const handleTemplateClick = (template: DocumentTemplate) => {
    setSelectedTemplate(template)
    setShowPreview(true)
    setCustomTitle('')
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-8 lg:inset-12 bg-[var(--background)] border-2 border-[var(--border)] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--primary)]/10 rounded-lg">
              <Sparkles className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--foreground)]">Create New Document</h2>
              <p className="text-sm text-[var(--muted)]">
                Start with a template or create a blank document
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleClose}
            className="h-9 w-9 p-0"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-56 border-r border-[var(--border)] p-3 flex-shrink-0 overflow-y-auto bg-[var(--muted)]/20">
            {/* Blank document button */}
            <button
              onClick={handleBlankDocument}
              className="w-full flex items-center gap-3 px-4 py-3 mb-3 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-opacity font-bold shadow-sm"
            >
              <Plus className="w-5 h-5" />
              <span>Blank Document</span>
            </button>

            {/* Recent templates */}
            {recentTemplates.length > 0 && (
              <div className="mb-4">
                <div className="px-3 py-2 text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider">
                  Recent
                </div>
                {recentTemplates.map((template) => {
                  const Icon = ICON_MAP[template.icon] || FileText
                  return (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateClick(template)}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-left rounded-lg hover:bg-[var(--muted)]/50 transition-colors ${
                        selectedTemplate?.id === template.id ? 'bg-[var(--primary)]/10' : ''
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 text-[var(--muted)]" />
                      <span className="text-sm truncate">{template.name}</span>
                    </button>
                  )
                })}
              </div>
            )}

            {/* Categories */}
            <div className="px-3 py-2 text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider">
              Categories
            </div>

            {/* All Templates */}
            <button
              onClick={() => setSelectedCategory('all')}
              className={`w-full flex items-center gap-2 px-3 py-2.5 text-left rounded-lg transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[var(--primary)]/10 text-[var(--primary)] font-medium'
                  : 'hover:bg-[var(--muted)]/50'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">All Templates</span>
              <span className="ml-auto text-[10px] text-[var(--muted)] bg-[var(--muted)]/30 px-1.5 py-0.5 rounded">
                {DOCUMENT_TEMPLATES.length}
              </span>
            </button>

            {TEMPLATE_CATEGORIES.map((category) => {
              const Icon = CATEGORY_ICONS[category.id] || Folder
              const count = DOCUMENT_TEMPLATES.filter((t) => t.category === category.id).length
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 text-left rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-[var(--primary)]/10 text-[var(--primary)] font-medium'
                      : 'hover:bg-[var(--muted)]/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{category.label}</span>
                  <span className="ml-auto text-[10px] text-[var(--muted)] bg-[var(--muted)]/30 px-1.5 py-0.5 rounded">
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Search */}
            <div className="p-4 border-b border-[var(--border)]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search templates..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-[var(--background)] border-2 border-[var(--border)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition-colors"
                />
              </div>
            </div>

            {/* Templates grid */}
            <div className="flex-1 overflow-y-auto p-4">
              {Object.keys(groupedTemplates).length > 0 ? (
                Object.entries(groupedTemplates).map(([category, categoryTemplates]) => {
                  const CategoryIcon = CATEGORY_ICONS[category] || Folder
                  const categoryInfo = TEMPLATE_CATEGORIES.find((c) => c.id === category)

                  return (
                    <div key={category} className="mb-8">
                      <div className="flex items-center gap-2 mb-4">
                        <CategoryIcon className="w-5 h-5 text-[var(--primary)]" />
                        <h3 className="text-base font-bold">{category}</h3>
                        {categoryInfo && (
                          <span className="text-xs text-[var(--muted)]">
                            - {categoryInfo.description}
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categoryTemplates.map((template) => (
                          <TemplateCard
                            key={template.id}
                            id={template.id}
                            name={template.name}
                            description={template.description}
                            icon={template.icon}
                            category={template.category}
                            isBuiltIn={true}
                            isSelected={selectedTemplate?.id === template.id}
                            onClick={() => handleTemplateClick(template)}
                          />
                        ))}
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--muted)]/30 mb-4">
                    <FileText className="w-8 h-8 text-[var(--muted)]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">No templates found</h3>
                  <p className="text-sm text-[var(--muted)]">
                    {searchTerm
                      ? `No templates match "${searchTerm}"`
                      : 'No templates in this category'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Preview panel */}
          {showPreview && selectedTemplate && (
            <div className="w-96 border-l border-[var(--border)] flex flex-col overflow-hidden bg-[var(--card)]">
              <TemplatePreview
                template={{
                  id: selectedTemplate.id,
                  name: selectedTemplate.name,
                  description: selectedTemplate.description,
                  content: selectedTemplate.content,
                  category: selectedTemplate.category,
                  icon: selectedTemplate.icon,
                  isBuiltIn: true,
                  usageCount: 0,
                  createdAt: new Date(),
                }}
                customTitle={customTitle}
                onTitleChange={setCustomTitle}
                onUse={handleSelect}
                onClose={() => {
                  setShowPreview(false)
                  setSelectedTemplate(null)
                }}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[var(--border)] bg-[var(--muted)]/20">
          <p className="text-xs text-center text-[var(--muted)]">
            {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}{' '}
            available
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </p>
        </div>
      </div>
    </>
  )
}

export default TemplateSelector
