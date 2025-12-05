import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { BaseCamp } from '@/components/profile/BaseCamp'
import { prisma } from '@/lib/db'

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

  return <BaseCamp user={user} />
}
