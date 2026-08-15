"use client";

import { FormEvent, ReactNode, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Building2,
  Check,
  Loader2,
  Mail,
  Phone,
  User,
  X,
  Plus,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { Lead } from "@/types/lead";

type AddLeadDialogProps = {
  children: ReactNode;
  onLeadCreated?: (lead: Lead) => void;
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  status: string;
  source: string;
};

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  jobTitle: "",
  status: "NEW",
  source: "WEBSITE",
};

export default function AddLeadDialog({
  children,
  onLeadCreated,
}: AddLeadDialogProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormData>(initialForm);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const updateField = (
    field: keyof FormData,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setError("");
    setSuccess(false);
    setLoading(false);
  };

  const handleOpenChange = (value: boolean) => {
    if (loading) {
      return;
    }

    setOpen(value);

    if (!value) {
      setTimeout(() => {
        resetForm();
      }, 200);
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!form.firstName.trim()) {
      setError("First name is required.");
      return;
    }

    if (!form.email.trim() && !form.phone.trim()) {
      setError(
        "Please provide an email address or phone number.",
      );
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim() || null,
          email: form.email.trim() || null,
          phone: form.phone.trim() || null,
          company: form.company.trim() || null,
          jobTitle: form.jobTitle.trim() || null,
          status: form.status,
          source: form.source,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to create lead.",
        );
      }

      const createdLead: Lead =
        data.lead ?? data.data ?? data;

      setSuccess(true);

      onLeadCreated?.(createdLead);

      setTimeout(() => {
        setOpen(false);
        resetForm();
      }, 700);
    } catch (err) {
      console.error("Create lead error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to create lead.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger */}
      <div
        onClick={() => {
          if (!loading) {
            setOpen(true);
          }
        }}
      >
        {children}
      </div>

      <Dialog
        open={open}
        onOpenChange={handleOpenChange}
      >
        <DialogContent className="w-[calc(100%-2rem)] max-w-lg overflow-hidden rounded-2xl border-border/60 p-0 shadow-2xl">
          <DialogHeader className="border-b border-border/50 px-5 py-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <DialogTitle className="text-base font-semibold">
                  Add new lead
                </DialogTitle>

                <DialogDescription className="mt-1 text-xs leading-5">
                  Create a lead and start tracking the
                  relationship.
                </DialogDescription>
              </div>

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </DialogHeader>

          <form
            onSubmit={handleSubmit}
            className="max-h-[75vh] overflow-y-auto"
          >
            <div className="space-y-5 px-5 py-5">
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
                    className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-xs text-red-500"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Success */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2.5 text-xs text-emerald-500"
                  >
                    <Check className="h-4 w-4" />
                    Lead created successfully.
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Basic information */}
              <div>
                <p className="mb-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Basic information
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className="text-xs"
                    >
                      First name
                    </Label>

                    <Input
                      id="firstName"
                      value={form.firstName}
                      onChange={(event) =>
                        updateField(
                          "firstName",
                          event.target.value,
                        )
                      }
                      placeholder="John"
                      autoComplete="given-name"
                      disabled={loading}
                      className="h-10 rounded-xl text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className="text-xs"
                    >
                      Last name
                    </Label>

                    <Input
                      id="lastName"
                      value={form.lastName}
                      onChange={(event) =>
                        updateField(
                          "lastName",
                          event.target.value,
                        )
                      }
                      placeholder="Doe"
                      autoComplete="family-name"
                      disabled={loading}
                      className="h-10 rounded-xl text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div>
                <p className="mb-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Contact
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-xs"
                    >
                      Email
                    </Label>

                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(event) =>
                          updateField(
                            "email",
                            event.target.value,
                          )
                        }
                        placeholder="john@company.com"
                        autoComplete="email"
                        disabled={loading}
                        className="h-10 rounded-xl pl-9 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-xs"
                    >
                      Phone
                    </Label>

                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(event) =>
                          updateField(
                            "phone",
                            event.target.value,
                          )
                        }
                        placeholder="+91 98765 43210"
                        autoComplete="tel"
                        disabled={loading}
                        className="h-10 rounded-xl pl-9 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Company */}
              <div>
                <p className="mb-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Company
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="company"
                      className="text-xs"
                    >
                      Company
                    </Label>

                    <div className="relative">
                      <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="company"
                        value={form.company}
                        onChange={(event) =>
                          updateField(
                            "company",
                            event.target.value,
                          )
                        }
                        placeholder="Acme Inc."
                        disabled={loading}
                        className="h-10 rounded-xl pl-9 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="jobTitle"
                      className="text-xs"
                    >
                      Job title
                    </Label>

                    <Input
                      id="jobTitle"
                      value={form.jobTitle}
                      onChange={(event) =>
                        updateField(
                          "jobTitle",
                          event.target.value,
                        )
                      }
                      placeholder="Marketing Manager"
                      disabled={loading}
                      className="h-10 rounded-xl text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Lead settings */}
              <div>
                <p className="mb-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Lead settings
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="status"
                      className="text-xs"
                    >
                      Status
                    </Label>

                    <select
                      id="status"
                      value={form.status}
                      onChange={(event) =>
                        updateField(
                          "status",
                          event.target.value,
                        )
                      }
                      disabled={loading}
                      className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="NEW">
                        New
                      </option>

                      <option value="CONTACTED">
                        Contacted
                      </option>

                      <option value="QUALIFIED">
                        Qualified
                      </option>

               

                      <option value="PROPOSAL">
                        Proposal
                      </option>

                      <option value="WON">
                        Won
                      </option>

                      <option value="LOST">
                        Lost
                      </option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="source"
                      className="text-xs"
                    >
                      Source
                    </Label>

                    <select
                      id="source"
                      value={form.source}
                      onChange={(event) =>
                        updateField(
                          "source",
                          event.target.value,
                        )
                      }
                      disabled={loading}
                      className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="WEBSITE">
                        Website
                      </option>

                      <option value="LINKEDIN">
                        LinkedIn
                      </option>

                      <option value="EMAIL">
                        Email
                      </option>

                      <option value="COLD_OUTREACH">
                        Cold outreach
                      </option>

                      <option value="REFERRAL">
                        Referral
                      </option>

                      <option value="OTHER">
                        Other
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col-reverse gap-2 border-t border-border/50 bg-muted/20 px-5 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={loading}
                onClick={() =>
                  handleOpenChange(false)
                }
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
              >
                <X className="h-3.5 w-3.5" />
                Cancel
              </button>

              <motion.button
                type="submit"
                disabled={loading || success}
                whileTap={{ scale: 0.98 }}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-foreground px-5 text-xs font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Creating...
                  </>
                ) : success ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Created
                  </>
                ) : (
                  <>
                    <Plus className="h-3.5 w-3.5" />
                    Create lead
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}