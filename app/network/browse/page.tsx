import { redirect } from 'next/navigation'

// Member directory has moved to the Community Fish Tank page
export default function BrowseProfessionalsPage() {
  redirect('/fishbowl?view=directory')
}
