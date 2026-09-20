"use client";

import { SettingsCard } from "@/components/settings-card";
import { useTheme } from "@/components/theme-provider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import React from "react";

const brandSwatches = [
  { name: "Mono", hex: "#000000" },
  { name: "Slate", hex: "#475569" },
  { name: "Steel", hex: "#64748b" },
  { name: "Graphite", hex: "#334155" },
  { name: "Ash", hex: "#78716c" },
  { name: "Iron", hex: "#52525b" },
];

export default function AppearancePage() {
  const { theme, setTheme } = useTheme();
  const [brandColor, setBrandColor] = React.useState("#000000");
  const [chartStyle, setChartStyle] = React.useState<
    "default" | "simplified" | "custom"
  >("default");
  const [language, setLanguage] = React.useState("en-uk");
  const themeOptions = [
    { value: "light" as const, label: "Light", icon: Sun },
    { value: "dark" as const, label: "Dark", icon: Moon },
    { value: "system" as const, label: "System", icon: Monitor },
  ];
  return (
    <div>
      {/* Theme */}
      <SettingsCard title="Theme" description="Choose how Hookman looks to you">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {themeOptions.map((opt) => {
            const Icon = opt.icon;
            const selected = theme === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setTheme(opt.value)}
                className={cn(
                  "flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 p-4 transition-colors",
                  selected
                    ? "border-foreground bg-secondary"
                    : "border-border hover:border-foreground/30",
                )}
              >
                {/* Preview thumbnail */}
                <div
                  className={cn(
                    "flex h-20 w-full items-center justify-center rounded-md border",
                    opt.value === "light" && "bg-white border-zinc-200",
                    opt.value === "dark" && "bg-black border-zinc-800",
                    opt.value === "system" &&
                      "bg-linear-to-br from-white to-black border-zinc-400",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-6 w-6",
                      opt.value === "light" && "text-zinc-900",
                      opt.value === "dark" && "text-zinc-100",
                      opt.value === "system" && "text-zinc-600",
                    )}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{opt.label}</span>
                  {selected && <Check className="h-3.5 w-3.5" />}
                </div>
              </button>
            );
          })}
        </div>
      </SettingsCard>
      {/* Brand Color */}
      <SettingsCard
        title="Brand Color"
        description="Customize the accent color used across the dashboard"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="brand-hex">Custom Color</Label>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 shrink-0 rounded-lg border border-border" />
              <Input
                id="brand-hex"
                value={brandColor}
                onChange={(e) => setBrandColor(e.target.value)}
                className="max-w-xs font-mono uppercase"
                placeholder="#000000"
              />
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs text-muted-foreground">Presets</p>
            <div className="flex flex-wrap gap-2">
              {brandSwatches.map((sw) => {
                const selected =
                  brandColor.toLowerCase() === sw.hex.toLowerCase();
                return (
                  <button
                    key={sw.name}
                    type="button"
                    onClick={() => setBrandColor(sw.hex)}
                    className={cn(
                      "flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-2 transition-colors",
                      selected
                        ? "border-foreground"
                        : "border-border hover:border-foreground/30",
                    )}
                    style={{ backgroundColor: sw.hex }}
                    title={sw.name}
                    aria-label={`Set brand color to ${sw.name}`}
                  >
                    {selected && <Check className="h-4 w-4 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </SettingsCard>
      {/* Chart style */}
      <SettingsCard
        title="Chart Style"
        description="Customize the appearance of charts and graphs"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {(
            [
              { key: "default", label: "Default" },
              { key: "simplified", label: "Simplified" },
              { key: "custom", label: "Custom CSS" },
            ] as const
          ).map((opt) => {
            const selected = chartStyle === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => setChartStyle(opt.key)}
                className={cn(
                  "flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 p-4 transition-colors",
                  selected
                    ? "border-foreground bg-secondary"
                    : "border-border hover:border-foreground/30",
                )}
              >
                {/* Mock chart preview */}
                <div className="flex h-20 w-full items-end justify-center gap-1 rounded-md border border-border bg-muted/30 p-2">
                  {opt.key === "default" &&
                    [50, 75, 45, 90, 60, 80, 55].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm bg-foreground/60"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  {opt.key === "simplified" &&
                    [50, 75, 45, 90, 60, 80, 55].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-foreground/40"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  {opt.key === "custom" &&
                    [50, 75, 45, 90, 60, 80, 55].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm border border-foreground/40 bg-foreground/10"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{opt.label}</span>
                  {selected && <Check className="h-3.5 w-3.5" />}
                </div>
              </button>
            );
          })}
        </div>
      </SettingsCard>

      {/* Language */}
      <SettingsCard
        title="Language"
        description="Set your preferred display language"
      >
        <div className="max-w-md space-y-2">
          <Label htmlFor="language">Display language</Label>
          <Select
            value={language}
            onValueChange={(value) => {
              if (value !== null) setLanguage(value);
            }}
          >
            <SelectTrigger id="language">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en-uk">English (UK)</SelectItem>
              <SelectItem value="en-us">English (US)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </SettingsCard>
    </div>
  );
}
