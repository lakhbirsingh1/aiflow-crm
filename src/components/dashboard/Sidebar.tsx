"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bot,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Megaphone,
  Radar,
  Settings,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type DashboardSidebarProps = {
  mobileOpen: boolean;
  onMobileClose: () => void;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
};

const navigation = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Leads",
    href: "/dashboard/leads",
    icon: Users,
  },
  {
    label: "AI Agent",
    href: "/dashboard/ai-agent",
    icon: Bot,
  },
  {
    label: "AI Radar",
    href: "/dashboard/radar",
    icon: Radar,
    featured: true,
  },
  {
    label: "Campaigns",
    href: "/dashboard/campaigns",
    icon: Megaphone,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
];

export default function DashboardSidebar({
  mobileOpen,
  onMobileClose,
  collapsed,
  onCollapsedChange,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  const sidebarContent = (
    <>
      {/* HEADER */}
      <div
        className={`relative flex h-20 shrink-0 items-center border-b border-border px-4 ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        <Link
          href="/dashboard"
          onClick={onMobileClose}
          className="flex min-w-0 items-center"
        >
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.18 }}
                className="overflow-hidden whitespace-nowrap text-lg font-semibold tracking-tight"
              >
                AIFlow
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        {/* DESKTOP COLLAPSE */}
        <button
          type="button"
          onClick={() => onCollapsedChange(!collapsed)}
          className={`group relative hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:flex ${
            collapsed ? "" : "ml-2"
          }`}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}

          <span className="pointer-events-none absolute left-full z-[100] ml-3 whitespace-nowrap rounded-lg border border-border bg-popover px-3 py-1.5 text-[11px] font-medium text-popover-foreground opacity-0 shadow-lg transition-all group-hover:translate-x-1 group-hover:opacity-100">
            {collapsed ? "Expand sidebar" : "Collapse sidebar"}
          </span>
        </button>

        {/* MOBILE CLOSE */}
        <button
          type="button"
          onClick={onMobileClose}
          className="absolute right-4 top-5 flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
          aria-label="Close navigation"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-3">
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.p
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.15 }}
              className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
            >
              Workspace
            </motion.p>
          )}
        </AnimatePresence>

        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            /*
             * Actual active state is based on the current route.
             *
             * /dashboard                → Overview
             * /dashboard/leads          → Leads
             * /dashboard/ai-agent       → AI Agent
             * /dashboard/ai-radar       → AI Radar
             * /dashboard/campaigns      → Campaigns
             * /dashboard/analytics      → Analytics
             */
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" &&
                pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onMobileClose}
                className={`group relative flex h-11 items-center rounded-xl text-sm font-medium transition-colors ${
                  collapsed
                    ? "justify-center px-0"
                    : "gap-3 px-3"
                } ${
                  isActive
                    ? "bg-primary/[0.10] text-primary shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.10)] hover:bg-primary/[0.14]"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {/* ACTIVE INDICATOR */}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active-indicator"
                      initial={{ opacity: 0, scaleY: 0.5 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0.5 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                      className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-primary"
                    />
                  )}
                </AnimatePresence>

                {/* ICON */}
                <span
                  className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                    isActive ? "bg-primary/15" : ""
                  }`}
                >
                  {/* AI RADAR SPECIAL GLOW */}
                  {item.featured && (
                    <motion.span
                      className="absolute inset-0 rounded-lg bg-primary/10"
                      animate={{
                        opacity: [0.2, 0.55, 0.2],
                        scale: [0.95, 1.08, 0.95],
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}

                  <Icon
                    className={`relative h-[18px] w-[18px] ${
                      isActive
                        ? "text-primary"
                        : item.featured
                          ? "text-primary"
                          : ""
                    }`}
                  />

                  {/* AI RADAR LIVE PULSE */}
                  {item.featured && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
                      <motion.span
                        className="absolute right-0 top-0 h-2 w-2 rounded-full bg-primary"
                        animate={{
                          scale: [1, 2.2, 1],
                          opacity: [0.45, 0, 0.45],
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />

                      <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
                    </span>
                  )}
                </span>

                {/* LABEL */}
                <AnimatePresence initial={false}>
                  {!collapsed && (
                    <motion.span
                      initial={{
                        opacity: 0,
                        width: 0,
                      }}
                      animate={{
                        opacity: 1,
                        width: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        width: 0,
                      }}
                      transition={{
                        duration: 0.15,
                      }}
                      className="truncate overflow-hidden whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* AI RADAR LIVE BADGE */}
                {item.featured && !collapsed && (
                  <motion.span
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-primary/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-primary"
                  >
                    <Sparkles className="h-2.5 w-2.5" />
                    Live
                  </motion.span>
                )}

                {/* COLLAPSED TOOLTIP */}
                {collapsed && (
                  <span className="pointer-events-none absolute left-full z-[100] ml-3 whitespace-nowrap rounded-lg border border-border bg-popover px-3 py-1.5 text-[11px] font-medium text-popover-foreground opacity-0 shadow-lg transition-all group-hover:translate-x-1 group-hover:opacity-100">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* AI INTELLIGENCE CARD */}
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 8,
              }}
              transition={{
                duration: 0.2,
                delay: 0.05,
              }}
              className="mt-6 rounded-2xl border border-border bg-muted/30 p-3"
            >
              {/* CARD HEADER */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10"
                  >
                    <Zap className="h-3.5 w-3.5 text-primary" />
                  </motion.div>

                  <div>
                    <p className="text-[11px] font-semibold">
                      AI Intelligence
                    </p>

                    <div className="mt-0.5 flex items-center gap-1.5">
                      <motion.span
                        animate={{
                          opacity: [0.4, 1, 0.4],
                          scale: [0.9, 1.15, 0.9],
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                      />

                      <span className="text-[9px] text-muted-foreground">
                        All systems active
                      </span>
                    </div>
                  </div>
                </div>

                <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
              </div>

              {/* CARD CONTENT */}
              <div className="mt-3 rounded-xl border border-border/70 bg-background/60 px-3 py-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">
                    Radar status
                  </span>

                  <div className="flex items-center gap-1.5">
                    <motion.span
                      animate={{
                        opacity: [0.4, 1, 0.4],
                      }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="h-1.5 w-1.5 rounded-full bg-primary"
                    />

                    <span className="text-[10px] font-medium text-primary">
                      Live
                    </span>
                  </div>
                </div>

                <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">
                  AI is continuously scanning your workspace for new
                  signals.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* BOTTOM */}
      <div className="shrink-0 border-t border-border p-3">
        <Link
          href="/dashboard/settings"
          onClick={onMobileClose}
          className={`group relative flex h-11 items-center rounded-xl text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${
            collapsed
              ? "justify-center px-0"
              : "gap-3 px-3"
          }`}
        >
          <Settings className="h-[18px] w-[18px] shrink-0" />

          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                initial={{
                  opacity: 0,
                  width: 0,
                }}
                animate={{
                  opacity: 1,
                  width: "auto",
                }}
                exit={{
                  opacity: 0,
                  width: 0,
                }}
                transition={{
                  duration: 0.15,
                }}
                className="overflow-hidden whitespace-nowrap"
              >
                Settings
              </motion.span>
            )}
          </AnimatePresence>

          {/* COLLAPSED TOOLTIP */}
          {collapsed && (
            <span className="pointer-events-none absolute left-full z-[100] ml-3 whitespace-nowrap rounded-lg border border-border bg-popover px-3 py-1.5 text-[11px] font-medium text-popover-foreground opacity-0 shadow-lg transition-all group-hover:translate-x-1 group-hover:opacity-100">
              Settings
            </span>
          )}
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 hidden border-r border-border bg-black/[0.025] shadow-[0_8px_40px_-20px_hsl(var(--foreground)/0.25)] backdrop-blur-2xl backdrop-saturate-150 dark:bg-white/[0.045] lg:flex lg:flex-col ${
          collapsed ? "w-[76px]" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            onClick={onMobileClose}
            className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{
              x: "-100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "-100%",
            }}
            transition={{
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-y-0 left-0 z-[80] flex w-[285px] flex-col border-r border-border bg-background shadow-2xl lg:hidden"
          >
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}