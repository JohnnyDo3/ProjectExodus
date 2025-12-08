'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/Button'
import {
  X,
  Save,
  Briefcase,
  Building2,
  MapPin,
  Calendar,
  Plus,
  Trash2,
  Edit2,
} from 'lucide-react'

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

interface ExperienceEditModalProps {
  isOpen: boolean
  onClose: () => void
  experiences: Experience[]
  onSave: (experiences: Experience[]) => Promise<void>
}

export function ExperienceEditModal({
  isOpen,
  onClose,
  experiences: initialExperiences,
  onSave,
}: ExperienceEditModalProps) {
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    setExperiences(initialExperiences)
  }, [initialExperiences])

  // Auto-open add form if no experiences exist
  useEffect(() => {
    if (isOpen && experiences.length === 0 && !isAddingNew) {
      addExperience()
    }
  }, [isOpen, experiences.length])

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    }
    setExperiences([...experiences, newExp])
    setEditingId(newExp.id)
    setIsAddingNew(true)
  }

  const deleteExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id))
    if (editingId === id) {
      setEditingId(null)
      setIsAddingNew(false)
    }
  }

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, ...updates } : exp
      )
    )
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Filter out empty experiences
      const validExperiences = experiences.filter(
        (exp) => exp.title.trim() && exp.company.trim()
      )
      await onSave(validExperiences)
      setEditingId(null)
      setIsAddingNew(false)
      onClose()
    } catch (error) {
      console.error('Error saving experiences:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const cancelEdit = (id: string) => {
    if (isAddingNew) {
      setExperiences(experiences.filter((exp) => exp.id !== id))
      setIsAddingNew(false)
    }
    setEditingId(null)
  }

  if (!isOpen || !isMounted) return null

  const modalContent = (
    <div
      className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="my-8 w-full max-w-2xl bg-[var(--card)] rounded-2xl border-4 border-[var(--primary)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[var(--primary)]">
              <Briefcase className="w-6 h-6 text-[var(--primary-foreground)]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[var(--foreground)]">WORK EXPERIENCE</h2>
              <p className="text-sm font-medium text-[var(--muted-foreground)]">
                Add your professional history
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
          >
            <X className="w-5 h-5 text-[var(--muted-foreground)]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-4 rounded-xl bg-[var(--muted)] border-2 border-[var(--border)]"
            >
              {editingId === exp.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) => updateExperience(exp.id, { title: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors font-medium"
                    placeholder="Job Title *"
                    autoFocus
                  />
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors font-medium"
                    placeholder="Company *"
                  />
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors font-medium"
                    placeholder="Location (optional)"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[var(--muted-foreground)] mb-1">
                        START DATE
                      </label>
                      <input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[var(--muted-foreground)] mb-1">
                        END DATE
                      </label>
                      <input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors font-medium disabled:opacity-50"
                        disabled={exp.current}
                      />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) =>
                        updateExperience(exp.id, {
                          current: e.target.checked,
                          endDate: e.target.checked ? '' : exp.endDate,
                        })
                      }
                      className="w-4 h-4 rounded border-2 border-[var(--border)] text-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"
                    />
                    <span className="font-bold text-sm text-[var(--foreground)]">
                      I currently work here
                    </span>
                  </label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors font-medium resize-none"
                    placeholder="Describe your responsibilities and achievements..."
                  />
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        setEditingId(null)
                        setIsAddingNew(false)
                      }}
                      className="font-bold"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      DONE
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => cancelEdit(exp.id)}
                    >
                      CANCEL
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-lg font-black text-[var(--foreground)]">{exp.title}</h4>
                      <p className="text-sm font-bold text-[var(--primary)] flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingId(exp.id)}
                        className="p-2 rounded-lg hover:bg-[var(--background)] transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-[var(--muted-foreground)]" />
                      </button>
                      <button
                        onClick={() => deleteExperience(exp.id)}
                        className="p-2 rounded-lg hover:bg-[var(--background)] transition-colors text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {exp.location && (
                    <p className="text-xs font-medium text-[var(--muted-foreground)] flex items-center gap-1 mb-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </p>
                  )}
                  <p className="text-xs font-medium text-[var(--muted-foreground)] flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {exp.startDate || 'Start'} - {exp.current ? 'Present' : exp.endDate || 'End'}
                  </p>
                  {exp.description && (
                    <p className="text-sm text-[var(--foreground)] mt-2 line-clamp-2">
                      {exp.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Add More Button */}
          {!editingId && (
            <Button
              type="button"
              variant="outline"
              onClick={addExperience}
              className="w-full font-bold border-2 border-dashed"
            >
              <Plus className="w-4 h-4 mr-2" />
              ADD EXPERIENCE
            </Button>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t-2 border-[var(--border)]">
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            CANCEL
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="font-black">
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'SAVING...' : 'SAVE CHANGES'}
          </Button>
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
