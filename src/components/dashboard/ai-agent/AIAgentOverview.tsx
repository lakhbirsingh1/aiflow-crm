"use client";

import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Clock3,
  MessageSquare,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const metrics = [
  {
    title: "Tasks Completed",
    value: "1,284",
    change: "+18.6%",
    icon: CheckCircle2,
  },
  {
    title: "Leads Engaged",
    value: "426",
    change: "+24.8%",
    icon: MessageSquare,
  },
  {
    title: "Response Rate",
    value: "68.4%",
    change: "+7.2%",
    icon: Zap,
  },
  {
    title: "Time Saved",
    value: "42.8h",
    change: "+12.4%",
    icon: Clock3,
  },
];

export default function AIAgentOverview() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;

        return (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: index * 0.06,
            }}
            className="rounded-2xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md md:p-5"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="flex items-center gap-1 text-xs font-medium text-emerald-500">
                <ArrowUpRight className="h-3.5 w-3.5" />
                {metric.change}
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs text-muted-foreground">
                {metric.title}
              </p>

              <p className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">
                {metric.value}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}