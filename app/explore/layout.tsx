import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Explore | Project Exodus',
  description: 'Search and discover articles, products, projects, people, and more on Project Exodus.',
}
export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
