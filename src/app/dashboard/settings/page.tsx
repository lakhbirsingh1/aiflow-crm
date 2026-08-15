"use client";

import {
  ChevronRight,
  Settings,
  Sparkles,
} from "lucide-react";

import SettingsProfile from "@/components/dashboard/settings/SettingsProfile";
import SettingsPreferences from "@/components/dashboard/settings/SettingsPreferences";

export default function SettingsPage() {
  return (
    <main className="min-h-full w-full">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-5 sm:px-6 lg:px-8">
        {/* HEADER */}
        <header className="mb-6">
    

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                  <Settings className="size-4 text-primary" />
                </div>

                <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Settings
                </h1>
              </div>

              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Manage your account, notifications, AI behavior,
                and workspace preferences.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full border bg-card px-3 py-1.5">
              <Sparkles className="size-3 text-primary" />

              <span className="text-[10px] font-medium">
                AIFlow Preferences
              </span>
            </div>
          </div>
        </header>

        {/* SETTINGS CONTENT */}
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          {/* COMPONENT 1 */}
          <SettingsProfile />

          {/* COMPONENT 2 */}
          <SettingsPreferences />
        </div>
      </div>
    </main>
  );
}