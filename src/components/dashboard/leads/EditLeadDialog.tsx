"use client";

import { useEffect, useState } from "react";
import {
  Loader2,
  Pencil,
  UserRound,
  X,
} from "lucide-react";

import { Lead } from "@/types/lead";

type EditLeadDialogProps = {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLeadUpdated: (lead: Lead) => void;
};

export default function EditLeadDialog({
  lead,
  open,
  onOpenChange,
  onLeadUpdated,
}: EditLeadDialogProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    status: "NEW",
    source: "",
    score: "",
  });

  useEffect(() => {
    if (!lead) return;

    setForm({
      firstName: lead.firstName ?? "",
      lastName: lead.lastName ?? "",
      email: lead.email ?? "",
      phone: lead.phone ?? "",
      company: lead.company ?? "",
      jobTitle: lead.jobTitle ?? "",
      status: lead.status ?? "NEW",
      source: lead.source ?? "",
      score: lead.score !== null ? String(lead.score) : "",
    });
  }, [lead]);

  if (!open || !lead) {
    return null;
  }

  const updateField = (
    field: keyof typeof form,
    value: string,
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!form.firstName.trim()) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`/api/leads/${lead.id}`, {
        method: "PATCH",
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
          source: form.source || null,
          score: form.score
            ? Number(form.score)
            : null,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to update lead.",
        );
      }

      onLeadUpdated(data.lead);
      onOpenChange(false);
    } catch (error) {
      console.error("Update lead error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to update lead.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close edit dialog"
        onClick={() => !loading && onOpenChange(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Dialog */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/50 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted">
              <Pencil className="h-4 w-4" />
            </div>

            <div>
              <h2 className="text-sm font-semibold">
                Edit lead
              </h2>

              <p className="text-xs text-muted-foreground">
                Update lead information
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={() => onOpenChange(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="max-h-[70vh] overflow-y-auto p-5">
            <div className="mb-5 flex items-center gap-3 rounded-xl bg-muted/40 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xs font-medium">
                {form.firstName.charAt(0).toUpperCase()}
                {form.lastName.charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {form.firstName} {form.lastName}
                </p>

                <p className="truncate text-xs text-muted-foreground">
                  {form.company || "No company"}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* First name */}
              <div>
                <label className="mb-1.5 block text-xs font-medium">
                  First name
                </label>

                <input
                  value={form.firstName}
                  onChange={(event) =>
                    updateField(
                      "firstName",
                      event.target.value,
                    )
                  }
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-foreground"
                  placeholder="First name"
                />
              </div>

              {/* Last name */}
              <div>
                <label className="mb-1.5 block text-xs font-medium">
                  Last name
                </label>

                <input
                  value={form.lastName}
                  onChange={(event) =>
                    updateField(
                      "lastName",
                      event.target.value,
                    )
                  }
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-foreground"
                  placeholder="Last name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-xs font-medium">
                  Email
                </label>

                <input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    updateField(
                      "email",
                      event.target.value,
                    )
                  }
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-foreground"
                  placeholder="name@company.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-1.5 block text-xs font-medium">
                  Phone
                </label>

                <input
                  value={form.phone}
                  onChange={(event) =>
                    updateField(
                      "phone",
                      event.target.value,
                    )
                  }
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-foreground"
                  placeholder="+1 415 555 0123"
                />
              </div>

              {/* Company */}
              <div>
                <label className="mb-1.5 block text-xs font-medium">
                  Company
                </label>

                <input
                  value={form.company}
                  onChange={(event) =>
                    updateField(
                      "company",
                      event.target.value,
                    )
                  }
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-foreground"
                  placeholder="Company name"
                />
              </div>

              {/* Job title */}
              <div>
                <label className="mb-1.5 block text-xs font-medium">
                  Job title
                </label>

                <input
                  value={form.jobTitle}
                  onChange={(event) =>
                    updateField(
                      "jobTitle",
                      event.target.value,
                    )
                  }
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-foreground"
                  placeholder="Job title"
                />
              </div>

              {/* Status */}
              <div>
                <label className="mb-1.5 block text-xs font-medium">
                  Status
                </label>

                <select
                  value={form.status}
                  onChange={(event) =>
                    updateField(
                      "status",
                      event.target.value,
                    )
                  }
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none"
                >
                  <option value="NEW">New</option>
                  <option value="CONTACTED">
                    Contacted
                  </option>
                  <option value="QUALIFIED">
                    Qualified
                  </option>
                  <option value="PROPOSAL">
                    Proposal
                  </option>
                  <option value="WON">Won</option>
                  <option value="LOST">Lost</option>
                </select>
              </div>

              {/* Source */}
              <div>
                <label className="mb-1.5 block text-xs font-medium">
                  Source
                </label>

                <select
                  value={form.source}
                  onChange={(event) =>
                    updateField(
                      "source",
                      event.target.value,
                    )
                  }
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none"
                >
                  <option value="">No source</option>
                  <option value="WEBSITE">Website</option>
                  <option value="LINKEDIN">
                    LinkedIn
                  </option>
                  <option value="EMAIL">Email</option>
                  <option value="COLD_OUTREACH">
                    Cold outreach
                  </option>
                  <option value="REFERRAL">
                    Referral
                  </option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              {/* Score */}
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-medium">
                  AI score
                </label>

                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.score}
                  onChange={(event) =>
                    updateField(
                      "score",
                      event.target.value,
                    )
                  }
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-foreground"
                  placeholder="0 - 100"
                />
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-xl bg-muted/40 p-3">
              <UserRound className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

              <p className="text-xs leading-5 text-muted-foreground">
                Lead owner:{" "}
                <span className="font-medium text-foreground">
                  {lead.owner?.name || "Unknown"}
                </span>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 border-t border-border/50 p-4">
            <button
              type="button"
              disabled={loading}
              onClick={() => onOpenChange(false)}
              className="h-10 rounded-xl px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || !form.firstName.trim()}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-foreground px-4 text-sm font-medium text-background transition-opacity disabled:pointer-events-none disabled:opacity-50"
            >
              {loading && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}

              {loading ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}