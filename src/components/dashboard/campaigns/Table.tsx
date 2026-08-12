"use client";

import { motion } from "motion/react";
import {
  Copy,
  Eye,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Pause,
  Pencil,
  Play,
  SearchX,
  Send,
  Trash2,
  Trophy,
  Users,
} from "lucide-react";

import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { CampaignStatus } from "@/app/dashboard/campaigns/page";

/* =========================================================
   TYPES
========================================================= */

interface Campaign {
  id: number;
  name: string;
  channel: "Email" | "LinkedIn";
  contacts: number;
  replies: number;
  won: number;
  progress: number;
  status: Exclude<CampaignStatus, "All">;
  lastActivity: string;
}

/* =========================================================
   DATA
========================================================= */

const campaigns: Campaign[] = [
  {
    id: 1,
    name: "Cold Outreach",
    channel: "Email",
    contacts: 4820,
    replies: 18.6,
    won: 142,
    progress: 76,
    status: "Active",
    lastActivity: "2 min ago",
  },
  {
    id: 2,
    name: "LinkedIn Growth",
    channel: "LinkedIn",
    contacts: 3240,
    replies: 24.2,
    won: 76,
    progress: 64,
    status: "Active",
    lastActivity: "8 min ago",
  },
  {
    id: 3,
    name: "Enterprise Outreach",
    channel: "Email",
    contacts: 1860,
    replies: 16.8,
    won: 48,
    progress: 51,
    status: "Paused",
    lastActivity: "1 hour ago",
  },
  {
    id: 4,
    name: "SaaS Founders",
    channel: "LinkedIn",
    contacts: 1240,
    replies: 27.4,
    won: 31,
    progress: 88,
    status: "Active",
    lastActivity: "24 min ago",
  },
  {
    id: 5,
    name: "Q2 Reactivation",
    channel: "Email",
    contacts: 980,
    replies: 31.2,
    won: 42,
    progress: 100,
    status: "Completed",
    lastActivity: "Yesterday",
  },
  {
    id: 6,
    name: "Product Launch",
    channel: "Email",
    contacts: 2140,
    replies: 22.8,
    won: 54,
    progress: 42,
    status: "Active",
    lastActivity: "12 min ago",
  },
  {
    id: 7,
    name: "Startup Founders",
    channel: "LinkedIn",
    contacts: 1680,
    replies: 26.1,
    won: 37,
    progress: 69,
    status: "Paused",
    lastActivity: "3 hours ago",
  },
];

/* =========================================================
   PROPS
========================================================= */

interface TableProps {
  search: string;
  status: CampaignStatus;
}

/* =========================================================
   HELPERS
========================================================= */

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

/* =========================================================
   CHANNEL ICON
========================================================= */

function ChannelIcon({
  channel,
}: {
  channel: Campaign["channel"];
}) {
  if (channel === "LinkedIn") {
    return <Send className="size-4" />;
  }

  return <Mail className="size-4" />;
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  status,
}: {
  status: Campaign["status"];
}) {
  return (
    <Badge
      variant={
        status === "Active"
          ? "default"
          : status === "Paused"
            ? "secondary"
            : "outline"
      }
    >
      {status}
    </Badge>
  );
}

/* =========================================================
   ACTION MENU
========================================================= */

