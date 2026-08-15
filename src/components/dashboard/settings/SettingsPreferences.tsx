"use client";

import { useState } from "react";
import {
  Bell,
  Bot,
  Check,
  Globe,
  Moon,
  Palette,
  Save,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* =========================================================
   SETTING ROW
========================================================= */

function SettingRow({
  title,
  description,
  checked,
  onCheckedChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-xs font-medium">
          {title}
        </p>

        <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label={title}
      />
    </div>
  );
}

/* =========================================================
   MAIN
========================================================= */

export default function SettingsPreferences() {
  /* =====================================================
     NOTIFICATIONS
  ===================================================== */

  const [emailNotifications, setEmailNotifications] =
    useState(true);

  const [agentNotifications, setAgentNotifications] =
    useState(true);

  const [weeklyReport, setWeeklyReport] =
    useState(true);

  /* =====================================================
     AI AGENT
  ===================================================== */

  const [autoFollowUps, setAutoFollowUps] =
    useState(true);

  /* =====================================================
     APPEARANCE
  ===================================================== */

  const [theme, setTheme] = useState("system");

  /* =====================================================
     LANGUAGE
  ===================================================== */

  const [language, setLanguage] =
    useState("english");

  /* =====================================================
     SAVE STATE
  ===================================================== */

  const [saved, setSaved] = useState(false);

  /* =====================================================
     SAVE
  ===================================================== */

  const handleSave = () => {
    // API / backend can be connected here later.

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <section className="w-full rounded-2xl border bg-card">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="border-b px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Palette className="size-4 text-primary" />
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-semibold">
              Preferences
            </h2>

            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Customize how AIFlow works for you.
            </p>
          </div>
        </div>
      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="divide-y">
        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        <div className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <Bell className="size-4 text-muted-foreground" />

            <h3 className="text-xs font-semibold">
              Notifications
            </h3>
          </div>

          <div className="space-y-5">
            <SettingRow
              title="Email notifications"
              description="Receive important account and sales updates."
              checked={emailNotifications}
              onCheckedChange={
                setEmailNotifications
              }
            />

            <SettingRow
              title="AI Agent activity"
              description="Get notified when the agent completes important actions."
              checked={agentNotifications}
              onCheckedChange={
                setAgentNotifications
              }
            />

            <SettingRow
              title="Weekly report"
              description="Receive a weekly summary of your sales performance."
              checked={weeklyReport}
              onCheckedChange={setWeeklyReport}
            />
          </div>
        </div>

        {/* =================================================
            AI AGENT
        ================================================= */}

        <div className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <Bot className="size-4 text-muted-foreground" />

            <h3 className="text-xs font-semibold">
              AI Agent
            </h3>
          </div>

          <SettingRow
            title="Automatic follow-ups"
            description="Allow the AI agent to send follow-ups when appropriate."
            checked={autoFollowUps}
            onCheckedChange={setAutoFollowUps}
          />
        </div>

        {/* =================================================
            APPEARANCE
        ================================================= */}

        <div className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <Moon className="size-4 text-muted-foreground" />

            <h3 className="text-xs font-semibold">
              Appearance
            </h3>
          </div>

          <Select
            value={theme}
            onValueChange={(value) => {
              if (value) {
                setTheme(value);
              }
            }}
          >
            <SelectTrigger className="h-10 w-full">
              <div className="flex items-center gap-2">
                <Moon className="size-3.5 text-muted-foreground" />

                <SelectValue placeholder="Select theme" />
              </div>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="system">
                System
              </SelectItem>

              <SelectItem value="light">
                Light
              </SelectItem>

              <SelectItem value="dark">
                Dark
              </SelectItem>
            </SelectContent>
          </Select>

          <p className="mt-2 text-[10px] text-muted-foreground">
            Choose how AIFlow should appear on your device.
          </p>
        </div>

        {/* =================================================
            LANGUAGE
        ================================================= */}

        <div className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <Globe className="size-4 text-muted-foreground" />

            <h3 className="text-xs font-semibold">
              Language
            </h3>
          </div>

          <Select
            value={language}
            onValueChange={(value) => {
              if (value) {
                setLanguage(value);
              }
            }}
          >
            <SelectTrigger className="h-10 w-full">
              <div className="flex items-center gap-2">
                <Globe className="size-3.5 text-muted-foreground" />

                <SelectValue placeholder="Select language" />
              </div>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="english">
                English
              </SelectItem>

              <SelectItem value="hindi">
                Hindi
              </SelectItem>

              <SelectItem value="punjabi">
                Punjabi
              </SelectItem>
            </SelectContent>
          </Select>

          <p className="mt-2 text-[10px] text-muted-foreground">
            Select your preferred interface language.
          </p>
        </div>
      </div>

      {/* =================================================
          FOOTER
      ================================================= */}

      <div className="flex flex-col gap-3 border-t p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-h-4 items-center">
          {saved ? (
            <div className="flex items-center gap-2">
              <Check className="size-3.5 text-emerald-500" />

              <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
                Preferences saved successfully
              </span>
            </div>
          ) : (
            <span className="text-[10px] text-muted-foreground">
              Changes are ready to be saved.
            </span>
          )}
        </div>

        <Button
          type="button"
          size="sm"
          onClick={handleSave}
          disabled={saved}
        >
          {saved ? (
            <>
              <Check className="mr-2 size-3.5" />
              Saved
            </>
          ) : (
            <>
              <Save className="mr-2 size-3.5" />
              Save preferences
            </>
          )}
        </Button>
      </div>
    </section>
  );
}