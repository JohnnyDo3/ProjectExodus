import { prisma } from '@/lib/db'
import { purgeScheduledDeletions } from '@/lib/privacy/purge'

async function main() {
  const result = await purgeScheduledDeletions()
  console.log(`Purged ${result.deleted} users scheduled for deletion.`)
}

main()
  .catch((error) => {
    console.error('Purge failed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
