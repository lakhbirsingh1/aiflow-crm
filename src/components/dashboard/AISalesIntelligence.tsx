
"use client";

import { motion } from "motion/react";
import {
  Activity,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  MessageSquare,
  Sparkles,
  Target,
  TrendingUp,
  UserPlus,
  Zap,
} from "lucide-react";
import { HotLeadCarousel } from "./HotLeadCarousel";

const ease = [0.22, 1, 0.36, 1] as const;

type AISalesIntelligenceProps = {
  onViewAllLeads: () => void;
};

const AI_SCORE = 40;
const CIRCUMFERENCE = 2 * Math.PI * 68;
const SCORE_OFFSET = CIRCUMFERENCE - (CIRCUMFERENCE * AI_SCORE) / 100;

const activityItems = [
  {
    icon: UserPlus,
    title: "New high-intent lead detected",
    description: "Acme Inc. showed strong buying signals",
    time: "2m ago",
    type: "lead",
  },
  {
    icon: MessageSquare,
    title: "Positive reply detected",
    description: "Sarah replied to your latest outreach",
    time: "8m ago",
    type: "reply",
  },
  {
    icon: TrendingUp,
    title: "Pipeline momentum increased",
    description: "3 opportunities moved forward",
    time: "14m ago",
    type: "momentum",
  },
  {
    icon: Zap,
    title: "Follow-up recommended",
    description: "2 leads are entering their ideal contact window",
    time: "21m ago",
    type: "action",
  },
];

