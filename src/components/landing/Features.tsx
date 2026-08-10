"use client";

import { motion } from "motion/react";
import {
  Brain,
  Zap,
  BarChart3,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Lead Intelligence",
    description:
      "Automatically understand, qualify, score, and prioritize every lead based on intent, behavior, and potential value.",
  },
  {
    icon: Zap,
    title: "AI Sales Agent",
    description:
      "Let AI start conversations, answer questions, qualify prospects, handle objections, and follow up automatically.",
  },
  {
    icon: BarChart3,
    title: "Predictive Sales Intelligence",
    description:
      "Predict conversion probability, identify deals at risk, forecast revenue, and surface your highest-value opportunities.",
  },
  {
    icon: Workflow,
    title: "Smart Automation",
    description:
      "Automate lead routing, personalized outreach, follow-ups, meeting booking, and sales workflows without manual work.",
  },
  {
    icon: Sparkles,
    title: "AI Research & Next Best Action",
    description:
      "Research leads and companies automatically, then tell your sales team exactly what to do next and why.",
  },
  {
    icon: ShieldCheck,
    title: "Human + AI Control",
    description:
      "Keep your team in control with permissions, human handoffs, approval rules, audit trails, and secure AI actions.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          id="features"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            AI-powered sales intelligence
          </div>

          <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Your leads.
            <span className="text-muted-foreground">
              {" "}
              Managed by AI.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
            AIFlow helps your team understand leads, automate conversations,
            prioritize opportunities, and turn more prospects into customers.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl
                border border-black/[0.08] dark:border-white/[0.10]
                bg-black/[0.025] dark:bg-white/[0.045]
                backdrop-blur-2xl
                backdrop-saturate-150
                shadow-[0_8px_40px_-20px_hsl(var(--foreground)/0.25)] p-6 transition-shadow duration-300 hover:shadow-xl"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-foreground text-background"
                >
                  <Icon className="h-5 w-5" />
                </motion.div>

                {/* Content */}
                <h3 className="mt-6 text-lg font-semibold text-card-foreground">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>

                {/* Bottom line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 h-px bg-border"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}