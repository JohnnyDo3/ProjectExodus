'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  PROJECT_TEMPLATES,
  ProjectTemplate,
  getPopularTemplates,
  getTemplatesByCategory
} from '@/data/project-templates'
import {
  Sparkles, Check, Search, Filter, X, ChevronRight,
  Leaf, Grid3x3, LayoutGrid
} from 'lucide-react'

interface ProjectTemplateGalleryProps {
  onSelectTemplate: (template: ProjectTemplate | null) => void
  selectedTemplateId?: string | null
}

const CATEGORIES = [
  { value: 'all', label: 'All Templates', icon: LayoutGrid },
  { value: 'environment', label: 'Environment', icon: Leaf },
  { value: 'agriculture', label: 'Agriculture', icon: Leaf },
  { value: 'energy', label: 'Energy', icon: Leaf },
  { value: 'education', label: 'Education', icon: Leaf },
  { value: 'advocacy', label: 'Advocacy', icon: Leaf },
  { value: 'technology', label: 'Technology', icon: Leaf },
]

export function ProjectTemplateGallery({
  onSelectTemplate,
  selectedTemplateId
}: ProjectTemplateGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [previewTemplate, setPreviewTemplate] = useState<ProjectTemplate | null>(null)

  // Filter templates
  const filteredTemplates = PROJECT_TEMPLATES.filter(template => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory =
      selectedCategory === 'all' ||
      template.category === selectedCategory ||
      template.id === 'blank-canvas'

    return matchesSearch && matchesCategory
  }).sort((a, b) => b.popularity - a.popularity)

  const handleSelectTemplate = (template: ProjectTemplate) => {
    if (template.id === 'blank-canvas') {
      onSelectTemplate(null)
    } else {
      onSelectTemplate(template)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 border border-[var(--primary)]/20">
          <Sparkles className="w-4 h-4 text-theme-primary" />
          <span className="text-xs font-bold uppercase tracking-wider text-theme-primary">
            Choose Your Starting Point
          </span>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[var(--foreground)] via-[var(--primary)] to-[var(--foreground)] bg-clip-text text-transparent">
          Project Templates
        </h2>
        <p className="text-base text-theme-muted max-w-2xl mx-auto font-medium">
          Jumpstart your project with a professionally designed template, or build from scratch
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates, tags, or keywords..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm font-semibold focus:border-theme-primary focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted hover:text-[var(--foreground)]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2.5 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm font-semibold focus:border-theme-primary focus:outline-none appearance-none cursor-pointer"
        >
          {CATEGORIES.map(cat => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        {/* View Mode Toggle */}
        <div className="flex gap-2 p-1 bg-[var(--muted)] rounded-lg">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'grid'
                ? 'bg-[var(--background)] text-theme-primary shadow-sm'
                : 'text-theme-muted hover:text-[var(--foreground)]'
            }`}
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'list'
                ? 'bg-[var(--background)] text-theme-primary shadow-sm'
                : 'text-theme-muted hover:text-[var(--foreground)]'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-theme-muted font-medium">
        Showing {filteredTemplates.length} {filteredTemplates.length === 1 ? 'template' : 'templates'}
      </div>

      {/* Template Grid/List */}
      <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
        {filteredTemplates.map((template, index) => {
          const Icon = template.icon
          const isSelected = selectedTemplateId === template.id
          const isBlankCanvas = template.id === 'blank-canvas'

          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Card
                className={`relative overflow-hidden cursor-pointer transition-all hover:shadow-2xl group border-2 ${
                  isSelected
                    ? 'border-[var(--primary)] ring-4 ring-[var(--primary)]/20'
                    : isBlankCanvas
                    ? 'border-dashed border-[var(--primary)]/40 hover:border-[var(--primary)]'
                    : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                } ${viewMode === 'list' ? 'flex' : ''}`}
                onClick={() => handleSelectTemplate(template)}
              >
                {/* Gradient accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{
                    background: `linear-gradient(90deg, ${template.gradient.replace('from-', '').replace(' to-', ', ')})`
                  }}
                />

                {/* Selection check */}
                {isSelected && (
                  <div className="absolute top-3 right-3 z-10">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${template.gradient} flex items-center justify-center shadow-lg`}>
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}

                <CardContent className={`p-5 ${viewMode === 'list' ? 'flex items-center gap-4 flex-1' : 'space-y-4'}`}>
                  {/* Icon and Title */}
                  <div className={viewMode === 'list' ? 'flex items-center gap-4 flex-1' : 'space-y-3'}>
                    <div
                      className={`rounded-xl flex items-center justify-center flex-shrink-0 ${
                        viewMode === 'list' ? 'w-16 h-16' : 'w-14 h-14'
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${template.gradient.replace('from-', '').replace(' to-', ', ')}15)`
                      }}
                    >
                      <Icon className="w-8 h-8" style={{ color: template.color }} />
                    </div>

                    <div className={viewMode === 'list' ? 'flex-1' : ''}>
                      <h3 className="text-lg font-bold text-[var(--foreground)] mb-1 group-hover:text-theme-primary transition-colors">
                        {template.name}
                      </h3>
                      <p className="text-xs font-bold text-theme-muted italic leading-relaxed">
                        {template.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  {viewMode === 'grid' && (
                    <p className="text-sm text-theme-muted leading-relaxed line-clamp-3">
                      {template.description}
                    </p>
                  )}

                  {/* Tags */}
                  {template.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {template.tags.slice(0, viewMode === 'list' ? 3 : 4).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-[var(--muted)] rounded-full text-[10px] font-bold text-theme-muted"
                        >
                          #{tag}
                        </span>
                      ))}
                      {template.tags.length > (viewMode === 'list' ? 3 : 4) && (
                        <span className="px-2 py-0.5 text-[10px] font-bold text-theme-muted">
                          +{template.tags.length - (viewMode === 'list' ? 3 : 4)}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Preview Button */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setPreviewTemplate(template)
                      }}
                      className="text-xs font-bold text-theme-primary hover:underline flex items-center gap-1"
                    >
                      Preview Details
                      <ChevronRight className="w-3 h-3" />
                    </button>
                    {isBlankCanvas && (
                      <span className="text-[10px] font-bold text-theme-muted uppercase tracking-wider">
                        Custom Build
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12 px-4">
          <div className="w-16 h-16 bg-[var(--muted)] rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-theme-muted" />
          </div>
          <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">
            No templates found
          </h3>
          <p className="text-sm text-theme-muted mb-4">
            Try adjusting your search or filters
          </p>
          <Button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
            }}
            size="sm"
            className="font-bold"
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Preview Modal */}
      <AnimatePresence>
        {previewTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setPreviewTemplate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[var(--background)] rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-auto border-2 border-[var(--border)] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="h-2"
                style={{
                  background: `linear-gradient(90deg, ${previewTemplate.gradient.replace('from-', '').replace(' to-', ', ')})`
                }}
              />

              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${previewTemplate.gradient.replace('from-', '').replace(' to-', ', ')}15)`
                    }}
                  >
                    <previewTemplate.icon className="w-8 h-8" style={{ color: previewTemplate.color }} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-[var(--foreground)] mb-1">
                      {previewTemplate.name}
                    </h2>
                    <p className="text-sm font-bold text-theme-primary italic">
                      {previewTemplate.tagline}
                    </p>
                  </div>
                  <button
                    onClick={() => setPreviewTemplate(null)}
                    className="text-theme-muted hover:text-[var(--foreground)] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider mb-2">
                    Description
                  </h3>
                  <p className="text-sm text-theme-muted leading-relaxed">
                    {previewTemplate.description}
                  </p>
                </div>

                {/* Mission */}
                {previewTemplate.mission && (
                  <div>
                    <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider mb-2">
                      Mission
                    </h3>
                    <p className="text-sm text-theme-muted leading-relaxed">
                      {previewTemplate.mission}
                    </p>
                  </div>
                )}

                {/* Suggested Goal */}
                {previewTemplate.suggestedGoal && (
                  <div>
                    <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider mb-2">
                      Suggested Goal
                    </h3>
                    <p className="text-sm text-theme-muted leading-relaxed">
                      {previewTemplate.suggestedGoal}
                    </p>
                  </div>
                )}

                {/* Sections */}
                {previewTemplate.sections && previewTemplate.sections.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider mb-3">
                      Included Sections
                    </h3>
                    <div className="space-y-2">
                      {previewTemplate.sections.map((section, idx) => (
                        <div key={idx} className="p-3 bg-[var(--muted)] rounded-lg">
                          <h4 className="text-sm font-bold text-[var(--foreground)] mb-1">
                            {section.title}
                          </h4>
                          <p className="text-xs text-theme-muted">
                            {section.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {previewTemplate.tags.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider mb-2">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {previewTemplate.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-[var(--muted)] rounded-full text-xs font-bold text-theme-muted"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-[var(--border)]">
                  <Button
                    onClick={() => {
                      handleSelectTemplate(previewTemplate)
                      setPreviewTemplate(null)
                    }}
                    className="flex-1 font-bold"
                  >
                    Use This Template
                  </Button>
                  <Button
                    onClick={() => setPreviewTemplate(null)}
                    variant="outline"
                    className="font-bold"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
