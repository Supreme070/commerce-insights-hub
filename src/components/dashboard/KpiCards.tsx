import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { DollarSign, ShoppingCart, Receipt, Target, TrendingUp, TrendingDown } from "lucide-react";

interface KpiValues {
  value: number;
  change: number;
  today: string;
  week: string;
  sparkData: number[];
}

interface KpiCardsProps {
  data?: {
    revenue: KpiValues;
    orders: KpiValues;
    aov: KpiValues;
    conversion: KpiValues;
  };
}

interface KpiConfig {
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  glowClass: string;
  label: string;
  format?: "currency" | "number" | "percent";
  changeLabel: string;
  dataKey: "revenue" | "orders" | "aov" | "conversion";
}

const kpiConfigs: KpiConfig[] = [
  {
    icon: DollarSign, iconColor: "text-google-green", iconBg: "bg-[hsla(137,52%,43%,0.08)]",
    glowClass: "group-hover:shadow-glow-green", label: "Monthly Revenue",
    format: "currency", changeLabel: "vs last month", dataKey: "revenue",
  },
  {
    icon: ShoppingCart, iconColor: "text-google-blue", iconBg: "bg-[hsla(214,82%,51%,0.08)]",
    glowClass: "group-hover:shadow-glow-blue", label: "Orders",
    format: "number", changeLabel: "vs last month", dataKey: "orders",
  },
  {
    icon: Receipt, iconColor: "text-google-yellow", iconBg: "bg-[hsla(43,97%,50%,0.08)]",
    glowClass: "group-hover:shadow-[0_4px_16px_rgba(251,188,4,0.15)]", label: "AOV",
    format: "currency", changeLabel: "vs last month", dataKey: "aov",
  },
  {
    icon: Target, iconColor: "text-google-blue", iconBg: "bg-[hsla(214,82%,51%,0.08)]",
    glowClass: "group-hover:shadow-glow-blue", label: "Conversion",
    format: "percent", changeLabel: "vs last month", dataKey: "conversion",
  },
];

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 28;
  const w = 64;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AnimatedNumber({ value, format }: { value: number; format?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1200, bounce: 0 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) {
        if (format === "currency") {
          ref.current.textContent = "₦" + Math.round(latest).toLocaleString();
        } else if (format === "percent") {
          ref.current.textContent = latest.toFixed(1) + "%";
        } else {
          ref.current.textContent = Math.round(latest).toLocaleString();
        }
      }
    });
    return unsubscribe;
  }, [spring, format]);

  return <span ref={ref}>0</span>;
}

export function KpiCards({ data }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiConfigs.map((kpi, i) => {
        const d = data?.[kpi.dataKey] ?? { value: 0, change: 0, today: "—", week: "—", sparkData: [0] };
        const Icon = kpi.icon;
        const isPositive = d.change >= 0;
        const TrendIcon = isPositive ? TrendingUp : TrendingDown;
        const sparkColor = isPositive ? "hsl(137, 52%, 43%)" : "hsl(4, 81%, 56%)";

        return (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`group card-premium p-5 cursor-default ${kpi.glowClass}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-lg ${kpi.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`w-[18px] h-[18px] ${kpi.iconColor}`} />
                </div>
                <span className="text-[13px] font-medium text-text-secondary">{kpi.label}</span>
              </div>
              <MiniSparkline data={d.sparkData} color={sparkColor} />
            </div>

            <div className="font-google text-[28px] font-semibold text-foreground leading-none mb-2">
              <AnimatedNumber value={d.value} format={kpi.format} />
            </div>

            <div className="flex items-center gap-1.5 mb-3">
              <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-xs font-medium ${
                isPositive ? "bg-[hsla(137,52%,43%,0.08)] text-google-green" : "bg-[hsla(4,81%,56%,0.08)] text-google-red"
              }`}>
                <TrendIcon className="w-3 h-3" />
                {isPositive ? "+" : ""}{d.change}%
              </div>
              <span className="text-[11px] text-text-muted">{kpi.changeLabel}</span>
            </div>

            <div className="flex gap-3 pt-3 border-t border-[hsl(var(--divider))]">
              <div className="flex-1">
                <p className="text-[10px] text-text-muted uppercase tracking-wider mb-0.5">Today</p>
                <p className="text-xs font-medium text-text-secondary">{d.today}</p>
              </div>
              <div className="w-px bg-[hsl(var(--divider))]" />
              <div className="flex-1">
                <p className="text-[10px] text-text-muted uppercase tracking-wider mb-0.5">This Week</p>
                <p className="text-xs font-medium text-text-secondary">{d.week}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