function CampaignActions({
  campaign,
}: {
  campaign: Campaign;
}) {
  const isActive = campaign.status === "Active";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-44"
      >
        <DropdownMenuItem>
          <Eye className="size-2.5" />

          <span className="text-xs">
            View Campaign
          </span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Pencil className="size-2.5" />

          <span className="text-xs">
            Edit Campaign
          </span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          {isActive ? (
            <Pause className="size-2.5" />
          ) : (
            <Play className="size-2.5" />
          )}

          <span className="text-xs">
            {isActive
              ? "Pause Campaign"
              : "Resume Campaign"}
          </span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Copy className="size-2.5" />

          <span className="text-xs">
            Duplicate Campaign
          </span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Trash2 className="size-2.5 text-destructive" />

          <span className="text-xs text-destructive">
            Delete Campaign
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* =========================================================
   MAIN TABLE
========================================================= */

export default function Table({
  search,
  status,
}: TableProps) {
  const query = search.trim().toLowerCase();

  const filteredCampaigns = campaigns.filter(
    (campaign) => {
      const matchesSearch =
        query === "" ||
        campaign.name
          .toLowerCase()
          .includes(query) ||
        campaign.channel
          .toLowerCase()
          .includes(query) ||
        campaign.status
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        status === "All" ||
        campaign.status === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    },
  );

  return (
    <section className="w-full overflow-hidden rounded-md border bg-card">
      {/* =====================================================
          DESKTOP TABLE
      ====================================================== */}

      <div className="hidden overflow-x-auto md:block">
        <ShadcnTable>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[240px]">
                Campaign
              </TableHead>

              <TableHead>
                Contacts
              </TableHead>

              <TableHead>
                Replies
              </TableHead>

              <TableHead>
                Won
              </TableHead>

              <TableHead className="min-w-[180px]">
                Progress
              </TableHead>

              <TableHead>
                Status
              </TableHead>

              <TableHead>
                Activity
              </TableHead>

              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredCampaigns.map(
              (campaign, index) => (
                <motion.tr
                  key={campaign.id}
                  initial={{
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.03,
                  }}
                >
                  {/* Campaign */}

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="size-9 shrink-0"
                      >
                        <ChannelIcon
                          channel={
                            campaign.channel
                          }
                        />
                      </Button>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {campaign.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {
                            campaign.channel
                          }
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Contacts */}

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="size-3.5 text-muted-foreground" />

                      <span className="text-sm">
                        {formatNumber(
                          campaign.contacts,
                        )}
                      </span>
                    </div>
                  </TableCell>

                  {/* Replies */}

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="size-3.5 text-muted-foreground" />

                      <span className="text-sm">
                        {campaign.replies}%
                      </span>
                    </div>
                  </TableCell>

                  {/* Won */}

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Trophy className="size-3.5 text-muted-foreground" />

                      <span className="text-sm">
                        {campaign.won}
                      </span>
                    </div>
                  </TableCell>

                  {/* Progress */}

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Progress
                        value={
                          campaign.progress
                        }
                        className="w-24"
                      />

                      <span className="text-xs text-muted-foreground">
                        {campaign.progress}%
                      </span>
                    </div>
                  </TableCell>

                  {/* Status */}

                  <TableCell>
                    <StatusBadge
                      status={
                        campaign.status
                      }
                    />
                  </TableCell>

                  {/* Activity */}

                  <TableCell>
                    <span className="whitespace-nowrap text-xs text-muted-foreground">
                      {
                        campaign.lastActivity
                      }
                    </span>
                  </TableCell>

                  {/* Actions */}

                  <TableCell>
                    <CampaignActions
                      campaign={campaign}
                    />
                  </TableCell>
                </motion.tr>
              ),
            )}

            {/* Empty */}

            {filteredCampaigns.length ===
              0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-32 text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <SearchX className="size-5 text-muted-foreground" />

                      <span className="text-sm text-muted-foreground">
                        No campaigns found.
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </ShadcnTable>
      </div>

      {/* =====================================================
          MOBILE
      ====================================================== */}

      <div className="divide-y md:hidden">
        {filteredCampaigns.map(
          (campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{
                opacity: 0,
                y: 5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.2,
                delay: index * 0.03,
              }}
              className="p-4"
            >
              {/* Header */}

              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="size-9 shrink-0"
                  >
                    <ChannelIcon
                      channel={
                        campaign.channel
                      }
                    />
                  </Button>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {campaign.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {campaign.channel}
                    </p>
                  </div>
                </div>

                <CampaignActions
                  campaign={campaign}
                />
              </div>

              {/* Metrics */}

              <div className="mt-4 grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Contacts
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {formatNumber(
                      campaign.contacts,
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Replies
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {campaign.replies}%
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Won
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {campaign.won}
                  </p>
                </div>
              </div>

              {/* Progress */}

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Progress
                  </span>

                  <span className="text-xs">
                    {campaign.progress}%
                  </span>
                </div>

                <Progress
                  value={
                    campaign.progress
                  }
                />
              </div>

              {/* Footer */}

              <div className="mt-4 flex items-center justify-between gap-3">
                <StatusBadge
                  status={
                    campaign.status
                  }
                />

                <span className="text-xs text-muted-foreground">
                  {
                    campaign.lastActivity
                  }
                </span>
              </div>
            </motion.div>
          ),
        )}

        {filteredCampaigns.length ===
          0 && (
            <div className="flex flex-col items-center justify-center gap-2">
              <SearchX className="size-5 text-muted-foreground" />

              <span className="text-sm text-muted-foreground">
                No campaigns found.
              </span>
            </div>
          )}
      </div>
    </section>
  );
}