export default function AISalesIntelligence({
  onViewAllLeads,
}: AISalesIntelligenceProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.7,
        ease,
      }}
      className="relative z-1 mt-4 overflow-hidden rounded-2xl border border-black/[0.08] bg-black/[0.025] shadow-[0_8px_40px_-20px_hsl(var(--foreground)/0.25)] backdrop-blur-2xl backdrop-saturate-150 dark:border-white/[0.10] dark:bg-white/[0.045]"
    >
      {/* Background glow */}

      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.2,
          delay: 0.1,
          ease,
        }}
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/[0.08] blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.2,
          delay: 0.25,
        }}
        className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-primary/[0.05] blur-3xl"
      />

      {/* =================================================
          HEADER
      ================================================== */}

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.1,
          ease,
        }}
        className="relative flex flex-col gap-4 border-b border-border px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.18,
              ease,
            }}
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/15 bg-primary/[0.08] shadow-[0_0_30px_-10px_hsl(var(--primary)/0.5)]"
          >
            <BrainCircuit className="h-[19px] w-[19px] text-primary" />

            <motion.span
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.9, 1.15, 0.9],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full border-2 border-card bg-emerald-500"
            >
              <span className="h-1 w-1 rounded-full bg-white" />
            </motion.span>
          </motion.div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[15px] font-semibold tracking-[-0.02em]">
                AI Sales Intelligence
              </h2>

              <span className="inline-flex items-center gap-1 rounded-full border border-primary/15 bg-primary/[0.06] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-primary">
                <Sparkles className="h-2.5 w-2.5" />
                Live AI
              </span>
            </div>

            <p className="mt-1 text-xs text-muted-foreground">
              AI is continuously analyzing your sales activity
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.3,
            ease,
          }}
          className="flex w-fit items-center gap-2 rounded-xl border border-border bg-muted/30 px-3 py-2"
        >
          <span className="relative flex h-2 w-2">
            <motion.span
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute inline-flex h-full w-full rounded-full bg-emerald-500"
            />

            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>

          <span className="text-[10px] font-medium text-muted-foreground">
            Intelligence updated 2m ago
          </span>

          <Clock3 className="ml-1 h-3 w-3 text-muted-foreground" />
        </motion.div>
      </motion.div>

      {/* =================================================
          MAIN CONTENT
      ================================================== */}

      <div className="relative grid lg:grid-cols-[1.15fr_0.85fr]">
        {/* =================================================
            LEFT — SALES HEALTH
        ================================================== */}

        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.65,
            delay: 0.18,
            ease,
          }}
          className="border-b border-border p-5 lg:border-b-0 lg:border-r lg:p-7"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Sales intelligence score
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Overall health of your sales motion
              </p>
            </div>

            <span className="shrink-0 rounded-lg border border-emerald-500/15 bg-emerald-500/[0.06] px-2.5 py-1.5 text-[9px] font-semibold text-emerald-500">
              Strong
            </span>
          </div>

          {/* Score + performance */}

          <div className="mt-7 flex flex-col gap-7 sm:flex-row sm:items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease,
              }}
              className="relative flex h-40 w-40 shrink-0 items-center justify-center"
            >
              <div className="absolute inset-0 rounded-full border border-primary/10" />

              <div className="absolute inset-[8px] rounded-full border border-primary/[0.08]" />

              <div className="absolute inset-[16px] rounded-full bg-primary/[0.045] shadow-[inset_0_0_30px_hsl(var(--primary)/0.08)]" />

              <svg
                className="absolute inset-0 h-full w-full -rotate-90"
                viewBox="0 0 160 160"
                aria-hidden="true"
              >
                <circle
                  cx="80"
                  cy="80"
                  r="68"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-primary/[0.08]"
                />

                <motion.circle
                  cx="80"
                  cy="80"
                  r="68"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="text-primary"
                  initial={{
                    strokeDasharray: CIRCUMFERENCE,
                    strokeDashoffset: CIRCUMFERENCE,
                  }}
                  animate={{
                    strokeDasharray: CIRCUMFERENCE,
                    strokeDashoffset: SCORE_OFFSET,
                  }}
                  transition={{
                    duration: 1.4,
                    delay: 0.35,
                    ease,
                  }}
                />
              </svg>

              <div className="relative text-center">
                <motion.p
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6,
                    ease,
                  }}
                  className="text-[38px] font-semibold leading-none tracking-[-0.06em]"
                >
                  {AI_SCORE}
                </motion.p>

                <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.13em] text-muted-foreground">
                  AI Score
                </p>
              </div>

              <motion.div
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-0 top-5 flex h-7 w-7 items-center justify-center rounded-lg border border-primary/15 bg-card shadow-sm"
              >
                <Sparkles className="h-3.5 w-3.5 text-primary" />
              </motion.div>
            </motion.div>

            <div className="min-w-0 flex-1">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.45,
                  ease,
                }}
                className="flex flex-wrap items-end gap-x-2 gap-y-1"
              >
                <span className="text-2xl font-semibold tracking-[-0.04em]">
                  +18.6%
                </span>

                <span className="mb-1 flex items-center gap-1 text-[10px] font-semibold text-emerald-500">
                  <TrendingUp className="h-3 w-3" />
                  vs last period
                </span>
              </motion.div>

              <p className="mt-2 max-w-sm text-[11px] leading-5 text-muted-foreground">
                Your pipeline is showing stronger buying intent and faster
                movement than the previous period.
              </p>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[9px] font-medium text-muted-foreground">
                    Momentum
                  </span>

                  <span className="text-[9px] font-semibold">78 / 100</span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "78%" }}
                    transition={{
                      duration: 0.9,
                      delay: 0.55,
                      ease,
                    }}
                    className="h-full rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.45)]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Metrics */}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.55,
              ease,
            }}
            className="mt-8 grid grid-cols-3 border-t border-border pt-5"
          >
            <MiniMetric
              icon={Target}
              label="Win probability"
              value="72%"
              change="+8.2%"
            />

            <MiniMetric
              icon={TrendingUp}
              label="Pipeline"
              value="$184.6K"
              change="+18.6%"
              className="border-l border-border pl-4"
            />

            <MiniMetric
              icon={Zap}
              label="Velocity"
              value="+22.4%"
              change="Strong"
              className="border-l border-border pl-4"
            />
          </motion.div>

          {/* =================================================
              LIVE AI ACTIVITY
          ================================================== */}

          <LiveActivityTimeline />
        </motion.div>

        {/* =================================================
            RIGHT — AI SIGNAL
        ================================================== */}

        <motion.div
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.65,
            delay: 0.25,
            ease,
          }}
          className="relative overflow-hidden bg-muted/[0.16] p-5 lg:p-7"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.35,
              ease,
            }}
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/[0.09] blur-3xl"
          />

          <div className="relative">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />

                  <p className="text-xs font-semibold">AI Signal</p>
                </div>

                <p className="mt-1 text-[10px] text-muted-foreground">
                  Highest intent detected right now
                </p>
              </div>

              <motion.span
                animate={{
                  opacity: [0.75, 1, 0.75],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-[9px] font-semibold text-red-500"
              >
                HOT LEADS
              </motion.span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.45,
                ease,
              }}
            >
              <HotLeadCarousel onViewAllLeads={onViewAllLeads} />
            </motion.div>

            {/* AI recommendation */}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.65,
                ease,
              }}
              className="mt-5 rounded-xl border border-primary/10 bg-background/40 p-3.5"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/[0.08]">
                  <BrainCircuit className="h-3.5 w-3.5 text-primary" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[10px] font-semibold">
                      AI recommendation
                    </p>

                    <span className="text-[8px] font-medium text-muted-foreground">
                      Just now
                    </span>
                  </div>

                  <p className="mt-1 text-[9px] leading-4 text-muted-foreground">
                    Follow up while intent is high. This lead has shown
                    multiple buying signals in the last hour.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* =================================================
          AI INSIGHTS
      ================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.55,
          delay: 0.5,
          ease,
        }}
        className="border-t border-border bg-muted/[0.08] px-5 py-5 lg:px-7"
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-muted-foreground">
              AI insights
            </p>

            <p className="mt-1 text-[11px] text-muted-foreground">
              What changed across your sales motion
            </p>
          </div>

          <button
            type="button"
            className="group flex items-center gap-1 text-[10px] font-semibold text-primary transition-all hover:gap-1.5"
          >
            View intelligence
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="grid gap-2 md:grid-cols-3">
          <AIInsight
            icon={TrendingUp}
            title="Lead velocity"
            value="+22.4%"
            description="Leads are moving faster"
          />

          <AIInsight
            icon={CheckCircle2}
            title="Response rate"
            value="68.2%"
            description="Above your 30-day average"
          />

          <AIInsight
            icon={Target}
            title="Revenue forecast"
            value="$248K"
            description="Expected this month"
          />
        </div>
      </motion.div>
    </motion.section>
  );
}

