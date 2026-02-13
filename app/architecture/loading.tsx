import { Skeleton, SkeletonText } from '@/components/ui/Skeleton'

export default function ArchitectureLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero skeleton */}
      <div className="border-b bg-gradient-to-r from-amber-900/20 via-background to-orange-900/20">
        <div className="container py-12">
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="w-16 h-16 rounded-2xl" />
            <div>
              <Skeleton className="h-10 w-72 mb-2" />
              <Skeleton className="h-5 w-96 max-w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8">
        {/* Category tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-10 w-28 rounded-lg shrink-0" />
          ))}
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main area */}
          <div className="lg:col-span-2">
            <Skeleton className="h-7 w-48 mb-4" />
            <div className="grid sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-6 rounded-xl bg-muted">
                  <Skeleton className="w-12 h-12 rounded-xl mb-4" />
                  <Skeleton className="h-6 w-32 mb-2" />
                  <SkeletonText lines={2} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
