"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  Gauge,
  MessageCircle,
  Timer,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const performance = [
  {
    label: "Task success rate",
    value: "96.8%",
    change: "+2.4%",
    positive: true,
    icon: Gauge,
  },
  {
    label: "Avg. response time",
    value: "1.8 min",
    change: "-18.2%",
    positive: true,
    icon: Timer,
  },
  {
    label: "Engagement rate",
    value: "68.4%",
    change: "+7.2%",
    positive: true,
    icon: MessageCircle,
  },
  {
    label: "Automation score",
    value: "91/100",
    change: "+5.1%",
    positive: true,
    icon: Zap,
  },
];

export default function AgentPerformance() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.08 }}
      className="rounded-2xl border bg-card p-5 shadow-sm md:p-6"
    >
      <div>
        <h2 className="font-semibold">Agent Performance</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          How effectively your AI agent is operating
        </p>
      </div>

      <div className="mt-6 space-y-5">
        {performance.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.06,
              }}
              className="flex items-center gap-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">
                  {item.label}
                </p>

                <p className="mt-0.5 text-lg font-semibold">
                  {item.value}
                </p>
              </div>

              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  item.positive ? "text-emerald-500" : "text-red-500"
                }`}
              >
                {item.positive ? (
                  <ArrowUpRight className="h-3.5 w-3.5" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5" />
                )}

                {item.change}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border bg-muted/30 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Overall agent health
          </span>

          <span className="text-xs font-semibold text-emerald-500">
            Excellent
          </span>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "92%" }}
            transition={{ duration: 0.8 }}
            className="h-full rounded-full bg-emerald-500"
          />
        </div>

        <p className="mt-2 text-[11px] text-muted-foreground">
          Agent is operating within optimal performance parameters.
        </p>
      </div>
    </motion.section>
  );
}