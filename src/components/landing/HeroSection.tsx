"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-muted blur-3xl"
      />

      <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 pb-20 pt-32 lg:grid-cols-2 lg:gap-20">
        {/* LEFT — TEXT */}
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground shadow-sm"
          >
            <Sparkles className="h-4 w-4" />
            AI-powered sales platform
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            Turn more leads
            <br />

            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.25,
              }}
              className="text-muted-foreground"
            >
              into customers with AI.
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.35,
            }}
            className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg"
          >
            AIFlow automatically qualifies leads, starts conversations,
            responds to prospects, and follows up—so your sales team can
            focus on closing the right opportunities.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.45,
            }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button
              
              size="lg"
              className="h-11 rounded-lg px-6"
            >
              <Link href="/dashboard" className="flex items-center">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              
              size="lg"
              variant="outline"
              className="h-11 rounded-lg px-6"
            >
              <Link href="#features">
                Explore Features
              </Link>
            </Button>
          </motion.div>

          {/* Small text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-5 text-xs text-muted-foreground"
          >
            Manage leads · Automate conversations · Close more deals
          </motion.p>
        </div>

        {/* RIGHT — IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            duration: 0.9,
            delay: 0.25,
            ease: "easeOut",
          }}
          className="relative mx-auto w-full max-w-xl"
        >
          {/* Floating animation */}
          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
              <Image
                src="/banner.png"
                alt="AIFlow AI-powered sales dashboard"
                width={900}
                height={650}
                priority
                className="h-auto w-full"
              />
            </div>
          </motion.div>

          {/* Floating AI card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.9,
            }}
            className="absolute -bottom-6 -left-6 hidden rounded-xl border border-border bg-card p-4 shadow-xl sm:block"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground">
                <Sparkles className="h-4 w-4 text-background" />
              </div>

              <div>
                <p className="text-sm font-semibold text-card-foreground">
                  AI Sales Agent
                </p>

                <p className="text-xs text-muted-foreground">
                  Qualifying leads...
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}