"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CircleDollarSign,
  MoreHorizontal,
  Sparkles,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

const stats = [
  {
    title: "Total Leads",
    value: "12,486",
    change: "+18.2%",
    description: "vs last month",
    positive: true,
    icon: Users,
    color: "blue",
    bars: [35, 48, 42, 58, 52, 68, 74, 82, 78, 92],
  },
  {
    title: "Active Deals",
    value: "1,284",
    change: "+12.5%",
    description: "vs last month",
    positive: true,
    icon: BriefcaseBusiness,
    color: "violet",
    bars: [28, 38, 34, 46, 42, 56, 52, 66, 72, 78],
  },
  {
    title: "Revenue",
    value: "$84,240",
    change: "+24.8%",
    description: "vs last month",
    positive: true,
    icon: CircleDollarSign,
    color: "emerald",
    bars: [32, 42, 38, 50, 46, 58, 64, 60, 76, 88],
  },
  {
    title: "AI Conversion",
    value: "68.4%",
    change: "-3.2%",
    description: "vs last month",
    positive: false,
    icon: Sparkles,
    color: "amber",
    bars: [82, 76, 78, 70, 74, 68, 72, 64, 66, 60],
  },
];

const colorStyles = {
  blue: {
    icon: "bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400",
    glow: "group-hover:shadow-blue-500/10",
    bar: "bg-blue-200/10 dark:bg-blue-400",
    ring: "group-hover:border-blue-500/20",
  },

  violet: {
    icon:
      "bg-violet-500/10 text-violet-600 dark:bg-violet-400/10 dark:text-violet-400",
    glow: "group-hover:shadow-violet-500/10",
    ring: "group-hover:border-violet-500/20",
  },

  emerald: {
    icon:
      "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400",
    glow: "group-hover:shadow-emerald-500/10",
    ring: "group-hover:border-emerald-500/20",
  },

  amber: {
    icon:
      "bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400",
    glow: "group-hover:shadow-amber-500/10",
    ring: "group-hover:border-amber-500/20",
  },
};

export default function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 relative z-1">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        const styles =
          colorStyles[stat.color as keyof typeof colorStyles];

        return (
          <motion.div
            key={stat.title}
            initial={{
              opacity: 0,
              y: 18,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.55,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Card
              className={`
                 group relative overflow-hidden
                rounded-2xl
                border border-black/[0.08] dark:border-white/[0.10]
                bg-black/[0.025] dark:bg-white/[0.045]
                backdrop-blur-2xl
                backdrop-saturate-150
                shadow-[0_8px_40px_-20px_hsl(var(--foreground)/0.25)]
                ${styles.glow}
                ${styles.ring}
              `}
            >
              {/* Ambient glow */}

              <div
                className={`
                  pointer-events-none
                  absolute
                  -right-16
                  -top-16
                  h-32
                  w-32
                  rounded-full
                  opacity-0
                  blur-3xl
                  transition-all
                  duration-700
                  group-hover:scale-150
                  group-hover:opacity-20
                `}
              />

              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-0">
                {/* Icon */}

                <div
                  className={`
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    transition-all
                    duration-500
                    group-hover:scale-110
                    group-hover:rotate-2
                    ${styles.icon}
                  `}
                >
                  <Icon
                    size={19}
                    strokeWidth={2}
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Menu */}

                <button
                  type="button"
                  title={`${stat.title} options`}
                  aria-label={`${stat.title} options`}
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    text-muted-foreground
                    opacity-60
                    transition-all
                    duration-300
                    hover:bg-muted
                    hover:text-foreground
                    hover:opacity-100
                  "
                >
                  <MoreHorizontal size={18} />
                </button>
              </CardHeader>

              <CardContent className="relative pt-5">
                {/* Label */}

                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>

                {/* Value + percentage */}

                <div className="mt-1 flex items-end justify-between gap-3">
                  <h3
                    className="
                      text-2xl
                      font-semibold
                      tracking-tight
                      text-foreground
                      transition-transform
                      duration-500
                      group-hover:translate-x-0.5
                    "
                  >
                    {stat.value}
                  </h3>

                  <div
                    className={`
                      mb-1
                      flex
                      items-center
                      gap-1
                      text-xs
                      font-semibold
                      ${stat.positive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-500 dark:text-red-400"
                      }
                    `}
                  >
                    {stat.positive ? (
                      <ArrowUpRight size={14} />
                    ) : (
                      <ArrowDownRight size={14} />
                    )}

                    {stat.change}
                  </div>
                </div>

                {/* Description */}

                <p className="mt-1 text-xs text-muted-foreground/70">
                  {stat.description}
                </p>


              </CardContent>

              {/* Animated bottom border */}

              <div
                className={`
                  absolute
                  bottom-0
                  left-1/2
                  h-[2px]
                  w-0
                  -translate-x-1/2
                  transition-all
                  duration-500
                  ease-out
                  group-hover:w-full
                `}
              />
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}