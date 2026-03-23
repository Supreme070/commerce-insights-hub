import { LineChart, Line, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const products = [
  { name: "Organic Shea Butter 500ml", revenue: 2340000, units: 312 },
  { name: "African Black Soap Bundle", revenue: 1890000, units: 456 },
  { name: "Moringa Oil Cold-Pressed", revenue: 1450000, units: 198 },
  { name: "Cocoa Butter Body Cream", revenue: 980000, units: 267 },
  { name: "Hibiscus Hair Growth Oil", revenue: 870000, units: 189 },
];

const sparkData = () => Array.from({ length: 7 }, (_, i) => ({ d: i, v: Math.random() * 100 + 40 }));

export function TopProducts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className="bg-card rounded-lg shadow-level-1 card-hover overflow-hidden"
    >
      <div className="p-6 pb-0">
        <h3 className="font-google text-base font-semibold text-foreground mb-4">Top Products</h3>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-surface">
            <th className="text-left text-xs font-medium text-text-secondary px-6 py-3">Product</th>
            <th className="text-right text-xs font-medium text-text-secondary px-6 py-3">Revenue</th>
            <th className="text-right text-xs font-medium text-text-secondary px-4 py-3">Units</th>
            <th className="text-right text-xs font-medium text-text-secondary px-6 py-3">Trend</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.name} className="h-12 hover:bg-surface transition-colors">
              <td className="px-6 text-sm text-foreground">{p.name}</td>
              <td className="px-6 text-sm text-foreground text-right font-google">₦{p.revenue.toLocaleString()}</td>
              <td className="px-4 text-xs text-text-secondary text-right">{p.units}</td>
              <td className="px-6">
                <div className="flex justify-end">
                  <div className="w-[60px] h-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={sparkData()}>
                        <Line type="monotone" dataKey="v" stroke="hsl(214,82%,51%)" strokeWidth={1.5} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
