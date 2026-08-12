"use client";

import { ArrowUpRight, Users } from "lucide-react";
import { motion } from "motion/react";

const salesPeople = [
  {
    name: "Alex Morgan",
    initials: "AM",
    revenue: "$62.4K",
    deals: 24,
    conversion: "38%",
  },
  {
    name: "Sarah Wilson",
    initials: "SW",
    revenue: "$54.8K",
    deals: 21,
    conversion: "35%",
  },
  {
    name: "David Chen",
    initials: "DC",
    revenue: "$48.2K",
    deals: 19,
    conversion: "32%",
  },
  {
    name: "Maya Patel",
    initials: "MP",
    revenue: "$41.6K",
    deals: 17,
    conversion: "29%",
  },
];

export default function SalesPerformance() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl border bg-card p-5 shadow-sm md:p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted">
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>

          <div>
            <h2 className="font-semibold">Sales Performance</h2>
            <p className="text-xs text-muted-foreground">
              Top performing representatives
            </p>
          </div>
        </div>

        <button
          type="button"
          className="text-xs font-medium text-primary hover:underline"
        >
          View all
        </button>
      </div>

      <div className="mt-6 overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-[1.5fr_0.8fr_0.6fr_0.7fr] gap-4 border-b pb-3 text-[11px] uppercase tracking-wider text-muted-foreground">
            <span>Representative</span>
            <span>Revenue</span>
            <span>Deals</span>
            <span>Conversion</span>
          </div>

          <div className="divide-y">
            {salesPeople.map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.06,
                }}
                className="grid grid-cols-[1.5fr_0.8fr_0.6fr_0.7fr] items-center gap-4 py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                    {person.initials}
                  </div>

                  <div>
                    <p className="text-sm font-medium">{person.name}</p>
                    <p className="text-[11px] text-muted-foreground">
                      Sales representative
                    </p>
                  </div>
                </div>

                <span className="text-sm font-medium">
                  {person.revenue}
                </span>

                <span className="text-sm text-muted-foreground">
                  {person.deals}
                </span>

                <span className="flex items-center gap-1 text-sm font-medium text-emerald-500">
                  {person.conversion}
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}