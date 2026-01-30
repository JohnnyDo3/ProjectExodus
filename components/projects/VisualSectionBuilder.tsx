'use client'

import { useState } from 'react'
import { motion, Reorder, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  GripVertical, Plus, Trash2, Edit2, Eye, EyeOff, ChevronDown, ChevronUp,
  FileText, Image, List, Quote, Link, Code, Table, Video, Map, Users,
  Sparkles, Zap
} from 'lucide-react'

export interface ProjectSection {
  id: string
  title: string
  content: string
  type: 'text' | 'image' | 'list' | 'quote' | 'link' | 'code' | 'table' | 'video' | 'map' | 'team'
  icon: any
  visible: boolean
  expanded: boolean
  order: number
}

interface VisualSectionBuilderProps {
  initialSections?: ProjectSection[]
  onSectionsChange: (sections: ProjectSection[]) => void
  maxSections?: number
}

const SECTION_TYPES = [
  { type: 'text', label: 'Text Block', icon: FileText, description: 'Rich text content section', defaultTitle: 'About', gradient: 'from-blue-500 to-cyan-500' },
  { type: 'image', label: 'Image Gallery', icon: Image, description: 'Image showcase or gallery', defaultTitle: 'Gallery', gradient: 'from-purple-500 to-pink-500' },
  { type: 'list', label: 'List', icon: List, description: 'Bulleted or numbered list', defaultTitle: 'Features', gradient: 'from-green-500 to-emerald-500' },
  { type: 'quote', label: 'Quote', icon: Quote, description: 'Highlighted quotation', defaultTitle: 'Testimonial', gradient: 'from-orange-500 to-red-500' },
  { type: 'link', label: 'Link Collection', icon: Link, description: 'Useful links and resources', defaultTitle: 'Resources', gradient: 'from-indigo-500 to-violet-500' },
  { type: 'code', label: 'Code Snippet', icon: Code, description: 'Code block with syntax highlighting', defaultTitle: 'Documentation', gradient: 'from-slate-600 to-zinc-700' },
  { type: 'table', label: 'Data Table', icon: Table, description: 'Structured data in table form', defaultTitle: 'Data', gradient: 'from-teal-500 to-cyan-600' },
  { type: 'video', label: 'Video Embed', icon: Video, description: 'Embedded video content', defaultTitle: 'Videos', gradient: 'from-rose-500 to-pink-600' },
  { type: 'map', label: 'Location Map', icon: Map, description: 'Geographic location or map', defaultTitle: 'Location', gradient: 'from-amber-500 to-orange-600' },
  { type: 'team', label: 'Team Members', icon: Users, description: 'Team members and roles', defaultTitle: 'Our Team', gradient: 'from-fuchsia-500 to-purple-600' },
] as const

