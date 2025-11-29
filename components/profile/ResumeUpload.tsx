'use client'

import { useState, useRef } from 'react'

interface ResumeUploadProps {
  currentResumeUrl?: string | null
  onUploadComplete?: (url: string) => void
  onRemoveComplete?: () => void
}

export default function ResumeUpload({
  currentResumeUrl,
  onUploadComplete,
  onRemoveComplete
}: ResumeUploadProps) {
  const [resumeUrl, setResumeUrl] = useState<string | null>(currentResumeUrl || null)
  const [uploading, setUploading] = useState(false)
  const [removing, setRemoving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('resume', file)

      const response = await fetch('/api/resume/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setResumeUrl(data.data.url)
        onUploadComplete?.(data.data.url)
      } else {
        alert(data.error || 'Failed to upload resume')
      }
    } catch (error) {
      console.error('Error uploading resume:', error)
      alert('Failed to upload resume')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemove = async () => {
    if (!confirm('Are you sure you want to remove your uploaded resume?')) {
      return
    }

    setRemoving(true)
    try {
      const response = await fetch('/api/resume/upload', {
        method: 'DELETE'
      })

      const data = await response.json()

      if (data.success) {
        setResumeUrl(null)
        onRemoveComplete?.()
      } else {
        alert(data.error || 'Failed to remove resume')
      }
    } catch (error) {
      console.error('Error removing resume:', error)
      alert('Failed to remove resume')
    } finally {
      setRemoving(false)
    }
  }

  const handleViewResume = () => {
    if (resumeUrl) {
      window.open(resumeUrl, '_blank')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Upload Resume/CV</h3>
          <p className="text-sm text-gray-500">Upload your resume as a PDF (max 5MB)</p>
        </div>
      </div>

      {resumeUrl ? (
        <div className="border-2 border-emerald-200 bg-emerald-50 rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-600 rounded-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Resume uploaded</p>
                <p className="text-sm text-gray-600">Your resume is ready to share</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleViewResume}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-emerald-700 bg-white border border-emerald-300 rounded-md hover:bg-emerald-50 transition-colors"
              >
                View
              </button>
              <button
                onClick={handleRemove}
                disabled={removing}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-red-700 bg-white border border-red-300 rounded-md hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                {removing ? 'Removing...' : 'Remove'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-400 transition-colors">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>

          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">
              Drop your PDF resume here, or
            </p>
            <label className="inline-block">
              <span className="text-emerald-600 hover:text-emerald-700 cursor-pointer font-medium text-sm">
                browse files
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileSelect}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>

          <p className="text-xs text-gray-500">PDF only, max 5MB</p>

          {uploading && (
            <div className="mt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-md">
                <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                Uploading...
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex items-start gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="text-blue-600 mt-0.5">ℹ️</div>
        <div className="text-sm text-blue-800">
          <p className="font-medium mb-1">Privacy Note</p>
          <p>Your uploaded resume will only be visible to your connections and can be removed at any time.</p>
        </div>
      </div>
    </div>
  )
}
