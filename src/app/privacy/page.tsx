
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
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

          {/* Header actions */}
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

      {/* Main */}
      <section className="relative z-10 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          {/* Intro */}
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
              Privacy Policy
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              This Privacy Policy explains how AIFlow
              collects, uses, protects, and handles information
              when you use our website and services.
            </p>

            <p className="mt-4 text-xs text-muted-foreground/70">
              Last updated: August 15, 2026
            </p>
          </motion.div>

          {/* Policy */}
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
                  1. Introduction
                </h2>

                <p>
                  AIFlow ("AIFlow", "we", "us", or "our")
                  respects your privacy and is committed to
                  protecting your personal information.
                </p>

                <p className="mt-3">
                  This Privacy Policy explains what information
                  we collect, how we use it, how we protect it,
                  and the choices available to you when you use
                  the AIFlow website, application, and related
                  services.
                </p>
              </section>

              {/* 2 */}
              <section>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  2. Information We Collect
                </h2>

                <p>
                  We may collect information that you provide
                  directly to us as well as certain information
                  that is automatically generated when you use
                  AIFlow.
                </p>

                <h3 className="mb-2 mt-5 font-semibold text-foreground">
                  Account Information
                </h3>

                <ul className="list-disc space-y-2 pl-5">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Password and authentication information</li>
                  <li>Account preferences</li>
                </ul>

                <h3 className="mb-2 mt-5 font-semibold text-foreground">
                  Google Sign-In Information
                </h3>

                <p>
                  If you choose to sign in using Google, we may
                  receive information provided by Google that is
                  necessary to authenticate your account, such
                  as your name, email address, and profile
                  information.
                </p>

                <h3 className="mb-2 mt-5 font-semibold text-foreground">
                  Usage Information
                </h3>

                <p>
                  We may collect information about how you use
                  AIFlow, including pages visited, features
                  used, interactions with the application,
                  browser information, device information, and
                  diagnostic information.
                </p>
              </section>

              {/* 3 */}
              <section>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  3. How We Use Your Information
                </h2>

                <p>
                  We may use collected information to:
                </p>

                <ul className="mt-3 list-disc space-y-2 pl-5">
                  <li>
                    Create and manage your AIFlow account.
                  </li>
                  <li>
                    Authenticate you and maintain your session.
                  </li>
                  <li>
                    Provide and operate AIFlow features.
                  </li>
                  <li>
                    Personalize your experience.
                  </li>
                  <li>
                    Improve the performance and reliability of
                    our services.
                  </li>
                  <li>
                    Detect and prevent fraud, abuse, and
                    security issues.
                  </li>
                  <li>
                    Respond to support requests.
                  </li>
                  <li>
                    Communicate important service-related
                    information.
                  </li>
                  <li>
                    Comply with applicable legal obligations.
                  </li>
                </ul>
              </section>

              {/* 4 */}
              <section>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  4. Passwords and Authentication
                </h2>

                <p>
                  Passwords associated with AIFlow accounts are
                  processed using security measures designed to
                  protect account credentials. We do not intend
                  to store passwords in plain text.
                </p>

                <p className="mt-3">
                  AIFlow may also use secure authentication
                  cookies or similar technologies to maintain
                  your signed-in session.
                </p>
              </section>

              {/* 5 */}
              <section>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  5. Cookies and Similar Technologies
                </h2>

                <p>
                  AIFlow may use cookies and similar
                  technologies to provide essential
                  functionality, maintain authentication
                  sessions, remember preferences, and improve
                  the service.
                </p>

                <p className="mt-3">
                  Authentication cookies may be required for
                  certain parts of AIFlow to function correctly.
                </p>
              </section>

              {/* 6 */}
              <section>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  6. AI Features and Your Data
                </h2>

                <p>
                  AIFlow may provide artificial intelligence
                  features for tasks such as lead analysis,
                  recommendations, summaries, sales assistance,
                  workflow automation, and other business
                  functions.
                </p>

                <p className="mt-3">
                  Information submitted to AI-powered features
                  may be processed to provide the requested
                  functionality.
                </p>

                <p className="mt-3">
                  AI-generated results may not always be
                  accurate. You should review important
                  AI-generated information before relying on it
                  for business decisions.
                </p>
              </section>

              {/* 7 */}
              <section>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  7. How We Share Information
                </h2>

                <p>
                  We do not sell your personal information.
                </p>

                <p className="mt-3">
                  We may share information with trusted
                  service providers when necessary to operate,
                  maintain, secure, or improve AIFlow.
                </p>

                <p className="mt-3">
                  We may also disclose information when required
                  by law, to protect our rights or users, or in
                  connection with a merger, acquisition, or
                  transfer of business assets.
                </p>
              </section>

              {/* 8 */}
              <section>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  8. Third-Party Services
                </h2>

                <p>
                  AIFlow may use third-party services for
                  authentication, hosting, database management,
                  analytics, infrastructure, AI processing, or
                  other operational purposes.
                </p>

                <p className="mt-3">
                  Third-party services may process information
                  according to their own privacy policies and
                  terms.
                </p>
              </section>

              {/* 9 */}
              <section>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  9. Data Security
                </h2>

                <p>
                  We take reasonable technical and
                  organizational measures to protect your
                  information against unauthorized access,
                  alteration, disclosure, or destruction.
                </p>

                <p className="mt-3">
                  However, no internet-based service can
                  guarantee absolute security.
                </p>
              </section>

              {/* 10 */}
              <section>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  10. Data Retention
                </h2>

                <p>
                  We retain personal information for as long as
                  reasonably necessary to provide the service,
                  maintain your account, comply with legal
                  obligations, resolve disputes, and enforce
                  agreements.
                </p>

                <p className="mt-3">
                  When information is no longer required, we may
                  delete or anonymize it in accordance with our
                  operational and legal requirements.
                </p>
              </section>

              {/* 11 */}
              <section>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  11. Your Privacy Choices
                </h2>

                <p>
                  Depending on applicable law, you may have
                  rights regarding your personal information,
                  including the right to:
                </p>

                <ul className="mt-3 list-disc space-y-2 pl-5">
                  <li>
                    Request access to personal information we
                    hold about you.
                  </li>
                  <li>
                    Request correction of inaccurate
                    information.
                  </li>
                  <li>
                    Request deletion of certain information.
                  </li>
                  <li>
                    Request information about how your data is
                    processed.
                  </li>
                  <li>
                    Withdraw certain permissions where
                    applicable.
                  </li>
                </ul>
              </section>

              {/* 12 */}
              <section>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  12. Children's Privacy
                </h2>

                <p>
                  AIFlow is intended for business and general
                  adult use. We do not knowingly collect
                  personal information from children where such
                  collection is prohibited by applicable law.
                </p>
              </section>

              {/* 13 */}
              <section>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  13. International Data Processing
                </h2>

                <p>
                  Depending on where AIFlow and its service
                  providers operate, your information may be
                  processed or stored in countries other than
                  your country of residence.
                </p>

                <p className="mt-3">
                  Where required, we will take appropriate
                  measures for applicable cross-border data
                  transfers.
                </p>
              </section>

              {/* 14 */}
              <section>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  14. Changes to This Privacy Policy
                </h2>

                <p>
                  We may update this Privacy Policy from time
                  to time to reflect changes to AIFlow, legal
                  requirements, or our data practices.
                </p>

                <p className="mt-3">
                  When appropriate, we will update the "Last
                  updated" date displayed at the top of this
                  policy.
                </p>
              </section>

              {/* 15 */}
              <section>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  15. Contact Us
                </h2>

                <p>
                  If you have questions about this Privacy
                  Policy, your personal information, or your
                  privacy rights, please contact the AIFlow
                  team.
                </p>
              </section>
            </div>
          </motion.article>

          {/* Footer links */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 text-xs text-muted-foreground sm:flex-row">
            <Link
              href="/"
              className="transition-colors hover:text-foreground"
            >
              Home
            </Link>

            <span className="hidden sm:inline">•</span>

            <Link
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              Terms of Service
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

