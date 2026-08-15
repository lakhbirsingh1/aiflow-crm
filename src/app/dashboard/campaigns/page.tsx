"use client";

import { useState } from "react";
import Header from "@/components/dashboard/campaigns/Header";
import Table from "@/components/dashboard/campaigns/Table";

export type CampaignStatus =
  | "All"
  | "Active"
  | "Paused"
  | "Completed";

export default function CampaignsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] =
    useState<CampaignStatus>("All");

  return (
    <main className="w-full space-y-6">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-5 sm:px-6 lg:px-8">
        <Header
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
        />

        <Table
          search={search}
          status={status}
        />
      </div>
    </main>
  );
}