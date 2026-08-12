"use client";

import {
  Bot,
  MoreHorizontal,
  Play,
  Settings2,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export default function AIAgentHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
    >
      <div>
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Bot className="h-4 w-4 text-primary" />
          </div>

          <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            AI Sales Agent
          </span>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          AI Agent
        </h1>

        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Your AI sales assistant is working continuously to engage leads,
          follow up with prospects, and move deals forward.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" className="gap-2">
          <Settings2 className="h-4 w-4" />
          Configure
        </Button>

        <Button className="gap-2">
          <Play className="h-4 w-4" />
          Run Agent
        </Button>

        <Button variant="ghost" size="icon" aria-label="More options">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  );
}