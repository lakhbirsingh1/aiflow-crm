"use client";

import { motion } from "motion/react";
import {
  ArrowUpRight,
  Brain,
  CheckCircle2,
  Radar,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const updates = [
  {
    title: "Real-time Voice AI",
    description:
      "New voice capabilities could improve AIFlow's call intelligence.",
    relevance: "94%",
    impact: "High",
  },
  {
    title: "Agentic Sales Workflows",
    description:
      "Autonomous multi-step sales workflows are becoming more capable.",
    relevance: "91%",
    impact: "High",
  },
  {
    title: "Smarter Lead Prediction",
    description:
      "New AI models are improving intent and conversion prediction.",
    relevance: "86%",
    impact: "Medium",
  },
];

export default function AIRadar() {
  return (
    <section className="relative overflow-hidden py-24" id="ai-radar">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground">
            <Radar className="h-4 w-4" />
            AI Radar
          </div>

          <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            AIFlow keeps evolving
            <span className="text-muted-foreground">
              {" "}
              with AI.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
            AIFlow continuously monitors new AI and sales technologies,
            evaluates their relevance, and recommends the capabilities
            worth bringing into your workflow.
          </p>
        </motion.div>

        {/* Radar Content */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Intelligence Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-2xl
                border border-black/[0.08] dark:border-white/[0.10]
                bg-black/[0.025] dark:bg-white/[0.045]
                backdrop-blur-2xl
                backdrop-saturate-150
                shadow-[0_8px_40px_-20px_hsl(var(--foreground)/0.25)] p-8 shadow-sm"
          >
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-muted blur-3xl" />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-foreground">
                <Radar className="h-5 w-5 text-background" />
              </div>

              <h3 className="mt-6 text-2xl font-semibold">
                Always watching what's next.
              </h3>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                AIFlow filters through new AI capabilities and focuses only
                on technologies that can create real value for your sales
                operation.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Discover new AI capabilities",
                  "Evaluate business impact",
                  "Recommend useful upgrades",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0" />

                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Updates */}
          <div className="space-y-4">
            {updates.map((update, index) => (
              <motion.div
                key={update.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -4 }}
                className="rounded-2xl
                border border-black/[0.08] dark:border-white/[0.10]
                bg-black/[0.025] dark:bg-white/[0.045]
                backdrop-blur-2xl
                backdrop-saturate-150
                shadow-[0_8px_40px_-20px_hsl(var(--foreground)/0.25)] p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Brain className="h-4 w-4" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-card-foreground">
                        {update.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {update.description}
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Relevance
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {update.relevance}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Impact
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold">
                      <TrendingUp className="h-3.5 w-3.5" />
                      {update.impact}
                    </p>
                  </div>

                  <div className="rounded-full border border-border px-3 py-1.5 text-xs font-medium">
                    Recommended
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-2 text-center text-xs text-muted-foreground"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Discover → Evaluate → Experiment → Improve
        </motion.p>
      </div>
    </section>
  );
}