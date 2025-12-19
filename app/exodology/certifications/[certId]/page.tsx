'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Download, Printer, Share2, Award,
  Compass, Map, Target, Crown, CheckCircle2
} from 'lucide-react'
import Link from 'next/link'
import { useParams, notFound, useRouter } from 'next/navigation'

// Certificate data
const certificateInfo = {
  'exodology-literacy': {
    name: 'Exodological Literacy',
    fullTitle: 'Certificate of Exodological Literacy',
    description: 'Has demonstrated mastery of foundational Exodology concepts, frameworks, and vocabulary through rigorous study and assessment.',
    icon: Compass,
    color: 'amber',
    gradient: 'from-amber-500 to-orange-600',
    bgGradient: 'from-amber-50 via-orange-50 to-amber-100',
    accentColor: '#f59e0b'
  },
  'exodology-application': {
    name: 'Exodological Application',
    fullTitle: 'Certificate of Exodological Application',
    description: 'Has demonstrated the ability to apply Exodology principles to real-world system transitions through practical exercises and case studies.',
    icon: Map,
    color: 'teal',
    gradient: 'from-teal-500 to-cyan-600',
    bgGradient: 'from-teal-50 via-cyan-50 to-teal-100',
    accentColor: '#14b8a6'
  },
  'exodology-stewardship': {
    name: 'Exodological Stewardship',
    fullTitle: 'Certificate of Exodological Stewardship',
    description: 'Has demonstrated the capability to lead and guide large-scale system transitions with wisdom and strategic foresight.',
    icon: Target,
    color: 'purple',
    gradient: 'from-purple-500 to-indigo-600',
    bgGradient: 'from-purple-50 via-indigo-50 to-purple-100',
    accentColor: '#8b5cf6'
  },
  'exodology-master': {
    name: 'Master Exodologist',
    fullTitle: 'Master Exodologist Certification',
    description: 'Has achieved complete mastery of all three pillars of Exodology: Foundations, Application, and Strategic Stewardship.',
    icon: Crown,
    color: 'yellow',
    gradient: 'from-yellow-400 via-amber-500 to-orange-600',
    bgGradient: 'from-yellow-50 via-amber-50 to-orange-100',
    accentColor: '#eab308'
  }
}

type CertId = keyof typeof certificateInfo

export default function CertificateViewPage() {
  const params = useParams()
  const certId = params.certId as string
  const router = useRouter()
  const { data: session } = useSession()
  const certificateRef = useRef<HTMLDivElement>(null)

  const [certData, setCertData] = useState<{
    certificateNumber: string
    issuedAt: string
    userName: string
  } | null>(null)
  const [loading, setLoading] = useState(true)

  const certInfo = certificateInfo[certId as CertId]

  // Fetch certificate data
  useEffect(() => {
    async function fetchCert() {
      if (!session?.user) {
        setLoading(false)
        return
      }
      try {
        const res = await fetch('/api/exodology/certifications')
        if (res.ok) {
          const data = await res.json()
          const cert = data.certifications.find((c: { certificationId: string }) => c.certificationId === certId)
          if (cert) {
            setCertData({
              certificateNumber: cert.certificateNumber,
              issuedAt: cert.issuedAt,
              userName: session.user.name || 'Learner'
            })
          }
        }
      } catch (error) {
        console.error('Error fetching certificate:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCert()
  }, [session, certId])

  if (!certInfo) {
    notFound()
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = async () => {
    if (!certificateRef.current) return

    try {
      // Use html2canvas if available, otherwise trigger print
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true
      })
      const link = document.createElement('a')
      link.download = `${certInfo.name.replace(/\s+/g, '-')}-Certificate.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch {
      // Fallback to print
      handlePrint()
    }
  }

  const Icon = certInfo.icon

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)]" />
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Sign in to view certificate</h1>
          <Link href="/auth/signin">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!certData) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Certificate not found</h1>
          <p className="text-[var(--muted-foreground)] mb-4">You haven&apos;t earned this certificate yet.</p>
          <Link href="/exodology/certifications">
            <Button>View All Certifications</Button>
          </Link>
        </div>
      </div>
    )
  }

  const issuedDate = new Date(certData.issuedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header (hidden when printing) */}
      <header className="py-6 bg-[var(--card)] border-b border-[var(--border)] print:hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link
              href="/exodology/certifications"
              className="inline-flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Certifications
            </Link>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Certificate */}
      <main className="py-12 print:py-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 print:px-0">
          <div className="max-w-4xl mx-auto">
            {/* Certificate Card */}
            <div
              ref={certificateRef}
              className={`bg-gradient-to-br ${certInfo.bgGradient} p-8 sm:p-12 rounded-none sm:rounded-3xl border-8 border-double shadow-2xl print:shadow-none print:rounded-none`}
              style={{ borderColor: certInfo.accentColor }}
            >
              {/* Decorative Border */}
              <div className="border-2 border-dashed p-6 sm:p-10" style={{ borderColor: certInfo.accentColor }}>
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${certInfo.gradient} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-800 mb-2">
                    Certificate of Achievement
                  </h1>
                  <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-20 bg-gray-400" />
                    <Award className="w-6 h-6" style={{ color: certInfo.accentColor }} />
                    <div className="h-px w-20 bg-gray-400" />
                  </div>
                </div>

                {/* Body */}
                <div className="text-center space-y-6">
                  <p className="text-lg text-gray-600">This certifies that</p>

                  <h2 className="text-4xl sm:text-5xl font-serif font-bold" style={{ color: certInfo.accentColor }}>
                    {certData.userName}
                  </h2>

                  <p className="text-lg text-gray-600">has successfully completed all requirements for</p>

                  <h3 className={`text-2xl sm:text-3xl font-black bg-gradient-to-r ${certInfo.gradient} bg-clip-text text-transparent`}>
                    {certInfo.fullTitle}
                  </h3>

                  <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
                    {certInfo.description}
                  </p>

                  {/* Verification */}
                  <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-8">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Date Issued</p>
                      <p className="font-bold text-gray-800">{issuedDate}</p>
                    </div>
                    <div className="hidden sm:block h-12 w-px bg-gray-300" />
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Certificate Number</p>
                      <p className="font-mono text-sm text-gray-800">{certData.certificateNumber}</p>
                    </div>
                  </div>

                  {/* Seal */}
                  <div className="pt-8 flex justify-center">
                    <div className="relative">
                      <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${certInfo.gradient} flex items-center justify-center shadow-lg`}>
                        <div className="w-20 h-20 rounded-full border-4 border-white/50 flex items-center justify-center">
                          <CheckCircle2 className="w-10 h-10 text-white" />
                        </div>
                      </div>
                      <p className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">
                        Official Seal
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-12 text-center">
                    <p className="text-sm text-gray-500">
                      Project Exodus • Exodology Learning System
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Verify at projectexodus.com/verify/{certData.certificateNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Options (hidden when printing) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center print:hidden"
            >
              <p className="text-[var(--muted-foreground)] mb-4">Share your achievement</p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `${certInfo.name} Certificate`,
                      text: `I just earned my ${certInfo.name} certification from Project Exodus!`,
                      url: window.location.href
                    })
                  }
                }}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
