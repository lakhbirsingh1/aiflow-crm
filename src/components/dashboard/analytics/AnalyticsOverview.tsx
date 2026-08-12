"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Percent,
  Target,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";

const metrics = [
  {
    title: "Revenue",
    value: "$248.6K",
    change: "+18.4%",
    positive: true,
    icon: DollarSign,
  },
  {
    title: "Win Rate",
    value: "32.8%",
    change: "+4.2%",
    positive: true,
    icon: Target,
  },
  {
    title: "Avg. Deal Size",
    value: "$12.4K",
    change: "+8.7%",
    positive: true,
    icon: TrendingUp,
  },
  {
    title: "Sales Cycle",
    value: "18.6 days",
    change: "-12.3%",
    positive: true,
    icon: Percent,
  },
];

export default function AnalyticsOverview() {
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
            className="group rounded-2xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md md:p-5"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>

              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  metric.positive ? "text-emerald-500" : "text-red-500"
                }`}
              >
                {metric.positive ? (
                  <ArrowUpRight className="h-3.5 w-3.5" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5" />
                )}

                {metric.change}
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs text-muted-foreground">{metric.title}</p>

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