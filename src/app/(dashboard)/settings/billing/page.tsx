"use client";

import { SettingsCard } from "@/components/settings-card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowUp,
  CreditCard,
  FileText,
  Key,
  Users,
  Webhook,
  Zap,
} from "lucide-react";

const usageItems = [
  { label: "Events this month", value: "342", icon: Zap },
  { label: "Endpoints", value: "6", icon: Webhook },
  { label: "API Keys", value: "2", icon: Key },
  { label: "Team members", value: "1", icon: Users },
];

export default function BillingPage() {
  const eventsUsed = 324;
  const eventsLimit = 1000;
  const usagePercent = Math.min(
    100,
    Math.round((eventsUsed / eventsLimit) * 1000),
  );
  return (
    <div>
      {/* Current plan */}
      <SettingsCard
        title="Current Plan"
        description="Your subscription plan and usage"
      >
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold">Free</p>
              <p className="text-sm text-muted-foreground">
                1,000 events per month · No credit card required
              </p>
            </div>
            <Button size="sm" className="shrink-0 cursor-pointer">
              <ArrowUp className="mr-2 h-3.5 w-3.5" />
              Upgrade
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Events used this month
              </span>
              <span className="font-medium tabular-nums">
                {eventsUsed.toLocaleString()} / {eventsLimit.toLocaleString()}
              </span>
            </div>
            <Progress value={usagePercent} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {usagePercent}% of your monthly limit used
            </p>
          </div>
        </div>
      </SettingsCard>
      {/* Usage */}
      <SettingsCard
        title="Usage"
        description="Your resource consumption this building cycle"
      >
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {usageItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-lg border border-border p-4"
              >
                <Icon className="mb-2 h-4 w-4 text-muted-foreground" />
                <p className="text-2xl text-muted-foreground">{item.value}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </SettingsCard>
      {/* Payment method */}
      <SettingsCard
        title="Payment Method"
        description="Manage your billing payment method"
      >
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-muted">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium">No payment method on file</p>
          <p className="mb-4 text-sm text-muted-foreground">
            Add a card to upgrade to a paid plan
          </p>
          <Button variant="outline" size="sm" className="cursor-pointer">
            <CreditCard className="mr-2 h-3.5 w-3.5" />
            Add card
          </Button>
        </div>
      </SettingsCard>
      {/* Invoices */}
      <SettingsCard
        title="Invoices"
        description="Your billing history and downloadable invoices"
      >
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-muted">
            <FileText className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium">No invoices yet</p>
          <p className="text-sm text-muted-foreground">
            Invoices will appear here once you upgrade to a paid plan
          </p>
        </div>
      </SettingsCard>
    </div>
  );
}
