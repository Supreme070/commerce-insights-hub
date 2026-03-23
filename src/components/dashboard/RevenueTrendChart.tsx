import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion } from "framer-motion";
import React from "react";

const data = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const base = 500000;
  const wave = Math.sin(i * 0.4) * 250000 + Math.random() * 80000;
  const prevWave = Math.sin(i * 0.4 - 0.5) * 220000 + Math.random() * 60000;
  return {
    day: `Mar ${day}`,
    revenue: Math.round(base + wave),
    previous: Math.round(base * 0.85 + prevWave),
  };
});

const CustomTooltip = React.forwardRef<HTMLDivElement, any>(({ active, payload, label }, _ref) => {
  if (active && payload?.length) {
    const current = payload[0]?.value;
    const prev = payload[1]?.value;
    const change = prev ? (((current - prev) / prev) * 100).toFixed(1) : null;
    return (
      <div className="bg-card rounded-xl p-3.5 shadow-level-3 border border-[hsl(var(--card-border))]">
        <p className="text-[11px] text-text-muted mb-1.5 font-medium">{label}</p>
        <div className="flex items-baseline gap-2">
          <p className="font-google text-sm font-semibold text-foreground">
            ₦{current?.toLocaleString()}
          </p>
          {change && (
            <span className={`text-[11px] font-medium ${Number(change) >= 0 ? "text-google-green" : "text-google-red"}`}>
              {Number(change) >= 0 ? "+" : ""}{change}%
            </span>
          )}
        </div>
        <p className="text-[10px] text-text-muted mt-0.5">
          Previous: ₦{prev?.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
});
CustomTooltip.displayName = "CustomTooltip";

export function RevenueTrendChart() {
  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
  const prevTotal = data.reduce((sum, d) => sum + d.previous, 0);
  const growthPct = (((totalRevenue - prevTotal) / prevTotal) * 100).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="card-premium p-6 col-span-1 lg:col-span-2"
    >
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="font-google text-[15px] font-semibold text-foreground">Revenue Trend</h3>
          <p className="text-xs text-text-muted mt-0.5">Last 30 days vs previous period</p>
        </div>
        <div className="text-right">
          <p className="font-google text-lg font-semibold text-foreground">₦{(totalRevenue / 1e6).toFixed(1)}M</p>
          <p className={`text-xs font-medium ${Number(growthPct) >= 0 ? "text-google-green" : "text-google-red"}`}>
            {Number(growthPct) >= 0 ? "+" : ""}{growthPct}% growth
          </p>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 4 }}>
            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(214, 82%, 51%)" stopOpacity={0.12} />
                <stop offset="100%" stopColor="hsl(214, 82%, 51%)" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 95%)" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: "hsl(210, 5%, 63%)" }}
              axisLine={false}
              tickLine={false}
              interval={4}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "hsl(210, 5%, 63%)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}K`}
              width={55}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="previous"
              stroke="hsl(210, 5%, 80%)"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="none"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(214, 82%, 51%)"
              strokeWidth={2.5}
              fill="url(#blueGradient)"
              dot={false}
              activeDot={{ r: 5, stroke: "hsl(214, 82%, 51%)", strokeWidth: 2, fill: "white" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 mt-3 pt-3 border-t border-[hsl(var(--divider))]">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-0.5 bg-google-blue rounded-full" />
          <span className="text-[11px] text-text-muted">Current period</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-0.5 bg-text-muted rounded-full" style={{ backgroundImage: "repeating-linear-gradient(90deg, hsl(210,5%,80%) 0 3px, transparent 3px 6px)" }} />
          <span className="text-[11px] text-text-muted">Previous period</span>
        </div>
      </div>
    </motion.div>
  );
}
