import { cn } from "@/lib/utils";
import type { EventStatus } from "@/types";
import { Check, Clock, RotateCw, X } from "lucide-react";
import React from "react";

const eventConfig: Record<
  EventStatus,
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    className: string;
  }
> = {
  DELIVERED: {
    label: "Delivered",
    icon: Check,
    className: "border-border bg-secondary text-secondary-foreground",
  },
  FAILED: {
    label: "Failed",
    icon: X,
    className: "border-foreground/40 bg-foreground/5 text-foreground",
  },
  PENDING: {
    label: "Pending",
    icon: Clock,
    className: "border-border bg-muted text-muted-foreground",
  },
  DELIVERING: {
    label: "Delivering",
    icon: RotateCw,
    className: "border-border bg-secondary text-secondary-foreground",
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: EventStatus;
  className?: string;
}) {
  const config = eventConfig[status];
  const Icon = config.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        config.className,
        className,
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}

export function EndpointStatusBadge({
  isActive,
  className,
}: {
  isActive: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        isActive
          ? "border-border bg-secondary text-secondary-foreground"
          : "border-border bg-muted text-muted-foreground",
        className,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          isActive ? "bg-foreground" : "bg-muted-foreground",
        )}
      />
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}
