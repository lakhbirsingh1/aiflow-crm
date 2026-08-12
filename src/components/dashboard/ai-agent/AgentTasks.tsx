"use client";

import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Circle,
  Clock3,
  Mail,
} from "lucide-react";
import { motion } from "motion/react";

const tasks = [
  {
    title: "Follow up with 18 warm leads",
    type: "Follow-up",
    due: "Due in 12 min",
    progress: 72,
    icon: Mail,
  },
  {
    title: "Enrich newly captured leads",
    type: "Enrichment",
    due: "Due in 28 min",
    progress: 46,
    icon: Circle,
  },
  {
    title: "Schedule discovery meetings",
    type: "Meetings",
    due: "Due in 1 hour",
    progress: 31,
    icon: CalendarClock,
  },
  {
    title: "Analyze stalled opportunities",
    type: "Analysis",
    due: "Due in 2 hours",
    progress: 18,
    icon: Clock3,
  },
];

export default function AgentTasks() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl border bg-card p-5 shadow-sm md:p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold">Agent Tasks</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Automated work currently in progress
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          All tasks
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {tasks.map((task, index) => {
          const Icon = task.icon;

          return (
            <motion.div
              key={task.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.06,
              }}
              className="rounded-xl border p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium">{task.title}</p>

                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                      {task.type}
                    </span>
                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${task.progress}%` }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.08,
                      }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">
                      {task.progress}% complete
                    </span>

                    <span className="text-[11px] text-muted-foreground">
                      {task.due}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-500/5 p-3 text-xs text-emerald-600 dark:text-emerald-400">
        <CheckCircle2 className="h-4 w-4 shrink-0" />
        24 automated tasks completed today
      </div>
    </motion.section>
  );
}