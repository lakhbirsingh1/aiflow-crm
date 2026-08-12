"use client";

import { CalendarDays, Download, RefreshCw, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export default function AnalyticsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
    >
      <div>
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>

          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Performance Intelligence
          </span>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Analytics
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Understand your sales performance and discover what is driving growth.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" className="gap-2">
          <CalendarDays className="h-4 w-4" />
          Last 30 days
        </Button>

        <Button variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>

        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>
    </motion.div>
  );
}