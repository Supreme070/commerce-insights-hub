import { motion } from "framer-motion";
import { Crown, Star, AlertTriangle } from "lucide-react";

interface Customer {
  name: string;
  email: string;
  initials: string;
  spent: number;
  orders: number;
  segment: "VIP" | "High Value" | "At Risk";
  avatarColor: string;
}

const defaultCustomers: Customer[] = [
  { name: "Amara Okafor", email: "amara@email.com", initials: "AO", spent: 4200000, orders: 47, segment: "VIP", avatarColor: "from-google-green to-[hsl(137,52%,35%)]" },
  { name: "Chinedu Eze", email: "chinedu@email.com", initials: "CE", spent: 2890000, orders: 34, segment: "VIP", avatarColor: "from-google-green to-[hsl(137,52%,35%)]" },
  { name: "Funke Adeyemi", email: "funke@email.com", initials: "FA", spent: 1670000, orders: 28, segment: "High Value", avatarColor: "from-google-blue to-[hsl(214,82%,42%)]" },
  { name: "Emeka Nwosu", email: "emeka@email.com", initials: "EN", spent: 1230000, orders: 19, segment: "High Value", avatarColor: "from-google-blue to-[hsl(214,82%,42%)]" },
  { name: "Ngozi Obi", email: "ngozi@email.com", initials: "NO", spent: 890000, orders: 15, segment: "At Risk", avatarColor: "from-google-red to-[hsl(4,81%,46%)]" },
];

const segmentConfig: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
  VIP: { bg: "bg-[hsla(137,52%,43%,0.08)]", text: "text-[#137333]", icon: Crown },
  "High Value": { bg: "bg-[hsla(214,82%,51%,0.08)]", text: "text-google-blue", icon: Star },
  "At Risk": { bg: "bg-[hsla(4,81%,56%,0.08)]", text: "text-google-red", icon: AlertTriangle },
};

export function TopCustomers() {
  const customers = defaultCustomers;
  const maxSpent = Math.max(...customers.map((c) => c.spent));

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="card-premium overflow-hidden"
    >
      <div className="p-6 pb-0 flex items-center justify-between">
        <div>
          <h3 className="font-google text-[15px] font-semibold text-foreground">Top Customers</h3>
          <p className="text-xs text-text-muted mt-0.5">By lifetime value</p>
        </div>
        <div className="font-google text-xs text-text-muted">
          <span className="text-foreground font-semibold">{customers.length}</span> customers
        </div>
      </div>
      <div className="mt-4">
        {customers.map((c, i) => {
          const seg = segmentConfig[c.segment];
          const SegIcon = seg.icon;
          const barWidth = (c.spent / maxSpent) * 100;
          return (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.06, duration: 0.4 }}
              className="flex items-center gap-3 px-6 py-3 hover:bg-surface/60 transition-colors group cursor-default"
            >
              <span className="text-xs font-google font-semibold text-text-muted w-4">{i + 1}</span>
              <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${c.avatarColor} flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}>
                <span className="text-[11px] font-semibold text-primary-foreground">{c.initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate group-hover:text-google-blue transition-colors">{c.name}</p>
                <p className="text-[11px] text-text-muted truncate">{c.email}</p>
                <div className="w-full max-w-[120px] h-1 bg-[hsl(var(--divider))] rounded-full mt-1 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${barWidth}%` }}
                    transition={{ delay: 0.9 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                    className="h-full bg-google-blue/25 rounded-full"
                  />
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-google font-medium text-foreground tabular-nums">₦{c.spent.toLocaleString()}</p>
                <p className="text-[11px] text-text-muted">{c.orders} orders</p>
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${seg.bg} ${seg.text}`}>
                <SegIcon className="w-3 h-3" />
                <span className="text-[11px] font-medium whitespace-nowrap">{c.segment}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
