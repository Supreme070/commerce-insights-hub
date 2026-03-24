import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { RevenueTrendChart } from "@/components/dashboard/RevenueTrendChart";
import { RealTimeVisitors } from "@/components/dashboard/RealTimeVisitors";
import { TopProducts } from "@/components/dashboard/TopProducts";
import { TopCustomers } from "@/components/dashboard/TopCustomers";
import { AcquisitionFunnel } from "@/components/dashboard/AcquisitionFunnel";
import { CustomerSegments } from "@/components/dashboard/CustomerSegments";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-6 lg:py-8 space-y-6">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <DashboardSkeleton />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
              }}
              className="space-y-6"
            >
              {[
                <DashboardHeader key="header" />,
                <KpiCards key="kpis" />,
                <div key="charts" className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <RevenueTrendChart />
                  <RealTimeVisitors />
                </div>,
                <div key="lists" className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <TopProducts />
                  <TopCustomers />
                </div>,
                <div key="bottom" className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <AcquisitionFunnel />
                  <CustomerSegments />
                </div>,
              ].map((child, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
                  }}
                >
                  {child}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
