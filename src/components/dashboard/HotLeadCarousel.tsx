"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Flame,
  Mail,
  MousePointerClick,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { HotLeadsOffcanvas } from "./HotLeadsOffcanvas";

export type HotLead = {
  id: number;
  initials: string;
  name: string;
  company: string;
  segment: string;
  score: number;
  intent: "Hot" | "Very Hot";
  activity: string;
  activityValue: string;
  lastActive: string;
  signals: {
    icon: typeof Mail;
    text: string;
    value: string;
  }[];
};

export const hotLeads: HotLead[] = [
  {
    id: 1,
    initials: "RS",
    name: "Rahul Sharma",
    company: "Acme Inc.",
    segment: "Enterprise",
    score: 92,
    intent: "Very Hot",
    activity: "Viewed pricing page",
    activityValue: "3×",
    lastActive: "2 min ago",
    signals: [
      {
        icon: MousePointerClick,
        text: "Viewed pricing page",
        value: "3×",
      },
      {
        icon: Mail,
        text: "Opened latest email",
        value: "4×",
      },
    ],
  },
  {
    id: 2,
    initials: "PM",
    name: "Priya Mehta",
    company: "TechCorp",
    segment: "Enterprise",
    score: 89,
    intent: "Very Hot",
    activity: "Opened latest email",
    activityValue: "4×",
    lastActive: "18 min ago",
    signals: [
      {
        icon: Mail,
        text: "Opened latest email",
        value: "4×",
      },
      {
        icon: MousePointerClick,
        text: "Returned to product",
        value: "2×",
      },
    ],
  },
  {
    id: 3,
    initials: "AK",
    name: "Aman Kumar",
    company: "Nova Labs",
    segment: "Growth",
    score: 87,
    intent: "Hot",
    activity: "Viewed demo page",
    activityValue: "3×",
    lastActive: "42 min ago",
    signals: [
      {
        icon: MousePointerClick,
        text: "Viewed demo page",
        value: "3×",
      },
      {
        icon: Mail,
        text: "Replied to email",
        value: "1×",
      },
    ],
  },
  {
    id: 4,
    initials: "NK",
    name: "Neha Kapoor",
    company: "FinEdge",
    segment: "Enterprise",
    score: 85,
    intent: "Hot",
    activity: "Visited pricing",
    activityValue: "2×",
    lastActive: "1h ago",
    signals: [
      {
        icon: MousePointerClick,
        text: "Visited pricing",
        value: "2×",
      },
      {
        icon: Mail,
        text: "Opened proposal email",
        value: "3×",
      },
    ],
  },
  {
    id: 5,
    initials: "RS",
    name: "Rohit Singh",
    company: "Vertex Labs",
    segment: "Growth",
    score: 83,
    intent: "Hot",
    activity: "Viewed product page",
    activityValue: "5×",
    lastActive: "1h ago",
    signals: [
      {
        icon: MousePointerClick,
        text: "Viewed product page",
        value: "5×",
      },
      {
        icon: Mail,
        text: "Opened email",
        value: "2×",
      },
    ],
  },
];

