
"use client";

import {
  ArrowDownUp,
  ChevronDown,
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
  Users,
  X,
} from "lucide-react";

type LeadsHeaderProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export default function LeadsHeader({
  search,
  onSearchChange,
}: LeadsHeaderProps) {
  return (
    <header className="w-full">
      <div className="flex flex-col gap-5 border-b border-border/50 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="h-4 w-4" />
            Sales workspace
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Leads
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Manage prospects, track engagement, and focus on the leads
            most likely to move forward.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-foreground px-4 text-sm font-medium text-background"
        >
          <Plus className="h-4 w-4" />
          Add lead
        </button>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-b border-border/50 py-5">
        <div>
          <span className="text-lg font-semibold">1,284</span>
          <span className="ml-2 text-xs text-muted-foreground">
            Total leads
          </span>
        </div>

        <div>
          <span className="text-lg font-semibold">186</span>
          <span className="ml-2 text-xs text-muted-foreground">
            New
          </span>
        </div>

        <div>
          <span className="text-lg font-semibold">472</span>
          <span className="ml-2 text-xs text-muted-foreground">
            In progress
          </span>
        </div>

        <div>
          <span className="text-lg font-semibold">126</span>
          <span className="ml-2 text-xs text-muted-foreground">
            Qualified
          </span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 py-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative w-full lg:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search leads..."
            className="h-10 w-full rounded-xl bg-muted/40 pl-9 pr-10 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:bg-muted/60"
          />

          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 overflow-x-auto">
          <button
            type="button"
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl px-3 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Filter className="h-3.5 w-3.5" />
            Filter
          </button>

          <button
            type="button"
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl px-3 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <ArrowDownUp className="h-3.5 w-3.5" />
            Sort
          </button>

          <button
            type="button"
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl px-3 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Columns
          </button>

          <button
            type="button"
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl px-3 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            All leads
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}

