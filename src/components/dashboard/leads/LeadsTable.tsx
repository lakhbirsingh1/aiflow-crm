
"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  CalendarClock,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Sparkles,
  X,
} from "lucide-react";

const leads = [
  {
    initials: "SJ",
    name: "Sarah Johnson",
    company: "Acme Inc.",
    email: "sarah@acme.com",
    phone: "+1 415 555 0182",
    source: "Website",
    status: "Qualified",
    owner: "You",
    activity: "2m ago",
    score: 92,
    lastAction: "Viewed pricing page",
    nextAction: "Schedule a product call",
  },
  {
    initials: "MC",
    name: "Michael Chen",
    company: "Northstar Labs",
    email: "michael@northstar.io",
    phone: "+1 415 555 0148",
    source: "LinkedIn",
    status: "New",
    owner: "You",
    activity: "8m ago",
    score: 87,
    lastAction: "Opened your outreach email",
    nextAction: "Send personalized follow-up",
  },
  {
    initials: "EC",
    name: "Emily Carter",
    company: "Vertex Systems",
    email: "emily@vertex.com",
    phone: "+1 415 555 0164",
    source: "Referral",
    status: "Contacted",
    owner: "Alex",
    activity: "14m ago",
    score: 81,
    lastAction: "Replied to sales message",
    nextAction: "Continue conversation",
  },
  {
    initials: "DM",
    name: "David Miller",
    company: "Brightline",
    email: "david@brightline.co",
    phone: "+1 415 555 0117",
    source: "Website",
    status: "Qualified",
    owner: "You",
    activity: "21m ago",
    score: 79,
    lastAction: "Visited product comparison",
    nextAction: "Share relevant case study",
  },
  {
    initials: "OB",
    name: "Olivia Brown",
    company: "NovaTech",
    email: "olivia@novatech.com",
    phone: "+1 415 555 0193",
    source: "Campaign",
    status: "New",
    owner: "Alex",
    activity: "32m ago",
    score: 76,
    lastAction: "Downloaded product guide",
    nextAction: "Start first conversation",
  },
  {
    initials: "JW",
    name: "James Wilson",
    company: "Orbit Labs",
    email: "james@orbitlabs.com",
    phone: "+1 415 555 0132",
    source: "Import",
    status: "Contacted",
    owner: "You",
    activity: "45m ago",
    score: 72,
    lastAction: "Opened follow-up email",
    nextAction: "Follow up tomorrow",
  },
  {
    initials: "ED",
    name: "Emma Davis",
    company: "Cloudline",
    email: "emma@cloudline.io",
    phone: "+1 415 555 0175",
    source: "Website",
    status: "Nurturing",
    owner: "Alex",
    activity: "1h ago",
    score: 68,
    lastAction: "Read product documentation",
    nextAction: "Check engagement next week",
  },
];

type LeadsTableProps = {
  search: string;
};

