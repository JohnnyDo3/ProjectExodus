import { redirect } from 'next/navigation'

// The Fishbowl is now part of the Network page
export default function FishbowlRedirect() {
  redirect('/network')
}
