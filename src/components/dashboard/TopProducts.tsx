import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Package } from "lucide-react";

const products = [
  { name: "Organic Shea Butter 500ml", revenue: 2340000, units: 312, growth: 24.5 },
  { name: "African Black Soap Bundle", revenue: 1890000, units: 456, growth: 18.2 },
  { name: "Moringa Oil Cold-Pressed", revenue: 1450000, units: 198, growth: 12.8 },
  { name: "Cocoa Butter Body Cream", revenue: 980000, units: 267, growth: -3.2 },
  { name: "Hibiscus Hair Growth Oil", revenue: 870000, units: 189, growth: 8.7 },
];

const maxRevenue = Math.max(...products.map((p) => p.revenue));

export function TopProducts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="card-premium overflow-hidden"
    >
      <div className="p-6 pb-0 flex items-center justify-between">
        <div>
          <h3 className="font-google text-[15px] font-semibold text-foreground">Top Products</h3>
          <p className="text-xs text-text-muted mt-0.5">By revenue this period</p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center">
          <Package className="w-4 h-4 text-text-muted" />
        </div>
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 px-6 py-2.5 bg-surface border-y border-[hsl(var(--divider))]">
          <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">Product</span>
          <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider text-right">Revenue</span>
          <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider text-right">Units</span>
          <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider text-right w-16">Growth</span>
        </div>
        {products.map((p, i) => {
          const isPositive = p.growth >= 0;
          const barWidth = (p.revenue / maxRevenue) * 100;
          return (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.06, duration: 0.4 }}
              className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 px-6 py-3 items-center hover:bg-surface/60 transition-colors group cursor-default"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-google font-semibold text-text-muted w-5">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate group-hover:text-google-blue transition-colors">{p.name}</p>
                    {/* Revenue bar */}
                    <div className="w-full h-1 bg-[hsl(var(--divider))] rounded-full mt-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${barWidth}%` }}
                        transition={{ delay: 0.8 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                        className="h-full bg-google-blue/30 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <span className="text-sm font-google font-medium text-foreground text-right tabular-nums">
                ₦{p.revenue.toLocaleString()}
              </span>
              <span className="text-xs text-text-muted text-right tabular-nums">{p.units}</span>
              <div className={`flex items-center justify-end gap-0.5 w-16 text-xs font-medium ${
                isPositive ? "text-google-green" : "text-google-red"
              }`}>
                {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {isPositive ? "+" : ""}{p.growth}%
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
