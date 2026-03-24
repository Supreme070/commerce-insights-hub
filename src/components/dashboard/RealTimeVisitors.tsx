import { LineChart, Line, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { Users, Globe, Search, Share2, Mail } from "lucide-react";

const sparkData = Array.from({ length: 24 }, (_, i) => ({
  hour: i,
  visitors: Math.round(80 + Math.random() * 120 + Math.sin(i * 0.5) * 40),
}));

const sourceConfigs = [
  { name: "Direct", color: "bg-google-blue", barColor: "hsl(214,82%,51%)", icon: Globe },
  { name: "Search", color: "bg-google-green", barColor: "hsl(137,52%,43%)", icon: Search },
  { name: "Social", color: "bg-google-yellow", barColor: "hsl(43,97%,50%)", icon: Share2 },
  { name: "Email", color: "bg-text-muted", barColor: "hsl(210,5%,63%)", icon: Mail },
];

interface RealTimeVisitorsProps {
  data?: {
    active: number;
    today: string;
    week: string;
    month: string;
    sources: { pct: number }[];
  };
}

export function RealTimeVisitors({ data }: RealTimeVisitorsProps) {
  const active = data?.active ?? 142;
  const stats = [
    { label: "Today", value: data?.today ?? "1,847" },
    { label: "This Week", value: data?.week ?? "12,340" },
    { label: "This Month", value: data?.month ?? "48,200" },
  ];
  const sources = sourceConfigs.map((s, i) => ({
    ...s,
    pct: data?.sources?.[i]?.pct ?? [34, 28, 22, 16][i],
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="card-premium p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-google text-[15px] font-semibold text-foreground">Real-Time Visitors</h3>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-[hsla(137,52%,43%,0.08)]">
          <span className="w-1.5 h-1.5 rounded-full bg-google-green pulse-dot" />
          <span className="text-[11px] font-medium text-google-green">Live</span>
        </div>
      </div>

      <div className="flex items-end justify-between mb-4">
        <div className="flex items-baseline gap-2">
          <span className="font-google text-[40px] font-semibold text-foreground leading-none tracking-tight">{active}</span>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-text-muted" />
            <span className="text-xs text-text-muted">active now</span>
          </div>
        </div>
        <div className="w-[100px] h-[36px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparkData}>
              <Line type="monotone" dataKey="visitors" stroke="hsl(214,82%,51%)" strokeWidth={1.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-5">
        {stats.map((s) => (
          <div key={s.label} className="bg-surface rounded-lg p-2.5 text-center">
            <p className="text-[10px] text-text-muted uppercase tracking-wider mb-0.5">{s.label}</p>
            <p className="font-google text-sm font-semibold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium text-text-secondary">Traffic Sources</p>
        {sources.map((s) => {
          const SourceIcon = s.icon;
          return (
            <div key={s.name} className="group/source flex items-center gap-2.5 cursor-default">
              <div className="w-6 h-6 rounded-md bg-surface flex items-center justify-center">
                <SourceIcon className="w-3 h-3 text-text-secondary" />
              </div>
              <span className="text-xs text-text-secondary w-10">{s.name}</span>
              <div className="flex-1 h-2 bg-[hsl(var(--divider))] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${s.pct}%` }}
                  transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                  className={`h-full ${s.color} rounded-full`}
                />
              </div>
              <span className="text-xs font-medium text-foreground w-8 text-right">{s.pct}%</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
