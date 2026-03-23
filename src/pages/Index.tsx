import { useState, useEffect } from "react";
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
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-surface p-6 lg:p-8">
      <div className="max-w-[1400px] mx-auto space-y-6">
        {isLoading ? (
          <DashboardSkeleton />
        ) : (
          <>
            <DashboardHeader />

            <KpiCards />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <RevenueTrendChart />
              <RealTimeVisitors />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TopProducts />
              <TopCustomers />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AcquisitionFunnel />
              <CustomerSegments />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
