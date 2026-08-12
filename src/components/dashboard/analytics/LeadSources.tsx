"use client";

import { Globe2 } from "lucide-react";
import { motion } from "motion/react";

const sources = [
  {
    name: "Organic Search",
    value: 34,
    leads: "1,454",
  },
  {
    name: "LinkedIn",
    value: 26,
    leads: "1,113",
  },
  {
    name: "Email",
    value: 18,
    leads: "770",
  },
  {
    name: "Referral",
    value: 13,
    leads: "556",
  },
  {
    name: "Other",
    value: 9,
    leads: "387",
  },
];

export default function LeadSources() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.08 }}
      className="rounded-2xl border bg-card p-5 shadow-sm md:p-6"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted">
          <Globe2 className="h-4 w-4 text-muted-foreground" />
        </div>

        <div>
          <h2 className="font-semibold">Lead Sources</h2>
          <p className="text-xs text-muted-foreground">
            Where your opportunities come from
          </p>
        </div>
      </div>

      <div className="mt-7 space-y-5">
        {sources.map((source, index) => (
          <div key={source.name}>
            <div className="mb-2 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{source.name}</p>
                <p className="text-[11px] text-muted-foreground">
                  {source.leads} leads
                </p>
              </div>

              <span className="text-sm font-semibold">{source.value}%</span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${source.value}%` }}
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
    </motion.section>
  );
}