import { redirect } from 'next/navigation'

// Personal fishbowl is now the main fishbowl page
export default function PersonalFishbowlRedirect() {
  redirect('/fishbowl')
}
