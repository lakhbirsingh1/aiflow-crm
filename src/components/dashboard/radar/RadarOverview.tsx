
"use client";

import { motion } from "motion/react";
import {
  Activity,
  ArrowUpRight,
  BrainCircuit,
  Clock3,
  RefreshCw,
  Sparkles,
  Users,
} from "lucide-react";

const detectedItems = [
  {
    name: "Sarah Johnson",
    company: "Acme Inc.",
    activity: "Returned to pricing after viewing the demo",
    time: "2m",
    score: 92,
  },
  {
    name: "Northstar Labs",
    company: "Enterprise account",
    activity: "Downloaded the enterprise product guide",
    time: "8m",
    score: 87,
  },
  {
    name: "John Smith",
    company: "Vertex Systems",
    activity: "Opened multiple messages within a short period",
    time: "14m",
    score: 81,
  },
  {
    name: "Maya Patel",
    company: "Brightline",
    activity: "Returned to the product experience",
    time: "19m",
    score: 79,
  },
  {
    name: "David Miller",
    company: "Atlas Digital",
    activity: "Revisited product information",
    time: "27m",
    score: 76,
  },
  {
    name: "Olivia Carter",
    company: "NovaTech",
    activity: "Spent increased time comparing plans",
    time: "34m",
    score: 74,
  },
  {
    name: "James Wilson",
    company: "Orbit Labs",
    activity: "Re-engaged after several inactive days",
    time: "41m",
    score: 71,
  },
  {
    name: "Emma Davis",
    company: "Cloudline",
    activity: "Opened the latest sales communication",
    time: "49m",
    score: 68,
  },
  {
    name: "Robert Taylor",
    company: "ScaleWorks",
    activity: "Returned to product documentation",
    time: "56m",
    score: 65,
  },
  {
    name: "Daniel Brown",
    company: "Momentum AI",
    activity: "Increased activity across multiple touchpoints",
    time: "1h",
    score: 63,
  },
  {
    name: "Sophia Wilson",
    company: "LaunchPad",
    activity: "Revisited the solution overview",
    time: "1h",
    score: 61,
  },
  {
    name: "Michael Clark",
    company: "Peak Systems",
    activity: "Engaged with recent sales content",
    time: "1h",
    score: 58,
  },
];

