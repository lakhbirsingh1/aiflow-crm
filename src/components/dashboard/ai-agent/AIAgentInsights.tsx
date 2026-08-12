"use client";

import {
  ArrowRight,
  Lightbulb,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";

const insights = [
  {
    icon: Target,
    title: "Prioritize warm leads",
    description:
      "18 leads have shown strong buying signals in the last 24 hours. The agent recommends immediate follow-up.",
    action: "View leads",
  },
  {
    icon: TrendingUp,
    title: "Response rate is improving",
    description:
      "AI-generated follow-ups are receiving 7.2% more responses than your previous campaigns.",
    action: "See performance",
  },
  {
    icon: Lightbulb,
    title: "Best engagement window",
    description:
      "Your prospects are most responsive between 10 AM and 1 PM. The agent can prioritize this window.",
    action: "Optimize schedule",
  },
];

export default function AIAgentInsights() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="overflow-hidden rounded-2xl border bg-card shadow-sm"
    >
      <div className="border-b p-5 md:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>

          <div>
            <h2 className="font-semibold">AI Agent Insights</h2>
            <p className="text-xs text-muted-foreground">
              Recommendations generated from current sales activity
            </p>
          </div>
        </div>
      </div>

      <div className="grid divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
        {insights.map((insight, index) => {
          const Icon = insight.icon;

          return (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.08,
              }}
              className="group p-5 transition-colors hover:bg-muted/30 md:p-6"
            >
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" />

                <span className="text-xs font-medium text-primary">
                  AI recommendation
                </span>
              </div>

              <h3 className="mt-4 text-sm font-semibold">
                {insight.title}
              </h3>

              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {insight.description}
              </p>

              <button
                type="button"
                className="mt-5 flex items-center gap-1.5 text-xs font-medium text-foreground transition-colors group-hover:text-primary"
              >
                {insight.action}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}