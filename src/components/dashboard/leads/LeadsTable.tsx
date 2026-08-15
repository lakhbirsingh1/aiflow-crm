"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  CalendarClock,
  Mail,
  Pencil,
  Phone,
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Lead } from "@/types/lead";

type LeadWithDates = Lead & {
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
};

type LeadsTableProps = {
  search: string;
  leads: Lead[];
  loading: boolean;
  onLeadDeleted: (id: string) => void;
  onEditLead: (lead: Lead) => void;
};

export default function LeadsTable({
  search,
  leads,
  loading,
  onLeadDeleted,
  onEditLead,
}: LeadsTableProps) {
  const [selectedLead, setSelectedLead] =
    useState<LeadWithDates | null>(null);

  const [deleteLead, setDeleteLead] =
    useState<LeadWithDates | null>(null);

  const [deleting, setDeleting] = useState(false);

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return leads;
    }

    return leads.filter((lead) =>
      [
        lead.firstName ?? "",
        lead.lastName ?? "",
        lead.email ?? "",
        lead.company ?? "",
        lead.jobTitle ?? "",
        lead.source ?? "",
        lead.status ?? "",
        lead.owner?.name ?? "",
      ].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [leads, search]);

  const getLeadName = (lead: Lead) => {
    return `${lead.firstName} ${lead.lastName ?? ""}`.trim();
  };

  const getInitials = (lead: Lead) => {
    const first = lead.firstName
      ?.charAt(0)
      .toUpperCase();

    const last = lead.lastName
      ?.charAt(0)
      .toUpperCase();

    return `${first ?? ""}${last || ""}`;
  };

  const getStatusColor = (
    status: string | null | undefined,
  ) => {
    switch (status?.toUpperCase()) {
      case "QUALIFIED":
        return "bg-emerald-500";

      case "NEW":
        return "bg-blue-500";

      case "NURTURING":
        return "bg-violet-500";

      case "WON":
        return "bg-emerald-500";

      case "LOST":
        return "bg-red-500";

      case "CONTACTED":
        return "bg-amber-500";

      case "PROPOSAL":
        return "bg-orange-500";

      default:
        return "bg-amber-500";
    }
  };

  const formatStatus = (
    status: string | null | undefined,
  ) => {
    if (!status) {
      return "Unknown";
    }

    return status
      .toLowerCase()
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) =>
        char.toUpperCase(),
      );
  };

  const formatSource = (
    source: string | null | undefined,
  ) => {
    if (!source) {
      return "—";
    }

    return source
      .toLowerCase()
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) =>
        char.toUpperCase(),
      );
  };

  const formatActivity = (
    date: string | Date | null | undefined,
  ) => {
    if (!date) {
      return "—";
    }

    const created = new Date(date);

    if (Number.isNaN(created.getTime())) {
      return "—";
    }

    const now = new Date();

    const difference =
      now.getTime() - created.getTime();

    if (difference < 0) {
      return "Just now";
    }

    const minutes = Math.floor(
      difference / 60000,
    );

    if (minutes < 1) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes}m ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours}h ago`;
    }

    const days = Math.floor(hours / 24);

    return `${days}d ago`;
  };

  const handleDelete = async () => {
    if (!deleteLead) {
      return;
    }

    try {
      setDeleting(true);

      const response = await fetch(
        `/api/leads/${deleteLead.id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to delete lead.",
        );
      }

      onLeadDeleted(deleteLead.id);

      if (
        selectedLead?.id === deleteLead.id
      ) {
        setSelectedLead(null);
      }

      setDeleteLead(null);
    } catch (error) {
      console.error(
        "Delete lead error:",
        error,
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete lead.",
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <section className="min-w-0">
        {/* Loading */}
        {loading ? (
          <div className="flex min-h-56 items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground" />

              Loading leads...
            </div>
          </div>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden overflow-x-auto md:block">
              <div className="min-w-[1000px]">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50 hover:bg-transparent">
                      <TableHead className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        Lead
                      </TableHead>

                      <TableHead className="py-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        Source
                      </TableHead>

                      <TableHead className="py-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        Status
                      </TableHead>

                      <TableHead className="py-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        Owner
                      </TableHead>

                      <TableHead className="py-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        Last activity
                      </TableHead>

                      <TableHead className="py-3 text-right text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        AI
                      </TableHead>

                      <TableHead className="pr-4 text-right text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    <AnimatePresence mode="popLayout">
                      {filteredLeads.map(
                        (lead, index) => {
                          const leadWithDates =
                            lead as LeadWithDates;

                          return (
                            <motion.tr
                              key={lead.id}
                              layout
                              initial={{
                                opacity: 0,
                                y: 6,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              exit={{
                                opacity: 0,
                                y: -6,
                              }}
                              transition={{
                                delay:
                                  index * 0.03,
                                duration: 0.25,
                              }}
                              onClick={() =>
                                setSelectedLead(
                                  leadWithDates,
                                )
                              }
                              className="cursor-pointer border-border/40 transition-colors hover:bg-muted/30"
                            >
                              {/* Lead */}
                              <TableCell className="px-4 py-4">
                                <div className="flex min-w-0 items-center gap-3">
                                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                                    {getInitials(
                                      lead,
                                    )}
                                  </div>

                                  <div className="min-w-0">
                                    <p className="truncate text-sm font-medium text-foreground">
                                      {getLeadName(
                                        lead,
                                      )}
                                    </p>

                                    <p className="truncate text-xs text-muted-foreground">
                                      {lead.company ||
                                        "No company"}
                                    </p>
                                  </div>
                                </div>
                              </TableCell>

                              {/* Source */}
                              <TableCell className="text-xs text-muted-foreground">
                                {formatSource(
                                  lead.source,
                                )}
                              </TableCell>

                              {/* Status */}
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${getStatusColor(
                                      lead.status,
                                    )}`}
                                  />

                                  <span className="text-xs text-muted-foreground">
                                    {formatStatus(
                                      lead.status,
                                    )}
                                  </span>
                                </div>
                              </TableCell>

                              {/* Owner */}
                              <TableCell className="text-xs text-muted-foreground">
                                {lead.owner?.name ||
                                  "You"}
                              </TableCell>

                              {/* Activity */}
                              <TableCell className="text-xs text-muted-foreground">
                                {formatActivity(
                                  leadWithDates.updatedAt,
                                )}
                              </TableCell>

                              {/* AI */}
                              <TableCell>
                                <div className="flex items-center justify-end gap-1.5">
                                  <Sparkles className="h-3.5 w-3.5 text-cyan-500" />

                                  <span className="text-xs font-semibold">
                                    {lead.score ??
                                      "—"}
                                  </span>
                                </div>
                              </TableCell>

                              {/* Actions */}
                              <TableCell
                                className="pr-4"
                                onClick={(event) =>
                                  event.stopPropagation()
                                }
                              >
                                <div className="flex justify-end gap-1">
                                  <button
                                    type="button"
                                    aria-label="Edit lead"
                                    onClick={() =>
                                      onEditLead(
                                        lead,
                                      )
                                    }
                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                  >
                                    <Pencil className="h-3.5 w-3.5" />
                                  </button>

                                  <button
                                    type="button"
                                    aria-label="Delete lead"
                                    onClick={() =>
                                      setDeleteLead(
                                        leadWithDates,
                                      )
                                    }
                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-500"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </TableCell>
                            </motion.tr>
                          );
                        },
                      )}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Mobile */}
            <div className="divide-y divide-border/40 md:hidden">
              <AnimatePresence mode="popLayout">
                {filteredLeads.map(
                  (lead, index) => {
                    const leadWithDates =
                      lead as LeadWithDates;

                    return (
                      <motion.div
                        key={lead.id}
                        layout
                        initial={{
                          opacity: 0,
                          y: 6,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -6,
                        }}
                        transition={{
                          delay:
                            index * 0.03,
                          duration: 0.25,
                        }}
                        className="py-4"
                      >
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedLead(
                                leadWithDates,
                              )
                            }
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium"
                          >
                            {getInitials(lead)}
                          </button>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedLead(
                                    leadWithDates,
                                  )
                                }
                                className="min-w-0 text-left"
                              >
                                <p className="truncate text-sm font-medium text-foreground">
                                  {getLeadName(
                                    lead,
                                  )}
                                </p>

                                <p className="truncate text-xs text-muted-foreground">
                                  {lead.company ||
                                    "No company"}
                                </p>
                              </button>

                              <div className="flex shrink-0 items-center gap-1">
                                <Sparkles className="h-3.5 w-3.5 text-cyan-500" />

                                <span className="text-xs font-semibold">
                                  {lead.score ??
                                    "—"}
                                </span>
                              </div>
                            </div>

                            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                              <span className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${getStatusColor(
                                    lead.status,
                                  )}`}
                                />

                                {formatStatus(
                                  lead.status,
                                )}
                              </span>

                              <span className="text-xs text-muted-foreground">
                                {formatSource(
                                  lead.source,
                                )}
                              </span>

                              <span className="text-xs text-muted-foreground">
                                {formatActivity(
                                  leadWithDates.updatedAt,
                                )}
                              </span>
                            </div>

                            {/* Mobile actions */}
                            <div className="mt-3 flex gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  onEditLead(
                                    lead,
                                  )
                                }
                                className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-muted px-3 text-xs font-medium"
                              >
                                <Pencil className="h-3 w-3" />
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  setDeleteLead(
                                    leadWithDates,
                                  )
                                }
                                className="inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-medium text-red-500 hover:bg-red-500/10"
                              >
                                <Trash2 className="h-3 w-3" />
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  },
                )}
              </AnimatePresence>
            </div>
          </>
        )}

        {/* Empty */}
        {!loading &&
          filteredLeads.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex min-h-56 flex-col items-center justify-center text-center"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>

              <p className="text-sm font-medium text-foreground">
                No leads found
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {search
                  ? "Try searching with another name, company, source, or status."
                  : "Add your first lead to get started."}
              </p>
            </motion.div>
          )}

        {/* Footer */}
        {!loading && (
          <div className="flex items-center justify-between border-t border-border/50 py-5 text-xs text-muted-foreground">
            <span>
              {search
                ? `${filteredLeads.length} ${
                    filteredLeads.length === 1
                      ? "lead"
                      : "leads"
                  } found`
                : `Showing ${filteredLeads.length} leads`}
            </span>

            {filteredLeads.length > 0 &&
              !search && (
                <span className="font-medium text-foreground">
                  All leads
                </span>
              )}
          </div>
        )}
      </section>

      {/* Lead Detail Panel */}
      <AnimatePresence>
        {selectedLead && (
          <>
            <motion.button
              type="button"
              aria-label="Close lead details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                setSelectedLead(null)
              }
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 32,
              }}
              className="fixed right-0 top-0 z-50 flex h-dvh w-full flex-col bg-background shadow-2xl sm:max-w-md"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/50 px-5 py-4">
                <span className="text-xs font-medium text-muted-foreground">
                  Lead details
                </span>

                <button
                  type="button"
                  aria-label="Close"
                  onClick={() =>
                    setSelectedLead(null)
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Profile */}
              <div className="border-b border-border/50 px-5 py-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium">
                    {getInitials(
                      selectedLead,
                    )}
                  </div>

                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-semibold">
                      {getLeadName(
                        selectedLead,
                      )}
                    </h2>

                    <p className="truncate text-sm text-muted-foreground">
                      {selectedLead.company ||
                        "No company"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <span
                    className={`h-2 w-2 rounded-full ${getStatusColor(
                      selectedLead.status,
                    )}`}
                  />

                  <span className="text-sm text-muted-foreground">
                    {formatStatus(
                      selectedLead.status,
                    )}
                  </span>

                  <span className="ml-auto flex items-center gap-1.5 text-sm font-semibold">
                    <Sparkles className="h-4 w-4 text-cyan-500" />
                    {selectedLead.score ?? "—"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-5 py-6">
                {/* Contact */}
                <div>
                  <p className="mb-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    Contact
                  </p>

                  <div className="space-y-3">
                    {selectedLead.email && (
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />

                        <span className="truncate">
                          {selectedLead.email}
                        </span>
                      </div>
                    )}

                    {selectedLead.phone && (
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />

                        <span>
                          {selectedLead.phone}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* AI */}
                <div className="mt-8">
                  <p className="mb-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    AI insight
                  </p>

                  <div className="rounded-xl bg-muted/40 p-4">
                    <div className="flex gap-3">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" />

                      <p className="text-sm leading-6 text-muted-foreground">
                        This lead is showing
                        meaningful engagement. A
                        timely follow-up could help
                        move the conversation forward.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Activity */}
                <div className="mt-8">
                  <p className="mb-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    Recent activity
                  </p>

                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-500" />

                      <div>
                        <p className="text-sm text-foreground">
                          Lead updated
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {formatActivity(
                            selectedLead.updatedAt,
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-muted-foreground/40" />

                      <div>
                        <p className="text-sm text-foreground">
                          Lead entered the system
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {formatActivity(
                            selectedLead.createdAt,
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next action */}
                <div className="mt-8">
                  <p className="mb-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    Recommended next action
                  </p>

                  <div className="flex items-start gap-3 rounded-xl bg-muted/40 p-4">
                    <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" />

                    <div>
                      <p className="text-sm font-medium">
                        Follow up with this lead
                      </p>

                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        AI recommends acting while
                        the lead is still actively
                        engaged.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-border/50 p-4">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onEditLead(
                        selectedLead,
                      );
                      setSelectedLead(null);
                    }}
                    className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-foreground text-sm font-medium text-background"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit lead
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setDeleteLead(
                        selectedLead,
                      )
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-red-500 transition-colors hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Delete Dialog */}
      <AnimatePresence>
        {deleteLead && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.button
              type="button"
              aria-label="Close delete dialog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                !deleting &&
                setDeleteLead(null)
              }
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 8,
              }}
              className="relative z-10 w-full max-w-sm rounded-2xl border border-border bg-background p-5 shadow-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-semibold">
                    Delete lead?
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Are you sure you want to delete{" "}
                    <span className="font-medium text-foreground">
                      {getLeadName(deleteLead)}
                    </span>
                    ? This action cannot be
                    undone.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  disabled={deleting}
                  onClick={() =>
                    setDeleteLead(null)
                  }
                  className="h-9 rounded-xl px-3 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={deleting}
                  onClick={handleDelete}
                  className="inline-flex h-9 items-center gap-2 rounded-xl bg-red-500 px-3 text-xs font-medium text-white disabled:opacity-50"
                >
                  {deleting && (
                    <span className="h-3 w-3 animate-spin rounded-full border border-white/40 border-t-white" />
                  )}

                  {deleting
                    ? "Deleting..."
                    : "Delete lead"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}