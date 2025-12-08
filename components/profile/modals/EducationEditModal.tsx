'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/Button'
import {
  X,
  Save,
  GraduationCap,
  Building2,
  Calendar,
  Plus,
  Trash2,
  Edit2,
} from 'lucide-react'

export interface Education {
  id: string
  school: string
  degree: string
  fieldOfStudy: string
  startYear: string
  endYear: string
  current: boolean
}

interface EducationEditModalProps {
  isOpen: boolean
  onClose: () => void
  education: Education[]
  onSave: (education: Education[]) => Promise<void>
}

export function EducationEditModal({
  isOpen,
  onClose,
  education: initialEducation,
  onSave,
}: EducationEditModalProps) {
  const [education, setEducation] = useState<Education[]>(initialEducation)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    setEducation(initialEducation)
  }, [initialEducation])

  // Auto-open add form if no education exists
  useEffect(() => {
    if (isOpen && education.length === 0 && !isAddingNew) {
      addEducation()
    }
  }, [isOpen, education.length])

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      fieldOfStudy: '',
      startYear: '',
      endYear: '',
      current: false,
    }
    setEducation([...education, newEdu])
    setEditingId(newEdu.id)
    setIsAddingNew(true)
  }

  const deleteEducation = (id: string) => {
    setEducation(education.filter((edu) => edu.id !== id))
    if (editingId === id) {
      setEditingId(null)
      setIsAddingNew(false)
    }
  }

  const updateEducation = (id: string, updates: Partial<Education>) => {
    setEducation(
      education.map((edu) =>
        edu.id === id ? { ...edu, ...updates } : edu
      )
    )
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Filter out empty education entries
      const validEducation = education.filter(
        (edu) => edu.school.trim() && edu.degree.trim()
      )
      await onSave(validEducation)
      setEditingId(null)
      setIsAddingNew(false)
      onClose()
    } catch (error) {
      console.error('Error saving education:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const cancelEdit = (id: string) => {
    if (isAddingNew) {
      setEducation(education.filter((edu) => edu.id !== id))
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
              <GraduationCap className="w-6 h-6 text-[var(--primary-foreground)]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[var(--foreground)]">EDUCATION</h2>
              <p className="text-sm font-medium text-[var(--muted-foreground)]">
                Add your educational background
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
          {education.map((edu) => (
            <div
              key={edu.id}
              className="p-4 rounded-xl bg-[var(--muted)] border-2 border-[var(--border)]"
            >
              {editingId === edu.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors font-medium"
                    placeholder="School / University *"
                    autoFocus
                  />
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors font-medium"
                    placeholder="Degree (e.g., Bachelor's, Master's) *"
                  />
                  <input
                    type="text"
                    value={edu.fieldOfStudy}
                    onChange={(e) => updateEducation(edu.id, { fieldOfStudy: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors font-medium"
                    placeholder="Field of Study (optional)"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[var(--muted-foreground)] mb-1">
                        START YEAR
                      </label>
                      <input
                        type="number"
                        min="1950"
                        max="2030"
                        value={edu.startYear}
                        onChange={(e) => updateEducation(edu.id, { startYear: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors font-medium"
                        placeholder="2018"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[var(--muted-foreground)] mb-1">
                        END YEAR
                      </label>
                      <input
                        type="number"
                        min="1950"
                        max="2030"
                        value={edu.endYear}
                        onChange={(e) => updateEducation(edu.id, { endYear: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors font-medium disabled:opacity-50"
                        placeholder="2022"
                        disabled={edu.current}
                      />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={edu.current}
                      onChange={(e) =>
                        updateEducation(edu.id, {
                          current: e.target.checked,
                          endYear: e.target.checked ? '' : edu.endYear,
                        })
                      }
                      className="w-4 h-4 rounded border-2 border-[var(--border)] text-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"
                    />
                    <span className="font-bold text-sm text-[var(--foreground)]">
                      Currently enrolled
                    </span>
                  </label>
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
                      onClick={() => cancelEdit(edu.id)}
                    >
                      CANCEL
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-lg font-black text-[var(--foreground)]">{edu.school}</h4>
                      <p className="text-sm font-bold text-[var(--primary)]">
                        {edu.degree}
                        {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingId(edu.id)}
                        className="p-2 rounded-lg hover:bg-[var(--background)] transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-[var(--muted-foreground)]" />
                      </button>
                      <button
                        onClick={() => deleteEducation(edu.id)}
                        className="p-2 rounded-lg hover:bg-[var(--background)] transition-colors text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs font-medium text-[var(--muted-foreground)] flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {edu.startYear || 'Start'} - {edu.current ? 'Present' : edu.endYear || 'End'}
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* Add More Button */}
          {!editingId && (
            <Button
              type="button"
              variant="outline"
              onClick={addEducation}
              className="w-full font-bold border-2 border-dashed"
            >
              <Plus className="w-4 h-4 mr-2" />
              ADD EDUCATION
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
