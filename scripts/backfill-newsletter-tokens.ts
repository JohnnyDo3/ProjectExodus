import { prisma } from '@/lib/db'
import crypto from 'crypto'

async function main() {
  const subscriptions = await prisma.newsletterSubscription.findMany({
    select: {
      id: true,
      status: true,
      unsubscribeToken: true,
      confirmationToken: true,
    },
  })

  let updated = 0

  for (const sub of subscriptions) {
    const data: {
      unsubscribeToken?: string
      confirmationToken?: string | null
    } = {}

    if (!sub.unsubscribeToken) {
      data.unsubscribeToken = crypto.randomUUID()
    }

    if (sub.status === 'PENDING' && !sub.confirmationToken) {
      data.confirmationToken = crypto.randomUUID()
    }

    if (Object.keys(data).length > 0) {
      await prisma.newsletterSubscription.update({
        where: { id: sub.id },
        data,
      })
      updated++
    }
  }

  console.log(`Backfill complete. Updated ${updated} subscriptions.`)
}

main()
  .catch((error) => {
    console.error('Backfill failed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
