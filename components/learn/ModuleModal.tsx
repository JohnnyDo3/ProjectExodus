'use client'

import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, CheckCircle, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { QuizComponent } from './QuizComponent'
import { sanitizeHtml } from '@/lib/utils/sanitize'

interface ModuleTab {
  title: string
  content: string
}

interface QuizQuestion {
  question: string
  type: 'multiple_choice' | 'true_false'
  options: string[]
  correctAnswer: string
}

interface Article {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  coverImage?: string
  moduleType?: 'SMALL' | 'LARGE'
  moduleTabs?: ModuleTab[]
  quizQuestions?: QuizQuestion[]
  estimatedTime?: number
  difficulty?: string
}

interface ModuleModalProps {
  article: Article
  isOpen: boolean
  onClose: () => void
  onModuleComplete?: () => void
}

export function ModuleModal({ article, isOpen, onClose, onModuleComplete }: ModuleModalProps) {
  const [progressId, setProgressId] = useState<string | null>(null)
  const [currentTabIndex, setCurrentTabIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isSavingProgress, setIsSavingProgress] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAttempts, setQuizAttempts] = useState(0)

  const isSmallModule = article.moduleType === 'SMALL'
  const isLargeModule = article.moduleType === 'LARGE'
  const moduleTabs = (article.moduleTabs || []) as ModuleTab[]
  const quizQuestions = (article.quizQuestions || []) as QuizQuestion[]
  const totalTabs = moduleTabs.length

  // Save/start module when opened
  useEffect(() => {
    if (isOpen && !progressId) {
      saveModule()
    }
  }, [isOpen])

  const saveModule = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/learning/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId: article.id }),
      })

      const data = await response.json()

      if (data.success) {
        setProgressId(data.data.id)
        setCurrentTabIndex(data.data.currentTabIndex || 0)
        setQuizAttempts(data.data.quizAttempts || 0)
      }
    } catch (error) {
      console.error('Error saving module:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateProgress = async (tabIndex: number) => {
    if (!progressId) return

    setIsSavingProgress(true)
    try {
      await fetch(`/api/learning/${progressId}/update`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentTabIndex: tabIndex }),
      })
    } catch (error) {
      console.error('Error updating progress:', error)
    } finally {
      setIsSavingProgress(false)
    }
  }

  const handleNext = () => {
    if (isLargeModule) {
      const nextIndex = currentTabIndex + 1

      if (nextIndex < totalTabs) {
        setCurrentTabIndex(nextIndex)
        updateProgress(nextIndex)
      } else {
        // Reached end of tabs, show quiz
        setShowQuiz(true)
      }
    }
  }

  const handlePrevious = () => {
    if (currentTabIndex > 0) {
      const prevIndex = currentTabIndex - 1
      setCurrentTabIndex(prevIndex)
      updateProgress(prevIndex)
    }
  }

  const handleMarkAsRead = async () => {
    if (!progressId) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/learning/${progressId}/mark-read`, {
        method: 'PATCH',
      })

      const data = await response.json()

      if (data.success) {
        if (onModuleComplete) {
          onModuleComplete()
        }
        onClose()
      } else {
        alert(data.error || 'Failed to mark as read')
      }
    } catch (error) {
      console.error('Error marking as read:', error)
      alert('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuizComplete = () => {
    if (onModuleComplete) {
      onModuleComplete()
    }
    // Close modal after a brief delay
    setTimeout(() => {
      onClose()
    }, 1500)
  }

  const handleBackToModule = () => {
    setShowQuiz(false)
    setCurrentTabIndex(0)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] m-4 bg-[var(--card)] rounded-2xl border-4 border-theme-primary shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-[var(--border)]">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-6 h-6 text-theme-primary" />
              <h2 className="text-2xl font-black text-[var(--foreground)]">
                {article.title}
              </h2>
            </div>
            {article.excerpt && (
              <p className="text-sm font-medium text-theme-muted">{article.excerpt}</p>
            )}
            <div className="flex items-center gap-3 mt-2">
              {article.estimatedTime && (
                <span className="text-xs font-bold text-theme-muted">
                  ⏱️ {article.estimatedTime} min
                </span>
              )}
              {article.difficulty && (
                <span className="text-xs font-bold text-theme-primary">
                  📊 {article.difficulty}
                </span>
              )}
              {isLargeModule && (
                <span className="text-xs font-bold text-theme-accent">
                  📚 {totalTabs} Sections + Quiz
                </span>
              )}
              {isSmallModule && (
                <span className="text-xs font-bold text-theme-secondary">
                  📄 Quick Read
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-[var(--muted)] flex items-center justify-center transition-colors flex-shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar (Large Modules Only) */}
        {isLargeModule && !showQuiz && (
          <div className="px-6 pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-theme-muted">
                Section {currentTabIndex + 1} of {totalTabs}
              </span>
              <span className="text-xs font-bold text-theme-primary">
                {Math.round(((currentTabIndex + 1) / totalTabs) * 100)}% Complete
              </span>
            </div>
            <div className="h-2 bg-[var(--muted)] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] transition-all duration-300"
                style={{ width: `${((currentTabIndex + 1) / totalTabs) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm font-bold text-theme-muted">Loading module...</p>
              </div>
            </div>
          ) : showQuiz ? (
            <QuizComponent
              questions={quizQuestions}
              progressId={progressId!}
              onComplete={handleQuizComplete}
              onBackToModule={handleBackToModule}
              attempts={quizAttempts}
            />
          ) : isSmallModule ? (
            // Small Module Content
            <div className="prose prose-lg max-w-none">
              <div
                className="text-[var(--foreground)] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.content) }}
              />
            </div>
          ) : (
            // Large Module - Tab Content
            <div className="space-y-6">
              {moduleTabs[currentTabIndex] && (
                <Card className="border-2 border-theme-primary">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-black text-theme-primary mb-4">
                      {moduleTabs[currentTabIndex].title}
                    </h3>
                    <div
                      className="prose prose-lg max-w-none text-[var(--foreground)] leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHtml(moduleTabs[currentTabIndex].content),
                      }}
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>

        {/* Footer - Navigation */}
        {!isLoading && !showQuiz && (
          <div className="p-6 border-t-2 border-[var(--border)]">
            {isSmallModule ? (
              <Button
                onClick={handleMarkAsRead}
                className="w-full py-4 text-lg font-black"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                MARK AS READ
              </Button>
            ) : (
              <div className="flex items-center gap-4">
                <Button
                  onClick={handlePrevious}
                  disabled={currentTabIndex === 0}
                  variant="outline"
                  className="flex-1 py-3 font-bold"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  PREVIOUS
                </Button>
                <div className="text-center">
                  <p className="text-xs font-bold text-theme-muted">
                    {currentTabIndex + 1}/{totalTabs}
                  </p>
                  {isSavingProgress && (
                    <p className="text-[10px] font-medium text-theme-muted">Saving...</p>
                  )}
                </div>
                <Button
                  onClick={handleNext}
                  className="flex-1 py-3 font-bold"
                >
                  {currentTabIndex === totalTabs - 1 ? (
                    <>
                      START QUIZ
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </>
                  ) : (
                    <>
                      NEXT
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
