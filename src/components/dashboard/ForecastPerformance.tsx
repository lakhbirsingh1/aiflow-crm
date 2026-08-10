"use client";

import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";

const forecastBars = [
  { month: "May", actual: 58, forecast: 0 },
  { month: "Jun", actual: 66, forecast: 0 },
  { month: "Jul", actual: 73, forecast: 0 },
  { month: "Aug", actual: 0, forecast: 84 },
  { month: "Sep", actual: 0, forecast: 91 },
  { month: "Oct", actual: 0, forecast: 96 },
];

export default function ForecastPerformance() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative z-1 overflow-hidden   rounded-2xl
                border border-black/[0.08] dark:border-white/[0.10]
                bg-black/[0.025] dark:bg-white/[0.045]
                backdrop-blur-2xl
                backdrop-saturate-150
                shadow-[0_8px_40px_-20px_hsl(var(--foreground)/0.25)]"
    >
      {/* Ambient glow */}

      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/[0.05] blur-3xl transition-all duration-700 group-hover:bg-primary/[0.08]" />

      <div className="pointer-events-none absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-primary/[0.035] blur-3xl" />

      <div className="relative p-5 sm:p-6">
        {/* Header */}

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/[0.08] text-primary ring-1 ring-primary/10">
                <TrendingUp className="h-4 w-4" />
              </div>

              <div>
                <h2 className="text-[14px] font-semibold tracking-[-0.02em]">
                  Forecast & Performance
                </h2>

                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  AI-powered revenue outlook
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="group/filter flex w-fit items-center gap-1.5 rounded-lg border border-border bg-muted/[0.18] px-2.5 py-1.5 text-[9px] font-medium text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
          >
            Next 90 days

            <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover/filter:translate-y-0.5" />
          </button>
        </div>

        {/* Main forecast */}

        <div className="mt-6 grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          {/* Forecast value */}

          <div className="relative overflow-hidden rounded-2xl border border-primary/10 bg-primary/[0.035] p-5">
            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/[0.08] blur-2xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-semibold uppercase tracking-[0.13em] text-muted-foreground">
                  Expected revenue
                </span>

                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-background text-primary shadow-sm">
                  <CircleDollarSign className="h-3.5 w-3.5" />
                </div>
              </div>

              <div className="mt-5 flex items-end gap-2">
                <span className="text-[34px] font-semibold leading-none tracking-[-0.06em]">
                  $248K
                </span>

                <span className="mb-0.5 flex items-center gap-1 text-[9px] font-semibold text-emerald-500">
                  <TrendingUp className="h-3 w-3" />
                  +14.8%
                </span>
              </div>

              <p className="mt-2 text-[9px] leading-4 text-muted-foreground">
                AI expects revenue to outperform your current
                monthly run rate.
              </p>

              {/* Confidence */}

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-medium text-muted-foreground">
                    Forecast confidence
                  </span>

                  <span className="text-[9px] font-semibold">87%</span>
                </div>

                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "87%" }}
                    transition={{
                      duration: 0.9,
                      delay: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="h-full rounded-full bg-primary shadow-[0_0_14px_hsl(var(--primary)/0.35)]"
                  />
                </div>
              </div>

              {/* AI note */}

              <div className="mt-5 flex items-start gap-2 rounded-xl border border-border bg-background/60 p-3">
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />

                <p className="text-[8px] leading-4 text-muted-foreground">
                  Strong pipeline momentum is increasing the
                  probability of hitting your target.
                </p>
              </div>
            </div>
          </div>

          {/* Forecast visualization */}

          <div className="min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold">
                  Revenue trajectory
                </p>

                <p className="mt-0.5 text-[8px] text-muted-foreground">
                  Actual performance vs AI forecast
                </p>
              </div>

              <div className="flex items-center gap-3 text-[8px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Actual
                </span>

                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/30" />
                  Forecast
                </span>
              </div>
            </div>

            {/* Chart */}

            <div className="relative mt-6 h-[210px]">
              {/* Grid */}

              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
                {[0, 1, 2, 3, 4].map((line) => (
                  <div
                    key={line}
                    className="border-t border-dashed border-border/70"
                  />
                ))}
              </div>

              {/* Bars */}

              <div className="absolute inset-x-0 bottom-0 top-2 flex items-end justify-between gap-2 px-1">
                {forecastBars.map((item, index) => (
                  <ForecastBar
                    key={item.month}
                    item={item}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* Chart footer */}

            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              {forecastBars.map((item) => (
                <span
                  key={item.month}
                  className="text-[8px] text-muted-foreground"
                >
                  {item.month}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom insights */}

        <div className="mt-6 grid gap-2 border-t border-border pt-5 sm:grid-cols-3">
          <ForecastMetric
            label="Target"
            value="$280K"
            description="Monthly goal"
          />

          <ForecastMetric
            label="Projected"
            value="$248K"
            description="88.6% of target"
          />

          <ForecastMetric
            label="Gap"
            value="$32K"
            description="Remaining opportunity"
          />
        </div>

        {/* Footer */}

        <div className="mt-5 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-1.5 text-[8px] text-muted-foreground">
            <CalendarDays className="h-3 w-3" />
            Forecast generated today
          </div>

          <button
            type="button"
            className="group/view flex w-fit items-center gap-1 text-[9px] font-semibold text-primary"
          >
            View detailed forecast

            <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover/view:-translate-y-0.5 group-hover/view:translate-x-0.5" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}

/* =========================================================
   FORECAST BAR
========================================================= */

function ForecastBar({
  item,
  index,
}: {
  item: (typeof forecastBars)[number];
  index: number;
}) {
  const value = item.actual || item.forecast;
  const isForecast = item.forecast > 0;

  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{
        duration: 0.7,
        delay: 0.18 + index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        transformOrigin: "bottom",
      }}
      className="group/bar flex h-full flex-1 items-end justify-center"
    >
      <div
        className={`relative w-full max-w-[42px] rounded-t-xl transition-all duration-300 group-hover/bar:-translate-y-1 ${
          isForecast
            ? "bg-primary/20 ring-1 ring-primary/10"
            : "bg-primary"
        }`}
        style={{
          height: `${value * 1.7}px`,
        }}
      >
        {/* Bar indicator */}

        <div
          className={`absolute -top-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${
            isForecast ? "bg-primary/40" : "bg-primary"
          }`}
        />

        {/* Tooltip */}

        <div className="absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded-md border border-border bg-background px-1.5 py-1 text-[8px] font-semibold shadow-sm group-hover/bar:block">
          {Math.round(value * 3)}K
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   FORECAST METRIC
========================================================= */

function ForecastMetric({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="min-w-0">
      <p className="text-[9px] font-medium text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold tracking-tight">
        {value}
      </p>

      <p className="mt-0.5 text-[8px] text-muted-foreground">
        {description}
      </p>
    </div>
  );
}