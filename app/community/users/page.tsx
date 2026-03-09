import { redirect } from 'next/navigation'

export default function MemberDirectoryPage() {
  redirect('/network?view=directory')
}
