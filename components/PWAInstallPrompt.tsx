'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X, Smartphone, Share, Plus, Check, Sparkles } from 'lucide-react'
import { usePWAInstall } from '@/hooks/usePWAInstall'

export function PWAInstallPrompt() {
  const { isInstallable, isInstalled, isIOSDevice, install, dismiss, dismissed } = usePWAInstall()
  const [showIOSGuide, setShowIOSGuide] = useState(false)
  const [installing, setInstalling] = useState(false)
  const [installed, setInstalled] = useState(false)

  // Don't show if already installed, dismissed, or not installable
  if (isInstalled || dismissed || !isInstallable) {
    return null
  }

  const handleInstall = async () => {
    if (isIOSDevice) {
      setShowIOSGuide(true)
      return
    }

    setInstalling(true)
    const success = await install()
    setInstalling(false)

    if (success) {
      setInstalled(true)
      setTimeout(() => dismiss(), 2000)
    }
  }

  return (
    <>
      {/* Install Banner */}
      <AnimatePresence>
        {!showIOSGuide && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-50"
          >
            <div className="bg-[var(--card)] border-2 border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden">
              {/* Gradient header */}
              <div className="h-2 bg-gradient-to-r from-purple-500 via-teal-500 to-amber-500" />

              <div className="p-4">
                <div className="flex items-start gap-4">
                  {/* App icon */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-teal-500 flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🌱</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[var(--foreground)] flex items-center gap-2">
                      Install Project Exodus
                      <Sparkles className="w-4 h-4 text-amber-500" aria-hidden="true" />
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)] mt-1">
                      Get the full app experience with offline learning, faster loading, and more!
                    </p>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={dismiss}
                    className="flex-shrink-0 p-1.5 rounded-lg hover:bg-[var(--muted)] transition-colors"
                    aria-label="Dismiss install prompt"
                  >
                    <X className="w-5 h-5 text-[var(--muted-foreground)]" aria-hidden="true" />
                  </button>
                </div>

                {/* Features */}
                <div className="flex gap-4 mt-4 text-xs text-[var(--muted-foreground)]">
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-green-500" aria-hidden="true" />
                    Offline mode
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-green-500" aria-hidden="true" />
                    Faster loading
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-green-500" aria-hidden="true" />
                    No app store
                  </span>
                </div>

                {/* Install button */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleInstall}
                    disabled={installing || installed}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-teal-500 text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    {installed ? (
                      <>
                        <Check className="w-5 h-5" aria-hidden="true" />
                        Installed!
                      </>
                    ) : installing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Installing...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" aria-hidden="true" />
                        Install App
                      </>
                    )}
                  </button>
                  <button
                    onClick={dismiss}
                    className="px-4 py-3 rounded-xl bg-[var(--muted)] text-[var(--muted-foreground)] font-medium hover:bg-[var(--muted)]/80 transition-colors"
                  >
                    Later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* iOS Installation Guide Modal */}
      <AnimatePresence>
        {showIOSGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setShowIOSGuide(false)
              dismiss()
            }}
          >
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-[var(--card)] rounded-t-3xl sm:rounded-2xl w-full max-w-md border-2 border-[var(--border)] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-[var(--border)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-teal-500 flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg text-[var(--foreground)]">Add to Home Screen</h2>
                      <p className="text-sm text-[var(--muted-foreground)]">Install in 3 easy steps</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowIOSGuide(false)
                      dismiss()
                    }}
                    className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
                    aria-label="Close guide"
                  >
                    <X className="w-5 h-5 text-[var(--muted-foreground)]" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Steps */}
              <div className="p-6 space-y-6">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-[var(--foreground)] flex items-center gap-2">
                      Tap the Share button
                      <Share className="w-5 h-5 text-blue-500" aria-hidden="true" />
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)] mt-1">
                      Find it at the bottom of Safari (or top on iPad)
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-[var(--foreground)] flex items-center gap-2">
                      Scroll and tap "Add to Home Screen"
                      <Plus className="w-5 h-5 text-blue-500" aria-hidden="true" />
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)] mt-1">
                      It may be in the second row of options
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-[var(--foreground)] flex items-center gap-2">
                      Tap "Add" to confirm
                      <Check className="w-5 h-5 text-green-500" aria-hidden="true" />
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)] mt-1">
                      The app icon will appear on your home screen
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-[var(--border)] bg-[var(--muted)]/30">
                <button
                  onClick={() => {
                    setShowIOSGuide(false)
                    dismiss()
                  }}
                  className="w-full py-3 rounded-xl bg-[var(--primary)] text-white font-bold hover:opacity-90 transition-opacity"
                >
                  Got it!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Compact install button for header/footer
export function PWAInstallButton({ className = '' }: { className?: string }) {
  const { isInstallable, isInstalled, isIOSDevice, install, dismissed } = usePWAInstall()
  const [showGuide, setShowGuide] = useState(false)

  if (isInstalled || !isInstallable || dismissed) {
    return null
  }

  const handleClick = async () => {
    if (isIOSDevice) {
      setShowGuide(true)
    } else {
      await install()
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-teal-500 text-white text-sm font-medium hover:opacity-90 transition-opacity ${className}`}
        aria-label="Install app"
      >
        <Download className="w-4 h-4" aria-hidden="true" />
        <span className="hidden sm:inline">Install App</span>
      </button>

      {/* iOS guide would need to be shown in a portal/modal */}
      {showGuide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          onClick={() => setShowGuide(false)}
        >
          <div
            className="bg-[var(--card)] rounded-2xl p-6 max-w-sm w-full border border-[var(--border)]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold mb-4">Add to Home Screen</h3>
            <ol className="space-y-2 text-sm text-[var(--muted-foreground)]">
              <li>1. Tap the Share button in Safari</li>
              <li>2. Scroll and tap "Add to Home Screen"</li>
              <li>3. Tap "Add" to confirm</li>
            </ol>
            <button
              onClick={() => setShowGuide(false)}
              className="w-full mt-4 py-2 rounded-lg bg-[var(--primary)] text-white font-bold"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  )
}
