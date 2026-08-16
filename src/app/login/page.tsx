"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "motion/react";
import {
  Eye,
  EyeOff,
  ArrowLeft,
  Sparkles,
  Sun,
  Moon,
  Loader2,
  Check,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function LoginPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [remember, setRemember] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRememberChange = (
    checked: boolean,
  ) => {
    setRemember(checked);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    setError("");

    const cleanEmail =
      email.trim().toLowerCase();

    if (!cleanEmail) {
      setError(
        "Please enter your email address.",
      );
      return;
    }

    if (!password) {
      setError(
        "Please enter your password.",
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: cleanEmail,
            password,
            remember,
          }),
        },
      );

      const data = await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Invalid email or password.",
        );
      }

    //   router.push("/dashboard");
    //   router.refresh();
    // } catch (error) {
    //   console.error(
    //     "Login error:",
    //     error,
    //   );

      window.location.href = "/dashboard";
} catch (error) {
  console.error(
    "Login error:",
    error,
  );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to sign in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const clientId =
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!clientId) {
      setError(
        "Google login is not configured.",
      );
      return;
    }

    const redirectUri =
      `${window.location.origin}/api/auth/google/callback`;

    const googleAuthUrl = new URL(
      "https://accounts.google.com/o/oauth2/v2/auth",
    );

    googleAuthUrl.searchParams.set(
      "client_id",
      clientId,
    );

    googleAuthUrl.searchParams.set(
      "redirect_uri",
      redirectUri,
    );

    googleAuthUrl.searchParams.set(
      "response_type",
      "code",
    );

    googleAuthUrl.searchParams.set(
      "scope",
      "openid email profile",
    );

    googleAuthUrl.searchParams.set(
      "access_type",
      "offline",
    );

    googleAuthUrl.searchParams.set(
      "prompt",
      "select_account",
    );

    window.location.href =
      googleAuthUrl.toString();
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />

        <div className="absolute bottom-[-180px] left-[-120px] h-[350px] w-[350px] rounded-full bg-primary/10 blur-[110px]" />

        <div className="absolute right-[-100px] top-[35%] h-[300px] w-[300px] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      {/* Header */}
      <motion.header
        initial={{
          opacity: 0,
          y: -10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="relative z-20"
      >
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

          {/* Back + Theme */}
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
      </motion.header>

      {/* Main */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12"
      >
        <div className="w-full max-w-[430px]">
          {/* Intro */}
          <motion.div
            variants={itemVariants}
            className="mb-7 text-center"
          >
            <motion.div
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
              }}
              className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-card/80 shadow-sm backdrop-blur"
            >
              <Sparkles className="h-5 w-5 text-primary" />
            </motion.div>

            <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Welcome back
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              Sign in to your AIFlow workspace and keep
              your workflow moving.
            </p>
          </motion.div>

          {/* Card */}
          <motion.div variants={itemVariants}>
            <Card className="rounded-3xl border-border/70 bg-card/80 shadow-2xl shadow-black/5 backdrop-blur-xl">
              <CardContent className="p-6 sm:p-8">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Error */}
                  <AnimatePresence>
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
                        role="alert"
                        className="rounded-xl border border-destructive/20 bg-destructive/10 px-3 py-2.5 text-xs leading-5 text-destructive"
                      >
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email address
                    </Label>

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(
                          event.target.value,
                        );

                        if (error) {
                          setError("");
                        }
                      }}
                      placeholder="you@company.com"
                      autoComplete="email"
                      required
                      disabled={loading}
                      className="h-12 rounded-xl bg-background/70 px-4 focus-visible:ring-4 focus-visible:ring-primary/10"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">
                        Password
                      </Label>

                      <Link
                        href="#"
                        className="text-xs font-medium text-primary transition-opacity hover:opacity-80"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        value={password}
                        onChange={(event) => {
                          setPassword(
                            event.target.value,
                          );

                          if (error) {
                            setError("");
                          }
                        }}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        required
                        disabled={loading}
                        className="h-12 rounded-xl bg-background/70 px-4 pr-12 focus-visible:ring-4 focus-visible:ring-primary/10"
                      />

                      {/* Eye button */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled={loading}
                        onClick={() =>
                          setShowPassword(
                            (current) =>
                              !current,
                          )
                        }
                        className="absolute right-1 top-0 bottom-0 z-10 my-auto h-10 w-10 text-muted-foreground hover:bg-transparent hover:text-foreground"
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
                  </div>

                  {/* Remember */}
                  <div className="flex min-h-5 items-center gap-2">
                    <Checkbox
                      id="remember"
                      checked={remember}
                      onCheckedChange={(checked) =>
                        handleRememberChange(
                          checked === true,
                        )
                      }
                      disabled={loading}
                    />

                    <Label
                      htmlFor="remember"
                      className={`cursor-pointer text-xs font-normal transition-colors duration-200 ${
                        remember
                          ? "text-green-500"
                          : "text-muted-foreground"
                      }`}
                    >
                      {remember ? (
                        <motion.span
                          key="remembered"
                          initial={{
                            opacity: 0,
                            y: 3,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          className="flex items-center gap-1.5"
                        >
                          <Check className="size-3.5" />
                          Remembered for 30 days
                        </motion.span>
                      ) : (
                        <motion.span
                          key="remember"
                          initial={{
                            opacity: 0,
                            y: 3,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                        >
                          Remember me for 30 days
                        </motion.span>
                      )}
                    </Label>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="group relative h-12 w-full overflow-hidden rounded-xl text-sm font-medium shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )}

                      {loading
                        ? "Signing in..."
                        : "Sign in to AIFlow"}
                    </span>

                    {!loading && (
                      <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
                    )}
                  </Button>
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
                  onClick={handleGoogleLogin}
                  className="h-12 w-full rounded-xl bg-background/60 text-sm font-medium"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
                    G
                  </span>

                  Continue with Google
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Signup */}
          <motion.p
            variants={itemVariants}
            className="mt-7 text-center text-sm text-muted-foreground"
          >
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              Create your account
            </Link>
          </motion.p>

          {/* Security text */}
          <motion.p
            variants={itemVariants}
            className="mt-5 text-center text-[11px] leading-5 text-muted-foreground/70"
          >
            By continuing, you agree to AIFlow's Terms of
            Service and Privacy Policy.
          </motion.p>
        </div>
      </motion.section>
    </main>
  );
}