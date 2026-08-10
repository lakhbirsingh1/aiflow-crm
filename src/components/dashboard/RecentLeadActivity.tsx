"use client";

import {
  ArrowUpRight,
  Clock3,
  Flame,
  Mail,
  MousePointerClick,
  UserRound,
} from "lucide-react";
import { motion } from "framer-motion";

const recentActivities = [
  {
    initials: "RS",
    name: "Rahul Sharma",
    company: "Acme Inc. · Enterprise",
    activity: "Viewed pricing page",
    detail: "3×",
    score: 92,
    time: "2 min ago",
    type: "hot",
  },
  {
    initials: "PM",
    name: "Priya Mehta",
    company: "TechCorp · SaaS",
    activity: "Opened latest email",
    detail: "4×",
    score: 87,
    time: "18 min ago",
    type: "email",
  },
  {
    initials: "AK",
    name: "Aman Kumar",
    company: "Nova Labs · Growth",
    activity: "Viewed demo page",
    detail: "2×",
    score: 74,
    time: "42 min ago",
    type: "website",
  },
];

export default function RecentLeadActivity() {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 16,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
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
        whileHover={{ opacity: 0.07 }}
        transition={{ duration: 0.7 }}
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary blur-3xl"
      />

      <div className="relative p-5 sm:p-6">
        {/* Header */}

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />

                <span className="relative h-2 w-2 rounded-full bg-primary" />
              </span>

              <h2 className="text-[14px] font-semibold tracking-[-0.02em]">
                Recent Lead Activity
              </h2>
            </div>

            <p className="mt-1 text-[10px] text-muted-foreground">
              Actual leads and their latest behavior
            </p>
          </div>

          <motion.button
            type="button"
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="group/button flex w-fit items-center gap-1.5 rounded-lg px-2 py-1 text-[10px] font-semibold text-primary transition-colors hover:bg-primary/[0.06]"
          >
            View all activity

            <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" />
          </motion.button>
        </div>

        {/* Activity list */}

        <div className="mt-5 grid gap-2 lg:grid-cols-3">
          {recentActivities.map((lead, index) => (
            <LeadActivity
              key={lead.name}
              lead={lead}
              index={index}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function LeadActivity({
  lead,
  index,
}: {
  lead: (typeof recentActivities)[number];
  index: number;
}) {
  const isHot = lead.type === "hot";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
        scale: 0.985,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.65,
        delay: 0.18 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -2,
      }}
      className="group/lead relative overflow-hidden rounded-2xl border border-border bg-muted/[0.14] p-4 transition-colors duration-300 hover:border-primary/20 hover:bg-muted/30 hover:shadow-[0_18px_35px_-28px_hsl(var(--foreground)/0.45)]"
    >
      {/* Hover glow */}

      <motion.div
        initial={{
          opacity: 0.04,
          scale: 1,
        }}
        whileHover={{
          opacity: 0.09,
          scale: 1.15,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary blur-2xl"
      />

      <div className="relative">
        {/* Lead identity */}

        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <motion.div
              whileHover={{
                scale: 1.06,
                rotate: 2,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold ${
                isHot
                  ? "bg-red-500/10 text-red-500 ring-1 ring-red-500/15"
                  : "bg-primary/[0.08] text-primary ring-1 ring-primary/10"
              }`}
            >
              {lead.initials}
            </motion.div>

            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold">
                {lead.name}
              </p>

              <p className="mt-0.5 truncate text-[9px] text-muted-foreground">
                {lead.company}
              </p>
            </div>
          </div>

          {/* AI score */}

          <div className="shrink-0 text-right">
            <p className="text-[8px] text-muted-foreground">
              AI Score
            </p>

            <motion.p
              initial={{
                opacity: 0,
                y: 4,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.35 + index * 0.1,
                duration: 0.35,
              }}
              className={`mt-0.5 text-[13px] font-semibold ${
                isHot ? "text-red-500" : "text-foreground"
              }`}
            >
              {lead.score}
            </motion.p>
          </div>
        </div>

        {/* Activity */}

        <div className="mt-4 flex items-center gap-2">
          <motion.div
            whileHover={{
              scale: 1.08,
            }}
            transition={{
              duration: 0.2,
            }}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground shadow-sm"
          >
            {lead.type === "email" ? (
              <Mail className="h-3.5 w-3.5" />
            ) : lead.type === "website" ? (
              <MousePointerClick className="h-3.5 w-3.5" />
            ) : (
              <Flame className="h-3.5 w-3.5 text-red-500" />
            )}
          </motion.div>

          <div className="min-w-0">
            <p className="truncate text-[9px] font-medium">
              {lead.activity}
            </p>

            <p className="mt-0.5 text-[8px] text-muted-foreground">
              Recent behavior detected
            </p>
          </div>

          <motion.span
            whileHover={{
              scale: 1.05,
            }}
            transition={{
              duration: 0.2,
            }}
            className="ml-auto shrink-0 rounded-md bg-background px-1.5 py-1 text-[8px] font-semibold shadow-sm"
          >
            {lead.detail}
          </motion.span>
        </div>

        {/* Bottom metadata */}

        <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3">
          <div className="flex items-center gap-1.5 text-[8px] text-muted-foreground">
            <Clock3 className="h-3 w-3" />
            {lead.time}
          </div>

          {isHot ? (
            <motion.span
              initial={{
                opacity: 0,
                x: 4,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.45 + index * 0.1,
                duration: 0.3,
              }}
              className="flex items-center gap-1 text-[8px] font-semibold text-red-500"
            >
              <Flame className="h-3 w-3" />
              High intent
            </motion.span>
          ) : (
            <span className="flex items-center gap-1 text-[8px] font-medium text-muted-foreground">
              <UserRound className="h-3 w-3" />
              Active lead
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}