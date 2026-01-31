'use client'

import { useState } from 'react'
import { DOCUMENT_TEMPLATES, DocumentTemplate } from '@/data/document-templates'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import {
  FileText,
  X,
  Search,
  ChevronRight,
  Calendar,
  ClipboardList,
  Lightbulb,
  FileSearch,
  Target,
  Users,
  TrendingUp,
  Loader2,
} from 'lucide-react'

interface DocumentTemplateSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (template: DocumentTemplate, customTitle?: string) => Promise<void>
  projectId: string
}

const templateIcons: Record<string, any> = {
  blank: FileText,
  meeting: Calendar,
  proposal: Lightbulb,
  research: FileSearch,
  plan: Target,
  guidelines: Users,
  progress: TrendingUp,
}

export function DocumentTemplateSelector({
  isOpen,
  onClose,
  onSelect,
  projectId,
}: DocumentTemplateSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null)
  const [customTitle, setCustomTitle] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  if (!isOpen) return null

  const filteredTemplates = DOCUMENT_TEMPLATES.filter(
    (template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[var(--background)] rounded-lg shadow-2xl border-2 border-[var(--border)] max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col mx-4">
        {/* Header */}
        <div className="p-6 border-b border-[var(--border)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black text-[var(--foreground)]">
              {selectedTemplate ? 'Customize Document' : 'Choose a Template'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[var(--muted)] rounded-lg transition-colors"
              disabled={isCreating}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!selectedTemplate && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)] focus:border-theme-primary focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!selectedTemplate ? (
            // Template Grid
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map((template) => {
                const Icon = templateIcons[template.id] || FileText

                return (
                  <Card
                    key={template.id}
                    className="border-2 hover:border-theme-primary transition-colors cursor-pointer group"
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-3 rounded-lg bg-[var(--primary)]/10 group-hover:bg-[var(--primary)]/20 transition-colors">
                          <Icon className="w-6 h-6 text-theme-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-black text-base mb-1">{template.name}</h3>
                          <p className="text-xs px-2 py-0.5 bg-[var(--muted)] text-theme-muted rounded inline-block">
                            {template.category}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-theme-muted line-clamp-3 mb-3">
                        {template.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-theme-muted">{template.type}</span>
                        <ChevronRight className="w-4 h-4 text-theme-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            // Template Customization
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-[var(--muted)] rounded-lg">
                {(() => {
                  const Icon = templateIcons[selectedTemplate.id] || FileText
                  return <Icon className="w-8 h-8 text-theme-primary flex-shrink-0 mt-1" />
                })()}
                <div className="flex-1">
                  <h3 className="font-black text-xl mb-2">{selectedTemplate.name}</h3>
                  <p className="text-sm text-theme-muted mb-3">{selectedTemplate.description}</p>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="px-2 py-1 bg-[var(--background)] rounded">
                      {selectedTemplate.category}
                    </span>
                    <span className="px-2 py-1 bg-[var(--background)] rounded">
                      {selectedTemplate.type}
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
                  className="w-full px-4 py-3 border-2 border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)] focus:border-theme-primary focus:outline-none font-semibold"
                  autoFocus
                />
                <p className="text-xs text-theme-muted mt-1">
                  Leave blank to use default: "{selectedTemplate.name}"
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Template Preview</label>
                <div className="p-4 bg-white dark:bg-slate-900 border-2 border-[var(--border)] rounded-lg max-h-64 overflow-y-auto">
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedTemplate.content }}
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
          <div className="p-4 border-t border-[var(--border)] bg-[var(--muted)]/50">
            <p className="text-xs text-theme-muted text-center">
              {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}{' '}
              available
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DocumentTemplateSelector
