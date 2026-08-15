"use client";

import { useCallback, useEffect, useState } from "react";

import LeadsHeader from "@/components/dashboard/leads/LeadsHeader";
import LeadsTable from "@/components/dashboard/leads/LeadsTable";
import EditLeadDialog from "@/components/dashboard/leads/EditLeadDialog";

import type { Lead } from "@/types/lead";

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/leads", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch leads.");
      }

      setLeads(Array.isArray(data.leads) ? data.leads : []);
    } catch (error) {
      console.error("Fetch leads error:", error);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchLeads();
  }, [fetchLeads]);

  const handleLeadCreated = (newLead: Lead) => {
    setLeads((currentLeads) => [newLead, ...currentLeads]);
  };

  const handleLeadUpdated = (updatedLead: Lead) => {
    setLeads((currentLeads) =>
      currentLeads.map((lead) =>
        lead.id === updatedLead.id ? updatedLead : lead,
      ),
    );

    setEditingLead(null);
  };

  const handleLeadDeleted = (id: string) => {
    setLeads((currentLeads) =>
      currentLeads.filter((lead) => lead.id !== id),
    );
  };

  return (
    <div className="w-full">
      <LeadsHeader
        search={search}
        onSearchChange={setSearch}
        leads={leads}
        onLeadCreated={handleLeadCreated}
      />

      <LeadsTable
        search={search}
        leads={leads}
        loading={loading}
        onLeadDeleted={handleLeadDeleted}
        onEditLead={setEditingLead}
      />

      <EditLeadDialog
        lead={editingLead}
        open={!!editingLead}
        onOpenChange={(open) => {
          if (!open) {
            setEditingLead(null);
          }
        }}
        onLeadUpdated={handleLeadUpdated}
      />
    </div>
  );
}