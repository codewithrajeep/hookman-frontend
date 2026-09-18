"use client";

import { SettingsCard } from "@/components/settings-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle, Trash2, Upload, User } from "lucide-react";
import React from "react";

// Reusable row: label on the left, control on the right
function SettingsRow({
  label,
  description,
  htmlFor,
  children,
}: {
  label: string;
  description?: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-border py-6 first:pt-0 last:border-0 last:pb-0 sm:flex-row sm:items-start sm:gap-8">
      <div className="sm:w-64 sm:shrink-0">
        <Label htmlFor={htmlFor} className="text-sm font-medium">
          {label}
        </Label>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex-1 sm:max-w-md">{children}</div>
    </div>
  );
}

export default function AccountPage() {
  const [name, setName] = React.useState("John Acme");
  const [email] = React.useState("johnacme@gmail.com");
  const [timezone, setTimeZone] = React.useState("utc");
  const [dateFormat, setDateFormat] = React.useState("iso8601");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [confirmText, setConfirmText] = React.useState("");
  const canDelete = confirmText === "DELETE";

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) setConfirmText("");
  };

  return (
    <>
      {/* Profile */}
      <SettingsCard
        title="Profile"
        description="Update your personal information"
      >
        <div>
          {/* Avatar */}
          <div className="flex flex-col gap-2 border-b border-border py-6 first:pt-0 sm:flex-row sm:items-start sm:gap-8">
            <div className="sm:w-64 sm:shrink-0">
              <Label className="text-sm font-medium">Avatar</Label>
              <p className="mt-1 text-xs text-muted-foreground">
                Click upload to change your profile picture
              </p>
            </div>
            <div className="flex flex-1 items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-secondary">
                <User className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer w-fit"
                >
                  <Upload className="mr-2 w-3.5 h-3.5" />
                  Upload
                </Button>
                <span className="text-xs text-muted-foreground">
                  PNG or JPG, max 2MB
                </span>
              </div>
            </div>
          </div>

          {/* Name */}
          <SettingsRow
            label="Name"
            description="Your display name across Hookman"
            htmlFor="name"
          >
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </SettingsRow>

          {/* Email */}
          <SettingsRow
            label="Email"
            description="Contact support to change your email"
            htmlFor="email"
          >
            <div className="flex items-center gap-3">
              <Input
                id="email"
                value={email}
                readOnly
                className="bg-muted/50 text-muted-foreground"
              />
              <Button
                variant="link"
                size="sm"
                className="cursor-pointer shrink-0 px-0"
              >
                Change
              </Button>
            </div>
          </SettingsRow>

          <div className="flex justify-end pt-6">
            <Button size="sm" className="cursor-pointer">
              Save changes
            </Button>
          </div>
        </div>
      </SettingsCard>

      {/* Preferences */}
      <SettingsCard
        title="Preferences"
        description="Customize your regional settings"
      >
        <div>
          <SettingsRow
            label="Timezone"
            description="Used for timestamps and scheduling"
            htmlFor="timezone"
          >
            <Select
              value={timezone}
              onValueChange={(value) => {
                if (value !== null) setTimeZone(value);
              }}
            >
              <SelectTrigger id="timezone" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc">
                  UTC — Coordinated Universal Time
                </SelectItem>
                <SelectItem value="est">
                  EST — Eastern Standard Time (UTC-5)
                </SelectItem>
                <SelectItem value="pst">
                  PST — Pacific Standard Time (UTC-8)
                </SelectItem>
                <SelectItem value="gmt">
                  GMT — Greenwich Mean Time (UTC+0)
                </SelectItem>
                <SelectItem value="cet">
                  CET — Central European Time (UTC+1)
                </SelectItem>
                <SelectItem value="jst">
                  JST — Japan Standard Time (UTC+9)
                </SelectItem>
              </SelectContent>
            </Select>
          </SettingsRow>

          <SettingsRow
            label="Date format"
            description="How dates are displayed throughout the app"
            htmlFor="dateformat"
          >
            <Select
              value={dateFormat}
              onValueChange={(value) => {
                if (value !== null) setDateFormat(value);
              }}
            >
              <SelectTrigger id="dateformat" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="iso8601">
                  ISO 8601 (2026-09-13T14:32:01Z)
                </SelectItem>
                <SelectItem value="us">US (09/13/2026 2:32 PM)</SelectItem>
                <SelectItem value="eu">European (13/09/2026 14:32)</SelectItem>
                <SelectItem value="rfc2822">
                  RFC 2822 (13 Sep 2026 14:32:01)
                </SelectItem>
              </SelectContent>
            </Select>
          </SettingsRow>

          <div className="flex justify-end pt-6">
            <Button size="sm" className="cursor-pointer">
              Save preferences
            </Button>
          </div>
        </div>
      </SettingsCard>

      {/* Danger zone */}
      <SettingsCard
        title="Danger Zone"
        description="Irreversible and destructive actions"
        className="border-destructive/30"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Delete account</p>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data.
              </p>
            </div>
          </div>
          <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
            <DialogTrigger
              render={
                <Button
                  variant="destructive"
                  size="sm"
                  className="cursor-pointer shrink-0"
                >
                  <Trash2 className="mr-2 h-3.5 w-3.5" />
                  Delete account
                </Button>
              }
            />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete account?</DialogTitle>
                <DialogDescription>
                  This action is permanent and cannot be undone. All endpoints,
                  events, and configuration will be permanently removed.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2 py-2">
                <Label htmlFor="confirm">Type DELETE to confirm</Label>
                <Input
                  id="confirm"
                  placeholder="DELETE"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                />
              </div>
              <DialogFooter>
                <DialogClose
                  render={<Button variant="outline">Cancel</Button>}
                />
                <Button variant="destructive" disabled={!canDelete}>
                  Delete permanently
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </SettingsCard>
    </>
  );
}
