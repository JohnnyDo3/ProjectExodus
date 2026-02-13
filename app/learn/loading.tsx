import { Skeleton, SkeletonText } from '@/components/ui/Skeleton'

export default function LearnLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero skeleton */}
      <div className="border-b">
        <div className="container py-12">
          <Skeleton className="h-10 w-80 mb-4" />
          <Skeleton className="h-6 w-[600px] max-w-full" />
        </div>
      </div>

      {/* Content */}
      <div className="container py-8">
        {/* Search and filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Featured section */}
        <Skeleton className="h-7 w-48 mb-4" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl bg-muted overflow-hidden">
              <Skeleton className="h-48 w-full rounded-none" />
              <div className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <SkeletonText lines={2} />
                <div className="flex gap-2 mt-4">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* All modules grid */}
        <Skeleton className="h-7 w-36 mb-4" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="p-4 rounded-xl bg-muted">
              <Skeleton className="h-24 w-full mb-4 rounded-lg" />
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
