import { motion } from "framer-motion";

function ShimmerBlock({ className, delay = 0, style }: { className: string; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.3 }}
      style={style}
      className={`skeleton-shimmer rounded-lg ${className}`}
    />
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <ShimmerBlock className="h-7 w-52 rounded-lg" />
          <ShimmerBlock className="h-4 w-72 rounded mt-2" delay={0.05} />
        </div>
        <div className="flex gap-2">
          <ShimmerBlock className="h-8 w-32 rounded-lg" delay={0.1} />
          <ShimmerBlock className="h-8 w-48 rounded-lg" delay={0.12} />
          <ShimmerBlock className="h-8 w-8 rounded-lg" delay={0.14} />
          <ShimmerBlock className="h-8 w-8 rounded-lg" delay={0.16} />
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="card-premium p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <ShimmerBlock className="w-9 h-9 rounded-lg" />
                <ShimmerBlock className="h-3.5 w-20 rounded" delay={0.02} />
              </div>
              <ShimmerBlock className="w-16 h-7 rounded" delay={0.04} />
            </div>
            <ShimmerBlock className="h-8 w-36 rounded mb-2" delay={0.06} />
            <ShimmerBlock className="h-5 w-28 rounded-full mb-3" delay={0.08} />
            <div className="flex gap-3 pt-3 border-t border-[hsl(var(--divider))]">
              <div className="flex-1">
                <ShimmerBlock className="h-2.5 w-10 rounded mb-1" delay={0.1} />
                <ShimmerBlock className="h-3.5 w-16 rounded" delay={0.12} />
              </div>
              <div className="w-px bg-[hsl(var(--divider))]" />
              <div className="flex-1">
                <ShimmerBlock className="h-2.5 w-14 rounded mb-1" delay={0.1} />
                <ShimmerBlock className="h-3.5 w-20 rounded" delay={0.12} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue + Visitors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="card-premium p-6 lg:col-span-2"
        >
          <div className="flex items-start justify-between mb-5">
            <div>
              <ShimmerBlock className="h-4 w-28 rounded" />
              <ShimmerBlock className="h-3 w-44 rounded mt-1.5" delay={0.02} />
            </div>
            <div className="text-right">
              <ShimmerBlock className="h-5 w-20 rounded" delay={0.04} />
              <ShimmerBlock className="h-3 w-16 rounded mt-1" delay={0.06} />
            </div>
          </div>
          <ShimmerBlock className="h-64 w-full rounded-lg" delay={0.1} />
          <div className="flex items-center gap-5 mt-3 pt-3 border-t border-[hsl(var(--divider))]">
            <ShimmerBlock className="h-3 w-28 rounded" delay={0.14} />
            <ShimmerBlock className="h-3 w-28 rounded" delay={0.16} />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
          className="card-premium p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <ShimmerBlock className="h-4 w-32 rounded" />
            <ShimmerBlock className="h-5 w-12 rounded-full" delay={0.02} />
          </div>
          <ShimmerBlock className="h-12 w-24 rounded mb-4" delay={0.04} />
          <div className="grid grid-cols-3 gap-2 mb-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-surface rounded-lg p-2.5">
                <ShimmerBlock className="h-2.5 w-8 rounded mx-auto mb-1" delay={0.06} />
                <ShimmerBlock className="h-4 w-12 rounded mx-auto" delay={0.08} />
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <ShimmerBlock className="h-3 w-24 rounded" delay={0.1} />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <ShimmerBlock className="w-6 h-6 rounded-md" delay={0.12 + i * 0.02} />
                <ShimmerBlock className="h-3 w-10 rounded" delay={0.14 + i * 0.02} />
                <div className="flex-1 h-2 skeleton-shimmer rounded-full" />
                <ShimmerBlock className="h-3 w-8 rounded" delay={0.16 + i * 0.02} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, t) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 + t * 0.1, duration: 0.4 }}
            className="card-premium overflow-hidden"
          >
            <div className="p-6 pb-0 flex items-center justify-between">
              <div>
                <ShimmerBlock className="h-4 w-28 rounded" />
                <ShimmerBlock className="h-3 w-36 rounded mt-1.5" delay={0.02} />
              </div>
              <ShimmerBlock className="w-8 h-8 rounded-lg" delay={0.04} />
            </div>
            <div className="mt-4">
              <div className="px-6 py-2.5 bg-surface border-y border-[hsl(var(--divider))]">
                <div className="flex gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <ShimmerBlock key={i} className="h-2.5 w-14 rounded flex-1" delay={0.06 + i * 0.02} />
                  ))}
                </div>
              </div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-6 py-3">
                  {t === 1 && <ShimmerBlock className="w-9 h-9 rounded-full flex-shrink-0" delay={0.08 + i * 0.02} />}
                  <ShimmerBlock className="h-4 rounded flex-1" delay={0.1 + i * 0.02} />
                  <ShimmerBlock className="h-4 w-20 rounded" delay={0.12 + i * 0.02} />
                  <ShimmerBlock className="h-4 w-12 rounded" delay={0.14 + i * 0.02} />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, t) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 + t * 0.1, duration: 0.4 }}
            className="card-premium p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <ShimmerBlock className="h-4 w-36 rounded" />
                <ShimmerBlock className="h-3 w-28 rounded mt-1.5" delay={0.02} />
              </div>
            </div>
            {t === 0 ? (
              <>
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <ShimmerBlock className="h-3 w-16 rounded" delay={0.04 + i * 0.02} />
                      <ShimmerBlock className={`h-9 rounded-lg`} delay={0.06 + i * 0.02} style={{ width: `${100 - i * 22}%` } as any} />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-[hsl(var(--divider))]">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="bg-surface rounded-lg p-3">
                      <ShimmerBlock className="h-2.5 w-8 rounded mx-auto mb-1" delay={0.08} />
                      <ShimmerBlock className="h-4 w-14 rounded mx-auto" delay={0.1} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-6 mb-5">
                  <ShimmerBlock className="w-[160px] h-[160px] rounded-full flex-shrink-0" delay={0.04} />
                  <div className="flex-1 space-y-2.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <ShimmerBlock className="w-2.5 h-2.5 rounded-full" delay={0.06 + i * 0.02} />
                        <ShimmerBlock className="h-3 rounded flex-1" delay={0.08 + i * 0.02} />
                        <ShimmerBlock className="h-3 w-8 rounded" delay={0.1 + i * 0.02} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[hsl(var(--divider))]">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="bg-surface rounded-lg p-3">
                      <ShimmerBlock className="h-2.5 w-10 rounded mx-auto mb-1" delay={0.12} />
                      <ShimmerBlock className="h-4 w-14 rounded mx-auto" delay={0.14} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
