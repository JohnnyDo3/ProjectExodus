/**
 * Make User Admin Script
 *
 * Run with: npx tsx scripts/make-admin.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const email = '21srogowski@gmail.com'

  console.log(`🔍 Looking for user: ${email}`)

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    console.error(`❌ User not found with email: ${email}`)
    console.log('\n💡 Make sure the user has signed up first!')
    return
  }

  console.log(`✅ Found user: ${user.name || 'No name'} (${user.email})`)
  console.log(`   Current role: ${user.role}`)

  if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
    console.log('✨ User is already an admin!')
    return
  }

  // Update to ADMIN role
  const updated = await prisma.user.update({
    where: { email },
    data: { role: 'ADMIN' },
  })

  console.log('\n🎉 SUCCESS! User is now an ADMIN')
  console.log(`   New role: ${updated.role}`)
  console.log('\n📝 Admin privileges granted:')
  console.log('   ✅ Can create/edit/delete articles')
  console.log('   ✅ Can create learning modules')
  console.log('   ✅ Can manage users')
  console.log('   ✅ Can access admin features')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
