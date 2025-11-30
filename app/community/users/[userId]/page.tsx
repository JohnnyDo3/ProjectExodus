import { redirect } from 'next/navigation'

// Redirect to the new unified profile page
export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params

  // Redirect to new profile page
  redirect(`/profile/${userId}`)
}
