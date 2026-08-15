"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function TermsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />

        <div className="absolute bottom-[-180px] left-[-120px] h-[350px] w-[350px] rounded-full bg-primary/10 blur-[110px]" />

        <div className="absolute right-[-100px] top-[35%] h-[300px] w-[300px] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative z-20 border-b border-border/50 bg-background/60 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2"
          >
            <motion.div
              whileHover={{
                rotate: 6,
                scale: 1.05,
              }}
              transition={{
                duration: 0.2,
              }}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20"
            >
              <Sparkles className="h-4 w-4" />
            </motion.div>

            <span className="text-lg font-semibold tracking-tight">
              AIFlow
            </span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:flex"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            {mounted && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() =>
                  setTheme(
                    theme === "dark"
                      ? "light"
                      : "dark",
                  )
                }
                className="h-9 w-9 rounded-lg bg-background/70 backdrop-blur"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="relative z-10 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          {/* Heading */}
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="mb-12"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              AIFlow Legal
            </div>

            <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Terms of Service
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              These Terms of Service explain the rules and
              conditions that apply when you use AIFlow and
              its services.
            </p>

            <p className="mt-4 text-xs text-muted-foreground/70">
              Last updated: August 15, 2026
            </p>
          </motion.div>

          {/* Terms */}
          <motion.article
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              delay: 0.05,
            }}
            className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-xl shadow-black/5 backdrop-blur-xl sm:p-10"
          >
            <div className="space-y-10 text-sm leading-7 text-muted-foreground">
              {/* 1 */}
              <section>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  1. Acceptance of Terms
                </h2>

                <p>
                  By creating an account or using AIFlow,
                  you agree to these Terms of Service. If you
                  do not agree with these terms, please do not
                  use the service.
                </p>
              </section>

              {/* 2 */}
              <section>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  2. About AIFlow
                </h2>

                <p>
                  AIFlow is a workflow and customer
                  relationship management platform designed
                  to help businesses manage leads, sales
                  activities, automation, analytics, and
                  AI-powered workflows.
                </p>
              </section>

              {/* 3 */}
              <section>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  3. Your Account
                </h2>

                <p>
                  You are responsible for maintaining the
                  accuracy of the information associated with
                  your account and for keeping your login
                  credentials secure.
                </p>

                <p className="mt-3">
                  You should not share your password or
                  account credentials with unauthorized
                  individuals. You are responsible for
                  activity that occurs through your account.
                </p>
              </section>

              {/* 4 */}
              <section>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  4. Acceptable Use
                </h2>

                <p>
                  You agree to use AIFlow only for lawful
                  purposes and in a manner that does not
                  interfere with the operation or security of
                  the service.
                </p>

                <p className="mt-3">
                  You must not use AIFlow to distribute
                  malicious software, attempt unauthorized
                  access, abuse automated systems, violate
                  applicable laws, or infringe the rights of
                  others.
                </p>
              </section>

              {/* 5 */}
              <section>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  5. Your Content
                </h2>

                <p>
                  You retain ownership of the information and
                  content that you submit to AIFlow. You grant
                  AIFlow the permissions necessary to process
                  and display that content solely for providing
                  and improving the service.
                </p>
              </section>

              {/* 6 */}
              <section>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  6. AI Features
                </h2>

                <p>
                  AIFlow may provide features powered by
                  artificial intelligence. AI-generated
                  suggestions, summaries, classifications,
                  predictions, or recommendations may not
                  always be accurate.
                </p>

                <p className="mt-3">
                  You are responsible for reviewing AI-generated
                  information before relying on it for important
                  business decisions.
                </p>
              </section>

              {/* 7 */}
              <section>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  7. Third-Party Services
                </h2>

                <p>
                  AIFlow may integrate with third-party
                  services such as Google or other external
                  platforms. Your use of those services may
                  also be subject to their respective terms
                  and privacy policies.
                </p>
              </section>

              {/* 8 */}
              <section>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  8. Service Availability
                </h2>

                <p>
                  We aim to keep AIFlow available and reliable,
                  but we do not guarantee that the service will
                  always be uninterrupted, secure, or
                  error-free.
                </p>
              </section>

              {/* 9 */}
              <section>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  9. Account Suspension
                </h2>

                <p>
                  We may suspend or terminate an account if
                  necessary to protect the service, other
                  users, or if an account violates these Terms
                  of Service or applicable law.
                </p>
              </section>

              {/* 10 */}
              <section>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  10. Intellectual Property
                </h2>

                <p>
                  AIFlow, including its branding, interface,
                  software, design, and original content, is
                  protected by applicable intellectual property
                  laws. You may not copy, modify, distribute,
                  or reproduce AIFlow without appropriate
                  authorization.
                </p>
              </section>

              {/* 11 */}
              <section>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  11. Disclaimer
                </h2>

                <p>
                  AIFlow is provided on an "as available" basis.
                  To the extent permitted by law, AIFlow
                  disclaims warranties that are not expressly
                  stated in these Terms.
                </p>
              </section>

              {/* 12 */}
              <section>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  12. Limitation of Liability
                </h2>

                <p>
                  To the maximum extent permitted by applicable
                  law, AIFlow will not be responsible for
                  indirect, incidental, special, or
                  consequential damages arising from your use
                  of the service.
                </p>
              </section>

              {/* 13 */}
              <section>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  13. Changes to These Terms
                </h2>

                <p>
                  We may update these Terms of Service from
                  time to time. When significant changes are
                  made, we may provide appropriate notice.
                  Continued use of AIFlow after changes become
                  effective means you accept the updated terms.
                </p>
              </section>

              {/* 14 */}
              <section>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  14. Contact
                </h2>

                <p>
                  If you have questions about these Terms of
                  Service, please contact the AIFlow team.
                </p>
              </section>
            </div>
          </motion.article>

          {/* Footer navigation */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 text-xs text-muted-foreground sm:flex-row">
            <Link
              href="/"
              className="transition-colors hover:text-foreground"
            >
              Home
            </Link>

            <span className="hidden sm:inline">•</span>

            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>

            <span className="hidden sm:inline">•</span>

            <Link
              href="/signup"
              className="transition-colors hover:text-foreground"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}