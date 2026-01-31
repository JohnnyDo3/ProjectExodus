'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Search, Check, Sparkles, X } from 'lucide-react'
import {
  MINDMAP_TEMPLATES,
  getTemplateCategories,
  getPopularTemplates,
  type MindMapTemplate
} from '@/data/mindmap-templates'

interface MindMapTemplateSelectorProps {
  onSelect: (template: MindMapTemplate) => void
  onClose?: () => void
  selectedTemplateId?: string
}

export function MindMapTemplateSelector({
  onSelect,
  onClose,
  selectedTemplateId
}: MindMapTemplateSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null)

  const categories = ['All', ...getTemplateCategories()]

  // Filter templates
  const filteredTemplates = MINDMAP_TEMPLATES.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory

    return matchesSearch && matchesCategory
  }).sort((a, b) => b.popularity - a.popularity)

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--foreground)] flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-500"/>
            Choose a Mind Map Template
          </h2>
          <p className="text-sm text-theme-muted mt-1">
            Start with a pre-built structure or create from scratch
          </p>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4"/>
          </Button>
        )}
      </div>

      {/* Search and filters */}
      <div className="mb-6 space-y-4">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-theme-muted"/>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:border-purple-500 focus:outline-none"
          />
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-theme-muted">Category:</span>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === category
                  ? 'bg-purple-500 text-white'
                  : 'bg-[var(--muted)] text-theme-muted hover:bg-purple-500/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Templates grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredTemplates.map((template) => (
            <motion.div
              key={template.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => setHoveredTemplate(template.id)}
              onHoverEnd={() => setHoveredTemplate(null)}
            >
              <Card
                className={`cursor-pointer transition-all h-full ${
                  selectedTemplateId === template.id
                    ? 'ring-4 ring-purple-500 ring-opacity-50 border-purple-500'
                    : hoveredTemplate === template.id
                    ? 'border-purple-300 shadow-lg'
                    : ''
                }`}
                onClick={() => onSelect(template)}
              >
                <CardContent className="p-4">
                  {/* Template header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="text-3xl">{template.icon}</div>
                      <div>
                        <h3 className="font-bold text-sm text-[var(--foreground)]">
                          {template.name}
                        </h3>
                        <Badge size="sm" variant="outline" className="mt-1">
                          {template.category}
                        </Badge>
                      </div>
                    </div>
                    {selectedTemplateId === template.id && (
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white"/>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-theme-muted mb-3 line-clamp-2">
                    {template.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3 text-theme-muted">
                      <span>{template.nodes.length} nodes</span>
                      <span>{template.connections.length} connections</span>
                    </div>
                    {template.popularity >= 7 && (
                      <Badge size="sm" variant="warning" className="text-[10px]">
                        Popular
                      </Badge>
                    )}
                  </div>

                  {/* Preview on hover */}
                  {hoveredTemplate === template.id && template.nodes.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 pt-3 border-t border-[var(--border)]"
                    >
                      <p className="text-[10px] font-bold text-theme-muted mb-2">
                        SAMPLE NODES:
                      </p>
                      <div className="space-y-1">
                        {template.nodes.slice(0, 3).map(node => (
                          <div key={node.id} className="flex items-center gap-1.5 text-[10px]">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500"/>
                            <span className="text-theme-muted truncate">{node.label}</span>
                          </div>
                        ))}
                        {template.nodes.length > 3 && (
                          <div className="text-[10px] text-theme-muted pl-2.5">
                            +{template.nodes.length - 3} more...
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* No results */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--muted)] flex items-center justify-center">
            <Search className="w-8 h-8 text-theme-muted"/>
          </div>
          <h3 className="text-lg font-bold text-[var(--foreground)] mb-1">
            No templates found
          </h3>
          <p className="text-sm text-theme-muted">
            Try adjusting your search or category filter
          </p>
        </div>
      )}

      {/* Quick stats */}
      <div className="mt-6 pt-6 border-t border-[var(--border)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-500">
              {MINDMAP_TEMPLATES.length}
            </div>
            <div className="text-xs text-theme-muted">Templates</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-500">
              {categories.length - 1}
            </div>
            <div className="text-xs text-theme-muted">Categories</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-500">
              {getPopularTemplates(3).length}
            </div>
            <div className="text-xs text-theme-muted">Most Popular</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-500">
              {filteredTemplates.length}
            </div>
            <div className="text-xs text-theme-muted">Showing</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Compact version for wizard/modal use
 */
export function MindMapTemplateCompactSelector({
  onSelect,
  selectedTemplateId
}: MindMapTemplateSelectorProps) {
  const popularTemplates = getPopularTemplates(6)

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {popularTemplates.map(template => (
          <button
            key={template.id}
            onClick={() => onSelect(template)}
            className={`p-3 rounded-lg border-2 transition-all text-left ${
              selectedTemplateId === template.id
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-[var(--border)] hover:border-purple-300'
            }`}
          >
            <div className="flex items-start gap-2">
              <div className="text-xl">{template.icon}</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-[var(--foreground)] truncate">
                    {template.name}
                  </h4>
                  {selectedTemplateId === template.id && (
                    <Check className="w-3 h-3 text-purple-500 flex-shrink-0"/>
                  )}
                </div>
                <p className="text-[10px] text-theme-muted line-clamp-1 mt-0.5">
                  {template.nodes.length} nodes, {template.connections.length} connections
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <p className="text-[10px] text-theme-muted text-center">
        Select a template to pre-populate your mind map, or start with a blank canvas
      </p>
    </div>
  )
}
