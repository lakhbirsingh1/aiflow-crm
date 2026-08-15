"use client";

import { motion } from "motion/react";
import {
  Megaphone,
  MessageSquare,
  Plus,
  Search,
  SlidersHorizontal,
  Trophy,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { CampaignStatus } from "@/app/dashboard/campaigns/page";

interface HeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: CampaignStatus;
  onStatusChange: (value: CampaignStatus) => void;
}

export default function Header({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: HeaderProps) {
  return (
    <section className="w-full space-y-5">
      {/* Header */}

      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.3,
        }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Megaphone className="size-5 text-primary" />

            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Campaigns
            </h1>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Monitor and manage your sales campaigns.
          </p>
        </div>

        <Button
          type="button"
          className="w-full sm:w-auto"
        >
          <Plus />
          Create Campaign
        </Button>
      </motion.div>

      {/* Search + Filter + Stats */}

      <motion.div
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.3,
          delay: 0.05,
        }}
        className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"
      >
        {/* Search + Filter */}

        <div className="flex w-full gap-2 lg:max-w-xl">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(event) =>
                onSearchChange(event.target.value)
              }
              placeholder="Search campaigns..."
              className="h-10 pl-9"
            />
          </div>

          {/* IMPORTANT:
              No Button inside DropdownMenuTrigger.
              Trigger itself is the Shadcn trigger.
          */}

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md border bg-background px-3 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <SlidersHorizontal className="size-4" />

              <span className="hidden sm:inline">
                {status === "All"
                  ? "Filter"
                  : status}
              </span>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-48"
            >
              <DropdownMenuRadioGroup
                value={status}
                onValueChange={(value) =>
                  onStatusChange(
                    value as CampaignStatus,
                  )
                }
              >
                <DropdownMenuRadioItem value="All">
                  All Campaigns
                </DropdownMenuRadioItem>

                <DropdownMenuRadioItem value="Active">
                  Active
                </DropdownMenuRadioItem>

                <DropdownMenuRadioItem value="Paused">
                  Paused
                </DropdownMenuRadioItem>

                <DropdownMenuRadioItem value="Completed">
                  Completed
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        
      </motion.div>
      {/* Stats */}

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:w-auto mb-4">
          <Stat
            icon={Megaphone}
            label="Active"
            value="4"
          />

          <Stat
            icon={Users}
            label="Contacts"
            value="8,060"
          />

          <Stat
            icon={MessageSquare}
            label="Replies"
            value="21.4%"
          />

          <Stat
            icon={Trophy}
            label="Won"
            value="218"
          />
        </div>
    </section>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-md border bg-card px-3 py-2">
      <Icon className="size-4 shrink-0 text-muted-foreground" />

      <div className="min-w-0">
        <p className="text-[11px] text-muted-foreground">
          {label}
        </p>

        <p className="text-sm font-semibold">
          {value}
        </p>
      </div>
    </div>
  );
}