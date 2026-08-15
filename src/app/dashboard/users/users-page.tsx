
"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, type Variants } from "motion/react";
import {
    Activity,
    CalendarDays,
    ChevronDown,
    Crown,
    Loader2,
    Mail,
    Search,
    ShieldCheck,
    Sparkles,
    Target,
    Trash2,
    Users,
    UserRound,
    X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

type UserRole = "USER" | "ADMIN";

type AdminUser = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    accountType: "Google" | "Password";
    createdAt: string;
    leadsCount: number;
    campaignsCount: number;
    activitiesCount: number;
};

type RoleFilter = "ALL" | UserRole;

const containerVariants: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.06,
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
            duration: 0.35,
            ease: "easeOut",
        },
    },
};

function getInitials(name: string) {
    const parts = name.trim().split(/\s+/);

    if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase();
    }

    return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}

function formatDate(date: string) {
    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(date));
}

export default function UsersPage() {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState<RoleFilter>("ALL");

    const [selectedUser, setSelectedUser] =
        useState<AdminUser | null>(null);

    const [deletingUserId, setDeletingUserId] =
        useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function loadUsers() {
            try {
                setLoading(true);
                setError("");

                const response = await fetch("/api/admin/users", {
                    method: "GET",
                    cache: "no-store",
                });

                const data = await response.json();

                if (!response.ok || !data.success) {
                    throw new Error(
                        data.error || "Unable to load users"
                    );
                }

                if (!cancelled) {
                    setUsers(data.users ?? []);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Unable to load users"
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadUsers();

        return () => {
            cancelled = true;
        };
    }, []);

    const filteredUsers = useMemo(() => {
        const query = search.trim().toLowerCase();

        return users.filter((user) => {
            const matchesSearch =
                !query ||
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query);

            const matchesRole =
                roleFilter === "ALL" ||
                user.role === roleFilter;

            return matchesSearch && matchesRole;
        });
    }, [users, search, roleFilter]);

    const adminCount = users.filter(
        (user) => user.role === "ADMIN"
    ).length;

    const normalUserCount = users.filter(
        (user) => user.role === "USER"
    ).length;

    const googleUsers = users.filter(
        (user) => user.accountType === "Google"
    ).length;

    const totalLeads = users.reduce(
        (total, user) => total + user.leadsCount,
        0
    );

    const clearSearch = () => {
        setSearch("");
    };

    function openDeleteDialog(user: AdminUser) {
        if (user.role === "ADMIN") {
            return;
        }

        setSelectedUser(user);
    }

    function closeDeleteDialog() {
        if (deletingUserId) {
            return;
        }

        setSelectedUser(null);
    }

    async function handleDeleteUser() {
        if (!selectedUser || deletingUserId) {
            return;
        }

        const user = selectedUser;

        try {
            setDeletingUserId(user.id);
            setError("");

            const response = await fetch(
                `/api/admin/users?id=${encodeURIComponent(user.id)}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    cache: "no-store",
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.error || "Unable to delete user"
                );
            }

            setUsers((currentUsers) =>
                currentUsers.filter(
                    (currentUser) =>
                        currentUser.id !== user.id
                )
            );

            setSelectedUser(null);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Unable to delete user"
            );
        } finally {
            setDeletingUserId(null);
        }
    }

    return (
        <div className="min-h-full w-full">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-6 p-4 md:p-6 lg:p-8"
            >
                {/* Header */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
                >
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="flex size-8 items-center justify-center rounded-lg border bg-background shadow-sm">
                                <Users className="size-4" />
                            </div>

                            <Badge variant="secondary">
                                Admin
                            </Badge>
                        </div>

                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                                Users
                            </h1>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Manage registered users and monitor
                                account activity.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Badge
                            variant="outline"
                            className="h-9 gap-2 rounded-lg px-3"
                        >
                            <ShieldCheck className="size-4" />
                            Admin access
                        </Badge>
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    variants={containerVariants}
                    className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
                >
                    <motion.div variants={itemVariants}>
                        <Card className="h-full">
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Total users
                                        </p>

                                        <p className="mt-2 text-2xl font-semibold tracking-tight">
                                            {users.length}
                                        </p>
                                    </div>

                                    <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                                        <Users className="size-4" />
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                                    <span>
                                        {normalUserCount} users
                                    </span>

                                    <span>•</span>

                                    <span>
                                        {adminCount} admins
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Card className="h-full">
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Administrators
                                        </p>

                                        <p className="mt-2 text-2xl font-semibold tracking-tight">
                                            {adminCount}
                                        </p>
                                    </div>

                                    <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                                        <Crown className="size-4" />
                                    </div>
                                </div>

                                <p className="mt-4 text-xs text-muted-foreground">
                                    Users with elevated access
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Card className="h-full">
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Google accounts
                                        </p>

                                        <p className="mt-2 text-2xl font-semibold tracking-tight">
                                            {googleUsers}
                                        </p>
                                    </div>

                                    <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                                        <Sparkles className="size-4" />
                                    </div>
                                </div>

                                <p className="mt-4 text-xs text-muted-foreground">
                                    Users connected with Google
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Card className="h-full">
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Total leads
                                        </p>

                                        <p className="mt-2 text-2xl font-semibold tracking-tight">
                                            {totalLeads}
                                        </p>
                                    </div>

                                    <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                                        <Target className="size-4" />
                                    </div>
                                </div>

                                <p className="mt-4 text-xs text-muted-foreground">
                                    Across all users
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>

                {/* Global Error */}
                {error && (
                    <motion.div
                        variants={itemVariants}
                        className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
                    >
                        {error}
                    </motion.div>
                )}

                {/* Users Card */}
                <motion.div variants={itemVariants}>
                    <Card className="overflow-hidden">
                        <CardHeader className="gap-4 border-b bg-muted/20">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <CardTitle className="text-base">
                                        All users
                                    </CardTitle>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {filteredUsers.length} of{" "}
                                        {users.length} users
                                    </p>
                                </div>

                                <div className="flex flex-col gap-2 sm:flex-row">
                                    {/* Search */}
                                    <div className="relative w-full sm:w-72">
                                        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                                        <Input
                                            value={search}
                                            onChange={(event) =>
                                                setSearch(
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Search name or email..."
                                            className="h-9 pl-9 pr-9"
                                        />

                                        {search && (
                                            <button
                                                type="button"
                                                onClick={clearSearch}
                                                className="absolute right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                                                aria-label="Clear search"
                                            >
                                                <X className="size-3.5" />
                                            </button>
                                        )}
                                    </div>

                                    {/* Role Filter */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="inline-flex h-9 items-center justify-between gap-2 rounded-lg border bg-background px-3 text-sm font-medium shadow-xs outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring">
                                            {roleFilter === "ALL"
                                                ? "All roles"
                                                : roleFilter === "ADMIN"
                                                    ? "Admins"
                                                    : "Users"}

                                            <ChevronDown className="size-4" />
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    setRoleFilter("ALL")
                                                }
                                            >
                                                All roles
                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                                onClick={() =>
                                                    setRoleFilter("ADMIN")
                                                }
                                            >
                                                Admins
                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                                onClick={() =>
                                                    setRoleFilter("USER")
                                                }
                                            >
                                                Users
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="p-0">
                            {/* Loading */}
                            {loading && (
                                <div className="divide-y">
                                    {Array.from({ length: 4 }).map(
                                        (_, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-4 p-5"
                                            >
                                                <div className="size-10 shrink-0 animate-pulse rounded-full bg-muted" />

                                                <div className="flex-1 space-y-2">
                                                    <div className="h-4 w-40 animate-pulse rounded bg-muted" />
                                                    <div className="h-3 w-56 animate-pulse rounded bg-muted" />
                                                </div>

                                                <div className="hidden h-6 w-20 animate-pulse rounded-full bg-muted md:block" />
                                            </div>
                                        )
                                    )}
                                </div>
                            )}

                            {/* Empty */}
                            {!loading &&
                                !error &&
                                filteredUsers.length === 0 && (
                                    <div className="flex min-h-52 flex-col items-center justify-center gap-3 p-6 text-center">
                                        <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                                            <UserRound className="size-5 text-muted-foreground" />
                                        </div>

                                        <div>
                                            <p className="font-medium">
                                                No users found
                                            </p>

                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Try changing your search or
                                                role filter.
                                            </p>
                                        </div>
                                    </div>
                                )}

                            {/* Desktop Responsive Table */}
                            {!loading &&
                                !error &&
                                filteredUsers.length > 0 && (
                                    <>
                                        <div className="hidden md:block overflow-x-auto">
                                            <div className="min-w-[920px]">
                                                {/* Table Header */}
                                                <div className="grid grid-cols-[minmax(220px,1.5fr)_150px_120px_120px_160px_64px] items-center gap-4 border-b px-5 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                                    <div>User</div>
                                                    <div>Account</div>
                                                    <div>Role</div>
                                                    <div>Activity</div>
                                                    <div>Joined</div>
                                                    <div className="text-center">
                                                        Action
                                                    </div>
                                                </div>

                                                {/* Rows */}
                                                <div className="divide-y">
                                                    {filteredUsers.map(
                                                        (
                                                            user,
                                                            index
                                                        ) => (
                                                            <motion.div
                                                                key={
                                                                    user.id
                                                                }
                                                                initial={{
                                                                    opacity: 0,
                                                                    y: 8,
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    y: 0,
                                                                }}
                                                                transition={{
                                                                    duration: 0.25,
                                                                    delay:
                                                                        index *
                                                                        0.03,
                                                                }}
                                                                className="grid grid-cols-[minmax(220px,1.5fr)_150px_120px_120px_160px_64px] items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/30"
                                                            >
                                                                {/* User */}
                                                                <div className="flex min-w-0 items-center gap-3">
                                                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full border bg-muted text-sm font-semibold">
                                                                        {getInitials(
                                                                            user.name
                                                                        )}
                                                                    </div>

                                                                    <div className="min-w-0">
                                                                        <p className="truncate text-sm font-medium">
                                                                            {
                                                                                user.name
                                                                            }
                                                                        </p>

                                                                        <div className="mt-0.5 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
                                                                            <Mail className="size-3.5 shrink-0" />

                                                                            <span className="truncate">
                                                                                {
                                                                                    user.email
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Account */}
                                                                <div>
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="gap-1.5"
                                                                    >
                                                                        {user.accountType ===
                                                                        "Google" ? (
                                                                            <Sparkles className="size-3.5" />
                                                                        ) : (
                                                                            <Mail className="size-3.5" />
                                                                        )}

                                                                        {
                                                                            user.accountType
                                                                        }
                                                                    </Badge>
                                                                </div>

                                                                {/* Role */}
                                                                <div>
                                                                    {user.role ===
                                                                    "ADMIN" ? (
                                                                        <Badge className="gap-1.5">
                                                                            <Crown className="size-3.5" />
                                                                            Admin
                                                                        </Badge>
                                                                    ) : (
                                                                        <Badge
                                                                            variant="secondary"
                                                                            className="gap-1.5"
                                                                        >
                                                                            <UserRound className="size-3.5" />
                                                                            User
                                                                        </Badge>
                                                                    )}
                                                                </div>

                                                                {/* Activity */}
                                                                <div className="text-sm">
                                                                    <div className="flex items-center gap-1.5">
                                                                        <Activity className="size-3.5 text-muted-foreground" />

                                                                        <span>
                                                                            {
                                                                                user.activitiesCount
                                                                            }
                                                                        </span>
                                                                    </div>

                                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                                        {
                                                                            user.leadsCount
                                                                        }{" "}
                                                                        leads
                                                                    </p>
                                                                </div>

                                                                {/* Joined */}
                                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                    <CalendarDays className="size-4 shrink-0" />

                                                                    {formatDate(
                                                                        user.createdAt
                                                                    )}
                                                                </div>

                                                                {/* Action */}
                                                                <div className="flex justify-center">
                                                                    {user.role ===
                                                                    "USER" ? (
                                                                        <Button
                                                                            type="button"
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="size-9 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                                                                            disabled={
                                                                                deletingUserId !==
                                                                                null
                                                                            }
                                                                            onClick={() =>
                                                                                openDeleteDialog(
                                                                                    user
                                                                                )
                                                                            }
                                                                            aria-label={`Delete ${user.name}`}
                                                                            title="Delete user"
                                                                        >
                                                                            {deletingUserId ===
                                                                            user.id ? (
                                                                                <Loader2 className="size-4 animate-spin" />
                                                                            ) : (
                                                                                <Trash2 className="size-4" />
                                                                            )}
                                                                        </Button>
                                                                    ) : (
                                                                        <ShieldCheck className="size-4 text-emerald-500" />
                                                                    )}
                                                                </div>
                                                            </motion.div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Mobile Cards */}
                                        <div className="divide-y md:hidden">
                                            {filteredUsers.map(
                                                (
                                                    user,
                                                    index
                                                ) => (
                                                    <motion.div
                                                        key={user.id}
                                                        initial={{
                                                            opacity: 0,
                                                            y: 8,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                        }}
                                                        transition={{
                                                            duration: 0.25,
                                                            delay:
                                                                index *
                                                                0.03,
                                                        }}
                                                        className="space-y-4 p-5"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full border bg-muted text-sm font-semibold">
                                                                {getInitials(
                                                                    user.name
                                                                )}
                                                            </div>

                                                            <div className="min-w-0 flex-1">
                                                                <p className="truncate text-sm font-medium">
                                                                    {
                                                                        user.name
                                                                    }
                                                                </p>

                                                                <p className="truncate text-xs text-muted-foreground">
                                                                    {
                                                                        user.email
                                                                    }
                                                                </p>
                                                            </div>

                                                            {user.role ===
                                                            "ADMIN" ? (
                                                                <Badge className="shrink-0 gap-1">
                                                                    <Crown className="size-3" />
                                                                    Admin
                                                                </Badge>
                                                            ) : (
                                                                <Badge
                                                                    variant="secondary"
                                                                    className="shrink-0"
                                                                >
                                                                    User
                                                                </Badge>
                                                            )}
                                                        </div>

                                                        <Separator />

                                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                                            <div>
                                                                <p className="text-xs text-muted-foreground">
                                                                    Account
                                                                </p>

                                                                <div className="mt-1 flex items-center gap-1.5">
                                                                    {user.accountType ===
                                                                    "Google" ? (
                                                                        <Sparkles className="size-3.5" />
                                                                    ) : (
                                                                        <Mail className="size-3.5" />
                                                                    )}

                                                                    {
                                                                        user.accountType
                                                                    }
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <p className="text-xs text-muted-foreground">
                                                                    Joined
                                                                </p>

                                                                <div className="mt-1 flex items-center gap-1.5">
                                                                    <CalendarDays className="size-3.5" />

                                                                    {formatDate(
                                                                        user.createdAt
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <p className="text-xs text-muted-foreground">
                                                                    Leads
                                                                </p>

                                                                <p className="mt-1 font-medium">
                                                                    {
                                                                        user.leadsCount
                                                                    }
                                                                </p>
                                                            </div>

                                                            <div>
                                                                <p className="text-xs text-muted-foreground">
                                                                    Campaigns
                                                                </p>

                                                                <p className="mt-1 font-medium">
                                                                    {
                                                                        user.campaignsCount
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Mobile Action */}
                                                        {user.role ===
                                                        "USER" ? (
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                className="w-full gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                                disabled={
                                                                    deletingUserId !==
                                                                    null
                                                                }
                                                                onClick={() =>
                                                                    openDeleteDialog(
                                                                        user
                                                                    )
                                                                }
                                                            >
                                                                <Trash2 className="size-4" />
                                                                Delete User
                                                            </Button>
                                                        ) : (
                                                            <div className="flex items-center justify-center gap-2 rounded-lg border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
                                                                <ShieldCheck className="size-3.5" />
                                                                Admin account
                                                                protected
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                )
                                            )}
                                        </div>
                                    </>
                                )}
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={selectedUser !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        closeDeleteDialog();
                    }
                }}
            >
                <DialogContent className="sm:max-w-[440px]">
                    <DialogHeader>
                        <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-destructive/10">
                            <Trash2 className="size-5 text-destructive" />
                        </div>

                        <DialogTitle>
                            Delete user?
                        </DialogTitle>

                        <DialogDescription>
                            This action permanently deletes the user
                            and all of their associated data. This
                            cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedUser && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 8,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            className="rounded-lg border bg-muted/30 p-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full border bg-background text-sm font-semibold">
                                    {getInitials(
                                        selectedUser.name
                                    )}
                                </div>

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium">
                                        {selectedUser.name}
                                    </p>

                                    <p className="truncate text-xs text-muted-foreground">
                                        {selectedUser.email}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                                <div className="rounded-md border bg-background p-2">
                                    <p className="text-sm font-semibold">
                                        {selectedUser.leadsCount}
                                    </p>

                                    <p className="text-[11px] text-muted-foreground">
                                        Leads
                                    </p>
                                </div>

                                <div className="rounded-md border bg-background p-2">
                                    <p className="text-sm font-semibold">
                                        {
                                            selectedUser.campaignsCount
                                        }
                                    </p>

                                    <p className="text-[11px] text-muted-foreground">
                                        Campaigns
                                    </p>
                                </div>

                                <div className="rounded-md border bg-background p-2">
                                    <p className="text-sm font-semibold">
                                        {
                                            selectedUser.activitiesCount
                                        }
                                    </p>

                                    <p className="text-[11px] text-muted-foreground">
                                        Activities
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <DialogFooter className="gap-2 sm:gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={deletingUserId !== null}
                            onClick={closeDeleteDialog}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="button"
                            variant="destructive"
                            disabled={deletingUserId !== null}
                            onClick={handleDeleteUser}
                            className="gap-2"
                        >
                            {deletingUserId ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="size-4" />
                                    Delete User
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

