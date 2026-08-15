"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  Command,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  User,
  X,
  Sparkles,
  UserPlus,
  CheckCircle2,
} from "lucide-react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import AnimatedKeyboard from "./AnimatedKeyboard";

/* ========================================================= */
/* TYPES */
/* ========================================================= */

type Notification = {
  id: number;
  title: string;
  description: string;
  time: string;
  type: "lead" | "ai" | "success";
  unread: boolean;
};

type DashboardHeaderProps = {
  onMenuClick: () => void;
};

type PageConfig = {
  label: string;
  title: string;
  description: string;
};

type CurrentUser = {
  id: string;
  name: string | null;
  email: string;
};

/* ========================================================= */
/* PAGE CONFIG */
/* ========================================================= */

const pageConfig: Record<string, PageConfig> = {
  "/dashboard": {
    label: "Workspace",
    title: "Overview",
    description:
      "Here's what's happening with your sales pipeline.",
  },

  "/dashboard/leads": {
    label: "Workspace",
    title: "Leads",
    description: "Manage and track your leads.",
  },

  "/dashboard/ai-agent": {
    label: "AI Tools",
    title: "AI Agent",
    description:
      "Let AI analyze and automate your sales workflow.",
  },

  "/dashboard/radar": {
    label: "AI Tools",
    title: "Radar",
    description:
      "Discover opportunities and important sales insights.",
  },

  "/dashboard/campaigns": {
    label: "Workspace",
    title: "Campaigns",
    description:
      "Create, manage, and track your campaigns.",
  },

  "/dashboard/settings": {
    label: "Workspace",
    title: "Settings",
    description:
      "Manage your AIFlow workspace preferences.",
  },

  "/dashboard/profile": {
    label: "Workspace",
    title: "Profile",
    description: "Manage your AIFlow profile.",
  },

  "/dashboard/contacts": {
    label: "Workspace",
    title: "Contacts",
    description:
      "Manage your contacts and customer relationships.",
  },

  "/dashboard/analytics": {
    label: "Insights",
    title: "Analytics",
    description:
      "Track your sales performance and growth.",
  },
};

/* ========================================================= */
/* INITIAL NOTIFICATIONS */
/* ========================================================= */

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "New lead added",
    description:
      "Rahul Sharma was added to your leads.",
    time: "2 minutes ago",
    type: "lead",
    unread: true,
  },

  {
    id: 2,
    title: "AI Agent completed",
    description:
      "Lead analysis is ready to review.",
    time: "15 minutes ago",
    type: "ai",
    unread: true,
  },

  {
    id: 3,
    title: "Campaign completed",
    description:
      "128 leads were successfully processed.",
    time: "1 hour ago",
    type: "success",
    unread: true,
  },

  {
    id: 4,
    title: "Weekly report ready",
    description:
      "Your AIFlow performance report is available.",
    time: "3 hours ago",
    type: "success",
    unread: false,
  },
];

/* ========================================================= */
/* COMPONENT */
/* ========================================================= */

