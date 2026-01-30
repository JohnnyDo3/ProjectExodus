'use client'

import { useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, SplitSquareHorizontal, Maximize2, Monitor, Smartphone } from 'lucide-react'
import { LiveProjectPreview } from './LiveProjectPreview'
import { ProjectSection } from './VisualSectionBuilder'

interface ProjectWizardWithPreviewProps {
  // Form content
  children: ReactNode

  // Project data for preview
  projectData: {
    name: string
    tagline?: string
    description: string
    mission?: string
    goal?: string
    category?: string
    tags: string[]
    visibility: string
    theme: string
    coverImage?: string | null
    status?: string
    sections?: ProjectSection[]
    enableDiscussions?: boolean
    enableResearch?: boolean
    enableLearning?: boolean
  }

  // Theme data
  themeColors?: {
    primary: string
    accent: string
    gradient: string
  }

  // Layout options
  defaultLayout?: 'form-only' | 'split' | 'preview-only'
  allowLayoutChange?: boolean
}

type LayoutMode = 'form-only' | 'split' | 'preview-only'
type ViewMode = 'card' | 'page' | 'mobile'

export function ProjectWizardWithPreview({
  children,
  projectData,
  themeColors,
  defaultLayout = 'form-only',
  allowLayoutChange = true
}: ProjectWizardWithPreviewProps) {
  const [layout, setLayout] = useState<LayoutMode>(defaultLayout)
  const [viewMode, setViewMode] = useState<ViewMode>('page')
  const [previewFullscreen, setPreviewFullscreen] = useState(false)

  const togglePreview = () => {
    if (layout === 'form-only') {
      setLayout('split')
    } else if (layout === 'split') {
      setLayout('preview-only')
    } else {
      setLayout('form-only')
    }
  }

  return (
    <div className="relative">
      {/* Control Bar */}
      {allowLayoutChange && (
        <div className="sticky top-0 z-20 bg-[var(--background)]/95 backdrop-blur-sm border-b border-[var(--border)] mb-4">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[var(--foreground)]">
                  Project Wizard
                </h3>
                <div className="h-4 w-px bg-[var(--border)]"/>
                <span className="text-xs text-theme-muted">
                  {layout === 'form-only' ? 'Form View' : layout === 'split' ? 'Split View' : 'Preview View'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* View Mode (when preview is visible) */}
                {layout !== 'form-only' && (
                  <div className="flex items-center gap-1 bg-[var(--muted)] p-1 rounded-lg">
                    <button
                      onClick={() => setViewMode('card')}
                      className={`p-1.5 rounded transition-colors ${
                        viewMode === 'card'
                          ? 'bg-[var(--background)] text-theme-primary shadow-sm'
                          : 'hover:bg-[var(--background)]/50'
                      }`}
                      title="Card view"
                    >
                      <Eye className="w-3.5 h-3.5"/>
                    </button>
                    <button
                      onClick={() => setViewMode('page')}
                      className={`p-1.5 rounded transition-colors ${
                        viewMode === 'page'
                          ? 'bg-[var(--background)] text-theme-primary shadow-sm'
                          : 'hover:bg-[var(--background)]/50'
                      }`}
                      title="Page view"
                    >
                      <Monitor className="w-3.5 h-3.5"/>
                    </button>
                    <button
                      onClick={() => setViewMode('mobile')}
                      className={`p-1.5 rounded transition-colors ${
                        viewMode === 'mobile'
                          ? 'bg-[var(--background)] text-theme-primary shadow-sm'
                          : 'hover:bg-[var(--background)]/50'
                      }`}
                      title="Mobile view"
                    >
                      <Smartphone className="w-3.5 h-3.5"/>
                    </button>
                  </div>
                )}

                {/* Layout Toggles */}
                <div className="flex items-center gap-1 bg-[var(--muted)] p-1 rounded-lg">
                  <button
                    onClick={() => setLayout('form-only')}
                    className={`p-1.5 rounded transition-colors ${
                      layout === 'form-only'
                        ? 'bg-[var(--background)] text-theme-primary shadow-sm'
                        : 'hover:bg-[var(--background)]/50'
                    }`}
                    title="Form only"
                  >
                    <EyeOff className="w-3.5 h-3.5"/>
                  </button>
                  <button
                    onClick={() => setLayout('split')}
                    className={`p-1.5 rounded transition-colors ${
                      layout === 'split'
                        ? 'bg-[var(--background)] text-theme-primary shadow-sm'
                        : 'hover:bg-[var(--background)]/50'
                    }`}
                    title="Split view"
                  >
                    <SplitSquareHorizontal className="w-3.5 h-3.5"/>
                  </button>
                  <button
                    onClick={() => setLayout('preview-only')}
                    className={`p-1.5 rounded transition-colors ${
                      layout === 'preview-only'
                        ? 'bg-[var(--background)] text-theme-primary shadow-sm'
                        : 'hover:bg-[var(--background)]/50'
                    }`}
                    title="Preview only"
                  >
                    <Eye className="w-3.5 h-3.5"/>
                  </button>
                </div>

                {/* Quick Toggle Button */}
                <button
                  onClick={togglePreview}
                  className="px-3 py-1.5 bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 rounded-lg transition-colors flex items-center gap-2"
                >
                  {layout === 'form-only' ? (
                    <>
                      <Eye className="w-3.5 h-3.5 text-theme-primary"/>
                      <span className="text-xs font-bold text-theme-primary">Show Preview</span>
                    </>
                  ) : layout === 'split' ? (
                    <>
                      <Maximize2 className="w-3.5 h-3.5 text-theme-primary"/>
                      <span className="text-xs font-bold text-theme-primary">Preview Only</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-theme-primary"/>
                      <span className="text-xs font-bold text-theme-primary">Hide Preview</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {layout === 'form-only' && (
          <motion.div
            key="form-only"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}

        {layout === 'split' && (
          <motion.div
            key="split"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-6"
          >
            {/* Form Side */}
            <div className="space-y-4">
              {children}
            </div>

            {/* Preview Side */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <LiveProjectPreview
                {...projectData}
                themeColors={themeColors}
                viewMode={viewMode}
                showControls={false}
              />
            </div>
          </motion.div>
        )}

        {layout === 'preview-only' && (
          <motion.div
            key="preview-only"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <LiveProjectPreview
              {...projectData}
              themeColors={themeColors}
              viewMode={viewMode}
              showControls={true}
              onClose={() => setLayout('split')}
              isFullscreen={previewFullscreen}
              onToggleFullscreen={() => setPreviewFullscreen(!previewFullscreen)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Preview Toggle (Mobile) */}
      {allowLayoutChange && layout === 'form-only' && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-6 right-6 z-30 w-14 h-14 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] rounded-full shadow-lg flex items-center justify-center lg:hidden"
          onClick={togglePreview}
        >
          <Eye className="w-6 h-6 text-white"/>
        </motion.button>
      )}
    </div>
  )
}
