"use client";

import { useState } from "react";
import Cards from "@/components/dashboard/Cards";
import AISalesIntelligence from "@/components/dashboard/AISalesIntelligence";
import SalesOverviewBento from "@/components/dashboard/SalesOverview";
import BgDots from "@/BgDots";
import { HotLeadsOffcanvas } from "@/components/dashboard/HotLeadsOffcanvas";
import { hotLeads } from "@/components/dashboard/HotLeadCarousel";

export default function DashboardPage() {
  const [showAllLeads, setShowAllLeads] = useState(false);

  return (
    <main className="p-6">
      <Cards />

      <AISalesIntelligence
        onViewAllLeads={() => setShowAllLeads(true)}
      />

      <SalesOverviewBento />

      <BgDots />

      <HotLeadsOffcanvas
        open={showAllLeads}
        onClose={() => setShowAllLeads(false)}
        leads={hotLeads}
      />
    </main>
  );
}