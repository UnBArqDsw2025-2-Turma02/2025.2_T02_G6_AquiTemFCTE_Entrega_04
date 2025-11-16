import { Skeleton } from "@/components/ui/skeleton"

export default function MessagesLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Skeleton */}
        <div className="w-full lg:w-96 border-r bg-background flex flex-col">
          <div className="p-4 border-b space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex-1 p-4 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area Skeleton */}
        <div className="flex-1 flex flex-col">
          <div className="border-b p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className={i % 2 === 0 ? "flex justify-end" : "flex justify-start"}>
                <Skeleton className="h-16 w-64 rounded-lg" />
              </div>
            ))}
          </div>
          <div className="border-t p-4">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
