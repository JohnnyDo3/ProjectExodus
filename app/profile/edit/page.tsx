import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { ProfileEditForm } from '@/components/profile/ProfileEditForm'
import prisma from '@/lib/db/prisma'

async function getUserProfile(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })
    return user
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
}

export default async function ProfileEditPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/auth/signin?callbackUrl=/profile/edit')
  }

  const user = await getUserProfile(session.user.id)

  if (!user) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-[var(--muted)] py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <BackButton label="Back to Profile" fallbackUrl="/profile" />
          </div>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl font-black text-[var(--foreground)] mb-4">
              EDIT PROFILE
            </h1>
            <p className="text-xl font-semibold text-theme-muted">
              Update your professional information and showcase your expertise
            </p>
          </div>

          <ProfileEditForm user={user} />
        </div>
      </div>
    </div>
  )
}