export function VisualSectionBuilder({
  initialSections = [],
  onSectionsChange,
  maxSections = 10
}: VisualSectionBuilderProps) {
  const [sections, setSections] = useState<ProjectSection[]>(initialSections)
  const [showAddMenu, setShowAddMenu] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleReorder = (newOrder: ProjectSection[]) => {
    const reordered = newOrder.map((section, index) => ({
      ...section,
      order: index
    }))
    setSections(reordered)
    onSectionsChange(reordered)
  }

  const addSection = (type: typeof SECTION_TYPES[number]['type']) => {
    if (sections.length >= maxSections) return

    const sectionType = SECTION_TYPES.find(t => t.type === type)!
    const newSection: ProjectSection = {
      id: crypto.randomUUID(),
      title: sectionType.defaultTitle,
      content: '',
      type,
      icon: sectionType.icon,
      visible: true,
      expanded: true,
      order: sections.length
    }

    const updated = [...sections, newSection]
    setSections(updated)
    onSectionsChange(updated)
    setShowAddMenu(false)
    setEditingId(newSection.id)
  }

  const updateSection = (id: string, updates: Partial<ProjectSection>) => {
    const updated = sections.map(section =>
      section.id === id ? { ...section, ...updates } : section
    )
    setSections(updated)
    onSectionsChange(updated)
  }

  const deleteSection = (id: string) => {
    const updated = sections.filter(s => s.id !== id).map((s, idx) => ({
      ...s,
      order: idx
    }))
    setSections(updated)
    onSectionsChange(updated)
  }

  const toggleVisibility = (id: string) => {
    updateSection(id, { visible: !sections.find(s => s.id === id)?.visible })
  }

  const toggleExpanded = (id: string) => {
    updateSection(id, { expanded: !sections.find(s => s.id === id)?.expanded })
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-[var(--foreground)] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-theme-primary"/>
            Visual Section Builder
          </h3>
          <p className="text-xs text-theme-muted mt-0.5">
            {sections.length} of {maxSections} sections • Drag to reorder
          </p>
        </div>

        <Button
          onClick={() => setShowAddMenu(!showAddMenu)}
          disabled={sections.length >= maxSections}
          size="sm"
          className="font-bold"
        >
          <Plus className="w-4 h-4 mr-1.5"/>
          Add Section
        </Button>
      </div>

      {/* Add Section Menu */}
      <AnimatePresence>
        {showAddMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="border-2 border-[var(--primary)]/30">
              <CardHeader className="pb-3">
                <h4 className="text-sm font-bold text-[var(--foreground)] flex items-center gap-2">
                  <Zap className="w-4 h-4 text-theme-primary"/>
                  Choose Section Type
                </h4>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {SECTION_TYPES.map((sectionType) => {
                    const Icon = sectionType.icon
                    return (
                      <button
                        key={sectionType.type}
                        onClick={() => addSection(sectionType.type)}
                        className="group relative p-3 rounded-lg border-2 border-[var(--border)] hover:border-[var(--primary)] transition-all hover:scale-105 text-left"
                        title={sectionType.description}
                      >
                        {/* Gradient background on hover */}
                        <div
                          className={`absolute inset-0 rounded-lg bg-gradient-to-br ${sectionType.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
                        />

                        {/* Content */}
                        <div className="relative">
                          <div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${sectionType.gradient} flex items-center justify-center mb-2`}
                          >
                            <Icon className="w-5 h-5 text-white"/>
                          </div>
                          <p className="text-xs font-bold text-[var(--foreground)] leading-tight">
                            {sectionType.label}
                          </p>
                          <p className="text-[9px] text-theme-muted mt-0.5 leading-snug">
                            {sectionType.description}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sections List (Reorderable) */}
      <Reorder.Group
        axis="y"
        values={sections}
        onReorder={handleReorder}
        className="space-y-2"
      >
        <AnimatePresence mode="popLayout">
          {sections.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 px-4"
            >
              <div className="w-20 h-20 bg-[var(--muted)] rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 text-theme-muted"/>
              </div>
              <h4 className="text-base font-bold text-[var(--foreground)] mb-2">
                No sections yet
              </h4>
              <p className="text-sm text-theme-muted mb-4">
                Add your first section to start building your project page
              </p>
              <Button onClick={() => setShowAddMenu(true)} size="sm" className="font-bold">
                <Plus className="w-4 h-4 mr-1.5"/>
                Add First Section
              </Button>
            </motion.div>
          ) : (
            sections.map((section) => {
              const sectionType = SECTION_TYPES.find(t => t.type === section.type)!
              const Icon = sectionType.icon
              const isEditing = editingId === section.id

              return (
                <Reorder.Item
                  key={section.id}
                  value={section}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.2 }}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <Card className={`border-2 transition-all ${
                    !section.visible ? 'opacity-60' : ''
                  } ${
                    isEditing ? 'border-[var(--primary)] ring-2 ring-[var(--primary)]/20' : 'border-[var(--border)]'
                  }`}>
                    {/* Section Header */}
                    <div className="flex items-center gap-2 p-3 border-b border-[var(--border)]">
                      {/* Drag Handle */}
                      <div className="cursor-grab active:cursor-grabbing text-theme-muted hover:text-[var(--foreground)] transition-colors">
                        <GripVertical className="w-4 h-4"/>
                      </div>

                      {/* Icon */}
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${sectionType.gradient} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="w-4 h-4 text-white"/>
                      </div>

                      {/* Title */}
                      {isEditing ? (
                        <input
                          type="text"
                          value={section.title}
                          onChange={(e) => updateSection(section.id, { title: e.target.value })}
                          className="flex-1 px-2 py-1 text-sm font-bold bg-[var(--background)] border border-[var(--border)] rounded focus:border-theme-primary focus:outline-none"
                          placeholder="Section title..."
                          autoFocus
                        />
                      ) : (
                        <h4 className="flex-1 text-sm font-bold text-[var(--foreground)]">
                          {section.title}
                        </h4>
                      )}

                      {/* Type Badge */}
                      <span className="px-2 py-0.5 bg-[var(--muted)] rounded-full text-[9px] font-bold text-theme-muted uppercase tracking-wide">
                        {sectionType.label}
                      </span>

                      {/* Actions */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => toggleVisibility(section.id)}
                          className="p-1.5 hover:bg-[var(--muted)] rounded transition-colors"
                          title={section.visible ? 'Hide section' : 'Show section'}
                        >
                          {section.visible ? (
                            <Eye className="w-3.5 h-3.5"/>
                          ) : (
                            <EyeOff className="w-3.5 h-3.5 opacity-50"/>
                          )}
                        </button>

                        <button
                          onClick={() => setEditingId(isEditing ? null : section.id)}
                          className="p-1.5 hover:bg-[var(--muted)] rounded transition-colors"
                          title="Edit section"
                        >
                          <Edit2 className="w-3.5 h-3.5"/>
                        </button>

                        <button
                          onClick={() => toggleExpanded(section.id)}
                          className="p-1.5 hover:bg-[var(--muted)] rounded transition-colors"
                          title={section.expanded ? 'Collapse' : 'Expand'}
                        >
                          {section.expanded ? (
                            <ChevronUp className="w-3.5 h-3.5"/>
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5"/>
                          )}
                        </button>

                        <button
                          onClick={() => deleteSection(section.id)}
                          className="p-1.5 hover:bg-red-500/10 rounded transition-colors text-red-500"
                          title="Delete section"
                        >
                          <Trash2 className="w-3.5 h-3.5"/>
                        </button>
                      </div>
                    </div>

                    {/* Section Content (Expanded) */}
                    <AnimatePresence>
                      {section.expanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <CardContent className="p-3">
                            <textarea
                              value={section.content}
                              onChange={(e) => updateSection(section.id, { content: e.target.value })}
                              placeholder={`Enter ${sectionType.label.toLowerCase()} content...`}
                              rows={4}
                              className="w-full px-3 py-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm font-medium focus:border-theme-primary focus:outline-none resize-none"
                            />

                            {/* Character count */}
                            <p className="text-[10px] text-theme-muted mt-1">
                              {section.content.length} characters
                            </p>

                            {/* Section-specific helpers */}
                            <div className="mt-2 flex flex-wrap gap-2">
                              {section.type === 'list' && (
                                <span className="text-[10px] text-theme-muted italic">
                                  Tip: Use • or - for bullet points, or 1. 2. 3. for numbering
                                </span>
                              )}
                              {section.type === 'quote' && (
                                <span className="text-[10px] text-theme-muted italic">
                                  Tip: Add attribution with — Author Name at the end
                                </span>
                              )}
                              {section.type === 'link' && (
                                <span className="text-[10px] text-theme-muted italic">
                                  Tip: One link per line in format: Title - URL
                                </span>
                              )}
                            </div>
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </Reorder.Item>
              )
            })
          )}
        </AnimatePresence>
      </Reorder.Group>

      {/* Footer Info */}
      {sections.length > 0 && (
        <div className="flex items-center justify-between pt-2 px-2">
          <p className="text-xs text-theme-muted italic">
            Drag sections to reorder • {sections.filter(s => s.visible).length} visible
          </p>
          <p className="text-xs text-theme-muted">
            {sections.length < maxSections && `${maxSections - sections.length} more available`}
          </p>
        </div>
      )}
    </div>
  )
}
