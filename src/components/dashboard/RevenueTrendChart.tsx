import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const data = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const base = 500000;
  const wave = Math.sin(i * 0.4) * 250000 + Math.random() * 100000;
  return {
    day: `Mar ${day}`,
    revenue: Math.round(base + wave),
  };
});

import React from "react";

const CustomTooltip = React.forwardRef<HTMLDivElement, any>(({ active, payload, label }, ref) => {
  if (active && payload?.length) {
    return (
      <div className="bg-card rounded-lg p-3 shadow-level-3 border border-border">
        <p className="text-xs text-text-secondary mb-1">{label}</p>
        <p className="font-google text-sm font-semibold text-foreground">
          ₦{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export function RevenueTrendChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="bg-card rounded-lg p-6 shadow-level-1 card-hover col-span-1 lg:col-span-2"
    >
      <h3 className="font-google text-base font-semibold text-foreground mb-4">Revenue Trend</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 4 }}>
            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(214, 82%, 51%)" stopOpacity={0.1} />
                <stop offset="100%" stopColor="hsl(214, 82%, 51%)" stopOpacity={0.01} />
              </linearGradient>
            </defs>
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
              dataKey="revenue"
              stroke="hsl(214, 82%, 51%)"
              strokeWidth={2}
              fill="url(#blueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
