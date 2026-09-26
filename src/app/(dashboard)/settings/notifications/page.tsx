"use client";

import { SettingsCard } from "@/components/settings-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import React from "react";

interface AlertItem {
  id: string;
  label: string;
  description: string;
  defaultOn: boolean;
}

const emailAlerts: AlertItem[] = [
  {
    id: "delivery-failed",
    label: "Delivery failed",
    description: "Get notified when a webhook delivery fails after all retries",
    defaultOn: true,
  },
  {
    id: "dead-letter",
    label: "Dead letter created",
    description: "Get notified when an event enters the dead letter queue",
    defaultOn: true,
  },
  {
    id: "weekly-digest",
    label: "Weekly digest",
    description: "Receive a weekly summary of your webhook activity",
    defaultOn: false,
  },
  {
    id: "event-delivered",
    label: "Event delivered (success)",
    description: "Get notified for every successful delivery",
    defaultOn: false,
  },
];

export default function NotificationPage() {
  const [alerts, setAlerts] = React.useState<Record<string, boolean>>(
    Object.fromEntries(emailAlerts.map((a) => [a.id, a.defaultOn])),
  );
  const [failThreshold, setFailThreshold] = React.useState("3");
  const [perEndpoint, setPerEndpoint] = React.useState(true);
  const [quietHours, setQuietHours] = React.useState(false);
  const [startTime, setStartTime] = React.useState("22:00");
  const [endTime, setEndTime] = React.useState("7:00");

  return (
    <div>
      {/* Email alerts */}
      <SettingsCard
        title="Email Alerts"
        description="Choose which events trigger email notifications"
      >
        <div className="space-y-1">
          {emailAlerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-center justify-between border-b border-border py-3 last:border-0"
            >
              <div className="pr-4">
                <p className="text-sm font-medium">{alert.label}</p>
                <p className="text-sm text-muted-foreground">
                  {alert.description}
                </p>
              </div>
              <Switch
                checked={alerts[alert.id]}
                onCheckedChange={(v) =>
                  setAlerts((prev) => ({ ...prev, [alert.id]: v }))
                }
                className="shrink-0 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </SettingsCard>

      {/* Delivery failure rules */}
      <SettingsCard
        title="Delivery Failure Rules"
        description="Configure when failure alerts are triggered"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fail-threshold">
              Alert after N failed attempts
            </Label>
            <Input
              id="fail-threshold"
              type="number"
              min={1}
              max={10}
              value={failThreshold}
              onChange={(e) => setFailThreshold(e.target.value)}
              className="max-w-32"
            />
            <p className="text-xs text-muted-foreground">
              You will be alerted after this many consecutive delivery failures.
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-border py-3">
            <div className="pr-4">
              <p className="text-sm font-medium">Per-endpoint alerts</p>
              <p className="text-sm text-muted-foreground">
                Send separate alerts for each endpoint instead of grouped.
              </p>
            </div>
            <Switch
              checked={perEndpoint}
              onCheckedChange={setPerEndpoint}
              className="shrink-0 cursor-pointer"
            />
          </div>

          <div className="flex justify-end">
            <Button size="sm" className="cursor-pointer">
              Save rules
            </Button>
          </div>
        </div>
      </SettingsCard>

      {/* Quiet hours */}
      <SettingsCard
        title="Quiet Hours"
        description="Pause non-critical notifications during specified hours"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border py-3">
            <div className="pr-4">
              <p className="text-sm font-medium">Enable quiet hours</p>
              <p className="text-sm text-muted-foreground">
                Suppress non-critical alerts during your set hours.
              </p>
            </div>
            <Switch
              checked={quietHours}
              onCheckedChange={setQuietHours}
              className="shrink-0 cursor-pointer"
            />
          </div>

          <div
            className={cn(
              "grid gap-4 transition-opacity sm:max-w-md sm:grid-cols-2",
              !quietHours && "opacity-50",
            )}
          >
            <div className="space-y-2">
              <Label htmlFor="start-time">Start time</Label>
              <Input
                id="start-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                disabled={!quietHours}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">End time</Label>
              <Input
                id="end-time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                disabled={!quietHours}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button size="sm" disabled={!quietHours} className="cursor-pointer">
              Save hours
            </Button>
          </div>
        </div>
      </SettingsCard>
    </div>
  );
}
