"use client";

import { motion } from "motion/react";
import { ArrowRight, Brain, MessageCircle, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Sparkles,
    title: "Bring in your leads",
    description:
      "Connect your lead sources and bring hundreds of prospects into AIFlow automatically, all in one place.",
  },
  {
    number: "02",
    icon: Brain,
    title: "AI understands and engages",
    description:
      "AI analyzes intent, scores each lead, starts personalized conversations, answers questions, and follows up automatically.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Convert the right opportunities",
    description:
      "AI identifies high-value prospects, recommends the next best action, and hands qualified leads to your sales team.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24">
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
            <Sparkles className="h-4 w-4" />
            How AIFlow works
          </div>

          <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            From lead to customer
            <span className="text-muted-foreground">
              {" "}
              with AI.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
            AIFlow handles the repetitive sales work so your team can focus
            on the opportunities that matter most.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative mt-16 grid gap-8 md:grid-cols-3">
          {/* Connecting Line */}
          <div className="absolute left-[16.66%] right-[16.66%] top-12 hidden h-px bg-border md:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                className="relative text-center"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 mx-auto flex h-24 w-24 items-center justify-center rounded-2xl
                border border-black/[0.08] dark:border-white/[0.10]
                bg-black/[0.025] dark:bg-white/[0.045]
                backdrop-blur-2xl
                backdrop-saturate-150
                shadow-[0_8px_40px_-20px_hsl(var(--foreground)/0.25)] shadow-sm"
                >
                  <Icon className="h-8 w-8 text-foreground" />
                </motion.div>

                {/* Number */}
                <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-muted-foreground">
                  STEP {step.number}
                </p>

                {/* Title */}
                <h3 className="mt-3 text-xl font-semibold text-foreground">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <motion.div
                    animate={{ x: [0, 6, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute right-0 top-10 hidden translate-x-1/2 md:block"
                  >
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}