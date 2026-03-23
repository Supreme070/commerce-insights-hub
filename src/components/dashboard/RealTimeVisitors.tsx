import { LineChart, Line, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const sparkData = Array.from({ length: 24 }, (_, i) => ({
  hour: i,
  visitors: Math.round(80 + Math.random() * 120 + Math.sin(i * 0.5) * 40),
}));

const sources = [
  { name: "Direct", pct: 34, color: "bg-google-blue" },
  { name: "Search", pct: 28, color: "bg-google-green" },
  { name: "Social", pct: 22, color: "bg-google-yellow" },
  { name: "Email", pct: 16, color: "bg-text-muted" },
];

export function RealTimeVisitors() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="bg-card rounded-lg p-6 shadow-level-1 card-hover"
    >
      <h3 className="font-google text-base font-semibold text-foreground mb-4">Real-Time Visitors</h3>

      <div className="flex items-center gap-3 mb-4">
        <span className="font-google text-4xl font-semibold text-foreground">142</span>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-google-green pulse-dot" />
          <span className="text-xs font-medium text-google-green">live</span>
        </div>
      </div>

      <div className="flex gap-4 text-xs text-text-muted mb-4">
        <span>Today: 1,847</span>
        <span>This Week: 12,340</span>
        <span>This Month: 48,200</span>
      </div>

      <div className="h-12 mb-5">
        <ResponsiveContainer width={100} height="100%">
          <LineChart data={sparkData}>
            <Line type="monotone" dataKey="visitors" stroke="hsl(214,82%,51%)" strokeWidth={1.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium text-text-secondary mb-2">Traffic Sources</p>
        {sources.map((s) => (
          <div key={s.name} className="flex items-center gap-3">
            <span className="text-xs text-text-secondary w-12">{s.name}</span>
            <div className="flex-1 h-1.5 bg-divider rounded-full overflow-hidden">
              <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.pct}%` }} />
            </div>
            <span className="text-xs text-text-secondary w-8 text-right">{s.pct}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
