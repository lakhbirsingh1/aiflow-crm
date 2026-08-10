"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  UserRound,
} from "lucide-react";

const conversation = [
  {
    type: "ai",
    label: "AI Sales Agent",
    message:
      "Hi Rahul, I noticed your team is expanding its sales operations. Are you currently looking for a way to automate lead follow-ups?",
  },
  {
    type: "user",
    label: "Rahul",
    message:
      "Yes. We're getting a lot of leads, but our team can't follow up with everyone.",
  },
  {
    type: "ai",
    label: "AI Sales Agent",
    message:
      "That sounds like a good fit for AIFlow. I can help qualify those leads and keep follow-ups running automatically.",
  },
];

export default function AISalesAgent() {
  return (
    <section className="relative overflow-hidden py-24" id="ai-sales-agent">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="h-4 w-4" />
              AI Sales Agent
            </div>

            {/* Heading */}
            <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Your AI sales team
              <span className="text-muted-foreground">
                {" "}
                never stops.
              </span>
            </h2>

            {/* Description */}
            <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
              AIFlow can engage leads, understand their intent, answer
              questions, qualify prospects, and follow up automatically —
              while your team stays in control.
            </p>

            {/* Points */}
            <div className="mt-8 space-y-4">
              {[
                "Personalized lead conversations",
                "Automatic qualification and follow-ups",
                "Human handoff when needed",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-foreground" />

                  <span className="text-sm text-foreground">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Bottom note */}
            <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Brain className="h-4 w-4" />
              AI works alongside your sales team, not instead of it.
            </div>
          </motion.div>

          {/* Right — Conversation UI */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl
                border border-black/[0.08] dark:border-white/[0.10]
                bg-black/[0.025] dark:bg-white/[0.045]
                backdrop-blur-2xl
                backdrop-saturate-150
                shadow-[0_8px_40px_-20px_hsl(var(--foreground)/0.25)] shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground">
                    <Sparkles className="h-4 w-4 text-background" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-card-foreground">
                      AI Sales Agent
                    </p>

                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                  Lead #1042
                </div>
              </div>

              {/* Conversation */}
              <div className="space-y-5 p-5">
                {conversation.map((message, index) => {
                  const isAI = message.type === "ai";

                  return (
                    <motion.div
                      key={message.message}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.45,
                        delay: 0.25 + index * 0.15,
                      }}
                      className={`flex gap-3 ${
                        isAI ? "" : "flex-row-reverse"
                      }`}
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                        {isAI ? (
                          <Sparkles className="h-4 w-4" />
                        ) : (
                          <UserRound className="h-4 w-4" />
                        )}
                      </div>

                      <div
                        className={`max-w-[80%] ${
                          isAI ? "" : "text-right"
                        }`}
                      >
                        <p className="mb-1 text-xs font-medium text-muted-foreground">
                          {message.label}
                        </p>

                        <div
                          className={`rounded-2xl border border-border px-4 py-3 text-sm leading-6 ${
                            isAI
                              ? "rounded-tl-md bg-muted"
                              : "rounded-tr-md bg-background"
                          }`}
                        >
                          {message.message}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* AI status */}
              <div className="border-t border-border px-5 py-4">
                <div className="flex items-center gap-3 rounded-xl bg-muted p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
                    <MessageCircle className="h-4 w-4 text-background" />
                  </div>

                  <div className="flex-1">
                    <p className="text-xs font-semibold text-foreground">
                      AI is analyzing the conversation
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Intent: High · Qualification: In progress
                    </p>
                  </div>

                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}