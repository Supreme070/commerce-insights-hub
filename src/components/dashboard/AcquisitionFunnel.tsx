import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";

const stages = [
  { label: "Visitors", value: 48200, pct: 100, color: "bg-[hsla(214,82%,51%,0.08)]", barColor: "bg-[hsla(214,82%,51%,0.15)]", textColor: "text-google-blue" },
  { label: "Leads", value: 4820, pct: 10.0, color: "bg-[hsla(214,82%,51%,0.12)]", barColor: "bg-[hsla(214,82%,51%,0.25)]", textColor: "text-google-blue" },
  { label: "Engaged", value: 1930, pct: 40.0, color: "bg-[hsla(214,82%,51%,0.18)]", barColor: "bg-google-blue/40", textColor: "text-google-blue" },
  { label: "Customers", value: 847, pct: 43.9, color: "bg-[hsla(214,82%,51%,0.25)]", barColor: "bg-google-blue", textColor: "text-primary-foreground" },
];

const widths = [100, 42, 26, 14];

const metrics = [
  { label: "CAC", value: "₦5,200", description: "Customer Acquisition Cost" },
  { label: "Payback", value: "2.3 months", description: "Time to recoup CAC" },
  { label: "Funnel Rate", value: "1.76%", description: "Visitor to customer", highlight: true },
];

export function AcquisitionFunnel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.75, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="card-premium p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-google text-[15px] font-semibold text-foreground">Acquisition Funnel</h3>
          <p className="text-xs text-text-muted mt-0.5">Conversion pipeline</p>
        </div>
      </div>

      <div className="space-y-1.5">
        {stages.map((s, i) => (
          <div key={s.label}>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-medium text-text-secondary w-[72px] text-right">{s.label}</span>
              <div className="flex-1 relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${widths[i]}%` }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`h-9 ${s.barColor} rounded-lg flex items-center justify-between px-3 overflow-hidden`}
                >
                  <span className={`text-xs font-google font-semibold ${i === stages.length - 1 ? "text-primary-foreground" : "text-foreground"} whitespace-nowrap`}>
                    {s.value.toLocaleString()}
                  </span>
                </motion.div>
              </div>
            </div>
            {i < stages.length - 1 && (
              <div className="flex items-center ml-[84px] py-0.5">
                <ArrowRight className="w-3 h-3 text-text-muted mr-1" />
                <span className="text-[10px] font-medium text-text-muted">
                  {stages[i + 1].pct}% conversion
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-[hsl(var(--divider))]">
        {metrics.map((m) => (
          <div key={m.label} className="bg-surface rounded-lg p-3 text-center">
            <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">{m.label}</p>
            <p className={`text-sm font-google font-semibold ${m.highlight ? "text-google-green" : "text-foreground"}`}>
              {m.value}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
