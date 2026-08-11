
"use client";

import { useState } from "react";
import LeadsHeader from "@/components/dashboard/leads/LeadsHeader";
import LeadsTable from "@/components/dashboard/leads/LeadsTable";

export default function DashboardPage() {
  const [search, setSearch] = useState("");

  return (
    <>
      <LeadsHeader
        search={search}
        onSearchChange={setSearch}
      />

      <LeadsTable search={search} />
    </>
  );
}