/* =========================================================
   LIVE ACTIVITY TIMELINE
========================================================= */

function LiveActivityTimeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: 0.7,
        ease,
      }}
      className="mt-7 border-t border-border pt-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-primary" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-muted-foreground">
              Live AI activity
            </p>

            <span className="relative flex h-1.5 w-1.5">
              <motion.span
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute inset-0 rounded-full bg-emerald-500"
              />

              <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
          </div>

          <p className="mt-1 text-[10px] text-muted-foreground">
            Real-time signals detected by AI
          </p>
        </div>

        <span className="text-[9px] font-medium text-muted-foreground">
          Live
        </span>
      </div>

      <div className="relative">
        {/* Timeline line */}

        <div className="absolute bottom-4 left-[13px] top-4 w-px bg-border" />

        <div className="space-y-0.5">
          {activityItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.75 + index * 0.08,
                  ease,
                }}
                className="group relative flex gap-3 rounded-lg py-2 transition-colors hover:bg-muted/30"
              >
                <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary shadow-sm transition-colors group-hover:border-primary/20 group-hover:bg-primary/[0.06]">
                  <Icon className="h-3 w-3" />
                </div>

                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex items-start justify-between gap-3">
                    <p className="truncate text-[10px] font-semibold">
                      {item.title}
                    </p>

                    <span className="shrink-0 text-[8px] font-medium text-muted-foreground">
                      {item.time}
                    </span>
                  </div>

                  <p className="mt-0.5 truncate text-[9px] text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   MINI METRIC
========================================================= */

function MiniMetric({
  icon: Icon,
  label,
  value,
  change,
  className = "",
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  change: string;
  className?: string;
}) {
  return (
    <div className={`min-w-0 ${className}`}>
      <div className="flex items-center gap-1.5">
        <Icon className="h-3 w-3 text-primary" />

        <p className="truncate text-[9px] font-medium text-muted-foreground">
          {label}
        </p>
      </div>

      <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
        <span className="text-sm font-semibold tracking-tight">
          {value}
        </span>

        <span className="text-[8px] font-semibold text-emerald-500">
          {change}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   AI INSIGHT
========================================================= */

function AIInsight({
  icon: Icon,
  title,
  value,
  description,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      transition={{
        duration: 0.25,
        ease,
      }}
      className="group flex min-w-0 items-center gap-3 rounded-xl border border-border bg-background/40 p-3 transition-colors duration-300 hover:border-primary/15 hover:bg-background/70"
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/[0.07] text-primary">
        <Icon className="h-3.5 w-3.5" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10px] font-semibold">{title}</p>

          <p className="text-xs font-semibold text-primary">{value}</p>
        </div>

        <p className="mt-0.5 truncate text-[9px] text-muted-foreground">
          {description}
        </p>
      </div>

      <ArrowUpRight className="h-3 w-3 shrink-0 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
    </motion.div>
  );
}

