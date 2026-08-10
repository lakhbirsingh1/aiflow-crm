"use client";

import RecentLeadActivity from "./RecentLeadActivity";
import SalesPipeline from "./SalesPipeline";
import AIRecommendedActions from "./AIRecommendedActions";
import ForecastPerformance from "./ForecastPerformance";
import Performance from "./Performance";

export default function SalesOverviewBento() {
  return (
    <div className="space-y-4 mt-4">
      {/* 03 — Recent Lead Activity */}

      <RecentLeadActivity />

      {/* 04 + 05 — Pipeline & AI Actions */}

      <div className="grid gap-4 lg:grid-cols-[1.7fr_1fr]">
        <SalesPipeline />
        <AIRecommendedActions />
      </div>

      {/* 06 — Forecast & Performance */}

      <div className="grid gap-4 lg:grid-cols-[1.45fr_1fr]">
        <ForecastPerformance />
        <Performance />
      </div>
    </div>
  );
}