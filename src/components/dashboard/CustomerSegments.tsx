import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const segments = [
  { name: "VIP", value: 12, count: 102, color: "hsl(137, 52%, 43%)" },
  { name: "High Value", value: 23, count: 195, color: "hsl(214, 82%, 51%)" },
  { name: "Medium", value: 35, count: 296, color: "hsl(43, 97%, 50%)" },
  { name: "Low Value", value: 18, count: 152, color: "hsl(210, 5%, 63%)" },
  { name: "At Risk", value: 12, count: 102, color: "hsl(4, 81%, 56%)" },
];

export function CustomerSegments() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.4 }}
      className="bg-card rounded-lg p-6 shadow-level-1 card-hover"
    >
      <h3 className="font-google text-base font-semibold text-foreground mb-4">Customer Segments</h3>

      <div className="flex justify-center mb-4">
        <div className="relative w-[180px] h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={segments}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                dataKey="value"
                strokeWidth={0}
              >
                {segments.map((s) => (
                  <Cell key={s.name} fill={s.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-google text-2xl font-semibold text-foreground">847</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-5">
        {segments.map((s) => (
          <div key={s.name} className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
            <span className="text-text-secondary flex-1">{s.name}</span>
            <span className="text-foreground font-medium">{s.count}</span>
            <span className="text-text-muted w-8 text-right">{s.value}%</span>
          </div>
        ))}
      </div>

      <div className="flex gap-6 pt-4 border-t border-border">
        <div>
          <p className="text-xs text-text-secondary">Avg CLV</p>
          <p className="text-sm font-google font-medium text-foreground">₦89,400</p>
        </div>
        <div>
          <p className="text-xs text-text-secondary">Retention</p>
          <p className="text-sm font-google font-medium text-foreground">74.2%</p>
        </div>
        <div>
          <p className="text-xs text-text-secondary">At-Risk HV</p>
          <p className="text-sm font-google font-medium text-google-red">18</p>
        </div>
      </div>
    </motion.div>
  );
}
