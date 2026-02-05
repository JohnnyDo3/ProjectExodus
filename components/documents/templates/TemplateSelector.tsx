'use client'

import { useState, useMemo } from 'react'
import {
  FileText, Search, X, ChevronRight, Star, Plus, Clock,
  FileCheck, Users, Briefcase, BookOpen, Target, ListChecks,
  Presentation, Bug, Lightbulb, FileQuestion
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { TemplatePreview } from './TemplatePreview'

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

interface TemplateSelectorProps {
  isOpen: boolean
  templates: Template[]
  recentTemplates?: Template[]
  onSelect: (template: Template | null, customTitle?: string) => void
  onClose: () => void
}

// Icon mapping for templates
const TEMPLATE_ICONS: Record<string, React.ReactNode> = {
  file: <FileText className="w-5 h-5" />,
  meeting: <Users className="w-5 h-5" />,
  proposal: <Briefcase className="w-5 h-5" />,
  research: <BookOpen className="w-5 h-5" />,
  spec: <FileCheck className="w-5 h-5" />,
  story: <Target className="w-5 h-5" />,
  retro: <ListChecks className="w-5 h-5" />,
  design: <Presentation className="w-5 h-5" />,
  content: <FileQuestion className="w-5 h-5" />,
  bug: <Bug className="w-5 h-5" />,
  idea: <Lightbulb className="w-5 h-5" />,
  default: <FileText className="w-5 h-5" />,
}

// Category definitions
const CATEGORIES = [
  { id: 'all', label: 'All Templates' },
  { id: 'planning', label: 'Planning' },
  { id: 'documentation', label: 'Documentation' },
  { id: 'meetings', label: 'Meetings' },
  { id: 'project', label: 'Project Management' },
  { id: 'custom', label: 'Custom' },
]

export function TemplateSelector({
  isOpen,
  templates,
  recentTemplates = [],
  onSelect,
  onClose,
}: TemplateSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [customTitle, setCustomTitle] = useState('')

  // Filter templates
  const filteredTemplates = useMemo(() => {
    let result = templates

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((t) =>
        t.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // Filter by search
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(term) ||
          t.description?.toLowerCase().includes(term) ||
          t.category.toLowerCase().includes(term)
      )
    }

    return result
  }, [templates, selectedCategory, searchTerm])

  // Group templates by category for display
  const groupedTemplates = useMemo(() => {
    if (selectedCategory !== 'all') {
      return { [selectedCategory]: filteredTemplates }
    }

    const groups: Record<string, Template[]> = {}
    filteredTemplates.forEach((template) => {
      const category = template.category || 'Other'
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(template)
    })
    return groups
  }, [filteredTemplates, selectedCategory])

  const getIcon = (iconName: string | null) => {
    if (!iconName) return TEMPLATE_ICONS.default
    return TEMPLATE_ICONS[iconName.toLowerCase()] || TEMPLATE_ICONS.default
  }

  const handleSelect = () => {
    onSelect(selectedTemplate, customTitle || undefined)
    onClose()
  }

  const handleBlankDocument = () => {
    onSelect(null, customTitle || 'Untitled Document')
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-8 lg:inset-16 bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <div>
            <h2 className="text-lg font-bold">Create New Document</h2>
            <p className="text-sm text-[var(--muted)]">
              Start with a template or create a blank document
            </p>
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

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-48 border-r border-[var(--border)] p-2 flex-shrink-0 overflow-y-auto">
            {/* Blank document button */}
            <button
              onClick={handleBlankDocument}
              className="w-full flex items-center gap-3 px-3 py-2 mb-2 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium text-sm">Blank Document</span>
            </button>

            {/* Recent templates */}
            {recentTemplates.length > 0 && (
              <div className="mb-4">
                <div className="px-3 py-1 text-[10px] font-medium text-[var(--muted)] uppercase tracking-wide">
                  Recent
                </div>
                {recentTemplates.slice(0, 3).map((template) => (
                  <button
                    key={template.id}
                    onClick={() => {
                      setSelectedTemplate(template)
                      setShowPreview(true)
                    }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-left rounded hover:bg-[var(--secondary)]/10"
                  >
                    <Clock className="w-3 h-3 text-[var(--muted)]" />
                    <span className="text-xs truncate">{template.name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Categories */}
            <div className="px-3 py-1 text-[10px] font-medium text-[var(--muted)] uppercase tracking-wide">
              Categories
            </div>
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full flex items-center gap-2 px-3 py-1.5 text-left rounded transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-[var(--primary)]/10 text-[var(--primary)]'
                    : 'hover:bg-[var(--secondary)]/10'
                }`}
              >
                <span className="text-sm">{category.label}</span>
              </button>
            ))}
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
                  className="w-full pl-10 pr-4 py-2 text-sm bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
                />
              </div>
            </div>

            {/* Templates grid */}
            <div className="flex-1 overflow-y-auto p-4">
              {Object.keys(groupedTemplates).length > 0 ? (
                Object.entries(groupedTemplates).map(([category, categoryTemplates]) => (
                  <div key={category} className="mb-6">
                    <h3 className="text-sm font-bold mb-3 capitalize">{category}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {categoryTemplates.map((template) => (
                        <button
                          key={template.id}
                          onClick={() => {
                            setSelectedTemplate(template)
                            setShowPreview(true)
                          }}
                          className={`p-4 text-left border rounded-lg transition-all hover:border-[var(--primary)]/50 hover:shadow-md ${
                            selectedTemplate?.id === template.id
                              ? 'border-[var(--primary)] bg-[var(--primary)]/5'
                              : 'border-[var(--border)]'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className={`p-2 rounded-lg ${
                              template.isBuiltIn
                                ? 'bg-[var(--primary)]/10 text-[var(--primary)]'
                                : 'bg-[var(--secondary)]/20 text-[var(--muted)]'
                            }`}>
                              {getIcon(template.icon)}
                            </div>
                            {template.isBuiltIn && (
                              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            )}
                          </div>
                          <h4 className="font-medium text-sm mb-1 line-clamp-1">
                            {template.name}
                          </h4>
                          <p className="text-xs text-[var(--muted)] line-clamp-2">
                            {template.description || 'No description'}
                          </p>
                          {template.usageCount > 0 && (
                            <p className="text-[10px] text-[var(--muted)] mt-2">
                              Used {template.usageCount} times
                            </p>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-[var(--muted)] opacity-50" />
                  <p className="text-sm text-[var(--muted)]">
                    {searchTerm
                      ? 'No templates match your search'
                      : 'No templates in this category'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Preview panel */}
          {showPreview && selectedTemplate && (
            <div className="w-80 border-l border-[var(--border)] flex flex-col overflow-hidden">
              <TemplatePreview
                template={selectedTemplate}
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
      </div>
    </>
  )
}

export default TemplateSelector
