"use client";

import { motion } from "motion/react";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    description: "For small teams getting started with AI-powered sales.",
    price: "$29",
    period: "per month",
    features: [
      "Up to 500 leads",
      "AI lead scoring",
      "AI lead qualification",
      "Basic AI conversations",
      "Automated follow-ups",
      "Lead pipeline",
      "Basic analytics",
    ],
    button: "Start Free Trial",
  },
  {
    name: "Growth",
    description: "For growing teams that want AI to handle more of their sales.",
    price: "$79",
    period: "per month",
    features: [
      "Up to 5,000 leads",
      "Everything in Starter",
      "AI Sales Agent",
      "Personalized outreach",
      "AI lead research",
      "Next best action",
      "Advanced analytics",
      "Team collaboration",
    ],
    button: "Start Growing",
    popular: true,
  },
  {
    name: "Scale",
    description: "For teams running high-volume AI-powered sales operations.",
    price: "$199",
    period: "per month",
    features: [
      "Up to 25,000 leads",
      "Everything in Growth",
      "Advanced AI automation",
      "Predictive sales intelligence",
      "AI call intelligence",
      "Custom AI workflows",
      "Priority AI processing",
      "Advanced permissions & controls",
    ],
    button: "Contact Sales",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24">
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
            Simple, scalable pricing
          </div>

          <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Scale your sales
            <span className="text-muted-foreground">
              {" "}
              with AI.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
            Start small, automate more, and scale your AI-powered sales
            operation as your business grows.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="mx-auto mt-16 grid max-w-6xl gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{ y: -6 }}
              className={`relative flex flex-col rounded-2xl
                border border-black/[0.08] dark:border-white/[0.10]
                bg-black/[0.025] dark:bg-white/[0.045]
                backdrop-blur-2xl
                backdrop-saturate-150
                shadow-[0_8px_40px_-20px_hsl(var(--foreground)/0.25)] p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl ${
                plan.popular
                  ? "border-foreground bg-card"
                  : "border-border bg-card"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-foreground px-4 py-1 text-xs font-semibold text-background">
                  Most Popular
                </div>
              )}

              {/* Plan */}
              <h3 className="text-lg font-semibold text-card-foreground">
                {plan.name}
              </h3>

              <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mt-6 flex items-end gap-2">
                <span className="text-4xl font-semibold tracking-tight text-card-foreground">
                  {plan.price}
                </span>

                <span className="pb-1 text-sm text-muted-foreground">
                  {plan.period}
                </span>
              </div>

              {/* Button */}
              <Button
                size="lg"
                variant={plan.popular ? "default" : "outline"}
                className="mt-7 h-11 w-full rounded-lg"
              >
                {plan.button}
              </Button>

              {/* Divider */}
              <div className="my-7 h-px bg-border" />

              {/* Features */}
              <div className="space-y-4">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted">
                      <Check className="h-3 w-3 text-foreground" />
                    </div>

                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}