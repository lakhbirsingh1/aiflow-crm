"use client";

import { BarChart3, MoreHorizontal } from "lucide-react";
import { motion } from "motion/react";

const revenue = [
  { month: "Jan", value: 42 },
  { month: "Feb", value: 54 },
  { month: "Mar", value: 48 },
  { month: "Apr", value: 71 },
  { month: "May", value: 64 },
  { month: "Jun", value: 82 },
  { month: "Jul", value: 94 },
];

export default function RevenueChart() {
  const max = Math.max(...revenue.map((item) => item.value));

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl border bg-card p-5 shadow-sm md:p-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>

            <div>
              <h2 className="font-semibold">Revenue & Pipeline</h2>
              <p className="text-xs text-muted-foreground">
                Monthly performance overview
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="More options"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-6 flex items-end gap-2">
        <span className="text-3xl font-semibold tracking-tight">$248.6K</span>
        <span className="mb-1 text-xs font-medium text-emerald-500">
          +18.4%
        </span>
      </div>

      <div className="mt-8">
        <div className="flex h-[250px] items-end gap-3 md:gap-5">
          {revenue.map((item, index) => {
            const height = (item.value / max) * 100;

            return (
              <div
                key={item.month}
                className="flex h-full flex-1 flex-col justify-end"
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.07,
                    ease: "easeOut",
                  }}
                  className="relative w-full rounded-t-lg bg-primary/15 transition-colors hover:bg-primary/25"
                >
                  <div className="absolute inset-x-1 bottom-0 h-[65%] rounded-t-lg bg-primary/10" />
                </motion.div>

                <span className="mt-3 text-center text-[11px] text-muted-foreground">
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-5 border-t pt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary" />
          Revenue
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary/20" />
          Pipeline
        </div>
      </div>
    </motion.section>
  );
}