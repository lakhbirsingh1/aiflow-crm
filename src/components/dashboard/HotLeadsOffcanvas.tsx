"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Flame,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import type { HotLead } from "./HotLeadCarousel";

type HotLeadsOffcanvasProps = {
  open: boolean;
  onClose: () => void;
  leads: HotLead[];
};

export function HotLeadsOffcanvas({
  open,
  onClose,
  leads,
}: HotLeadsOffcanvasProps) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (open) {
      setMounted(true);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true);
        });
      });

      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);

      const timer = setTimeout(() => {
        setMounted(false);
      }, 450);

      document.body.style.overflow = "";

      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [open, onClose]);

  const filteredLeads = leads.filter((lead) => {
    const query = search.toLowerCase().trim();

    if (!query) return true;

    return (
      lead.name.toLowerCase().includes(query) ||
      lead.company.toLowerCase().includes(query) ||
      lead.segment.toLowerCase().includes(query)
    );
  });

  if (!mounted) return null;

  return (
    <>
      {/* =================================================
          BACKDROP
      ================================================== */}

      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-[90] bg-black/30 backdrop-blur-[2px] transition-all duration-[450ms] ease-out ${
          visible
            ? "opacity-100"
            : "opacity-0"
        }`}
      />

      {/* =================================================
          OFFCANVAS
      ================================================== */}

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Hot Leads"
        className={`fixed inset-y-0 right-0 z-[100] flex w-full max-w-[900px] flex-col border-l border-border bg-background shadow-[-25px_0_70px_-35px_hsl(var(--foreground)/0.45)] transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          visible
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* =================================================
            HEADER
        ================================================== */}

        <div
          className={`shrink-0 border-b border-border px-5 py-5 transition-all duration-500 delay-100 sm:px-6 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/15 bg-red-500/[0.07]">
                <Flame className="h-4 w-4 text-red-500" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-[15px] font-semibold tracking-tight">
                    Hot Leads
                  </h2>

                  <span className="rounded-full border border-red-500/15 bg-red-500/[0.06] px-2 py-0.5 text-[9px] font-semibold text-red-500">
                    {leads.length} detected
                  </span>
                </div>

                <p className="mt-1 text-[10px] text-muted-foreground">
                  Leads showing the strongest buying intent
                </p>
              </div>
            </div>

            <button
              type="button"
              aria-label="Close hot leads"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground active:scale-95"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Search */}

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search hot leads..."
                className="h-9 w-full rounded-xl border border-border bg-muted/20 pl-9 pr-3 text-[10px] outline-none transition-all placeholder:text-muted-foreground focus:border-primary/30 focus:bg-background focus:ring-2 focus:ring-primary/10"
              />
            </div>

            <button
              type="button"
              className="flex h-9 items-center justify-center gap-2 rounded-xl border border-border bg-muted/20 px-3 text-[10px] font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground active:scale-[0.98]"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
            </button>
          </div>
        </div>

        {/* =================================================
            TABLE
        ================================================== */}

        <div className="min-h-0 flex-1 overflow-auto">
          <table className="w-full min-w-[760px] border-collapse">
            <thead className="sticky top-0 z-10 bg-background/95 backdrop-blur-xl">
              <tr className="border-b border-border text-left">
                <th className="px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground sm:px-6">
                  Lead
                </th>

                <th className="px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Company
                </th>

                <th className="px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Intent
                </th>

                <th className="px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  AI Score
                </th>

                <th className="px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Activity
                </th>

                <th className="px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Active
                </th>

                <th className="px-4 py-3" />
              </tr>
            </thead>

            <tbody>
              {filteredLeads.map((lead, index) => (
                <tr
                  key={lead.id}
                  className={`group border-b border-border/70 transition-all duration-500 hover:bg-muted/30 ${
                    visible
                      ? "translate-x-0 opacity-100"
                      : "translate-x-5 opacity-0"
                  }`}
                  style={{
                    transitionDelay: visible
                      ? `${150 + index * 35}ms`
                      : "0ms",
                  }}
                >
                  {/* Lead */}

                  <td className="px-5 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/[0.08] text-[10px] font-bold text-primary ring-1 ring-primary/10">
                        {lead.initials}
                      </div>

                      <div>
                        <p className="text-[11px] font-semibold">
                          {lead.name}
                        </p>

                        <p className="mt-0.5 text-[9px] text-muted-foreground">
                          {lead.segment}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Company */}

                  <td className="px-4 py-4">
                    <p className="text-[10px] font-medium">
                      {lead.company}
                    </p>
                  </td>

                  {/* Intent */}

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[8px] font-semibold ${
                        lead.intent === "Very Hot"
                          ? "border-red-500/20 bg-red-500/10 text-red-500"
                          : "border-orange-500/20 bg-orange-500/10 text-orange-500"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {lead.intent}
                    </span>
                  </td>

                  {/* AI Score */}

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-semibold">
                        {lead.score}
                      </span>

                      <div className="h-1 w-12 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-700"
                          style={{
                            width: `${lead.score}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Activity */}

                  <td className="px-4 py-4">
                    <div>
                      <p className="text-[9px] font-medium">
                        {lead.activity}
                      </p>

                      <p className="mt-0.5 text-[8px] text-muted-foreground">
                        {lead.activityValue}
                      </p>
                    </div>
                  </td>

                  {/* Active */}

                  <td className="px-4 py-4">
                    <span className="whitespace-nowrap text-[9px] text-muted-foreground">
                      {lead.lastActive}
                    </span>
                  </td>

                  {/* Action */}

                  <td className="px-4 py-4">
                    <button
                      type="button"
                      aria-label={`View ${lead.name}`}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-muted-foreground opacity-70 transition-all hover:border-primary/20 hover:bg-primary/[0.06] hover:text-primary group-hover:opacity-100"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredLeads.length === 0 && (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="text-center">
                <Search className="mx-auto h-5 w-5 text-muted-foreground" />

                <p className="mt-3 text-xs font-semibold">
                  No hot leads found
                </p>

                <p className="mt-1 text-[10px] text-muted-foreground">
                  Try another name or company.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* =================================================
            FOOTER
        ================================================== */}

        <div
          className={`shrink-0 border-t border-border bg-muted/[0.08] px-5 py-3 transition-all duration-500 delay-200 sm:px-6 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0"
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-[9px] text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filteredLeads.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-foreground">
                {leads.length}
              </span>{" "}
              hot leads
            </p>

            <div className="flex items-center gap-2 text-[9px] text-muted-foreground">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              AI intelligence live
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}