export function HotLeadCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAllLeads, setShowAllLeads] = useState(false);

  const hasMultipleLeads = hotLeads.length > 1;
  const lead = hotLeads[activeIndex];

  /*
   * =========================================================
   * AUTO CAROUSEL
   * =========================================================
   */

  useEffect(() => {
    if (!hasMultipleLeads) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % hotLeads.length);
    }, 3600);

    return () => {
      window.clearInterval(timer);
    };
  }, [hasMultipleLeads]);

  /*
   * =========================================================
   * NAVIGATION
   * =========================================================
   */

  function nextLead() {
    setActiveIndex(
      (current) => (current + 1) % hotLeads.length,
    );
  }

  function previousLead() {
    setActiveIndex(
      (current) =>
        (current - 1 + hotLeads.length) %
        hotLeads.length,
    );
  }

  return (
    <>
      {/* =====================================================
          LEAD AREA
      ====================================================== */}

      <div className="relative min-h-[270px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={lead.id}
            initial={{
              opacity: 0,
              scale: 0.94,
              filter: "blur(18px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.94,
              filter: "blur(18px)",
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative"
          >
            {/* Profile */}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent text-xs font-bold text-primary ring-1 ring-primary/20">
                    {lead.initials}
                  </div>

                  <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-card bg-emerald-500" />
                </motion.div>

                <div>
                  <p className="text-sm font-semibold">
                    {lead.name}
                  </p>

                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    {lead.company} · {lead.segment}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  AI Score
                </p>

                <div className="mt-0.5 flex items-baseline justify-end gap-1">
                  <motion.span
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.12,
                    }}
                    className="text-2xl font-semibold tracking-[-0.05em] text-primary"
                  >
                    {lead.score}
                  </motion.span>

                  <span className="text-[9px] text-muted-foreground">
                    /100
                  </span>
                </div>
              </div>
            </div>

            {/* Signals */}

            <div className="mt-5 grid gap-2">
              {lead.signals.map((signal, index) => {
                const Icon = signal.icon;

                return (
                  <motion.div
                    key={`${lead.id}-${index}`}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.12 + index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-center justify-between rounded-xl border border-border bg-background/50 px-3 py-2.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/[0.07] text-primary">
                        <Icon className="h-3.5 w-3.5" />
                      </div>

                      <span className="text-[10px] font-medium text-muted-foreground">
                        {signal.text}
                      </span>
                    </div>

                    <span className="text-[11px] font-semibold">
                      {signal.value}
                    </span>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-center justify-between rounded-xl border border-red-500/10 bg-red-500/[0.035] px-3 py-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/10">
                    <Flame className="h-3.5 w-3.5 text-red-500" />
                  </div>

                  <span className="text-[10px] font-medium text-muted-foreground">
                    High purchase intent
                  </span>
                </div>

                <span className="text-[11px] font-semibold text-red-500">
                  {lead.score}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      {hasMultipleLeads && (
        <div className="mt-5 flex items-center justify-end gap-2">
          <span className="mr-1 text-[9px] text-muted-foreground">
            {activeIndex + 1} / {hotLeads.length}
          </span>

          <button
            type="button"
            aria-label="Previous hot lead"
            onClick={previousLead}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background/50 text-muted-foreground transition hover:border-primary/20 hover:bg-primary/[0.05] hover:text-foreground"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            aria-label="Next hot lead"
            onClick={nextLead}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background/50 text-muted-foreground transition hover:border-primary/20 hover:bg-primary/[0.05] hover:text-foreground"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* =====================================================
          RECOMMENDED ACTION
      ====================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.55,
          delay: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-5 overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/[0.07] via-primary/[0.035] to-transparent"
      >
        <div className="relative p-4">
          <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold">
                    Recommended next action
                  </p>

                  <p className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.12em] text-primary/80">
                    Hot leads intelligence
                  </p>
                </div>

                <span className="shrink-0 rounded-full border border-primary/15 bg-primary/[0.07] px-2 py-1 text-[8px] font-semibold text-primary">
                  AI Recommended
                </span>
              </div>

              <p className="mt-3 text-[10px] leading-5 text-muted-foreground">
                You have{" "}
                <span className="font-semibold text-foreground">
                  {hotLeads.length} high-intent leads
                </span>{" "}
                showing strong buying signals. Prioritize
                follow-ups today to maximize conversion
                opportunities.
              </p>

              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-40" />
                    <span className="relative h-2 w-2 rounded-full bg-red-500" />
                  </span>

                  <span className="text-[9px] font-medium text-muted-foreground">
                    High priority
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAllLeads(true)}
                  className="group inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-[9px] font-semibold text-primary-foreground shadow-sm transition-all hover:gap-2 hover:shadow-md"
                >
                  View all hot leads

                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* =====================================================
          OFFCANVAS
      ====================================================== */}

      <HotLeadsOffcanvas
        open={showAllLeads}
        onClose={() => setShowAllLeads(false)}
        leads={hotLeads}
      />
    </>
  );
}