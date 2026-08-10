"use client";

import {
  ArrowUpRight,
  BarChart3,
  ChevronDown,
  CircleDollarSign,
  TrendingUp,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

const pipelineStages = [
  {
    name: "New",
    deals: 42,
    value: "$32K",
    progress: 100,
  },
  {
    name: "Qualified",
    deals: 28,
    value: "$58K",
    progress: 76,
  },
  {
    name: "Proposal",
    deals: 16,
    value: "$41K",
    progress: 54,
  },
  {
    name: "Negotiation",
    deals: 9,
    value: "$29K",
    progress: 38,
  },
  {
    name: "Won",
    deals: 7,
    value: "$24K",
    progress: 29,
  },
];

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.18 + index * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function SalesPipeline() {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="group relative z-1 overflow-hidden rounded-2xl
                border border-black/[0.08] dark:border-white/[0.10]
                bg-black/[0.025] dark:bg-white/[0.045]
                backdrop-blur-2xl
                backdrop-saturate-150
                shadow-[0_8px_40px_-20px_hsl(var(--foreground)/0.25)]"
    >
      {/* Ambient glow */}

      <motion.div
        initial={{ opacity: 0.045 }}
        whileHover={{ opacity: 0.08, scale: 1.08 }}
        transition={{ duration: 0.7 }}
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary blur-3xl"
      />

      <div className="relative p-5 sm:p-6">
        {/* Header */}

        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{
                  scale: 1.08,
                  rotate: 2,
                }}
                transition={{
                  duration: 0.25,
                  ease: "easeOut",
                }}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/[0.08] text-primary ring-1 ring-primary/10"
              >
                <BarChart3 className="h-4 w-4" />
              </motion.div>

              <div>
                <h2 className="text-[14px] font-semibold tracking-[-0.02em]">
                  Sales Pipeline
                </h2>

                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  Visual deal movement
                </p>
              </div>
            </div>
          </div>

          <motion.button
            type="button"
            whileHover={{
              y: -1,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="group/filter flex items-center gap-1.5 rounded-lg border border-border bg-muted/[0.18] px-2.5 py-1.5 text-[9px] font-medium text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
          >
            This month

            <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover/filter:translate-y-0.5" />
          </motion.button>
        </div>

        {/* Main value */}

        <div className="mt-6 flex flex-wrap items-end gap-2">
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.25,
              duration: 0.45,
              ease: "easeOut",
            }}
            className="text-[32px] font-semibold leading-none tracking-[-0.06em]"
          >
            $184.6K
          </motion.span>

          <motion.span
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.35,
              duration: 0.4,
            }}
            className="mb-0.5 flex items-center gap-1 text-[9px] font-semibold text-emerald-500"
          >
            <TrendingUp className="h-3 w-3" />
            +18.6%
          </motion.span>

          <span className="mb-0.5 text-[9px] text-muted-foreground">
            vs last month
          </span>
        </div>

        {/* Pipeline */}

        <div className="mt-7 space-y-4">
          {pipelineStages.map((stage, index) => (
            <PipelineStage
              key={stage.name}
              stage={stage}
              index={index}
            />
          ))}
        </div>

        {/* Footer summary */}

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.75,
            duration: 0.5,
            ease: "easeOut",
          }}
          className="mt-6 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{
                scale: 1.08,
              }}
              transition={{
                duration: 0.2,
              }}
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/[0.07] text-primary"
            >
              <CircleDollarSign className="h-3.5 w-3.5" />
            </motion.div>

            <div>
              <p className="text-[8px] text-muted-foreground">
                Total pipeline
              </p>

              <p className="mt-0.5 text-[10px] font-semibold">
                102 active deals
              </p>
            </div>
          </div>

          <motion.button
            type="button"
            whileHover={{
              x: 2,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="group/view flex w-fit items-center gap-1.5 text-[9px] font-semibold text-primary"
          >
            View pipeline

            <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover/view:-translate-y-0.5 group-hover/view:translate-x-0.5" />
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}

function PipelineStage({
  stage,
  index,
}: {
  stage: (typeof pipelineStages)[number];
  index: number;
}) {
  return (
    <motion.div
      custom={index}
      variants={stageVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        y: -1,
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className="group/stage"
    >
      {/* Stage information */}

      <div className="mb-1.5 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="text-[9px] font-medium text-muted-foreground">
            {stage.name}
          </span>

          <motion.span
            whileHover={{
              scale: 1.05,
            }}
            className="rounded-md border border-border bg-muted/[0.25] px-1.5 py-0.5 text-[8px] font-semibold"
          >
            {stage.deals}
          </motion.span>
        </div>

        <span className="text-[9px] font-semibold">
          {stage.value}
        </span>
      </div>

      {/* Progress track */}

      <div className="relative h-2 overflow-hidden rounded-full bg-muted/80">
        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: `${stage.progress}%`,
          }}
          transition={{
            duration: 0.85,
            delay: 0.3 + index * 0.09,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-full rounded-full bg-primary transition-[filter] duration-300 group-hover/stage:brightness-110"
        />

        {/* Highlight */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileHover={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
          }}
          className="pointer-events-none absolute inset-y-0 right-0 w-7 rounded-full bg-white/20"
        />
      </div>
    </motion.div>
  );
}