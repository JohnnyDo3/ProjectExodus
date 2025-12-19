'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Award, Trophy, Lock, ChevronRight, CheckCircle2,
  Loader2, Compass, Map, Target, Crown, Star, Download
} from 'lucide-react'
import Link from 'next/link'

// ============================================================================
// CONFETTI COMPONENT
// ============================================================================

interface ConfettiPiece {
  x: number
  y: number
  rotation: number
  color: string
  speedX: number
  speedY: number
  size: number
}

function Confetti({ active, duration = 3000 }: { active: boolean; duration?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])
  const animationRef = useRef<number | null>(null)

  const colors = ['#f59e0b', '#10b981', '#8b5cf6', '#ef4444', '#3b82f6', '#ec4899', '#06b6d4']

  const createPieces = useCallback(() => {
    const newPieces: ConfettiPiece[] = []
    for (let i = 0; i < 150; i++) {
      newPieces.push({
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 100,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 4,
        speedY: Math.random() * 3 + 2,
        size: Math.random() * 10 + 5
      })
    }
    setPieces(newPieces)
  }, [])

  useEffect(() => {
    if (!active) {
      setPieces([])
      return
    }

    createPieces()

    const timeout = setTimeout(() => {
      setPieces([])
    }, duration)

    return () => clearTimeout(timeout)
  }, [active, duration, createPieces])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || pieces.length === 0) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let localPieces = [...pieces]

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      localPieces = localPieces.map(piece => ({
        ...piece,
        x: piece.x + piece.speedX,
        y: piece.y + piece.speedY,
        rotation: piece.rotation + 3,
        speedY: piece.speedY + 0.1
      })).filter(piece => piece.y < canvas.height + 20)

      localPieces.forEach(piece => {
        ctx.save()
        ctx.translate(piece.x, piece.y)
        ctx.rotate((piece.rotation * Math.PI) / 180)
        ctx.fillStyle = piece.color
        ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.6)
        ctx.restore()
      })

      if (localPieces.length > 0) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [pieces])

  if (!active && pieces.length === 0) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ width: '100vw', height: '100vh' }}
    />
  )
}

// ============================================================================
// CERTIFICATION DATA
// ============================================================================

const certifications = [
  {
    id: 'exodology-literacy',
    name: 'Exodological Literacy',
    description: 'Demonstrates mastery of foundational Exodology concepts, frameworks, and vocabulary.',
    pathId: 'foundations',
    icon: Compass,
    color: 'amber',
    gradient: 'from-amber-500 to-orange-600',
    badge: '/badges/exodology-literacy.svg',
    requirements: [
      'Complete all 11 Foundations modules',
      'Pass all module assessments with 80%+',
      'Complete final synthesis project'
    ]
  },
  {
    id: 'exodology-application',
    name: 'Exodological Application',
    description: 'Demonstrates ability to apply Exodology principles to real-world system transitions.',
    pathId: 'applied',
    icon: Map,
    color: 'teal',
    gradient: 'from-teal-500 to-cyan-600',
    badge: '/badges/exodology-application.svg',
    requirements: [
      'Complete all 9 Applied modules',
      'Pass all module assessments with 80%+',
      'Submit a complete exit plan'
    ]
  },
  {
    id: 'exodology-stewardship',
    name: 'Exodological Stewardship',
    description: 'Demonstrates capability to lead and guide large-scale system transitions.',
    pathId: 'strategic',
    icon: Target,
    color: 'purple',
    gradient: 'from-purple-500 to-indigo-600',
    badge: '/badges/exodology-stewardship.svg',
    requirements: [
      'Complete all 10 Strategic modules',
      'Pass all module assessments with 80%+',
      'Complete capstone project'
    ]
  },
  {
    id: 'exodology-master',
    name: 'Master Exodologist',
    description: 'The highest credential in Exodology, demonstrating complete mastery of all three pillars.',
    pathId: null,
    icon: Crown,
    color: 'yellow',
    gradient: 'from-yellow-400 via-amber-500 to-orange-600',
    badge: '/badges/exodology-master.svg',
    requirements: [
      'Earn Exodological Literacy certification',
      'Earn Exodological Application certification',
      'Earn Exodological Stewardship certification'
    ]
  }
]

// ============================================================================
// MAIN COMPONENT
// ============================================================================

// Type definitions for progress
type PathProgress = { completed: number; required: number; earned: boolean }
type MasterProgress = { earned: boolean }

