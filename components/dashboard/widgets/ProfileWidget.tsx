'use client'

import { useState } from 'react'
import { IdentityDeclarationEditor } from '@/components/profile/IdentityDeclarationEditor'
import { X, GripVertical } from 'lucide-react'

interface ProfileWidgetProps {
  userProfile: any
  user: any
  onRemove?: () => void
}

export function ProfileWidget({ userProfile, user, onRemove }: ProfileWidgetProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="h-full relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Drag handle - visible when remove button is available (customize mode) */}
      {onRemove && (
        <div
          className={`
            absolute top-2 left-2 z-20
            p-1.5 rounded-lg bg-black/50 backdrop-blur-sm
            cursor-grab active:cursor-grabbing
            transition-opacity duration-200
            react-grid-draghandle
            ${isHovered ? 'opacity-70 hover:opacity-100' : 'opacity-0'}
          `}
        >
          <GripVertical className="w-4 h-4 text-white" />
        </div>
      )}

      {/* Remove button - only in customize mode */}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className={`
            absolute top-2 right-2 z-20
            p-1.5 rounded-lg bg-red-500/80 backdrop-blur-sm
            text-white hover:bg-red-600
            transition-all duration-200
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}
          title="Remove widget"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* The IdentityDeclarationEditor has its own card styling */}
      <div className="h-full overflow-hidden">
        <IdentityDeclarationEditor
          initialProfile={{
            name: userProfile?.name || user?.name || '',
            headline: userProfile?.headline || '',
            location: userProfile?.location || '',
            email: userProfile?.email || user?.email || '',
            phone: userProfile?.phone || '',
            bio: userProfile?.bio || '',
            skills: userProfile?.skills || [],
            experience: userProfile?.experience || [],
            education: userProfile?.education || [],
            social: userProfile?.social || {},
            portfolio: userProfile?.portfolio || [],
            achievements: userProfile?.achievements || [],
            resumeUrl: userProfile?.resumeUrl,
            resumeFileName: userProfile?.resumeFileName,
          }}
        />
      </div>
    </div>
  )
}
