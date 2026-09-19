"use client";
import { SettingsCard } from "@/components/settings-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Key, Monitor, ShieldCheck, Smartphone, X } from "lucide-react";
import Link from "next/link";
import React from "react";

const sessions = [
  {
    id: "s1",
    device: "MacBook Pro · Chrome",
    icon: Monitor,
    ip: "192.168.1.42",
    location: "San Francisco, US",
    lastActive: "Active now",
    current: true,
  },
  {
    id: "s2",
    device: "iPhone 15 · Safari",
    icon: Smartphone,
    ip: "10.0.0.108",
    location: "San Francisco, US",
    lastActive: "2h ago",
    current: false,
  },
  {
    id: "s3",
    device: "Windows PC · Edge",
    icon: Monitor,
    ip: "172.16.0.55",
    location: "London, UK",
    lastActive: "3d ago",
    current: false,
  },
  {
    id: "s4",
    device: "iPad Air · Safari",
    icon: Smartphone,
    ip: "192.168.1.201",
    location: "San Francisco, US",
    lastActive: "1w ago",
    current: false,
  },
];

const loginHistory = [
  {
    id: "h1",
    date: "Sep 13, 2026 14:32",
    device: "MacBook Pro · Chrome",
    ip: "192.168.1.42",
    status: "success",
  },
  {
    id: "h2",
    date: "Sep 13, 2026 09:15",
    device: "iPhone 15 · Safari",
    ip: "10.0.0.108",
    status: "success",
  },
  {
    id: "h3",
    date: "Sep 12, 2026 18:44",
    device: "MacBook Pro · Chrome",
    ip: "192.168.1.42",
    status: "success",
  },
  {
    id: "h4",
    date: "Sep 12, 2026 02:11",
    device: "Unknown · Firefox",
    ip: "45.83.22.10",
    status: "failed",
  },
  {
    id: "h5",
    date: "Sep 11, 2026 11:20",
    device: "MacBook Pro · Chrome",
    ip: "192.168.1.42",
    status: "success",
  },
];

export default function SecurityPage() {
  const [twoFactor, setTwoFactor] = React.useState(false);
  return (
    <div>
      {/* Password */}
      <SettingsCard
        title="Password"
        description="Update your password to keep your account secure"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="current-pw">Current password</Label>
            <Input
              id="current-pw"
              type="password"
              placeholder="••••••••"
              className="max-w-md"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="new-pw">New password</Label>
              <Input id="new-pw" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-pw">Confirm new password</Label>
              <Input id="confirm-pw" type="password" placeholder="••••••••" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button size="sm" className="cursor-pointer">
              Save password
            </Button>
          </div>
        </div>
      </SettingsCard>
      {/* Two-factor authentication */}
      <SettingsCard
        title="Two-Factor Authentication"
        description="Add an extra layer of security to your account"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">Authenticator app</p>
                <Badge variant="secondary" className="text-xs">
                  Coming soon
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Use an authenticator app to generate verification codes.
              </p>
            </div>
          </div>
          <Switch
            checked={twoFactor}
            onCheckedChange={setTwoFactor}
            disabled
            className="shrink-0"
          />
        </div>
      </SettingsCard>
      {/* Active Sessions */}
      <SettingsCard
        title="Active Sessions"
        description="Devices currently signed in to your account"
      >
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device</TableHead>
                  <TableHead className="hidden sm:table-cell">IP</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Location
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Last Active
                  </TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.map((s) => {
                  const Icon = s.icon;
                  return (
                    <TableRow key={s.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                          <div>
                            <span className="text-sm font-medium">
                              {s.device}
                            </span>
                            {s.current && (
                              <span className="ml-2 text-xs text-muted-foreground">
                                (this device)
                              </span>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell font-mono text-xs text-muted-foreground">
                        {s.ip}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {s.location}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground text-xs">
                        {s.lastActive}
                      </TableCell>
                      <TableCell className="text-right">
                        {s.current ? (
                          <span className="text-xs text-muted-foreground">
                            Current
                          </span>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="cursor-pointer h-7"
                          >
                            Revoke
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end">
            <Button variant="outline" size="sm" className="cursor-pointer">
              Revoke all other sessions
            </Button>
          </div>
        </div>
      </SettingsCard>

      {/* API Keys */}
      <SettingsCard
        title="API Keys"
        description="Manage your API keys for programmatic access"
      >
        <div className="flex items-center gap-3">
          <Key className="h-5 w-5 text-muted-foreground shrink-0" />
          <p className="text-sm text-muted-foreground">
            API keys can be created, rotated, and revoked on the{" "}
            <Link
              href="/api-keys"
              className="font-medium text-foreground hover:underline"
            >
              API Keys page
            </Link>
            .
          </p>
        </div>
      </SettingsCard>

      {/* Login history */}
      <SettingsCard
        title="Login History"
        description="Recent authentication events for your account"
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead className="hidden sm:table-cell">Device</TableHead>
                <TableHead className="hidden md:table-cell">IP</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loginHistory.map((h) => (
                <TableRow key={h.id}>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {h.date}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">
                    {h.device}
                  </TableCell>
                  <TableCell className="hidden md:table-cell font-mono text-xs text-muted-foreground">
                    {h.ip}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="inline-flex items-center gap-1.5 text-xs">
                      {h.status === "success" ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          <span>Success</span>
                        </>
                      ) : (
                        <>
                          <X className="h-3.5 w-3.5" />
                          <span>Failed</span>
                        </>
                      )}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SettingsCard>
    </div>
  );
}