export default function CertificationsPage() {
  const { data: session } = useSession()
  const [certData, setCertData] = useState<{
    certifications: Array<{ certificationId: string; issuedAt: string; certificateNumber: string }>
    progress: {
      foundations: PathProgress
      applied: PathProgress
      strategic: PathProgress
      master: MasterProgress
    }
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [claiming, setClaiming] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [celebrationMessage, setCelebrationMessage] = useState<string | null>(null)

  // Fetch certification data
  useEffect(() => {
    async function fetchCerts() {
      if (!session) {
        setLoading(false)
        return
      }
      try {
        const res = await fetch('/api/exodology/certifications')
        if (res.ok) {
          const data = await res.json()
          setCertData(data)
        }
      } catch (error) {
        console.error('Error fetching certifications:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCerts()
  }, [session])

  const handleClaimCert = async (certId: string) => {
    setClaiming(certId)
    try {
      const res = await fetch('/api/exodology/certifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ certificationId: certId })
      })
      if (res.ok) {
        const data = await res.json()
        // Refresh cert data
        const refreshRes = await fetch('/api/exodology/certifications')
        if (refreshRes.ok) {
          setCertData(await refreshRes.json())
        }
        // Trigger celebration
        setShowConfetti(true)
        setCelebrationMessage(data.message)
        setTimeout(() => {
          setShowConfetti(false)
          setCelebrationMessage(null)
        }, 5000)
      } else {
        const error = await res.json()
        alert(error.error)
      }
    } catch (error) {
      console.error('Error claiming certification:', error)
    } finally {
      setClaiming(null)
    }
  }

  const getCertProgress = (certId: string): PathProgress | MasterProgress | null => {
    if (!certData?.progress) return null

    switch (certId) {
      case 'exodology-literacy':
        return certData.progress.foundations
      case 'exodology-application':
        return certData.progress.applied
      case 'exodology-stewardship':
        return certData.progress.strategic
      case 'exodology-master':
        return certData.progress.master
      default:
        return null
    }
  }

  // Type guard for path progress
  const isPathProgress = (p: PathProgress | MasterProgress | null): p is PathProgress => {
    return p !== null && 'completed' in p
  }

  const isEarned = (certId: string) => {
    return certData?.certifications.some(c => c.certificationId === certId) || false
  }

  const getCertDetails = (certId: string) => {
    return certData?.certifications.find(c => c.certificationId === certId)
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Confetti Celebration */}
      <Confetti active={showConfetti} duration={5000} />

      {/* Celebration Message Overlay */}
      <AnimatePresence>
        {celebrationMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-purple-600 text-white px-8 py-6 rounded-2xl shadow-2xl text-center max-w-md mx-4">
              <Trophy className="w-16 h-16 mx-auto mb-4 animate-bounce" />
              <h2 className="text-2xl font-black mb-2">Certification Earned!</h2>
              <p className="text-white/90">{celebrationMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="py-12 bg-gradient-to-br from-amber-500 via-orange-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/exodology"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 font-medium text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Exodology
            </Link>

            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center">
                <Award className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-black mb-2">Certifications</h1>
                <p className="text-lg text-white/80">
                  Earn credentials that demonstrate your Exodology expertise
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Not signed in */}
          {!session && (
            <Card className="border-4 border-[var(--primary)]/30 mb-8">
              <CardContent className="p-8 text-center">
                <Lock className="w-12 h-12 text-[var(--primary)] mx-auto mb-4" />
                <h2 className="text-2xl font-black text-[var(--foreground)] mb-2">
                  Sign In to Track Progress
                </h2>
                <p className="text-[var(--muted-foreground)] mb-6">
                  Create a free account to track your learning progress and earn certifications.
                </p>
                <Link href="/auth/signin">
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-600 font-bold">
                    Sign In to Get Started <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Loading */}
          {loading && session && (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)] mx-auto mb-4" />
              <p className="text-[var(--muted-foreground)]">Loading your certifications...</p>
            </div>
          )}

          {/* Certifications Grid */}
          {!loading && (
            <div className="space-y-6">
              {certifications.map((cert, i) => {
                const earned = isEarned(cert.id)
                const progress = getCertProgress(cert.id)
                const details = getCertDetails(cert.id)
                const Icon = cert.icon

                // For path-based certs
                const pathProgress = isPathProgress(progress) ? progress : null
                const progressPercent = pathProgress
                  ? Math.round((pathProgress.completed / pathProgress.required) * 100)
                  : 0

                // Can claim if progress requirements met but not yet earned
                const canClaim = !earned && pathProgress && pathProgress.completed >= pathProgress.required

                return (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className={`border-4 ${
                      earned
                        ? `border-${cert.color}-500/50 bg-gradient-to-br from-${cert.color}-500/10 to-transparent`
                        : 'border-[var(--border)]'
                    } overflow-hidden`}>
                      {earned && (
                        <div className={`h-1 bg-gradient-to-r ${cert.gradient}`} />
                      )}
                      <CardContent className="p-6">
                        <div className="flex items-start gap-6">
                          {/* Icon/Badge */}
                          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                            earned
                              ? `bg-gradient-to-br ${cert.gradient} shadow-lg`
                              : 'bg-[var(--muted)]'
                          }`}>
                            {earned ? (
                              <Trophy className="w-10 h-10 text-white" />
                            ) : (
                              <Icon className={`w-10 h-10 ${
                                session ? `text-${cert.color}-500` : 'text-[var(--muted-foreground)]'
                              }`} />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-black text-[var(--foreground)]">{cert.name}</h3>
                              {earned && (
                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r ${cert.gradient} text-white`}>
                                  EARNED
                                </span>
                              )}
                            </div>

                            <p className="text-[var(--muted-foreground)] mb-4">{cert.description}</p>

                            {/* Requirements */}
                            <div className="space-y-2 mb-4">
                              <h4 className="text-sm font-bold text-[var(--foreground)]">Requirements:</h4>
                              <ul className="space-y-1">
                                {cert.requirements.map((req, j) => (
                                  <li key={j} className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${
                                      earned ? 'text-green-500' : 'text-[var(--muted-foreground)]'
                                    }`} />
                                    {req}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Progress bar (for non-master certs) */}
                            {session && pathProgress && !earned && (
                              <div className="mb-4">
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-[var(--muted-foreground)]">Progress</span>
                                  <span className="font-bold text-[var(--foreground)]">
                                    {pathProgress.completed} / {pathProgress.required} lessons
                                  </span>
                                </div>
                                <div className="h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                                  <motion.div
                                    className={`h-full bg-gradient-to-r ${cert.gradient}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(progressPercent, 100)}%` }}
                                  />
                                </div>
                              </div>
                            )}

                            {/* Certificate details if earned */}
                            {earned && details && (
                              <div className="p-3 rounded-lg bg-[var(--muted)]/30 mb-4">
                                <p className="text-xs text-[var(--muted-foreground)]">
                                  <strong>Certificate #:</strong> {details.certificateNumber}
                                </p>
                                <p className="text-xs text-[var(--muted-foreground)]">
                                  <strong>Issued:</strong> {new Date(details.issuedAt).toLocaleDateString()}
                                </p>
                              </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-3">
                              {earned ? (
                                <>
                                  <Link href={`/exodology/certifications/${cert.id}`}>
                                    <Button variant="outline" size="sm">
                                      <Download className="w-4 h-4 mr-2" />
                                      View Certificate
                                    </Button>
                                  </Link>
                                  <Button variant="outline" size="sm" onClick={() => {
                                    if (navigator.share) {
                                      navigator.share({
                                        title: `${cert.name} Certificate`,
                                        text: `I just earned my ${cert.name} certification from Project Exodus!`,
                                        url: `${window.location.origin}/exodology/certifications/${cert.id}`
                                      })
                                    }
                                  }}>
                                    <Star className="w-4 h-4 mr-2" />
                                    Share
                                  </Button>
                                </>
                              ) : canClaim ? (
                                <Button
                                  className={`bg-gradient-to-r ${cert.gradient}`}
                                  onClick={() => handleClaimCert(cert.id)}
                                  disabled={claiming === cert.id}
                                >
                                  {claiming === cert.id ? (
                                    <>
                                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                      Claiming...
                                    </>
                                  ) : (
                                    <>
                                      <Trophy className="w-4 h-4 mr-2" />
                                      Claim Certification
                                    </>
                                  )}
                                </Button>
                              ) : cert.pathId ? (
                                <Link href={`/exodology/paths/${cert.pathId}`}>
                                  <Button variant="outline">
                                    Start Learning Path <ChevronRight className="w-4 h-4 ml-2" />
                                  </Button>
                                </Link>
                              ) : (
                                <Button variant="outline" disabled>
                                  Complete All Paths First
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* Info Box */}
          <Card className="mt-8 border-2 border-[var(--border)]">
            <CardContent className="p-6">
              <h3 className="text-lg font-black text-[var(--foreground)] mb-2">About Exodology Certifications</h3>
              <p className="text-[var(--muted-foreground)] text-sm mb-4">
                Exodology certifications are credentials that demonstrate your knowledge and capability in designing ethical exits from systems. Each certification requires completing a structured learning path and passing assessments.
              </p>
              <p className="text-[var(--muted-foreground)] text-sm">
                The <strong>Master Exodologist</strong> credential is the highest achievement, awarded only to those who have demonstrated mastery of all three pillars: Literacy, Application, and Stewardship.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
