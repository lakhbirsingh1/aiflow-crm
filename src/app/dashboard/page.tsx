"use client";

import { useState } from "react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import Cards from "@/components/dashboard/Cards";
import AISalesIntelligence from "@/components/dashboard/AISalesIntelligence";
import SalesOverviewBento from "@/components/dashboard/SalesOverview";
import BgDots from "@/BgDots";


export default function DashboardPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false);

  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* ================================================= */}
      {/* SIDEBAR */}
      {/* ================================================= */}

      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
   
      />

      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <div
        className={`min-h-screen transition-[padding] duration-200 ${
          sidebarCollapsed
            ? "lg:pl-[76px]"
            : "lg:pl-64"
        }`}
      >
        {/* Header */}
        <Header
          onMenuClick={() => setMobileSidebarOpen(true)}
        />

        {/* Page Content */}
        <main className="p-6">
          {/* Tumhara existing dashboard content yahan rahega */}
          <Cards />
          <AISalesIntelligence />
          <SalesOverviewBento />
          <BgDots />
        </main>
      </div>
    </div>
  );
}