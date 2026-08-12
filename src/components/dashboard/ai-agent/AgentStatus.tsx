"use client";

import {
  Activity,
  BrainCircuit,
  CheckCircle2,
  Circle,
  PauseCircle,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const capabilities = [
  {
    label: "Lead qualification",
    enabled: true,
  },
  {
    label: "Email follow-ups",
    enabled: true,
  },
  {
    label: "Lead enrichment",
    enabled: true,
  },
  {
    label: "Meeting scheduling",
    enabled: true,
  },
  {
    label: "Deal recommendations",
    enabled: false,
  },
];

export default function AgentStatus() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.08 }}
      className="rounded-2xl border bg-card p-5 shadow-sm md:p-6"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
            <Activity className="h-4 w-4 text-emerald-500" />

            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-500" />
          </div>

          <div>
            <h2 className="font-semibold">Agent Status</h2>
            <p className="text-xs text-muted-foreground">
              AI Agent is actively working
            </p>
          </div>
        </div>

        <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-500">
          Active
        </span>
      </div>

      <div className="mt-6 rounded-xl border bg-muted/30 p-4">
        <div className="flex items-center gap-3">
          <BrainCircuit className="h-5 w-5 text-primary" />

          <div>
            <p className="text-sm font-medium">Sales Agent v2.4</p>
            <p className="text-[11px] text-muted-foreground">
              Autonomous mode enabled
            </p>
          </div>
        </div>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "84%" }}
            transition={{ duration: 0.8 }}
            className="h-full rounded-full bg-primary"
          />
        </div>

        <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
          <span>Current workload</span>
          <span>84%</span>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs font-medium text-muted-foreground">
          Capabilities
        </p>

        <div className="mt-3 space-y-3">
          {capabilities.map((capability) => (
            <div
              key={capability.label}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                {capability.enabled ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground" />
                )}

                <span className="text-xs">{capability.label}</span>
              </div>

              <span className="text-[10px] text-muted-foreground">
                {capability.enabled ? "Enabled" : "Off"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t pt-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Zap className="h-3.5 w-3.5" />
          Next run in 4 min
        </div>

        <button
          type="button"
          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          <PauseCircle className="h-3.5 w-3.5" />
          Pause
        </button>
      </div>
    </motion.section>
  );
}