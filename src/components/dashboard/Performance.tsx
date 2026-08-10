"use client";

import {
  ArrowUpRight,
  CheckCircle2,
  MessageCircle,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { motion } from "motion/react";

const performanceData = [
  {
    label: "Conversion",
    value: "68.4%",
    change: "+8.2%",
    progress: 68,
    icon: Target,
  },
  {
    label: "Response rate",
    value: "68.2%",
    change: "+5.6%",
    progress: 68,
    icon: MessageCircle,
  },
  {
    label: "Win rate",
    value: "42.8%",
    change: "+6.4%",
    progress: 43,
    icon: Trophy,
  },
];

export default function Performance() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group relative z-1 overflow-hidden
        rounded-2xl
                border border-black/[0.08] dark:border-white/[0.10]
                bg-black/[0.025] dark:bg-white/[0.045]
                backdrop-blur-2xl
                backdrop-saturate-150
                shadow-[0_8px_40px_-20px_hsl(var(--foreground)/0.25)]
      "
    >
      {/* Ambient glow */}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          delay: 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-56
          w-56
          rounded-full
          bg-primary/[0.055]
          blur-3xl
          transition-all
          duration-700
          group-hover:bg-primary/[0.08]
        "
      />

      <div className="relative p-5 sm:p-6">
        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.12,
          }}
          className="flex items-start justify-between gap-3"
        >
          <div>
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{
                  scale: 1.08,
                  rotate: 3,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-xl
                  bg-primary/[0.08]
                  text-primary
                  ring-1
                  ring-primary/10
                "
              >
                <TrendingUp className="h-4 w-4" />
              </motion.div>

              <div>
                <h2 className="text-[14px] font-semibold tracking-[-0.02em]">
                  Performance
                </h2>

                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  Sales efficiency this period
                </p>
              </div>
            </div>
          </div>

          <motion.button
            type="button"
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.96 }}
            className="
              group/view
              flex
              items-center
              gap-1
              text-[9px]
              font-semibold
              text-primary
            "
          >
            Details

            <ArrowUpRight
              className="
                h-3
                w-3
                transition-transform
                duration-300
                group-hover/view:-translate-y-0.5
                group-hover/view:translate-x-0.5
              "
            />
          </motion.button>
        </motion.div>

        {/* Main performance score */}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            delay: 0.22,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mt-6
            rounded-2xl
            border
            border-border
            bg-muted/[0.13]
            p-4
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.13em] text-muted-foreground">
                Overall performance
              </p>

              <div className="mt-2 flex items-end gap-2">
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.35,
                  }}
                  className="
                    text-[30px]
                    font-semibold
                    leading-none
                    tracking-[-0.06em]
                  "
                >
                  84
                </motion.span>

                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.45,
                  }}
                  className="
                    mb-0.5
                    flex
                    items-center
                    gap-1
                    text-[9px]
                    font-semibold
                    text-emerald-500
                  "
                >
                  <TrendingUp className="h-3 w-3" />
                  +12.4%
                </motion.span>
              </div>
            </div>

            {/* Circular score */}

            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.65,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex h-14 w-14 items-center justify-center"
            >
              <svg
                className="absolute inset-0 h-full w-full -rotate-90"
                viewBox="0 0 56 56"
                aria-hidden="true"
              >
                <circle
                  cx="28"
                  cy="28"
                  r="23"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-primary/10"
                />

                <motion.circle
                  cx="28"
                  cy="28"
                  r="23"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="144.5"
                  className="text-primary"
                  initial={{
                    strokeDashoffset: 144.5,
                  }}
                  animate={{
                    strokeDashoffset: 23.1,
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </svg>

              <span className="relative text-[10px] font-semibold">
                84%
              </span>
            </motion.div>
          </div>

          {/* Main progress */}

          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "84%" }}
              transition={{
                duration: 0.9,
                delay: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                h-full
                rounded-full
                bg-primary
                shadow-[0_0_12px_hsl(var(--primary)/0.35)]
              "
            />
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-[8px] text-muted-foreground">
              Current score
            </span>

            <span className="text-[8px] font-medium">
              Excellent
            </span>
          </div>
        </motion.div>

        {/* Metrics */}

        <div className="mt-4 space-y-2">
          {performanceData.map((item, index) => (
            <PerformanceMetric
              key={item.label}
              item={item}
              index={index}
            />
          ))}
        </div>

        {/* Bottom insight */}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{
            y: -1,
          }}
          className="
            mt-4
            flex
            gap-3
            rounded-2xl
            border
            border-primary/10
            bg-primary/[0.04]
            p-3.5
            transition-colors
            duration-300
            hover:bg-primary/[0.06]
          "
        >
          <motion.div
            whileHover={{
              scale: 1.08,
            }}
            className="
              flex
              h-7
              w-7
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-primary/10
              text-primary
            "
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
          </motion.div>

          <div>
            <p className="text-[9px] font-semibold">
              Performance is trending upward
            </p>

            <p className="mt-1 text-[8px] leading-4 text-muted-foreground">
              Your strongest improvement is coming from
              faster lead response and higher-quality
              opportunities.
            </p>
          </div>
        </motion.div>

        {/* Footer */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.45,
            delay: 0.8,
          }}
          className="
            mt-4
            flex
            items-center
            justify-between
            border-t
            border-border
            pt-4
          "
        >
          <span className="text-[8px] text-muted-foreground">
            Compared with previous period
          </span>

          <span className="flex items-center gap-1 text-[8px] font-semibold text-emerald-500">
            <TrendingUp className="h-3 w-3" />
            Improving
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
}

function PerformanceMetric({
  item,
  index,
}: {
  item: (typeof performanceData)[number];
  index: number;
}) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 10,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.5,
        delay: 0.35 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        x: 2,
        borderColor: "hsl(var(--primary) / 0.15)",
      }}
      className="
        group/metric
        flex
        items-center
        gap-3
        rounded-xl
        border
        border-border
        bg-muted/[0.1]
        p-3
        transition-colors
        duration-300
        hover:bg-muted/25
      "
    >
      {/* Icon */}

      <motion.div
        whileHover={{
          scale: 1.08,
          rotate: 2,
        }}
        transition={{
          duration: 0.2,
        }}
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-primary/[0.07]
          text-primary
          transition-colors
          duration-300
          group-hover/metric:bg-primary/10
        "
      >
        <Icon className="h-3.5 w-3.5" />
      </motion.div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[9px] font-medium text-muted-foreground">
            {item.label}
          </p>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-semibold">
              {item.value}
            </span>

            <span className="text-[8px] font-semibold text-emerald-500">
              {item.change}
            </span>
          </div>
        </div>

        {/* Metric progress */}

        <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${item.progress}%`,
            }}
            transition={{
              duration: 0.8,
              delay: 0.55 + index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              h-full
              rounded-full
              bg-primary/70
              transition-colors
              duration-500
              group-hover/metric:bg-primary
            "
          />
        </div>
      </div>
    </motion.div>
  );
}