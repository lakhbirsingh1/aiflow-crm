"use client";

import { Filter, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

const funnel = [
  {
    label: "Total Leads",
    value: "4,280",
    percentage: 100,
  },
  {
    label: "Qualified",
    value: "2,140",
    percentage: 72,
  },
  {
    label: "Proposal",
    value: "986",
    percentage: 48,
  },
  {
    label: "Negotiation",
    value: "524",
    percentage: 31,
  },
  {
    label: "Won",
    value: "284",
    percentage: 18,
  },
];

export default function ConversionFunnel() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.08 }}
      className="rounded-2xl border bg-card p-5 shadow-sm md:p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted">
            <Filter className="h-4 w-4 text-muted-foreground" />
          </div>

          <div>
            <h2 className="font-semibold">Conversion Funnel</h2>
            <p className="text-xs text-muted-foreground">
              Lead progression
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-medium text-emerald-500">
          <TrendingUp className="h-3.5 w-3.5" />
          4.2%
        </div>
      </div>

      <div className="mt-7 space-y-5">
        {funnel.map((item, index) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{item.label}</span>

              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">
                  {item.value}
                </span>
                <span className="text-muted-foreground">
                  {item.percentage}%
                </span>
              </div>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                className="h-full rounded-full bg-primary"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 rounded-xl border bg-muted/30 p-4">
        <p className="text-xs text-muted-foreground">
          Overall conversion
        </p>

        <div className="mt-1 flex items-end gap-2">
          <span className="text-2xl font-semibold">6.6%</span>
          <span className="mb-1 text-xs font-medium text-emerald-500">
            +1.8%
          </span>
        </div>
      </div>
    </motion.section>
  );
}