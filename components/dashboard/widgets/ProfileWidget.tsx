'use client'

import { IdentityDeclarationEditor } from '@/components/profile/IdentityDeclarationEditor'
import { WidgetWrapper } from '../WidgetWrapper'
import { User } from 'lucide-react'

interface ProfileWidgetProps {
  userProfile: any
  user: any
  onRemove?: () => void
}

export function ProfileWidget({ userProfile, user, onRemove }: ProfileWidgetProps) {
  return (
    <WidgetWrapper
      id="profile"
      title="Identity Declaration"
      icon={User}
      theme="primary"
      onRemove={onRemove}
      showRemove={!!onRemove}
      isDraggable={true}
    >
      <div className="h-full overflow-y-auto">
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
    </WidgetWrapper>
  )
}
