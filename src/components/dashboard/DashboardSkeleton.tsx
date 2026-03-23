export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-6 w-48 skeleton-shimmer rounded" />
          <div className="h-4 w-64 skeleton-shimmer rounded mt-2" />
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-28 skeleton-shimmer rounded-lg" />
          <div className="h-8 w-48 skeleton-shimmer rounded-md" />
        </div>
      </div>

      {/* KPI Cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-card rounded-lg p-6 shadow-level-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg skeleton-shimmer" />
              <div className="h-4 w-24 skeleton-shimmer rounded" />
            </div>
            <div className="h-8 w-32 skeleton-shimmer rounded mb-2" />
            <div className="h-4 w-40 skeleton-shimmer rounded mb-3" />
            <div className="flex gap-4">
              <div className="h-3 w-20 skeleton-shimmer rounded" />
              <div className="h-3 w-28 skeleton-shimmer rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Revenue + Visitors skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg p-6 shadow-level-1 lg:col-span-2">
          <div className="h-5 w-32 skeleton-shimmer rounded mb-4" />
          <div className="h-64 skeleton-shimmer rounded" />
        </div>
        <div className="bg-card rounded-lg p-6 shadow-level-1">
          <div className="h-5 w-36 skeleton-shimmer rounded mb-4" />
          <div className="h-10 w-20 skeleton-shimmer rounded mb-4" />
          <div className="flex gap-4 mb-4">
            <div className="h-3 w-16 skeleton-shimmer rounded" />
            <div className="h-3 w-20 skeleton-shimmer rounded" />
            <div className="h-3 w-24 skeleton-shimmer rounded" />
          </div>
          <div className="h-12 w-24 skeleton-shimmer rounded mb-5" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-3 w-12 skeleton-shimmer rounded" />
                <div className="flex-1 h-1.5 skeleton-shimmer rounded-full" />
                <div className="h-3 w-8 skeleton-shimmer rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, t) => (
          <div key={t} className="bg-card rounded-lg shadow-level-1 overflow-hidden">
            <div className="p-6 pb-4">
              <div className="h-5 w-28 skeleton-shimmer rounded" />
            </div>
            <div className="px-6 py-3 bg-surface flex gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-3 w-16 skeleton-shimmer rounded flex-1" />
              ))}
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="px-6 py-3 flex items-center gap-4">
                {t === 1 && <div className="w-8 h-8 rounded-full skeleton-shimmer flex-shrink-0" />}
                <div className="h-4 skeleton-shimmer rounded flex-1" />
                <div className="h-4 w-20 skeleton-shimmer rounded" />
                <div className="h-4 w-12 skeleton-shimmer rounded" />
                <div className="h-4 w-14 skeleton-shimmer rounded" />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom row skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg p-6 shadow-level-1">
          <div className="h-5 w-36 skeleton-shimmer rounded mb-5" />
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-3 w-16 skeleton-shimmer rounded" />
                <div className="h-7 skeleton-shimmer rounded" style={{ width: `${100 - i * 25}%` }} />
              </div>
            ))}
          </div>
          <div className="flex gap-6 mt-6 pt-4 border-t border-border">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <div className="h-3 w-10 skeleton-shimmer rounded mb-1" />
                <div className="h-4 w-16 skeleton-shimmer rounded" />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card rounded-lg p-6 shadow-level-1">
          <div className="h-5 w-40 skeleton-shimmer rounded mb-4" />
          <div className="flex justify-center mb-4">
            <div className="w-[180px] h-[180px] rounded-full skeleton-shimmer" />
          </div>
          <div className="space-y-2 mb-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full skeleton-shimmer" />
                <div className="h-3 skeleton-shimmer rounded flex-1" />
                <div className="h-3 w-8 skeleton-shimmer rounded" />
              </div>
            ))}
          </div>
          <div className="flex gap-6 pt-4 border-t border-border">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <div className="h-3 w-14 skeleton-shimmer rounded mb-1" />
                <div className="h-4 w-16 skeleton-shimmer rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
