'use client'

import { useState, useCallback } from 'react'
import { motion, Reorder } from 'framer-motion'
import {
  MessageSquare,
  FileText,
  BookOpen,
  Users,
  FolderKanban,
  Link2,
  Target,
  Bell,
  BarChart3,
  GripVertical,
  Eye,
  EyeOff,
  Settings,
  Save,
  RotateCcw,
  Leaf
} from 'lucide-react'

export interface LayoutSection {
  id: string
  name: string
  icon: string
  order: number
  enabled: boolean
  visibility: 'all' | 'contributors' | 'admins'
  customTitle?: string
}

interface LayoutBuilderProps {
  projectId: string
  initialLayout: LayoutSection[]
  onSave: (layout: LayoutSection[]) => Promise<void>
  className?: string
}

const SECTION_ICONS: Record<string, typeof MessageSquare> = {
  discussions: MessageSquare,
  research: FileText,
  learning: BookOpen,
  members: Users,
  subgroups: FolderKanban,
  resources: Link2,
  milestones: Target,
  announcements: Bell,
  activity: BarChart3
}

const DEFAULT_SECTIONS: LayoutSection[] = [
  { id: 'discussions', name: 'Discussions', icon: 'discussions', order: 0, enabled: true, visibility: 'all' },
  { id: 'research', name: 'Research Hub', icon: 'research', order: 1, enabled: true, visibility: 'all' },
  { id: 'learning', name: 'Learning Path', icon: 'learning', order: 2, enabled: true, visibility: 'all' },
  { id: 'subgroups', name: 'Subgroups', icon: 'subgroups', order: 3, enabled: true, visibility: 'all' },
  { id: 'members', name: 'Members', icon: 'members', order: 4, enabled: true, visibility: 'all' },
  { id: 'resources', name: 'Resources', icon: 'resources', order: 5, enabled: false, visibility: 'all' },
  { id: 'milestones', name: 'Goals & Milestones', icon: 'milestones', order: 6, enabled: false, visibility: 'all' },
  { id: 'announcements', name: 'Announcements', icon: 'announcements', order: 7, enabled: false, visibility: 'admins' },
  { id: 'activity', name: 'Activity Feed', icon: 'activity', order: 8, enabled: false, visibility: 'all' },
]

export function LayoutBuilder({
  projectId,
  initialLayout,
  onSave,
  className = ''
}: LayoutBuilderProps) {
  const [sections, setSections] = useState<LayoutSection[]>(
    initialLayout.length > 0 ? initialLayout : DEFAULT_SECTIONS
  )
  const [saving, setSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [editingSection, setEditingSection] = useState<string | null>(null)

  const handleReorder = useCallback((newOrder: LayoutSection[]) => {
    setSections(newOrder.map((s, i) => ({ ...s, order: i })))
    setHasChanges(true)
  }, [])

  const toggleSection = useCallback((id: string) => {
    setSections(prev => prev.map(s =>
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ))
    setHasChanges(true)
  }, [])

  const updateVisibility = useCallback((id: string, visibility: LayoutSection['visibility']) => {
    setSections(prev => prev.map(s =>
      s.id === id ? { ...s, visibility } : s
    ))
    setHasChanges(true)
  }, [])

  const updateCustomTitle = useCallback((id: string, title: string) => {
    setSections(prev => prev.map(s =>
      s.id === id ? { ...s, customTitle: title || undefined } : s
    ))
    setHasChanges(true)
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave(sections)
      setHasChanges(false)
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    setSections(initialLayout.length > 0 ? initialLayout : DEFAULT_SECTIONS)
    setHasChanges(false)
  }

  const enabledSections = sections.filter(s => s.enabled).sort((a, b) => a.order - b.order)
  const disabledSections = sections.filter(s => !s.enabled)

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Layout Builder</h2>
          <p className="text-sm text-[var(--muted-foreground)]">
            Drag to reorder, click to enable/disable sections
          </p>
        </div>
        <div className="flex items-center gap-2">
          {hasChanges && (
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-sm border border-[var(--border)] rounded-lg hover:bg-[var(--muted)] transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className={`px-4 py-1.5 text-sm rounded-lg flex items-center gap-2 transition-colors ${
              hasChanges
                ? 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90'
                : 'bg-[var(--muted)] text-[var(--muted-foreground)] cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Layout'}
          </button>
        </div>
      </div>

      {/* Sage Tip */}
      <div className="flex items-start gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
        <Leaf className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
            Sage Tip
          </p>
          <p className="text-sm text-[var(--muted-foreground)]">
            For research projects, prioritize the Research Hub. For community initiatives,
            lead with Discussions. Enable only what you need - you can always add more later.
          </p>
        </div>
      </div>

      {/* Active Sections */}
      <div>
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Eye className="w-4 h-4" />
          Active Sections
        </h3>
        <Reorder.Group
          axis="y"
          values={enabledSections}
          onReorder={handleReorder}
          className="space-y-2"
        >
          {enabledSections.map((section) => {
            const Icon = SECTION_ICONS[section.icon] || MessageSquare
            const isEditing = editingSection === section.id

            return (
              <Reorder.Item
                key={section.id}
                value={section}
                className="bg-[var(--card)] border border-[var(--border)] rounded-lg overflow-hidden"
              >
                <div className="flex items-center p-3">
                  <div className="cursor-grab active:cursor-grabbing p-1 mr-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                    <GripVertical className="w-5 h-5" />
                  </div>

                  <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center mr-3">
                    <Icon className="w-5 h-5 text-[var(--primary)]" />
                  </div>

                  <div className="flex-1">
                    <p className="font-medium">
                      {section.customTitle || section.name}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      Visible to: {section.visibility === 'all' ? 'Everyone' : section.visibility}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingSection(isEditing ? null : section.id)}
                      className="p-2 hover:bg-[var(--muted)] rounded-lg transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors"
                    >
                      <EyeOff className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Edit Panel */}
                {isEditing && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-[var(--border)] p-3 bg-[var(--muted)]/50"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium mb-1 block">
                          Custom Title
                        </label>
                        <input
                          type="text"
                          value={section.customTitle || ''}
                          onChange={(e) => updateCustomTitle(section.id, e.target.value)}
                          placeholder={section.name}
                          className="w-full px-3 py-1.5 text-sm bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium mb-1 block">
                          Visibility
                        </label>
                        <select
                          value={section.visibility}
                          onChange={(e) => updateVisibility(section.id, e.target.value as LayoutSection['visibility'])}
                          className="w-full px-3 py-1.5 text-sm bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
                        >
                          <option value="all">Everyone</option>
                          <option value="contributors">Contributors Only</option>
                          <option value="admins">Admins Only</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </Reorder.Item>
            )
          })}
        </Reorder.Group>

        {enabledSections.length === 0 && (
          <div className="text-center py-8 text-[var(--muted-foreground)]">
            No sections enabled. Add some from below.
          </div>
        )}
      </div>

      {/* Disabled Sections */}
      {disabledSections.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <EyeOff className="w-4 h-4" />
            Available Sections
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {disabledSections.map((section) => {
              const Icon = SECTION_ICONS[section.icon] || MessageSquare

              return (
                <button
                  key={section.id}
                  onClick={() => toggleSection(section.id)}
                  className="flex items-center gap-3 p-3 bg-[var(--muted)]/50 border border-dashed border-[var(--border)] rounded-lg hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-colors"
                >
                  <Icon className="w-5 h-5 text-[var(--muted-foreground)]" />
                  <span className="text-sm">{section.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default LayoutBuilder
