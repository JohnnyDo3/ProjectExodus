'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Leaf,
  User,
  BookOpen,
  Trophy,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

interface WaiverRequest {
  userId: string
  userName: string
  userImage?: string
  userStockScore: number
  userCoursesCompleted: number
  memberSince: Date
  relevantCourses: string[]
  message?: string
}

interface WaiverAnalysisResult {
  recommendation: 'APPROVE' | 'DENY' | 'REQUEST_MORE_INFO'
  confidence: number
  reasoning: string[]
  suggestionsIfDenied?: string[]
}

interface SageWaiverAnalysisProps {
  projectId: string
  waiverRequest: WaiverRequest
  projectPrerequisites: string[]
  onApprove: (reason: string) => void
  onDeny: (reason: string) => void
  onRequestInfo: () => void
  className?: string
}

export function SageWaiverAnalysis({
  projectId,
  waiverRequest,
  projectPrerequisites,
  onApprove,
  onDeny,
  onRequestInfo,
  className = ''
}: SageWaiverAnalysisProps) {
  const [analysis, setAnalysis] = useState<WaiverAnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(true)
  const [customReason, setCustomReason] = useState('')

  useEffect(() => {
    analyzeWaiver()
  }, [waiverRequest.userId])

  const analyzeWaiver = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/projects/${projectId}/sage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: `Analyze this waiver request for user ${waiverRequest.userName}`
          }],
          mode: 'waiver',
          waiverContext: {
            userId: waiverRequest.userId
          }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to analyze waiver')
      }

      const data = await response.json()

      // Parse the response to extract structured analysis
      // In production, the API would return structured data
      const analysisResult = parseAnalysisResponse(data.message, waiverRequest)
      setAnalysis(analysisResult)

    } catch (err) {
      console.error('Waiver analysis failed:', err)
      setError('Unable to analyze waiver request')

      // Provide a basic fallback analysis
      setAnalysis(generateFallbackAnalysis(waiverRequest, projectPrerequisites))
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = () => {
    const reason = customReason || analysis?.reasoning.join('; ') || 'Approved by admin'
    onApprove(reason)
  }

  const handleDeny = () => {
    const reason = customReason || 'Prerequisites not met'
    onDeny(reason)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/20 rounded-xl overflow-hidden ${className}`}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-amber-500/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold">Sage Analysis</h3>
            <p className="text-xs text-[var(--muted-foreground)]">
              Waiver Request - {waiverRequest.userName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {analysis && !loading && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              analysis.recommendation === 'APPROVE'
                ? 'bg-green-500/10 text-green-500'
                : analysis.recommendation === 'DENY'
                ? 'bg-red-500/10 text-red-500'
                : 'bg-amber-500/10 text-amber-500'
            }`}>
              {analysis.recommendation}
            </span>
          )}
          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {expanded && (
        <div className="p-4 border-t border-amber-500/10 space-y-4">
          {/* User Profile Summary */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-4">
            <div className="flex items-center gap-3 mb-4">
              {waiverRequest.userImage ? (
                <img
                  src={waiverRequest.userImage}
                  alt={waiverRequest.userName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[var(--muted)] flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
              )}
              <div>
                <h4 className="font-medium">{waiverRequest.userName}</h4>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Member since {waiverRequest.memberSince.toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-2 bg-[var(--muted)] rounded-lg">
                <Trophy className="w-4 h-4 mx-auto mb-1 text-amber-500" />
                <p className="text-lg font-bold">{waiverRequest.userStockScore}</p>
                <p className="text-[10px] text-[var(--muted-foreground)]">STOCK</p>
              </div>
              <div className="text-center p-2 bg-[var(--muted)] rounded-lg">
                <BookOpen className="w-4 h-4 mx-auto mb-1 text-blue-500" />
                <p className="text-lg font-bold">{waiverRequest.userCoursesCompleted}</p>
                <p className="text-[10px] text-[var(--muted-foreground)]">Courses</p>
              </div>
              <div className="text-center p-2 bg-[var(--muted)] rounded-lg">
                <Clock className="w-4 h-4 mx-auto mb-1 text-purple-500" />
                <p className="text-lg font-bold">
                  {Math.floor((Date.now() - waiverRequest.memberSince.getTime()) / (30 * 24 * 60 * 60 * 1000))}
                </p>
                <p className="text-[10px] text-[var(--muted-foreground)]">Months</p>
              </div>
            </div>

            {waiverRequest.relevantCourses.length > 0 && (
              <div className="mt-3 pt-3 border-t border-[var(--border)]">
                <p className="text-xs font-medium mb-2">Relevant Courses:</p>
                <div className="flex flex-wrap gap-1">
                  {waiverRequest.relevantCourses.map((course, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-green-500/10 text-green-600 text-xs rounded-full"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {waiverRequest.message && (
              <div className="mt-3 pt-3 border-t border-[var(--border)]">
                <p className="text-xs font-medium mb-1">User&apos;s Message:</p>
                <p className="text-sm text-[var(--muted-foreground)] italic">
                  &quot;{waiverRequest.message}&quot;
                </p>
              </div>
            )}
          </div>

          {/* Sage Analysis */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium flex items-center gap-2">
                <Leaf className="w-4 h-4 text-amber-500" />
                Sage&apos;s Analysis
              </h4>
              <button
                onClick={analyzeWaiver}
                disabled={loading}
                className="p-1.5 hover:bg-[var(--muted)] rounded-lg transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                <span className="ml-2 text-sm">Analyzing request...</span>
              </div>
            ) : error && !analysis ? (
              <div className="text-center py-4 text-sm text-[var(--muted-foreground)]">
                {error}
              </div>
            ) : analysis ? (
              <>
                {/* Recommendation */}
                <div className={`p-3 rounded-lg mb-3 ${
                  analysis.recommendation === 'APPROVE'
                    ? 'bg-green-500/10 border border-green-500/20'
                    : analysis.recommendation === 'DENY'
                    ? 'bg-red-500/10 border border-red-500/20'
                    : 'bg-amber-500/10 border border-amber-500/20'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {analysis.recommendation === 'APPROVE' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : analysis.recommendation === 'DENY' ? (
                        <XCircle className="w-5 h-5 text-red-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                      )}
                      <span className="font-semibold">
                        Recommendation: {analysis.recommendation}
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      {analysis.confidence}% confidence
                    </span>
                  </div>
                </div>

                {/* Reasoning */}
                <div className="space-y-2 mb-3">
                  <p className="text-xs font-medium">Reasoning:</p>
                  <ul className="space-y-1">
                    {analysis.reasoning.map((reason, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-[var(--muted-foreground)]">•</span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suggestions if denied */}
                {analysis.recommendation !== 'APPROVE' && analysis.suggestionsIfDenied && (
                  <div className="pt-3 border-t border-[var(--border)]">
                    <p className="text-xs font-medium mb-2">If Denied, Suggest:</p>
                    <ul className="space-y-1">
                      {analysis.suggestionsIfDenied.map((suggestion, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--muted-foreground)]">
                          <span>→</span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : null}
          </div>

          {/* Custom Reason */}
          <div>
            <label className="text-xs font-medium mb-1 block">
              Custom Reason (optional):
            </label>
            <textarea
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder="Add your own reasoning..."
              className="w-full px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50"
              rows={2}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleApprove}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              Approve
            </button>
            <button
              onClick={onRequestInfo}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
            >
              <AlertCircle className="w-4 h-4" />
              Request Info
            </button>
            <button
              onClick={handleDeny}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              <XCircle className="w-4 h-4" />
              Deny
            </button>
          </div>
        </div>
      )}
    </motion.div>
  )
}

function parseAnalysisResponse(response: string, request: WaiverRequest): WaiverAnalysisResult {
  // Parse the AI response to extract structured data
  // This is a simplified parser - in production, use structured output

  const lowerResponse = response.toLowerCase()

  let recommendation: 'APPROVE' | 'DENY' | 'REQUEST_MORE_INFO' = 'REQUEST_MORE_INFO'
  let confidence = 50

  if (lowerResponse.includes('recommend: approve') || lowerResponse.includes('recommendation: approve')) {
    recommendation = 'APPROVE'
    confidence = 75
  } else if (lowerResponse.includes('recommend: deny') || lowerResponse.includes('recommendation: deny')) {
    recommendation = 'DENY'
    confidence = 70
  }

  // Extract confidence if present
  const confidenceMatch = response.match(/confidence[:\s]+(\d+)/i)
  if (confidenceMatch) {
    confidence = parseInt(confidenceMatch[1], 10)
  }

  // Extract reasoning
  const reasoning: string[] = []
  if (request.userStockScore >= 50) {
    reasoning.push('High STOCK score indicates active platform engagement')
  }
  if (request.relevantCourses.length > 0) {
    reasoning.push(`Has completed ${request.relevantCourses.length} relevant course(s)`)
  }
  if (request.userCoursesCompleted >= 5) {
    reasoning.push('Strong learning engagement across the platform')
  }

  const suggestionsIfDenied = recommendation !== 'APPROVE' ? [
    'Complete the required prerequisite courses',
    'Build up STOCK score through contributions',
    'Engage more with learning modules'
  ] : undefined

  return {
    recommendation,
    confidence,
    reasoning: reasoning.length > 0 ? reasoning : ['Analysis based on available data'],
    suggestionsIfDenied
  }
}

function generateFallbackAnalysis(
  request: WaiverRequest,
  prerequisites: string[]
): WaiverAnalysisResult {
  const hasHighStock = request.userStockScore >= 50
  const hasRelevantCourses = request.relevantCourses.length > 0
  const isLongTermMember = (Date.now() - request.memberSince.getTime()) > 90 * 24 * 60 * 60 * 1000 // 90 days

  const positiveFactors = [
    hasHighStock && 'High STOCK score shows platform engagement',
    hasRelevantCourses && `Completed ${request.relevantCourses.length} relevant course(s)`,
    isLongTermMember && 'Long-term platform member',
    request.userCoursesCompleted >= 5 && 'Strong learning track record'
  ].filter(Boolean) as string[]

  const negativeFactors = [
    !hasHighStock && 'Lower STOCK score',
    !hasRelevantCourses && 'No directly relevant courses completed',
    prerequisites.length > 0 && 'Some prerequisites not met'
  ].filter(Boolean) as string[]

  const shouldApprove = positiveFactors.length >= 2 || (hasHighStock && isLongTermMember)

  return {
    recommendation: shouldApprove ? 'APPROVE' : 'REQUEST_MORE_INFO',
    confidence: shouldApprove ? 70 : 50,
    reasoning: positiveFactors.length > 0
      ? positiveFactors
      : ['Insufficient data for full analysis'],
    suggestionsIfDenied: !shouldApprove ? [
      'Complete relevant prerequisite courses',
      'Increase platform engagement to build STOCK score',
      'Provide additional context about relevant experience'
    ] : undefined
  }
}

export default SageWaiverAnalysis
