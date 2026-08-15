"use client";

import { useEffect, useMemo, useState } from "react";
import {
  User,
  Mail,
  ShieldCheck,
  CreditCard,
  Pencil,
  Check,
  X,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

type CurrentUser = {
  id: string;
  name: string | null;
  email: string;
  createdAt: string;
};

export default function ProfilePage() {
  const [user, setUser] =
    useState<CurrentUser | null>(null);

  const [name, setName] = useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [editing, setEditing] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [success, setSuccess] =
    useState<string | null>(null);

  /*
   * =====================================================
   * LOAD CURRENT USER
   * =====================================================
   */

  useEffect(() => {
    let cancelled = false;

    const loadUser = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "/api/auth/my-profile",
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
            headers: {
              Accept: "application/json",
            },
          }
        );

        const contentType =
          response.headers.get(
            "content-type"
          ) || "";

        if (!contentType.includes("application/json")) {
          const text = await response.text();

          console.error(
            "Expected JSON from /api/auth/my-profile but received:",
            text.slice(0, 300)
          );

          throw new Error(
            "Profile API did not return JSON."
          );
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.error ||
              "Unable to load your account information."
          );
        }

        if (
          !data?.authenticated ||
          !data?.user
        ) {
          throw new Error(
            "Unable to load your account information."
          );
        }

        if (cancelled) return;

        setUser(data.user);
        setName(data.user.name?.trim() || "");
      } catch (error) {
        console.error(
          "Load profile error:",
          error
        );

        if (cancelled) return;

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load your account information."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadUser();

    return () => {
      cancelled = true;
    };
  }, []);

  /*
   * =====================================================
   * DISPLAY NAME
   * =====================================================
   */

  const displayName = useMemo(() => {
    return (
      user?.name?.trim() ||
      name.trim() ||
      "User"
    );
  }, [user?.name, name]);

  /*
   * =====================================================
   * INITIALS
   * =====================================================
   */

  const initials = useMemo(() => {
    const result = displayName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(
        (word) =>
          word[0]?.toUpperCase() || ""
      )
      .join("");

    return result || "U";
  }, [displayName]);

  /*
   * =====================================================
   * CANCEL EDIT
   * =====================================================
   */

  const handleCancel = () => {
    setName(user?.name?.trim() || "");
    setEditing(false);
    setError(null);
    setSuccess(null);
  };

  /*
   * =====================================================
   * SAVE PROFILE
   * =====================================================
   */

  const handleSave = async () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }

    if (trimmedName.length > 100) {
      setError(
        "Name must be less than 100 characters."
      );
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const response = await fetch(
        "/api/auth/my-profile",
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: trimmedName,
          }),
        }
      );

      const contentType =
        response.headers.get(
          "content-type"
        ) || "";

      if (!contentType.includes("application/json")) {
        throw new Error(
          "Profile API did not return JSON."
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Unable to update your profile."
        );
      }

      if (!data?.user) {
        throw new Error(
          "Updated user information was not returned."
        );
      }

      setUser(data.user);
      setName(data.user.name?.trim() || "");
      setEditing(false);

      setSuccess(
        "Profile updated successfully."
      );
    } catch (error) {
      console.error(
        "Save profile error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to update your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * =====================================================
   * LOADING
   * =====================================================
   */

  if (loading) {
    return (
      <div className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-center">
              <Loader2 className="h-7 w-7 animate-spin text-muted-foreground" />

              <p className="text-sm font-medium">
                Loading profile...
              </p>

              <p className="text-xs text-muted-foreground">
                Fetching your account information.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /*
   * =====================================================
   * ERROR
   * =====================================================
   */

  if (error && !user) {
    return (
      <div className="px-4 pb-10 sm:px-6 lg:px-8">
        <motion.div
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mx-auto max-w-5xl"
        >
          <Card>
            <CardContent className="flex min-h-[320px] flex-col items-center justify-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertCircle className="h-6 w-6" />
              </div>

              <h2 className="mt-4 text-lg font-semibold">
                Unable to load profile
              </h2>

              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                {error}
              </p>

              <Button
                type="button"
                className="mt-5"
                onClick={() =>
                  window.location.reload()
                }
              >
                Try again
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  /*
   * =====================================================
   * PROFILE
   * =====================================================
   */

  return (
    <div className="px-4 pb-10 sm:px-6 lg:px-8">
      <motion.div
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.3,
        }}
        className="mx-auto max-w-5xl"
      >
        {/* HEADER */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Profile
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage your personal information
              and account details.
            </p>
          </div>

          {!editing ? (
            <Button
              type="button"
              onClick={() => {
                setSuccess(null);
                setError(null);
                setEditing(true);
              }}
              className="w-full sm:w-auto"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit profile
            </Button>
          ) : (
            <div className="flex w-full gap-2 sm:w-auto">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={saving}
                className="flex-1 sm:flex-none"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>

              <Button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex-1 sm:flex-none"
              >
                {saving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Check className="mr-2 h-4 w-4" />
                )}

                {saving
                  ? "Saving..."
                  : "Save changes"}
              </Button>
            </div>
          )}
        </div>

        {/* SUCCESS */}

        {success && (
          <div className="mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">
            {success}
          </div>
        )}

        {/* ERROR */}

        {error && user && (
          <div className="mb-5 rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* PROFILE CARD */}

          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
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
                  }}
                  className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-2xl font-semibold text-primary ring-8 ring-primary/5"
                >
                  {initials}
                </motion.div>

                <h3 className="mt-5 max-w-full truncate text-lg font-semibold">
                  {displayName}
                </h3>

                <p className="mt-1 max-w-full truncate text-sm text-muted-foreground">
                  {user?.email}
                </p>

                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Active account
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DETAILS */}

          <div className="space-y-6">
            {/* PERSONAL INFORMATION */}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Personal information
                </CardTitle>

                <CardDescription>
                  Your basic account information.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                {/* NAME */}

                <div className="space-y-2">
                  <Label htmlFor="name">
                    Full name
                  </Label>

                  <Input
                    id="name"
                    value={name}
                    onChange={(event) =>
                      setName(
                        event.target.value
                      )
                    }
                    disabled={
                      !editing || saving
                    }
                    placeholder="Enter your name"
                    autoComplete="name"
                  />
                </div>

                {/* EMAIL */}

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email address
                  </Label>

                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="email"
                      value={
                        user?.email || ""
                      }
                      disabled
                      readOnly
                      className="pl-9"
                    />
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Your email address is
                    managed by your account.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* ACCOUNT */}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                  Account
                </CardTitle>

                <CardDescription>
                  Information about your
                  AIFlow account.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* PLAN */}

                  <div className="rounded-xl border border-border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <CreditCard className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Current plan
                        </p>

                        <p className="mt-0.5 text-sm font-semibold">
                          Free
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* STATUS */}

                  <div className="rounded-xl border border-border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                        <ShieldCheck className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Account status
                        </p>

                        <p className="mt-0.5 text-sm font-semibold">
                          Active
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ACCOUNT CREATED */}

            {user?.createdAt && (
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Account created
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {new Date(
                          user.createdAt
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>

                    <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}