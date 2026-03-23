import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const segments = [
  { name: "VIP", value: 12, count: 102, color: "hsl(137, 52%, 43%)", dotClass: "bg-google-green" },
  { name: "High Value", value: 23, count: 195, color: "hsl(214, 82%, 51%)", dotClass: "bg-google-blue" },
  { name: "Medium", value: 35, count: 296, color: "hsl(43, 97%, 50%)", dotClass: "bg-google-yellow" },
  { name: "Low Value", value: 18, count: 152, color: "hsl(210, 5%, 63%)", dotClass: "bg-text-muted" },
  { name: "At Risk", value: 12, count: 102, color: "hsl(4, 81%, 56%)", dotClass: "bg-google-red" },
];

const totalCustomers = segments.reduce((sum, s) => sum + s.count, 0);

const stats = [
  { label: "Avg CLV", value: "₦89,400", highlight: false },
  { label: "Retention", value: "74.2%", highlight: false },
  { label: "At-Risk HV", value: "18", highlight: true },
];

export function CustomerSegments() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.85, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="card-premium p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-google text-[15px] font-semibold text-foreground">Customer Segments</h3>
          <p className="text-xs text-text-muted mt-0.5">RFM-based segmentation</p>
        </div>
      </div>

      {/* Donut + Legend side by side */}
      <div className="flex items-center gap-6 mb-5">
        <div className="relative w-[160px] h-[160px] flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={segments}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                dataKey="value"
                strokeWidth={2}
                stroke="white"
              >
                {segments.map((s) => (
                  <Cell key={s.name} fill={s.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-google text-2xl font-semibold text-foreground leading-none">{totalCustomers}</span>
            <span className="text-[10px] text-text-muted mt-0.5">total</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2.5">
          {segments.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.05, duration: 0.3 }}
              className="flex items-center gap-2 group cursor-default"
            >
              <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.dotClass}`} />
              <span className="text-xs text-text-secondary flex-1 group-hover:text-foreground transition-colors">{s.name}</span>
              <span className="text-xs font-google font-medium text-foreground tabular-nums">{s.count}</span>
              <span className="text-[11px] text-text-muted tabular-nums w-7 text-right">{s.value}%</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[hsl(var(--divider))]">
        {stats.map((s) => (
          <div key={s.label} className="bg-surface rounded-lg p-3 text-center">
            <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">{s.label}</p>
            <div className="flex items-center justify-center gap-1">
              {s.highlight && <AlertTriangle className="w-3 h-3 text-google-red" />}
              <p className={`text-sm font-google font-semibold ${s.highlight ? "text-google-red" : "text-foreground"}`}>
                {s.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
