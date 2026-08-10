"use client";

import { motion } from "motion/react";
import {
  ArrowUpRight,
  ChevronRight,
  Clock3,
  Flame,
  Mail,
  Sparkles,
  Zap,
} from "lucide-react";

const recommendedActions = [
  {
    icon: Flame,
    title: "Follow up with Rahul",
    description: "High buying intent detected",
    meta: "AI Score 92",
    priority: "High priority",
    tone: "hot",
  },
  {
    icon: Mail,
    title: "Email 8 warm leads",
    description: "Response probability is rising",
    meta: "68% response",
    priority: "Recommended",
    tone: "primary",
  },
  {
    icon: Zap,
    title: "Review 3 slow deals",
    description: "Deal momentum dropped this week",
    meta: "−12% velocity",
    priority: "Attention",
    tone: "warning",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function AIRecommendedActions() {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 18,
        scale: 0.985,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.65,
        ease,
      }}
      className="group relative z-1 overflow-hidden    rounded-2xl
                border border-black/[0.08] dark:border-white/[0.10]
                bg-black/[0.025] dark:bg-white/[0.045]
                backdrop-blur-2xl
                backdrop-saturate-150
                shadow-[0_8px_40px_-20px_hsl(var(--foreground)/0.25)]"
    >
      {/* Ambient AI glow */}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.1,
          delay: 0.15,
          ease,
        }}
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/[0.07] blur-3xl transition-all duration-700 group-hover:bg-primary/[0.11]"
      />

      <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-primary/[0.035] blur-3xl" />

      <div className="relative p-5 sm:p-6">
        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.12,
            ease,
          }}
          className="flex items-start justify-between gap-3"
        >
          <div>
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.45,
                  delay: 0.2,
                  ease,
                }}
                className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-primary/[0.09] text-primary ring-1 ring-primary/10"
              >
                <Sparkles className="h-4 w-4" />

                <motion.span
                  animate={{
                    opacity: [0.45, 1, 0.45],
                    scale: [0.9, 1.15, 0.9],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.7)]"
                />
              </motion.div>

              <div>
                <h2 className="text-[14px] font-semibold tracking-[-0.02em]">
                  AI Recommended Actions
                </h2>

                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  What should you do next?
                </p>
              </div>
            </div>
          </div>

          <span className="shrink-0 rounded-full border border-primary/15 bg-primary/[0.06] px-2 py-1 text-[8px] font-semibold uppercase tracking-wider text-primary">
            AI
          </span>
        </motion.div>

        {/* AI Summary */}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.25,
            ease,
          }}
          className="mt-5 rounded-2xl border border-primary/10 bg-primary/[0.045] p-3.5"
        >
          <div className="flex gap-3">
            <motion.div
              animate={{
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
              className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
            </motion.div>

            <div className="min-w-0">
              <p className="text-[10px] font-semibold">
                3 actions need your attention
              </p>

              <p className="mt-1 text-[9px] leading-4 text-muted-foreground">
                AI found high-value opportunities that are most
                likely to impact conversion today.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}

        <div className="mt-4 space-y-2">
          {recommendedActions.map((action, index) => (
            <RecommendedAction
              key={action.title}
              action={action}
              index={index}
            />
          ))}
        </div>

        {/* Footer */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.45,
            delay: 0.65,
            ease,
          }}
          className="mt-4 flex items-center justify-between border-t border-border pt-4"
        >
          <div className="flex items-center gap-1.5 text-[8px] text-muted-foreground">
            <Clock3 className="h-3 w-3" />
            Updated 2 min ago
          </div>

          <button
            type="button"
            className="group/view flex items-center gap-1 text-[9px] font-semibold text-primary"
          >
            View all actions

            <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover/view:-translate-y-0.5 group-hover/view:translate-x-0.5" />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}

function RecommendedAction({
  action,
  index,
}: {
  action: (typeof recommendedActions)[number];
  index: number;
}) {
  const Icon = action.icon;

  const iconClasses =
    action.tone === "hot"
      ? "bg-red-500/10 text-red-500 ring-red-500/10"
      : action.tone === "warning"
        ? "bg-amber-500/10 text-amber-500 ring-amber-500/10"
        : "bg-primary/[0.08] text-primary ring-primary/10";

  const priorityClasses =
    action.tone === "hot"
      ? "text-red-500"
      : action.tone === "warning"
        ? "text-amber-500"
        : "text-primary";

  return (
    <motion.button
      type="button"
      initial={{
        opacity: 0,
        x: 14,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.5,
        delay: 0.35 + index * 0.1,
        ease,
      }}
      whileHover={{
        y: -2,
      }}
      whileTap={{
        scale: 0.985,
      }}
      className="group/action relative w-full overflow-hidden rounded-2xl border border-border bg-muted/[0.13] p-3 text-left transition-colors duration-300 hover:border-primary/20 hover:bg-muted/30 hover:shadow-[0_14px_30px_-25px_hsl(var(--foreground)/0.4)]"
    >
      {/* Hover glow */}

      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-primary/[0.035] blur-2xl"
      />

      <div className="relative flex gap-3">
        {/* Icon */}

        <motion.div
          whileHover={{
            scale: 1.06,
          }}
          transition={{
            duration: 0.25,
            ease,
          }}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ring-1 ${iconClasses}`}
        >
          <Icon className="h-3.5 w-3.5" />
        </motion.div>

        {/* Content */}

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="truncate text-[10px] font-semibold">
              {action.title}
            </p>

            <ChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground transition-all duration-300 group-hover/action:translate-x-0.5 group-hover/action:text-foreground" />
          </div>

          <p className="mt-1 truncate text-[9px] text-muted-foreground">
            {action.description}
          </p>

          <div className="mt-2.5 flex items-center justify-between gap-2">
            <span
              className={`text-[8px] font-semibold ${priorityClasses}`}
            >
              {action.priority}
            </span>

            <span className="rounded-md bg-background px-1.5 py-1 text-[8px] font-medium text-muted-foreground">
              {action.meta}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}