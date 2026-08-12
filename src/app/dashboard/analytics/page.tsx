"use client";

import AnalyticsHeader from "@/components/dashboard/analytics/AnalyticsHeader";
import AnalyticsOverview from "@/components/dashboard/analytics/AnalyticsOverview";
import RevenueChart from "@/components/dashboard/analytics/RevenueChart";
import ConversionFunnel from "@/components/dashboard/analytics/ConversionFunnel";
import SalesPerformance from "@/components/dashboard/analytics/SalesPerformance";
import LeadSources from "@/components/dashboard/analytics/LeadSources";
import AIAnalyticsInsights from "@/components/dashboard/analytics/AIAnalyticsInsights";

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-[1800px] space-y-6 p-4 md:p-6 lg:p-8">
        <AnalyticsHeader />

        <AnalyticsOverview />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(340px,0.75fr)]">
          <RevenueChart />
          <ConversionFunnel />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(340px,0.8fr)]">
          <SalesPerformance />
          <LeadSources />
        </div>

        <AIAnalyticsInsights />
      </div>
    </main>
  );
}