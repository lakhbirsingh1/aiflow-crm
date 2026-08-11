
"use client";

import { motion } from "motion/react";
import { Radar, Sparkles } from "lucide-react";

export default function RadarHeader() {
  return (
    <header className="w-full">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1.5 text-xs font-medium text-cyan-600 dark:text-cyan-400"
          >
            <Radar className="h-3.5 w-3.5" />
            AI Sales Radar
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            See what&apos;s happening across your pipeline.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base"
          >
            AI monitors your sales activity and surfaces the changes,
            opportunities, and actions that deserve your attention.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>

          <Sparkles className="h-3.5 w-3.5" />

          <span>Today&apos;s scan · Updated automatically</span>
        </motion.div>
      </div>
    </header>
  );
}

