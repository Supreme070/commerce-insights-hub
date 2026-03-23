import { motion } from "framer-motion";

const stages = [
  { label: "Visitors", value: 48200, width: "100%", color: "bg-[#E8F0FE]" },
  { label: "Leads", value: 4820, width: "40%", color: "bg-[#A8C7FA]" },
  { label: "Engaged", value: 1930, width: "24%", color: "bg-google-blue" },
  { label: "Customers", value: 847, width: "12%", color: "bg-[#1557B0]" },
];

const dropoffs = ["10.0%", "40.0%", "43.9%"];

export function AcquisitionFunnel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.4 }}
      className="bg-card rounded-lg p-6 shadow-level-1 card-hover"
    >
      <h3 className="font-google text-base font-semibold text-foreground mb-5">Acquisition Funnel</h3>

      <div className="space-y-2">
        {stages.map((s, i) => (
          <div key={s.label}>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs text-text-secondary w-20">{s.label}</span>
              <div className="flex-1">
                <div className={`h-7 ${s.color} rounded flex items-center px-3`} style={{ width: s.width }}>
                  <span className="text-xs font-google font-medium text-foreground">{s.value.toLocaleString()}</span>
                </div>
              </div>
            </div>
            {i < dropoffs.length && (
              <div className="flex items-center ml-20 pl-3">
                <span className="text-[10px] text-text-muted">{dropoffs[i]} →</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-6 mt-6 pt-4 border-t border-border">
        <div>
          <p className="text-xs text-text-secondary">CAC</p>
          <p className="text-sm font-google font-medium text-foreground">₦5,200</p>
        </div>
        <div>
          <p className="text-xs text-text-secondary">Payback</p>
          <p className="text-sm font-google font-medium text-foreground">2.3 months</p>
        </div>
        <div>
          <p className="text-xs text-text-secondary">Funnel Rate</p>
          <p className="text-sm font-google font-medium text-google-green">1.76%</p>
        </div>
      </div>
    </motion.div>
  );
}
