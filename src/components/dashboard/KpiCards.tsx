import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { DollarSign, ShoppingCart, Receipt, Target } from "lucide-react";

interface KpiData {
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  format?: "currency" | "number" | "percent";
  change: number;
  changeLabel: string;
  today: string;
  week: string;
}

const kpis: KpiData[] = [
  {
    icon: DollarSign,
    iconColor: "text-google-green",
    iconBg: "bg-[#E6F4EA]",
    label: "Monthly Revenue",
    value: 12450000,
    format: "currency",
    change: 18.3,
    changeLabel: "vs last month",
    today: "₦890,000",
    week: "₦4,200,000",
  },
  {
    icon: ShoppingCart,
    iconColor: "text-google-blue",
    iconBg: "bg-[#E8F0FE]",
    label: "Orders",
    value: 847,
    format: "number",
    change: 12.1,
    changeLabel: "vs last month",
    today: "32",
    week: "198",
  },
  {
    icon: Receipt,
    iconColor: "text-google-yellow",
    iconBg: "bg-[#FEF7E0]",
    label: "AOV",
    value: 14700,
    format: "currency",
    change: 5.4,
    changeLabel: "vs last month",
    today: "₦15,200",
    week: "₦14,900",
  },
  {
    icon: Target,
    iconColor: "text-google-blue",
    iconBg: "bg-[#E8F0FE]",
    label: "Conversion",
    value: 3.2,
    format: "percent",
    change: -0.3,
    changeLabel: "vs last month",
    today: "3.4%",
    week: "3.1%",
  },
];

function AnimatedNumber({ value, format }: { value: number; format?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 800, bounce: 0 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
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

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, i) => {
        const Icon = kpi.icon;
        const isPositive = kpi.change >= 0;
        return (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="bg-card rounded-lg p-6 shadow-level-1 card-hover"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-lg ${kpi.iconBg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${kpi.iconColor}`} />
              </div>
              <span className="text-sm font-medium text-text-secondary">{kpi.label}</span>
            </div>
            <div className="font-google text-3xl font-semibold text-foreground mb-1">
              <AnimatedNumber value={kpi.value} format={kpi.format} />
            </div>
            <div className="flex items-center gap-1 mb-3">
              <span className={`text-sm font-medium ${isPositive ? "text-google-green" : "text-google-red"}`}>
                {isPositive ? "↑" : "↓"} {isPositive ? "+" : ""}{kpi.change}%
              </span>
              <span className="text-xs text-text-muted">{kpi.changeLabel}</span>
            </div>
            <div className="flex gap-4 text-xs text-text-muted">
              <span>Today: {kpi.today}</span>
              <span>This Week: {kpi.week}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
