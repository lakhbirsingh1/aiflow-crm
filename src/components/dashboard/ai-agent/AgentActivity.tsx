"use client";

import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Mail,
  MessageSquare,
  Phone,
  UserPlus,
} from "lucide-react";
import { motion } from "motion/react";

const activities = [
  {
    icon: Mail,
    title: "Follow-up email sent",
    description: "AI Agent followed up with Michael Carter",
    time: "2 min ago",
    type: "Email",
  },
  {
    icon: UserPlus,
    title: "Lead qualified",
    description: "Sarah Johnson was moved to Qualified",
    time: "8 min ago",
    type: "Lead",
  },
  {
    icon: MessageSquare,
    title: "Message received",
    description: "Alex replied to the pricing conversation",
    time: "14 min ago",
    type: "Reply",
  },
  {
    icon: Phone,
    title: "Call scheduled",
    description: "Discovery call booked with Acme Corp",
    time: "26 min ago",
    type: "Call",
  },
  {
    icon: CheckCircle2,
    title: "Task completed",
    description: "AI Agent completed lead enrichment",
    time: "41 min ago",
    type: "Task",
  },
];

export default function AgentActivity() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl border bg-card p-5 shadow-sm md:p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted">
            <Bot className="h-4 w-4 text-muted-foreground" />
          </div>

          <div>
            <h2 className="font-semibold">Agent Activity</h2>
            <p className="text-xs text-muted-foreground">
              Latest actions performed by your AI agent
            </p>
          </div>
        </div>

        <button
          type="button"
          className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          View all
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mt-6 divide-y">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <motion.div
              key={`${activity.title}-${index}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.06,
              }}
              className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium">{activity.title}</p>

                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                    {activity.type}
                  </span>
                </div>

                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {activity.description}
                </p>
              </div>

              <span className="shrink-0 text-[11px] text-muted-foreground">
                {activity.time}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}