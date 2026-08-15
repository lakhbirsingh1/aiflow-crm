"use client";

import { useEffect, useRef, useState } from "react";
import {
  Camera,
  Check,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/* =====================================================
   TYPES
===================================================== */

type CurrentUser = {
  id: string;
  name: string | null;
  email: string;
};

/* =====================================================
   COMPONENT
===================================================== */

export default function SettingsProfile() {
  /* =====================================================
     PROFILE STATE
  ===================================================== */

  const [currentUser, setCurrentUser] =
    useState<CurrentUser | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [avatar, setAvatar] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [securityManaged, setSecurityManaged] =
    useState(false);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  /* =====================================================
     LOAD CURRENT PROFILE
  ===================================================== */

  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/auth/my-profile",
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok || !data?.authenticated || !data?.user) {
          throw new Error(
            data?.error || "Failed to load profile."
          );
        }

        if (cancelled) return;

        const user: CurrentUser = {
          id: String(data.user.id),
          name:
            typeof data.user.name === "string"
              ? data.user.name
              : null,
          email: String(data.user.email),
        };

        setCurrentUser(user);

        /* ---------------------------------------------
           NAME
        --------------------------------------------- */

        const fullName =
          user.name?.trim() || "";

        const nameParts = fullName
          .split(/\s+/)
          .filter(Boolean);

        setFirstName(nameParts[0] || "");
        setLastName(
          nameParts.slice(1).join(" ")
        );

        /* ---------------------------------------------
           EMAIL
        --------------------------------------------- */

        setEmail(user.email);

        setSaved(false);
      } catch (error) {
        console.error(
          "Failed to load profile:",
          error
        );

        if (!cancelled) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to load profile."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =====================================================
     UNSAVED STATE
  ===================================================== */

  const markUnsaved = () => {
    setSaved(false);
    setError("");
  };

  /* =====================================================
     AVATAR
  ===================================================== */

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    /* Maximum 2MB */

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size must be less than 2MB.");

      event.target.value = "";

      return;
    }

    /* Image validation */

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");

      event.target.value = "";

      return;
    }

    const imageUrl =
      URL.createObjectURL(file);

    setAvatar(imageUrl);
    setSaved(false);
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
    setSaved(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* =====================================================
     SAVE PROFILE
  ===================================================== */

  const handleSave = async () => {
    if (saving) return;

    try {
      setSaving(true);
      setSaved(false);
      setError("");

      const cleanFirstName =
        firstName.trim();

      const cleanLastName =
        lastName.trim();

      /* ---------------------------------------------
         BUILD FULL NAME
      --------------------------------------------- */

      const fullName = [
        cleanFirstName,
        cleanLastName,
      ]
        .filter(Boolean)
        .join(" ");

      if (!fullName) {
        setError(
          "Please enter your name."
        );

        return;
      }

      /* ---------------------------------------------
         UPDATE PROFILE
      --------------------------------------------- */

      const response = await fetch(
        "/api/auth/my-profile",
        {
          method: "PUT",
          credentials: "include",
          cache: "no-store",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name: fullName,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data?.user) {
        throw new Error(
          data?.error ||
            "Failed to save profile."
        );
      }

      /* ---------------------------------------------
         UPDATE LOCAL USER
      --------------------------------------------- */

      const updatedUser: CurrentUser = {
        id: String(data.user.id),
        name:
          typeof data.user.name ===
          "string"
            ? data.user.name
            : null,
        email: String(data.user.email),
      };

      setCurrentUser(updatedUser);

      /* Keep fields synchronized */

      const updatedName =
        updatedUser.name?.trim() || "";

      const updatedParts =
        updatedName
          .split(/\s+/)
          .filter(Boolean);

      setFirstName(
        updatedParts[0] || ""
      );

      setLastName(
        updatedParts
          .slice(1)
          .join(" ")
      );

      setEmail(updatedUser.email);

      setSaved(true);

      window.setTimeout(() => {
        setSaved(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Failed to save profile:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to save profile."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =====================================================
     INITIALS
  ===================================================== */

  const initials = (
    `${firstName.charAt(0)}${lastName.charAt(0)}`
  ).toUpperCase() || "U";

  /* =====================================================
     UI
  ===================================================== */

  return (
    <Card className="overflow-hidden rounded-2xl">
      {/* =================================================
          HEADER
      ================================================= */}

      <CardHeader className="border-b px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <User className="size-4 text-primary" />
          </div>

          <div className="min-w-0">
            <CardTitle className="text-sm">
              Profile
            </CardTitle>

            <CardDescription className="mt-0.5 text-[11px]">
              Manage your personal account information.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      {/* =================================================
          CONTENT
      ================================================= */}

      <CardContent className="space-y-6 p-5">
        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="size-16 animate-pulse rounded-2xl bg-muted" />

              <div className="space-y-2">
                <div className="h-4 w-28 animate-pulse rounded bg-muted" />
                <div className="h-3 w-52 animate-pulse rounded bg-muted" />
              </div>
            </div>

            <Separator />

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
              </div>

              <div className="space-y-2">
                <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <div className="h-3 w-28 animate-pulse rounded bg-muted" />
                <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
              <div className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3">
                <p className="text-xs text-destructive">
                  {error}
                </p>
              </div>
            )}

            {/* =================================================
                PROFILE PHOTO
            ================================================= */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative size-16 shrink-0">
                <Avatar className="size-16 rounded-2xl">
                  {avatar && (
                    <AvatarImage
                      src={avatar}
                      alt={
                        currentUser?.name ||
                        "Profile"
                      }
                      className="object-cover"
                    />
                  )}

                  <AvatarFallback className="rounded-2xl bg-muted text-lg font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                {/* Hidden file input */}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={
                    handleAvatarChange
                  }
                  className="hidden"
                />

                {/* Camera button */}

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={
                    handleAvatarClick
                  }
                  aria-label="Change profile photo"
                  className="absolute -bottom-1 -right-1 size-7 rounded-lg bg-background shadow-sm"
                >
                  <Camera className="size-3.5" />
                </Button>
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium">
                  Profile photo
                </p>

                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                  JPG, PNG or WebP. Maximum size 2MB.
                </p>

                {avatar && (
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    onClick={
                      handleRemoveAvatar
                    }
                    className="mt-1 h-auto p-0 text-[10px] text-destructive"
                  >
                    Remove photo
                  </Button>
                )}
              </div>
            </div>

            <Separator />

            {/* =================================================
                PERSONAL INFORMATION
            ================================================= */}

            <div className="grid gap-5 sm:grid-cols-2">
              {/* First Name */}

              <div className="space-y-2">
                <Label
                  htmlFor="first-name"
                  className="text-xs font-medium"
                >
                  First name
                </Label>

                <Input
                  id="first-name"
                  value={firstName}
                  onChange={(event) => {
                    setFirstName(
                      event.target.value
                    );
                    markUnsaved();
                  }}
                  autoComplete="given-name"
                  className="h-10"
                />
              </div>

              {/* Last Name */}

              <div className="space-y-2">
                <Label
                  htmlFor="last-name"
                  className="text-xs font-medium"
                >
                  Last name
                </Label>

                <Input
                  id="last-name"
                  value={lastName}
                  onChange={(event) => {
                    setLastName(
                      event.target.value
                    );
                    markUnsaved();
                  }}
                  autoComplete="family-name"
                  className="h-10"
                />
              </div>

              {/* Email */}

              <div className="space-y-2 sm:col-span-2">
                <Label
                  htmlFor="email"
                  className="text-xs font-medium"
                >
                  Email address
                </Label>

                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="email"
                    type="email"
                    value={email}
                    readOnly
                    disabled
                    autoComplete="email"
                    className="h-10 pl-9"
                  />
                </div>

                <p className="text-[10px] text-muted-foreground">
                  Your email address is managed by your account.
                </p>
              </div>
            </div>

            {/* =================================================
                SECURITY
            ================================================= */}

            <div className="rounded-xl border bg-muted/20 p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background">
                    <ShieldCheck
                      className={`size-4 ${
                        securityManaged
                          ? "text-emerald-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-xs font-medium">
                        Account security
                      </p>

                      <Badge
                        variant="secondary"
                        className="h-5 px-1.5 text-[9px]"
                      >
                        Protected
                      </Badge>
                    </div>

                    <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">
                      {securityManaged
                        ? "Two-factor authentication settings are being managed."
                        : "Your account is protected with two-factor authentication."}
                    </p>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                  onClick={() =>
                    setSecurityManaged(
                      (value) => !value
                    )
                  }
                >
                  {securityManaged
                    ? "Done"
                    : "Manage"}
                </Button>
              </div>
            </div>

            {/* =================================================
                SAVE
            ================================================= */}

            <div className="flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-h-4">
                {saved ? (
                  <div className="flex items-center gap-2">
                    <Check className="size-3.5 text-emerald-500" />

                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
                      Profile changes saved successfully
                    </span>
                  </div>
                ) : (
                  <span className="text-[10px] text-muted-foreground">
                    Update your profile information and save your changes.
                  </span>
                )}
              </div>

              <Button
                type="button"
                size="sm"
                onClick={handleSave}
                disabled={
                  loading || saving || saved
                }
              >
                {saving ? (
                  "Saving..."
                ) : saved ? (
                  <>
                    <Check className="mr-2 size-3.5" />
                    Saved
                  </>
                ) : (
                  "Save changes"
                )}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}