export default function DashboardHeader({
  onMenuClick,
}: DashboardHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [notificationsOpen, setNotificationsOpen] =
    useState(false);

  const [search, setSearch] = useState("");

  const [notifications, setNotifications] =
    useState<Notification[]>(
      initialNotifications
    );

  const [currentUser, setCurrentUser] =
    useState<CurrentUser | null>(null);

  const [userLoading, setUserLoading] =
    useState(true);

  const searchInputRef =
    useRef<HTMLInputElement>(null);

  const notificationsRef =
    useRef<HTMLDivElement>(null);

  /* ======================================================= */
  /* LOAD CURRENT USER */
  /* ======================================================= */

  useEffect(() => {
    let cancelled = false;

    const loadCurrentUser = async () => {
      try {
        setUserLoading(true);

        const response = await fetch(
          "/api/auth/my-profile",
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          if (!cancelled) {
            setCurrentUser(null);
          }

          return;
        }

        const data = await response.json();

        if (
          !cancelled &&
          data?.authenticated &&
          data?.user
        ) {
          setCurrentUser({
            id: String(data.user.id),

            name:
              typeof data.user.name === "string"
                ? data.user.name
                : null,

            email:
              typeof data.user.email === "string"
                ? data.user.email
                : "",
          });
        } else if (!cancelled) {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error(
          "Failed to load current user:",
          error
        );

        if (!cancelled) {
          setCurrentUser(null);
        }
      } finally {
        if (!cancelled) {
          setUserLoading(false);
        }
      }
    };

    loadCurrentUser();

    return () => {
      cancelled = true;
    };
  }, []);

  /* ======================================================= */
  /* DYNAMIC USER DISPLAY */
  /* ======================================================= */

  const displayName =
    currentUser?.name?.trim() || "User";

  const displayEmail =
    currentUser?.email || "";

  const initials =
    displayName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map(
        (word) =>
          word[0]?.toUpperCase()
      )
      .join("") || "U";

  /* ======================================================= */
  /* CURRENT PAGE */
  /* ======================================================= */

  const currentPage =
    pageConfig[pathname] || {
      label: "Workspace",
      title: "Dashboard",
      description:
        "Manage your AIFlow workspace.",
    };

  const isDashboardHome =
    pathname === "/dashboard";

  /* ======================================================= */
  /* UNREAD NOTIFICATIONS */
  /* ======================================================= */

  const unreadCount =
    notifications.filter(
      (notification) =>
        notification.unread
    ).length;

  /* ======================================================= */
  /* THEME HYDRATION */
  /* ======================================================= */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ======================================================= */
  /* KEYBOARD SHORTCUTS */
  /* ======================================================= */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        event.ctrlKey &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();

        setSearchOpen(true);
        setNotificationsOpen(false);
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
        setNotificationsOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  /* ======================================================= */
  /* SEARCH FOCUS */
  /* ======================================================= */

  useEffect(() => {
    if (!searchOpen) return;

    const timer = setTimeout(() => {
      searchInputRef.current?.focus();
    }, 180);

    return () => {
      clearTimeout(timer);
    };
  }, [searchOpen]);

  /* ======================================================= */
  /* OUTSIDE CLICK */
  /* ======================================================= */

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      const target =
        event.target as Node;

      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(
          target
        )
      ) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* ======================================================= */
  /* OPEN SEARCH */
  /* ======================================================= */

  const openSearch = () => {
    setSearchOpen(true);
    setNotificationsOpen(false);
  };

  /* ======================================================= */
  /* CLOSE SEARCH */
  /* ======================================================= */

  const closeSearch = () => {
    setSearchOpen(false);
  };

  /* ======================================================= */
  /* SEARCH */
  /* ======================================================= */

  const handleSearch = (
    value: string
  ) => {
    const trimmedValue =
      value.trim();

    if (!trimmedValue) return;

    console.log(
      "AIFlow Search:",
      trimmedValue
    );

    closeSearch();
  };

  /* ======================================================= */
  /* LOGOUT */
  /* ======================================================= */

  const handleLogout = async () => {
    try {
      await fetch(
        "/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
          cache: "no-store",
        }
      );
    } catch (error) {
      console.error(
        "Logout error:",
        error
      );
    } finally {
      window.location.href =
        "/login";
    }
  };

  /* ======================================================= */
  /* MARK NOTIFICATION READ */
  /* ======================================================= */

  const markAsRead = (
    id: number
  ) => {
    setNotifications(
      (current) =>
        current.map(
          (notification) =>
            notification.id === id
              ? {
                  ...notification,
                  unread: false,
                }
              : notification
        )
    );
  };

  /* ======================================================= */
  /* MARK ALL READ */
  /* ======================================================= */

  const toggleAllRead = (
    checked: boolean
  ) => {
    setNotifications(
      (current) =>
        current.map(
          (notification) => ({
            ...notification,
            unread: !checked,
          })
        )
    );
  };

  /* ======================================================= */
  /* NOTIFICATION ICON */
  /* ======================================================= */

  const getNotificationIcon = (
    type: Notification["type"]
  ) => {
    if (type === "lead") {
      return (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
          <UserPlus className="h-4 w-4" />
        </div>
      );
    }

    if (type === "ai") {
      return (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
          <Sparkles className="h-4 w-4" />
        </div>
      );
    }

    return (
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
        <CheckCircle2 className="h-4 w-4" />
      </div>
    );
  };

  /* ======================================================= */
  /* RENDER */
  /* ======================================================= */

  return (
    <>
      {/* =================================================== */}
      {/* HEADER */}
      {/* =================================================== */}

      <header
        className="
          sticky
          top-0
          z-40
          border-b
          border-border/70
          border-black/[0.08]
          bg-black/[0.025]
          shadow-[0_8px_40px_-20px_hsl(var(--foreground)/0.25)]
          backdrop-blur-2xl
          backdrop-saturate-150
          dark:border-white/[0.10]
          dark:bg-white/[0.045]
        "
      >
        <div
          className="
            flex
            h-16
            items-center
            justify-between
            gap-3
            px-4
            sm:h-20
            sm:px-6
            lg:px-8
          "
        >
          {/* ================================================= */}
          {/* LEFT */}
          {/* ================================================= */}

          <div className="flex min-w-0 items-center gap-3">
            {/* MOBILE MENU */}

            <button
              type="button"
              onClick={onMenuClick}
              className="
                group
                relative
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-border
                text-muted-foreground
                transition-colors
                hover:bg-muted
                hover:text-foreground
                lg:hidden
              "
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />

              <span
                className="
                  pointer-events-none
                  absolute
                  left-0
                  top-full
                  z-50
                  mt-2
                  whitespace-nowrap
                  rounded-lg
                  border
                  border-border
                  bg-popover
                  px-3
                  py-1.5
                  text-[11px]
                  font-medium
                  text-popover-foreground
                  opacity-0
                  shadow-lg
                  transition-all
                  duration-200
                  group-hover:translate-y-1
                  group-hover:opacity-100
                "
              >
                Open navigation
              </span>
            </button>

            {/* PAGE HEADING */}

            <div className="min-w-0">
              <p className="hidden text-xs font-medium text-muted-foreground sm:block">
                {currentPage.label}
              </p>

              <h1
                className="
                  truncate
                  text-lg
                  font-normal
                  tracking-tight
                  sm:mt-1
                  sm:text-xl
                "
              >
                {currentPage.title}
              </h1>
            </div>
          </div>

          {/* ================================================= */}
          {/* RIGHT */}
          {/* ================================================= */}

          <div
            className="
              flex
              shrink-0
              items-center
              gap-1.5
              sm:gap-2
            "
          >
            {/* DESKTOP SEARCH */}

            <button
              type="button"
              onClick={openSearch}
              className="
                group
                relative
                hidden
                h-10
                w-56
                items-center
                gap-3
                rounded-xl
                border
                border-border
                bg-background
                px-3
                text-sm
                text-muted-foreground
                transition-all
                hover:border-primary/40
                hover:bg-muted
                xl:flex
              "
              aria-label="Open search"
            >
              <Search className="h-4 w-4 shrink-0" />

              <span className="flex-1 text-left">
                Search...
              </span>

              <kbd
                className="
                  flex
                  items-center
                  gap-1
                  rounded-md
                  border
                  border-border
                  px-1.5
                  py-0.5
                  text-[10px]
                "
              >
                <Command className="h-2.5 w-2.5" />
                K
              </kbd>
            </button>

            {/* MOBILE SEARCH */}

            <button
              type="button"
              onClick={openSearch}
              className="
                group
                relative
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-border
                text-muted-foreground
                transition-colors
                hover:bg-muted
                hover:text-foreground
                xl:hidden
              "
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* THEME */}

            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setTheme(
                  theme === "dark"
                    ? "light"
                    : "dark"
                )
              }
              className="
                group
                relative
                h-10
                w-10
                rounded-xl
                border
                border-border
                text-muted-foreground
                transition-all
                hover:bg-muted
                hover:text-foreground
              "
              aria-label={
                mounted
                  ? theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                  : "Toggle theme"
              }
            >
              {mounted ? (
                theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* ================================================= */}
            {/* NOTIFICATIONS */}
            {/* ================================================= */}

            <div
              ref={notificationsRef}
              className="relative"
            >
              <button
                type="button"
                onClick={() => {
                  setNotificationsOpen(
                    (open) => !open
                  );
                  setSearchOpen(false);
                }}
                className="
                  group
                  relative
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-border
                  text-muted-foreground
                  transition-all
                  hover:bg-muted
                  hover:text-foreground
                "
                aria-label="Notifications"
                aria-expanded={
                  notificationsOpen
                }
              >
                <Bell className="h-4 w-4" />

                {unreadCount > 0 && (
                  <span
                    className="
                      absolute
                      -right-1
                      -top-1
                      flex
                      h-[18px]
                      min-w-[18px]
                      items-center
                      justify-center
                      rounded-full
                      bg-primary
                      px-1
                      text-[9px]
                      font-semibold
                      text-primary-foreground
                      ring-2
                      ring-background
                    "
                  >
                    {unreadCount > 9
                      ? "9+"
                      : unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -8,
                      scale: 0.97,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                      scale: 0.97,
                    }}
                    transition={{
                      duration: 0.18,
                      ease: "easeOut",
                    }}
                    className="
                      fixed
                      left-4
                      right-4
                      top-[70px]
                      z-50
                      overflow-hidden
                      rounded-2xl
                      border
                      border-border
                      bg-popover
                      shadow-2xl
                      sm:absolute
                      sm:left-auto
                      sm:right-0
                      sm:top-14
                      sm:w-[380px]
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-3
                        border-b
                        border-border
                        px-4
                        py-4
                      "
                    >
                      <div>
                        <h3 className="text-sm font-semibold">
                          Notifications
                        </h3>

                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          {unreadCount > 0
                            ? `${unreadCount} unread notification${
                                unreadCount > 1
                                  ? "s"
                                  : ""
                              }`
                            : "You're all caught up"}
                        </p>
                      </div>

                      <label
                        className="
                          flex
                          shrink-0
                          cursor-pointer
                          items-center
                          gap-2
                          text-[11px]
                          font-medium
                          text-muted-foreground
                        "
                      >
                        <input
                          type="checkbox"
                          checked={
                            unreadCount === 0
                          }
                          onChange={(event) =>
                            toggleAllRead(
                              event.target
                                .checked
                            )
                          }
                          className="
                            h-3.5
                            w-3.5
                            cursor-pointer
                            accent-primary
                          "
                          aria-label="Mark all notifications as read"
                        />

                        <span className="hidden sm:inline">
                          Mark all read
                        </span>
                      </label>
                    </div>

                    <div
                      className="
                        max-h-[55vh]
                        overflow-y-auto
                        p-2
                        sm:max-h-[360px]
                      "
                    >
                      <div className="space-y-1">
                        {notifications.map(
                          (notification) => (
                            <button
                              key={
                                notification.id
                              }
                              type="button"
                              onClick={() =>
                                markAsRead(
                                  notification.id
                                )
                              }
                              className={`
                                group
                                flex
                                w-full
                                items-start
                                gap-3
                                rounded-xl
                                p-3
                                text-left
                                transition-colors
                                hover:bg-muted
                                ${
                                  notification.unread
                                    ? "bg-primary/[0.035]"
                                    : ""
                                }
                              `}
                            >
                              {getNotificationIcon(
                                notification.type
                              )}

                              <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-2">
                                  <p
                                    className={`
                                      text-xs
                                      ${
                                        notification.unread
                                          ? "font-semibold"
                                          : "font-medium"
                                      }
                                    `}
                                  >
                                    {
                                      notification.title
                                    }
                                  </p>

                                  {notification.unread && (
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                  )}
                                </div>

                                <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                                  {
                                    notification.description
                                  }
                                </p>

                                <p className="mt-1.5 text-[10px] text-muted-foreground/70">
                                  {
                                    notification.time
                                  }
                                </p>
                              </div>
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    <div className="border-t border-border p-2">
                      <button
                        type="button"
                        className="
                          flex
                          w-full
                          items-center
                          justify-center
                          rounded-xl
                          py-2.5
                          text-xs
                          font-medium
                          text-muted-foreground
                          transition-colors
                          hover:bg-muted
                          hover:text-foreground
                        "
                      >
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ================================================= */}
            {/* PROFILE DROPDOWN */}
            {/* ================================================= */}

            <div className="relative ml-0.5">
              <DropdownMenu>
                <DropdownMenuTrigger
                  type="button"
                  aria-label="Account menu"
                  className="
                    group
                    flex
                    h-10
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-transparent
                    px-1.5
                    transition-colors
                    hover:border-border
                    hover:bg-muted
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-primary/30
                    sm:px-2
                  "
                >
                  {/* AVATAR */}

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-primary/10
                      text-xs
                      font-semibold
                      text-primary
                    "
                  >
                    {userLoading
                      ? "..."
                      : initials}
                  </div>

                  {/* USER INFO */}

                  <div className="hidden min-w-0 text-left lg:block">
                    <p className="max-w-[130px] truncate text-xs font-medium">
                      {userLoading
                        ? "Loading..."
                        : displayName}
                    </p>

                    <p className="max-w-[130px] truncate text-[10px] text-muted-foreground">
                      {userLoading
                        ? "Loading..."
                        : displayEmail}
                    </p>
                  </div>

                  {/* ARROW */}

                  <ChevronDown
                    className="
                      hidden
                      h-4
                      w-4
                      text-muted-foreground
                      transition-transform
                      duration-200
                      group-data-[popup-open]:rotate-180
                      lg:block
                    "
                  />
                </DropdownMenuTrigger>

                {/* ================================================= */}
                {/* PROFILE CONTENT */}
                {/* ================================================= */}

                <DropdownMenuContent
                  align="end"
                  sideOffset={8}
                  className="
                    w-[260px]
                    rounded-2xl
                    border
                    border-border
                    bg-popover
                    p-1.5
                    shadow-xl
                  "
                >
                  {/* USER INFORMATION */}

                  <div className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-primary/10
                          text-sm
                          font-semibold
                          text-primary
                        "
                      >
                        {userLoading
                          ? "..."
                          : initials}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {userLoading
                            ? "Loading..."
                            : displayName}
                        </p>

                        <p className="truncate text-[11px] text-muted-foreground">
                          {userLoading
                            ? "Loading..."
                            : displayEmail}
                        </p>
                      </div>
                    </div>

                    {/* PLAN */}

                    <div
                      className="
                        mt-3
                        rounded-lg
                        bg-muted/50
                        px-2.5
                        py-2
                      "
                    >
                      <p
                        className="
                          text-[10px]
                          font-medium
                          uppercase
                          tracking-wider
                          text-muted-foreground
                        "
                      >
                        Current plan
                      </p>

                      <p className="mt-0.5 text-xs font-medium">
                        Free plan
                      </p>
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  {/* PROFILE */}

                  <DropdownMenuItem
                    onClick={() =>
                      router.push(
                        "/dashboard/profile"
                      )
                    }
                    className="
                      cursor-pointer
                      rounded-xl
                      px-3
                      py-2.5
                    "
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>

                  {/* SETTINGS */}

                  <DropdownMenuItem
                    onClick={() =>
                      router.push(
                        "/dashboard/settings"
                      )
                    }
                    className="
                      cursor-pointer
                      rounded-xl
                      px-3
                      py-2.5
                    "
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  {/* SIGN OUT */}

                  <DropdownMenuItem
                    onClick={handleLogout}
                    variant="destructive"
                    className="
                      cursor-pointer
                      rounded-xl
                      px-3
                      py-2.5
                    "
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* ===================================================== */}
      {/* DASHBOARD HOME WELCOME */}
      {/* ===================================================== */}

      {isDashboardHome && (
        <div
          className="
            relative
            z-1
            mb-6
            px-4
            pt-4
            sm:px-6
            lg:px-8
          "
        >
          <h2
            className="
              text-4xl
              font-bold
              tracking-tight
            "
          >
            Welcome back, {displayName} 👋
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {currentPage.description}
          </p>
        </div>
      )}

      {/* ===================================================== */}
      {/* OTHER PAGE DESCRIPTION */}
      {/* ===================================================== */}

      {!isDashboardHome && (
        <div className="px-4 pt-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            {currentPage.description}
          </p>
        </div>
      )}

      {/* ===================================================== */}
      {/* SEARCH MODAL */}
      {/* ===================================================== */}

      <AnimatePresence>
        {searchOpen && (
          <>
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
              onClick={closeSearch}
              className="
                fixed
                inset-0
                z-[90]
                bg-black/40
                backdrop-blur-sm
              "
            />

            <motion.div
              initial={{
                opacity: 0,
                y: -25,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -20,
                scale: 0.96,
              }}
              transition={{
                duration: 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                fixed
                left-4
                right-4
                top-[8%]
                z-[100]
                max-h-[84vh]
                overflow-y-auto
                rounded-2xl
                border
                border-border
                bg-background
                shadow-2xl
                sm:left-1/2
                sm:right-auto
                sm:top-[10%]
                sm:w-[calc(100%-32px)]
                sm:max-w-3xl
                sm:-translate-x-1/2
              "
            >
              <div
                className="
                  sticky
                  top-0
                  z-20
                  flex
                  h-16
                  items-center
                  gap-3
                  border-b
                  border-border
                  bg-background/95
                  px-4
                  backdrop-blur-xl
                  sm:px-5
                "
              >
                <Search className="h-5 w-5 shrink-0 text-muted-foreground" />

                <input
                  ref={searchInputRef}
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter"
                    ) {
                      handleSearch(search);
                    }
                  }}
                  placeholder="Search anything..."
                  className="
                    h-full
                    min-w-0
                    flex-1
                    bg-transparent
                    text-sm
                    outline-none
                    placeholder:text-muted-foreground
                  "
                  autoComplete="off"
                  autoFocus
                />

                <button
                  type="button"
                  onClick={closeSearch}
                  className="
                    group
                    relative
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-md
                    text-muted-foreground
                    transition-colors
                    hover:bg-muted
                    hover:text-foreground
                  "
                  aria-label="Close search"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="border-b border-border p-3 sm:p-4">
                <AnimatedKeyboard
                  value={search}
                  onChange={setSearch}
                  onEnter={() =>
                    handleSearch(search)
                  }
                  onClose={closeSearch}
                  showSearch={false}
                  sounds={{
                    key: "/KeyboardSounds/key.mp3",
                    number:
                      "/KeyboardSounds/Number.mp3",
                    space:
                      "/KeyboardSounds/Spacebar.mp3",
                    enter:
                      "/KeyboardSounds/Enter.mp3",
                    backspace:
                      "/KeyboardSounds/Backspace.mp3",
                    modifier:
                      "/KeyboardSounds/Modifiy.mp3",
                  }}
                />
              </div>

              <div className="p-4 sm:p-5">
                <AnimatePresence mode="wait">
                  {search ? (
                    <motion.div
                      key="results"
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
                        y: -8,
                      }}
                      className="py-6 text-center"
                    >
                      <Search className="mx-auto h-6 w-6 text-muted-foreground" />

                      <p className="mt-3 text-sm font-medium">
                        Searching for "{search}"
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Press Enter to search.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="quick-actions"
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
                        y: -8,
                      }}
                    >
                      <p
                        className="
                          px-2
                          pb-2
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.15em]
                          text-muted-foreground
                        "
                      >
                        Quick actions
                      </p>

                      <div className="space-y-1">
                        <button
                          type="button"
                          onClick={() => {
                            closeSearch();
                            router.push(
                              "/dashboard/leads"
                            );
                          }}
                          className="
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-xl
                            px-3
                            py-3
                            text-left
                            transition-colors
                            hover:bg-muted
                          "
                        >
                          <div
                            className="
                              flex
                              h-8
                              w-8
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              bg-primary/10
                              text-primary
                            "
                          >
                            <User className="h-4 w-4" />
                          </div>

                          <div>
                            <p className="text-sm font-medium">
                              Find leads
                            </p>

                            <p className="text-xs text-muted-foreground">
                              Search your leads and contacts
                            </p>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            closeSearch();
                            router.push(
                              "/dashboard/settings"
                            );
                          }}
                          className="
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-xl
                            px-3
                            py-3
                            text-left
                            transition-colors
                            hover:bg-muted
                          "
                        >
                          <div
                            className="
                              flex
                              h-8
                              w-8
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              bg-primary/10
                              text-primary
                            "
                          >
                            <Settings className="h-4 w-4" />
                          </div>

                          <div>
                            <p className="text-sm font-medium">
                              Open settings
                            </p>

                            <p className="text-xs text-muted-foreground">
                              Manage your AIFlow workspace
                            </p>
                          </div>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-t
                  border-border
                  bg-muted/30
                  px-4
                  py-3
                  sm:px-5
                "
              >
                <span className="text-[10px] text-muted-foreground">
                  Type on your keyboard · Enter to search
                </span>

                <span className="text-[10px] text-muted-foreground">
                  AIFlow Search
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}