import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface FunnelData {
  stages: { value: number }[];
  cac: string;
  payback: string;
  funnelRate: string;
}

interface AcquisitionFunnelProps {
  data?: FunnelData;
}

const stageLabels = ["Visitors", "Leads", "Engaged", "Customers"];
const widths = [100, 42, 26, 14];
const barColors = ["bg-[hsla(214,82%,51%,0.15)]", "bg-[hsla(214,82%,51%,0.25)]", "bg-google-blue/40", "bg-google-blue"];

export function AcquisitionFunnel({ data }: AcquisitionFunnelProps) {
  const stages = stageLabels.map((label, i) => ({
    label,
    value: data?.stages?.[i]?.value ?? [48200, 4820, 1930, 847][i],
  }));

  const metrics = [
    { label: "CAC", value: data?.cac ?? "₦5,200" },
    { label: "Payback", value: data?.payback ?? "2.3 months" },
    { label: "Funnel Rate", value: data?.funnelRate ?? "1.76%", highlight: true },
  ];

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
        {stages.map((s, i) => {
          const convPct = i < stages.length - 1
            ? ((stages[i + 1].value / s.value) * 100).toFixed(1)
            : null;
          return (
            <div key={s.label}>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-medium text-text-secondary w-[72px] text-right">{s.label}</span>
                <div className="flex-1 relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${widths[i]}%` }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className={`h-9 ${barColors[i]} rounded-lg flex items-center justify-between px-3 overflow-hidden`}
                  >
                    <span className={`text-xs font-google font-semibold ${i === stages.length - 1 ? "text-primary-foreground" : "text-foreground"} whitespace-nowrap`}>
                      {s.value.toLocaleString()}
                    </span>
                  </motion.div>
                </div>
              </div>
              {convPct && (
                <div className="flex items-center ml-[84px] py-0.5">
                  <ArrowRight className="w-3 h-3 text-text-muted mr-1" />
                  <span className="text-[10px] font-medium text-text-muted">{convPct}% conversion</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-[hsl(var(--divider))]">
        {metrics.map((m) => (
          <div key={m.label} className="bg-surface rounded-lg p-3 text-center">
            <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">{m.label}</p>
            <p className={`text-sm font-google font-semibold ${m.highlight ? "text-google-green" : "text-foreground"}`}>{m.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
