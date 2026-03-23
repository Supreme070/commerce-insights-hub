import { KpiCards } from "@/components/dashboard/KpiCards";
import { RevenueTrendChart } from "@/components/dashboard/RevenueTrendChart";
import { RealTimeVisitors } from "@/components/dashboard/RealTimeVisitors";
import { TopProducts } from "@/components/dashboard/TopProducts";
import { TopCustomers } from "@/components/dashboard/TopCustomers";
import { AcquisitionFunnel } from "@/components/dashboard/AcquisitionFunnel";
import { CustomerSegments } from "@/components/dashboard/CustomerSegments";

const Index = () => {
  return (
    <div className="min-h-screen bg-surface p-6 lg:p-8">
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Row 1 — KPI Cards */}
        <KpiCards />

        {/* Row 2 — Revenue Trend + Real-Time Visitors */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RevenueTrendChart />
          <RealTimeVisitors />
        </div>

        {/* Row 3 — Top Products + Top Customers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopProducts />
          <TopCustomers />
        </div>

        {/* Row 4 — Acquisition Funnel + Customer Segments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AcquisitionFunnel />
          <CustomerSegments />
        </div>
      </div>
    </div>
  );
};

export default Index;
