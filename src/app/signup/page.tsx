"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  Loader2,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    setError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName) {
      setError("Please enter your full name.");
      return;
    }

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!/\d/.test(password)) {
      setError("Password must contain at least one number.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!terms) {
      setError(
        "Please accept the Terms of Service and Privacy Policy.",
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to create your account.",
        );
      }

      setSuccess(true);

      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 700);

    } catch (error) {
      console.error("Signup error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />

        <div className="absolute bottom-[-160px] left-[-100px] h-[350px] w-[350px] rounded-full bg-primary/10 blur-[110px]" />

        <div className="absolute right-[-100px] top-[35%] h-[300px] w-[300px] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative z-20">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <Sparkles className="h-4 w-4" />
            </div>

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
                    theme === "dark" ? "light" : "dark",
                  )
                }
                className="h-9 w-9 rounded-lg bg-background/70 text-muted-foreground backdrop-blur"
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
      <section className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-[450px]">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            className="mb-7 text-center"
          >
            <motion.div
              initial={{
                scale: 0.9,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.3,
                delay: 0.05,
              }}
              className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-card/80 shadow-sm backdrop-blur"
            >
              <Sparkles className="h-5 w-5 text-primary" />
            </motion.div>

            <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Create your account
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              Start building smarter workflows with your
              AIFlow workspace.
            </p>
          </motion.div>

          {/* Signup Card */}
          <motion.div
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
              delay: 0.05,
              ease: "easeOut",
            }}
            className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-2xl shadow-black/5 backdrop-blur-xl sm:p-8"
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Error */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -6,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -6,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    role="alert"
                    className="rounded-xl border border-destructive/20 bg-destructive/10 px-3 py-2.5 text-xs leading-5 text-destructive"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Success */}
              <AnimatePresence mode="wait">
                {success && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.98,
                      y: -4,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2.5 text-xs leading-5 text-emerald-600 dark:text-emerald-400"
                  >
                    <Check className="h-4 w-4 shrink-0" />

                    <span>
                      Account created successfully.
                      Redirecting...
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Full name
                </Label>

                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);

                    if (error) {
                      setError("");
                    }
                  }}
                  disabled={loading || success}
                  className="h-12 rounded-xl bg-background/70"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  Work email
                </Label>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);

                    if (error) {
                      setError("");
                    }
                  }}
                  disabled={loading || success}
                  className="h-12 rounded-xl bg-background/70"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">
                  Password
                </Label>

                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Create a password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);

                      if (error) {
                        setError("");
                      }
                    }}
                    disabled={loading || success}
                    className="h-12 rounded-xl bg-background/70 pr-11"
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current,
                      )
                    }
                    disabled={loading || success}
                    className="absolute right-1 top-1/2 h-10 w-10 -translate-y-1/2 text-muted-foreground hover:bg-transparent hover:text-foreground"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Check className="h-3 w-3 text-primary" />
                    8+ characters
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Check className="h-3 w-3 text-primary" />
                    One number
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirm password
                </Label>

                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(
                        event.target.value,
                      );

                      if (error) {
                        setError("");
                      }
                    }}
                    disabled={loading || success}
                    className="h-12 rounded-xl bg-background/70 pr-11"
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setShowConfirmPassword(
                        (current) => !current,
                      )
                    }
                    disabled={loading || success}
                    className="absolute right-1 top-1/2 h-10 w-10 -translate-y-1/2 text-muted-foreground hover:bg-transparent hover:text-foreground"
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 pt-1">
                <input
                  id="terms"
                  type="checkbox"
                  checked={terms}
                  onChange={(event) => {
                    setTerms(
                      event.target.checked,
                    );

                    if (error) {
                      setError("");
                    }
                  }}
                  disabled={loading || success}
                  className="mt-0.5 h-4 w-4 rounded border-input accent-primary"
                />

                <label
                  htmlFor="terms"
                  className="text-xs leading-5 text-muted-foreground"
                >
                  I agree to AIFlow's{" "}
                  <Link
                    href="#"
                    className="font-medium text-foreground hover:text-primary"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="#"
                    className="font-medium text-foreground hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              {/* Create Account */}
              <motion.div
                whileTap={{
                  scale:
                    loading || success
                      ? 1
                      : 0.98,
                }}
              >
                <Button
                  type="submit"
                  disabled={loading || success}
                  className="group relative h-12 w-full overflow-hidden rounded-xl text-sm font-medium shadow-lg shadow-primary/20"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : success ? (
                      <>
                        <Check className="h-4 w-4" />
                        Account created
                      </>
                    ) : (
                      "Create AIFlow account"
                    )}
                  </span>

                  {!loading && !success && (
                    <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-border" />

              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                or
              </span>

              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Google */}
            <Button
              type="button"
              variant="outline"
              disabled
              className="h-12 w-full rounded-xl bg-background/60 text-sm font-medium"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
                G
              </span>

              Sign up with Google
            </Button>
          </motion.div>

          {/* Login */}
          <p className="mt-7 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>

          {/* Security */}
          <p className="mt-5 text-center text-[11px] leading-5 text-muted-foreground/70">
            Your data is protected with secure authentication
            and privacy-first controls.
          </p>
        </div>
      </section>
    </main>
  );
}