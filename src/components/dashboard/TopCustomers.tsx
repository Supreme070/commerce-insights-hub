import { motion } from "framer-motion";

interface Customer {
  name: string;
  email: string;
  initials: string;
  spent: number;
  orders: number;
  segment: "VIP" | "High Value" | "At Risk";
}

const customers: Customer[] = [
  { name: "Amara Okafor", email: "amara@email.com", initials: "AO", spent: 4200000, orders: 47, segment: "VIP" },
  { name: "Chinedu Eze", email: "chinedu@email.com", initials: "CE", spent: 2890000, orders: 34, segment: "VIP" },
  { name: "Funke Adeyemi", email: "funke@email.com", initials: "FA", spent: 1670000, orders: 28, segment: "High Value" },
  { name: "Emeka Nwosu", email: "emeka@email.com", initials: "EN", spent: 1230000, orders: 19, segment: "High Value" },
  { name: "Ngozi Obi", email: "ngozi@email.com", initials: "NO", spent: 890000, orders: 15, segment: "At Risk" },
];

const segmentStyles: Record<string, string> = {
  VIP: "bg-[#E6F4EA] text-[#137333]",
  "High Value": "bg-[#E8F0FE] text-google-blue",
  "At Risk": "bg-[#FDE7E7] text-google-red",
};

export function TopCustomers() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.4 }}
      className="bg-card rounded-lg shadow-level-1 card-hover overflow-hidden"
    >
      <div className="p-6 pb-0">
        <h3 className="font-google text-base font-semibold text-foreground mb-4">Top Customers</h3>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-surface">
            <th className="text-left text-xs font-medium text-text-secondary px-6 py-3">Customer</th>
            <th className="text-right text-xs font-medium text-text-secondary px-4 py-3">Total Spent</th>
            <th className="text-right text-xs font-medium text-text-secondary px-4 py-3">Orders</th>
            <th className="text-right text-xs font-medium text-text-secondary px-6 py-3">Segment</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.name} className="h-12 hover:bg-surface transition-colors">
              <td className="px-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-google-blue flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-primary-foreground">{c.initials}</span>
                  </div>
                  <div>
                    <p className="text-sm text-foreground">{c.name}</p>
                    <p className="text-xs text-text-muted">{c.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 text-sm text-foreground text-right font-google">₦{c.spent.toLocaleString()}</td>
              <td className="px-4 text-xs text-text-secondary text-right">{c.orders}</td>
              <td className="px-6 text-right">
                <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-medium ${segmentStyles[c.segment]}`}>
                  {c.segment}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