export default function LeadsTable({ search }: LeadsTableProps) {
  const [selectedLead, setSelectedLead] = useState<
    (typeof leads)[number] | null
  >(null);

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return leads;
    }

    return leads.filter((lead) =>
      [
        lead.name,
        lead.company,
        lead.email,
        lead.source,
        lead.status,
        lead.owner,
      ].some((value) => value.toLowerCase().includes(query))
    );
  }, [search]);

  return (
    <>
      <section className="min-w-0">
        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-[2fr_1.2fr_1fr_1fr_1fr_80px] gap-4 border-b border-border/50 px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              <span>Lead</span>
              <span>Source</span>
              <span>Status</span>
              <span>Owner</span>
              <span>Last activity</span>
              <span>AI</span>
            </div>

            <AnimatePresence mode="popLayout">
              {filteredLeads.map((lead, index) => (
                <motion.button
                  key={lead.email}
                  type="button"
                  layout
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{
                    delay: index * 0.03,
                    duration: 0.25,
                  }}
                  onClick={() => setSelectedLead(lead)}
                  className="grid w-full grid-cols-[2fr_1.2fr_1fr_1fr_1fr_80px] items-center gap-4 border-b border-border/40 px-4 py-4 text-left transition-colors hover:bg-muted/30"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                      {lead.initials}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">
                        {lead.name}
                      </p>

                      <p className="truncate text-xs text-muted-foreground">
                        {lead.company}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs text-muted-foreground">
                    {lead.source}
                  </span>

                  <div className="flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        lead.status === "Qualified"
                          ? "bg-emerald-500"
                          : lead.status === "New"
                            ? "bg-blue-500"
                            : lead.status === "Nurturing"
                              ? "bg-violet-500"
                              : "bg-amber-500"
                      }`}
                    />

                    <span className="text-xs text-muted-foreground">
                      {lead.status}
                    </span>
                  </div>

                  <span className="text-xs text-muted-foreground">
                    {lead.owner}
                  </span>

                  <span className="text-xs text-muted-foreground">
                    {lead.activity}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-cyan-500" />

                    <span className="text-xs font-semibold text-foreground">
                      {lead.score}
                    </span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile */}
        <div className="divide-y divide-border/40 md:hidden">
          <AnimatePresence mode="popLayout">
            {filteredLeads.map((lead, index) => (
              <motion.button
                key={lead.email}
                type="button"
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{
                  delay: index * 0.03,
                  duration: 0.25,
                }}
                onClick={() => setSelectedLead(lead)}
                className="w-full py-4 text-left"
              >
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                    {lead.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {lead.name}
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                          {lead.company}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-1">
                        <Sparkles className="h-3.5 w-3.5 text-cyan-500" />

                        <span className="text-xs font-semibold">
                          {lead.score}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            lead.status === "Qualified"
                              ? "bg-emerald-500"
                              : lead.status === "New"
                                ? "bg-blue-500"
                                : lead.status === "Nurturing"
                                  ? "bg-violet-500"
                                  : "bg-amber-500"
                          }`}
                        />

                        {lead.status}
                      </span>

                      <span className="text-xs text-muted-foreground">
                        {lead.source}
                      </span>

                      <span className="text-xs text-muted-foreground">
                        {lead.activity}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty Search State */}
        {filteredLeads.length === 0 && (
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
              Try searching with another name, company, source, or status.
            </p>
          </motion.div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border/50 py-5 text-xs text-muted-foreground">
          <span>
            {search
              ? `${filteredLeads.length} ${
                  filteredLeads.length === 1 ? "lead" : "leads"
                } found`
              : `Showing ${filteredLeads.length} of 1,284 leads`}
          </span>

          {!search && (
            <button
              type="button"
              className="font-medium text-foreground hover:underline"
            >
              View all leads
            </button>
          )}
        </div>
      </section>

      {/* Lead Detail Panel */}
      <AnimatePresence>
        {selectedLead && (
          <>
            {/* Backdrop */}
            <motion.button
              type="button"
              aria-label="Close lead details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
            />

            {/* Panel */}
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
                  onClick={() => setSelectedLead(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Profile */}
              <div className="border-b border-border/50 px-5 py-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium">
                    {selectedLead.initials}
                  </div>

                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-semibold">
                      {selectedLead.name}
                    </h2>

                    <p className="truncate text-sm text-muted-foreground">
                      {selectedLead.company}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      selectedLead.status === "Qualified"
                        ? "bg-emerald-500"
                        : selectedLead.status === "New"
                          ? "bg-blue-500"
                          : selectedLead.status === "Nurturing"
                            ? "bg-violet-500"
                            : "bg-amber-500"
                    }`}
                  />

                  <span className="text-sm text-muted-foreground">
                    {selectedLead.status}
                  </span>

                  <span className="ml-auto flex items-center gap-1.5 text-sm font-semibold">
                    <Sparkles className="h-4 w-4 text-cyan-500" />
                    {selectedLead.score}
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
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />

                      <span className="truncate">
                        {selectedLead.email}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />

                      <span>{selectedLead.phone}</span>
                    </div>
                  </div>
                </div>

                {/* AI Insight */}
                <div className="mt-8">
                  <p className="mb-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    AI insight
                  </p>

                  <div className="rounded-xl bg-muted/40 p-4">
                    <div className="flex gap-3">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" />

                      <p className="text-sm leading-6 text-muted-foreground">
                        This lead is showing meaningful engagement. A timely
                        follow-up could help move the conversation forward.
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
                          {selectedLead.lastAction}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {selectedLead.activity}
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
                          Earlier today
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Action */}
                <div className="mt-8">
                  <p className="mb-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    Recommended next action
                  </p>

                  <div className="flex items-start gap-3 rounded-xl bg-muted/40 p-4">
                    <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" />

                    <div className="min-w-0">
                      <p className="text-sm font-medium">
                        {selectedLead.nextAction}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        AI recommends acting while the lead is still actively
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
                    className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-foreground text-sm font-medium text-background"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Contact
                  </button>

                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground transition-colors hover:bg-muted/70"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

