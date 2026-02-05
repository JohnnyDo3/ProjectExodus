import { prisma } from '@/lib/db'
import { existsSync } from 'fs'
import { unlink } from 'fs/promises'
import { join } from 'path'

export async function purgeScheduledDeletions() {
  const now = new Date()

  const users = await prisma.user.findMany({
    where: {
      deletionStatus: 'REQUESTED',
      deletionScheduledFor: { lte: now },
    },
    select: {
      id: true,
      resume: true,
    },
  })

  let deleted = 0

  for (const user of users) {
    if (user.resume && user.resume.startsWith('/uploads/resumes/')) {
      const resumePath = join(process.cwd(), 'public', user.resume)
      if (existsSync(resumePath)) {
        await unlink(resumePath)
      }
    }

    await prisma.user.delete({
      where: { id: user.id },
    })
    deleted++
  }

  return { deleted }
}