export default function RadarOverview() {
  return (
    <section className="relative w-full overflow-hidden">

      {/* Ambient background */}
      <div className="pointer-events-none absolute left-1/2 top-[32%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-500/[0.035] blur-3xl dark:bg-cyan-400/[0.025]" />

      {/* Header row */}
      <div className="relative flex items-center justify-between border-b border-border/50 pb-4">

        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
          </span>

          <span className="text-xs font-medium text-muted-foreground">
            Daily intelligence scan
          </span>
        </div>

        <motion.button
          type="button"
          whileHover={{ rotate: 20 }}
          whileTap={{ scale: 0.9 }}
          title="Refresh scan"
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </motion.button>
      </div>

      {/* Main */}
      <div className="relative mt-8 flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.72fr)] lg:gap-12 xl:gap-20">

        {/* ============================================================= */}
        {/* RADAR */}
        {/* ============================================================= */}

        <motion.div
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          transition={{
            delay: 3,
            duration: 1,
            ease: "easeInOut",
          }}
          className="flex min-h-[470px] flex-col items-center justify-center sm:min-h-[520px] lg:min-h-[600px]"
        >
          {/* Radar */}
          <div className="relative h-[245px] w-[245px] sm:h-[300px] sm:w-[300px] lg:h-[350px] lg:w-[350px]">

            {/* Rings */}
            <div className="absolute inset-0 rounded-full border border-foreground/[0.07]" />

            <div className="absolute inset-[14%] rounded-full border border-foreground/[0.07]" />

            <div className="absolute inset-[28%] rounded-full border border-foreground/[0.07]" />

            <div className="absolute inset-[41%] rounded-full border border-cyan-500/15" />

            {/* Horizontal / vertical grid */}
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-foreground/[0.045]" />

            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-foreground/[0.045]" />

            {/* Diagonal grid */}
            <div className="absolute left-1/2 top-1/2 h-[141%] w-px -translate-x-1/2 -translate-y-1/2 rotate-45 bg-foreground/[0.025]" />

            <div className="absolute left-1/2 top-1/2 h-[141%] w-px -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-foreground/[0.025]" />

            {/* Sweep */}
            <motion.div
              initial={{
                opacity: 0,
                rotate: 0,
              }}
              animate={{
                opacity: 1,
                rotate: 360,
              }}
              transition={{
                opacity: {
                  delay: 3,
                  duration: 0.5,
                },
                rotate: {
                  delay: 3,
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
              className="absolute inset-0 rounded-full"
            >
              {/* Soft echo */}
              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-1/2
                  w-14
                  -translate-x-1/2
                  origin-top
                  bg-gradient-to-r
                  from-transparent
                  via-cyan-400/10
                  to-cyan-400/30
                  blur-8
                "
              />

              {/* Main echo */}
              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-1/2
                  w-6
                  -translate-x-1/2
                  origin-top
                  bg-gradient-to-r
                  from-transparent
                  via-cyan-400/20
                  to-cyan-400/55
                  blur-[3px]
                "
              />

              {/* Sweep */}
              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-1/2
                  w-px
                  -translate-x-1/2
                  origin-top
                  bg-cyan-400
                  shadow-[0_0_14px_rgba(34,211,238,0.8)]
                "
              />
            </motion.div>

            {/* Signals */}
            <RadarPoint
              className="left-[25%] top-[24%]"
              color="bg-emerald-500"
              glow="shadow-[0_0_18px_rgba(16,185,129,0.8)]"
              delay={3.2}
            />

            <RadarPoint
              className="right-[18%] top-[38%]"
              color="bg-amber-500"
              glow="shadow-[0_0_18px_rgba(245,158,11,0.8)]"
              delay={3.45}
              small
            />

            <RadarPoint
              className="bottom-[22%] left-[45%]"
              color="bg-violet-500"
              glow="shadow-[0_0_18px_rgba(139,92,246,0.8)]"
              delay={3.7}
              small
            />

            <RadarPoint
              className="bottom-[31%] right-[28%]"
              color="bg-cyan-400"
              glow="shadow-[0_0_18px_rgba(34,211,238,0.8)]"
              delay={3.9}
              small
            />

            {/* Center */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                left-1/2
                top-1/2
                z-10
                flex
                h-14
                w-14
                -translate-x-1/2
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-cyan-500/20
                bg-background/80
                shadow-[0_0_30px_rgba(34,211,238,0.08)]
                backdrop-blur-sm
                sm:h-16
                sm:w-16
              "
            >
              <Activity className="h-6 w-6 text-cyan-500" />
            </motion.div>
          </div>

          {/* Radar status */}
          <div className="relative mt-9 min-h-[72px] w-full max-w-[340px] text-center">

            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{
                delay: 2.7,
                duration: 0.35,
              }}
              className="absolute inset-x-0 top-0"
            >
              <p className="text-sm font-medium text-foreground">
                Radar is actively scanning
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Monitoring sales activity in real time
              </p>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 3,
                duration: 0.5,
              }}
              className="absolute inset-x-0 top-0"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.7)]" />

                <p className="text-sm font-medium text-foreground">
                  Sales signals detected
                </p>
              </div>

              <p className="mt-1 text-xs text-muted-foreground">
                AI found 12 changes that need attention
              </p>
            </motion.div>
          </div>

          {/* Initial search indicator */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{
              delay: 2.7,
              duration: 0.35,
            }}
            className="pointer-events-none mt-1"
          >
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground/70">
              <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
              Searching across today&apos;s activity
            </div>
          </motion.div>
        </motion.div>

        {/* ============================================================= */}
        {/* INTELLIGENCE FEED */}
        {/* ============================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            x: 35,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
          }}
          transition={{
            delay: 3,
            duration: 0.85,
            ease: "easeOut",
          }}
          className="relative mt-8 min-w-0 lg:mt-0"
        >
          {/* Feed heading */}
          <div className="flex items-start justify-between pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-foreground">
                  What AI found
                </h3>

                <span className="text-[10px] text-muted-foreground">
                  12
                </span>
              </div>

              <p className="mt-1 text-xs text-muted-foreground">
                Recent changes across your pipeline
              </p>
            </div>

            <Users className="mt-0.5 h-4 w-4 text-muted-foreground/70" />
          </div>

          {/* Feed */}
          <div className="relative h-[430px] sm:h-[480px] lg:h-[520px]">

            {/* Top fade */}
            <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-12 bg-gradient-to-b from-background to-transparent" />

            {/* Bottom fade */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-14 bg-gradient-to-t from-background to-transparent" />

            <div
              className="
                h-full
                overflow-y-auto
                pr-2
                [scrollbar-width:thin]
                [scrollbar-color:hsl(var(--muted-foreground)/0.25)_transparent]
                [&::-webkit-scrollbar]:w-1
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-muted-foreground/25
              "
            >
              <div>
                {detectedItems.map((item, index) => (
                  <motion.div
                    key={`${item.name}-${index}`}
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 3.05 + index * 0.045,
                      duration: 0.35,
                    }}
                    className="
                      group
                      relative
                      flex
                      gap-3
                      py-4
                      transition-colors
                      hover:bg-muted/[0.25]
                      sm:gap-4
                    "
                  >
                    {/* Timeline */}
                    <div className="relative flex w-5 shrink-0 justify-center">

                      <div className="absolute bottom-[-16px] top-7 w-px bg-border/50" />

                      <div className="relative z-10 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-background">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            index === 0
                              ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.7)]"
                              : index % 3 === 1
                                ? "bg-amber-500"
                                : "bg-cyan-500"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">

                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium text-foreground">
                            {item.name}
                          </p>

                          <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
                            {item.company}
                          </p>
                        </div>

                        <span className="shrink-0 text-[10px] text-muted-foreground/70">
                          {item.time}
                        </span>
                      </div>

                      <div className="mt-2 flex items-start gap-2">
                        <BrainCircuit className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-500/70" />

                        <p className="text-xs leading-5 text-foreground/70">
                          {item.activity}
                        </p>
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground">
                          AI confidence
                        </span>

                        <span className="text-[10px] font-medium text-cyan-600 dark:text-cyan-400">
                          {item.score}%
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom insight */}
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 3.5,
          duration: 0.5,
        }}
        className="
          relative
          mt-8
          flex
          flex-col
          gap-4
          border-t
          border-border/50
          pt-5
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div className="flex min-w-0 items-start gap-3">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" />

          <div className="min-w-0">
            <p className="text-xs font-medium text-foreground">
              AI continuously analyzes your sales activity
            </p>

            <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
              New intelligence is surfaced automatically as your pipeline
              changes.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <span className="hidden items-center gap-2 text-[10px] text-muted-foreground sm:flex">
            <Clock3 className="h-3.5 w-3.5" />
            Updated today
          </span>

          <motion.button
            type="button"
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-1.5 text-[11px] font-medium text-foreground"
          >
            View intelligence
            <ArrowUpRight className="h-3.5 w-3.5" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Radar Point                                                                */
/* -------------------------------------------------------------------------- */

function RadarPoint({
  className,
  color,
  glow,
  delay,
  small = false,
}: {
  className: string;
  color: string;
  glow: string;
  delay: number;
  small?: boolean;
}) {
  return (
    <motion.span
      initial={{
        opacity: 0,
        scale: 0.3,
      }}
      animate={{
        opacity: [0, 1, 0.65, 1],
        scale: [0.3, 1, 0.8, 1],
      }}
      transition={{
        delay,
        duration: 0.8,
        repeat: Infinity,
        repeatType: "mirror",
      }}
      className={`absolute ${
        small ? "h-2.5 w-2.5" : "h-3 w-3"
      } rounded-full ${color} ${glow} ${className}`}
    />
  );
}

