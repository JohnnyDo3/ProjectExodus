'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/Button'
import {
  X,
  Save,
  Sparkles,
  Heart,
  Plus,
} from 'lucide-react'

interface SkillsEditModalProps {
  isOpen: boolean
  onClose: () => void
  skills: string[]
  interests: string[]
  onSave: (skills: string[], interests: string[]) => Promise<void>
}

export function SkillsEditModal({
  isOpen,
  onClose,
  skills: initialSkills,
  interests: initialInterests,
  onSave,
}: SkillsEditModalProps) {
  const [skills, setSkills] = useState<string[]>(initialSkills)
  const [interests, setInterests] = useState<string[]>(initialInterests)
  const [newSkill, setNewSkill] = useState('')
  const [newInterest, setNewInterest] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    setSkills(initialSkills)
    setInterests(initialInterests)
  }, [initialSkills, initialInterests])

  const addSkill = () => {
    const trimmed = newSkill.trim()
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed])
      setNewSkill('')
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const addInterest = () => {
    const trimmed = newInterest.trim()
    if (trimmed && !interests.includes(trimmed)) {
      setInterests([...interests, trimmed])
      setNewInterest('')
    }
  }

  const removeInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onSave(skills, interests)
      onClose()
    } catch (error) {
      console.error('Error saving skills:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, type: 'skill' | 'interest') => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (type === 'skill') {
        addSkill()
      } else {
        addInterest()
      }
    }
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
              <Sparkles className="w-6 h-6 text-[var(--primary-foreground)]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[var(--foreground)]">SKILLS & INTERESTS</h2>
              <p className="text-sm font-medium text-[var(--muted-foreground)]">
                Showcase your expertise and passions
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
        <div className="p-6 space-y-8">
          {/* Skills Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[var(--primary)]" />
              <h3 className="text-lg font-black text-[var(--foreground)]">EXPERTISE & SKILLS</h3>
            </div>

            {/* Add Skill Input */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'skill')}
                className="flex-1 px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors font-medium"
                placeholder="Add a skill (e.g., Renewable Energy, Project Management)"
              />
              <Button type="button" onClick={addSkill} disabled={!newSkill.trim()}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2 min-h-[40px]">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <span
                    key={skill}
                    className="group px-3 py-1.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full font-bold text-sm flex items-center gap-2"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))
              ) : (
                <p className="text-sm text-[var(--muted-foreground)] italic">
                  No skills added yet. Add your first skill above.
                </p>
              )}
            </div>
          </div>

          {/* Interests Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-[var(--accent)]" />
              <h3 className="text-lg font-black text-[var(--foreground)]">INTERESTS & PASSIONS</h3>
            </div>

            {/* Add Interest Input */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'interest')}
                className="flex-1 px-4 py-3 rounded-lg bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors font-medium"
                placeholder="Add an interest (e.g., Climate Action, Urban Farming)"
              />
              <Button type="button" onClick={addInterest} disabled={!newInterest.trim()}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Interests Tags */}
            <div className="flex flex-wrap gap-2 min-h-[40px]">
              {interests.length > 0 ? (
                interests.map((interest) => (
                  <span
                    key={interest}
                    className="group px-3 py-1.5 bg-[var(--accent)] text-[var(--accent-foreground)] rounded-full font-bold text-sm flex items-center gap-2"
                  >
                    {interest}
                    <button
                      onClick={() => removeInterest(interest)}
                      className="opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))
              ) : (
                <p className="text-sm text-[var(--muted-foreground)] italic">
                  No interests added yet. Add your first interest above.
                </p>
              )}
            </div>
          </div>
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
