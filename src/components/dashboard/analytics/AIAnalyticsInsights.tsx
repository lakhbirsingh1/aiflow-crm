"use client";

import {
  ArrowRight,
  Lightbulb,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";

const insights = [
  {
    icon: TrendingUp,
    title: "Revenue momentum is accelerating",
    description:
      "Revenue increased 18.4% compared with the previous 30-day period.",
    action: "View revenue trend",
  },
  {
    icon: TrendingDown,
    title: "Sales cycle improved",
    description:
      "Average time to close dropped by 12.3%, indicating faster deal progression.",
    action: "Analyze sales cycle",
  },
  {
    icon: Lightbulb,
    title: "LinkedIn is outperforming",
    description:
      "LinkedIn leads have a 27% higher conversion rate than the average source.",
    action: "Explore source",
  },
];

export default function AIAnalyticsInsights() {
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
            <h2 className="font-semibold">AI Analytics Insights</h2>
            <p className="text-xs text-muted-foreground">
              Signals automatically detected from your sales data
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
                  AI detected
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